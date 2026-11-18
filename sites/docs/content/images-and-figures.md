---
title: Images and figures
order: 3
description: Square corners, responsive by default, and captions in Roboto Mono.
---

## Images

Preflight already makes images block-level and limits them to their container's width. Images need nothing from the theme except square corners, which they already have. Use `aspect-*` and `object-cover` to crop to a shape:

{% example %}
<img class="w-full max-w-md aspect-video object-cover bg-raised" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%23333'/%3E%3Cpath d='M0 9 6 3l4 4 2-2 4 4z' fill='%23EDB80D'/%3E%3C/svg%3E" alt="A placeholder landscape">
{% endexample %}

## Figures

`<figcaption>` is set in Roboto Mono at the data size, in the muted role. The brand reserves the mono face for figure notes and very short captions.

{% example %}
<figure class="max-w-md">
  <img class="w-full aspect-video object-cover" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%23333'/%3E%3C/svg%3E" alt="">
  <figcaption class="mt-2">Fig. 1 — The Reflecting Pond at dusk.</figcaption>
</figure>
{% endexample %}
