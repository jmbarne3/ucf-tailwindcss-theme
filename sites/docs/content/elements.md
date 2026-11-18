---
title: Elements
order: 1
description: Plain HTML is on-brand without classes. Headings, copy, links and captions are styled from the library's element styles.
---

## Plain HTML

Tailwind's reset, Preflight, removes all styling from headings, links and lists. The theme puts the brand's back in the base layer. They are generated from the component library's `elements.json`, the same file that styles the WordPress block theme. A utility on an element still overrides them.

{% example %}
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
<p>Body copy is Montserrat at 17px with generous leading. <a href="#">Links</a> are underlined, and the underline thickens on hover, so they never depend on color alone. <strong>Strong text</strong>, <em>emphasis</em> and <code>inline code</code> work as expected.</p>
{% endexample %}

Headings 1 to 3 are Oswald, uppercase. **Headings 4 to 6 are Montserrat in sentence case**, a heavier body face for the small levels, where condensed capitals become hard to read. That follows the brand's web guidance.

## On dark sections

Every element reads a role, so nothing changes in the markup:

{% example "dark" %}
<h2>A dark section</h2>
<p>Copy is white, headings are white, and <a href="#">links</a> switch to Horizon Blue.</p>
{% endexample %}

## Lists and spacing

Preflight also removes list bullets and all margins, and the theme leaves them removed. In templates you write, space things with utilities (`space-y-4`, `gap-6`, `mt-8`). For content you don't control, such as CMS output or Markdown, wrap it in [`rich-text`](/content/rich-text/).
