/**
 * Pages the old site had that the new one does not — kept alive as redirects.
 *
 * These paths are linked from live GoHighLevel nurture emails that have already
 * gone out, so they cannot be "fixed at source": the copy is sitting in
 * people's inboxes. Every one of them 404'd before this existed.
 *
 * Fixing it here rather than in the CRM is also the safer repair. Those emails
 * are drag-and-drop builder templates whose design JSON is not exposed by the
 * API, so rewriting their HTML would convert them to raw-HTML templates and
 * cost the team the visual editor — permanently, since the conversion cannot be
 * undone without the design data. A redirect costs nothing and fixes the link
 * everywhere it appears at once, including printed material and bookmarks.
 *
 * Add a line here and the route builds itself.
 */
export interface LegacyRedirect {
  /** the old path, without leading or trailing slashes */
  from: string;
  /** where it should land now, site-relative */
  to: string;
  /** what the old page was, so the stub can say something true while it waits */
  label: string;
  /** where it is linked from, so nobody deletes this without checking */
  linkedFrom: string;
}

export const legacyRedirects: LegacyRedirect[] = [
  {
    from: 'nutrition-coaching',
    to: 'members/nutrition-request/',
    label: 'Nutrition coaching',
    linkedFrom: 'Nutrition Consult email (all three studios) and the 30 Day Email Sequence',
  },
  {
    from: 'nutrition-series-videos',
    to: 'members/nutrition-course/',
    label: 'The Nutrition Video Series',
    linkedFrom: '“Kickstart Your Nutrition Journey” in the 30 Day Email Sequence',
  },
  {
    from: 'teamup',
    to: 'members/bookings-cancellations/',
    label: 'Booking system guidelines',
    linkedFrom: '“Your Super Quick Guide To Getting Started” welcome email',
  },
  /* The per-studio price pages briefly lived at /<studio>/memberships/ before
     moving under /memberships/. The CRM templates carried that shape for a few
     hours, so anything sent in that window is already in an inbox. */
  {
    from: 'south-woodford/memberships',
    to: 'memberships/south-woodford/',
    label: 'South Woodford memberships',
    linkedFrom: 'the price email, for the few hours the templates carried this path',
  },
  {
    from: 'leytonstone/memberships',
    to: 'memberships/leytonstone/',
    label: 'Leytonstone memberships',
    linkedFrom: 'the price email, for the few hours the templates carried this path',
  },
  {
    from: 'hackney/memberships',
    to: 'memberships/hackney/',
    label: 'Hackney memberships',
    linkedFrom: 'the price email, for the few hours the templates carried this path',
  },
];
