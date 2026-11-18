---
title: Typography
order: 3
description: Oswald for headlines, Montserrat for everything people read, Roboto Mono for data. Sizes scale fluidly between phone and desktop.
---

## Families

| Utility | Family | For |
|---|---|---|
{%- for f in tokens.fontFamilies %}
| `font-{{ f.slug }}` | <span style="font-family: var({{ f.cssVar }})">{{ f.value }}</span> | {% case f.slug %}{% when "display" %}Headlines, display type, the brand voice{% when "body" %}Body copy and interface text{% when "mono" %}Specifications, data, figure notes, very short captions{% endcase %} |
{%- endfor %}

Montserrat is the page default, so you rarely write `font-body`. Tailwind's own `font-sans`, `font-serif` and `font-mono` stacks are replaced: `font-sans` and `font-serif` don't exist.

## Sizes

The scale is the component library's. Headings and the lead size are fluid: each `clamp()` grows with the viewport between a phone size and a desktop size, so there is no `md:text-h1` to remember. Each size carries its own line height, which a `leading-*` utility overrides.

<div class="mt-6 border border-line divide-y divide-line">
{%- for s in tokens.fontSizes %}
  <div class="p-4 grid gap-2 md:grid-cols-[10rem_1fr] md:items-baseline">
    <div class="type-data"><code>{{ s.utility }}</code><br><span class="text-muted">{{ s.value }}</span></div>
    <p class="{{ s.utility }}{% if s.slug contains 'heading' or s.slug contains 'display' %} font-display uppercase font-semibold{% endif %} truncate">Knights plant the flag</p>
  </div>
{%- endfor %}
</div>

The library calls these `body` and `lead`. Here they are `text-base` and `text-lg`, because the role colors already use `text-body` and `text-lead`.

## Type styles

A size alone isn't a heading. Headings in the brand are Oswald, uppercase, semibold and tightly set. Below `h3`, they switch to heavy Montserrat in sentence case. The `type-*` utilities apply the whole style, which makes them the replacement for Athena's `.h1` and `.display-1`:

{% example %}
<p class="type-display">Display</p>
<p class="type-h1">Heading 1</p>
<p class="type-h2">Heading 2</p>
<p class="type-h3">Heading 3</p>
<p class="type-h4">Heading 4</p>
<p class="type-h5">Heading 5</p>
<p class="type-h6">Heading 6</p>
<p class="type-lead">A lead paragraph introduces a page or section.</p>
<p class="type-data">DATA · ROBOTO MONO · 0.8125REM</p>
{% endexample %}

Plain `<h1>` to `<h6>` elements get the same styles automatically. Use `type-*` when the visual level should differ from the document outline, for example an `<h2>` that should look like an `h4`.

## Tracking and leading

Tailwind's `tracking-*` and `leading-*` scales are unchanged. Two named values join them: `tracking-heading` (0.01em) and `leading-heading` (1.1) for display type set outside a heading, and `leading-body` (1.65) for copy.
