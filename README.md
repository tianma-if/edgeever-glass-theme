# EdgeEver Glass

一个为 [EdgeEver](https://github.com/tianma-if/edgeever) 制作的毛玻璃外观插件。它为笔记列表、编辑器、设置页、弹窗和菜单提供半透明、背景模糊和轻微增色效果，并同时适配浅色与深色模式。

## 特性

- 真实的 `backdrop-filter` 毛玻璃，而不只是半透明颜色
- 跟随 EdgeEver 的浅色 / 深色模式
- 不读取笔记、不访问网络，声明权限为空
- 禁用插件后立即恢复原始样式
- 对不支持背景模糊或启用“减少透明度”的设备提供高对比度回退
- 支持 EdgeEver Web 与桌面端

## 安装

### 从 GitHub 仓库安装

发布首个 GitHub Release 后，在 EdgeEver 的「插件市场」页面粘贴仓库地址：

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

视觉参数集中在 `styles.css` 顶部的 CSS 变量中。调整透明度时，请同步检查浅色和深色变量；透明度太低会牺牲文字对比度，太高则会看不出背景模糊。

## 发布

1. 同时更新 `manifest.json` 与 `package.json` 中的版本号。
2. 运行 `npm run check`。
3. 创建与版本一致的标签，例如 `v0.1.0`。
4. 推送标签；GitHub Actions 会创建 Release 并附加安装文件。

## 为什么不是纯主题包？

EdgeEver Theme API v1 的纯主题包只能使用经过验证的颜色、字体、尺寸和圆角令牌，不能注入 CSS。真正的毛玻璃需要 `backdrop-filter`，因此本项目使用客户端插件包格式。入口脚本只添加一个样式作用域标记，且插件不申请任何 EdgeEver API 权限。

## License

[MIT](LICENSE)
