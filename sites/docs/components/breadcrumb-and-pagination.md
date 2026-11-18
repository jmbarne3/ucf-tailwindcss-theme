---
title: Breadcrumb and pagination
order: 6
description: Two navigation lists, both with full-size tap targets and aria-current for the current page.
---

## Breadcrumb

{% example %}
<nav aria-label="Breadcrumb">
  <ol class="breadcrumb">
    <li><a href="#">Home</a></li>
    <li><a href="#">Academics</a></li>
    <li><span aria-current="page">Undergraduate programs</span></li>
  </ol>
</nav>
{% endexample %}

The slashes are drawn with CSS and given empty alternative text, so screen readers don't announce them.

## Pagination

{% example %}
<nav aria-label="Pages">
  <ul class="pagination">
    <li><a href="#" aria-label="Previous page">‹</a></li>
    <li><a href="#">1</a></li>
    <li><span aria-current="page">2</span></li>
    <li><a href="#">3</a></li>
    <li><a href="#" aria-label="Next page">›</a></li>
  </ul>
</nav>
{% endexample %}
