/**
 * 管理员 GitHub 云端配置工具
 *
 * 使用管理员密码通过 AES-GCM 加密 GitHub Token，
 * 存储在 public/admin-config.json 中，实现跨设备配置同步。
 */

export interface GithubConfig {
	token: string;
	owner: string;
	repo: string;
	branch: string;
}

interface CloudConfig {
	owner: string;
	repo: string;
	branch: string;
	encryptedToken: string;
	iv: string;
	salt: string;
}

const CLOUD_CONFIG_PATH = "/admin-config.json";
const SESSION_KEY = "firefly_admin_password";
const LS_TOKEN = "firefly_github_token";
const LS_OWNER = "firefly_github_owner";
const LS_REPO = "firefly_github_repo";
const LS_BRANCH = "firefly_github_branch";

// ===== Base64 helpers =====

function arrayBufferToBase64(buffer: ArrayBuffer): string {
	const bytes = new Uint8Array(buffer);
	let binary = "";
	for (let i = 0; i < bytes.length; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return btoa(binary);
}

function base64ToUint8Array(b64: string): Uint8Array {
	const binary = atob(b64);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) {
		bytes[i] = binary.charCodeAt(i);
	}
	return bytes;
}

function utf8ToBase64(str: string): string {
	const bytes = new TextEncoder().encode(str);
	let binary = "";
	for (let i = 0; i < bytes.length; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return btoa(binary);
}

// ===== Crypto =====

async function deriveKey(
	password: string,
	salt: Uint8Array,
): Promise<CryptoKey> {
	const enc = new TextEncoder();
	const keyMaterial = await crypto.subtle.importKey(
		"raw",
		enc.encode(password),
		{ name: "PBKDF2" },
		false,
		["deriveKey"],
	);
	return crypto.subtle.deriveKey(
		{
			name: "PBKDF2",
			salt: salt.buffer as ArrayBuffer,
			iterations: 100000,
			hash: "SHA-256",
		},
		keyMaterial,
		{ name: "AES-GCM", length: 256 },
		false,
		["encrypt", "decrypt"],
	);
}

async function encryptToken(
	password: string,
	token: string,
): Promise<{ encryptedToken: string; iv: string; salt: string }> {
	const enc = new TextEncoder();
	const salt = crypto.getRandomValues(new Uint8Array(16));
	const iv = crypto.getRandomValues(new Uint8Array(12));
	const key = await deriveKey(password, salt);
	const encrypted = await crypto.subtle.encrypt(
		{ name: "AES-GCM", iv },
		key,
		enc.encode(token),
	);
	return {
		encryptedToken: arrayBufferToBase64(encrypted),
		iv: arrayBufferToBase64(iv.buffer),
		salt: arrayBufferToBase64(salt.buffer),
	};
}

async function decryptToken(
	password: string,
	encryptedToken: string,
	iv: string,
	salt: string,
): Promise<string> {
	const saltBytes = base64ToUint8Array(salt);
	const ivBytes = base64ToUint8Array(iv);
	const encryptedBytes = base64ToUint8Array(encryptedToken);
	const key = await deriveKey(password, saltBytes);
	const decrypted = await crypto.subtle.decrypt(
		{ name: "AES-GCM", iv: ivBytes.buffer as ArrayBuffer },
		key,
		encryptedBytes.buffer as ArrayBuffer,
	);
	return new TextDecoder().decode(decrypted);
}

// ===== Password management =====

export function getAdminPassword(): string | null {
	return sessionStorage.getItem(SESSION_KEY);
}

export function hasAdminPassword(): boolean {
	return !!sessionStorage.getItem(SESSION_KEY);
}

export function setAdminPassword(password: string): void {
	sessionStorage.setItem(SESSION_KEY, password);
}

export function clearAdminPassword(): void {
	sessionStorage.removeItem(SESSION_KEY);
}

// ===== Cloud config =====

async function fetchCloudConfig(): Promise<CloudConfig | null> {
	try {
		const resp = await fetch(`${CLOUD_CONFIG_PATH}?t=${Date.now()}`);
		if (!resp.ok) return null;
		const data = await resp.json();
		if (!data || !data.owner) return null;
		return data as CloudConfig;
	} catch {
		return null;
	}
}

/**
 * 获取 GitHub 配置：优先云端，其次 localStorage
 * 返回 null 表示未配置
 */
export async function getGithubConfig(): Promise<GithubConfig | null> {
	// 1. 尝试云端配置
	const cloud = await fetchCloudConfig();
	if (cloud && cloud.encryptedToken) {
		const password = getAdminPassword();
		if (password) {
			try {
				const token = await decryptToken(
					password,
					cloud.encryptedToken,
					cloud.iv,
					cloud.salt,
				);
				return {
					token,
					owner: cloud.owner,
					repo: cloud.repo,
					branch: cloud.branch || "main",
				};
			} catch {
				// 解密失败，可能密码不匹配
			}
		}
	}

	// 2. 回退到 localStorage
	const token = localStorage.getItem(LS_TOKEN);
	const owner = localStorage.getItem(LS_OWNER);
	const repo = localStorage.getItem(LS_REPO);
	const branch = localStorage.getItem(LS_BRANCH) || "main";
	if (token && owner && repo) {
		return { token, owner, repo, branch };
	}

	return null;
}

/**
 * 检查云端配置是否存在（不需要密码）
 */
export async function hasCloudConfig(): Promise<boolean> {
	const cloud = await fetchCloudConfig();
	return !!(cloud && cloud.encryptedToken);
}

/**
 * 保存 GitHub 配置到云端和本地
 * 需要管理员密码来加密 Token
 */
export async function saveGithubConfig(
	config: GithubConfig,
): Promise<{ cloud: boolean; local: boolean; error?: string }> {
	// 1. 保存到 localStorage（始终执行，作为备份）
	localStorage.setItem(LS_TOKEN, config.token);
	localStorage.setItem(LS_OWNER, config.owner);
	localStorage.setItem(LS_REPO, config.repo);
	localStorage.setItem(LS_BRANCH, config.branch);

	const result = { cloud: false, local: true, error: undefined as string | undefined };

	// 2. 尝试保存到云端
	const password = getAdminPassword();
	if (!password) {
		result.error = "无管理员密码，仅保存到本地";
		return result;
	}

	try {
		const { encryptedToken, iv, salt } = await encryptToken(
			password,
			config.token,
		);
		const cloudConfig: CloudConfig = {
			owner: config.owner,
			repo: config.repo,
			branch: config.branch,
			encryptedToken,
			iv,
			salt,
		};

		// 通过 GitHub API 写入 public/admin-config.json
		const path = "public/admin-config.json";
		const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${path}?ref=${config.branch}`;

		// 获取当前文件 SHA（如果存在）
		const resp = await fetch(url, {
			headers: {
				Authorization: `Bearer ${config.token}`,
				Accept: "application/vnd.github+json",
			},
		});

		let sha: string | undefined;
		if (resp.ok) {
			const data = await resp.json();
			sha = data.sha;
		}

		const content = JSON.stringify(cloudConfig, null, 2);
		const encoded = utf8ToBase64(content);

		const putResp = await fetch(url, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${config.token}`,
				Accept: "application/vnd.github+json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				message: "更新云端 GitHub 配置",
				content: encoded,
				branch: config.branch,
				...(sha ? { sha } : {}),
			}),
		});

		result.cloud = putResp.ok;
		if (!putResp.ok) {
			const errData = await putResp.json().catch(() => null);
			result.error = errData?.message || `HTTP ${putResp.status}`;
		}
	} catch (e) {
		result.error = e instanceof Error ? e.message : String(e);
	}

	return result;
}
