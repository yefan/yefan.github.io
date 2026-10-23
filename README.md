# Ye Fan · Professional homepage

Source for [yefan.github.io](https://yefan.github.io/). A static homepage with a profile, products, and publications. Dark mode is the default, with an optional light theme.

## Local development

Use Node.js 24 (see `.nvmrc`). There are no package dependencies to install.

```sh
npm run dev
```

Open http://127.0.0.1:4173. Changes to `content.mjs`, `src/`, and `public/` rebuild automatically; refresh the browser to see them. Restart the server after editing the build scripts. Set `PORT` to use another port.

```sh
npm run check  # Build and validate the output
npm run build  # Build dist/ only
```

## Content and layout

- `content.mjs`: profile, products, and publications.
- `src/index.html`: page template.
- `src/styles.css`: responsive layout and dark/light themes.
- `src/app.js`: theme preference.
- `public/`: portrait, favicon, and other files copied to the output.

Products are stored in `work`, with `id`, `name`, and `description`. Optional `href` and `linkLabel` fields add a link below a product.

Publications are stored in `research`, newest first. Each entry has a `title`, an `authors` array in publication order, `venue`, `year`, and `href`.

The content and links work without JavaScript. The site uses no external fonts or application libraries. `dist/` is generated and excluded from Git.

Cloudflare Web Analytics collects visitor statistics through the snippet at the end of `src/index.html`. View the reports for `yefan.github.io` in the Cloudflare Web Analytics dashboard.

## Publishing

GitHub Pages uses **GitHub Actions** as its publishing source. The workflow in `.github/workflows/deploy.yml`:

1. Runs `npm run check` on pushes and pull requests to `master`.
2. Uploads only `dist/` for builds on `master`.
3. Deploys that artifact to https://yefan.github.io/ through the `github-pages` environment.

Push changes to `master` to publish. The workflow can also be run manually from the Actions tab on `master`. Pull requests are checked without deploying. The workflow uses GitHub's built-in token; no separate deployment secret is needed.

The old Hugo source is preserved at commit `a1e9dd6` in Git history. Its theme-update workflow has been removed. The existing `gh-pages` branch is retained as a historical build and is no longer the publishing source.

## Sources

- Profile: the supplied résumé and LinkedIn export, with the user's confirmed title, VP Technology.
- Design reference and portrait: `ye-blog`; no blog posts are included.
- VitalSkin: [UBC's report on Fantastic Beasts and Where to Find Them](https://sensorimotor.cs.ubc.ca/2016/12/20/our-skin-simulation-research-featured-in-fantastic-beasts-and-where-to-find-them/).
- Publication metadata: the linked author project pages, UBC paper archive, and ACM records.
