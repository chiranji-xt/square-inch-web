# Square Inch Design — EVERY INCH SPEAKS

Image-first exhibition site for the interior design studio (Pune & Satara).

## Run

```
npm install
npm run dev        # http://localhost:5173
npm run build      # + postbuild: per-route meta shells, sitemap (needs domain)
npm run preview
```

Copy `.env.example` to `.env` to configure the enquiry endpoint and site URL.

## Routes

`/` walkthrough · `/projects` (+`?sector=`) · `/worlds` · `/world/:slug` · `/story/:id` · `/studio` · `/how-we-build` · `/begin` (+`?project=`/`?world=`) · `/contact` and `/enquire` redirect to `/begin`

## Edit content without code

- `src/data/site.js` — phones, email, addresses, lead, `NAV`, `PROCESS`, `WORLDS`, `STORIES`
- Add a project: append to `STORIES` with `id / world / sector / featured / type / area / city / award / title / meta / desc / images / alts` (only approved text; unknown facts stay `null` and are hidden)
- Set WhatsApp: `SITE.whatsapp = "91XXXXXXXXXX"` (full international format, no `+`)
- Set production domain: `SITE.url` or `VITE_SITE_URL`
- Set response promise: `SITE.responseTime` (leave `null` unless approved)
- Add services: `SITE.services` array (renders on Studio only when non-empty)

## Photos

Current files in `public/photos/` are temporary stand-ins. Replace any file with the real portfolio photo under the same name — no code change needed. After replacing, run `node scripts/make-responsive-images.mjs` to rebuild `-800`/`-1200` variants + `src/data/variants.json`. Run `node scripts/make-og.mjs` to rebuild the social cover + touch icon.

## Motion system

Lenis smooth scroll + GSAP ScrollTrigger (slow zoom, parallax, clip reveals) + Framer Motion (masks, staggers, pinned stories). Respects `prefers-reduced-motion`. Mobile: touch lens + swipe lightbox + sticky enquiry bar.
