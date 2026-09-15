/**
 * Every message sent by a GoHighLevel workflow, across the three studios.
 *
 * GENERATED — do not edit by hand. Regenerate with
 *   research/ghl/extract-workflow-copy.mjs  (pulls from the three sub-accounts)
 *   research/ghl/gen-emails-data.py         (reduces it to this file)
 *
 * Email bodies are stored as readable text rather than their original
 * table-layout HTML: the /admin page encrypts its whole contents at build
 * time, and a megabyte of markup nobody reads is not worth encrypting.
 * Links are kept separately so they can be audited at a glance.
 */
export type LinkHealth = 'ok' | 'legacy' | 'redirected';
export interface WfLink { url: string; health: LinkHealth }
export interface WfStep {
  type: 'email' | 'sms' | 'internal_notification';
  name: string; subject: string; from: string;
  template: string | null; missing: boolean;
  text: string; links: WfLink[];
}
export interface WfEntry {
  studio: string; workflow: string; folder: string; status: string;
  triggers: string[]; steps: WfStep[];
}

export const workflowMessages: WfEntry[] = [
 {
  "studio": "Hackney",
  "workflow": "1. Cancellation Request Form",
  "folder": "4. Cancellations",
  "status": "published",
  "triggers": [
   "Form Submitted"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "CANCELLATION REQUEST: {{contact.name}}",
    "from": "no-reply@blueprintfitnessldn.com",
    "template": null,
    "missing": false,
    "text": "Cancellation REQUEST Submitted\n\n{{contact.first_name}} {{contact.last_name}}\n\nPlease cancel payments accordingly on TeamUp using the CANCEL MEMBERSHIP button.\nSelect the correct end date.",
    "links": []
   },
   {
    "type": "email",
    "name": "Email",
    "subject": "Cancellation Request Receieved",
    "from": "{{custom_values.sales_and_journey}} · {{location.email}}",
    "template": null,
    "missing": false,
    "text": "Dear {{contact.first_name}},\n\nThis is just a quick email to confirm we have receieved your cancellation request.\n\nWe will be in touch to confirm your final payment (date & amount) and membership end date.\n\nWe'll be sad to see you go!\nYours in Fitness,\n{{custom_values.sales_and_journey}}",
    "links": []
   }
  ]
 },
 {
  "studio": "Hackney",
  "workflow": "1. NEW MEMBER (TEAMUP)",
  "folder": "3. Memberships",
  "status": "published",
  "triggers": [
   "Contact Tag"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "NEW MEMBERSHIP Hackney {{contact.name}}",
    "from": "do-not-reply@blueprintfitnessldn.com",
    "template": null,
    "missing": false,
    "text": "{{contact.first_name}} {{contact.last_name}} just signed up for a FULL membership ( {{contact.latest_membership}} )",
    "links": []
   },
   {
    "type": "sms",
    "name": "SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Hi {{contact.first_name}},\nYour membership should all be set up and ready to book now on TeamUp or our App.\nKeep up the great work!\nNick",
    "links": []
   },
   {
    "type": "sms",
    "name": "SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Hey {{contact.first_name}}!\nCongratulations on your first month as a full member at Blueprint!\nHow are you getting on?\nOut of curiosity, who do you know that might benefit from our 30 Day Trial? As a Friend of yours, we have Completely Free Golden Ticket for them!\nStu & Paul",
    "links": []
   }
  ]
 },
 {
  "studio": "Hackney",
  "workflow": "1. New Lead - 30 Day Kickstart",
  "folder": "1. Leads",
  "status": "draft",
  "triggers": [
   "Form Submitted 30 Day",
   "Any FB Form",
   "Gift 30 Day",
   "Contact Tag"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "30 DAY LEAD (web form): {{contact.name}}",
    "from": "",
    "template": null,
    "missing": false,
    "text": "New Lead for 30 Day Trial\nFirst Name: {{contact.first_name}}\nLast Name: {{contact.last_name}}\nEmail: {{contact.email}}\nPhone: {{contact.phone}}\nMain Goal: {{contact.main_goal}}",
    "links": []
   },
   {
    "type": "email",
    "name": "Intro Program - Application Email",
    "subject": "Thanks {{contact.first_name}} — here is what happens next",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Lead 01 — We have got your details",
    "missing": false,
    "text": "A coach will call you shortly. No hard sell, ever.\n\nThe 30-Day Kickstart · Hackney\n\nHello {{contact.first_name}}, we have got you.\n\nThanks for registering your interest in the 30-Day Kickstart at Blueprint Fitness Hackney. Your details are with us.\n\nA coach will give you a ring shortly for a friendly chat — what you are after, what has worked before, what has not. No hard sell, ever. If it is not right for you, we will say so.\n\n12\n\nCoached sessions\n\n5:1\n\nMax ratio\n\n30\n\nDays\n\nIn the meantime — have a look at what a week actually looks like here. Knowing the sessions exist at times you can make is usually the thing people want to check first.\n\nSee the Hackney timetable\n\nMessage us on WhatsApp\n\nSpeak soon,\n\nNick\n\nBlueprint Fitness Hackney\n\nYour studio\n\nBlueprint Fitness Hackney\n\nArch 195, Morning Lane, Hackney, London, E9 6LJ\n\nMon–Fri 6am–9pm · Sat 8–11am · Closed Sunday\n\nhackney@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/hackney/timetable/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447944690356?text=Hi%20Blueprint%20Fitness%20Hackney%20%E2%80%94%20I",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447944690356",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "sms",
    "name": "SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Hi {{contact.first_name}} thanks so much for checking out our 30 Day Kickstart! Just to confirm, are you local to Hackney?\n\nPS. I've attached a video with one of the owners (Stu) for you",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 2",
    "subject": "The gym is not a motivating place. That is rather the point.",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Lead 02 — Motivation",
    "missing": false,
    "text": "Why we built the opposite of a gym floor.\n\nThe 30-Day Kickstart · Hackney\n\nOn not feeling motivated\n\n“I have no motivation to go to the gym.” We hear it constantly — usually from people who have just got in touch with us.\n\nHere is the thing: a gym floor is not a motivating place. Everyone looks like they know what they are doing. Nobody tells you where to start. You do three exercises you half-remember and leave.\n\nMotivation is not what gets people through the door on a wet Tuesday in February. A time in the diary, a coach expecting you, and four other people who noticed you were not there last week — that is what does it.\n\nThat is the whole design. You book a session, someone has already written it, and a coach runs you through it. You do not have to decide anything.\n\nWhat that looks like\n\n•\n\n12 coached sessions across your first 30 days\n\n•\n\nNever more than five people to a coach, so you always get eyes on you\n\n•\n\nA plan written for you — not a class everyone does at once\n\n•\n\nAn InBody scan at the start, so progress is measured rather than guessed\n\nStart your 30 days at Hackney\n\nSpeak soon,\n\nNick\n\nBlueprint Fitness Hackney\n\nYour studio\n\nBlueprint Fitness Hackney\n\nArch 195, Morning Lane, Hackney, London, E9 6LJ\n\nMon–Fri 6am–9pm · Sat 8–11am · Closed Sunday\n\nhackney@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/signup-hackney/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447944690356",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "Email 3",
    "subject": "What actually happens in a session",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Lead 03 — What a session is like",
    "missing": false,
    "text": "No mirrors, no machines you cannot work out, no guessing.\n\nThe 30-Day Kickstart · Hackney\n\nWhat a session actually looks like\n\nMost gyms are built for people who already know what they are doing. Mirrors everywhere, rows of machines with no explanation, and nobody to ask.\n\nOurs is not. Here is what a session at Hackney is:\n\n•\n\nYou arrive. Your session is already written down.\n\n•\n\nA coach shows you each movement and watches you do it.\n\n•\n\nYou work at a weight that is right for you — not the person next to you.\n\n•\n\nYou leave knowing what you did and why.\n\nMost of our members are in their thirties to sixties, and a good share of them had not trained in years before they started. Nobody is performing for anybody.\n\nWe meet you where your strength and fitness actually are, and build from there. There are no degrading challenges and nobody is getting put on a treadmill for an hour.\n\nLook at the timetable\n\nOr start your 30 days\n\nSpeak soon,\n\nNick\n\nBlueprint Fitness Hackney\n\nYour studio\n\nBlueprint Fitness Hackney\n\nArch 195, Morning Lane, Hackney, London, E9 6LJ\n\nMon–Fri 6am–9pm · Sat 8–11am · Closed Sunday\n\nhackney@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/hackney/timetable/",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com/signup-hackney/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447944690356",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "Email 4",
    "subject": "Most people who join us are complete beginners",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Lead 04 — For beginners",
    "missing": false,
    "text": "Including the ones who now look like they never were.\n\nThe 30-Day Kickstart · Hackney\n\nAlmost everyone starts here as a beginner\n\nIt is the most common worry we hear: everyone there will be fitter than me.\n\nMost people who join Blueprint Fitness are complete beginners. The members who look like naturals are simply the ones who kept turning up three times a week for a year. That is the entire secret.\n\nWhat keeps people coming back\n\n•\n\nThe session is planned, so there is no standing about wondering what to do.\n\n•\n\nA coach is with you the whole way — you are never left to work it out.\n\n•\n\nThe group is small enough that people notice you, and say hello.\n\n•\n\nIt gets measurably easier, and you can see it in the numbers.\n\nIf you have a question before you commit — an injury, a schedule, anything at all — just reply to this email. A real person reads it.\n\nStart your 30 days at Hackney\n\nSpeak soon,\n\nNick\n\nBlueprint Fitness Hackney\n\nYour studio\n\nBlueprint Fitness Hackney\n\nArch 195, Morning Lane, Hackney, London, E9 6LJ\n\nMon–Fri 6am–9pm · Sat 8–11am · Closed Sunday\n\nhackney@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/signup-hackney/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447944690356",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "Email 5",
    "subject": "Two members who started exactly where you are",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Lead 05 — Member stories",
    "missing": false,
    "text": "Michelle and Georgia both began on a 30-day trial.\n\nThe 30-Day Kickstart · Hackney\n\nThey started on the same 30 days\n\nHello {{contact.first_name}} — the most useful thing we can show you is not us talking about ourselves. It is members talking about the bit before they started.\n\nMichelle and Georgia both began on a 30-day trial, both having not trained properly in years, and both stayed. Their stories are on the site, in their own words.\n\nWatch the member stories\n\nEvery one of them is unremarkable in the best way: someone busy, a bit apprehensive, who booked a session and then booked another one.\n\nStart your own 30 days\n\nSpeak soon,\n\nNick\n\nBlueprint Fitness Hackney\n\nYour studio\n\nBlueprint Fitness Hackney\n\nArch 195, Morning Lane, Hackney, London, E9 6LJ\n\nMon–Fri 6am–9pm · Sat 8–11am · Closed Sunday\n\nhackney@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/#member-stories",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com/signup-hackney/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447944690356",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "Email 6",
    "subject": "The four things that stop people starting",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Lead 06 — Common hurdles",
    "missing": false,
    "text": "Time, consistency, feeling watched, and food.\n\nThe 30-Day Kickstart · Hackney\n\nThe four things that stop people\n\nAfter a decade of first sessions, the same four things come up. None of them is a good reason not to start.\n\n“I have not got time”\n\nA session is an hour, three times a week, at a time you choose. Mon–Fri 6am–9pm · Sat 8–11am · Closed Sunday. If the timetable does not work around your life, tell us and we will be honest about whether we can fit you in.\n\n“I cannot stay consistent”\n\nWhich is why the sessions are booked, coached and expected. Consistency is much easier when somebody notices you are missing.\n\n“I will feel watched”\n\nFive people, one coach, everyone concentrating on their own work. Nobody is looking at you — they are busy.\n\n“I do not know what to eat”\n\nWe cover that too, with practical guidance rather than a meal plan to buy. Start with training; food follows more easily once you are moving.\n\nStart your 30 days\n\nSpeak soon,\n\nNick\n\nBlueprint Fitness Hackney\n\nYour studio\n\nBlueprint Fitness Hackney\n\nArch 195, Morning Lane, Hackney, London, E9 6LJ\n\nMon–Fri 6am–9pm · Sat 8–11am · Closed Sunday\n\nhackney@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/signup-hackney/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447944690356",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "Email 7",
    "subject": "What is actually different about training here",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Lead 07 — What makes it different",
    "missing": false,
    "text": "Small groups, a real plan, and coaches who know your name.\n\nThe 30-Day Kickstart · Hackney\n\nWhat is actually different here\n\nChoosing where to train is a bigger decision than it looks, so here is the honest version of what you get with us — and what you do not.\n\nYou get\n\n•\n\nA coach in the room with you for every session, not on a rota somewhere.\n\n•\n\nA maximum of five people to that coach.\n\n•\n\nA programme that progresses, written around what you can do now.\n\n•\n\nPeople who know your name by week two.\n\nYou do not get\n\n•\n\nA swipe card and good luck.\n\n•\n\nA room of machines and no idea which ones matter.\n\n•\n\nA contract you cannot get out of.\n\nIt is personal training, delivered in a small supportive group. That is the whole idea — the coaching of one-to-one, at a price that is not one-to-one.\n\nSee what membership costs\n\nOr start with 30 days\n\nSpeak soon,\n\nNick\n\nBlueprint Fitness Hackney\n\nYour studio\n\nBlueprint Fitness Hackney\n\nArch 195, Morning Lane, Hackney, London, E9 6LJ\n\nMon–Fri 6am–9pm · Sat 8–11am · Closed Sunday\n\nhackney@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/memberships/",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com/signup-hackney/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447944690356",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "Email 8",
    "subject": "The questions we get asked most",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Lead 08 — Questions answered",
    "missing": false,
    "text": "Commitment, fitness level, injuries and times.\n\nThe 30-Day Kickstart · Hackney\n\nYour questions, answered\n\nHello {{contact.first_name}}. The same handful of questions come up before people start, so here they are with straight answers.\n\nIs the 30 days a contract?\n\nNo. It is thirty days. Most people stay, some do not, and that is genuinely fine.\n\nAm I fit enough?\n\nYes. Everything is scaled to you — that is what having a coach in the room is for.\n\nWhat if I have an injury?\n\nTell us on your first call. Our coaches work around injuries and conditions every day; we would rather know up front than find out later.\n\nWhen are the sessions?\n\nMon–Fri 6am–9pm · Sat 8–11am · Closed Sunday. The full grid is on the site, so you can check before you commit.\n\nCheck the timetable\n\nWhat does it cost?\n\nThe 30-Day Kickstart is £169 — twelve coached sessions, your InBody scan and your plan. No joining fee.\n\nStart your 30 days\n\nSpeak soon,\n\nNick\n\nBlueprint Fitness Hackney\n\nYour studio\n\nBlueprint Fitness Hackney\n\nArch 195, Morning Lane, Hackney, London, E9 6LJ\n\nMon–Fri 6am–9pm · Sat 8–11am · Closed Sunday\n\nhackney@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/hackney/timetable/",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com/signup-hackney/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447944690356",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "Email 9",
    "subject": "The 30-Day Kickstart, and what £169 covers",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Lead 09 — What it costs",
    "missing": false,
    "text": "Twelve coached sessions, an InBody scan, and your plan.\n\nThe 30-Day Kickstart · Hackney\n\nWhat £169 actually covers\n\nNo games and no countdown timers — just what the Kickstart is and what it costs, so you can decide.\n\n12\n\nCoached sessions\n\n5:1\n\nMax ratio\n\n30\n\nDays\n\n£169 for your first 30 days\n\n•\n\n12 coached sessions — three a week, at times you pick\n\n•\n\nAn InBody scan and goal-setting session to start from a real number\n\n•\n\nA plan written around you, progressed as you go\n\n•\n\nPractical nutrition guidance — no meal plans to buy\n\n•\n\nNo joining fee and no contract\n\nBooked as one-to-one personal training, a month like that costs several hundred pounds. It is £169 because you share your coach with four other people.\n\nStart your 30 days at Hackney\n\nSee what happens after the 30 days\n\nSpeak soon,\n\nNick\n\nBlueprint Fitness Hackney\n\nYour studio\n\nBlueprint Fitness Hackney\n\nArch 195, Morning Lane, Hackney, London, E9 6LJ\n\nMon–Fri 6am–9pm · Sat 8–11am · Closed Sunday\n\nhackney@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/signup-hackney/",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com/memberships/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447944690356",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "Email 10",
    "subject": "{{contact.first_name}}, shall we leave it there?",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Lead 10 — Last call",
    "missing": false,
    "text": "Last email from us — unless you would like to start.\n\nThe 30-Day Kickstart · Hackney\n\nShall we leave it there?\n\nThis is the last email in this sequence, {{contact.first_name}} — we are not going to keep nudging you.\n\nIf the timing is wrong, that is completely fine. Keep us in mind; the door stays open and the offer does not change.\n\nIf you have been meaning to start and simply have not got round to it, this is the reminder. Thirty days, twelve coached sessions, and an honest answer at the end of it about whether this suits you.\n\nStart your 30 days\n\nRather talk to a human first? Message us and a coach at Hackney will reply — no script, no pressure.\n\nAsk us a question\n\nSpeak soon,\n\nNick\n\nBlueprint Fitness Hackney\n\nYour studio\n\nBlueprint Fitness Hackney\n\nArch 195, Morning Lane, Hackney, London, E9 6LJ\n\nMon–Fri 6am–9pm · Sat 8–11am · Closed Sunday\n\nhackney@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/signup-hackney/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447944690356?text=Hi%20Blueprint%20Fitness%20Hackney%20%E2%80%94%20I",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447944690356",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "sms",
    "name": "SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Just checking we got the right number for you {{contact.first_name}}? 🤞🤞",
    "links": []
   },
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "30 DAY LEAD (FB Form): {{contact.name}}",
    "from": "",
    "template": null,
    "missing": false,
    "text": "New Lead for 30 Day Trial\nFirst Name: {{contact.first_name}}\nLast Name: {{contact.last_name}}\nEmail: {{contact.email}}\nPhone: {{contact.phone}}\nMain Goal: {{contact.main_goal}}",
    "links": []
   },
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "30 DAY LEAD (Manual Tag): {{contact.name}}",
    "from": "",
    "template": null,
    "missing": false,
    "text": "New Lead for 30 Day Trial\nFirst Name: {{contact.first_name}}\nLast Name: {{contact.last_name}}\nEmail: {{contact.email}}\nPhone: {{contact.phone}}\nMain Goal: {{contact.main_goal}}",
    "links": []
   }
  ]
 },
 {
  "studio": "Hackney",
  "workflow": "1. Signed Up - 30 Day Trial",
  "folder": "2. Challenge",
  "status": "published",
  "triggers": [
   "Founders",
   "Zapped 30 Day"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "NEW CHALLENGE SIGNUP {{contact.name}} - Hackney",
    "from": "info@dashaio.com",
    "template": null,
    "missing": false,
    "text": "NEW SIGNUP!\n{{contact.name}} just signed up for the 30 Day Trial at Hackney",
    "links": []
   },
   {
    "type": "email",
    "name": "Intro - Welcome Email",
    "subject": "Your Super Quick Guide To Getting Started⚡",
    "from": "Stuart Rook · info@blueprintfitnessldn.com",
    "template": "1. YOUR SUPER QUICK GUIDE TO GETTING STARTED",
    "missing": false,
    "text": "Dear {{contact.first_name}},\nWe're thrilled to have you on board with Blueprint:Fitness!\nOver your first 30 days, you'll have the chance to experience all we have to offer and see just how far you can go. With our help, you'll make positive changes in your health and wellness and connect with amazing people along the way.\nWhat's next, you may ask?\nThe first step is to schedule your introductory session. If you haven't already, please reach out to Stu by calling or texting 07736033985 to book a time.\nDuring the 30-45 minute intro session, we'll take care of some important details:\n1. Admin: We'll verify your account set up in TeamUp and provide you with an overview of our classes so you know what to expect when you book.\n2. Inbody Body Composition Testing: We'll use the Inbody tracker to gather some baseline data about your muscle mass, body fat mass and percentage, BMR, BMI, and visceral fat. This information will be used to set goals and hold each other accountable, and we'll need you to download the Inbody App.\n3. Functional Movement Screen: This is an opportunity for us to discuss any medical issues, injuries, or pain points, and to assess your posture. The screening only takes 10 minutes and will help us determine the best starting point for your fitness journey.\nPlease take a moment to review our booking system guidelines to ensure fairness for all members. The guidelines can be found by clicking HERE.\nWe've attached your welcome pack to this email, which has more information about our business, classes, and community.\nThank you for joining us. We can't wait to see you on the gym floor soon!\nBest regards,\nThe Blueprint:Fitness Team\ninfo@blueprintfitnessldn.com\n07736 033 985 // 07855 353 798\nblueprintfitnessldn.com\nP.S. Staying connected is essential, so we've created a WhatsApp group for all members. This is where you'll find important updates and information about sessions, classes, social events, general fitness and nutrition.\n\nHere’s the invite:\n\nJoin WhatsApp Group\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list or Manage your preference.",
    "links": [
     {
      "url": "https://www.blueprintfitnessldn.com/teamup",
      "health": "redirected"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     },
     {
      "url": "https://chat.whatsapp.com/KqiTvAg4B0bI14Ay7YxetN",
      "health": "ok"
     }
    ]
   }
  ]
 },
 {
  "studio": "Hackney",
  "workflow": "2. Cancelled (TeamUp)",
  "folder": "4. Cancellations",
  "status": "published",
  "triggers": [
   "Contact Tag"
  ],
  "steps": [
   {
    "type": "email",
    "name": "Email 1",
    "subject": "How have you been, {{contact.first_name}}?",
    "from": "{{custom_values.sales_and_journey}} · {{location.email}}",
    "template": "Win-back 01 — Checking in",
    "missing": false,
    "text": "No pitch — just seeing how you got on.\n\nFrom the team · Hackney\n\nHow have you been?\n\nHello {{contact.first_name}}. It has been a little while since you trained with us, and I wanted to see how you have got on.\n\nNo pitch attached to this one. If you found something that works better, genuinely good — that is the point of the whole exercise.\n\nAnd if it all rather tailed off, that happens to almost everybody. It is not a character flaw.\n\nReply on WhatsApp\n\nSpeak soon,\n\nNick\n\nBlueprint Fitness Hackney\n\nYour studio\n\nBlueprint Fitness Hackney\n\nArch 195, Morning Lane, Hackney, London, E9 6LJ\n\nMon–Fri 6am–9pm · Sat 8–11am · Closed Sunday\n\nhackney@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://wa.me/447944690356?text=Hi%20Blueprint%20Fitness%20Hackney%20%E2%80%94%20just%20replying%20to%20your%20email.",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447944690356",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "Email",
    "subject": "Still fancy getting back to it?",
    "from": "{{custom_values.sales_and_journey}} · {{location.email}}",
    "template": "Win-back 02 — Still thinking about it",
    "missing": false,
    "text": "The door is open, and starting again is easier than starting.\n\nFrom the team · Hackney\n\nStill fancy getting back to it?\n\nHello {{contact.first_name}} — a quick one. If getting back into training has been on your list, you would not be starting from scratch. You already know how the sessions work and the coaches already know you.\n\nQuite a lot has changed since you were last in, too. Here is the current timetable at Hackney.\n\nSee what is on now\n\nIf you would rather just ask what has changed, message us — happy to give you the honest version.\n\nAsk us what has changed\n\nSpeak soon,\n\nNick\n\nBlueprint Fitness Hackney\n\nYour studio\n\nBlueprint Fitness Hackney\n\nArch 195, Morning Lane, Hackney, London, E9 6LJ\n\nMon–Fri 6am–9pm · Sat 8–11am · Closed Sunday\n\nhackney@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/hackney/timetable/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447944690356?text=Hi%20Blueprint%20Fitness%20Hackney%20%E2%80%94%20I",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447944690356",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "Email",
    "subject": "Whenever you are ready",
    "from": "{{custom_values.sales_and_journey}} · {{location.email}}",
    "template": "Win-back 03 — Whenever you are ready",
    "missing": false,
    "text": "Last one from us — no hard feelings either way.\n\nFrom the team · Hackney\n\nWhenever you are ready\n\nThis is the last one from us, {{contact.first_name}}, so we do not become the gym that will not stop emailing.\n\nIf and when you want to come back, everything is where you left it. Message the studio and we will pick it up from there — no re-joining fee, no awkwardness about the gap.\n\nAll the best either way.\n\nSee what a month looks like now\n\nSpeak soon,\n\nNick\n\nBlueprint Fitness Hackney\n\nYour studio\n\nBlueprint Fitness Hackney\n\nArch 195, Morning Lane, Hackney, London, E9 6LJ\n\nMon–Fri 6am–9pm · Sat 8–11am · Closed Sunday\n\nhackney@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/hackney/kickstart/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447944690356",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   }
  ]
 },
 {
  "studio": "Hackney",
  "workflow": "2. Intro Complete Main Flow",
  "folder": "2. Challenge",
  "status": "published",
  "triggers": [
   "Contact Tag"
  ],
  "steps": [
   {
    "type": "sms",
    "name": "Intro Complete SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Hi {{contact.first_name}}! Well done on getting started. How are you feeling so far? If you have any questions or need help, let me know here. We are excited to have you onboard! {{user.first_name}}",
    "links": []
   },
   {
    "type": "sms",
    "name": "2 Weeks SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Hi {{contact.first_name}},\nI just wanted to say well done again! What's been the best thing about starting your journey with us so far?",
    "links": []
   },
   {
    "type": "email",
    "name": "Email",
    "subject": "I hope you're well {{contact.first_name}} 😊",
    "from": "{{custom_values.sales_and_journey}} · {{location.email}}",
    "template": null,
    "missing": false,
    "text": "Hi {{contact.first_name}}\nIt's been a while but just checking in again to see how you're doing,\nIf you ever fancy dropping in over the next couple of months just reply to this email to let me know you're alive and well and I'll add 5 free classes to your account you can use.\nThe door is alway open if you want to reboot things!\nNick",
    "links": []
   },
   {
    "type": "email",
    "name": "Email",
    "subject": "I hope you're well {{contact.first_name}} 😊",
    "from": "{{custom_values.sales_and_journey}} · {{location.email}}",
    "template": null,
    "missing": false,
    "text": "Hi {{contact.first_name}}\nIt's been about 3 months since you finished with us, so I just wanted to make sure you're still taking good care of your health.\nThe offer of some free classes is still there if you want to get moving again and feel ready?\n\nWhat do you think?\nNick",
    "links": []
   }
  ]
 },
 {
  "studio": "Hackney",
  "workflow": "30 Day Email Sequence",
  "folder": "2. Challenge",
  "status": "published",
  "triggers": [
   "Pipeline Stage Changed"
  ],
  "steps": [
   {
    "type": "email",
    "name": "2 Email - Nutrition Journey",
    "subject": "The nutrition side, without the faff",
    "from": "{{location.name}} · info@blueprintfitnessldn.com",
    "template": "Joined 02 — Nutrition",
    "missing": false,
    "text": "A 22-part video series and a coach, both included.\n\nYour first 30 days · Hackney\n\nTraining is half of it\n\nHello {{contact.first_name}}. You do not need to overhaul your diet to get results in your first month — but a few honest changes go a very long way.\n\nTwo things are included with your membership, and both are worth using.\n\nThe Nutrition Video Series\n\nTwenty-two short lessons, in the order that actually matters — calories, adherence, habits, and what to do when progress stalls. Watch one a day and you will understand more than most people who have been dieting for years.\n\nStart the video series\n\nA consultation with a coach\n\nWhen you want it applied to you specifically rather than in general, request a consultation. Bring your InBody results and a few honest days of food — that tells us far more than any questionnaire.\n\nRequest a consultation\n\nNo fad diets and nothing to buy. Just practical guidance built around how you actually live.\n\nSpeak soon,\n\nThe team\n\nBlueprint Fitness Hackney\n\nYour studio\n\nBlueprint Fitness Hackney\n\nArch 195, Morning Lane, Hackney, London, E9 6LJ\n\nMon–Fri 6am–9pm · Sat 8–11am · Closed Sunday\n\nhackney@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/members/nutrition-course/",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com/members/nutrition-request/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447944690356",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "5 Email - Referral Hoodie",
    "subject": "Know someone who would get on well here?",
    "from": "{{location.name}} · info@blueprintfitnessldn.com",
    "template": "Joined 05 — Refer a friend",
    "missing": false,
    "text": "Send them a 30-Day Kickstart.\n\nYour first 30 days · Hackney\n\nBring someone with you\n\nHello {{contact.first_name}} — training is easier when someone you know is doing it too. It is also how most of our members found us.\n\nIf there is someone who has been saying they should do something about it, send them this and let them have a look at what a month here involves.\n\nSend them the 30-Day Kickstart\n\nMention it to a coach when they start, so we know who to thank.\n\nSpeak soon,\n\nThe team\n\nBlueprint Fitness Hackney\n\nYour studio\n\nBlueprint Fitness Hackney\n\nArch 195, Morning Lane, Hackney, London, E9 6LJ\n\nMon–Fri 6am–9pm · Sat 8–11am · Closed Sunday\n\nhackney@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/hackney/kickstart/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447944690356",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "4 Email - Socials",
    "subject": "The bit that keeps people here",
    "from": "{{location.name}} · info@blueprintfitnessldn.com",
    "template": "Joined 04 — The community",
    "missing": false,
    "text": "The socials are genuinely half the reason people stay.\n\nYour first 30 days · Hackney\n\nThe bit nobody expects\n\nMost people join for the training. A surprising number stay for everyone else.\n\nThere are socials, events and a fair amount of nonsense in the group chat. You are welcome at all of it, and there is no obligation to any of it.\n\nIf you have been coming a couple of weeks and have not met many people yet, tell a coach. Introducing people is genuinely part of the job here.\n\nYour members area\n\nSpeak soon,\n\nThe team\n\nBlueprint Fitness Hackney\n\nYour studio\n\nBlueprint Fitness Hackney\n\nArch 195, Morning Lane, Hackney, London, E9 6LJ\n\nMon–Fri 6am–9pm · Sat 8–11am · Closed Sunday\n\nhackney@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/members/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447944690356",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "3 Email - Best Results?",
    "subject": "Which sessions will get you the results you want?",
    "from": "{{location.name}} · info@blueprintfitnessldn.com",
    "template": "Joined 03 — Which sessions to pick",
    "missing": false,
    "text": "SGPT, and how the classes fit around it.\n\nYour first 30 days · Hackney\n\nWhich sessions should you book?\n\nShort answer: your coached SGPT sessions are the backbone. Everything else is a bonus on top.\n\nSGPT — your three a week\n\nThis is the one that moves the needle. Strength work, progressed week to week, with a coach watching. If you only ever do these three, you will still get where you are going.\n\nThe classes\n\nConditioning sessions you can add on when you fancy them. They are not a replacement for your coached sessions — they are for the weeks when you want a fourth thing to do.\n\nSee what is on at Hackney\n\nNot sure what to book? Ask your coach at your next session. They know what you are working on.\n\nSpeak soon,\n\nThe team\n\nBlueprint Fitness Hackney\n\nYour studio\n\nBlueprint Fitness Hackney\n\nArch 195, Morning Lane, Hackney, London, E9 6LJ\n\nMon–Fri 6am–9pm · Sat 8–11am · Closed Sunday\n\nhackney@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/hackney/timetable/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447944690356",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "6. Price List",
    "subject": "What happens when your 30 days are up",
    "from": "Stuart Rook · hackney@blueprintfitnessldn.com",
    "template": "Joined 07 — What happens after 30 days",
    "missing": false,
    "text": "Your options, and what each one costs.\n\nYour first 30 days · Hackney\n\nWhat happens after your 30 days\n\nYou are most of the way through, so here is what comes next — no surprises at the till.\n\nMemberships are simply a question of how many coached sessions a month suit your life. Same coaching, same small groups, same plan.\n\n•\n\nSGPT 12 — £239 a month. Three a week, and what most members settle on.\n\n•\n\nSGPT 8 — £219 a month. Two a week with room for a third.\n\n•\n\nSGPT 4 — £189 a month. One a week, steady and sustainable.\n\nAll of them include unlimited classes, your monthly check-in, InBody tracking and the nutrition resources.\n\nCompare the memberships\n\nThere is a 10% discount for couples in the same household, NHS and services. Ask your coach, or just reply to this.\n\nSpeak soon,\n\nThe team\n\nBlueprint Fitness Hackney\n\nYour studio\n\nBlueprint Fitness Hackney\n\nArch 195, Morning Lane, Hackney, London, E9 6LJ\n\nMon–Fri 6am–9pm · Sat 8–11am · Closed Sunday\n\nhackney@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/memberships/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447944690356",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "7. Email",
    "subject": "What it is actually like once the 30 days are over",
    "from": "{{location.name}} · hackney@blueprintfitnessldn.com",
    "template": "Joined 06 — Life as a full member",
    "missing": false,
    "text": "Same coaching, same small groups, just no end date.\n\nYour first 30 days · Hackney\n\nLife after the Kickstart\n\nHello {{contact.first_name}} — people often ask what changes when the 30 days finish. Honestly: not much, and that is rather the point.\n\nSame coaches, same small groups, same plan carrying on from where you got to. What changes is that you stop thinking about it as a trial and start thinking about it as the thing you do on Mondays, Wednesdays and Fridays.\n\nWhat members get on top\n\n•\n\nUnlimited classes alongside your coached sessions\n\n•\n\nA monthly check-in with your coach, whenever you want one\n\n•\n\nInBody tracking, so progress stays measured\n\n•\n\nThe nutrition resources and our clinics and workshops\n\n•\n\nEvery social and event going\n\nMost people find the second month easier than the first. The hard part was becoming someone who turns up, and you have already done that.\n\nSee the memberships\n\nSpeak soon,\n\nThe team\n\nBlueprint Fitness Hackney\n\nYour studio\n\nBlueprint Fitness Hackney\n\nArch 195, Morning Lane, Hackney, London, E9 6LJ\n\nMon–Fri 6am–9pm · Sat 8–11am · Closed Sunday\n\nhackney@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/memberships/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447944690356",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "8. Email Thankyou Legend",
    "subject": "Thirty days done, {{contact.first_name}}",
    "from": "{{location.name}} · hackney@blueprintfitnessldn.com",
    "template": "Joined 08 — Thank you",
    "missing": false,
    "text": "You turned up. That is the hard part.\n\nYour first 30 days · Hackney\n\nThirty days. Done.\n\nWhatever the numbers say, you did the difficult bit: you kept turning up. Most people never get past the first week.\n\nHave a look at your InBody comparison with your coach — a month is long enough for the numbers to have moved, and it is a good deal more satisfying than guessing.\n\nWhatever you decide about carrying on, thank you for giving it a proper go. It has been a pleasure having you in.\n\nCarry on with a membership\n\nTalk it through with us\n\nSpeak soon,\n\nThe team\n\nBlueprint Fitness Hackney\n\nYour studio\n\nBlueprint Fitness Hackney\n\nArch 195, Morning Lane, Hackney, London, E9 6LJ\n\nMon–Fri 6am–9pm · Sat 8–11am · Closed Sunday\n\nhackney@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/memberships/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447944690356?text=Hi%20Blueprint%20Fitness%20Hackney%20%E2%80%94%20I",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447944690356",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   }
  ]
 },
 {
  "studio": "Hackney",
  "workflow": "Application",
  "folder": "",
  "status": "published",
  "triggers": [
   "Application - Shorter",
   "Application - Longer"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "BF Application: {{contact.name}}",
    "from": "no-reply@b3.media",
    "template": null,
    "missing": false,
    "text": "Name: {{contact.name}}\nPhone: {{contact.phone}}\nEmail: {{contact.email}}\nWilling To Invest:\n{{contact.apply_if_there_was_an_opportunity_to_work_together_what_would_you_be_willing_to_invest_in_yourself_to_achieve_your_goals}}\nSituation/Struggles:\n{{contact.apply_tell_me_a_little_about_your_situation_what_do_you_need_help_with}}\n{{contact.apply2_what_are_you_struggling_with_right_now}}\nTried Before/Barriers:\n{{contact.apply_what_have_you_tried_before_that_didnt_work}}\n{{contact.apply2_what_is_your_biggest_barrier_to_achieving_the_result_you_are_aiming_for}}\n\nPriority:\n{{contact.apply_how_much_of_a_priority_is_achieving_your_goals_right_now}}\n\n3 Goals:\n{{contact.apply_what_are_3_goals_that_youd_like_to_achieve_with_us}}\n\nWhy Us?:\n{{contact.apply_why_do_you_want_to_work_with_us}}\n\nWhy A Good Client?:\n{{contact.apply_tell_us_why_youd_make_a_good_client}}",
    "links": []
   }
  ]
 },
 {
  "studio": "Hackney",
  "workflow": "Check In Form Feb 2024",
  "folder": "",
  "status": "published",
  "triggers": [
   "Form Submitted"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "{{contact.check_who_to_speak_to}} Coaching Checkin: {{contact.name}}",
    "from": "no-reply@b3.media",
    "template": null,
    "missing": false,
    "text": "Contact: {{contact.name}}\nPhone: {{contact.phone}}\n\nWhich Programme:\n{{contact.check_which_programme_did_you_follow_on_your_last_cycle}}\n\nHow was it?\n{{contact.check_how_was_it}}\n\nWhich TEAM:\n{{contact.check_which_team_sessions_did_you_attend}}\n\nCurrent Objectives:\n{{contact.check_what_is_your_current_objective}}\n\nMeasurables:\n{{contact.check_which_measurables_are_you_tracking}}\n{{contact.check_which_measurables_are_you_tracking_other}}\n\nImproved/Declined:\n{{contact.check_have_these_measurables_improved_of_declined_in_the_last_3_months}}\n{{contact.check_improve_or_decline}}\n{{contact.check_decline}}\n\nSuccess?\n{{contact.check_what_does_success_look_like_to_you_and_how_can_we_better_help_you_achieve_success}}\n\nCoach:\n{{contact.check_who_to_speak_to}}",
    "links": []
   },
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "{{contact.check_who_to_speak_to}} Coaching Checkin: {{contact.name}}",
    "from": "no-reply@b3.media",
    "template": null,
    "missing": false,
    "text": "Contact: {{contact.name}}\nPhone: {{contact.phone}}\n\nWhich Programme:\n{{contact.check_which_programme_did_you_follow_on_your_last_cycle}}\n\nHow was it?\n{{contact.check_how_was_it}}\n\nWhich TEAM:\n{{contact.check_which_team_sessions_did_you_attend}}\n\nCurrent Objectives:\n{{contact.check_what_is_your_current_objective}}\n\nMeasurables:\n{{contact.check_which_measurables_are_you_tracking}}\n{{contact.check_which_measurables_are_you_tracking_other}}\n\nImproved/Declined:\n{{contact.check_have_these_measurables_improved_of_declined_in_the_last_3_months}}\n{{contact.check_improve_or_decline}}\n{{contact.check_decline}}\n\nSuccess?\n{{contact.check_what_does_success_look_like_to_you_and_how_can_we_better_help_you_achieve_success}}\n\nCoach:\n{{contact.check_who_to_speak_to}}",
    "links": []
   }
  ]
 },
 {
  "studio": "Hackney",
  "workflow": "Class Feedback Form",
  "folder": "",
  "status": "published",
  "triggers": [
   "Form Submitted"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "Class Feedback: {{contact.name}}",
    "from": "no-reply@b3.media",
    "template": null,
    "missing": false,
    "text": "Contact: {{contact.name}}\nBoxing:\n{{ contact.feedback_do_you_attend_attend_boxing_classes }}\nMetCon:\n{{ contact.feedback_do_you_attend_metcon_classes }}\n\nRecover:\n{{ contact.feedback_do_you_attend_recover_classes }}\n\nSweat:\n{{ contact.feedback_do_you_attend_sweat_classes }}\n\nTough Guy:\n{{ contact.feedback_do_you_attend_tough_guy_classes }}\n\nXLR8:\n{{ contact.feedback_do_you_attend_xlr8_classes }}\n\nIf No, Reasons?:\n{{ contact.feedback_if_no_reasons }}\n\nRE Options:\n{{ contact.feedback_team_options }}\n\nWhich 4:\n{{ contact.feedback_which_classes_tick_up_to_4_are_you_most_likely_to_attend }}\n\nAny Other Feedback:\n{{ contact.feedback_any_other_comments_or_feedback }}",
    "links": []
   }
  ]
 },
 {
  "studio": "Hackney",
  "workflow": "Feedback",
  "folder": "",
  "status": "published",
  "triggers": [
   "Form Submitted"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "Feedback: {{contact.name}}",
    "from": "no-reply@blueprintfitnessldn.com",
    "template": null,
    "missing": false,
    "text": "Name: {{contact.name}}\nEmail: {{contact.email}}\nRating: {{contact.how_would_you_rate_your_experience}}\nExperience: {{contact.feedback_describe_your_experience}}\nImprovements?:\nDo Well: {{contact.feedback_what_are_we_doing_well}}\nImprove On: {{contact.feedback_what_could_we_improve_on}}",
    "links": []
   },
   {
    "type": "email",
    "name": "Email",
    "subject": "Thankyou {{contact.name}}!",
    "from": "Paul Stafford · info@blueprintfitnessldn.com",
    "template": null,
    "missing": false,
    "text": "Hey {{contact.first_name}},\nThankyou for your feedback!\nWe really appreciate it 🙌😊\nPaul",
    "links": []
   }
  ]
 },
 {
  "studio": "Hackney",
  "workflow": "Hackney Opening Leads",
  "folder": "1. Leads",
  "status": "published",
  "triggers": [
   "Facebook Lead Form Submitted",
   "External Tracking Event"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "WL QR: {{contact.name}}",
    "from": "",
    "template": null,
    "missing": false,
    "text": "{{contact.name}}\n{{contact.phone}}",
    "links": []
   },
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "WL FB: {{contact.name}}",
    "from": "",
    "template": null,
    "missing": false,
    "text": "{{contact.name}}\n{{contact.phone}}",
    "links": []
   },
   {
    "type": "email",
    "name": "Intro Program - Application Email",
    "subject": "Thanks {{contact.first_name}} — here is what happens next",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Lead 01 — We have got your details",
    "missing": false,
    "text": "A coach will call you shortly. No hard sell, ever.\n\nThe 30-Day Kickstart · Hackney\n\nHello {{contact.first_name}}, we have got you.\n\nThanks for registering your interest in the 30-Day Kickstart at Blueprint Fitness Hackney. Your details are with us.\n\nA coach will give you a ring shortly for a friendly chat — what you are after, what has worked before, what has not. No hard sell, ever. If it is not right for you, we will say so.\n\n12\n\nCoached sessions\n\n5:1\n\nMax ratio\n\n30\n\nDays\n\nIn the meantime — have a look at what a week actually looks like here. Knowing the sessions exist at times you can make is usually the thing people want to check first.\n\nSee the Hackney timetable\n\nMessage us on WhatsApp\n\nSpeak soon,\n\nNick\n\nBlueprint Fitness Hackney\n\nYour studio\n\nBlueprint Fitness Hackney\n\nArch 195, Morning Lane, Hackney, London, E9 6LJ\n\nMon–Fri 6am–9pm · Sat 8–11am · Closed Sunday\n\nhackney@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/hackney/timetable/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447944690356?text=Hi%20Blueprint%20Fitness%20Hackney%20%E2%80%94%20I",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447944690356",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "sms",
    "name": "SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "{Hi|Hey|Hello} {{contact.first_name}}, {thanks so much for checking out|thanks for taking a look at|thanks for registering your interest in|great to see you’re interested in} our 30 Day Kickstart!\n\n{Just to check, are you local to Hackney?|Can I quickly check whether you’re based in or around Hackney?|Are you currently local to Hackney?|Before we go any further, are you based near Hackney?}\n\n{P.S. I’ve attached a quick video from me, Nick, for you to watch.|P.S. I’ve also attached a short video from myself (Nick).|I’ve attached a quick video from me, Nick, so you can learn a little more.|There’s also a short video attached from me, Nick, for you.}",
    "links": []
   },
   {
    "type": "sms",
    "name": "SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "{Hi|Hey|Hello} {{contact.first_name}}, {thanks so much for checking out|thanks for taking a look at|thanks for registering your interest in|great to see you’re interested in} our 30 Day Kickstart!\n\n{Just to check, are you local to Hackney?|Can I quickly check whether you’re based in or around Hackney?|Are you currently local to Hackney?|Before we go any further, are you based near Hackney?}\n\n{P.S. I’ve attached a quick video from me, Nick, for you to watch.|P.S. I’ve also attached a short video from myself (Nick).|I’ve attached a quick video from me, Nick, so you can learn a little more.|There’s also a short video attached from me, Nick, for you.}",
    "links": []
   }
  ]
 },
 {
  "studio": "Hackney",
  "workflow": "Lead Nurture (July 2026)",
  "folder": "1. Leads",
  "status": "published",
  "triggers": [],
  "steps": [
   {
    "type": "email",
    "name": "Email 1",
    "subject": "A quick hello from {{custom_values.staff_leads}} 👋",
    "from": "{{location.name}} · {{location.email}}",
    "template": "BASIC TEMPLATE - June 2026",
    "missing": false,
    "text": "Hi {{contact.first_name}},\nI know inboxes are busy, so I'll keep this short.\nMy name's {{custom_values.staff_leads}} and I run {{location.name}} in {{location.city}}.\nI'm not writing to sell you anything today — I genuinely just wanted to introduce myself.\nWe work with people who want to get stronger, move better and feel more confident in their body. Most of our members are everyday people, not athletes. Teachers, parents, office workers, retirees — normal folk who decided they wanted more energy and fewer aches.\nIf that sounds like something you've been thinking about, I'd love to hear what's on your mind.\nJust hit reply and tell me:\n👉 What's the one thing you'd change about your health or fitness right now?\nNo pitch, no pressure. I read every reply personally.\nSpeak soon,\n{{custom_values.staff_leads}}\nHead Coach at {{location.name}}\n\nGet Started\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list or Manage your preference.",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 2",
    "subject": "That moment you realise something's changed",
    "from": "{{location.name}} · {{location.email}}",
    "template": "BASIC TEMPLATE - June 2026",
    "missing": false,
    "text": "{{contact.first_name}},\nIt usually starts with something small.\nYou bend down to pick something up and your back reminds you it's there.\nYou take the stairs at work and arrive at the top slightly out of breath.\nYou play with the kids — or grandkids — and feel it in your knees the next morning.\nNone of it is dramatic. None of it sends you to the doctor. But quietly, you know things aren't what they used to be.\nHere's what most people do: nothing. They assume it's just \"getting older\" and carry on.\nBut it doesn't have to be that way.\nStrength training — even just two or three sessions a week — can genuinely reverse these changes. Not with crazy workouts or heavy weights. Just the right movements, done consistently, with proper coaching.\nThat's exactly what we help people with at {{location.name}}.\nOur members regularly tell us they feel 10 years younger within a few months of starting. Not because of some magic programme — just because they finally started moving with purpose.\nIf any of this sounds familiar, tap below and I'll send over the details.\n{{custom_values.staff_leads}}\n{{location.name}}\n\nGet Started\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list or Manage your preference.",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 3",
    "subject": "The 3 things that actually matter after 40",
    "from": "{{location.name}} · {{location.email}}",
    "template": "BASIC TEMPLATE - June 2026",
    "missing": false,
    "text": "{{contact.first_name}},\nThere's a lot of noise out there about health and fitness. New diets every week, trendy workouts, miracle supplements.\nSo let me cut through it. If you're over 40 and want to stay active, independent and injury-free for the long haul, there are really only three things that matter:\n1️⃣ Build and maintain muscle\nAfter 30, you lose roughly 3–5% of your muscle mass per decade if you don't actively work to keep it. That's not a scare tactic — it's biology. The good news? Strength training at any age can slow, stop, or even reverse it.\n2️⃣ Move through your full range\nFlexibility and mobility aren't just for yoga. If you can't comfortably squat down, reach overhead, or turn to check your blind spot while driving — that's a sign your body is tightening up. Regular movement through full ranges keeps you capable.\n3️⃣ Stay consistent (not intense)\nTwo or three quality sessions per week beats one brutal session followed by a week on the sofa. Every time. Consistency always wins.\nThat's honestly it. No fads, no gimmicks.\nAt {{location.name}}, every session we run is built around these three principles. Our coaches guide you through everything — you just need to show up.\nIf you'd like to see how it works, tap below and I'll share the details.\n{{custom_values.staff_leads}}\n{{location.name}} · {{location.city}}\n\nStart Here\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list or Manage your preference.",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 4",
    "subject": "\"I wish I'd done this years ago\"",
    "from": "{{location.name}} · {{location.email}}",
    "template": "BASIC TEMPLATE - June 2026",
    "missing": false,
    "text": "{{contact.first_name}},\nWe hear this phrase more than almost any other at {{location.name}}.\n\"I wish I'd done this years ago.\"\nMark said exactly that after a few weeks with us. Here's what they told us:\n\"Before I joined, I hadn't exercised properly in years. I'd tried gyms before but always felt lost and ended up quitting after a month. {{location.name}} was completely different. The coaches actually knew my name, showed me what to do, and made me feel like I belonged from day one.\nI'm stronger now than I was in my 30s. I sleep better. My back pain has basically gone. And I actually look forward to going — which I never thought I'd say about exercise.\"\nThat's not an unusual story for us. We've got more than hundreds of five-star reviews from people who felt exactly the same way before they started.\nThe difference? The right environment, the right coaching, and a programme that's designed for real people — not fitness fanatics.\nIf you've been putting this off, maybe Janet's words will resonate:\n\"Just start. You won't regret it.\"\nWant to find out if it's right for you? Tap below and I'll get back to you today.\n{{custom_values.staff_leads}}\n{{location.name}}\n\nStart Here\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list or Manage your preference.",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 5",
    "subject": "\"I wouldn't know where to start\"",
    "from": "{{location.name}} · {{location.email}}",
    "template": "BASIC TEMPLATE - June 2026",
    "missing": false,
    "text": "{{contact.first_name}},\nIf you've ever thought \"I'd love to get fitter, but I wouldn't know where to start\" — this email is for you.\nBecause honestly? That's the number one thing people tell us before they join {{location.name}}.\nNot \"I can't afford it.\" Not \"I don't have time.\"\nIt's: \"I just don't know what I'm doing.\"\nAnd that's completely fair. Most gyms hand you a laminated induction sheet on day one and leave you to it. No wonder people feel lost.\nHere's how we do things differently:\n✅ Every session is coached — you never have to figure out what to do. A qualified coach runs the session, demonstrates every exercise, and adjusts things to suit your level.\n✅ You don't need any experience — over half our members had never touched a barbell before joining. We teach you from scratch.\n✅ It's small group, not a packed gym floor — you'll train alongside hundreds of people max, so you'll always get attention and feedback.\n✅ There's no shouting, no egos, no judgment — just a friendly group of people working hard and supporting each other.\nThe \"not knowing where to start\" feeling disappears after your very first session. We've seen it hundreds of times.\nSo if that's what's been holding you back, let's remove it.\nTap below and I'll walk you through exactly how your first week would look.\n{{custom_values.staff_leads}}\n{{location.name}}\n\nStart Here\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list or Manage your preference.",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 6",
    "subject": "Why this isn't a \"normal gym\"",
    "from": "{{location.name}} · {{location.email}}",
    "template": "BASIC TEMPLATE - June 2026",
    "missing": false,
    "text": "{{contact.first_name}},\nWhen you hear the word \"gym\", what picture comes to mind?\nRows of machines. People in headphones doing their own thing. Maybe a mirror wall and some grunting in the corner.\nThat's exactly what {{location.name}} isn't.\nHere's what makes us different:\n🏋️ Coached, not self-guided\nEvery session is led by a qualified coach. You don't wander around guessing — you follow a structured programme designed by professionals who know your name, your goals, and your body.\n👥 Small groups, real community\nOur sessions are capped at hundreds of people. You'll train alongside people just like you — not bodybuilders or Instagram models. Within a week, you'll know everyone's name.\n📋 Programmed for results\nWe don't do random workouts. Every session follows a progressive programme built around strength, mobility and functional fitness. That means you'll actually see results, not just get tired.\n🤝 Built for people who hate gyms\nSeriously. Most of our members told us they'd tried \"normal\" gyms and hated them. Then they walked through our door and everything changed.\nWe're not for everyone — and that's by design. We built {{location.name}} for people who want expert guidance, a supportive atmosphere, and training that actually works.\nIf that sounds more like what you've been looking for, let's have a chat.\nTap below and we'll book you in for a free consultation.\n{{custom_values.staff_leads}}\n{{location.name}} · {{location.city}}\n\nStart Here\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list or Manage your preference.",
    "links": []
   }
  ]
 },
 {
  "studio": "Hackney",
  "workflow": "New Workflow : Cancel Request",
  "folder": "",
  "status": "published",
  "triggers": [
   "Form Submitted"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Cancel Request",
    "subject": "Cancel Request {{contact.name}}",
    "from": "noreply@blueprintfitnessldn.com",
    "template": null,
    "missing": false,
    "text": "Name: {{contact.name}}\n\nEmail: {{contact.email}}\n\nReason: {{contact.additional_comments}}",
    "links": []
   }
  ]
 },
 {
  "studio": "Hackney",
  "workflow": "Nutrition Consult",
  "folder": "",
  "status": "published",
  "triggers": [
   "Form Submitted"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "Nutrition Consult Request: {{contact.name}}",
    "from": "no-reply@blueprintfitnessldn.com",
    "template": null,
    "missing": false,
    "text": "Nutrition Consult Request: {{contact.name}}\n{{contact.email}}\n{{contact.phone}}\n\nInBody Results: {{contact.do_you_have_your_inbody_results}}\n\nFood Diary?:\n{{contact.have_you_started_a_food_diary}}\n\nGoal:\n{{contact.what_is_your_overall_goal}}\n\nStruggles:{{contact.what_is_your_biggest_struggle_with_regards_to_nutrition}}\n\nPreference:\n{{contact.who_would_you_like_a_consultation_with}}",
    "links": []
   },
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "Nutrition Consult Request: {{contact.name}}",
    "from": "no-reply@blueprintfitnessldn.com",
    "template": null,
    "missing": false,
    "text": "Nutrition Consult Request: {{contact.name}}\n{{contact.email}}\n{{contact.phone}}\n\nInBody Results: {{contact.do_you_have_your_inbody_results}}\n\nFood Diary?:\n{{contact.have_you_started_a_food_diary}}\n\nGoal:\n{{contact.what_is_your_overall_goal}}\n\nStruggles:{{contact.what_is_your_biggest_struggle_with_regards_to_nutrition}}\n\nPreference:\n{{contact.who_would_you_like_a_consultation_with}}",
    "links": []
   },
   {
    "type": "email",
    "name": "Email",
    "subject": "Your nutrition consultation — what to bring",
    "from": "Blueprint Fitness Nutrition Team · info@blueprintfitnessldn.com",
    "template": "Nutrition — Consultation requested",
    "missing": false,
    "text": "We have got your request. Here is how to make it count.\n\nNutrition · Hackney\n\nWe have got your request\n\nHello {{contact.first_name}} — thanks for asking for nutrition help. A coach will be in touch to book you in.\n\nTwo things that make it far more useful\n\n•\n\nYour InBody results. The scan from your intro gives us your real starting point, including your BMR.\n\n•\n\nA few honest days of food. Not perfect — honest. It tells us more than any questionnaire.\n\nNot got either yet? Say so and we will sort it together. Nobody here is judging.\n\nWhile you wait, the Nutrition Video Series covers the principles we will be applying. Lessons 5 to 8 on calories are the ones most people wish they had watched sooner.\n\nWatch the video series\n\nUpdate your request\n\nSpeak soon,\n\nThe team\n\nBlueprint Fitness Hackney\n\nYour studio\n\nBlueprint Fitness Hackney\n\nArch 195, Morning Lane, Hackney, London, E9 6LJ\n\nMon–Fri 6am–9pm · Sat 8–11am · Closed Sunday\n\nhackney@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/members/nutrition-course/",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com/members/nutrition-request/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447944690356",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   }
  ]
 },
 {
  "studio": "Hackney",
  "workflow": "Speak With Us Call Booked",
  "folder": "",
  "status": "published",
  "triggers": [
   "Appointment Status"
  ],
  "steps": [
   {
    "type": "sms",
    "name": "SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Hi {{contact.first_name}}, just a reminder I'll be giving you a call in 1 hour's time.\n{{appointment.user.first_name}}",
    "links": []
   },
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "",
    "links": []
   }
  ]
 },
 {
  "studio": "Hackney",
  "workflow": "WA Trigger Link Clicked",
  "folder": "",
  "status": "published",
  "triggers": [
   "Trigger Link Clicked"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "",
    "links": []
   }
  ]
 },
 {
  "studio": "Hackney",
  "workflow": "Website Enquiry — Hackney",
  "folder": "",
  "status": "published",
  "triggers": [
   "External Tracking Event (main site)",
   "External Tracking Event"
  ],
  "steps": [
   {
    "type": "email",
    "name": "Confirmation email",
    "subject": "Hello {{contact.first_name}} — quick question about your 30 Day Kickstart",
    "from": "Blueprint Fitness Hackney · hackney@blueprintfitnessldn.com",
    "template": null,
    "missing": false,
    "text": "Thanks for registering your interest — one quick question before we book you in.\n\nThe 30-Day Kickstart · Hackney\n\nHello {{contact.first_name}}, you’re on the list.\n\nThanks for registering your interest in our 30 Day Kickstart at Blueprint Fitness Hackney. A coach will give you a ring shortly for a friendly chat — no hard sell, ever.\n\nJust to check — are you local to Hackney?\n\nReply to this email or message us on WhatsApp and we’ll get your first session booked in.\n\n12\n\nCoached sessions\n\n5:1\n\nMax ratio\n\n100+\n\nSessions a week\n\nStart your 30 days →\n\nMessage Hackney on WhatsApp\n\nSpeak soon,\n\nNick\n\nBlueprint Fitness Hackney\n\nYour studio\n\nBlueprint Fitness Hackney\n\nArch 195, Morning Lane, Hackney Central, London, E9 6LJ\n\nMon–Fri 6am–9pm · Sat–Sun 8am–4pm\n\nhackney@blueprintfitnessldn.com\n\nYou’re getting this because you registered your interest at\nblueprintfitnessldn.com.",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/signup-hackney/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447944690356?text=Hi%20Blueprint%20Fitness%20Hackney%20%E2%80%94%20I",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "sms",
    "name": "Confirmation SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Hello {{contact.first_name}}, thanks for registering your interest in our 30 Day Kickstart!\n\nJust to check, are you local to Hackney?\n\nNick",
    "links": []
   },
   {
    "type": "internal_notification",
    "name": "Notify the studio",
    "subject": "New website enquiry (Hackney): {{contact.name}}",
    "from": "hackney@blueprintfitnessldn.com",
    "template": null,
    "missing": false,
    "text": "New website enquiry — Hackney\n\nName: {{contact.name}}\n\nPhone: {{contact.phone}}\n\nEmail: {{contact.email}}\n\nCame in from the Blueprint Fitness website.",
    "links": []
   }
  ]
 },
 {
  "studio": "Leytonstone",
  "workflow": "1. Cancellation Request Form",
  "folder": "4. Cancellations",
  "status": "published",
  "triggers": [
   "Form Submitted"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "CANCELLATION REQUEST: {{contact.name}}",
    "from": "no-reply@blueprintfitnessldn.com",
    "template": null,
    "missing": false,
    "text": "Cancellation REQUEST Submitted\n\n{{contact.first_name}} {{contact.last_name}}\n\nPlease cancel payments accordingly on TeamUp using the CANCEL MEMBERSHIP button.\nSelect the correct end date.",
    "links": []
   },
   {
    "type": "email",
    "name": "Email",
    "subject": "Cancellation Request Receieved",
    "from": "{{custom_values.sales_and_journey}} · {{location.email}}",
    "template": null,
    "missing": false,
    "text": "Dear {{contact.first_name}},\n\nThis is just a quick email to confirm we have receieved your cancellation request.\n\nWe will be in touch to confirm your final payment (date & amount) and membership end date.\n\nWe'll be sad to see you go!\n\n{{custom_values.sales_and_journey}}",
    "links": []
   }
  ]
 },
 {
  "studio": "Leytonstone",
  "workflow": "1. NEW MEMBER (TEAMUP)",
  "folder": "3. Memberships",
  "status": "published",
  "triggers": [
   "Contact Tag"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "NEW MEMBERSHIP {{contact.name}}",
    "from": "do-not-reply@blueprintfitnessldn.com",
    "template": null,
    "missing": false,
    "text": "{{contact.first_name}} {{contact.last_name}} just signed up for a FULL membership ( {{contact.latest_membership}} )",
    "links": []
   },
   {
    "type": "sms",
    "name": "SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Hi {{contact.first_name}},\nYour membership should all be set up and ready to book now on TeamUp or our App.\nKeep up the great work!\nStu & Paul",
    "links": []
   },
   {
    "type": "sms",
    "name": "SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Hey {{contact.first_name}}!\nCongratulations on your first month as a full member at Blueprint!\nHow are you getting on?\nOut of curiosity, who do you know that might benefit from our 30 Day Trial? As a Friend of yours, we have Completely Free Golden Ticket for them!\nStu & Paul",
    "links": []
   },
   {
    "type": "sms",
    "name": "SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Congratulations {{contact.first_name}}!\nToday is 1 year since you joined as a Full Member at {{location.name}}!\nWell done, and thankyou for being a part of the team!",
    "links": []
   }
  ]
 },
 {
  "studio": "Leytonstone",
  "workflow": "1. New Lead - 30 Day Kickstart",
  "folder": "1. Leads",
  "status": "published",
  "triggers": [
   "Contact Tag",
   "Any FB Form"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "30 DAY LEAD (FB Form): {{contact.name}}",
    "from": "",
    "template": null,
    "missing": false,
    "text": "NewFB Lead for 30 Day Trial\nFirst Name: {{contact.first_name}}\nLast Name: {{contact.last_name}}\nEmail: {{contact.email}}\nPhone: {{contact.phone}}\nLooking For Help: {{contact.fb_form_q1}}\nLocal: {{contact.fb_form_q2}}\nMain Goal: {{contact.main_goal}}",
    "links": []
   },
   {
    "type": "email",
    "name": "Intro Program - Application Email",
    "subject": "Thanks {{contact.first_name}} — here is what happens next",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Lead 01 — We have got your details",
    "missing": false,
    "text": "A coach will call you shortly. No hard sell, ever.\n\nThe 30-Day Kickstart · Leytonstone\n\nHello {{contact.first_name}}, we have got you.\n\nThanks for registering your interest in the 30-Day Kickstart at Blueprint Fitness Leytonstone. Your details are with us.\n\nA coach will give you a ring shortly for a friendly chat — what you are after, what has worked before, what has not. No hard sell, ever. If it is not right for you, we will say so.\n\n12\n\nCoached sessions\n\n5:1\n\nMax ratio\n\n30\n\nDays\n\nIn the meantime — have a look at what a week actually looks like here. Knowing the sessions exist at times you can make is usually the thing people want to check first.\n\nSee the Leytonstone timetable\n\nMessage us on WhatsApp\n\nSpeak soon,\n\nStu\n\nBlueprint Fitness Leytonstone\n\nYour studio\n\nBlueprint Fitness Leytonstone\n\nUnit 3, Hitchcock Business Centre, Leytonstone, E11 4RE\n\nOpen early ’til late, 7 days a week\n\nleytonstone@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/leytonstone/timetable/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447947790035?text=Hi%20Blueprint%20Fitness%20Leytonstone%20%E2%80%94%20I",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447947790035",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "sms",
    "name": "SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Hi {{contact.first_name}} thanks so much for checking out our 30 Day Kickstart! Just to confirm, are you local to Leytonstone?\nPS. I've attached a short video with one of the owners, Stu 😊",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 2",
    "subject": "The gym is not a motivating place. That is rather the point.",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Lead 02 — Motivation",
    "missing": false,
    "text": "Why we built the opposite of a gym floor.\n\nThe 30-Day Kickstart · Leytonstone\n\nOn not feeling motivated\n\n“I have no motivation to go to the gym.” We hear it constantly — usually from people who have just got in touch with us.\n\nHere is the thing: a gym floor is not a motivating place. Everyone looks like they know what they are doing. Nobody tells you where to start. You do three exercises you half-remember and leave.\n\nMotivation is not what gets people through the door on a wet Tuesday in February. A time in the diary, a coach expecting you, and four other people who noticed you were not there last week — that is what does it.\n\nThat is the whole design. You book a session, someone has already written it, and a coach runs you through it. You do not have to decide anything.\n\nWhat that looks like\n\n•\n\n12 coached sessions across your first 30 days\n\n•\n\nNever more than five people to a coach, so you always get eyes on you\n\n•\n\nA plan written for you — not a class everyone does at once\n\n•\n\nAn InBody scan at the start, so progress is measured rather than guessed\n\nStart your 30 days at Leytonstone\n\nSpeak soon,\n\nStu\n\nBlueprint Fitness Leytonstone\n\nYour studio\n\nBlueprint Fitness Leytonstone\n\nUnit 3, Hitchcock Business Centre, Leytonstone, E11 4RE\n\nOpen early ’til late, 7 days a week\n\nleytonstone@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/signup-leytonstone/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447947790035",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "Email 3",
    "subject": "What actually happens in a session",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Lead 03 — What a session is like",
    "missing": false,
    "text": "No mirrors, no machines you cannot work out, no guessing.\n\nThe 30-Day Kickstart · Leytonstone\n\nWhat a session actually looks like\n\nMost gyms are built for people who already know what they are doing. Mirrors everywhere, rows of machines with no explanation, and nobody to ask.\n\nOurs is not. Here is what a session at Leytonstone is:\n\n•\n\nYou arrive. Your session is already written down.\n\n•\n\nA coach shows you each movement and watches you do it.\n\n•\n\nYou work at a weight that is right for you — not the person next to you.\n\n•\n\nYou leave knowing what you did and why.\n\nMost of our members are in their thirties to sixties, and a good share of them had not trained in years before they started. Nobody is performing for anybody.\n\nWe meet you where your strength and fitness actually are, and build from there. There are no degrading challenges and nobody is getting put on a treadmill for an hour.\n\nLook at the timetable\n\nOr start your 30 days\n\nSpeak soon,\n\nStu\n\nBlueprint Fitness Leytonstone\n\nYour studio\n\nBlueprint Fitness Leytonstone\n\nUnit 3, Hitchcock Business Centre, Leytonstone, E11 4RE\n\nOpen early ’til late, 7 days a week\n\nleytonstone@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/leytonstone/timetable/",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com/signup-leytonstone/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447947790035",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "Email 4",
    "subject": "Most people who join us are complete beginners",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Lead 04 — For beginners",
    "missing": false,
    "text": "Including the ones who now look like they never were.\n\nThe 30-Day Kickstart · Leytonstone\n\nAlmost everyone starts here as a beginner\n\nIt is the most common worry we hear: everyone there will be fitter than me.\n\nMost people who join Blueprint Fitness are complete beginners. The members who look like naturals are simply the ones who kept turning up three times a week for a year. That is the entire secret.\n\nWhat keeps people coming back\n\n•\n\nThe session is planned, so there is no standing about wondering what to do.\n\n•\n\nA coach is with you the whole way — you are never left to work it out.\n\n•\n\nThe group is small enough that people notice you, and say hello.\n\n•\n\nIt gets measurably easier, and you can see it in the numbers.\n\nIf you have a question before you commit — an injury, a schedule, anything at all — just reply to this email. A real person reads it.\n\nStart your 30 days at Leytonstone\n\nSpeak soon,\n\nStu\n\nBlueprint Fitness Leytonstone\n\nYour studio\n\nBlueprint Fitness Leytonstone\n\nUnit 3, Hitchcock Business Centre, Leytonstone, E11 4RE\n\nOpen early ’til late, 7 days a week\n\nleytonstone@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/signup-leytonstone/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447947790035",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "Email 5",
    "subject": "Two members who started exactly where you are",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Lead 05 — Member stories",
    "missing": false,
    "text": "Michelle and Georgia both began on a 30-day trial.\n\nThe 30-Day Kickstart · Leytonstone\n\nThey started on the same 30 days\n\nHello {{contact.first_name}} — the most useful thing we can show you is not us talking about ourselves. It is members talking about the bit before they started.\n\nMichelle and Georgia both began on a 30-day trial, both having not trained properly in years, and both stayed. Their stories are on the site, in their own words.\n\nWatch the member stories\n\nEvery one of them is unremarkable in the best way: someone busy, a bit apprehensive, who booked a session and then booked another one.\n\nStart your own 30 days\n\nSpeak soon,\n\nStu\n\nBlueprint Fitness Leytonstone\n\nYour studio\n\nBlueprint Fitness Leytonstone\n\nUnit 3, Hitchcock Business Centre, Leytonstone, E11 4RE\n\nOpen early ’til late, 7 days a week\n\nleytonstone@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/#member-stories",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com/signup-leytonstone/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447947790035",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "Email 6",
    "subject": "The four things that stop people starting",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Lead 06 — Common hurdles",
    "missing": false,
    "text": "Time, consistency, feeling watched, and food.\n\nThe 30-Day Kickstart · Leytonstone\n\nThe four things that stop people\n\nAfter a decade of first sessions, the same four things come up. None of them is a good reason not to start.\n\n“I have not got time”\n\nA session is an hour, three times a week, at a time you choose. Open early ’til late, 7 days a week. If the timetable does not work around your life, tell us and we will be honest about whether we can fit you in.\n\n“I cannot stay consistent”\n\nWhich is why the sessions are booked, coached and expected. Consistency is much easier when somebody notices you are missing.\n\n“I will feel watched”\n\nFive people, one coach, everyone concentrating on their own work. Nobody is looking at you — they are busy.\n\n“I do not know what to eat”\n\nWe cover that too, with practical guidance rather than a meal plan to buy. Start with training; food follows more easily once you are moving.\n\nStart your 30 days\n\nSpeak soon,\n\nStu\n\nBlueprint Fitness Leytonstone\n\nYour studio\n\nBlueprint Fitness Leytonstone\n\nUnit 3, Hitchcock Business Centre, Leytonstone, E11 4RE\n\nOpen early ’til late, 7 days a week\n\nleytonstone@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/signup-leytonstone/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447947790035",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "Email 7",
    "subject": "What is actually different about training here",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Lead 07 — What makes it different",
    "missing": false,
    "text": "Small groups, a real plan, and coaches who know your name.\n\nThe 30-Day Kickstart · Leytonstone\n\nWhat is actually different here\n\nChoosing where to train is a bigger decision than it looks, so here is the honest version of what you get with us — and what you do not.\n\nYou get\n\n•\n\nA coach in the room with you for every session, not on a rota somewhere.\n\n•\n\nA maximum of five people to that coach.\n\n•\n\nA programme that progresses, written around what you can do now.\n\n•\n\nPeople who know your name by week two.\n\nYou do not get\n\n•\n\nA swipe card and good luck.\n\n•\n\nA room of machines and no idea which ones matter.\n\n•\n\nA contract you cannot get out of.\n\nIt is personal training, delivered in a small supportive group. That is the whole idea — the coaching of one-to-one, at a price that is not one-to-one.\n\nSee what membership costs\n\nOr start with 30 days\n\nSpeak soon,\n\nStu\n\nBlueprint Fitness Leytonstone\n\nYour studio\n\nBlueprint Fitness Leytonstone\n\nUnit 3, Hitchcock Business Centre, Leytonstone, E11 4RE\n\nOpen early ’til late, 7 days a week\n\nleytonstone@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/memberships/",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com/signup-leytonstone/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447947790035",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "Email 8",
    "subject": "The questions we get asked most",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Lead 08 — Questions answered",
    "missing": false,
    "text": "Commitment, fitness level, injuries and times.\n\nThe 30-Day Kickstart · Leytonstone\n\nYour questions, answered\n\nHello {{contact.first_name}}. The same handful of questions come up before people start, so here they are with straight answers.\n\nIs the 30 days a contract?\n\nNo. It is thirty days. Most people stay, some do not, and that is genuinely fine.\n\nAm I fit enough?\n\nYes. Everything is scaled to you — that is what having a coach in the room is for.\n\nWhat if I have an injury?\n\nTell us on your first call. Our coaches work around injuries and conditions every day; we would rather know up front than find out later.\n\nWhen are the sessions?\n\nOpen early ’til late, 7 days a week. The full grid is on the site, so you can check before you commit.\n\nCheck the timetable\n\nWhat does it cost?\n\nThe 30-Day Kickstart is £169 — twelve coached sessions, your InBody scan and your plan. No joining fee.\n\nStart your 30 days\n\nSpeak soon,\n\nStu\n\nBlueprint Fitness Leytonstone\n\nYour studio\n\nBlueprint Fitness Leytonstone\n\nUnit 3, Hitchcock Business Centre, Leytonstone, E11 4RE\n\nOpen early ’til late, 7 days a week\n\nleytonstone@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/leytonstone/timetable/",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com/signup-leytonstone/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447947790035",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "Email 9",
    "subject": "The 30-Day Kickstart, and what £169 covers",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Lead 09 — What it costs",
    "missing": false,
    "text": "Twelve coached sessions, an InBody scan, and your plan.\n\nThe 30-Day Kickstart · Leytonstone\n\nWhat £169 actually covers\n\nNo games and no countdown timers — just what the Kickstart is and what it costs, so you can decide.\n\n12\n\nCoached sessions\n\n5:1\n\nMax ratio\n\n30\n\nDays\n\n£169 for your first 30 days\n\n•\n\n12 coached sessions — three a week, at times you pick\n\n•\n\nAn InBody scan and goal-setting session to start from a real number\n\n•\n\nA plan written around you, progressed as you go\n\n•\n\nPractical nutrition guidance — no meal plans to buy\n\n•\n\nNo joining fee and no contract\n\nBooked as one-to-one personal training, a month like that costs several hundred pounds. It is £169 because you share your coach with four other people.\n\nStart your 30 days at Leytonstone\n\nSee what happens after the 30 days\n\nSpeak soon,\n\nStu\n\nBlueprint Fitness Leytonstone\n\nYour studio\n\nBlueprint Fitness Leytonstone\n\nUnit 3, Hitchcock Business Centre, Leytonstone, E11 4RE\n\nOpen early ’til late, 7 days a week\n\nleytonstone@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/signup-leytonstone/",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com/memberships/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447947790035",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "Email 10",
    "subject": "{{contact.first_name}}, shall we leave it there?",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Lead 10 — Last call",
    "missing": false,
    "text": "Last email from us — unless you would like to start.\n\nThe 30-Day Kickstart · Leytonstone\n\nShall we leave it there?\n\nThis is the last email in this sequence, {{contact.first_name}} — we are not going to keep nudging you.\n\nIf the timing is wrong, that is completely fine. Keep us in mind; the door stays open and the offer does not change.\n\nIf you have been meaning to start and simply have not got round to it, this is the reminder. Thirty days, twelve coached sessions, and an honest answer at the end of it about whether this suits you.\n\nStart your 30 days\n\nRather talk to a human first? Message us and a coach at Leytonstone will reply — no script, no pressure.\n\nAsk us a question\n\nSpeak soon,\n\nStu\n\nBlueprint Fitness Leytonstone\n\nYour studio\n\nBlueprint Fitness Leytonstone\n\nUnit 3, Hitchcock Business Centre, Leytonstone, E11 4RE\n\nOpen early ’til late, 7 days a week\n\nleytonstone@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/signup-leytonstone/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447947790035?text=Hi%20Blueprint%20Fitness%20Leytonstone%20%E2%80%94%20I",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447947790035",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "sms",
    "name": "SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Just checking we got the right number for you {{contact.first_name}}? 🤞🤞",
    "links": []
   }
  ]
 },
 {
  "studio": "Leytonstone",
  "workflow": "1. Signed Up - 30 Day Trial",
  "folder": "2. Challenge",
  "status": "published",
  "triggers": [
   "30 Day Founders",
   "Zapped 30 Day"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "LEYTONSTONE 30 DAY SIGNUP {{contact.name}}",
    "from": "{{location.email}}",
    "template": null,
    "missing": false,
    "text": "NEW SIGNUP!\n{{contact.name}} just signed up for the {{custom_values.challengetrial_name}}",
    "links": []
   },
   {
    "type": "email",
    "name": "Intro - Welcome Email",
    "subject": "Welcome to Blueprint Leytonstone — your first steps",
    "from": "Stuart Rook · info@blueprintfitnessldn.com",
    "template": "Joined 01 — Welcome and getting started",
    "missing": false,
    "text": "Three things to get sorted before session one.\n\nYou’re in · Leytonstone\n\nWelcome, {{contact.first_name}}.\n\nLovely to have you. Over the next thirty days you will train properly, meet a few people, and find out what you are actually capable of. Here is what happens first.\n\n1. Your intro call\n\nA coach will ring you to book your first session and get to know you. If you would rather sort it now, message us and we will get it in the diary.\n\nBook your intro on WhatsApp\n\n2. Your InBody scan\n\nWe take a baseline — muscle mass, body fat, BMR — so that in thirty days we are comparing numbers rather than impressions. It takes a couple of minutes.\n\n3. Booking your sessions\n\nSessions are booked through TeamUp. Have a quick read of how booking and cancelling work, so you never lose a session to the cut-off.\n\nHow booking works\n\nAnything at all — injuries, nerves, a week away — just tell us. It is much easier to plan around something we know about.\n\nSee the timetable\n\nSpeak soon,\n\nThe team\n\nBlueprint Fitness Leytonstone\n\nYour studio\n\nBlueprint Fitness Leytonstone\n\nUnit 3, Hitchcock Business Centre, Leytonstone, E11 4RE\n\nOpen early ’til late, 7 days a week\n\nleytonstone@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://wa.me/447947790035?text=Hi%20Blueprint%20Fitness%20Leytonstone%20%E2%80%94%20I",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com/members/bookings-cancellations/",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com/leytonstone/timetable/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447947790035",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   }
  ]
 },
 {
  "studio": "Leytonstone",
  "workflow": "2. Cancelled (TeamUp)",
  "folder": "4. Cancellations",
  "status": "published",
  "triggers": [
   "Contact Tag"
  ],
  "steps": [
   {
    "type": "email",
    "name": "Email 1",
    "subject": "How have you been, {{contact.first_name}}?",
    "from": "{{custom_values.sales_and_journey}} · {{location.email}}",
    "template": "Win-back 01 — Checking in",
    "missing": false,
    "text": "No pitch — just seeing how you got on.\n\nFrom the team · Leytonstone\n\nHow have you been?\n\nHello {{contact.first_name}}. It has been a little while since you trained with us, and I wanted to see how you have got on.\n\nNo pitch attached to this one. If you found something that works better, genuinely good — that is the point of the whole exercise.\n\nAnd if it all rather tailed off, that happens to almost everybody. It is not a character flaw.\n\nReply on WhatsApp\n\nSpeak soon,\n\nStu\n\nBlueprint Fitness Leytonstone\n\nYour studio\n\nBlueprint Fitness Leytonstone\n\nUnit 3, Hitchcock Business Centre, Leytonstone, E11 4RE\n\nOpen early ’til late, 7 days a week\n\nleytonstone@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://wa.me/447947790035?text=Hi%20Blueprint%20Fitness%20Leytonstone%20%E2%80%94%20just%20replying%20to%20your%20email.",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447947790035",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "Email",
    "subject": "Still fancy getting back to it?",
    "from": "{{custom_values.sales_and_journey}} · {{location.email}}",
    "template": "Win-back 02 — Still thinking about it",
    "missing": false,
    "text": "The door is open, and starting again is easier than starting.\n\nFrom the team · Leytonstone\n\nStill fancy getting back to it?\n\nHello {{contact.first_name}} — a quick one. If getting back into training has been on your list, you would not be starting from scratch. You already know how the sessions work and the coaches already know you.\n\nQuite a lot has changed since you were last in, too. Here is the current timetable at Leytonstone.\n\nSee what is on now\n\nIf you would rather just ask what has changed, message us — happy to give you the honest version.\n\nAsk us what has changed\n\nSpeak soon,\n\nStu\n\nBlueprint Fitness Leytonstone\n\nYour studio\n\nBlueprint Fitness Leytonstone\n\nUnit 3, Hitchcock Business Centre, Leytonstone, E11 4RE\n\nOpen early ’til late, 7 days a week\n\nleytonstone@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/leytonstone/timetable/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447947790035?text=Hi%20Blueprint%20Fitness%20Leytonstone%20%E2%80%94%20I",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447947790035",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "Email",
    "subject": "Whenever you are ready",
    "from": "{{custom_values.sales_and_journey}} · {{location.email}}",
    "template": "Win-back 03 — Whenever you are ready",
    "missing": false,
    "text": "Last one from us — no hard feelings either way.\n\nFrom the team · Leytonstone\n\nWhenever you are ready\n\nThis is the last one from us, {{contact.first_name}}, so we do not become the gym that will not stop emailing.\n\nIf and when you want to come back, everything is where you left it. Message the studio and we will pick it up from there — no re-joining fee, no awkwardness about the gap.\n\nAll the best either way.\n\nSee what a month looks like now\n\nSpeak soon,\n\nStu\n\nBlueprint Fitness Leytonstone\n\nYour studio\n\nBlueprint Fitness Leytonstone\n\nUnit 3, Hitchcock Business Centre, Leytonstone, E11 4RE\n\nOpen early ’til late, 7 days a week\n\nleytonstone@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/leytonstone/kickstart/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447947790035",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   }
  ]
 },
 {
  "studio": "Leytonstone",
  "workflow": "2. Intro Complete Main Flow",
  "folder": "2. Challenge",
  "status": "published",
  "triggers": [
   "Pipeline Stage Changed"
  ],
  "steps": [
   {
    "type": "sms",
    "name": "Intro Complete SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Hi {{contact.first_name}}! Well done on getting started. How are you feeling so far? If you have any questions or need help, let me know here. We are excited to have you onboard! {{user.first_name}}",
    "links": []
   },
   {
    "type": "sms",
    "name": "2 Weeks SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Hi {{contact.first_name}},\nI just wanted to say well done again! What's been the best thing about starting your journey with us so far?",
    "links": []
   },
   {
    "type": "email",
    "name": "Email",
    "subject": "I hope you're well {{contact.first_name}} 😊",
    "from": "{{custom_values.sales_and_journey}} · {{location.email}}",
    "template": null,
    "missing": false,
    "text": "Hi {{contact.first_name}}\n\nIt's been a while but just checking in again to see how you're doing,\n\nIf you ever fancy dropping in over the next couple of months just reply to this email to let me know you're alive and well and I'll add 5 free classes to your account you can use.\n\nThe door is alway open if you want to reboot things!\n\nStu",
    "links": []
   },
   {
    "type": "email",
    "name": "Email",
    "subject": "I hope you're well {{contact.first_name}} 😊",
    "from": "{{custom_values.sales_and_journey}} · {{location.email}}",
    "template": null,
    "missing": false,
    "text": "Hi {{contact.first_name}}\n\nIt's been about 3 months since you finished with us, so I just wanted to make sure you're still taking good care of your health.\n\nThe offer of some free classes is still there if you want to get moving again and feel ready?\n\nWhat do you think?\n\nStu",
    "links": []
   },
   {
    "type": "sms",
    "name": "Intro Complete SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Hi {{contact.first_name}}\nWell done on getting started.\nHow are you feeling after your first session?\nIf you have any questions or need any help, give me a shout. It’s great to have you on board!\nStu",
    "links": []
   },
   {
    "type": "sms",
    "name": "1 Week SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Hey {{contact.first_name}},\nQuick one to say well done on completing your first week. I hope you’ve enjoyed it and managed to try out a few different classes.\nWhat has been the best thing about starting your journey with us so far? Stu",
    "links": []
   },
   {
    "type": "email",
    "name": "Email",
    "subject": "What happens next after your trial?⚡",
    "from": "Stuart Rook · info@blueprintfitnessldn.com",
    "template": "1. 14 Day (Day 10): WHAT HAPPENS NEXT?",
    "missing": false,
    "text": "Hey there, {{contact.first_name}}!\n\nWe hope you've been enjoying your 14-day trial at Blueprint:Fitness and that two weeks spent with us has given you a snapshot of how we do our thing, and how we can support you to achieve your goals.\n\nAs your trial period is coming towards the end, we wanted to reach out and give you some info about membership… AND offer you the opportunity to extend your trial period for the full 30 days (this is our usual trial offer).\n\nIf this option floats your boat, we’ll top you up for another two weeks at the incredibly high value cost of £59. That's the full trial for £118 instead of £129!\n\nAlternatively, if you’re ready to jump right in and become a full time member, please CLICK HERE to join via TeamUp..\n\nWe're all about tracking progress and celebrating achievements here at Blueprint:Fitness, so don't forget to book your InBody review with one of our coaches!\n\nWe know that a two week trial signifies only the very beginning of your fitness journey with us, but we'd also like to remind you about your results check-in. This check in is a great opportunity to reflect on how far you've come, set new goals, and get some expert advice on how to continue making progress.\n\nMost importantly, we hope that this two week snapshot has provided you with the motivation to keep working towards your goals, your body composition changes and the gradual increases in strength, fitness, confidence and mentality…!\n\nSo what are you waiting for? Take the next step and become a member of our awesome fitness community today!\n\nThank you for choosing Blueprint:Fitness for your fitness journey, and we hope to see you soon!\n\nThe Blueprint:Fitness Team\n\ninfo@blueprintfitnessldn.com\n\n07736 033 985 // 07855 353 798\n\nblueprintfitnessldn.com\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list.",
    "links": [
     {
      "url": "https://goteamup.com/w3662065/p/3662065-blueprint-fitness/memberships/",
      "health": "ok"
     }
    ]
   },
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "",
    "links": []
   },
   {
    "type": "sms",
    "name": "SMS Day 21",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Hey {{contact.first_name}},\n21 Days In - Well Done!\nHow are you feeling?\n{{user.first_name}}",
    "links": []
   },
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email",
    "subject": "I hope you're well {{contact.first_name}} 😊",
    "from": "{{custom_values.sales_and_journey}} · {{location.email}}",
    "template": null,
    "missing": false,
    "text": "Hi {{contact.first_name}}\n\nIt's been a while but just checking in again to see how you're doing,\n\nIf you ever fancy dropping in over the next couple of months just reply to this email to let me know you're alive and well and I'll add 5 free sessions to your account you can use.\n\nThe door is alway open if you want to reboot things!\n\n{{custom_values.sales_and_journey}}",
    "links": []
   },
   {
    "type": "email",
    "name": "Email",
    "subject": "I hope you're well {{contact.first_name}} 😊",
    "from": "{{custom_values.sales_and_journey}} · {{location.email}}",
    "template": null,
    "missing": false,
    "text": "Hi {{contact.first_name}}\n\nIt's been a while but just checking in again to see how you're doing,\n\nIf you ever fancy dropping in over the next couple of months just reply to this email to let me know you're alive and well and I'll add 5 free sessions to your account you can use.\n\nThe door is alway open if you want to reboot things!\n\n{{custom_values.sales_and_journey}}",
    "links": []
   }
  ]
 },
 {
  "studio": "Leytonstone",
  "workflow": "30 Day Email Sequence",
  "folder": "2. Challenge",
  "status": "published",
  "triggers": [
   "Pipeline Stage Changed"
  ],
  "steps": [
   {
    "type": "email",
    "name": "2 Email - Nutrition Journey",
    "subject": "The nutrition side, without the faff",
    "from": "{{location.name}} · info@blueprintfitnessldn.com",
    "template": "Joined 02 — Nutrition",
    "missing": false,
    "text": "A 22-part video series and a coach, both included.\n\nYour first 30 days · Leytonstone\n\nTraining is half of it\n\nHello {{contact.first_name}}. You do not need to overhaul your diet to get results in your first month — but a few honest changes go a very long way.\n\nTwo things are included with your membership, and both are worth using.\n\nThe Nutrition Video Series\n\nTwenty-two short lessons, in the order that actually matters — calories, adherence, habits, and what to do when progress stalls. Watch one a day and you will understand more than most people who have been dieting for years.\n\nStart the video series\n\nA consultation with a coach\n\nWhen you want it applied to you specifically rather than in general, request a consultation. Bring your InBody results and a few honest days of food — that tells us far more than any questionnaire.\n\nRequest a consultation\n\nNo fad diets and nothing to buy. Just practical guidance built around how you actually live.\n\nSpeak soon,\n\nThe team\n\nBlueprint Fitness Leytonstone\n\nYour studio\n\nBlueprint Fitness Leytonstone\n\nUnit 3, Hitchcock Business Centre, Leytonstone, E11 4RE\n\nOpen early ’til late, 7 days a week\n\nleytonstone@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/members/nutrition-course/",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com/members/nutrition-request/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447947790035",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "5 Email - Referral Hoodie",
    "subject": "Know someone who would get on well here?",
    "from": "{{location.name}} · info@blueprintfitnessldn.com",
    "template": "Joined 05 — Refer a friend",
    "missing": false,
    "text": "Send them a 30-Day Kickstart.\n\nYour first 30 days · Leytonstone\n\nBring someone with you\n\nHello {{contact.first_name}} — training is easier when someone you know is doing it too. It is also how most of our members found us.\n\nIf there is someone who has been saying they should do something about it, send them this and let them have a look at what a month here involves.\n\nSend them the 30-Day Kickstart\n\nMention it to a coach when they start, so we know who to thank.\n\nSpeak soon,\n\nThe team\n\nBlueprint Fitness Leytonstone\n\nYour studio\n\nBlueprint Fitness Leytonstone\n\nUnit 3, Hitchcock Business Centre, Leytonstone, E11 4RE\n\nOpen early ’til late, 7 days a week\n\nleytonstone@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/leytonstone/kickstart/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447947790035",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "4 Email - Socials",
    "subject": "The bit that keeps people here",
    "from": "{{location.name}} · info@blueprintfitnessldn.com",
    "template": "Joined 04 — The community",
    "missing": false,
    "text": "The socials are genuinely half the reason people stay.\n\nYour first 30 days · Leytonstone\n\nThe bit nobody expects\n\nMost people join for the training. A surprising number stay for everyone else.\n\nThere are socials, events and a fair amount of nonsense in the group chat. You are welcome at all of it, and there is no obligation to any of it.\n\nIf you have been coming a couple of weeks and have not met many people yet, tell a coach. Introducing people is genuinely part of the job here.\n\nYour members area\n\nSpeak soon,\n\nThe team\n\nBlueprint Fitness Leytonstone\n\nYour studio\n\nBlueprint Fitness Leytonstone\n\nUnit 3, Hitchcock Business Centre, Leytonstone, E11 4RE\n\nOpen early ’til late, 7 days a week\n\nleytonstone@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/members/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447947790035",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "3 Email - Best Results?",
    "subject": "Which sessions will get you the results you want?",
    "from": "{{location.name}} · info@blueprintfitnessldn.com",
    "template": "Joined 03 — Which sessions to pick",
    "missing": false,
    "text": "SGPT, and how the classes fit around it.\n\nYour first 30 days · Leytonstone\n\nWhich sessions should you book?\n\nShort answer: your coached SGPT sessions are the backbone. Everything else is a bonus on top.\n\nSGPT — your three a week\n\nThis is the one that moves the needle. Strength work, progressed week to week, with a coach watching. If you only ever do these three, you will still get where you are going.\n\nThe classes\n\nConditioning sessions you can add on when you fancy them. They are not a replacement for your coached sessions — they are for the weeks when you want a fourth thing to do.\n\nSee what is on at Leytonstone\n\nNot sure what to book? Ask your coach at your next session. They know what you are working on.\n\nSpeak soon,\n\nThe team\n\nBlueprint Fitness Leytonstone\n\nYour studio\n\nBlueprint Fitness Leytonstone\n\nUnit 3, Hitchcock Business Centre, Leytonstone, E11 4RE\n\nOpen early ’til late, 7 days a week\n\nleytonstone@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/leytonstone/timetable/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447947790035",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "6. Price List",
    "subject": "What happens when your 30 days are up",
    "from": "{{location.name}} · info@blueprintfitnessldn.com",
    "template": "Joined 07 — What happens after 30 days",
    "missing": false,
    "text": "Your options, and what each one costs.\n\nYour first 30 days · Leytonstone\n\nWhat happens after your 30 days\n\nYou are most of the way through, so here is what comes next — no surprises at the till.\n\nMemberships are simply a question of how many coached sessions a month suit your life. Same coaching, same small groups, same plan.\n\n•\n\nSGPT 12 — £239 a month. Three a week, and what most members settle on.\n\n•\n\nSGPT 8 — £219 a month. Two a week with room for a third.\n\n•\n\nSGPT 4 — £189 a month. One a week, steady and sustainable.\n\nAll of them include unlimited classes, your monthly check-in, InBody tracking and the nutrition resources.\n\nCompare the memberships\n\nThere is a 10% discount for couples in the same household, NHS and services. Ask your coach, or just reply to this.\n\nSpeak soon,\n\nThe team\n\nBlueprint Fitness Leytonstone\n\nYour studio\n\nBlueprint Fitness Leytonstone\n\nUnit 3, Hitchcock Business Centre, Leytonstone, E11 4RE\n\nOpen early ’til late, 7 days a week\n\nleytonstone@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/memberships/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447947790035",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "7. Email",
    "subject": "What it is actually like once the 30 days are over",
    "from": "{{location.name}} · info@blueprintfitnessldn.com",
    "template": "Joined 06 — Life as a full member",
    "missing": false,
    "text": "Same coaching, same small groups, just no end date.\n\nYour first 30 days · Leytonstone\n\nLife after the Kickstart\n\nHello {{contact.first_name}} — people often ask what changes when the 30 days finish. Honestly: not much, and that is rather the point.\n\nSame coaches, same small groups, same plan carrying on from where you got to. What changes is that you stop thinking about it as a trial and start thinking about it as the thing you do on Mondays, Wednesdays and Fridays.\n\nWhat members get on top\n\n•\n\nUnlimited classes alongside your coached sessions\n\n•\n\nA monthly check-in with your coach, whenever you want one\n\n•\n\nInBody tracking, so progress stays measured\n\n•\n\nThe nutrition resources and our clinics and workshops\n\n•\n\nEvery social and event going\n\nMost people find the second month easier than the first. The hard part was becoming someone who turns up, and you have already done that.\n\nSee the memberships\n\nSpeak soon,\n\nThe team\n\nBlueprint Fitness Leytonstone\n\nYour studio\n\nBlueprint Fitness Leytonstone\n\nUnit 3, Hitchcock Business Centre, Leytonstone, E11 4RE\n\nOpen early ’til late, 7 days a week\n\nleytonstone@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/memberships/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447947790035",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "8. Email Thankyou Legend",
    "subject": "Thirty days done, {{contact.first_name}}",
    "from": "{{location.name}} · info@blueprintfitnessldn.com",
    "template": "Joined 08 — Thank you",
    "missing": false,
    "text": "You turned up. That is the hard part.\n\nYour first 30 days · Leytonstone\n\nThirty days. Done.\n\nWhatever the numbers say, you did the difficult bit: you kept turning up. Most people never get past the first week.\n\nHave a look at your InBody comparison with your coach — a month is long enough for the numbers to have moved, and it is a good deal more satisfying than guessing.\n\nWhatever you decide about carrying on, thank you for giving it a proper go. It has been a pleasure having you in.\n\nCarry on with a membership\n\nTalk it through with us\n\nSpeak soon,\n\nThe team\n\nBlueprint Fitness Leytonstone\n\nYour studio\n\nBlueprint Fitness Leytonstone\n\nUnit 3, Hitchcock Business Centre, Leytonstone, E11 4RE\n\nOpen early ’til late, 7 days a week\n\nleytonstone@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/memberships/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447947790035?text=Hi%20Blueprint%20Fitness%20Leytonstone%20%E2%80%94%20I",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447947790035",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   }
  ]
 },
 {
  "studio": "Leytonstone",
  "workflow": "Application",
  "folder": "",
  "status": "published",
  "triggers": [
   "Application - Shorter",
   "Application - Longer"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "BF Application: {{contact.name}}",
    "from": "no-reply@b3.media",
    "template": null,
    "missing": false,
    "text": "Name: {{contact.name}}\nPhone: {{contact.phone}}\nEmail: {{contact.email}}\nWilling To Invest:\n{{contact.apply_if_there_was_an_opportunity_to_work_together_what_would_you_be_willing_to_invest_in_yourself_to_achieve_your_goals}}\nSituation/Struggles:\n{{contact.apply_tell_me_a_little_about_your_situation_what_do_you_need_help_with}}\n{{contact.apply2_what_are_you_struggling_with_right_now}}\nTried Before/Barriers:\n{{contact.apply_what_have_you_tried_before_that_didnt_work}}\n{{contact.apply2_what_is_your_biggest_barrier_to_achieving_the_result_you_are_aiming_for}}\n\nPriority:\n{{contact.apply_how_much_of_a_priority_is_achieving_your_goals_right_now}}\n\n3 Goals:\n{{contact.apply_what_are_3_goals_that_youd_like_to_achieve_with_us}}\n\nWhy Us?:\n{{contact.apply_why_do_you_want_to_work_with_us}}\n\nWhy A Good Client?:\n{{contact.apply_tell_us_why_youd_make_a_good_client}}",
    "links": []
   }
  ]
 },
 {
  "studio": "Leytonstone",
  "workflow": "Check In Form Feb 2024",
  "folder": "",
  "status": "published",
  "triggers": [
   "Form Submitted"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "{{contact.check_who_to_speak_to}} Coaching Checkin: {{contact.name}}",
    "from": "no-reply@b3.media",
    "template": null,
    "missing": false,
    "text": "Contact: {{contact.name}}\nPhone: {{contact.phone}}\n\nWhich Programme:\n{{contact.check_which_programme_did_you_follow_on_your_last_cycle}}\n\nHow was it?\n{{contact.check_how_was_it}}\n\nWhich TEAM:\n{{contact.check_which_team_sessions_did_you_attend}}\n\nCurrent Objectives:\n{{contact.check_what_is_your_current_objective}}\n\nMeasurables:\n{{contact.check_which_measurables_are_you_tracking}}\n{{contact.check_which_measurables_are_you_tracking_other}}\n\nImproved/Declined:\n{{contact.check_have_these_measurables_improved_of_declined_in_the_last_3_months}}\n{{contact.check_improve_or_decline}}\n{{contact.check_decline}}\n\nSuccess?\n{{contact.check_what_does_success_look_like_to_you_and_how_can_we_better_help_you_achieve_success}}\n\nCoach:\n{{contact.check_who_to_speak_to}}",
    "links": []
   },
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "{{contact.check_who_to_speak_to}} Coaching Checkin: {{contact.name}}",
    "from": "no-reply@b3.media",
    "template": null,
    "missing": false,
    "text": "Contact: {{contact.name}}\nPhone: {{contact.phone}}\n\nWhich Programme:\n{{contact.check_which_programme_did_you_follow_on_your_last_cycle}}\n\nHow was it?\n{{contact.check_how_was_it}}\n\nWhich TEAM:\n{{contact.check_which_team_sessions_did_you_attend}}\n\nCurrent Objectives:\n{{contact.check_what_is_your_current_objective}}\n\nMeasurables:\n{{contact.check_which_measurables_are_you_tracking}}\n{{contact.check_which_measurables_are_you_tracking_other}}\n\nImproved/Declined:\n{{contact.check_have_these_measurables_improved_of_declined_in_the_last_3_months}}\n{{contact.check_improve_or_decline}}\n{{contact.check_decline}}\n\nSuccess?\n{{contact.check_what_does_success_look_like_to_you_and_how_can_we_better_help_you_achieve_success}}\n\nCoach:\n{{contact.check_who_to_speak_to}}",
    "links": []
   }
  ]
 },
 {
  "studio": "Leytonstone",
  "workflow": "Class Feedback Form",
  "folder": "",
  "status": "published",
  "triggers": [
   "Form Submitted"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "Class Feedback: {{contact.name}}",
    "from": "no-reply@b3.media",
    "template": null,
    "missing": false,
    "text": "Contact: {{contact.name}}\nBoxing:\n{{ contact.feedback_do_you_attend_attend_boxing_classes }}\nMetCon:\n{{ contact.feedback_do_you_attend_metcon_classes }}\n\nRecover:\n{{ contact.feedback_do_you_attend_recover_classes }}\n\nSweat:\n{{ contact.feedback_do_you_attend_sweat_classes }}\n\nTough Guy:\n{{ contact.feedback_do_you_attend_tough_guy_classes }}\n\nXLR8:\n{{ contact.feedback_do_you_attend_xlr8_classes }}\n\nIf No, Reasons?:\n{{ contact.feedback_if_no_reasons }}\n\nRE Options:\n{{ contact.feedback_team_options }}\n\nWhich 4:\n{{ contact.feedback_which_classes_tick_up_to_4_are_you_most_likely_to_attend }}\n\nAny Other Feedback:\n{{ contact.feedback_any_other_comments_or_feedback }}",
    "links": []
   }
  ]
 },
 {
  "studio": "Leytonstone",
  "workflow": "Coming Soon 2024",
  "folder": "",
  "status": "draft",
  "triggers": [
   "Form Submitted"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "Priority List: {{contact.name}}",
    "from": "{{location.email}}",
    "template": null,
    "missing": false,
    "text": "Added to Priority List: {{contact.name}}\n{{contact.phone}}\n{{contact.email}}",
    "links": []
   },
   {
    "type": "email",
    "name": "Email",
    "subject": "{{location.name}} Coming Soon to Leytonstone!",
    "from": "{{user.name}} · {{location.email}}",
    "template": "Coming Soon 1",
    "missing": false,
    "text": "Hi {{contact.first_name}}\n\nIt's {{user.first_name}} from {{location.name}}\n\nJust a quick email to let you know we have received your enquiry for our new location in Leytonstone, so you'll be first to know the moment we release more details!\nWe hope you're excited as we are!\n\nSpeak soon\n\nStu\n\nInstagram Page\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list.",
    "links": []
   },
   {
    "type": "sms",
    "name": "SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Hi {{contact.first_name}} it's {{user.first_name}} from {{location.name}},\nJust a quick message to let you know we have added you to our Priority List for a Founders' Offer at our Brand New Leystone Gym! We hope you're excited as we are!\nSpeak soon\nStu",
    "links": []
   }
  ]
 },
 {
  "studio": "Leytonstone",
  "workflow": "FB Comments All Posts",
  "folder": "",
  "status": "published",
  "triggers": [
   "Comment on Page"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "",
    "links": []
   }
  ]
 },
 {
  "studio": "Leytonstone",
  "workflow": "Feedback",
  "folder": "",
  "status": "published",
  "triggers": [
   "Form Submitted"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "Feedback: {{contact.name}}",
    "from": "no-reply@blueprintfitnessldn.com",
    "template": null,
    "missing": false,
    "text": "Name: {{contact.name}}\nEmail: {{contact.email}}\nRating: {{contact.how_would_you_rate_your_experience}}\nExperience: {{contact.feedback_describe_your_experience}}\nImprovements?:\nDo Well: {{contact.feedback_what_are_we_doing_well}}\nImprove On: {{contact.feedback_what_could_we_improve_on}}",
    "links": []
   },
   {
    "type": "email",
    "name": "Email",
    "subject": "Thankyou {{contact.name}}!",
    "from": "Paul Stafford · info@blueprintfitnessldn.com",
    "template": null,
    "missing": false,
    "text": "Hey {{contact.first_name}},\nThankyou for your feedback!\nWe really appreciate it 🙌😊\nPaul",
    "links": []
   }
  ]
 },
 {
  "studio": "Leytonstone",
  "workflow": "New Workflow : Cancel Request",
  "folder": "",
  "status": "published",
  "triggers": [
   "Form Submitted"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Cancel Request",
    "subject": "Cancel Request {{contact.name}}",
    "from": "noreply@blueprintfitnessldn.com",
    "template": null,
    "missing": false,
    "text": "Name: {{contact.name}}\n\nEmail: {{contact.email}}\n\nReason: {{contact.additional_comments}}",
    "links": []
   }
  ]
 },
 {
  "studio": "Leytonstone",
  "workflow": "Nutrition Consult",
  "folder": "",
  "status": "published",
  "triggers": [
   "Form Submitted"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "Nutrition Consult Request: {{contact.name}}",
    "from": "no-reply@blueprintfitnessldn.com",
    "template": null,
    "missing": false,
    "text": "Nutrition Consult Request: {{contact.name}}\n{{contact.email}}\n{{contact.phone}}\n\nInBody Results: {{contact.do_you_have_your_inbody_results}}\n\nFood Diary?:\n{{contact.have_you_started_a_food_diary}}\n\nGoal:\n{{contact.what_is_your_overall_goal}}\n\nStruggles:{{contact.what_is_your_biggest_struggle_with_regards_to_nutrition}}\n\nPreference:\n{{contact.who_would_you_like_a_consultation_with}}",
    "links": []
   },
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "Nutrition Consult Request: {{contact.name}}",
    "from": "no-reply@blueprintfitnessldn.com",
    "template": null,
    "missing": false,
    "text": "Nutrition Consult Request: {{contact.name}}\n{{contact.email}}\n{{contact.phone}}\n\nInBody Results: {{contact.do_you_have_your_inbody_results}}\n\nFood Diary?:\n{{contact.have_you_started_a_food_diary}}\n\nGoal:\n{{contact.what_is_your_overall_goal}}\n\nStruggles:{{contact.what_is_your_biggest_struggle_with_regards_to_nutrition}}\n\nPreference:\n{{contact.who_would_you_like_a_consultation_with}}",
    "links": []
   },
   {
    "type": "email",
    "name": "Email",
    "subject": "Your nutrition consultation — what to bring",
    "from": "Blueprint Fitness Nutrition Team · info@blueprintfitnessldn.com",
    "template": "Nutrition — Consultation requested",
    "missing": false,
    "text": "We have got your request. Here is how to make it count.\n\nNutrition · Leytonstone\n\nWe have got your request\n\nHello {{contact.first_name}} — thanks for asking for nutrition help. A coach will be in touch to book you in.\n\nTwo things that make it far more useful\n\n•\n\nYour InBody results. The scan from your intro gives us your real starting point, including your BMR.\n\n•\n\nA few honest days of food. Not perfect — honest. It tells us more than any questionnaire.\n\nNot got either yet? Say so and we will sort it together. Nobody here is judging.\n\nWhile you wait, the Nutrition Video Series covers the principles we will be applying. Lessons 5 to 8 on calories are the ones most people wish they had watched sooner.\n\nWatch the video series\n\nUpdate your request\n\nSpeak soon,\n\nThe team\n\nBlueprint Fitness Leytonstone\n\nYour studio\n\nBlueprint Fitness Leytonstone\n\nUnit 3, Hitchcock Business Centre, Leytonstone, E11 4RE\n\nOpen early ’til late, 7 days a week\n\nleytonstone@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/members/nutrition-course/",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com/members/nutrition-request/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447947790035",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   }
  ]
 },
 {
  "studio": "Leytonstone",
  "workflow": "Recipe - FAQ Auto Reply",
  "folder": "",
  "status": "draft",
  "triggers": [
   "New Instagram DM",
   "New Chat Widget Message",
   "New FB Message",
   "New Google Message"
  ],
  "steps": [
   {
    "type": "sms",
    "name": "SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "🤖 {{location.name}} bot here: We're located at {{location.full_address}} right next to the library.",
    "links": []
   }
  ]
 },
 {
  "studio": "Leytonstone",
  "workflow": "SMS: OFFER",
  "folder": "",
  "status": "published",
  "triggers": [
   "Customer Replied"
  ],
  "steps": [
   {
    "type": "sms",
    "name": "SMS Text",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Hey, it's the Blueprint Bot here,\nI'll get your entry in right now!\nIf you could just provide a few details...\nQ 1/2: What's your Full Name?",
    "links": []
   },
   {
    "type": "sms",
    "name": "SMS Email",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Thanks!\nQ 2/2: And your Email Address please {{contact.first_name}}?",
    "links": []
   },
   {
    "type": "sms",
    "name": "SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Awesome! Heres a link!",
    "links": []
   }
  ]
 },
 {
  "studio": "Leytonstone",
  "workflow": "Speak With Us Call Booked",
  "folder": "",
  "status": "published",
  "triggers": [
   "Appointment Status"
  ],
  "steps": [
   {
    "type": "sms",
    "name": "SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Hi {{contact.first_name}}, just a reminder I'll be giving you a call in 1 hour's time.\n{{appointment.user.first_name}}",
    "links": []
   },
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "",
    "links": []
   }
  ]
 },
 {
  "studio": "Leytonstone",
  "workflow": "Website Enquiry — Leytonstone",
  "folder": "",
  "status": "published",
  "triggers": [
   "External Tracking Event (main site)",
   "External Tracking Event"
  ],
  "steps": [
   {
    "type": "email",
    "name": "Confirmation email",
    "subject": "Hello {{contact.first_name}} — quick question about your 30 Day Kickstart",
    "from": "Blueprint Fitness Leytonstone · leytonstone@blueprintfitnessldn.com",
    "template": null,
    "missing": false,
    "text": "Thanks for registering your interest — one quick question before we book you in.\n\nThe 30-Day Kickstart · Leytonstone\n\nHello {{contact.first_name}}, you’re on the list.\n\nThanks for registering your interest in our 30 Day Kickstart at Blueprint Fitness Leytonstone. A coach will give you a ring shortly for a friendly chat — no hard sell, ever.\n\nJust to check — are you local to Leytonstone?\n\nReply to this email or message us on WhatsApp and we’ll get your first session booked in.\n\n12\n\nCoached sessions\n\n5:1\n\nMax ratio\n\n100+\n\nSessions a week\n\nStart your 30 days →\n\nMessage Leytonstone on WhatsApp\n\nSpeak soon,\n\nStu\n\nBlueprint Fitness Leytonstone\n\nYour studio\n\nBlueprint Fitness Leytonstone\n\nUnit 3, Hitchcock Business Centre, Leytonstone High Road, London, E11 4RE\n\nOpen early ’til late, 7 days a week\n\nleytonstone@blueprintfitnessldn.com\n\nYou’re getting this because you registered your interest at\nblueprintfitnessldn.com.",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/signup-leytonstone/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447947790035?text=Hi%20Blueprint%20Fitness%20Leytonstone%20%E2%80%94%20I",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "sms",
    "name": "Confirmation SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Hello {{contact.first_name}}, thanks for registering your interest in our 30 Day Kickstart!\n\nJust to check, are you local to Leytonstone?\n\nStu",
    "links": []
   },
   {
    "type": "internal_notification",
    "name": "Notify the studio",
    "subject": "New website enquiry (Leytonstone): {{contact.name}}",
    "from": "leytonstone@blueprintfitnessldn.com",
    "template": null,
    "missing": false,
    "text": "New website enquiry — Leytonstone\n\nName: {{contact.name}}\n\nPhone: {{contact.phone}}\n\nEmail: {{contact.email}}\n\nCame in from the Blueprint Fitness website.",
    "links": []
   }
  ]
 },
 {
  "studio": "South Woodford",
  "workflow": "1. Cancellation Request Form",
  "folder": "4. Cancellations",
  "status": "published",
  "triggers": [
   "Form Submitted"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "CANCELLATION REQUEST: {{contact.name}}",
    "from": "no-reply@blueprintfitnessldn.com",
    "template": null,
    "missing": false,
    "text": "Cancellation REQUEST Submitted\n\n{{contact.first_name}} {{contact.last_name}}\n\nPlease cancel payments accordingly on TeamUp using the CANCEL MEMBERSHIP button.\nSelect the correct end date.",
    "links": []
   },
   {
    "type": "email",
    "name": "Email",
    "subject": "Cancellation Request Receieved",
    "from": "{{custom_values.sales_and_journey}} · {{location.email}}",
    "template": null,
    "missing": false,
    "text": "Dear {{contact.first_name}},\n\nThis is just a quick email to confirm we have receieved your cancellation request.\n\nWe will be in touch to confirm your final payment (date & amount) and membership end date.\n\nWe'll be sad to see you go!\n\n{{custom_values.sales_and_journey}}",
    "links": []
   }
  ]
 },
 {
  "studio": "South Woodford",
  "workflow": "1. NEW MEMBER (TEAMUP)",
  "folder": "3. Memberships",
  "status": "published",
  "triggers": [
   "Contact Tag"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "NEW MEMBERSHIP {{contact.name}}",
    "from": "do-not-reply@blueprintfitnessldn.com",
    "template": null,
    "missing": false,
    "text": "{{contact.first_name}} {{contact.last_name}} just signed up for a FULL membership ( {{contact.latest_membership}} )",
    "links": []
   },
   {
    "type": "sms",
    "name": "SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Hi {{contact.first_name}},\nYour membership should all be set up and ready to book now on TeamUp or our App.\nKeep up the great work!\nStu & Paul",
    "links": []
   },
   {
    "type": "sms",
    "name": "SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Hey {{contact.first_name}}!\nCongratulations on your first month as a full member at Blueprint!\nHow are you getting on?\nOut of curiosity, who do you know that might benefit from our 30 Day Trial? As a Friend of yours, we have Completely Free Golden Ticket for them!\nStu & Paul",
    "links": []
   },
   {
    "type": "sms",
    "name": "SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Congratulations {{contact.first_name}}!\nToday is 1 year since you joined as a Full Member at {{location.name}}!\nWell done, and thankyou for being a part of the team!",
    "links": []
   }
  ]
 },
 {
  "studio": "South Woodford",
  "workflow": "1. New Lead - 30 Day Kickstart",
  "folder": "1. Leads",
  "status": "published",
  "triggers": [
   "Any FB Form",
   "Form Submitted 30 Day",
   "Contact Tag"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "30 DAY LEAD (web form): {{contact.name}}",
    "from": "",
    "template": null,
    "missing": false,
    "text": "New Lead for 30 Day Trial\nFirst Name: {{contact.first_name}}\nLast Name: {{contact.last_name}}\nEmail: {{contact.email}}\nPhone: {{contact.phone}}\nMain Goal: {{contact.main_goal}}",
    "links": []
   },
   {
    "type": "email",
    "name": "Intro Program - Application Email",
    "subject": "Thanks {{contact.first_name}} — here is what happens next",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Lead 01 — We have got your details",
    "missing": false,
    "text": "A coach will call you shortly. No hard sell, ever.\n\nThe 30-Day Kickstart · South Woodford\n\nHello {{contact.first_name}}, we have got you.\n\nThanks for registering your interest in the 30-Day Kickstart at Blueprint Fitness South Woodford. Your details are with us.\n\nA coach will give you a ring shortly for a friendly chat — what you are after, what has worked before, what has not. No hard sell, ever. If it is not right for you, we will say so.\n\n12\n\nCoached sessions\n\n5:1\n\nMax ratio\n\n30\n\nDays\n\nIn the meantime — have a look at what a week actually looks like here. Knowing the sessions exist at times you can make is usually the thing people want to check first.\n\nSee the South Woodford timetable\n\nMessage us on WhatsApp\n\nSpeak soon,\n\nStu\n\nBlueprint Fitness South Woodford\n\nYour studio\n\nBlueprint Fitness South Woodford\n\n4 Raven Road, South Woodford, London, E18 1HB\n\nOpen 6am–9pm, every day\n\nsouthwoodford@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/south-woodford/timetable/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447538298457?text=Hi%20Blueprint%20Fitness%20South%20Woodford%20%E2%80%94%20I",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447538298457",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "sms",
    "name": "SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Hi {{contact.first_name}} thanks so much for checking out our 30 Day Kickstart! Just to confirm, are you local to South Woodford?\n\nPS. I've attached a video with one of the owners (Stu) for you",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 2",
    "subject": "The gym is not a motivating place. That is rather the point.",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Lead 02 — Motivation",
    "missing": false,
    "text": "Why we built the opposite of a gym floor.\n\nThe 30-Day Kickstart · South Woodford\n\nOn not feeling motivated\n\n“I have no motivation to go to the gym.” We hear it constantly — usually from people who have just got in touch with us.\n\nHere is the thing: a gym floor is not a motivating place. Everyone looks like they know what they are doing. Nobody tells you where to start. You do three exercises you half-remember and leave.\n\nMotivation is not what gets people through the door on a wet Tuesday in February. A time in the diary, a coach expecting you, and four other people who noticed you were not there last week — that is what does it.\n\nThat is the whole design. You book a session, someone has already written it, and a coach runs you through it. You do not have to decide anything.\n\nWhat that looks like\n\n•\n\n12 coached sessions across your first 30 days\n\n•\n\nNever more than five people to a coach, so you always get eyes on you\n\n•\n\nA plan written for you — not a class everyone does at once\n\n•\n\nAn InBody scan at the start, so progress is measured rather than guessed\n\nStart your 30 days at South Woodford\n\nSpeak soon,\n\nStu\n\nBlueprint Fitness South Woodford\n\nYour studio\n\nBlueprint Fitness South Woodford\n\n4 Raven Road, South Woodford, London, E18 1HB\n\nOpen 6am–9pm, every day\n\nsouthwoodford@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/signup-southwoodford/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447538298457",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "Email 3",
    "subject": "What actually happens in a session",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Lead 03 — What a session is like",
    "missing": false,
    "text": "No mirrors, no machines you cannot work out, no guessing.\n\nThe 30-Day Kickstart · South Woodford\n\nWhat a session actually looks like\n\nMost gyms are built for people who already know what they are doing. Mirrors everywhere, rows of machines with no explanation, and nobody to ask.\n\nOurs is not. Here is what a session at South Woodford is:\n\n•\n\nYou arrive. Your session is already written down.\n\n•\n\nA coach shows you each movement and watches you do it.\n\n•\n\nYou work at a weight that is right for you — not the person next to you.\n\n•\n\nYou leave knowing what you did and why.\n\nMost of our members are in their thirties to sixties, and a good share of them had not trained in years before they started. Nobody is performing for anybody.\n\nWe meet you where your strength and fitness actually are, and build from there. There are no degrading challenges and nobody is getting put on a treadmill for an hour.\n\nLook at the timetable\n\nOr start your 30 days\n\nSpeak soon,\n\nStu\n\nBlueprint Fitness South Woodford\n\nYour studio\n\nBlueprint Fitness South Woodford\n\n4 Raven Road, South Woodford, London, E18 1HB\n\nOpen 6am–9pm, every day\n\nsouthwoodford@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/south-woodford/timetable/",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com/signup-southwoodford/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447538298457",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "Email 4",
    "subject": "Most people who join us are complete beginners",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Lead 04 — For beginners",
    "missing": false,
    "text": "Including the ones who now look like they never were.\n\nThe 30-Day Kickstart · South Woodford\n\nAlmost everyone starts here as a beginner\n\nIt is the most common worry we hear: everyone there will be fitter than me.\n\nMost people who join Blueprint Fitness are complete beginners. The members who look like naturals are simply the ones who kept turning up three times a week for a year. That is the entire secret.\n\nWhat keeps people coming back\n\n•\n\nThe session is planned, so there is no standing about wondering what to do.\n\n•\n\nA coach is with you the whole way — you are never left to work it out.\n\n•\n\nThe group is small enough that people notice you, and say hello.\n\n•\n\nIt gets measurably easier, and you can see it in the numbers.\n\nIf you have a question before you commit — an injury, a schedule, anything at all — just reply to this email. A real person reads it.\n\nStart your 30 days at South Woodford\n\nSpeak soon,\n\nStu\n\nBlueprint Fitness South Woodford\n\nYour studio\n\nBlueprint Fitness South Woodford\n\n4 Raven Road, South Woodford, London, E18 1HB\n\nOpen 6am–9pm, every day\n\nsouthwoodford@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/signup-southwoodford/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447538298457",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "Email 5",
    "subject": "Two members who started exactly where you are",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Lead 05 — Member stories",
    "missing": false,
    "text": "Michelle and Georgia both began on a 30-day trial.\n\nThe 30-Day Kickstart · South Woodford\n\nThey started on the same 30 days\n\nHello {{contact.first_name}} — the most useful thing we can show you is not us talking about ourselves. It is members talking about the bit before they started.\n\nMichelle and Georgia both began on a 30-day trial, both having not trained properly in years, and both stayed. Their stories are on the site, in their own words.\n\nWatch the member stories\n\nEvery one of them is unremarkable in the best way: someone busy, a bit apprehensive, who booked a session and then booked another one.\n\nStart your own 30 days\n\nSpeak soon,\n\nStu\n\nBlueprint Fitness South Woodford\n\nYour studio\n\nBlueprint Fitness South Woodford\n\n4 Raven Road, South Woodford, London, E18 1HB\n\nOpen 6am–9pm, every day\n\nsouthwoodford@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/#member-stories",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com/signup-southwoodford/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447538298457",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "Email 6",
    "subject": "The four things that stop people starting",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Lead 06 — Common hurdles",
    "missing": false,
    "text": "Time, consistency, feeling watched, and food.\n\nThe 30-Day Kickstart · South Woodford\n\nThe four things that stop people\n\nAfter a decade of first sessions, the same four things come up. None of them is a good reason not to start.\n\n“I have not got time”\n\nA session is an hour, three times a week, at a time you choose. Open 6am–9pm, every day. If the timetable does not work around your life, tell us and we will be honest about whether we can fit you in.\n\n“I cannot stay consistent”\n\nWhich is why the sessions are booked, coached and expected. Consistency is much easier when somebody notices you are missing.\n\n“I will feel watched”\n\nFive people, one coach, everyone concentrating on their own work. Nobody is looking at you — they are busy.\n\n“I do not know what to eat”\n\nWe cover that too, with practical guidance rather than a meal plan to buy. Start with training; food follows more easily once you are moving.\n\nStart your 30 days\n\nSpeak soon,\n\nStu\n\nBlueprint Fitness South Woodford\n\nYour studio\n\nBlueprint Fitness South Woodford\n\n4 Raven Road, South Woodford, London, E18 1HB\n\nOpen 6am–9pm, every day\n\nsouthwoodford@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/signup-southwoodford/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447538298457",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "Email 7",
    "subject": "What is actually different about training here",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Lead 07 — What makes it different",
    "missing": false,
    "text": "Small groups, a real plan, and coaches who know your name.\n\nThe 30-Day Kickstart · South Woodford\n\nWhat is actually different here\n\nChoosing where to train is a bigger decision than it looks, so here is the honest version of what you get with us — and what you do not.\n\nYou get\n\n•\n\nA coach in the room with you for every session, not on a rota somewhere.\n\n•\n\nA maximum of five people to that coach.\n\n•\n\nA programme that progresses, written around what you can do now.\n\n•\n\nPeople who know your name by week two.\n\nYou do not get\n\n•\n\nA swipe card and good luck.\n\n•\n\nA room of machines and no idea which ones matter.\n\n•\n\nA contract you cannot get out of.\n\nIt is personal training, delivered in a small supportive group. That is the whole idea — the coaching of one-to-one, at a price that is not one-to-one.\n\nSee what membership costs\n\nOr start with 30 days\n\nSpeak soon,\n\nStu\n\nBlueprint Fitness South Woodford\n\nYour studio\n\nBlueprint Fitness South Woodford\n\n4 Raven Road, South Woodford, London, E18 1HB\n\nOpen 6am–9pm, every day\n\nsouthwoodford@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/memberships/",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com/signup-southwoodford/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447538298457",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "Email 8",
    "subject": "The questions we get asked most",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Lead 08 — Questions answered",
    "missing": false,
    "text": "Commitment, fitness level, injuries and times.\n\nThe 30-Day Kickstart · South Woodford\n\nYour questions, answered\n\nHello {{contact.first_name}}. The same handful of questions come up before people start, so here they are with straight answers.\n\nIs the 30 days a contract?\n\nNo. It is thirty days. Most people stay, some do not, and that is genuinely fine.\n\nAm I fit enough?\n\nYes. Everything is scaled to you — that is what having a coach in the room is for.\n\nWhat if I have an injury?\n\nTell us on your first call. Our coaches work around injuries and conditions every day; we would rather know up front than find out later.\n\nWhen are the sessions?\n\nOpen 6am–9pm, every day. The full grid is on the site, so you can check before you commit.\n\nCheck the timetable\n\nWhat does it cost?\n\nThe 30-Day Kickstart is £169 — twelve coached sessions, your InBody scan and your plan. No joining fee.\n\nStart your 30 days\n\nSpeak soon,\n\nStu\n\nBlueprint Fitness South Woodford\n\nYour studio\n\nBlueprint Fitness South Woodford\n\n4 Raven Road, South Woodford, London, E18 1HB\n\nOpen 6am–9pm, every day\n\nsouthwoodford@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/south-woodford/timetable/",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com/signup-southwoodford/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447538298457",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "Email 9",
    "subject": "The 30-Day Kickstart, and what £169 covers",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Lead 09 — What it costs",
    "missing": false,
    "text": "Twelve coached sessions, an InBody scan, and your plan.\n\nThe 30-Day Kickstart · South Woodford\n\nWhat £169 actually covers\n\nNo games and no countdown timers — just what the Kickstart is and what it costs, so you can decide.\n\n12\n\nCoached sessions\n\n5:1\n\nMax ratio\n\n30\n\nDays\n\n£169 for your first 30 days\n\n•\n\n12 coached sessions — three a week, at times you pick\n\n•\n\nAn InBody scan and goal-setting session to start from a real number\n\n•\n\nA plan written around you, progressed as you go\n\n•\n\nPractical nutrition guidance — no meal plans to buy\n\n•\n\nNo joining fee and no contract\n\nBooked as one-to-one personal training, a month like that costs several hundred pounds. It is £169 because you share your coach with four other people.\n\nStart your 30 days at South Woodford\n\nSee what happens after the 30 days\n\nSpeak soon,\n\nStu\n\nBlueprint Fitness South Woodford\n\nYour studio\n\nBlueprint Fitness South Woodford\n\n4 Raven Road, South Woodford, London, E18 1HB\n\nOpen 6am–9pm, every day\n\nsouthwoodford@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/signup-southwoodford/",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com/memberships/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447538298457",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "Email 10",
    "subject": "{{contact.first_name}}, shall we leave it there?",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Lead 10 — Last call",
    "missing": false,
    "text": "Last email from us — unless you would like to start.\n\nThe 30-Day Kickstart · South Woodford\n\nShall we leave it there?\n\nThis is the last email in this sequence, {{contact.first_name}} — we are not going to keep nudging you.\n\nIf the timing is wrong, that is completely fine. Keep us in mind; the door stays open and the offer does not change.\n\nIf you have been meaning to start and simply have not got round to it, this is the reminder. Thirty days, twelve coached sessions, and an honest answer at the end of it about whether this suits you.\n\nStart your 30 days\n\nRather talk to a human first? Message us and a coach at South Woodford will reply — no script, no pressure.\n\nAsk us a question\n\nSpeak soon,\n\nStu\n\nBlueprint Fitness South Woodford\n\nYour studio\n\nBlueprint Fitness South Woodford\n\n4 Raven Road, South Woodford, London, E18 1HB\n\nOpen 6am–9pm, every day\n\nsouthwoodford@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/signup-southwoodford/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447538298457?text=Hi%20Blueprint%20Fitness%20South%20Woodford%20%E2%80%94%20I",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447538298457",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "sms",
    "name": "SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Just checking we got the right number for you {{contact.first_name}}? 🤞🤞",
    "links": []
   },
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "30 DAY LEAD (FB Form): {{contact.name}}",
    "from": "",
    "template": null,
    "missing": false,
    "text": "New Lead for 30 Day Trial\nFirst Name: {{contact.first_name}}\nLast Name: {{contact.last_name}}\nEmail: {{contact.email}}\nPhone: {{contact.phone}}\nMain Goal: {{contact.main_goal}}",
    "links": []
   },
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "30 DAY LEAD (Manual Tag): {{contact.name}}",
    "from": "",
    "template": null,
    "missing": false,
    "text": "New Lead for 30 Day Trial\nFirst Name: {{contact.first_name}}\nLast Name: {{contact.last_name}}\nEmail: {{contact.email}}\nPhone: {{contact.phone}}\nMain Goal: {{contact.main_goal}}",
    "links": []
   }
  ]
 },
 {
  "studio": "South Woodford",
  "workflow": "1. Signed Up - 30 Day Trial",
  "folder": "2. Challenge",
  "status": "published",
  "triggers": [
   "Zapped 30 Day",
   "Tagged: free challenge",
   "IS NOT SUMMER OFFER"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "NEW CHALLENGE SIGNUP {{contact.name}}",
    "from": "info@dashaio.com",
    "template": null,
    "missing": false,
    "text": "NEW SIGNUP!\n{{contact.name}} just signed up for the {{custom_values.challengetrial_name}}",
    "links": []
   },
   {
    "type": "email",
    "name": "Intro - Welcome Email",
    "subject": "Your Super Quick Guide To Getting Started⚡",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "1. YOUR SUPER QUICK GUIDE TO GETTING STARTED",
    "missing": false,
    "text": "Dear {{contact.first_name}},\nWe're thrilled to have you on board with Blueprint:Fitness!\nOver the next 30 days, you'll have the chance to experience all we have to offer and see just how far you can go. With our help, you'll make positive changes in your health and wellness and connect with amazing people along the way.\nThe first step is to schedule your intro call. If you haven't already, please reach out to our head coach by calling or texting 07538 298 457 to book a time.\nDuring the initial call, we'll take care of some important details:\n1. Admin: We'll verify your account set up in TeamUp and provide you with an overview of our classes so you know what to expect when you book.\n2. Inbody Body Composition Testing: We'll use the Inbody tracker to gather some baseline data about your muscle mass, body fat mass and percentage, BMR, BMI, and visceral fat. This information will be used to set goals and hold each other accountable, and we'll need you to download the Inbody App.\nAnd depending on your current situation, we might need to do...\n3. Functional Movement Screen: This is an opportunity for us to discuss any medical issues, injuries, or pain points, and to assess your posture. We may need to have a quick look at your movement patterns to determine the best start point for you.\nThank you for joining us. We can't wait to see you on the gym floor soon!\nBest regards,\nThe Blueprint:Fitness Team\ninfo@blueprintfitnessldn.com\nblueprintfitnessldn.com\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list or Manage your preference.",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   }
  ]
 },
 {
  "studio": "South Woodford",
  "workflow": "2. Cancelled (TeamUp)",
  "folder": "4. Cancellations",
  "status": "published",
  "triggers": [
   "Contact Tag"
  ],
  "steps": [
   {
    "type": "email",
    "name": "Email 1",
    "subject": "How have you been, {{contact.first_name}}?",
    "from": "{{custom_values.sales_and_journey}} · {{location.email}}",
    "template": "Win-back 01 — Checking in",
    "missing": false,
    "text": "No pitch — just seeing how you got on.\n\nFrom the team · South Woodford\n\nHow have you been?\n\nHello {{contact.first_name}}. It has been a little while since you trained with us, and I wanted to see how you have got on.\n\nNo pitch attached to this one. If you found something that works better, genuinely good — that is the point of the whole exercise.\n\nAnd if it all rather tailed off, that happens to almost everybody. It is not a character flaw.\n\nReply on WhatsApp\n\nSpeak soon,\n\nStu\n\nBlueprint Fitness South Woodford\n\nYour studio\n\nBlueprint Fitness South Woodford\n\n4 Raven Road, South Woodford, London, E18 1HB\n\nOpen 6am–9pm, every day\n\nsouthwoodford@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://wa.me/447538298457?text=Hi%20Blueprint%20Fitness%20South%20Woodford%20%E2%80%94%20just%20replying%20to%20your%20email.",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447538298457",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "Email",
    "subject": "Still fancy getting back to it?",
    "from": "{{custom_values.sales_and_journey}} · {{location.email}}",
    "template": "Win-back 02 — Still thinking about it",
    "missing": false,
    "text": "The door is open, and starting again is easier than starting.\n\nFrom the team · South Woodford\n\nStill fancy getting back to it?\n\nHello {{contact.first_name}} — a quick one. If getting back into training has been on your list, you would not be starting from scratch. You already know how the sessions work and the coaches already know you.\n\nQuite a lot has changed since you were last in, too. Here is the current timetable at South Woodford.\n\nSee what is on now\n\nIf you would rather just ask what has changed, message us — happy to give you the honest version.\n\nAsk us what has changed\n\nSpeak soon,\n\nStu\n\nBlueprint Fitness South Woodford\n\nYour studio\n\nBlueprint Fitness South Woodford\n\n4 Raven Road, South Woodford, London, E18 1HB\n\nOpen 6am–9pm, every day\n\nsouthwoodford@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/south-woodford/timetable/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447538298457?text=Hi%20Blueprint%20Fitness%20South%20Woodford%20%E2%80%94%20I",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447538298457",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "Email",
    "subject": "Whenever you are ready",
    "from": "{{custom_values.sales_and_journey}} · {{location.email}}",
    "template": "Win-back 03 — Whenever you are ready",
    "missing": false,
    "text": "Last one from us — no hard feelings either way.\n\nFrom the team · South Woodford\n\nWhenever you are ready\n\nThis is the last one from us, {{contact.first_name}}, so we do not become the gym that will not stop emailing.\n\nIf and when you want to come back, everything is where you left it. Message the studio and we will pick it up from there — no re-joining fee, no awkwardness about the gap.\n\nAll the best either way.\n\nSee what a month looks like now\n\nSpeak soon,\n\nStu\n\nBlueprint Fitness South Woodford\n\nYour studio\n\nBlueprint Fitness South Woodford\n\n4 Raven Road, South Woodford, London, E18 1HB\n\nOpen 6am–9pm, every day\n\nsouthwoodford@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/south-woodford/kickstart/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447538298457",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   }
  ]
 },
 {
  "studio": "South Woodford",
  "workflow": "2. Hot Lead",
  "folder": "1. Leads",
  "status": "published",
  "triggers": [
   "Customer Replied",
   "Customer Replied"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "HOT LEAD",
    "from": "",
    "template": null,
    "missing": false,
    "text": "HOT LEAD - CALL NOW\nName: {{contact.first_name}} {{contact.last_name}}\nPhone: {{contact.phone}}\n{{contact.lastAttributionSource.campaign}}",
    "links": []
   },
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "",
    "links": []
   }
  ]
 },
 {
  "studio": "South Woodford",
  "workflow": "2. Intro Complete Main Flow",
  "folder": "2. Challenge",
  "status": "published",
  "triggers": [
   "Pipeline Stage Changed"
  ],
  "steps": [
   {
    "type": "sms",
    "name": "Intro Complete SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Hi {{contact.first_name}}! Well done on getting started. How are you feeling so far? If you have any questions or need help, let me know here. We are excited to have you onboard! {{user.first_name}}",
    "links": []
   },
   {
    "type": "sms",
    "name": "2 Weeks SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Hi {{contact.first_name}},\nI just wanted to say well done again! What's been the best thing about starting your journey with us so far?",
    "links": []
   },
   {
    "type": "email",
    "name": "Email",
    "subject": "I hope you're well {{contact.first_name}} 😊",
    "from": "{{custom_values.sales_and_journey}} · {{location.email}}",
    "template": null,
    "missing": false,
    "text": "Hi {{contact.first_name}}\n\nIt's been a while but just checking in again to see how you're doing,\n\nIf you ever fancy dropping in over the next couple of months just reply to this email to let me know you're alive and well and I'll add 5 free classes to your account you can use.\n\nThe door is alway open if you want to reboot things!\n\nStu",
    "links": []
   },
   {
    "type": "email",
    "name": "Email",
    "subject": "I hope you're well {{contact.first_name}} 😊",
    "from": "{{custom_values.sales_and_journey}} · {{location.email}}",
    "template": null,
    "missing": false,
    "text": "Hi {{contact.first_name}}\n\nIt's been about 3 months since you finished with us, so I just wanted to make sure you're still taking good care of your health.\n\nThe offer of some free classes is still there if you want to get moving again and feel ready?\n\nWhat do you think?\n\nStu",
    "links": []
   },
   {
    "type": "sms",
    "name": "Intro Complete SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Hi {{contact.first_name}}\nWell done on getting started.\nHow are you feeling after your first session?\nIf you have any questions or need any help, give me a shout. It’s great to have you on board!\nLewis",
    "links": []
   },
   {
    "type": "sms",
    "name": "1 Week SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Hey {{contact.first_name}},\nQuick one to say well done on completing your first week. I hope you’ve enjoyed it and managed to try out a few different classes.\nWhat has been the best thing about starting your journey with us so far? Stu",
    "links": []
   },
   {
    "type": "email",
    "name": "Email",
    "subject": "What happens next after your trial?⚡",
    "from": "Stuart Rook · info@blueprintfitnessldn.com",
    "template": "1. 14 Day (Day 10): WHAT HAPPENS NEXT?",
    "missing": false,
    "text": "We have some options for you {{contact.first_name}}\n\nHey there, {{contact.first_name}}!\n\nWe hope you've been enjoying your 14-day trial at Blueprint:Fitness and that two weeks spent with us has given you a snapshot of how we do our thing, and how we can support you to achieve your goals.\n\nAs your trial period is coming towards the end, we wanted to reach out and give you some info about membership… AND offer you the opportunity to extend your trial period for the full 30 days (this is our usual trial offer).\n\nIf this option floats your boat, we’ll top you up for another two weeks at the incredibly high value cost of £59. That's the full trial for £118 instead of £129!\n\nAlternatively, if you’re ready to jump right in and become a full time member, please CLICK HERE to join via TeamUp..\n\nWe're all about tracking progress and celebrating achievements here at Blueprint:Fitness, so don't forget to book your InBody review with one of our coaches!\n\nWe know that a two week trial signifies only the very beginning of your fitness journey with us, but we'd also like to remind you about your results check-in. This check in is a great opportunity to reflect on how far you've come, set new goals, and get some expert advice on how to continue making progress.\n\nMost importantly, we hope that this two week snapshot has provided you with the motivation to keep working towards your goals, your body composition changes and the gradual increases in strength, fitness, confidence and mentality…!\n\nSo what are you waiting for? Take the next step and become a member of our awesome fitness community today!\n\nThank you for choosing Blueprint:Fitness for your fitness journey, and we hope to see you soon!\n\nThe Blueprint:Fitness Team\n\ninfo@blueprintfitnessldn.com\n\n07736 033 985 // 07855 353 798\n\nblueprintfitnessldn.com\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list.",
    "links": [
     {
      "url": "https://goteamup.com/w3662065/p/3662065-blueprint-fitness/memberships/",
      "health": "ok"
     }
    ]
   },
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "",
    "links": []
   },
   {
    "type": "sms",
    "name": "SMS Day 21",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Hey {{contact.first_name}},\n21 Days In - Well Done!\nHow are you feeling?\n{{user.first_name}}",
    "links": []
   },
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email",
    "subject": "I hope you're well {{contact.first_name}} 😊",
    "from": "{{custom_values.sales_and_journey}} · {{location.email}}",
    "template": null,
    "missing": false,
    "text": "Hi {{contact.first_name}}\n\nIt's been a while but just checking in again to see how you're doing,\n\nIf you ever fancy dropping in over the next couple of months just reply to this email to let me know you're alive and well and I'll add 5 free sessions to your account you can use.\n\nThe door is alway open if you want to reboot things!\n\n{{custom_values.sales_and_journey}}",
    "links": []
   },
   {
    "type": "email",
    "name": "Email",
    "subject": "I hope you're well {{contact.first_name}} 😊",
    "from": "{{custom_values.sales_and_journey}} · {{location.email}}",
    "template": null,
    "missing": false,
    "text": "Hi {{contact.first_name}}\n\nIt's been a while but just checking in again to see how you're doing,\n\nIf you ever fancy dropping in over the next couple of months just reply to this email to let me know you're alive and well and I'll add 5 free sessions to your account you can use.\n\nThe door is alway open if you want to reboot things!\n\n{{custom_values.sales_and_journey}}",
    "links": []
   },
   {
    "type": "sms",
    "name": "Intro Complete SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Hi {{contact.first_name}}! Well done on getting started. How are you feeling so far? If you have any questions or need help, let me know here. We are excited to have you onboard! {{user.first_name}}",
    "links": []
   },
   {
    "type": "sms",
    "name": "1 Week SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Hey {{contact.first_name}}! Just checking in after your first week, how's everything going?\nGot some sessions booked for the coming week(s)?\nConsistency is key :)\nStu",
    "links": []
   },
   {
    "type": "sms",
    "name": "2 Weeks SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Hi {{contact.first_name}},\nI just wanted to say Well Done again! What's been the best thing about starting your journey with us so far?",
    "links": []
   },
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "",
    "links": []
   },
   {
    "type": "sms",
    "name": "SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Hey {{contact.first_name}},\n21 Days In - Well Done!\nHow are you feeling?\n{{user.first_name}}",
    "links": []
   },
   {
    "type": "email",
    "name": "Email",
    "subject": "I hope you're well {{contact.first_name}} 😊",
    "from": "{{custom_values.sales_and_journey}} · {{location.email}}",
    "template": null,
    "missing": false,
    "text": "Hi {{contact.first_name}}\n\nIt's been a while but just checking in again to see how you're doing,\n\nIf you ever fancy dropping in over the next couple of months just reply to this email to let me know you're alive and well and I'll add 5 free sessions to your account you can use.\n\nThe door is alway open if you want to reboot things!\n\n{{custom_values.sales_and_journey}}",
    "links": []
   },
   {
    "type": "email",
    "name": "Email",
    "subject": "I hope you're well {{contact.first_name}} 😊",
    "from": "{{custom_values.sales_and_journey}} · {{location.email}}",
    "template": null,
    "missing": false,
    "text": "Hi {{contact.first_name}}\n\nIt's been a while but just checking in again to see how you're doing,\n\nIf you ever fancy dropping in over the next couple of months just reply to this email to let me know you're alive and well and I'll add 5 free sessions to your account you can use.\n\nThe door is alway open if you want to reboot things!\n\n{{custom_values.sales_and_journey}}",
    "links": []
   }
  ]
 },
 {
  "studio": "South Woodford",
  "workflow": "30 Day Email Sequence",
  "folder": "2. Challenge",
  "status": "published",
  "triggers": [
   "Pipeline Stage Changed"
  ],
  "steps": [
   {
    "type": "email",
    "name": "2 Email - Nutrition Journey",
    "subject": "The nutrition side, without the faff",
    "from": "{{location.name}} · info@blueprintfitnessldn.com",
    "template": "Joined 02 — Nutrition",
    "missing": false,
    "text": "A 22-part video series and a coach, both included.\n\nYour first 30 days · South Woodford\n\nTraining is half of it\n\nHello {{contact.first_name}}. You do not need to overhaul your diet to get results in your first month — but a few honest changes go a very long way.\n\nTwo things are included with your membership, and both are worth using.\n\nThe Nutrition Video Series\n\nTwenty-two short lessons, in the order that actually matters — calories, adherence, habits, and what to do when progress stalls. Watch one a day and you will understand more than most people who have been dieting for years.\n\nStart the video series\n\nA consultation with a coach\n\nWhen you want it applied to you specifically rather than in general, request a consultation. Bring your InBody results and a few honest days of food — that tells us far more than any questionnaire.\n\nRequest a consultation\n\nNo fad diets and nothing to buy. Just practical guidance built around how you actually live.\n\nSpeak soon,\n\nThe team\n\nBlueprint Fitness South Woodford\n\nYour studio\n\nBlueprint Fitness South Woodford\n\n4 Raven Road, South Woodford, London, E18 1HB\n\nOpen 6am–9pm, every day\n\nsouthwoodford@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/members/nutrition-course/",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com/members/nutrition-request/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447538298457",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "5 Email - Referral Hoodie",
    "subject": "Know someone who would get on well here?",
    "from": "{{location.name}} · info@blueprintfitnessldn.com",
    "template": "Joined 05 — Refer a friend",
    "missing": false,
    "text": "Send them a 30-Day Kickstart.\n\nYour first 30 days · South Woodford\n\nBring someone with you\n\nHello {{contact.first_name}} — training is easier when someone you know is doing it too. It is also how most of our members found us.\n\nIf there is someone who has been saying they should do something about it, send them this and let them have a look at what a month here involves.\n\nSend them the 30-Day Kickstart\n\nMention it to a coach when they start, so we know who to thank.\n\nSpeak soon,\n\nThe team\n\nBlueprint Fitness South Woodford\n\nYour studio\n\nBlueprint Fitness South Woodford\n\n4 Raven Road, South Woodford, London, E18 1HB\n\nOpen 6am–9pm, every day\n\nsouthwoodford@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/south-woodford/kickstart/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447538298457",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "4 Email - Socials",
    "subject": "The bit that keeps people here",
    "from": "{{location.name}} · info@blueprintfitnessldn.com",
    "template": "Joined 04 — The community",
    "missing": false,
    "text": "The socials are genuinely half the reason people stay.\n\nYour first 30 days · South Woodford\n\nThe bit nobody expects\n\nMost people join for the training. A surprising number stay for everyone else.\n\nThere are socials, events and a fair amount of nonsense in the group chat. You are welcome at all of it, and there is no obligation to any of it.\n\nIf you have been coming a couple of weeks and have not met many people yet, tell a coach. Introducing people is genuinely part of the job here.\n\nYour members area\n\nSpeak soon,\n\nThe team\n\nBlueprint Fitness South Woodford\n\nYour studio\n\nBlueprint Fitness South Woodford\n\n4 Raven Road, South Woodford, London, E18 1HB\n\nOpen 6am–9pm, every day\n\nsouthwoodford@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/members/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447538298457",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "3 Email - Best Results?",
    "subject": "Which sessions will get you the results you want?",
    "from": "{{location.name}} · info@blueprintfitnessldn.com",
    "template": "Joined 03 — Which sessions to pick",
    "missing": false,
    "text": "SGPT, and how the classes fit around it.\n\nYour first 30 days · South Woodford\n\nWhich sessions should you book?\n\nShort answer: your coached SGPT sessions are the backbone. Everything else is a bonus on top.\n\nSGPT — your three a week\n\nThis is the one that moves the needle. Strength work, progressed week to week, with a coach watching. If you only ever do these three, you will still get where you are going.\n\nThe classes\n\nConditioning sessions you can add on when you fancy them. They are not a replacement for your coached sessions — they are for the weeks when you want a fourth thing to do.\n\nSee what is on at South Woodford\n\nNot sure what to book? Ask your coach at your next session. They know what you are working on.\n\nSpeak soon,\n\nThe team\n\nBlueprint Fitness South Woodford\n\nYour studio\n\nBlueprint Fitness South Woodford\n\n4 Raven Road, South Woodford, London, E18 1HB\n\nOpen 6am–9pm, every day\n\nsouthwoodford@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/south-woodford/timetable/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447538298457",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "6. Price List",
    "subject": "What happens when your 30 days are up",
    "from": "{{location.name}} · info@blueprintfitnessldn.com",
    "template": "Joined 07 — What happens after 30 days",
    "missing": false,
    "text": "Your options, and what each one costs.\n\nYour first 30 days · South Woodford\n\nWhat happens after your 30 days\n\nYou are most of the way through, so here is what comes next — no surprises at the till.\n\nMemberships are simply a question of how many coached sessions a month suit your life. Same coaching, same small groups, same plan.\n\n•\n\nSGPT 12 — £239 a month. Three a week, and what most members settle on.\n\n•\n\nSGPT 8 — £219 a month. Two a week with room for a third.\n\n•\n\nSGPT 4 — £189 a month. One a week, steady and sustainable.\n\nAll of them include unlimited classes, your monthly check-in, InBody tracking and the nutrition resources.\n\nCompare the memberships\n\nThere is a 10% discount for couples in the same household, NHS and services. Ask your coach, or just reply to this.\n\nSpeak soon,\n\nThe team\n\nBlueprint Fitness South Woodford\n\nYour studio\n\nBlueprint Fitness South Woodford\n\n4 Raven Road, South Woodford, London, E18 1HB\n\nOpen 6am–9pm, every day\n\nsouthwoodford@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/memberships/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447538298457",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "7. Email",
    "subject": "What it is actually like once the 30 days are over",
    "from": "{{location.name}} · info@blueprintfitnessldn.com",
    "template": "Joined 06 — Life as a full member",
    "missing": false,
    "text": "Same coaching, same small groups, just no end date.\n\nYour first 30 days · South Woodford\n\nLife after the Kickstart\n\nHello {{contact.first_name}} — people often ask what changes when the 30 days finish. Honestly: not much, and that is rather the point.\n\nSame coaches, same small groups, same plan carrying on from where you got to. What changes is that you stop thinking about it as a trial and start thinking about it as the thing you do on Mondays, Wednesdays and Fridays.\n\nWhat members get on top\n\n•\n\nUnlimited classes alongside your coached sessions\n\n•\n\nA monthly check-in with your coach, whenever you want one\n\n•\n\nInBody tracking, so progress stays measured\n\n•\n\nThe nutrition resources and our clinics and workshops\n\n•\n\nEvery social and event going\n\nMost people find the second month easier than the first. The hard part was becoming someone who turns up, and you have already done that.\n\nSee the memberships\n\nSpeak soon,\n\nThe team\n\nBlueprint Fitness South Woodford\n\nYour studio\n\nBlueprint Fitness South Woodford\n\n4 Raven Road, South Woodford, London, E18 1HB\n\nOpen 6am–9pm, every day\n\nsouthwoodford@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/memberships/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447538298457",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "8. Email Thankyou Legend",
    "subject": "Thirty days done, {{contact.first_name}}",
    "from": "Stuart Rook · info@blueprintfitnessldn.com",
    "template": "Joined 08 — Thank you",
    "missing": false,
    "text": "You turned up. That is the hard part.\n\nYour first 30 days · South Woodford\n\nThirty days. Done.\n\nWhatever the numbers say, you did the difficult bit: you kept turning up. Most people never get past the first week.\n\nHave a look at your InBody comparison with your coach — a month is long enough for the numbers to have moved, and it is a good deal more satisfying than guessing.\n\nWhatever you decide about carrying on, thank you for giving it a proper go. It has been a pleasure having you in.\n\nCarry on with a membership\n\nTalk it through with us\n\nSpeak soon,\n\nThe team\n\nBlueprint Fitness South Woodford\n\nYour studio\n\nBlueprint Fitness South Woodford\n\n4 Raven Road, South Woodford, London, E18 1HB\n\nOpen 6am–9pm, every day\n\nsouthwoodford@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/memberships/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447538298457?text=Hi%20Blueprint%20Fitness%20South%20Woodford%20%E2%80%94%20I",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447538298457",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   }
  ]
 },
 {
  "studio": "South Woodford",
  "workflow": "Application",
  "folder": "",
  "status": "published",
  "triggers": [
   "Application - Shorter",
   "Application - Longer"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "BF Application: {{contact.name}}",
    "from": "no-reply@b3.media",
    "template": null,
    "missing": false,
    "text": "Name: {{contact.name}}\nPhone: {{contact.phone}}\nEmail: {{contact.email}}\nWilling To Invest:\n{{contact.apply_if_there_was_an_opportunity_to_work_together_what_would_you_be_willing_to_invest_in_yourself_to_achieve_your_goals}}\nSituation/Struggles:\n{{contact.apply_tell_me_a_little_about_your_situation_what_do_you_need_help_with}}\n{{contact.apply2_what_are_you_struggling_with_right_now}}\nTried Before/Barriers:\n{{contact.apply_what_have_you_tried_before_that_didnt_work}}\n{{contact.apply2_what_is_your_biggest_barrier_to_achieving_the_result_you_are_aiming_for}}\n\nPriority:\n{{contact.apply_how_much_of_a_priority_is_achieving_your_goals_right_now}}\n\n3 Goals:\n{{contact.apply_what_are_3_goals_that_youd_like_to_achieve_with_us}}\n\nWhy Us?:\n{{contact.apply_why_do_you_want_to_work_with_us}}\n\nWhy A Good Client?:\n{{contact.apply_tell_us_why_youd_make_a_good_client}}",
    "links": []
   },
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "BF Application: {{contact.name}}",
    "from": "no-reply@b3.media",
    "template": null,
    "missing": false,
    "text": "Name: {{contact.name}}\nPhone: {{contact.phone}}\nEmail: {{contact.email}}\nWilling To Invest:\n{{contact.apply_if_there_was_an_opportunity_to_work_together_what_would_you_be_willing_to_invest_in_yourself_to_achieve_your_goals}}\nSituation:\n{{contact.apply_tell_me_a_little_about_your_situation_what_do_you_need_help_with}}\n{{contact.apply2_what_are_you_struggling_with_right_now}}\nTried Before/Barriers:\n{{contact.apply_what_have_you_tried_before_that_didnt_work}}\n{{contact.apply2_what_is_your_biggest_barrier_to_achieving_the_result_you_are_aiming_for}}\n\nPriority:\n{{contact.apply_how_much_of_a_priority_is_achieving_your_goals_right_now}}\n\n3 Goals:\n{{contact.apply_what_are_3_goals_that_youd_like_to_achieve_with_us}}\n\nWhy Us?:\n{{contact.apply_why_do_you_want_to_work_with_us}}\n\nWhy A Good Client?:\n{{contact.apply_tell_us_why_youd_make_a_good_client}}",
    "links": []
   }
  ]
 },
 {
  "studio": "South Woodford",
  "workflow": "Check In Form Feb 2024",
  "folder": "",
  "status": "published",
  "triggers": [
   "Form Submitted"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "{{contact.check_who_to_speak_to}} Coaching Checkin: {{contact.name}}",
    "from": "no-reply@b3.media",
    "template": null,
    "missing": false,
    "text": "Contact: {{contact.name}}\nPhone: {{contact.phone}}\n\nWhich Programme:\n{{contact.check_which_programme_did_you_follow_on_your_last_cycle}}\n\nHow was it?\n{{contact.check_how_was_it}}\n\nWhich TEAM:\n{{contact.check_which_team_sessions_did_you_attend}}\n\nCurrent Objectives:\n{{contact.check_what_is_your_current_objective}}\n\nMeasurables:\n{{contact.check_which_measurables_are_you_tracking}}\n{{contact.check_which_measurables_are_you_tracking_other}}\n\nImproved/Declined:\n{{contact.check_have_these_measurables_improved_of_declined_in_the_last_3_months}}\n{{contact.check_improve_or_decline}}\n{{contact.check_decline}}\n\nSuccess?\n{{contact.check_what_does_success_look_like_to_you_and_how_can_we_better_help_you_achieve_success}}\n\nCoach:\n{{contact.check_who_to_speak_to}}",
    "links": []
   },
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "{{contact.check_who_to_speak_to}} Coaching Checkin: {{contact.name}}",
    "from": "no-reply@b3.media",
    "template": null,
    "missing": false,
    "text": "Contact: {{contact.name}}\nPhone: {{contact.phone}}\n\nWhich Programme:\n{{contact.check_which_programme_did_you_follow_on_your_last_cycle}}\n\nHow was it?\n{{contact.check_how_was_it}}\n\nWhich TEAM:\n{{contact.check_which_team_sessions_did_you_attend}}\n\nCurrent Objectives:\n{{contact.check_what_is_your_current_objective}}\n\nMeasurables:\n{{contact.check_which_measurables_are_you_tracking}}\n{{contact.check_which_measurables_are_you_tracking_other}}\n\nImproved/Declined:\n{{contact.check_have_these_measurables_improved_of_declined_in_the_last_3_months}}\n{{contact.check_improve_or_decline}}\n{{contact.check_decline}}\n\nSuccess?\n{{contact.check_what_does_success_look_like_to_you_and_how_can_we_better_help_you_achieve_success}}\n\nCoach:\n{{contact.check_who_to_speak_to}}",
    "links": []
   }
  ]
 },
 {
  "studio": "South Woodford",
  "workflow": "Class Feedback Form",
  "folder": "",
  "status": "published",
  "triggers": [
   "Form Submitted"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "Class Feedback: {{contact.name}}",
    "from": "no-reply@b3.media",
    "template": null,
    "missing": false,
    "text": "Contact: {{contact.name}}\nBoxing:\n{{ contact.feedback_do_you_attend_attend_boxing_classes }}\nMetCon:\n{{ contact.feedback_do_you_attend_metcon_classes }}\n\nRecover:\n{{ contact.feedback_do_you_attend_recover_classes }}\n\nSweat:\n{{ contact.feedback_do_you_attend_sweat_classes }}\n\nTough Guy:\n{{ contact.feedback_do_you_attend_tough_guy_classes }}\n\nXLR8:\n{{ contact.feedback_do_you_attend_xlr8_classes }}\n\nIf No, Reasons?:\n{{ contact.feedback_if_no_reasons }}\n\nRE Options:\n{{ contact.feedback_team_options }}\n\nWhich 4:\n{{ contact.feedback_which_classes_tick_up_to_4_are_you_most_likely_to_attend }}\n\nAny Other Feedback:\n{{ contact.feedback_any_other_comments_or_feedback }}",
    "links": []
   }
  ]
 },
 {
  "studio": "South Woodford",
  "workflow": "Coming Soon 2024",
  "folder": "",
  "status": "published",
  "triggers": [
   "Form Submitted"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "Priority List: {{contact.name}}",
    "from": "{{location.email}}",
    "template": null,
    "missing": false,
    "text": "Added to Priority List: {{contact.name}}\n{{contact.phone}}\n{{contact.email}}",
    "links": []
   },
   {
    "type": "email",
    "name": "Email",
    "subject": "{{location.name}} Coming Soon to Leytonstone!",
    "from": "{{user.name}} · {{location.email}}",
    "template": "Coming Soon 1",
    "missing": false,
    "text": "Hi {{contact.first_name}}\n\nIt's Stu from Blueprint Fitness\n\nJust a quick email to let you know we have received your enquiry for our new location in Leytonstone, so you'll be first to know the moment we release more details!\nWe hope you're excited as we are!\n\nSpeak soon\n\nStu\n\nInstagram Page\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list.",
    "links": []
   },
   {
    "type": "sms",
    "name": "SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Hi {{contact.first_name}} it's Stu from Blueprint Fitness,\nJust a quick message to let you know we have added you to our Priority List for a Founders' Offer at our Brand New Leystone Gym! We hope you're excited as we are!\nSpeak soon\nStu",
    "links": []
   }
  ]
 },
 {
  "studio": "South Woodford",
  "workflow": "FB Comments All Posts",
  "folder": "",
  "status": "published",
  "triggers": [
   "Comment on Page"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "",
    "links": []
   }
  ]
 },
 {
  "studio": "South Woodford",
  "workflow": "Feedback",
  "folder": "",
  "status": "published",
  "triggers": [
   "Form Submitted"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "Feedback: {{contact.name}}",
    "from": "no-reply@blueprintfitnessldn.com",
    "template": null,
    "missing": false,
    "text": "Name: {{contact.name}}\nEmail: {{contact.email}}\nRating: {{contact.how_would_you_rate_your_experience}}\nExperience: {{contact.feedback_describe_your_experience}}\nImprovements?:\nDo Well: {{contact.feedback_what_are_we_doing_well}}\nImprove On: {{contact.feedback_what_could_we_improve_on}}",
    "links": []
   },
   {
    "type": "email",
    "name": "Email",
    "subject": "Thankyou {{contact.name}}!",
    "from": "Paul Stafford · info@blueprintfitnessldn.com",
    "template": null,
    "missing": false,
    "text": "Hey {{contact.first_name}},\nThankyou for your feedback!\nWe really appreciate it 🙌😊\nPaul",
    "links": []
   }
  ]
 },
 {
  "studio": "South Woodford",
  "workflow": "January Jumpstart",
  "folder": "",
  "status": "published",
  "triggers": [
   "Order Submitted"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "Jan Jumpstart: {{contact.name}}",
    "from": "{{location.email}}",
    "template": null,
    "missing": false,
    "text": "{{contact.name}} has paid for the January Jumpstart\n£200\n{{contact.phone}}",
    "links": []
   }
  ]
 },
 {
  "studio": "South Woodford",
  "workflow": "New Workflow : Cancel Request",
  "folder": "",
  "status": "published",
  "triggers": [
   "Form Submitted"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Cancel Request",
    "subject": "Cancel Request {{contact.name}}",
    "from": "noreply@blueprintfitnessldn.com",
    "template": null,
    "missing": false,
    "text": "Name: {{contact.name}}\n\nEmail: {{contact.email}}\n\nReason: {{contact.additional_comments}}",
    "links": []
   }
  ]
 },
 {
  "studio": "South Woodford",
  "workflow": "Nutrition Consult",
  "folder": "",
  "status": "published",
  "triggers": [
   "Form Submitted"
  ],
  "steps": [
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "Nutrition Consult Request: {{contact.name}}",
    "from": "no-reply@blueprintfitnessldn.com",
    "template": null,
    "missing": false,
    "text": "Nutrition Consult Request: {{contact.name}}\n{{contact.email}}\n{{contact.phone}}\n\nInBody Results: {{contact.do_you_have_your_inbody_results}}\n\nFood Diary?:\n{{contact.have_you_started_a_food_diary}}\n\nGoal:\n{{contact.what_is_your_overall_goal}}\n\nStruggles:{{contact.what_is_your_biggest_struggle_with_regards_to_nutrition}}\n\nPreference:\n{{contact.who_would_you_like_a_consultation_with}}",
    "links": []
   },
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "Nutrition Consult Request: {{contact.name}}",
    "from": "no-reply@blueprintfitnessldn.com",
    "template": null,
    "missing": false,
    "text": "Nutrition Consult Request: {{contact.name}}\n{{contact.email}}\n{{contact.phone}}\n\nInBody Results: {{contact.do_you_have_your_inbody_results}}\n\nFood Diary?:\n{{contact.have_you_started_a_food_diary}}\n\nGoal:\n{{contact.what_is_your_overall_goal}}\n\nStruggles:{{contact.what_is_your_biggest_struggle_with_regards_to_nutrition}}\n\nPreference:\n{{contact.who_would_you_like_a_consultation_with}}",
    "links": []
   },
   {
    "type": "email",
    "name": "Email",
    "subject": "Your nutrition consultation — what to bring",
    "from": "Blueprint Fitness Nutrition Team · info@blueprintfitnessldn.com",
    "template": "Nutrition — Consultation requested",
    "missing": false,
    "text": "We have got your request. Here is how to make it count.\n\nNutrition · South Woodford\n\nWe have got your request\n\nHello {{contact.first_name}} — thanks for asking for nutrition help. A coach will be in touch to book you in.\n\nTwo things that make it far more useful\n\n•\n\nYour InBody results. The scan from your intro gives us your real starting point, including your BMR.\n\n•\n\nA few honest days of food. Not perfect — honest. It tells us more than any questionnaire.\n\nNot got either yet? Say so and we will sort it together. Nobody here is judging.\n\nWhile you wait, the Nutrition Video Series covers the principles we will be applying. Lessons 5 to 8 on calories are the ones most people wish they had watched sooner.\n\nWatch the video series\n\nUpdate your request\n\nSpeak soon,\n\nThe team\n\nBlueprint Fitness South Woodford\n\nYour studio\n\nBlueprint Fitness South Woodford\n\n4 Raven Road, South Woodford, London, E18 1HB\n\nOpen 6am–9pm, every day\n\nsouthwoodford@blueprintfitnessldn.com\n·\nWhatsApp\n\nYou are getting this because you are on the list at\nblueprintfitnessldn.com.\n\nUnsubscribe ·\n© {{right_now.year}} Blueprint Fitness",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/members/nutrition-course/",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com/members/nutrition-request/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447538298457",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   }
  ]
 },
 {
  "studio": "South Woodford",
  "workflow": "Recipe - FAQ Auto Reply",
  "folder": "",
  "status": "draft",
  "triggers": [
   "New FB Message",
   "New Instagram DM",
   "New Google Message",
   "New Chat Widget Message"
  ],
  "steps": [
   {
    "type": "sms",
    "name": "SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "🤖 {{location.name}} bot here: We're located at {{location.full_address}} right next to the library.",
    "links": []
   }
  ]
 },
 {
  "studio": "South Woodford",
  "workflow": "SMS: OFFER",
  "folder": "",
  "status": "published",
  "triggers": [
   "Customer Replied"
  ],
  "steps": [
   {
    "type": "sms",
    "name": "SMS Text",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Hey, it's the Blueprint Bot here,\nI'll get your entry in right now!\nIf you could just provide a few details...\nQ 1/2: What's your Full Name?",
    "links": []
   },
   {
    "type": "sms",
    "name": "SMS Email",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Thanks!\nQ 2/2: And your Email Address please {{contact.first_name}}?",
    "links": []
   },
   {
    "type": "sms",
    "name": "SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Awesome! Heres a link!",
    "links": []
   }
  ]
 },
 {
  "studio": "South Woodford",
  "workflow": "Speak With Us Call Booked",
  "folder": "",
  "status": "published",
  "triggers": [
   "Appointment Status"
  ],
  "steps": [
   {
    "type": "sms",
    "name": "SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Hi {{contact.first_name}}, just a reminder I'll be giving you a call in 1 hour's time.\n{{appointment.user.first_name}}",
    "links": []
   },
   {
    "type": "internal_notification",
    "name": "Internal Notification",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "",
    "links": []
   }
  ]
 },
 {
  "studio": "South Woodford",
  "workflow": "Website Enquiry — South Woodford",
  "folder": "",
  "status": "published",
  "triggers": [
   "External Tracking Event (main site)",
   "External Tracking Event"
  ],
  "steps": [
   {
    "type": "email",
    "name": "Confirmation email",
    "subject": "Hello {{contact.first_name}} — quick question about your 30 Day Kickstart",
    "from": "Blueprint Fitness South Woodford · southwoodford@blueprintfitnessldn.com",
    "template": null,
    "missing": false,
    "text": "Thanks for registering your interest — one quick question before we book you in.\n\nThe 30-Day Kickstart · South Woodford\n\nHello {{contact.first_name}}, you’re on the list.\n\nThanks for registering your interest in our 30 Day Kickstart at Blueprint Fitness South Woodford. A coach will give you a ring shortly for a friendly chat — no hard sell, ever.\n\nJust to check — are you local to South Woodford?\n\nReply to this email or message us on WhatsApp and we’ll get your first session booked in.\n\n12\n\nCoached sessions\n\n5:1\n\nMax ratio\n\n100+\n\nSessions a week\n\nStart your 30 days →\n\nMessage South Woodford on WhatsApp\n\nSpeak soon,\n\nStu\n\nBlueprint Fitness South Woodford\n\nYour studio\n\nBlueprint Fitness South Woodford\n\n4 Raven Road, South Woodford, London, E18 1HB\n\nOpen 6am–9pm, every day — 100+ sessions a week\n\nsouthwoodford@blueprintfitnessldn.com\n\nYou’re getting this because you registered your interest at\nblueprintfitnessldn.com.",
    "links": [
     {
      "url": "https://blueprintfitnessldn.com/signup-southwoodford/",
      "health": "ok"
     },
     {
      "url": "https://wa.me/447538298457?text=Hi%20Blueprint%20Fitness%20South%20Woodford%20%E2%80%94%20I",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     }
    ]
   },
   {
    "type": "sms",
    "name": "Confirmation SMS",
    "subject": "",
    "from": "",
    "template": null,
    "missing": false,
    "text": "Hello {{contact.first_name}}, thanks for registering your interest in our 30 Day Kickstart!\n\nJust to check, are you local to South Woodford?\n\nStu",
    "links": []
   },
   {
    "type": "internal_notification",
    "name": "Notify the studio",
    "subject": "New website enquiry (South Woodford): {{contact.name}}",
    "from": "southwoodford@blueprintfitnessldn.com",
    "template": null,
    "missing": false,
    "text": "New website enquiry — South Woodford\n\nName: {{contact.name}}\n\nPhone: {{contact.phone}}\n\nEmail: {{contact.email}}\n\nCame in from the Blueprint Fitness website.",
    "links": []
   }
  ]
 }
];
