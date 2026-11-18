---
title: Cards
order: 3
description: A raised panel with built-in padding and spacing. The rest is utilities.
---

## Card

`card` paints the raised role, pads its content and spaces its children with a gap. Everything inside is plain markup.

{% example %}
<div class="grid gap-6 sm:grid-cols-2 max-w-3xl">
  <article class="card">
    <h3 class="type-h4">Nursing, BSN</h3>
    <p>Prepare for licensure with clinical placements across Central Florida's hospital systems.</p>
    <a class="btn btn-text btn-sm mt-auto" href="#">Program details</a>
  </article>
  <article class="card card-outline">
    <h3 class="type-h4">Outline card</h3>
    <p><code>card-outline</code> drops the fill for a hairline edge.</p>
  </article>
</div>
{% endexample %}

## Media and whole-card links

`card-media` lets an image run to the card's edges. To make the whole card one link, put `after:absolute after:inset-0` on its main link. The card is already `position: relative`, so the link's pseudo-element covers it. This replaces Athena's `.stretched-link`.

{% example "alt" %}
<article class="card max-w-sm hover:bg-field">
  <div class="card-media"><img class="aspect-video object-cover" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%23000'/%3E%3Cpath d='M0 9 6 3l4 4 2-2 4 4z' fill='%23EDB80D'/%3E%3C/svg%3E" alt=""></div>
  <p class="type-data uppercase text-accent-text">Research</p>
  <h3 class="type-h4"><a class="text-heading no-underline hover:underline after:absolute after:inset-0" href="#">A lab that listens to the ocean</a></h3>
  <p class="text-muted">Optics researchers are mapping reef sound in real time.</p>
</article>
{% endexample %}

On a Light Alt section, `card` paints white, because Light Alt's raised role is white.
