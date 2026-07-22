# Digital contact card — Salih Bawarith

| File | What it is |
|------|------------|
| `salih-bawarith-card-portrait.png` | **The share card** — 1200×1800 portrait, warm-craft palette, with the QR embedded. Post it, print it, or set as a phone wallpaper. |
| `salih-bawarith.vcf` | vCard 3.0 contact file. Open/AirDrop it to save Salih's contact to any phone. |
| `salih-bawarith-qr.png` | The bare QR (588×588, espresso on white) — for reuse elsewhere. |
| `salih-bawarith-qr.svg` | Same QR as vector — use this for print at any size. |

All three QR surfaces encode the same UTM link below.

## What the QR encodes

```
https://salihbawarith.com/?utm_source=qr&utm_medium=vcard
```

The QR opens the website (not the contact card). The `utm_source=qr&utm_medium=vcard`
tags let you attribute site traffic to QR scans in analytics.

**Note:** the UTM tags are set up for later — they do nothing until an analytics tool
(e.g. Google Analytics / Plausible) is added to the site. The vCard's own `URL:` field
is kept clean (no UTM) on purpose.

## Regenerating the QR

The QR is generated with [segno](https://segno.readthedocs.io) (pure-Python, no deps):

```bash
pip install segno
python3 - <<'PY'
import segno
url = "https://salihbawarith.com/?utm_source=qr&utm_medium=vcard"
qr = segno.make(url, error='h')  # high error correction, logo-ready
qr.save("salih-bawarith-qr.png", scale=12, border=4, dark="#2b1c14", light="#ffffff")
qr.save("salih-bawarith-qr.svg", scale=12, border=4, dark="#2b1c14", light="#ffffff")
PY
```

To change the campaign later, edit the `utm_*` params in `url` and re-run.
