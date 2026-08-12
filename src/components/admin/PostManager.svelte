<script lang="ts">
import { onMount } from "svelte";
import {
	getGithubConfig,
	saveGithubConfig,
	hasAdminPassword,
	hasCloudConfig,
	type GithubConfig,
} from "@/utils/admin-github";
import {
	getRepoInfo,
	fetchPostFileList,
	postExistsInList,
	type RepoInfo,
} from "@/utils/github-content";

interface PostMeta {
	id: string;
	title: string;
	description: string;
	published: number;
	category: string;
	password: boolean;
	draft: boolean;
	pinned: boolean;
	tags: string[];
}

let authed = false;
let authChecked = false;

function isAdminAuthed(): boolean {
	try {
		const raw = localStorage.getItem("firefly_admin_authed");
		if (!raw) return false;
		const data = JSON.parse(raw);
		if (data && data.authed === true && Date.now() - data.time < 24 * 60 * 60 * 1000) {
			return true;
		}
		localStorage.removeItem("firefly_admin_authed");
		return false;
	} catch {
		localStorage.removeItem("firefly_admin_authed");
		return false;
	}
}

let posts: PostMeta[] = [];
let loading = true;
let error = "";

let searchQuery = "";
let filterCategory = "";
let categories: string[] = [];

let selectedIds: Set<string> = new Set();
let selectAll = false;

let githubToken = "";
let repoOwner = "";
let repoName = "";
let branch = "main";
let showSettings = false;
let cloudConfigured = false;
let needsReauth = false;
let isSavingSettings = false;

let statusMsg = "";
let statusType: "info" | "success" | "error" = "info";
let isProcessing = false;

let showBatchCategoryModal = false;
let batchCategoryValue = "";
let showBatchDeleteConfirm = false;

let editingCategoryFor: string | null = null;
let editCategoryValue = "";

let deleteConfirmId: string | null = null;

let syncStatus: "idle" | "syncing" | "synced" | "failed" = "idle";
let hiddenCount = 0;

onMount(async () => {
	if (!isAdminAuthed()) {
		window.location.href = "/";
		return;
	}
	authed = true;
	authChecked = true;

	await loadGithubConfig();
	await fetchPosts();
});

async function loadGithubConfig() {
	cloudConfigured = await hasCloudConfig();

	if (!hasAdminPassword() && cloudConfigured) {
		needsReauth = true;
		return;
	}

	const config = await getGithubConfig();
	if (config) {
		githubToken = config.token;
		repoOwner = config.owner;
		repoName = config.repo;
		branch = config.branch;
		needsReauth = false;
	} else if (cloudConfigured) {
		needsReauth = true;
	}
}

async function fetchPosts() {
	loading = true;
	error = "";
	try {
		const resp = await fetch(`/api/allPostMeta.json?t=${Date.now()}`);
		if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
		posts = await resp.json();
		categories = [...new Set(posts.map((p) => p.category).filter(Boolean))].sort();

		// 从 GitHub 实时同步，过滤已删除的文章
		syncStatus = "syncing";
		try {
			let repo: RepoInfo | null = null;
			if (repoOwner && repoName) {
				repo = { owner: repoOwner, repo: repoName, branch };
			} else {
				repo = await getRepoInfo();
			}

			if (repo) {
				const fileList = await fetchPostFileList(repo, githubToken || undefined);
				if (fileList) {
					const beforeCount = posts.length;
					posts = posts.filter((p) => postExistsInList(p.id, fileList));
					hiddenCount = beforeCount - posts.length;
					categories = [...new Set(posts.map((p) => p.category).filter(Boolean))].sort();
					syncStatus = "synced";
				} else {
					syncStatus = "failed";
				}
			} else {
				syncStatus = "failed";
			}
		} catch {
			syncStatus = "failed";
		}
	} catch (e) {
		error = e instanceof Error ? e.message : String(e);
	}
	loading = false;
}

function clearClientCaches() {
	try {
		const w = window as any;
		if (w.__allPostMetaCache) {
			delete w.__allPostMetaCache;
		}
		if (w.swup?.cache?.empty) {
			w.swup.cache.empty();
		}
	} catch {
		// ignore cache errors
	}
}

$: filteredPosts = posts.filter((p) => {
	if (searchQuery) {
		const q = searchQuery.toLowerCase();
		if (
			!p.title.toLowerCase().includes(q) &&
			!p.id.toLowerCase().includes(q) &&
			!p.tags.some((t) => t.toLowerCase().includes(q))
		)
			return false;
	}
	if (filterCategory !== "") {
		if (filterCategory === "__none__") {
			if (p.category) return false;
		} else if (p.category !== filterCategory) return false;
	}
	return true;
});

function toggleSelectAll() {
	if (selectAll) {
		selectedIds = new Set();
		selectAll = false;
	} else {
		selectedIds = new Set(filteredPosts.map((p) => p.id));
		selectAll = true;
	}
}

function toggleSelect(id: string) {
	if (selectedIds.has(id)) {
		selectedIds.delete(id);
	} else {
		selectedIds.add(id);
	}
	selectedIds = new Set(selectedIds);
	selectAll = filteredPosts.length > 0 && filteredPosts.every((p) => selectedIds.has(p.id));
}

function formatDate(ts: number): string {
	const d = new Date(ts);
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function showStatus(msg: string, type: "info" | "success" | "error") {
	statusMsg = msg;
	statusType = type;
	if (type !== "info") {
		setTimeout(() => {
			statusMsg = "";
		}, 5000);
	}
}

async function saveSettings() {
	isSavingSettings = true;
	showStatus("正在保存...", "info");

	const config: GithubConfig = {
		token: githubToken,
		owner: repoOwner,
		repo: repoName,
		branch,
	};

	const result = await saveGithubConfig(config);

	if (result.cloud) {
		showStatus("设置已同步到云端", "success");
		cloudConfigured = true;
		needsReauth = false;
	} else if (result.local) {
		showStatus(`已保存到本地${result.error ? `（云端: ${result.error}）` : ""}`, "success");
	} else {
		showStatus(`保存失败: ${result.error || "未知错误"}`, "error");
	}

	isSavingSettings = false;
}

function checkGithubConfig(): boolean {
	if (!githubToken || !repoOwner || !repoName) {
		showStatus("请先在设置中填写 GitHub 信息", "error");
		showSettings = true;
		return false;
	}
	return true;
}

async function getGithubHeaders(): Promise<HeadersInit> {
	return {
		Authorization: `Bearer ${githubToken}`,
		Accept: "application/vnd.github+json",
		"Content-Type": "application/json",
	};
}

async function getFileSha(path: string): Promise<{ sha: string; path: string } | null> {
	const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}?ref=${branch}`;
	const resp = await fetch(url, { headers: await getGithubHeaders() });
	if (resp.ok) {
		const data = await resp.json();
		return { sha: data.sha, path };
	}
	return null;
}

/**
 * 尝试多种路径变体获取文件 SHA
 * post.id 可能包含或不包含扩展名，依次尝试
 */
async function getFileShaSmart(postId: string): Promise<{ sha: string; path: string } | null> {
	// 1. 直接用 postId（已包含扩展名的情况）
	let result = await getFileSha(`src/content/posts/${postId}`);
	if (result) return result;

	// 2. 尝试加 .md 扩展名
	if (!/\.(md|mdx|markdown)$/i.test(postId)) {
		result = await getFileSha(`src/content/posts/${postId}.md`);
		if (result) return result;
		// 3. 尝试加 .mdx 扩展名
		result = await getFileSha(`src/content/posts/${postId}.mdx`);
		if (result) return result;
	}

	return null;
}

async function fetchFileContent(path: string): Promise<{ content: string; sha: string } | null> {
	const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}?ref=${branch}`;
	const resp = await fetch(url, { headers: await getGithubHeaders() });
	if (resp.ok) {
		const data = await resp.json();
		const binary = atob(data.content.replace(/\n/g, ""));
		const bytes = new Uint8Array(binary.length);
		for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
		const content = new TextDecoder().decode(bytes);
		return { content, sha: data.sha };
	}
	return null;
}

/**
 * 智能获取文件内容（尝试多种路径变体）
 */
async function fetchFileContentSmart(postId: string): Promise<{ content: string; sha: string; path: string } | null> {
	// 1. 直接用 postId
	let result = await fetchFileContent(`src/content/posts/${postId}`);
	if (result) return { ...result, path: `src/content/posts/${postId}` };

	// 2. 尝试加扩展名
	if (!/\.(md|mdx|markdown)$/i.test(postId)) {
		result = await fetchFileContent(`src/content/posts/${postId}.md`);
		if (result) return { ...result, path: `src/content/posts/${postId}.md` };
		result = await fetchFileContent(`src/content/posts/${postId}.mdx`);
		if (result) return { ...result, path: `src/content/posts/${postId}.mdx` };
	}

	return null;
}

async function updateFileContent(
	path: string,
	newContent: string,
	sha: string,
	commitMsg: string,
): Promise<boolean> {
	const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`;
	const encoded = utf8ToBase64(newContent);
	const resp = await fetch(url, {
		method: "PUT",
		headers: await getGithubHeaders(),
		body: JSON.stringify({
			message: commitMsg,
			content: encoded,
			branch,
			sha,
		}),
	});
	return resp.ok;
}

async function deleteFile(path: string, sha: string, commitMsg: string): Promise<boolean> {
	const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`;
	const resp = await fetch(url, {
		method: "DELETE",
		headers: await getGithubHeaders(),
		body: JSON.stringify({
			message: commitMsg,
			sha,
			branch,
		}),
	});
	return resp.ok;
}

function utf8ToBase64(str: string): string {
	const bytes = new TextEncoder().encode(str);
	let binary = "";
	for (let i = 0; i < bytes.length; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return btoa(binary);
}

function base64ToUtf8(b64: string): string {
	const binary = atob(b64.replace(/\n/g, ""));
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) {
		bytes[i] = binary.charCodeAt(i);
	}
	return new TextDecoder().decode(bytes);
}

function parseFrontmatter(raw: string): { fm: Record<string, string>; body: string; fmRaw: string } {
	const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
	if (!match) return { fm: {}, body: raw, fmRaw: "" };
	const fmRaw = match[1];
	const body = match[2];
	const fm: Record<string, string> = {};
	const lines = fmRaw.split("\n");
	for (const line of lines) {
		const idx = line.indexOf(":");
		if (idx === -1) continue;
		const key = line.substring(0, idx).trim();
		const val = line.substring(idx + 1).trim();
		fm[key] = val;
	}
	return { fm, body, fmRaw };
}

function rebuildFrontmatter(fmRaw: string, changes: Record<string, string | null>): string {
	const lines = fmRaw.split("\n");
	const keysHandled = new Set<string>();
	const result: string[] = [];

	for (const line of lines) {
		const idx = line.indexOf(":");
		if (idx === -1) {
			result.push(line);
			continue;
		}
		const key = line.substring(0, idx).trim();
		if (key in changes) {
			keysHandled.add(key);
			if (changes[key] !== null) {
				result.push(`${key}: ${changes[key]}`);
			}
		} else {
			result.push(line);
		}
	}

	for (const [key, val] of Object.entries(changes)) {
		if (!keysHandled.has(key) && val !== null) {
			result.push(`${key}: ${val}`);
		}
	}

	return result.join("\n");
}

function rebuildMarkdown(fmRaw: string, body: string, changes: Record<string, string | null>): string {
	const newFm = rebuildFrontmatter(fmRaw, changes);
	return `---\n${newFm}\n---\n${body}`;
}

async function changePostCategory(postId: string, newCategory: string) {
	if (!checkGithubConfig()) return;
	isProcessing = true;
	showStatus(`正在修改「${postId}」的分类...`, "info");

	try {
		const fileData = await fetchFileContentSmart(postId);
		if (!fileData) {
			showStatus(`无法获取文件: ${postId}`, "error");
			isProcessing = false;
			return;
		}

		const raw = fileData.content;
		const { fmRaw, body } = parseFrontmatter(raw);

		let changes: Record<string, string | null>;
		if (newCategory) {
			changes = { category: newCategory };
		} else {
			changes = { category: null };
		}

		const newMarkdown = rebuildMarkdown(fmRaw, body, changes);
		const commitMsg = `修改分类: ${postId} -> ${newCategory || "无"}`;
		const success = await updateFileContent(fileData.path, newMarkdown, fileData.sha, commitMsg);

		if (success) {
			const post = posts.find((p) => p.id === postId);
			if (post) post.category = newCategory;
			categories = [...new Set(posts.map((p) => p.category).filter(Boolean))].sort();
			showStatus(`「${postId}」分类已修改为「${newCategory || "无"}」`, "success");
		} else {
			showStatus(`修改失败: ${postId}`, "error");
		}
	} catch (e) {
		showStatus(`错误: ${e instanceof Error ? e.message : String(e)}`, "error");
	}
	isProcessing = false;
}

async function batchChangeCategory() {
	if (!checkGithubConfig()) return;
	if (selectedIds.size === 0) {
		showStatus("请先选择文章", "error");
		return;
	}
	showBatchCategoryModal = false;
	isProcessing = true;
	const ids = [...selectedIds];
	let successCount = 0;
	let failCount = 0;

	for (let i = 0; i < ids.length; i++) {
		showStatus(`正在批量修改分类 (${i + 1}/${ids.length})...`, "info");
		try {
			const fileData = await fetchFileContentSmart(ids[i]);
			if (!fileData) {
				failCount++;
				continue;
			}
			const raw = fileData.content;
			const { fmRaw, body } = parseFrontmatter(raw);
			const changes: Record<string, string | null> = batchCategoryValue
				? { category: batchCategoryValue }
				: { category: null };
			const newMarkdown = rebuildMarkdown(fmRaw, body, changes);
			const commitMsg = `批量修改分类: ${ids[i]} -> ${batchCategoryValue || "无"}`;
			const success = await updateFileContent(fileData.path, newMarkdown, fileData.sha, commitMsg);
			if (success) {
				successCount++;
				const post = posts.find((p) => p.id === ids[i]);
				if (post) post.category = batchCategoryValue;
			} else {
				failCount++;
			}
		} catch {
			failCount++;
		}
	}

	categories = [...new Set(posts.map((p) => p.category).filter(Boolean))].sort();
	showStatus(`批量修改完成: 成功 ${successCount} 篇, 失败 ${failCount} 篇`, successCount > 0 ? "success" : "error");
	selectedIds = new Set();
	selectAll = false;
	isProcessing = false;
}

async function deletePost(postId: string) {
	if (!checkGithubConfig()) return;
	isProcessing = true;
	showStatus(`正在删除「${postId}」...`, "info");

	try {
		const fileInfo = await getFileShaSmart(postId);
		if (!fileInfo) {
			showStatus(`无法找到文件: ${postId}（请检查仓库中是否存在此文件）`, "error");
			isProcessing = false;
			return;
		}
		const commitMsg = `删除文章: ${postId}`;
		const success = await deleteFile(fileInfo.path, fileInfo.sha, commitMsg);
		if (success) {
			posts = posts.filter((p) => p.id !== postId);
			categories = [...new Set(posts.map((p) => p.category).filter(Boolean))].sort();
			clearClientCaches();
			showStatus(`「${postId}」已删除`, "success");
		} else {
			showStatus(`删除失败: ${postId}`, "error");
		}
	} catch (e) {
		showStatus(`错误: ${e instanceof Error ? e.message : String(e)}`, "error");
	}
	isProcessing = false;
}

async function batchDelete() {
	if (!checkGithubConfig()) return;
	if (selectedIds.size === 0) {
		showStatus("请先选择文章", "error");
		return;
	}
	showBatchDeleteConfirm = false;
	isProcessing = true;
	const ids = [...selectedIds];
	let successCount = 0;
	let failCount = 0;

	for (let i = 0; i < ids.length; i++) {
		showStatus(`正在批量删除 (${i + 1}/${ids.length})...`, "info");
		try {
			const fileInfo = await getFileShaSmart(ids[i]);
			if (!fileInfo) {
				failCount++;
				continue;
			}
			const commitMsg = `批量删除文章: ${ids[i]}`;
			const success = await deleteFile(fileInfo.path, fileInfo.sha, commitMsg);
			if (success) {
				successCount++;
			} else {
				failCount++;
			}
		} catch {
			failCount++;
		}
	}

	posts = posts.filter((p) => !selectedIds.has(p.id));
	categories = [...new Set(posts.map((p) => p.category).filter(Boolean))].sort();
	clearClientCaches();
	showStatus(`批量删除完成: 成功 ${successCount} 篇, 失败 ${failCount} 篇`, successCount > 0 ? "success" : "error");
	selectedIds = new Set();
	selectAll = false;
	isProcessing = false;
}

function editPost(postId: string) {
	window.location.href = `/admin/new-post/?edit=${encodeURIComponent(postId)}`;
}

function viewPost(postId: string) {
	window.open(`/posts/${postId}/`, "_blank");
}

function logout() {
	localStorage.removeItem("firefly_admin_authed");
	window.location.href = "/";
}

function startEditCategory(postId: string, currentCategory: string) {
	editingCategoryFor = postId;
	editCategoryValue = currentCategory;
}

function confirmEditCategory(postId: string) {
	changePostCategory(postId, editCategoryValue);
	editingCategoryFor = null;
}

function cancelEditCategory() {
	editingCategoryFor = null;
}

$: selectedCount = selectedIds.size;
</script>

{#if !authChecked}
	<div class="flex items-center justify-center h-96">
		<div class="text-neutral-400">正在验证管理员身份...</div>
	</div>
{:else if authed}
	<div class="w-full max-w-(--page-width) mx-auto px-2">
		<!-- Header -->
		<div class="flex items-center justify-between mb-4">
			<h1 class="text-xl font-bold">文章管理</h1>
			<div class="flex gap-2">
				<a
					href="/admin/new-post/"
					class="btn-plain scale-animation rounded-lg h-9 px-3 text-sm font-medium active:scale-95 flex items-center"
				>
					<span>新建</span>
				</a>
				<button
					on:click={() => (showSettings = !showSettings)}
					class="btn-plain scale-animation rounded-lg h-9 px-3 text-sm font-medium active:scale-95 flex items-center"
				>
					<span>设置</span>
				</button>
				<button
					on:click={logout}
					class="btn-plain scale-animation rounded-lg h-9 px-3 text-sm font-medium active:scale-95"
				>
					退出
				</button>
			</div>
		</div>

		<!-- Settings Panel -->
		{#if showSettings}
			<div class="card-base p-4 rounded-xl mb-4">
				<h2 class="text-sm font-bold mb-3">GitHub 配置</h2>

				{#if needsReauth}
					<div class="mb-3 px-3 py-2 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 text-sm">
						检测到云端配置，但需要重新输入管理员密码才能解密。请退出管理员模式后重新双击头像输入密码。
					</div>
				{/if}

				<div class="mb-3 flex items-center gap-2 text-xs">
					{#if cloudConfigured}
						<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/15 text-green-600 dark:text-green-400 font-medium">
							云端配置已同步
						</span>
					{:else}
						<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-500/15 text-neutral-500 font-medium">
							未配置云端同步
						</span>
					{/if}
					<span class="text-neutral-400">保存后配置将加密同步到云端，所有设备共享</span>
				</div>

				<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
					<div class="sm:col-span-2">
						<label class="block text-xs font-medium mb-1 text-neutral-400">GitHub Token</label>
						<input
							type="password"
							bind:value={githubToken}
							placeholder="ghp_xxxxxxxxxxxx"
							class="w-full rounded-lg border border-(--btn-regular-bg-hover) bg-(--card-bg) px-3 py-2 text-sm outline-none focus:border-(--primary) transition"
						/>
					</div>
					<div>
						<label class="block text-xs font-medium mb-1 text-neutral-400">仓库所有者</label>
						<input
							type="text"
							bind:value={repoOwner}
							placeholder="CuteLeaf"
							class="w-full rounded-lg border border-(--btn-regular-bg-hover) bg-(--card-bg) px-3 py-2 text-sm outline-none focus:border-(--primary) transition"
						/>
					</div>
					<div>
						<label class="block text-xs font-medium mb-1 text-neutral-400">仓库名称</label>
						<input
							type="text"
							bind:value={repoName}
							placeholder="Firefly"
							class="w-full rounded-lg border border-(--btn-regular-bg-hover) bg-(--card-bg) px-3 py-2 text-sm outline-none focus:border-(--primary) transition"
						/>
					</div>
					<div>
						<label class="block text-xs font-medium mb-1 text-neutral-400">分支</label>
						<input
							type="text"
							bind:value={branch}
							placeholder="main"
							class="w-full rounded-lg border border-(--btn-regular-bg-hover) bg-(--card-bg) px-3 py-2 text-sm outline-none focus:border-(--primary) transition"
						/>
					</div>
				</div>
				<button
					on:click={saveSettings}
					disabled={isSavingSettings}
					class="mt-3 btn-regular rounded-lg h-9 px-4 text-sm font-bold active:scale-95 transition disabled:opacity-50"
				>
					{#if isSavingSettings}正在保存...{:else}保存设置{/if}
				</button>
			</div>
		{/if}

		<!-- Status -->
		{#if statusMsg}
			<div
				class="mb-3 px-4 py-2 rounded-lg text-sm font-medium transition {statusType === 'success'
					? 'bg-green-500/15 text-green-600 dark:text-green-400'
					: statusType === 'error'
						? 'bg-red-500/15 text-red-600 dark:text-red-400'
						: 'bg-blue-500/15 text-blue-600 dark:text-blue-400'}"
			>
				{#if isProcessing}
					<span class="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></span>
				{/if}
				{statusMsg}
			</div>
		{/if}

		<!-- Toolbar -->
		<div class="card-base p-3 rounded-xl mb-4">
			<div class="flex flex-wrap items-center gap-2">
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="搜索标题/ID/标签..."
					class="flex-1 min-w-[12rem] rounded-lg border border-(--btn-regular-bg-hover) bg-(--card-bg) px-3 py-2 text-sm outline-none focus:border-(--primary) transition"
				/>
				<select
					bind:value={filterCategory}
					class="rounded-lg border border-(--btn-regular-bg-hover) bg-(--card-bg) px-3 py-2 text-sm outline-none focus:border-(--primary) transition"
				>
					<option value="">全部分类</option>
					<option value="__none__">未分类</option>
					{#each categories as cat}
						<option value={cat}>{cat}</option>
					{/each}
				</select>
				<button
					on:click={fetchPosts}
					class="btn-plain scale-animation rounded-lg h-9 px-3 text-sm font-medium active:scale-95"
				>
					刷新
				</button>
				{#if syncStatus === "syncing"}
					<span class="text-xs text-neutral-400 flex items-center gap-1">
						<span class="inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
						正在从 GitHub 同步...
					</span>
				{:else if syncStatus === "synced" && hiddenCount > 0}
					<span class="text-xs text-amber-500">已隐藏 {hiddenCount} 篇已删除文章</span>
				{:else if syncStatus === "synced"}
					<span class="text-xs text-green-500">已与 GitHub 同步</span>
				{:else if syncStatus === "failed"}
					<span class="text-xs text-neutral-400">同步失败，显示静态列表</span>
				{/if}
			</div>

			<!-- Batch Actions -->
			{#if selectedCount > 0}
				<div class="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-(--btn-regular-bg-hover)">
					<span class="text-sm text-neutral-400">已选 {selectedCount} 篇</span>
					<button
						on:click={() => (showBatchCategoryModal = true)}
						disabled={isProcessing}
						class="btn-plain scale-animation rounded-lg h-8 px-3 text-sm font-medium active:scale-90 disabled:opacity-50"
					>
						批量修改分类
					</button>
					<button
						on:click={() => (showBatchDeleteConfirm = true)}
						disabled={isProcessing}
						class="rounded-lg h-8 px-3 text-sm font-medium active:scale-90 transition bg-red-500/15 text-red-600 dark:text-red-400 disabled:opacity-50"
					>
						批量删除
					</button>
					<button
						on:click={() => { selectedIds = new Set(); selectAll = false; }}
						disabled={isProcessing}
						class="btn-plain scale-animation rounded-lg h-8 px-3 text-sm font-medium active:scale-90 disabled:opacity-50"
					>
						取消选择
					</button>
				</div>
			{/if}
		</div>

		<!-- Loading -->
		{#if loading}
			<div class="flex items-center justify-center h-48">
				<div class="text-neutral-400">正在加载文章列表...</div>
			</div>
		{:else if error}
			<div class="card-base p-4 rounded-xl text-red-500 text-sm">{error}</div>
		{:else if filteredPosts.length === 0}
			<div class="card-base p-8 rounded-xl text-center text-neutral-400">
				{posts.length === 0 ? "暂无文章" : "没有匹配的文章"}
			</div>
		{:else}
			<!-- Table -->
			<div class="card-base rounded-xl overflow-hidden">
				<!-- Desktop Table -->
				<table class="w-full hidden md:table">
					<thead>
						<tr class="border-b border-(--btn-regular-bg-hover)">
							<th class="p-3 text-left w-10">
								<input
									type="checkbox"
									checked={selectAll}
									on:change={toggleSelectAll}
									class="w-4 h-4 accent-(--primary) cursor-pointer"
								/>
							</th>
							<th class="p-3 text-left text-xs font-medium text-neutral-400">标题</th>
							<th class="p-3 text-left text-xs font-medium text-neutral-400 w-32">分类</th>
							<th class="p-3 text-left text-xs font-medium text-neutral-400 w-28">发布日期</th>
							<th class="p-3 text-left text-xs font-medium text-neutral-400 w-20">状态</th>
							<th class="p-3 text-left text-xs font-medium text-neutral-400 w-32">操作</th>
						</tr>
					</thead>
					<tbody>
						{#each filteredPosts as post (post.id)}
							<tr class="border-b border-(--btn-regular-bg-hover)/50 hover:bg-(--btn-regular-bg-hover)/10 transition">
								<td class="p-3">
									<input
										type="checkbox"
										checked={selectedIds.has(post.id)}
										on:change={() => toggleSelect(post.id)}
										class="w-4 h-4 accent-(--primary) cursor-pointer"
									/>
								</td>
								<td class="p-3">
									<div class="font-medium text-sm truncate max-w-xs">{post.title}</div>
									<div class="text-xs text-neutral-400 truncate max-w-xs">{post.id}</div>
								</td>
								<td class="p-3">
									{#if editingCategoryFor === post.id}
										<div class="flex items-center gap-1">
											<input
												type="text"
												bind:value={editCategoryValue}
												placeholder="分类名"
												class="w-20 rounded border border-(--btn-regular-bg-hover) bg-(--card-bg) px-2 py-1 text-xs outline-none focus:border-(--primary)"
												on:keydown={(e) => { if (e.key === 'Enter') confirmEditCategory(post.id); if (e.key === 'Escape') cancelEditCategory(); }}
											/>
											<button on:click={() => confirmEditCategory(post.id)} class="text-xs text-green-500 px-1">确认</button>
											<button on:click={cancelEditCategory} class="text-xs text-red-500 px-1">取消</button>
										</div>
									{:else}
										<button
											on:click={() => startEditCategory(post.id, post.category)}
											class="text-xs px-2 py-1 rounded hover:bg-(--btn-regular-bg-hover)/20 transition cursor-pointer"
											title="点击修改分类"
										>
											{#if post.category}{post.category}{:else}<span class="text-neutral-400">未分类</span>{/if}
										</button>
									{/if}
								</td>
								<td class="p-3 text-sm text-neutral-400">{formatDate(post.published)}</td>
								<td class="p-3">
									<div class="flex flex-wrap gap-1">
										{#if post.draft}<span class="text-xs px-1.5 py-0.5 rounded bg-yellow-500/15 text-yellow-600 dark:text-yellow-400">草稿</span>{/if}
										{#if post.pinned}<span class="text-xs px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-600 dark:text-blue-400">置顶</span>{/if}
										{#if post.password}<span class="text-xs px-1.5 py-0.5 rounded bg-purple-500/15 text-purple-600 dark:text-purple-400">加密</span>{/if}
										{#if !post.draft && !post.pinned && !post.password}<span class="text-xs text-neutral-400">已发布</span>{/if}
									</div>
								</td>
								<td class="p-3">
									<div class="flex items-center gap-1">
										<button on:click={() => editPost(post.id)} class="btn-plain rounded h-7 px-2 flex items-center justify-center text-xs font-medium active:scale-90 transition">编辑</button>
										<button on:click={() => viewPost(post.id)} class="btn-plain rounded h-7 px-2 flex items-center justify-center text-xs font-medium active:scale-90 transition">查看</button>
										<button on:click={() => (deleteConfirmId = post.id)} class="rounded h-7 px-2 flex items-center justify-center text-xs font-medium active:scale-90 transition text-red-500 hover:bg-red-500/10">删除</button>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>

				<!-- Mobile Cards -->
				<div class="md:hidden divide-y divide-(--btn-regular-bg-hover)/50">
					<div class="flex items-center gap-3 p-3">
						<input
							type="checkbox"
							checked={selectAll}
							on:change={toggleSelectAll}
							class="w-4 h-4 accent-(--primary) cursor-pointer"
						/>
						<span class="text-xs text-neutral-400">全选 ({filteredPosts.length} 篇)</span>
					</div>
					{#each filteredPosts as post (post.id)}
						<div class="p-3">
							<div class="flex items-start gap-2">
								<input
									type="checkbox"
									checked={selectedIds.has(post.id)}
									on:change={() => toggleSelect(post.id)}
									class="w-4 h-4 accent-(--primary) cursor-pointer mt-1 flex-shrink-0"
								/>
								<div class="flex-1 min-w-0">
									<div class="font-medium text-sm truncate">{post.title}</div>
									<div class="text-xs text-neutral-400 truncate">{post.id}</div>
									<div class="flex flex-wrap gap-1 mt-1">
										{#if post.category}<span class="text-xs px-1.5 py-0.5 rounded bg-(--btn-regular-bg-hover)/30">{post.category}</span>{/if}
										<span class="text-xs text-neutral-400">{formatDate(post.published)}</span>
										{#if post.draft}<span class="text-xs px-1.5 py-0.5 rounded bg-yellow-500/15 text-yellow-600 dark:text-yellow-400">草稿</span>{/if}
										{#if post.pinned}<span class="text-xs px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-600 dark:text-blue-400">置顶</span>{/if}
									</div>
									<div class="flex items-center gap-1 mt-2">
										<button on:click={() => editPost(post.id)} class="btn-plain rounded h-7 px-2 text-xs font-medium active:scale-90 transition">编辑</button>
										<button on:click={() => viewPost(post.id)} class="btn-plain rounded h-7 px-2 text-xs font-medium active:scale-90 transition">查看</button>
										<button on:click={() => (deleteConfirmId = post.id)} class="rounded h-7 px-2 text-xs font-medium active:scale-90 transition text-red-500">删除</button>
										<button on:click={() => startEditCategory(post.id, post.category)} class="btn-plain rounded h-7 px-2 text-xs font-medium active:scale-90 transition">改分类</button>
									</div>
									{#if editingCategoryFor === post.id}
										<div class="flex items-center gap-1 mt-2">
											<input
												type="text"
												bind:value={editCategoryValue}
												placeholder="分类名"
												class="flex-1 rounded border border-(--btn-regular-bg-hover) bg-(--card-bg) px-2 py-1 text-xs outline-none focus:border-(--primary)"
												on:keydown={(e) => { if (e.key === 'Enter') confirmEditCategory(post.id); if (e.key === 'Escape') cancelEditCategory(); }}
											/>
											<button on:click={() => confirmEditCategory(post.id)} class="text-xs text-green-500 px-2">确认</button>
											<button on:click={cancelEditCategory} class="text-xs text-red-500 px-2">取消</button>
										</div>
									{/if}
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="text-xs text-neutral-400 mt-2 text-center">
				共 {filteredPosts.length} 篇文章{filterCategory || searchQuery ? ` (总计 ${posts.length} 篇)` : ""}
			</div>
		{/if}
	</div>
{/if}

<style>
.del-modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100vw;
	height: 100vh;
	z-index: 2147483647;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(0, 0, 0, 0.55);
	backdrop-filter: blur(4px);
	-webkit-backdrop-filter: blur(4px);
	padding: 1rem;
	box-sizing: border-box;
	overflow: hidden;
}
.del-modal-card {
	background: var(--card-bg, #fff);
	border-radius: 1rem;
	padding: 1.5rem;
	width: 100%;
	max-width: 24rem;
	box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
	animation: del-modal-in 0.2s ease-out;
}
@keyframes del-modal-in {
	from { transform: scale(0.95); opacity: 0; }
	to { transform: scale(1); opacity: 1; }
}
.del-modal-title {
	font-size: 1.125rem;
	font-weight: 700;
	margin-bottom: 1rem;
	color: #ef4444;
}
.del-modal-desc {
	font-size: 0.875rem;
	color: var(--meta-color, #888);
	margin-bottom: 1rem;
	line-height: 1.5;
}
.del-modal-actions {
	display: flex;
	gap: 0.5rem;
}
.del-modal-btn {
	flex: 1;
	height: 2.5rem;
	border-radius: 0.5rem;
	font-weight: 700;
	font-size: 0.875rem;
	cursor: pointer;
	transition: transform 0.1s;
	border: none;
}
.del-modal-btn:active {
	transform: scale(0.95);
}
.del-modal-btn-danger {
	background: #ef4444;
	color: #fff;
}
.del-modal-btn-danger:hover {
	background: #dc2626;
}
.del-modal-btn-cancel {
	background: var(--btn-regular-bg-hover, rgba(128,128,128,0.15));
	color: var(--deep-text, inherit);
}
.del-modal-input {
	width: 100%;
	border-radius: 0.5rem;
	border: 1px solid var(--btn-regular-bg-hover, rgba(128,128,128,0.3));
	background: var(--card-bg, #fff);
	padding: 0.5rem 0.75rem;
	font-size: 0.875rem;
	outline: none;
	margin-bottom: 1rem;
	transition: border-color 0.15s;
	color: var(--deep-text, inherit);
	box-sizing: border-box;
}
.del-modal-input:focus {
	border-color: var(--primary, #3b82f6);
}
:global(html.dark) .del-modal-card {
	background: var(--card-bg, #1a1a2e);
}
:global(html.dark) .del-modal-desc {
	color: rgba(255,255,255,0.5);
}
</style>

<!-- Batch Category Modal -->
{#if showBatchCategoryModal}
	<div class="del-modal-overlay" on:click|self={() => (showBatchCategoryModal = false)}>
		<div class="del-modal-card">
			<h2 class="del-modal-title" style="color: var(--primary, #3b82f6);">批量修改分类</h2>
			<p class="del-modal-desc">将选中的 {selectedCount} 篇文章的分类修改为：</p>
			<input
				type="text"
				bind:value={batchCategoryValue}
				placeholder="输入新分类名（留空则移除分类）"
				class="del-modal-input"
				on:keydown={(e) => { if (e.key === 'Enter') batchChangeCategory(); }}
			/>
			<div class="del-modal-actions">
				<button on:click={batchChangeCategory} class="del-modal-btn del-modal-btn-danger" style="background: var(--primary, #3b82f6);">确认</button>
				<button on:click={() => (showBatchCategoryModal = false)} class="del-modal-btn del-modal-btn-cancel">取消</button>
			</div>
		</div>
	</div>
{/if}

<!-- Batch Delete Confirm -->
{#if showBatchDeleteConfirm}
	<div class="del-modal-overlay" on:click|self={() => (showBatchDeleteConfirm = false)}>
		<div class="del-modal-card">
			<h2 class="del-modal-title">确认批量删除</h2>
			<p class="del-modal-desc">确定要删除选中的 {selectedCount} 篇文章吗？此操作不可撤销，将通过 GitHub API 提交删除。</p>
			<div class="del-modal-actions">
				<button on:click={batchDelete} class="del-modal-btn del-modal-btn-danger">确认删除</button>
				<button on:click={() => (showBatchDeleteConfirm = false)} class="del-modal-btn del-modal-btn-cancel">取消</button>
			</div>
		</div>
	</div>
{/if}

<!-- Single Delete Confirm -->
{#if deleteConfirmId}
	<div class="del-modal-overlay" on:click|self={() => (deleteConfirmId = null)}>
		<div class="del-modal-card">
			<h2 class="del-modal-title">确认删除</h2>
			<p class="del-modal-desc">
				确定要删除「{posts.find((p) => p.id === deleteConfirmId)?.title || deleteConfirmId}」吗？此操作不可撤销。
			</p>
			<div class="del-modal-actions">
				<button on:click={() => { deletePost(deleteConfirmId); deleteConfirmId = null; }} class="del-modal-btn del-modal-btn-danger">确认删除</button>
				<button on:click={() => (deleteConfirmId = null)} class="del-modal-btn del-modal-btn-cancel">取消</button>
			</div>
		</div>
	</div>
{/if}
