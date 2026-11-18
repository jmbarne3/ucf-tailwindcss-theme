---
title: Dropdown and accordion
order: 7
description: Disclosure widgets on the native details element, with no JavaScript.
---

## Dropdown

A dropdown is a `<details>` element whose summary is a button. The browser handles the keyboard and announces the expanded state.

{% example %}
<details class="dropdown">
  <summary class="btn btn-outline">Resources</summary>
  <ul class="dropdown-menu">
    <li><a href="#">Academic calendar</a></li>
    <li><a href="#">Course catalog</a></li>
    <li><a href="#">Financial aid</a></li>
  </ul>
</details>
{% endexample %}

**Its one limit:** it stays open until the summary is pressed again. A click elsewhere doesn't close it. We chose `<details>` over a popover because a popover needs CSS anchor positioning to sit beside its button, and not every browser in our support range has that. A site that needs click-outside closing can add a few lines of script.

## Accordion

Give each `<details>` the same `name` and the browser keeps only one open at a time. Find-in-page also opens a closed panel that holds a match, which Athena's collapse couldn't do.

{% example %}
<div class="accordion max-w-xl">
  <details name="ex-faq" open><summary>When are applications due?</summary><p>Fall applications are due May 1 and spring applications November 1.</p></details>
  <details name="ex-faq"><summary>Is the application fee waivable?</summary><p>Yes, for applicants who qualify. Request a waiver from your school counselor.</p></details>
  <details name="ex-faq"><summary>Can I apply for more than one major?</summary><p>You choose one major on the application and can change it after you enroll.</p></details>
</div>
{% endexample %}
