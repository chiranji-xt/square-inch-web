import { motion, useReducedMotion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Neither IntersectionObserver nor scroll/resize events reliably fire a
// re-check on this site (Lenis's scroll handling swallows them in ways
// that leave reveals stuck forever), so visibility is polled directly off
// layout instead — a plain getBoundingClientRect read can't silently stop
// working. Content must never sit invisible and leave a blank gap.
function useScrollInView(ref, amount = 0.1) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (inView) return;
    let raf;
    const check = () => {
      const el = ref.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        if (r.top < vh * (1 - amount) && r.bottom > 0) {
          setInView(true);
          return;
        }
      }
      raf = requestAnimationFrame(check);
    };
    raf = requestAnimationFrame(check);
    return () => cancelAnimationFrame(raf);
  }, [ref, amount, inView]);
  return inView;
}

// Slow cinematic zoom + gentle parallax. Disabled if reduced motion.
// Small y amplitude so sections never overlap into blank gaps.
export function Cinematic({ children, scale = 1.08, y = 24, className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce || !ref.current) return;
    const el = ref.current.querySelector(".img-cine") || ref.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { scale: 1 }, { scale, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1.1 } });
      gsap.fromTo(ref.current, { y: -y }, { y, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1.1 } });
    }, ref);
    return () => ctx.revert();
  }, [reduce, scale, y]);
  return <div ref={ref} className={className}>{children}</div>;
}

// Reveal as soon as 10% enters the real viewport — no negative margins,
// so content can never sit invisible and leave a blank gap.
export function RevealMask({ children, from = "left", className = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useScrollInView(ref, 0.1);
  const reduce = useReducedMotion();
  const clips = {
    left: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
    right: ["inset(0 0 0 100%)", "inset(0 0 0 0%)"],
    bottom: ["inset(60% 0 0 0)", "inset(0% 0 0 0)"],
    zoom: null,
  };
  if (from === "zoom" || reduce) {
    return (
      <motion.div ref={ref} initial={{ opacity: 0, y: reduce ? 0 : 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
        {children}
      </motion.div>
    );
  }
  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: clips[from][0] }}
      animate={inView ? { clipPath: clips[from][1] } : {}}
      transition={{ duration: 1, delay, ease: [0.77, 0, 0.175, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerWords({ text, className = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useScrollInView(ref, 0.3);
  const words = text.split(" ");
  return (
    <span ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-1 -mb-1 mr-[0.28em]">
          <motion.span className="inline-block" initial={{ y: "110%" }} animate={inView ? { y: "0%" } : {}} transition={{ duration: 0.8, delay: delay + i * 0.05, ease: [0.22, 1, 0.36, 1] }}>
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
