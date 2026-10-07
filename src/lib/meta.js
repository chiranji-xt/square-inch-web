import { WORLDS, STORIES, SITE } from "../data/site.js";

const BASE = "Square Inch Design";

// Absolute production URL only when configured (VITE_SITE_URL wins).
// Empty string = skip absolute tags rather than emit broken ones.
export function siteUrl() {
  const env = (import.meta.env || {});
  return String(env.VITE_SITE_URL || SITE.url || "").trim().replace(/\/+$/, "");
}

export function metaFor(pathname) {
  const p = pathname;
  if (p === "/")
    return {
      title: "Square Inch Design — Interior Designers in Pune & Satara",
      desc: "Square Inch Design — 20 years of residential and commercial interiors across 8 design worlds. Walk through our spaces. Pune & Satara.",
      noindex: false,
      image: "/photos/luxury-01.webp",
    };
  if (p === "/worlds")
    return {
      title: `Eight Design Worlds | ${BASE}`,
      desc: "Abstract, Art-Deco, Contemporary, Fusion, Traditional, Luxury, Minimalistic, Rustic — eight visual worlds by Square Inch Design.",
      noindex: false,
      image: "/photos/abstract-01.webp",
    };
  if (p === "/projects")
    return {
      title: `All Projects | ${BASE}`,
      desc: "Every Square Inch Design project — residential and commercial interiors, Pune & Satara.",
      noindex: false,
      image: "/photos/fusion-01.webp",
    };
  const wm = p.match(/^\/world\/([\w-]+)/);
  if (wm) {
    const w = WORLDS.find((x) => x.slug === wm[1]);
    if (!w) return { title: `Page Not Found | ${BASE}`, desc: BASE, noindex: true, image: null };
    return {
      title: `${w.name} Interiors | ${BASE}`,
      desc: `${w.name} interiors by Square Inch Design — ${w.note}. Pune & Satara.`,
      noindex: false,
      image: w.photo,
    };
  }
  const sm = p.match(/^\/story\/([\w-]+)/);
  if (sm) {
    const s = STORIES.find((x) => x.id === sm[1]);
    if (!s) return { title: `Page Not Found | ${BASE}`, desc: BASE, noindex: true, image: null };
    return { title: `${s.title} | ${BASE}`, desc: `${s.meta} by Square Inch Design.`, noindex: false, image: s.images[0] };
  }
  if (p === "/studio")
    return {
      title: `Studio — 20 Years of Interior Design | ${BASE}`,
      desc: "SI Design: two decades of residential and commercial interiors, IIID 2016 Anchor Award runner-up. Led by Siddharth Kolhapure.",
      noindex: false,
      image: "/photos/studio-01.webp",
    };
  if (p === "/how-we-build")
    return {
      title: `Our Process | ${BASE}`,
      desc: "Enquiry to finalization in six steps — how Square Inch Design builds interiors.",
      noindex: false,
      image: "/photos/process-01.webp",
    };
  if (p === "/begin")
    return {
      title: `Start a Project | ${BASE}`,
      desc: `Enquire about your residential or commercial interior. Offices in Pune and Satara. ${SITE.phones.join(", ")}.`,
      noindex: false,
      image: "/photos/traditional-02.webp",
    };
  return { title: `Page Not Found | ${BASE}`, desc: BASE, noindex: true, image: null };
}
