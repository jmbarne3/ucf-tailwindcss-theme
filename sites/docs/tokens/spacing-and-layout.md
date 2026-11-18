---
title: Spacing and layout
order: 4
description: Tailwind's spacing scale is kept, because it already holds every step of the brand's. A few named measures are added.
---

## The scale

Tailwind spaces in steps of 0.25rem: `p-4` is 1rem, `gap-6` is 1.5rem. The component library's spacing scale is a subset of it, so we kept Tailwind's scale and documented the overlap:

| Library token | Value | Tailwind |
|---|---|---|
{%- for s in tokens.spacing %}
| `spacing.{{ s.slug }}` | {{ s.value }} | `*-{{ s.value | remove: "rem" | times: 4 }}` |
{%- endfor %}

## Named measures

| Utility | Value | For |
|---|---|---|
| `px-gutter`, `gap-gutter` | `clamp(1rem, 3vw, 1.5rem)` | The page's side margins and grid gaps |
| `py-section`, `mt-section` | `clamp(4rem, 8vw, 6rem)` | The space above and below a section |
| `min-h-tap`, `size-tap` | 44px | The smallest tap target |
| `max-w-content` | 720px | Reading width |
| `max-w-measure` | 720px | A comfortable line length for copy |
| `max-w-wide` | 1240px | The widest content on a page |

The widths match the component library's Section, and in WordPress they match the block theme's content and wide sizes. A section built with this theme lines up with a library Section above or below it.

## Breakpoints

The breakpoints are Tailwind's defaults: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px and `2xl` 1536px. They are not Athena's 576, 768, 992 and 1200. Nothing here needs to stay compatible with Athena, and Bootstrap 6 is moving `lg` and `xl` to the same values.
