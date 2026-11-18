# UCF Tailwind CSS Theme — Implementation Plan

**Status:** Draft for review · **Prepared:** November 18, 2026 · **Repository:** local only, not linked to GitHub

## What this project is

This is not a port of Athena to Tailwind. Athena v2 is a Bootstrap theme: it ships finished class names (`.btn-primary`, `.card`, `.navbar`) and a JavaScript bundle. A Tailwind theme works the other way around. It decides which values exist — which colors, which type sizes, which corners — and lets every site compose its own markup from utilities built on those values. **The job is to make the 2026 brand the only thing Tailwind can produce**, then add back the handful of Athena behaviors utilities can't express on their own.

It also has to sit beside the component library (`@ucf/components`), not compete with it. The library's own to-do list already calls for "a Tailwind preset from `tokens.json`, so React sites style pages with the same values... reading the same `--ucf-*` variables," and notes that UCF will likely build React sites on Pantheon's P1 starter kit, which uses Tailwind v4. This project is that preset, plus documentation and a kitchen sink.

## What we start from

Two token sources exist today, and they disagree. Athena v2 keeps its brand values in `_athena-tokens.scss`. The component library keeps them in `tokens/tokens.json`, in the W3C Design Tokens (DTCG) format, with roles and section compositions layered on top. They agree on black, Bold Gold, white, Horizon Blue and the three typefaces. They differ on almost everything else: links on white are `#376D91` in Athena (still pending brand office sign-off) and `#1F6A9A` in the library, the gray scales don't match, and the library has red and green state colors where Athena has success, info, warning and danger.

We should not add a third source. I recommend this theme read the library's `tokens.json` directly, so a Tailwind utility such as `text-link` resolves to the same `--ucf-link` variable a library component reads. That decision, along with three others, is below.

## Decisions needed before we start

I've given a recommendation for each. I'll follow these unless you tell me otherwise.

- **Where the tokens come from.** I recommend the library's `tokens.json` as the only source. A `sync:tokens` script copies it into this repo and a `check:tokens` script fails when the copy is stale, which is the same pattern the block theme already uses. Athena's values that the library doesn't have (the info and warning colors, the gold tints) are not carried forward unless we add them to the library first.
- **How much of Athena's component surface comes along.** I recommend tokens, base element styles, brand utilities, and a set of CSS-only component classes (buttons, form controls, cards, alerts, badges, tables, breadcrumbs, pagination, navigation) built on native elements — `<dialog>` for modals and drawers, `<details>` for accordions, and the `popover` attribute for menus. No JavaScript bundle. Components with saved markup or real behavior, such as the Degree Finder, stay in the component library.
- **What the demo and docs are built with.** I recommend Eleventy 3 for both, matching the brand website. The theme stays framework-agnostic, and a Next.js check against the P1 starter can follow once that starter is chosen.
- **Tailwind v4's browser floor.** Tailwind v4 requires Safari 16.4, Chrome 111 and Firefox 128, because it is built on cascade layers, `@property` and `color-mix()`. Athena v2 reaches back to iOS 12. I recommend we accept v4's floor. Safari 16.4 shipped in March 2023, and v3 is the end of a line. We should still check campus analytics before a production site depends on it.

## How the theme is built

The theme is CSS-first, the way Tailwind v4 expects. A site adds two lines to its stylesheet — `@import "tailwindcss";` and `@import "@ucf/tailwindcss-theme";` — and gets the brand. There is no `tailwind.config.js`.

**Tokens become theme variables by script.** `scripts/build-tokens.mjs` reads `tokens/tokens.json` and writes `src/generated/tokens.css`. That file defines every `--ucf-*` primitive on `:root`, so the theme works with or without the library's `ucf.css` on the page, and maps each one into Tailwind's `@theme` namespaces (`--color-gold: var(--ucf-color-gold)`). The generated file is committed, because consumers install from source.

**Roles become utilities that follow the section.** The library's roles (`accent`, `body`, `heading`, `link`, `muted`, `line`, `raised` and the rest) are declared with `@theme inline`, so `bg-raised` or `text-heading` compiles to `var(--ucf-raised)` and changes when the element sits in a `.ucf-composition-dark` section. One set of classes works on light, dark and Bold Gold, which replaces Athena's `-inverse` classes and `data-bs-theme="dark"`.

**Tailwind's defaults are removed where they would break the brand.** The default 22-hue color palette is cleared, so `bg-blue-500` does not exist. Every radius is zero, matching the brand's "no rounded corners or circles." The default type scale is replaced by the library's named sizes (`text-body`, `text-lead`, `text-heading-1`, `text-display-1`). Spacing keeps Tailwind's 0.25rem step, because it already contains every step in the library's scale (`p-4` is spacing 40, `p-24` is spacing 90). We add `gutter` and `section` spacing from the library's custom tokens. Breakpoints take Tailwind's defaults (640, 768, 1024, 1280 and 1536 pixels) and not Athena's 576, 768, 992 and 1200. Bootstrap 6 is making a similar move, and nothing here has to stay compatible.

**Athena's own utilities come back as Tailwind utilities.** That covers heading underline, the quotation-mark blockquote, media backgrounds, the image filters, letter spacing and line height from the brand scale, and the `hover-parent`/`hover-child` pattern, which maps onto Tailwind's `group-hover:` variant and is documented rather than rebuilt.

**Fonts are optional.** The library's rule is that the host page loads fonts. We follow it: `@ucf/tailwindcss-theme/fonts.css` self-hosts Oswald, Montserrat and Roboto Mono from the same OFL-licensed WOFF2 files Athena v2 ships, and a site that loads fonts another way skips it.

**The base layer and the library's element styles must not fight.** Tailwind's reset (Preflight) lives in `@layer base`. The library's `ucf.css` and `elements.css` are unlayered, so they already win, but that is an accident rather than a rule. We should document the intended order and test it in the demo, which closes an item on the library's own to-do list.

## Documentation and the kitchen sink

The docs follow Athena's structure — Getting Started, Tokens, Layout, Content, Components, Utilities — with two new pages: one on using the theme alongside the component library, and one mapping common Athena classes to their Tailwind equivalents for developers coming from v2. Every example is rendered live from the same source shown in its code block, so the two cannot drift.

The kitchen sink is a separate site that puts every token, element, utility and component on a few long pages, on every section composition. It exists to be read by eye and by an accessibility checker, not to teach.

`npm start` runs both, with Tailwind and Eleventy in watch mode: docs at `http://localhost:8080`, kitchen sink at `http://localhost:8081`.

## Execution

Each commit is small and does one thing, so you can review them one at a time. The order is:

1. Repository scaffolding and this plan.
2. Package manifest, Tailwind v4 and Eleventy 3, and the `npm start` wiring with empty sites.
3. Token sync and check scripts, and the copied `tokens.json`.
4. Token build script and the generated `@theme`, one namespace per commit: colors, roles and compositions, type, spacing and layout, shape and motion.
5. Removal of Tailwind's default palette, radii and type scale.
6. Fonts.
7. Base element styles from `elements.json`.
8. Brand utilities, one per commit.
9. Component classes, one per commit.
10. Docs layout and navigation, then one commit per docs section.
11. Kitchen sink pages, one per commit.
12. Tests: token contrast, a compiled-CSS check that off-brand utilities don't exist, and a check that every `--ucf-*` the theme reads is defined.
13. README and CONTRIBUTING.

## How we'll know it worked

A clean build is not enough. **The test that matters is that an off-brand page cannot be built**: compiling `bg-red-500 rounded-lg text-3xl` should produce no CSS. Alongside that, we'll script contrast checks for every role pair on every composition against WCAG 2.1 AA, and check that every `--ucf-*` variable the theme reads exists in `tokens.json`. If axe can run locally against the kitchen sink, I'll run it. If it can't, I'll say so rather than claim it passed.

## Limits and open questions

These don't block the work, but someone should own them.

- **The link color is still unconfirmed.** The library's `#1F6A9A` is what we'd inherit. Neither it nor Athena's `#376D91` has brand office sign-off that I can find.
- **Licensing is undecided.** Athena is MIT and the component library is GPL-3.0-or-later. I've left the license out until you choose.
- **The package name is a placeholder.** `@ucf/tailwindcss-theme` matches the library's scope but won't be published. It stays `private` until we link a GitHub repository.
