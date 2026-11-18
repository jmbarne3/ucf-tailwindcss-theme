---
title: Navbar
order: 5
description: A site navigation bar whose phone menu needs no JavaScript.
---

## Structure

On phones, the links are inside a **popover**. The browser opens it from the Menu button, closes it with Escape or a tap outside, and returns focus to the button. From `lg` up, the same element shows inline. Resize this page to see both. The header at the top of these docs is this component.

```html
<header class="navbar ucf-composition-dark">
  <div class="navbar-inner layout-wide">
    <a class="navbar-brand" href="/">College of Sciences</a>
    <button class="navbar-toggle" popovertarget="site-menu">Menu</button>
    <div class="navbar-menu" id="site-menu" popover>
      <button class="navbar-close" popovertarget="site-menu" popovertargetaction="hide">Close</button>
      <ul class="navbar-links">
        <li><a href="/about/" aria-current="page">About</a></li>
        <li><a href="/programs/">Programs</a></li>
        <li><a href="/research/">Research</a></li>
      </ul>
    </div>
  </div>
</header>
```

Mark the current section's link with `aria-current="page"`. It gets the same underline as hover, so the state shows in shape.

## Light navbars

The navbar paints its composition's surface, so a light navbar is just a different composition:

{% example "light" %}
<header class="navbar ucf-composition-light border-b border-line">
  <div class="navbar-inner px-4">
    <a class="navbar-brand" href="#">Department name</a>
    <ul class="navbar-links hidden lg:flex"><li><a href="#">About</a></li><li><a href="#" aria-current="page">Programs</a></li><li><a href="#">Contact</a></li></ul>
  </div>
</header>
{% endexample %}

## The university header

This navbar is a site's own navigation. **It never replaces the official UCF university header** from universityheader.ucf.edu, which sits above it on every UCF site.
