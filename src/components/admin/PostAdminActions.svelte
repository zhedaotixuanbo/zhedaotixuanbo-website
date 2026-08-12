<script lang="ts">
import { onMount } from "svelte";
import { getGithubConfig } from "@/utils/admin-github";

export let postId: string;

let authed = false;
let showDeleteConfirm = false;
let isDeleting = false;
let deleteStatus = "";

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

onMount(() => {
  authed = isAdminAuthed();
});

function editPost() {
  window.location.href = `/admin/new-post/?edit=${encodeURIComponent(postId)}`;
}

async function deletePost() {
  isDeleting = true;
  deleteStatus = "正在删除...";

  try {
    const config = await getGithubConfig();
    if (!config) {
      deleteStatus = "请先在文章管理页面配置 GitHub 信息";
      isDeleting = false;
      return;
    }

    // 智能尝试多种路径变体
    const basePath = `src/content/posts/${postId}`;
    const pathVariants = [basePath];
    if (!/\.(md|mdx|markdown)$/i.test(postId)) {
      pathVariants.push(`${basePath}.md`, `${basePath}.mdx`);
    }

    let sha: string | null = null;
    let actualPath: string | null = null;

    for (const p of pathVariants) {
      const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${p}?ref=${config.branch}`;
      const resp = await fetch(url, {
        headers: {
          Authorization: `Bearer ${config.token}`,
          Accept: "application/vnd.github+json",
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        sha = data.sha;
        actualPath = p;
        break;
      }
    }

    if (!sha || !actualPath) {
      throw new Error(`无法找到文件: ${postId}（请检查仓库中是否存在此文件）`);
    }

    const deleteUrl = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${actualPath}`;
    const deleteResp = await fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${config.token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `删除文章: ${postId}`,
        sha,
        branch: config.branch,
      }),
    });

    if (deleteResp.ok) {
      deleteStatus = "已删除，正在跳转...";
      try {
        const w = window as any;
        if (w.__allPostMetaCache) delete w.__allPostMetaCache;
        if (w.swup?.cache?.empty) w.swup.cache.empty();
      } catch {
        // ignore cache errors
      }
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } else {
      const errData = await deleteResp.json().catch(() => null);
      throw new Error(errData?.message || `HTTP ${deleteResp.status}`);
    }
  } catch (e) {
    deleteStatus = `删除失败: ${e instanceof Error ? e.message : String(e)}`;
    isDeleting = false;
  }
}
</script>

{#if authed}
  <div class="flex items-center gap-2 mb-4">
    <button
      on:click={editPost}
      class="text-sm font-medium px-3 py-1.5 rounded-lg transition border border-(--line-divider) text-(--deep-text) hover:bg-(--btn-regular-bg-hover)/20 active:scale-95"
    >
      编辑
    </button>
    <button
      on:click={() => (showDeleteConfirm = true)}
      class="text-sm font-medium px-3 py-1.5 rounded-lg transition text-red-500 hover:bg-red-500/10 active:scale-95"
    >
      删除
    </button>
  </div>

  {#if showDeleteConfirm}
    <div
      class="post-del-overlay"
      on:click|self={() => !isDeleting && (showDeleteConfirm = false)}
    >
      <div class="post-del-card">
        <h2 class="post-del-title">确认删除</h2>
        <p class="post-del-desc">
          确定要删除这篇文章吗？此操作不可撤销，将通过 GitHub API 提交删除。
        </p>
        {#if deleteStatus}
          <div
            class="post-del-status {deleteStatus.includes('失败') || deleteStatus.includes('无法')
              ? 'post-del-status-error'
              : 'post-del-status-info'}"
          >
            {deleteStatus}
          </div>
        {/if}
        <div class="post-del-actions">
          <button
            on:click={deletePost}
            disabled={isDeleting}
            class="post-del-btn post-del-btn-danger"
          >
            确认删除
          </button>
          <button
            on:click={() => (showDeleteConfirm = false)}
            disabled={isDeleting}
            class="post-del-btn post-del-btn-cancel"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  {/if}
{/if}

<style>
.post-del-overlay {
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
.post-del-card {
  background: var(--card-bg, #fff);
  border-radius: 1rem;
  padding: 1.5rem;
  width: 100%;
  max-width: 24rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  animation: post-del-in 0.2s ease-out;
}
@keyframes post-del-in {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
.post-del-title {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #ef4444;
}
.post-del-desc {
  font-size: 0.875rem;
  color: var(--meta-color, #888);
  margin-bottom: 1rem;
  line-height: 1.5;
}
.post-del-status {
  margin-bottom: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.8rem;
}
.post-del-status-error {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
}
.post-del-status-info {
  background: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
}
.post-del-actions {
  display: flex;
  gap: 0.5rem;
}
.post-del-btn {
  flex: 1;
  height: 2.5rem;
  border-radius: 0.5rem;
  font-weight: 700;
  font-size: 0.875rem;
  cursor: pointer;
  transition: transform 0.1s;
  border: none;
}
.post-del-btn:active {
  transform: scale(0.95);
}
.post-del-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.post-del-btn-danger {
  background: #ef4444;
  color: #fff;
}
.post-del-btn-danger:hover {
  background: #dc2626;
}
.post-del-btn-cancel {
  background: var(--btn-regular-bg-hover, rgba(128,128,128,0.15));
  color: var(--deep-text, inherit);
}
:global(html.dark) .post-del-card {
  background: var(--card-bg, #1a1a2e);
}
:global(html.dark) .post-del-desc {
  color: rgba(255,255,255,0.5);
}
</style>
