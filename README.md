# ThinkOut Developers docs

Mintlify site for the public API. Lives in this monorepo under `docs/`;
in the Mintlify dashboard the project's content directory is set to `docs`.

## Layout

- `docs.json` - site config: theme, brand colors, logo, fonts, navigation.
- `style.css` - Lota Grotesque `@font-face` rules; any `.css` here is injected on every page.
- `index.mdx`, `guides/`, `api-reference/` - English narrative pages.
- `ro/` - the same pages in Romanian. Navigation is duplicated per language under
  `navigation.languages` in `docs.json`. Every guide edit needs a matching edit in `ro/`.
- `openapi/v1.yaml` - the API contract. Endpoint pages are generated from it.
- `openapi/v1.ro.yaml` - GENERATED. The Romanian reference, built from `v1.yaml` by
  `scripts/docs/build-ro-openapi.mjs` using the string map in
  `scripts/docs/ro.translations.json`. Field names, enum values and examples stay
  English; only summaries, descriptions and tag names are translated. The Romanian
  endpoint pages are generated under `ro/api-reference/`.
- `logo/`, `favicon/` - generated from the app's `Logotype` and `LogoSymbol` components
  with the light and dark primary colors baked in.
- `fonts/` - the woff2 builds copied from `client/public/fonts`.

## Preview

Node 18 or newer is the only prerequisite. Nothing needs installing globally:

```bash
cd docs && npx mint@latest dev --port 3333
```

That serves the site at http://localhost:3333 and reloads on every save, including changes to `docs.json`. The first run takes a minute or two while it downloads and builds; after that it starts in seconds. Stop it with ctrl+c.

**Changes to `openapi/v1.yaml` are the exception: they do not hot-reload.** The parsed spec is cached, so an edited field or example keeps showing its old value until you stop the server and start it again. If a change you just made is not on the page, restart before looking for the bug elsewhere.

Any free port works. 3333 avoids colliding with the client dev server.

Two things it will tell you that you can ignore. It suggests running `mint login` to activate search, which only affects the search box in the local preview and is not needed to write or review pages. And search results are empty locally for the same reason.

If you would rather have the command on your path, `npm i -g mint` gives you `mint dev`, but the npx form keeps everyone on the same version.

There is also a Claude Code launch configuration in `.claude/launch.json` named `docs`, which runs the same command.

## Languages

The site is English and Romanian. Mintlify's own i18n carries it: `navigation.languages` in `docs.json` holds one entry per language, each with its own navbar and `groups`, and the Romanian pages live under `ro/`. The language switch appears in the site header once both entries exist.

### Regenerating the Romanian reference

`v1.ro.yaml` is generated, so run this after any change to `v1.yaml` and commit both:

```bash
node scripts/docs/build-ro-openapi.mjs --strict
```

It reads `js-yaml` from `client/node_modules`, so run `npm install` in `client/` first if you have never done so. `--strict` fails on any string without a Romanian translation, which is what stops the two documents drifting; add the missing strings to `scripts/docs/ro.translations.json` and run it again. The script lives outside `docs/` on purpose, because Mintlify injects every `.js` file it finds in the docs directory into every page.

## Brand tokens

Taken from `client/src/themes/tokens.ts` and `client/src/themes/{light,dark}.ts`.

| Token | Light | Dark |
|---|---|---|
| primary | zinc 800 `#27272a` | zinc 200 `#e4e4e7` |
| background | zinc 100 `#f4f4f5` | zinc 800 `#27272a` |
| font | Lota Grotesque 400, semibold 600 for emphasis | |
| radius | 8px | |

## OpenAPI

`openapi/v1.yaml` is hand-authored for now. Once the public controllers exist in
`server/ThinkOut.Api`, CI should regenerate it from the Swashbuckle `public-v1`
document and commit it here so the reference cannot drift from the code.
