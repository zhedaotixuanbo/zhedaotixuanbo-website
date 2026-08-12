<script lang="ts">
import { onMount } from "svelte";
import { getRepoInfo, fetchPostFileList, postExistsInList } from "@/utils/github-content";
import { getGithubConfig } from "@/utils/admin-github";

/**
 * 文章 ID 列表（来自静态页面），顺序必须与页面上的卡片顺序一致
 */
export let postIds: string[] = [];

/** 卡片元素的选择器 */
export let cardSelector = ".post-card-item";

/** 容器选择器（用于查找卡片） */
export let containerSelector = "#post-list-container";

let deletedCount = 0;
let refreshed = false;
let repoConfigured = false;

onMount(async () => {
  try {
    const repo = await getRepoInfo();
    if (!repo) {
      repoConfigured = false;
      return;
    }
    repoConfigured = true;

    // 尝试使用认证请求（如果管理员已登录，可用 5000次/小时 限额）
    let token: string | undefined;
    try {
      const config = await getGithubConfig();
      if (config) token = config.token;
    } catch {
      // 非管理员或未配置，使用匿名请求
    }

    const fileList = await fetchPostFileList(repo, token);
    if (!fileList) {
      // Trees API 调用失败（可能是速率限制），静默返回
      return;
    }

    // 找出已删除的文章索引
    const deletedIndexes: number[] = [];
    postIds.forEach((id, index) => {
      if (!postExistsInList(id, fileList)) {
        deletedIndexes.push(index);
        deletedCount++;
      }
    });

    if (deletedCount === 0) {
      refreshed = true;
      return;
    }

    // 隐藏已删除的卡片
    const container = document.querySelector(containerSelector);
    if (!container) {
      refreshed = true;
      return;
    }

    const cards = container.querySelectorAll(cardSelector);
    deletedIndexes.forEach((idx) => {
      const card = cards[idx];
      if (card) {
        (card as HTMLElement).style.display = "none";
      }
    });

    // 如果是归档页面，同步更新年份计数和可见性
    const yearBlocks = container.querySelectorAll(".archive-year-block");
    if (yearBlocks.length > 0) {
      yearBlocks.forEach((block) => {
        const allPosts = block.querySelectorAll(".archive-post");
        const visiblePosts = Array.from(allPosts).filter(
          (p) => (p as HTMLElement).style.display !== "none" && !(p as HTMLElement).hidden
        );
        const countEl = block.querySelector(".archive-year-count");
        if (countEl) countEl.textContent = String(visiblePosts.length);
        // 隐藏没有可见文章的年份块
        if (visiblePosts.length === 0) {
          (block as HTMLElement).style.display = "none";
        }
      });
    }

    refreshed = true;

    // 派发自定义事件，通知页面更新计数
    window.dispatchEvent(new CustomEvent("post-list-refreshed", {
      detail: { deletedCount, total: postIds.length, remaining: postIds.length - deletedCount },
    }));
  } catch {
    // 静默失败，保留静态列表
  }
});
</script>

{#if refreshed && repoConfigured && deletedCount > 0}
  <div class="dyn-list-badge">
    <span class="dyn-list-badge-dot"></span>
    已从 GitHub 同步，隐藏了 {deletedCount} 篇已删除的文章
  </div>
{:else if refreshed && repoConfigured && deletedCount === 0}
  <div class="dyn-list-badge">
    <span class="dyn-list-badge-dot"></span>
    已从 GitHub 同步，文章列表为最新
  </div>
{/if}

<style>
.dyn-list-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.75rem;
  font-size: 0.75rem;
  color: var(--meta-color, rgba(128, 128, 128, 0.8));
  background: var(--btn-regular-bg-hover, rgba(128, 128, 128, 0.1));
  border-radius: 9999px;
  margin-bottom: 0.75rem;
}
.dyn-list-badge-dot {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: #22c55e;
}
</style>
