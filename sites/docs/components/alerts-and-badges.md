---
title: Alerts and badges
order: 4
description: Messages with an accent edge, and short labels in the accent color.
---

## Alerts

The plain `alert` is for information. `alert-success` and `alert-danger` use the library's state roles. The brand has no info or warning color, so there are no such variants. Add `role="status"` to a message that appears after the page loads, or `role="alert"` for an error.

{% example %}
<div class="grid gap-4 max-w-xl">
  <div class="alert"><p><strong>Orientation registration opens March 3.</strong> Reserve a session early; summer dates fill first.</p></div>
  <div class="alert alert-success" role="status"><p><strong>Application received.</strong> We'll email you within two business days.</p></div>
  <div class="alert alert-danger" role="alert"><p><strong>Your session expired.</strong> Sign in again to keep your progress.</p></div>
</div>
{% endexample %}

## Badges

{% example %}
<div class="flex flex-wrap gap-2">
  <span class="badge">New</span>
  <span class="badge">Online</span>
  <span class="badge badge-outline">Graduate</span>
</div>
{% endexample %}

{% example "gold" %}
<div class="flex flex-wrap gap-2">
  <span class="badge">On gold, the badge turns black</span>
  <span class="badge badge-outline">Outline</span>
</div>
{% endexample %}
