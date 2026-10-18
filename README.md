# Elias Olguin · Portfolio

One-page portfolio in React + TypeScript (Vite). EN / ES / DE.

```bash
npm install
npm run dev
```

Checks: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.

> The German copy (`src/content/de.ts`) needs a review by a native speaker before launch.

## Security

- Static site, no backend, no cookies, no third-party requests (fonts are self-hosted).
- Production headers (CSP, nosniff, frame denial, referrer and permissions policy) live in `vercel.json`. Check the build against them with `npx vite preview --port 4180` and `node tools/qa/csp.mjs`.
- CI runs with a read-only token and `npm audit --audit-level=high`. Dependabot keeps npm packages and Actions current.

## CV

`public/Elias-Olguin-CV{,-ES,-DE}.pdf` are built from the English source `.docx` (kept outside the repo):

1. `python -I tools/cv/strip-phone.py <source.docx> nophone.docx` (removes the phone number).
2. `python -I tools/cv/localize.py nophone.docx tools/cv/<en|es|de>.json cv-<lang>.docx` (swaps the text run by run, so the layout stays identical).
3. Export each `.docx` to PDF from Word.

The German CV (`tools/cv/de.json`) needs the same native review as the site copy.
