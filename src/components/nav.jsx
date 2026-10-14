import { useState, useRef, useEffect, forwardRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SITE, NAV } from "../data/site.js";
import { lockScroll, unlockScroll } from "../lib/lenis.jsx";
import Photo from "./Photo.jsx";

export const Topbar = forwardRef(function Topbar({ onMenu, menuOpen }, ref) {
  return (
    <header className="fixed top-0 inset-x-0 z-40 mix-blend-difference text-bone pointer-events-none">
      <div className="flex items-center justify-between px-5 md:px-10 py-4 pointer-events-auto">
        <Link to="/" className="flex items-center gap-3" aria-label="Square Inch Design — home">
          <span className="h-4 w-4 bg-accent inline-block" aria-hidden="true" />
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

function MenuCardIcon({ i, className = "" }) {
  const c = "h-8 w-8 md:h-9 md:w-9";
  const common = "fill-none stroke-current";
  const w = { strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (i % 6) {
    case 0: // home
      return (
        <svg viewBox="0 0 32 32" className={`${c} ${className}`} aria-hidden="true">
          <path d="M5 14 L16 5 L27 14" className={common} {...w} />
          <path d="M8.5 13.5 V26 H23.5 V13.5" className={common} {...w} />
          <rect x="14" y="19" width="4" height="7" className={common} {...w} />
        </svg>
      );
    case 1: // worlds
      return (
        <svg viewBox="0 0 32 32" className={`${c} ${className}`} aria-hidden="true">
          <circle cx="16" cy="16" r="10.5" className={common} {...w} />
          <ellipse cx="16" cy="16" rx="4.5" ry="10.5" className={common} {...w} />
          <line x1="5.5" y1="16" x2="26.5" y2="16" className="stroke-current" strokeWidth={1.8} />
        </svg>
      );
    case 2: // projects
      return (
        <svg viewBox="0 0 32 32" className={`${c} ${className}`} aria-hidden="true">
          <rect x="6" y="6" width="9" height="9" rx="2" className={common} {...w} />
          <rect x="17" y="6" width="9" height="9" rx="2" className={common} {...w} />
          <rect x="6" y="17" width="9" height="9" rx="2" className={common} {...w} />
          <rect x="17" y="17" width="9" height="9" rx="2" className={common} {...w} />
        </svg>
      );
    case 3: // studio
      return (
        <svg viewBox="0 0 32 32" className={`${c} ${className}`} aria-hidden="true">
          <circle cx="11.5" cy="11.5" r="4" className={common} {...w} />
          <path d="M4.5 26 c0-4.8 3-7.5 7-7.5 s7 2.7 7 7.5" className={common} {...w} />
          <circle cx="22" cy="12.5" r="3" className={common} {...w} />
          <path d="M20.5 19.5 c3.8.4 6.5 3 6.5 6.5" className={common} {...w} />
        </svg>
      );
    case 4: // process
      return (
        <svg viewBox="0 0 32 32" className={`${c} ${className}`} aria-hidden="true">
          <path d="M9 4 h9 l5 5 v19 h-14 Z" className={common} {...w} />
          <path d="M18 4 v5 h5" className={common} {...w} />
          <line x1="13" y1="15.5" x2="23" y2="15.5" className="stroke-current" strokeWidth={1.8} />
          <line x1="13" y1="19.5" x2="20" y2="19.5" className="stroke-current" strokeWidth={1.8} />
        </svg>
      );
    default: // start a project
      return (
        <svg viewBox="0 0 32 32" className={`${c} ${className}`} aria-hidden="true">
          <path d="M9 23 L23 9" className={common} {...w} />
          <path d="M12.5 9 H23 V19.5" className={common} {...w} />
        </svg>
      );
  }
}

function MenuLink({ item, index, onNavigate }) {
  const { pathname } = useLocation();
  const current = pathname === item.to;
  return (
    <Link
      to={item.to}
      onClick={onNavigate}
      aria-current={current ? "page" : undefined}
      className={
        current
          ? "group flex flex-col items-center text-center rounded-2xl border border-bone bg-bone text-ink px-4 pt-7 pb-5 min-h-[188px] md:min-h-[208px] transition-all"
          : "group flex flex-col items-center text-center rounded-2xl border border-white/15 bg-white/[0.07] backdrop-blur-md text-bone px-4 pt-7 pb-5 min-h-[188px] md:min-h-[208px] transition-all hover:bg-white/[0.14] hover:border-white/30"
      }
    >
      <MenuCardIcon i={index} className={current ? "text-accent" : ""} />
      <span className="mt-4 flex min-h-[3.25rem] items-center text-lg md:text-xl font-medium leading-tight">{item.label}</span>
      <span className="mt-auto flex w-full items-center justify-between text-[10px] tracking-[0.2em] opacity-80">
        <span aria-hidden="true">0{index + 1}</span>
        <span aria-hidden="true" className={current ? "inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink text-bone" : "inline-flex h-7 w-7 items-center justify-center rounded-full border border-current"}>→</span>
      </span>
    </Link>
  );
}

export function MenuOverlay({ open, close, triggerRef }) {
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
          className="fixed inset-0 z-50 text-bone overflow-y-auto"
          data-lenis-prevent
        >
          <div className="absolute inset-0" aria-hidden="true">
            <Photo src="/photos/rustic-01.webp" label="" alt="" palette={["#101418", "#2E4A6B"]} className="h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/45 to-ink/75" />
          </div>
          <div className="relative min-h-full flex flex-col px-5 md:px-10 pt-5 md:pt-6 pb-6 md:pb-8">
            <div className="flex items-start justify-between gap-6">
              <p className="text-[11px] md:text-xs tracking-mega text-bone/70 pt-4">EXHIBITION INDEX</p>
              <p className="hidden sm:block text-right text-xs md:text-sm leading-relaxed text-bone/85 pt-1">{SITE.pune}<br />{SITE.phones.join(" · ")}</p>
              <button
                onClick={close}
                aria-label="Close menu"
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-bone/40 text-bone transition-colors hover:border-accent hover:text-accent"
              >
                <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
                  <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <p className="sm:hidden mt-4 text-xs leading-relaxed text-bone/75">{SITE.pune}<br />{SITE.phones.join(" · ")}</p>
            <nav aria-label="Primary" className="mt-auto pt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
              {NAV.map((item, i) => (
                <MenuLink key={item.to + item.label} item={item} index={i} onNavigate={close} />
              ))}
            </nav>
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

  if (pathname !== "/" || rooms.length < 2 || active === 0) return null;
  return (
    <div className="fixed bottom-5 left-5 z-40 hidden md:flex items-center gap-2 mix-blend-difference text-bone" role="status" aria-label={`Exhibition progress: ${rooms[active]}`}>
      <span className="text-[10px] tracking-mega mr-2" aria-hidden="true">08 WORLDS</span>
      {rooms.map((r, i) => (
        <span key={r + i} aria-hidden="true" className={`h-2 w-2 rotate-45 ${i <= active ? "bg-accent" : "bg-bone/30"}`} />
      ))}
    </div>
  );
}
