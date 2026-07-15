# Saleh Bawarith — Portfolio

A bilingual (English / Arabic) portfolio and career timeline for **Saleh Bawarith** —
Riyadh-based Senior F&B Operations Manager, Specialty Coffee expert, and
Heritage-Commission-licensed Arabic calligrapher.

**Concept:** *"Warm Craft Editorial."* His career is told as a **roast curve** —
a scroll-drawn profile with braided lanes underneath that show his many concurrent
roles at a glance. Espresso/cream/copper palette, Fraunces + Arabic calligraphic
display type, coffee-provenance "single-origin" identity cards.

## Tech
Pure static site — **HTML + CSS + vanilla JS**, no build step, no dependencies.
Works by opening `index.html` directly or via any static host.

```
index.html            – page structure (both languages inline)
assets/css/style.css  – design system + all components
assets/js/data.js     – ALL content (edit here to update the site)
assets/js/app.js       – rendering, timeline, language toggle, animations
images/               – drop real photos here (see images/README.md)
.nojekyll             – tells GitHub Pages to serve files as-is
```

## Editing content
Everything lives in **`assets/js/data.js`** — roles, stats, credentials, skills, origins.
Each field has `_en` / `_ar` (or `en` / `ar`) variants. No HTML editing needed for content changes.

## Deploy to GitHub Pages
1. Create a repo on GitHub and push this folder:
   ```bash
   git add .
   git commit -m "Saleh Bawarith portfolio"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
2. On GitHub → **Settings → Pages** → Source: **Deploy from a branch** → Branch: **main** / **/(root)** → Save.
3. Live in ~1 minute at `https://<you>.github.io/<repo>/`.

> For a custom domain or a `<you>.github.io` root site, name the repo `<you>.github.io`.

## Still to add / review (with Saleh)
- **Review the narrative copy in `assets/js/data.js`.** Some blurbs and the
  "origin notes" (e.g. *"a quiet discipline — the reverence for detail…"*) are
  written *in Saleh's voice* but were drafted for the site, not quoted from him.
  Read them over and adjust to words he's comfortable publishing.
- Real images (see `images/README.md`)
- Contact email / phone (currently "available on request" + LinkedIn)
- Confirm the two unlisted roles (Takehara Landscape — the Japanese thread; PR & Protocol)
- The revenue figures (250K→610K SAR / 35% / 15 lines) are shown **without brand
  attribution** per instruction, with a disclaimer note. Confirm they're cleared to publish.
