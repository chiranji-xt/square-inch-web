import { Link } from "react-router-dom";
import Photo from "../components/Photo.jsx";
import Footer from "../components/Footer.jsx";
import NotFound from "./NotFound.jsx";
import { RevealMask } from "../components/motion.jsx";
import { WORLDS, STORIES } from "../data/site.js";

export function Worlds() {
  return (
    <main className="bg-bone pt-24">
      <div className="px-5 md:px-10 py-10">
        <p className="text-xs tracking-mega text-accent">08 WORLDS · NOT FILTERS</p>
        <h1 className="display text-6xl md:text-9xl leading-[0.9]">Eight<br />worlds.</h1>
      </div>
      {WORLDS.map((w, i) => {
        const stories = STORIES.filter((s) => s.world === w.slug);
        return (
          <Link key={w.slug} to={`/world/${w.slug}`} className="block border-t border-ink/10 group">
            <div className="grid md:grid-cols-12 gap-0 items-stretch">
              <div className="md:col-span-7">
                <RevealMask from={i % 2 ? "right" : "left"}>
                  <Photo src={w.photo} label={w.name.toUpperCase()} palette={w.fallback} className={`h-[42vh] md:h-[62vh] ${i % 3 === 1 ? "md:ml-16" : ""} ${i % 3 === 2 ? "md:mr-16" : ""}`} />
                </RevealMask>
              </div>
              <div className="md:col-span-5 p-6 md:p-12 flex flex-col justify-center">
                <p className="display text-8xl text-ink/10 leading-none">0{i + 1}</p>
                <h2 className="display text-5xl md:text-7xl -mt-6 group-hover:text-accent transition-colors">{w.name}</h2>
                <p className="text-ink/65 mt-2 text-sm tracking-widest">{w.note.toUpperCase()} · {w.count}</p>
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

export function WorldDetail({ slug }) {
  const w = WORLDS.find((x) => x.slug === slug);
  if (!w) return <NotFound />;
  const stories = STORIES.filter((s) => s.world === w.slug);
  return (
    <main className="bg-night text-bone pt-24">
      <div className="px-5 md:px-10 py-10">
        <p className="text-xs tracking-mega text-accent">{w.count} · {w.note.toUpperCase()}</p>
        <h1 className="display text-[13vw] md:text-[11vw] leading-[0.85]">{w.name}</h1>
      </div>
      <Photo src={w.photo} label={w.name.toUpperCase() + " WORLD"} palette={w.fallback} className="h-[62vh] md:h-[80vh]" eager />
      <div className="px-5 md:px-10 py-16">
        {stories.map((s, i) => (
          <Link key={s.id} to={`/story/${s.id}`} className="grid md:grid-cols-12 gap-6 py-10 border-t border-white/10 group">
            <span className="display text-6xl text-white/15 md:col-span-2">{s.no}</span>
            <div className="md:col-span-6">
              <Photo src={s.images[0]} label={s.title.toUpperCase()} palette={s.palette} className={`h-[40vh] md:h-[52vh] ${i % 2 ? "md:ml-10" : "md:mr-10"}`} />
            </div>
            <div className="md:col-span-4 flex flex-col justify-end">
              <p className="text-accent text-xs tracking-mega">{s.meta.toUpperCase()}</p>
              <h2 className="display text-3xl md:text-5xl group-hover:translate-x-2 transition-transform">{s.title}</h2>
              <span className="mt-3 text-sm tracking-widest">OPEN →</span>
            </div>
          </Link>
        ))}
        <div className="mt-14">
          <p className="text-[11px] tracking-mega text-bone/50 mb-4">MORE WORLDS</p>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 -mx-5 px-5 md:mx-0 md:px-0 md:flex-wrap">
            {WORLDS.map((o) => (
              <Link
                key={o.slug}
                to={`/world/${o.slug}`}
                aria-current={o.slug === w.slug ? "page" : undefined}
                className={`shrink-0 border px-5 py-2.5 min-h-[48px] flex items-center text-xs tracking-mega transition-colors ${o.slug === w.slug ? "border-accent text-accent" : "border-white/20 text-bone/70 hover:border-bone/60 hover:text-bone"}`}
              >
                {o.name.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex justify-between mt-10 text-sm tracking-widest">
          <Link to="/worlds" className="border-b border-accent pb-1">← ALL WORLDS</Link>
          <Link to={`/begin?world=${w.slug}`} className="border-b border-accent pb-1">START A PROJECT →</Link>
        </div>
      </div>
      <Footer dark />
    </main>
  );
}
