// ALL client-approved content lives here. Edit without touching components.
export const SITE = {
  name: "Square Inch Design",
  concept: "Every Inch Speaks",
  city: "Pune · Satara",
  phones: ["98233 33400", "92843 96887"],
  email: "squareinchedesign@yahoo.com",
  pune: "Plot No 11, Prabha Co-operative Housing Society, Mayur Colony, Paud Road, Pune 411038.",
  satara: "'Parijat', 509 A Camp, Satara.",
  lead: "Siddharth Kolhapure",
  // WhatsApp number in full international format WITHOUT "+" (e.g. "919823333400").
  // Set this only after the studio confirms which number takes WhatsApp.
  // Leave null and every WhatsApp option in the UI stays hidden.
  whatsapp: null,
  // Shown under the enquiry submit button. Plain wording only.
  privacyNote: "We use these details only to respond to your enquiry.",
  // Optional single sentence shown after a successful endpoint submission
  // (e.g. "We usually reply within two working days."). Leave null unless
  // the studio approves a response-time promise.
  responseTime: null,
  // Default pre-filled WhatsApp greeting (used only when whatsapp is set).
  whatsappText: "Hello Square Inch Design, I'd like to discuss a project.",
  // Services list for the Studio page. Rendered only when non-empty —
  // populate with client-approved services, e.g. ["Residential interiors"].
  services: [],
  // Production domain, set at launch (used for canonical URLs + sitemap).
  url: "",
};

// Single source of truth for primary navigation (menu + footer).
// `photo` drives the menu hover preview — local /public/photos only.
export const NAV = [
  { label: "Home", to: "/", photo: "/photos/luxury-01.webp", preview: "Luxury" },
  { label: "Worlds", to: "/worlds", photo: "/photos/abstract-01.webp", preview: "Abstract" },
  { label: "Projects", to: "/projects", photo: "/photos/fusion-01.webp", preview: "Fusion" },
  { label: "Studio", to: "/studio", photo: "/photos/studio-01.webp", preview: "Studio" },
  { label: "Process", to: "/how-we-build", photo: "/photos/process-01.webp", preview: "Process" },
  { label: "Start a Project", to: "/begin", photo: "/photos/traditional-02.webp", preview: "Begin" },
];

export const PROCESS = [
  { n: "01", t: "Enquiry", d: "A conversation about your space, needs and way of life." },
  { n: "02", t: "Initial Meeting", d: "We listen to tastes, culture and daily routines." },
  { n: "03", t: "Basic Plan / Working", d: "Volumetric thinking — spatial dynamics before decoration." },
  { n: "04", t: "Technical Meeting", d: "Drawings, services and constructability resolved." },
  { n: "05", t: "Material Selection Assistance", d: "Stone, wood, light and colour — honest materials." },
  { n: "06", t: "Finalization", d: "Crafted handover. A space that holds time." },
];

// Drop real extracted PDF photos into /public/photos/ with these exact names.
// Until then the Photo component renders a cinematic placeholder (no stock).
export const WORLDS = [
  { slug: "abstract", name: "Abstract", note: "Playful colour, art walls", photo: "/photos/abstract-01.webp", fallback: ["#D8A24A", "#111111"] },
  { slug: "art-deco", name: "Art-Deco", note: "Craft details, shadow", photo: "/photos/artdeco-01.webp", fallback: ["#3A3A38", "#C9BFAE"] },
  { slug: "contemporary", name: "Contemporary", note: "2000 sqft workspaces", photo: "/photos/contemporary-01.webp", fallback: ["#2B2E33", "#E8E4DA"] },
  { slug: "fusion", name: "Fusion", note: "Brick, volume, culture", photo: "/photos/fusion-01.webp", fallback: ["#8C3B21", "#E5D5B8"] },
  { slug: "traditional", name: "Traditional", note: "Courtyards & blue doors", photo: "/photos/traditional-01.webp", fallback: ["#4A5E3A", "#D9C9A3"] },
  { slug: "luxury", name: "Luxury", note: "4255 sqft residence", photo: "/photos/luxury-01.webp", fallback: ["#0E1E3A", "#C9A86A"] },
  { slug: "minimalistic", name: "Minimalistic", note: "Honest, soothing", photo: "/photos/minimal-01.webp", fallback: ["#EDE9E0", "#8A867F"] },
  { slug: "rustic", name: "Rustic", note: "Night textures, indigo", photo: "/photos/rustic-01.webp", fallback: ["#101418", "#2E4A6B"] },
];

export const STORIES = [
  {
    id: "luxury-4255-residence",
    world: "luxury",
    sector: "Residential",
    featured: true,
    type: "Residence",
    area: "4255 sqft",
    city: null,
    award: null,
    // TODO client review: one short factual alt per image, same order as images.
    alts: [],
    no: "01",
    title: "Stone, Colour & Gilded Light",
    meta: "Luxury · Residential · 4255 sqft",
    desc: "Residence of 4255 sqft — an interesting interplay of stone textures & colours in combination with gilded fixtures creates a sense of luxury & refinement without seeming to be overdone.",
    images: ["/photos/luxury-01.webp", "/photos/luxury-02.webp", "/photos/luxury-03.webp", "/photos/luxury-04.webp"],
    palette: ["#0E1E3A", "#C9A86A"],
  },
  {
    id: "abstract-coffee-house",
    world: "abstract",
    sector: "Commercial",
    featured: true,
    type: "Coffee house",
    area: "1000 sqft",
    city: null,
    award: null,
    // TODO client review: one short factual alt per image, same order as images.
    alts: [],
    no: "02",
    title: "A 1000 sqft Coffee Journey",
    meta: "Abstract · Commercial · 1000 sqft",
    desc: "A 1000 sqft coffee house that redefines the out-of-home coffee experience — plush seating, warm ambient lighting, artisanal brewing stations and curated lounge spaces.",
    images: ["/photos/abstract-01.webp", "/photos/abstract-02.webp", "/photos/abstract-03.webp"],
    palette: ["#D8A24A", "#111111"],
  },
  {
    id: "contemporary-office-2000",
    world: "contemporary",
    sector: "Commercial",
    featured: false,
    type: "Construction office",
    area: "2000 sqft",
    city: null,
    award: null,
    // TODO client review: one short factual alt per image, same order as images.
    alts: [],
    no: "03",
    title: "Construction Office, Reworked",
    meta: "Contemporary · Workspace · 2000 sqft",
    desc: "2000 sqft construction office — open collaborative zones, sleek elements and strategic natural light. A dynamic workspace apart from traditional corporate environments.",
    images: ["/photos/contemporary-01.webp", "/photos/contemporary-02.webp"],
    palette: ["#2B2E33", "#E8E4DA"],
  },
  {
    id: "fusion-brick-house",
    world: "fusion",
    sector: "Residential",
    featured: true,
    type: "Single-storey home",
    area: null,
    city: null,
    award: null,
    // TODO client review: one short factual alt per image, same order as images.
    alts: [],
    no: "04",
    title: "Volumetric Fusion Home",
    meta: "Fusion · Residential · Single-storey unit",
    desc: "By understanding the client's way of life & cultural background, variety was brought into the single storied unit through volumetric alterations to the overall spatial dynamics.",
    images: ["/photos/fusion-01.webp", "/photos/fusion-02.webp", "/photos/fusion-03.webp"],
    palette: ["#8C3B21", "#E5D5B8"],
  },
  {
    id: "traditional-blue-door",
    world: "traditional",
    sector: "Residential",
    featured: true,
    type: "Courtyard house",
    area: null,
    city: null,
    award: null,
    // TODO client review: one short factual alt per image, same order as images.
    alts: [],
    no: "05",
    title: "Courtyard, Blue Door, Light",
    meta: "Traditional · Courtyard House",
    desc: "Verandahs, gabion walls, timber posts and a blue door — a house that breathes with its courtyard. Only approved portfolio photography is used here.",
    images: ["/photos/traditional-01.webp", "/photos/traditional-02.webp", "/photos/traditional-03.webp"],
    palette: ["#4A5E3A", "#D9C9A3"],
  },
  {
    id: "minimal-honest-home",
    world: "minimalistic",
    sector: "Residential",
    featured: false,
    type: "Home",
    area: null,
    city: null,
    award: null,
    // TODO client review: one short factual alt per image, same order as images.
    alts: [],
    no: "06",
    title: "Honest Minimalism",
    meta: "Minimalistic · Residential",
    desc: "An example of interiors done with honest design. A sense of unstructured, unexpected artistic concepts — and that is what makes it all more soothing.",
    images: ["/photos/minimal-01.webp", "/photos/minimal-02.webp"],
    palette: ["#EDE9E0", "#8A867F"],
  },
  {
    id: "rustic-indigo-lounge",
    world: "rustic",
    sector: "Residential",
    featured: false,
    type: "Lounge",
    area: null,
    city: null,
    award: null,
    // TODO client review: one short factual alt per image, same order as images.
    alts: [],
    no: "07",
    title: "Rustic Indigo Night",
    meta: "Rustic · Lounge",
    desc: "Dark stone, timber pole, indigo seating — low light and raw texture from the Square Inch rustic study.",
    images: ["/photos/rustic-01.webp", "/photos/rustic-02.webp"],
    palette: ["#101418", "#2E4A6B"],
  },
  {
    id: "artdeco-studio-1055",
    world: "art-deco",
    sector: "Commercial",
    featured: false,
    type: "Studio",
    area: "1055 sqft",
    city: "Satara",
    award: "IIID 2016 Anchor Award — Runner Up",
    // TODO client review: one short factual alt per image, same order as images.
    alts: [],
    no: "08",
    title: "The Awarded Studio — 1055 sqft",
    meta: "Art-Deco · Studio · 1055 sqft · IIID 2016 Runner-Up",
    desc: "Built-up studio space of 1055 sq ft in Satara — free-flowing spaces, timber stair to attic library, forgotten heritage in contemporary minimal language. Jury: compact, honest, local flavour.",
    images: ["/photos/artdeco-01.webp", "/photos/artdeco-02.webp"],
    palette: ["#3A3A38", "#C9BFAE"],
  },
];
