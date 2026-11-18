---
title: Tables
order: 4
description: data-table for tabular data, with an optional stripe. Wrap wide tables so they scroll on phones.
---

## Data tables

The class is `data-table`, not Athena's `.table`, because Tailwind's `table` utility already means `display: table`.

{% example %}
<div class="overflow-x-auto">
  <table class="data-table data-table-striped">
    <caption>Fall 2026 enrollment, preliminary</caption>
    <thead><tr><th scope="col">College</th><th scope="col">Undergraduate</th><th scope="col">Graduate</th></tr></thead>
    <tbody>
      <tr><td>Engineering and Computer Science</td><td>11,240</td><td>2,310</td></tr>
      <tr><td>Business</td><td>8,905</td><td>1,120</td></tr>
      <tr><td>Health Professions and Sciences</td><td>7,480</td><td>890</td></tr>
    </tbody>
  </table>
</div>
{% endexample %}

The figures above are placeholders, not real enrollment data. Captions sit below the table in the mono face, as figure captions do.
