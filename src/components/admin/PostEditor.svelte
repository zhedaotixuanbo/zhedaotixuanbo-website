<script lang="ts">
import { onMount, afterUpdate } from "svelte";
import { renderMarkdown } from "@/utils/preview-renderer";
import {
  getGithubConfig,
  saveGithubConfig,
  hasAdminPassword,
  hasCloudConfig,
  type GithubConfig,
} from "@/utils/admin-github";

let prismReady = false;

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

function loadPrism() {
  if (document.getElementById("prism-script")) return;
  const s = document.createElement("script");
  s.id = "prism-script";
  s.src = "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js";
  s.onload = () => {
    const auto = document.createElement("script");
    auto.src = "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/autoloader/prism-autoloader.min.js";
    auto.onload = () => {
      const ln = document.createElement("script");
      ln.src = "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/line-numbers/prism-line-numbers.min.js";
      ln.onload = () => {
        const lh = document.createElement("script");
        lh.src = "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/line-highlight/prism-line-highlight.min.js";
        lh.onload = () => {
          const w = window as any;
          if (w.Prism?.plugins?.autoloader) {
            w.Prism.plugins.autoloader.languages_path =
              "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/";
          }
          prismReady = true;
          highlightPreview();
        };
        document.head.appendChild(lh);
      };
      document.head.appendChild(ln);
    };
    document.head.appendChild(auto);
  };
  document.head.appendChild(s);
}

function highlightPreview() {
  if (!prismReady) return;
  const w = window as any;
  if (!w.Prism) return;
  const el = document.querySelector(".preview-content");
  if (el) {
    w.Prism.highlightAllUnder(el);
    // Attach copy button handlers
    el.querySelectorAll(".preview-copy-btn").forEach((btn) => {
      if (btn.getAttribute("data-bound")) return;
      btn.setAttribute("data-bound", "1");
      btn.addEventListener("click", (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const wrapper = target.closest(".preview-code-wrapper");
        if (!wrapper) return;
        const codeEl = wrapper.querySelector("code");
        if (!codeEl) return;
        const text = codeEl.textContent || "";
        navigator.clipboard.writeText(text).then(() => {
          target.textContent = "已复制";
          setTimeout(() => {
            target.textContent = "复制";
          }, 1500);
        });
      });
    });
  }
}

let authed = false;
let authChecked = false;

let editMode = false;
let editId = "";
let collection = "posts";
let isLoadingPost = false;

let title = "";
let published = new Date().toISOString().split("T")[0];
let updated = new Date().toISOString().split("T")[0];
let description = "";
let tags: string[] = [];
let tagInput = "";
let category = "";
let image = "";
let draft = false;
let pinned = false;
let fileName = "";
let slug = "";
let lang = "";
let author = "";
let comment = true;
let licenseName = "CC BY-NC-SA 4.0";
let licenseUrl = "https://creativecommons.org/licenses/by-nc-sa/4.0/";
let sourceLink = "";
let password = "";
let passwordHint = "";
let outdatedReminder = false;

let content = "";
let viewMode: "split" | "edit" | "preview" = "split";
let showSettings = false;
let showAdvanced = false;

let githubToken = "";
let repoOwner = "";
let repoName = "";
let branch = "main";
let isSavingSettings = false;
let needsReauth = false;

let saveStatus = "";
let saveStatusType: "info" | "success" | "error" = "info";
let isSaving = false;

onMount(async () => {
  if (!isAdminAuthed()) {
    window.location.href = "/";
    return;
  }
  authed = true;
  authChecked = true;

  const cloudExists = await hasCloudConfig();
  if (!hasAdminPassword() && cloudExists) {
    needsReauth = true;
  }

  const config = await getGithubConfig();
  if (config) {
    githubToken = config.token;
    repoOwner = config.owner;
    repoName = config.repo;
    branch = config.branch;
    console.log("[PostEditor] GitHub 配置已加载");
  } else {
    console.warn("[PostEditor] 未找到 GitHub 配置");
  }

  if (window.innerWidth < 768) {
    viewMode = "edit";
  }

  loadPrism();

  const params = new URLSearchParams(window.location.search);
  const editParam = params.get("edit");
  const collectionParam = params.get("collection");
  if (collectionParam) {
    collection = collectionParam;
  }
  if (editParam) {
    console.log("[PostEditor] 编辑模式，postId:", editParam, "collection:", collection);
    editMode = true;
    editId = editParam;
    fileName = editParam;
    loadPost(editParam);
  }
});

function base64ToUtf8(b64: string): string {
  const binary = atob(b64.replace(/\n/g, ""));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

async function loadPost(postId: string) {
  console.log("[PostEditor] loadPost 开始, postId:", postId);
  console.log("[PostEditor] GitHub 配置:", { hasToken: !!githubToken, hasOwner: !!repoOwner, hasRepo: !!repoName });

  if (!githubToken || !repoOwner || !repoName) {
    console.warn("[PostEditor] GitHub 配置不完整，无法加载文章");
    showStatus("请先在设置中填写 GitHub 信息以加载文章", "error");
    showSettings = true;
    return;
  }

  isLoadingPost = true;
  showStatus("正在加载文章内容...", "info");

  try {
    const collectionPath = `src/content/${collection}`;
    const headers: Record<string, string> = {
      Authorization: `Bearer ${githubToken}`,
      Accept: "application/vnd.github+json",
    };

    // 1. 用 Trees API 获取目录下所有文件，找到匹配的实际路径
    const treeUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/git/trees/${branch}?recursive=1`;
    const treeResp = await fetch(treeUrl, { headers });
    let actualPath: string | null = null;

    if (treeResp.ok) {
      const treeData = await treeResp.json();
      if (treeData.tree) {
        const prefix = `${collectionPath}/`;
        // 收集该 collection 下所有 md/mdx 文件的相对路径
        const files: string[] = [];
        for (const item of treeData.tree) {
          if (item.type !== "blob") continue;
          if (!item.path.startsWith(prefix)) continue;
          if (!/\.(md|mdx)$/i.test(item.path)) continue;
          files.push(item.path);
        }

        // 去除 postId 中的扩展名（如果有）
        const postIdNoExt = postId.replace(/\.(md|mdx|markdown)$/i, "");
        // postId 可能包含子目录路径（如 subdir/my-post）
        const postIdBasename = postIdNoExt.split("/").pop() || postIdNoExt;

        // 归一化函数：去除所有标点符号、空格、特殊字符，转小写
        // 用于匹配 Astro 生成的 id（会去除 ：[]- 等字符并转小写）
        const normalize = (s: string): string =>
          s.toLowerCase().replace(/[\s\-_：:.\[\]()（）【】{}<>《》"'#!?*,;|/\\]+/g, "");

        const postIdNorm = normalize(postIdBasename);

        // 多级匹配策略
        // 1) 完整路径直接匹配（大小写敏感）
        for (const f of files) {
          if (f === `${prefix}${postIdNoExt}.md` || f === `${prefix}${postIdNoExt}.mdx`) {
            actualPath = f;
            break;
          }
        }
        // 2) 仅文件名匹配（大小写敏感，不含目录）
        if (!actualPath) {
          for (const f of files) {
            const fileBasename = f.split("/").pop() || "";
            if (fileBasename === `${postIdBasename}.md` || fileBasename === `${postIdBasename}.mdx`) {
              actualPath = f;
              break;
            }
          }
        }
        // 3) postId 本身就是完整相对路径（含扩展名）
        if (!actualPath) {
          for (const f of files) {
            if (f === `${prefix}${postId}`) {
              actualPath = f;
              break;
            }
          }
        }
        // 4) 归一化匹配：去除标点和大小写差异后比较
        //    解决 Astro id 与实际文件名不一致的问题
        //    例如：题解：P15524-[ROIR...].md → 题解p15524roir...
        if (!actualPath && postIdNorm) {
          for (const f of files) {
            const fileBasename = f.split("/").pop() || "";
            const fileNoExt = fileBasename.replace(/\.(md|mdx)$/i, "");
            const fileNorm = normalize(fileNoExt);
            if (fileNorm === postIdNorm) {
              actualPath = f;
              break;
            }
          }
        }
      }
    }

    // 2. 如果 Trees API 找到了实际路径，直接用；否则回退到旧逻辑
    const pathVariants: string[] = [];
    if (actualPath) {
      pathVariants.push(actualPath);
    } else {
      const basePath = `${collectionPath}/${postId}`;
      pathVariants.push(basePath);
      if (!/\.(md|mdx|markdown)$/i.test(postId)) {
        pathVariants.push(`${basePath}.md`, `${basePath}.mdx`);
      }
    }

    let data: any = null;
    for (const p of pathVariants) {
      const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${p}?ref=${branch}`;
      const resp = await fetch(url, { headers });
      if (resp.ok) {
        data = await resp.json();
        break;
      }
    }

    if (!data) {
      throw new Error(`无法找到文件: ${postId}（在 ${collectionPath} 目录下未找到匹配文件）`);
    }

    console.log("[PostEditor] 找到文件:", data.path, "大小:", data.size);

    // 从 API 返回的路径中提取正确的文件名（保留原始扩展名）
    if (data.path) {
      const pathParts = data.path.split("/");
      fileName = pathParts[pathParts.length - 1];
    }

    const raw = base64ToUtf8(data.content);

    const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
    if (fmMatch) {
      const fmRaw = fmMatch[1];
      content = fmMatch[2];

      for (const line of fmRaw.split("\n")) {
        const idx = line.indexOf(":");
        if (idx === -1) continue;
        const key = line.substring(0, idx).trim();
        let val = line.substring(idx + 1).trim();
        // 去除 YAML 双引号包裹
        if (val.startsWith('"') && val.endsWith('"')) {
          val = val.slice(1, -1).replace(/\\"/g, '"');
        }

        if (key === "title") title = val;
        else if (key === "published") published = val;
        else if (key === "updated") updated = val;
        else if (key === "description") description = val;
        else if (key === "category") category = val;
        else if (key === "image") image = val;
        else if (key === "tags") {
          tags = val
            .replace(/[\[\]]/g, "")
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);
        }
        else if (key === "draft") draft = val === "true";
        else if (key === "pinned") pinned = val === "true";
        else if (key === "slug") slug = val;
        else if (key === "lang") lang = val;
        else if (key === "author") author = val;
        else if (key === "comment") comment = val === "true";
        else if (key === "licenseName") licenseName = val;
        else if (key === "licenseUrl") licenseUrl = val;
        else if (key === "sourceLink") sourceLink = val;
        else if (key === "password") password = val;
        else if (key === "passwordHint") passwordHint = val;
        else if (key === "outdatedReminder") outdatedReminder = val === "true";
      }
    } else {
      // 无 frontmatter 的文件（如 spec 集合），整体作为内容加载
      content = raw;
    }

    saveStatus = "";
    console.log("[PostEditor] 文章加载成功, title:", title, "content length:", content.length);
    showStatus(`已加载文章: ${title}`, "success");
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[PostEditor] 加载文章失败:", e);
    showStatus(`加载失败: ${msg}`, "error");
  }

  isLoadingPost = false;
}

function addTag() {
  const tag = tagInput.trim();
  if (tag && !tags.includes(tag)) {
    tags = [...tags, tag];
  }
  tagInput = "";
}

function removeTag(index: number) {
  tags = tags.filter((_, i) => i !== index);
}

function handleTagKeydown(e: KeyboardEvent) {
  if (e.key === "Enter" || e.key === ",") {
    e.preventDefault();
    addTag();
  } else if (e.key === "Backspace" && !tagInput && tags.length > 0) {
    tags = tags.slice(0, -1);
  }
}

function generateFileName(): string {
  if (fileName) {
    return fileName.match(/\.(md|mdx)$/i) ? fileName : `${fileName}.md`;
  }
  const safe = title
    .replace(/[<>:"/\\|?*]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  return `${safe || "untitled"}.md`;
}

function yamlValue(val: string): string {
  // 如果值包含冒号、#、[] 等 YAML 特殊字符，用双引号包裹并转义内部双引号
  if (/[:#{}\[\],&*!|>'"%@`]/.test(val) || val.startsWith(" ") || val.endsWith(" ")) {
    return `"${val.replace(/"/g, '\\"')}"`;
  }
  return val;
}

function generateMarkdown(): string {
  // spec 集合文件：如果没有标题等元数据，不加 frontmatter
  if (collection === "spec" && !title && !description && !published) {
    return content;
  }

  const fm: string[] = ["---"];
  fm.push(`title: ${yamlValue(title || "无标题")}`);
  fm.push(`published: ${published}`);
  if (updated) fm.push(`updated: ${updated}`);
  if (description) fm.push(`description: ${yamlValue(description)}`);
  if (image) fm.push(`image: ${image}`);
  if (tags.length > 0) fm.push(`tags: [${tags.join(", ")}]`);
  if (category) fm.push(`category: ${yamlValue(category)}`);
  if (draft) fm.push("draft: true");
  if (pinned) fm.push("pinned: true");
  if (slug) fm.push(`slug: ${slug}`);
  if (lang) fm.push(`lang: ${lang}`);
  if (author) fm.push(`author: ${yamlValue(author)}`);
  if (!comment) fm.push("comment: false");
  if (licenseName) fm.push(`licenseName: ${yamlValue(licenseName)}`);
  if (licenseUrl) fm.push(`licenseUrl: ${licenseUrl}`);
  if (sourceLink) fm.push(`sourceLink: ${sourceLink}`);
  if (password) fm.push(`password: ${password}`);
  if (passwordHint) fm.push(`passwordHint: ${yamlValue(passwordHint)}`);
  if (outdatedReminder) fm.push("outdatedReminder: true");
  fm.push("---");
  fm.push("");
  fm.push(content);
  return fm.join("\n");
}

function downloadMarkdown() {
  const md = generateMarkdown();
  const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = generateFileName();
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showStatus("文件已下载", "success");
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
    needsReauth = false;
  } else if (result.local) {
    showStatus(`已保存到本地${result.error ? `（云端: ${result.error}）` : ""}`, "success");
  } else {
    showStatus(`保存失败: ${result.error || "未知错误"}`, "error");
  }

  isSavingSettings = false;
}

function utf8ToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function saveToGithub() {
  if (!githubToken || !repoOwner || !repoName) {
    showStatus("请先在设置中填写 GitHub 信息", "error");
    showSettings = true;
    return;
  }

  if (!title) {
    showStatus("请填写文章标题", "error");
    return;
  }

  isSaving = true;
  showStatus("正在保存到 GitHub...", "info");

  try {
    const filename = generateFileName();
    const path = `src/content/${collection}/${filename}`;
    const md = generateMarkdown();
    const encoded = utf8ToBase64(md);

    let sha: string | undefined;
    const checkUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}?ref=${branch}`;
    const checkResponse = await fetch(checkUrl, {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github+json",
      },
    });

    if (checkResponse.ok) {
      const fileData = await checkResponse.json();
      sha = fileData.sha;
    }

    const createUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`;
    const createResponse = await fetch(createUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `${sha ? "更新" : "新建"}文章: ${title}`,
        content: encoded,
        branch,
        ...(sha ? { sha } : {}),
      }),
    });

    if (createResponse.ok) {
      showStatus(
        `文章已${sha ? "更新" : "创建"}成功！Cloudflare Pages 将自动重新构建。`,
        "success",
      );
    } else {
      const error = await createResponse.json();
      const msg = error.message || "未知错误";
      if (msg.includes("Bad credentials")) {
        showStatus("GitHub Token 无效，请检查设置", "error");
        showSettings = true;
      } else if (msg.includes("Not Found")) {
        showStatus("仓库未找到，请检查仓库所有者和名称", "error");
        showSettings = true;
      } else {
        showStatus(`保存失败: ${msg}`, "error");
      }
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    showStatus(`网络错误: ${msg}`, "error");
  }

  isSaving = false;
}

function showStatus(msg: string, type: "info" | "success" | "error") {
  saveStatus = msg;
  saveStatusType = type;
  if (type === "success") {
    setTimeout(() => {
      saveStatus = "";
    }, 5000);
  }
  // error 类型不自动消失，需要用户手动关闭或进行其他操作
}

function logout() {
  localStorage.removeItem("firefly_admin_authed");
  window.location.href = "/";
}

$: previewHtml = renderMarkdown(content);
$: canSave = !!title && !isSaving;

afterUpdate(() => {
  highlightPreview();
});
</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.min.css" crossorigin="anonymous" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/line-numbers/prism-line-numbers.min.css" crossorigin="anonymous" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/line-highlight/prism-line-highlight.min.css" crossorigin="anonymous" />
</svelte:head>

{#if !authChecked}
  <div class="flex items-center justify-center h-96">
    <div class="text-neutral-400">正在验证管理员身份...</div>
  </div>
{:else if authed}
  <div class="w-full max-w-(--page-width) mx-auto px-2">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-3">
        <a
          href="/admin/manage/"
          class="btn-plain scale-animation rounded-lg h-9 w-9 flex items-center justify-center text-sm font-medium active:scale-95"
          title="返回管理"
        >
          ←
        </a>
        <h1 class="text-xl font-bold">{editMode ? "编辑文章" : "新建文章"}</h1>
      </div>
      <div class="flex gap-2">
        <a
          href="https://docs-firefly.cuteleaf.cn/zh/guide/writing.html"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-plain scale-animation rounded-lg h-9 px-3 text-sm font-medium active:scale-95 flex items-center"
        >
          帮助
        </a>
        <button
          on:click={() => (showSettings = !showSettings)}
          class="btn-plain scale-animation rounded-lg h-9 px-3 text-sm font-medium active:scale-95 flex items-center"
        >
          <span class="hidden sm:inline">设置</span>
          <span class="sm:hidden">设置</span>
        </button>
        <button
          on:click={logout}
          class="btn-plain scale-animation rounded-lg h-9 px-3 text-sm font-medium active:scale-95"
        >
          退出
        </button>
      </div>
    </div>

    <!-- Status Banner (prominent, at top) -->
    {#if saveStatus}
      <div
        class="mb-3 px-4 py-2.5 rounded-lg text-sm font-medium transition flex items-center justify-between gap-3 {saveStatusType === 'success'
          ? 'bg-green-500/15 text-green-600 dark:text-green-400'
          : saveStatusType === 'error'
            ? 'bg-red-500/15 text-red-600 dark:text-red-400'
            : 'bg-blue-500/15 text-blue-600 dark:text-blue-400'}"
      >
        <div class="flex items-center gap-2">
          {#if saveStatusType === 'info'}
            <span class="inline-block w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin flex-shrink-0"></span>
          {/if}
          <span>{saveStatus}</span>
        </div>
        {#if saveStatusType !== 'info'}
          <button
            on:click={() => (saveStatus = '')}
            class="text-current opacity-60 hover:opacity-100 transition flex-shrink-0"
            aria-label="关闭提示"
          >
            ✕
          </button>
        {/if}
      </div>
    {/if}

    <!-- Settings Panel -->
    {#if showSettings}
      <div class="card-base p-4 rounded-xl mb-4">
        <h2 class="text-sm font-bold mb-3">GitHub 配置</h2>

        {#if needsReauth}
          <div class="mb-3 px-3 py-2 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 text-sm">
            检测到云端配置，但需要重新输入管理员密码才能解密。请退出管理员模式后重新双击头像输入密码。
          </div>
        {/if}

        <p class="text-xs text-neutral-400 mb-3">
          需要一个具有 repo 权限的 Personal Access Token。保存后配置将加密同步到云端，所有设备共享。
        </p>
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

    <!-- Required Fields -->
    <div class="card-base p-4 rounded-xl mb-4">
      <h2 class="text-sm font-bold mb-3">文章信息</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div class="sm:col-span-2">
          <label class="block text-xs font-medium mb-1 text-neutral-400">标题 *</label>
          <input
            type="text"
            bind:value={title}
            placeholder="文章标题"
            class="w-full rounded-lg border border-(--btn-regular-bg-hover) bg-(--card-bg) px-3 py-2 text-sm outline-none focus:border-(--primary) transition"
          />
        </div>
        <div>
          <label class="block text-xs font-medium mb-1 text-neutral-400">发布日期 *</label>
          <input
            type="date"
            bind:value={published}
            class="w-full rounded-lg border border-(--btn-regular-bg-hover) bg-(--card-bg) px-3 py-2 text-sm outline-none focus:border-(--primary) transition"
          />
        </div>
        <div>
          <label class="block text-xs font-medium mb-1 text-neutral-400">文件名</label>
          <input
            type="text"
            bind:value={fileName}
            placeholder="留空则从标题生成"
            class="w-full rounded-lg border border-(--btn-regular-bg-hover) bg-(--card-bg) px-3 py-2 text-sm outline-none focus:border-(--primary) transition"
          />
        </div>
      </div>
    </div>

    <!-- Advanced Settings (collapsible) -->
    <div class="card-base rounded-xl mb-4 overflow-hidden">
      <button
        on:click={() => (showAdvanced = !showAdvanced)}
        class="w-full px-4 py-3 flex items-center justify-between text-sm font-bold transition hover:bg-(--btn-regular-bg-hover)/10"
      >
        <span>高级设置</span>
        <span class="text-xs text-neutral-400 transition transform {showAdvanced ? 'rotate-180' : ''}">▼</span>
      </button>
      {#if showAdvanced}
        <div class="px-4 pb-4 pt-1 border-t border-(--btn-regular-bg-hover)">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            <div>
              <label class="block text-xs font-medium mb-1 text-neutral-400">更新日期</label>
              <input
                type="date"
                bind:value={updated}
                class="w-full rounded-lg border border-(--btn-regular-bg-hover) bg-(--card-bg) px-3 py-2 text-sm outline-none focus:border-(--primary) transition"
              />
            </div>
            <div>
              <label class="block text-xs font-medium mb-1 text-neutral-400">分类</label>
              <input
                type="text"
                bind:value={category}
                placeholder="如: 技术分享"
                class="w-full rounded-lg border border-(--btn-regular-bg-hover) bg-(--card-bg) px-3 py-2 text-sm outline-none focus:border-(--primary) transition"
              />
            </div>
            <div class="sm:col-span-2">
              <label class="block text-xs font-medium mb-1 text-neutral-400">描述</label>
              <textarea
                bind:value={description}
                placeholder="文章简短描述，显示在文章卡片上"
                rows="2"
                class="w-full rounded-lg border border-(--btn-regular-bg-hover) bg-(--card-bg) px-3 py-2 text-sm outline-none focus:border-(--primary) transition resize-none"
              ></textarea>
            </div>
            <div class="sm:col-span-2">
              <label class="block text-xs font-medium mb-1 text-neutral-400">封面图片路径</label>
              <input
                type="text"
                bind:value={image}
                placeholder="如: ./cover.jpg 或 /assets/images/cover.webp"
                class="w-full rounded-lg border border-(--btn-regular-bg-hover) bg-(--card-bg) px-3 py-2 text-sm outline-none focus:border-(--primary) transition"
              />
            </div>
            <div class="sm:col-span-2">
              <label class="block text-xs font-medium mb-1 text-neutral-400">标签</label>
              <div class="flex flex-wrap gap-1.5 items-center rounded-lg border border-(--btn-regular-bg-hover) bg-(--card-bg) px-2 py-2 min-h-[2.5rem]">
                {#each tags as tag, i}
                  <span class="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium" style="background:var(--primary);color:white;">
                    {tag}
                    <button on:click={() => removeTag(i)} class="hover:opacity-70 transition" aria-label="移除标签">
                      ✕
                    </button>
                  </span>
                {/each}
                <input
                  type="text"
                  bind:value={tagInput}
                  on:keydown={handleTagKeydown}
                  on:blur={addTag}
                  placeholder={tags.length === 0 ? "输入标签后按回车" : "继续添加..."}
                  class="flex-1 min-w-[8rem] bg-transparent text-sm outline-none border-none!"
                />
              </div>
            </div>
            <div>
              <label class="block text-xs font-medium mb-1 text-neutral-400">自定义 URL 路径 (slug)</label>
              <input
                type="text"
                bind:value={slug}
                placeholder="留空则使用文件名"
                class="w-full rounded-lg border border-(--btn-regular-bg-hover) bg-(--card-bg) px-3 py-2 text-sm outline-none focus:border-(--primary) transition"
              />
            </div>
            <div>
              <label class="block text-xs font-medium mb-1 text-neutral-400">语言代码</label>
              <input
                type="text"
                bind:value={lang}
                placeholder="如: zh-CN，留空则使用站点默认"
                class="w-full rounded-lg border border-(--btn-regular-bg-hover) bg-(--card-bg) px-3 py-2 text-sm outline-none focus:border-(--primary) transition"
              />
            </div>
            <div>
              <label class="block text-xs font-medium mb-1 text-neutral-400">作者</label>
              <input
                type="text"
                bind:value={author}
                placeholder="留空则使用站点默认"
                class="w-full rounded-lg border border-(--btn-regular-bg-hover) bg-(--card-bg) px-3 py-2 text-sm outline-none focus:border-(--primary) transition"
              />
            </div>
            <div>
              <label class="block text-xs font-medium mb-1 text-neutral-400">文章来源链接</label>
              <input
                type="text"
                bind:value={sourceLink}
                placeholder="如为转载文章，填写原文链接"
                class="w-full rounded-lg border border-(--btn-regular-bg-hover) bg-(--card-bg) px-3 py-2 text-sm outline-none focus:border-(--primary) transition"
              />
            </div>
            <div>
              <label class="block text-xs font-medium mb-1 text-neutral-400">许可证名称</label>
              <input
                type="text"
                bind:value={licenseName}
                placeholder="如: CC BY 4.0"
                class="w-full rounded-lg border border-(--btn-regular-bg-hover) bg-(--card-bg) px-3 py-2 text-sm outline-none focus:border-(--primary) transition"
              />
            </div>
            <div>
              <label class="block text-xs font-medium mb-1 text-neutral-400">许可证链接</label>
              <input
                type="text"
                bind:value={licenseUrl}
                placeholder="如: https://creativecommons.org/licenses/by/4.0/"
                class="w-full rounded-lg border border-(--btn-regular-bg-hover) bg-(--card-bg) px-3 py-2 text-sm outline-none focus:border-(--primary) transition"
              />
            </div>
            <div>
              <label class="block text-xs font-medium mb-1 text-neutral-400">文章密码</label>
              <input
                type="text"
                bind:value={password}
                placeholder="设置后文章将被加密保护"
                class="w-full rounded-lg border border-(--btn-regular-bg-hover) bg-(--card-bg) px-3 py-2 text-sm outline-none focus:border-(--primary) transition"
              />
            </div>
            <div>
              <label class="block text-xs font-medium mb-1 text-neutral-400">密码提示</label>
              <input
                type="text"
                bind:value={passwordHint}
                placeholder="显示在密码输入框上方"
                class="w-full rounded-lg border border-(--btn-regular-bg-hover) bg-(--card-bg) px-3 py-2 text-sm outline-none focus:border-(--primary) transition"
              />
            </div>
            <div class="sm:col-span-2 flex flex-wrap items-center gap-4 pt-1">
              <label class="flex items-center gap-2 cursor-pointer text-sm">
                <input type="checkbox" bind:checked={draft} class="w-4 h-4 accent-(--primary)" />
                <span>草稿</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer text-sm">
                <input type="checkbox" bind:checked={pinned} class="w-4 h-4 accent-(--primary)" />
                <span>置顶</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer text-sm">
                <input type="checkbox" bind:checked={comment} class="w-4 h-4 accent-(--primary)" />
                <span>启用评论</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer text-sm">
                <input type="checkbox" bind:checked={outdatedReminder} class="w-4 h-4 accent-(--primary)" />
                <span>过时提醒</span>
              </label>
            </div>
          </div>
        </div>
      {/if}
    </div>

    <!-- View Mode Toggle (mobile) -->
    <div class="flex md:hidden gap-2 mb-3">
      <button
        on:click={() => (viewMode = "edit")}
        class="flex-1 rounded-lg h-9 text-sm font-medium transition {viewMode === 'edit' ? 'btn-regular' : 'btn-plain'}"
      >
        编辑
      </button>
      <button
        on:click={() => (viewMode = "preview")}
        class="flex-1 rounded-lg h-9 text-sm font-medium transition {viewMode === 'preview' ? 'btn-regular' : 'btn-plain'}"
      >
        预览
      </button>
    </div>

    <!-- Editor / Preview -->
    <div class="flex gap-4 mb-4 relative" style="height: calc(100vh - 28rem); min-height: 300px;">
      {#if isLoadingPost}
        <div class="absolute inset-0 z-10 flex items-center justify-center bg-(--card-bg)/80 backdrop-blur-sm rounded-xl">
          <div class="flex flex-col items-center gap-3">
            <span class="inline-block w-8 h-8 border-2 border-(--primary) border-t-transparent rounded-full animate-spin"></span>
            <span class="text-sm text-neutral-400">正在加载文章内容...</span>
          </div>
        </div>
      {/if}
      <!-- Editor -->
      <div
        class="card-base rounded-xl overflow-hidden flex-1 {viewMode === 'preview' ? 'hidden md:flex' : 'flex'} flex-col"
      >
        <div class="px-3 py-1.5 text-xs font-medium text-neutral-400 border-b border-(--btn-regular-bg-hover) flex-shrink-0">
          Markdown 编辑器
        </div>
        <textarea
          bind:value={content}
          placeholder="在此输入文章内容..."
          class="flex-1 w-full p-4 text-sm font-mono bg-transparent outline-none resize-none custom-scroll"
          style="font-family: var(--font-code, ui-monospace, monospace);"
        ></textarea>
      </div>

      <!-- Preview -->
      <div
        class="card-base rounded-xl overflow-hidden flex-1 {viewMode === 'edit' ? 'hidden md:flex' : 'flex'} flex-col"
      >
        <div class="px-3 py-1.5 text-xs font-medium text-neutral-400 border-b border-(--btn-regular-bg-hover) flex-shrink-0">
          预览
        </div>
        <div class="flex-1 overflow-auto p-4 custom-scroll preview-content">
          {#if content}
            <div class="prose prose-sm max-w-none">{@html previewHtml}</div>
          {:else}
            <div class="text-neutral-400 text-sm">预览将在此显示...</div>
          {/if}
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex flex-wrap gap-3 mb-8">
      <button
        on:click={saveToGithub}
        disabled={!canSave}
        class="btn-regular scale-animation rounded-lg h-10 px-6 font-bold active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {#if isSaving}
          <span class="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
          保存中...
        {:else}
          保存（同步到Github）
        {/if}
      </button>
      <button
        on:click={downloadMarkdown}
        class="btn-plain scale-animation rounded-lg h-10 px-6 font-bold active:scale-95 transition flex items-center gap-2"
      >
        下载（.md格式）
      </button>
    </div>
  </div>
{/if}

<style>
.custom-scroll::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scroll::-webkit-scrollbar-thumb {
  background: rgba(128, 128, 128, 0.3);
  border-radius: 3px;
}
.custom-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(128, 128, 128, 0.5);
}

.prose {
  color: var(--deep-text, inherit);
}

.prose :global(h1) {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0.75rem 0;
  color: var(--deep-text, inherit);
}
.prose :global(h2) {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0.75rem 0;
  color: var(--deep-text, inherit);
}
.prose :global(h3) {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0.5rem 0;
  color: var(--deep-text, inherit);
}
.prose :global(p) {
  color: var(--deep-text, inherit);
}
.prose :global(li) {
  color: var(--deep-text, inherit);
}
.prose :global(code) {
  background: var(--btn-regular-bg-hover, rgba(128, 128, 128, 0.2));
  padding: 0.1rem 0.3rem;
  border-radius: 0.25rem;
  font-size: 0.85em;
  color: var(--deep-text, inherit);
}
.prose :global(pre:not(.preview-codeblock)) {
  background: var(--btn-regular-bg-hover, rgba(128, 128, 128, 0.2));
  padding: 0.5rem;
  border-radius: 0.25rem;
  overflow-x: auto;
}
.prose :global(pre:not(.preview-codeblock) code) {
  background: transparent;
  padding: 0;
  color: var(--deep-text, inherit);
}
.prose :global(blockquote) {
  color: var(--deep-text, inherit);
  opacity: 0.85;
}
.prose :global(a) {
  color: var(--primary);
}

/* Headings */
.prose :global(.preview-h1) { font-size: 1.5rem; font-weight: 700; margin: 0.75rem 0; color: var(--deep-text, inherit); }
.prose :global(.preview-h2) { font-size: 1.25rem; font-weight: 700; margin: 0.75rem 0; color: var(--deep-text, inherit); }
.prose :global(.preview-h3) { font-size: 1.1rem; font-weight: 600; margin: 0.5rem 0; color: var(--deep-text, inherit); }
.prose :global(.preview-h4) { font-size: 1rem; font-weight: 600; margin: 0.5rem 0; color: var(--deep-text, inherit); }
.prose :global(.preview-h5) { font-size: 0.9rem; font-weight: 600; margin: 0.4rem 0; color: var(--deep-text, inherit); }
.prose :global(.preview-h6) { font-size: 0.85rem; font-weight: 600; margin: 0.4rem 0; color: var(--deep-text, inherit); }

/* Paragraphs */
.prose :global(.preview-p) {
  margin: 0.5rem 0;
  line-height: 1.7;
  color: var(--deep-text, inherit);
}

/* Inline code */
.prose :global(.preview-inline-code) {
  background: var(--btn-regular-bg-hover, rgba(128, 128, 128, 0.2));
  padding: 0.1rem 0.3rem;
  border-radius: 0.25rem;
  font-size: 0.85em;
  color: var(--deep-text, inherit);
  font-family: var(--font-code, ui-monospace, monospace);
}

/* Code blocks - Prism integration with One Dark Pro / One Light themes */
:global(.preview-code-wrapper) {
  position: relative;
  margin: 0.75rem 0;
  border-radius: 0.5rem;
  overflow: hidden;
  background: #282c34;
}
:global(html:not(.dark) .preview-code-wrapper) {
  background: #fafafa;
}

:global(.preview-code-toolbar) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0.75rem;
  background: rgba(0, 0, 0, 0.18);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
:global(html:not(.dark) .preview-code-toolbar) {
  background: rgba(0, 0, 0, 0.04);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

:global(.preview-code-lang-badge) {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.5);
  transition: opacity 0.2s;
  font-family: var(--font-code, ui-monospace, monospace);
}
:global(html:not(.dark) .preview-code-lang-badge) {
  color: rgba(0, 0, 0, 0.4);
}
:global(.preview-code-wrapper:hover .preview-code-lang-badge) {
  opacity: 0;
}

:global(.preview-copy-btn) {
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s, background 0.2s;
  font-family: var(--font-code, ui-monospace, monospace);
}
:global(html:not(.dark) .preview-copy-btn) {
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.5);
}
:global(.preview-code-wrapper:hover .preview-copy-btn) {
  opacity: 1;
}
:global(.preview-copy-btn:hover) {
  background: rgba(255, 255, 255, 0.2);
}
:global(html:not(.dark) .preview-copy-btn:hover) {
  background: rgba(0, 0, 0, 0.08);
}

:global(.preview-codeblock) {
  margin: 0 !important;
  padding: 0.75rem;
  background: #282c34 !important;
  font-family: var(--font-code, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace) !important;
  font-size: 0.85rem !important;
  line-height: 1.5 !important;
  overflow-x: auto;
  color: #abb2bf !important;
  border-radius: 0 !important;
}
:global(html:not(.dark) .preview-codeblock) {
  background: #fafafa !important;
  color: #383a42 !important;
}
:global(.preview-codeblock code) {
  background: transparent !important;
  padding: 0 !important;
  font-family: inherit !important;
  font-size: inherit !important;
  color: inherit !important;
  text-shadow: none !important;
}

/* Prism token colors - Dark mode (One Dark Pro) */
:global(.preview-codeblock .token.comment),
:global(.preview-codeblock .token.prolog),
:global(.preview-codeblock .token.doctype),
:global(.preview-codeblock .token.cdata) { color: #7f848e; font-style: italic; }
:global(.preview-codeblock .token.punctuation) { color: #abb2bf; }
:global(.preview-codeblock .token.property),
:global(.preview-codeblock .token.tag),
:global(.preview-codeblock .token.boolean),
:global(.preview-codeblock .token.number),
:global(.preview-codeblock .token.constant),
:global(.preview-codeblock .token.symbol) { color: #d19a66; }
:global(.preview-codeblock .token.selector),
:global(.preview-codeblock .token.attr-name),
:global(.preview-codeblock .token.string),
:global(.preview-codeblock .token.char),
:global(.preview-codeblock .token.builtin),
:global(.preview-codeblock .token.inserted) { color: #98c379; }
:global(.preview-codeblock .token.operator),
:global(.preview-codeblock .token.entity),
:global(.preview-codeblock .token.url),
:global(.preview-codeblock .language-css .token.string),
:global(.preview-codeblock .style .token.string) { color: #56b6c2; }
:global(.preview-codeblock .token.atrule),
:global(.preview-codeblock .token.attr-value),
:global(.preview-codeblock .token.keyword) { color: #c678dd; }
:global(.preview-codeblock .token.function),
:global(.preview-codeblock .token.class-name) { color: #61afef; }
:global(.preview-codeblock .token.regex),
:global(.preview-codeblock .token.important),
:global(.preview-codeblock .token.variable) { color: #e06c75; }
:global(.preview-codeblock .token.deleted) { color: #e06c75; }
:global(.preview-codeblock .token.important),
:global(.preview-codeblock .token.bold) { font-weight: bold; }
:global(.preview-codeblock .token.italic) { font-style: italic; }
:global(.preview-codeblock .token.entity) { cursor: help; }

/* Prism token colors - Light mode (One Light) */
:global(html:not(.dark) .preview-codeblock .token.comment),
:global(html:not(.dark) .preview-codeblock .token.prolog),
:global(html:not(.dark) .preview-codeblock .token.doctype),
:global(html:not(.dark) .preview-codeblock .token.cdata) { color: #a0a1a7; font-style: italic; }
:global(html:not(.dark) .preview-codeblock .token.punctuation) { color: #383a42; }
:global(html:not(.dark) .preview-codeblock .token.property),
:global(html:not(.dark) .preview-codeblock .token.tag),
:global(html:not(.dark) .preview-codeblock .token.boolean),
:global(html:not(.dark) .preview-codeblock .token.number),
:global(html:not(.dark) .preview-codeblock .token.constant),
:global(html:not(.dark) .preview-codeblock .token.symbol) { color: #986801; }
:global(html:not(.dark) .preview-codeblock .token.selector),
:global(html:not(.dark) .preview-codeblock .token.attr-name),
:global(html:not(.dark) .preview-codeblock .token.string),
:global(html:not(.dark) .preview-codeblock .token.char),
:global(html:not(.dark) .preview-codeblock .token.builtin),
:global(html:not(.dark) .preview-codeblock .token.inserted) { color: #50a14f; }
:global(html:not(.dark) .preview-codeblock .token.operator),
:global(html:not(.dark) .preview-codeblock .token.entity),
:global(html:not(.dark) .preview-codeblock .token.url),
:global(html:not(.dark) .preview-codeblock .language-css .token.string),
:global(html:not(.dark) .preview-codeblock .style .token.string) { color: #383a42; }
:global(html:not(.dark) .preview-codeblock .token.atrule),
:global(html:not(.dark) .preview-codeblock .token.attr-value),
:global(html:not(.dark) .preview-codeblock .token.keyword) { color: #a626a4; }
:global(html:not(.dark) .preview-codeblock .token.function),
:global(html:not(.dark) .preview-codeblock .token.class-name) { color: #4078f2; }
:global(html:not(.dark) .preview-codeblock .token.regex),
:global(html:not(.dark) .preview-codeblock .token.important),
:global(html:not(.dark) .preview-codeblock .token.variable) { color: #e45649; }
:global(html:not(.dark) .preview-codeblock .token.deleted) { color: #e45649; }

/* Prism line numbers */
:global(.preview-codeblock.line-numbers) {
  position: relative;
  padding-left: 3rem !important;
  counter-reset: linenumber;
}
:global(.preview-codeblock .line-numbers-rows) {
  position: absolute;
  pointer-events: none;
  top: 0.75rem;
  left: 0;
  width: 2.5rem;
  letter-spacing: -1px;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  user-select: none;
}
:global(html:not(.dark) .preview-codeblock .line-numbers-rows) {
  border-right: 1px solid rgba(0, 0, 0, 0.08);
}
:global(.preview-codeblock .line-numbers-rows > span:before) {
  counter-increment: linenumber;
  content: counter(linenumber);
  color: rgba(255, 255, 255, 0.3);
  display: block;
  text-align: right;
}
:global(html:not(.dark) .preview-codeblock .line-numbers-rows > span:before) {
  color: rgba(0, 0, 0, 0.25);
}

/* Prism line highlight */
:global(.preview-codeblock .line-highlight) {
  margin-top: 0.75rem !important;
  background: rgba(255, 255, 255, 0.08);
}
:global(html:not(.dark) .preview-codeblock .line-highlight) {
  background: rgba(0, 0, 0, 0.05);
}

/* Code blocks inside callouts */
:global(.preview-callout .preview-code-wrapper) {
  margin: 0.5rem 0;
}

/* Ensure wrapper pre/code don't inherit conflicting styles */
:global(.preview-code-wrapper pre),
:global(.preview-code-wrapper code) {
  background: transparent !important;
  color: inherit !important;
}

/* Images */
.prose :global(.preview-img) {
  max-width: 100%;
  border-radius: 0.5rem;
  margin: 0.5rem 0;
}

/* Links */
.prose :global(.preview-link) {
  color: var(--primary);
  text-decoration: underline;
}

/* Blockquotes */
.prose :global(.preview-blockquote) {
  border-left: 4px solid var(--btn-regular-bg-hover, rgba(128, 128, 128, 0.4));
  padding-left: 1rem;
  margin: 0.5rem 0;
  color: var(--deep-text, inherit);
  opacity: 0.9;
}

/* Horizontal rules */
.prose :global(.preview-hr) {
  border: none;
  border-top: 1px solid var(--btn-regular-bg-hover, rgba(128, 128, 128, 0.3));
  margin: 1rem 0;
}

/* Lists */
.prose :global(.preview-list) {
  padding-left: 1.5rem;
  margin: 0.5rem 0;
  color: var(--deep-text, inherit);
}
.prose :global(.preview-list li) {
  margin: 0.25rem 0;
}
.prose :global(.preview-task-list) {
  list-style: none;
  padding-left: 0.5rem;
}
.prose :global(.preview-task) {
  list-style: none;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}
.prose :global(.preview-task input) {
  margin-top: 0.3rem;
}

/* Spoilers */
.prose :global(.preview-spoiler) {
  background: var(--deep-text, #555);
  color: var(--deep-text, #555);
  border-radius: 0.25rem;
  padding: 0 0.25rem;
  cursor: pointer;
  transition: color 0.2s;
}
.prose :global(.preview-spoiler:hover) {
  color: transparent;
}

/* GitHub cards */
.prose :global(.preview-github-card) {
  padding: 0.75rem;
  border: 1px solid var(--btn-regular-bg-hover, rgba(128, 128, 128, 0.3));
  border-radius: 0.5rem;
  margin: 0.5rem 0;
  color: var(--deep-text, inherit);
}

/* Callouts */
.prose :global(.preview-callout) {
  padding: 0.75rem 1rem;
  border-radius: 0.25rem;
  margin: 0.5rem 0;
  color: var(--deep-text, inherit);
}
.prose :global(.preview-callout-title) {
  font-weight: 700;
  margin-bottom: 0.4rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.prose :global(.preview-callout-icon) {
  font-size: 1.1em;
}
.prose :global(.preview-callout-body) {
  color: var(--deep-text, inherit);
}
.prose :global(.preview-callout-body p) {
  margin: 0.25rem 0;
}

/* Epigraphs */
.prose :global(.preview-epigraph) {
  margin: 1rem 0;
  text-align: center;
}
.prose :global(.preview-epigraph-quote) {
  border: none;
  padding: 0;
  margin: 0 0 0.3rem 0;
  font-style: italic;
  color: var(--deep-text, inherit);
  opacity: 0.85;
}
.prose :global(.preview-epigraph-author) {
  font-size: 0.85em;
  color: var(--meta-color, rgba(128, 128, 128, 0.8));
}

/* Tables */
.prose :global(.preview-table) {
  border-collapse: collapse;
  width: 100%;
  margin: 0.75rem 0;
  font-size: 0.9em;
  color: var(--deep-text, inherit);
}
.prose :global(.preview-table th),
.prose :global(.preview-table td) {
  border: 1px solid var(--btn-regular-bg-hover, rgba(128, 128, 128, 0.3));
  padding: 0.4rem 0.6rem;
}
.prose :global(.preview-table th) {
  background: var(--btn-regular-bg-hover, rgba(128, 128, 128, 0.1));
  font-weight: 600;
}
.prose :global(.preview-table-tuack) {
  border-style: solid;
  border-width: 2px 0;
}
.prose :global(.preview-table-tuack th),
.prose :global(.preview-table-tuack td) {
  border: 1px solid var(--btn-regular-bg-hover, rgba(128, 128, 128, 0.2));
}
.prose :global(.preview-table-tuack thead) {
  border-bottom: 2px solid var(--btn-regular-bg-hover, rgba(128, 128, 128, 0.4));
}
.prose :global(.preview-table-three) {
  border-top: 2px solid var(--deep-text, rgba(128, 128, 128, 0.5));
  border-bottom: 2px solid var(--deep-text, rgba(128, 128, 128, 0.5));
}
.prose :global(.preview-table-three th),
.prose :global(.preview-table-three td) {
  border: none;
  border-bottom: 1px solid var(--btn-regular-bg-hover, rgba(128, 128, 128, 0.15));
}
.prose :global(.preview-table-three thead th) {
  border-bottom: 1px solid var(--deep-text, rgba(128, 128, 128, 0.3));
}
.prose :global(.preview-table-three tbody tr:last-child td) {
  border-bottom: none;
}

/* Math display */
.prose :global(.preview-math-display) {
  text-align: center;
  margin: 0.75rem 0;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0.5rem 0;
}

/* KaTeX adjustments for dark mode */
.prose :global(.katex) {
  font-size: 1.05em;
}

/* KaTeX error display */
.prose :global(.katex-error) {
  color: #cc0000;
  font-family: var(--font-code, ui-monospace, monospace);
  font-size: 0.85em;
}

/* Mermaid/PlantUML placeholder */
.prose :global(.preview-mermaid-placeholder) {
  padding: 0.75rem 1rem;
  border: 1px dashed var(--btn-regular-bg-hover, rgba(128, 128, 128, 0.4));
  border-radius: 0.5rem;
  margin: 0.75rem 0;
  font-size: 0.85rem;
  color: var(--deep-text, inherit);
  opacity: 0.8;
}

.prose :global(.preview-mermaid-code) {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: var(--btn-regular-bg-hover, rgba(128, 128, 128, 0.15));
  border-radius: 0.25rem;
  font-family: var(--font-code, ui-monospace, monospace);
  font-size: 0.8rem;
  white-space: pre-wrap;
  overflow-x: auto;
}
</style>
