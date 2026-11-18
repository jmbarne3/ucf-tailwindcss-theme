---
title: Tailwind's utilities
order: 2
description: Everything Tailwind documents still works, except the values the theme removes. This is the list of what's different.
---

## What's unchanged

Layout, flexbox, grid, spacing, sizing, positioning, display, overflow, transforms, transitions, animation, interactivity and accessibility utilities all work exactly as [Tailwind documents them](https://tailwindcss.com/docs). So do the variants: responsive (`md:`), state (`hover:`, `focus-visible:`, `aria-*:`), `group-*`, `peer-*` and `has-*`.

## What's replaced

| Tailwind namespace | In this theme |
|---|---|
| Colors (`red-500`, `slate-900`…) | Brand colors and roles only: `gold`, `black`, `gray-050`, `link`, `raised`… |
| Font families (`sans`, `serif`, `mono`) | `display`, `body`, `mono` |
| Font sizes (`xs` to `9xl`) | `data`, `sm`, `data-lg`, `base`, `lg`, `h6` to `h1`, `display` |
| Border radius (`sm` to `4xl`) | None: square corners |
| Box shadows (`sm` to `2xl`) | `overlay` |

## What's added

| Utility | Where it's documented |
|---|---|
| `px-gutter`, `py-section`, `min-h-tap`, `max-w-wide`, `max-w-content` | [Spacing and layout](/tokens/spacing-and-layout/) |
| `tracking-heading`, `leading-heading`, `leading-body` | [Typography](/tokens/typography/) |
| `type-*` | [Typography](/tokens/typography/) |
| `layout-wide`, `layout-content` | [Sections and page widths](/layout/sections-and-widths/) |
| `rich-text` | [Rich text](/content/rich-text/) |
| `heading-underline`, `blockquote-quotation`, `media-background*`, `filter-sepia` | [Brand utilities](/utilities/brand-utilities/) |
| Component classes | [Components](/components/buttons/) |

## Arbitrary values

Tailwind lets you write any value in brackets, such as `bg-[#ff0000]` or `rounded-[12px]`. The theme can't prevent that, and we didn't try. Treat a bracketed color, radius or font size in a template as a code-review question: is there a token for this, and if not, should the library have one?
