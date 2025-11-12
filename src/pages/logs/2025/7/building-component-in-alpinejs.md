---
layout: ../../../../layouts/partials/LogLayout.astro
title: "Building Component in Alpine.js"
date: 2025-07-11
description: "Learn how to build a simple, reusable component using Alpine.js. This guide covers three easy methods. From inline setup to modular scripts, it is perfect for projects of any size."
tags: ["alpinejs", "learn"]
---

In this post, we'll build a simple and reusable component using Alpine.js.

# Why Alpine.js

Alpine.js is perfect for small to medium interactive components. You can think of it as “Tailwind for JavaScript”. Some people also think it's upgraded version of JQuery.It’s ideal for cases where using full frameworks like Vue or React would be overkill.

## Method 1: Inline HTML

Let's start simple where we define all data and logic directly in the markup using the x-data attribute.

```html
<div class="flex gap-2"
    x-data="{
        number: 100,
        add() { this.number++ },
        minus() { this.number-- }
    }"
>
    <button type="button" class="px-4 py-2 border border-black dark:border-white bg-black text-white dark:bg-white dark:text-black cursor-pointer"
        @click="minus()"
    >-</button>
    <p x-text="number" class="w-12 py-2 border border-black dark:border-white text-center cursor-default"></p>
    <button type="button" class="px-4 py-2 border border-black dark:border-white bg-black text-white dark:bg-white dark:text-black cursor-pointer"
        @click="add()"
    >+</button>
</div>
```

Now we will have:
<div class="flex items-center border border-black dark:border-white py-16 justify-center">
    <div class="flex gap-2"
        x-data="{
            number: 100,
            add() { this.number++ },
            minus() { this.number-- }
        }"
    >
        <button type="button" class="px-4 py-2 border border-black dark:border-white bg-black text-white dark:bg-white dark:text-black cursor-pointer"
            @click="minus()"
        >-</button>
        <p x-text="number" class="w-12 py-2 border border-black dark:border-white text-center cursor-default"></p>
        <button type="button" class="px-4 py-2 border border-black dark:border-white bg-black text-white dark:bg-white dark:text-black cursor-pointer"
            @click="add()"
        >+</button>
    </div>
</div>

### When to Use

Use this inline method when:
- We only need the component once or twice.
- We want quick prototyping.
- We don’t need to reuse the logic across multiple pages or components.

## Method 2: Reusable `x-data`

To make the component reusable, we will need encapsulate the logic in `x-data` as below.

```html
<div class="flex gap-2"
    x-data="counter"
>
    <button type="button" class="px-4 py-2 border border-black dark:border-white bg-black text-white dark:bg-white dark:text-black cursor-pointer"
        @click="minus()"
    >-</button>
    <p x-text="number" class="w-12 py-2 border border-black dark:border-white text-center cursor-default"></p>
    <button type="button" class="px-4 py-2 border border-black dark:border-white bg-black text-white dark:bg-white dark:text-black cursor-pointer"
        @click="add()"
    >+</button>
</div>
<script>
    document.addEventListener('alpine:init', () => {
            Alpine.data('counter', () => ({
                number: 100,
                add() { this.number++ },
                minus() { this.number-- }
            }));
        });
</script>
```

Now we will have:
<div class="flex items-center border border-black dark:border-white py-16 justify-center">
    <div class="flex gap-2"
        x-data="counter"
    >
        <button type="button" class="px-4 py-2 border border-black dark:border-white bg-black text-white dark:bg-white dark:text-black cursor-pointer"
            @click="minus()"
        >-</button>
        <p x-text="number" class="w-12 py-2 border border-black dark:border-white text-center cursor-default"></p>
        <button type="button" class="px-4 py-2 border border-black dark:border-white bg-black text-white dark:bg-white dark:text-black cursor-pointer"
            @click="add()"
        >+</button>
    </div>
    <script>
        document.addEventListener('alpine:init', () => {
                Alpine.data('counter', () => ({
                    number: 100,
                    add() { this.number++ },
                    minus() { this.number-- }
                }));
            });
    </script>
</div>

### When to Use

Use this script-based reusable method when:
- We have multiple accordion components on the same page.
- We want to keep your HTML cleaner.
- We still want everything self-contained in one HTML file (no build tools).

## Method 3: Dedicated Component File

Now for larger or modular projects, we will build our component login in a separate file and import it. First we write the component UI as below:
```html
<div class="flex gap-2"
    x-data="counter"
>
    <button type="button" class="px-4 py-2 border border-black dark:border-white bg-black text-white dark:bg-white dark:text-black cursor-pointer"
        @click="minus()"
    >-</button>
    <p x-text="number" class="w-12 py-2 border border-black dark:border-white text-center cursor-default"></p>
    <button type="button" class="px-4 py-2 border border-black dark:border-white bg-black text-white dark:bg-white dark:text-black cursor-pointer"
        @click="add()"
    >+</button>
</div>
```

Then we define the component logic in a seperate file as below:

```ts title="counter.ts"
import Alpine from 'alpinejs';

document.addEventListener('alpine:init', () => {
    Alpine.data('counter', () => ({
        closeAlert() {
            this.$root.remove();
        }
    }));
})
```

To use the component, simply import the file in **global** Typescript or Javascript file as below:

```ts title="app.ts"
import 'path/to/counter.ts';

// Rest of the code.
```

Or import it directly using `<script>` in `<head>` as below:
```html
<head>
    <!-- Rest of the code. -->
    <script src="/path/to/counter.ts" type="module" defer></script>
</head>
```

And we will finally have a working component that suits for more modular project:

<div class="flex items-center border border-black dark:border-white py-16 justify-center">
    <div class="flex gap-2"
        x-data="counter"
    >
        <button type="button" class="px-4 py-2 border border-black dark:border-white bg-black text-white dark:bg-white dark:text-black cursor-pointer"
            @click="minus()"
        >-</button>
        <p x-text="number" class="w-12 py-2 border border-black dark:border-white text-center cursor-default"></p>
        <button type="button" class="px-4 py-2 border border-black dark:border-white bg-black text-white dark:bg-white dark:text-black cursor-pointer"
            @click="add()"
        >+</button>
    </div>
    <script>
        document.addEventListener('alpine:init', () => {
                Alpine.data('counter', () => ({
                    number: 100,
                    add() { this.number++ },
                    minus() { this.number-- }
                }));
            });
    </script>
</div>

### When to Use

Use this modular method when:
- We are working in a modern project setup (like Vite, Laravel or Astro).
- We want to reuse the same component across multiple pages or projects.
- We are using TypeScript or want better code organization and reusability.

## Final Thought

Alpine.js makes creating interactive components effortless with no build process, no virtual DOM, just simple declarative logic inside our HTML. Whether we're building a landing page, documentation site, or a small app, we can scale from inline prototypes to modular, production-ready code easily with Alpine’s flexible patterns.
