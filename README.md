# datvu.io — Personal / Research Portfolio (Jekyll)

This repository contains the source for a personal research/portfolio website powered by Jekyll and the Minimal Mistakes theme.

## What this project is

- A static site written for Jekyll (gem-based Minimal Mistakes theme)
- Pages, blog posts, and a `projects` collection in the `_projects` folder
- Custom theme enhancements (dark/light mode, TOC styling, header overlay fixes)

## Quick links

- Source root: this folder
- Pages: `_pages/` (About, Blog, Project archive, etc.)
- Posts: `_posts/`
- Projects collection: `_projects/` (each project is a separate Markdown file)
- Custom CSS: `assets/css/theme-enhanced.css`
- Theme JS: `assets/js/theme-switcher.js`
- Images: `assets/images/`

## Prerequisites (Windows / PowerShell)

- Ruby (recommended 2.7+ or compatible with your `Gemfile`)
- Bundler
- Jekyll (installed via Bundler/Gemfile)
- Node/npm (optional, for asset pipelines or local tooling)

If you are on Windows, also consider adding `wdm` to the Gemfile to avoid polling for changes:

```powershell
# inside repository
bundle install
# If Windows, add in Gemfile: gem 'wdm', '>= 0.1.0' and run
bundle install
```

## Local development (PowerShell)

Start the server with LiveReload (recommended):

```powershell
# Install gems if you haven't
bundle install

# Start Jekyll with LiveReload
bundle exec jekyll serve --livereload
```

Open http://127.0.0.1:4000 in your browser. LiveReload will auto-refresh when you edit files.

Notes:
- The server logs missing static assets (images) as errors during generation; place images in `assets/images/` with the expected filenames to remove these messages.
- If the server suggests adding `wdm` on Windows, add it to the Gemfile and run `bundle install`.

## Build for production

```powershell
bundle exec jekyll build
# Generated site will be in _site/
```

## How to add a new Project (blog-style project pages)

1. Create a Markdown file in `_projects/`:

```yaml
---
layout: single
title: "My New Project"
permalink: /project/my-new-project/
header:
  overlay_image: /assets/images/my-new-project-header.jpg
excerpt: "One-line summary"
---

# Content
```

2. Add any supporting images to `assets/images/` and refer to them with absolute paths starting with `/assets/images/`.

3. Run the site locally to verify the layout.

## Theme & customization notes

- Primary theme adjustments and the global header overlay/TOC fixes live in `assets/css/theme-enhanced.css`. That file contains:
  - header overlay text rules (ensures excerpt and header title are always readable)
  - global CSS variables and dark/light overrides
  - TOC styling for both light and dark themes
  - navigation/masthead theme overrides

- Theme switching and persistence are handled in `assets/js/theme-switcher.js`. It reads/writes to `localStorage`, responds to system preference, and updates `html[data-theme]` accordingly.

If you want to tweak the header overlay color/contrast, edit the `.page__hero--overlay` selectors in `assets/css/theme-enhanced.css`. For TOC look-and-feel, edit the `.toc` and `.toc__menu` sections.

## Troubleshooting

- Missing image errors (common during development):
  - The Jekyll build prints lines like `ERROR '/assets/images/some.jpg' not found.`
  - Fix: add the referenced images to `assets/images/` or update the paths in front matter.

- If CSS changes do not apply:
  - Ensure browser cache is cleared or use a private window.
  - LiveReload should auto-refresh, but if not, restart `bundle exec jekyll serve`.

- Linting message `MD047/single-trailing-newline`:
  - Some editors or automated tools expect a single trailing newline at EOF; make sure files end with a newline.

## Development workflow / suggestions

- Make content changes in `_pages/`, `_posts/`, or `_projects/` and preview locally.
- Use small commits for content edits.
- When adding images, keep filenames simple and update front matter paths accordingly.

## Contributing

- Fork the repository, create a branch, make edits, and open a pull request.
- For UI/style changes, include screenshots and a short description of the change.

## Where to look for further customization

- `_config.yml` — site-wide configuration (collections, permalinks, theme settings)
- `_includes/` — theme includes (masthead, head customizations, theme toggle)
- `_layouts/` — layout templates (if overridden)
- `assets/css/` — custom CSS files
- `assets/js/` — custom JS files

## Contact

If you want me to extend this README with deployment steps (GitHub Pages, CI/CD), or a CONTRIBUTING.md with PR templates, tell me which deployment method you'd like and I will add it.

---

_Last updated: November 2025_
