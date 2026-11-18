# Contributing

## The rules

- **A brand value changes in the component library first.** Edit `tokens/tokens.json` in `@ucf/components`, then run `npm run sync:tokens` and `npm run build:tokens` here. Never edit `tokens/` or `src/generated/` by hand. `npm test` fails while the generated files are stale.
- **Read a role, not a color,** in any CSS that could sit on more than one composition: `var(--ucf-link)`, not `var(--ucf-color-horizon-deep)`. That is what lets one class work on light, dark and Bold Gold.
- **Read `--ucf-*` variables, not Tailwind's.** `--color-*` and `--text-*` exist only inside Tailwind. The `--ucf-*` names are shared with the component library.
- **Components are `@utility` blocks, one per file in `src/components/`.** A variant (`btn-outline`, `btn-sm`) sets `--btn-*` variables rather than properties, so it works whichever order Tailwind emits it in.
- **No JavaScript in the theme.** Interactive pieces are built on `popover`, `<details>` and `<dialog>`. If something truly needs a script, it belongs in the component library.
- **Comments say why.** Tag them the way the component library does: `WHY`, `FIX`, `A11Y`, `SPEC`, `SYNC`, `KNOWN GAP`.

## Adding a utility or component

1. Write it in its own file under `src/utilities/` or `src/components/`, and import it from `src/index.css`.
2. Add its class names to `ON_BRAND` in `test/brand.test.mjs`.
3. Document it in `sites/docs/`, with an `{% example %}` on each composition it behaves differently on.
4. Add it to the kitchen sink, in `sites/demo/_includes/sink-components.liquid` or the page it fits.
5. Run `npm run check`. It must pass, with no new axe violations.

## Before committing

Run `npm run check`. Commit the regenerated `src/generated/` with the token change that caused it. Keep commits small: one utility, one component, or one docs section each.
