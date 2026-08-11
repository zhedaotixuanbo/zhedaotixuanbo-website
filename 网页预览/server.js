// 网页预览本地服务器 —— 双击「启动预览.bat」即可运行
// 仅用于本地预览构建好的静态站点，自动打开浏览器。
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, sep } from "node:path";
import { exec } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { networkInterfaces } from "node:os";

const ROOT = dirname(fileURLToPath(import.meta.url));
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".webmanifest": "application/manifest+json",
};

function tryPorts(start) {
  return start;
}

async function exists(p) {
  try {
    return await stat(p);
  } catch {
    return null;
  }
}

const server = createServer(async (req, res) => {
  try {
    let urlPath = decodeURIComponent(req.url.split("?")[0].split("#")[0]);
    // 把根路径或目录路径指向 index.html
    let fsPath = normalize(join(ROOT, urlPath));
    // 防目录穿越：仅允许访问 ROOT 子树（注意文件名里可能含 ".." 字符，故用归一化后路径判定）
    if (fsPath !== ROOT && !fsPath.startsWith(ROOT + sep)) {
      res.writeHead(403);
      return res.end("Forbidden");
    }
    let st = await exists(fsPath);
    if (st && st.isDirectory()) {
      fsPath = join(fsPath, "index.html");
      st = await exists(fsPath);
    } else if (!st) {
      // 无扩展名且对应目录存在 index.html（如 /posts/firefly）
      const idx = join(fsPath, "index.html");
      const s2 = await exists(idx);
      if (s2) {
        fsPath = idx;
        st = s2;
      }
    }
    if (!st || !st.isFile()) {
      // 回退到 404.html
      const notFound = join(ROOT, "404.html");
      const nf = await exists(notFound);
      if (nf) {
        const data = await readFile(notFound);
        res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        return res.end(data);
      }
      res.writeHead(404);
      return res.end("Not Found");
    }
    const data = await readFile(fsPath);
    res.writeHead(200, {
      "Content-Type": MIME[extname(fsPath).toLowerCase()] || "application/octet-stream",
    });
    res.end(data);
  } catch (e) {
    res.writeHead(500);
    res.end("Server Error: " + e.message);
  }
});

function lanIpv4() {
  const out = [];
  for (const [name, addrs] of Object.entries(networkInterfaces())) {
    for (const a of addrs || []) {
      if (a.family === "IPv4" && !a.internal) out.push(a.address);
    }
  }
  return out;
}

const PORT = Number(process.env.PORT) || 4321;
server.on("error", (e) => {
  if (e.code === "EADDRINUSE") {
    console.error("端口 4321 被占用，请修改 server.js 中的 PORT 或关闭占用程序。");
  } else {
    console.error(e);
  }
  process.exit(1);
});
server.listen(PORT, "0.0.0.0", () => {
  const local = `http://localhost:${PORT}/`;
  console.log("预览服务已启动，任何设备均可访问：");
  console.log(`  本机：      ${local}`);
  for (const ip of lanIpv4()) {
    console.log(`  局域网设备：http://${ip}:${PORT}/`);
  }
  console.log("（手机和其他电脑只要与本机在同一网络，用上面的局域网地址即可打开）");
  console.log("关闭此窗口即可停止服务。");
  // 自动打开浏览器（Windows）
  if (process.platform === "win32") {
    exec(`start "" "${local}"`);
  }
});
