import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { WORLDS } from "../data/site.js";
import Photo from "./Photo.jsx";

// SIGNATURE: The Inch Lens. Sharp photo visible only inside a square that
// follows cursor/finger. Outside: blurred type. Original to Square Inch.
export default function InchLens() {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(5);
  const [explored, setExplored] = useState(false);

  const move = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = ((e.clientX ?? e.touches?.[0]?.clientX) - r.left) / r.width * 100;
    const cy = ((e.clientY ?? e.touches?.[0]?.clientY) - r.top) / r.height * 100;
    setPos({ x: Math.max(0, Math.min(100, cx)), y: Math.max(0, Math.min(100, cy)) });
    setExplored(true);
  };

  return (
    <section data-room="2" data-room-label="Eight worlds" className="bg-night text-bone py-24 md:py-36">
      <div className="px-5 md:px-10 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-mega text-accent">ROOM 03 — EIGHT WORLDS · SIGNATURE · HOLD TO SEE EVERY INCH</p>
          <h2 className="display text-5xl md:text-8xl leading-[0.9] mt-3">Move the<br />square inch.</h2>
        </div>
        <p className="max-w-xs text-bone/60 text-sm">Only inside the orange square is the work sharp. Outside is memory. Eight worlds live under your hand.</p>
      </div>

      <div className="grid md:grid-cols-[280px_1fr] gap-6 px-5 md:px-10">
        <div className="flex md:flex-col gap-2 overflow-x-auto no-scrollbar">
          {WORLDS.map((w, i) => (
            <button key={w.slug} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)} aria-pressed={i === active} className={`text-left shrink-0 px-3 py-2 min-h-[52px] border-l-2 ${i === active ? "border-accent text-bone" : "border-white/10 text-bone/40"}`}>
              <span className="text-[10px] tracking-mega">0{i + 1}</span>
              <span className="display block text-2xl md:text-3xl leading-none">{w.name}</span>
            </button>
          ))}
        </div>

        <div ref={ref} onMouseMove={move} onTouchMove={move} role="img" aria-label={`Design world lens. Currently showing ${WORLDS[active].name}. Move across the frame to inspect each world.`} className="relative h-[62vh] md:h-[78vh] overflow-hidden bg-black select-none [@media(pointer:fine)]:cursor-none">
          {!explored && (
            <div className="absolute z-10 left-1/2 top-5 -translate-x-1/2 bg-black/55 backdrop-blur px-4 py-2 text-[10px] tracking-mega text-bone pointer-events-none whitespace-nowrap">
              MOVE / DRAG TO EXPLORE
            </div>
          )}
          {/* custom cursor ring — fine pointers only; touch users get the hint above */}
          <div
            aria-hidden="true"
            className="absolute z-10 hidden [@media(pointer:fine)]:block w-14 h-14 -ml-7 -mt-7 rounded-full border border-bone/90 pointer-events-none"
            style={{ left: `${pos.x}%`, top: `${pos.y}%`, transition: "left 120ms ease-out, top 120ms ease-out" }}
          />
          {WORLDS.map((w, i) => (
            <div key={w.slug} className={`absolute inset-0 transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-0"}`}>
              {/* blurred ghost */}
              <Photo src={w.photo} label={w.name} palette={w.fallback} className="absolute inset-0 blur-md scale-110 opacity-60" />
              {/* sharp lens */}
              <div
                className="absolute inset-0"
                style={{
                  clipPath: `inset(${pos.y - 22}% ${100 - pos.x - 18}% ${100 - pos.y - 22}% ${pos.x - 18}%)`,
                  transition: "clip-path 90ms linear",
                }}
              >
                <Photo src={w.photo} label={w.name} palette={w.fallback} className="absolute inset-0" />
              </div>
              {/* lens frame */}
              <div className="absolute w-36 h-36 md:w-56 md:h-56 border border-accent pointer-events-none" style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%,-50%)" }}>
                <span className="absolute -top-6 left-0 text-[10px] tracking-mega text-accent">■ 1 INCH</span>
                <span className="absolute -bottom-6 left-0 text-[10px] tracking-mega text-bone/70">{w.count} · {w.note}</span>
              </div>
            </div>
          ))}
          <Link to={`/world/${WORLDS[active].slug}`} className="absolute bottom-6 right-6 z-10 bg-bone text-ink px-6 min-h-[48px] flex items-center text-sm tracking-widest hover:bg-accent transition-colors">ENTER {WORLDS[active].name.toUpperCase()} →</Link>
        </div>
      </div>
    </section>
  );
}
