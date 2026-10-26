# Eight-page image mapping

Source of truth: the client's PDF `SID PORTFOLIO_PAGE 1 to 42.pdf` (its own section order and
headings), plus the higher-resolution originals in `src/8 world/`. Machine-readable version:
`portfolio-assets/mapping.json`; every extracted image is listed in `portfolio-assets/inventory.csv`.

| # | World (site page) | PDF pages | Published images | Cover | Hi-res originals used |
|---|---|---|---|---|---|
| 1 | Abstract | 5-7 | 6 | coffee house, poster wall (p07) | 4 of 6 |
| 2 | Art-Deco | 8-12 | 12 (detail shots + office) | office with framed prints (p08) | 4 of 12 |
| 3 | Contemporary | 13-14 | 4 | office (p13) | 4 of 4 |
| 4 | Fusion | 15-16 | 4 | sitting room (p15) | 4 of 4 |
| 5 | Traditional | 17-23, 37-38 | 18 | blue-door entrance (p17) | 3 of 18 |
| 6 | Luxury | 24-29 | 12 | living room, yellow chairs | 5 of 12 (+2 originals not in PDF) |
| 7 | Minimalistic | 30-33 | 8 | living room (p30) | 4 of 8 |
| 8 | Rustic | 34-36 | 6 | lounge, indigo seating (p35) | 0 (PDF only) |
| - | Achievement (Studio page) | 39-41 | 3 | certificate | PDF only |

PDF pages 1-4 (about / team / process) and 42 (contact) contain only logos, icons and layout art;
they are extracted to `portfolio-assets/front-matter` and `contact` but not published.

## Corrections to the earlier image placement

* The folder the client named `rustic` contained the **Traditional** restaurant / blue-door photos
  (matched pixel-for-pixel against PDF pages 17-18). They now sit in Traditional.
* **Rustic** is the indigo-sofa / black-stone lounge (PDF 34-36); only low-resolution PDF copies exist.
* The photos previously published as `award-01..04`, `studio-01..03`, `process-01..06`, `collage/*` and
  `og-cover.jpg` were **stock images** (sofa, jar of coins, conference hall, kitchen...). They were
  removed; the awards section now uses the client's real certificate, magazine feature and awardees page.
  The process page no longer shows photos (no real process photography exists).
* Not published (kept in the library): Luxury `004.jpg` (crop of p24-02), Minimalistic `CLX_2609.jpg`
  (near-duplicate of p30-02), Rustic `38 (1).jpg` (duplicate of `38.jpg`), PDF `luxury-p26-05` (logo),
  `traditional-p37-17` (narrower crop of p37-16), `achievement-p39-01` (dark trophy detail).

## Open question for the client
The Satara studio that won the award (1055 sq ft; timber stair, motorbike, courtyard - see the magazine
page) appears in the PDF under **Traditional** (pp 20-23) while the site's award story sits under
Art-Deco (detail shots of the same studio). Confirm whether the studio should be one project.
