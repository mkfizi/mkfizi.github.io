---
layout: ../../../../layouts/partials/LogLayout.astro
title: "Vite Setup For Web Development"
date: 2025-05-23
description: "Learn how to set up Vite for web development, why it’s faster and simpler than Webpack, Parcel or Rollup, and get both basic and advanced configuration examples."
tags: ["vite", "nodejs", "learn"]
---

Modern web development tooling evolves quickly. Every library or framework requires a bundler for production-ready code. I used to rely on Webpack, but every web project seemed to need a different setup and configuration which became a hassle.

# Enter Vite

Vite is a next-generation frontend tool that emphasizes speed and simplicity by using native ES modules during development and only bundling your code for production.

## Why I Choose Vite Over Other Bundling Tools.

After creating a few test projects with Vite, I immediately wanted to use and standardize it for all my web projects going forward.

- **Blazingly Fast Development** Vite boots up the dev server and serves changes almost instantly. Because it serves modules on demand and leverages native ES modules instead of bundling everything upfront, the feedback loop is much quicker.
- **Simple Configuration** Compared to Webpack heavy configuration, it is much more simple to setup Vite even with minimal config.
- **Modern Features** Vite supports modern features out-of-the-box like JSX, TypeScript & CSS modules. Because it uses Rollup internally for production builds, you still get optimized bundles.

## Setting Up Vite

To setup Vite for a web project simply run:
```bash
npm create vite@latest my-site
cd my-site
npm install
npm run dev
```

Now add `vite.config.js` (or `vite.config.ts`) file. For a simple site using TailwindCSS, here is a standard Vite config I use:
```ts title="vite.config.ts"
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        tailwindcss(),
    ],
})
```

Then simply run below and we will get `dist/` directory with production output, ready to deploy.
```bash
npm run build
```

## Advance Vite Setup

For a move advance Vite setup where I keep my code in `src/`, I will use a detailed config as below:
```ts title="vite.config.ts"
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { glob } from 'glob';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    base: '/sitename/',
    root: './src',
    publicDir: '../public',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        rollupOptions: {
            input: glob.sync(resolve(__dirname, 'src/**/*.html'))
        }
    },
    plugins: [
        tailwindcss(),
    ],
})
```

- `base: '/sitename/'` - Sets the base public path for deployment. Use this if the site will be hosted under a sub-path (e.g., https://example.com/sitename/).
- `root: './src'` — Specifies that your source content (HTML, JS, CSS) is inside `src/`.
- `publicDir: '../public'` — Points to the `../public` directory for static assets that should be built as-is.
- `build.outDir: '../dist'` — Specifies the output directory `../dist` for production build.
- `build.emptyOutDir: true` — utomatically cleans the output directory before each build
- `rollupOptions.input: glob.sync(resolve(__dirname, 'src/**/*.html'))` — Dynamically pick up all .html files in src/ as entry points (helpful for multi-page sites).
- `plugins: [ tailwindcss() ]` — Includes TailwindCSS plugin for processing utility classes during development and production build.

This configuration supports multi webpages by dynamically build all HTML files in `src/` into `dist/` and ensures proper asset handling in `public/`.

## Final Thought

Choosing the right build tool affects your development speed, build quality, and long-term maintainability. For many web-site or web-app projects, Vite offers a modern, fast, and simple workflow. It removes a lot of friction around configuration and slow build times. Of course, if you're working with a huge legacy codebase or very niche build requirements, tools like Webpack might still be relevant. But for new projects (or when you can migrate), Vite is a strong choice.