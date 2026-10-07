// Post-build: per-route static HTML shells with correct <title> / meta /
// canonical / OG tags (no SSR — the same React bundle boots on top), plus
// sitemap.xml when the production URL is configured.
// Runs automatically as npm `postbuild` after `npm run build`.
import { readFileSync, writeFileSync, mkdirSync, appendFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { metaFor, siteUrl } from "../src/lib/meta.js";
import { WORLDS, STORIES } from "../src/data/site.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const url = siteUrl();

const routes = [
  "/",
  "/worlds",
  "/projects",
  ...WORLDS.map((w) => `/world/${w.slug}`),
  ...STORIES.map((s) => `/story/${s.id}`),
  "/studio",
  "/how-we-build",
  "/begin",
];

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const base = readFileSync(join(dist, "index.html"), "utf8");

function setMeta(html, key, attr, value) {
  // key like: property="og:url" | rel="canonical"
  const re = new RegExp(`<(meta|link)[^>]*${key}[^>]*>`);
  const tag = key.startsWith('rel="') ? `<link rel="canonical" href="${esc(value)}">` : `<meta ${key} content="${esc(value)}">`;
  if (re.test(html)) return html.replace(re, () => tag);
  return html.replace("</head>", `  ${tag}\n</head>`);
}

for (const r of routes) {
  const meta = metaFor(r);
  let html = base
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(meta.desc)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(meta.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(meta.desc)}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(meta.title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(meta.desc)}$2`);
  const img = meta.image || "/og-cover.jpg";
  if (url) {
    html = setMeta(html, 'rel="canonical"', "href", `${url}${r}`);
    html = setMeta(html, 'property="og:url"', "content", `${url}${r}`);
    html = html
      .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${url}${img}$2`)
      .replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${url}${img}$2`);
  }
  if (meta.noindex) {
    html = html.replace("</head>", '  <meta name="robots" content="noindex">\n</head>');
  }
  if (r === "/") {
    writeFileSync(join(dist, "index.html"), html);
  } else {
    const dir = join(dist, r);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "index.html"), html);
  }
}

if (url) {
  const locs = routes.map((r) => `  <url><loc>${url}${r}</loc></url>`).join("\n");
  writeFileSync(join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${locs}\n</urlset>\n`);
  appendFileSync(join(dist, "robots.txt"), `\nSitemap: ${url}/sitemap.xml\n`);
  console.log(`[prerender-meta] ${routes.length} shells + sitemap.xml for ${url}`);
} else {
  console.warn("[prerender-meta] VITE_SITE_URL / SITE.url is empty — wrote route shells, skipped canonical/og:url/sitemap. Set the production domain at launch.");
}
