---
title: Rich text
order: 2
description: One class restores vertical rhythm, lists, quotes and tables for content that comes from a CMS or Markdown.
---

## When to use it

Utilities work well for markup you write. They don't work for markup an editor writes in a CMS. Put `rich-text` on the container and everything inside gets spacing, list markers, quotes, code and tables. Athena styled these everywhere. The theme scopes them to the container, so they never leak into page chrome.

{% example %}
<div class="rich-text max-w-content">
  <h2>Admission requirements</h2>
  <p>First-year applicants are reviewed on their academic record, the rigor of their coursework and their essay.</p>
  <ul>
    <li>Official high school transcript</li>
    <li>SAT or ACT scores, if submitting</li>
    <li>A personal essay</li>
  </ul>
  <blockquote><p>The quotation is set larger, with an accent rule.</p></blockquote>
  <h3>Deadlines</h3>
  <table>
    <thead><tr><th>Term</th><th>Deadline</th></tr></thead>
    <tbody><tr><td>Fall</td><td>May 1</td></tr><tr><td>Spring</td><td>November 1</td></tr></tbody>
  </table>
</div>
{% endexample %}

The descendant rules are written with `:where()`, so they carry no more weight than the `rich-text` class itself. A utility on an element inside, such as `mt-0` or `list-none`, still changes it.
