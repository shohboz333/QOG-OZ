# Installation Guide

This template is a static website — there is nothing to build and nothing to
install on a server. Pick whichever option fits you.

## Option A — Open it locally

1. Unzip the template.
2. Double-click `index.html`, or drag it into a browser tab.
3. Everything works, including all 29 tools. (A few browsers restrict
   Service Worker registration on the `file://` protocol — the app still
   works, it just won't cache itself for offline use until it's served over
   `http(s)://`. See Option B for that.)

## Option B — Any static host (recommended)

Upload the whole `pdf-tools-pro/` folder as-is to any of these — no server
code, database, or environment variables required:

- **Netlify / Vercel / Cloudflare Pages**: drag-and-drop the folder into
  their dashboard, or connect a Git repo and deploy.
- **GitHub Pages**: push the folder to a repo and enable Pages on the
  `main` branch.
- **Any shared hosting / cPanel**: upload the folder's contents into
  `public_html/` (or a subfolder if you want it at `/pdf-tools/`).
- **S3 / any object storage with static website hosting enabled**: upload
  the files and set `index.html` as the index document.

That's it — visiting the URL serves the working app.

## Option C — Put it behind your own domain

1. Deploy using Option B.
2. Point your domain's DNS at the host.
3. Update `js/config.js` → `brand.domain` to match.
4. Update the canonical/OG URLs in `index.html` `<head>` if you use them for
   social sharing.

## Verifying everything works

Open the deployed page and check:

- The tool grid loads and search/category filters work.
- Clicking a tool opens the workspace modal.
- Drop a demo file from `/demo` onto the dropzone and click **Ishga
  tushirish** (Run) — you should get a working download.
- Toggle dark mode (moon/sun icon, top right) and confirm colors switch.
- On a phone or narrow browser window, confirm the layout stays usable.

## Going fully offline / self-hosted (optional)

By default the app loads pdf-lib, pdf.js and JSZip from `cdnjs.cloudflare.com`.
If your deployment target has no internet access, or you want zero
third-party requests:

1. Download:
   - `pdf-lib.min.js` (pdf-lib v1.17.1)
   - `pdf.min.js` and `pdf.worker.min.js` (pdf.js v3.11.174)
   - `jszip.min.js` (JSZip v3.10.1)
2. Put them in a new `vendor/` folder.
3. In `index.html`, change the three `<script src="https://cdnjs...">` tags
   to `vendor/...`.
4. In `js/engine.js`, update the `pdfjsLib.GlobalWorkerOptions.workerSrc`
   line to point at your local `vendor/pdf.worker.min.js`.
5. In `sw.js`, update the `APP_SHELL` array the same way.

## PWA install icon note

`manifest.json` and the icons in `/icons` ship with default QOG'OZ colors and
name. If you rebrand (see `CUSTOMIZATION.md`), regenerate icons and edit
`manifest.json` by hand — it's a static file the browser reads before your
JavaScript runs, so it can't be swapped at runtime.
