// Builds the published photo sets in public/photos from the portfolio library.
//
//   portfolio-assets/<section>/<file>   images extracted from the client's PDF
//   src/8 world/<Folder>/<file>         higher-resolution originals supplied later
//
// Each published image is taken from the high-resolution original when one was
// matched to it (see portfolio-assets/mapping.json), otherwise from the PDF
// extract. Nothing is upscaled. Run: node scripts/build-site-images.mjs,
// then node scripts/make-responsive-images.mjs
import sharp from "sharp";
import { readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = "public/photos";
const HI = "src/8 world";

// world prefix -> ordered list; first entry is the cover.
// [pdfSection, pdfFile, optional high-res original (relative to src/8 world)]
const SETS = {
  abstract: [
    ["abstract", "abstract-p07-06.jpeg", "Abstract/DSC_5612.jpg.jpeg"],
    ["abstract", "abstract-p07-05.jpeg"],
    ["abstract", "abstract-p05-01.jpeg", "Abstract/11.jpg.jpeg"],
    ["abstract", "abstract-p05-02.jpeg"],
    ["abstract", "abstract-p06-03.jpeg", "Abstract/27.jpg.jpeg"],
    ["abstract", "abstract-p06-04.jpeg", "Abstract/13.jpg.jpeg"],
  ],
  artdeco: [
    ["art-deco", "art-deco-p08-02.jpeg"],
    ["art-deco", "art-deco-p08-01.jpeg", "ART/CLX_7105.JPG.jpeg"],
    ["art-deco", "art-deco-p09-03.jpeg", "ART/IMG_0078.JPG.jpeg"],
    ["art-deco", "art-deco-p09-05.jpeg", "ART/IMG_0058.JPG.jpeg"],
    ["art-deco", "art-deco-p09-04.jpeg"],
    ["art-deco", "art-deco-p10-06.jpeg"],
    ["art-deco", "art-deco-p10-07.jpeg"],
    ["art-deco", "art-deco-p11-08.jpeg"],
    ["art-deco", "art-deco-p11-09.jpeg"],
    ["art-deco", "art-deco-p11-10.jpeg"],
    ["art-deco", "art-deco-p12-11.jpeg", "ART/IMG_0083.JPG.jpeg"],
    ["art-deco", "art-deco-p12-12.jpeg"],
  ],
  contemporary: [
    ["contemporary", "contemporary-p13-01.jpeg", "Contemprory/CLX_4259.jpg.jpeg"],
    ["contemporary", "contemporary-p13-02.jpeg", "Contemprory/CLX_4273.jpg.jpeg"],
    ["contemporary", "contemporary-p14-03.jpeg", "Contemprory/CLX_1152.JPG.jpeg"],
    ["contemporary", "contemporary-p14-04.jpeg", "Contemprory/CLX_7105.JPG.jpeg"],
  ],
  fusion: [
    ["fusion", "fusion-p15-02.jpeg", "Fusion/DSC09209.jpg.jpeg"],
    ["fusion", "fusion-p15-01.jpeg", "Fusion/DSC09201.jpg.jpeg"],
    ["fusion", "fusion-p16-03.jpeg", "Fusion/DSC09210.jpg.jpeg"],
    ["fusion", "fusion-p16-04.jpeg", "Fusion/DSC09205.jpg.jpeg"],
  ],
  traditional: [
    ["traditional", "traditional-p17-02.jpeg", "rustic/5.jpg.jpeg"],
    ["traditional", "traditional-p18-04.jpeg", "rustic/38.jpg.jpeg"],
    ["traditional", "traditional-p19-06.jpeg"],
    ["traditional", "traditional-p18-03.jpeg", "rustic/34.jpg.jpeg"],
    ["traditional", "traditional-p19-05.jpeg"],
    ["traditional", "traditional-p17-01.jpeg"],
    ["traditional", "traditional-p22-12.jpeg"],
    ["traditional", "traditional-p22-13.jpeg"],
    ["traditional", "traditional-p23-14.jpeg"],
    ["traditional", "traditional-p20-08.jpeg"],
    ["traditional", "traditional-p20-07.jpeg"],
    ["traditional", "traditional-p21-09.jpeg"],
    ["traditional", "traditional-p21-10.jpeg"],
    ["traditional", "traditional-p21-11.jpeg"],
    ["traditional", "traditional-p23-15.jpeg"],
    ["traditional", "traditional-p37-16.jpeg"],
    ["traditional", "traditional-p38-18.jpeg"],
    ["traditional", "traditional-p38-19.jpeg"],
  ],
  luxury: [
    ["luxury", "luxury-p24-01.jpeg", "Luxury/008.jpg.jpeg"],
    ["luxury", "luxury-p25-04.jpeg", "Luxury/009.jpg.jpeg"],
    ["luxury", "luxury-p24-02.jpeg", "Luxury/006.jpg.jpeg"],
    ["luxury", "luxury-p25-03.jpeg"],
    ["luxury", "luxury-p26-06.jpeg", "Luxury/002.jpg.jpeg"],
    ["luxury", "luxury-p26-07.jpeg"],
    ["luxury", "luxury-p27-08.jpeg"],
    ["luxury", "luxury-p27-09.jpeg"],
    ["luxury", "luxury-p28-10.jpeg"],
    ["luxury", "luxury-p28-11.jpeg"],
    ["luxury", "luxury-p29-12.jpeg"],
    ["luxury", "luxury-p29-13.jpeg"],
  ],
  minimal: [
    ["minimalistic", "minimalistic-p30-01.jpeg", "Minimalistic/CLX_2604.JPG.jpeg"],
    ["minimalistic", "minimalistic-p30-02.jpeg", "Minimalistic/CLX_2602.JPG.jpeg"],
    ["minimalistic", "minimalistic-p31-04.jpeg"],
    ["minimalistic", "minimalistic-p31-03.jpeg"],
    ["minimalistic", "minimalistic-p32-05.jpeg"],
    ["minimalistic", "minimalistic-p32-06.jpeg", "Minimalistic/CLX_2605.JPG.jpeg"],
    ["minimalistic", "minimalistic-p33-07.jpeg"],
    ["minimalistic", "minimalistic-p33-08.jpeg", "Minimalistic/CLX_2598.JPG.jpeg"],
  ],
  rustic: [
    ["rustic", "rustic-p35-03.jpeg"],
    ["rustic", "rustic-p34-01.jpeg"],
    ["rustic", "rustic-p36-05.jpeg"],
    ["rustic", "rustic-p35-04.jpeg"],
    ["rustic", "rustic-p34-02.jpeg"],
    ["rustic", "rustic-p36-06.jpeg"],
  ],
};

const mapping = {};
for (const [prefix, items] of Object.entries(SETS)) {
  for (const f of readdirSync(OUT)) {
    if (new RegExp(`^${prefix}-\\d+(-\\d+)?\\.webp$`).test(f)) rmSync(join(OUT, f));
  }
  mapping[prefix] = [];
  for (const [i, [sec, file, hi]] of items.entries()) {
    const name = `${prefix}-${String(i + 1).padStart(2, "0")}.webp`;
    const src = hi ? join(HI, hi) : join("portfolio-assets", sec, file);
    const img = sharp(src, { limitInputPixels: false }).rotate().resize({ width: 1600, withoutEnlargement: true });
    const info = await img.webp({ quality: hi ? 80 : 88 }).toFile(join(OUT, name));
    mapping[prefix].push({ published: name, pdfExtract: `${sec}/${file}`, highRes: hi ?? null, width: info.width, height: info.height });
    console.log(name, "<-", hi ?? `${sec}/${file}`, `${info.width}x${info.height}`);
  }
}
writeFileSync("portfolio-assets/mapping.json", JSON.stringify(mapping, null, 2));

// Achievement section (Studio page): certificate, published feature, awardees spread.
const ACH = {
  "award-certificate.webp": "portfolio-assets/achievement/achievement-p39-02.jpeg",
  "award-article.webp": "portfolio-assets/achievement/achievement-p40-03.jpeg",
  "award-feature.webp": "portfolio-assets/achievement/achievement-p41-04.jpeg",
};
for (const [name, src] of Object.entries(ACH)) {
  const info = await sharp(src).webp({ quality: 90 }).toFile(join(OUT, name));
  console.log(name, "<-", src, `${info.width}x${info.height}`);
}
