# CHANGES — Square Inch Design, business-functionality iteration

Design is locked and untouched (palette, type, layout, animation character).
Portfolio photos untouched. No content invented — every fact below comes
from `src/data/site.js` or pre-existing copy.

## Phase 1 — Real bugs (commit `816bca8`)

- `src/components/Lightbox.jsx` — rewrote effects: keydown attached only
  while open (ArrowRight/Left no longer open the gallery from nowhere);
  Tab focus trap; focus restored to the opening thumbnail via `openerRef`;
  background scroll locked via shared Lenis lock; image errors show a
  neutral block instead of an empty dialog; neighbours preloaded.
- `src/lib/lenis.jsx` (new) — Lenis context moved out of `App.jsx` plus a
  reference-counted `lockScroll`/`unlockScroll` used by menu + lightbox.
- `src/components/nav.jsx` — menu uses the shared lock; overlay panel got
  `data-lenis-prevent` so its own scroll works with the wheel.
- `src/App.jsx` — Lenis registered/unregistered with the lock module;
  `lenisRef` (write-only) removed.
- `src/pages/Story.jsx`, `src/pages/Worlds.jsx` — unknown id/slug renders
  `<NotFound />` instead of silently showing the first item.
- `src/App.jsx` (`RouteMeta`) — soft-404 states set `<meta name=robots
  content=noindex>` dynamically, removed again on valid routes.
- `src/App.jsx` — `WorldRoute`/`StoryRoute` wrappers pass `key={slug|id}`
  so reveals replay and gallery state resets between projects.
- `src/components/Photo.jsx` — `failed` state resets when `src` changes.
- `src/lib/enquiry.js` — rewrote: `validateEnquiry` (10-digit default,
  `+91`/`0` prefixes, spaces/dashes, international with `+`),
  12s-timeout POST to `VITE_ENQUIRY_ENDPOINT`, honest `sent` vs `handoff`
  channels, honeypot contract, `enquirySummary`, property-stage options,
  no `VITE_ENQUIRY_KEY` / no Authorization header, Node-safe env access.
- `src/pages/More.jsx` (`EnquiryForm`, `Begin`) — inline errors with
  `aria-describedby`, focus to first invalid field, loading/disabled state,
  duplicate-submit guard, `sent` panel vs `handoff` panel (copy-text
  button, email/call links), error panel with fallback, `name` attributes,
  honeypot field, property-stage select, file input removed,
  `SITE.privacyNote` under submit, `SITE.responseTime` sentence only if
  set, `?project=`/`?world=` context line + pre-filled message + `source`
  in payload, success heading focused, "WHAT HAPPENS NEXT" from `PROCESS`.
- `src/data/site.js` — added `whatsapp` (null), `whatsappText`,
  `privacyNote`, `responseTime` (null), `services` ([]), `url` ("").
- `src/lib/contact.js` — added `mapsHref`; WhatsApp helpers unchanged.
- `src/pages/More.jsx` (`Begin`), `src/components/Footer.jsx`,
  `src/components/StickyBar.jsx` — literal greeting replaced by shared
  `SITE.whatsappText`.
- `src/pages/Walkthrough.jsx`, `src/components/Spotlight.jsx`,
  `src/components/StoriesScroll.jsx`, `src/components/StickyBar.jsx`,
  `src/index.css`, `index.html` — `--bar-h` clearance (hero, finale,
  slider, pinned frame), `viewport-fit=cover`, safe-area bar padding.
- `src/components/InchLens.jsx` — ENTER link moved out of `role="img"`;
  lens clip computed from the real frame size (144/224px) so the sharp
  area equals the orange square; pointer events + `touch-action: pan-y`;
  keyboard Left/Right on the world list; only active + previous world
  mounted (500ms crossfade kept); cursor ring + hint kept from before.

## Phase 2 — Navigation & IA (commit `caac2df`)

- `src/data/site.js` — new `NAV` array (labels, routes, preview photos);
  menu + footer both consume it.
- Menu labels: Walkthrough→Home, Stories→Projects, How We Build→Process,
  Begin→Start a Project. "Stories"→`/world/luxury` mismatch fixed:
  Projects→`/projects`. Footer labels match.
- `src/pages/Projects.jsx` (new, lazy) — flat index of all `STORIES`
  with Residential/Commercial chips driven by `?sector=`.
- `src/App.jsx` — `/contact` and `/enquire` redirect to `/begin`;
  scroll restoration (POP restores, PUSH tops, hashes jump) via
  `useNavigationType`; transition timers cancel cleanly on rapid
  navigation (no stuck overlay/route).
- `src/components/nav.jsx` — per-link preview photos from NAV,
  `aria-current="page"` on the current route.
- Topbar ENQUIRE text link on `md+`.
- Skip link + `id="main" tabindex="-1"` on every page `<main>`.
- `sector` added to all 8 stories (derived from existing meta/desc:
  Residential ×5, Commercial ×3).

## Phase 3 — Portfolio logic (commit `9 files…`)

- `src/data/site.js` — per story: `type`, `area`, `city`, `award` (only
  IIID note on the Satara studio), `featured` flag, `alts: []` with
  `// TODO client review`. `WORLDS[].count` (PDF page numbers) deleted
  from data and from all UI (Worlds list, World header, lens label).
- `src/components/StoriesScroll.jsx` — featured flag replaces hardcoded
  indexes.
- `src/pages/Story.jsx` — breadcrumb, clickable hero (lightbox 0),
  Project-facts row (non-null facts only), Related ×2 (same sector
  first), CTA "ENQUIRE ABOUT A PROJECT LIKE THIS →" + "← ALL PROJECTS",
  prev/next kept.
- `src/pages/Worlds.jsx` — breadcrumb, story-gallery lightbox grid,
  MORE WORLDS switcher with active state.
- `src/components/Photo.jsx` — separate `alt` prop; decorative ghosts
  and menu preview use `alt=""`.
- `src/components/Spotlight.jsx` — per-slide `cta`; award slides read
  "READ THE STORY".

## Phase 4 — Pages & copy (commit `8 files…`)

- Home marquee names link to `/world/<slug>` (dup half aria-hidden).
- Strings replaced (visitor-facing; old → new):
  - Footer `75% IMAGE · 15% TYPE · 10% INFO` → `PUNE · SATARA`
  - Worlds header `08 WORLDS · NOT FILTERS` → `EIGHT WORLDS · CHOOSE ONE TO ENTER`
  - Stories kicker `ROOM 04 — STORIES · KEEP SCROLLING — EACH STORY TAKES THE SAME FRAME` → `ROOM 04 — SELECTED STORIES`
  - Process tease `Not six cards. One line travelling down…` → `Six steps, one continuous line — from first enquiry to final handover.`
  - Lens kicker `… SIGNATURE · HOLD TO SEE EVERY INCH` → `ROOM 03 — EIGHT WORLDS · MOVE ACROSS THE WORK`
  - HowWeBuild intro `One orange line travels down as you scroll…` → `Six steps, in order — from first enquiry to final handover.`
  - HowWeBuild aside `BLUEPRINT NOTE / Scroll slowly…` → `A NOTE / Enquiry to handover — the whole journey, nothing hidden.`
  - Traditional desc tail `… Only approved portfolio photography is used here.` removed
  - Rustic desc tail `… from the Square Inch rustic study.` removed
  - Award header internal note → `One national honour, earned by the Satara studio — recognised for honest local material.`
  - Studio internal note (`Team photographs … no invented names.`) removed
- Studio: office cards with Open-in-Maps links, conditional services
  list, Recent-projects strip (3 featured).
- HowWeBuild steps now render from `PROCESS` (duplicate deleted).
- Begin/Studio offices link to Google Maps search URLs.

## Phase 5 — SEO, a11y, metadata (commit pending)

- `src/lib/meta.js` (new) — single title/desc/noindex/image source;
  `siteUrl()` from `VITE_SITE_URL` → `SITE.url`.
- `src/App.jsx` (`RouteMeta`) — uses `metaFor`; sets canonical, `og:url`,
  absolute `og:image`/`twitter:image`, per-story images; skips absolute
  tags when no domain is configured.
- `scripts/prerender-meta.mjs` (new, runs as `postbuild`) — writes
  `dist/<route>/index.html` shells for 22 routes + `sitemap.xml` and the
  robots `Sitemap:` line when a domain is set; warns otherwise.
- `scripts/make-og.mjs` (new) — generated `public/og-cover.jpg`
  (1200×630) and `public/apple-touch-icon.png` from existing assets.
- `index.html` — `/favicon.svg` link (replaces inline data-URI),
  apple-touch-icon, home title ≤60 chars
  (`Square Inch Design — Interior Designers in Pune & Satara`),
  OG/Twitter images point at `/og-cover.jpg`, JSON-LD lists both
  offices as Places.
- `public/_redirects` (`/* /index.html 200`); hosting note in final report.
- Hero `h1` exposes one `aria-label` sentence; Twenty headline is a real
  `h2`; footer links inside `<nav aria-label="Footer">`.
- Spotlight: pause-on-hover/focus, visible pause/play button, 44px dot
  hit areas (visible diamonds unchanged).
- Footer/contact links raised toward 44px targets.
- `public/robots.txt` — allow-all (Sitemap line appended by postbuild
  once a domain exists).

## Phase 6 — Performance (commit pending)

- Marquee pauses offscreen; static row under reduced motion.
- `Photo`: `decoding="async"`, optional `sizes`/`width`/`height`,
  `fetchPriority="high"` support; hero uses it + route-level preload.
- `scripts/make-responsive-images.mjs` (new) — wrote 68 `-800`/`-1200`
  variants + `src/data/variants.json`; `Photo` emits `srcset` by
  convention. Fully reversible (delete `-800`/`-1200` files, reset json).
- Measured: main chunk 506 KB raw (~165 KB gzip) after route splitting
  — under the 300 KB-gzip bar, so no further splitting.
- Hero black loader shows once per session (`sessionStorage`); the photo
  reveal and title always play.

## Phase 7 — Code quality (commit pending)

- `lenisRef` removed; Lenis context lives in `src/lib/lenis.jsx`.
- Footer year is dynamic. Shared `SITE.whatsappText`. No `SITE`
  re-export from `enquiry.js`.
- `package.json`: tailwind/postcss/autoprefixer → devDependencies,
  `"private": true` boolean, added `postbuild` + `make-og` scripts.
- Deleted `src/assets/react.svg`, `vite.svg` (unused). Kept
  `src/assets/hero.png`, `public/icons.svg` (unused but out of scope).
- `.env.example` documents both env vars with a no-secrets warning.
- README rewritten (routes, env, content hooks); brief-era language
  ("75/15/10", originality pledge) removed.

## Needs client input (do NOT guess)

- Production domain (`VITE_SITE_URL`) + hosting provider (SPA fallback
  rule — `_redirects` covers Netlify-style only).
- Enquiry endpoint (Formspree/Getform/own API) or sign-off that the
  email hand-off is acceptable.
- Which phone number takes WhatsApp (`SITE.whatsapp`).
- Approved response-time promise (`SITE.responseTime`), office hours,
  services list (`SITE.services`), lead bio/photo, testimonials,
  privacy-note wording.
- Real photos for process steps 05/06 (byte-duplicates of `rustic-01`
  and `fusion-01`), real per-image alt text (`alts` arrays are empty
  with TODOs), real award certificate scans.
- Sign-off on menu label changes (Home/Projects/Process/Start a Project)
  and every replaced string in Phase 4 above.

## Known non-issues / left as-is

- `og:image` is relative until a domain is set (skipped, not broken).
- 10 oxlint warnings (4 pre-existing + 6 advisory set-state notes) —
  none are errors; build is clean.
- `text-accent` on bone and remaining `text-warmgrey` decorative text
  are below AA for small sizes — colours locked, instances reported,
  not changed.
- No Playwright here: responsive/keyboard/form/route/reduced-motion
  passes were done by code inspection + Node unit tests (validation ×8,
  meta ×11, contact helpers) — all PASS. Physical device + keyboard
  walkthrough recommended before launch.
