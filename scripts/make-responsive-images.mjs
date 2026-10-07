// Dev script: writes ADDITIONAL -800 / -1200 responsive variants next to the
// originals in public/photos (never overwrites or deletes originals) and
// records them in src/data/variants.json, which Photo uses for srcset.
// Run: node scripts/make-responsive-images.mjs   (needs sharp devDependency)
// Reversible: delete the -* files + reset variants.json to {}.
import sharp from "sharp";
import { readdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const dir = "public/photos";
const out = "src/data/variants.json";
const WIDTHS = [800, 1200];

const map = {};
for (const f of readdirSync(dir)) {
  if (!f.endsWith(".webp") || /-(800|1200)\.webp$/.test(f)) continue;
  const full = join(dir, f);
  const made = [];
  for (const w of WIDTHS) {
    const target = full.replace(/\.webp$/, `-${w}.webp`);
    if (!existsSync(target)) {
      await sharp(full).resize({ width: w, withoutEnlargement: true }).webp({ quality: 76 }).toFile(target);
      console.log(`[responsive] wrote ${target}`);
    }
    made.push(w);
  }
  map[`/photos/${f}`] = made;
}

writeFileSync(out, `${JSON.stringify(map, null, 2)}\n`);
console.log(`[responsive] wrote ${out} (${Object.keys(map).length} images)`);
