---
title: Installation
order: 1
description: Two lines of CSS give a Tailwind v4 site the UCF brand. There is no config file to write.
---

## What you need

The theme is built for **Tailwind CSS v4.3 or later**. It does not work with Tailwind v3, which used a JavaScript config file in place of CSS. Any way of running Tailwind v4 works: the CLI, Vite, PostCSS, or a framework like Next.js that wraps one of them.

The package isn't published to npm yet. Until it is, install it from a local checkout or a Git URL:

```shell
npm install --save-dev tailwindcss @tailwindcss/cli
npm install --save-dev ../ucf-tailwindcss-theme
```

## Import the theme

Import Tailwind first, then the theme. Order matters: the theme clears Tailwind's default palette and type scale, so it has to come second.

```css
@import "tailwindcss";
@import "@ucf/tailwindcss-theme";
```

That's the whole setup. Every utility you write now draws on the brand: `bg-gold`, `text-link`, `font-display`, `text-h2`. Off-brand values such as `bg-blue-500`, `rounded-lg` and `text-3xl` produce no CSS at all.

## Load the fonts

The brand's web typefaces are Oswald, Montserrat and Roboto Mono. The theme names them but doesn't load them, because how a page loads fonts is the host's decision. The component library follows the same rule.

To self-host the copies that ship with the theme, serve the package's `src/fonts/` folder and `src/fonts.css` from your site, and link the stylesheet before your own:

```html
<link rel="stylesheet" href="/assets/fonts.css">
<link rel="stylesheet" href="/assets/site.css">
```

All three families are under the SIL Open Font License, which permits self-hosting. The print typefaces, Gotham and URW DIN Condensed, are licensed through Adobe Fonts and must not be self-hosted. The theme doesn't include them.

## Build

With the Tailwind CLI:

```shell
npx @tailwindcss/cli -i src/site.css -o dist/site.css --minify
```

With Vite or Next.js, follow Tailwind's own setup guide for that tool and add the theme import to the stylesheet it tells you to create. Nothing else changes.

Once that builds, read [How the theme works](/getting-started/how-it-works/) before writing markup. It explains why some of Tailwind's familiar classes are missing.
