/**
 * Membership tiers, inclusions and terms.
 *
 * The three tiers and everything they include are the same at every studio —
 * only the price differs, which is why the price lives on the studio itself
 * (see `memberships` in studios.ts) and the rest lives here. Hackney is dearer
 * across all three tiers, so a single shared price list would have been wrong
 * for a third of the business.
 *
 * Wording follows the studio membership cards the team produced.
 */
import type { Studio } from './studios';

export interface Tier {
  name: string;
  /** which price on the studio to use */
  key: 'sgpt12' | 'sgpt8' | 'sgpt4';
  sessions: string;
  note: string;
  featured: boolean;
}

export const tiers: Tier[] = [
  { name: 'SGPT 12', key: 'sgpt12', sessions: '12 sessions per month',
    note: 'Our most popular option. Consistent training, faster progress.', featured: true },
  { name: 'SGPT 8', key: 'sgpt8', sessions: '8 sessions per month',
    note: 'Flexible training around a busy schedule.', featured: false },
  { name: 'SGPT 4', key: 'sgpt4', sessions: '4 sessions per month',
    note: 'A great way to stay on track.', featured: false },
];

export const included = [
  'Allocated number of SGPT sessions per month (12/8/4)',
  'Unlimited TEAM sessions',
  '1x check-in per month (upon request)',
  'Progress reviews and goal-setting',
  'Access to the nutrition resource centre',
  'Exclusive access to the BF workout tracking app',
  'Use of InBody result tracking and body composition scanner',
  'Invitations to all workshops, events and socials',
];

export const terms = [
  '10% discount for couples (same household), NHS and services — SGPT memberships only',
  'Minimum three-month commitment, then monthly rolling',
  '30 days’ notice to cancel',
];

/** The price for a tier at a given studio. */
export const priceOf = (studio: Studio, t: Tier) => studio.memberships[t.key];

/** The cheapest price at a studio, for "from £x" on the overview. */
export const fromPrice = (studio: Studio) => studio.memberships.sgpt4;
