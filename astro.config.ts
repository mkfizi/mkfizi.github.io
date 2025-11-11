import { defineConfig } from 'astro/config';
import alpinejs from '@astrojs/alpinejs';
import tailwindcss from '@tailwindcss/vite';
import shiki from './astro.plugins/shiki.ts';

export default defineConfig({
    // Site metadata.
    site: "https://mkfizi.dev",

    // By default, Astro outputs to './dist'. Change this to './docs' to deploy to GitHub Pages.
    outDir: './docs',

    // Set 'enable' to 'false' to disable Astro dev toolbar.
    devToolbar: {
        enabled: false,
    },

    // Markdown configuration.
    markdown: { 
        shikiConfig: shiki,
    },
    
    // Integrations and Vite plugins.
    integrations: [alpinejs({ entrypoint: '/src/assets/js/alpine.ts' })],
    vite: {
        plugins: [tailwindcss()],
    },
});