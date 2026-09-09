/**
 * Class timetables, per studio.
 *
 * These were transcribed from the 2025 timetable JPEGs the team had been
 * linking to from GoHighLevel (go.blueprintfitnessldn.com/timetable-sw and
 * /timetable-ls). A picture of a timetable cannot be read by a screen reader,
 * cannot be searched, and needs a designer every time a class moves — so the
 * grid lives here as data and the page renders itself.
 *
 * Hackney has no timetable: none exists in any of the three sub-accounts, and
 * its "Schedule" snippet was pointing members at the South Woodford grid.
 * `slots` is empty until the team supply the real times.
 */

export interface ClassType {
  key: string;
  label: string;
  /** dot colour, carried over from the printed timetables */
  colour: string;
  blurb: string;
}

/** The class types, in the order they appear in the printed legend. */
export const classTypes: Record<string, ClassType> = {
  sgpt:    { key: 'sgpt',    label: 'SGPT',         colour: '#1F82CE', blurb: 'Small group personal training — max 5 per coach.' },
  sweat:   { key: 'sweat',   label: 'Sweat',        colour: '#A81E23', blurb: 'Conditioning: heart rate up, held there.' },
  metcon:  { key: 'metcon',  label: 'Metcon',       colour: '#16C34A', blurb: 'Metabolic conditioning — mixed-modal work.' },
  barbell: { key: 'barbell', label: 'Barbell Club', colour: '#9B27B0', blurb: 'Technical barbell work: squat, press, pull.' },
  recover: { key: 'recover', label: 'Recover',      colour: '#F2D024', blurb: 'Mobility, breathing and soft-tissue work.' },
  boxing:  { key: 'boxing',  label: 'Boxing',       colour: '#F58220', blurb: 'Pad work, footwork and conditioning.' },
  tough:   { key: 'tough',   label: 'Tough Guy',    colour: '#575757', blurb: 'The hard one. Bring a towel.' },
};

/** A timetable is a list of rows; each row is a time with a class list per day. */
export interface Slot {
  time: string;
  /** day key -> class-type keys running at that time */
  days: Record<string, string[]>;
}

export interface Timetable {
  /** weekday grid */
  weekdays: Slot[];
  /** weekend grid, which runs to different times and is shown separately */
  weekend: Slot[];
  /** which day columns each grid uses */
  weekdayCols: string[];
  weekendCols: string[];
  /** shown when there is no grid yet */
  note?: string;
}

export const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
export const WEEKEND = ['Sat', 'Sun'];

const sw: Timetable = {
  weekdayCols: WEEKDAYS,
  weekendCols: WEEKEND,
  weekdays: [
    { time: '6:00am',  days: { Mon: ['sgpt'], Tue: ['sgpt', 'sweat'], Wed: ['sgpt'], Thu: ['sgpt', 'metcon'], Fri: ['sgpt'] } },
    { time: '7:00am',  days: { Mon: ['sgpt'], Tue: ['sgpt'], Wed: ['sgpt', 'barbell'], Thu: ['sgpt'], Fri: ['sgpt', 'sweat'] } },
    { time: '8:00am',  days: { Mon: ['sgpt'], Tue: ['sgpt'], Wed: ['sgpt'], Thu: ['sgpt'], Fri: ['sgpt'] } },
    { time: '9:30am',  days: { Mon: ['sgpt', 'sweat'], Tue: ['sgpt'], Wed: ['sgpt'], Thu: ['sgpt', 'recover'], Fri: ['sgpt'] } },
    { time: '10:30am', days: { Mon: ['sgpt'], Tue: ['metcon'], Wed: ['sgpt'], Thu: ['metcon'], Fri: ['sgpt', 'tough'] } },
    { time: '12:30pm', days: { Mon: ['sgpt', 'metcon'], Tue: ['sgpt'], Wed: ['sgpt'], Thu: ['sgpt'], Fri: ['sgpt'] } },
    { time: '1:30pm',  days: { Mon: [], Tue: [], Wed: ['metcon'], Thu: [], Fri: [] } },
    { time: '5:00pm',  days: { Mon: ['sgpt'], Tue: ['sgpt'], Wed: ['sgpt'], Thu: ['sgpt'], Fri: ['sgpt'] } },
    { time: '6:00pm',  days: { Mon: ['sgpt'], Tue: ['sgpt', 'metcon'], Wed: ['sgpt'], Thu: ['sgpt', 'sweat'], Fri: ['sgpt'] } },
    { time: '7:00pm',  days: { Mon: ['sgpt', 'metcon'], Tue: ['sgpt', 'sweat'], Wed: ['sgpt', 'tough'], Thu: ['sgpt', 'boxing'], Fri: ['sgpt', 'metcon'] } },
    { time: '8:00pm',  days: { Mon: ['sgpt', 'barbell'], Tue: ['sgpt'], Wed: ['recover'], Thu: ['sgpt'], Fri: [] } },
  ],
  weekend: [
    { time: '8:00am',  days: { Sat: ['sgpt', 'tough'], Sun: ['sgpt', 'sweat'] } },
    { time: '9:00am',  days: { Sat: ['sgpt', 'metcon'], Sun: ['sgpt', 'tough'] } },
    { time: '10:00am', days: { Sat: ['sgpt', 'barbell'], Sun: ['sgpt', 'sweat'] } },
  ],
};

const ls: Timetable = {
  weekdayCols: WEEKDAYS,
  weekendCols: ['Sat'],
  weekdays: [
    { time: '6:00am',  days: { Mon: ['sgpt'], Tue: ['sgpt'], Wed: ['metcon'], Thu: ['sgpt'], Fri: ['sgpt'] } },
    { time: '7:00am',  days: { Mon: ['sgpt'], Tue: ['sgpt'], Wed: ['sgpt'], Thu: ['sgpt'], Fri: ['sweat'] } },
    { time: '8:00am',  days: { Mon: ['sgpt'], Tue: ['sgpt'], Wed: ['sgpt'], Thu: ['sgpt'], Fri: ['sgpt'] } },
    { time: '9:30am',  days: { Mon: ['sgpt'], Tue: ['sgpt'], Wed: ['sgpt'], Thu: ['sgpt'], Fri: ['sgpt'] } },
    { time: '10:30am', days: { Mon: ['sgpt'], Tue: ['sweat'], Wed: ['sgpt'], Thu: ['sgpt'], Fri: ['sgpt'] } },
    { time: '11:30am', days: { Mon: [], Tue: ['sgpt'], Wed: [], Thu: ['sgpt'], Fri: ['sgpt'] } },
    { time: '12:30pm', days: { Mon: ['sgpt'], Tue: ['sgpt'], Wed: ['sgpt'], Thu: ['metcon'], Fri: ['sgpt'] } },
    { time: '5:00pm',  days: { Mon: ['sgpt'], Tue: [], Wed: ['sgpt'], Thu: [], Fri: ['sgpt'] } },
    { time: '6:00pm',  days: { Mon: ['metcon'], Tue: ['sgpt'], Wed: ['sgpt'], Thu: ['sgpt'], Fri: ['sgpt'] } },
    { time: '7:00pm',  days: { Mon: ['sgpt'], Tue: ['sgpt'], Wed: ['sgpt'], Thu: ['sweat'], Fri: ['sgpt'] } },
    { time: '8:00pm',  days: { Mon: [], Tue: ['sgpt'], Wed: [], Thu: ['sgpt'], Fri: [] } },
  ],
  weekend: [
    { time: '7:00am',  days: { Sat: ['sgpt'] } },
    { time: '8:00am',  days: { Sat: ['sgpt'] } },
    { time: '9:00am',  days: { Sat: ['sgpt'] } },
    { time: '10:00am', days: { Sat: ['sweat'] } },
  ],
};

const hackney: Timetable = {
  weekdayCols: WEEKDAYS,
  weekendCols: WEEKEND,
  weekdays: [],
  weekend: [],
  note: 'The Hackney grid is being finalised. Sessions run 6am–9pm Monday to Friday and ' +
    '8am–4pm at weekends — message the studio and we will tell you exactly what is on, and when.',
};

export const timetables: Record<string, Timetable> = {
  'south-woodford': sw,
  leytonstone: ls,
  hackney,
};

/** The class types actually used by a studio, for its legend. */
export function typesUsed(t: Timetable): ClassType[] {
  const keys = new Set<string>();
  for (const row of [...t.weekdays, ...t.weekend]) {
    for (const list of Object.values(row.days)) for (const k of list) keys.add(k);
  }
  return Object.values(classTypes).filter((c) => keys.has(c.key));
}
