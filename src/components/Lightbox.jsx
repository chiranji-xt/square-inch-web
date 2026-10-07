import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Lightbox({ images, index, close, setIndex, label }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const h = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setIndex((index + 1) % images.length);
      if (e.key === "ArrowLeft") setIndex((index - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [index, images.length, close, setIndex]);

  const [sx, setSx] = useState(null);
  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Gallery — ${label}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/95 text-bone flex flex-col"
          onTouchStart={(e) => setSx(e.touches[0].clientX)} onTouchEnd={(e) => {
            if (sx === null) return; const dx = e.changedTouches[0].clientX - sx;
            if (dx < -40) setIndex((index + 1) % images.length);
            if (dx > 40) setIndex((index - 1 + images.length) % images.length);
          }}
        >
          <div className="flex items-center justify-between p-5 text-sm tracking-mega">
            <span>{String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")} — {label}</span>
            <button ref={closeRef} onClick={close} aria-label="Close gallery" className="min-h-[48px] min-w-[48px] flex items-center justify-center hover:text-accent">ESC ✕</button>
          </div>
          <div className="flex-1 flex items-center justify-center px-4 min-h-0">
            <img src={images[index]} alt={`${label} — photograph ${index + 1} of ${images.length}`} className="max-h-[72vh] max-w-full object-contain" onError={(e) => { e.currentTarget.style.display = "none"; }} />
          </div>
          <p className="text-center text-bone/60 text-xs tracking-widest px-6">{label}</p>
          <div className="flex justify-between items-center p-4 md:p-6">
            <button onClick={() => setIndex((index - 1 + images.length) % images.length)} aria-label="Previous photograph" className="min-h-[56px] min-w-[64px] flex items-center justify-center text-3xl hover:text-accent">←</button>
            <button onClick={() => setIndex((index + 1) % images.length)} aria-label="Next photograph" className="min-h-[56px] min-w-[64px] flex items-center justify-center text-3xl hover:text-accent">→</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
