# Image quality report

* The PDF stores photographs at roughly 520-1250 px on the long side (many are ~1100 x 750). These are the
  best copies available for 26 of the 72 published photos. They are shown at up to ~450 px wide in the
  catalog grids, which is adequate, but they will look soft in the full-screen viewer on large monitors.
  Nothing was upscaled (resize uses `withoutEnlargement`).
* High-resolution originals (Fusion, Contemporary, Luxury, Minimalistic, Abstract, Art-Deco, 3 Traditional)
  were matched to PDF images by visual comparison (distance <= 0.2 on a 16x16 signature) and used instead,
  re-encoded to WebP, max 1600 px wide, with 800/1200 px responsive variants.
* **Rustic (6 photos) has no original: 785-1143 px PDF copies only.** Traditional pp 19-23 and 37-38 likewise
  (PDF copies). Request originals from the client if sharper images are wanted.
* Achievement documents are 745-879 px wide; shown at ~300 px.
* Re-encoding JPEG -> WebP adds a small generation loss on PDF copies (quality 88).
* Catalog tiles are uniform 4:3 with `object-fit: contain`, so portrait photos are letter-boxed, never cropped.
