import { SITE } from "../data/site.js";
import { mailHref } from "./contact.js";

// Backend-ready enquiry submission.
// 1. If VITE_ENQUIRY_ENDPOINT is set (Formspree / Getform / custom API),
//    the enquiry POSTs there as JSON: { name, phone, email, type, location,
//    area, budget, message }.
// 2. Otherwise it falls back to opening the visitor's email client addressed
//    to the studio with the enquiry pre-filled — no fake "success".
// To connect a provider later: set VITE_ENQUIRY_ENDPOINT in .env and, if the
// provider needs a key, add it as VITE_ENQUIRY_KEY (sent as Bearer token).
// No credentials are stored in this repo.

const ENDPOINT = (import.meta.env.VITE_ENQUIRY_ENDPOINT || "").trim();
const API_KEY = (import.meta.env.VITE_ENQUIRY_KEY || "").trim();

export function validateEnquiry(v) {
  const errors = {};
  if (!v.name || v.name.trim().length < 2) errors.name = "Please tell us your name.";
  const digits = (v.phone || "").replace(/\D/g, "").replace(/^(91)(?=\d{10}$)/, "");
  if (digits.length !== 10) errors.phone = "Enter a valid 10-digit mobile number.";
  if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim()))
    errors.email = "That email doesn't look right.";
  if (!v.type) errors.type = "Choose a project type.";
  if (!v.location || v.location.trim().length < 2) errors.location = "Where is the project?";
  return errors;
}

function summary(v) {
  return [
    `Name: ${v.name}`,
    `Phone: ${v.phone}`,
    v.email ? `Email: ${v.email}` : null,
    `Project type: ${v.type}`,
    `Location: ${v.location}`,
    v.area ? `Approx. area: ${v.area}` : null,
    v.budget ? `Budget: ${v.budget}` : null,
    v.message ? `Requirements: ${v.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function submitEnquiry(values, { signal } = {}) {
  const payload = {
    name: values.name.trim(),
    phone: values.phone.trim(),
    email: values.email.trim(),
    type: values.type,
    location: values.location.trim(),
    area: values.area.trim(),
    budget: values.budget,
    message: values.message.trim(),
    page: window.location.href,
  };

  if (ENDPOINT) {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      signal,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(API_KEY ? { Authorization: `Bearer ${API_KEY}` } : {}),
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Enquiry service responded ${res.status}. Please try again or call us directly.`);
    return { channel: "endpoint" };
  }

  // No backend configured: hand the composed enquiry to the studio's inbox
  // via the visitor's own email app. Reference images can't ride along here,
  // so we say so honestly in the draft.
  window.location.href = mailHref(`Project enquiry — ${payload.name} (${payload.type}, ${payload.location})`, `${summary(payload)}\nReference image: to be shared separately (attach it when you write to us).`);
  return { channel: "email" };
}

export function hasEndpoint() {
  return Boolean(ENDPOINT);
}

export { SITE };
