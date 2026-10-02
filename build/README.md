# Build

The site is a single-page app (`index.html`). For SEO and Google Ads
quality we also ship **static, crawlable pages** for each reference
article (`<slug>.html`), prerendered in Estonian, plus a built Tailwind
stylesheet (`styles.css`) instead of the Play CDN.

Content lives only in `index.html` (the `ARTICLES` array). After editing
an article, **regenerate** so the static pages and sitemap stay in sync:

```bash
cd build
npm i -D tailwindcss@3            # first time only
node gen.mjs                      # writes ../<slug>.html + ../sitemap.xml
npx tailwindcss -c tailwind.config.js -i input.css -o ../styles.css --minify
```

- `gen.mjs` extracts `ARTICLES` from `index.html` and writes one static
  page per slug (Estonian, self-canonical, internal links rewritten to
  sibling `.html` pages) plus `sitemap.xml`.
- The CSS build scans `index.html` + all `*.html`, so classes used only
  inside inline `<script>` strings are still included.

Do not hand-edit the generated `<slug>.html` files — they are overwritten.
