import { Link, useLocation } from "react-router-dom";
import { SITE } from "../data/site.js";
import { telHref, whatsappHref } from "../lib/contact.js";

// Subtle mobile-only enquiry bar. CALL + ENQUIRE always;
// WHATSAPP appears only when SITE.whatsapp is configured.
// Hidden on the /begin page itself (the form is right there).
export default function StickyBar() {
  const { pathname } = useLocation();
  if (pathname === "/begin") return null;
  const wa = whatsappHref(SITE.whatsappText);
  const items = [
    { label: "CALL", href: telHref(SITE.phones[0]), external: false },
    ...(wa ? [{ label: "WHATSAPP", href: wa, external: true }] : []),
  ];
  return (
    <>
      <div className="h-[52px] md:hidden" aria-hidden="true" />
      <nav aria-label="Quick enquiry" className="fixed bottom-0 inset-x-0 z-40 md:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div className="grid" style={{ gridTemplateColumns: `repeat(${items.length + 1}, 1fr)` }}>
        {items.map((a) => (
          <a
            key={a.label}
            href={a.href}
            {...(a.external ? { target: "_blank", rel: "noreferrer" } : {})}
            className="bg-night/95 backdrop-blur text-bone text-[11px] tracking-mega text-center py-4 border-t border-r border-white/10 min-h-[52px] flex items-center justify-center active:bg-ink"
          >
            {a.label}
          </a>
        ))}
        <Link to="/begin" className="bg-accent text-ink text-[11px] tracking-mega text-center py-4 min-h-[52px] flex items-center justify-center font-medium">
          ENQUIRE
        </Link>
      </div>
    </nav>
    </>
  );
}
