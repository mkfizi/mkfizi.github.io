---
layout: ../../../../layouts/partials/LogLayout.astro
title: "Style Guide"
date: 2025-02-25
description: "This is style guide."
tags: ["nodejs"]
---

# Typography

## Heading 1
```html
<h1 class="font-extrabold text-black dark:text-white text-4xl sm:text-5xl lg:text-6xl">Heading 1</h1>
```

## Heading 2
```html
<h2 class="font-bold text-black dark:text-white text-2xl sm:text-3xl lg:text-4xl">Heading 2</h2>
```

> This is used as H1 in markdown

## Heading 3
```html
<h3 class="font-semibold text-black dark:text-white text-xl sm:text-2xl lg:text-3xl">Heading 3</h3>
```

> This is used as H2 in markdown

## Heading 4
```html
<h4 class="font-medium text-black dark:text-white text-lg sm:text-xl lg:text-2xl">Heading 4</h4>
```

> This is used as H3 in markdown

## Links

### Inactive

```html
<a href="#" class="font-medium text-neutral-500 hover:dark:text-white hover:text-black focus:dark:text-white focus:text-black visited:text-neutral-700 dark:text-neutral-400 dark:visited:text-neutral-200 text-sm cursor-pointer">Inactive link</a>
```

### Active

```html
<a href="#" class="font-medium text-black hover:dark:text-neutral-200 hover:text-neutral-700 focus:dark:text-neutral-200 focus:text-neutral-700 dark:text-white text-sm cursor-pointer">Active link</a>
```

## List

### Unordered
```html
<ul class="space-y-2 ml-4 dark:marker:text-neutral-200 marker:text-neutral-800 leading-0 list-disc">
    <li class="text-neutral-800 dark:text-neutral-200 text-sm">List item 1.</li>
    <li class="text-neutral-800 dark:text-neutral-200 text-sm">List item 2.</li>
    <li class="text-neutral-800 dark:text-neutral-200 text-sm">List item 3.</li>
</ul>
```

### Ordered
```html
<ol class="space-y-2 ml-4 dark:marker:text-neutral-200 marker:text-neutral-800 leading-0 list-decimal">
    <li class="text-neutral-800 dark:text-neutral-200 text-sm">1. List item 1.</li>
    <li class="text-neutral-800 dark:text-neutral-200 text-sm">2. List item 2.</li>
    <li class="text-neutral-800 dark:text-neutral-200 text-sm">3. List item 3.</li>
</ol>
```

## Paragraph
```html
<p class="text-neutral-800 dark:text-neutral-200 text-sm">This is a paragraph text.</p>
```

## Title
```html
<p class="font-medium text-neutral-800 dark:text-neutral-200 text-base">This is a title text.</p>
```
