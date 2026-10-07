import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Photo from "../components/Photo.jsx";
import Footer from "../components/Footer.jsx";
import Lightbox from "../components/Lightbox.jsx";
import { RevealMask, StaggerWords } from "../components/motion.jsx";
import { STORIES } from "../data/site.js";

export default function StoryDetail() {
  const { id } = useParams();
  const s = STORIES.find((x) => x.id === id) ?? STORIES[0];
  const idx = STORIES.indexOf(s);
  const next = STORIES[(idx + 1) % STORIES.length];
  const prev = STORIES[(idx - 1 + STORIES.length) % STORIES.length];
  const [lb, setLb] = useState(null);

  return (
    <main className="bg-bone pt-20">
      <Photo src={s.images[0]} label={s.title.toUpperCase()} palette={s.palette} className="h-[72vh] md:h-[92vh]" eager />
      <div className="px-5 md:px-10 py-10 grid md:grid-cols-12 gap-6">
        <div className="md:col-span-8">
          <p className="text-accent text-xs tracking-mega">PROJECT {s.no} · {s.meta.toUpperCase()}</p>
          <h1 className="display text-5xl md:text-8xl leading-[0.9] mt-3"><StaggerWords text={s.title} /></h1>
        </div>
        <div className="md:col-span-4 flex flex-col justify-end">
          <p className="display text-8xl text-ink/10">{s.no}</p>
          <Link to="/begin" className="mt-2 w-fit bg-ink text-bone px-6 py-3 text-sm tracking-widest hover:bg-accent hover:text-ink transition-colors">ENQUIRE FOR THIS LANGUAGE →</Link>
        </div>
      </div>

      <div className="px-5 md:px-10 pb-10 grid gap-8">
        {s.images.slice(1).map((src, i) => (
          <RevealMask key={src + i} from={i % 3 === 0 ? "left" : i % 3 === 1 ? "bottom" : "zoom"}>
            <button onClick={() => setLb(i + 1)} className="block w-full text-left">
              <Photo src={src} label={`${s.title.toUpperCase()} — DETAIL 0${i + 1}`} palette={s.palette} className={`${i % 2 ? "h-[52vh] md:h-[72vh] md:ml-24" : "h-[52vh] md:h-[80vh] md:mr-24"}`} />
            </button>
          </RevealMask>
        ))}
        <div className="grid md:grid-cols-12 gap-6 py-10 border-y border-ink/10">
          <p className="text-xs tracking-mega md:col-span-3 text-warmgrey">PROJECT STORY</p>
          <p className="display text-2xl md:text-4xl md:col-span-9 leading-snug">{s.desc}</p>
        </div>
        <div className="flex justify-between text-xs tracking-mega pt-2">
          <Link to={`/story/${prev.id}`} className="border-b border-ink/30 pb-1 hover:border-accent">← {prev.no} · {prev.title.toUpperCase()}</Link>
          <Link to={`/story/${next.id}`} className="border-b border-ink/30 pb-1 hover:border-accent">{next.no} · {next.title.toUpperCase()} →</Link>
        </div>
        <Link to={`/story/${next.id}`} className="group grid md:grid-cols-2 gap-4 items-center bg-night text-bone p-4 md:p-6">
          <Photo src={next.images[0]} label={next.title.toUpperCase()} palette={next.palette} className="h-[36vh]" />
          <div className="p-4">
            <p className="text-accent text-xs tracking-mega">NEXT STORY → {next.meta.toUpperCase()}</p>
            <p className="display text-4xl md:text-6xl group-hover:translate-x-2 transition-transform">{next.title}</p>
          </div>
        </Link>
      </div>
      <Lightbox images={s.images} index={lb} label={s.title} close={() => setLb(null)} setIndex={setLb} />
      <Footer />
    </main>
  );
}
