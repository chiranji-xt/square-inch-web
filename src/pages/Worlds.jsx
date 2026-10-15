import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Photo from "../components/Photo.jsx";
import Footer from "../components/Footer.jsx";
import Lightbox from "../components/Lightbox.jsx";
import NotFound from "./NotFound.jsx";
import { RevealMask } from "../components/motion.jsx";
import { WORLDS, STORIES } from "../data/site.js";

// One palette per world — the detail page dresses in its name.
const WORLD_THEMES = {
  abstract: { bg: "#D8A24A", ink: "#1B1A18", accent: "#7E2A10", soft: "rgba(27,26,24,.18)" },
  "art-deco": { bg: "#D2B273", ink: "#4A1E10", accent: "#9E2A1F", soft: "rgba(74,30,16,.22)", weave: true },
  contemporary: { bg: "#2B2E33", ink: "#E8E4DA", accent: "#A8C0D4", soft: "rgba(232,228,218,.16)" },
  fusion: { bg: "#8C3B21", ink: "#F3E6CB", accent: "#F2BE5E", soft: "rgba(243,230,203,.18)" },
  traditional: { bg: "#71340F", ink: "#F3E3C2", accent: "#E8A94C", soft: "rgba(243,227,194,.2)" },
  luxury: { bg: "#0E1E3A", ink: "#EFE6D2", accent: "#C9A86A", soft: "rgba(239,230,210,.16)" },
  minimalistic: { bg: "#EDE9E0", ink: "#2A2723", accent: "#9A6B2E", soft: "rgba(42,39,35,.16)" },
  rustic: { bg: "#101418", ink: "#D8DEE6", accent: "#5B86BE", soft: "rgba(216,222,230,.16)" },
};

const MAT_WEAVE = "repeating-linear-gradient(0deg, rgba(110,75,30,.16) 0 1px, transparent 1px 5px), repeating-linear-gradient(90deg, rgba(255,242,208,.13) 0 1px, transparent 1px 5px), repeating-linear-gradient(90deg, rgba(110,75,30,.10) 0 2px, transparent 2px 9px)";

function FretCorner({ className = "" }) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="6">
      <path d="M6 54 H54 V6 H26 V26 H38" />
      <path d="M14 46 H46 V14" opacity="0.55" />
    </svg>
  );
}

const WORLD_LAYOUTS = {
  luxury: { align: "center", frame: "none", gallery: "stagger", motif: "sunburst", composition: "classic", bare: true },
  abstract: { align: "left", frame: "tilt", gallery: "stagger", motif: "shapes", composition: "classic", tiltTitle: true, rotateItems: true },
  traditional: { align: "center", frame: "arch", gallery: "grid", motif: "archline", composition: "classic" },
  fusion: { align: "left", frame: "split", gallery: "wide", motif: "diamonds", composition: "split" },
  rustic: { align: "left", frame: "full", gallery: "wide", motif: "none", composition: "immersive" },
  contemporary: { align: "left", frame: "inset", gallery: "grid", motif: "rules", composition: "classic" },
  "art-deco": { align: "center", frame: "inset", gallery: "grid", motif: "none", composition: "classic" },
  minimalistic: { align: "left", frame: "inset", gallery: "grid", motif: "rings", composition: "classic" },
};

function WorldDeco({ motif, color }) {
  switch (motif) {
    case "sunburst": {
      const rays = Array.from({ length: 13 }).map((_, i) => {
        const a = (Math.PI * i) / 12;
        return { x2: 100 + 92 * Math.cos(a), y2: 100 - 92 * Math.sin(a) };
      });
      return (
        <svg viewBox="0 0 200 100" className="absolute left-1/2 top-0 h-[26vh] md:h-[36vh] w-auto -translate-x-1/2" style={{ color }} aria-hidden="true">
          {rays.map((r, i) => (
            <line key={i} x1="100" y1="100" x2={r.x2} y2={r.y2} stroke="currentColor" strokeWidth="1" opacity="0.55" />
          ))}
          <circle cx="100" cy="100" r="27" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.55" />
          <circle cx="100" cy="100" r="19" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.55" />
        </svg>
      );
    }
    case "shapes":
      return (
        <>
          <div className="absolute -right-8 top-8 h-28 w-28 md:h-44 md:w-44 rotate-12 border-2" style={{ borderColor: color, opacity: 0.55 }} aria-hidden="true" />
          <div className="absolute -left-10 bottom-2 h-20 w-20 md:h-28 md:w-28 rounded-full" style={{ background: color, opacity: 0.3 }} aria-hidden="true" />
        </>
      );
    case "archline":
      return (
        <div className="absolute left-1/2 top-4 h-[24vh] md:h-[32vh] aspect-[3/4] -translate-x-1/2 rounded-t-[999px] border" style={{ borderColor: color, opacity: 0.5 }} aria-hidden="true" />
      );
    case "diamonds":
      return (
        <div className="absolute right-6 md:right-12 top-8 flex gap-2" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="h-2.5 w-2.5 rotate-45" style={{ background: color, opacity: 0.35 + i * 0.15 }} />
          ))}
        </div>
      );
    case "rings":
      return (
        <>
          <div className="absolute right-4 md:right-10 top-0 h-32 w-32 md:h-48 md:w-48 rounded-full border" style={{ borderColor: color, opacity: 0.4 }} aria-hidden="true" />
          <div className="absolute right-10 md:right-[4.5rem] top-6 md:top-8 h-16 w-16 md:h-24 md:w-24 rounded-full border" style={{ borderColor: color, opacity: 0.4 }} aria-hidden="true" />
        </>
      );
    case "rules":
      return (
        <>
          <div className="absolute left-0 right-0 top-1/2 h-px" style={{ background: color, opacity: 0.25 }} aria-hidden="true" />
          <div className="absolute left-6 md:left-12 top-0 h-16 w-px" style={{ background: color, opacity: 0.4 }} aria-hidden="true" />
        </>
      );
    default:
      return null;
  }
}

function FolkWaves({ color, className = "", rows = 4 }) {
  const ticks = Array.from({ length: 24 }).map((_, i) => `T${48 + i * 24},8`).join(" ");
  const d = `M0,8 Q12,0 24,8 ${ticks}`;
  return (
    <svg viewBox="0 0 600 34" preserveAspectRatio="none" className={className} style={{ color }} aria-hidden="true">
      {Array.from({ length: rows }).map((_, r) => (
        <path key={r} d={d} transform={`translate(0 ${r * 8})`} fill="none" stroke="currentColor" strokeWidth="1.4" />
      ))}
    </svg>
  );
}

function FolkSun({ color, className = "" }) {
  const rays = Array.from({ length: 24 }).map((_, i) => {
    const a = (Math.PI * 2 * i) / 24;
    return { x1: 50 + 15 * Math.cos(a), y1: 50 + 15 * Math.sin(a), x2: 50 + 26 * Math.cos(a), y2: 50 + 26 * Math.sin(a) };
  });
  return (
    <svg viewBox="0 0 100 100" className={className} style={{ color }} aria-hidden="true">
      <circle cx="50" cy="50" r="12" fill="currentColor" />
      {rays.map((r, i) => (
        <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} stroke="currentColor" strokeWidth="2" />
      ))}
    </svg>
  );
}

function FolkWheat({ color, className = "" }) {
  const leaves = [18, 32, 46, 60, 74];
  return (
    <svg viewBox="0 0 60 120" className={className} style={{ color }} aria-hidden="true">
      <line x1="30" y1="118" x2="30" y2="8" stroke="currentColor" strokeWidth="2" />
      {leaves.map((y) => (
        <g key={y} fill="currentColor">
          <ellipse cx="21" cy={y} rx="8" ry="3.2" transform={`rotate(-28 21 ${y})`} />
          <ellipse cx="39" cy={y} rx="8" ry="3.2" transform={`rotate(28 39 ${y})`} />
        </g>
      ))}
      <ellipse cx="30" cy="8" rx="3.4" ry="6" fill="currentColor" />
    </svg>
  );
}

function FolkTraditional({ w, t }) {
  return (
    <div className="relative overflow-hidden" style={{ background: t.bg, color: t.ink }}>
      <FolkWaves color={t.ink} className="block h-7 w-full opacity-90 md:h-9" rows={4} />
      <div className="relative mx-auto -mt-1 w-fit px-8 py-2 text-center md:px-12" style={{ background: "#F3E3C2", color: "#71340F" }}>
        <h1 className="display leading-[0.9] text-[17vw] md:text-[7.5vw]">Traditional<span style={{ color: "#B25A1B" }}>.</span></h1>
        <p className="mt-3 text-[10px] tracking-[0.3em] md:text-xs">{w.note.toUpperCase()}</p>
      </div>
      <div className="mt-5 flex items-center justify-center gap-2" aria-label={`${w.name} palette`}>
        {w.fallback.map((c) => (
          <span key={c} aria-hidden="true" className="h-4 w-4 rounded-[4px] border border-black/20" style={{ background: c }} />
        ))}
        <span className="ml-2 text-[10px] tracking-[0.25em] opacity-60">{w.slug.toUpperCase()} PALETTE</span>
      </div>
      <FolkWaves color={t.ink} className="mx-auto mt-5 h-5 w-56 opacity-80 md:h-6 md:w-72" rows={3} />
      <FolkSun color={t.ink} className="absolute right-6 top-[36%] h-24 w-24 opacity-90 md:right-16 md:h-36 md:w-36" />
      <FolkWheat color={t.ink} className="absolute bottom-[26%] left-4 h-28 w-14 opacity-90 md:left-10 md:h-44 md:w-24" />
      <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="mt-6 block h-[13vh] w-full md:h-[19vh]" aria-hidden="true">
        <path d="M0,200 L0,130 C240,50 430,55 650,115 C870,175 1090,175 1440,70 L1440,200 Z" fill="#F3E3C2" />
      </svg>
    </div>
  );
}

function WorldHeader({ w, t, layout }) {
  const center = layout.align === "center";
  const bare = layout.bare === true;
  return (
    <div className={`relative overflow-hidden px-5 md:px-10 ${bare ? "pt-6 md:pt-8 pb-6 md:pb-8" : "pt-10 md:pt-14 pb-10 md:pb-14"} ${center ? "text-center" : ""}`}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <WorldDeco motif={layout.motif} color={t.accent} />
      </div>
      <div className="relative">
        {!bare && (
          <p className="text-xs tracking-mega" style={{ color: t.accent }}>{w.note.toUpperCase()}</p>
        )}
        <h1 className={`display leading-[0.85] text-[15vw] md:text-[10vw]${layout.tiltTitle ? " md:-rotate-2 md:origin-left" : ""}`}>{w.name}<span style={{ color: t.accent }}>.</span></h1>
        {!bare && (
          <div className={`mt-5 flex items-center gap-2 ${center ? "justify-center" : ""}`} aria-label={`${w.name} palette`}>
            {w.fallback.map((c) => (
              <span key={c} aria-hidden="true" className="h-4 w-4 rounded-[4px] border border-black/20" style={{ background: c }} />
            ))}
            <span className="ml-2 text-[10px] tracking-[0.25em] opacity-60">{w.slug.toUpperCase()} PALETTE</span>
          </div>
        )}
        {center && !bare && (
          <div className="mt-6 flex items-center justify-center gap-3" aria-hidden="true">
            <span className="h-px w-16" style={{ background: t.accent }} />
            <span className="h-1.5 w-1.5 rotate-45" style={{ background: t.accent }} />
            <span className="h-px w-16" style={{ background: t.accent }} />
          </div>
        )}
      </div>
    </div>
  );
}

function WorldHero({ w, t, layout, gallery, count }) {
  if (layout.frame === "none") return null;
  if (layout.frame === "arch") {
    return (
      <div className="px-10 md:px-0 md:mx-auto md:max-w-[60vw] overflow-hidden rounded-t-[999px]">
        <Photo src={w.photo} label={w.name.toUpperCase() + " WORLD"} palette={w.fallback} className="h-[60vh] md:h-[82vh]" eager sizes="(max-width: 768px) 85vw, 60vw" />
      </div>
    );
  }
  if (layout.frame === "full") {
    return (
      <div className="relative">
        <Photo src={w.photo} label={w.name.toUpperCase() + " WORLD"} palette={w.fallback} className="h-[66vh] md:h-[90vh]" eager sizes="100vw" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-5 md:px-10 pt-16 pb-6">
          <p className="text-bone text-[11px] tracking-mega">{count} STORIES INSIDE THIS WORLD</p>
        </div>
      </div>
    );
  }
  if (layout.frame === "tilt") {
    const second = gallery[0]?.src;
    return (
      <div className="relative px-5 md:px-10 pt-4 pb-14">
        <div className="relative rotate-[-2deg] overflow-hidden shadow-2xl">
          <Photo src={w.photo} label={w.name.toUpperCase() + " WORLD"} palette={w.fallback} className="h-[50vh] md:h-[66vh]" eager sizes="(max-width: 768px) 90vw, 80vw" />
        </div>
        {second && (
          <div className="absolute right-5 md:right-16 -bottom-2 md:-bottom-4 w-[48%] md:w-[30%] rotate-[3deg] overflow-hidden shadow-xl" style={{ outline: `6px solid ${t.bg}` }}>
            <Photo src={second} label={gallery[0]?.title.toUpperCase()} palette={w.fallback} className="h-[22vh] md:h-[32vh]" sizes="(max-width: 768px) 48vw, 30vw" />
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="px-5 md:px-10">
      <div className="relative">
        <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3" style={{ background: t.accent, opacity: 0.85 }} />
        <Photo src={w.photo} label={w.name.toUpperCase() + " WORLD"} palette={w.fallback} className="relative h-[56vh] md:h-[76vh]" eager sizes="(max-width: 768px) 90vw, 85vw" />
      </div>
    </div>
  );
}

function LuxuryCarousel({ items, t, onAt }) {
  const trackRef = useRef(null);
  if (!items.length) return null;
  const slide = (dir) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.72, behavior: "smooth" });
  };
  return (
    <div className="pt-8 md:pt-10">
      <div className="px-5 md:px-10 flex items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-[11px] tracking-mega" style={{ color: t.accent }}>THE LUXURY EDIT</p>
          <h2 className="display text-3xl md:text-5xl mt-2">Plates, poured.</h2>
        </div>
        <div className="flex gap-2 shrink-0">
          <button type="button" onClick={() => slide(-1)} aria-label="Previous plate" className="inline-flex h-11 w-11 items-center justify-center rounded-full border text-xl transition-opacity hover:opacity-70" style={{ borderColor: t.soft, color: t.ink }}>‹</button>
          <button type="button" onClick={() => slide(1)} aria-label="Next plate" className="inline-flex h-11 w-11 items-center justify-center rounded-full border text-xl transition-opacity hover:opacity-70" style={{ borderColor: t.soft, color: t.ink }}>›</button>
        </div>
      </div>
      <div ref={trackRef} className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory px-5 md:px-10 pb-2">
        {items.map((it, k) => (
          <article
            key={it.src}
            className="snap-start shrink-0 w-[76vw] sm:w-[46vw] lg:w-[31%] rounded-2xl overflow-hidden border"
            style={{ background: "#16294D", borderColor: "rgba(201,168,106,.35)" }}
          >
            <button onClick={(e) => onAt(e, k + 1)} aria-label={`Open plate ${k + 1} of ${items.length} — ${it.title}`} className="block w-full text-left">
              <Photo src={it.src} label={it.title.toUpperCase()} palette={it.palette} className="h-[30vh] md:h-[36vh]" sizes="(max-width: 1024px) 76vw, 31vw" />
            </button>
            <div className="p-5 md:p-6">
              <p className="text-[10px] tracking-[0.22em]" style={{ color: t.accent }}>{it.no} · {it.meta.toUpperCase()}</p>
              <h3 className="display text-2xl md:text-[1.7rem] leading-tight mt-2" style={{ color: "#EFE6D2" }}>{it.title}</h3>
              <dl className="mt-4">
                {it.facts.map(([k2, v]) => (
                  <div key={k2} className="flex items-center justify-between py-2 border-t text-xs" style={{ borderColor: "rgba(239,230,210,.14)" }}>
                    <dt className="tracking-[0.2em] opacity-60" style={{ color: "#EFE6D2" }}>{k2}</dt>
                    <dd style={{ color: "#EFE6D2" }}>{v}</dd>
                  </div>
                ))}
                <div className="flex items-center justify-between py-2 border-t border-b text-xs" style={{ borderColor: "rgba(239,230,210,.14)" }}>
                  <dt className="tracking-[0.2em] opacity-60" style={{ color: "#EFE6D2" }}>FINISH</dt>
                  <dd className="flex gap-1.5">
                    {it.palette.map((c) => (
                      <span key={c} aria-hidden="true" className="h-3.5 w-3.5 rounded-full border border-black/30" style={{ background: c }} />
                    ))}
                  </dd>
                </div>
              </dl>
              <Link to={`/story/${it.id}`} className="inline-block mt-4 text-[11px] tracking-[0.25em] border-b pb-1" style={{ borderColor: t.accent, color: t.accent }}>VIEW STORY →</Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function WorldGallery({ gallery, stories, layout, onAt }) {
  const stagger = layout.gallery === "stagger";
  const wide = layout.gallery === "wide";
  const even = layout.gallery === "even";
  const rotate = layout.rotateItems === true;
  return (
    <div className="px-5 md:px-10 pt-14">
      <p className="text-[11px] tracking-mega opacity-60 mb-4">FROM THIS WORLD — TAP TO EXPAND</p>
      <div className={`grid grid-cols-2 ${even ? "md:grid-cols-2" : "md:grid-cols-3"} gap-3 md:gap-4`}>
        {gallery.slice(1).map((g, k) => (
          <RevealMask
            key={g.src + k}
            from={k % 2 ? "right" : "left"}
            className={`${stagger && k % 2 ? "md:mt-14" : ""} ${wide && k === 0 ? "col-span-2 md:col-span-3" : ""} ${rotate ? (k % 2 ? "md:rotate-1" : "md:-rotate-1") : ""}`}
          >
            <button onClick={(e) => onAt(e, k + 1)} aria-label={`Open photograph ${k + 2} of ${gallery.length} — ${g.title}`} className="block w-full text-left">
              <Photo
                src={g.src}
                label={g.title.toUpperCase()}
                palette={stories[k % stories.length]?.palette}
                className={wide && k === 0 ? "h-[34vh] md:h-[50vh]" : even ? "h-[30vh] md:h-[44vh]" : "h-[26vh] md:h-[34vh]"}
              />
            </button>
          </RevealMask>
        ))}
      </div>
    </div>
  );
}

export function Worlds() {
  return (
    <main className="bg-[#F4EDDE] text-[#1F2C46] pt-28 md:pt-32" id="main" tabIndex={-1}>
      <div className="px-5 md:px-10 py-10">
        <p className="text-xs tracking-mega text-[#E76B46]">EIGHT WORLDS · CHOOSE ONE TO ENTER</p>
        <h1 className="display text-6xl md:text-9xl leading-[0.9]">Eight<br /><span className="italic text-[#E76B46]">worlds.</span></h1>
      </div>
      {WORLDS.map((w, i) => {
        const stories = STORIES.filter((s) => s.world === w.slug);
        return (
          <Link key={w.slug} to={`/world/${w.slug}`} className="block border-t border-line/10 group">
            <div className="grid md:grid-cols-12 gap-0 items-stretch">
              <div className="md:col-span-7">
                <RevealMask from={i % 2 ? "right" : "left"}>
                  <Photo src={w.photo} label={w.name.toUpperCase()} palette={w.fallback} className={`h-[42vh] md:h-[62vh] ${i % 3 === 1 ? "md:ml-16" : ""} ${i % 3 === 2 ? "md:mr-16" : ""}`} />
                </RevealMask>
              </div>
              <div className="md:col-span-5 p-6 md:p-12 flex flex-col justify-center">
                <p className="display text-8xl text-[#1F2C46]/10 leading-none">0{i + 1}</p>
                <h2 className="display text-5xl md:text-7xl -mt-6 group-hover:text-[#E76B46] transition-colors">{w.name}</h2>
                <p className="text-[#1F2C46]/65 mt-2 text-sm tracking-widest">{w.note.toUpperCase()}</p>
                <p className="mt-4 text-sm">{stories.length ? `${stories.length} stor${stories.length > 1 ? "ies" : "y"} inside` : "Portfolio plates inside"} →</p>
              </div>
            </div>
          </Link>
        );
      })}
      <Footer />
    </main>
  );
}

function ImmersiveHero({ w, t, count }) {
  return (
    <div className="relative">
      <Photo src={w.photo} label={w.name.toUpperCase() + " WORLD"} palette={w.fallback} className="h-[88vh] md:h-[96vh]" eager sizes="100vw" />
      <nav aria-label="Breadcrumb" className="absolute top-0 inset-x-0 px-5 md:px-10 pt-[76px] md:pt-[88px] text-[11px] tracking-mega text-bone/80">
        <Link to="/worlds" className="hover:underline underline-offset-4">WORLDS</Link>
        <span aria-hidden="true"> › </span>
        <span aria-current="page">{w.name.toUpperCase()}</span>
      </nav>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent px-5 md:px-10 pb-8 pt-28">
        <p className="text-[11px] tracking-mega" style={{ color: t.accent }}>{w.note.toUpperCase()}</p>
        <h1 className="display text-bone leading-[0.85] text-[16vw] md:text-[9vw]">{w.name}<span style={{ color: t.accent }}>.</span></h1>
        <p className="mt-3 text-[11px] tracking-mega text-bone/75">{count} STORIES INSIDE THIS WORLD</p>
      </div>
    </div>
  );
}

function SplitHead({ w, t, layout, count }) {
  return (
    <div className="grid md:grid-cols-2">
      <div className="relative overflow-hidden px-5 md:px-10 py-10 md:py-14 flex flex-col justify-center">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <WorldDeco motif={layout.motif} color={t.accent} />
        </div>
        <div className="relative">
          <p className="text-xs tracking-mega" style={{ color: t.accent }}>{w.note.toUpperCase()}</p>
          <h1 className="display leading-[0.85] text-[13vw] md:text-[6vw]">{w.name}<span style={{ color: t.accent }}>.</span></h1>
          <div className="mt-5 flex items-center gap-2" aria-label={`${w.name} palette`}>
            {w.fallback.map((c) => (
              <span key={c} aria-hidden="true" className="h-4 w-4 rounded-[4px] border border-black/20" style={{ background: c }} />
            ))}
          </div>
          <p className="mt-5 text-sm opacity-70 max-w-sm">{count} stor{count === 1 ? "y" : "ies"} inside this world — tap any plate to expand it.</p>
          <Link to={`/begin?world=${w.slug}`} className="inline-block mt-5 text-xs tracking-mega border-b pb-1" style={{ borderColor: t.accent }}>START A PROJECT →</Link>
        </div>
      </div>
      <div className="relative min-h-[52vh] md:min-h-[74vh]">
        <Photo src={w.photo} label={w.name.toUpperCase() + " WORLD"} palette={w.fallback} className="absolute inset-0 h-full" eager sizes="(max-width: 768px) 100vw, 50vw" />
      </div>
    </div>
  );
}

export function WorldDetail({ slug }) {
  const [lb, setLb] = useState(null);
  const openerRef = useRef(null);
  const w = WORLDS.find((x) => x.slug === slug);
  if (!w) return <NotFound />;
  const stories = STORIES.filter((s) => s.world === w.slug);
  const gallery = stories.flatMap((s) => s.images.map((src) => ({ src, title: s.title })));
  const plates = stories.flatMap((s) =>
    s.images.map((src, ii) => ({
      src,
      title: s.title,
      meta: s.meta,
      id: s.id,
      no: `${String(ii + 1).padStart(2, "0")} / ${String(s.images.length).padStart(2, "0")}`,
      palette: s.palette,
      facts: [["TYPE", s.type], ["AREA", s.area]].filter(([, v]) => v),
    }))
  );
  const openAt = (e, n) => {
    openerRef.current = e.currentTarget;
    setLb(n);
  };
  const t = WORLD_THEMES[w.slug] ?? WORLD_THEMES.contemporary;
  const L = WORLD_LAYOUTS[w.slug] ?? WORLD_LAYOUTS.contemporary;
  return (
    <main className={L.composition === "immersive" ? "relative" : "relative pt-28 md:pt-32"} style={{ background: t.bg, color: t.ink, ...(t.weave ? { backgroundImage: MAT_WEAVE } : null) }} id="main" tabIndex={-1}>
      {w.slug === "art-deco" && (
        <div className="pointer-events-none absolute inset-4 md:inset-6 z-30" aria-hidden="true" style={{ color: "#9E2A1F" }}>
          <div className="absolute inset-0 border-[10px] border-current md:border-[12px]" />
          <div className="absolute inset-3 border-2 border-current opacity-80" />
          <FretCorner className="absolute -top-3 -left-3 h-20 w-20 md:h-28 md:w-28" />
          <FretCorner className="absolute -top-3 -right-3 h-20 w-20 rotate-90 md:h-28 md:w-28" />
          <FretCorner className="absolute -bottom-3 -right-3 h-20 w-20 rotate-180 md:h-28 md:w-28" />
          <FretCorner className="absolute -bottom-3 -left-3 h-20 w-20 -rotate-90 md:h-28 md:w-28" />
        </div>
      )}
      {L.composition === "immersive" ? (
        <ImmersiveHero w={w} t={t} count={stories.length} />
      ) : (
        <>
          <nav aria-label="Breadcrumb" className="px-5 md:px-10 pt-6 text-[11px] tracking-mega opacity-60">
            <Link to="/worlds">WORLDS</Link>
            <span aria-hidden="true"> › </span>
            <span aria-current="page">{w.name.toUpperCase()}</span>
          </nav>
          {L.composition === "split" ? (
            <SplitHead w={w} t={t} layout={L} count={stories.length} />
          ) : (
            <>
              {w.slug === "traditional" ? (
                <FolkTraditional w={w} t={t} />
              ) : (
                <WorldHeader w={w} t={t} layout={L} />
              )}
              <WorldHero w={w} t={t} layout={L} gallery={gallery} count={stories.length} />
            </>
          )}
        </>
      )}
      {gallery.length > 1 &&
        (w.slug === "luxury" ? (
          <LuxuryCarousel items={plates} t={t} onAt={openAt} />
        ) : (
          <WorldGallery gallery={gallery} stories={stories} layout={L} onAt={openAt} />
        ))}
      <div className="px-5 md:px-10 py-16">
        {stories.map((s, i) => (
          <Link key={s.id} to={`/story/${s.id}`} className="grid md:grid-cols-12 gap-6 py-10 border-t group" style={{ borderColor: t.soft }}>
            <span className="display text-6xl md:col-span-2" style={{ color: t.ink, opacity: 0.16 }}>{s.no}</span>
            <div className="md:col-span-6">
              <Photo src={s.images[0]} label={s.title.toUpperCase()} palette={s.palette} className={`h-[40vh] md:h-[52vh] ${i % 2 ? "md:ml-10" : "md:mr-10"}`} />
            </div>
            <div className="md:col-span-4 flex flex-col justify-end">
              <p className="text-xs tracking-mega" style={{ color: t.accent }}>{s.meta.toUpperCase()}</p>
              <h2 className="display text-3xl md:text-5xl group-hover:translate-x-2 transition-transform">{s.title}</h2>
              <span className="mt-3 text-sm tracking-widest">OPEN →</span>
            </div>
          </Link>
        ))}
        <div className="mt-14">
          <p className="text-[11px] tracking-mega opacity-60 mb-4">MORE WORLDS</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
            {WORLDS.map((o) => {
              const active = o.slug === w.slug;
              return (
                <Link
                  key={o.slug}
                  to={`/world/${o.slug}`}
                  aria-current={active ? "page" : undefined}
                  style={active ? { background: t.accent, borderColor: t.accent, color: t.ink } : { borderColor: t.soft, color: t.ink }}
                  className="border px-4 py-3 min-h-[52px] flex items-center justify-between gap-2 text-xs tracking-mega transition-opacity hover:opacity-75"
                >
                  <span>{o.name.toUpperCase()}</span>
                  <span aria-hidden="true">{active ? "●" : "→"}</span>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <Link to="/worlds" className="inline-flex items-center justify-center border px-7 py-3.5 min-h-[52px] text-xs tracking-mega transition-opacity hover:opacity-75" style={{ borderColor: t.soft, color: t.ink }}>← ALL WORLDS</Link>
          <Link to={`/begin?world=${w.slug}`} className="inline-flex items-center justify-center px-7 py-3.5 min-h-[52px] text-xs tracking-mega transition-opacity hover:opacity-85" style={{ background: t.accent, color: t.ink }}>START A PROJECT →</Link>
        </div>
        {w.slug === "art-deco" && <div className="h-20 md:h-24" aria-hidden="true" />}
      </div>
      <Lightbox images={gallery.map((g) => g.src)} index={lb} label={`${w.name} — world gallery`} close={() => setLb(null)} setIndex={setLb} openerRef={openerRef} />
    </main>
  );
}
