# Images — drop Salih's real photos here

The gallery currently uses elegant placeholders. To show real work:

1. Put image files in this `images/` folder (e.g. `cup-calligraphy.jpg`).
2. Open `assets/js/app.js`, find the `GALLERY` array (~line 190).
3. Set the `img` field for the matching tile, e.g.:
   ```js
   { en: "Cup calligraphy", ar: "خطٌّ على الأكواب", cls: "tall", img: "images/cup-calligraphy.jpg" },
   ```
4. Save. The placeholder is replaced automatically.

**Recommended:** compress to WebP/JPG under ~300 KB each, landscape or square,
slightly desaturated to sit in the warm palette. The grid already lazy-loads them.

## Suggested shots to gather from Salih

- Cup calligraphy (Coffee National Day) — he has 3 images
- Wedding designs / Monarch.s art — 5 images referenced
- Event catering (PIF Summer Event, Retal) — 8 images referenced
- Roastery / coffee / roasting in action
- A professional headshot (for a future hero photo)
- A high-res scan of one of his calligraphy pieces (could become the hero background)
