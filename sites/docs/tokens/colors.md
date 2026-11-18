---
title: Colors
order: 1
description: The brand palette is black and Bold Gold, with Horizon Blue for links only. Everything else here is a neutral or a state color.
---

## The palette

The 2026 brand is built on two colors, **UCF Black and Bold Gold (#EDB80D)**. Horizon Blue is approved for links on web and digital surfaces only, and is never an accent. The grays are neutrals for surfaces and lines, and the reds and greens are reserved for error and success states.

Each color is a Tailwind color, so it works with every color utility: `bg-gold`, `text-black`, `border-gray-200`, `decoration-gold`, `bg-gold/20`. Each is also a CSS variable, `--ucf-color-{name}`, for your own CSS.

<div class="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3">
{%- for c in tokens.colors %}
  <div class="border border-line">
    <div class="h-20" style="background: var({{ c.cssVar }})"></div>
    <div class="p-3 text-sm">
      <p class="font-bold text-heading">{{ c.name }}</p>
      <p class="type-data mt-1"><code>{{ c.utility }}</code> · {{ c.value }}</p>
      <p class="type-data text-muted mt-1">{{ c.onWhite }}:1 on white · {{ c.onBlack }}:1 on black</p>
    </div>
  </div>
{%- endfor %}
</div>

## Using color well

Gold on white measures only 1.88:1, so **Bold Gold is never a text color on light backgrounds**. Use it as a fill with black text on it, as a rule or underline, or as text on black. Horizon Blue (#4A8FBA) measures 3.54:1 on white. That's why links on light sections use Horizon Blue (Deep), and links on dark sections use Horizon Blue itself.

Most of the time you shouldn't reach for these colors at all. Reach for a **role** such as `text-link`, `bg-raised` or `text-muted`, which picks the right color for the section it's in. [Roles and compositions](/tokens/roles-and-compositions/) explains how.

The palette is unconfirmed in two places. The brand guide publishes no values for its grays, and Horizon Blue (Deep), the light-surface link color, still needs brand office sign-off. Both come from the component library's `tokens.json`, and any change will be made there first.
