---
title: How the theme works
order: 2
description: The theme decides which values exist. Your markup decides how they're combined.
---

## A theme, not a component kit

Athena gave you finished classes such as `.btn-primary`, `.card` and `.navbar`, and a JavaScript bundle to drive them. This theme works from the other end. It decides which colors, sizes, fonts and corners exist, and Tailwind builds every utility from those values and nothing else. **If a value isn't on-brand, there's no class for it.** That is the main idea, and most of what follows comes from it.

## What it removes

Tailwind ships with a broad default design system. The theme clears the parts of it that would put off-brand values in reach:

- **The color palette.** Tailwind's 22 hues are gone. `bg-red-500` and `text-sky-700` compile to nothing.
- **Rounded corners.** The brand says "no rounded corners or circles," so `rounded-sm` through `rounded-4xl` don't exist. `rounded-none` and `rounded-full` are built into Tailwind and can't be removed. Use `rounded-full` only for radios and spinners, where the shape tells people what the control is.
- **The type scale.** `text-xs` through `text-9xl` are replaced by the brand's sizes.
- **Font families and shadows.** These are replaced by the brand's three faces and one overlay shadow.

Spacing, breakpoints, layout, flexbox, grid and every other utility that doesn't carry brand values work exactly as Tailwind documents them.

## Where the values come from

Every value comes from the component library's `tokens/tokens.json`. The theme writes each one as a `--ucf-*` custom property, with the same names the library uses, and points Tailwind at those properties. `bg-gold` compiles to `background-color: var(--ucf-color-gold)`. When you write your own CSS, read the `--ucf-*` variables too.

## Roles follow the section

Beside the fixed colors, the theme has **roles**: colors named for what they do, such as `heading`, `link`, `muted`, `raised` and `accent`. A role changes with the section it sits in. `text-link` is a deep Horizon Blue on a white section and the lighter Horizon Blue on a black one, with no extra class. [Roles and compositions](/tokens/roles-and-compositions/) covers this in full. It's the one idea in the theme that has no Tailwind equivalent.

## Components are utilities too

`btn`, `card`, `form-input` and the other component classes are registered with Tailwind's `@utility`. Three things follow from that:

- **They're tree-shaken.** A component you don't use adds no CSS.
- **Variants work on them.** `md:btn-lg` and `hover:filter-sepia` behave as you'd expect.
- **Plain utilities override them.** `btn w-full` makes a full-width button, and `card p-8` makes a roomier card, because Tailwind emits single-property utilities after multi-property ones.

The interactive components use the browser's own elements instead of JavaScript: `popover` for the navbar menu, `<details>` for dropdowns and accordions, and `<dialog>` for modals and drawers.
