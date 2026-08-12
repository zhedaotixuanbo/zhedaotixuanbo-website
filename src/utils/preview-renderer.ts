/**
 * 预览渲染器 - 使用 marked 解析 Markdown
 *
 * 替代旧的正则解析器，正确处理嵌套结构、标准 Markdown 语法，
 * 同时扩展洛谷特殊语法（callout、对齐、引文、表格合并、spoiler 等）。
 * 代码高亮由 Prism.js 处理，数学公式由 KaTeX 处理。
 */

import { Marked } from "marked";
import katex from "katex";
import "katex/dist/katex.min.css";
import "katex/dist/contrib/mhchem.mjs";

// KaTeX 渲染
function renderMath(latex: string, displayMode: boolean): string {
  try {
    // 转义 % 符号（KaTeX 中 % 是注释）
    const escaped = latex.replace(/(?<!\\)%/g, "\\%");
    return katex.renderToString(escaped, {
      displayMode,
      throwOnError: false,
      output: "html",
      strict: false,
      trust: true,
    });
  } catch {
    return `<span class="katex-error">${escapeHtml(latex)}</span>`;
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// 内联格式化（用于表格单元格等 marked 不直接处理的场景）
function processInline(text: string): string {
  // bold
  text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/__(.+?)__/g, "<strong>$1</strong>");
  // italic
  text = text.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>");
  // strikethrough
  text = text.replace(/~~(.+?)~~/g, "<del>$1</del>");
  // inline code
  text = text.replace(/`([^`]+)`/g, '<code class="preview-inline-code">$1</code>');
  // images
  text = text.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" class="preview-img" />',
  );
  // links
  text = text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="preview-link">$1</a>',
  );
  // spoilers
  text = text.replace(
    /:spoiler\[([^\]]+)\]/g,
    '<span class="preview-spoiler">$1</span>',
  );
  return text;
}

// 表格合并渲染
function renderTableWithMerging(
  headerCells: string[],
  alignments: string[],
  dataRows: string[][],
  tableStyle?: string,
): string {
  const merges: { row: number; col: number; rowspan: number; colspan: number }[] = [];
  const merged: Set<string> = new Set();

  for (let r = 0; r < dataRows.length; r++) {
    for (let c = 0; c < dataRows[r].length; c++) {
      const cell = dataRows[r][c].trim();
      if (cell === "^") {
        merged.add(`${r},${c}`);
        for (let pr = r - 1; pr >= 0; pr--) {
          if (!merged.has(`${pr},${c}`)) {
            const existing = merges.find((m) => m.row === pr && m.col === c);
            if (existing) existing.rowspan++;
            else merges.push({ row: pr, col: c, rowspan: 2, colspan: 1 });
            break;
          }
        }
      } else if (cell === "<") {
        merged.add(`${r},${c}`);
        for (let pc = c - 1; pc >= 0; pc--) {
          if (!merged.has(`${r},${pc}`)) {
            const existing = merges.find((m) => m.row === r && m.col === pc);
            if (existing) existing.colspan++;
            else merges.push({ row: r, col: pc, rowspan: 1, colspan: 2 });
            break;
          }
        }
      }
    }
  }

  const styleClass =
    tableStyle === "tuack"
      ? "preview-table-tuack"
      : tableStyle === "three"
        ? "preview-table-three"
        : "";
  let html = `<table class="preview-table ${styleClass}">`;

  html += "<thead><tr>";
  for (let c = 0; c < headerCells.length; c++) {
    const align = alignments[c] || "left";
    html += `<th style="text-align:${align};">${processInline(headerCells[c])}</th>`;
  }
  html += "</tr></thead><tbody>";

  for (let r = 0; r < dataRows.length; r++) {
    html += "<tr>";
    for (let c = 0; c < dataRows[r].length; c++) {
      if (merged.has(`${r},${c}`)) continue;
      const cell = dataRows[r][c].trim();
      const align = alignments[c] || "left";
      const merge = merges.find((m) => m.row === r && m.col === c);
      const attrs = merge
        ? ` rowspan="${merge.rowspan}" colspan="${merge.colspan}"`
        : "";
      html += `<td${attrs} style="text-align:${align};">${processInline(cell)}</td>`;
    }
    html += "</tr>";
  }
  html += "</tbody></table>";
  return html;
}

// Callout 样式 - 匹配生产环境 rehype-callouts GitHub 主题
const calloutStyles: Record<
  string,
  { color: string; icon: string; bg: string }
> = {
  note: { color: "#3b82f6", icon: "ℹ", bg: "rgba(59,130,246,0.1)" },
  info: { color: "#3b82f6", icon: "ℹ", bg: "rgba(59,130,246,0.1)" },
  abstract: { color: "#3b82f6", icon: "ℹ", bg: "rgba(59,130,246,0.1)" },
  summary: { color: "#3b82f6", icon: "ℹ", bg: "rgba(59,130,246,0.1)" },
  tldr: { color: "#3b82f6", icon: "ℹ", bg: "rgba(59,130,246,0.1)" },
  todo: { color: "#3b82f6", icon: "ℹ", bg: "rgba(59,130,246,0.1)" },
  tip: { color: "#22c55e", icon: "✓", bg: "rgba(34,197,94,0.1)" },
  success: { color: "#22c55e", icon: "✓", bg: "rgba(34,197,94,0.1)" },
  check: { color: "#22c55e", icon: "✓", bg: "rgba(34,197,94,0.1)" },
  done: { color: "#22c55e", icon: "✓", bg: "rgba(34,197,94,0.1)" },
  question: { color: "#22c55e", icon: "?", bg: "rgba(34,197,94,0.1)" },
  help: { color: "#22c55e", icon: "?", bg: "rgba(34,197,94,0.1)" },
  faq: { color: "#22c55e", icon: "?", bg: "rgba(34,197,94,0.1)" },
  important: { color: "#8b5cf6", icon: "!", bg: "rgba(139,92,246,0.1)" },
  warning: { color: "#f59e0b", icon: "⚠", bg: "rgba(245,158,11,0.1)" },
  attention: { color: "#f59e0b", icon: "⚠", bg: "rgba(245,158,11,0.1)" },
  caution: { color: "#ef4444", icon: "✗", bg: "rgba(239,68,68,0.1)" },
  error: { color: "#ef4444", icon: "✗", bg: "rgba(239,68,68,0.1)" },
  failure: { color: "#ef4444", icon: "✗", bg: "rgba(239,68,68,0.1)" },
  missing: { color: "#ef4444", icon: "✗", bg: "rgba(239,68,68,0.1)" },
  fail: { color: "#ef4444", icon: "✗", bg: "rgba(239,68,68,0.1)" },
  danger: { color: "#ef4444", icon: "✗", bg: "rgba(239,68,68,0.1)" },
  bug: { color: "#ef4444", icon: "✗", bg: "rgba(239,68,68,0.1)" },
  example: { color: "#6366f1", icon: "ℹ", bg: "rgba(99,102,241,0.1)" },
  quote: { color: "#6b7280", icon: '"', bg: "rgba(107,114,128,0.1)" },
  cite: { color: "#6b7280", icon: '"', bg: "rgba(107,114,128,0.1)" },
};

// 所有支持的 callout 类型，用于正则匹配
const calloutTypePattern = Object.keys(calloutStyles).join("|");

// GFM callout 类型映射（>[!NOTE] → :::note）
const gfmCalloutMap: Record<string, string> = {
  note: "note",
  tip: "tip",
  important: "important",
  warning: "warning",
  caution: "caution",
};

// 创建配置好的 marked 实例
function createMarked(): Marked {
  const marked = new Marked();

  const extensions: any[] = [];

  // 1. Callout 块（:::info[title]{open} ... :::）
  for (let n = 3; n <= 10; n++) {
    const cs = ":".repeat(n);
    extensions.push({
      name: `callout${n}`,
      level: "block",
      start(src: string) {
        return src.match(new RegExp(`^${cs}(${calloutTypePattern})`))
          ?.index;
      },
      tokenizer(src: string) {
        const re = new RegExp(
          `^${cs}(${calloutTypePattern})(?:\\[([^\\]]*)\\])?(?:\\{open\\})?\\s*\\n([\\s\\S]*?)\\n${cs}\\s*(?:\\n|$)`,
        );
        const match = re.exec(src);
        if (match) {
          return {
            type: `callout${n}`,
            raw: match[0],
            calloutType: match[1],
            title: match[2] || "",
            text: match[3] || "",
            tokens: [],
          };
        }
      },
      renderer(token: any) {
        const s =
          calloutStyles[token.calloutType] || calloutStyles.info;
        const titleHtml = token.title
          ? `<div class="preview-callout-title" style="color:${s.color};"><span class="preview-callout-icon">${s.icon}</span> ${escapeHtml(token.title)}</div>`
          : "";
        const innerHtml = marked.parse(token.text, { async: false }) as string;
        return `<div class="preview-callout" style="border-left:4px solid ${s.color};background:${s.bg};">${titleHtml}<div class="preview-callout-body">${innerHtml}</div></div>`;
      },
    });
  }

  // 2. 对齐容器（:::align{center} ... :::）
  for (let n = 3; n <= 10; n++) {
    const cs = ":".repeat(n);
    extensions.push({
      name: `align${n}`,
      level: "block",
      start(src: string) {
        return src.match(new RegExp(`^${cs}align\\{`))?.index;
      },
      tokenizer(src: string) {
        const re = new RegExp(
          `^${cs}align\\{(center|right|left)\\}\\s*\\n([\\s\\S]*?)\\n${cs}\\s*(?:\\n|$)`,
        );
        const match = re.exec(src);
        if (match) {
          return {
            type: `align${n}`,
            raw: match[0],
            align: match[1],
            text: match[2] || "",
            tokens: [],
          };
        }
      },
      renderer(token: any) {
        const innerHtml = marked.parse(token.text, { async: false }) as string;
        return `<div style="text-align:${token.align};">${innerHtml}</div>`;
      },
    });
  }

  // 3. 引文容器（:::epigraph[author] ... :::）
  for (let n = 3; n <= 10; n++) {
    const cs = ":".repeat(n);
    extensions.push({
      name: `epigraph${n}`,
      level: "block",
      start(src: string) {
        return src.match(new RegExp(`^${cs}epigraph`))?.index;
      },
      tokenizer(src: string) {
        const re = new RegExp(
          `^${cs}epigraph(?:\\[([^\\]]*)\\])?\\s*\\n([\\s\\S]*?)\\n${cs}\\s*(?:\\n|$)`,
        );
        const match = re.exec(src);
        if (match) {
          return {
            type: `epigraph${n}`,
            raw: match[0],
            author: match[1] || "",
            text: match[2] || "",
            tokens: [],
          };
        }
      },
      renderer(token: any) {
        const titleHtml = token.author
          ? `<div class="preview-epigraph-author">— ${escapeHtml(token.author)}</div>`
          : "";
        const innerHtml = marked.parse(token.text, { async: false }) as string;
        return `<div class="preview-epigraph"><blockquote class="preview-epigraph-quote">${innerHtml}</blockquote>${titleHtml}</div>`;
      },
    });
  }

  // 4. cute-table 包装器 + 表格合并
  extensions.push({
    name: "cuteTable",
    level: "block",
    start(src: string) {
      return src.match(/^::cute-table\{/)?.index;
    },
    tokenizer(src: string) {
      // 匹配 ::cute-table{style} \n |header| \n |---| \n |data|
      const re =
        /^::cute-table\{(tuack|three)(?:=\d+)?\}\s*\n(\|[^\n]+\|\n\|[-:\s|]+\|\n(?:\|[^\n]+\|\n?)+)/;
      const match = re.exec(src);
      if (match) {
        return {
          type: "cuteTable",
          raw: match[0],
          tableStyle: match[1],
          tableText: match[2],
          tokens: [],
        };
      }
      return undefined;
    },
    renderer(token: any) {
      return parseTableManually(token.tableText, token.tableStyle);
    },
  });

  // 5. 显示数学公式 $$...$$
  extensions.push({
    name: "mathBlock",
    level: "block",
    start(src: string) {
      return src.match(/\$\$/)?.index;
    },
    tokenizer(src: string) {
      const re = /^\$\$([\s\S]+?)\$\$(?:\n|$)/;
      const match = re.exec(src);
      if (match) {
        return {
          type: "mathBlock",
          raw: match[0],
          text: match[1].trim(),
          tokens: [],
        };
      }
    },
    renderer(token: any) {
      return `<div class="preview-math-display">${renderMath(token.text, true)}</div>`;
    },
  });

  // 6. 行内数学公式 $...$
  extensions.push({
    name: "mathInline",
    level: "inline",
    start(src: string) {
      const m = src.match(/(?<!\$)\$(?!\$)/);
      return m?.index;
    },
    tokenizer(src: string) {
      const re = /^(?<!\$)\$(?!\$)([^\$\n]+?)(?<!\$)\$(?!\$)/;
      const match = re.exec(src);
      if (match) {
        return {
          type: "mathInline",
          raw: match[0],
          text: match[1],
          tokens: [],
        };
      }
    },
    renderer(token: any) {
      return renderMath(token.text, false);
    },
  });

  // 7. GitHub 卡片 ::github{repo="..."}
  extensions.push({
    name: "githubCard",
    level: "inline",
    start(src: string) {
      return src.match(/::github\{/)?.index;
    },
    tokenizer(src: string) {
      const re = /^::github\{repo="([^"]+)"\}/;
      const match = re.exec(src);
      if (match) {
        return {
          type: "githubCard",
          raw: match[0],
          repo: match[1],
          tokens: [],
        };
      }
    },
    renderer(token: any) {
      return `<div class="preview-github-card">GitHub: ${escapeHtml(token.repo)}</div>`;
    },
  });

  // 8. Spoiler :spoiler[...]
  extensions.push({
    name: "spoiler",
    level: "inline",
    start(src: string) {
      return src.match(/:spoiler\[/)?.index;
    },
    tokenizer(src: string) {
      const re = /^:spoiler\[([^\]]+)\]/;
      const match = re.exec(src);
      if (match) {
        return {
          type: "spoiler",
          raw: match[0],
          text: match[1],
          tokens: [],
        };
      }
    },
    renderer(token: any) {
      return `<span class="preview-spoiler">${escapeHtml(token.text)}</span>`;
    },
  });

  marked.use({
    gfm: true,
    breaks: false,
    extensions,
    renderer: {
      // 代码块：添加语言徽章、复制按钮、行号和行高亮支持
      code(code: string, infostring: string | undefined): string {
        const info = (infostring || "").trim();
        const parts = info.split(/\s+/).filter(Boolean);
        const lang = parts[0] || "plaintext";
        const showLineNumbers = parts.includes("line-numbers");
        const linesParam = parts.find((p) => p.startsWith("lines="));

        const codeContent = code.replace(/\n$/, "");
        const lineNumClass = showLineNumbers ? " line-numbers" : "";
        const lineHlAttr = linesParam
          ? ` data-line="${linesParam.replace("lines=", "")}"`
          : "";
        const langBadge =
          lang && lang !== "plaintext" ? lang.toUpperCase() : "TEXT";

        return (
          `<div class="preview-code-wrapper">` +
          `<div class="preview-code-toolbar">` +
          `<span class="preview-code-lang-badge">${escapeHtml(langBadge)}</span>` +
          `<button class="preview-copy-btn" type="button">复制</button>` +
          `</div>` +
          `<pre class="preview-codeblock${lineNumClass}"${lineHlAttr}>` +
          `<code class="language-${escapeHtml(lang)}">${escapeHtml(codeContent)}</code>` +
          `</pre>` +
          `</div>`
        );
      },
      // 表格：检查是否有合并语法，有则用自定义渲染
      table(header: string, body: string): string {
        // marked 已经把表格解析好了，直接返回
        return `<table class="preview-table">\n<thead>\n${header}</thead>\n<tbody>\n${body}</tbody>\n</table>`;
      },
      // 链接：添加 class，外部链接添加 target="_blank"
      link(href: string, title: string | null, text: string): string {
        const titleAttr = title ? ` title="${title}"` : "";
        const isExternal = /^https?:\/\//.test(href);
        const externalAttrs = isExternal
          ? ' target="_blank" rel="noopener noreferrer"'
          : "";
        return `<a href="${href}" class="preview-link"${titleAttr}${externalAttrs}>${text}</a>`;
      },
      // 图片：添加 class
      image(href: string, title: string | null, text: string): string {
        const titleAttr = title ? ` title="${title}"` : "";
        return `<img src="${href}" alt="${text}" class="preview-img"${titleAttr} />`;
      },
      // 行内代码：添加 class
      codespan(code: string): string {
        return `<code class="preview-inline-code">${code}</code>`;
      },
      // blockquote：添加 class
      blockquote(quote: string): string {
        // 检查是否是 GFM callout (>[!NOTE] 等)
        return `<blockquote class="preview-blockquote">${quote}</blockquote>`;
      },
    },
  });

  return marked;
}

// 手动解析表格（支持合并语法）
function parseTableManually(
  tableText: string,
  tableStyle?: string,
): string {
  const lines = tableText.trim().split("\n").filter(Boolean);
  if (lines.length < 2) return tableText;

  const parseRow = (line: string): string[] =>
    line
      .replace(/^\||\|$/g, "")
      .split("|")
      .map((c) => c.trim());

  const headerCells = parseRow(lines[0]);
  const alignLine = lines[1];
  const alignments = alignLine
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((c) => {
      c = c.trim();
      if (c.startsWith(":") && c.endsWith(":")) return "center";
      if (c.endsWith(":")) return "right";
      return "left";
    });

  const dataRows = lines.slice(2).map(parseRow);
  return renderTableWithMerging(
    headerCells,
    alignments,
    dataRows,
    tableStyle,
  );
}

// 缓存 marked 实例
let markedInstance: Marked | null = null;

/**
 * 渲染 Markdown 为 HTML（用于编辑器预览）
 */
export function renderMarkdown(md: string): string {
  if (!md) return "";

  if (!markedInstance) {
    markedInstance = createMarked();
  }

  // 预处理：GFM callout (>[!NOTE] 等) 转换为 :::callout 语法
  // 支持内容在下一行或同一行
  let text = md.replace(
    /^> \[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*(.*?)\n((?:> .*\n?)+)/gm,
    (_m, type: string, inlineContent: string, body: string) => {
      const calloutType = gfmCalloutMap[type.toLowerCase()] || "note";
      const blockContent = body
        .split("\n")
        .map((l: string) => l.replace(/^> ?/, ""))
        .join("\n");
      const content = inlineContent
        ? `${inlineContent}\n${blockContent}`
        : blockContent;
      return `:::${calloutType}[${type}]\n${content}\n:::\n`;
    },
  );

  // Mermaid 代码块：显示为占位符
  text = text.replace(
    /```mermaid\n([\s\S]*?)```/g,
    (_m, code: string) =>
      `<div class="preview-mermaid-placeholder">Mermaid 图表（预览不渲染）<pre class="preview-mermaid-code">${escapeHtml(code.trim())}</pre></div>`,
  );

  // PlantUML 代码块：显示为占位符
  text = text.replace(
    /```plantuml\n([\s\S]*?)```/g,
    (_m, code: string) =>
      `<div class="preview-mermaid-placeholder">PlantUML 图表（预览不渲染）<pre class="preview-mermaid-code">${escapeHtml(code.trim())}</pre></div>`,
  );

  const html = markedInstance.parse(text, { async: false }) as string;
  return html;
}
