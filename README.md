# EdgeEver Glass

一个为 [EdgeEver](https://github.com/tianma-if/edgeever) 打造的通透毛玻璃（Liquid Glass & Glassmorphism）外观插件。它采用多层极光流光底色、高透光率与光学折射滤镜（`saturate 180%`）、物理级边缘内高光和半透明晶莹描边，完美适配浅色与深色模式。

## 特性

- **极光流光底色**：浅色冰晶四元光晕与暗夜星云极光，提供充沛的光学折射色彩源
- **高通透毛玻璃材质**：0.45~0.60 精准透光率结合 `backdrop-filter: blur() saturate()`
- **物理级边缘内高光**：面板与浮层注入顶部 1px 晶莹内发光与立体高光边缘
- **全套玻璃化控件与浮层**：适配弹窗、菜单、搜索/输入框、按钮 Hover 微动效与细条毛玻璃滚动条
- **极致文字可读性**：采用 Slate-900 / Slate-50 高对比度色阶与平滑字体抗锯齿
- **跟随 EdgeEver 主题模式**：自适应浅色与深色模式
- **安全纯粹**：不读取笔记、不访问网络，声明权限为空
- **即开即关**：禁用插件后立即恢复原始样式
- **无障碍回退**：对不支持背景模糊或启用“减少透明度”的环境提供清晰的高对比度回退
- **跨平台适配**：支持 EdgeEver Web 与桌面端

## 安装

### 从 GitHub 仓库安装

在 EdgeEver 的「插件市场」页面粘贴仓库地址：

```text
https://github.com/tianma-if/edgeever-glass-theme
```

EdgeEver 要求默认分支根目录存在最新的 `manifest.json`，并要求对应版本的 GitHub Release 附带：

```text
manifest.json
main.js
styles.css
```

本仓库的 Release 工作流会在推送 `v*` 标签时自动校验并上传这些文件。

### 本地预览安装

EdgeEver 也可以从一个带 CORS 响应头的 manifest URL 安装。先在本目录启动静态服务器：

```bash
npx serve --cors .
```

然后在 EdgeEver 插件市场中粘贴实际可访问的地址，例如：

```text
http://localhost:3000/manifest.json
```

如果 EdgeEver 运行在 HTTPS 页面，浏览器可能阻止 HTTP 混合内容；这时请使用 HTTPS 静态托管或 GitHub Release 安装方式。

## 开发

项目没有运行时依赖。需要 Node.js 20 或更新版本。

```bash
npm run check
npm run package
```

`npm run package` 会把可发布文件复制到 `dist/`，并生成 `SHA256SUMS`。

视觉参数集中在 `styles.css` 顶部的 CSS 变量中。调整透明度时，请同步检查浅色和深色变量；透明度太低会牺牲文字对比度，太高则会削弱通透感。

## 发布

1. 同时更新 `manifest.json` 与 `package.json` 中的版本号。
2. 运行 `npm run check`。
3. 创建与版本一致的标签，例如 `v0.3.0`。
4. 推送标签；GitHub Actions 会创建 Release 并附加安装文件。

## 为什么不是纯主题包？

EdgeEver Theme API v1 的纯主题包只能使用经过验证的颜色、字体、尺寸和圆角令牌，不能注入 CSS。真正的毛玻璃需要 `backdrop-filter`，因此本项目使用客户端插件包格式。入口脚本只添加一个样式作用域标记，且插件不申请任何 EdgeEver API 权限。

## License

[MIT](LICENSE)
