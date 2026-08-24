# QOG'OZ — PDF Tools Pro

Professional, 100%-client-side PDF & image toolkit template. No backend, no
server upload — every operation (merge, split, compress, convert, watermark,
page editing, image processing…) runs inside the visitor's browser using
**pdf-lib**, **pdf.js** and **JSZip**, loaded from CDN.

Built to be resold or white-labeled: change brand name, colors, fonts and
copy from a single config file (`js/config.js`) and ship it as a new product
in minutes.

## What's included

- **40 working tools** across 7 categories (page management, merge/split,
  conversion, optimization, watermarking, image tools, info) — see the full
  list in `js/toolsData.js`.
- **Page Organizer**: drag-to-reorder, delete, rotate, duplicate, add blank
  page, reverse order — with live page thumbnails rendered from the real PDF.
- **Drag & drop** file upload with type/size validation and friendly error
  toasts.
- **Batch processing**: drop several files on almost any tool and get a ZIP
  back with each result, automatically.
- **Light / dark mode** with a toggle, remembered across visits.
- **Search, categories, favorites and recently-used tools**, all persisted
  in `localStorage` — no accounts, no database.
- **PWA support**: installable, works offline after first load via
  `sw.js` + `manifest.json`.
- **SEO-ready** meta tags, Open Graph image, and a AI + privacy section.
- **White-label config** (`js/config.js`) driving brand name, logo letter,
  colors (light & dark), fonts and SEO copy across the whole page.
- Demo files in `/demo` (sample PDFs and images) for quickly trying every
  tool without hunting for test files.

## Folder structure

```
pdf-tools-pro/
├─ index.html              # the entire app shell (single page)
├─ manifest.json           # PWA manifest (edit brand fields manually, see CUSTOMIZATION.md)
├─ sw.js                   # service worker — offline app-shell caching
├─ css/
│  └─ style.css            # all styling, theme via CSS variables
├─ js/
│  ├─ config.js            # ← WHITE LABEL: brand, colors, fonts, SEO copy
│  ├─ toolsData.js         # tool catalog: names, categories, option forms
│  ├─ engine.js            # all real PDF/image processing logic
│  └─ ui.js                # grid, search, dropzone, page organizer, run flow
├─ icons/                  # app icons + Open Graph image (192/512/maskable)
├─ demo/                   # sample PDFs & images to test the tools with
├─ README.md
├─ INSTALLATION.md
├─ CUSTOMIZATION.md
└─ LICENSE.md
```

## Product readiness

This package is intentionally positioned as a polished, client-side product template rather than a demo: responsive UI, dark mode, searchable tool catalog, page organizer, batch ZIP workflows, PWA shell, SEO metadata, white-label configuration, demo assets, and user-friendly error handling are included.

Before listing it for sale, replace the placeholder support email/domain, update the license to your marketplace terms, test the CDN/PWA setup on your target host, and self-host the libraries if you want a fully independent/offline distribution.

## Quick start

Open `INSTALLATION.md`. Short version: this is a static site — upload the
folder to any static host (or open `index.html` directly) and it works.

## Rebranding

Open `CUSTOMIZATION.md`. Short version: edit `js/config.js`.

## Tech notes

- No build step, no npm dependencies to install — plain HTML/CSS/JS.
- pdf-lib, pdf.js and JSZip are loaded from `cdnjs.cloudflare.com`. If you
  need a fully offline / self-hosted build, download those three files and
  point the `<script src>` tags in `index.html` (and the list in `sw.js`) to
  your own copies.
- Tested against modern evergreen browsers (Chrome, Edge, Firefox, Safari).
  Very old browsers without the File/Blob/Canvas APIs are not supported.

## License

See `LICENSE.md`.

## V5: QOG'OZ AI

V5 includes a product-aware AI help assistant. By default it uses a local knowledge layer for instant answers about the site's tools, privacy, advertising and workflows. For true generative answers, configure a **server-side proxy endpoint** in `js/config.js`; never put a private AI API key in frontend JavaScript.

### New tools

PDF Contact Sheet, PDF text search, blank-page removal, image watermark, and white-background image conversion.


## V6 premium layer
V6 adds a 3D animated hero, richer motion, AI-to-tool actions, PDF form flattening and PDF word/character statistics.


## QOG'OZ AI + OpenAI

QOG'OZ AI can use OpenAI through the included server proxy. The project context tells the model that QOG'OZ is a browser-first PDF/image productivity platform and that **Q.Shoxboz** is its creator.

**Security:** never put an OpenAI secret key in `js/config.js`, `index.html`, or any browser bundle. OpenAI's API uses a Bearer API key and the official Responses API; keep the key in a server environment variable instead. citeturn0search0

### Quick start

1. Install Node.js 18+ on the server.
2. Copy `server/.env.example` to `server/.env`.
3. Set `OPENAI_API_KEY=...`.
4. Optionally set `OPENAI_MODEL=gpt-5.6-luna`.
5. Run `npm start` from the project root.
6. Open the site through the Node server, not as a `file://` page.

The proxy includes a small in-memory rate limit and request-size limit to reduce accidental API-credit abuse. It does not store chat messages.
