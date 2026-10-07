import { createContext, useContext } from "react";

const LenisCtx = createContext(null);
export const useLenis = () => useContext(LenisCtx);
export default LenisCtx;

// Reference-counted scroll lock shared by menu + lightbox overlays.
// Lenis keeps intercepting wheel events even with body overflow hidden,
// so overlays must stop it explicitly. Counter keeps nested overlays safe.
let lenisInst = null;
let locks = 0;

export function registerLenis(instance) {
  lenisInst = instance;
  if (!instance) locks = 0;
}

export function lockScroll() {
  locks += 1;
  try {
    lenisInst?.stop();
  } catch {
    /* no smooth-scroll instance */
  }
  document.body.style.overflow = "hidden";
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks === 0) {
    try {
      lenisInst?.start();
    } catch {
      /* no smooth-scroll instance */
    }
    document.body.style.overflow = "";
  }
}
