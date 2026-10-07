// One-off dev script: builds the 1200x630 social cover from the hero photo.
// Run: node scripts/make-og.mjs   (needs the sharp devDependency)
// Never overwrites or deletes anything in public/photos.
import sharp from "sharp";
import { existsSync } from "node:fs";

const src = "public/photos/luxury-01.webp";
const out = "public/og-cover.jpg";

if (!existsSync(src)) {
  console.error(`[make-og] missing ${src}`);
  process.exit(1);
}

await sharp(src)
  .resize(1200, 630, { fit: "cover", position: "attention" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(out);

console.log(`[make-og] wrote ${out}`);

// Apple touch icon from the studio mark (only because it rasterises cleanly).
await sharp("public/favicon.svg")
  .resize(180, 180, { fit: "contain", background: "#F5F3EE" })
  .png()
  .toFile("public/apple-touch-icon.png");

console.log("[make-og] wrote public/apple-touch-icon.png");
