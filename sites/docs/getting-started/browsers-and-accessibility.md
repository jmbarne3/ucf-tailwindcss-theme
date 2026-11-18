---
title: Browsers and accessibility
order: 5
description: The browser floor is Tailwind v4's. The accessibility floor is WCAG 2.1 AA, checked against the tokens.
---

## Supported browsers

The theme supports what Tailwind v4 supports: **Safari 16.4, Chrome 111 and Firefox 128 and later**. Tailwind v4 is built on cascade layers, registered custom properties and `color-mix()`. Older browsers get unstyled or partly styled pages, not a degraded version. Safari 16.4 shipped in March 2023, so the floor reaches iPhones that can run iOS 16.4.

That floor is higher than Athena v2's, which reaches back to iOS 12. We should check campus analytics before a production site moves to the theme.

A few components depend on newer features and say so on their own pages. The `command` and `commandfor` attributes that open a dialog without a script are the main one, and the [modal docs](/components/modal-and-drawer/) give a fallback.

## Accessibility

**Every text role clears 4.5:1 on each composition's field and raised panel, and every control edge clears 3:1.** The component library's tests check those pairs against `tokens.json`, this theme's tests check them again on the copy it ships, and the [roles page](/tokens/roles-and-compositions/) prints every ratio.

One gap remains, and it isn't fixed yet. On the Bold Gold composition's own background, the `danger` and `success` roles measure 3.59:1 and 3.43:1, below the 4.5:1 text needs. Until the library's tokens change, don't put error or success text, including `form-error`, directly on a Bold Gold section. Put the form on a `bg-raised` panel, where both pass.

The theme also builds a few accessible defaults into its CSS:

- **One focus ring.** Every focusable element gets a 3px outline in the focus role: black on light and gold sections, Bold Gold on dark ones.
- **State shown in shape.** Links, text buttons and navbar links thicken or add an underline on hover and for the current page, so state never depends on color alone.
- **Tap targets.** Buttons, form controls, pagination and menu items are at least 44px tall.
- **Native elements.** Menus, accordions and dialogs use `<details>` and `<dialog>`, so the browser provides keyboard handling, focus management and screen reader semantics.

None of this makes a page accessible by itself. Headings still need a logical order, images still need alternative text, and a Bold Gold section still needs black text, which the composition sets for you.
