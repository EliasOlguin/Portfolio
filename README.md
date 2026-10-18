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
