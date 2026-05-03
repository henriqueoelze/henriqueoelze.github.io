# Henrique Oelze Website

Single-page personal website built with `Astro`, designed for GitHub Pages deployment.

## Local development

1. Install Node.js 20 or newer.
2. Install dependencies:

```bash
npm install
```

3. Start the dev server:

```bash
npm run dev
```

## Content

- Homepage copy and labels live in `src/data/site.ts`
- Portfolio highlights live in `src/data/projects.ts`
- Blog posts live in `src/content/posts/*.md`
- Replace the portrait placeholder at `public/profile/henrique-photo.svg` with your real photo when ready

## Deployment

The repo includes a GitHub Actions workflow at `.github/workflows/deploy.yml` that builds and publishes the static site to GitHub Pages.
