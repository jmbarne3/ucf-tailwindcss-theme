---
title: Brand utilities
order: 1
description: The handful of Athena utilities Tailwind has no equivalent for, rebuilt to follow the section's roles.
---

## Heading underline

An uppercase heading with a short, heavy rule. The rule is the accent role, so it's gold on light and dark sections and black on Bold Gold. There's no `-inverse` version.

{% example "gold" %}
<h2 class="heading-underline type-h3">Heading underline</h2>
{% endexample %}

## Quotation blockquote

{% example %}
<blockquote class="blockquote-quotation">
  <p class="type-lead">UCF gave me the room to try something that hadn't been done before.</p>
  <footer class="mt-3 text-sm text-muted">— A 2026 graduate</footer>
</blockquote>
{% endexample %}

## Media backgrounds

Put `media-background-container` on a section and `media-background` on an image or video inside it. The media fills the section behind the content and crops to fit. Pair it with `filter-sepia` or a translucent overlay so text stays readable.

{% example "dark" %}
<div class="media-background-container -m-6 p-12">
  <img class="media-background filter-sepia" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%23777'/%3E%3Cpath d='M0 9 6 3l4 4 2-2 4 4z' fill='%23EDB80D'/%3E%3C/svg%3E" alt="">
  <p class="type-h2 text-white">Over a photo</p>
</div>
{% endexample %}

## Image filters and hover

`filter-sepia` is Athena's muted, warm treatment for photos behind text. Tailwind's own `grayscale`, `brightness-*` and `blur-*` cover Athena's other filters. Athena's hover utilities are Tailwind variants now: `hover-parent` with `hover-child-*` becomes `group` with `group-hover:*`.

{% example %}
<a class="group block max-w-xs no-underline" href="#">
  <img class="w-full aspect-square object-cover grayscale transition-[filter] duration-300 group-hover:grayscale-0" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%23EDB80D'/%3E%3C/svg%3E" alt="">
  <span class="block mt-2 font-bold text-body group-hover:underline">Hover the card</span>
</a>
{% endexample %}

## Type and layout

`type-h1` to `type-h6`, `type-display`, `type-lead` and `type-data` are covered in [Typography](/tokens/typography/). `layout-wide` and `layout-content` are covered in [Sections and page widths](/layout/sections-and-widths/).
