// One-off import: converts the originals in "src/8 world/<Folder>" into
// optimised WebP files in public/photos using the site's naming scheme
// (<prefix>-01.webp, <prefix>-02.webp, ...). Old files for those prefixes are
// replaced. Run: node scripts/import-world-photos.mjs, then
// node scripts/make-responsive-images.mjs
import sharp from "sharp";
import { readdirSync, rmSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const SRC = "src/8 world";
const OUT = "public/photos";
// Optional explicit order (first = cover) and duplicates to skip, by source file name.
const ORDER = {
  Abstract: ["DSC_5612.jpg.jpeg", "11.jpg.jpeg", "13.jpg.jpeg", "27.jpg.jpeg"],
  Luxury: ["008.jpg.jpeg", "009.jpg.jpeg", "006.jpg.jpeg", "004.jpg.jpeg", "002.jpg.jpeg"],
  rustic: ["5.jpg.jpeg", "34.jpg.jpeg", "38.jpg.jpeg"], // "38 (1)" is a duplicate of "38"
};
const WORLDS = {
  Abstract: "abstract",
  ART: "artdeco",
  Contemprory: "contemporary",
  Fusion: "fusion",
  Luxury: "luxury",
  Minimalistic: "minimal",
  rustic: "rustic",
};

mkdirSync(OUT, { recursive: true });
for (const [folder, prefix] of Object.entries(WORLDS)) {
  const files = readdirSync(join(SRC, folder))
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .filter((f) => !ORDER[folder] || ORDER[folder].includes(f))
    .sort((a, b) =>
      ORDER[folder] ? ORDER[folder].indexOf(a) - ORDER[folder].indexOf(b) : a.localeCompare(b, undefined, { numeric: true })
    );
  for (const f of readdirSync(OUT)) {
    if (new RegExp(`^${prefix}-\\d+(-\\d+)?\\.webp$`).test(f)) rmSync(join(OUT, f));
  }
  for (const [i, f] of files.entries()) {
    const name = `${prefix}-${String(i + 1).padStart(2, "0")}.webp`;
    await sharp(join(SRC, folder, f), { limitInputPixels: false })
      .rotate()
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(join(OUT, name));
    console.log(`${folder}/${f} -> ${name}`);
  }
}
