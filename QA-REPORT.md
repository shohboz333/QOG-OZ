# QOG'OZ PDF Tools Pro — QA / Release Notes

## Release
- 30 tools in the catalog.
- Added PDF metadata editor.
- Added PDF header/footer tool.
- Added output-size comparison in the result panel.
- Added PWA install affordance when the browser exposes `beforeinstallprompt`.
- Improved responsive/mobile behavior and focus states.
- Updated service-worker cache version to v3.
- Corrected offline/privacy wording so it does not promise offline execution before the app shell and libraries are cached.

## Static checks
- `node --check js/toolsData.js` — PASS
- `node --check js/engine.js` — PASS
- `node --check js/ui.js` — PASS
- Tool registry count — 30

## Manual release checklist
- [ ] Replace `support@qogoz.example` and `https://qogoz.example` in `js/config.js`.
- [ ] Replace placeholder license terms with the marketplace/EULA terms you actually sell under.
- [ ] Test PWA install on HTTPS hosting.
- [ ] Test Chrome/Edge/Firefox/Safari with the included demo PDFs and images.
- [ ] Test large PDFs on a low-memory device before promising a maximum file size.
- [ ] If selling as a fully self-contained/offline package, self-host pdf-lib, pdf.js, pdf.worker.js and JSZip instead of relying on CDN URLs.
