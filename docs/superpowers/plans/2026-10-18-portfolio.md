# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Elias Olguin's one-page portfolio (spec-sheet design, EN/ES/DE) as a static Vite + React + TypeScript site deployable to Vercel.

**Architecture:** Single page with one component per section in `src/sections/`. All copy lives in typed per-language content files (`src/content/{en,es,de}.ts`) and is served through a small `LangProvider` context. Language-independent data (URLs, stack names) lives in `src/links.ts`. Decoration (contour SVG, metallic sheen) is CSS/SVG only and sits behind the content.

**Tech Stack:** Vite, React 19, TypeScript, plain CSS with custom properties, Vitest + Testing Library + jsdom, ESLint + Prettier, `@fontsource-variable/geist` + `@fontsource-variable/geist-mono`, Playwright (only in `tools/` for recording demos), GitHub Actions, Vercel.

**Spec:** `docs/superpowers/specs/2026-10-18-portfolio-design.md`

## Global Constraints

- No phone number anywhere: not on the site, not in the CV PDF, not in the repo.
- Languages: exactly `en`, `es`, `de`. Fallback `en`. Detection order: saved choice → `navigator.languages` (primary subtag) → `en`.
- No i18n library, no router, no CSS/UI framework.
- Background `#0a0a0a`. Metal only on the name, the contact headline, the primary button and the last path station.
- Contour lines only in the hero.
- Everything animated (sheen, video autoplay) is off under `prefers-reduced-motion: reduce`.
- WCAG AA contrast, visible focus, keyboard reachable; Lighthouse ≥ 95 on mobile in all four categories; no horizontal scroll from 360 px.
- Project clips: MP4 H.264, < 1.5 MB each, muted, looping, with a poster image.
- The DoneToday clip is recorded against a **local** DoneToday instance with demo data, never against the Render production deployment.
- Links: DoneToday live `https://donetoday-15xl.onrender.com`, code `https://github.com/EliasOlguin/DoneToday`; recycle-app code `https://github.com/EliasOlguin/recycle-app`; GitHub `https://github.com/EliasOlguin`; email `eliasolguinde@gmail.com`; LinkedIn: placeholder `https://www.linkedin.com/in/TODO` until Elias provides it.
- Copy: use the English text from the spec verbatim; ES and DE are translations of it. The DE copy is marked for native review in the README.

## Review Focus

1. **`localStorage` throws or is unavailable** (Safari private mode, blocked storage): the site still renders in the browser's language, and switching language still works for the session. Pinned in Task 2.
2. **A phone number leaks** through copy, the rendered DOM or the CV PDF. A test scans every content file and the rendered page; the PDF is checked in Task 9.
3. **Long German words at 360 px** ("Softwareentwickler", "Produktionsrückverfolgung") cause horizontal scroll. Headings use `overflow-wrap: anywhere; hyphens: auto`, and Task 10 checks 360 px in all three languages.
4. **A clip fails to load or autoplay is rejected:** the poster stays visible, there is no unhandled promise rejection, and no layout shift. Pinned in Task 7.
5. **Keyboard-only use of the language switcher:** the buttons are reachable with Tab, announce their language and pressed state, and switching updates `<html lang>`. Pinned in Task 2.

---

### Task 1: Scaffold, tooling and CI

**Files:**
- Create: the Vite `react-ts` template in the repo root (`package.json`, `vite.config.ts`, `tsconfig*.json`, `index.html`, `src/main.tsx`, `src/App.tsx`), `.prettierrc`, `.github/workflows/ci.yml`, `src/test/setup.ts`, `README.md`, `.gitignore` (add `.superpowers/`, `tools/demo-output/`)
- Test: `src/App.test.tsx`

**Interfaces:**
- Produces: the npm scripts `dev`, `build`, `lint`, `typecheck` (`tsc -b --noEmit`), `test` (`vitest run`) and `format`.

- [ ] **Step 1:** `npm create vite@latest . -- --template react-ts`, then remove the demo assets and counter code. Add the devDependencies `vitest jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom prettier`. Configure `test: { environment: 'jsdom', setupFiles: 'src/test/setup.ts' }` in `vite.config.ts`.
- [ ] **Step 2: Write a smoke test:** `App.test.tsx` renders `<App/>` and asserts `getByRole('main')` exists.
- [ ] **Step 3:** Run `npm test`. Expected: FAIL (no `<main>`).
- [ ] **Step 4:** Make `App` return `<main/>`. Run `npm test`. Expected: PASS.
- [ ] **Step 5:** Write `ci.yml`: on push and pull_request, Node 24, `npm ci`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.
- [ ] **Step 6:** Run all four scripts locally. Expected: all exit 0.
- [ ] **Step 7:** Commit `chore: scaffold Vite React TS with lint, tests and CI`.

### Task 2: Language detection and provider

**Files:**
- Create: `src/i18n.ts`, `src/i18n.tsx` (provider + hook; keep detection pure in `i18n.ts`), `src/content/types.ts`, `src/content/en.ts`, `src/content/index.ts`, `src/components/LangSwitcher.tsx`
- Test: `src/i18n.test.ts`, `src/components/LangSwitcher.test.tsx`

**Interfaces:**
- Produces:
  - `type Lang = 'en' | 'es' | 'de'`; `const LANGS: readonly Lang[]`
  - `detectLang(saved: string | null, browser: readonly string[]): Lang`
  - `const STORAGE_KEY = 'lang'`
  - `<LangProvider>` and `useLang(): { lang: Lang; setLang(l: Lang): void; t: Content }`
  - `type Content` in `types.ts`, with one key per section: `nav`, `hero`, `metrics`, `experience`, `projects`, `path`, `education`, `languages`, `contact`, `footer`. Each holds only translatable strings (labels, headline, bullets, descriptions, button text). URLs and stack names stay out.
  - `content: Record<Lang, Content>` in `content/index.ts` (ES/DE point at `en` until Task 3).

- [ ] **Step 1: Write the failing tests in `i18n.test.ts`:**
  - `detectLang('de', ['es-AR'])` → `'de'`
  - `detectLang('fr', ['es-AR'])` → `'es'` (an invalid saved value is ignored)
  - `detectLang(null, ['de-DE', 'en'])` → `'de'`
  - `detectLang(null, ['fr-FR', 'es-AR'])` → `'es'`
  - `detectLang(null, ['pt-BR'])` → `'en'`
  - `detectLang(null, [])` → `'en'`
- [ ] **Step 2:** Run `npx vitest run src/i18n.test.ts`. Expected: FAIL.
- [ ] **Step 3:** Implement `detectLang` (lowercase, split on `-`, first match in `LANGS`).
- [ ] **Step 4:** Run the same command. Expected: PASS.
- [ ] **Step 5: Write the failing tests in `LangSwitcher.test.tsx`** (rendered inside `LangProvider`, with `navigator.languages` stubbed to `['es-AR']`):
  - initially `document.documentElement.lang === 'es'` and the `ES` button has `aria-pressed="true"`
  - after `userEvent.tab()` until the `DE` button is focused and pressing Enter: `lang === 'de'`, `localStorage.getItem('lang') === 'de'`, and the `DE` button is pressed
  - each button has an accessible name with the full language name (`English`, `Español`, `Deutsch`)
  - with `localStorage.getItem`/`setItem` stubbed to throw: the provider renders in `es` and clicking `EN` switches to `en` without throwing (Review Focus 1)
- [ ] **Step 6:** Run them. Expected: FAIL.
- [ ] **Step 7:** Implement `LangProvider` (initial state from `detectLang(safeGet(), navigator.languages)`; an effect sets `document.documentElement.lang`; `setLang` updates state and calls `safeSet`, where `safeGet`/`safeSet` wrap storage in try/catch). Implement `LangSwitcher` as three `<button aria-pressed>` with visible `EN · ES · DE` and an `aria-label` with the full name. Fill `en.ts` with the spec's English copy.
- [ ] **Step 8:** Run `npm test && npm run typecheck`. Expected: PASS.
- [ ] **Step 9:** Commit `feat: language detection, provider and switcher`.

### Task 3: Spanish and German content

**Files:**
- Create: `src/content/es.ts`, `src/content/de.ts`
- Modify: `src/content/index.ts`
- Test: `src/content/content.test.ts`

**Interfaces:**
- Consumes: `Content`, `content`, `LANGS` from Task 2.

- [ ] **Step 1: Write failing tests:**
  - for each lang, `metrics.items`, `experience.items`, `path.stations`, `education.items` and `languages.items` have the same length as `en`
  - `es` and `de` are not the same object as `en` and `hero.headline` differs from English
  - **phone guard:** `JSON.stringify(content)` does not match a generic international phone pattern (export it as `PHONE_RE` from the test helper `src/test/phone.ts` for reuse) (Review Focus 2)
- [ ] **Step 2:** Run `npx vitest run src/content`. Expected: FAIL (ES/DE still alias EN).
- [ ] **Step 3:** Write `es.ts` and `de.ts` as translations of `en.ts` (neutral Spanish, standard German; German job titles: "Softwareentwickler", "Hartlöter", "Reparaturtechniker").
- [ ] **Step 4:** Run `npm test && npm run typecheck`. Expected: PASS.
- [ ] **Step 5:** Add a "German copy needs native review" note to `README.md`. Commit `feat: Spanish and German content`.

### Task 4: Design tokens, fonts and page shell

**Files:**
- Create: `src/styles/tokens.css`, `src/styles/global.css`, `src/components/Header.tsx`, `src/components/Header.css`, `src/components/Section.tsx`
- Modify: `src/main.tsx`, `src/App.tsx`
- Test: `src/App.test.tsx`

**Interfaces:**
- Produces:
  - `<Section id: string; label: string; children>`: renders `<section id aria-labelledby>` with the mono label (`01 / EXPERIENCE`) as its `<h2>`.
  - CSS classes `.chrome` (chrome gradient text), `.btn`, `.btn--primary`, `.btn--ghost`, `.sheen` (hover/focus light sweep, off under reduced motion), `.mono`, `.chip`.
  - Tokens: `--bg: #0a0a0a`, `--line: #222326`, `--line-strong: #34363a`, `--text: #c7c9cc`, `--text-strong: #e3e5e8`, `--text-muted: #8a8f96`, and `--chrome` (the gradient `#f4f5f7 0%, #9aa0a8 45%, #e6e8eb 55%, #6c727a 100%`). Every text/background pair is AA (check `--text-muted` on `--bg` ≥ 4.5:1 and adjust if not).

- [ ] **Step 1: Extend `App.test.tsx`:** there is a `banner` landmark containing the language switcher, and a skip link "Skip to content" as the first focusable element that targets `#main`.
- [ ] **Step 2:** Run it. Expected: FAIL.
- [ ] **Step 3:** Install the fonts, import them in `main.tsx`, write the tokens and the global CSS (headings get `overflow-wrap: anywhere; hyphens: auto`), and build `Header` (name mark on the left, switcher on the right) plus the skip link.
- [ ] **Step 4:** Run `npm test`. Expected: PASS. Run `npm run dev` and check at 360 px that there is no horizontal scroll.
- [ ] **Step 5:** Commit `feat: design tokens, fonts and page shell`.

### Task 5: Hero with the Ushuaia contour lines

**Files:**
- Create: `tools/contours/generate.mjs`, `src/assets/ushuaia-contours.svg`, `src/sections/Hero.tsx`, `src/sections/Hero.css`, `src/links.ts`
- Test: `src/sections/Hero.test.tsx`

**Interfaces:**
- Produces: `links` in `src/links.ts`: `{ email, github, linkedin, cv: '/Elias-Olguin-CV.pdf', doneToday: { live, code }, recycleApp: { code, video } }`, with the values from Global Constraints.

- [ ] **Step 1: Write failing tests:** the hero renders `<h1>` "Elias Olguin"; the Download CV link has `href="/Elias-Olguin-CV.pdf"` and a `download` attribute; the GitHub, LinkedIn and Email links exist (`mailto:`); the stack table has the rows Frontend/Backend/Data/Base in the current language; the contour SVG has `aria-hidden="true"`.
- [ ] **Step 2:** Run it. Expected: FAIL.
- [ ] **Step 3: Generate the contours.** **Ask Elias before downloading:** AWS Terrain Tiles (terrarium PNG, public) at zoom 11 covering lat −54.70…−54.86, lon −68.45…−68.20. `generate.mjs` (devDependencies `pngjs d3-contour`) decodes height = (R·256 + G + B/256) − 32768, runs contours every 100 m from 0 to 1400 m, projects to a 1200×700 viewBox, simplifies to 1 decimal and writes `src/assets/ushuaia-contours.svg` with `stroke="currentColor"`. The output must stay under 60 KB; increase the interval if it doesn't. Tiles are downloaded to `tools/contours/.cache/` (gitignored); the generated SVG is committed.
- [ ] **Step 4:** Build `Hero`: the spec tag line, the chrome name, the headline, the stack table and the buttons (the primary one gets `.sheen`). The SVG is inlined (Vite `?raw`), absolutely positioned bottom-right at color `#25272a`, with `pointer-events: none`.
- [ ] **Step 5:** Run `npm test`. Expected: PASS. Visually check the hero at 360 px and 1440 px.
- [ ] **Step 6:** Commit `feat: hero with Ushuaia contour lines`.

### Task 6: Metrics and Experience

**Files:**
- Create: `src/sections/Metrics.tsx`, `src/sections/Experience.tsx`, `src/sections/sections.css`
- Test: `src/sections/Experience.test.tsx`

- [ ] **Step 1: Write failing tests:** Metrics renders 4 items with the values `2 yrs`, `6`, `24/7`, `2×` (in English); Experience renders the "Software Developer · Newsan" heading, the two projects (SPP, ESD) and the stack chips `React, Redux, TypeScript, C# / .NET Core, SQL Server, Raspberry Pi`.
- [ ] **Step 2:** Run it. Expected: FAIL.
- [ ] **Step 3:** Implement both sections. Metrics is a `<dl>` in a 4-column grid that becomes 2 columns under 640 px.
- [ ] **Step 4:** Run `npm test`. Expected: PASS.
- [ ] **Step 5:** Commit `feat: metrics strip and experience section`.

### Task 7: Projects and LoopVideo

**Files:**
- Create: `src/components/LoopVideo.tsx`, `src/components/LoopVideo.css`, `src/sections/Projects.tsx`, `public/media/` (placeholder posters until Task 9)
- Test: `src/components/LoopVideo.test.tsx`, `src/sections/Projects.test.tsx`

**Interfaces:**
- Produces: `<LoopVideo src: string; poster: string; label: string />`

- [ ] **Step 1: Write failing tests for `LoopVideo`:**
  - renders `<video muted loop playsinline preload="none" poster>` with `aria-label={label}`
  - when `IntersectionObserver` reports it intersecting, `play()` is called; when it stops intersecting, `pause()` is called
  - with `matchMedia('(prefers-reduced-motion: reduce)')` matching: `play()` is not called on intersect, and a "Play" button is shown that calls `play()` when clicked
  - `play()` returning a rejected promise does not cause an unhandled rejection, and the poster stays (Review Focus 4)
  - with no `IntersectionObserver` in the environment: it renders without throwing and does not autoplay
- [ ] **Step 2:** Run it. Expected: FAIL.
- [ ] **Step 3:** Implement it (`useRef` + `useEffect` observer at `threshold: 0.4`; `.catch(() => {})` on `play()`; fixed `aspect-ratio: 16/10` so there is no layout shift).
- [ ] **Step 4: Write failing `Projects` tests:** two cards titled DoneToday and recycle-app; DoneToday has Live and Code links to the `links` values with `target="_blank" rel="noopener noreferrer"`; recycle-app has Code and Demo video links; all have stack chips.
- [ ] **Step 5:** Implement `Projects` (2-column grid → 1 column under 768 px; cards get `.sheen`).
- [ ] **Step 6:** Run `npm test`. Expected: PASS.
- [ ] **Step 7:** Commit `feat: projects section with lazy looping clips`.

### Task 8: Path, Education, Languages, Contact and Footer

**Files:**
- Create: `src/sections/Path.tsx`, `src/sections/Path.css`, `src/sections/Education.tsx`, `src/sections/Contact.tsx`, `src/components/Footer.tsx`, `src/assets/mate.svg`
- Modify: `src/App.tsx` (final section order: Hero, Metrics, Experience, Projects, Path, Education, Contact, Footer)
- Test: `src/sections/Path.test.tsx`, `src/App.test.tsx`

- [ ] **Step 1: Write failing tests:**
  - Path renders an ordered list (`<ol>`) of 4 stations in order: Brazing welder, Repair technician, Software developer, Cologne, with years 2020/2021/2022/2024
  - Footer shows `54.80°S 68.30°W → 50.94°N 6.96°E` and "built with React, TypeScript & mate"; the mate icon is `aria-hidden`
  - App: for each of `en`, `es`, `de`, render the full app with that language and assert that `document.body.textContent` does not match the phone regex from Task 3 (Review Focus 2)
  - App: the `<h2>` section headings appear in the spec order
- [ ] **Step 2:** Run them. Expected: FAIL.
- [ ] **Step 3:** Implement them. Path is a horizontal line with a steel gradient between stations, vertical under 640 px; the last station dot uses the brushed-steel gradient. Contact uses `.chrome` on "Let's build something." Education and Languages are two columns, stacked on mobile.
- [ ] **Step 4:** Run `npm test && npm run typecheck && npm run lint`. Expected: PASS.
- [ ] **Step 5:** Commit `feat: path, education, languages, contact and footer`.

### Task 9: Assets (CV without phone, demo clips, OG image, meta)

**Files:**
- Create: `tools/cv/strip-phone.py`, `public/Elias-Olguin-CV.pdf`, `tools/record-demos/record.mjs`, `tools/record-demos/README.md`, `public/media/donetoday.mp4`, `public/media/donetoday.jpg`, `public/media/recycle-app.mp4`, `public/media/recycle-app.jpg`, `public/og.png`, `public/favicon.svg`
- Modify: `index.html` (title, description, Open Graph, Twitter card, theme-color `#0a0a0a`)

- [ ] **Step 1: CV.** `strip-phone.py <in.docx> <out.docx>` copies the docx, removes the phone number and its separator from `word/document.xml`, and fails if any phone-like text is still present. Export to PDF via Word COM (PowerShell `Word.Application` → `SaveAs2` format 17). If Word is not available, ask Elias to export it. Verify: extract the PDF text and check that no phone-like text is present. The original docx stays untouched.
- [ ] **Step 2: DoneToday locally.** Postgres in Docker (`postgres:17`, port 5432, a throwaway password generated now and stored only in `dotnet user-secrets`), Mailpit via `tools/start-mailpit.ps1`, `dotnet ef database update`, the API with the `https` profile, `npm run dev` for the web app. Register a demo account **on localhost**, confirm it through Mailpit and create 5 realistic habits with a few days of completions (through the local UI or API).
- [ ] **Step 3: Record.** `record.mjs` (devDependency `playwright`, Chromium only; ask before downloading the browser) opens a 1280×800 context with `recordVideo` and a mobile 390×844 context. It goes through Today → completes 2 habits → Statistics. The demo credentials come from environment variables, never from the repo. Trim and encode with ffmpeg to about 6 s, H.264, CRF 28, no audio, < 1.5 MB; the poster is the first frame as JPG.
- [ ] **Step 4: recycle-app clip.** Same script against `npx expo start --web` for the camera → result flow, with a sample photo. If the web build cannot use the camera, record the result screen with a mocked classification. Same encoding.
- [ ] **Step 5:** Create the OG image (1200×630, spec-sheet style: name, headline, contour lines), rendered from an HTML page with Playwright, plus a favicon (an "EO" monogram in steel on black).
- [ ] **Step 6:** Run `npm run build && npx vite preview`. Check: the CV downloads, both clips play, and the OG tags are in the HTML. Commit `feat: CV, demo clips, OG image and meta` (the demo account password never appears in the commit).

### Task 10: QA and deploy

**Files:**
- Modify: whatever the checks below flag.

- [ ] **Step 1:** Run Lighthouse on the preview build, mobile, in all 4 categories. Expected: ≥ 95 each. Fix anything below.
- [ ] **Step 2:** Check manually at 360, 768 and 1440 px in EN, ES and DE: no horizontal scroll, no clipped German words (Review Focus 3); keyboard-only pass through every link and the switcher; reduced motion enabled → no sheen, no autoplay; no console errors.
- [ ] **Step 3:** Commit any fixes as `fix: QA findings`.
- [ ] **Step 4: Deploy (Elias does the account parts).** Create the GitHub repo `EliasOlguin/portfolio` and push (**confirm with Elias before pushing**). Elias imports it in Vercel (framework preset Vite, no environment variables). Check that the production URL loads and CI is green.
