/**
 * Single source of truth for the three studios.
 *
 * Drives: the locations page, the studio landing pages (/hackney/kickstart …),
 * the studio next-steps pages, the cancellation lightbox form ids, and the
 * per-studio HighLevel tracking scripts.
 *
 * Adding a fourth studio = one entry here; every route generates itself.
 */
export interface Studio {
  slug: string;
  name: string;
  /** value submitted as "location" on the general enquiry form */
  formValue: string;
  addressLines: string[];
  postcode: string;
  /**
   * Exact door coordinates, so the map drops a single pin instead of running a
   * text search. A ?q=<address> embed asks Google to *search*, which is why the
   * old maps showed a scatter of neighbouring businesses and, once clicked,
   * opened a results list rather than the studio. ?q=<lat>,<lng> pins.
   * Sources: Hackney and Leytonstone are the studios' own OpenStreetMap nodes;
   * South Woodford is Google's own listing for the Raven Road unit.
   */
  lat: number;
  lng: number;
  email: string;
  /** WhatsApp number in wa.me form: country code, digits only, no + or spaces.
      Taken from each studio's GoHighLevel sub-account phone. */
  whatsapp: string;
  hours: string;
  /** short line used as the eyebrow on studio pages */
  eyebrow: string;
  blurb: string;
  /** hero + supporting imagery (files already in public/img) */
  heroImage: string;
  heroImageAlt: string;
  /** GoHighLevel */
  locationId: string;
  cancellationFormId: string;
  cancellationFormHeight: number;
  /** the studio's live Kickstart payment form (embedded on its sign-up page) */
  signupFormId: string;
  signupFormName: string;
  signupFormHeight: number;
  /** route of that studio's own sign-up page, e.g. signup-hackney */
  signupPath: string;
  /**
   * Per-studio HighLevel tracking snippet.
   * PASTE THE REAL SNIPPET BODY HERE (Settings → Business Profile → Tracking
   * Code in each sub-account). Leave as null until supplied — the Tracking
   * component simply renders nothing while it is null.
   */
  trackingScript: string | null;
}

export const studios: Studio[] = [
  {
    slug: 'south-woodford',
    name: 'South Woodford',
    formValue: 'South Woodford',
    addressLines: ['4 Raven Road', 'South Woodford, London'],
    postcode: 'E18 1HB',
    lat: 51.594893,
    lng: 0.036263,
    email: 'southwoodford@blueprintfitnessldn.com',
    whatsapp: '447538298457',
    hours: 'Open 6am–9pm, every day — 100+ sessions a week',
    eyebrow: 'Where it all started',
    blurb:
      'The original Blueprint. A premium training space with a thriving community, expert coaching, and structured group training focused on strength, conditioning and consistency.',
    heroImage: 'img/bf-sw-session.jpg',
    heroImageAlt: 'Mid-session on the South Woodford training floor',
    locationId: 'cquQsieyBZx9vRgEqBge',
    cancellationFormId: 'sGRVF4TDOJuG1B55SN95',
    cancellationFormHeight: 661,
    signupFormId: 'whRaBe5nmwPZPhADC580',
    signupFormName: '30 Day Kickstart Payment',
    signupFormHeight: 716,
    signupPath: 'signup-southwoodford',
    trackingScript:
      '<script src="https://link.stronger.systems/js/external-tracking.js" ' +
      'data-tracking-id="tk_aec9d659c5e84a3383569603f1a02f88"></script>',
  },
  {
    slug: 'leytonstone',
    name: 'Leytonstone',
    formValue: 'Leytonstone',
    addressLines: ['Unit 3, Hitchcock Business Centre', 'Leytonstone High Road, London'],
    postcode: 'E11 4RE',
    lat: 51.563245,
    lng: 0.009025,
    email: 'leytonstone@blueprintfitnessldn.com',
    whatsapp: '447947790035',
    hours: 'Open early ’til late, 7 days a week',
    eyebrow: 'Progress you can measure',
    blurb:
      'Small group coaching built around measurable progress and long-term development — expertly designed programmes, delivered by coaches who genuinely care how you’re getting on.',
    heroImage: 'img/bf-bench-room.jpg',
    heroImageAlt: 'The training floor mid-session at Blueprint Fitness Leytonstone',
    locationId: 'mztjJyXHNWiEotc8ItXP',
    cancellationFormId: 'CRXo5oPCz8vG0Wf1qKrD',
    cancellationFormHeight: 600,
    signupFormId: 'opDyyE9aOFpEeFIFKiWI',
    signupFormName: 'Kickstart Purchase',
    signupFormHeight: 716,
    signupPath: 'signup-leytonstone',
    trackingScript:
      '<script src="https://link.stronger.systems/js/external-tracking.js" ' +
      'data-tracking-id="tk_feff3ad595f64c029eab0771634d520c"></script>',
  },
  {
    slug: 'hackney',
    name: 'Hackney',
    formValue: 'Hackney',
    addressLines: ['Arch 195, Morning Lane', 'Hackney, London'],
    postcode: 'E9 6LJ',
    lat: 51.547289,
    lng: -0.050239,
    email: 'hackney@blueprintfitnessldn.com',
    whatsapp: '447944690356',
    hours: 'Mon–Fri 6am–9pm · Sat–Sun 8am–4pm',
    eyebrow: 'The newest one — now open',
    blurb:
      'Our newest studio, tucked into a railway arch just off Morning Lane. A brand-new space built for structured training and community-led coaching — same warm welcome, box-fresh kit.',
    heroImage: 'img/bf-arch-floor.jpg',
    heroImageAlt: 'Inside the Hackney arch studio',
    locationId: '147m777NnBtnn7yLrsdb',
    cancellationFormId: 'zqqA4jVAOEMR7yq3UhEt',
    cancellationFormHeight: 640,
    signupFormId: 'jYU61MRL886o2IM2neIC',
    signupFormName: 'Hackney Kickstart Purchase',
    signupFormHeight: 716,
    signupPath: 'signup-hackney',
    trackingScript:
      '<script src="https://link.stronger.systems/js/external-tracking.js" ' +
      'data-tracking-id="tk_959536f8daf54d288a44ce0bc72d180e"></script>',
  },
];

export const studioBySlug = (slug: string) =>
  studios.find((s) => s.slug === slug);

/**
 * Google Maps URLs for a studio.
 *
 * Both forms take coordinates, never an address string. Google treats ?q=<text>
 * as a search: the embed then renders whatever businesses it matched nearby and
 * the click-through opens a results page. Coordinates are unambiguous — one pin,
 * in the right place, and the same place when the visitor taps through.
 */
export function mapEmbed(s: Studio, zoom = 17): string {
  const label = encodeURIComponent(`Blueprint Fitness ${s.name}`).replace(/%20/g, '+');
  return `https://maps.google.com/maps?q=${s.lat},${s.lng}(${label})&z=${zoom}&hl=en&output=embed`;
}

/** Google's documented Maps URL API: drops a pin at the exact coordinates. */
export function mapLink(s: Studio): string {
  return `https://www.google.com/maps/search/?api=1&query=${s.lat}%2C${s.lng}`;
}
