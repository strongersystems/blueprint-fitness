/**
 * The pop-up's quiz, details and call (Matt, 25 Nov 2026): the same flow as the ad landing pages on
 * join.blueprintfitnessldn.com, so a website lead is followed up exactly like an ad lead.
 *
 * The questions are COPIED from the funnel (stronger-web-1 client-sites/blueprint-funnel/blueprint.json
 * `questions`), answers and earlier wordings ("also") included: the GHL workflow matches on the answer text, so
 * change them there first and copy them here, never the other way round. Each answer goes into its own Enquiry
 * field (the input name is the GHL field key).
 *
 * PATH is what the visitor chose in the pop-up, written to Enquiry: Path. The website workflow ("New Lead - Main
 * Website (Nov 2026)", built by stronger-web-1 client-sites/blueprint-funnel/ghl/website-workflow.mjs) routes on these
 * exact values, so they change together:
 *   speak    -> the "call now" bucket (and the call step here, at studios with a call calendar)
 *   call     -> the "call now" bucket
 *   message  -> the "just looking" bucket, with a follow-up question by message instead of asking to call
 */
export interface Option { a: string; id: string; bucket?: number; also?: string[] }
export interface Question { key: string; field: string; q: string; options: Option[] }

export const questions: Question[] = [
  {
    "key": "you",
    "field": "enquiry_sounds_like_me",
    "q": "Which of these sounds most like you right now?",
    "options": [
      {
        "a": "I've let things slide",
        "id": "reset",
        "also": [
          "I've let things slide and I'm ready to sort it"
        ]
      },
      {
        "a": "I'm OK, but want to feel great",
        "id": "optimiser",
        "also": [
          "I'm doing okay, but I want to feel properly good again"
        ]
      },
      {
        "a": "I've had a wake-up call",
        "id": "wakeup",
        "also": [
          "Something has given me a wake-up call"
        ]
      },
      {
        "a": "I want my old, fitter self back",
        "id": "comeback",
        "also": [
          "I used to be fit and I want that version of me back"
        ]
      },
      {
        "a": "I start well, then lose steam",
        "id": "starter",
        "also": [
          "I start well and lose it after a few weeks"
        ]
      },
      {
        "a": "Nothing's ever really stuck",
        "id": "beginner",
        "also": [
          "I've never found a way of exercising that stuck"
        ]
      }
    ]
  },
  {
    "key": "win",
    "field": "enquiry_win",
    "q": "What would make your first 30 days a win?",
    "options": [
      {
        "a": "A visible change",
        "id": "change",
        "also": [
          "Seeing a visible change"
        ]
      },
      {
        "a": "More strength and energy",
        "id": "stronger",
        "also": [
          "Feeling stronger and more energetic day to day"
        ]
      },
      {
        "a": "A routine I actually stick to",
        "id": "routine",
        "also": [
          "Having a routine I actually stick to"
        ]
      },
      {
        "a": "Less worry about my health",
        "id": "health",
        "also": [
          "Worrying less about my health"
        ]
      },
      {
        "a": "Proving I can do it",
        "id": "prove",
        "also": [
          "Proving to myself that I can do it"
        ]
      }
    ]
  },
  {
    "key": "start",
    "field": "enquiry_start",
    "q": "When do you want to get started?",
    "options": [
      {
        "a": "As soon as possible",
        "id": "asap",
        "bucket": 1
      },
      {
        "a": "This week",
        "id": "now",
        "bucket": 1
      },
      {
        "a": "In the next 2 to 4 weeks",
        "id": "soon",
        "bucket": 1,
        "also": [
          "In the next two to four weeks"
        ]
      },
      {
        "a": "After a date or event",
        "id": "later",
        "bucket": 2,
        "also": [
          "After a date or event I have in mind"
        ]
      },
      {
        "a": "Just looking for now",
        "id": "looking",
        "bucket": 3,
        "also": [
          "Not sure yet, just looking"
        ]
      }
    ]
  }
];

export const PATH = {
  speak: 'Speak to someone',
  call: 'Just looking, would like a call',
  message: 'Just looking, would like a message',
} as const;

/** Studios whose Speak With Us calendar takes bookings (Leytonstone's is switched off, as on the funnel: no call
    step there, the coach rings instead). */
export const callCalendar: Record<string, boolean> = { 'south-woodford': true, leytonstone: false, hackney: true };

/** The External Tracking form name GHL triggers the website workflow on. */
export const formName = (slug: string) => `website-${slug}`;
