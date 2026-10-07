import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import Photo from "../components/Photo.jsx";
import Footer from "../components/Footer.jsx";
import { RevealMask } from "../components/motion.jsx";
import { SITE } from "../data/site.js";
import { submitEnquiry, validateEnquiry, hasEndpoint } from "../lib/enquiry.js";
import { telHref, mailHref, whatsappHref } from "../lib/contact.js";

export function Studio() {
  return (
    <main className="bg-bone pt-24">
      <div className="px-5 md:px-10 py-10">
        <p className="text-xs tracking-mega text-accent">THE STUDIO · 20 YEARS</p>
        <h1 className="display text-6xl md:text-9xl">About,<br />visually.</h1>
      </div>
      <RevealMask from="left"><Photo src="/photos/studio-01.webp" label="SI DESIGN STUDIO — SATARA" palette={["#3A3A38", "#E88932"]} className="h-[60vh] md:h-[80vh]" eager /></RevealMask>
      <div className="px-5 md:px-10 py-14 grid md:grid-cols-12 gap-8">
        <p className="display text-8xl md:text-9xl md:col-span-4 text-ink/10 leading-none">20</p>
        <div className="md:col-span-8">
          <p className="display text-2xl md:text-4xl leading-snug">SI Design — trailblazer for 20 years. Creativity and functionality for residential and commercial clients. Visions into captivating realities.</p>
          <p className="mt-6 text-ink/65 max-w-2xl">Personalized approach: understanding each client's tastes and preferences. Client satisfaction as the cornerstone — not a goal. Led by {SITE.lead}.</p>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <Photo src="/photos/studio-02.webp" label="MATERIAL TABLE" palette={["#8A867F", "#111"]} className="h-[32vh]" />
            <Photo src="/photos/studio-03.webp" label="SITE / CRAFT" palette={["#111", "#C9A86A"]} className="h-[32vh] mt-8" />
          </div>
        </div>
      </div>
      <section className="bg-night text-bone px-5 md:px-10 py-20">
        <p className="text-accent text-xs tracking-mega">AWARD · IIID 2016 ANCHOR</p>
        <h2 className="display text-4xl md:text-6xl mt-3 max-w-4xl">Commercial Workspace — Small. Runner Up. 1055 sq ft of honest local material.</h2>
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Photo src="/photos/award-01.webp" label="CERTIFICATE" palette={["#111", "#E88932"]} className="h-[40vh]" />
          <Photo src="/photos/award-02.webp" label="PUBLISHED FEATURE" palette={["#2B2E33", "#E8E4DA"]} className="h-[40vh]" />
        </div>
        <Link to="/begin" className="inline-block mt-8 bg-accent text-ink px-7 py-3 text-sm tracking-widest">WORK WITH THE STUDIO →</Link>
      </section>
      <Footer />
    </main>
  );
}

export function HowWeBuild() {
  const steps = [
    ["01", "Enquiry", "A conversation about your space, needs and way of life."],
    ["02", "Initial Meeting", "We listen to tastes, culture and daily routines."],
    ["03", "Basic Plan / Working", "Volumetric thinking — spatial dynamics before decoration."],
    ["04", "Technical Meeting", "Drawings, services and constructability resolved."],
    ["05", "Material Selection Assistance", "Stone, wood, light and colour — honest materials."],
    ["06", "Finalization", "Crafted handover. A space that holds time."],
  ];
  const lineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ["start 0.8", "end 0.6"] });
  return (
    <main className="bg-bone pt-24">
      <div className="px-5 md:px-10 py-10 flex flex-col md:flex-row justify-between gap-4">
        <h1 className="display text-6xl md:text-9xl">How we<br />build.</h1>
        <p className="max-w-xs text-ink/65 text-sm self-end">One orange line travels down as you scroll — a blueprint being drawn. Photography appears alongside each stage.</p>
      </div>
      <div className="px-5 md:px-10 pb-20 grid md:grid-cols-[1fr_380px] gap-10">
        <div ref={lineRef} className="relative pl-10">
          <div className="absolute left-3 top-0 bottom-0 w-px bg-ink/15" />
          <motion.div style={{ scaleY: scrollYProgress }} className="absolute left-3 top-0 bottom-0 w-px bg-accent origin-top" aria-hidden="true" />
          {steps.map(([n, t, d], i) => (
            <RevealMask key={n} from={i % 2 ? "right" : "left"}>
              <div className="py-10 border-b border-ink/10 grid md:grid-cols-2 gap-4 items-center">
                <div>
                  <p className="display text-7xl md:text-8xl text-ink/10">{n}</p>
                  <h2 className="display text-4xl md:text-5xl -mt-6">{t}</h2>
                  <p className="text-ink/65 mt-2 max-w-sm">{d}</p>
                </div>
                <Photo src={`/photos/process-0${i + 1}.webp`} label={t.toUpperCase()} palette={["#222", "#E88932"]} className="h-[30vh]" />
              </div>
            </RevealMask>
          ))}
        </div>
        <aside className="md:sticky md:top-24 h-fit border border-ink/15 p-6">
          <p className="text-xs tracking-mega text-accent">BLUEPRINT NOTE</p>
          <p className="display text-2xl mt-2">Scroll slowly. Each stage arrives like a drawing layer.</p>
          <Link to="/begin" className="inline-block mt-6 bg-ink text-bone px-6 py-3 text-sm tracking-widest hover:bg-accent hover:text-ink">BEGIN WITH 01 →</Link>
        </aside>
      </div>
      <Footer />
    </main>
  );
}

const TYPES = ["Residential", "Commercial", "Hospitality", "Other"];
const BUDGETS = ["Under ₹5L", "₹5–15L", "₹15–35L", "₹35L+", "Prefer to discuss"];

const emptyForm = { name: "", phone: "", email: "", type: "", location: "", area: "", budget: "", message: "" };

function EnquiryForm() {
  const [v, setV] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");
  const sending = useRef(false);
  const endpoint = hasEndpoint();

  const set = (k) => (e) => {
    setV((p) => ({ ...p, [k]: e.target.value }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (sending.current) return; // prevent duplicate submissions
    const errs = validateEnquiry(v);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = document.querySelector("[data-error='true'] input, [data-error='true'] select, [data-error='true'] textarea");
      if (first) first.focus();
      return;
    }
    sending.current = true;
    setStatus("sending");
    setErrorMsg("");
    try {
      await submitEnquiry(v);
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again or call us directly.");
    } finally {
      sending.current = false;
    }
  };

  if (status === "sent") {
    return (
      <div className="border border-bone/20 p-8 md:p-10 max-w-xl" role="status">
        <p className="text-accent text-[11px] tracking-mega">ENQUIRY RECEIVED</p>
        <p className="display text-4xl md:text-5xl mt-3">Thank you, {v.name.split(" ")[0] || "friend"}.</p>
        <p className="text-bone/70 text-sm mt-4">
          {endpoint
            ? "Your enquiry is with the studio. Expect a call within two working days."
            : "Your email app should have opened with everything pre-filled — just press send and the studio has your enquiry."}
        </p>
        <p className="text-bone/60 text-sm mt-3">
          Prefer to talk now?{" "}
          <a className="underline underline-offset-4 hover:text-accent" href={telHref(SITE.phones[0])}>Call {SITE.phones[0]}</a>
          {whatsappHref() && (
            <> · <a className="underline underline-offset-4 hover:text-accent" href={whatsappHref(`Hello Square Inch Design, I'm ${v.name}. I'd like to discuss a project.`)} target="_blank" rel="noreferrer">WhatsApp us</a></>
          )}
        </p>
        <button onClick={() => { setV(emptyForm); setStatus("idle"); }} className="mt-6 border border-bone/40 px-6 py-2.5 text-xs tracking-mega hover:bg-bone hover:text-ink transition-colors">
          SEND ANOTHER ENQUIRY
        </button>
      </div>
    );
  }

  const field = (label, required, error, input) => (
    <label className="block" data-error={error ? "true" : undefined}>
      <span className="text-[11px] tracking-mega text-bone/60">{label}{required ? " *" : " (OPTIONAL)"}</span>
      {input}
      {error && <span className="block text-accent text-xs mt-1" role="alert">{error}</span>}
    </label>
  );

  const inputCls = (bad) => `field placeholder:text-bone/25 ${bad ? "border-accent" : ""}`;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 max-w-xl">
      {field("NAME", true, errors.name,
        <input type="text" autoComplete="name" value={v.name} onChange={set("name")} placeholder="Your full name" aria-invalid={!!errors.name} className={inputCls(errors.name)} />)}
      {field("PHONE", true, errors.phone,
        <input type="tel" autoComplete="tel" value={v.phone} onChange={set("phone")} placeholder="10-digit mobile number" aria-invalid={!!errors.phone} className={inputCls(errors.phone)} />)}
      {field("EMAIL", false, errors.email,
        <input type="email" autoComplete="email" value={v.email} onChange={set("email")} placeholder="you@mail.com" aria-invalid={!!errors.email} className={inputCls(errors.email)} />)}
      <div className="grid sm:grid-cols-2 gap-5">
        {field("PROJECT TYPE", true, errors.type,
          <select value={v.type} onChange={set("type")} aria-invalid={!!errors.type} className={`${inputCls(errors.type)} bg-night`}>
            <option value="" className="text-ink">Select…</option>
            {TYPES.map((t) => <option key={t} value={t} className="text-ink">{t}</option>)}
          </select>)}
        {field("PROJECT LOCATION", true, errors.location,
          <input type="text" value={v.location} onChange={set("location")} placeholder="Pune / Satara / …" aria-invalid={!!errors.location} className={inputCls(errors.location)} />)}
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        {field("APPROXIMATE AREA", false, null,
          <input type="text" value={v.area} onChange={set("area")} placeholder="e.g. 1200 sqft" className={inputCls()} />)}
        {field("BUDGET RANGE", false, null,
          <select value={v.budget} onChange={set("budget")} className={`${inputCls()} bg-night`}>
            <option value="" className="text-ink">Select…</option>
            {BUDGETS.map((b) => <option key={b} value={b} className="text-ink">{b}</option>)}
          </select>)}
      </div>
      {field("PROJECT REQUIREMENTS", false, null,
        <textarea rows={4} value={v.message} onChange={set("message")} placeholder="Rooms, style you like, timeline…" className={`${inputCls()} resize-y`} />)}
      {!endpoint && (
        <label className="block">
          <span className="text-[11px] tracking-mega text-bone/60">REFERENCE IMAGE (SHARE AFTER SENDING)</span>
          <input type="file" accept="image/*" aria-label="Reference image — share with the studio after sending" className="mt-3 text-sm text-bone/70" />
        </label>
      )}
      {status === "error" && <p className="text-accent text-sm" role="alert">{errorMsg}</p>}
      <div className="pt-2">
        <button type="submit" disabled={status === "sending"} className="bg-accent text-ink px-8 py-4 tracking-widest text-sm hover:bg-bone transition-colors disabled:opacity-60 disabled:cursor-wait min-h-[48px]">
          {status === "sending" ? "SENDING…" : "SEND ENQUIRY →"}
        </button>
        <p className="text-bone/50 text-xs mt-3">Fields marked * are required. No spam, no sharing — the studio replies directly.</p>
      </div>
    </form>
  );
}

export function Begin() {
  const wa = whatsappHref("Hello Square Inch Design, I'd like to discuss a project.");
  return (
    <main className="bg-night text-bone pt-24 dark">
      <div className="relative h-[52vh] overflow-hidden">
        <Photo src="/photos/traditional-02.webp" label="LET'S CREATE SOMETHING" palette={["#2B2118", "#E88932"]} className="h-[52vh]" eager />
        <div className="absolute inset-0 bg-black/45 flex items-end p-5 md:p-10">
          <h1 className="display text-6xl md:text-9xl leading-[0.9]">Let's<br />create.</h1>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-10 px-5 md:px-10 py-14">
        <EnquiryForm />
        <div className="text-sm space-y-6">
          <div><p className="text-xs tracking-mega text-accent">PUNE OFFICE</p><p className="text-bone/80 mt-1">{SITE.pune}</p></div>
          <div>
            <p className="text-xs tracking-mega text-accent">SATARA OFFICE</p>
            <p className="text-bone/80 mt-1">{SITE.satara}</p>
            <p className="mt-3 text-bone/80">
              {SITE.phones.map((p, k) => (
                <span key={p}>{k > 0 && <br />}<a href={telHref(p)} className="underline underline-offset-4 hover:text-accent">{p}</a></span>
              ))}
              <br /><a href={mailHref()} className="underline underline-offset-4 hover:text-accent">{SITE.email}</a>
            </p>
            {wa && <a href={wa} target="_blank" rel="noreferrer" className="inline-block mt-4 border border-bone/40 px-6 py-2.5 text-xs tracking-mega hover:bg-bone hover:text-ink transition-colors">WHATSAPP US →</a>}
          </div>
          <Photo src="/photos/luxury-02.webp" label="DETAIL — GILDED FIXTURE" palette={["#0E1E3A", "#C9A86A"]} className="h-[30vh]" />
        </div>
      </div>
      <Footer dark />
    </main>
  );
}
