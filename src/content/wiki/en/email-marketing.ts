import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/email-marketing/${name}.webp`;
const shot = (name: string) => `/wiki/email-marketing/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "salon-email-marketing",
  lesson: "email-marketing",
  category: "marketing",
  title: "Salon email marketing: send a promotional email to the right clients in 7 steps",
  metaTitle: "Salon email marketing: send a promotional email in 7 steps",
  metaDescription:
    "How nail, hair, lash and spa owners send promotional emails on VaraaAi: choose the audience, start from a template, add a coupon, test it, then send or schedule.",
  keyword: "salon email marketing",
  keywords: [
    "promotional email for salon clients",
    "email marketing for a spa",
    "how to write a promotional email for a nail salon",
    "salon offer email template",
    "win back lapsed salon clients",
    "what are Vara points",
    "email clients who have not been back",
  ],
  excerpt: "Choose the right group of clients, tap a ready-made template, add an offer coupon and a booking button, preview it and send. Each email sent costs 1 Vara point.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("chu-salon-om-chao-khach-quen-quay-lai"),
    alt: "Two women embrace in the middle of a bright salon with large windows, while a few clients sit behind them drinking coffee",
  },
  takeaways: [
    "The first step is always **choosing who receives it**. A come-back offer works better sent to “Haven't been back” than to everyone.",
    "Tap a **ready-made template** so the subject line and message are filled in, then adjust them to your salon.",
    "The **“Customer name”** button inserts each person's name, so every client gets a personal greeting.",
    "**“Preview email”** and **“Send a test”** are both free. Points are only used when you send to clients.",
    "Each email sent costs **1 Vara point**. Earn more with “Check in” or by referring another salon to VaraaAi.",
  ],
  intro: [
    "Salon email marketing sounds like something for big chains with their own marketing team, yet every salon has the same need: regulars who have not been back for a while, and a new offer clients have not heard about. One email sent to the right people, with the client's name in the greeting and a booking button at the end, does the job of messaging each person by hand.",
    "This guide follows the VaraaAi Academy lesson “Promotional emails and Vara points”. By the end you will be able to build an email campaign from a template, choose the right group of clients, understand how Vara points are used and follow the results after sending.",
  ],
  sections: [
    {
      id: "why-email",
      title: "Why a salon should email its clients",
      blocks: [
        { p: "Most clients who do not come back have no complaint. They are busy, they forget, or another salon near home reminded them first. Everyone in the trade knows that keeping a client takes less effort than finding a new one, but in the middle of a working day nobody has time to message each person." },
        { p: "Email fills that gap. You write once, choose a group, and each person receives a message with their own name. It waits in the inbox until the client opens it, unlike a post that scrolls away within hours. If your salon already posts offers on a [Facebook page](lesson:fanpage), email adds to it: the post reaches people who follow you, while the email goes straight to clients who have booked before." },
        { p: "In VaraaAi this lives under “Marketing” in the salon dashboard. The recipients come from the salon's own clients, so you never copy email addresses into another tool." },
      ],
    },
    {
      id: "before-you-start",
      title: "What to prepare before you send a promotional email",
      blocks: [
        { p: "A campaign takes a few minutes if you have decided three things beforehand:" },
        {
          ul: [
            "**Who it is for.** Clients who have not been in for a while, new clients and regulars each need a different message.",
            "**What the offer is.** One short line, like the lesson video's example of 20% off every service. If the offer has an end date, decide it now.",
            "**Where the client goes after reading.** Usually the booking button, so they can take a time while they are still interested.",
          ],
        },
        { p: "It also helps to have a photo of the salon or of recent work ready, because the email has a “Picture” section. It is optional." },
        { note: "Before you write, check your “Vara points balance”, which sits below the “Send the campaign” step under “Marketing”. Each email sent costs 1 point, so the balance tells you how many clients you can reach this time.", kind: "info", title: "Check your points first" },
      ],
    },
    {
      id: "choose-audience",
      title: "Who to email: the client groups and the message that suits each",
      blocks: [
        { p: "The line under “Choose who receives it” explains the idea: the right message for the right people makes clients feel the email was written for them. Each group on screen shows how many clients are in it. The third column of the table below is this article's own suggestion, so adapt it to your salon." },
        {
          table: {
            head: ["Group", "Who is in it", "Suggested message (example)"],
            rows: [
              ["“All customers”", "Everyone who has booked", "General salon news, such as a new service"],
              ["“Recent customers”", "Visited in the last 60 days", "A reminder that an infill or touch-up is due"],
              ["“Haven't been back”", "Away 90+ days, nothing booked", "An offer inviting them back"],
              ["“Loyal customers”", "Visited 3 times or more", "A thank-you with an offer just for them"],
              ["“New customers”", "First visit in the last 30 days", "A welcome and an introduction to your other services"],
              ["“Card members”", "Hold your member card", "News about their card benefits"],
            ],
          },
        },
        { img: { src: shot("new-customers-card-members-contact-list"), alt: "The audience cards New customers and Card members, each with its client count, and below them the Your contact list card for contacts imported from Excel", caption: "Scroll down in step 1 for more groups. The video also shows “Your contact list”, for clients imported from Excel or added by hand." } },
        { p: "The lesson stresses one example: a come-back offer sent to “Haven't been back” works better than sending it to everyone. The reason is simple. A client who came in last week and gets a “we haven't seen you for ages” email knows it was a mass mailing, and opens your next one less readily." },
        { p: "If your salon runs [loyalty cards](lesson:the-tich-diem), “Card members” is a group worth writing to separately, because these are people who have chosen to stick with you. To see how many times each client has visited, open your [client records](lesson:khach-hang)." },
      ],
    },
    {
      id: "write-the-email",
      title: "How to write a promotional email: subject line, message and offer coupon",
      blocks: [
        { p: "“Email content” starts with “Start from a template”. Tap a template, for example “Special offer”, and the fields below fill in for you, with everything still editable. Each field has its own job in the client's inbox:" },
        {
          table: {
            head: ["Field", "Where the client sees it", "How to write it"],
            rows: [
              ["“Subject line”", "The bold line in the inbox, before opening", "Short, states the offer, includes the client's name"],
              ["“Preview text”", "The lighter line right after the subject", "One more reason to open, for example the deadline"],
              ["“Headline in the email”", "The large line at the top once opened", "One sentence that matches the subject"],
              ["“Message”", "The body of the email", "A few sentences, as if talking to a regular"],
            ],
          },
        },
        { img: { src: shot("customer-name-button"), alt: "The Subject line field reading {ten}, here's 20% off just for you, with the Customer name button above it outlined in gold", caption: "{ten} in the subject or message is replaced with each client's name when the email is sent." } },
        { p: "The “Customer name” button inserts {ten} wherever your cursor is. When the email goes out, it is replaced with each client's name. In the video's preview, the subject “{ten}, here's 20% off just for you” turns into a greeting with the name Anna. A name at the start of the line is the difference between an advert and an invitation." },
        { h3: "The offer coupon and the button" },
        { p: "Switch on “Add an offer coupon” and a gold coupon stands out in the middle of the email. Type the offer in the “Offer” field. “Offer code (optional)” and “Valid until (optional)” can stay empty. A coupon with an end date gives clients a reason to book soon instead of putting it off." },
        { p: "Under “Button” there are three choices: “Booking”, “Other link” and “No button”. For a promotional email, “Booking” makes the most sense, because one tap takes the client to booking, just like the [online booking](lesson:dat-lich-online) they already know." },
        { img: { src: shot("button-booking-other-link-no-button"), alt: "The Offer field reading 20% off every service, the optional Offer code and Valid until fields, and the Button choices Booking, Other link and No button with Book now as the button text" } },
        { note: "Write the message the way you would speak to a client at the desk: familiar, short sentences and one single offer. The more ideas an email holds, the harder it is to remember what the client is being invited to do.", kind: "tip", title: "One email, one invitation" },
      ],
    },
    {
      id: "vara-points",
      title: "What are Vara points, and how many does each email cost",
      blocks: [
        { p: "Vara points are what you use to send emails in VaraaAi. The rule is short: each email sent costs 1 Vara point. Sending to 40 clients uses 40 points (40 is only an example). “Send a test” to your own address is free, and points are only used when you send to clients." },
        { p: "The “Send the campaign” step shows three numbers to check before you press send: “Recipients”, “Cost” and “Points left”. Together they tell you how many people the campaign will reach and how many points you will have afterwards." },
        { img: { src: shot("vara-points-balance-check-in"), alt: "The Vara points balance of 1000 and the Check in (+5) button outlined in gold, with the salon-owner referral link and Recent points history below", caption: "Below the “Send the campaign” step in the video: your balance, the “Check in” button and the salon's referral link." } },
        { p: "The lesson gives two ways to earn more points:" },
        {
          ul: [
            "**“Check in”.** The button sits next to your “Vara points balance”. In the video it reads “Check in (+5)”.",
            "**Referring another salon to VaraaAi.** Below it is a referral link for future salon owners that you can copy and send to owners you know. The note in the video says you earn points when someone signs up and completes their salon profile.",
          ],
        },
        { p: "“Recent points history” just below lists when points were added, so you can check them when needed." },
      ],
    },
    {
      id: "after-sending",
      title: "After sending: follow opens and clicks, plus common situations",
      blocks: [
        { p: "A sent campaign appears under the “Campaigns” tab, next to “New campaign”. There you can follow its opens and clicks. The two numbers answer different questions. Opens tell you whether the subject line made clients curious. Clicks tell you whether, after reading, they pressed the button, meaning the offer and the message convinced them." },
        { p: "Many opens but few clicks: keep the subject next time and change the offer. Few opens: work on the subject line and preview text before anything else." },
        {
          table: {
            head: ["Situation", "What to do"],
            rows: [
              ["The group you chose shows 0 customers", "Choose another group. Each group shows its count, and an empty one has nobody to send to yet"],
              ["You want the email to arrive on another day or time", "Choose “Schedule” instead of “Send now” and set the date and time"],
              ["You are not sure how the email looks in a real inbox", "Type your address under “Send a test to” and press “Send a test”. No points are used"],
              ["You want to see the email on a larger screen", "In the preview, switch between “Phone” and “Desktop”"],
              ["You do not want a button in the email", "Under “Button”, choose “No button”"],
            ],
          },
        },
        { p: "Email works best alongside a reason to come back. Two tools go well with it: [loyalty cards](lesson:the-tich-diem), which have a ready-made “Loyalty card gift” template among the email templates, and [client referrals](lesson:khach-dan-khach) for regulars who are happy to recommend you to friends." },
      ],
    },
  ],
  howTo: {
    title: "How to do salon email marketing on VaraaAi, step by step",
    id: "promotional-email-steps",
    after: "before-you-start",
    lead: "The seven steps run from top to bottom of the “New campaign” tab, in the same order as the lesson video.",
    steps: [
      {
        name: "Open “Marketing” and choose who receives it",
        text: "In the salon dashboard, press “Marketing”. Under “Choose who receives it”, tap a group: All customers, Recent customers, Haven't been back, Loyal customers, New customers or Card members. Look at the number on each card before you choose, so you know how many people the email will reach.",
        image: { src: shot("choose-who-receives-it"), alt: "The New campaign tab with the heading Choose who receives it outlined in gold and the All customers card selected next to Recent customers" },
      },
      {
        name: "Tap a template under “Email content”",
        text: "Scroll to “Email content” and tap a template, for example “Special offer”. The subject line and message fill in for you. It is quicker than starting from a blank page, and you can still change every word.",
        image: { src: shot("start-from-a-template-subject-line"), alt: "Step 2 Email content with the Start from a template row and the Subject line field reading {ten}, here's 20% off just for you outlined in gold" },
      },
      {
        name: "Edit the subject and message and add the client's name",
        text: "Change the subject line and message to match your salon's offer. Tap “Customer name” so the email greets each person by name. If you have a good photo of the salon, add it under “Picture”.",
      },
      {
        name: "Switch on “Add an offer coupon”",
        text: "Turn on the “Add an offer coupon” switch so a gold coupon stands out in the middle of the email. Type the offer below it, for example “20% off every service” as in the video. Only offer what the salon will really honour when the client comes in.",
        image: { src: shot("add-an-offer-coupon"), alt: "Step 3 Offer and button with the Add an offer coupon switch turned on and outlined in gold, and the Offer field reading 20% off every service" },
      },
      {
        name: "Choose the “Booking” button",
        text: "Under “Button”, choose “Booking” so clients can book with one tap. The “Button text” field lets you change the words on the button. Without it, a client who likes the offer still has to go looking for your booking page.",
        image: { src: shot("email-customers-get-offer-coupon"), alt: "The email a client receives: the headline A special offer just for you, a greeting to Anna, a gold coupon for 20% off every service and the Book now button outlined in gold" },
      },
      {
        name: "Press “Preview email” and “Send a test”",
        text: "Press “Preview email” to see the email exactly as it looks on a client's phone. To be sure, press “Send a test” to get a copy in your own inbox, free of charge. Check the salon name, the offer and the end date now, because a sent email cannot be changed.",
        image: { src: shot("preview-email-and-send-a-test"), alt: "Recipients 1, Cost 1 and Points left 999 above the gold send button, Save draft, the Preview email button outlined in gold and the Send a test box" },
      },
      {
        name: "Choose “Send now” or “Schedule”, then send",
        text: "Under “Send the campaign”, choose “Send now”, or “Schedule” to send it on the day and time you want. Check the number of recipients and the points left, then press the gold send button. Afterwards, open the “Campaigns” tab to follow opens and clicks.",
        image: { src: shot("send-now-or-schedule"), alt: "Step 4 Send the campaign with Send now and Schedule outlined in gold, the Recipients, Cost and Points left boxes and the gold Send button" },
      },
    ],
  },
  faq: [
    {
      q: "How much does it cost to send a promotional email to clients on VaraaAi?",
      a: "Each email sent costs 1 Vara point. A test email to your own address is free, and points are only used when you send to clients. Before you send, the “Send the campaign” step shows the recipients, the cost and the points left.",
    },
    {
      q: "How do I get more Vara points?",
      a: "The lesson gives two ways: press “Check in”, or refer another salon to VaraaAi with your referral link. Both are in the Vara points part of “Marketing”.",
    },
    {
      q: "Should a salon email all clients or split them into groups?",
      a: "Split them into groups. A come-back offer sent to “Haven't been back” works better than sending it to everyone, because clients feel the email is meant for them. “All customers” suits general salon news.",
    },
    {
      q: "How do I make the email greet each client by name?",
      a: "When you write the subject or message, press the “Customer name” button. It inserts {ten}, which is replaced with each client's name when the email is sent.",
    },
    {
      q: "Can I see the email before sending it to clients?",
      a: "Yes. Press “Preview email” to see it exactly as on a client's phone. You can also press “Send a test” to receive a copy in your own inbox without using points.",
    },
    {
      q: "Can I schedule a promotional email?",
      a: "Yes. In the “Send the campaign” step, choose “Schedule” instead of “Send now” and set the date and time you want the email to go out.",
    },
    {
      q: "How do I know whether clients opened the salon's email?",
      a: "Open the “Campaigns” tab under “Marketing”. Each sent campaign shows its opens and clicks for you to follow.",
    },
  ],
  related: ["khach-hang", "the-tich-diem", "the-khach-quen", "fanpage"],
};

export default article;
