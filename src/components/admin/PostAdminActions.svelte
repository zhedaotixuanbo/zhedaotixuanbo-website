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
      {#if !showDeleteConfirm}
        <button
          on:click={() => { showDeleteConfirm = true; deleteStatus = ""; }}
          class="text-sm font-medium px-3 py-1.5 rounded-lg transition text-red-500 hover:bg-red-500/10 active:scale-95"
        >
          删除
        </button>
      {:else}
        <button
          on:click={deletePost}
          disabled={isDeleting}
          class="text-sm font-medium px-3 py-1.5 rounded-lg transition text-white bg-red-500 hover:bg-red-600 active:scale-95 disabled:opacity-50"
        >
          {isDeleting ? "删除中..." : "确认删除"}
        </button>
        <button
          on:click={() => { showDeleteConfirm = false; deleteStatus = ""; }}
          disabled={isDeleting}
          class="text-sm font-medium px-3 py-1.5 rounded-lg transition border border-(--line-divider) text-(--deep-text) hover:bg-(--btn-regular-bg-hover)/20 active:scale-95 disabled:opacity-50"
        >
          取消
        </button>
      {/if}
    {/if}
    {#if deleteStatus}
      <span class="text-xs {deleteStatus.includes('失败') || deleteStatus.includes('无法') ? 'text-red-500' : 'text-blue-500'}">
        {deleteStatus}
      </span>
    {/if}
  </div>
{/if}
