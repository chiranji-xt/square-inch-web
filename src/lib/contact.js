import { SITE } from "../data/site.js";

// Contact helpers built ONLY from verified SITE config. No invented numbers.

// "98233 33400" -> "tel:+919823333400"
export function telHref(display) {
  const digits = String(display).replace(/\D/g, "");
  const local = digits.length > 10 ? digits.slice(-10) : digits;
  return `tel:+91${local}`;
}

export function mailHref(subject = "", body = "") {
  const q = new URLSearchParams();
  if (subject) q.set("subject", subject);
  if (body) q.set("body", body);
  const s = q.toString();
  return `mailto:${SITE.email}${s ? `?${s}` : ""}`;
}

// wa.me link only when a real WhatsApp number is configured in SITE.whatsapp.
export function whatsappHref(text = "") {
  if (!SITE.whatsapp) return null;
  const q = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${SITE.whatsapp}${q}`;
}
