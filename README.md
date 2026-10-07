# Square Inch Design — EVERY INCH SPEAKS

Image-first cinematic exhibition site. 75% image / 15% type / 10% info.

## Run
```
npm install
npm run dev
npm run build
npm run preview
```

## Drop real portfolio photos (no stock)
Export individual photos from the 42-page PDF — NOT page screenshots.
Save as WebP (~1600px wide, q78) into `public/photos/` with these exact names:

- luxury-01..04 (4255 sqft residence — yellow chairs hero first)
- abstract-01..03 (1000 sqft coffee house)
- contemporary-01..02 (2000 sqft office)
- fusion-01..03 (brick house)
- traditional-01..03 (courtyard + blue door, night cafe)
- minimal-01..02, rustic-01..02, artdeco-01..02 (1055 sqft studio)
- studio-01..03, award-01..02, process-01..06

Until files exist, the `Photo` component shows a labelled cinematic placeholder — so layout/animation can be approved without fake stock.

## Edit content without code
- `src/data/site.js` — phones, emails, addresses, process, worlds, stories
- Add a project: append to `STORIES` with id/world/images/desc (only approved text)

## Routes
`/` walkthrough · `/worlds` · `/world/:slug` · `/story/:id` · `/studio` · `/how-we-build` · `/begin`

## Motion system
Lenis smooth scroll + GSAP ScrollTrigger (slow zoom 1→1.08, parallax, clip reveals) + Framer Motion (masks, staggers). Respects `prefers-reduced-motion`. Mobile: no hover lens — touch lens + swipe lightbox + full-bleed images.

## Originality
No layout/nav/card/animation copied from SpazioLiv, PKD, DesignX. Signature: The Inch Lens (square follows cursor, sharp photo only inside).
