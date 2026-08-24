# Customization Guide — White Labeling

Everything brand-related lives in **one file**: `js/config.js`. This is the
first and usually only file you need to touch to turn QOG'OZ into a
different product (e.g. **PDFLY**, **DOCFLOW**, or your client's name).

## 1. Brand name, logo letter, tagline

```js
brand: {
  name: "QOG'OZ",              // shown in header, footer, page title
  shortName: "QGZ",            // used for the PWA home-screen label
  tagline: "PDF bilan ishlashning tinch yo'li",
  logoSymbol: "Q",             // the letter inside the round logo mark
  footerNote: "Fayllaringiz brauzeringizdan hech qayerga chiqmaydi.",
  supportEmail: "support@qogoz.example",
  domain: "https://qogoz.example",
},
```

Change `name`, `logoSymbol`, `tagline`, `footerNote` and `supportEmail` —
the page updates every element tagged `data-brand-*` automatically
(header logo, footer, hero tagline, contact link) on load. No need to hunt
through `index.html`.

**Example — rebrand to PDFLY:**

```js
brand: {
  name: "PDFLY",
  shortName: "PDFLY",
  tagline: "The calm way to work with PDFs",
  logoSymbol: "P",
  footerNote: "Your files never leave your browser.",
  supportEmail: "hello@pdfly.example",
  domain: "https://pdfly.example",
},
```

## 2. Colors

Both light and dark themes are defined as named hex values:

```js
theme: {
  light: { ink, paper, paperSoft, surface, accent, accentDark, blue, muted, line },
  dark:  { ink, paper, paperSoft, surface, accent, accentDark, blue, muted, line },
  ...
}
```

- `accent` / `accentDark` — your primary brand color (buttons, links, active
  states). This is the one color worth spending time on.
- `ink` — main text color. `paper` — page background. `surface` — card
  background. `muted` — secondary text. `line` — borders.

Every value becomes a CSS variable (`--accent`, `--ink`, …) at runtime, so
you never have to touch `css/style.css` for a recolor.

## 3. Fonts

```js
fonts: {
  display: "'Fraunces', serif",   // headlines
  body: "'Inter', sans-serif",    // body text
  mono: "'JetBrains Mono', monospace", // labels, meta text
},
```

Swap in any Google Fonts family:

1. Add its `<link>` tag to `index.html`'s `<head>` (replacing or alongside
   the existing Fraunces/Inter/JetBrains Mono link).
2. Update the three values above to match.

## 4. SEO copy

```js
seo: {
  title: "...",        // <title> and document.title
  description: "...",  // meta description
  keywords: "...",     // meta keywords
},
```

These are applied via JavaScript on load, which covers most cases. Search
engines that render JavaScript (all major ones today) will see the updated
values. If you want the raw HTML to also contain your final copy (belt and
suspenders, or for crawlers that don't run JS), also edit the matching
`<title>` and `<meta name="description">` / `<meta name="keywords">` tags
directly in `index.html`'s `<head>` — keep the two in sync.

## 5. PWA manifest & icons

`manifest.json` is a static file the browser reads before any JavaScript
runs (e.g. when showing the "Install app" prompt), so it **cannot** be
rebranded automatically by `config.js`. When you rebrand:

1. Edit `manifest.json` — update `name`, `short_name`, `theme_color`,
   `background_color` to match `js/config.js`.
2. Regenerate the icons in `/icons` (192×192, 512×512, and a 512×512
   maskable variant) with your new logo/colors. Any image editor or a quick
   script works — the required files are:
   - `icons/icon-192.png`
   - `icons/icon-512.png`
   - `icons/icon-512-maskable.png`
   - `icons/og-image.png` (1200×630, used for social share previews)
3. Update `<meta name="theme-color">` in `index.html` to match.

## 6. Adding, removing, or reordering tools

All tool metadata lives in `js/toolsData.js` as a single `TOOLS` array. Each
entry looks like:

```js
{ key:"watermark-pdf", name:"Watermark qo'yish", desc:"...", cat:"mark",
  icon:"💧", accept:".pdf", multiple:false, workspace:"default",
  optionsHtml:`<label>Matn</label><input type="text" id="opt_text" value="CONFIDENTIAL">` }
```

- Delete an entry to remove a tool from the grid.
- Reorder entries to change grid order within a category.
- To add a brand-new tool: add an entry here, then add a matching function
  in `js/engine.js`'s `RUNNERS` map (`"your-tool-key": yourFunction`). Your
  function receives `(files, opts, progress)` and must return
  `{ blob, filename }` (or throw an `Engine.EngineError` with a friendly
  message for validation failures).
- `optionsHtml` inputs must use `id="opt_xxx"` — the workspace reads them
  automatically into `opts.xxx`.

## 7. Translating the UI

All visible strings are plain text inside `index.html` (static sections) and
`js/toolsData.js` / `js/ui.js` (dynamic strings, toasts, statuses). There is
no i18n framework — for a full translation, search each file for Uzbek text
and replace it. Tool `key` values (used internally) should stay unchanged.

## 8. Reselling to multiple clients

Because every brand-specific value is isolated to `js/config.js` (plus the
few static files noted in §5), a typical rebrand workflow is:

1. Copy the whole project folder.
2. Edit `js/config.js`.
3. Edit `manifest.json` + regenerate `/icons` (§5).
4. Deploy (see `INSTALLATION.md`).

No CSS or HTML editing required for a standard rebrand.


## Admin / reklama murojaati

Reklama va murojaat havolasi Telegram: https://t.me/Shohboz_222. Bu Q.Shoxboz admin akkaunti.
