---
title: Buttons
order: 1
description: Three styles and three sizes, identical to the component library's Button, on every composition.
---

## Styles

`btn` is the fill, for the main action. Add `btn-outline` for a second action, or `btn-text` for a link-weight action that mustn't compete, such as "See all" beside a heading. Hover inverts the colors rather than fading them.

{% example %}
<div class="flex flex-wrap items-center gap-3">
  <a class="btn" href="#">Apply now</a>
  <a class="btn btn-outline" href="#">Schedule a visit</a>
  <a class="btn btn-text" href="#">See all programs</a>
</div>
{% endexample %}

The colors come from the button roles, so the same three buttons are correct on every section. On Bold Gold the fill turns black, because a gold button would vanish.

{% example "dark" %}
<div class="flex flex-wrap items-center gap-3">
  <a class="btn" href="#">Apply now</a>
  <a class="btn btn-outline" href="#">Schedule a visit</a>
  <a class="btn btn-text" href="#">See all programs</a>
</div>
{% endexample %}

{% example "gold" %}
<div class="flex flex-wrap items-center gap-3">
  <a class="btn" href="#">Apply now</a>
  <a class="btn btn-outline" href="#">Schedule a visit</a>
  <a class="btn btn-text" href="#">See all programs</a>
</div>
{% endexample %}

## Sizes

The default is 52px tall. `btn-sm` is 44px, the smallest tap target. `btn-lg` is 60px. The text style stays flush with its text at any size.

{% example %}
<div class="flex flex-wrap items-center gap-3">
  <button class="btn btn-sm" type="button">Small</button>
  <button class="btn" type="button">Default</button>
  <button class="btn btn-lg" type="button">Large</button>
</div>
{% endexample %}

## Changing a button

Plain utilities override the component, so `btn w-full` is a full-width button and `btn md:w-auto` returns to its label width from `md` up. `disabled`, or `aria-disabled="true"` on a link, dims the button and blocks pointer events.

{% example %}
<button class="btn w-full md:w-auto" type="button">Full width on phones</button>
<button class="btn btn-outline mt-3" type="button" disabled>Disabled</button>
{% endexample %}
