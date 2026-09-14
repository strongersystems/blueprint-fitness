/**
 * The Nutrition Video Series, as supplied by the team.
 *
 * The 22 lessons are kept in the order they were given — that order is the
 * course. They are grouped into modules purely so the page has something to
 * navigate by; every module is a run of consecutive lessons, so regrouping is
 * safe and changes nothing about the sequence.
 *
 * `id` is the YouTube video id from the youtu.be link. Adding a lesson means
 * adding one line here; the page, the navigation and the progress tracking all
 * follow from it.
 */

export interface Lesson {
  /** position in the series, as the team numbered them */
  n: number;
  title: string;
  /** YouTube video id */
  id: string;
  /** url fragment, so a lesson can be linked to directly */
  slug: string;
}

export interface Module {
  title: string;
  /** one line on why this module exists, shown under its heading */
  blurb: string;
  lessons: Lesson[];
}

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const mk = (n: number, title: string, id: string): Lesson => ({ n, title, id, slug: slugify(title) });

export const modules: Module[] = [
  {
    title: 'Start here',
    blurb: 'What the series covers, and the order things actually matter in.',
    lessons: [
      mk(1, 'Intro', 'i3XvxZXxO2c'),
      mk(2, 'The Nutritional Pyramid', 'qAQS8h1Xeoo'),
    ],
  },
  {
    title: 'Adherence',
    blurb: 'The plan you stick to beats the perfect plan you abandon.',
    lessons: [
      mk(3, 'Adherence (Part 1)', 's7I3YcJ6FEk'),
      mk(4, 'Adherence (Part 2)', 'MVb-RB42iVY'),
    ],
  },
  {
    title: 'Calories',
    blurb: 'What they are, how a surplus and a deficit work, and how you burn them.',
    lessons: [
      mk(5, 'Calories (Part 1)', 'itGUK7fIeH0'),
      mk(6, 'Calories (Part 2 — Surplus)', 'yTpFdVbgaiU'),
      mk(7, 'Calories (Part 3 — Creating a deficit)', '3tGFcsPy35s'),
      mk(8, 'Calories (Part 4 — How we burn them)', 'e1P1gbCYxXM'),
    ],
  },
  {
    title: 'NEAT',
    blurb: 'The movement you do without thinking about it — and why it matters so much.',
    lessons: [
      mk(9, 'NEAT (Part 1)', 'iC0i9fgFTE4'),
      mk(10, 'NEAT (Part 2)', 'UuzPLnmZ7x0'),
    ],
  },
  {
    title: 'Portions and habits',
    blurb: 'Practical control of what goes on the plate, and how habits get built.',
    lessons: [
      mk(11, 'Portion Control', 'Sg4wFQyuXBk'),
      mk(12, 'Habits (Part 1)', 'o5oecCw57wk'),
      mk(13, 'Habits (Part 2)', 'LDGVdHglqGA'),
    ],
  },
  {
    title: 'Tracking honestly',
    blurb: 'Why the numbers slip, and how to work out what you actually need.',
    lessons: [
      mk(14, 'Under Reporting', '9kAUUTtLHOU'),
      mk(15, 'Calculating Caloric Requirements', 'dhCJX-NmKuI'),
    ],
  },
  {
    title: 'Common myths',
    blurb: 'The three that derail the most people.',
    lessons: [
      mk(16, 'Slow Metabolism', 'LPxuSlf1d2c'),
      mk(17, 'A Licence to Eat', 'z_KHKWkmAM0'),
      mk(18, 'What Exercises Are Best For Fat Loss?', 'iw8BFyRY4fk'),
    ],
  },
  {
    title: 'When progress stalls',
    blurb: 'What a plateau really is, what to do about it, and what to expect.',
    lessons: [
      mk(19, 'What To Do When Progress Stalls', '5ufoud___PE'),
      mk(20, 'What We Can Do About a Plateau', '29HwGl-1p7M'),
      mk(21, 'Expected Rates of Weight Loss', 'izfLRAkNIug'),
      mk(22, 'Eating Clean', 'tUhFvZ7oXlI'),
    ],
  },
];

/** Flat list, in course order — used for next/previous and for counting. */
export const lessons: Lesson[] = modules.flatMap((m) => m.lessons);
