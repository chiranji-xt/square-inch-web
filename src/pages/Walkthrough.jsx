import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useReducedMotion, useInView } from "framer-motion";
import Photo from "../components/Photo.jsx";
import InchLens from "../components/InchLens.jsx";
import Spotlight from "../components/Spotlight.jsx";
import StoriesScroll from "../components/StoriesScroll.jsx";
import Footer from "../components/Footer.jsx";
import { Cinematic, RevealMask, StaggerWords } from "../components/motion.jsx";
import { PROCESS, WORLDS } from "../data/site.js";

let heroSeen = false;

function Hero() {
  // The black loader card shows once per session and the intro plays once
  // per session; on later visits (e.g. Back to home) the hero is already
  // open so the page feels resumed, not restarted.
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
    <section data-room="0" data-room-label="Enter" className="relative h-[100svh] bg-night text-bone overflow-hidden">
      {!done && (
        <motion.div onAnimationComplete={finish} initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ delay: 0.45, duration: 0.4 }} className="absolute inset-0 z-20 bg-night flex items-center justify-center">
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.45, ease: "easeInOut" }} className="flex items-center gap-3 origin-left">
            <span className="h-6 w-6 bg-accent inline-block" />
            <span className="tracking-[0.4em] text-sm">SQUARE INCH</span>
          </motion.div>
        </motion.div>
      )}
      <motion.div initial={{ clipPath: quick ? "inset(0 0% 0 0%)" : "inset(0 46% 0 46%)" }} animate={{ clipPath: "inset(0 0% 0 0%)" }} transition={{ delay: quick ? 0 : 0.5, duration: quick ? 0 : 1, ease: [0.77, 0, 0.175, 1] }} className="absolute inset-0">
        <Cinematic scale={1.08} className="h-full">
          <Photo src="/photos/luxury-01.webp" label="LUXURY LIVING — 4255 SQFT" palette={["#0E1E3A", "#C9A86A"]} className="h-[100svh]" eager priority />
        </Cinematic>
      </motion.div>
      <div className="absolute inset-0 flex flex-col justify-end px-5 pt-5 md:p-10 pb-[calc(var(--bar-h)+1.25rem)] md:pb-10 pointer-events-none">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: quick ? 0 : 0.9 }} className="text-xs tracking-mega text-bone/80">ROOM 01 — ENTER · INTERIOR DESIGN STUDIO · PUNE — SATARA · 20 YEARS</motion.p>
        <h1 aria-label="Every Inch Speaks." className="display leading-[0.85] text-[17vw] md:text-[11vw] mt-2">
          <span aria-hidden="true">
            <StaggerWords text="EVERY" delay={quick ? 0 : 0.9} /><br />
            <span className="text-accent"><StaggerWords text="INCH" delay={quick ? 0 : 1} /></span> <StaggerWords text="SPEAKS." delay={quick ? 0 : 1.1} />
          </span>
        </h1>
        <div className="flex flex-col gap-5 mt-5 md:flex-row md:justify-between md:items-end">
          <div className="max-w-xs">
            <p className="text-bone/80 text-sm">An interior design studio crafting homes &amp; workspaces across Pune and Satara.</p>
            <div className="flex flex-wrap gap-3 mt-4 pointer-events-auto">
              <Link to="/worlds" className="border border-bone/70 px-6 py-3 text-xs tracking-mega hover:bg-bone hover:text-ink transition-colors">VIEW OUR WORK</Link>
              <Link to="/begin" className="bg-accent text-ink px-6 py-3 text-xs tracking-mega hover:bg-bone transition-colors">ENQUIRE NOW</Link>
            </div>
          </div>
          <p className="text-xs tracking-mega animate-bounce">SCROLL TO ENTER ↓</p>
        </div>
      </div>
    </section>
  );
}

function Twenty() {
  return (
    <section data-room="1" data-room-label="Twenty years" className="bg-sand text-ink py-24 md:py-40 px-5 md:px-10">
      <p className="text-[11px] tracking-mega text-accent mb-4">ROOM 02 — TWENTY YEARS · WHY WE ENDURE</p>
      <RevealMask from="bottom">
        <p className="display leading-none text-[38vw] md:text-[24vw]">20<span className="text-accent text-[10vw] md:text-[6vw] align-top ml-4">YRS</span></p>
      </RevealMask>
      <div className="grid md:grid-cols-12 gap-6 mt-4">
        <div className="md:col-span-5">
          <h2 className="display text-3xl md:text-5xl leading-tight"><StaggerWords text="OF CRAFTING SPACES THAT HOLD TIME." /></h2>
          <p className="mt-6 text-ink/65 max-w-sm">Creativity with functionality. Residential + commercial, across Pune and Satara. Client taste first — satisfaction as the cornerstone.</p>
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-line/15 pt-6 max-w-md">
            {[["20", "YRS OF PRACTICE"], ["08", "DESIGN WORLDS"], ["01", "NATIONAL HONOUR"]].map(([n, l]) => (
              <div key={l}>
                <p className="display text-3xl md:text-4xl">{n}</p>
                <p className="text-[10px] tracking-mega text-ink/60 mt-1">{l}</p>
              </div>
            ))}
          </div>
          <Link to="/studio" className="inline-block mt-6 border-b border-accent pb-1 tracking-widest text-sm">THE STUDIO →</Link>
        </div>
        <div className="md:col-span-7 grid grid-cols-2 gap-4">
          <Cinematic><Photo src="/photos/traditional-01.webp" label="COURTYARD HOUSE" palette={["#4A5E3A", "#D9C9A3"]} className="h-[40vh] md:h-[55vh]" /></Cinematic>
          <Cinematic><Photo src="/photos/rustic-01.webp" label="RUSTIC NIGHT" palette={["#101418", "#2E4A6B"]} className="h-[40vh] md:h-[55vh] mt-10" /></Cinematic>
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
      <motion.div animate={inView ? { x: ["0%", "-50%"] } : { x: "0%" }} transition={{ repeat: Infinity, duration: 28, ease: "linear" }} className="flex whitespace-nowrap gap-10 display text-4xl md:text-6xl">
        {row(false)}
      </motion.div>
    </section>
  );
}

function FeaturedStories() {
  return <StoriesScroll />;
}

function ProcessTease() {
  const lineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ["start 0.8", "end 0.6"] });
  return (
    <section data-room="4" data-room-label="How we build" className="bg-sand text-ink px-5 md:px-10 py-24 border-t border-ink/10 grid md:grid-cols-2 gap-10">
      <div ref={lineRef} className="relative pl-8">
        <div className="absolute left-2 top-0 bottom-0 w-px bg-ink/15" />
        <motion.div style={{ scaleY: scrollYProgress }} className="absolute left-2 top-0 bottom-0 w-px bg-accent origin-top" />
        {PROCESS.map((p) => (
          <div key={p.n} className="py-4">
            <p className="display text-4xl md:text-5xl">{p.n} <span className="text-xl md:text-2xl ml-3">{p.t.toUpperCase()}</span></p>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-[11px] tracking-mega text-accent mb-3">ROOM 05 — HOW WE BUILD · SIX STEPS, ONE LINE</p>
        <h2 className="display text-5xl md:text-7xl">How we<br />build.</h2>
        <p className="mt-4 text-ink/65 max-w-sm">Six steps, one continuous line — from first enquiry to final handover.</p>
        <Link to="/how-we-build" className="mt-6 w-fit border border-ink/30 text-ink px-7 py-3 tracking-widest text-sm hover:border-accent hover:text-accent transition-colors">FOLLOW THE LINE →</Link>
        <Cinematic className="mt-8"><Photo src="/photos/artdeco-01.webp" label="STUDIO DETAIL" palette={["#3A3A38", "#C9BFAE"]} className="h-[38vh]" /></Cinematic>
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
          <p className="text-accent text-[11px] tracking-mega">ROOM 06 — RECOGNITION · REAL, NOT INVENTED</p>
          <p className="text-bone/70 text-sm mt-1 max-w-md">One national honour, earned by the Satara studio — recognised for honest local material.</p>
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
          <Link to="/begin" className="bg-accent text-ink px-8 py-4 tracking-widest text-sm w-fit hover:bg-bone transition-colors">START A PROJECT →</Link>
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
