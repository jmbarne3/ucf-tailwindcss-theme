---
title: Sections and page widths
order: 1
description: A UCF page is a stack of full-bleed sections, each holding content at one of two widths.
---

## The pattern

Athena centered everything in `.container`. The brand's pages are built differently. A page is a stack of **full-width sections**, each with its own composition. Inside each section, content sits at one of two widths. Every page uses this one pattern:

```html
<section class="ucf-composition-alt py-section">
  <div class="layout-wide">
    …
  </div>
</section>
```

- **`layout-wide`** centers content at up to 1240px with the responsive gutter on both sides. Most sections use it.
- **`layout-content`** does the same at 720px, for long reading: articles, policies, forms.
- **`py-section`** is the space above and below a section. It scales from 4rem on phones to 6rem on desktops.

{% example "alt" %}
<div class="layout-content py-8 bg-raised">
  <p class="type-data uppercase text-muted">layout-content · 720px</p>
  <p>Reading width keeps lines to a comfortable length.</p>
</div>
{% endexample %}

## Choosing compositions down a page

Alternate light and dark sections down a page, and use **at most one Bold Gold section**, usually the closing call to action. When two sections of the same kind sit next to each other, use the Alt version of one so the edge between them shows. The [kitchen sink](/getting-started/installation/) has a full page built this way.

Full-bleed media sections use [media backgrounds](/utilities/brand-utilities/#media-backgrounds) to put a photo or video behind the content.
