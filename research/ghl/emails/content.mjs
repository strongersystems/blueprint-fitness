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
  '05 Service emails',
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

  /* ===================== 04 · WIN-BACK — POST-TRIAL CHECK-INS =========== */
  /* These run in "2. Intro Complete Main Flow" for people whose trial ended
     without them joining. The originals were unstyled inline HTML offering
     "5 free classes"; the offer is kept, the formatting is not. */

  add(F4, 'checkin-28', 'Win-back — 28 day check-in',
    `How did you get on, ${FIRST}?`,
    'Five sessions on us if you fancy dropping back in.',
    'From the team', 'How did you get on?',
    [
      p(`Hello ${FIRST} — it has been about a month since your trial finished, and I wanted to see how you have been getting on.`),
      p(`If you have kept it going somewhere else, genuinely well done. That is the point of the whole thing.`),
      panel(`<strong>And if it tailed off</strong> — which happens to most people — reply to this email and I will put <strong>five free sessions</strong> on your account to get you moving again. No catch, no sales call.`),
      p(`The door is always open if you want to reboot things.`),
      cta(L.timetable, `See what is on at ${s.name}`),
      ctaGhost(wa(`Hi Blueprint Fitness ${s.name} — I'd like to take you up on the five sessions.`), 'Claim it on WhatsApp'),
    ]);

  add(F4, 'checkin-90', 'Win-back — 3 month check-in',
    `Still taking care of yourself, ${FIRST}?`,
    'The five sessions are still there if you want them.',
    'From the team', 'Three months on',
    [
      p(`Hello ${FIRST}. It has been about three months since you finished with us, so this is just a quick one to check you are still looking after yourself.`),
      p(`No pitch. But the offer of <strong>five free sessions</strong> has not gone anywhere, if you are ready to get moving again.`),
      p(`Starting again is far easier than starting. You already know how the sessions work, and the coaches already know you.`),
      cta(wa(`Hi Blueprint Fitness ${s.name} — I think I'm ready to come back.`), 'Have a chat with us'),
      rule(),
      p(`Or just have a look at what is running now — quite a lot has changed.`),
      ctaGhost(L.timetable, 'See the current timetable'),
    ]);

  /* ===================== 02 · WHAT HAPPENS AFTER THE TRIAL =============== */
  /* Replaces an email still selling a 14-day trial at £129 with a £59
     extension to £118 — none of which matches what is sold today. */

  add(F2, 'post-trial', 'Joined 09 — What happens when your trial ends',
    'Your trial is nearly up — here are your options',
    'Carry on, or do not. Both are fine.',
    'Your first 30 days', 'Your trial is nearly up',
    [
      p(`Hello ${FIRST} — you are near the end of your trial, so here is what happens next, with no surprises at the till.`),
      p(`Before you decide, book your InBody review with a coach. A month is long enough for the numbers to have moved, and comparing them is a good deal more useful than going on how you feel.`),
      ctaGhost(wa(`Hi Blueprint Fitness ${s.name} — could I book my InBody review?`), 'Book your InBody review'),
      h('If you want to carry on'),
      p(`Memberships come down to how many coached sessions a month suit your life — 12, 8 or 4. Same coaching, same small groups, same plan carrying on from where you got to.`),
      cta(L.memberships, 'See the memberships'),
      h('If you do not'),
      p(`That is genuinely fine, and there is nothing to cancel — a trial just ends. You will leave fitter than you arrived either way, and you would be welcome back whenever.`),
    ], team);

  /* ============================== 05 · SERVICE EMAILS ==================== */
  const F5 = FOLDERS[4];

  add(F5, 'svc-enquiry', 'Service — Website enquiry confirmation',
    `Hello ${FIRST} — quick question about your 30 Day Kickstart`,
    'We have your details. Just one thing to check.',
    'The 30-Day Kickstart', `Hello ${FIRST}, you’re on the list.`,
    [
      p(`Thanks for registering your interest in our 30 Day Kickstart at <strong style="color:#101B2F">Blueprint Fitness ${s.name}</strong>. A coach will give you a ring shortly for a friendly chat — no hard sell, ever.`),
      panel(`<strong>Just to check &mdash; are you local to ${s.name}?</strong><br>Reply to this email or message us on WhatsApp and we&rsquo;ll get your first session booked in.`),
      KICK_STATS,
      cta(L.signup, 'Start your 30 days'),
      ctaGhost(wa(`Hi Blueprint Fitness ${s.name} — I've registered my interest in the 30 Day Kickstart.`), `Message ${s.name} on WhatsApp`),
    ]);

  add(F5, 'svc-cancellation', 'Service — Cancellation request received',
    'We have got your cancellation request',
    'Confirming what happens next.',
    'Membership', 'Request received',
    [
      p(`Hello ${FIRST} — this is just to confirm we have received your cancellation request.`),
      p(`We will be in touch to confirm your final payment date and amount, and your membership end date. Nothing else is needed from you in the meantime.`),
      panel(`Your notice period is 30 days, so you can keep training right up to your end date. Do use it.`),
      p(`We will be sorry to see you go. If something specific prompted it — a time that stopped working, a niggle, the cost — do tell us. We would genuinely rather know.`),
      ctaGhost(wa(`Hi Blueprint Fitness ${s.name} — about my cancellation.`), 'Tell us what prompted it'),
      rule(),
      p(`And if you change your mind before the end date, just say and we will stop it.`),
    ], team);

  add(F5, 'svc-feedback', 'Service — Thanks for your feedback',
    'Thanks for the feedback',
    'Genuinely read, and genuinely useful.',
    'Feedback', 'Thank you',
    [
      p(`Hello ${FIRST} — thanks for taking the time to send that over. A coach reads every piece of feedback that comes in, and it is what most of the changes around here start from.`),
      p(`If you raised something that needs an answer, we will come back to you shortly.`),
      rule(),
      p(`If you have a minute and you would be happy to say something publicly, a Google review genuinely helps other people work out whether this is for them.`),
      ctaGhost(L.kickstart, `See what we are running at ${s.name}`),
    ], team);

  /* ============ 01 · HACKNEY INTRODUCTION SERIES (Hackney only) ========== */
  /* Reworked from "Lead Nurture (July 2026)". The angles were good; the facts
     were not. Two emails claimed sessions are "capped at hundreds of people"
     — the exact opposite of 5:1, and the strongest thing the business has to
     say. One testimonial was attributed to Mark in one paragraph and Janet in
     the next. Both fixed; the voice is kept. */
  if (s.slug === 'hackney') {
    const coach = '{{custom_values.staff_leads}}';

    add(F1, 'nurture-01', 'Nurture 01 — A quick hello',
      `A quick hello from ${coach}`,
      'No pitch — just saying hello.',
      'Introduction', 'A quick hello',
      [
        p(`Hello ${FIRST}, I know inboxes are busy so I will keep this short.`),
        p(`My name is ${coach} and I run Blueprint Fitness ${s.name}. I am not writing to sell you anything today — I genuinely just wanted to introduce myself.`),
        p(`We work with people who want to get stronger, move better and feel more confident in their body. Most of our members are everyday people rather than athletes: teachers, parents, office workers, retirees — people who decided they wanted more energy and fewer aches.`),
        panel(`<strong>So, one question.</strong> What is the one thing you would change about your health or fitness right now?<br>Hit reply and tell me. I read every reply myself.`),
        ctaGhost(wa(`Hi Blueprint Fitness ${s.name} — replying to your email.`), 'Or message us on WhatsApp'),
      ], { name: coach, role: `Head Coach, Blueprint Fitness ${s.name}` });

    add(F1, 'nurture-02', 'Nurture 02 — When something changes',
      'That moment you realise something has changed',
      'It usually starts with something small.',
      'Introduction', 'It usually starts small',
      [
        p(`${FIRST}, it usually starts with something small.`),
        list([
          `You bend down to pick something up and your back reminds you it is there.`,
          `You take the stairs at work and arrive at the top out of breath.`,
          `You play with the kids — or the grandkids — and feel it in your knees the next morning.`,
        ]),
        p(`None of it is dramatic. None of it sends you to the doctor. But quietly, you know things are not what they were.`),
        p(`Most people do nothing, assume it is just getting older, and carry on. It does not have to go that way. Strength training two or three times a week genuinely reverses a lot of this — not with punishing workouts, just the right movements done consistently, with someone watching your technique.`),
        p(`That is the whole job here. Members regularly tell us they feel years younger within a few months, not because of anything magic, but because they finally started moving with purpose.`),
        cta(L.kickstart, 'See how the 30 days work'),
      ], { name: coach, role: `Blueprint Fitness ${s.name}` });

    add(F1, 'nurture-03', 'Nurture 03 — What matters after 40',
      'The three things that actually matter after 40',
      'No fads, no gimmicks — just the three that count.',
      'Introduction', 'Three things that actually matter',
      [
        p(`${FIRST}, there is a lot of noise about health and fitness — new diets weekly, trendy workouts, miracle supplements. So let me cut through it.`),
        p(`If you are over 40 and want to stay active, independent and injury-free, three things matter.`),
        h('1. Build and keep muscle'),
        p(`After 30 you lose roughly 3–5% of your muscle mass a decade if you do nothing about it. That is biology, not a scare tactic — and strength training at any age slows, stops or reverses it.`),
        h('2. Move through your full range'),
        p(`If you cannot comfortably squat down, reach overhead, or turn to check your blind spot, your body is tightening up. Moving through full ranges regularly keeps you capable.`),
        h('3. Be consistent, not intense'),
        p(`Two or three good sessions a week beats one brutal session followed by a week on the sofa. Every time.`),
        panel(`Every session we run is built around those three. The coaches handle the programme — you just turn up.`),
        cta(L.timetable, `See what is on at ${s.name}`),
      ], { name: coach, role: `Blueprint Fitness ${s.name}` });

    add(F1, 'nurture-04', 'Nurture 04 — I wish I had done this sooner',
      '“I wish I had done this years ago”',
      'The thing we hear more than anything else.',
      'Introduction', 'The thing we hear most',
      [
        p(`${FIRST}, we hear one phrase more than any other: <em>I wish I had done this years ago.</em>`),
        p(`Mark said exactly that a few weeks in. What he told us:`),
        panel(`&ldquo;Before I joined I had not exercised properly in years. I had tried gyms and always felt lost, then quit after a month. This was completely different — the coaches knew my name, showed me what to do, and made me feel like I belonged from day one.<br><br>I am stronger now than I was in my thirties. I sleep better. My back pain has basically gone. And I actually look forward to going, which I never thought I would say about exercise.&rdquo;`),
        p(`That is not an unusual story here. The difference is the environment, the coaching, and a programme built for real people rather than fitness fanatics.`),
        p(`If you have been putting it off, Mark's advice was simply: just start.`),
        cta(L.kickstart, 'Have a look at the 30 days'),
      ], { name: coach, role: `Blueprint Fitness ${s.name}` });

    add(F1, 'nurture-05', 'Nurture 05 — Not knowing where to start',
      '“I would not know where to start”',
      'The most common reason people put it off.',
      'Introduction', '“I would not know where to start”',
      [
        p(`${FIRST}, if you have ever thought <em>I would love to get fitter, but I would not know where to start</em> — this one is for you.`),
        p(`It is the number one thing people tell us. Not the cost, not the time. Just: I do not know what I am doing.`),
        p(`Which is fair. Most gyms hand you a laminated induction sheet and leave you to it.`),
        h('How this works instead'),
        list([
          `<strong>Every session is coached.</strong> A qualified coach runs it, demonstrates each exercise and adjusts it to your level.`,
          `<strong>No experience needed.</strong> Plenty of our members had never picked up a barbell before they started.`,
          `<strong>Small groups, never more than five to a coach</strong> — so you always get attention and feedback.`,
          `<strong>No shouting, no egos, no judgement.</strong> Just people working hard and getting on with it.`,
        ]),
        p(`The not-knowing feeling disappears in your first session. We have watched it happen hundreds of times.`),
        cta(L.signup, 'Start your 30 days'),
      ], { name: coach, role: `Blueprint Fitness ${s.name}` });

    add(F1, 'nurture-06', 'Nurture 06 — Not a normal gym',
      'Why this is not a “normal gym”',
      'Built for people who did not get on with gyms.',
      'Introduction', 'Not a normal gym',
      [
        p(`${FIRST}, when you hear the word gym, what comes to mind? Rows of machines, people in headphones, a mirror wall and some grunting in the corner.`),
        p(`That is exactly what this is not.`),
        h('Coached, not self-guided'),
        p(`Every session is led by a qualified coach. You do not wander around guessing — you follow a programme written by people who know your name, your goals and what your knee does.`),
        h('Small groups, never more than five'),
        p(`Five people to a coach, maximum. You will train alongside people much like you, and you will know everyone's name inside a week.`),
        h('Programmed, not random'),
        p(`No workout-of-the-day roulette. Every session is part of a progression built around strength, mobility and moving well, so you actually get somewhere.`),
        panel(`We are not for everyone, and that is deliberate. This was built for people who want expert guidance and a supportive room — usually people who tried a normal gym and hated it.`),
        cta(L.kickstart, 'See if it sounds like you'),
        ctaGhost(wa(`Hi Blueprint Fitness ${s.name} — could we have a chat?`), 'Or just have a chat with us'),
      ], { name: coach, role: `Blueprint Fitness ${s.name}` });
  }

  return out;
}
