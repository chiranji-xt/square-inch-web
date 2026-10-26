# Technical validation (executed)

* `npx vite build` - passes (also runs the prerender step per route).
* `npx oxlint` - no errors.
* Every `/photos/*.webp` path referenced in `src/` and `index.html` exists in `public/photos` (scripted check).
* Browser (Vite dev server, desktop width): `/worlds`, `/projects`, `/world/rustic`, `/world/luxury`,
  `/story/traditional-blue-door`, `/how-we-build`, `/begin`, `/studio` - 0 broken images, no console errors.
  Worlds index, Traditional catalog and Studio award block were also inspected visually.
* Mobile layout of `/worlds` inspected earlier at 375 px; the catalog grid and award block were **not**
  re-inspected at tablet/mobile width after this change.
* Not done: external link checking, automated accessibility audit, Lighthouse/performance run.
