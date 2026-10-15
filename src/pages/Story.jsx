import { useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Photo from "../components/Photo.jsx";
import Footer from "../components/Footer.jsx";
import Lightbox from "../components/Lightbox.jsx";
import NotFound from "./NotFound.jsx";
import { RevealMask, StaggerWords } from "../components/motion.jsx";
import { STORIES, WORLDS } from "../data/site.js";

export default function StoryDetail() {
  const { id } = useParams();
  const [lb, setLb] = useState(null);
  const openerRef = useRef(null);
  const s = STORIES.find((x) => x.id === id);
  if (!s) return <NotFound />;
  const idx = STORIES.indexOf(s);
  const next = STORIES[(idx + 1) % STORIES.length];
  const prev = STORIES[(idx - 1 + STORIES.length) % STORIES.length];
  const world = WORLDS.find((x) => x.slug === s.world);
  const facts = [s.sector, s.type, s.area, s.city, s.award].filter(Boolean);
  const related = [
    ...STORIES.filter((x) => x.id !== s.id && x.sector === s.sector),
    ...STORIES.filter((x) => x.id !== s.id && x.sector !== s.sector),
  ].slice(0, 2);
  const openAt = (e, n) => {
    openerRef.current = e.currentTarget;
    setLb(n);
  };

  return (
    <main className="bg-[#F4EDDE] text-[#1F2C46] pt-28 md:pt-32" id="main" tabIndex={-1}>
      <nav aria-label="Breadcrumb" className="px-5 md:px-10 pt-6 text-[11px] tracking-mega text-[#1F2C46]/60">
        <Link to="/worlds" className="hover:text-[#E76B46]">WORLDS</Link>
        <span aria-hidden="true"> › </span>
        {world && <><Link to={`/world/${world.slug}`} className="hover:text-[#E76B46]">{world.name.toUpperCase()}</Link><span aria-hidden="true"> › </span></>}
        <span aria-current="page" className="text-[#1F2C46]">{s.title.toUpperCase()}</span>
      </nav>
      <button onClick={(e) => openAt(e, 0)} aria-label={`Open photograph 1 of ${s.images.length}`} className="block w-full text-left mt-4">
        <Photo src={s.images[0]} label={s.title.toUpperCase()} palette={s.palette} className="h-[72vh] md:h-[92vh]" eager />
      </button>
      <div className="px-5 md:px-10 py-10 grid md:grid-cols-12 gap-6">
        <div className="md:col-span-8">
          <p className="text-[#E76B46] text-xs tracking-mega">PROJECT {s.no} · {s.meta.toUpperCase()}</p>
          <h1 className="display text-5xl md:text-8xl leading-[0.9] mt-3"><StaggerWords text={s.title} /></h1>
          {facts.length > 0 && (
            <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs tracking-mega text-[#1F2C46]/65">
              <dt className="sr-only">Project facts</dt>
              {facts.map((f) => <dd key={f}>{f.toUpperCase()}</dd>)}
            </dl>
          )}
        </div>
        <div className="md:col-span-4 flex flex-col justify-end gap-3">
          <p className="display text-8xl text-[#1F2C46]/10">{s.no}</p>
          <Link to={`/begin?project=${s.id}`} className="w-fit bg-[#E76B46] text-bone px-6 py-3 min-h-[48px] flex items-center text-sm tracking-widest hover:bg-[#1F2C46] hover:text-[#F4EDDE] transition-colors">ENQUIRE ABOUT A PROJECT LIKE THIS →</Link>
          <Link to="/projects" className="w-fit text-sm tracking-widest border-b border-line/30 pb-1 hover:border-[#E76B46]">← ALL PROJECTS</Link>
        </div>
      </div>

      <div className="px-5 md:px-10 pb-10 grid gap-8">
        {s.images.slice(1).map((src, i) => (
          <RevealMask key={src + i} from={i % 3 === 0 ? "left" : i % 3 === 1 ? "bottom" : "zoom"}>
            <button onClick={(e) => openAt(e, i + 1)} aria-label={`Open photograph ${i + 2} of ${s.images.length}`} className="block w-full text-left">
              <Photo src={src} label={`${s.title.toUpperCase()} — DETAIL 0${i + 1}`} palette={s.palette} className={`${i % 2 ? "h-[52vh] md:h-[72vh] md:ml-24" : "h-[52vh] md:h-[80vh] md:mr-24"}`} />
            </button>
          </RevealMask>
        ))}
        <div className="grid md:grid-cols-12 gap-6 py-10 border-y border-line/10">
          <p className="text-xs tracking-mega md:col-span-3 text-[#1F2C46]/60">PROJECT STORY</p>
          <p className="display text-2xl md:text-4xl md:col-span-9 leading-snug">{s.desc}</p>
        </div>
        <div className="mt-4">
          <p className="text-[11px] tracking-mega text-[#1F2C46]/60 mb-4">RELATED PROJECTS</p>
          <div className="grid md:grid-cols-2 gap-4">
            {related.map((r) => (
                <Link key={r.id} to={`/story/${r.id}`} className="group grid grid-cols-5 gap-4 items-center bg-[#EAE0C9] text-[#1F2C46] border border-[#1F2C46]/10 p-4">
                <Photo src={r.images[0]} label={r.title.toUpperCase()} palette={r.palette} className="h-[22vh] col-span-2" />
                <div className="col-span-3 p-1">
                  <p className="text-[#E76B46] text-[11px] tracking-mega">{r.sector?.toUpperCase()} · {r.no}</p>
                  <p className="display text-2xl md:text-3xl leading-tight mt-1 group-hover:translate-x-2 transition-transform">{r.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex justify-between text-xs tracking-mega pt-2">
          <Link to={`/story/${prev.id}`} className="border-b border-line/30 pb-1 hover:border-[#E76B46]">← {prev.no} · {prev.title.toUpperCase()}</Link>
          <Link to={`/story/${next.id}`} className="border-b border-line/30 pb-1 hover:border-[#E76B46]">{next.no} · {next.title.toUpperCase()} →</Link>
        </div>
        <Link to={`/story/${next.id}`} className="group grid md:grid-cols-2 gap-4 items-center bg-[#EAE0C9] text-[#1F2C46] border border-[#1F2C46]/10 p-4 md:p-6">
          <Photo src={next.images[0]} label={next.title.toUpperCase()} palette={next.palette} className="h-[36vh]" />
          <div className="p-4">
            <p className="text-[#E76B46] text-xs tracking-mega">NEXT STORY → {next.meta.toUpperCase()}</p>
            <p className="display text-4xl md:text-6xl group-hover:translate-x-2 transition-transform">{next.title}</p>
          </div>
        </Link>
      </div>
      <Lightbox images={s.images} index={lb} label={s.title} close={() => setLb(null)} setIndex={setLb} openerRef={openerRef} />
      <Footer />
    </main>
  );
}
