# 🌍 ILoveScratch2's Digital Home

个人主页，React Router 7 + Vite + Tailwind CSS，SSR 部署在 Vercel。

线上地址：[ilovescratch.us.ci](https://ilovescratch.us.ci)

---

```text
░░░░░░░░░░░░░░░░░░░░░░░░░
█▀▀ █▀█ █▀▀ ▄▀█ ▀█▀ █ █▄░█ █▀▀
█▄▄ █▀▄ ██▄ █▀█ ░█░ █ █░▀█ █▄█
░░░░░░░░░░░░░░░░░░░░░░░░░
CODE CHANGES THE WORLD
```

> "The computer was born to solve problems
> that did not exist before." - Bill Gates


## 部署

推送到 `main` 后由 Vercel 自动构建。构建产物为 `.vercel/output`，
其中的函数由 `server/app.ts`（Express + React Router SSR）处理。

可选环境变量 `GITHUB_TOKEN`：设置后会在构建/请求时以更高配额调用
GitHub API 拉取项目列表；未设置时使用内置的精选仓库回落数据。
