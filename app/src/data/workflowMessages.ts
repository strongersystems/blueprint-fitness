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
    "subject": "{{location.name}} 30 Day Programme",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Applied: 30 Day Email 1",
    "missing": false,
    "text": "Hi {{contact.first_name}}\n\nIt's {{user.first_name}} from {{location.name}}\n\nJust a quick email to let you know we have received your application and promise to be in touch very soon.\n\nHead over to our Instagram Page to find out more about how we can help.\n(Or click the button below)\n\nSpeak soon\n\nNick\n\nInstagram Page\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list or Manage your preference.",
    "links": []
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
    "subject": "\"I have no motivation to go to the gym\"",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Applied: Email 2",
    "missing": false,
    "text": "\"I have no motivation to go to the gym\"\nI hear this all the time, especially with people who have just applied to Blueprint Fitness.\nThe gym is not a motivating place to be, it’s actually quite the opposite.\nEveryone looks like they know what they’re doing\nEveryone looks confident\nAnd everyone looks super fit, so I can see why it is so off-putting.\nOne of the things which will motivate you the most is when you start to see changes in your body.\nBut that will only happen when you’re going to the gym regularly.\nWe make sure that everyone at Blueprint Fitness is friendly, and are there to help one another.\nWe don’t train people who have an ego or are judgemental.\nYou see, once you are feeling comfortable in your environment, you will go to the gym more often.\nAnd when you go to the gym more often you will:\n✅ Have more energy than ever before because you’re sleeping better and getting fitter\n✅ Begin to feel more confident in your clothes because you will see your body transforming\n✅ Start eating healthier because you will want to fuel your body properly\nIt really is a big snowball effect once you get started, and you can get started with us this week on our 30 Day Trial\n➡️ You will train with us 3 x per week at our private gym with a Personal Trainer showing you exactly what to do\n➡️ You will have your own Personal Coach who will help you on the nutrition side. You can message them any day and get help on what to eat.\n➡️ Personalised meal plan to help you with what to eat and how much to eat.\n➡️ All you have to do is just turn up, and we will do the rest, we plan the session, demonstrate all the exercises and encourage you through the 60 minute workouts.\nTo get started this week then Simply Tap Here and secure your spot on our 30 Day Trial\nStu\nBlueprint Fitness\n\nSecure Your Spot\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list.",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 3",
    "subject": "We focus on these 4 things...",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Applied: Email 3",
    "missing": false,
    "text": "Most people that go to the gym are low in confidence and self-esteem, so you would think that gyms would be designed differently.\nInstead they are littered with mirrors, confusing machines, no Personal Trainers, members who love to pose and vending machines.\nAll of the above is not going to do your confident, self-esteem or anxiety any good.\nThat is exactly why at Blueprint Fitness we have:\nNo mirror's or glamorous fitness models on our walls, instead we have Personal Trainers who show you what to do.\n\nNo confusing machines, instead we have weights and Personal Trainers who explain and demonstrate the exercises\n\nPersonal Trainers who walk you through every part of the 60 minute session\n\nA very friendly community of members, in their 30’s-60s who are all on a mission to become fitter and healthier. Whenever we ask for feedback we always get comments on ‘how friendly everyone is’\n\nThe environment is so important to us, and we aim to make our sessions:\n⚡️ Energetic\n😁 Fun/ enjoyable\n😲 Challenging\n💪 Strength and fitness focused\nYou won’t be made to do some ridiculous degrading challenges or be told to run on a treadmill.\nWe meet you where you are now with your strength and fitness and gradually 📈 build you up from there.\nIt really is a big snowball effect once you get started, and you can get started with us this week on our 30 Day Trial.\nYou will train with us 3 x per week at our private gym with a Personal Trainer showing you exactly what to do\n\nAll you have to do is just turn up, and we will do the rest, we plan the session, demonstrate all the exercises and encourage you through the 60 minute workout.\n\nAnd if you struggle with nutrition then we can help with that too with personalised meal plans and a coach you can message daily\n\nTo get started this week then simply Tap Here and secure your spot on our 30 Day Trial.\nStu\nBlueprint Fitness\n\nSecure Your Spot\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list.",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 4",
    "subject": "Blueprint is for complete beginners, here's why!",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Applied: Email 4",
    "missing": false,
    "text": "Blueprint Fitness is for complete beginners\nYes that is correct, most of the people who join Blueprint Fitness are complete beginners.\nYou see, most people have this idea that everyone is super fit.\nBut the truth is that they all started as complete beginners, and they are now fit because they kept attending our Small Group PT sessions 3 x per week.\nAnd the reason they kept attending 3 x per week was because:\nOur members loved the 60 minute session, and how the session went so quickly - no more clock watching\n\nOur members really enjoy having a trainer with them at every session so that they didn’t feel lost in the gym any more\n\nOur members felt motivated when they came in and managed to really push themselves at every session\n\nOur members don’t feel intimidated or judged in any way because we’ve created a positive welcoming environment.\n\nWe don't accept:\n❌ Negative people who bring the mood down - we need our gym to be a positive environment.\n❌ Time-wasters or people full of excuses - we want people who will 100% commit.\n❌ Egotistical or judgemental people - Blueprint Fitness is focussed on creating a welcoming friendly gym.\nSo if you’re looking to join a gym which is friendly and helps you to become fitter, healthier and stronger then join our 30 Day Trial\nReply back to me here if you have any questions, if not you can sign up here.\nStu\nBlueprint Fitness\n\nSecure Your Spot\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list.",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 5",
    "subject": "Blueprint Success Stories - Michelle and Georgia",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Applied: Email 5 - Success Stories",
    "missing": false,
    "text": "I’d love to share a couple of inspiring stories from our members at Blueprint Fitness with you {{contact.first_name}}.\nThese stories are a testament to the transformative and supportive environment we foster here. Both Michelle and Georgia started on the 30 Day Trial!🌟\nMeet Michelle\n\nMeet Georgia\n\nStart Your Own Success Story!\nInspired by Michelle and Georgia?\nYou too can start your transformation journey with us.\nOur 30-Day Trial is the perfect way to experience the supportive and energetic environment at Blueprint Fitness .\n➡️ [Click Here to Start Your 30-Day Trial]\nRemember, every fitness journey is unique, and yours is waiting to be written. We’re here to support you every step of the way!\nLooking forward to seeing you soon,\nStu\nBlueprint: Fitness\n\nSecure Your Spot\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list.",
    "links": [
     {
      "url": "https://www.youtube.com/watch?v&#x3D;1fWvXYyPAWA",
      "health": "ok"
     },
     {
      "url": "https://www.youtube.com/watch?v&#x3D;HTSUYdHnX0c",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "Email 6",
    "subject": "5 Common Hurdles...",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Applied: Email 6 - Common Fitness Hurdles",
    "missing": false,
    "text": "Starting a fitness routine is exciting, but it can be hard too. Let’s talk about some usual problems people face and how to beat them.\nNot Enough Time:\nMany say, “I don’t have time to exercise.” But with some planning, you can find time for short and effective workouts. Try working out in the morning or evening when you might be free.\nStaying Consistent:\nKeeping a steady workout routine is tricky. To stay on track, set simple goals and make a workout plan. And remember, it’s okay to take days off. Celebrate small wins to stay motivated!\nFeeling Judged:\nIt’s normal to feel shy or worried about what others think when you’re new. But remember, everyone at the gym is there to work on themselves, just like you.\nConnect with others, and you’ll see everyone has their own worries.\nConfused About Food:\nUnderstanding what to eat can be hard. Eating a mix of foods that give you energy for workouts and help you recover afterward is key. If you’re not sure, consider talking to a coach or nutrition expert for help with meal planning.\nFinal Thoughts:\nBeating these problems may seem hard, but with some grit and the right help, you can do it. Remember, all gym-goers have faced and beaten these challenges. You’re not alone!\nIf you have questions or need help, feel free to reach out.\nStay strong,\nStu\nBlueprint Fitness\n\n30 Day Trial\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list.",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 7",
    "subject": "Spot The Blueprint Difference?",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Applied: Email 7 - Spot The Difference",
    "missing": false,
    "text": "Ever wondered about Blueprint Fitness unique vibe {{contact.first_name}}?\nAt Blueprint Fitness, you’re never just a number.\nEvery member receives personal attention during each workout.\nYou get help, advice, and answers, always.\nOur community is special.\nIt’s a group of hard-working individuals, all chasing after their goals, just like you.\nThe atmosphere?\nPurely positive and supportive.\nEveryone cheers each other on.\nWe keep equipment simple and easy.\nNo confusing machines or complicated gadgets.\nAnd best yet, our trainers are right there to guide you.\nEvery Session!\nYour goals matter to us.\nWant to get stronger?\nLose weight?\nFeel more energetic?\nWe’re here to support your journey, every step of the way.\nChoosing a gym is a big decision.\nUnderstanding what makes each place special helps.\nAt Blueprint Fitness, it’s about you, the community, simplicity, and your goals.\nGot more questions about life at Blueprint Fitness?\nFeel free to drop us a line.\nStay healthy,\nStu\nBlueprint Fitness\n\n30 Day Trial\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list.",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 8",
    "subject": "Most Common Questions ANSWERED!",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Applied: Email 8 - Common Questions",
    "missing": false,
    "text": "Got questions about Blueprint Fitness {{contact.first_name}}?\nYou’re not alone.\nLet’s clear up some common queries we hear.\nWondering about commitment?\nOur 30-Day Trial is just that - a trial.\nNo strings attached, no hidden clauses.\nJust a full month for you to experience everything Blueprint Fitness offers.\nConcerned about your fitness level?\nWe welcome all levels here, from complete beginners to seasoned gym-goers.\nOur trainers are here to meet you where you are and help you grow from there.\nThinking about the atmosphere?\nBlueprint Fitness is all about positivity and support.\nNo judgment, no ego, just a community working together towards their goals.\nWorried about nutrition?\nWe’ve got you covered with personalized meal plans and nutrition advice to fuel your workouts and recovery.\nCurious about our schedule?\nWe’re open 7 days a week with loads of sessions starting from 6am.\nFlexibility is key, and we offer it.\nDealing with injuries?\nOur trainers are skilled in working around and with various injuries to ensure you can exercise safely and effectively.\nConcerned about parking?\nDon’t be. We offer free parking for all our members, making your trip to Blueprint Fitness hassle-free.\nHave more questions?\nWe’re always here to answer them.\nReply, Tap Here, or give us a call.\nUnderstanding is the first step to commitment.\nWe hope this clears up any doubts or concerns you might have about joining the Blueprint Fitness family.\nLooking forward to your curiosity and excitement,\nStu\nBlueprint Fitness\n\n30 Day Trial\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list.",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 9",
    "subject": "SURPRISE OFFER! Save £££ Today at Blueprint: Fitness",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Applied: Email 9 - Surprise!",
    "missing": false,
    "text": "Hey {{contact.first_name}},\nGuess what? 😍\nWe’ve got something special for you!\nWe know taking the first step can be the hardest.\nSo, we’re making it a little easier.\nKeep Reading To Find Out! 🙌 For a limited time, we’re offering a special '30 Day Kickstart' discount.\nA little nudge to get started on your fitness journey with us.\nBut here’s the catch - it’s a surprise!\n\nIt’s a good one though, I promise.\nTo find out what’s waiting for you, tap the link below.\n\n[Reveal Your Surprise Offer!]\nThis special offer is only available for you for 24 hours!\nSo, don’t wait too long to uncover it.\nWe’re so excited to welcome you to Blueprint Fitness .\nAnd remember, we’re here to support you every step of the way.\n\nCan’t wait to see you,\nStu\nBlueprint Fitness\n\nReveal 30 Day Trial Offer\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list.",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 10",
    "subject": "Last Chance {{contact.first_name}}!",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Applied: Email 10 - Last Chance",
    "missing": false,
    "text": "Time is ticking {{contact.first_name}}, and we don’t want you to miss out\nYour Special Offer ENDS TODAY!\nThis is your final reminder to join our Blueprint Fitness family and start your fitness journey with a bang.\n\nWe’ve seen so many people transform here,\nnot just in body,\nbut in spirit and confidence too.\n\nWe know taking the first step can be a bit scary, but we promise at Blueprint Fitness,\nyou’ll find a supportive community ready to welcome you with open arms.\n\nYour path to a stronger, healthier you is just a click away.\n\n[Sign Up for Your 30-Day Trial Now]\nThis Offer ENDS TODAY\n\nIf you have any last-minute questions or need a little extra nudge,\nwe’re right here to chat.\n\nHope to see you soon and start this exciting journey together.\nWarm wishes,\nStu\nBlueprint Fitness\n\nSPECIAL OFFER: 30 DAY TRIAL\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list.",
    "links": []
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
    "subject": "Hey {{contact.first_name}}",
    "from": "{{custom_values.sales_and_journey}} · {{location.email}}",
    "template": "Reactivation - Email 1",
    "missing": false,
    "text": "Hi {{contact.first_name}}\n\nJust thought I’d check in and see how you’re getting on since you finished with us?\n\nLet me know if you need help with anything.\n\n{{custom_values.sales_and_journey}}",
    "links": []
   },
   {
    "type": "email",
    "name": "Email",
    "subject": "Hope you're well {{contact.first_name}}",
    "from": "{{custom_values.sales_and_journey}} · {{location.email}}",
    "template": "Reactivation - Email 2",
    "missing": false,
    "text": "Hi {{contact.first_name}}\n\nAre you still looking to get in shape?\n\n{{custom_values.sales_and_journey}}",
    "links": []
   },
   {
    "type": "email",
    "name": "Email",
    "subject": "Hope you're well {{contact.first_name}}",
    "from": "{{custom_values.sales_and_journey}} · {{location.email}}",
    "template": "Reactivation - Email 2",
    "missing": false,
    "text": "Hi {{contact.first_name}}\n\nAre you still looking to get in shape?\n\n{{custom_values.sales_and_journey}}",
    "links": []
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
    "subject": "Kickstart Your Nutrition Journey",
    "from": "{{location.name}} · info@blueprintfitnessldn.com",
    "template": "2. KICK-START YOUR NUTRITION JOURNEY IN FIVE EASY STEPS",
    "missing": false,
    "text": "Hi {{contact.first_name}},\nAs part of your 30 day trial, you have access to our team of highly qualified nutrition coaches and to our in depth digital nutrition resource platform.\n\nHere are the five steps that we take to get you started - not all stages are essential, bt the more info we have the better place we will be to help you:\n\nInBody\nThis part is absolutely essential in terms of gathering start point data (most importantly, your BMR). If you haven’t done this yet please chat to one of our coaches on the gym floor or ping Stu a message to get set up.\n\nCalorie Calculator\nHead to our resource centre by clicking the big blue button below, then download and fill in the calorie calculator and email it to us at info@blueprintfitnessldn.com. It’ll give you loads of detail regarding your nutrition requirements which we will run through with you during your consultation.\n\nStart Tracking\nThis will give us an idea of your current calorie and protein consumption, and a breakdown of macronutrients - we usually use the MyFitnessPal app - and insight into what your current habits are, and where we may be able to make some changes around the food choices that you make.\n\nBook your 30 minute kick start consultation\nTo help you get started we’ll get you booked in for a 30 minute consultation with either Paul or Louise. This is going to give us the opportunity to get absolutely clear on your goals and accelerate your results. To get this booked, click the link in the members section.\n\nBlueprint Nutrition Coaching\n\nWithin the nutrition section of the website you’ll also find our Signature Nutrition Programme.\n\nIt has all the essential and in-depth information you need to help double down on your nutrition efforts to really get the most out of your training,and accelerate your results.\n\nThere are 20+ videos for you to work through (pictured above) covering all topics from macronutrients, to fat loss, to understanding calories and adherence tactics.\n\nAs you know, we’re here to help you on every step of your journey - so if there is anything else you need, please give us a shout!\n\nSee you soon!\n\nThe Blueprint Fitness Team\n\nNutrition Video Series\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list or Manage your preference.",
    "links": [
     {
      "url": "https://www.blueprintfitnessldn.com/nutrition-coaching",
      "health": "redirected"
     },
     {
      "url": "https://www.blueprintfitnessldn.com/nutrition-series-videos",
      "health": "redirected"
     }
    ]
   },
   {
    "type": "email",
    "name": "5 Email - Referral Hoodie",
    "subject": "Here's a FREE 30 day kick-start for a friend {{contact.first_name}}?",
    "from": "{{location.name}} · info@blueprintfitnessldn.com",
    "template": "5. REFER A FRIEND FOR FREE AND WIN A HOODIE!",
    "missing": false,
    "text": "Hi {{contact.first_name}},\n\nWe hope you're enjoying your time at Blueprint:Fitness and making the most of your 30-day trial. As a trialist, you've taken the first step towards reaching your fitness goals and as you know, we're here to support you every step of the way.\n\nAnd because we love our trialists, we've got a special treat for you: the \"Golden Ticket\". This is your chance to spread the love and share the fitness feels with someone you care about. That's right; you can gift a free 30-day trial membership to a friend, family member, or colleague.\n\nThey'll have access to all the same perks you have:\n\n· 12 SGPT sessions\n\n· Unlimited TEAM classes\n\n· Inbody composition testing\n\n· Access tour nutrition course\n\n· Any additional support and guidance they need!\n\nImagine how much more fun your workouts will be when you've got your BFF (best fitness friend) by your side… because we all know that friends who train together stay motivated and achieve better results!\n\nTo redeem your Golden Ticket, simply drop us a message with your friend's details and we'll take care of the rest….AND… If your friend decides to sign up as a member after their trial, we’ll give you an exclusive Blueprint:Fitness hoodie! Yay!!\nThank you for being a part of our awesome community, and we can't wait to see you both soon!\nThe Blueprint:Fitness Team\n{{location.email}}\n{{location.phone}}\nblueprintfitnessldn.com\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list or Manage your preference.",
    "links": []
   },
   {
    "type": "email",
    "name": "4 Email - Socials",
    "subject": "Here's why the socials are just as fun as our sessions",
    "from": "{{location.name}} · info@blueprintfitnessldn.com",
    "template": "4. WE’RE MORE THAN JUST A GYM… THE SOCIALS ARE JUST AS FUN AS OUR SESSIONS!",
    "missing": false,
    "text": "Dear {{contact.first_name}}\n\nWe’ve got quite the social scene here at Blueprint:Fitness – and contrary to popular belief, it’s not just people getting on the lash (but a lot of the time it kinda is…)\n\nWe're here to take your fitness journey to the next level! Not only will you be crushing your goals and seeing results, but you'll also have a blast doing it.\n\nHere's a sneak peek of the other epic social activities we have in store for you:\n\n· RESULTS ACCELERATORS: A few times a year, we're all about pushing ourselves to the limit with 50-day challenges and months dedicated to reaching big personal milestones, such as \"March Madness\" or \"Smash-tember\".\n\n· ADVENTURE CLUB: This one is for more fitness focused excursions. We’ll be conquering Tough Mudder, Nuclear Races, and half marathons all year round! And you guessed it, we'll be toasting our victories with beers.\n\n· SUMMER GAMES & XMAS GAMES: Get ready to team up and unleash your competitive side! This month-long series of games and challenges will bring out your inner athlete, with a leader board and tons of fun!\n\n· SPORTS DAYS: We're talking golf society days and 7-a-side football comps, all ending with a cold beer in hand.\n\n· PARTIES: Whether it's for Christmas, summer, a members' birthday or just a random Saturday, we're always down for a good party! And what better way to celebrate than with a few beers and good company?\n\n· LIVE DJ SESSIONS: Get ready to sweat it out to some sick beats as we bring in a DJ to crank up the tunes during your workouts.\n\n· RUNNING GROUP: This one is for the runners, we plot out and share local running routes and have member meet ups and the annual big group run on Boxing Day.\n\nWe have various groups for these events as they arise but this is the main group for social activity… its run by the members and is generally where all the fun stuff happens:\n\nJoin the socials group!\n\nSo, what are you waiting for? Join us and get ready to have a blast!\nSee you soon!\nThe Blueprint:Fitness Team\n{{location.email}}\n{{location.phone}}\nblueprintfitnessldn.com\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list or Manage your preference.",
    "links": [
     {
      "url": "https://chat.whatsapp.com/HceQ7PUzCT94kSUOfOFMfp",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "3 Email - Best Results?",
    "subject": "Which of our sessions and programmes will get you the best results?",
    "from": "{{location.name}} · info@blueprintfitnessldn.com",
    "template": "3. WHICH OF OUR PROGRAMS WILL GET YOU THE BEST RESULTS?",
    "missing": false,
    "text": "Hi {{contact.first_name}},\nYou may have noticed different members following different programs, which may look a little confusing – but there is method (mainly science) to the madness.\nOur priority with programming is to create an environment that helps our members achieve the best results. So whatever the goal may be, in terms of fat loss, strength, general fitness, getting leaner, dropping a dress size, or for performance… We have a pathway that will absolutely get you there.\nIt’s important for you to know, and to understand everything about the programs and the classes so that you can make informed decisions regarding which sessions and which pathway will maximise your results.\nHaving two SGPT programs options that run side by side is how we truly bespoke your Blueprint journey, and as the old saying goes; “The problem with the one size fits all approach is that everyone ends up with the wrong trousers”\nThey are called ‘Shape’ and ‘Strength. Here’s the lowdown:\nThe Shape program focuses on body composition, and the primary aim is to simultaneously reduce muscle mass whilst maintaining or increasing muscle mass therefore making you look more athletic, or ‘toned’.\nShape cycles through different protocols of resistance training, such as hypertrophy (3-4 sets of 8-12 reps), high volume (more sets and/or 12-15 reps) or might follow a TUT (time under tension) protocol where we play around with different tempos per rep.\nThe Strength program is geared towards people that want to build muscle, reduce body fat and generally get as strong as an ox.\nHere we focus on lower rep ranges (usually 4-6) so that we can lift heavier and increase strength through the big compound moves like deadlifts, squats, bench press and pull ups.\nThere are two videos here to watch that will tell you everything there is to know about SGPT and TEAM training programming and sessions:\n1. Programming overview\nThis one takes you through a whole years’ worth of programming, how the 12 week cycles play out and are broken down onto phases and – most importantly – why this is beneficial to you.\nCLICK HERE FOR THE PROGRAM VIDEO!\n2. TEAM training\nThis one gives you an insight into the six different formats of TEAM classes that we run, will breakdown the objectives for each session and how to work them in alongside the SGPT sessions.\nCLICK HERE FOR THE TEAM TRAINING GUIDE!\nIf you have any questions please give us a shout. But rest assured, now that you’re part of the Blueprint community, the days of aimlessly walking into a gym and not knowing what to do are well and truly behind you!\nSee you soon!\nThe Blueprint:Fitness Team\n{{location.email}}\n{{location.phone}}\nblueprintfitnessldn.com\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list or Manage your preference.",
    "links": [
     {
      "url": "https://youtu.be/hNFiW_psTcM",
      "health": "ok"
     },
     {
      "url": "https://youtu.be/65rLPUtKjYA",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "6. Price List",
    "subject": "What happens after your trial?",
    "from": "Stuart Rook · hackney@blueprintfitnessldn.com",
    "template": "6. WHAT HAPPENS AFTER YOUR TRIAL?",
    "missing": false,
    "text": "Hey there, {{contact.first_name}}!\n\nWe hope you've been enjoying your 30-day trial at Blueprint:Fitness! As your trial period is coming towards the end, we wanted to reach out and give you a quick reminder about a couple of things;\n\nFirstly, if you haven't already, it's time to start thinking about becoming a full time member of our awesome fitness community. We offer a range of memberships to suit your goals, your lifestyle and your budget. Stu and/or Paul will be happy to guide you through our membership options and help you choose the best one for you:\n\nIf you’re ready to join, simply click this:\n\nJoin Blueprint:Fitness\n\nSecondly, we'd like to remind you about your results check-in. We're all about tracking progress and celebrating achievements here at Blueprint:Fitness, so don't forget to book your InBody review with one of our coaches!\nWe love seeing people who come to us initially looking for body composition changes and the gradual increases in strength, fitness, confidence and mentality… but this check in is a great opportunity to reflect on how far you've come, set new goals, and get some expert advice on how to continue making progress.\nSo what are you waiting for? Take the next step and become a member of our awesome fitness community today!\nThank you for choosing Blueprint:Fitness for your fitness journey, and we hope to see you soon!\nThe Blueprint:Fitness Team\n{{location.email}}\n{{location.phone}}\nblueprintfitnessldn.com\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list or Manage your preference.",
    "links": [
     {
      "url": "https://goteamup.com/p/13219223-blueprint-fitness-hackney/memberships/",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "7. Email",
    "subject": "What is it like to be a full time Blueprint Fitness member?",
    "from": "{{location.name}} · hackney@blueprintfitnessldn.com",
    "template": "7. WHAT IS IT LIKE TO BE A FULL TIME BLUEPRINT:FITNESS MEMBER",
    "missing": false,
    "text": "Dear {{contact.first_name}},\n\nNow that you’re getting deep into your trial period and are fully integrated into Blueprint way of life, you might be wondering how it feels to be a long term member.\n\nThe 30-day trial period is the perfect amount of time for you to test-drive the classes and the coaches, and most importantly to get into the habit of (and enjoying) regular exercise… don't worry, we won't hold it against you if you've been secretly crying in the corner during burpees (we've all been there).\n\nWhen we jump back onto the inbody, we’ll definitely see some progress but the big composition, health and fitness changes – the truly sustainable results - come from consistency and long term behaviour change, which can be summed up nicely in this excellent quote:\n\n“The key – if you want to build habits that last – is to join a group where your desired behaviour, is their normal behaviour” – JAMES CLEAR, Atomic Habits\n\nNo-one is better qualified to tell you about the longer term B:F experience than our members. So here is a google review from Kiran:\n\nBlueprint: “a detailed outline or plan of action: a blueprint for success”\n\n“I joined Blueprint Fitness exactly a year ago and wanted to write a review of my experience. I am not one to write reviews frequently, only when something truly warrants it.\n\nHaving been a member of David Lloyds and Virgin Active for many years previously, Blueprint Fitness came as a total surprise to me.\n\nTrust me, this gym hits different in so many ways. The classes are made up of small group personal training sessions as well as other fantastic classes such as METCON, Sweat and Tough Guy. Each aspect of the training sessions is very well thought out, so when you walk through those doors, you know that you are in good hands. There are plenty of time slots to choose from during the day so it’s easy to fit into your life.\n\nI have learnt so much about the importance of good form, progressive overloading, strength training etc. Aside from the exercise, I have learnt a whole bunch of other stuff. The coaches really assist you with nutrition, which is very important if you want to get good results. I have learnt about body composition which again, I had no clue of. We use an Inbody machine at Blueprint to determine your percentage body fat, muscle mass etc. The coaches are at hand to help you decipher the results and to help you improve upon them.\n\nDuring the course of the year there are so many fun activities such as the summer games, hikes, winter games as well as the 50 Day challenges that really help you hone in on the targets that you wish to achieve.\n\nI have met so many wonderful people at Blueprint that inspire me to do better and encourage me. We have accountability groups, and this is so helpful as we can swap ideas etc. There are many socials that go on during the year that it makes you feel included. The Coaches are absolutely fantastic and very encouraging. The owners have put their blood and sweat (literally) into making it a very special experience for all members. They work tirelessly to ensure that you are getting the most out of your membership. They really do care about you reaching your goals and are very knowledgeable. You will never get the same experience at a generic gym.\n\nMy results have also been epic. I have lost 11% of my percentage body fat and over 6kg in weight during the past year. My mind-set has also completely changed as my lifestyle has changed. I take any opportunity to walk and lift heavy things (outside of the gym) which I would never dream of doing before. I am far more active than I have ever been because I feel motivated when I leave the gym. As a result of joining Blueprint, I am more focused in other aspects of my life. My husband and kids are astounded by the difference and my eldest son who is a gym freak now gives me kudos, which is a result in itself!\n\nIf you want excellent results and have fun whilst achieving the them, then this is the gym for you. One warning though, it’s addictive! You will feel the buzz and the energy (which is really important to me) when you enter the gym and guaranteed, you will leave with a smile and a spring in your step for the rest of the day.\n\nIt is no surprise to me that the gym has been shortlisted for the best gym in the area and I hope that we win!”\n\nIf you’d like to see what our members say about us, CLICK HERE to see a few more google reviews.\n\nSee you soon!\n\nThe Blueprint:Fitness Team\n\ninfo@blueprintfitnessldn.com\n\n07736 033 985 // 07855 353 798\n\nblueprintfitnessldn.com\n\nJoin Blueprint:Fitness\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list or Manage your preference.",
    "links": [
     {
      "url": "https://www.google.com/search?sa=X&rlz=1C1CHBF_en-GBGB886GB886&sxsrf=AJOqlzVpomZirZw4TL8XZFxrjPoY9wMwSA:1677187001407&q=blueprint%20fitness%20google%20reviews&ved=2ahUKEwi9hsO7yKz9AhVhSEEAHbxmD3oQvS56BAhDEAE&biw=1366&bih=657&dpr=1&tbs=lf:1,lf_ui:14&tbm=lcl&rflfq=1&num=10&rldimm=16491884207935991094&lqi=CiBibHVlcHJpbnQgZml0bmVzcyBnb29nbGUgcmV2aWV3cyIFOAGIAQFIi8ydiIqrgIAIWhsQABABGAAYASIRYmx1ZXByaW50IGZpdG5lc3OSARBwZXJzb25hbF90cmFpbmVymgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVVJQYzBwVU0waG5FQUU&rlst=f#rlfi=hd:;si:16491884207935991094,l,CiBibHVlcHJpbnQgZml0bmVzcyBnb29nbGUgcmV2aWV3cyIFOAGIAQFIi8ydiIqrgIAIWhsQABABGAAYASIRYmx1ZXByaW50IGZpdG5lc3OSARBwZXJzb25hbF90cmFpbmVymgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVVJQYzBwVU0waG5FQUU;mv:[[51.6727992,0.049006999999999995],[51.5904283,-0.1894718]];tbs:lrf:!1m4!1u3!2m2!3m1!1e1!1m4!1u2!2m2!2m1!1e1!2m1!1e2!2m1!1e3!3sIAE,lf:1,lf_ui:14",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     },
     {
      "url": "https://goteamup.com/p/13219223-blueprint-fitness-hackney/memberships/",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "8. Email Thankyou Legend",
    "subject": "Thankyou for taking on our 30 Day Trial, you absolute legend!",
    "from": "{{location.name}} · hackney@blueprintfitnessldn.com",
    "template": "8. THANK YOU!",
    "missing": false,
    "text": "Hi {{contact.first_name}},\n\nWhere on earth have these last 30 days gone?\n\nWe hope that you've been feeling the results of your hard work – after all, with all the blood, sweat, and burpees you've been putting in, you're practically superhuman by now! You've pushed through the pain, embraced the grind, and come out the other side with buns of steel and guns of iron. Bravo, my friend!\n\nAs your trial draws to a close, we'd like to remind you about the InBody check that you have access to. This will give us a better understanding of how your body has changed over the past 30 days and help us tailor our training program to your needs moving forwards.\n\nWe want to say a big thank you for choosing Blueprint Fitness and entrusting us with your fitness journey. We hope that you've enjoyed the blood, sweat, and burpees as much as we have (or at least tolerated them), and we can't wait to see you continue to smash your goals with us.\n\nIf you have any questions or concerns, please don't hesitate to reach out – we're always here to help. Now go enjoy a well-deserved protein shake (or a pint, we won't judge).\n\nAnd lastly, if you’re ready to sign up as s full member here’s that link again:\n\nClick here to join!\n\nSee you soon!\nThe Blueprint:Fitness Team\n{{location.email}}\n{{location.phone}}\nblueprintfitnessldn.com\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list or Manage your preference.",
    "links": [
     {
      "url": "https://goteamup.com/p/13219223-blueprint-fitness-hackney/memberships/",
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
    "subject": "{{location.name}} 30 Day Programme",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Applied: 30 Day Email 1",
    "missing": false,
    "text": "Hi {{contact.first_name}}\n\nIt's {{user.first_name}} from {{location.name}}\n\nJust a quick email to let you know we have received your application and promise to be in touch very soon.\n\nHead over to our Instagram Page to find out more about how we can help.\n(Or click the button below)\n\nSpeak soon\n\nNick\n\nInstagram Page\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list or Manage your preference.",
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
    "subject": "Nutrition Consultation Request",
    "from": "Blueprint Fitness Nutrition Team · info@blueprintfitnessldn.com",
    "template": "Nutrition Consultation Request Response",
    "missing": false,
    "text": "Hi {{contact.first_name}}\n\nWe have received your request for nutritional help as part of your 30 Day trial with Blueprint Fitness & will be delighted to help you!\n\nAs part of your trial you get a 30 minute consultation where we can talk through your goal and plan a strategy to help achieve results.\n\nWe can do this consultation via Zoom or face to face but there is a lot more availability if we do this via Zoom. In order to maximise your time during the consultation there are some things you can prior to this by following the nutrition pathway on our website here\n\nBF Nutrition Coaching\n\nIt involves making sure the following have been completed\n\nInbody machine in HQ - You will require the Inbody App\n\nCalorie calculator spreadsheet from the website\n\nFood diary - setting up with Nutracheck and recording 3 to 5 days of food and drinks\n\nGoal setting - Starting to build up a set of both body comp and fitness goals to work towards\n\nStep tracking - Using either a phone or wearable to measure activity via steps\n\nSleep tracking - a basic diary of how much sleep you are getting\n\nIt isn't compulsary to have completed the above before your consultation, but the more details you provide us with intially the better your stratery / plan can be.\n\nIf you have completed the above and are ready to start then please reply to this email and we will book you in!",
    "links": [
     {
      "url": "https://www.blueprintfitnessldn.com/nutrition-coaching",
      "health": "redirected"
     },
     {
      "url": "https://www.nutracheck.co.uk/Home",
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
    "subject": "{{location.name}} 30 Day Programme",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Applied: 30 Day Email 1",
    "missing": false,
    "text": "Hi {{contact.first_name}}\n\nIt's {{user.first_name}} from {{location.name}}\n\nJust a quick email to let you know we have received your application and promise to be in touch very soon.\n\nHead over to our Instagram Page to find out more about how we can help.\n(Or click the button below)\n\nSpeak soon\n\nStu\n\nInstagram Page\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list.",
    "links": []
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
    "subject": "\"I have no motivation to go to the gym\"",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Applied: Email 2",
    "missing": false,
    "text": "\"I have no motivation to go to the gym\"\nI hear this all the time, especially with people who have just applied to Blueprint Fitness.\nThe gym is not a motivating place to be, it’s actually quite the opposite.\nEveryone looks like they know what they’re doing\nEveryone looks confident\nAnd everyone looks super fit, so I can see why it is so off-putting.\nOne of the things which will motivate you the most is when you start to see changes in your body.\nBut that will only happen when you’re going to the gym regularly.\nWe make sure that everyone at Blueprint Fitness is friendly, and are there to help one another.\nWe don’t train people who have an ego or are judgemental.\nYou see, once you are feeling comfortable in your environment, you will go to the gym more often.\nAnd when you go to the gym more often you will:\n✅ Have more energy than ever before because you’re sleeping better and getting fitter\n✅ Begin to feel more confident in your clothes because you will see your body transforming\n✅ Start eating healthier because you will want to fuel your body properly\nIt really is a big snowball effect once you get started, and you can get started with us this week on our 30 Day Trial\n➡️ You will train with us 3 x per week at our private gym with a Personal Trainer showing you exactly what to do\n➡️ You will have your own Personal Coach who will help you on the nutrition side. You can message them any day and get help on what to eat.\n➡️ Personalised meal plan to help you with what to eat and how much to eat.\n➡️ All you have to do is just turn up, and we will do the rest, we plan the session, demonstrate all the exercises and encourage you through the 60 minute workouts.\nTo get started this week then Simply Tap Here and secure your spot on our 30 Day Trial\nStu\nBlueprint Fitness\n\nSecure Your Spot\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list.",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 3",
    "subject": "We focus on these 4 things...",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Applied: Email 3",
    "missing": false,
    "text": "Most people that go to the gym are low in confidence and self-esteem, so you would think that gyms would be designed differently.\nInstead they are littered with mirrors, confusing machines, no Personal Trainers, members who love to pose and vending machines.\nAll of the above is not going to do your confident, self-esteem or anxiety any good.\nThat is exactly why at Blueprint Fitness we have:\nNo mirror's or glamorous fitness models on our walls, instead we have Personal Trainers who show you what to do.\n\nNo confusing machines, instead we have weights and Personal Trainers who explain and demonstrate the exercises\n\nPersonal Trainers who walk you through every part of the 60 minute session\n\nA very friendly community of members, in their 30’s-60s who are all on a mission to become fitter and healthier. Whenever we ask for feedback we always get comments on ‘how friendly everyone is’\n\nThe environment is so important to us, and we aim to make our sessions:\n⚡️ Energetic\n😁 Fun/ enjoyable\n😲 Challenging\n💪 Strength and fitness focused\nYou won’t be made to do some ridiculous degrading challenges or be told to run on a treadmill.\nWe meet you where you are now with your strength and fitness and gradually 📈 build you up from there.\nIt really is a big snowball effect once you get started, and you can get started with us this week on our 30 Day Trial.\nYou will train with us 3 x per week at our private gym with a Personal Trainer showing you exactly what to do\n\nAll you have to do is just turn up, and we will do the rest, we plan the session, demonstrate all the exercises and encourage you through the 60 minute workout.\n\nAnd if you struggle with nutrition then we can help with that too with personalised meal plans and a coach you can message daily\n\nTo get started this week then simply Tap Here and secure your spot on our 30 Day Trial.\nStu\nBlueprint Fitness\n\nSecure Your Spot\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list.",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 4",
    "subject": "Blueprint is for complete beginners, here's why!",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Applied: Email 4",
    "missing": false,
    "text": "Blueprint Fitness is for complete beginners\nYes that is correct, most of the people who join Blueprint Fitness are complete beginners.\nYou see, most people have this idea that everyone is super fit.\nBut the truth is that they all started as complete beginners, and they are now fit because they kept attending our Small Group PT sessions 3 x per week.\nAnd the reason they kept attending 3 x per week was because:\nOur members loved the 60 minute session, and how the session went so quickly - no more clock watching\n\nOur members really enjoy having a trainer with them at every session so that they didn’t feel lost in the gym any more\n\nOur members felt motivated when they came in and managed to really push themselves at every session\n\nOur members don’t feel intimidated or judged in any way because we’ve created a positive welcoming environment.\n\nWe don't accept:\n❌ Negative people who bring the mood down - we need our gym to be a positive environment.\n❌ Time-wasters or people full of excuses - we want people who will 100% commit.\n❌ Egotistical or judgemental people - Blueprint Fitness is focussed on creating a welcoming friendly gym.\nSo if you’re looking to join a gym which is friendly and helps you to become fitter, healthier and stronger then join our 30 Day Trial\nReply back to me here if you have any questions, if not you can sign up here.\nStu\nBlueprint Fitness\n\nSecure Your Spot\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list.",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 5",
    "subject": "Blueprint Success Stories - Michelle and Georgia",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Applied: Email 5 - Success Stories",
    "missing": false,
    "text": "I’d love to share a couple of inspiring stories from our members at Blueprint Fitness with you {{contact.first_name}}.\nThese stories are a testament to the transformative and supportive environment we foster here. Both Michelle and Georgia started on the 30 Day Trial!🌟\nMeet Michelle\n\nMeet Georgia\n\nStart Your Own Success Story!\nInspired by Michelle and Georgia?\nYou too can start your transformation journey with us.\nOur 30-Day Trial is the perfect way to experience the supportive and energetic environment at Blueprint Fitness .\n➡️ [Click Here to Start Your 30-Day Trial]\nRemember, every fitness journey is unique, and yours is waiting to be written. We’re here to support you every step of the way!\nLooking forward to seeing you soon,\nStu\nBlueprint: Fitness\n\nSecure Your Spot\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list.",
    "links": [
     {
      "url": "https://www.youtube.com/watch?v&#x3D;1fWvXYyPAWA",
      "health": "ok"
     },
     {
      "url": "https://www.youtube.com/watch?v&#x3D;HTSUYdHnX0c",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "Email 6",
    "subject": "5 Common Hurdles...",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Applied: Email 6 - Common Fitness Hurdles",
    "missing": false,
    "text": "Starting a fitness routine is exciting, but it can be hard too. Let’s talk about some usual problems people face and how to beat them.\nNot Enough Time:\nMany say, “I don’t have time to exercise.” But with some planning, you can find time for short and effective workouts. Try working out in the morning or evening when you might be free.\nStaying Consistent:\nKeeping a steady workout routine is tricky. To stay on track, set simple goals and make a workout plan. And remember, it’s okay to take days off. Celebrate small wins to stay motivated!\nFeeling Judged:\nIt’s normal to feel shy or worried about what others think when you’re new. But remember, everyone at the gym is there to work on themselves, just like you.\nConnect with others, and you’ll see everyone has their own worries.\nConfused About Food:\nUnderstanding what to eat can be hard. Eating a mix of foods that give you energy for workouts and help you recover afterward is key. If you’re not sure, consider talking to a coach or nutrition expert for help with meal planning.\nFinal Thoughts:\nBeating these problems may seem hard, but with some grit and the right help, you can do it. Remember, all gym-goers have faced and beaten these challenges. You’re not alone!\nIf you have questions or need help, feel free to reach out.\nStay strong,\nStu\nBlueprint Fitness\n\n30 Day Trial\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list.",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 7",
    "subject": "Spot The Blueprint Difference?",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Applied: Email 7 - Spot The Difference",
    "missing": false,
    "text": "Ever wondered about Blueprint Fitness unique vibe {{contact.first_name}}?\nAt Blueprint Fitness, you’re never just a number.\nEvery member receives personal attention during each workout.\nYou get help, advice, and answers, always.\nOur community is special.\nIt’s a group of hard-working individuals, all chasing after their goals, just like you.\nThe atmosphere?\nPurely positive and supportive.\nEveryone cheers each other on.\nWe keep equipment simple and easy.\nNo confusing machines or complicated gadgets.\nAnd best yet, our trainers are right there to guide you.\nEvery Session!\nYour goals matter to us.\nWant to get stronger?\nLose weight?\nFeel more energetic?\nWe’re here to support your journey, every step of the way.\nChoosing a gym is a big decision.\nUnderstanding what makes each place special helps.\nAt Blueprint Fitness, it’s about you, the community, simplicity, and your goals.\nGot more questions about life at Blueprint Fitness?\nFeel free to drop us a line.\nStay healthy,\nStu\nBlueprint Fitness\n\n30 Day Trial\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list.",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 8",
    "subject": "Most Common Questions ANSWERED!",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Applied: Email 8 - Common Questions",
    "missing": false,
    "text": "Got questions about Blueprint Fitness {{contact.first_name}}?\nYou’re not alone.\nLet’s clear up some common queries we hear.\nWondering about commitment?\nOur 30-Day Trial is just that - a trial.\nNo strings attached, no hidden clauses.\nJust a full month for you to experience everything Blueprint Fitness offers.\nConcerned about your fitness level?\nWe welcome all levels here, from complete beginners to seasoned gym-goers.\nOur trainers are here to meet you where you are and help you grow from there.\nThinking about the atmosphere?\nBlueprint Fitness is all about positivity and support.\nNo judgment, no ego, just a community working together towards their goals.\nWorried about nutrition?\nWe’ve got you covered with personalized meal plans and nutrition advice to fuel your workouts and recovery.\nCurious about our schedule?\nWe’re open 7 days a week with loads of sessions starting from 6am.\nFlexibility is key, and we offer it.\nDealing with injuries?\nOur trainers are skilled in working around and with various injuries to ensure you can exercise safely and effectively.\nConcerned about parking?\nDon’t be. We offer free parking for all our members, making your trip to Blueprint Fitness hassle-free.\nHave more questions?\nWe’re always here to answer them.\nReply, Tap Here, or give us a call.\nUnderstanding is the first step to commitment.\nWe hope this clears up any doubts or concerns you might have about joining the Blueprint Fitness family.\nLooking forward to your curiosity and excitement,\nStu\nBlueprint Fitness\n\n30 Day Trial\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list.",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 9",
    "subject": "SURPRISE OFFER! Save £££ Today at Blueprint: Fitness",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Applied: Email 9 - Surprise!",
    "missing": false,
    "text": "Hey {{contact.first_name}},\nGuess what? 😍\nWe’ve got something special for you!\nWe know taking the first step can be the hardest.\nSo, we’re making it a little easier.\nKeep Reading To Find Out! 🙌 For a limited time, we’re offering a special '30 Day Kickstart' discount.\nA little nudge to get started on your fitness journey with us.\nBut here’s the catch - it’s a surprise!\n\nIt’s a good one though, I promise.\nTo find out what’s waiting for you, tap the link below.\n\n[Reveal Your Surprise Offer!]\nThis special offer is only available for you for 24 hours!\nSo, don’t wait too long to uncover it.\nWe’re so excited to welcome you to Blueprint Fitness .\nAnd remember, we’re here to support you every step of the way.\n\nCan’t wait to see you,\nStu\nBlueprint Fitness\n\nReveal 30 Day Trial Offer\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list.",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 10",
    "subject": "Last Chance {{contact.first_name}}!",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Applied: Email 10 - Last Chance",
    "missing": false,
    "text": "Time is ticking {{contact.first_name}}, and we don’t want you to miss out\nYour Special Offer ENDS TODAY!\nThis is your final reminder to join our Blueprint Fitness family and start your fitness journey with a bang.\n\nWe’ve seen so many people transform here,\nnot just in body,\nbut in spirit and confidence too.\n\nWe know taking the first step can be a bit scary, but we promise at Blueprint Fitness,\nyou’ll find a supportive community ready to welcome you with open arms.\n\nYour path to a stronger, healthier you is just a click away.\n\n[Sign Up for Your 30-Day Trial Now]\nThis Offer ENDS TODAY\n\nIf you have any last-minute questions or need a little extra nudge,\nwe’re right here to chat.\n\nHope to see you soon and start this exciting journey together.\nWarm wishes,\nStu\nBlueprint Fitness\n\nSPECIAL OFFER: 30 DAY TRIAL\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list.",
    "links": []
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
    "subject": "Your Super Quick Guide To Getting Started⚡",
    "from": "Stuart Rook · info@blueprintfitnessldn.com",
    "template": "1. YOUR SUPER QUICK GUIDE TO GETTING STARTED",
    "missing": false,
    "text": "We're thrilled to have you onboard!\n\nDear {{contact.first_name}},\nWe're thrilled to have you on board with Blueprint:Fitness!\nOver the next 30 days, you'll have the chance to experience all we have to offer and see just how far you can go. With our help, you'll make positive changes in your health and wellness and connect with amazing people along the way.\nWhat's next, you may ask?\nThe first step is to get setup on TeamUp (the booking system)\nhttps://goteamup.com/p/9748082-blueprint-fitness-leytons/\n\n1. Admin: We'll verify your account set up in TeamUp and provide you with an overview of our classes so you know what to expect when you book.\n2. Inbody Body Composition Testing: We'll use the Inbody tracker to gather some baseline data about your muscle mass, body fat mass and percentage, BMR, BMI, and visceral fat. We have 1 InBody machine between our Leytonstone and South Woodford Gyms - ask a coach at your first session where you can next get yours done.\n3. Please take a moment to review our booking system guidelines to ensure fairness for all members. The guidelines can be found by clicking HERE.\n4. If you are Post Natal, have specific injuries or conditions we should be aware of, please notify us on our WhatsApp\nWhatsApp Number: 07947 790035\nWe've attached your welcome pack to this email, which has more information about our business, classes, and community.\nThank you for joining us. We can't wait to see you on the gym floor soon!\nBest regards,\nThe Blueprint:Fitness Team\ninfo@blueprintfitnessldn.com\n07736 033 985 // 07855 353 798\nblueprintfitnessldn.com\nP.S. Staying connected is essential, so we've created a WhatsApp group for all members. This is where you'll find important updates and information about sessions, classes, social events, general fitness and nutrition.\n\nHere’s the invite:\n\nJoin WhatsApp Group\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list.",
    "links": [
     {
      "url": "https://goteamup.com/p/9748082-blueprint-fitness-leytons/",
      "health": "ok"
     },
     {
      "url": "https://www.blueprintfitnessldn.com/teamup",
      "health": "redirected"
     },
     {
      "url": "https://wa.me/447947790035",
      "health": "ok"
     },
     {
      "url": "https://blueprintfitnessldn.com",
      "health": "ok"
     },
     {
      "url": "https://chat.whatsapp.com/C5sR6x0WORVFUXEiSoLudO",
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
    "subject": "Hey {{contact.first_name}}",
    "from": "{{custom_values.sales_and_journey}} · {{location.email}}",
    "template": "Reactivation - Email 1",
    "missing": false,
    "text": "Hi {{contact.first_name}}\n\nJust thought I’d check in and see how you’re getting on since you finished with us?\n\nLet me know if you need help with anything.\n\n{{custom_values.sales_and_journey}}",
    "links": []
   },
   {
    "type": "email",
    "name": "Email",
    "subject": "Hope you're well {{contact.first_name}}",
    "from": "{{custom_values.sales_and_journey}} · {{location.email}}",
    "template": "Reactivation - Email 2",
    "missing": false,
    "text": "Hi {{contact.first_name}}\n\nAre you still looking to get in shape?\n\n{{custom_values.sales_and_journey}}",
    "links": []
   },
   {
    "type": "email",
    "name": "Email",
    "subject": "Hope you're well {{contact.first_name}}",
    "from": "{{custom_values.sales_and_journey}} · {{location.email}}",
    "template": "Reactivation - Email 2",
    "missing": false,
    "text": "Hi {{contact.first_name}}\n\nAre you still looking to get in shape?\n\n{{custom_values.sales_and_journey}}",
    "links": []
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
  "workflow": "20 Insights",
  "folder": "",
  "status": "draft",
  "triggers": [],
  "steps": [
   {
    "type": "email",
    "name": "Email 1",
    "subject": "Why Starting Is Like Climbing a Mountain... Barefoot",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 2",
    "subject": "The Tortoise, The Hare, and Your Fitness Journey",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 3",
    "subject": "Your Fitness Journey Isn't a Microwave Dinner",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 4",
    "subject": "Your Fitness Journey Isn't a Race Against Anyone Else",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 5",
    "subject": "The Lidl Middle Aisle Syndrome & Your Fitness Goals",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 6",
    "subject": "The Art of Becoming You",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 7",
    "subject": "The Secret Sauce to Your Fitness - No, It's Not More Burpees",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 8",
    "subject": "The REAL Reason We Train After 30",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 9",
    "subject": "9. The Truth About Losing Weight - No Treadmill or Hours of Cardio Required",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 10",
    "subject": "10. Overthinkers need to read this.",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 11",
    "subject": "The Unlikely Champion of the Sitting Olympics",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 12",
    "subject": "If Your Get Up And Go Got Up And Went…",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 13",
    "subject": "Gadgets & Apps: The Fitness Game Changer or Just Shiny Distractions?",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 14",
    "subject": "Protein Absorption Is Key",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 15",
    "subject": "The 2-Minute Rule: Small Steps, Big Wins",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 16",
    "subject": "Stop Saving the Party Poppers for Retirement",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 17",
    "subject": "The Myth of \"No Pain, No Gain\"",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 18",
    "subject": "Age Makes Fitness Non-Negotiable",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 19",
    "subject": "Your Compass",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 20",
    "subject": "Your Compass",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 21",
    "subject": "New Levels Unlocked! Your Mission, Should You Choose To Accept...",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
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
    "subject": "Kickstart Your Nutrition Journey",
    "from": "{{location.name}} · info@blueprintfitnessldn.com",
    "template": "2. KICK-START YOUR NUTRITION JOURNEY IN FIVE EASY STEPS",
    "missing": false,
    "text": "Hi {{contact.first_name}},\nAs part of your 30 day trial, you have access to our team of highly qualified nutrition coaches and to our in depth digital nutrition resource platform.\n\nHere are the five steps that we take to get you started - not all stages are essential, bt the more info we have the better place we will be to help you:\n\nInBody\nThis part is absolutely essential in terms of gathering start point data (most importantly, your BMR). If you haven’t done this yet please chat to one of our coaches on the gym floor or ping Stu a message to get set up.\n\nCalorie Calculator\nHead to our resource centre by clicking the big blue button below, then download and fill in the calorie calculator and email it to us at info@blueprintfitnessldn.com. It’ll give you loads of detail regarding your nutrition requirements which we will run through with you during your consultation.\n\nStart Tracking\nThis will give us an idea of your current calorie and protein consumption, and a breakdown of macronutrients - we usually use the MyFitnessPal app - and insight into what your current habits are, and where we may be able to make some changes around the food choices that you make.\n\nBook your 30 minute kick start consultation\nTo help you get started we’ll get you booked in for a 30 minute consultation with either Paul or Louise. This is going to give us the opportunity to get absolutely clear on your goals and accelerate your results. To get this booked, click the link in the members section.\n\nBlueprint Nutrition Coaching\n\nWithin the nutrition section of the website you’ll also find our Signature Nutrition Programme.\n\nIt has all the essential and in-depth information you need to help double down on your nutrition efforts to really get the most out of your training,and accelerate your results.\n\nThere are 20+ videos for you to work through (pictured above) covering all topics from macronutrients, to fat loss, to understanding calories and adherence tactics.\n\nAs you know, we’re here to help you on every step of your journey - so if there is anything else you need, please give us a shout!\n\nSee you soon!\n\nThe Blueprint Fitness Team\n\nNutrition Video Series\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list or Manage your preference.",
    "links": [
     {
      "url": "https://www.blueprintfitnessldn.com/nutrition-coaching",
      "health": "redirected"
     },
     {
      "url": "https://www.blueprintfitnessldn.com/nutrition-series-videos",
      "health": "redirected"
     }
    ]
   },
   {
    "type": "email",
    "name": "5 Email - Referral Hoodie",
    "subject": "Here's a FREE 30 day kick-start for a friend {{contact.first_name}}?",
    "from": "{{location.name}} · info@blueprintfitnessldn.com",
    "template": "5. REFER A FRIEND FOR FREE AND WIN A HOODIE?",
    "missing": false,
    "text": "Hi {{contact.first_name}},\n\nWe hope you're enjoying your time at Blueprint:Fitness and making the most of your 30-day trial. As a trialist, you've taken the first step towards reaching your fitness goals and as you know, we're here to support you every step of the way.\n\nAnd because we love our trialists, we've got a special treat for you: the \"Golden Ticket\". This is your chance to spread the love and share the fitness feels with someone you care about. That's right; you can gift a free 30-day trial membership to a friend, family member, or colleague.\n\nThey'll have access to all the same perks you have:\n\n· 12 SGPT sessions\n\n· Unlimited TEAM classes\n\n· Inbody composition testing\n\n· Access tour nutrition course\n\n· Any additional support and guidance they need!\n\nImagine how much more fun your workouts will be when you've got your BFF (best fitness friend) by your side… because we all know that friends who train together stay motivated and achieve better results!\n\nTo redeem your Golden Ticket, simply drop us a message with your friend's details and we'll take care of the rest….AND… If your friend decides to sign up as a member after their trial, we’ll give you an exclusive Blueprint:Fitness hoodie! Yay!!\nThank you for being a part of our awesome community, and we can't wait to see you both soon!\nThe Blueprint:Fitness Team\n{{location.email}}\n{{location.phone}}\nblueprintfitnessldn.com\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list or Manage your preference.",
    "links": []
   },
   {
    "type": "email",
    "name": "4 Email - Socials",
    "subject": "Here's why the socials are just as fun as our sessions",
    "from": "{{location.name}} · info@blueprintfitnessldn.com",
    "template": "4. WE’RE MORE THAN JUST A GYM… THE SOCIALS ARE JUST AS FUN AS OUR SESSIONS!",
    "missing": false,
    "text": "Dear {{contact.first_name}}\n\nWe’ve got quite the social scene here at Blueprint:Fitness – and contrary to popular belief, it’s not just people getting on the lash (but a lot of the time it kinda is…)\n\nWe're here to take your fitness journey to the next level! Not only will you be crushing your goals and seeing results, but you'll also have a blast doing it.\n\nHere's a sneak peek of the other epic social activities we have in store for you:\n\n· RESULTS ACCELERATORS: A few times a year, we're all about pushing ourselves to the limit with 50-day challenges and months dedicated to reaching big personal milestones, such as \"March Madness\" or \"Smash-tember\".\n\n· ADVENTURE CLUB: This one is for more fitness focused excursions. We’ll be conquering Tough Mudder, Nuclear Races, and half marathons all year round! And you guessed it, we'll be toasting our victories with beers.\n\n· SUMMER GAMES & XMAS GAMES: Get ready to team up and unleash your competitive side! This month-long series of games and challenges will bring out your inner athlete, with a leader board and tons of fun!\n\n· SPORTS DAYS: We're talking golf society days and 7-a-side football comps, all ending with a cold beer in hand.\n\n· PARTIES: Whether it's for Christmas, summer, a members' birthday or just a random Saturday, we're always down for a good party! And what better way to celebrate than with a few beers and good company?\n\n· LIVE DJ SESSIONS: Get ready to sweat it out to some sick beats as we bring in a DJ to crank up the tunes during your workouts.\n\n· RUNNING GROUP: This one is for the runners, we plot out and share local running routes and have member meet ups and the annual big group run on Boxing Day.\n\nWe have various groups for these events as they arise but this is the main group for social activity… its run by the members and is generally where all the fun stuff happens:\n\nJoin the socials group!\n\nSo, what are you waiting for? Join us and get ready to have a blast!\nSee you soon!\nThe Blueprint:Fitness Team\n{{location.email}}\n{{location.phone}}\nblueprintfitnessldn.com\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list or Manage your preference.",
    "links": [
     {
      "url": "https://chat.whatsapp.com/HceQ7PUzCT94kSUOfOFMfp",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "3 Email - Best Results?",
    "subject": "Which of our sessions and programmes will get you the best results?",
    "from": "{{location.name}} · info@blueprintfitnessldn.com",
    "template": "3. WHICH OF OUR PROGRAMS WILL GET YOU THE BEST RESULTS?",
    "missing": false,
    "text": "Hi {{contact.first_name}},\nYou may have noticed some variations in how our members are approaching their training. This might look a little different at times – but rest assured, there’s a solid method (and plenty of science) behind it.\nOur priority with programming is to create an environment that helps our members achieve the best results. Whether your goal is fat loss, strength, general fitness, getting leaner, dropping a dress size, or improving performance… we have a tailored pathway to get you there.\nIt’s important for you to understand everything about the programs and classes so you can make informed decisions on the best way to maximise your results.\nAt Blueprint Fitness, we utilise two forms of programming to create a truly bespoke journey for you.\nSometimes we’ll focus on one,\nSometimes the other,\nOccasionally, you’ll have the opportunity to choose.\nThe flexibility allows us to adapt to your needs, but everyone always works within the same structured framework – so no confusion!\nHere’s a quick overview of the two pathways:\nShape Program\nThis program focuses on body composition, aiming to reduce body fat while maintaining or increasing muscle mass to achieve a more athletic, ‘toned’ look. Training protocols include hypertrophy (3-4 sets of 8-12 reps), high volume (12-15 reps), or TUT (time under tension) to play with tempo and resistance.\n\nStrength Program\nFor those who want to build muscle, reduce body fat, and get seriously strong, this program focuses on heavier lifts with lower rep ranges (usually 4-6 reps). The big compound moves – deadlifts, squats, bench press, and pull-ups – are the foundation here.\n\nWe’ve created two videos that will tell you everything you need to know about the programming and classes:\nProgramming Overview\nThis video covers a year’s worth of programming, explains how 12-week cycles are broken into phases, and – most importantly – why this approach benefits you.\nCLICK HERE FOR THE PROGRAM VIDEO!\n\nTEAM Training\nThis video dives into the six different TEAM class formats we offer, explains the objectives of each, and shows how to combine these sessions with SGPT to achieve your goals.\nCLICK HERE FOR THE TEAM TRAINING GUIDE!\n\nIf you have any questions, don’t hesitate to reach out. Now that you’re part of the Blueprint community, you can say goodbye to aimlessly wandering around a gym – and hello to structured, effective training!\nSee you soon!\nThe Blueprint:Fitness Team\n{{location.email}}\n{{location.phone}}\nblueprintfitnessldn.com\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list or Manage your preference.",
    "links": [
     {
      "url": "https://youtu.be/hNFiW_psTcM",
      "health": "ok"
     },
     {
      "url": "https://youtu.be/65rLPUtKjYA",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "6. Price List",
    "subject": "What happens after your trial?",
    "from": "{{location.name}} · info@blueprintfitnessldn.com",
    "template": "6. WHAT HAPPENS AFTER YOUR TRIAL?",
    "missing": false,
    "text": "Hey there, {{contact.first_name}}!\nWe hope you've been enjoying your 30-day trial at Blueprint:Fitness! As your trial period is coming towards the end, we wanted to reach out and give you a quick reminder about a couple of things;\nFirstly, if you haven't already, it's time to start thinking about becoming a full time member of our awesome fitness community. We offer a range of memberships to suit your goals, your lifestyle and your budget. Stu and/or Paul will be happy to guide you through our membership options and help you choose the best one for you:\n\nIf you’re ready to join, simply click the button below:\n\nJoin Blueprint:Fitness\n\nSecondly, we'd like to remind you about your results check-in. We're all about tracking progress and celebrating achievements here at Blueprint:Fitness, so don't forget to book your InBody review with one of our coaches!\nWe love seeing people who come to us initially looking for body composition changes and the gradual increases in strength, fitness, confidence and mentality… but this check in is a great opportunity to reflect on how far you've come, set new goals, and get some expert advice on how to continue making progress.\nSo what are you waiting for? Take the next step and become a member of our awesome fitness community today!\nThank you for choosing Blueprint:Fitness for your fitness journey, and we hope to see you soon!\n\nThe Blueprint:Fitness Team\n{{location.email}}\n{{location.phone}}\nblueprintfitnessldn.com\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list or Manage your preference.",
    "links": [
     {
      "url": "https://goteamup.com/w3662065/p/3662065-blueprint-fitness/memberships/",
      "health": "ok"
     },
     {
      "url": "https://goteamup.com/providers/configure/memberships/",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "7. Email",
    "subject": "What is it like to be a full time Blueprint Fitness member?",
    "from": "{{location.name}} · info@blueprintfitnessldn.com",
    "template": "7. WHAT IS IT LIKE TO BE A FULL TIME BLUEPRINT:FITNESS MEMBER",
    "missing": false,
    "text": "Dear {{contact.first_name}},\nNow that you’re getting deep into your trial period and are fully integrated into Blueprint way of life, you might be wondering how it feels to be a long term member.\nThe 30-day trial period is the perfect amount of time for you to test-drive the classes and the coaches, and most importantly to get into the habit of (and enjoying) regular exercise… don't worry, we won't hold it against you if you've been secretly crying in the corner during burpees (we've all been there).\nWhen we jump back onto the inbody, we’ll definitely see some progress but the big composition, health and fitness changes – the truly sustainable results - come from consistency and long term behaviour change, which can be summed up nicely in this excellent quote:\n“The key – if you want to build habits that last – is to join a group where your desired behaviour, is their normal behaviour” – JAMES CLEAR, Atomic Habits\nNo-one is better qualified to tell you about the longer term B:F experience than our members. So here is a google review from Kiran:\nBlueprint: “a detailed outline or plan of action: a blueprint for success”\n“I joined Blueprint Fitness exactly a year ago and wanted to write a review of my experience. I am not one to write reviews frequently, only when something truly warrants it.\nHaving been a member of David Lloyds and Virgin Active for many years previously, Blueprint Fitness came as a total surprise to me.\nTrust me, this gym hits different in so many ways. The classes are made up of small group personal training sessions as well as other fantastic classes such as METCON, Sweat and Tough Guy. Each aspect of the training sessions is very well thought out, so when you walk through those doors, you know that you are in good hands. There are plenty of time slots to choose from during the day so it’s easy to fit into your life.\nI have learnt so much about the importance of good form, progressive overloading, strength training etc. Aside from the exercise, I have learnt a whole bunch of other stuff. The coaches really assist you with nutrition, which is very important if you want to get good results. I have learnt about body composition which again, I had no clue of. We use an Inbody machine at Blueprint to determine your percentage body fat, muscle mass etc. The coaches are at hand to help you decipher the results and to help you improve upon them.\nDuring the course of the year there are so many fun activities such as the summer games, hikes, winter games as well as the 50 Day challenges that really help you hone in on the targets that you wish to achieve.\nI have met so many wonderful people at Blueprint that inspire me to do better and encourage me. We have accountability groups, and this is so helpful as we can swap ideas etc. There are many socials that go on during the year that it makes you feel included. The Coaches are absolutely fantastic and very encouraging. The owners have put their blood and sweat (literally) into making it a very special experience for all members. They work tirelessly to ensure that you are getting the most out of your membership. They really do care about you reaching your goals and are very knowledgeable. You will never get the same experience at a generic gym.\nMy results have also been epic. I have lost 11% of my percentage body fat and over 6kg in weight during the past year. My mind-set has also completely changed as my lifestyle has changed. I take any opportunity to walk and lift heavy things (outside of the gym) which I would never dream of doing before. I am far more active than I have ever been because I feel motivated when I leave the gym. As a result of joining Blueprint, I am more focused in other aspects of my life. My husband and kids are astounded by the difference and my eldest son who is a gym freak now gives me kudos, which is a result in itself!\nIf you want excellent results and have fun whilst achieving the them, then this is the gym for you. One warning though, it’s addictive! You will feel the buzz and the energy (which is really important to me) when you enter the gym and guaranteed, you will leave with a smile and a spring in your step for the rest of the day.\nIt is no surprise to me that the gym has been shortlisted for the best gym in the area and I hope that we win!”\nIf you’d like to see what our members say about us, CLICK HERE to see a few more google reviews.\nSee you soon!\nThe Blueprint:Fitness Team\n{{location.email}}\n{{location.phone}}\nblueprintfitnessldn.com\n\nJoin Blueprint:Fitness\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list or Manage your preference.",
    "links": [
     {
      "url": "https://www.google.com/search?sa=X&rlz=1C1CHBF_en-GBGB886GB886&sxsrf=AJOqlzVpomZirZw4TL8XZFxrjPoY9wMwSA:1677187001407&q=blueprint%20fitness%20google%20reviews&ved=2ahUKEwi9hsO7yKz9AhVhSEEAHbxmD3oQvS56BAhDEAE&biw=1366&bih=657&dpr=1&tbs=lf:1,lf_ui:14&tbm=lcl&rflfq=1&num=10&rldimm=16491884207935991094&lqi=CiBibHVlcHJpbnQgZml0bmVzcyBnb29nbGUgcmV2aWV3cyIFOAGIAQFIi8ydiIqrgIAIWhsQABABGAAYASIRYmx1ZXByaW50IGZpdG5lc3OSARBwZXJzb25hbF90cmFpbmVymgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVVJQYzBwVU0waG5FQUU&rlst=f#rlfi=hd:;si:16491884207935991094,l,CiBibHVlcHJpbnQgZml0bmVzcyBnb29nbGUgcmV2aWV3cyIFOAGIAQFIi8ydiIqrgIAIWhsQABABGAAYASIRYmx1ZXByaW50IGZpdG5lc3OSARBwZXJzb25hbF90cmFpbmVymgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVVJQYzBwVU0waG5FQUU;mv:[[51.6727992,0.049006999999999995],[51.5904283,-0.1894718]];tbs:lrf:!1m4!1u3!2m2!3m1!1e1!1m4!1u2!2m2!2m1!1e1!2m1!1e2!2m1!1e3!3sIAE,lf:1,lf_ui:14",
      "health": "ok"
     },
     {
      "url": "https://go.blueprintfitnessldn.com/join",
      "health": "legacy"
     }
    ]
   },
   {
    "type": "email",
    "name": "8. Email Thankyou Legend",
    "subject": "Thankyou for taking on our 30 Day Trial, you absolute legend!",
    "from": "{{location.name}} · info@blueprintfitnessldn.com",
    "template": "8. THANK YOU!",
    "missing": false,
    "text": "Hi {{contact.first_name}},\n\nWhere on earth have these last 30 days gone?\n\nWe hope that you've been feeling the results of your hard work – after all, with all the blood, sweat, and burpees you've been putting in, you're practically superhuman by now! You've pushed through the pain, embraced the grind, and come out the other side with buns of steel and guns of iron. Bravo, my friend!\n\nAs your trial draws to a close, we'd like to remind you about the InBody check that you have access to. This will give us a better understanding of how your body has changed over the past 30 days and help us tailor our training program to your needs moving forwards.\n\nWe want to say a big thank you for choosing Blueprint Fitness and entrusting us with your fitness journey. We hope that you've enjoyed the blood, sweat, and burpees as much as we have (or at least tolerated them), and we can't wait to see you continue to smash your goals with us.\n\nIf you have any questions or concerns, please don't hesitate to reach out – we're always here to help. Now go enjoy a well-deserved protein shake (or a pint, we won't judge).\n\nAnd lastly, if you’re ready to sign up as s full member here’s that link again:\n\nClick here to join!\n\nSee you soon!\nThe Blueprint:Fitness Team\n{{location.email}}\n{{location.phone}}\nblueprintfitnessldn.com\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list or Manage your preference.",
    "links": [
     {
      "url": "https://goteamup.com/p/9748082-blueprint-fitness-leytons/memberships/",
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
    "subject": "Nutrition Consultation Request",
    "from": "Blueprint Fitness Nutrition Team · info@blueprintfitnessldn.com",
    "template": "Nutrition Consultation Request Response",
    "missing": false,
    "text": "Hi {{contact.first_name}}\n\nWe have received your request for nutritional help as part of your 30 Day trial with Blueprint Fitness & will be delighted to help you!\n\nAs part of your trial you get a 30 minute consultation where we can talk through your goal and plan a strategy to help achieve results.\n\nWe can do this consultation via Zoom or face to face but there is a lot more availability if we do this via Zoom. In order to maximise your time during the consultation there are some things you can prior to this by following the nutrition pathway on our website here\n\nBF Nutrition Coaching\n\nIt involves making sure the following have been completed\n\nInbody machine in HQ - You will require the Inbody App\n\nCalorie calculator spreadsheet from the website\n\nFood diary - setting up with Nutracheck and recording 3 to 5 days of food and drinks\n\nGoal setting - Starting to build up a set of both body comp and fitness goals to work towards\n\nStep tracking - Using either a phone or wearable to measure activity via steps\n\nSleep tracking - a basic diary of how much sleep you are getting\n\nIt isn't compulsary to have completed the above before your consultation, but the more details you provide us with intially the better your stratery / plan can be.\n\nIf you have completed the above and are ready to start then please reply to this email and we will book you in!",
    "links": [
     {
      "url": "https://www.blueprintfitnessldn.com/nutrition-coaching",
      "health": "redirected"
     },
     {
      "url": "https://www.nutracheck.co.uk/Home",
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
    "subject": "{{location.name}} 30 Day Programme",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Applied: 30 Day Email 1",
    "missing": false,
    "text": "Hi {{contact.first_name}}\n\nIt's {{user.first_name}} from {{location.name}}\n\nJust a quick email to let you know we have received your application and promise to be in touch very soon.\n\nHead over to our Instagram Page to find out more about how we can help.\n(Or click the button below)\n\nSpeak soon\n\nStu\n\nInstagram Page\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list.",
    "links": []
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
    "subject": "\"I have no motivation to go to the gym\"",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Applied: Email 2",
    "missing": false,
    "text": "\"I have no motivation to go to the gym\"\nI hear this all the time, especially with people who have just applied to Blueprint Fitness.\nThe gym is not a motivating place to be, it’s actually quite the opposite.\nEveryone looks like they know what they’re doing\nEveryone looks confident\nAnd everyone looks super fit, so I can see why it is so off-putting.\nOne of the things which will motivate you the most is when you start to see changes in your body.\nBut that will only happen when you’re going to the gym regularly.\nWe make sure that everyone at Blueprint Fitness is friendly, and are there to help one another.\nWe don’t train people who have an ego or are judgemental.\nYou see, once you are feeling comfortable in your environment, you will go to the gym more often.\nAnd when you go to the gym more often you will:\n✅ Have more energy than ever before because you’re sleeping better and getting fitter\n✅ Begin to feel more confident in your clothes because you will see your body transforming\n✅ Start eating healthier because you will want to fuel your body properly\nIt really is a big snowball effect once you get started, and you can get started with us this week on our 30 Day Trial\n➡️ You will train with us 3 x per week at our private gym with a Personal Trainer showing you exactly what to do\n➡️ You will have your own Personal Coach who will help you on the nutrition side. You can message them any day and get help on what to eat.\n➡️ Personalised meal plan to help you with what to eat and how much to eat.\n➡️ All you have to do is just turn up, and we will do the rest, we plan the session, demonstrate all the exercises and encourage you through the 60 minute workouts.\nTo get started this week then Simply Tap Here and secure your spot on our 30 Day Trial\nStu\nBlueprint Fitness\n\nSecure Your Spot\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list.",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 3",
    "subject": "We focus on these 4 things...",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Applied: Email 3",
    "missing": false,
    "text": "Most people that go to the gym are low in confidence and self-esteem, so you would think that gyms would be designed differently.\nInstead they are littered with mirrors, confusing machines, no Personal Trainers, members who love to pose and vending machines.\nAll of the above is not going to do your confident, self-esteem or anxiety any good.\nThat is exactly why at Blueprint Fitness we have:\nNo mirror's or glamorous fitness models on our walls, instead we have Personal Trainers who show you what to do.\n\nNo confusing machines, instead we have weights and Personal Trainers who explain and demonstrate the exercises\n\nPersonal Trainers who walk you through every part of the 60 minute session\n\nA very friendly community of members, in their 30’s-60s who are all on a mission to become fitter and healthier. Whenever we ask for feedback we always get comments on ‘how friendly everyone is’\n\nThe environment is so important to us, and we aim to make our sessions:\n⚡️ Energetic\n😁 Fun/ enjoyable\n😲 Challenging\n💪 Strength and fitness focused\nYou won’t be made to do some ridiculous degrading challenges or be told to run on a treadmill.\nWe meet you where you are now with your strength and fitness and gradually 📈 build you up from there.\nIt really is a big snowball effect once you get started, and you can get started with us this week on our 30 Day Trial.\nYou will train with us 3 x per week at our private gym with a Personal Trainer showing you exactly what to do\n\nAll you have to do is just turn up, and we will do the rest, we plan the session, demonstrate all the exercises and encourage you through the 60 minute workout.\n\nAnd if you struggle with nutrition then we can help with that too with personalised meal plans and a coach you can message daily\n\nTo get started this week then simply Tap Here and secure your spot on our 30 Day Trial.\nStu\nBlueprint Fitness\n\nSecure Your Spot\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list.",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 4",
    "subject": "Blueprint is for complete beginners, here's why!",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Applied: Email 4",
    "missing": false,
    "text": "Blueprint Fitness is for complete beginners\nYes that is correct, most of the people who join Blueprint Fitness are complete beginners.\nYou see, most people have this idea that everyone is super fit.\nBut the truth is that they all started as complete beginners, and they are now fit because they kept attending our Small Group PT sessions 3 x per week.\nAnd the reason they kept attending 3 x per week was because:\nOur members loved the 60 minute session, and how the session went so quickly - no more clock watching\n\nOur members really enjoy having a trainer with them at every session so that they didn’t feel lost in the gym any more\n\nOur members felt motivated when they came in and managed to really push themselves at every session\n\nOur members don’t feel intimidated or judged in any way because we’ve created a positive welcoming environment.\n\nWe don't accept:\n❌ Negative people who bring the mood down - we need our gym to be a positive environment.\n❌ Time-wasters or people full of excuses - we want people who will 100% commit.\n❌ Egotistical or judgemental people - Blueprint Fitness is focussed on creating a welcoming friendly gym.\nSo if you’re looking to join a gym which is friendly and helps you to become fitter, healthier and stronger then join our 30 Day Trial\nReply back to me here if you have any questions, if not you can sign up here.\nStu\nBlueprint Fitness\n\nSecure Your Spot\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list.",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 5",
    "subject": "Blueprint Success Stories - Michelle and Georgia",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Applied: Email 5 - Success Stories",
    "missing": false,
    "text": "I’d love to share a couple of inspiring stories from our members at Blueprint Fitness with you {{contact.first_name}}.\nThese stories are a testament to the transformative and supportive environment we foster here. Both Michelle and Georgia started on the 30 Day Trial!🌟\nMeet Michelle\n\nMeet Georgia\n\nStart Your Own Success Story!\nInspired by Michelle and Georgia?\nYou too can start your transformation journey with us.\nOur 30-Day Trial is the perfect way to experience the supportive and energetic environment at Blueprint Fitness .\n➡️ [Click Here to Start Your 30-Day Trial]\nRemember, every fitness journey is unique, and yours is waiting to be written. We’re here to support you every step of the way!\nLooking forward to seeing you soon,\nStu\nBlueprint: Fitness\n\nSecure Your Spot\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list.",
    "links": [
     {
      "url": "https://www.youtube.com/watch?v&#x3D;1fWvXYyPAWA",
      "health": "ok"
     },
     {
      "url": "https://www.youtube.com/watch?v&#x3D;HTSUYdHnX0c",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "Email 6",
    "subject": "5 Common Hurdles...",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Applied: Email 6 - Common Fitness Hurdles",
    "missing": false,
    "text": "Starting a fitness routine is exciting, but it can be hard too. Let’s talk about some usual problems people face and how to beat them.\nNot Enough Time:\nMany say, “I don’t have time to exercise.” But with some planning, you can find time for short and effective workouts. Try working out in the morning or evening when you might be free.\nStaying Consistent:\nKeeping a steady workout routine is tricky. To stay on track, set simple goals and make a workout plan. And remember, it’s okay to take days off. Celebrate small wins to stay motivated!\nFeeling Judged:\nIt’s normal to feel shy or worried about what others think when you’re new. But remember, everyone at the gym is there to work on themselves, just like you.\nConnect with others, and you’ll see everyone has their own worries.\nConfused About Food:\nUnderstanding what to eat can be hard. Eating a mix of foods that give you energy for workouts and help you recover afterward is key. If you’re not sure, consider talking to a coach or nutrition expert for help with meal planning.\nFinal Thoughts:\nBeating these problems may seem hard, but with some grit and the right help, you can do it. Remember, all gym-goers have faced and beaten these challenges. You’re not alone!\nIf you have questions or need help, feel free to reach out.\nStay strong,\nStu\nBlueprint Fitness\n\n30 Day Trial\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list.",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 7",
    "subject": "Spot The Blueprint Difference?",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Applied: Email 7 - Spot The Difference",
    "missing": false,
    "text": "Ever wondered about Blueprint Fitness unique vibe {{contact.first_name}}?\nAt Blueprint Fitness, you’re never just a number.\nEvery member receives personal attention during each workout.\nYou get help, advice, and answers, always.\nOur community is special.\nIt’s a group of hard-working individuals, all chasing after their goals, just like you.\nThe atmosphere?\nPurely positive and supportive.\nEveryone cheers each other on.\nWe keep equipment simple and easy.\nNo confusing machines or complicated gadgets.\nAnd best yet, our trainers are right there to guide you.\nEvery Session!\nYour goals matter to us.\nWant to get stronger?\nLose weight?\nFeel more energetic?\nWe’re here to support your journey, every step of the way.\nChoosing a gym is a big decision.\nUnderstanding what makes each place special helps.\nAt Blueprint Fitness, it’s about you, the community, simplicity, and your goals.\nGot more questions about life at Blueprint Fitness?\nFeel free to drop us a line.\nStay healthy,\nStu\nBlueprint Fitness\n\n30 Day Trial\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list.",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 8",
    "subject": "Most Common Questions ANSWERED!",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Applied: Email 8 - Common Questions",
    "missing": false,
    "text": "Got questions about Blueprint Fitness {{contact.first_name}}?\nYou’re not alone.\nLet’s clear up some common queries we hear.\nWondering about commitment?\nOur 30-Day Trial is just that - a trial.\nNo strings attached, no hidden clauses.\nJust a full month for you to experience everything Blueprint Fitness offers.\nConcerned about your fitness level?\nWe welcome all levels here, from complete beginners to seasoned gym-goers.\nOur trainers are here to meet you where you are and help you grow from there.\nThinking about the atmosphere?\nBlueprint Fitness is all about positivity and support.\nNo judgment, no ego, just a community working together towards their goals.\nWorried about nutrition?\nWe’ve got you covered with personalized meal plans and nutrition advice to fuel your workouts and recovery.\nCurious about our schedule?\nWe’re open 7 days a week with loads of sessions starting from 6am.\nFlexibility is key, and we offer it.\nDealing with injuries?\nOur trainers are skilled in working around and with various injuries to ensure you can exercise safely and effectively.\nConcerned about parking?\nDon’t be. We offer free parking for all our members, making your trip to Blueprint Fitness hassle-free.\nHave more questions?\nWe’re always here to answer them.\nReply, Tap Here, or give us a call.\nUnderstanding is the first step to commitment.\nWe hope this clears up any doubts or concerns you might have about joining the Blueprint Fitness family.\nLooking forward to your curiosity and excitement,\nStu\nBlueprint Fitness\n\n30 Day Trial\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list.",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 9",
    "subject": "SURPRISE OFFER! Save £££ Today at Blueprint: Fitness",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Applied: Email 9 - Surprise!",
    "missing": false,
    "text": "24 Hours Only!\n\nHey {{contact.first_name}},\nGuess what? 😍\nWe’ve got something special for you!\nWe know taking the first step can be the hardest.\nSo, we’re making it a little easier.\nKeep Reading To Find Out! 🙌 For a limited time, we’re offering a special '30 Day Kickstart' discount.\nA little nudge to get started on your fitness journey with us.\nBut here’s the catch - it’s a surprise!\n\nIt’s a good one though, I promise.\nTo find out what’s waiting for you, tap the link below.\n\n[Reveal Your Surprise Offer!]\nThis special offer is only available for you for 24 hours!\nSo, don’t wait too long to uncover it.\nWe’re so excited to welcome you to Blueprint Fitness .\nAnd remember, we’re here to support you every step of the way.\n\nCan’t wait to see you,\nStu\nBlueprint Fitness\n\nReveal 30 Day Trial Offer\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list.",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 10",
    "subject": "Last Chance {{contact.first_name}}!",
    "from": "Blueprint Fitness · {{location.email}}",
    "template": "Applied: Email 10 - Last Chance",
    "missing": false,
    "text": "Ends Today...\n\nTime is ticking {{contact.first_name}}, and we don’t want you to miss out\nYour Special Offer ENDS TODAY!\nThis is your final reminder to join our Blueprint Fitness family and start your fitness journey with a bang.\n\nWe’ve seen so many people transform here,\nnot just in body,\nbut in spirit and confidence too.\n\nWe know taking the first step can be a bit scary, but we promise at Blueprint Fitness,\nyou’ll find a supportive community ready to welcome you with open arms.\n\nYour path to a stronger, healthier you is just a click away.\n\n[Sign Up for Your 30-Day Trial Now]\nThis Offer ENDS TODAY\n\nIf you have any last-minute questions or need a little extra nudge,\nwe’re right here to chat.\n\nHope to see you soon and start this exciting journey together.\nWarm wishes,\nStu\nBlueprint Fitness\n\nSPECIAL OFFER: 30 DAY TRIAL\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list.",
    "links": []
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
    "subject": "Hey {{contact.first_name}}",
    "from": "{{custom_values.sales_and_journey}} · {{location.email}}",
    "template": "Reactivation - Email 1",
    "missing": false,
    "text": "Hi {{contact.first_name}}\n\nJust thought I’d check in and see how you’re getting on since you finished with us?\n\nLet me know if you need help with anything.\n\n{{custom_values.sales_and_journey}}",
    "links": []
   },
   {
    "type": "email",
    "name": "Email",
    "subject": "Hope you're well {{contact.first_name}}",
    "from": "{{custom_values.sales_and_journey}} · {{location.email}}",
    "template": "Reactivation - Email 2",
    "missing": false,
    "text": "Hi {{contact.first_name}}\n\nAre you still looking to get in shape?\n\n{{custom_values.sales_and_journey}}",
    "links": []
   },
   {
    "type": "email",
    "name": "Email",
    "subject": "Hope you're well {{contact.first_name}}",
    "from": "{{custom_values.sales_and_journey}} · {{location.email}}",
    "template": "Reactivation - Email 2",
    "missing": false,
    "text": "Hi {{contact.first_name}}\n\nAre you still looking to get in shape?\n\n{{custom_values.sales_and_journey}}",
    "links": []
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
  "workflow": "20 Insights",
  "folder": "",
  "status": "draft",
  "triggers": [],
  "steps": [
   {
    "type": "email",
    "name": "Email 1",
    "subject": "Why Starting Is Like Climbing a Mountain... Barefoot",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 2",
    "subject": "The Tortoise, The Hare, and Your Fitness Journey",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 3",
    "subject": "Your Fitness Journey Isn't a Microwave Dinner",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 4",
    "subject": "Your Fitness Journey Isn't a Race Against Anyone Else",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 5",
    "subject": "The Lidl Middle Aisle Syndrome & Your Fitness Goals",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 6",
    "subject": "The Art of Becoming You",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 7",
    "subject": "The Secret Sauce to Your Fitness - No, It's Not More Burpees",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 8",
    "subject": "The REAL Reason We Train After 30",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 9",
    "subject": "9. The Truth About Losing Weight - No Treadmill or Hours of Cardio Required",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 10",
    "subject": "10. Overthinkers need to read this.",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 11",
    "subject": "The Unlikely Champion of the Sitting Olympics",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 12",
    "subject": "If Your Get Up And Go Got Up And Went…",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 13",
    "subject": "Gadgets & Apps: The Fitness Game Changer or Just Shiny Distractions?",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 14",
    "subject": "Protein Absorption Is Key",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 15",
    "subject": "The 2-Minute Rule: Small Steps, Big Wins",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 16",
    "subject": "Stop Saving the Party Poppers for Retirement",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 17",
    "subject": "The Myth of \"No Pain, No Gain\"",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 18",
    "subject": "Age Makes Fitness Non-Negotiable",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 19",
    "subject": "Your Compass",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 20",
    "subject": "Your Compass",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
    "links": []
   },
   {
    "type": "email",
    "name": "Email 21",
    "subject": "New Levels Unlocked! Your Mission, Should You Choose To Accept...",
    "from": "",
    "template": null,
    "missing": true,
    "text": "",
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
    "subject": "Kickstart Your Nutrition Journey",
    "from": "{{location.name}} · info@blueprintfitnessldn.com",
    "template": "2. KICK-START YOUR NUTRITION JOURNEY IN FOUR EASY STEPS",
    "missing": false,
    "text": "Hi {{contact.first_name}},\nAs part of your 30-Day Trial, you’ll have access to our team of highly qualified nutrition coaches, as well as our in-depth digital nutrition resource platform.\nHere are the five steps we use to get you started. Not every stage is essential, but the more information we have, the better placed we’ll be to give you useful, personalised advice.\n1. InBody\nThis one is essential. Your InBody scan gives us important starting-point data — particularly your BMR (Basal Metabolic Rate) — which helps us understand your individual energy requirements.\nIf you haven’t had your scan yet, speak to one of our coaches on the gym floor or ping Stu a message and we’ll get you booked in.\n2. Calorie Calculator\nDownload and complete the Calorie Calculator.\nHandy vid explainer here >> https://youtu.be/4Por91yLhYU\nOnce you’ve filled it in, email it over to info@blueprintfitnessldn.com.\nIt’ll give us a much clearer picture of your individual nutrition requirements and provides a great starting point for your consultation, where we’ll run through everything with you and answer any questions.As part of your 30-Day Trial, you’ll have access to our team of highly qualified nutrition coaches, as well as our in-depth digital nutrition resource platform.\n\nCalorie Calculator\n\n3. Start Tracking\nThis gives us a clear picture of what your nutrition currently looks like — including your calorie and protein intake, as well as the overall breakdown of your macronutrients.\nWe usually recommend using either NutriCheck or the MyFitnessPal app to track your food for a few days.\nThe aim isn’t to judge what you’re eating or expect you to be perfect. It simply gives us an insight into your current habits, so we can identify where a few realistic changes to your food choices could make the biggest difference.\n4. Book Your 30-Minute Kick-Start Consultation\nTo help you get started, we’ll get you booked in for a 30-minute consultation with either Paul or Louise.\nThis gives us the opportunity to get really clear on your goals, look through the information you’ve gathered so far, and identify the areas we can focus on to help you get the best possible results from your trial.\n\nBook your consultation here\n\nWithin the nutrition section of the website you’ll also find our Signature Nutrition Programme.\nIt has all the essential and in-depth information you need to help double down on your nutrition efforts to really get the most out of your training,and accelerate your results.\nThere are 20+ videos for you to work through (pictured above) covering all topics from macronutrients, to fat loss, to understanding calories and adherence tactics.\nAs you know, we’re here to help you on every step of your journey - so if there is anything else you need, please give us a shout!\nSee you soon!\nThe Blueprint Fitness Team\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list or Manage your preference.",
    "links": [
     {
      "url": "https://youtu.be/4Por91yLhYU",
      "health": "ok"
     },
     {
      "url": "https://docs.google.com/spreadsheets/d/1xC9Ke52efPTilXrBWeEE-8awKO8NBbuI/edit?gid=1306492243#gid=1306492243",
      "health": "ok"
     },
     {
      "url": "https://go.blueprintfitnessldn.com/nutritionrequest",
      "health": "legacy"
     }
    ]
   },
   {
    "type": "email",
    "name": "5 Email - Referral Hoodie",
    "subject": "Here's a FREE 30 day kick-start for a friend {{contact.first_name}}?",
    "from": "{{location.name}} · info@blueprintfitnessldn.com",
    "template": "5. REFER A FRIEND FOR FREE AND WIN A HOODIE!",
    "missing": false,
    "text": "Hi {{contact.first_name}},\n\nWe hope you're enjoying your time at Blueprint:Fitness and making the most of your 30-day trial. As a trialist, you've taken the first step towards reaching your fitness goals and as you know, we're here to support you every step of the way.\n\nAnd because we love our trialists, we've got a special treat for you: the \"Golden Ticket\". This is your chance to spread the love and share the fitness feels with someone you care about. That's right; you can gift a free 30-day trial membership to a friend, family member, or colleague.\n\nThey'll have access to all the same perks you have:\n\n· 12 SGPT sessions\n\n· Unlimited TEAM classes\n\n· Inbody composition testing\n\n· Access tour nutrition course\n\n· Any additional support and guidance they need!\n\nImagine how much more fun your workouts will be when you've got your BFF (best fitness friend) by your side… because we all know that friends who train together stay motivated and achieve better results!\n\nTo redeem your Golden Ticket, simply drop us a message with your friend's details and we'll take care of the rest….AND… If your friend decides to sign up as a member after their trial, we’ll give you an exclusive Blueprint:Fitness hoodie! Yay!!\nThank you for being a part of our awesome community, and we can't wait to see you both soon!\nThe Blueprint:Fitness Team\n{{location.email}}\n{{location.phone}}\nblueprintfitnessldn.com\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list or Manage your preference.",
    "links": []
   },
   {
    "type": "email",
    "name": "4 Email - Socials",
    "subject": "Here's why the socials are just as fun as our sessions",
    "from": "{{location.name}} · info@blueprintfitnessldn.com",
    "template": "4. WE’RE MORE THAN JUST A GYM… THE SOCIALS ARE JUST AS FUN AS OUR SESSIONS!",
    "missing": false,
    "text": "Dear {{contact.first_name}}\n\nWe’ve got quite the social scene here at Blueprint:Fitness – and contrary to popular belief, it’s not just people getting on the lash (but a lot of the time it kinda is…)\n\nWe're here to take your fitness journey to the next level! Not only will you be crushing your goals and seeing results, but you'll also have a blast doing it.\n\nHere's a sneak peek of the other epic social activities we have in store for you:\n\n· RESULTS ACCELERATORS: A few times a year, we're all about pushing ourselves to the limit with 50-day challenges and months dedicated to reaching big personal milestones, such as \"March Madness\" or \"Smash-tember\".\n\n· ADVENTURE CLUB: This one is for more fitness focused excursions. We’ll be conquering Tough Mudder, Nuclear Races, and half marathons all year round! And you guessed it, we'll be toasting our victories with beers.\n\n· SUMMER GAMES & XMAS GAMES: Get ready to team up and unleash your competitive side! This month-long series of games and challenges will bring out your inner athlete, with a leader board and tons of fun!\n\n· SPORTS DAYS: We're talking golf society days and 7-a-side football comps, all ending with a cold beer in hand.\n\n· PARTIES: Whether it's for Christmas, summer, a members' birthday or just a random Saturday, we're always down for a good party! And what better way to celebrate than with a few beers and good company?\n\n· LIVE DJ SESSIONS: Get ready to sweat it out to some sick beats as we bring in a DJ to crank up the tunes during your workouts.\n\n· RUNNING GROUP: This one is for the runners, we plot out and share local running routes and have member meet ups and the annual big group run on Boxing Day.\n\nWe have various groups for these events as they arise but this is the main group for social activity… its run by the members and is generally where all the fun stuff happens:\n\nJoin the socials group!\n\nSo, what are you waiting for? Join us and get ready to have a blast!\n\nThe Blueprint:Fitness Team\n{{location.email}}\n{{location.phone}}\nblueprintfitnessldn.com\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list or Manage your preference.",
    "links": [
     {
      "url": "https://chat.whatsapp.com/HceQ7PUzCT94kSUOfOFMfp",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "3 Email - Best Results?",
    "subject": "Which of our sessions and programmes will get you the best results?",
    "from": "{{location.name}} · info@blueprintfitnessldn.com",
    "template": "3. WHICH OF OUR PROGRAMS WILL GET YOU THE BEST RESULTS?",
    "missing": false,
    "text": "Hi {{contact.first_name}},\nYou may have noticed different members following different programs, which may look a little confusing – but there is method (mainly science) to the madness.\nOur priority with programming is to create an environment that helps our members achieve the best results. So whatever the goal may be, in terms of fat loss, strength, general fitness, getting leaner, dropping a dress size, or for performance… We have a pathway that will absolutely get you there.\nIt’s important for you to know, and to understand everything about the programs and the classes so that you can make informed decisions regarding which sessions and which pathway will maximise your results.\nHaving two SGPT programs options that run side by side is how we truly bespoke your Blueprint journey, and as the old saying goes; “The problem with the one size fits all approach is that everyone ends up with the wrong trousers”\nThey are called ‘Shape’ and ‘Strength. Here’s the lowdown:\nThe Shape program focuses on body composition, and the primary aim is to simultaneously reduce muscle mass whilst maintaining or increasing muscle mass therefore making you look more athletic, or ‘toned’.\nShape cycles through different protocols of resistance training, such as hypertrophy (3-4 sets of 8-12 reps), high volume (more sets and/or 12-15 reps) or might follow a TUT (time under tension) protocol where we play around with different tempos per rep.\nThe Strength program is geared towards people that want to build muscle, reduce body fat and generally get as strong as an ox.\nHere we focus on lower rep ranges (usually 4-6) so that we can lift heavier and increase strength through the big compound moves like deadlifts, squats, bench press and pull ups.\nThere are two videos here to watch that will tell you everything there is to know about SGPT and TEAM training programming and sessions:\n1. Programming overview\nThis one takes you through a whole years’ worth of programming, how the 12 week cycles play out and are broken down onto phases and – most importantly – why this is beneficial to you.\nCLICK HERE FOR THE PROGRAM VIDEO!\n2. TEAM training\nThis one gives you an insight into the six different formats of TEAM classes that we run, will breakdown the objectives for each session and how to work them in alongside the SGPT sessions.\nCLICK HERE FOR THE TEAM TRAINING GUIDE!\nIf you have any questions please give us a shout. But rest assured, now that you’re part of the Blueprint community, the days of aimlessly walking into a gym and not knowing what to do are well and truly behind you!\nSee you soon!\nThe Blueprint:Fitness Team\n{{location.email}}\n{{location.phone}}\nblueprintfitnessldn.com\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list or Manage your preference.",
    "links": [
     {
      "url": "https://youtu.be/hNFiW_psTcM",
      "health": "ok"
     },
     {
      "url": "https://youtu.be/65rLPUtKjYA",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "6. Price List",
    "subject": "What happens after your trial?",
    "from": "{{location.name}} · info@blueprintfitnessldn.com",
    "template": "6. WHAT HAPPENS AFTER YOUR TRIAL?",
    "missing": false,
    "text": "Hey there, {{contact.first_name}}!\n\nWe hope you've been enjoying your 30-day trial at Blueprint:Fitness! As your trial period is coming towards the end, we wanted to reach out and give you a quick reminder about a couple of things;\n\nFirstly, if you haven't already, it's time to start thinking about becoming a full time member of our awesome fitness community. We offer a range of memberships to suit your goals, your lifestyle and your budget. Stu and/or Paul will be happy to guide you through our membership options and help you choose the best one for you:\n\nIf you’re ready to join, simply click this:\n\nJoin Blueprint:Fitness\n\nSecondly, we'd like to remind you about your results check-in. We're all about tracking progress and celebrating achievements here at Blueprint:Fitness, so don't forget to book your InBody review with one of our coaches!\nWe love seeing people who come to us initially looking for body composition changes and the gradual increases in strength, fitness, confidence and mentality… but this check in is a great opportunity to reflect on how far you've come, set new goals, and get some expert advice on how to continue making progress.\nSo what are you waiting for? Take the next step and become a member of our awesome fitness community today!\nThank you for choosing Blueprint:Fitness for your fitness journey, and we hope to see you soon!\nThe Blueprint:Fitness Team\n{{location.email}}\n{{location.phone}}\nblueprintfitnessldn.com\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list or Manage your preference.",
    "links": [
     {
      "url": "https://goteamup.com/w3662065/p/3662065-blueprint-fitness/memberships/",
      "health": "ok"
     }
    ]
   },
   {
    "type": "email",
    "name": "7. Email",
    "subject": "What is it like to be a full time Blueprint Fitness member?",
    "from": "{{location.name}} · info@blueprintfitnessldn.com",
    "template": "7. WHAT IS IT LIKE TO BE A FULL TIME BLUEPRINT:FITNESS MEMBER",
    "missing": false,
    "text": "Dear {{contact.first_name}},\nNow that you’re getting deep into your trial period and are fully integrated into Blueprint way of life, you might be wondering how it feels to be a long term member.\nThe 30-day trial period is the perfect amount of time for you to test-drive the classes and the coaches, and most importantly to get into the habit of (and enjoying) regular exercise… don't worry, we won't hold it against you if you've been secretly crying in the corner during burpees (we've all been there).\nWhen we jump back onto the inbody, we’ll definitely see some progress but the big composition, health and fitness changes – the truly sustainable results - come from consistency and long term behaviour change, which can be summed up nicely in this excellent quote:\n“The key – if you want to build habits that last – is to join a group where your desired behaviour, is their normal behaviour” – JAMES CLEAR, Atomic Habits\nNo-one is better qualified to tell you about the longer term B:F experience than our members. So here is a google review from Kiran:\nBlueprint: “a detailed outline or plan of action: a blueprint for success”\n“I joined Blueprint Fitness exactly a year ago and wanted to write a review of my experience. I am not one to write reviews frequently, only when something truly warrants it.\nHaving been a member of David Lloyds and Virgin Active for many years previously, Blueprint Fitness came as a total surprise to me.\nTrust me, this gym hits different in so many ways. The classes are made up of small group personal training sessions as well as other fantastic classes such as METCON, Sweat and Tough Guy. Each aspect of the training sessions is very well thought out, so when you walk through those doors, you know that you are in good hands. There are plenty of time slots to choose from during the day so it’s easy to fit into your life.\nI have learnt so much about the importance of good form, progressive overloading, strength training etc. Aside from the exercise, I have learnt a whole bunch of other stuff. The coaches really assist you with nutrition, which is very important if you want to get good results. I have learnt about body composition which again, I had no clue of. We use an Inbody machine at Blueprint to determine your percentage body fat, muscle mass etc. The coaches are at hand to help you decipher the results and to help you improve upon them.\nDuring the course of the year there are so many fun activities such as the summer games, hikes, winter games as well as the 50 Day challenges that really help you hone in on the targets that you wish to achieve.\nI have met so many wonderful people at Blueprint that inspire me to do better and encourage me. We have accountability groups, and this is so helpful as we can swap ideas etc. There are many socials that go on during the year that it makes you feel included. The Coaches are absolutely fantastic and very encouraging. The owners have put their blood and sweat (literally) into making it a very special experience for all members. They work tirelessly to ensure that you are getting the most out of your membership. They really do care about you reaching your goals and are very knowledgeable. You will never get the same experience at a generic gym.\nMy results have also been epic. I have lost 11% of my percentage body fat and over 6kg in weight during the past year. My mind-set has also completely changed as my lifestyle has changed. I take any opportunity to walk and lift heavy things (outside of the gym) which I would never dream of doing before. I am far more active than I have ever been because I feel motivated when I leave the gym. As a result of joining Blueprint, I am more focused in other aspects of my life. My husband and kids are astounded by the difference and my eldest son who is a gym freak now gives me kudos, which is a result in itself!\nIf you want excellent results and have fun whilst achieving the them, then this is the gym for you. One warning though, it’s addictive! You will feel the buzz and the energy (which is really important to me) when you enter the gym and guaranteed, you will leave with a smile and a spring in your step for the rest of the day.\nIt is no surprise to me that the gym has been shortlisted for the best gym in the area and I hope that we win!”\nIf you’d like to see what our members say about us, CLICK HERE to see a few more google reviews.\nSee you soon!\nThe Blueprint:Fitness Team\n{{location.email}}\n{{location.phone}}\nblueprintfitnessldn.com\n\nJoin Blueprint:Fitness\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list or Manage your preference.",
    "links": [
     {
      "url": "https://www.google.com/search?sa=X&rlz=1C1CHBF_en-GBGB886GB886&sxsrf=AJOqlzVpomZirZw4TL8XZFxrjPoY9wMwSA:1677187001407&q=blueprint%20fitness%20google%20reviews&ved=2ahUKEwi9hsO7yKz9AhVhSEEAHbxmD3oQvS56BAhDEAE&biw=1366&bih=657&dpr=1&tbs=lf:1,lf_ui:14&tbm=lcl&rflfq=1&num=10&rldimm=16491884207935991094&lqi=CiBibHVlcHJpbnQgZml0bmVzcyBnb29nbGUgcmV2aWV3cyIFOAGIAQFIi8ydiIqrgIAIWhsQABABGAAYASIRYmx1ZXByaW50IGZpdG5lc3OSARBwZXJzb25hbF90cmFpbmVymgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVVJQYzBwVU0waG5FQUU&rlst=f#rlfi=hd:;si:16491884207935991094,l,CiBibHVlcHJpbnQgZml0bmVzcyBnb29nbGUgcmV2aWV3cyIFOAGIAQFIi8ydiIqrgIAIWhsQABABGAAYASIRYmx1ZXByaW50IGZpdG5lc3OSARBwZXJzb25hbF90cmFpbmVymgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVVJQYzBwVU0waG5FQUU;mv:[[51.6727992,0.049006999999999995],[51.5904283,-0.1894718]];tbs:lrf:!1m4!1u3!2m2!3m1!1e1!1m4!1u2!2m2!2m1!1e1!2m1!1e2!2m1!1e3!3sIAE,lf:1,lf_ui:14",
      "health": "ok"
     },
     {
      "url": "https://go.blueprintfitnessldn.com/join",
      "health": "legacy"
     }
    ]
   },
   {
    "type": "email",
    "name": "8. Email Thankyou Legend",
    "subject": "Thankyou for taking on our 30 Day Trial, you absolute legend!",
    "from": "Stuart Rook · info@blueprintfitnessldn.com",
    "template": "8. THANK YOU!",
    "missing": false,
    "text": "Hi {{contact.first_name}},\n\nWhere on earth have these last 30 days gone?\n\nWe hope that you've been feeling the results of your hard work – after all, with all the blood, sweat, and burpees you've been putting in, you're practically superhuman by now! You've pushed through the pain, embraced the grind, and come out the other side with buns of steel and guns of iron. Bravo, my friend!\n\nAs your trial draws to a close, we'd like to remind you about the InBody check that you have access to. This will give us a better understanding of how your body has changed over the past 30 days and help us tailor our training program to your needs moving forwards.\n\nWe want to say a big thank you for choosing Blueprint Fitness and entrusting us with your fitness journey. We hope that you've enjoyed the blood, sweat, and burpees as much as we have (or at least tolerated them), and we can't wait to see you continue to smash your goals with us.\n\nIf you have any questions or concerns, please don't hesitate to reach out – we're always here to help. Now go enjoy a well-deserved protein shake (or a pint, we won't judge).\n\nAnd lastly, if you’re ready to sign up as s full member here’s that link again:\n\nClick here to join!\n\nSee you soon!\nThe Blueprint:Fitness Team\n{{location.email}}\n{{location.phone}}\nblueprintfitnessldn.com\n\nCopyright © {{right_now.year}} {{location.name}}, All rights reserved.\n\nOur mailing address is:\n{{location.email}}\n\nWant to change how you receive these emails?\nYou can unsubscribe from this list or Manage your preference.",
    "links": [
     {
      "url": "https://goteamup.com/w3662065/p/3662065-blueprint-fitness/memberships/",
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
    "subject": "Nutrition Consultation Request",
    "from": "Blueprint Fitness Nutrition Team · info@blueprintfitnessldn.com",
    "template": "Nutrition Consultation Request Response",
    "missing": false,
    "text": "Hi {{contact.first_name}}\n\nWe have received your request for nutritional help as part of your 30 Day trial with Blueprint Fitness & will be delighted to help you!\n\nAs part of your trial you get a 30 minute consultation where we can talk through your goal and plan a strategy to help achieve results.\n\nWe can do this consultation via Zoom or face to face but there is a lot more availability if we do this via Zoom. In order to maximise your time during the consultation there are some things you can prior to this by following the nutrition pathway on our website here\n\nBF Nutrition Coaching\n\nIt involves making sure the following have been completed\n\nInbody machine in HQ - You will require the Inbody App\n\nCalorie calculator spreadsheet from the website\n\nFood diary - setting up with Nutracheck and recording 3 to 5 days of food and drinks\n\nGoal setting - Starting to build up a set of both body comp and fitness goals to work towards\n\nStep tracking - Using either a phone or wearable to measure activity via steps\n\nSleep tracking - a basic diary of how much sleep you are getting\n\nIt isn't compulsary to have completed the above before your consultation, but the more details you provide us with intially the better your stratery / plan can be.\n\nIf you have completed the above and are ready to start then please reply to this email and we will book you in!",
    "links": [
     {
      "url": "https://www.blueprintfitnessldn.com/nutrition-coaching",
      "health": "redirected"
     },
     {
      "url": "https://www.nutracheck.co.uk/Home",
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
