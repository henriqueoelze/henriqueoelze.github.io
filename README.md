# Henrique Oelze Website

Personal online CV and portfolio site built with `Astro`.

This repository powers a small public personal website with:

- a homepage and bio section
- a projects / portfolio highlights section
- personal blog posts published from Markdown
- a clean static frontend suitable for GitHub Pages

## AI Disclaimer

The frontend implementation of this site was created with the help of GitHub Copilot Codex. The repository and its contents are public, and the code reflects that assistance.

## Local development

1. Install Node.js 24 or newer.
2. Install dependencies:

```bash
npm install
```

3. Start the dev server:

```bash
npm run dev
```

## Content

This repo already includes:

- site metadata and homepage copy in `src/data/site.ts`
- portfolio and project highlights in `src/data/projects.ts`
- blog posts as Markdown files in `src/content/posts/`
- layout and page structure in `src/layouts/` and `src/pages/`

## Deployment

This project is configured for GitHub Pages deployment.
The static site is built and published using the workflow at `.github/workflows/deploy.yml`.
