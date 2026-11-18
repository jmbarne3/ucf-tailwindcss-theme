# UCF Tailwind CSS Theme

A Tailwind CSS v4 theme for UCF websites and applications. It gives a Tailwind site the 2026 UCF brand (colors, type, spacing, square corners) and removes the off-brand values Tailwind ships with. Its values come from the UCF component library (`@ucf/components`), so utilities and library components always match.

```css
@import "tailwindcss";
@import "@ucf/tailwindcss-theme";
```

## What's in it

- **Tokens.** Every value in the component library's `tokens.json`, as `--ucf-*` custom properties and as Tailwind theme variables: `bg-gold`, `text-link`, `font-display`, `text-h2`, `px-gutter`.
- **Roles and compositions.** Colors named for their job (`text-heading`, `bg-raised`, `border-line`) that change with the section they're in, and five `ucf-composition-*` section classes.
- **Base styles.** Headings, copy, links and captions styled from the library's `elements.json`, plus a role-aware focus ring.
- **Brand utilities.** `type-*`, `heading-underline`, `blockquote-quotation`, media backgrounds, `filter-sepia`, `layout-wide`, `layout-content` and `rich-text`.
- **Components.** Buttons, forms, cards, alerts, badges, tables, breadcrumbs, pagination, and a navbar, dropdown, accordion, modal and drawer built on `popover`, `<details>` and `<dialog>`. No JavaScript.
- **Fonts.** Optional self-hosted Oswald, Montserrat and Roboto Mono (`fonts.css`).

## Working on it

Node 22 or later.

```shell
npm install
npm start          # docs at http://localhost:8080, kitchen sink at http://localhost:8081
npm test           # brand enforcement, token freshness, contrast
npm run check      # check:tokens, test, build and check:a11y together
```

| Script | Does |
|---|---|
| `npm start` | Builds the tokens, then runs Tailwind and Eleventy in watch mode for both sites |
| `npm run build` | Builds the tokens and both sites into `_site/` |
| `npm run sync:tokens` | Copies `tokens.json` and `elements.json` from the component library |
| `npm run check:tokens` | Fails if `tokens/` differs from the library's copy |
| `npm run build:tokens` | Regenerates `src/generated/` from `tokens/` |
| `npm test` | Runs the tests in `test/` |
| `npm run check:a11y` | Runs axe-core (WCAG 2.1 AA) on every built page in a local Chrome |

The sync scripts look for the library at `../nodeProjects/ucf-react-component-library`. Set `UCF_COMPONENTS_PATH` to point elsewhere. `check:a11y` uses Chrome at its macOS location unless `CHROME_PATH` is set.

## Where things are

```
tokens/              Copied from the component library. Never edited here.
scripts/             Token sync and build, the a11y check, and the shared token reader.
src/index.css        The theme's entry point.
src/generated/       Written by build-tokens from tokens/. Committed, never hand-edited.
src/base.css         Base styles that elements.json doesn't hold.
src/utilities/       Brand utilities, one per file.
src/components/      Component classes, one component per file.
src/fonts.css        Optional font loading, with the font files in src/fonts/.
sites/docs/          The documentation site (Eleventy).
sites/demo/          The kitchen sink (Eleventy).
sites/shared/        Eleventy setup both sites share.
test/                node:test suites.
```

`IMPLEMENTATION-PLAN.md` records the decisions behind the theme. `CONTRIBUTING.md` covers how to change it.
