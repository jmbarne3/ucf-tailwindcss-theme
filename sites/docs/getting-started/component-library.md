---
title: With the component library
order: 3
description: The theme and @ucf/components read the same variables. Load them in the right order and they never disagree.
---

## One set of values

The theme is not a second design system next to the component library. It is the library's tokens, made available to Tailwind. Both write the same `--ucf-*` custom properties from the same `tokens.json`, so a library `<Button>` and a theme `btn` are the same height and the same gold. They swap colors the same way on a Dark section.

## Load order

The library's `ucf.css` is not in a cascade layer. Unlayered CSS beats every layer, whatever the specificity, so if it loads unlayered it overrides your Tailwind utilities wherever the two touch. **Import the library's CSS into Tailwind's `components` layer**, so utilities you write still win:

```css
@import "tailwindcss";
@import "@ucf/tailwindcss-theme";
@import "@ucf/components/ucf.css" layer(components);
@import "@ucf/components/elements.css" layer(components);
```

`elements.css` is the library's opt-in element styling for headings, copy and links. The theme already styles those elements globally from the same `elements.json`, so most sites that use the theme can leave it out.

We haven't yet tested this order against a real Next.js page that uses both packages. It follows from how cascade layers work, but the kitchen sink doesn't load the library.

## Sections and compositions

The library's Section component sets a `ucf-composition-*` class on its outer element. The theme defines the same five classes, so you can set a composition with or without the library:

```html
<section class="ucf-composition-dark py-section">
  <div class="layout-wide">…</div>
</section>
```

When both are loaded, the library's definitions also set its panel and bar roles, which its components use. The theme leaves those to the library.

## Who owns what

**Components with saved markup or real behavior belong in the library.** That includes anything stored in a WordPress post and anything with data, such as the Degree Finder. Layout, page chrome, and one-off composition of utilities belong in the site, built with this theme. The theme's component classes cover the everyday pieces, like buttons, form fields, cards and alerts. Plain Tailwind would otherwise rebuild them slightly differently on every site.

## Changing a value

Never edit `tokens/` in this repository. A value changes in the library's `tokens.json` first. Then `npm run sync:tokens` copies it here, and `npm run build:tokens` regenerates the theme. `npm run check:tokens` fails while the copy is stale.
