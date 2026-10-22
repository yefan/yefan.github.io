# Ye Fan · Professional homepage

A standalone portfolio in the existing homepage repository. The design follows `ye-blog`: a profile card, a full-width work list with descriptions always visible, and selected research. Dark mode is the default, with an optional light theme. No blog posts are included.

## Preview

Requires Node 20 or newer. No dependency installation is needed.

```sh
cd homepage-v2
npm run dev
```

Open http://127.0.0.1:4173. Edits to `content.mjs`, `src/`, and `public/` rebuild automatically; refresh the browser to see changes. Set `PORT` to use another port.

## Update the content

Edit `content.mjs` to change the profile, work, and research. Each project in `work` contains:

```js
{
  id: "project-id",
  name: "Project name",
  description: "What the project does and your contribution."
}
```

Work descriptions are always visible. An optional `href` and `linkLabel` add a link below an entry, as used for the VitalSkin UBC article. Additional project media and descriptions can be added later.

Research entries include `title`, `authors` (an array in publication order), `venue`, `year`, and `href`. They are listed newest first, with full author lists below each title.

`src/index.html` is the page template. `src/styles.css` defines the responsive layout and themes. `src/app.js` only handles the theme preference. The page content and links work without JavaScript.

## Build and check

```sh
npm run check
```

This builds `dist/` and checks local assets, section links, project data, and output integrity. The generated site works as a static folder, including under a URL subdirectory. All runtime assets are included; there are no external fonts, analytics, or library dependencies.

## Publishing later

The existing Hugo configuration and GitHub Actions workflows are untouched. This folder is a local preview.

When ready to publish, update the deployment workflow to build this folder and publish `homepage-v2/dist/` to the root of `gh-pages`. Replace the current Hugo deployment step at the same time so it cannot overwrite the new homepage. Keep the current repository and website address. Do not push this entire source folder to `gh-pages`.

## Content sources

- Current role and experience: the user's LinkedIn export, `/Users/yefan/Downloads/Profile.pdf`, and their confirmation of “VP Technology.”
- Additional project and publication details: `/Users/yefan/MyCode/resume/ye_cv.tex`.
- VitalSkin description: [UBC's report on its use in Fantastic Beasts and Where to Find Them](https://sensorimotor.cs.ubc.ca/2016/12/20/our-skin-simulation-research-featured-in-fantastic-beasts-and-where-to-find-them/).
- Layout reference and illustrated portrait: `/Users/yefan/MyCode/ye-blog`. No posts or AI features were imported.
- Research details and author order: the authors' project pages, UBC's paper archive, and ACM's DOI landing page. Recent additions: [A Splitting Architecture for Exact Reduced Coulomb Friction](https://www.cs.ubc.ca/research/fbf-friction/) and [The Human Touch](https://elrnv.com/projects/human-touch/).
