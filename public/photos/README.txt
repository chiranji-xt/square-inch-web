Published portfolio photos (WebP). Generated - do not edit by hand.

Source of truth:
  portfolio-assets/                images extracted from the client's portfolio PDF + inventory.csv, mapping.json
  src/8 world/                     higher-resolution originals supplied by the client

Rebuild:
  python scripts/extract-pdf-images.py "<portfolio.pdf>" portfolio-assets
  node scripts/build-site-images.mjs
  node scripts/make-responsive-images.mjs

Naming: <world>-NN.webp (NN = order on the page, 01 = cover); award-*.webp = achievement section.
