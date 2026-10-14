import { useRef, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import Photo from "../components/Photo.jsx";
import Footer from "../components/Footer.jsx";
import { RevealMask } from "../components/motion.jsx";
import { SITE, PROCESS, WORLDS, STORIES, TEAM, VOICES } from "../data/site.js";
import { submitEnquiry, validateEnquiry, enquirySummary, STAGES } from "../lib/enquiry.js";
import { telHref, mailHref, whatsappHref, mapsHref } from "../lib/contact.js";

export function Studio() {
  return (
    <main className="bg-[#F4EDDE] text-[#1F2C46] pt-28 md:pt-32" id="main" tabIndex={-1}>
      <div className="px-5 md:px-10 pt-8 md:pt-10 pb-14 grid md:grid-cols-12 gap-8">
        <div className="md:col-span-4">
          <h2 className="display leading-[0.98] text-6xl md:text-[4.8vw]">
            <span className="block">About</span>
            <span className="block italic text-[#E76B46]">Square Inch</span>
            <span className="block italic text-[#E76B46]">Design.</span>
          </h2>
          <div className="relative mt-8 w-full max-w-[300px]">
            <svg viewBox="0 0 300 200" className="block h-auto w-full" role="img" aria-label="Square Inch mark — red square with inch marks">
              <rect x="8" y="8" width="184" height="184" fill="#F0442E" />
              <polygon points="222,8 252,8 226,86 196,86" fill="#F0442E" />
              <polygon points="262,8 292,8 266,86 236,86" fill="#F0442E" />
            </svg>
          </div>
        </div>
        <div className="md:col-span-8 md:border-l md:border-[#1F2C46]/15 md:pl-10">
          <p className="display text-[1.7rem] md:text-[2.55rem] leading-[1.18]">Transforming spaces, elevating lifestyles — <span className="italic text-[#E76B46]">where creativity meets comfort,</span> and your vision becomes home.</p>
          <div className="mt-6 grid sm:grid-cols-[1.15fr_1fr] gap-6 md:gap-8 max-w-3xl">
            <p className="leading-[1.75] text-[16.5px] md:text-[17px] text-[#1F2C46]/75">At Square Inch Design, we believe every space should <strong className="font-semibold text-[#1F2C46]">tell a unique story</strong> — blending <strong className="font-semibold text-[#1F2C46]">modern aesthetics</strong> with <strong className="font-semibold text-[#1F2C46]">personalised touches,</strong> from <strong className="font-semibold text-[#1F2C46]">custom furniture</strong> to <strong className="font-semibold text-[#1F2C46]">innovative layouts.</strong> Every detail is thoughtfully crafted to suit the client's vision: <strong className="font-semibold text-[#1F2C46]">visually striking, functional and inviting.</strong></p>
            <p className="leading-[1.75] text-[16.5px] md:text-[17px] text-[#1F2C46]/75 sm:border-l sm:border-[#1F2C46]/15 sm:pl-6 md:pl-8">A personalised approach — thoroughly understanding each client's <strong className="font-semibold text-[#1F2C46]">unique tastes and preferences.</strong> At SI Design, client satisfaction is not just a goal; it's the <strong className="font-semibold text-[#1F2C46]">cornerstone of our design philosophy.</strong> Led by {SITE.lead}.</p>
          </div>
          {SITE.services.length > 0 && (
            <div className="mt-8">
              <p className="flex items-center gap-4 text-[11px] tracking-mega text-[#1F2C46]/60 mb-3">WHAT THE STUDIO DOES <span aria-hidden="true" className="h-px w-24 md:w-28 bg-[#1F2C46]/25" /></p>
              <ul className="grid sm:grid-cols-2 gap-3 md:gap-4 max-w-3xl">
                {SITE.services.map((sv) => (
                  <li key={sv} className="border border-[#1F2C46]/15 bg-white/50 px-5 py-4 min-h-[60px] md:min-h-[68px] flex items-center justify-between gap-3 text-[15px] md:text-base text-[#1F2C46]/90 transition-colors hover:border-[#E76B46]"><span className="flex items-center"><span className="h-2 w-2 bg-[#E76B46] inline-block rotate-45 mr-3 shrink-0" aria-hidden="true" />{sv}</span><span aria-hidden="true" className="text-[#1F2C46]/45">→</span></li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <section className="bg-[#E76B46] text-[#F4EDDE] px-5 md:px-10 pt-14 md:pt-20 pb-20 md:pb-28 relative z-10 -mt-8 md:-mt-12 rounded-t-[24px] md:rounded-t-[32px]">
        <p className="display text-3xl md:text-5xl leading-[1.05] max-w-4xl">“Every space should tell a <span className="italic text-[#1F2C46]">unique story</span> — visually striking, functional and inviting.”</p>
        <p className="mt-5 text-[11px] tracking-mega text-[#F4EDDE]/80">SQUARE INCH DESIGN · PUNE — SATARA</p>
      </section>
      <section className="px-5 md:px-10 pt-16 pb-24 md:pb-28 border-t border-[#1F2C46]/10">
        <p className="text-[11px] tracking-mega text-[#E76B46] mb-2">THE TEAM</p>
        <h2 className="display text-4xl md:text-6xl leading-[0.95]">Two people,<br /><span className="italic text-[#E76B46]">one cornerstone.</span></h2>
        <div className="grid sm:grid-cols-2 gap-4 mt-8 max-w-4xl">
          {TEAM.map((m, ti) => (
            <div key={m.name} className="group border border-[#1F2C46]/15 bg-white/40 p-6 transition-colors hover:border-[#E76B46]">
              <p className="text-[11px] tracking-mega text-[#E76B46]">0{ti + 1}</p>
              <p className="display text-2xl leading-tight mt-3">{m.name}</p>
              <p className="text-[11px] tracking-mega text-[#1F2C46]/60 mt-2">{m.role.toUpperCase()}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-[#1F2C46] text-[#F4EDDE] px-5 md:px-10 pt-16 md:pt-20 pb-24 md:pb-28 relative z-10 -mt-8 md:-mt-12 rounded-t-[24px] md:rounded-t-[32px]">
        <p className="text-[11px] tracking-mega text-[#E76B46] mb-2">CLIENT WORDS</p>
        <h2 className="display text-4xl md:text-6xl leading-[0.95]">What our<br /><span className="italic text-[#E76B46]">clients say.</span></h2>
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {VOICES.map((v) => (
            <figure key={v.name} className="border border-[#F4EDDE]/15 p-6 flex flex-col bg-white/[0.04] transition-colors hover:border-[#E76B46]">
              <span aria-hidden="true" className="display text-5xl leading-[0.6] text-[#E76B46]">“</span>
              <blockquote className="mt-3 text-sm leading-relaxed text-[#F4EDDE]/80">{v.quote}</blockquote>
              <figcaption className="mt-5 pt-4 border-t border-[#F4EDDE]/10">
                <p className="font-medium text-sm">{v.name}</p>
                <p className="text-[11px] tracking-mega text-[#F4EDDE]/55 mt-1">{v.role.toUpperCase()}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section className="bg-[#F4EDDE] px-5 md:px-10 pt-16 md:pt-20 pb-16 relative z-20 -mt-8 md:-mt-12 rounded-t-[24px] md:rounded-t-[32px]">
        <p className="text-[11px] tracking-mega text-[#1F2C46]/60 mb-6">FIND THE STUDIO</p>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          {[["PUNE OFFICE", SITE.pune], ["SATARA OFFICE", SITE.satara]].map(([t, a]) => (
            <div key={t} className="border border-[#1F2C46]/15 bg-white/40 p-6">
              <p className="text-xs tracking-mega text-[#E76B46]">{t}</p>
              <p className="text-sm mt-2 text-[#1F2C46]/80">{a}</p>
              <a href={mapsHref(a)} target="_blank" rel="noreferrer" className="inline-block mt-4 text-xs tracking-mega text-[#1F2C46] border-b border-[#E76B46] pb-1 hover:text-[#E76B46]">OPEN IN MAPS →</a>
            </div>
          ))}
        </div>
      </section>
      <section className="px-5 md:px-10 py-16 border-t border-[#1F2C46]/10">
        <div className="flex items-end justify-between gap-4 mb-8">
          <h2 className="display text-4xl md:text-6xl leading-[0.95]">Recent<br /><span className="italic text-[#E76B46]">projects.</span></h2>
          <Link to="/projects" className="text-sm tracking-widest border-b border-[#E76B46] pb-1 shrink-0 text-[#1F2C46] hover:text-[#E76B46] transition-colors">ALL PROJECTS →</Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {STORIES.filter((x) => x.featured).slice(0, 3).map((s) => (
            <Link key={s.id} to={`/story/${s.id}`} className="group text-[#1F2C46]">
              <Photo src={s.images[0]} label={s.title.toUpperCase()} palette={s.palette} className="h-[30vh] md:h-[36vh]" />
              <p className="text-[#E76B46] text-[11px] tracking-mega mt-3">{s.sector?.toUpperCase()} · {s.no}</p>
              <p className="display text-2xl leading-tight mt-1 group-hover:translate-x-1 transition-transform">{s.title}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="bg-[#1F2C46] text-[#F4EDDE] px-5 md:px-10 py-20">
        <p className="text-[#E76B46] text-xs tracking-mega">AWARD · IIID 2016 ANCHOR</p>
        <h2 className="display text-4xl md:text-6xl mt-3 max-w-4xl leading-[1.02]">Commercial Workspace — Small. <span className="italic text-[#E76B46]">Runner Up.</span> 1055 sq ft of honest local material.</h2>
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Photo src="/photos/award-01.webp" label="CERTIFICATE" palette={["#111", "#E88932"]} className="h-[40vh]" />
          <Photo src="/photos/award-02.webp" label="PUBLISHED FEATURE" palette={["#2B2E33", "#E8E4DA"]} className="h-[40vh]" />
        </div>
        <Link to="/begin" className="inline-block mt-8 bg-[#E76B46] text-[#1F2C46] px-7 py-3 text-sm tracking-widest hover:bg-[#F4EDDE] transition-colors">WORK WITH THE STUDIO →</Link>
      </section>
      <Footer />
    </main>
  );
}

export function HowWeBuild() {
  const lineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ["start 0.8", "end 0.6"] });
  return (
    <main className="bg-sand text-ink pt-24" id="main" tabIndex={-1}>
      <div className="px-5 md:px-10 py-10 flex flex-col md:flex-row justify-between gap-4">
        <h1 className="display text-6xl md:text-9xl">How we<br />build.</h1>
        <p className="max-w-xs text-ink/65 text-sm self-end">Six steps, in order — from first enquiry to final handover.</p>
      </div>
      <div className="px-5 md:px-10 pb-20 grid md:grid-cols-[1fr_380px] gap-10">
        <div ref={lineRef} className="relative pl-10">
          <div className="absolute left-3 top-0 bottom-0 w-px bg-ink/15" />
          <motion.div style={{ scaleY: scrollYProgress }} className="absolute left-3 top-0 bottom-0 w-px bg-accent origin-top" aria-hidden="true" />
          {PROCESS.map((p, i) => (
            <RevealMask key={p.n} from={i % 2 ? "right" : "left"}>
              <div className="py-10 border-b border-ink/10 grid md:grid-cols-2 gap-4 items-center">
                <div>
                  <p className="display text-7xl md:text-8xl text-ink/10">{p.n}</p>
                  <h2 className="display text-4xl md:text-5xl -mt-6">{p.t}</h2>
                  <p className="text-ink/65 mt-2 max-w-sm">{p.d}</p>
                </div>
                <Photo src={`/photos/process-0${i + 1}.webp`} label={p.t.toUpperCase()} palette={["#222", "#E88932"]} className="h-[30vh]" />
              </div>
            </RevealMask>
          ))}
        </div>
        <aside className="md:sticky md:top-24 h-fit border border-ink/15 p-6">
          <p className="text-xs tracking-mega text-accent">A NOTE</p>
          <p className="display text-2xl mt-2">Enquiry to handover — the whole journey, nothing hidden.</p>
          <Link to="/begin" className="inline-block mt-6 border border-ink/30 text-ink px-6 py-3 min-h-[48px] text-sm tracking-widest hover:border-accent hover:text-accent transition-colors">BEGIN WITH 01 →</Link>
        </aside>
      </div>
      <Footer />
    </main>
  );
}

const TYPES = ["Residential", "Commercial", "Hospitality", "Other"];
const BUDGETS = ["Under ₹5L", "₹5–15L", "₹15–35L", "₹35L+", "Prefer to discuss"];

const emptyForm = { name: "", phone: "", email: "", type: "", location: "", area: "", budget: "", stage: "", message: "" };

function CopyEnquiry({ values }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    const text = enquirySummary(values);
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };
  return (
    <button type="button" onClick={copy} className="border border-ink/40 px-5 py-2.5 min-h-[48px] text-[11px] tracking-mega hover:bg-ink hover:text-bone transition-colors">
      {copied ? "COPIED ✓" : "COPY ENQUIRY TEXT"}
    </button>
  );
}

function EnquiryForm({ initialMessage = "", source = "" }) {
  const [v, setV] = useState({ ...emptyForm, message: initialMessage });
  const [company, setCompany] = useState(""); // honeypot — humans never fill this
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | handoff | error
  const [errorMsg, setErrorMsg] = useState("");
  const sending = useRef(false);
  const resultRef = useRef(null);

  useEffect(() => {
    if (status === "sent" || status === "handoff") resultRef.current?.focus();
  }, [status]);

  const set = (k) => (e) => {
    setV((p) => ({ ...p, [k]: e.target.value }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (sending.current) return; // prevent duplicate submissions
    if (company.trim()) {
      // Spam bot: pretend success, send nothing.
      setStatus("sent");
      return;
    }
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
      const res = await submitEnquiry({ ...v, source });
      setStatus(res.channel === "endpoint" ? "sent" : "handoff");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again or call us directly.");
    } finally {
      sending.current = false;
    }
  };

  if (status === "sent" || status === "handoff") {
    const firstName = v.name.split(" ")[0] || "friend";
    return (
      <div className="border border-ink/20 p-8 md:p-10 max-w-xl" role="status">
        <p className="text-accent text-[11px] tracking-mega">{status === "sent" ? "ENQUIRY RECEIVED" : "ONE STEP LEFT"}</p>
        <h2 ref={resultRef} tabIndex={-1} className="display text-4xl md:text-5xl mt-3 outline-none">Thank you, {firstName}.</h2>
        {status === "sent" ? (
          <p className="text-ink/70 text-sm mt-4">
            Your enquiry is with the studio.
            {SITE.responseTime ? ` ${SITE.responseTime}` : ""}
          </p>
        ) : (
          <div className="text-ink/70 text-sm mt-4 space-y-3">
            <p>Your email app should have opened with everything pre-filled. Press send to complete your enquiry.</p>
            <p>No email app? Copy the text and send it any way you like:</p>
            <CopyEnquiry values={{ ...v, source }} />
          </div>
        )}
        <p className="text-ink/60 text-sm mt-4">
          Prefer to talk now?{" "}
          <a className="underline underline-offset-4 hover:text-accent" href={telHref(SITE.phones[0])}>Call {SITE.phones[0]}</a>
          {" · "}<a className="underline underline-offset-4 hover:text-accent" href={mailHref(`Project enquiry — ${v.name}`)}>Email us</a>
          {whatsappHref() && (
            <> · <a className="underline underline-offset-4 hover:text-accent" href={whatsappHref(SITE.whatsappText)} target="_blank" rel="noreferrer">WhatsApp us</a></>
          )}
        </p>
        <button onClick={() => { setV({ ...emptyForm, message: initialMessage }); setStatus("idle"); }} className="mt-6 border border-ink/40 px-6 py-2.5 min-h-[48px] text-xs tracking-mega hover:bg-ink hover:text-bone transition-colors">
          SEND ANOTHER ENQUIRY
        </button>
      </div>
    );
  }

  const field = (id, label, required, error, input) => (
    <label className="block" data-error={error ? "true" : undefined}>
      <span className="text-[11px] tracking-mega text-ink/60">{label}{required ? " *" : " (OPTIONAL)"}</span>
      {input}
      {error && <span id={`${id}-error`} className="block text-accent text-xs mt-1" role="alert">{error}</span>}
    </label>
  );

  const inputCls = (bad) => `field placeholder:text-ink/40 ${bad ? "border-accent" : ""}`;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 max-w-xl form-light">
      {/* Honeypot: invisible to humans, bots fill it and get a fake success. */}
      <input type="text" name="company" value={company} onChange={(e) => setCompany(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0" />
      {field("name", "NAME", true, errors.name,
        <input name="name" type="text" autoComplete="name" value={v.name} onChange={set("name")} placeholder="Your full name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} className={inputCls(errors.name)} />)}
      {field("phone", "PHONE", true, errors.phone,
        <input name="phone" type="tel" autoComplete="tel" value={v.phone} onChange={set("phone")} placeholder="10-digit mobile number" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} className={inputCls(errors.phone)} />)}
      {field("email", "EMAIL", false, errors.email,
        <input name="email" type="email" autoComplete="email" value={v.email} onChange={set("email")} placeholder="you@mail.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} className={inputCls(errors.email)} />)}
      <div className="grid sm:grid-cols-2 gap-5">
        {field("type", "PROJECT TYPE", true, errors.type,
          <select name="type" value={v.type} onChange={set("type")} aria-invalid={!!errors.type} aria-describedby={errors.type ? "type-error" : undefined} className={inputCls(errors.type)}>
            <option value="" className="text-ink">Select…</option>
            {TYPES.map((t) => <option key={t} value={t} className="text-ink">{t}</option>)}
          </select>)}
        {field("location", "PROJECT LOCATION", true, errors.location,
          <input name="location" type="text" value={v.location} onChange={set("location")} placeholder="Pune / Satara / …" aria-invalid={!!errors.location} aria-describedby={errors.location ? "location-error" : undefined} className={inputCls(errors.location)} />)}
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        {field("area", "APPROXIMATE AREA", false, null,
          <input name="area" type="text" value={v.area} onChange={set("area")} placeholder="e.g. 1200 sqft" className={inputCls()} />)}
        {field("budget", "BUDGET RANGE", false, null,
          <select name="budget" value={v.budget} onChange={set("budget")} className={inputCls()}>
            <option value="" className="text-ink">Select…</option>
            {BUDGETS.map((b) => <option key={b} value={b} className="text-ink">{b}</option>)}
          </select>)}
      </div>
      {field("stage", "PROPERTY STAGE", false, null,
        <select name="stage" value={v.stage} onChange={set("stage")} className={inputCls()}>
          <option value="" className="text-ink">Select…</option>
          {STAGES.map((s) => <option key={s} value={s} className="text-ink">{s}</option>)}
        </select>)}
      {field("message", "PROJECT REQUIREMENTS", false, null,
        <textarea name="message" rows={4} value={v.message} onChange={set("message")} placeholder="Rooms, style you like, timeline…" className={`${inputCls()} resize-y`} />)}
      {status === "error" && <p className="text-accent text-sm" role="alert">{errorMsg}</p>}
      <div className="pt-2">
        <button type="submit" disabled={status === "sending"} className="bg-accent text-bone px-8 py-4 tracking-widest text-sm hover:bg-bone hover:text-ink transition-colors disabled:opacity-60 disabled:cursor-wait min-h-[48px]">
          {status === "sending" ? "SENDING…" : "SEND ENQUIRY →"}
        </button>
        <p className="text-ink/60 text-xs mt-3">Fields marked * are required. {SITE.privacyNote}</p>
      </div>
    </form>
  );
}

export function Begin() {
  const wa = whatsappHref(SITE.whatsappText);
  const [params] = useSearchParams();
  const storyCtx = STORIES.find((x) => x.id === params.get("project")) ?? null;
  const worldCtx = !storyCtx ? WORLDS.find((x) => x.slug === params.get("world")) ?? null : null;
  const contextTitle = storyCtx ? storyCtx.title : worldCtx ? `${worldCtx.name} interiors` : "";
  const contextKey = storyCtx ? `project:${storyCtx.id}` : worldCtx ? `world:${worldCtx.slug}` : "none";
  return (
    <main className="bg-sand text-ink pt-24" id="main">
      <div className="relative h-[52vh] overflow-hidden">
        <Photo src="/photos/traditional-02.webp" label="LET'S CREATE SOMETHING" palette={["#2B2118", "#E88932"]} className="h-[52vh]" eager />
        <div className="absolute inset-0 bg-ink/45 flex items-end p-5 md:p-10 text-bone">
          <h1 className="display text-6xl md:text-9xl leading-[0.9]">Let's<br />create.</h1>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-10 px-5 md:px-10 py-14">
        <div>
          <p className="text-[11px] tracking-mega text-accent mb-4">WHAT HAPPENS NEXT — {PROCESS[0].t.toUpperCase()} → {PROCESS[1].t.toUpperCase()}</p>
          {contextTitle && (
            <p className="text-sm text-ink/80 mb-5">
              Enquiring about: <span className="text-ink">“{contextTitle}”</span>{" "}
              <Link to="/begin" className="underline underline-offset-4 text-ink/60 hover:text-accent">change</Link>
            </p>
          )}
          <EnquiryForm
            key={contextKey}
            initialMessage={contextTitle ? `I'd like a space inspired by: ${contextTitle}` : ""}
            source={storyCtx ? `project:${storyCtx.id}` : worldCtx ? `world:${worldCtx.slug}` : ""}
          />
        </div>
        <div className="text-sm space-y-6">
          <div>
            <p className="text-xs tracking-mega text-accent">PUNE OFFICE</p>
            <p className="text-ink/80 mt-1">{SITE.pune}</p>
            <a href={mapsHref(SITE.pune)} target="_blank" rel="noreferrer" className="inline-block mt-2 text-xs tracking-mega text-ink/60 border-b border-accent pb-1 hover:text-accent">OPEN IN MAPS →</a>
          </div>
          <div>
            <p className="text-xs tracking-mega text-accent">SATARA OFFICE</p>
            <p className="text-ink/80 mt-1">{SITE.satara}</p>
            <a href={mapsHref(SITE.satara)} target="_blank" rel="noreferrer" className="inline-block mt-2 text-xs tracking-mega text-ink/60 border-b border-accent pb-1 hover:text-accent">OPEN IN MAPS →</a>
            <p className="mt-3 text-ink/80">
              {SITE.phones.map((p, k) => (
                <span key={p}>{k > 0 && <br />}<a href={telHref(p)} className="inline-block py-1 underline underline-offset-4 hover:text-accent">{p}</a></span>
              ))}
              <br /><a href={mailHref()} className="inline-block py-1 underline underline-offset-4 hover:text-accent">{SITE.email}</a>
            </p>
            {wa && <a href={wa} target="_blank" rel="noreferrer" className="inline-block mt-4 border border-ink/40 px-6 py-2.5 text-xs tracking-mega hover:bg-ink hover:text-bone transition-colors">WHATSAPP US →</a>}
          </div>
          <Photo src="/photos/luxury-02.webp" label="DETAIL — GILDED FIXTURE" palette={["#0E1E3A", "#C9A86A"]} className="h-[30vh]" />
        </div>
      </div>
      <Footer dark />
    </main>
  );
}
