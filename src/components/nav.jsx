import { useState, useRef, useEffect, forwardRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SITE, NAV } from "../data/site.js";
import { lockScroll, unlockScroll } from "../lib/lenis.jsx";
import Photo from "./Photo.jsx";

export const Topbar = forwardRef(function Topbar({ onMenu, menuOpen }, ref) {
  return (
    <header className="fixed top-0 inset-x-0 z-40 mix-blend-difference text-[#F5F3EE]">
      <div className="flex items-center justify-between px-5 md:px-10 py-4">
        <Link to="/" className="flex items-center gap-3" aria-label="Square Inch Design — home">
          <span className="h-4 w-4 bg-[#E88932] inline-block" aria-hidden="true" />
          <span className="text-sm tracking-[0.25em] font-medium">SQUARE INCH</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/begin" className="hidden md:flex text-sm tracking-[0.25em] min-h-[44px] items-center hover:opacity-70">
            ENQUIRE
          </Link>
          <button
            ref={ref}
            onClick={onMenu}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            className="text-sm tracking-[0.25em] flex items-center gap-3 min-h-[44px]"
          >
            <span className="hidden md:inline text-xs opacity-70">{SITE.concept.toUpperCase()}</span> MENU ●
          </button>
        </div>
      </div>
    </header>
  );
});

function MenuLink({ item, index, onNavigate, onPreview }) {
  const { pathname } = useLocation();
  const current = pathname === item.to;
  return (
    <Link
      to={item.to}
      onClick={onNavigate}
      onMouseEnter={() => onPreview(item)}
      onFocus={() => onPreview(item)}
      aria-current={current ? "page" : undefined}
      className="group flex items-baseline gap-4 py-2"
    >
      <span className="text-accent text-xs" aria-hidden="true">0{index + 1}</span>
      <span className="display text-4xl md:text-6xl group-hover:translate-x-3 group-hover:text-accent group-focus-visible:translate-x-3 group-focus-visible:text-accent transition-all">{item.label}</span>
    </Link>
  );
}

export function MenuOverlay({ open, close, triggerRef }) {
  const [hover, setHover] = useState(NAV[5]);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    lockScroll();
    // Move focus into the menu when it opens.
    const t = setTimeout(() => {
      panelRef.current?.querySelector("a, button")?.focus();
    }, 350);
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === "Tab") {
        const els = panelRef.current?.querySelectorAll("a[href], button:not([disabled])");
        if (!els || !els.length) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      unlockScroll();
      triggerRef?.current?.focus();
    };
  }, [open, close, triggerRef]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="site-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-50 bg-night text-bone grid md:grid-cols-2 overflow-y-auto"
          data-lenis-prevent
        >
          <nav aria-label="Primary" className="p-8 pt-20 pb-12 md:p-16 flex flex-col justify-center gap-1 w-full">
            <button onClick={close} aria-label="Close menu" className="absolute top-5 right-6 md:right-10 text-sm tracking-mega min-h-[44px]">CLOSE ✕</button>
            <p className="text-xs tracking-mega text-bone/50 mb-6">EXHIBITION INDEX</p>
            {NAV.map((item, i) => (
              <MenuLink key={item.to + item.label} item={item} index={i} onNavigate={close} onPreview={setHover} />
            ))}
            <div className="mt-10 text-sm text-bone/60">{SITE.pune}<br />{SITE.phones.join(" · ")}</div>
          </nav>
          <div className="hidden md:block relative" aria-hidden="true">
            <Photo src={hover.photo} label={hover.preview} alt="" palette={["#222", "#E88932"]} className="h-full w-full" />
            <div className="absolute bottom-8 left-8 display text-5xl">{hover.preview}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Live exhibition progress: follows the ROOM sections on the home page.
// Hidden everywhere else so it never misleads.
export function ProgressDots() {
  const { pathname } = useLocation();
  const [rooms, setRooms] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (pathname !== "/") return;
    // Home content renders after route swap; observe on next frame.
    const raf = requestAnimationFrame(() => {
      const els = Array.from(document.querySelectorAll("[data-room]"));
      if (!els.length) return;
      setRooms(els.map((el) => el.getAttribute("data-room-label") || "Room"));
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) setActive(els.indexOf(en.target));
          });
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      els.forEach((el) => io.observe(el));
      return () => io.disconnect();
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  if (pathname !== "/" || rooms.length < 2) return null;
  return (
    <div className="fixed bottom-5 left-5 z-40 hidden md:flex items-center gap-2 mix-blend-difference text-white" role="status" aria-label={`Exhibition progress: ${rooms[active]}`}>
      <span className="text-[10px] tracking-mega mr-2" aria-hidden="true">08 WORLDS</span>
      {rooms.map((r, i) => (
        <span key={r + i} aria-hidden="true" className={`h-2 w-2 rotate-45 ${i <= active ? "bg-[#E88932]" : "bg-white/30"}`} />
      ))}
    </div>
  );
}
