# Cloudflare Pages 部署与管理指南

## 一、推送到 GitHub

1. 在 GitHub 上创建一个新仓库（公开或私有均可）
2. 在项目根目录执行：
   ```bash
   git init
   git add .
   git commit -m "feat: 添加管理员认证和可视化文章编辑器"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/<仓库名>.git
   git push -u origin main
   ```

> **注意**：`dist/` 目录已在 `.gitignore` 中，不需要手动排除。

---

## 二、连接 Cloudflare Pages

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 左侧菜单选择 **Workers 和 Pages** → **创建** → **Pages** → **连接到 Git**
3. 授权 Cloudflare 访问你的 GitHub 仓库
4. 选择刚推送的仓库

---

## 三、构建配置

| 配置项 | 值 |
|---|---|
| **框架预设** | Astro |
| **构建命令** | `pnpm build` |
| **构建输出目录** | `dist` |
| **根目录** | `/` （默认） |

### 环境变量（必填）

在 Cloudflare Pages 的 **设置** → **环境变量** 中添加以下两个变量：

| 变量名 | 值 | 说明 |
|---|---|---|
| `NODE_VERSION` | `22` | Node.js 版本 |
| `PNPM_VERSION` | `9.14.4` | pnpm 版本（必须与 `package.json` 中 `packageManager` 字段一致） |

> **重要**：Cloudflare Pages v3 构建系统不再从 `pnpm-lock.yaml` 或 `package.json` 的 `packageManager` 字段自动识别 pnpm 版本。如果不设置 `PNPM_VERSION`，将使用默认的 pnpm 10.x，导致依赖安装失败或构建出错，Cloudflare 会继续显示上一次成功构建的旧版本。

---

## 四、GitHub 配置（写文章必读）

文章编辑器通过 GitHub API 直接将内容提交到仓库，触发 Cloudflare Pages 自动重新构建。使用前必须配置 GitHub Token。

### 1. 创建 GitHub Personal Access Token

1. 打开 [GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)](https://github.com/settings/tokens)
2. 点击 **Generate new token (classic)**
3. 填写 Note（如"博客编辑"），Expiration 选择合适的时间
4. 勾选 `repo` 权限（包含 repo:status、public_repo、repo_deployment 等，完整仓库读写）
5. 点击底部 **Generate token**
6. **立即复制** Token（格式类似 `ghp_xxxxxxxxxxxx`），页面关闭后无法再查看

> 如果仓库是私有的，必须使用 classic token 并勾选 `repo` 权限。Fine-grained token 也可用，但需确保给对应仓库授予 Contents 读写权限。

### 2. 在编辑器中配置

1. 双击网站侧边栏头像，输入管理员密码 `hhh114514` 认证
2. 悬停导航栏"文章"菜单，点击 **"管理"** 进入管理页面
3. 点击右上角 **"设置"** 按钮
4. 填写以下信息：
   - **GitHub Token**：粘贴刚才生成的 Token
   - **仓库所有者**：你的 GitHub 用户名（如 `CuteLeaf`）
   - **仓库名称**：仓库名（如 `Firefly`）
   - **分支**：默认 `main`，如果你的默认分支是其他名称请修改
5. 点击 **"保存设置"**

> Token 保存在浏览器 localStorage 中，不会上传到任何服务器。不同设备需要分别配置。

### 3. 验证配置

1. 配置完成后，在管理页面点击"刷新"，如果文章列表正常加载则配置成功
2. 尝试新建或编辑一篇文章并保存
3. 前往 GitHub 仓库，确认 `src/content/posts/` 目录下出现了新文件
4. 前往 Cloudflare Pages Dashboard，确认构建已触发

---

## 五、管理员功能

### 1. 管理员认证

- 在网站任意页面的侧边栏，**双击头像** 即可唤起密码输入框
- 输入密码 `hhh114514` 后回车
- 认证成功后，右上角会出现提示
- 认证状态保存在浏览器 localStorage 中，**24小时内无需重新认证**
- **退出管理员模式**：再次双击头像，在弹出的确认框中点击"确认退出"

### 2. 新建文章

- 认证成功后，将鼠标悬停在导航栏的 **"文章"** 菜单上
- 下拉菜单顶部会出现 **"新建"** 和 **"管理"** 两个按钮
- 点击"新建"进入可视化文章编辑器

### 3. 文章管理

- 点击导航栏"文章"菜单中的 **"管理"** 按钮，进入文章管理页面
- **查看所有文章**：以表格形式展示所有文章的标题、分类、发布日期和状态（草稿/置顶/加密）
- **搜索与筛选**：支持按标题、ID、标签搜索，按分类筛选
- **编辑文章**：点击每行的"编辑"按钮进入编辑器，自动加载已有内容
- **查看文章**：点击"查看"按钮在新标签页打开文章
- **修改分类**：点击分类单元格直接编辑，或勾选多篇文章后使用"批量修改分类"
- **删除文章**：点击"删除"按钮删除单篇，或勾选多篇文章后使用"批量删除"
- 所有操作按钮均为纯文字，无图标
- 删除文章后会自动清除客户端缓存，确保归档页面同步更新

### 4. 编辑公告

- 认证管理员后，公告栏右侧会出现"编辑"按钮
- 点击"编辑"打开公告编辑器（不跳转页面）
- 支持编辑公告标题和内容
- 内容支持完整 Markdown 语法（与文章编辑器相同的语法）
- 左侧编辑，右侧实时预览
- 点击"保存"直接同步到 GitHub，触发自动构建

---

## 六、编写文章

### 文章信息表单

**必填项（直接显示）：**
- 标题
- 发布日期
- 文件名（留空则从标题自动生成）

**选填项（高级设置，可折叠）：**
- 更新日期（默认当前日期）
- 分类、描述、封面图片路径
- 标签（输入后按回车添加）
- 自定义 URL 路径（slug）、语言代码、作者
- 文章来源链接、许可证名称（默认 CC BY-NC-SA 4.0）、许可证链接
- 文章密码、密码提示
- 草稿/置顶/启用评论 开关

### Markdown 语法支持

编辑器支持完整 Markdown 语法，包括以下扩展：

**基础语法：**
- 标题（H1-H6）、粗体、斜体、删除线
- 代码块（支持语法高亮、行号、行高亮）
- 行内代码、链接、图片
- 引用、有序/无序列表、任务列表
- 分隔线、表格

**洛谷扩展语法：**
- **折叠框（Callout）**：`:::info[标题]` 到 `:::`（3-10个冒号，支持嵌套）
  - 类型：info、success、warning、error
  - 可选 `{open}` 参数默认展开
- **对齐容器**：`:::align{center}` 到 `:::`
- **引文容器**：`:::epigraph[作者]` 到 `:::`
- **表格合并**：`^` 纵向合并，`<` 横向合并
- **剧透文本**：`:spoiler[隐藏内容]`
- **GitHub 仓库卡片**：`::github{repo="用户名/仓库名"}`

**数学公式（KaTeX）：**
- 行内公式：`$公式$`
- 块级公式：`$$公式$$`

**代码块参数：**
- 语言标识：\`\`\`javascript
- 行号：\`\`\`javascript line-numbers
- 行高亮：\`\`\`javascript lines=1-3,5

### 保存方式

- **保存（同步到 GitHub）**：直接提交到仓库的 `src/content/posts/` 目录，自动触发 Cloudflare Pages 重建
- **下载（.md 格式）**：下载 Markdown 文件到本地，手动放置到 `src/content/posts/` 目录

---

## 七、部署后验证

1. 等待 Cloudflare Pages 构建完成（通常 2-3 分钟）
2. 访问你的 Pages 域名（如 `https://your-site.pages.dev`）
3. 双击侧边栏头像，输入密码验证管理员功能
4. 悬停"文章"菜单，确认"新建"和"管理"按钮出现
5. 点击"管理"，在设置中配置 GitHub Token
6. 确认文章列表正确加载
7. 在管理页面测试编辑、修改分类、删除等功能
8. 等待 Cloudflare Pages 自动重新构建
9. 访问首页，确认操作结果已生效
10. 测试公告编辑功能

---

## 八、可选配置

### 自定义域名

1. 在 Cloudflare Pages 的 **自定义域** 中添加你的域名
2. 按提示添加 CNAME 记录
3. 等待 DNS 生效（通常几分钟到几小时）

### 安全建议

- 定期更换 GitHub Personal Access Token
- 不要在公共电脑上保存管理员认证状态
- 如需修改管理员密码，编辑 `src/components/admin/AdminPanel.astro` 中的 `ADMIN_HASH` 值
  - 使用以下命令生成新密码的 SHA-256 哈希：
    ```bash
    node -e "const crypto = require('crypto'); console.log(crypto.createHash('sha256').update('你的新密码').digest('hex'));"
    ```

---

## 九、常见问题

### Q: 构建失败怎么办？
检查 Cloudflare Pages 的构建日志。常见原因：
- Node.js 版本过低 → 确保设置了 `NODE_VERSION=22`
- pnpm 版本不匹配 → 确保设置了 `PNPM_VERSION=9.14.4`（与 `package.json` 中 `packageManager` 一致）
- 依赖安装失败 → 确保仓库包含 `pnpm-lock.yaml`

### Q: 部署后网站还是显示旧版本？
这通常是因为构建失败但 Cloudflare 继续服务上一次成功的构建。按以下步骤排查：
1. 进入 Cloudflare Dashboard → Workers & Pages → 选择你的项目
2. 点击 **Deployments** → 查看最近的构建记录
3. 如果最新构建状态为 **Failed**，点击查看构建日志
4. 最常见原因：未设置 `PNPM_VERSION` 环境变量，导致 pnpm 版本不匹配
5. 在 **Settings** → **Environment variables** 中添加 `PNPM_VERSION=9.14.4`
6. 添加后需要手动触发一次新构建：在 Deployments 页面点击 **Retry deployment**
7. 等待构建完成后刷新网站

### Q: 如何确认代码已推送到 GitHub？
在 GitHub 仓库页面查看最近一次提交时间，确认与本地最新修改一致。如果本地安装了 Git，可以运行 `git log --oneline -1` 查看最新提交。

### Q: 保存文章时报 "Bad credentials"？
GitHub Token 已过期或权限不足。重新生成 Token 并确保勾选了 `repo` 权限。

### Q: 保存文章时报 "Not Found"？
仓库所有者或名称填写错误。检查仓库设置中的信息是否正确。前往 GitHub 仓库页面，URL 格式为 `https://github.com/仓库所有者/仓库名`。

### Q: 双击头像没反应？
确保头像元素已加载。如果页面还在加载中，请等待几秒后再试。Swup 页面切换后可能需要短暂延迟。

### Q: 新文章保存后没有立即出现？
Cloudflare Pages 需要重新构建（通常 2-3 分钟）。在 Cloudflare Dashboard 中可以查看构建进度。

### Q: 管理页面显示"请先在设置中填写 GitHub 信息"？
点击管理页面右上角的"设置"按钮，填写 GitHub Token、仓库所有者、仓库名称和分支，然后保存。

### Q: 删除文章后归档页面还在显示？
删除操作已清除客户端缓存。如果归档页面仍显示旧数据，请刷新页面。Cloudflare Pages 重新构建后数据会完全同步。

### Q: 公告编辑后没有立即生效？
公告保存后会提交到 GitHub 并触发自动构建，需要等待 2-3 分钟构建完成后才能看到更新。
