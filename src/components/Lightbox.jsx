import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { lockScroll, unlockScroll } from "../lib/lenis.jsx";

export default function Lightbox({ images, index, close, setIndex, label, openerRef }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const wasOpen = useRef(false);
  const [sx, setSx] = useState(null);
  const [failed, setFailed] = useState(false);
  const open = index !== null;

  // Reset the error placeholder whenever the slide changes.
  useEffect(() => {
    setFailed(false);
  }, [index]);

  // Preload neighbours while open.
  useEffect(() => {
    if (!open) return;
    [(index + 1) % images.length, (index - 1 + images.length) % images.length].forEach((n) => {
      const im = new Image();
      im.src = images[n];
    });
  }, [open, index, images]);

  useEffect(() => {
    if (!open) {
      // Restore focus to the thumbnail that opened the gallery.
      if (wasOpen.current) {
        wasOpen.current = false;
        openerRef?.current?.focus?.();
      }
      return;
    }
    wasOpen.current = true;
    lockScroll();
    closeRef.current?.focus();
    const h = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setIndex((index + 1) % images.length);
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setIndex((index - 1 + images.length) % images.length);
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
    window.addEventListener("keydown", h);
    return () => {
      window.removeEventListener("keydown", h);
      unlockScroll();
    };
  }, [open, index, images.length, close, setIndex, openerRef]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
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
          <div className="flex-1 flex items-center justify-center px-4 min-h-0" data-lenis-prevent>
            {failed ? (
              <div className="max-h-[72vh] w-full max-w-3xl bg-white/5 border border-white/10 flex items-center justify-center p-10" role="img" aria-label={label}>
                <p className="display text-2xl text-bone/70">{label}</p>
              </div>
            ) : (
              <img
                src={images[index]}
                alt={`${label} — photograph ${index + 1} of ${images.length}`}
                className="max-h-[72vh] max-w-full object-contain"
                onError={() => setFailed(true)}
              />
            )}
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
