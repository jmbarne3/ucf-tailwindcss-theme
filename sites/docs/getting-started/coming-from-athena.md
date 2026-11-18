---
title: Coming from Athena
order: 4
description: The theme isn't backward compatible with Athena, by design. This page maps the classes you know to what replaces them.
---

## What changes

Moving from Athena to this theme is not a rename. Athena's classes describe finished components. Here, most of that work moves into utilities in the markup. Expect to rewrite templates, not search and replace them. The table below is a guide to what replaces each Athena class. It is not a mechanical mapping.

Three changes account for most of the differences:

- **Roles replace `-inverse`.** Athena had `.heading-underline-inverse`, `.btn-outline-i-*` and `data-bs-theme="dark"`. Here, a composition class on the section re-points every role, and the same classes work inside it.
- **Tailwind's breakpoints replace Bootstrap's.** They are `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px and `2xl` 1536px, not 576, 768, 992 and 1200. Layouts that switch at `lg` switch 32px later.
- **No JavaScript bundle.** Bootstrap's modal, dropdown, collapse and offcanvas plugins are replaced by `<dialog>`, `<details>` and `popover`. Tooltips, toasts, scrollspy and carousels aren't provided. The brand rules out carousels anyway.

## Class map

| Athena v2 | This theme |
|---|---|
| `.container` | `layout-wide`, or `layout-content` for reading width |
| `.row`, `.col-md-6` | `grid md:grid-cols-2 gap-6`, or `flex` utilities |
| `.btn .btn-primary` | `btn` |
| `.btn .btn-outline-*` | `btn btn-outline` |
| `.btn-sm`, `.btn-lg` | `btn-sm`, `btn-lg` |
| `.btn-link` | `btn btn-text` |
| `.card`, `.card-body` | `card` (padding is built in) |
| `.card-img-top` | `card-media` |
| `.stretched-link` | `after:absolute after:inset-0` on the link |
| `.alert .alert-success` | `alert alert-success` |
| `.alert-info`, `.alert-warning` | `alert` (the brand has no info or warning color) |
| `.badge .text-bg-primary` | `badge` |
| `.table`, `.table-striped` | `data-table`, `data-table-striped` |
| `.form-control` | `form-input` |
| `.form-select` | `form-select` |
| `.form-check` | `form-check` |
| `.form-label`, `.form-text` | `form-label`, `form-help` |
| `.breadcrumb` | `breadcrumb` |
| `.pagination` | `pagination` |
| `.navbar` | `navbar` with `navbar-inner`, `navbar-menu`, `navbar-links` |
| `.dropdown` | `<details class="dropdown">` |
| `.accordion` | `<div class="accordion">` around `<details>` |
| `.modal` | `<dialog class="modal">` |
| `.offcanvas` | `<dialog class="drawer">` |
| `.spinner-border` | `spinner` |
| `.progress` | `<progress class="progress">` |
| `.h1` to `.h6` | `type-h1` to `type-h6` |
| `.display-1` to `.display-6` | `type-display`, with `text-h1` and so on for smaller sizes |
| `.lead` | `type-lead` |
| `.font-condensed` | `font-display` |
| `.font-monospace` | `font-mono`, or `type-data` |
| `.heading-underline`, `-inverse` | `heading-underline` |
| `.blockquote-quotation`, `-inverse` | `blockquote-quotation` |
| `.hr-2`, `.hr-3` | `border-t-3`, `border-t-5` on an `<hr>` |
| `.letter-spacing-3` | `tracking-widest` (0.1em) or `tracking-[.1em]` |
| `.line-height-2` | `leading-[1.25]` |
| `.font-weight-black` | `font-extrabold` (800) |
| `.media-background-container`, `.media-background` | the same names |
| `.filter-sepia` | `filter-sepia` |
| `.filter-grayscale`, `.filter-blur` | `grayscale`, `blur-[5px]` |
| `.hover-parent` + `.hover-child-*` | `group` + `group-hover:*` |
| `.hover-text-white` | `hover:text-white` |
| `.bg-faded`, `.bg-body-tertiary` | `bg-raised` |
| `.text-*-emphasis` | `text-accent-text`, `text-danger`, `text-success` |
| `.visually-hidden` | `sr-only` |
| `.rounded`, `.rounded-pill` | not available: square corners |

## A worked example

Here is an Athena card on a dark section, followed by its replacement. Notice that nothing in the replacement says "dark".

```html
<!-- Athena v2 -->
<section class="bg-secondary" data-bs-theme="dark">
  <div class="container">
    <div class="card text-bg-dark">
      <div class="card-body">
        <h3 class="h5 heading-underline-inverse">Admissions</h3>
        <a class="btn btn-primary" href="/apply">Apply</a>
      </div>
    </div>
  </div>
</section>
```

{% example "dark" %}
<div class="card">
  <h3 class="type-h5 heading-underline">Admissions</h3>
  <a class="btn" href="#">Apply</a>
</div>
{% endexample %}
