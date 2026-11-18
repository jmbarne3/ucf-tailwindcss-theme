---
title: Shape, lines and shadow
order: 5
description: Square corners everywhere, a small set of line weights, and one shadow.
---

## Corners

The brand's rule is **"no rounded corners or circles."** Every `rounded-*` size is removed from the theme, so `rounded-lg` produces no CSS. Two exceptions are built into Tailwind and can't be removed. `rounded-none` is harmless. `rounded-full` should be used only for the controls whose round shape carries meaning: radio buttons, which stay native, and spinners.

## Lines

| Token | Width | Use |
|---|---|---|
| `--ucf-custom-border-hairline` | 1px | Dividers, card outlines, table rows: `border`, `border-t` |
| `--ucf-custom-border-control` | 2px | Form fields and buttons: `border-2` |
| `--ucf-custom-rule-accent` | 4px | Accent rules: heading underlines, alert edges: `border-l-4` |
| `--ucf-custom-focus-width` | 3px | The focus ring: `outline-3` |

Color lines with a role: `border-line` for decoration and `border-line-strong` where the line is the only thing showing an edge.

## Shadow

There is one shadow, `shadow-overlay`, for things that float above the page, such as menus and dialogs. Tailwind's `shadow-sm` through `shadow-2xl` are removed. The brand's look is flat, and shape comes from color blocks and rules.

{% example "alt" %}
<div class="bg-field shadow-overlay p-6 max-w-sm">A menu or dialog panel uses <code>shadow-overlay</code>.</div>
{% endexample %}
