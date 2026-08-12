<script lang="ts">
import { onMount, afterUpdate } from "svelte";
import katex from "katex";
import { getGithubConfig } from "@/utils/admin-github";

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
  if (document.getElementById("ann-prism-script")) return;
  const s = document.createElement("script");
  s.id = "ann-prism-script";
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
          highlightAll();
        };
        document.head.appendChild(lh);
      };
      document.head.appendChild(ln);
    };
    document.head.appendChild(auto);
  };
  document.head.appendChild(s);
}

function highlightAll() {
  if (!prismReady) return;
  const w = window as any;
  if (!w.Prism) return;
  document.querySelectorAll(".ann-rendered-content").forEach((el) => {
    w.Prism.highlightAllUnder(el);
    el.querySelectorAll(".preview-copy-btn").forEach((btn) => {
      if (btn.getAttribute("data-bound")) return;
      btn.setAttribute("data-bound", "1");
      btn.addEventListener("click", (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const wrapper = target.closest(".preview-code-wrapper");
        if (!wrapper) return;
        const codeEl = wrapper.querySelector("code");
        if (!codeEl) return;
        navigator.clipboard.writeText(codeEl.textContent || "").then(() => {
          target.textContent = "已复制";
          setTimeout(() => { target.textContent = "复制"; }, 1500);
        });
      });
    });
  });
}

export let initialContent: string = "";

let authed = false;
let isEditing = false;
let activeTab: "edit" | "preview" = "edit";
let editContent = "";
let githubToken = "";
let repoOwner = "";
let repoName = "";
let branch = "main";
let isSaving = false;
let statusMsg = "";
let statusType: "info" | "success" | "error" = "info";
let currentContent = "";

onMount(async () => {
  currentContent = initialContent;
  authed = isAdminAuthed();

  // Always try to fetch the latest announcement from GitHub
  // so the content stays in sync even before a rebuild completes
  try {
    const cloudResp = await fetch("/admin-config.json?t=" + Date.now());
    if (cloudResp.ok) {
      const cloud = await cloudResp.json();
      if (cloud.owner && cloud.repo) {
        const b = cloud.branch || "main";
        const rawUrl = `https://raw.githubusercontent.com/${cloud.owner}/${cloud.repo}/${b}/src/config/announcementConfig.ts?t=${Date.now()}`;
        const rawResp = await fetch(rawUrl);
        if (rawResp.ok) {
          const tsContent = await rawResp.text();
          // Parse the content field, handling escaped characters
          const match = tsContent.match(/content:\s*"((?:[^"\\]|\\.)*)"/);
          if (match) {
            currentContent = JSON.parse('"' + match[1] + '"');
          }
        }
      }
    }
  } catch {
    // Fall back to build-time initialContent
  }

  if (authed) {
    const config = await getGithubConfig();
    if (config) {
      githubToken = config.token;
      repoOwner = config.owner;
      repoName = config.repo;
      branch = config.branch;
    }
    loadPrism();
  }
});

function startEdit() {
  editContent = currentContent;
  activeTab = "edit";
  isEditing = true;
}

function cancelEdit() {
  isEditing = false;
  statusMsg = "";
}

function showStatus(msg: string, type: "info" | "success" | "error") {
  statusMsg = msg;
  statusType = type;
  if (type !== "info") {
    setTimeout(() => { statusMsg = ""; }, 4000);
  }
}

function utf8ToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function base64ToUtf8(b64: string): string {
  const binary = atob(b64.replace(/\n/g, ""));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

function replaceFieldInTs(raw: string, field: string, newValue: string): string {
  const lines = raw.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trimStart();
    if (trimmed.startsWith(`${field}:`)) {
      const escaped = newValue
        .replace(/\\/g, "\\\\")
        .replace(/"/g, '\\"')
        .replace(/\n/g, "\\n")
        .replace(/\t/g, "\\t");
      const indent = lines[i].match(/^(\s*)/)?.[1] || "\t";
      lines[i] = `${indent}${field}: "${escaped}",`;
      break;
    }
  }
  return lines.join("\n");
}

async function saveAnnouncement() {
  if (!githubToken || !repoOwner || !repoName) {
    showStatus("请先在文章管理页面配置 GitHub 信息", "error");
    return;
  }
  isSaving = true;
  showStatus("正在保存...", "info");

  try {
    const path = "src/config/announcementConfig.ts";
    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}?ref=${branch}`;
    const resp = await fetch(url, {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github+json",
      },
    });

    if (!resp.ok) throw new Error(`获取文件失败: HTTP ${resp.status}`);
    const data = await resp.json();
    const sha = data.sha;
    const raw = base64ToUtf8(data.content);

    const newRaw = replaceFieldInTs(raw, "content", editContent);
    const encoded = utf8ToBase64(newRaw);

    const putResp = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "更新公告",
        content: encoded,
        branch,
        sha,
      }),
    });

    if (putResp.ok) {
      currentContent = editContent;
      showStatus("已保存，等待自动构建生效", "success");
      setTimeout(() => { isEditing = false; }, 1200);
    } else {
      const errData = await putResp.json().catch(() => null);
      throw new Error(errData?.message || `HTTP ${putResp.status}`);
    }
  } catch (e) {
    showStatus(`保存失败: ${e instanceof Error ? e.message : String(e)}`, "error");
  }
  isSaving = false;
}

// ===== Markdown rendering =====

function renderMath(latex: string, displayMode: boolean): string {
  try {
    const escaped = latex.replace(/(?<!\\)%/g, "\\%");
    return katex.renderToString(escaped, { displayMode, throwOnError: false, errorColor: "#cc0000", strict: false, trust: true });
  } catch { return `<span style="color:#cc0000;">${latex}</span>`; }
}

function parseTableCells(line: string): string[] {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
}

function parseAlignment(sep: string): string[] {
  return parseTableCells(sep).map((cell) => {
    if (cell.startsWith(":") && cell.endsWith(":")) return "center";
    if (cell.endsWith(":")) return "right";
    return "left";
  });
}

function processInlineFormatting(text: string): string {
  text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/__(.+?)__/g, "<strong>$1</strong>");
  text = text.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>");
  text = text.replace(/(?<!_)_(?!_)(.+?)(?<!_)_(?!_)/g, "<em>$1</em>");
  text = text.replace(/~~(.+?)~~/g, "<del>$1</del>");
  text = text.replace(/`([^`]+)`/g, '<code class="preview-inline-code">$1</code>');
  text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="preview-img" />');
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="preview-link">$1</a>');
  text = text.replace(/&lt;(https?:\/\/[^&]+)&gt;/g, '<a href="$1" class="preview-link">$1</a>');
  text = text.replace(/:spoiler\[([^\]]+)\]/g, '<span class="preview-spoiler">$1</span>');
  text = text.replace(/\\([\\`*_{}\[\]()#+\-.!])/g, "$1");
  return text;
}

function renderTable(tableText: string, tableStyle?: string): string {
  const lines = tableText.trim().split("\n").filter((l) => l.trim());
  if (lines.length < 2) return tableText;
  const headerCells = parseTableCells(lines[0]);
  const alignments = parseAlignment(lines[1]);
  const dataRows: string[][] = [];
  for (let i = 2; i < lines.length; i++) dataRows.push(parseTableCells(lines[i]));
  const merges: { row: number; col: number; rowspan: number; colspan: number }[] = [];
  const merged: Set<string> = new Set();
  for (let r = 0; r < dataRows.length; r++) {
    for (let c = 0; c < dataRows[r].length; c++) {
      const cell = dataRows[r][c].trim();
      if (cell === "^") {
        merged.add(`${r},${c}`);
        for (let pr = r - 1; pr >= 0; pr--) {
          if (!merged.has(`${pr},${c}`)) {
            const ex = merges.find((m) => m.row === pr && m.col === c);
            if (ex) ex.rowspan++; else merges.push({ row: pr, col: c, rowspan: 2, colspan: 1 });
            break;
          }
        }
      } else if (cell === "<") {
        merged.add(`${r},${c}`);
        for (let pc = c - 1; pc >= 0; pc--) {
          if (!merged.has(`${r},${pc}`)) {
            const ex = merges.find((m) => m.row === r && m.col === pc);
            if (ex) ex.colspan++; else merges.push({ row: r, col: pc, rowspan: 1, colspan: 2 });
            break;
          }
        }
      }
    }
  }
  const styleClass = tableStyle === "tuack" ? "preview-table-tuack" : tableStyle === "three" ? "preview-table-three" : "";
  let html = `<table class="preview-table ${styleClass}"><thead><tr>`;
  for (let c = 0; c < headerCells.length; c++) html += `<th style="text-align:${alignments[c] || "left"};">${processInlineFormatting(headerCells[c])}</th>`;
  html += "</tr></thead><tbody>";
  for (let r = 0; r < dataRows.length; r++) {
    html += "<tr>";
    for (let c = 0; c < dataRows[r].length; c++) {
      if (merged.has(`${r},${c}`)) continue;
      const cell = dataRows[r][c].trim();
      const merge = merges.find((m) => m.row === r && m.col === c);
      const attrs = merge ? ` rowspan="${merge.rowspan}" colspan="${merge.colspan}"` : "";
      html += `<td${attrs} style="text-align:${alignments[c] || "left"};">${processInlineFormatting(cell)}</td>`;
    }
    html += "</tr>";
  }
  html += "</tbody></table>";
  return html;
}

function renderMarkdown(md: string): string {
  if (!md) return "";
  const store: string[] = [];
  const stash = (html: string): string => { store.push(html); return `\x00S${store.length - 1}\x00`; };

  let text = md.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  text = text.replace(/\\\$/g, () => stash("$"));

  text = text.replace(/```([^\n]*)\n([\s\S]*?)```/g, (_m, info: string, code: string) => {
    const parts = (info || "").trim().split(/\s+/).filter(Boolean);
    const lang = parts[0] || "plaintext";
    const showLn = parts.includes("line-numbers");
    const linesParam = parts.find((p) => p.startsWith("lines="));
    const codeContent = code.replace(/\n$/, "");
    const lnClass = showLn ? " line-numbers" : "";
    const hlAttr = linesParam ? ` data-line="${linesParam.replace("lines=", "")}"` : "";
    const badge = lang && lang !== "plaintext" ? lang.toUpperCase() : "TEXT";
    return stash(
      `<div class="preview-code-wrapper"><div class="preview-code-toolbar"><span class="preview-code-lang-badge">${badge}</span><button class="preview-copy-btn" type="button">复制</button></div><pre class="preview-codeblock${lnClass}"${hlAttr}><code class="language-${lang}">${codeContent}</code></pre></div>`
    );
  });

  text = text.replace(/\$\$([\s\S]*?)\$\$/g, (_m, m: string) => stash(`<div class="preview-math-display">${renderMath(m.trim(), true)}</div>`));
  text = text.replace(/(?<!\$)\$(?!\$)([^\$\n]+?)(?<!\$)\$(?!\$)/g, (_m, m: string) => stash(renderMath(m, false)));

  const cs: Record<string, { color: string; icon: string; bg: string }> = {
    info: { color: "#3b82f6", icon: "ℹ", bg: "rgba(59,130,246,0.1)" },
    success: { color: "#22c55e", icon: "✓", bg: "rgba(34,197,94,0.1)" },
    warning: { color: "#f59e0b", icon: "⚠", bg: "rgba(245,158,11,0.1)" },
    error: { color: "#ef4444", icon: "✗", bg: "rgba(239,68,68,0.1)" },
  };
  for (let n = 3; n <= 10; n++) {
    const c = ":".repeat(n);
    const re = new RegExp(`^${c}(info|success|warning|error)(?:\\[([^\\]]*)\\])?(?:\\{open\\})?\\s*$\\n([\\s\\S]*?)\\n${c}\\s*$`, "gm");
    text = text.replace(re, (_m, t: string, title: string, content: string) => {
      const s = cs[t] || cs.info;
      const th = title ? `<div class="preview-callout-title" style="color:${s.color};"><span class="preview-callout-icon">${s.icon}</span> ${title}</div>` : "";
      return stash(`<div class="preview-callout" style="border-left:4px solid ${s.color};background:${s.bg};">${th}<div class="preview-callout-body">${processInlineFormatting(content.trim())}</div></div>`);
    });
  }

  for (let n = 3; n <= 10; n++) {
    const c = ":".repeat(n);
    const re = new RegExp(`^${c}align\\{(center|right|left)\\}\\s*$\\n([\\s\\S]*?)\\n${c}\\s*$`, "gm");
    text = text.replace(re, (_m, a: string, content: string) => stash(`<div style="text-align:${a};">${processInlineFormatting(content.trim())}</div>`));
  }

  for (let n = 3; n <= 10; n++) {
    const c = ":".repeat(n);
    const re = new RegExp(`^${c}epigraph(?:\\[([^\\]]*)\\])?\\s*$\\n([\\s\\S]*?)\\n${c}\\s*$`, "gm");
    text = text.replace(re, (_m, title: string, content: string) => {
      const th = title ? `<div class="preview-epigraph-author">— ${title}</div>` : "";
      return stash(`<div class="preview-epigraph"><blockquote class="preview-epigraph-quote">${processInlineFormatting(content.trim())}</blockquote>${th}</div>`);
    });
  }

  text = text.replace(/(?:^::cute-table\{(tuack|three)(?:=\d+)?\}\s*\n)?(^\|.+\|\n\|[-:\s|]+\|\n(?:\|.*\|\n?)+)/gm, (_m, style: string | undefined, table: string) => stash(renderTable(table, style)));
  text = text.replace(/::github\{repo="([^"]+)"\}/g, (_m, repo: string) => stash(`<div class="preview-github-card">GitHub: ${repo}</div>`));

  text = text.replace(/^###### (.+)$/gm, '<h6 class="preview-h6">$1</h6>');
  text = text.replace(/^##### (.+)$/gm, '<h5 class="preview-h5">$1</h5>');
  text = text.replace(/^#### (.+)$/gm, '<h4 class="preview-h4">$1</h4>');
  text = text.replace(/^### (.+)$/gm, '<h3 class="preview-h3">$1</h3>');
  text = text.replace(/^## (.+)$/gm, '<h2 class="preview-h2">$1</h2>');
  text = text.replace(/^# (.+)$/gm, '<h1 class="preview-h1">$1</h1>');

  text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/__(.+?)__/g, "<strong>$1</strong>");
  text = text.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>");
  text = text.replace(/(?<!_)_(?!_)(.+?)(?<!_)_(?!_)/g, "<em>$1</em>");
  text = text.replace(/~~(.+?)~~/g, "<del>$1</del>");
  text = text.replace(/`([^`]+)`/g, '<code class="preview-inline-code">$1</code>');
  text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="preview-img" />');
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="preview-link">$1</a>');
  text = text.replace(/&lt;(https?:\/\/[^&]+)&gt;/g, '<a href="$1" class="preview-link">$1</a>');

  text = text.replace(/^&gt; \[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*(.*)$/gm, (_m, t: string, body: string) => {
    const colors: Record<string, string> = { NOTE: "#3b82f6", TIP: "#22c55e", IMPORTANT: "#8b5cf6", WARNING: "#f59e0b", CAUTION: "#ef4444" };
    const color = colors[t] || colors.NOTE;
    return stash(`<div class="preview-callout" style="border-left:4px solid ${color};background:${color}1a;"><div class="preview-callout-title" style="color:${color};">${t}</div><div class="preview-callout-body">${body}</div></div>`);
  });
  text = text.replace(/^&gt; (.+)$/gm, '<blockquote class="preview-blockquote">$1</blockquote>');
  text = text.replace(/^- \[([ x])\] (.+)$/gm, (_m, c: string, content: string) => `<li class="preview-task"><input type="checkbox" ${c === "x" ? "checked" : ""} disabled /> ${content}</li>`);
  text = text.replace(/^[-*+] (.+)$/gm, "<li>$1</li>");
  text = text.replace(/^\d+\. (.+)$/gm, '<li class="preview-ordered-item">$1</li>');
  text = text.replace(/^(-{3,}|\*{3,}|_{3,})\s*$/gm, '<hr class="preview-hr" />');
  text = text.replace(/:spoiler\[([^\]]+)\]/g, '<span class="preview-spoiler">$1</span>');
  text = text.replace(/\\([\\`*_{}\[\]()#+\-.!])/g, "$1");

  text = text.replace(/((?:<li[^>]*>.*?<\/li>\n?)+)/g, (match) => {
    if (match.includes("preview-task")) return `<ul class="preview-list preview-task-list">${match}</ul>`;
    if (match.includes("preview-ordered-item")) return `<ol class="preview-list">${match}</ol>`;
    return `<ul class="preview-list">${match}</ul>`;
  });

  const blocks = text.split(/\n\n+/);
  text = blocks.map((block) => {
    block = block.trim();
    if (!block) return "";
    if (block.match(/^<(h[1-6]|pre|blockquote|div|hr|ul|ol|table)/)) return block;
    if (block.match(/^\x00S/)) return block;
    if (block.match(/^<li/)) return block;
    return `<p class="preview-p">${block.replace(/\n/g, "<br>")}</p>`;
  }).join("\n");

  for (let i = store.length - 1; i >= 0; i--) text = text.replace(`\x00S${i}\x00`, store[i]);
  return text;
}

$: viewHtml = renderMarkdown(currentContent);
$: previewHtml = renderMarkdown(editContent);

afterUpdate(() => { highlightAll(); });
</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" crossorigin="anonymous" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.min.css" crossorigin="anonymous" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/line-numbers/prism-line-numbers.min.css" crossorigin="anonymous" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/line-highlight/prism-line-highlight.min.css" crossorigin="anonymous" />
</svelte:head>

{#if !isEditing}
  <!-- View mode -->
  <div class="ann-rendered-content ann-prose">
    {@html viewHtml}
  </div>
  {#if authed}
    <div class="mt-2">
      <button
        on:click={startEdit}
        class="btn-regular rounded-lg px-3 py-1 text-xs font-medium active:scale-95 transition"
      >
        编辑
      </button>
    </div>
  {/if}
{:else}
  <!-- Edit mode -->
  {#if statusMsg}
    <div
      class="mb-2 px-3 py-1.5 rounded-lg text-xs font-medium {statusType === 'success'
        ? 'bg-green-500/15 text-green-600 dark:text-green-400'
        : statusType === 'error'
          ? 'bg-red-500/15 text-red-600 dark:text-red-400'
          : 'bg-blue-500/15 text-blue-600 dark:text-blue-400'}"
    >
      {#if isSaving}
        <span class="inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin mr-1"></span>
      {/if}
      {statusMsg}
    </div>
  {/if}

  <!-- Tabs -->
  <div class="flex gap-1 mb-2">
    <button
      on:click={() => (activeTab = "edit")}
      class="rounded-md px-2.5 py-1 text-xs font-medium transition {activeTab === 'edit'
        ? 'bg-(--primary) text-white'
        : 'btn-plain'}"
    >
      编辑
    </button>
    <button
      on:click={() => (activeTab = "preview")}
      class="rounded-md px-2.5 py-1 text-xs font-medium transition {activeTab === 'preview'
        ? 'bg-(--primary) text-white'
        : 'btn-plain'}"
    >
      预览
    </button>
  </div>

  <!-- Edit tab -->
  {#if activeTab === "edit"}
    <textarea
      bind:value={editContent}
      placeholder="输入公告内容，支持 Markdown 语法"
      class="w-full rounded-lg border border-(--btn-regular-bg-hover) bg-(--card-bg) px-3 py-2 text-sm outline-none focus:border-(--primary) transition resize-y"
      style="min-height: 120px; max-height: 400px;"
    ></textarea>
  {/if}

  <!-- Preview tab -->
  {#if activeTab === "preview"}
    <div class="ann-rendered-content ann-prose rounded-lg border border-(--btn-regular-bg-hover) p-3 overflow-y-auto" style="max-height: 400px;">
      {@html previewHtml}
    </div>
  {/if}

  <!-- Actions -->
  <div class="flex justify-end gap-2 mt-2">
    <button
      on:click={cancelEdit}
      disabled={isSaving}
      class="btn-plain rounded-lg px-3 py-1 text-xs font-medium active:scale-95 transition disabled:opacity-50"
    >
      取消
    </button>
    <button
      on:click={saveAnnouncement}
      disabled={isSaving}
      class="btn-regular rounded-lg px-3 py-1 text-xs font-medium active:scale-95 transition disabled:opacity-50"
    >
      保存
    </button>
  </div>
{/if}

<style>
.ann-prose {
  color: var(--deep-text, inherit);
  line-height: 1.7;
  word-break: break-word;
  overflow-wrap: anywhere;
}

.ann-prose :global(h1) { font-size: 1.4rem; font-weight: 700; margin: 0.5rem 0; }
.ann-prose :global(h2) { font-size: 1.2rem; font-weight: 700; margin: 0.5rem 0; }
.ann-prose :global(h3) { font-size: 1.05rem; font-weight: 600; margin: 0.4rem 0; }
.ann-prose :global(h4) { font-size: 0.95rem; font-weight: 600; margin: 0.4rem 0; }
.ann-prose :global(h5) { font-size: 0.85rem; font-weight: 600; margin: 0.3rem 0; }
.ann-prose :global(h6) { font-size: 0.8rem; font-weight: 600; margin: 0.3rem 0; }
.ann-prose :global(.preview-h1) { font-size: 1.4rem; font-weight: 700; margin: 0.5rem 0; color: var(--deep-text, inherit); }
.ann-prose :global(.preview-h2) { font-size: 1.2rem; font-weight: 700; margin: 0.5rem 0; color: var(--deep-text, inherit); }
.ann-prose :global(.preview-h3) { font-size: 1.05rem; font-weight: 600; margin: 0.4rem 0; color: var(--deep-text, inherit); }
.ann-prose :global(.preview-p) { margin: 0.4rem 0; color: var(--deep-text, inherit); }
.ann-prose :global(.preview-inline-code) { background: var(--btn-regular-bg-hover, rgba(128,128,128,0.2)); padding: 0.1rem 0.3rem; border-radius: 0.25rem; font-size: 0.85em; color: var(--deep-text, inherit); font-family: var(--font-code, ui-monospace, monospace); }
.ann-prose :global(.preview-img) { max-width: 100%; border-radius: 0.5rem; margin: 0.4rem 0; }
.ann-prose :global(.preview-link) { color: var(--primary); text-decoration: underline; }
.ann-prose :global(.preview-blockquote) { border-left: 3px solid var(--btn-regular-bg-hover, rgba(128,128,128,0.4)); padding-left: 0.75rem; margin: 0.4rem 0; color: var(--deep-text, inherit); opacity: 0.9; }
.ann-prose :global(.preview-hr) { border: none; border-top: 1px solid var(--btn-regular-bg-hover, rgba(128,128,128,0.3)); margin: 0.75rem 0; }
.ann-prose :global(.preview-list) { padding-left: 1.25rem; margin: 0.4rem 0; color: var(--deep-text, inherit); }
.ann-prose :global(.preview-list li) { margin: 0.2rem 0; }
.ann-prose :global(.preview-task-list) { list-style: none; padding-left: 0.5rem; }
.ann-prose :global(.preview-task) { list-style: none; display: flex; align-items: flex-start; gap: 0.4rem; }
.ann-prose :global(.preview-task input) { margin-top: 0.25rem; }
.ann-prose :global(.preview-spoiler) { background: var(--deep-text, #555); color: var(--deep-text, #555); border-radius: 0.25rem; padding: 0 0.25rem; cursor: pointer; transition: color 0.2s; }
.ann-prose :global(.preview-spoiler:hover) { color: transparent; }
.ann-prose :global(.preview-github-card) { padding: 0.5rem; border: 1px solid var(--btn-regular-bg-hover, rgba(128,128,128,0.3)); border-radius: 0.4rem; margin: 0.4rem 0; color: var(--deep-text, inherit); font-size: 0.85em; }
.ann-prose :global(.preview-callout) { padding: 0.5rem 0.75rem; border-radius: 0.25rem; margin: 0.4rem 0; color: var(--deep-text, inherit); }
.ann-prose :global(.preview-callout-title) { font-weight: 700; margin-bottom: 0.3rem; display: flex; align-items: center; gap: 0.3rem; }
.ann-prose :global(.preview-callout-icon) { font-size: 1em; }
.ann-prose :global(.preview-callout-body) { color: var(--deep-text, inherit); }
.ann-prose :global(.preview-math-display) { margin: 0.4rem 0; text-align: center; overflow-x: auto; }
.ann-prose :global(.preview-table) { width: 100%; border-collapse: collapse; margin: 0.4rem 0; font-size: 0.85em; }
.ann-prose :global(.preview-table th) { border: 1px solid var(--btn-regular-bg-hover, rgba(128,128,128,0.3)); padding: 0.3rem 0.5rem; font-weight: 600; background: var(--btn-regular-bg-hover, rgba(128,128,128,0.1)); color: var(--deep-text, inherit); }
.ann-prose :global(.preview-table td) { border: 1px solid var(--btn-regular-bg-hover, rgba(128,128,128,0.3)); padding: 0.3rem 0.5rem; color: var(--deep-text, inherit); }
.ann-prose :global(.preview-epigraph) { margin: 0.4rem 0; padding: 0 0.75rem; }
.ann-prose :global(.preview-epigraph-quote) { border-left: 3px solid var(--btn-regular-bg-hover, rgba(128,128,128,0.3)); padding-left: 0.75rem; margin: 0; font-style: italic; color: var(--deep-text, inherit); opacity: 0.85; }
.ann-prose :global(.preview-epigraph-author) { text-align: right; margin-top: 0.2rem; font-size: 0.8em; color: var(--deep-text, inherit); opacity: 0.7; }

/* Code blocks */
:global(.preview-code-wrapper) { position: relative; margin: 0.5rem 0; border-radius: 0.4rem; overflow: hidden; background: #282c34; }
:global(html:not(.dark) .preview-code-wrapper) { background: #fafafa; }
:global(.preview-code-toolbar) { display: flex; justify-content: space-between; align-items: center; padding: 0.3rem 0.6rem; background: rgba(0,0,0,0.18); border-bottom: 1px solid rgba(255,255,255,0.06); }
:global(html:not(.dark) .preview-code-toolbar) { background: rgba(0,0,0,0.04); border-bottom: 1px solid rgba(0,0,0,0.08); }
:global(.preview-code-lang-badge) { font-size: 0.65rem; font-weight: 600; letter-spacing: 0.05em; color: rgba(255,255,255,0.5); transition: opacity 0.2s; font-family: var(--font-code, ui-monospace, monospace); }
:global(html:not(.dark) .preview-code-lang-badge) { color: rgba(0,0,0,0.4); }
:global(.preview-code-wrapper:hover .preview-code-lang-badge) { opacity: 0; }
:global(.preview-copy-btn) { font-size: 0.65rem; padding: 0.15rem 0.4rem; border-radius: 0.2rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.7); cursor: pointer; opacity: 0; transition: opacity 0.2s; font-family: var(--font-code, ui-monospace, monospace); }
:global(html:not(.dark) .preview-copy-btn) { background: rgba(0,0,0,0.05); border: 1px solid rgba(0,0,0,0.1); color: rgba(0,0,0,0.5); }
:global(.preview-code-wrapper:hover .preview-copy-btn) { opacity: 1; }
:global(.preview-codeblock) { margin: 0 !important; padding: 0.6rem; background: #282c34 !important; font-family: var(--font-code, ui-monospace, monospace) !important; font-size: 0.8rem !important; line-height: 1.5 !important; overflow-x: auto; color: #abb2bf !important; border-radius: 0 !important; }
:global(html:not(.dark) .preview-codeblock) { background: #fafafa !important; color: #383a42 !important; }
:global(.preview-codeblock code) { background: transparent !important; padding: 0 !important; font-family: inherit !important; font-size: inherit !important; color: inherit !important; text-shadow: none !important; }

:global(.preview-codeblock .token.comment), :global(.preview-codeblock .token.prolog), :global(.preview-codeblock .token.doctype), :global(.preview-codeblock .token.cdata) { color: #7f848e; font-style: italic; }
:global(.preview-codeblock .token.punctuation) { color: #abb2bf; }
:global(.preview-codeblock .token.property), :global(.preview-codeblock .token.tag), :global(.preview-codeblock .token.boolean), :global(.preview-codeblock .token.number), :global(.preview-codeblock .token.constant), :global(.preview-codeblock .token.symbol) { color: #d19a66; }
:global(.preview-codeblock .token.selector), :global(.preview-codeblock .token.attr-name), :global(.preview-codeblock .token.string), :global(.preview-codeblock .token.char), :global(.preview-codeblock .token.builtin), :global(.preview-codeblock .token.inserted) { color: #98c379; }
:global(.preview-codeblock .token.operator), :global(.preview-codeblock .token.entity), :global(.preview-codeblock .token.url) { color: #56b6c2; }
:global(.preview-codeblock .token.atrule), :global(.preview-codeblock .token.attr-value), :global(.preview-codeblock .token.keyword) { color: #c678dd; }
:global(.preview-codeblock .token.function), :global(.preview-codeblock .token.class-name) { color: #61afef; }
:global(.preview-codeblock .token.regex), :global(.preview-codeblock .token.important), :global(.preview-codeblock .token.variable) { color: #e06c75; }

:global(html:not(.dark) .preview-codeblock .token.comment), :global(html:not(.dark) .preview-codeblock .token.prolog), :global(html:not(.dark) .preview-codeblock .token.doctype), :global(html:not(.dark) .preview-codeblock .token.cdata) { color: #a0a1a7; font-style: italic; }
:global(html:not(.dark) .preview-codeblock .token.punctuation) { color: #383a42; }
:global(html:not(.dark) .preview-codeblock .token.property), :global(html:not(.dark) .preview-codeblock .token.tag), :global(html:not(.dark) .preview-codeblock .token.boolean), :global(html:not(.dark) .preview-codeblock .token.number), :global(html:not(.dark) .preview-codeblock .token.constant), :global(html:not(.dark) .preview-codeblock .token.symbol) { color: #986801; }
:global(html:not(.dark) .preview-codeblock .token.selector), :global(html:not(.dark) .preview-codeblock .token.attr-name), :global(html:not(.dark) .preview-codeblock .token.string), :global(html:not(.dark) .preview-codeblock .token.char), :global(html:not(.dark) .preview-codeblock .token.builtin), :global(html:not(.dark) .preview-codeblock .token.inserted) { color: #50a14f; }
:global(html:not(.dark) .preview-codeblock .token.operator), :global(html:not(.dark) .preview-codeblock .token.entity), :global(html:not(.dark) .preview-codeblock .token.url) { color: #383a42; }
:global(html:not(.dark) .preview-codeblock .token.atrule), :global(html:not(.dark) .preview-codeblock .token.attr-value), :global(html:not(.dark) .preview-codeblock .token.keyword) { color: #a626a4; }
:global(html:not(.dark) .preview-codeblock .token.function), :global(html:not(.dark) .preview-codeblock .token.class-name) { color: #4078f2; }
:global(html:not(.dark) .preview-codeblock .token.regex), :global(html:not(.dark) .preview-codeblock .token.important), :global(html:not(.dark) .preview-codeblock .token.variable) { color: #e45649; }

:global(.preview-codeblock.line-numbers) { position: relative; padding-left: 2.5rem !important; counter-reset: linenumber; }
:global(.preview-codeblock .line-numbers-rows) { position: absolute; pointer-events: none; top: 0.6rem; left: 0; width: 2rem; letter-spacing: -1px; border-right: 1px solid rgba(255,255,255,0.08); user-select: none; }
:global(html:not(.dark) .preview-codeblock .line-numbers-rows) { border-right: 1px solid rgba(0,0,0,0.08); }
:global(.preview-codeblock .line-numbers-rows > span:before) { counter-increment: linenumber; content: counter(linenumber); color: rgba(255,255,255,0.3); display: block; text-align: right; }
:global(html:not(.dark) .preview-codeblock .line-numbers-rows > span:before) { color: rgba(0,0,0,0.25); }
:global(.preview-codeblock .line-highlight) { margin-top: 0.6rem !important; background: rgba(255,255,255,0.08); }
:global(html:not(.dark) .preview-codeblock .line-highlight) { background: rgba(0,0,0,0.05); }
:global(.preview-callout .preview-code-wrapper) { margin: 0.4rem 0; }
:global(.preview-code-wrapper pre), :global(.preview-code-wrapper code) { background: transparent !important; color: inherit !important; }
</style>
