/**
 * 从 GitHub 实时获取文章内容与目录的工具
 *
 * 用于将静态文章页面转为动态：
 * - 文章详情：从 raw.githubusercontent.com 拉取 Markdown 原文并客户端渲染
 * - 文章列表：用 GitHub Trees API 获取目录列表，比对静态数据移除已删除文章
 *
 * 公开仓库无需 Token 即可访问 raw 内容和 Trees API（有速率限制 60次/小时/IP）。
 */

export interface RepoInfo {
	owner: string;
	repo: string;
	branch: string;
}

let cachedRepoInfo: RepoInfo | null = null;
let repoInfoPromise: Promise<RepoInfo | null> | null = null;

/**
 * 从 /admin-config.json 获取仓库信息（云端配置）
 * 公开仓库即使没有配置 Token 也能读取 raw 内容
 */
export async function getRepoInfo(): Promise<RepoInfo | null> {
	if (cachedRepoInfo) return cachedRepoInfo;
	if (repoInfoPromise) return repoInfoPromise;

	repoInfoPromise = (async () => {
		try {
			const resp = await fetch(`/admin-config.json?t=${Date.now()}`);
			if (!resp.ok) return null;
			const data = await resp.json();
			if (!data?.owner || !data?.repo) return null;
			cachedRepoInfo = {
				owner: data.owner,
				repo: data.repo,
				branch: data.branch || "main",
			};
			return cachedRepoInfo;
		} catch {
			return null;
		}
	})();

	return repoInfoPromise;
}

/**
 * 从 GitHub raw 获取文章 Markdown 原文
 * 返回 null 表示文件不存在（文章已删除）
 * 智能尝试多种路径变体（带/不带 .md/.mdx 扩展名）
 * 同时尝试 raw.githubusercontent.com 和 GitHub API 两个源
 */
export async function fetchPostRaw(
	repo: RepoInfo,
	postId: string,
): Promise<string | null> {
	// 智能尝试多种路径变体
	const basePath = `src/content/posts/${postId}`;
	const pathVariants = [basePath];
	if (!/\.(md|mdx|markdown)$/i.test(postId)) {
		pathVariants.push(`${basePath}.md`, `${basePath}.mdx`);
	}

	// 第一轮：尝试 raw.githubusercontent.com
	for (const p of pathVariants) {
		const url = `https://raw.githubusercontent.com/${repo.owner}/${repo.repo}/${repo.branch}/${p}?t=${Date.now()}`;
		try {
			const resp = await fetch(url);
			if (resp.ok) return await resp.text();
		} catch {
			// 网络错误，继续尝试
		}
	}

	// 第二轮：尝试 GitHub Contents API（带 base64 解码）
	const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
	for (const p of pathVariants) {
		const url = `https://api.github.com/repos/${repo.owner}/${repo.repo}/contents/${p}?ref=${repo.branch}`;
		try {
			const resp = await fetch(url, { headers });
			if (resp.ok) {
				const data = await resp.json();
				if (data.content) {
					const binary = atob(data.content.replace(/\n/g, ""));
					const bytes = new Uint8Array(binary.length);
					for (let i = 0; i < binary.length; i++) {
						bytes[i] = binary.charCodeAt(i);
					}
					return new TextDecoder().decode(bytes);
				}
			}
		} catch {
			// 网络错误，继续尝试
		}
	}

	return null;
}

export interface PostFrontmatter {
	title: string;
	description: string;
	published: string;
	updated?: string;
	tags: string[];
	category: string;
	draft: boolean;
	pinned: boolean;
	image: string;
	password: string;
	lang: string;
	author: string;
	licenseName: string;
	licenseUrl: string;
	sourceLink: string;
	comment: boolean;
}

export interface ParsedPost {
	frontmatter: PostFrontmatter;
	body: string;
}

/**
 * 解析 Markdown frontmatter
 */
export function parsePostMarkdown(raw: string): ParsedPost {
	const fm: Record<string, string> = {};
	let body = raw;

	const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
	if (match) {
		const fmRaw = match[1];
		body = match[2];
		for (const line of fmRaw.split("\n")) {
			const idx = line.indexOf(":");
			if (idx === -1) continue;
			const key = line.substring(0, idx).trim();
			const val = line.substring(idx + 1).trim();
			fm[key] = val;
		}
	}

	const tagsRaw = fm.tags?.replace(/[\[\]]/g, "") || "";
	const tags = tagsRaw
		? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
		: [];

	return {
		frontmatter: {
			title: fm.title || "无标题",
			description: fm.description || "",
			published: fm.published || "",
			updated: fm.updated || undefined,
			tags,
			category: fm.category || "",
			draft: fm.draft === "true",
			pinned: fm.pinned === "true",
			image: fm.image || "",
			password: fm.password || "",
			lang: fm.lang || "",
			author: fm.author || "",
			licenseName: fm.licenseName || "",
			licenseUrl: fm.licenseUrl || "",
			sourceLink: fm.sourceLink || "",
			comment: fm.comment !== "false",
		},
		body,
	};
}

/**
 * 通过 GitHub Trees API 获取 src/content/posts 目录下所有文件
 * 返回文件路径数组（相对于 posts 目录），如 ["firefly.md", "subdir/test.md"]
 *
 * 如果提供 token，使用认证请求（5000次/小时）；否则匿名请求（60次/小时/IP）
 */
export async function fetchPostFileList(repo: RepoInfo, token?: string): Promise<string[] | null> {
	try {
		// 使用 recursive=1 递归获取目录树
		const url = `https://api.github.com/repos/${repo.owner}/${repo.repo}/git/trees/${repo.branch}?recursive=1`;
		const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
		if (token) {
			headers.Authorization = `Bearer ${token}`;
		}
		const resp = await fetch(url, { headers });
		if (!resp.ok) return null;
		const data = await resp.json();
		if (!data.tree) return null;

		const prefix = "src/content/posts/";
		const files: string[] = [];
		for (const item of data.tree) {
			if (item.type !== "blob") continue;
			if (!item.path.startsWith(prefix)) continue;
			const relPath = item.path.substring(prefix.length);
			// 只保留 .md 和 .mdx 文件
			if (/\.(md|mdx)$/i.test(relPath)) {
				files.push(relPath);
			}
		}
		return files;
	} catch {
		return null;
	}
}

/**
 * 检查某个文章 ID 是否存在于文件列表中
 * 兼容 ID 带或不带扩展名的情况
 */
export function postExistsInList(postId: string, fileList: string[]): boolean {
	// 1. 直接匹配
	if (fileList.includes(postId)) return true;
	// 2. 如果 postId 不带扩展名，尝试加 .md / .mdx
	if (!/\.(md|mdx|markdown)$/i.test(postId)) {
		if (fileList.includes(`${postId}.md`)) return true;
		if (fileList.includes(`${postId}.mdx`)) return true;
	}
	// 3. 如果 postId 带扩展名，尝试去掉扩展名再匹配
	const stripped = postId.replace(/\.(md|mdx|markdown)$/i, "");
	if (fileList.includes(stripped)) return true;
	if (fileList.includes(`${stripped}.md`)) return true;
	if (fileList.includes(`${stripped}.mdx`)) return true;
	return false;
}
