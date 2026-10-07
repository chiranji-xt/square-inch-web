import { useEffect, useState, useRef, useMemo, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams, useNavigationType } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Lenis from "lenis";
import LenisCtx, { useLenis, registerLenis } from "./lib/lenis.jsx";
import Walkthrough from "./pages/Walkthrough.jsx";
import NotFound from "./pages/NotFound.jsx";
import { Topbar, MenuOverlay, ProgressDots } from "./components/nav.jsx";
import StickyBar from "./components/StickyBar.jsx";
import { metaFor, siteUrl } from "./lib/meta.js";

const WorldsPage = lazy(() => import("./pages/Worlds.jsx").then((m) => ({ default: m.Worlds })));
const WorldDetailPage = lazy(() => import("./pages/Worlds.jsx").then((m) => ({ default: m.WorldDetail })));
const StoryPage = lazy(() => import("./pages/Story.jsx"));
const StudioPage = lazy(() => import("./pages/More.jsx").then((m) => ({ default: m.Studio })));
const BuildPage = lazy(() => import("./pages/More.jsx").then((m) => ({ default: m.HowWeBuild })));
const BeginPage = lazy(() => import("./pages/More.jsx").then((m) => ({ default: m.Begin })));
const ProjectsPage = lazy(() => import("./pages/Projects.jsx"));

function setMeta(selector, attr, value) {
  if (value == null) return;
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement(selector.startsWith("meta[property") ? "meta" : "link");
    const m = selector.match(/(?:property="([^"]+)"|name="([^"]+)"|rel="([^"]+)")/);
    if (m[1]) el.setAttribute("property", m[1]);
    if (m[2]) el.setAttribute("name", m[2]);
    if (m[3]) el.setAttribute("rel", m[3]);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function RouteMeta({ route }) {
  const meta = useMemo(() => metaFor(route.pathname), [route.pathname]);
  const { title, desc, noindex, image } = meta;

  useEffect(() => {
    const url = siteUrl();
    document.title = title;
    setMeta('meta[name="description"]', "content", desc);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", desc);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", desc);
    if (url) {
      const page = `${url}${route.pathname}`;
      setMeta('link[rel="canonical"]', "href", page);
      setMeta('meta[property="og:url"]', "content", page);
      if (image) {
        const abs = `${url}${image}`;
        setMeta('meta[property="og:image"]', "content", abs);
        setMeta('meta[name="twitter:image"]', "content", abs);
      }
    }
    let robots = document.querySelector('meta[name="robots"]');
    if (noindex) {
      if (!robots) {
        robots = document.createElement("meta");
        robots.setAttribute("name", "robots");
        document.head.appendChild(robots);
      }
      robots.setAttribute("content", "noindex");
    } else if (robots) {
      robots.remove();
    }
  }, [title, desc, noindex, image, route.pathname]);
  return null;
}

function ScrollManager({ route }) {
  const lenis = useLenis();
  const navType = useNavigationType();
  const positions = useRef({});
  const prevPath = useRef(route.pathname + route.search);
  const first = useRef(true);
  const liveKey = useRef(route.pathname + route.search);
  liveKey.current = route.pathname + route.search;

  // Continuously remember where the visitor is on each route, so going
  // back never depends on catching the exact navigation instant.
  useEffect(() => {
    let ticking = false;
    const save = () => {
      ticking = false;
      positions.current[liveKey.current] = window.scrollY;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(save);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const key = route.pathname + route.search;
    positions.current[prevPath.current] = window.scrollY;
    if (first.current) {
      first.current = false;
      prevPath.current = key;
      return;
    }
    // POP (back/forward) restores where you were; PUSH starts at top —
    // except home: returning to the walkthrough always resumes where you
    // left it, however you got back (button, menu, logo or browser back).
    // A hash always jumps to its element.
    // Restored positions re-apply until the layout settles, because images
    // below the fold still change the page height after mount. Any manual
    // scroll by the visitor cancels the retries immediately.
    let cancelled = false;
    const cancel = () => {
      cancelled = true;
    };
    window.addEventListener("wheel", cancel, { once: true, passive: true });
    window.addEventListener("touchmove", cancel, { once: true, passive: true });
    const settle = (targetY, tries = 0) => {
      if (cancelled) return;
      if (lenis) lenis.scrollTo(targetY, { immediate: true });
      else window.scrollTo(0, targetY);
      if (tries >= 25) return;
      setTimeout(() => {
        if (cancelled) return;
        if (Math.abs(window.scrollY - targetY) > 40) settle(targetY, tries + 1);
      }, 120);
    };
    const hashEl = route.hash ? document.querySelector(route.hash) : null;
    if (hashEl) {
      if (lenis) lenis.scrollTo(hashEl);
      else hashEl.scrollIntoView();
    } else {
      const saved = positions.current[key];
      const y = route.pathname === "/" && saved != null ? saved : navType === "POP" ? saved ?? 0 : 0;
      settle(y);
    }
    prevPath.current = key;
    return () => {
      cancel();
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchmove", cancel);
    };
  }, [route.pathname, route.search, route.hash, navType, lenis]);
  return null;
}

function RouteFallback() {
  return (
    <div className="min-h-[80svh] bg-ink text-bone flex items-center justify-center gap-3" role="status" aria-label="Loading page">
      <span className="h-5 w-5 bg-accent animate-pulse" aria-hidden="true" />
      <span className="tracking-[0.3em] text-xs">SQUARE INCH</span>
    </div>
  );
}

// Subtle ink wipe between rooms: covers up (~240ms), swaps, reveals (~240ms).
function RoomTransition({ phase }) {
  if (phase === "idle") return null;
  return (
    <motion.div
      key={phase}
      aria-hidden="true"
      initial={{ clipPath: phase === "cover" ? "inset(100% 0 0 0)" : "inset(0 0 0% 0)" }}
      animate={{ clipPath: phase === "cover" ? "inset(0% 0 0 0)" : "inset(0 0 100% 0)" }}
      transition={{ duration: 0.24, ease: [0.77, 0, 0.175, 1] }}
      className="fixed inset-0 z-[70] bg-night pointer-events-none flex items-center justify-center"
    >
      <span className="h-5 w-5 bg-accent" />
    </motion.div>
  );
}

function WorldRoute() {
  const { slug } = useParams();
  return <WorldDetailPage key={slug} slug={slug} />;
}

function StoryRoute() {
  const { id } = useParams();
  return <StoryPage key={id} />;
}

function Shell() {
  const location = useLocation();
  const [menu, setMenu] = useState(false);
  const [route, setRoute] = useState(location);
  const [phase, setPhase] = useState("idle");
  const reduce = useReducedMotion();
  const triggerRef = useRef(null);
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const l = new Lenis({ duration: 1.15, smoothWheel: true });
    registerLenis(l);
    setLenis(l);
    let raf;
    const loop = (t) => {
      l.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      l.destroy();
      registerLenis(null);
    };
  }, []);

  // Delayed route swap so the wipe can cover the change.
  // Cleanup cancels pending timers, so rapid successive navigations
  // can never leave a stale route or a stuck overlay.
  useEffect(() => {
    if (location.pathname === route.pathname && location.search === route.search) {
      if (phase !== "idle") setPhase("idle");
      return;
    }
    if (reduce) {
      setRoute(location);
      return;
    }
    setPhase("cover");
    const t1 = setTimeout(() => {
      setRoute(location);
      setPhase("reveal");
    }, 250);
    const t2 = setTimeout(() => setPhase("idle"), 540);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [location, route.pathname, route.search, reduce, phase]);

  return (
    <LenisCtx.Provider value={lenis}>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:bg-accent focus:text-ink focus:px-5 focus:py-3 focus:text-xs focus:tracking-mega">
        Skip to content
      </a>
      <Topbar ref={triggerRef} onMenu={() => setMenu(true)} menuOpen={menu} />
      <MenuOverlay open={menu} close={() => setMenu(false)} triggerRef={triggerRef} />
      <ProgressDots />
      <RouteMeta route={route} />
      <ScrollManager route={route} />
      <RoomTransition phase={phase} />
      <Suspense fallback={<RouteFallback />}>
        <Routes location={route}>
          <Route path="/" element={<Walkthrough />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/worlds" element={<WorldsPage />} />
          <Route path="/world/:slug" element={<WorldRoute />} />
          <Route path="/story/:id" element={<StoryRoute />} />
          <Route path="/studio" element={<StudioPage />} />
          <Route path="/how-we-build" element={<BuildPage />} />
          <Route path="/begin" element={<BeginPage />} />
          <Route path="/contact" element={<Navigate to="/begin" replace />} />
          <Route path="/enquire" element={<Navigate to="/begin" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <StickyBar />
    </LenisCtx.Provider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
