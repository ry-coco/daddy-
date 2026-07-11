# daddy的家 · 部署（GitHub Pages）

无后端纯前端 PWA，浏览器直连 OpenRouter。所有对话/设置只存本机 localStorage。

## 上传
把整个 `dist/` 目录的内容推到一个 GitHub 仓库，然后：
`Settings → Pages → Build and deployment → Source: Deploy from a branch`，
选 `main` 分支、根目录（或 `/docs`，把这些文件放进 `docs/`）。

几分钟后访问 `https://<用户名>.github.io/<仓库名>/`。
手机浏览器打开 → 分享菜单「添加到主屏幕」= 独立 App。

> **HTTPS 必须**：PWA 安装、Service Worker 都要求 https。GitHub Pages 默认就是 https。

## 首次使用
第一次进入会让你填 **OpenRouter API Key**（openrouter.ai → Keys 创建）。
进门后点右上 `⋮`（个人信息）填：交接文档、记忆本、ElevenLabs 声音、纪念日等。
点顶栏的模型名可随时换模型。左上箭头进主菜单。

## 改了前端记得
`sw.js` 顶部的 `CACHE` 版本号**每次改前端都要 +1**，否则已装到主屏的用户停在旧壳。

## 文件
- `index.html` — 单文件主体（全部 CSS/JS 内联）
- `sw.js` / `manifest.webmanifest` — PWA
- `*.webp` / `*.png` — 主题壁纸 / 头像 / 图标
- `LICENSE` — MIT（壳子源自开源项目 Tidal Echo）
