import { useEffect, useState, useRef, useMemo, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Lenis from "lenis";
import LenisCtx, { useLenis, registerLenis } from "./lib/lenis.jsx";
import Walkthrough from "./pages/Walkthrough.jsx";
import NotFound from "./pages/NotFound.jsx";
import { Topbar, MenuOverlay, ProgressDots } from "./components/nav.jsx";
import StickyBar from "./components/StickyBar.jsx";
import { WORLDS, STORIES, SITE } from "./data/site.js";

const WorldsPage = lazy(() => import("./pages/Worlds.jsx").then((m) => ({ default: m.Worlds })));
const WorldDetailPage = lazy(() => import("./pages/Worlds.jsx").then((m) => ({ default: m.WorldDetail })));
const StoryPage = lazy(() => import("./pages/Story.jsx"));
const StudioPage = lazy(() => import("./pages/More.jsx").then((m) => ({ default: m.Studio })));
const BuildPage = lazy(() => import("./pages/More.jsx").then((m) => ({ default: m.HowWeBuild })));
const BeginPage = lazy(() => import("./pages/More.jsx").then((m) => ({ default: m.Begin })));

function RouteMeta({ route }) {
  const { title, desc, noindex } = useMemo(() => {
    const base = "Square Inch Design";
    const p = route.pathname;
    if (p === "/") return { title: `${base} — Every Inch Speaks | Interior Designer in Pune & Satara`, desc: "Square Inch Design — 20 years of residential and commercial interiors across 8 design worlds. Walk through our spaces. Pune & Satara.", noindex: false };
    if (p === "/worlds") return { title: `Eight Design Worlds | ${base}`, desc: "Abstract, Art-Deco, Contemporary, Fusion, Traditional, Luxury, Minimalistic, Rustic — eight visual worlds by Square Inch Design.", noindex: false };
    const wm = p.match(/^\/world\/([\w-]+)/);
    if (wm) {
      const w = WORLDS.find((x) => x.slug === wm[1]);
      if (!w) return { title: `Page Not Found | ${base}`, desc: base, noindex: true };
      return { title: `${w.name} Interiors | ${base}`, desc: `${w.name} interiors by Square Inch Design — ${w.note}. Pune & Satara.`, noindex: false };
    }
    const sm = p.match(/^\/story\/([\w-]+)/);
    if (sm) {
      const s = STORIES.find((x) => x.id === sm[1]);
      if (!s) return { title: `Page Not Found | ${base}`, desc: base, noindex: true };
      return { title: `${s.title} | ${base}`, desc: `${s.meta} by Square Inch Design.`, noindex: false };
    }
    if (p === "/studio") return { title: `Studio — 20 Years of Interior Design | ${base}`, desc: "SI Design: two decades of residential and commercial interiors, IIID 2016 Anchor Award runner-up. Led by Siddharth Kolhapure.", noindex: false };
    if (p === "/how-we-build") return { title: `Our Process | ${base}`, desc: "Enquiry to finalization in six steps — how Square Inch Design builds interiors.", noindex: false };
    if (p === "/begin") return { title: `Start a Project | ${base}`, desc: `Enquire about your residential or commercial interior. Offices in Pune and Satara. ${SITE.phones.join(", ")}.`, noindex: false };
    return { title: `Page Not Found | ${base}`, desc: base, noindex: true };
  }, [route.pathname]);

  useEffect(() => {
    document.title = title;
    const md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", desc);
    const ogt = document.querySelector('meta[property="og:title"]');
    if (ogt) ogt.setAttribute("content", title);
    const ogd = document.querySelector('meta[property="og:description"]');
    if (ogd) ogd.setAttribute("content", desc);
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
  }, [title, desc, noindex]);
  return null;
}

function ScrollManager({ route }) {
  const lenis = useLenis();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [route.pathname, lenis]);
  return null;
}

function RouteFallback() {
  return (
    <div className="min-h-[80svh] bg-bone flex items-center justify-center gap-3" role="status" aria-label="Loading page">
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
  useEffect(() => {
    if (location.pathname === route.pathname) return;
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
  }, [location, route.pathname, reduce]);

  return (
    <LenisCtx.Provider value={lenis}>
      <Topbar ref={triggerRef} onMenu={() => setMenu(true)} menuOpen={menu} />
      <MenuOverlay open={menu} close={() => setMenu(false)} triggerRef={triggerRef} />
      <ProgressDots />
      <RouteMeta route={route} />
      <ScrollManager route={route} />
      <RoomTransition phase={phase} />
      <Suspense fallback={<RouteFallback />}>
        <Routes location={route}>
          <Route path="/" element={<Walkthrough />} />
          <Route path="/worlds" element={<WorldsPage />} />
          <Route path="/world/:slug" element={<WorldRoute />} />
          <Route path="/story/:id" element={<StoryRoute />} />
          <Route path="/studio" element={<StudioPage />} />
          <Route path="/how-we-build" element={<BuildPage />} />
          <Route path="/begin" element={<BeginPage />} />
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
