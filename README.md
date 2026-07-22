# Salih Bawarith — Portfolio

A bilingual (English / Arabic) portfolio and career timeline for **Salih Bawarith** —
Riyadh-based Senior F&B Operations Manager, Specialty Coffee expert, and
Heritage-Commission-licensed Arabic calligrapher.

**Concept:** _"Warm Craft Editorial."_ His career is told as a **roast curve** —
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
assets/js/app.js       – rendering, timeline, language toggle, gallery, animations
assets/gallery/       – optimized artwork: thumb/ (grid) + full/ (lightbox)
assets/img/           – site images (Instagram QR code)
assets/art-assets/    – raw full-res originals (git-ignored; local source only)
.nojekyll             – tells GitHub Pages to serve files as-is
```

## Contact form (one manual step)

The contact form is wired to **Web3Forms** but ships **switched off**. To turn it on:

1. Go to [web3forms.com](https://web3forms.com), enter **Artistasaleh@gmail.com**, and
   verify it — you'll get an **Access Key**.
2. Paste that key into `web3forms_key` at the top of **`assets/js/data.js`**
   (in the `contact:` block). That's it — messages then land in the inbox.

Until the key is filled in, the form politely tells visitors to email directly.
Contact links (email, both phone numbers, WhatsApp Business, Instagram, LinkedIn)
all work now and are edited in the same `contact:` block.

## Updating the gallery

Real artwork is listed in the `gallery:` block of `assets/js/data.js`. To add a
piece: optimize it into `assets/gallery/thumb/<name>.jpg` and
`assets/gallery/full/<name>.jpg`, then add a row (`file`, `cat`, `en`, `ar`).
The grid, filters and lightbox update automatically.

## Editing content

Everything lives in **`assets/js/data.js`** — roles, stats, credentials, skills, origins.
Each field has `_en` / `_ar` (or `en` / `ar`) variants. No HTML editing needed for content changes.

## Deploy to GitHub Pages

1. Create a repo on GitHub and push this folder:
   ```bash
   git add .
   git commit -m "Salih Bawarith portfolio"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
2. On GitHub → **Settings → Pages** → Source: **Deploy from a branch** → Branch: **main** / **/(root)** → Save.
3. Live in ~1 minute at `https://<you>.github.io/<repo>/`.

> For a custom domain or a `<you>.github.io` root site, name the repo `<you>.github.io`.

## Still to add / review (with Salih)

- **Review the narrative copy in `assets/js/data.js`.** Some blurbs and the
  "origin notes" (e.g. _"a quiet discipline — the reverence for detail…"_) are
  written _in Salih's voice_ but were drafted for the site, not quoted from him.
  Read them over and adjust to words he's comfortable publishing.
- **Turn the contact form on** — paste the Web3Forms key into `assets/js/data.js`
  (see "Contact form" above). One-time, ~2 minutes.
- ~~Real images~~ ✅ Added — 20 calligraphy pieces (cup lettering + on paper) in the gallery.
- ~~Contact email / phone~~ ✅ Added — email, job-applications number, WhatsApp
  Business, Instagram (with QR), LinkedIn.
- More artwork if desired (weddings, paintings, logos, roastery, catering, 3D, a headshot)
  to broaden the gallery beyond calligraphy.
- Confirm the two unlisted roles (Takehara Landscape — the Japanese thread; PR & Protocol)
- The revenue figures (250K→610K SAR / 35% / 15 lines) are shown **without brand
  attribution** per instruction, with a disclaimer note. Confirm they're cleared to publish.
