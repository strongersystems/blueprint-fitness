/**
 * The copy for every rebuilt Blueprint Fitness workflow email.
 *
 * Rewritten from the originals. What changed and why:
 *
 *  - Claims that were not true everywhere are gone or made per-studio. The old
 *    templates told Hackney leads the gym was "open 7 days a week" and ran
 *    "100+ sessions"; Hackney is closed on Sundays and has no such count.
 *  - Manufactured urgency is gone. "SURPRISE OFFER! 24 hours only" followed by
 *    "Ends today" was two emails of pressure around an offer the copy never
 *    actually named. They are now an honest price email and a genuine last
 *    call that says what the Kickstart costs and what it includes.
 *  - Specifics nobody could stand behind are gone: daily message-a-coach,
 *    bought-in meal plans, free parking, fixed session lengths.
 *  - Every link points at a page that exists on the new site.
 *  - The voice matches the site: plain, warm, British, no hard sell.
 *
 * Merge fields are GoHighLevel's and pass straight through.
 */
import { email, p, h, list, cta, ctaGhost, panel, stats, rule, links, SITE } from './render.mjs';

const PRICE = '£169';
const RATIO = '5:1';
const FIRST = '{{contact.first_name}}';

/** Folders the templates are filed under, in order. */
export const FOLDERS = [
  '01 Lead nurture — 30 Day Kickstart',
  '02 Joined — your first 30 days',
  '03 Nutrition',
  '04 Win-back',
];

export function build(s) {
  const L = links(s);
  const sign = { name: s.coach, role: `Blueprint Fitness ${s.name}` };
  const team = { name: 'The team', role: `Blueprint Fitness ${s.name}` };
  const wa = (t) => L.whatsapp(t);

  /** Every studio keeps its own ratio line; the number is 5:1, never 6:1. */
  const KICK_STATS = stats([
    { n: '12', l: 'Coached sessions' },
    { n: RATIO, l: 'Max ratio' },
    { n: '30', l: 'Days' },
  ]);

  const out = [];
  const add = (folder, key, name, subject, preheader, eyebrow, headline, blocks, signoff = sign) =>
    out.push({ folder, key, name, subject, preheader,
               html: email({ studio: s, eyebrow, headline, blocks, preheader, signoff }) });

  /* ============================ 01 · LEAD NURTURE — 30 DAY KICKSTART ===== */
  const F1 = FOLDERS[0];

  add(F1, 'lead-01', 'Lead 01 — We have got your details',
    `Thanks ${FIRST} — here is what happens next`,
    'A coach will call you shortly. No hard sell, ever.',
    'The 30-Day Kickstart', `Hello ${FIRST}, we have got you.`,
    [
      p(`Thanks for registering your interest in the 30-Day Kickstart at <strong style="color:#101B2F">Blueprint Fitness ${s.name}</strong>. Your details are with us.`),
      p(`A coach will give you a ring shortly for a friendly chat — what you are after, what has worked before, what has not. No hard sell, ever. If it is not right for you, we will say so.`),
      KICK_STATS,
      panel(`<strong>In the meantime</strong> — have a look at what a week actually looks like here. Knowing the sessions exist at times you can make is usually the thing people want to check first.`),
      cta(L.timetable, `See the ${s.name} timetable`),
      ctaGhost(wa(`Hi Blueprint Fitness ${s.name} — I've registered for the 30 Day Kickstart.`), 'Message us on WhatsApp'),
    ]);

  add(F1, 'lead-02', 'Lead 02 — Motivation',
    'The gym is not a motivating place. That is rather the point.',
    'Why we built the opposite of a gym floor.',
    'The 30-Day Kickstart', 'On not feeling motivated',
    [
      p(`&ldquo;I have no motivation to go to the gym.&rdquo; We hear it constantly — usually from people who have just got in touch with us.`),
      p(`Here is the thing: a gym floor is not a motivating place. Everyone looks like they know what they are doing. Nobody tells you where to start. You do three exercises you half-remember and leave.`),
      p(`Motivation is not what gets people through the door on a wet Tuesday in February. A time in the diary, a coach expecting you, and four other people who noticed you were not there last week — that is what does it.`),
      panel(`That is the whole design. You book a session, someone has already written it, and a coach runs you through it. You do not have to decide anything.`),
      h('What that looks like'),
      list([
        `<strong>12 coached sessions</strong> across your first 30 days`,
        `<strong>Never more than five people to a coach</strong>, so you always get eyes on you`,
        `<strong>A plan written for you</strong> — not a class everyone does at once`,
        `<strong>An InBody scan</strong> at the start, so progress is measured rather than guessed`,
      ]),
      cta(L.signup, `Start your 30 days at ${s.name}`),
    ]);

  add(F1, 'lead-03', 'Lead 03 — What a session is like',
    'What actually happens in a session',
    'No mirrors, no machines you cannot work out, no guessing.',
    'The 30-Day Kickstart', 'What a session actually looks like',
    [
      p(`Most gyms are built for people who already know what they are doing. Mirrors everywhere, rows of machines with no explanation, and nobody to ask.`),
      p(`Ours is not. Here is what a session at ${s.name} is:`),
      list([
        `You arrive. Your session is already written down.`,
        `A coach shows you each movement and watches you do it.`,
        `You work at a weight that is right for <em>you</em> — not the person next to you.`,
        `You leave knowing what you did and why.`,
      ]),
      p(`Most of our members are in their thirties to sixties, and a good share of them had not trained in years before they started. Nobody is performing for anybody.`),
      panel(`We meet you where your strength and fitness actually are, and build from there. There are no degrading challenges and nobody is getting put on a treadmill for an hour.`),
      cta(L.timetable, 'Look at the timetable'),
      ctaGhost(L.signup, 'Or start your 30 days'),
    ]);

  add(F1, 'lead-04', 'Lead 04 — For beginners',
    'Most people who join us are complete beginners',
    'Including the ones who now look like they never were.',
    'The 30-Day Kickstart', 'Almost everyone starts here as a beginner',
    [
      p(`It is the most common worry we hear: <em>everyone there will be fitter than me.</em>`),
      p(`Most people who join Blueprint Fitness are complete beginners. The members who look like naturals are simply the ones who kept turning up three times a week for a year. That is the entire secret.`),
      h('What keeps people coming back'),
      list([
        `The session is planned, so there is no standing about wondering what to do.`,
        `A coach is with you the whole way — you are never left to work it out.`,
        `The group is small enough that people notice you, and say hello.`,
        `It gets measurably easier, and you can see it in the numbers.`,
      ]),
      p(`If you have a question before you commit — an injury, a schedule, anything at all — just reply to this email. A real person reads it.`),
      cta(L.signup, `Start your 30 days at ${s.name}`),
    ]);

  add(F1, 'lead-05', 'Lead 05 — Member stories',
    'Two members who started exactly where you are',
    'Michelle and Georgia both began on a 30-day trial.',
    'The 30-Day Kickstart', 'They started on the same 30 days',
    [
      p(`Hello ${FIRST} — the most useful thing we can show you is not us talking about ourselves. It is members talking about the bit before they started.`),
      p(`Michelle and Georgia both began on a 30-day trial, both having not trained properly in years, and both stayed. Their stories are on the site, in their own words.`),
      cta(`${SITE}/#member-stories`, 'Watch the member stories'),
      rule(),
      p(`Every one of them is unremarkable in the best way: someone busy, a bit apprehensive, who booked a session and then booked another one.`),
      ctaGhost(L.signup, 'Start your own 30 days'),
    ]);

  add(F1, 'lead-06', 'Lead 06 — Common hurdles',
    'The four things that stop people starting',
    'Time, consistency, feeling watched, and food.',
    'The 30-Day Kickstart', 'The four things that stop people',
    [
      p(`After a decade of first sessions, the same four things come up. None of them is a good reason not to start.`),
      h('“I have not got time”'),
      p(`A session is an hour, three times a week, at a time you choose. ${s.hours}. If the timetable does not work around your life, tell us and we will be honest about whether we can fit you in.`),
      h('“I cannot stay consistent”'),
      p(`Which is why the sessions are booked, coached and expected. Consistency is much easier when somebody notices you are missing.`),
      h('“I will feel watched”'),
      p(`Five people, one coach, everyone concentrating on their own work. Nobody is looking at you — they are busy.`),
      h('“I do not know what to eat”'),
      p(`We cover that too, with practical guidance rather than a meal plan to buy. Start with training; food follows more easily once you are moving.`),
      cta(L.signup, 'Start your 30 days'),
    ]);

  add(F1, 'lead-07', 'Lead 07 — What makes it different',
    'What is actually different about training here',
    'Small groups, a real plan, and coaches who know your name.',
    'The 30-Day Kickstart', 'What is actually different here',
    [
      p(`Choosing where to train is a bigger decision than it looks, so here is the honest version of what you get with us — and what you do not.`),
      h('You get'),
      list([
        `A coach in the room with you for every session, not on a rota somewhere.`,
        `A maximum of five people to that coach.`,
        `A programme that progresses, written around what you can do now.`,
        `People who know your name by week two.`,
      ]),
      h('You do not get'),
      list([
        `A swipe card and good luck.`,
        `A room of machines and no idea which ones matter.`,
        `A contract you cannot get out of.`,
      ]),
      panel(`It is personal training, delivered in a small supportive group. That is the whole idea — the coaching of one-to-one, at a price that is not one-to-one.`),
      cta(L.memberships, 'See what membership costs'),
      ctaGhost(L.signup, 'Or start with 30 days'),
    ]);

  add(F1, 'lead-08', 'Lead 08 — Questions answered',
    'The questions we get asked most',
    'Commitment, fitness level, injuries and times.',
    'The 30-Day Kickstart', 'Your questions, answered',
    [
      p(`Hello ${FIRST}. The same handful of questions come up before people start, so here they are with straight answers.`),
      h('Is the 30 days a contract?'),
      p(`No. It is thirty days. Most people stay, some do not, and that is genuinely fine.`),
      h('Am I fit enough?'),
      p(`Yes. Everything is scaled to you — that is what having a coach in the room is for.`),
      h('What if I have an injury?'),
      p(`Tell us on your first call. Our coaches work around injuries and conditions every day; we would rather know up front than find out later.`),
      h('When are the sessions?'),
      p(`${s.hours}. The full grid is on the site, so you can check before you commit.`),
      cta(L.timetable, 'Check the timetable'),
      h('What does it cost?'),
      p(`The 30-Day Kickstart is ${PRICE} — twelve coached sessions, your InBody scan and your plan. No joining fee.`),
      ctaGhost(L.signup, 'Start your 30 days'),
    ]);

  add(F1, 'lead-09', 'Lead 09 — What it costs',
    `The 30-Day Kickstart, and what ${PRICE} covers`,
    'Twelve coached sessions, an InBody scan, and your plan.',
    'The 30-Day Kickstart', `What ${PRICE} actually covers`,
    [
      p(`No games and no countdown timers — just what the Kickstart is and what it costs, so you can decide.`),
      KICK_STATS,
      h(`${PRICE} for your first 30 days`),
      list([
        `<strong>12 coached sessions</strong> — three a week, at times you pick`,
        `<strong>An InBody scan and goal-setting session</strong> to start from a real number`,
        `<strong>A plan written around you</strong>, progressed as you go`,
        `<strong>Practical nutrition guidance</strong> — no meal plans to buy`,
        `<strong>No joining fee and no contract</strong>`,
      ]),
      p(`Booked as one-to-one personal training, a month like that costs several hundred pounds. It is ${PRICE} because you share your coach with four other people.`),
      cta(L.signup, `Start your 30 days at ${s.name}`),
      ctaGhost(L.memberships, 'See what happens after the 30 days'),
    ]);

  add(F1, 'lead-10', 'Lead 10 — Last call',
    `${FIRST}, shall we leave it there?`,
    'Last email from us — unless you would like to start.',
    'The 30-Day Kickstart', 'Shall we leave it there?',
    [
      p(`This is the last email in this sequence, ${FIRST} — we are not going to keep nudging you.`),
      p(`If the timing is wrong, that is completely fine. Keep us in mind; the door stays open and the offer does not change.`),
      p(`If you have been meaning to start and simply have not got round to it, this is the reminder. Thirty days, twelve coached sessions, and an honest answer at the end of it about whether this suits you.`),
      cta(L.signup, 'Start your 30 days'),
      rule(),
      p(`Rather talk to a human first? Message us and a coach at ${s.name} will reply — no script, no pressure.`),
      ctaGhost(wa(`Hi Blueprint Fitness ${s.name} — I've got a question about the 30 Day Kickstart.`), 'Ask us a question'),
    ]);

  /* ====================== 02 · JOINED — YOUR FIRST 30 DAYS ================ */
  const F2 = FOLDERS[1];

  add(F2, 'join-01', 'Joined 01 — Welcome and getting started',
    `Welcome to Blueprint ${s.name} — your first steps`,
    'Three things to get sorted before session one.',
    'You’re in', `Welcome, ${FIRST}.`,
    [
      p(`Lovely to have you. Over the next thirty days you will train properly, meet a few people, and find out what you are actually capable of. Here is what happens first.`),
      h('1. Your intro call'),
      p(`A coach will ring you to book your first session and get to know you. If you would rather sort it now, message us and we will get it in the diary.`),
      ctaGhost(wa(`Hi Blueprint Fitness ${s.name} — I've joined the 30 Day Kickstart and would like to book my intro.`), 'Book your intro on WhatsApp'),
      h('2. Your InBody scan'),
      p(`We take a baseline — muscle mass, body fat, BMR — so that in thirty days we are comparing numbers rather than impressions. It takes a couple of minutes.`),
      h('3. Booking your sessions'),
      p(`Sessions are booked through TeamUp. Have a quick read of how booking and cancelling work, so you never lose a session to the cut-off.`),
      cta(L.bookings, 'How booking works'),
      rule(),
      p(`Anything at all — injuries, nerves, a week away — just tell us. It is much easier to plan around something we know about.`),
      cta(L.timetable, 'See the timetable'),
    ], team);

  add(F2, 'join-02', 'Joined 02 — Nutrition',
    'The nutrition side, without the faff',
    'A 22-part video series and a coach, both included.',
    'Your first 30 days', 'Training is half of it',
    [
      p(`Hello ${FIRST}. You do not need to overhaul your diet to get results in your first month — but a few honest changes go a very long way.`),
      p(`Two things are included with your membership, and both are worth using.`),
      h('The Nutrition Video Series'),
      p(`Twenty-two short lessons, in the order that actually matters — calories, adherence, habits, and what to do when progress stalls. Watch one a day and you will understand more than most people who have been dieting for years.`),
      cta(L.nutritionCourse, 'Start the video series'),
      h('A consultation with a coach'),
      p(`When you want it applied to you specifically rather than in general, request a consultation. Bring your InBody results and a few honest days of food — that tells us far more than any questionnaire.`),
      ctaGhost(L.nutritionRequest, 'Request a consultation'),
      panel(`No fad diets and nothing to buy. Just practical guidance built around how you actually live.`),
    ], team);

  add(F2, 'join-03', 'Joined 03 — Which sessions to pick',
    'Which sessions will get you the results you want?',
    'SGPT, and how the classes fit around it.',
    'Your first 30 days', 'Which sessions should you book?',
    [
      p(`Short answer: your coached SGPT sessions are the backbone. Everything else is a bonus on top.`),
      h('SGPT — your three a week'),
      p(`This is the one that moves the needle. Strength work, progressed week to week, with a coach watching. If you only ever do these three, you will still get where you are going.`),
      h('The classes'),
      p(`Conditioning sessions you can add on when you fancy them. They are not a replacement for your coached sessions — they are for the weeks when you want a fourth thing to do.`),
      cta(L.timetable, `See what is on at ${s.name}`),
      rule(),
      p(`Not sure what to book? Ask your coach at your next session. They know what you are working on.`),
    ], team);

  add(F2, 'join-04', 'Joined 04 — The community',
    'The bit that keeps people here',
    'The socials are genuinely half the reason people stay.',
    'Your first 30 days', 'The bit nobody expects',
    [
      p(`Most people join for the training. A surprising number stay for everyone else.`),
      p(`There are socials, events and a fair amount of nonsense in the group chat. You are welcome at all of it, and there is no obligation to any of it.`),
      p(`If you have been coming a couple of weeks and have not met many people yet, tell a coach. Introducing people is genuinely part of the job here.`),
      cta(L.members, 'Your members area'),
    ], team);

  add(F2, 'join-05', 'Joined 05 — Refer a friend',
    'Know someone who would get on well here?',
    'Send them a 30-Day Kickstart.',
    'Your first 30 days', 'Bring someone with you',
    [
      p(`Hello ${FIRST} — training is easier when someone you know is doing it too. It is also how most of our members found us.`),
      p(`If there is someone who has been saying they should do something about it, send them this and let them have a look at what a month here involves.`),
      cta(L.kickstart, 'Send them the 30-Day Kickstart'),
      rule(),
      p(`Mention it to a coach when they start, so we know who to thank.`),
    ], team);

  add(F2, 'join-06', 'Joined 06 — Life as a full member',
    'What it is actually like once the 30 days are over',
    'Same coaching, same small groups, just no end date.',
    'Your first 30 days', 'Life after the Kickstart',
    [
      p(`Hello ${FIRST} — people often ask what changes when the 30 days finish. Honestly: not much, and that is rather the point.`),
      p(`Same coaches, same small groups, same plan carrying on from where you got to. What changes is that you stop thinking about it as a trial and start thinking about it as the thing you do on Mondays, Wednesdays and Fridays.`),
      h('What members get on top'),
      list([
        `<strong>Unlimited classes</strong> alongside your coached sessions`,
        `<strong>A monthly check-in</strong> with your coach, whenever you want one`,
        `<strong>InBody tracking</strong>, so progress stays measured`,
        `<strong>The nutrition resources</strong> and our clinics and workshops`,
        `<strong>Every social and event</strong> going`,
      ]),
      p(`Most people find the second month easier than the first. The hard part was becoming someone who turns up, and you have already done that.`),
      cta(L.memberships, 'See the memberships'),
    ], team);

  add(F2, 'join-07', 'Joined 07 — What happens after 30 days',
    'What happens when your 30 days are up',
    'Your options, and what each one costs.',
    'Your first 30 days', 'What happens after your 30 days',
    [
      p(`You are most of the way through, so here is what comes next — no surprises at the till.`),
      p(`Memberships are simply a question of how many coached sessions a month suit your life. Same coaching, same small groups, same plan.`),
      list([
        `<strong>SGPT 12</strong> — £239 a month. Three a week, and what most members settle on.`,
        `<strong>SGPT 8</strong> — £219 a month. Two a week with room for a third.`,
        `<strong>SGPT 4</strong> — £189 a month. One a week, steady and sustainable.`,
      ]),
      p(`All of them include unlimited classes, your monthly check-in, InBody tracking and the nutrition resources.`),
      cta(L.memberships, 'Compare the memberships'),
      rule(),
      p(`There is a 10% discount for couples in the same household, NHS and services. Ask your coach, or just reply to this.`),
    ], team);

  add(F2, 'join-08', 'Joined 08 — Thank you',
    `Thirty days done, ${FIRST}`,
    'You turned up. That is the hard part.',
    'Your first 30 days', 'Thirty days. Done.',
    [
      p(`Whatever the numbers say, you did the difficult bit: you kept turning up. Most people never get past the first week.`),
      p(`Have a look at your InBody comparison with your coach — a month is long enough for the numbers to have moved, and it is a good deal more satisfying than guessing.`),
      p(`Whatever you decide about carrying on, thank you for giving it a proper go. It has been a pleasure having you in.`),
      cta(L.memberships, 'Carry on with a membership'),
      ctaGhost(wa(`Hi Blueprint Fitness ${s.name} — I've finished my 30 days and wanted to chat about what's next.`), 'Talk it through with us'),
    ], team);

  /* =============================== 03 · NUTRITION ======================== */
  const F3 = FOLDERS[2];

  add(F3, 'nutrition-01', 'Nutrition — Consultation requested',
    'Your nutrition consultation — what to bring',
    'We have got your request. Here is how to make it count.',
    'Nutrition', 'We have got your request',
    [
      p(`Hello ${FIRST} — thanks for asking for nutrition help. A coach will be in touch to book you in.`),
      h('Two things that make it far more useful'),
      list([
        `<strong>Your InBody results.</strong> The scan from your intro gives us your real starting point, including your BMR.`,
        `<strong>A few honest days of food.</strong> Not perfect — honest. It tells us more than any questionnaire.`,
      ]),
      p(`Not got either yet? Say so and we will sort it together. Nobody here is judging.`),
      panel(`While you wait, the Nutrition Video Series covers the principles we will be applying. Lessons 5 to 8 on calories are the ones most people wish they had watched sooner.`),
      cta(L.nutritionCourse, 'Watch the video series'),
      ctaGhost(L.nutritionRequest, 'Update your request'),
    ], team);

  /* ================================ 04 · WIN-BACK ======================== */
  const F4 = FOLDERS[3];

  add(F4, 'winback-01', 'Win-back 01 — Checking in',
    `How have you been, ${FIRST}?`,
    'No pitch — just seeing how you got on.',
    'From the team', `How have you been?`,
    [
      p(`Hello ${FIRST}. It has been a little while since you trained with us, and I wanted to see how you have got on.`),
      p(`No pitch attached to this one. If you found something that works better, genuinely good — that is the point of the whole exercise.`),
      p(`And if it all rather tailed off, that happens to almost everybody. It is not a character flaw.`),
      ctaGhost(wa(`Hi Blueprint Fitness ${s.name} — just replying to your email.`), 'Reply on WhatsApp'),
    ]);

  add(F4, 'winback-02', 'Win-back 02 — Still thinking about it',
    'Still fancy getting back to it?',
    'The door is open, and starting again is easier than starting.',
    'From the team', 'Still fancy getting back to it?',
    [
      p(`Hello ${FIRST} — a quick one. If getting back into training has been on your list, you would not be starting from scratch. You already know how the sessions work and the coaches already know you.`),
      p(`Quite a lot has changed since you were last in, too. Here is the current timetable at ${s.name}.`),
      cta(L.timetable, 'See what is on now'),
      rule(),
      p(`If you would rather just ask what has changed, message us — happy to give you the honest version.`),
      ctaGhost(wa(`Hi Blueprint Fitness ${s.name} — I'm thinking about coming back.`), 'Ask us what has changed'),
    ]);

  add(F4, 'winback-03', 'Win-back 03 — Whenever you are ready',
    'Whenever you are ready',
    'Last one from us — no hard feelings either way.',
    'From the team', 'Whenever you are ready',
    [
      p(`This is the last one from us, ${FIRST}, so we do not become the gym that will not stop emailing.`),
      p(`If and when you want to come back, everything is where you left it. Message the studio and we will pick it up from there — no re-joining fee, no awkwardness about the gap.`),
      p(`All the best either way.`),
      cta(L.kickstart, 'See what a month looks like now'),
    ]);

  return out;
}
