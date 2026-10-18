# Portfolio site: design

Date: 2026-10-18 · Owner: Elias Olguin · Status: approved in brainstorming, pending spec review

## Goal

A one-page portfolio that tells a recruiter in under a minute who Elias is (a full-stack developer: React and TypeScript, C#/.NET and SQL, based in Cologne, EU citizen, available now) and gives a technical reviewer working proof (two projects, real production experience, a well-built site). Success means a recruiter finds role, location, availability and the CV without scrolling, and a developer finds code, live demos and engineering decisions within two clicks.

## Audience

- **Recruiters / HR (30–60 s):** role, stack keywords, location, work permit, languages, CV.
- **Technical reviewers:** repos, demos, what was built and why, the quality of the site itself.

## Positioning

Full-stack developer. Lead with React + TypeScript + JavaScript, then C#/.NET and SQL. Not "backend-only".

Headline (EN): "Full-stack developer. React and TypeScript on the front, C#/.NET and SQL behind it, shipped to production."

## Content (source: CV, `Elias Olguin CV Full Stack Developer.docx`)

Sections, in order:

1. **Hero (spec sheet).** Tag line `EO-01 / DEVELOPER SPEC` with the coordinates `54.80°S 68.30°W`. Name in chrome. Headline. A table with Frontend (React · TypeScript · JavaScript · Redux), Backend (C# · .NET · Node · REST), Data (SQL Server · PostgreSQL · MySQL) and Base (Cologne, DE · EU citizen · available now). Buttons: Download CV (primary), GitHub, LinkedIn, Email.
2. **At a glance (metrics strip):** 2 yrs professional full-stack · 6 factories using my system · 24/7 production environment · 2× promoted on merit.
3. **01 / Experience:** Software Developer at Newsan, Ushuaia, 2022–2024. Production Traceability System (SPP): owned the core module, schema design, regex validation rules, used in 6 factories, replaced a legacy desktop system, on-site rollout in Buenos Aires. ESD Safety Control: end-to-end, Raspberry Pi test-rig integration, shift-aware logic, daily compliance reports. Stack chips.
4. **02 / Projects:** two cards, each with a muted looping clip of about 6 s (poster image first), a one-line description, 2–3 engineering highlights, stack chips and links.
   - **DoneToday:** habit tracker with streaks, statistics, 2FA, Google sign-in, per-user time zones, 3 languages, xUnit tests, versioned releases. React 19 · TypeScript · ASP.NET Core · PostgreSQL. Live: https://donetoday-15xl.onrender.com · Code: https://github.com/EliasOlguin/DoneToday
   - **recycle-app:** photograph an item, get the right bin for your German city. The AI vision call goes through a backend, so the API key never ships in the app. Expo/React Native · TypeScript · Fastify · PostgreSQL. Code: https://github.com/EliasOlguin/recycle-app · Demo video.
5. **03 / Path (production line):** four stations on a metallic line: Brazing welder (2020, Ushuaia) → Repair technician (2021, led a junior) → Software developer (2022, Newsan) → Cologne (2024, EU citizen). One sentence of story below.
6. **04 / Education + Languages:** the three diplomas (2021, 2022, 2022). Spanish (native), English (B2, professional), German (A1, learning).
7. **Contact:** "Let's build something." Open to full-stack roles in Cologne / NRW or remote. Email, LinkedIn, GitHub.
8. **Footer:** `54.80°S 68.30°W → 50.94°N 6.96°E` · "built with React, TypeScript & mate" plus a small line-drawn mate icon.

Privacy: **no phone number** anywhere on the site or in the downloadable CV. Contact is email + LinkedIn + GitHub only.

## Visual direction

"Spec sheet" (technical datasheet) with "Graphite" accents. Validated with mockups in brainstorming.

- Near-black background (`#0a0a0a`), steel greys for text, hairline borders.
- The metal is used sparingly: a chrome gradient on the name and the contact headline, a brushed-steel gradient on the primary button and the final station of the path line.
- Typography: Geist (UI and headings) + Geist Mono (labels, tables, data), self-hosted.
- Section labels in mono: `01 / EXPERIENCE`, and so on.
- **Background detail:** contour lines of the Martial Mountains and the Beagle Channel (Ushuaia), drawn as thin steel-grey lines **in the hero only**. They are derived once from real elevation data and committed as a static SVG.
- **Metallic sheen:** a light sweep across buttons and cards on hover/focus. Disabled under `prefers-reduced-motion`.
- Design must not compete with the data: all decoration sits behind the content at low contrast, and the text keeps WCAG AA contrast.

## Languages (EN / ES / DE)

- Initial language: the saved choice in `localStorage`, else the first of `navigator.languages` that matches `en|es|de` (by primary subtag), else `en`.
- A visible EN · ES · DE switcher in the header; the choice is saved. `<html lang>` is updated.
- Content lives in `src/content/{en,es,de}.ts`, each typed as `Content`. A missing key fails the typecheck. No i18n library.
- The German copy is drafted by Claude and **must be reviewed by a native speaker before launch**.
- The CV download is the English PDF in all languages.

## Technical design

- **Stack:** Vite + React + TypeScript, single page, no router. Plain CSS with custom properties (design tokens) in one global stylesheet plus per-component CSS files. No UI or CSS framework.
- **Structure:** `src/sections/*` (one component per section), `src/content/*` (typed copy), `src/i18n.ts` (detection + context hook), `src/assets/` (contour SVG, mate icon), `public/` (CV PDF, media, OG image, fonts).
- **Media:** `<video muted loop playsinline preload="none" poster=…>`, started when it enters the viewport (IntersectionObserver). If `prefers-reduced-motion` is set, show the poster only, with a play button. Formats: MP4 (H.264), kept small (< 1.5 MB each).
- **Demo recording:** a Playwright script records the DoneToday clip from a **locally running** DoneToday with seeded demo data (not the production deployment), and the recycle-app clip from the Expo web build or a simulator. The script lives in `tools/` so the clips can be re-recorded.
- **CV:** a copy of the CV without the phone line, exported to `public/Elias-Olguin-CV.pdf`. The original docx is not modified.
- **SEO/sharing:** title, description, Open Graph and Twitter card in English, OG image 1200×630 in the spec-sheet style, favicon.

## Quality bar

- Accessibility: semantic landmarks and headings, visible focus, keyboard-only navigation, AA contrast, alt text, reduced-motion support.
- Lighthouse ≥ 95 in all four categories on mobile.
- Responsive from 360 px; no horizontal scroll.
- Tests (Vitest): language detection (saved choice, browser preference, fallback). The typecheck covers content parity.
- ESLint + Prettier. GitHub Actions on every push: lint, typecheck, test, build.
- No console errors.

## Deploy

Vercel (free tier) from the GitHub repo. Custom domain www.eliasolguin.dev (registered at Cloudflare, DNS only; the bare domain redirects to www).

## Out of scope (for now)

- Per-project case-study pages (approach B, phase 2).
- GitHub "last commit" activity.
- Blog, contact form, analytics, CMS.
- Custom domain.

## Open items (owner: Elias)

- LinkedIn URL: not present in the CV file. Needed before launch; a placeholder is used until then.
- Native review of the German copy.
- Confirm that the DoneToday Render deployment is meant to be public as a live demo (the free tier sleeps, so the first load is slow).
