import { Link, useSearchParams } from "react-router-dom";
import Photo from "../components/Photo.jsx";
import Footer from "../components/Footer.jsx";
import { WORLDS, STORIES } from "../data/site.js";

const SECTORS = ["All", "Residential", "Commercial"];

function worldName(slug) {
  return WORLDS.find((w) => w.slug === slug)?.name ?? slug;
}

export default function Projects() {
  const [params, setParams] = useSearchParams();
  const sector = SECTORS.includes(params.get("sector")) ? params.get("sector") : "All";
  const list = sector === "All" ? STORIES : STORIES.filter((s) => s.sector === sector);

  return (
    <main className="bg-bone pt-24" id="main">
      <div className="px-5 md:px-10 py-10">
        <p className="text-xs tracking-mega text-accent">EVERY PROJECT · FLAT INDEX</p>
        <h1 className="display text-6xl md:text-9xl leading-[0.9]">Projects.</h1>
        <div className="flex gap-2 mt-8" role="group" aria-label="Filter by sector">
          {SECTORS.map((c) => (
            <button
              key={c}
              onClick={() => setParams(c === "All" ? {} : { sector: c })}
              aria-pressed={sector === c}
              className={`border px-5 py-2.5 min-h-[48px] text-xs tracking-mega transition-colors ${sector === c ? "border-accent text-accent" : "border-ink/20 hover:border-ink/60"}`}
            >
              {c.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 md:px-10 pb-20">
        {list.map((s, i) => (
          <Link key={s.id} to={`/story/${s.id}`} className="grid md:grid-cols-12 gap-6 py-10 border-t border-ink/10 group">
            <span className="display text-6xl text-ink/15 md:col-span-2" aria-hidden="true">{s.no}</span>
            <div className="md:col-span-6">
              <Photo src={s.images[0]} label={s.title.toUpperCase()} palette={s.palette} className={`h-[40vh] md:h-[52vh] ${i % 2 ? "md:ml-10" : "md:mr-10"}`} />
            </div>
            <div className="md:col-span-4 flex flex-col justify-end">
              <p className="text-accent text-xs tracking-mega">{s.sector?.toUpperCase()} · {worldName(s.world).toUpperCase()}</p>
              <h2 className="display text-3xl md:text-5xl mt-1 group-hover:translate-x-2 transition-transform">{s.title}</h2>
              <p className="text-ink/65 text-sm mt-2">{s.meta}</p>
              <span className="mt-3 text-sm tracking-widest">OPEN →</span>
            </div>
          </Link>
        ))}
        <div className="flex justify-between mt-10 text-sm tracking-widest">
          <Link to="/worlds" className="border-b border-accent pb-1">← BROWSE BY WORLD</Link>
          <Link to="/begin" className="border-b border-accent pb-1">START A PROJECT →</Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
