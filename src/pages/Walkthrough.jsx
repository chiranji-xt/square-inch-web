import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useInView } from "framer-motion";
import Photo from "../components/Photo.jsx";
import InchLens from "../components/InchLens.jsx";
import Spotlight from "../components/Spotlight.jsx";
import StoriesScroll from "../components/StoriesScroll.jsx";
import Footer from "../components/Footer.jsx";
import { Cinematic, RevealMask } from "../components/motion.jsx";
import { PROCESS, WORLDS } from "../data/site.js";

let heroSeen = false;

function Hero() {
  const [done, setDone] = useState(() => {
    try {
      if (sessionStorage.getItem("sid-intro") === "1") return true;
    } catch {
      /* private mode */
    }
    return heroSeen;
  });
  const [quick] = useState(done);
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = "/photos/luxury-01.webp";
    document.head.appendChild(link);
    return () => {
      link.remove();
    };
  }, []);
  const finish = () => {
    setDone(true);
    heroSeen = true;
    try {
      sessionStorage.setItem("sid-intro", "1");
    } catch {
      /* private mode */
    }
  };

  return (
    <section data-room="0" data-room-label="Enter" className="relative bg-ink w-full p-2.5 sm:p-4 md:p-5">
      <div className="relative overflow-hidden rounded-[22px] md:rounded-[28px] grid md:grid-cols-[3fr_7fr] min-h-[calc(100svh-1.25rem)] sm:min-h-[calc(100svh-2rem)] md:min-h-[calc(100svh-2.5rem)] isolate border border-bone/10">
      {!done && (
        <motion.div onAnimationComplete={finish} initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ delay: 0.45, duration: 0.4 }} className="absolute inset-0 z-50 bg-ink flex items-center justify-center">
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.45, ease: "easeInOut" }} className="flex items-center gap-3 origin-left">
            <span className="h-6 w-6 bg-accent inline-block" />
            <span className="tracking-[0.4em] text-sm text-bone">SQUARE INCH</span>
          </motion.div>
        </motion.div>
      )}

      {/* ONE ARTWORK — sofa photo full-bleed underneath everything */}
      <div className="absolute inset-0">
        <Cinematic scale={1.06} className="w-full h-full">
          <Photo
            src="/photos/luxury-01.webp"
            label="Grey sofa with brass arc lamp — Square Inch interior"
            palette={["#0E1E3A", "#C9A86A"]}
            className="w-full h-full"
            imgClass="object-cover saturate-[1.06]"
            eager
            priority
            sizes="100vw"
          />
        </Cinematic>
      </div>

      {/* LEFT — ink editorial panel with a sculpted arc cutout (desktop) */}
      <div className="relative z-20 flex flex-col justify-center px-6 md:px-12 pt-24 md:pt-28 pb-10 min-h-[70svh] md:min-h-auto">
        {/* panel background: solid on mobile, arc-cutout mask on desktop */}
        {/* beige panel — only the lockup sits on orange */}
        <div aria-hidden="true" className="absolute inset-0 bg-sand" />
        <div className="relative">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: quick ? 0 : 0.65, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 text-[11px] md:text-xs tracking-[0.22em] uppercase text-ink font-semibold"
          >
            <span aria-hidden="true" className="h-2.5 w-2.5 bg-ink inline-block shrink-0 mt-1.5" />
            <span>
              <span className="block">Interior design studio</span>
              <span className="block text-[#1E3A8A]">Pune · Satara</span>
            </span>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: quick ? 0 : 0.55, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-fit max-w-full mt-12 md:mt-16 bg-accent px-7 py-8 md:px-10 md:py-10"
          >
            <div aria-hidden="true" className="absolute -top-8 md:-top-10 right-3 md:right-4 flex gap-2 pointer-events-none">
              <span className="block w-2.5 h-10 md:w-3 md:h-12 bg-ink -skew-x-[18deg]" />
              <span className="block w-2.5 h-10 md:w-3 md:h-12 bg-ink -skew-x-[18deg]" />
            </div>
            <div aria-hidden="true" className="absolute -bottom-8 md:-bottom-10 left-3 md:left-4 flex gap-2 pointer-events-none">
              <span className="block w-2.5 h-10 md:w-3 md:h-12 bg-ink -skew-x-[18deg]" />
              <span className="block w-2.5 h-10 md:w-3 md:h-12 bg-ink -skew-x-[18deg]" />
            </div>
            <h1 aria-label="Every Inch Speaks." className="display text-bone leading-[1.02] text-[15vw] md:text-[4.4vw]">
            <span aria-hidden="true">
              <motion.span
                initial={{ opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: quick ? 0 : 0.75, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="block font-light"
              >
                Every
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: quick ? 0 : 0.85, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="block font-light italic text-ink"
              >
                Inch
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: quick ? 0 : 0.95, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="block font-light"
              >
                Speaks.
              </motion.span>
            </span>
            </h1>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: quick ? 0 : 1.1, duration: 0.7 }}
          className="relative mt-8 md:mt-10 max-w-[340px]"
        >
          <div aria-hidden="true" className="h-px w-full bg-ink/25" />
          <p className="mt-5 text-[13px] md:text-[15px] leading-relaxed text-ink/80">
            Twenty years of residential and commercial interiors — crafted across Pune and Satara, down to the last inch.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link to="/worlds" className="pointer-events-auto inline-flex items-center gap-3 border border-ink/50 px-6 py-3 text-[10px] md:text-xs tracking-[0.25em] uppercase text-ink transition-colors hover:bg-ink hover:text-bone">
              Explore the worlds
              <span aria-hidden="true">→</span>
            </Link>
            <span className="text-[10px] tracking-mega text-ink/60">01 / 08</span>
          </div>
        </motion.div>
      </div>

      {/* RIGHT — overlays floating on the photo, same chip language */}
      <div className="relative z-10 min-h-[58svh] md:min-h-auto">
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-ink/20 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 px-5 md:px-7 pb-5 md:pb-7 flex items-end justify-between gap-3">
          <div className="bg-ink/55 backdrop-blur border border-bone/25 px-4 py-3">
            <p className="text-[9px] tracking-[0.3em] uppercase text-bone/60">Now showing</p>
            <p className="display text-lg md:text-xl leading-tight mt-1 text-bone">Grey sofa lounge — brass arc light</p>
          </div>
          <div className="hidden sm:flex flex-col items-center gap-2">
            <span className="text-[9px] tracking-mega text-bone/85">SCROLL</span>
            <span aria-hidden="true" className="w-[2px] h-9 bg-accent" />
          </div>
        </div>
      </div>

      {/* one continuous eyebrow across the whole artwork */}
          {/* studio label lives in the eyebrow on the beige — no duplicate up top */}
      <div className="absolute top-16 md:top-[74px] right-5 md:right-7 z-30 hidden md:block text-[10px] tracking-[0.3em] uppercase text-bone drop-shadow-md pointer-events-none">
        <span>People · Places · Possibilities</span>
      </div>
      </div>
    </section>
  );
}

function Twenty() {
  return (
    <section data-room="1" data-room-label="Twenty years" className="bg-[#EEE7D6] text-ink px-5 md:px-10 pt-14 md:pt-20 pb-16 md:pb-24 overflow-hidden">
      <p className="text-[10px] md:text-[11px] tracking-mega text-accent">ROOM 02 — TWENTY YEARS · WHY WE ENDURE</p>
      <div className="grid md:grid-cols-12 gap-10 md:gap-6 mt-6 md:mt-10">
        {/* LEFT — editorial type */}
        <div className="md:col-span-5 flex flex-col">
          <RevealMask from="bottom">
            <p className="display font-medium leading-[0.8] text-[54vw] md:text-[18vw] text-[#161310]">
              20<span className="text-accent text-[10vw] md:text-[3.2vw] align-top ml-2 md:ml-3 tracking-tight">YRS</span>
            </p>
          </RevealMask>
          <h2 className="display text-[9.5vw] md:text-[2.75vw] leading-[1.04] mt-4 md:mt-6 text-[#161310]">
            OF CRAFTING SPACES<br />THAT HOLD TIME.
          </h2>
          <p className="mt-4 md:mt-5 text-sm md:text-[15px] leading-relaxed text-ink/60 max-w-sm">
            Two decades of thoughtful design, honest materials and spaces that feel as good as they look.
          </p>
          <div className="mt-7 md:mt-9 flex items-center gap-5">
            <Link to="/studio" aria-label="Explore our journey — the studio" className="inline-flex h-12 w-12 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-full border border-ink/40 text-ink transition-colors hover:border-accent hover:text-accent">
              <span aria-hidden="true">→</span>
            </Link>
            <Link to="/studio" className="text-[10px] md:text-[11px] tracking-[0.25em] text-ink/75 transition-colors hover:text-accent">EXPLORE OUR JOURNEY</Link>
          </div>
          <div className="mt-8 md:mt-10 border-t border-ink/15 pt-6 max-w-md">
            <p className="text-sm md:text-[15px] leading-relaxed text-ink/65">Creativity with functionality. Residential + commercial, across Pune and Satara. Client taste first — satisfaction as the cornerstone.</p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[["20", "YRS OF PRACTICE"], ["08", "DESIGN WORLDS"], ["01", "IIID AWARD"]].map(([n, l]) => (
                <div key={l}>
                  <p className="display text-3xl md:text-4xl text-[#161310]">{n}</p>
                  <p className="text-[10px] tracking-mega text-ink/55 mt-1">{l}</p>
                </div>
              ))}
            </div>
            <Link to="/studio" className="inline-block mt-6 border-b border-accent pb-1 tracking-widest text-sm text-ink hover:text-accent transition-colors">THE STUDIO →</Link>
          </div>
        </div>

        {/* RIGHT — arch collage */}
        <div className="md:col-span-7 relative min-h-[72svh] md:min-h-[80vh]">
          {/* main arch */}
          <div className="absolute left-0 top-0 w-[62%] md:w-[44%] h-[86%] md:h-[94%] overflow-hidden rounded-t-[999px]">
            <Cinematic className="h-full">
              <Photo src="/photos/traditional-01.webp" label="COURTYARD HOUSE" palette={["#4A5E3A", "#D9C9A3"]} className="h-full" sizes="(max-width: 768px) 62vw, 35vw" />
            </Cinematic>
            <div className="absolute top-6 md:top-10 right-4 md:right-6 text-right">
              <p className="text-[9px] md:text-[10px] tracking-[0.25em] leading-[1.9] text-bone drop-shadow-md">SPACES<br />PEOPLE<br />BELONG<br />TO</p>
              <span aria-hidden="true" className="block mt-2 h-px w-10 md:w-14 bg-bone/70 ml-auto" />
            </div>
          </div>
          {/* tall sunlit strip */}
          <div className="absolute right-0 md:right-auto md:left-[40%] top-[8%] md:top-[5%] w-[34%] md:w-[29%] h-[68%] md:h-[82%] overflow-hidden">
            <Cinematic className="h-full">
              <Photo src="/photos/luxury-02.webp" label="STONE AND GILDED LIGHT" palette={["#0E1E3A", "#C9A86A"]} className="h-full" sizes="(max-width: 768px) 34vw, 25vw" />
            </Cinematic>
          </div>
          {/* dark texture chip */}
          <div className="absolute left-[52%] md:left-[55%] bottom-[2%] md:bottom-[4%] w-[30%] md:w-[19%] h-[24%] md:h-[26%] overflow-hidden border-[5px] md:border-[7px] border-[#EEE7D6]">
            <Photo src="/photos/rustic-01.webp" label="RUSTIC NIGHT" palette={["#101418", "#2E4A6B"]} className="h-full" sizes="(max-width: 768px) 30vw, 18vw" />
          </div>
          {/* beige detail card */}
          <div className="hidden md:flex absolute right-0 top-[16%] w-[24%] flex-col">
            <p className="text-[10px] tracking-[0.25em] leading-[2] text-ink/55">DESIGN<br />MATERIAL<br />PEOPLE<br />PLACE</p>
            <div className="mt-6 overflow-hidden">
              <Photo src="/photos/artdeco-01.webp" label="STUDIO DETAIL" palette={["#3A3A38", "#C9BFAE"]} className="h-[30vh]" sizes="20vw" />
            </div>
            <div className="mt-6 flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-10 bg-ink/40" />
              <p className="display leading-none text-6xl text-transparent" style={{ WebkitTextStroke: "1px rgba(22,19,16,.8)" }}>20</p>
              <p className="text-[9px] tracking-[0.25em] leading-[2] text-ink/55">YEARS<br />STORIES<br />SPACES<br />AHEAD</p>
            </div>
          </div>
          <p className="absolute bottom-0 right-1 md:right-2 text-[10px] tracking-mega text-ink/50">01 / 04</p>
        </div>
      </div>
    </section>
  );
}

function Strip() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0 });
  const row = (hidden) =>
    [...WORLDS, ...WORLDS].map((w, i) => {
      const dup = hidden || i >= WORLDS.length;
      const inner = (<>
        <span className={i % 2 ? "outline-bone" : ""}>{w.name.toUpperCase()}</span>
        <span className="h-3 w-3 bg-accent inline-block rotate-45" aria-hidden="true" />
      </>);
      return dup ? (
        <span key={w.slug + i} aria-hidden="true" className="flex items-center gap-10">{inner}</span>
      ) : (
        <Link key={w.slug} to={`/world/${w.slug}`} aria-label={`Explore ${w.name} interiors`} className="flex items-center gap-10 hover:text-accent transition-colors">{inner}</Link>
      );
    });
  // Reduced motion: a static row, no JS animation at all.
  if (reduce) {
    return (
      <section aria-label="Design worlds" className="bg-ink text-bone overflow-hidden py-10 border-y border-bone/10">
        <div className="flex whitespace-nowrap gap-10 display text-4xl md:text-6xl overflow-x-auto no-scrollbar">{row(false).slice(0, WORLDS.length)}</div>
      </section>
    );
  }
  return (
    <section ref={ref} aria-label="Design worlds" className="bg-ink text-bone overflow-hidden py-10 border-y border-bone/10">
      <motion.div animate={inView ? { x: ["0%", "-50%"] } : { x: "0%" }} transition={{ repeat: Infinity, duration: 28, ease: "linear" }} className="flex whitespace-nowrap gap-10 pr-10 display text-4xl md:text-6xl">
        {row(false)}
      </motion.div>
    </section>
  );
}

function FeaturedStories() {
  return <StoriesScroll />;
}

function StepIcon({ i, className = "" }) {
  const size = "h-20 w-20 md:h-28 md:w-28 shrink-0";
  const line = "fill-none stroke-current";
  switch (i % 6) {
    case 0: // enquiry — document + pencil
      return (
        <svg viewBox="0 0 80 80" className={`${size} ${className}`} aria-hidden="true">
          <circle cx="40" cy="40" r="33" className="fill-ink/[0.06]" stroke="none" />
          <rect x="25" y="15" width="25" height="37" className={`${line} text-ink`} strokeWidth="2" />
          <line x1="30" y1="25" x2="45" y2="25" className="stroke-current text-ink" strokeWidth="2" />
          <line x1="30" y1="31" x2="45" y2="31" className="stroke-current text-ink" strokeWidth="2" />
          <line x1="30" y1="37" x2="40" y2="37" className="stroke-current text-ink" strokeWidth="2" />
          <line x1="44" y1="52" x2="58" y2="34" className="stroke-current text-ink" strokeWidth="2.5" />
          <rect x="52" y="56" width="9" height="9" className="fill-accent" stroke="none" />
        </svg>
      );
    case 1: // initial meeting — conversation
      return (
        <svg viewBox="0 0 80 80" className={`${size} ${className}`} aria-hidden="true">
          <circle cx="40" cy="40" r="33" className="fill-ink/[0.06]" stroke="none" />
          <circle cx="46" cy="52" r="11" className="fill-accent" stroke="none" opacity="0.85" />
          <path d="M22 28 h24 v14 h-14 l-6 6 v-6 h-4 Z" className={`${line} text-ink`} strokeWidth="2" />
          <circle cx="30" cy="35" r="1.4" className="fill-current text-ink" stroke="none" />
          <circle cx="35" cy="35" r="1.4" className="fill-current text-ink" stroke="none" />
          <circle cx="40" cy="35" r="1.4" className="fill-current text-ink" stroke="none" />
          <circle cx="52" cy="46" r="10" className={`${line} text-ink`} strokeWidth="2" />
        </svg>
      );
    case 2: // basic plan — floor plan
      return (
        <svg viewBox="0 0 80 80" className={`${size} ${className}`} aria-hidden="true">
          <circle cx="40" cy="40" r="33" className="fill-ink/[0.06]" stroke="none" />
          <rect x="22" y="24" width="30" height="30" className={`${line} text-ink`} strokeWidth="2" />
          <line x1="37" y1="24" x2="37" y2="42" className="stroke-current text-ink" strokeWidth="1.5" strokeDasharray="3 2" />
          <path d="M37 54 A8 8 0 0 1 45 46" className={`${line} text-ink`} strokeWidth="1.5" />
          <rect x="50" y="20" width="9" height="9" className="fill-accent" stroke="none" />
          <rect x="18" y="56" width="9" height="9" className="fill-accent" stroke="none" />
        </svg>
      );
    case 3: // technical meeting — compass + ruler
      return (
        <svg viewBox="0 0 80 80" className={`${size} ${className}`} aria-hidden="true">
          <circle cx="46" cy="34" r="13" className="fill-accent" stroke="none" opacity="0.85" />
          <circle cx="36" cy="28" r="3.5" className={`${line} text-ink`} strokeWidth="2" />
          <line x1="34" y1="31" x2="26" y2="58" className="stroke-current text-ink" strokeWidth="2" />
          <line x1="38" y1="31" x2="46" y2="56" className="stroke-current text-ink" strokeWidth="2" />
          <rect x="40" y="54" width="26" height="9" transform="rotate(-18 40 54)" className={`${line} text-ink`} strokeWidth="2" />
        </svg>
      );
    case 4: // material selection — swatches
      return (
        <svg viewBox="0 0 80 80" className={`${size} ${className}`} aria-hidden="true">
          <rect x="20" y="18" width="24" height="30" className={`${line} text-ink`} strokeWidth="2" />
          <path d="M24 24 C30 30 26 36 32 42" className={`${line} text-ink`} strokeWidth="1.5" />
          <rect x="34" y="28" width="22" height="28" className="fill-ink/10 stroke-current text-ink" strokeWidth="2" />
          <circle cx="42" cy="38" r="1.4" className="fill-current text-ink" stroke="none" />
          <circle cx="48" cy="46" r="1.4" className="fill-current text-ink" stroke="none" />
          <rect x="48" y="44" width="14" height="14" className="fill-accent" stroke="none" />
        </svg>
      );
    default: // finalization — approved check
      return (
        <svg viewBox="0 0 80 80" className={`${size} ${className}`} aria-hidden="true">
          <circle cx="40" cy="40" r="33" className="fill-ink/[0.06]" stroke="none" />
          <circle cx="50" cy="52" r="12" className="fill-accent" stroke="none" opacity="0.85" />
          <rect x="22" y="22" width="30" height="30" className={`${line} text-ink`} strokeWidth="2" />
          <path d="M30 38 l6 6 l11 -13" className={`${line} text-ink`} strokeWidth="2.5" />
        </svg>
      );
  }
}

function ProcessTease() {
  return (
    <section data-room="4" data-room-label="How we build" className="bg-[#EEE7D6] text-ink px-5 md:px-10 py-12 md:py-16 border-t border-ink/10 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <p className="text-[10px] md:text-[11px] tracking-mega text-accent">ROOM 05 — HOW WE BUILD</p>
          <h2 className="display leading-[0.95] text-5xl md:text-6xl mt-3 text-[#161310]">
            <span className="font-medium">How we </span>
            <span className="font-medium italic text-accent">build.</span>
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
          <p className="text-sm md:text-[15px] leading-relaxed text-ink/60 max-w-xs">
            Six thoughtful steps that turn your vision into spaces that hold time.
          </p>
          <Link to="/how-we-build" className="w-fit shrink-0 border border-ink/40 px-7 py-3 text-[10px] md:text-[11px] tracking-[0.25em] text-ink transition-colors hover:border-accent hover:text-accent">
            FOLLOW THE LINE <span aria-hidden="true" className="ml-2">→</span>
          </Link>
        </div>
      </div>

        <div className="relative overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory md:snap-none -mx-5 px-5 md:mx-0 md:px-0">
          <div className="relative flex md:grid md:grid-cols-6 gap-8 md:gap-2 w-max md:w-full">
            <div aria-hidden="true" className="absolute left-0 right-0 top-1/2 h-px bg-ink/25 md:hidden" />
            <svg className="absolute left-0 right-0 top-1/2 -translate-y-1/2 hidden md:block h-20 w-full" viewBox="0 0 600 100" preserveAspectRatio="none" aria-hidden="true">
              <path
                d="M-10,50 Q30,18 50,50 T150,50 T250,50 T350,50 T450,50 T550,50 T630,50"
                fill="none"
                stroke="rgba(27,26,24,.4)"
                strokeWidth="1.2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          {PROCESS.map((p, i) => {
            const above = i % 2 === 0;
            const body = (
              <>
                <span className="relative">
                  <span aria-hidden="true" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 md:h-28 md:w-28 rounded-full bg-ink/[0.05]" />
                  <span aria-hidden="true" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-px w-24 md:w-32 bg-ink/20" />
                  <span aria-hidden="true" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 md:h-28 w-px bg-ink/20" />
                  <StepIcon i={i} className="relative" />
                  <span aria-hidden="true" className="absolute -left-1 -top-1 h-2.5 w-2.5 bg-accent" />
                </span>
                <p className="display text-2xl md:text-[26px] leading-none text-[#161310] mt-4">
                  {p.n}
                </p>
                <p className="mt-2 text-[10px] tracking-[0.18em] font-medium">{p.t.toUpperCase()}</p>
                <p className="mt-1.5 max-w-[190px] text-[11px] leading-relaxed text-ink/55">{p.d}</p>
              </>
            );
            return (
              <div key={p.n} className="relative w-[208px] md:w-auto shrink-0 snap-start grid grid-rows-[1fr_auto_1fr]">
                <div className={above ? "flex flex-col items-center justify-end text-center pb-6" : ""}>
                  {above ? body : null}
                </div>
                <div className="flex justify-center py-1">
                  <span aria-hidden="true" className="rounded-full border border-ink/50 bg-[#EEE7D6] p-[3px]">
                    <span className="block h-2.5 w-2.5 rounded-full bg-accent" />
                  </span>
                </div>
                <div className={above ? "" : "flex flex-col items-center justify-start text-center pt-6"}>
                  {above ? null : body}
                </div>
              </div>
            );
          })}
          </div>
        </div>
    </section>
  );
}

function Award() {
  const slides = [
    { src: "/photos/award-01.webp", title: "Runner Up.", meta: "01 · IIID 2016 ANCHOR AWARD · THE CERTIFICATE", sub: "Zone Z2 Regional Awards — Commercial Workspace, Small. Presented to Square Inch Design.", tag: "ACHIEVEMENT — CERTIFICATE", to: "/studio", cta: "READ THE STORY", palette: ["#111", "#E88932"] },
    { src: "/photos/award-03.webp", title: "Honoured.", meta: "02 · NATIONAL STAGE · ANCHOR BY PANASONIC", sub: "Instituted by the Institute of Indian Interior Designers — design excellence, recognised.", tag: "ACHIEVEMENT — THE HONOUR", to: "/studio", cta: "READ THE STORY", palette: ["#111", "#C9A86A"] },
    { src: "/photos/studio-01.webp", title: "The Space That Won.", meta: "03 · 1055 SQ FT STUDIO · SATARA", sub: "Free-flowing plan with no partitions. Timber stair to an attic library. Honest local material.", tag: "ACHIEVEMENT — THE WINNING SPACE", to: "/studio", cta: "READ THE STORY", palette: ["#3A3A38", "#C9BFAE"] },
    { src: "/photos/award-04.webp", title: "Local Flavour.", meta: "04 · JURY NOTE · HONEST MATERIALS", sub: "“Compact and friendly planning with an honest use of natural materials. A nice local flavour.”", tag: "ACHIEVEMENT — JURY NOTE", to: "/studio", cta: "READ THE STORY", palette: ["#2B2E33", "#E8E4DA"] },
  ];
  return (
    <section data-room="5" data-room-label="Recognition" className="bg-night text-bone">
      <div className="px-5 md:px-10 pt-20 pb-6 flex items-end gap-4 md:gap-6">
        <span className="h-4 w-4 bg-accent inline-block mb-2 md:mb-3 shrink-0" />
        <p className="display leading-none text-6xl md:text-8xl">2016</p>
        <div className="pb-1 md:pb-2">
          <p className="text-accent text-[11px] tracking-mega">ROOM 06 — RECOGNITION</p>
          <p className="text-bone/70 text-sm mt-1 max-w-md">An IIID regional award, earned by the Satara studio — recognised for honest local material.</p>
        </div>
      </div>
      <Spotlight kicker="■ IIID 2016 · ANCHOR AWARD" slides={slides} titleClass="text-5xl md:text-9xl" />
      <p className="px-5 md:px-10 py-8 text-bone/60 text-sm max-w-3xl">
        IIID Design Excellence, Zone Z2 Regionals — Commercial Workspace Small, Runner Up.{" "}
        <Link to="/studio" className="text-bone border-b border-accent pb-0.5 tracking-widest">READ THE FULL STORY →</Link>
      </p>
    </section>
  );
}

function Finale() {
  return (
    <section data-room="6" data-room-label="Begin" className="relative h-[92svh] overflow-hidden">
      <Cinematic scale={1.12} className="absolute inset-0">
        <Photo src="/photos/traditional-02.webp" label="YOUR SPACE COULD BE NEXT" palette={["#2B2118", "#E88932"]} className="h-[92svh]" />
      </Cinematic>
      <div className="absolute inset-0 bg-ink/35" />
      <div className="absolute inset-0 flex flex-col justify-end px-5 pt-5 md:p-10 pb-[calc(var(--bar-h)+1.25rem)] md:pb-10 text-bone">
        <p className="text-[11px] tracking-mega text-bone/70 mb-3">ROOM 07 — BEGIN · YOUR TURN</p>
        <h2 className="display text-[13vw] md:text-[8vw] leading-[0.9]">YOUR SPACE.<br />OUR NEXT STORY.</h2>
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mt-6">
          <p className="text-bone/70 text-sm">Pune · Satara · Residential + Commercial</p>
          <Link to="/begin" className="bg-accent text-bone px-8 py-4 tracking-widest text-sm w-fit hover:bg-bone hover:text-ink transition-colors">START A PROJECT →</Link>
        </div>
      </div>
    </section>
  );
}

export default function Walkthrough() {
  return (
    <main id="main" tabIndex={-1}>
      <Hero />
      <Twenty />
      <Strip />
      <InchLens />
      <FeaturedStories />
      <ProcessTease />
      <Award />
      <Finale />
      <Footer />
    </main>
  );
}
