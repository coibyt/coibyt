import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/the-tich-diem/${name}.webp`;
const shot = (name: string) => `/wiki/the-tich-diem/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "salon-loyalty-programme",
  lesson: "the-tich-diem",
  category: "marketing",
  title: "Salon loyalty programme: set up QR loyalty cards, add tickets and give regulars their discount",
  metaTitle: "Salon loyalty programme with QR cards: set-up guide",
  metaDescription:
    "How to run a loyalty programme for a nail, hair or spa salon on VaraaAi: set the visits needed for a discount, activate QR cards and add a ticket at each visit.",
  keyword: "salon loyalty programme",
  keywords: [
    "loyalty programme for a spa",
    "loyalty card for a nail salon",
    "reward regular clients with a discount",
    "salon loyalty software",
    "how to keep regular clients at a hair salon",
    "scan a QR code to add loyalty points",
    "how much discount for loyal clients",
  ],
  excerpt: "Every visit earns a ticket, and enough tickets earn a discount. Set three numbers once, email each client a QR card and press “Add 1 ticket” when they come in.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("le-tan-don-khach-tai-quay-salon-sang-trong"),
    alt: "A smiling receptionist in a plum suit reaches out to greet a client in a cream coat at the salon's marble counter, with clients waiting behind",
  },
  takeaways: [
    "The programme runs on one rule: **every visit earns a ticket, and enough tickets earn a discount**.",
    "Fill in three fields under “Program settings”: “Visits needed for a discount”, “Discount (%)” and “Card price (0 = free)”.",
    "To give a client a card you only need their name and email: press **“Activate and email the QR”**.",
    "When the client comes in, scan the QR code or type the code printed on the card, then press **“Add 1 ticket”**.",
    "A ticket is only added when the client has a past appointment that has not been scanned yet, so tickets can never outrun real visits.",
  ],
  intro: [
    "A salon loyalty programme does not need to be as complicated as an airline's or a supermarket's. A beauty salon needs one promise that is easy to understand: come a certain number of times and you get a discount. Your regulars are the most valuable thing your salon has, and that promise gives them one more reason not to try somewhere else.",
    "This guide follows the VaraaAi Academy lesson “QR loyalty cards in the dashboard”. You will be able to set up the programme, activate a card for a client, add tickets when they visit and keep track of who is close to their discount.",
  ],
  sections: [
    {
      id: "how-the-programme-works",
      title: "How a loyalty programme for a spa or nail salon works",
      blocks: [
        { p: "On VaraaAi the loyalty programme lives under “Loyalty cards” in the salon dashboard. The line at the top of the page sums up the whole process: give customers a loyalty card, scan it each visit and apply rewards." },
        {
          ol: [
            "You set the rule once: how many visits earn a discount, and how many per cent it is.",
            "You activate a card for the client. They receive a card with a QR code by email.",
            "At every visit you scan the code and add one ticket.",
            "When the client has enough tickets, their card shows a reward waiting. You give them the discount and keep adding tickets as usual.",
          ],
        },
        { p: "In the dashboard the unit the client collects is called a **ticket**, and the scan screen calls the client's card a loyalty member card. You can see what the client sees in the guide to the [salon loyalty card](lesson:the-thanh-vien), written for their side." },
      ],
    },
    {
      id: "before-you-start",
      title: "When “Loyalty cards” opens up, and what to prepare",
      blocks: [
        { note: "“Loyalty cards” unlocks once your salon profile is at least 85% complete. You can see the figure on the “Profile completeness” card in Settings. If you are not there yet, the guide to the [salon profile](lesson:ho-so-salon) shows how to complete the description, logo and cover photo.", kind: "info", title: "Profile at least 85% complete" },
        { p: "Before you fill anything in, decide three things on paper:" },
        {
          ul: [
            "**How many visits earn a discount.** The lesson video uses 5 visits as its example.",
            "**How big the discount is.** The video's example is 15%.",
            "**Whether the card is free or sold.** Leave the price at 0 for a free card, or set a price if you want to sell it.",
          ],
        },
        { p: "You also need the client's email to send the card. If your team gets into the habit of asking for an email when a client books or pays, activating cards becomes much quicker." },
      ],
    },
    {
      id: "program-settings",
      title: "How much discount for loyal clients: the three fields in “Program settings”",
      blocks: [
        {
          table: {
            head: ["Field", "What it means", "How to think about it"],
            rows: [
              ["“Visits needed for a discount”", "How many tickets a client needs for the reward", "Close enough that a client who comes regularly can see it within reach"],
              ["“Discount (%)”", "The discount the client gets with a full set of tickets", "Worth collecting for the client, and affordable for you when many clients reach it at once"],
              ["“Card price (0 = free)”", "The price of the card, with its currency", "Leave it at 0 if you want as many clients as possible to have a card"],
            ],
          },
        },
        { p: "The lesson does not recommend a particular number, because it depends on your prices and how often your clients come. One way to check yourself: work out how long an ordinary regular would take to collect enough tickets. If it takes so long that they forget they are collecting, the reward is too far away." },
        { p: "After you save, a short summary line under “Program settings” states the rule in a few words. In the video it reads 5 visits, 15% off and a free card. Reading that line back is the quickest way to be sure you typed what you meant." },
      ],
    },
    {
      id: "tickets-follow-appointments",
      title: "Why tickets are tied to appointments that have taken place",
      blocks: [
        { p: "A paper stamp card has a familiar weakness: whoever holds the stamp can add one more. The programme in the dashboard closes that gap with one rule. A ticket is only added when the client has a past appointment that has not been scanned yet, so the number of tickets can never be higher than the number of real visits." },
        { p: "That rule means one thing for the salon: the client's visit has to be in the salon's calendar. If you already [manage your appointments](lesson:lich-hen) on VaraaAi, there is nothing extra to do. For walk-in clients, put the visit in the calendar too, because the ticket follows the appointment." },
        { img: { src: shot("scanned-plus-1-point-loyalty-member"), alt: "The Loyalty member card for Nam outlined in gold under the message Scanned! +1 point (2/5), with a ring showing 2 of 5 tickets and 3 more tickets for 15% off", caption: "After a scan the screen shows the client's card: how many tickets they have and how many more they need for the discount." } },
      ],
    },
    {
      id: "track-cardholders",
      title: "Track your cardholders and give the discount when the card is full",
      blocks: [
        { p: "The top of the “Loyalty cards” page has four counters: “Cardholders”, “Total scans”, “Rewards given” and “Rewards waiting”. The last one is worth a look every morning, because it tells you how many clients are holding a discount they have not used yet." },
        { img: { src: shot("cardholders-total-scans-rewards-waiting"), alt: "The four counters Cardholders, Total scans, Rewards given and Rewards waiting outlined in gold at the top of the Loyalty cards page, above the scan box", caption: "The programme's four numbers, just above the box for scanning a card when a client visits." } },
        { p: "When a client has enough tickets, their card shows a reward waiting. Give them the discount on that visit, then carry on adding tickets as usual. Tell the client at the desk that today's visit is discounted: it is the moment the programme pays back their loyalty, and they remember it." },
        { p: "The “Cardholders” list below shows how many tickets each client has and how many times their card has been scanned. Clients who are one ticket short are the best people to invite back. The guide to [email marketing](lesson:email-marketing) has a ready-made group for loyalty card members, so you can write to exactly the people who are collecting." },
      ],
    },
    {
      id: "free-card-or-dashboard",
      title: "The free stamp card and the dashboard loyalty programme compared",
      blocks: [
        { p: "VaraaAi has two ways to run a loyalty card, taught in two different lessons. They share an idea but suit different situations:" },
        {
          table: {
            head: ["Point", "Free stamp card", "Dashboard loyalty programme"],
            rows: [
              ["Getting started", "From the bottom of the home page, with a trial straight away", "“Loyalty cards”, unlocked at 85% profile completeness"],
              ["Unit", "Stamps, with “Add 1 stamp” at each visit", "Tickets, tied to appointments that have taken place"],
              ["Reward", "A line of text you write yourself", "A percentage discount"],
              ["Inviting friends", "Not covered in the lesson", "Every card has its own invite link"],
            ],
          },
        },
        { p: "A salon without a VaraaAi booking page can start with the [free stamp card](lesson:the-khach-quen). A salon that already takes bookings on VaraaAi is better served by the dashboard programme, because tickets follow the calendar and regulars can bring new clients through their invite link, as the guide to [client referrals](lesson:khach-dan-khach) explains." },
        {
          table: {
            head: ["Situation", "What to do"],
            rows: [
              ["You cannot see “Loyalty cards”", "Check “Profile completeness” in Settings. The page opens at 85%"],
              ["You pressed “Add 1 ticket” but the count did not go up", "A ticket is only added for a past appointment that has not been scanned. Check the client's appointments"],
              ["The camera will not read the QR code", "Type the code printed on the card into the box, then press “Add 1 ticket”"],
              ["You want to sell the card instead of giving it away", "Enter a price in “Card price (0 = free)” and press “Save”"],
            ],
          },
        },
      ],
    },
  ],
  howTo: {
    title: "How to set up a salon loyalty programme on VaraaAi",
    id: "loyalty-programme-steps",
    after: "before-you-start",
    lead: "The six steps follow the lesson video in order: set things up once, then repeat the last steps every time a client visits.",
    steps: [
      {
        name: "Open “Loyalty cards” and find “Program settings”",
        text: "In the salon dashboard, press “Loyalty cards” and find “Program settings”. Enter the “Visits needed for a discount”, meaning how many times the client has to come, then the “Discount (%)”.",
        image: { src: shot("program-settings-visits-needed-for-a-discount"), alt: "The Program settings heading outlined in gold, with the fields Visits needed for a discount set to 5, Discount (%) set to 15 and Card price (0 = free)" },
      },
      {
        name: "Enter “Card price (0 = free)” and press “Save”",
        text: "Leave the price at 0 if the card is free, or enter a price if you want to sell it. Press “Save”. Read the summary line under the heading to check that the rule is what you intended.",
        image: { src: shot("card-price-0-free-and-save"), alt: "Program settings with 5 visits, 15 per cent discount and a card price of 0 EUR, and the black Save button outlined in gold next to Cancel" },
      },
      {
        name: "Activate a card for the client",
        text: "Under “Activate a card for a customer”, enter the client's name and email. “Phone (optional)” can stay empty. Press “Activate and email the QR”, and the client gets their card with its QR code by email straight away.",
        image: { src: shot("activate-and-email-the-qr"), alt: "The Activate a card for a customer section filled in with the name Nam and an email address, with the black Activate and email the QR button outlined in gold" },
      },
      {
        name: "Scan the card at the visit and press “Add 1 ticket”",
        text: "Each time the client comes in, scan the QR code on their card with your phone camera, or type the code printed on the card into the box under “Scan a card when a customer visits”. Then press “Add 1 ticket”.",
        image: { src: shot("add-1-ticket-at-each-visit"), alt: "The Scan a card when a customer visits box with a card code typed in and the orange Add 1 ticket button outlined in gold, above the Cardholders list" },
      },
      {
        name: "Check the scan confirmation",
        text: "The screen confirms the scan and shows the client's card: how many tickets they have and how many more they need for the discount. Tell the client the number, so they know how far they are from the reward.",
      },
      {
        name: "Give the discount when the card is full",
        text: "When the client has enough tickets, their card shows a reward waiting. Give them the discount, then keep adding tickets as usual. In the “Cardholders” list you can see how many tickets each client has and how many times their card has been scanned.",
        image: { src: shot("cardholders-list-tickets"), alt: "The Cardholders list with Nam's card outlined in gold, showing 2 of 5 tickets, 2 scans and 0 rewards, with the Summary and Details buttons" },
      },
    ],
  },
  faq: [
    {
      q: "How does a salon loyalty programme on VaraaAi work?",
      a: "Every time the client visits, you add one ticket to their QR loyalty card. When they reach the number of tickets you set, they get the percentage discount you chose. After that you keep adding tickets as usual.",
    },
    {
      q: "Why can I not see “Loyalty cards” in my dashboard?",
      a: "“Loyalty cards” unlocks once your salon profile is at least 85% complete. Check the “Profile completeness” card in Settings and fill in what is missing.",
    },
    {
      q: "How does a client get their loyalty card?",
      a: "Enter the client's name and email under “Activate a card for a customer” and press “Activate and email the QR”. The client receives the card with its QR code by email straight away.",
    },
    {
      q: "How do I add a ticket when the client visits?",
      a: "Scan the QR code on the client's card with your phone camera, or type the code printed on the card, then press “Add 1 ticket”. The screen confirms the scan and shows the client's tickets.",
    },
    {
      q: "What does a card price of 0 mean?",
      a: "It means the card is free. If you want to sell the card, enter a price in “Card price (0 = free)” and press “Save”.",
    },
    {
      q: "Can a client collect more tickets than visits?",
      a: "No. A ticket is only added when the client has a past appointment that has not been scanned yet. That is why the number of tickets can never be higher than the number of real visits.",
    },
  ],
  related: ["khach-dan-khach", "the-khach-quen", "the-qua-tang-salon", "email-marketing"],
};

export default article;
