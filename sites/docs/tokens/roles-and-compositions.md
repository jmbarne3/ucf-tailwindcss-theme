---
title: Roles and compositions
order: 2
description: A role is a color named for its job. A composition is a section that re-points every role at once.
---

## The problem roles solve

The hard part of a dark section isn't the background. It's that every color inside it has to change: headings to white, links to the lighter blue, rules to gold, cards to near-black. Athena handled this with `-inverse` classes on each element. Here, **one class on the section changes all of them**, and the markup inside stays the same.

{% example "dark" %}
<div class="card">
  <p class="type-data uppercase tracking-wider text-accent-text">Featured</p>
  <h3 class="type-h4">The same markup on any section</h3>
  <p class="text-muted">Copy, headings, links and buttons follow the section. <a href="#">This is a link.</a></p>
  <div class="flex flex-wrap gap-3"><a class="btn btn-sm" href="#">Fill</a><a class="btn btn-outline btn-sm" href="#">Outline</a></div>
</div>
{% endexample %}

## Compositions

A composition is a section background plus the set of role colors that go with it. Put its class on a section-level element:

| Class | Background | For |
|---|---|---|
{%- for c in tokens.compositions %}
| `ucf-composition-{{ c.slug }}` | {{ c.backgroundHex }} | {{ c.name }} |
{%- endfor %}

The brand's guidance is to balance light and dark sections down a page and to use **at most one Bold Gold band per page**, usually for the call to action. Dark Alt exists to separate two dark sections in a row, the way Light Alt separates two light ones.

Here is the same card on each one:

<div class="grid gap-0 mt-6 md:grid-cols-5 border border-line">
{%- for c in tokens.compositions %}
  <div class="ucf-composition-{{ c.slug }} p-5 flex flex-col gap-3">
    <p class="type-data uppercase text-accent-text">{{ c.name }}</p>
    <p class="type-h5">Heading</p>
    <p class="text-sm">Body copy with <a href="#">a link</a>.</p>
    <div class="bg-raised p-3 text-sm text-muted">Raised panel</div>
    <a class="btn btn-sm" href="#">Button</a>
  </div>
{%- endfor %}
</div>

## Roles

Every role is a Tailwind color, so `text-heading`, `bg-raised`, `border-line` and `outline-focus` all exist. Each also has a CSS variable, `--ucf-{role}`, for your own CSS. **Prefer a role to a fixed color** whenever the element could ever sit on more than one kind of section.

The table shows each role's color on every composition, and its contrast against that composition's background. Text roles must clear 4.5:1. Lines and control edges must clear 3:1 where they're the only cue, which is why there are two line roles: `line` for decoration and `line-strong` for form fields.

<div class="overflow-x-auto mt-6">
<table class="data-table">
  <thead><tr><th>Role</th>{% for c in tokens.compositions %}<th>{{ c.name }}</th>{% endfor %}</tr></thead>
  <tbody>
  {%- for role in tokens.roles %}
    <tr>
      <th scope="row"><code>{{ role }}</code></th>
      {%- for c in tokens.compositions %}{% assign r = c.roles[role] %}
      <td>
        {%- if r -%}
        <span class="inline-block size-3 align-middle border border-line" style="background: {{ r.value }}"></span>
        <span class="type-data">{{ r.ref | remove: "color." }}{% if r.ratio %}<br><span class="text-muted">{{ r.ratio }}:1</span>{% endif %}</span>
        {%- else -%}
        <span class="type-data">{{ c.backgroundHex }}</span>
        {%- endif -%}
      </td>
      {%- endfor %}
    </tr>
  {%- endfor %}
  </tbody>
</table>
</div>

> **Known gap.** `danger` and `success` measure 3.59:1 and 3.43:1 on the Bold Gold background itself. Set error and success text on a `bg-raised` panel inside a Bold Gold section, where both pass, until the library's tokens are corrected.

`surface` is the composition's own background, for an element that has to match the section exactly, such as a sticky header.

## Nesting

Compositions nest. A Light card inside a Dark section is just a `ucf-composition-light` element, and everything inside it follows Light's roles. Nesting is how a modal or a navbar gets its own treatment regardless of the page behind it.
