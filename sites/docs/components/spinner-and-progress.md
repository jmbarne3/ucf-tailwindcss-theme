---
title: Spinner and progress
order: 9
description: Loading and progress indicators in the indicator role.
---

## Spinner

A spinner is one of two round shapes the brand allows, because its shape tells people what it is. Give it `role="status"` and text for screen readers. With reduced motion turned on, it spins more slowly.

{% example %}
<div class="flex items-center gap-3" role="status">
  <span class="spinner"></span><span>Loading programs…</span>
</div>
{% endexample %}

## Progress

Style the native `<progress>` element, which already reports its value to assistive technology.

{% example %}
<label class="form-label" for="ex-progress">Application 60% complete</label>
<progress class="progress max-w-md" id="ex-progress" max="100" value="60">60%</progress>
{% endexample %}

{% example "dark" %}
<progress class="progress max-w-md" max="100" value="35" aria-label="Upload progress">35%</progress>
{% endexample %}
