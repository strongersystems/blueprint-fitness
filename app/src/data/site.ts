/** Site-wide constants. */
export const site = {
  name: 'Blueprint Fitness',
  /** every form/CRM embed is served from this HighLevel domain */
  crmHost: 'https://link.stronger.systems',
  /** the general enquiry form on the main site (all three studios) */
  nutritionFormId: 'w7SeLy5VqmvSbzp14HKJ',
  /* No site-wide coach ratio: six at South Woodford, five at Leytonstone and Hackney (perCoach in studios.ts). */
  /* No kickstartPrice here any more: it differs per studio and lives on each
     studio in studios.ts. A site-wide figure is how £169 ended up on pages and
     emails for studios that charge £149. */
  /** central inbox — the studio addresses are hackney@ / leytonstone@ /
      southwoodford@ on the same domain, all able to send */
  email: 'info@blueprintfitnessldn.com',
  instagram: 'https://www.instagram.com/blueprintfitnessldn/',
  facebook: 'https://www.facebook.com/blueprintfitnessldn/',
};
