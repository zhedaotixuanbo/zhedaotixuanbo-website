<script lang="ts">
import { onMount } from "svelte";
import { getGithubConfig, findPostFile } from "@/utils/admin-github";

export let postId: string;
export let collection = "posts";
export let showDelete = true;

let authed = false;
let showDeleteConfirm = false;
let isDeleting = false;
let deleteStatus = "";

function isAdminAuthed(): boolean {
  try {
    const raw = localStorage.getItem("firefly_admin_authed");
    if (!raw) return false;
    const data = JSON.parse(raw);
    if (data && data.authed === true) {
      const authDate = new Date(data.time);
      const today = new Date();
      if (authDate.toDateString() === today.toDateString()) {
        return true;
      }
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
  const params = new URLSearchParams();
  params.set("edit", postId);
  if (collection !== "posts") {
    params.set("collection", collection);
  }
  window.location.href = `/admin/new-post/?${params.toString()}`;
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

    // 使用 findPostFile 智能查找实际文件（处理 slug 与文件名不一致的情况）
    const fileInfo = await findPostFile(postId, collection, config);

    if (!fileInfo) {
      throw new Error(`无法找到文件: ${postId}（请检查仓库中是否存在此文件）`);
    }

    const deleteUrl = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${fileInfo.path}`;
    const deleteResp = await fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${config.token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `删除文章: ${postId}`,
        sha: fileInfo.sha,
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
  <div class="flex items-center gap-2 mb-4 flex-wrap">
    <button
      on:click={editPost}
      class="text-sm font-medium px-3 py-1.5 rounded-lg transition border border-(--line-divider) text-(--deep-text) hover:bg-(--btn-regular-bg-hover)/20 active:scale-95"
    >
      编辑
    </button>
    {#if showDelete}
      <button
        on:click={() => { showDeleteConfirm = true; deleteStatus = ""; }}
        class="text-sm font-medium px-3 py-1.5 rounded-lg transition text-red-500 hover:bg-red-500/10 active:scale-95"
      >
        删除
      </button>
    {/if}
    {#if deleteStatus}
      <span class="text-xs {deleteStatus.includes('失败') || deleteStatus.includes('无法') ? 'text-red-500' : 'text-blue-500'}">
        {deleteStatus}
      </span>
    {/if}
  </div>

  {#if showDeleteConfirm}
    <div class="del-modal-overlay" on:click|self={() => { showDeleteConfirm = false; }}>
      <div class="del-modal-card">
        <h2 class="del-modal-title">确认删除</h2>
        <p class="del-modal-desc">确定要删除这篇文章吗？此操作不可撤销，将通过 GitHub API 提交删除。</p>
        {#if deleteStatus}
          <p class="text-xs text-red-500 mb-2">{deleteStatus}</p>
        {/if}
        <div class="del-modal-actions">
          <button
            on:click={deletePost}
            disabled={isDeleting}
            class="del-modal-btn del-modal-btn-danger"
          >
            {isDeleting ? "删除中..." : "确认删除"}
          </button>
          <button
            on:click={() => { showDeleteConfirm = false; deleteStatus = ""; }}
            disabled={isDeleting}
            class="del-modal-btn del-modal-btn-cancel"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  {/if}
{/if}

<style>
.del-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 2147483647;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
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
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
  cursor: pointer;
  border: none;
}
.del-modal-btn:active {
  transform: scale(0.95);
}
.del-modal-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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
:global(html.dark) .del-modal-card {
  background: var(--card-bg, #1a1a2e);
}
:global(html.dark) .del-modal-desc {
  color: rgba(255,255,255,0.5);
}
</style>
