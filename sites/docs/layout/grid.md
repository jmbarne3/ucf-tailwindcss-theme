---
title: Grid and columns
order: 2
description: Tailwind's grid and flex utilities replace Athena's rows and columns. The gutter token keeps gaps consistent.
---

## Columns

There's no `.row` or `.col-*`. CSS grid does the same job with less markup, and Tailwind exposes all of it. A typical responsive set of cards:

{% example %}
<div class="grid gap-gutter sm:grid-cols-2 lg:grid-cols-3">
  <div class="bg-raised p-6">One</div>
  <div class="bg-raised p-6">Two</div>
  <div class="bg-raised p-6">Three</div>
</div>
{% endexample %}

`gap-gutter` matches the space between columns to the page's side margins. For a fixed gap, any spacing step works: `gap-6`, `gap-x-8 gap-y-12`.

## Uneven columns

Use a track list for a main column and a sidebar. The `minmax(0,1fr)` stops long words or code from pushing the column wider than its share.

{% example %}
<div class="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
  <div class="bg-raised p-6">Main content</div>
  <aside class="border-l-4 border-accent pl-6">Sidebar</aside>
</div>
{% endexample %}

## Stacks

For a row of buttons or a stack of items, use flex with a gap. This replaces Bootstrap's `.hstack` and `.vstack`:

{% example %}
<div class="flex flex-wrap items-center gap-3">
  <a class="btn" href="#">Apply</a>
  <a class="btn btn-outline" href="#">Visit</a>
  <a class="btn btn-text" href="#">Request info</a>
</div>
{% endexample %}
