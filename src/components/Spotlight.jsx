import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Photo from "./Photo.jsx";

// Full-bleed spotlight slider: stacked cinematic images, big serif title,
// counter + VIEW pill. Square Inch dressing: orange inch square, dot progress.
export default function Spotlight({ kicker, slides, dark = true, titleClass = "text-5xl md:text-8xl" }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const frameRef = useRef(null);
  const [inView, setInView] = useState(true);
  const [tabLive, setTabLive] = useState(true);
  const n = slides.length;
  const go = (d) => setI((p) => (p + d + n) % n);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([en]) => setInView(en.isIntersecting), { threshold: 0.1 });
    io.observe(el);
    const onVis = () => setTabLive(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  // Autoplay only while visible, tab active, motion allowed, and not paused.
  useEffect(() => {
    if (reduce || paused || n < 2 || !inView || !tabLive) return;
    const t = setInterval(() => setI((p) => (p + 1) % n), 5200);
    return () => clearInterval(t);
  }, [reduce, paused, n, inView, tabLive, i]);

  const s = slides[i];
  return (
    <div ref={frameRef} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} className={`relative h-[86svh] md:h-[92svh] overflow-hidden ${dark ? "bg-night text-bone" : "bg-bone text-ink"}`}>
      <AnimatePresence mode="popLayout">
        <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9 }} className="absolute inset-0">
          <motion.div initial={{ scale: reduce ? 1 : 1.08 }} animate={{ scale: 1 }} transition={{ duration: 6, ease: "linear" }} className="h-full">
            <Photo src={s.src} label={s.title} palette={s.palette} className="h-full" eager={i === 0} />
          </motion.div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/30 pointer-events-none" />

      {/* top row */}
      <div className="absolute top-0 inset-x-0 flex items-center justify-between px-5 md:px-10 py-5 text-[11px] tracking-mega">
        <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 bg-accent inline-block" />{kicker}</span>
        <span className="display text-2xl md:text-4xl tracking-normal">{i + 1} / {n}</span>
      </div>

      {/* vertical tag */}
      <div className="absolute left-5 md:left-10 top-1/2 -translate-y-1/2 vertical-word text-[10px] tracking-mega opacity-60 hidden sm:block">
        {s.tag}
      </div>

      {/* bottom content */}
      <div className="absolute bottom-0 inset-x-0 px-5 md:px-10 pb-[calc(var(--bar-h)+2rem)] md:pb-10">
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-accent text-[11px] tracking-mega">{s.meta}</p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
              <div className="max-w-5xl">
                <h3 className={`display leading-[0.9] ${titleClass}`}>{s.title}</h3>
                {s.sub && <p className="text-white/70 text-sm md:text-base mt-3 max-w-2xl">{s.sub}</p>}
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button onClick={() => go(-1)} aria-label="Previous" className="h-12 w-12 rounded-full border border-white/40 hover:bg-accent hover:text-ink hover:border-accent transition-colors">←</button>
                <button
                  onClick={() => setPaused((p) => !p)}
                  aria-label={paused ? "Play slideshow" : "Pause slideshow"}
                  aria-pressed={paused}
                  className="h-12 w-12 rounded-full border border-white/40 hover:bg-accent hover:text-ink hover:border-accent transition-colors text-sm"
                >
                  {paused ? "▶" : "❚❚"}
                </button>
                <Link to={s.to} className="h-12 px-8 rounded-full bg-white/10 border border-white/40 backdrop-blur flex items-center text-sm tracking-mega hover:bg-accent hover:text-ink hover:border-accent transition-colors">{s.cta ?? "VIEW"}</Link>
                <button onClick={() => go(1)} aria-label="Next" className="h-12 w-12 rounded-full border border-white/40 hover:bg-accent hover:text-ink hover:border-accent transition-colors">→</button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="flex items-center gap-2 mt-6">
          {slides.map((_, d) => (
            <button key={d} onClick={() => setI(d)} aria-label={`Go to slide ${d + 1}`} className="p-[18px] -m-[18px]">
              <span className={`block h-2 w-2 rotate-45 transition-colors ${d === i ? "bg-accent" : "bg-white/30 hover:bg-white/60"}`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
