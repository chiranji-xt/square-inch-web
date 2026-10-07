import { mailHref } from "./contact.js";

// Backend-ready enquiry submission.
// - If VITE_ENQUIRY_ENDPOINT is set (a Formspree / Getform / custom endpoint
//   whose ID is public by design), the enquiry POSTs there as JSON.
// - Otherwise the visitor's email app opens with everything pre-filled and
//   the UI reports a HANDOFF, never a "received" success.
// To connect a provider later: set VITE_ENQUIRY_ENDPOINT in .env (see
// .env.example). NEVER put secrets in VITE_* vars — they ship in the bundle.

const ENV = (import.meta.env || {});
const ENDPOINT = (ENV.VITE_ENQUIRY_ENDPOINT || "").trim();

export const STAGES = ["Not yet built", "Under construction", "Ready / possession taken", "Renovation", "Not sure"];

export function validateEnquiry(v) {
  const errors = {};
  if (!v.name || v.name.trim().length < 2) errors.name = "Please tell us your name.";

  const raw = (v.phone || "").trim();
  const digits = raw.replace(/\D/g, "");
  let phoneOk = false;
  if (raw.startsWith("+")) {
    // International format: + followed by 10–15 digits (covers +91 too).
    phoneOk = digits.length >= 10 && digits.length <= 15;
  } else {
    let d = digits;
    if (/^0\d{10}$/.test(d)) d = d.slice(1); // trunk prefix
    if (/^91\d{10}$/.test(d)) d = d.slice(2); // country code without +
    phoneOk = /^\d{10}$/.test(d);
  }
  if (!phoneOk) errors.phone = "Enter a valid mobile number (10 digits, or +country code).";

  if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim()))
    errors.email = "That email doesn't look right.";
  if (!v.type) errors.type = "Choose a project type.";
  if (!v.location || v.location.trim().length < 2) errors.location = "Where is the project?";
  return errors;
}

export function enquirySummary(v) {
  return [
    `Name: ${v.name}`,
    `Phone: ${v.phone}`,
    v.email ? `Email: ${v.email}` : null,
    `Project type: ${v.type}`,
    `Location: ${v.location}`,
    v.area ? `Approx. area: ${v.area}` : null,
    v.budget ? `Budget: ${v.budget}` : null,
    v.stage ? `Property stage: ${v.stage}` : null,
    v.source ? `Interested in: ${v.source}` : null,
    v.message ? `Requirements: ${v.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function submitEnquiry(values) {
  const payload = {
    name: values.name.trim(),
    phone: values.phone.trim(),
    email: (values.email || "").trim(),
    type: values.type,
    location: values.location.trim(),
    area: (values.area || "").trim(),
    budget: values.budget || "",
    stage: values.stage || "",
    message: (values.message || "").trim(),
    source: values.source || "",
    page: window.location.href,
  };

  if (ENDPOINT) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 12000);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        signal: ctrl.signal,
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`bad status ${res.status}`);
      return { channel: "endpoint", payload };
    } catch (err) {
      if (err?.name === "AbortError") throw new Error("The enquiry service took too long. Please try again, or call / email us directly.");
      throw new Error("The enquiry service didn't respond. Please try again, or call / email us directly.");
    } finally {
      clearTimeout(timer);
    }
  }

  // No backend: hand the composed enquiry to the studio's inbox via the
  // visitor's own email app. Caller must show the HANDOFF state, not success.
  window.location.href = mailHref(
    `Project enquiry — ${payload.name} (${payload.type}, ${payload.location})`,
    enquirySummary(payload)
  );
  return { channel: "email", payload };
}

export function hasEndpoint() {
  return Boolean(ENDPOINT);
}
