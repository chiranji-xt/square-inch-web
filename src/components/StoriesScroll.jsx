import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import Photo from "./Photo.jsx";
import { STORIES } from "../data/site.js";

// Scroll-pinned swap: the frame stays fixed while scrolling,
// each new story wipes in over the exact spot of the previous one.
export default function StoriesScroll() {
  const picks = [STORIES[0], STORIES[1], STORIES[3], STORIES[4]];
  const ref = useRef(null);
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(picks.length - 1, Math.max(0, Math.floor(v * picks.length)));
    setI((p) => (p === idx ? p : idx));
  });

  const s = picks[i];

  return (
    <section data-room="3" data-room-label="Stories" className="bg-bone">
      <div className="px-5 md:px-10 pt-16 pb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-mega text-accent">ROOM 04 — STORIES · KEEP SCROLLING — EACH STORY TAKES THE SAME FRAME</p>
          <h2 className="display text-4xl md:text-6xl leading-[0.95] mt-2">Stories,<br />not cards.</h2>
        </div>
        <Link to="/worlds" className="text-sm tracking-widest border-b border-accent pb-1 shrink-0">ALL 8 WORLDS →</Link>
      </div>

      <div ref={ref} className="relative" style={{ height: `${picks.length * 140}vh` }}>
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <div className="h-full grid md:grid-cols-12 gap-0 px-5 pr-14 md:px-10 pt-14 md:py-24 pb-[calc(var(--bar-h)+3rem)] md:pb-24">
            {/* image frame — new story wipes up over the old one, same spot */}
            <div className="relative md:col-span-7 h-[36svh] md:h-full overflow-hidden bg-ink">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={s.id}
                  initial={reduce ? { opacity: 0 } : { clipPath: "inset(100% 0 0 0)", scale: 1.06 }}
                  animate={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0 0 0)", scale: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                  transition={{ duration: reduce ? 0.3 : 0.85, ease: [0.77, 0, 0.175, 1] }}
                  className="absolute inset-0"
                >
                  <Photo src={s.images[0]} label={s.title.toUpperCase()} palette={s.palette} className="h-full" eager />
                </motion.div>
              </AnimatePresence>
              <div className="absolute top-4 left-4 text-bone text-[11px] tracking-mega bg-black/45 px-3 py-1.5 backdrop-blur-sm">
                {s.meta.toUpperCase()}
              </div>
            </div>

            {/* info panel — slides in from below, same spot */}
            <div className="relative md:col-span-5 flex flex-col justify-end md:justify-center md:pl-10 pt-5 md:pt-0 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={s.id}
                  initial={reduce ? { opacity: 0 } : { y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { y: -50, opacity: 0 }}
                  transition={{ duration: reduce ? 0.25 : 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="display leading-none text-6xl md:text-9xl text-ink/10">{s.no}</p>
                  <h3 className="display text-3xl md:text-5xl leading-tight -mt-2 md:-mt-5">{s.title}</h3>
                  <p className="text-ink/65 text-sm mt-2 md:mt-3 max-w-sm line-clamp-2 md:line-clamp-3">{s.desc}</p>
                  <Link to={`/story/${s.id}`} className="inline-block mt-4 md:mt-5 min-h-[48px] leading-[48px] text-sm tracking-widest border border-ink px-6 hover:bg-ink hover:text-bone transition-colors">
                    OPEN STORY →
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* right rail: counter + dots + scroll progress */}
          <div className="absolute right-5 md:right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
            <span className="display text-xl md:text-2xl">{String(i + 1).padStart(2, "0")}</span>
            <div className="relative w-px h-24 bg-ink/15">
              <motion.div style={{ scaleY: scrollYProgress }} className="absolute inset-0 bg-accent origin-top" />
            </div>
            <div className="flex flex-col gap-2">
              {picks.map((p, d) => (
                <span key={p.id} className={`h-2 w-2 rotate-45 ${d === i ? "bg-accent" : "bg-ink/20"}`} />
              ))}
            </div>
            <span className="display text-xl md:text-2xl opacity-40">{String(picks.length).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
