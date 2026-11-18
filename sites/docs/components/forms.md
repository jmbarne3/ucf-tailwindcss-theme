---
title: Forms
order: 2
description: Inputs, selects, checkboxes and radios that read the field and line roles, with errors shown in color and words.
---

## Text fields and selects

Pair every control with a visible `form-label`. Hint text goes in `form-help`, connected with `aria-describedby`.

{% example %}
<div class="grid gap-6 max-w-md">
  <div>
    <label class="form-label" for="ex-name">Full name</label>
    <input class="form-input" id="ex-name" type="text" autocomplete="name">
  </div>
  <div>
    <label class="form-label" for="ex-email">Email</label>
    <input class="form-input" id="ex-email" type="email" aria-describedby="ex-email-help" placeholder="name@example.com">
    <span class="form-help" id="ex-email-help">We'll only use this to reply.</span>
  </div>
  <div>
    <label class="form-label" for="ex-term">Starting term</label>
    <select class="form-select" id="ex-term"><option>Fall 2027</option><option>Spring 2028</option></select>
  </div>
  <div>
    <label class="form-label" for="ex-msg">Message</label>
    <textarea class="form-input" id="ex-msg" rows="4"></textarea>
  </div>
</div>
{% endexample %}

Fields use 16px type so iOS Safari doesn't zoom the page when one takes focus.

## Checkboxes and radios

These stay native, so they keep the browser's own keyboard and screen reader behavior. `form-check` sizes them, aligns the label and makes the row a full tap target. Their color is the indicator role, which is black on light sections and Bold Gold on dark ones. Radios stay round.

{% example %}
<fieldset class="grid gap-1">
  <legend class="form-label">How did you hear about us?</legend>
  <label class="form-check"><input type="radio" name="ex-heard" checked> A campus visit</label>
  <label class="form-check"><input type="radio" name="ex-heard"> A friend or family member</label>
  <label class="form-check"><input type="checkbox"> Send me updates by email</label>
</fieldset>
{% endexample %}

## Errors

Mark a field invalid with `aria-invalid="true"`, which turns its edge to the danger role, and say what's wrong in a `form-error` tied to the field with `aria-describedby`. Fields also pick up the browser's `:user-invalid` state, which applies only after the person has interacted with the field.

{% example %}
<div class="max-w-md">
  <label class="form-label" for="ex-zip">ZIP code</label>
  <input class="form-input" id="ex-zip" type="text" value="3281" aria-invalid="true" aria-describedby="ex-zip-error">
  <span class="form-error" id="ex-zip-error">Enter a five-digit ZIP code.</span>
</div>
{% endexample %}

Don't set error text directly on a Bold Gold section: the danger role measures 3.59:1 there. Put the form on a `bg-raised` panel instead.

## On dark sections

{% example "dark" %}
<div class="max-w-md">
  <label class="form-label" for="ex-dark">Search programs</label>
  <input class="form-input" id="ex-dark" type="search" placeholder="Try “nursing”">
  <label class="form-check"><input type="checkbox" checked> Online only</label>
</div>
{% endexample %}
