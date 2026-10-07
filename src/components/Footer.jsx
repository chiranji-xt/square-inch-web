import { Link } from "react-router-dom";
import { SITE, NAV } from "../data/site.js";
import { telHref, mailHref, whatsappHref } from "../lib/contact.js";

export default function Footer({ dark = false }) {
  return (
    <footer className={`${dark ? "bg-night text-bone" : "bg-ink text-bone"} px-5 md:px-10 pt-16 pb-8 border-t border-current/10`}>      <div className="grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3"><span className="h-4 w-4 bg-accent inline-block" /><span className="tracking-[0.25em] text-sm">SQUARE INCH</span></div>
          <p className="mt-4 text-sm opacity-70 max-w-xs">Every Inch Speaks — a walkthrough exhibition of 20 years of spatial design. {SITE.city}.</p>
        </div>
        <div className="text-sm">
          <p className="text-xs tracking-mega opacity-60 mb-3">PUNE OFFICE</p><p className="opacity-80">{SITE.pune}</p>
        </div>
        <div className="text-sm">
          <p className="text-xs tracking-mega opacity-60 mb-3">SATARA OFFICE</p><p className="opacity-80">{SITE.satara}</p>
          <p className="mt-3 opacity-80">
            {SITE.phones.map((p, k) => (
              <span key={p}>{k > 0 && " · "}<a href={telHref(p)} className="inline-block py-1 underline underline-offset-4 hover:text-accent">{p}</a></span>
            ))}
            <br /><a href={mailHref()} className="inline-block py-1 underline underline-offset-4 hover:text-accent">{SITE.email}</a>
            {whatsappHref() && <><br /><a href={whatsappHref(SITE.whatsappText)} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-accent">WhatsApp us</a></>}
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-2 text-sm">
          {NAV.map((n) => (
            <Link key={n.to + n.label} to={n.to} className="hover:text-accent w-fit min-h-[44px] flex items-center">{n.label} →</Link>
          ))}
        </nav>
      </div>
      <div className="mt-12 flex justify-between text-[11px] tracking-widest opacity-60">
        <span>© {new Date().getFullYear()} {SITE.name.toUpperCase()} · {SITE.lead.toUpperCase()}</span>
        <span>{SITE.city.toUpperCase()}</span>
      </div>
    </footer>
  );
}
