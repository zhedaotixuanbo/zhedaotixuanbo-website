<script lang="ts">
import { onMount, afterUpdate } from "svelte";
import katex from "katex";
import { getRepoInfo, fetchPostRaw, parsePostMarkdown, fetchPostFileList, postExistsInList } from "@/utils/github-content";

export let postId: string;
export let staticTitle: string;
export let staticContentSelector = ".static-post-body";

let loading = true;
let error = "";
let notFound = false;
let postBody = "";
let postTitle = "";
let prismReady = false;
let repoConfigured = false;
let contentVisible = false;

function loadPrism() {
  if (document.getElementById("dyn-prism-script")) return;
  const s = document.createElement("script");
  s.id = "dyn-prism-script";
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
  const el = document.querySelector(".dyn-post-content");
  if (el) {
    w.Prism.highlightAllUnder(el);
    el.querySelectorAll(".dyn-copy-btn").forEach((btn) => {
      if (btn.getAttribute("data-bound")) return;
      btn.setAttribute("data-bound", "1");
      btn.addEventListener("click", (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const wrapper = target.closest(".dyn-code-wrapper");
        if (!wrapper) return;
        const codeEl = wrapper.querySelector("code");
        if (!codeEl) return;
        navigator.clipboard.writeText(codeEl.textContent || "").then(() => {
          target.textContent = "已复制";
          setTimeout(() => { target.textContent = "复制"; }, 1500);
        });
      });
    });
  }
}

onMount(async () => {
  try {
    const repo = await getRepoInfo();
    if (!repo) {
      repoConfigured = false;
      loading = false;
      return;
    }
    repoConfigured = true;

    // 只用 Trees API 检查文件是否存在
    const fileList = await fetchPostFileList(repo);
    if (fileList === null) {
      // Trees API 调用失败（网络问题/速率限制），保留静态内容
      loading = false;
      return;
    }

    if (!postExistsInList(postId, fileList)) {
      // Trees API 确认文件不存在
      notFound = true;
      loading = false;
      hideStaticContent();
      return;
    }

    // 文件存在，尝试加载最新内容
    loadPrism();
    const raw = await fetchPostRaw(repo, postId);
    if (raw) {
      const parsed = parsePostMarkdown(raw);
      postTitle = parsed.frontmatter.title;
      postBody = parsed.body;
      if (parsed.frontmatter.title && parsed.frontmatter.title !== staticTitle) {
        document.title = parsed.frontmatter.title;
      }
      contentVisible = true;
      hideStaticContent();
    }
    // raw 获取失败也没关系，静态内容还在
    loading = false;
  } catch {
    loading = false;
  }
});

function hideStaticContent() {
  if (!staticContentSelector) return;
  const el = document.querySelector(staticContentSelector);
  if (el) {
    (el as HTMLElement).style.display = "none";
  }
}

afterUpdate(() => {
  highlightAll();
});

// ===== Markdown Rendering =====

function renderMath(latex: string, displayMode: boolean): string {
  try {
    const escaped = latex.replace(/(?<!\\)%/g, "\\%");
    return katex.renderToString(escaped, {
      displayMode,
      throwOnError: false,
      errorColor: "#cc0000",
      strict: false,
      trust: true,
    });
  } catch {
    return `<span style="color:#cc0000;">${latex}</span>`;
  }
}

function processInlineFormatting(text: string): string {
  text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/__(.+?)__/g, "<strong>$1</strong>");
  text = text.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>");
  text = text.replace(/(?<!_)_(?!_)(.+?)(?<!_)_(?!_)/g, "<em>$1</em>");
  text = text.replace(/~~(.+?)~~/g, "<del>$1</del>");
  text = text.replace(/`([^`]+)`/g, '<code class="dyn-inline-code">$1</code>');
  text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="dyn-img" />');
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="dyn-link">$1</a>');
  text = text.replace(/&lt;(https?:\/\/[^&]+)&gt;/g, '<a href="$1" class="dyn-link">$1</a>');
  text = text.replace(/:spoiler\[([^\]]+)\]/g, '<span class="dyn-spoiler">$1</span>');
  text = text.replace(/\\([\\`*_{}\[\]()#+\-.!])/g, "$1");
  return text;
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
            if (ex) ex.rowspan++;
            else merges.push({ row: pr, col: c, rowspan: 2, colspan: 1 });
            break;
          }
        }
      } else if (cell === "<") {
        merged.add(`${r},${c}`);
        for (let pc = c - 1; pc >= 0; pc--) {
          if (!merged.has(`${r},${pc}`)) {
            const ex = merges.find((m) => m.row === r && m.col === pc);
            if (ex) ex.colspan++;
            else merges.push({ row: r, col: pc, rowspan: 1, colspan: 2 });
            break;
          }
        }
      }
    }
  }

  const styleClass = tableStyle === "tuack" ? "dyn-table-tuack" : tableStyle === "three" ? "dyn-table-three" : "";
  let html = `<table class="dyn-table ${styleClass}"><thead><tr>`;
  for (let c = 0; c < headerCells.length; c++) {
    html += `<th style="text-align:${alignments[c] || "left"};">${processInlineFormatting(headerCells[c])}</th>`;
  }
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

  // Code blocks
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
      `<div class="dyn-code-wrapper"><div class="dyn-code-toolbar"><span class="dyn-code-lang-badge">${badge}</span><button class="dyn-copy-btn" type="button">复制</button></div><pre class="dyn-codeblock${lnClass}"${hlAttr}><code class="language-${lang}">${codeContent}</code></pre></div>`
    );
  });

  // Math
  text = text.replace(/\$\$([\s\S]*?)\$\$/g, (_m, m: string) =>
    stash(`<div class="dyn-math-display">${renderMath(m.trim(), true)}</div>`));
  text = text.replace(/(?<!\$)\$(?!\$)([^\$\n]+?)(?<!\$)\$(?!\$)/g, (_m, m: string) =>
    stash(renderMath(m, false)));

  // Callouts
  const cs: Record<string, { color: string; icon: string; bg: string }> = {
    info: { color: "#3b82f6", icon: "ℹ", bg: "rgba(59,130,246,0.1)" },
    success: { color: "#22c55e", icon: "✓", bg: "rgba(34,197,94,0.1)" },
    warning: { color: "#f59e0b", icon: "⚠", bg: "rgba(245,158,11,0.1)" },
    error: { color: "#ef4444", icon: "✗", bg: "rgba(239,68,68,0.1)" },
  };
  for (let n = 3; n <= 10; n++) {
    const c = ":".repeat(n);
    const re = new RegExp(`^${c}(info|success|warning|error)(?:\\[([^\\]]*)\\])?(?:\\{open\\})?\\s*$\\n([\\s\S]*?)\\n${c}\\s*$`, "gm");
    text = text.replace(re, (_m, t: string, title: string, content: string) => {
      const s = cs[t] || cs.info;
      const th = title ? `<div class="dyn-callout-title" style="color:${s.color};"><span class="dyn-callout-icon">${s.icon}</span> ${title}</div>` : "";
      return stash(`<div class="dyn-callout" style="border-left:4px solid ${s.color};background:${s.bg};">${th}<div class="dyn-callout-body">${processInlineFormatting(content.trim())}</div></div>`);
    });
  }

  // Alignment
  for (let n = 3; n <= 10; n++) {
    const c = ":".repeat(n);
    const re = new RegExp(`^${c}align\\{(center|right|left)\\}\\s*$\\n([\\s\S]*?)\\n${c}\\s*$`, "gm");
    text = text.replace(re, (_m, a: string, content: string) =>
      stash(`<div style="text-align:${a};">${processInlineFormatting(content.trim())}</div>`));
  }

  // Epigraphs
  for (let n = 3; n <= 10; n++) {
    const c = ":".repeat(n);
    const re = new RegExp(`^${c}epigraph(?:\\[([^\\]]*)\\])?\\s*$\\n([\\s\S]*?)\\n${c}\\s*$`, "gm");
    text = text.replace(re, (_m, title: string, content: string) => {
      const th = title ? `<div class="dyn-epigraph-author">— ${title}</div>` : "";
      return stash(`<div class="dyn-epigraph"><blockquote class="dyn-epigraph-quote">${processInlineFormatting(content.trim())}</blockquote>${th}</div>`);
    });
  }

  // Tables
  text = text.replace(
    /(?:^::cute-table\{(tuack|three)(?:=\d+)?\}\s*\n)?(^\|.+\|\n\|[-:\s|]+\|\n(?:\|.*\|\n?)+)/gm,
    (_m, style: string | undefined, table: string) => stash(renderTable(table, style))
  );

  // GitHub cards
  text = text.replace(/::github\{repo="([^"]+)"\}/g, (_m, repo: string) =>
    stash(`<div class="dyn-github-card">📦 GitHub: ${repo}</div>`));

  // Headings
  text = text.replace(/^###### (.+)$/gm, '<h6 class="dyn-h6">$1</h6>');
  text = text.replace(/^##### (.+)$/gm, '<h5 class="dyn-h5">$1</h5>');
  text = text.replace(/^#### (.+)$/gm, '<h4 class="dyn-h4">$1</h4>');
  text = text.replace(/^### (.+)$/gm, '<h3 class="dyn-h3">$1</h3>');
  text = text.replace(/^## (.+)$/gm, '<h2 class="dyn-h2">$1</h2>');
  text = text.replace(/^# (.+)$/gm, '<h1 class="dyn-h1">$1</h1>');

  // Inline formatting
  text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/__(.+?)__/g, "<strong>$1</strong>");
  text = text.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>");
  text = text.replace(/(?<!_)_(?!_)(.+?)(?<!_)_(?!_)/g, "<em>$1</em>");
  text = text.replace(/~~(.+?)~~/g, "<del>$1</del>");
  text = text.replace(/`([^`]+)`/g, '<code class="dyn-inline-code">$1</code>');
  text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="dyn-img" />');
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="dyn-link">$1</a>');
  text = text.replace(/&lt;(https?:\/\/[^&]+)&gt;/g, '<a href="$1" class="dyn-link">$1</a>');

  // Blockquote callouts (GFM)
  text = text.replace(
    /^&gt; \[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*(.*)$/gm,
    (_m, type: string, body: string) => {
      const colors: Record<string, string> = {
        NOTE: "#3b82f6", TIP: "#22c55e", IMPORTANT: "#8b5cf6",
        WARNING: "#f59e0b", CAUTION: "#ef4444",
      };
      const color = colors[type] || colors.NOTE;
      return stash(
        `<div class="dyn-callout" style="border-left:4px solid ${color};background:${color}1a;"><div class="dyn-callout-title" style="color:${color};">${type}</div><div class="dyn-callout-body">${body}</div></div>`
      );
    }
  );
  text = text.replace(/^&gt; (.+)$/gm, '<blockquote class="dyn-blockquote">$1</blockquote>');

  // Task lists
  text = text.replace(
    /^- \[([ x])\] (.+)$/gm,
    (_m, checked: string, content: string) =>
      `<li class="dyn-task"><input type="checkbox" ${checked === "x" ? "checked" : ""} disabled /> ${content}</li>`
  );

  // Lists
  text = text.replace(/^[-*+] (.+)$/gm, "<li>$1</li>");
  text = text.replace(/^\d+\. (.+)$/gm, '<li class="dyn-ordered-item">$1</li>');

  // HR
  text = text.replace(/^(-{3,}|\*{3,}|_{3,})\s*$/gm, '<hr class="dyn-hr" />');

  // Spoilers
  text = text.replace(/:spoiler\[([^\]]+)\]/g, '<span class="dyn-spoiler">$1</span>');

  // Escapes
  text = text.replace(/\\([\\`*_{}\[\]()#+\-.!])/g, "$1");

  // Wrap lists
  text = text.replace(/((?:<li[^>]*>.*?<\/li>\n?)+)/g, (match) => {
    if (match.includes("dyn-task")) return `<ul class="dyn-list dyn-task-list">${match}</ul>`;
    if (match.includes("dyn-ordered-item")) return `<ol class="dyn-list">${match}</ol>`;
    return `<ul class="dyn-list">${match}</ul>`;
  });

  // Paragraphs
  const blocks = text.split(/\n\n+/);
  text = blocks.map((block) => {
    block = block.trim();
    if (!block) return "";
    if (block.match(/^<(h[1-6]|pre|blockquote|div|hr|ul|ol|table)/)) return block;
    if (block.match(/^\x00S/)) return block;
    if (block.match(/^<li/)) return block;
    return `<p class="dyn-p">${block.replace(/\n/g, "<br>")}</p>`;
  }).join("\n");

  // Restore
  for (let i = store.length - 1; i >= 0; i--) {
    text = text.replace(`\x00S${i}\x00`, store[i]);
  }

  return text;
}

$: renderedHtml = renderMarkdown(postBody);
</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" crossorigin="anonymous" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.min.css" crossorigin="anonymous" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/line-numbers/prism-line-numbers.min.css" crossorigin="anonymous" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/line-highlight/prism-line-highlight.min.css" crossorigin="anonymous" />
</svelte:head>

{#if notFound}
  <!-- 文章已删除 -->
  <div class="dyn-notfound">
    <div class="dyn-notfound-icon">📄</div>
    <h2 class="dyn-notfound-title">文章不存在或已被删除</h2>
    <p class="dyn-notfound-desc">该文章可能已被作者删除，或尚未发布。</p>
    <a href="/" class="dyn-notfound-btn">返回首页</a>
  </div>
{:else if contentVisible}
  <!-- 动态内容加载成功 -->
  <div class="dyn-post-content markdown-content">
    {@html renderedHtml}
  </div>
{:else if error && repoConfigured}
  <!-- 加载失败时静默保留静态内容，不显示错误 -->
{:else}
  <!-- 加载中或未配置：不显示任何东西，静态内容正常展示 -->
{/if}

<style>
.dyn-post-content {
  color: var(--deep-text, inherit);
  line-height: 1.8;
}

.dyn-post-content :global(.dyn-h1) { font-size: 1.8rem; font-weight: 700; margin: 1rem 0; color: var(--deep-text, inherit); }
.dyn-post-content :global(.dyn-h2) { font-size: 1.5rem; font-weight: 700; margin: 0.9rem 0; color: var(--deep-text, inherit); }
.dyn-post-content :global(.dyn-h3) { font-size: 1.25rem; font-weight: 600; margin: 0.75rem 0; color: var(--deep-text, inherit); }
.dyn-post-content :global(.dyn-h4) { font-size: 1.1rem; font-weight: 600; margin: 0.6rem 0; color: var(--deep-text, inherit); }
.dyn-post-content :global(.dyn-h5) { font-size: 1rem; font-weight: 600; margin: 0.5rem 0; color: var(--deep-text, inherit); }
.dyn-post-content :global(.dyn-h6) { font-size: 0.9rem; font-weight: 600; margin: 0.5rem 0; color: var(--deep-text, inherit); }

.dyn-post-content :global(.dyn-p) { margin: 0.75rem 0; color: var(--deep-text, inherit); }

.dyn-post-content :global(.dyn-inline-code) {
  background: var(--btn-regular-bg-hover, rgba(128,128,128,0.2));
  padding: 0.1rem 0.3rem;
  border-radius: 0.25rem;
  font-size: 0.85em;
  color: var(--deep-text, inherit);
  font-family: var(--font-code, ui-monospace, monospace);
}

.dyn-post-content :global(.dyn-img) { max-width: 100%; border-radius: 0.5rem; margin: 0.5rem 0; }
.dyn-post-content :global(.dyn-link) { color: var(--primary); text-decoration: underline; }

.dyn-post-content :global(.dyn-blockquote) {
  border-left: 4px solid var(--btn-regular-bg-hover, rgba(128,128,128,0.4));
  padding-left: 1rem;
  margin: 0.75rem 0;
  color: var(--deep-text, inherit);
  opacity: 0.9;
}

.dyn-post-content :global(.dyn-hr) {
  border: none;
  border-top: 1px solid var(--btn-regular-bg-hover, rgba(128,128,128,0.3));
  margin: 1.2rem 0;
}

.dyn-post-content :global(.dyn-list) {
  padding-left: 1.5rem;
  margin: 0.75rem 0;
  color: var(--deep-text, inherit);
}
.dyn-post-content :global(.dyn-list li) { margin: 0.3rem 0; }
.dyn-post-content :global(.dyn-task-list) { list-style: none; padding-left: 0.5rem; }
.dyn-post-content :global(.dyn-task) { list-style: none; display: flex; align-items: flex-start; gap: 0.5rem; }
.dyn-post-content :global(.dyn-task input) { margin-top: 0.35rem; }

.dyn-post-content :global(.dyn-spoiler) {
  background: var(--deep-text, #555);
  color: var(--deep-text, #555);
  border-radius: 0.25rem;
  padding: 0 0.25rem;
  cursor: pointer;
  transition: color 0.2s;
}
.dyn-post-content :global(.dyn-spoiler:hover) { color: transparent; }

.dyn-post-content :global(.dyn-github-card) {
  padding: 0.75rem;
  border: 1px solid var(--btn-regular-bg-hover, rgba(128,128,128,0.3));
  border-radius: 0.5rem;
  margin: 0.75rem 0;
  color: var(--deep-text, inherit);
}

/* Callouts */
.dyn-post-content :global(.dyn-callout) {
  padding: 0.75rem 1rem;
  border-radius: 0.25rem;
  margin: 0.75rem 0;
  color: var(--deep-text, inherit);
}
.dyn-post-content :global(.dyn-callout-title) {
  font-weight: 700;
  margin-bottom: 0.4rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.dyn-post-content :global(.dyn-callout-icon) { font-size: 1.1em; }
.dyn-post-content :global(.dyn-callout-body) { color: var(--deep-text, inherit); }
.dyn-post-content :global(.dyn-callout-body p) { margin: 0.25rem 0; }

/* Epigraphs */
.dyn-post-content :global(.dyn-epigraph) { margin: 1rem 0; text-align: center; }
.dyn-post-content :global(.dyn-epigraph-quote) {
  border: none;
  padding: 0;
  margin: 0 0 0.3rem 0;
  font-style: italic;
  color: var(--deep-text, inherit);
  opacity: 0.85;
}
.dyn-post-content :global(.dyn-epigraph-author) {
  font-size: 0.85em;
  color: var(--meta-color, rgba(128,128,128,0.8));
}

/* Tables */
.dyn-post-content :global(.dyn-table) {
  border-collapse: collapse;
  width: 100%;
  margin: 0.75rem 0;
  font-size: 0.9em;
  color: var(--deep-text, inherit);
}
.dyn-post-content :global(.dyn-table th),
.dyn-post-content :global(.dyn-table td) {
  border: 1px solid var(--btn-regular-bg-hover, rgba(128,128,128,0.3));
  padding: 0.4rem 0.6rem;
}
.dyn-post-content :global(.dyn-table th) {
  background: var(--btn-regular-bg-hover, rgba(128,128,128,0.1));
  font-weight: 600;
}
.dyn-post-content :global(.dyn-table-tuack) { border-style: solid; border-width: 2px 0; }
.dyn-post-content :global(.dyn-table-tuack thead) { border-bottom: 2px solid var(--btn-regular-bg-hover, rgba(128,128,128,0.4)); }
.dyn-post-content :global(.dyn-table-three) {
  border-top: 2px solid var(--deep-text, rgba(128,128,128,0.5));
  border-bottom: 2px solid var(--deep-text, rgba(128,128,128,0.5));
}
.dyn-post-content :global(.dyn-table-three th) { border: none; border-bottom: 1px solid var(--deep-text, rgba(128,128,128,0.3)); }
.dyn-post-content :global(.dyn-table-three td) { border: none; border-bottom: 1px solid var(--btn-regular-bg-hover, rgba(128,128,128,0.15)); }
.dyn-post-content :global(.dyn-table-three tbody tr:last-child td) { border-bottom: none; }

/* Math */
.dyn-post-content :global(.dyn-math-display) {
  text-align: center;
  margin: 0.75rem 0;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0.5rem 0;
}
.dyn-post-content :global(.katex) { font-size: 1.05em; }

/* Code blocks - Prism */
.dyn-post-content :global(.dyn-code-wrapper) {
  position: relative;
  margin: 0.75rem 0;
  border-radius: 0.5rem;
  overflow: hidden;
  background: #282c34;
}
:global(html:not(.dark) .dyn-code-wrapper) { background: #fafafa; }

.dyn-post-content :global(.dyn-code-toolbar) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0.75rem;
  background: rgba(0,0,0,0.18);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
:global(html:not(.dark) .dyn-code-toolbar) {
  background: rgba(0,0,0,0.04);
  border-bottom: 1px solid rgba(0,0,0,0.08);
}

.dyn-post-content :global(.dyn-code-lang-badge) {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: rgba(255,255,255,0.5);
  transition: opacity 0.2s;
  font-family: var(--font-code, ui-monospace, monospace);
}
:global(html:not(.dark) .dyn-code-lang-badge) { color: rgba(0,0,0,0.4); }
.dyn-post-content :global(.dyn-code-wrapper:hover .dyn-code-lang-badge) { opacity: 0; }

.dyn-post-content :global(.dyn-copy-btn) {
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.7);
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s, background 0.2s;
  font-family: var(--font-code, ui-monospace, monospace);
}
:global(html:not(.dark) .dyn-copy-btn) {
  background: rgba(0,0,0,0.05);
  border: 1px solid rgba(0,0,0,0.1);
  color: rgba(0,0,0,0.5);
}
.dyn-post-content :global(.dyn-code-wrapper:hover .dyn-copy-btn) { opacity: 1; }
.dyn-post-content :global(.dyn-copy-btn:hover) { background: rgba(255,255,255,0.2); }

.dyn-post-content :global(.dyn-codeblock) {
  margin: 0 !important;
  padding: 0.75rem !important;
  background: #282c34 !important;
  font-family: var(--font-code, ui-monospace, monospace) !important;
  font-size: 0.85rem !important;
  line-height: 1.5 !important;
  overflow-x: auto;
  color: #abb2bf !important;
  border-radius: 0 !important;
}
:global(html:not(.dark) .dyn-codeblock) {
  background: #fafafa !important;
  color: #383a42 !important;
}
.dyn-post-content :global(.dyn-codeblock code) {
  background: transparent !important;
  padding: 0 !important;
  font-family: inherit !important;
  font-size: inherit !important;
  color: inherit !important;
  text-shadow: none !important;
}

/* Prism token colors - Dark */
.dyn-post-content :global(.dyn-codeblock .token.comment),
.dyn-post-content :global(.dyn-codeblock .token.prolog),
.dyn-post-content :global(.dyn-codeblock .token.doctype),
.dyn-post-content :global(.dyn-codeblock .token.cdata) { color: #7f848e; font-style: italic; }
.dyn-post-content :global(.dyn-codeblock .token.punctuation) { color: #abb2bf; }
.dyn-post-content :global(.dyn-codeblock .token.property),
.dyn-post-content :global(.dyn-codeblock .token.tag),
.dyn-post-content :global(.dyn-codeblock .token.boolean),
.dyn-post-content :global(.dyn-codeblock .token.number),
.dyn-post-content :global(.dyn-codeblock .token.constant),
.dyn-post-content :global(.dyn-codeblock .token.symbol) { color: #d19a66; }
.dyn-post-content :global(.dyn-codeblock .token.selector),
.dyn-post-content :global(.dyn-codeblock .token.attr-name),
.dyn-post-content :global(.dyn-codeblock .token.string),
.dyn-post-content :global(.dyn-codeblock .token.char),
.dyn-post-content :global(.dyn-codeblock .token.builtin),
.dyn-post-content :global(.dyn-codeblock .token.inserted) { color: #98c379; }
.dyn-post-content :global(.dyn-codeblock .token.operator),
.dyn-post-content :global(.dyn-codeblock .token.entity),
.dyn-post-content :global(.dyn-codeblock .token.url) { color: #56b6c2; }
.dyn-post-content :global(.dyn-codeblock .token.atrule),
.dyn-post-content :global(.dyn-codeblock .token.attr-value),
.dyn-post-content :global(.dyn-codeblock .token.keyword) { color: #c678dd; }
.dyn-post-content :global(.dyn-codeblock .token.function),
.dyn-post-content :global(.dyn-codeblock .token.class-name) { color: #61afef; }
.dyn-post-content :global(.dyn-codeblock .token.regex),
.dyn-post-content :global(.dyn-codeblock .token.important),
.dyn-post-content :global(.dyn-codeblock .token.variable) { color: #e06c75; }

/* Prism token colors - Light */
:global(html:not(.dark) .dyn-codeblock .token.comment),
:global(html:not(.dark) .dyn-codeblock .token.prolog),
:global(html:not(.dark) .dyn-codeblock .token.doctype),
:global(html:not(.dark) .dyn-codeblock .token.cdata) { color: #a0a1a7; font-style: italic; }
:global(html:not(.dark) .dyn-codeblock .token.punctuation) { color: #383a42; }
:global(html:not(.dark) .dyn-codeblock .token.property),
:global(html:not(.dark) .dyn-codeblock .token.tag),
:global(html:not(.dark) .dyn-codeblock .token.boolean),
:global(html:not(.dark) .dyn-codeblock .token.number),
:global(html:not(.dark) .dyn-codeblock .token.constant),
:global(html:not(.dark) .dyn-codeblock .token.symbol) { color: #986801; }
:global(html:not(.dark) .dyn-codeblock .token.selector),
:global(html:not(.dark) .dyn-codeblock .token.attr-name),
:global(html:not(.dark) .dyn-codeblock .token.string),
:global(html:not(.dark) .dyn-codeblock .token.char),
:global(html:not(.dark) .dyn-codeblock .token.builtin),
:global(html:not(.dark) .dyn-codeblock .token.inserted) { color: #50a14f; }
:global(html:not(.dark) .dyn-codeblock .token.operator),
:global(html:not(.dark) .dyn-codeblock .token.entity),
:global(html:not(.dark) .dyn-codeblock .token.url) { color: #383a42; }
:global(html:not(.dark) .dyn-codeblock .token.atrule),
:global(html:not(.dark) .dyn-codeblock .token.attr-value),
:global(html:not(.dark) .dyn-codeblock .token.keyword) { color: #a626a4; }
:global(html:not(.dark) .dyn-codeblock .token.function),
:global(html:not(.dark) .dyn-codeblock .token.class-name) { color: #4078f2; }
:global(html:not(.dark) .dyn-codeblock .token.regex),
:global(html:not(.dark) .dyn-codeblock .token.important),
:global(html:not(.dark) .dyn-codeblock .token.variable) { color: #e45649; }

/* Line numbers */
.dyn-post-content :global(.dyn-codeblock.line-numbers) {
  position: relative;
  padding-left: 3rem !important;
  counter-reset: linenumber;
}
.dyn-post-content :global(.dyn-codeblock .line-numbers-rows) {
  position: absolute;
  pointer-events: none;
  top: 0.75rem;
  left: 0;
  width: 2.5rem;
  letter-spacing: -1px;
  border-right: 1px solid rgba(255,255,255,0.08);
  user-select: none;
}
:global(html:not(.dark) .dyn-codeblock .line-numbers-rows) {
  border-right: 1px solid rgba(0,0,0,0.08);
}
.dyn-post-content :global(.dyn-codeblock .line-numbers-rows > span:before) {
  counter-increment: linenumber;
  content: counter(linenumber);
  color: rgba(255,255,255,0.3);
  display: block;
  text-align: right;
}
:global(html:not(.dark) .dyn-codeblock .line-numbers-rows > span:before) {
  color: rgba(0,0,0,0.25);
}

/* Line highlight */
.dyn-post-content :global(.dyn-codeblock .line-highlight) {
  margin-top: 0.75rem !important;
  background: rgba(255,255,255,0.08);
}
:global(html:not(.dark) .dyn-codeblock .line-highlight) {
  background: rgba(0,0,0,0.05);
}

.dyn-post-content :global(.dyn-callout .dyn-code-wrapper) { margin: 0.5rem 0; }
.dyn-post-content :global(.dyn-code-wrapper pre),
.dyn-post-content :global(.dyn-code-wrapper code) {
  background: transparent !important;
  color: inherit !important;
}

/* Not found page */
.dyn-notfound {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--deep-text, inherit);
}
.dyn-notfound-icon { font-size: 3rem; margin-bottom: 1rem; opacity: 0.5; }
.dyn-notfound-title { font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem; }
.dyn-notfound-desc { font-size: 0.9rem; color: var(--meta-color, rgba(128,128,128,0.8)); margin-bottom: 1.5rem; }
.dyn-notfound-btn {
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background: var(--primary);
  color: white;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.15s;
}
.dyn-notfound-btn:hover { transform: scale(1.05); }
.dyn-notfound-btn:active { transform: scale(0.95); }

/* Loading */
.dyn-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1.5rem;
  font-size: 0.85rem;
  color: var(--meta-color, rgba(128,128,128,0.8));
}
.dyn-loading-spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid var(--primary);
  border-top-color: transparent;
  border-radius: 50%;
  animation: dyn-spin 0.8s linear infinite;
}
@keyframes dyn-spin { to { transform: rotate(360deg); } }

/* Error */
.dyn-error {
  padding: 1rem;
  text-align: center;
  color: var(--meta-color, rgba(128,128,128,0.8));
  font-size: 0.85rem;
}
.dyn-error-hint { font-size: 0.75rem; opacity: 0.7; margin-top: 0.25rem; }
</style>
