import { SITE } from "../data/site.js";

// Contact helpers built ONLY from verified SITE config. No invented numbers.

// "98233 33400" -> "tel:+919823333400"
export function telHref(display) {
  const digits = String(display).replace(/\D/g, "");
  const local = digits.length > 10 ? digits.slice(-10) : digits;
  return `tel:+91${local}`;
}

export function mailHref(subject = "", body = "") {
  // encodeURIComponent, not URLSearchParams: mailto needs %20, and "+" would
  // show up as literal plus signs in the subject/body of most mail apps.
  const parts = [];
  if (subject) parts.push(`subject=${encodeURIComponent(subject)}`);
  if (body) parts.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${SITE.email}${parts.length ? `?${parts.join("&")}` : ""}`;
}

// wa.me link only when a real WhatsApp number is configured in SITE.whatsapp.
export function whatsappHref(text = "") {
  if (!SITE.whatsapp) return null;
  const q = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${SITE.whatsapp}${q}`;
}

// Google Maps search link for a verified office address.
export function mapsHref(address) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
