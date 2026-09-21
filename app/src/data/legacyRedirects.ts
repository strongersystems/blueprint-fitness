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
  /**
   * Where it should land now, site-relative. May carry a #fragment: the hop
   * uses the whole thing, and the canonical drops the fragment, since a
   * canonical names a page and a fragment is a position within one.
   */
  to: string;
  /** what the old page was, so the stub can say something true while it waits */
  label: string;
  /** where it is linked from, so nobody deletes this without checking */
  linkedFrom: string;
  /**
   * Whether the stub itself should carry noindex.
   *
   * The rule is simply: match the target. A stub canonicalises to its target,
   * so the two must agree — telling Google "index this, but the real version is
   * over there" while the real version says "do not index me" is a
   * contradiction, and contradictions are what get pages reported as problems.
   *
   * A stub pointing at a public page is left indexable: the canonical then
   * consolidates the old URL into the new one and carries its history across.
   * A stub pointing into the members area is noindexed, because that is what
   * the target says about itself.
   */
  noindex: boolean;
}

export const legacyRedirects: LegacyRedirect[] = [
  {
    from: 'nutrition-coaching',
    to: 'members/nutrition-request/',
    label: 'Nutrition coaching',
    linkedFrom: 'Nutrition Consult email (all three studios) and the 30 Day Email Sequence',
    noindex: true,
  },
  {
    from: 'nutrition-series-videos',
    to: 'members/nutrition-course/',
    label: 'The Nutrition Video Series',
    linkedFrom: '“Kickstart Your Nutrition Journey” in the 30 Day Email Sequence',
    noindex: true,
  },
  {
    from: 'teamup',
    to: 'members/bookings-cancellations/',
    label: 'Booking system guidelines',
    linkedFrom: '“Your Super Quick Guide To Getting Started” welcome email',
    noindex: true,
  },
  /* The per-studio price pages briefly lived at /<studio>/memberships/ before
     moving under /memberships/. The CRM templates carried that shape for a few
     hours, so anything sent in that window is already in an inbox. */
  {
    from: 'south-woodford/memberships',
    to: 'memberships/south-woodford/',
    label: 'South Woodford memberships',
    linkedFrom: 'the price email, for the few hours the templates carried this path',
    noindex: false,
  },
  {
    from: 'leytonstone/memberships',
    to: 'memberships/leytonstone/',
    label: 'Leytonstone memberships',
    linkedFrom: 'the price email, for the few hours the templates carried this path',
    noindex: false,
  },
  {
    from: 'hackney/memberships',
    to: 'memberships/hackney/',
    label: 'Hackney memberships',
    linkedFrom: 'the price email, for the few hours the templates carried this path',
    noindex: false,
  },
  /* The bare studio URLs. Nothing on the site linked to them, but they are what
     a person types and what the studios' own printed material tends to use, and
     all three 404'd. Each lands on its own block of the locations page. */
  {
    from: 'south-woodford',
    to: 'locations/#south-woodford',
    label: 'South Woodford',
    linkedFrom: 'typed, guessed, and any printed material using the bare studio URL',
    noindex: false,
  },
  {
    from: 'leytonstone',
    to: 'locations/#leytonstone',
    label: 'Leytonstone',
    linkedFrom: 'typed, guessed, and any printed material using the bare studio URL',
    noindex: false,
  },
  {
    from: 'hackney',
    to: 'locations/#hackney',
    label: 'Hackney',
    linkedFrom: 'typed, guessed, and any printed material using the bare studio URL',
    noindex: false,
  },
];
