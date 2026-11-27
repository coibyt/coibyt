import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cong-tac-vien/${name}.webp`;
const shot = (name: string) => `/wiki/cong-tac-vien/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "salon-affiliate-programme-referral-commission",
  lesson: "cong-tac-vien",
  category: "salon",
  title: "Salon affiliate programme: give each partner their own referral link, set the commission and track the clients they bring",
  metaTitle: "Salon affiliate programme: own links, commission, tracking",
  metaDescription:
    "How to use VaraaAi Affiliate marketing in a nail, hair or spa salon: add partners, set a commission, send their own link or QR code and track the commission owed.",
  keyword: "salon affiliate programme",
  keywords: [
    "affiliate marketing for salons",
    "nail salon referral partners",
    "referral commission for a spa",
    "recruit partners to refer clients",
    "personal referral link for each partner",
    "how to pay commission to referrers",
    "partner QR code for flyers",
  ],
  excerpt: "Each referrer gets their own link and QR code. A booking made through a link is credited to that person with its commission, and you pay them yourself.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("le-tan-chao-don-khach-duoc-gioi-thieu-den-salon"),
    alt: "A smiling receptionist in a purple jacket welcomes a woman in a cream coat at the salon's marble counter, with several clients waiting behind",
  },
  takeaways: [
    "Staff, friends or regular clients can all refer clients. Each person gets **their own link and QR code**.",
    "Add them under **“Marketing”, “Affiliate marketing”, “Add partner”**, with a name, email and commission percentage.",
    "The commission is **5%, 10%, 15%, 20%** or your own figure, calculated on the value of bookings made through the link.",
    "You can follow each partner's link clicks, bookings, revenue and commission owed.",
    "**VaraaAi only tracks and calculates the commission.** You pay your partners yourself, then record the payment.",
  ],
  intro: [
    "A salon affiliate programme brings in new clients without paying for advertising up front: you only pay when someone actually books. The hard part has always been the bookkeeping. A client says a friend sent her, nobody remembers all of them by the end of the month, and the most enthusiastic referrer is the one most likely to be short-changed.",
    "This guide follows the VaraaAi Academy lesson “Affiliates who bring customers”. You will add a partner, set their commission, send them their own link or QR code, and read the results to know how much you owe to whom.",
  ],
  sections: [
    {
      id: "what-it-is",
      title: "What affiliate marketing for salons is, and who can be a partner",
      blocks: [
        { p: "Affiliate marketing is the formal name for something every salon has done: asking people you know to recommend you and thanking them with a commission. The software simply replaces the notebook. Each referrer gets their own link. When a client books through a link, the system credits the booking to that person, with its commission." },
        { p: "The lesson names three groups who can bring clients to the salon: staff, friends and regular clients. In practice, a good referrer is someone who meets your kind of client before you do. Examples from this guide: a bridal make-up artist, a friend with a large social media following, or one of your own technicians who wants to bring her regulars along." },
        { p: "Do not confuse this with the [client referral programme](lesson:khach-dan-khach). Both aim at new clients, but they suit different kinds of referrer:" },
        {
          table: {
            head: ["", "Client referral", "Affiliate marketing"],
            rows: [
              ["Who refers", "Clients with the salon's loyalty card", "Partners you add: staff, friends, regular clients"],
              ["Reward", "Tickets on the loyalty card", "A percentage commission"],
              ["Who rewards", "The system adds tickets automatically", "You pay; VaraaAi only tracks"],
            ],
          },
        },
      ],
    },
    {
      id: "before-you-start",
      title: "What to prepare before recruiting partners to refer clients",
      blocks: [
        { p: "Entering a partner takes a minute. What takes time is the agreement with the referrer. Agree on three things, in person or by message, before you create the link:" },
        {
          ul: [
            "**The percentage.** It is calculated on the value of bookings made through the link.",
            "**When you pay.** For example at the end of each month. In the video, the sample partner's “Note” field says exactly that.",
            "**How you pay.** VaraaAi does not transfer money for you, so the two of you choose how payment is made.",
          ],
        },
        { p: "You also need the partner's name and email. If you want an easy-to-remember link, think of a short code for them, such as their name with a number." },
        { note: "How commission is recorded and taxed differs from country to country, and the lesson does not cover it. If your salon pays commission regularly, ask your accountant.", kind: "warn", title: "Ask your accountant about commission" },
      ],
    },
    {
      id: "set-commission",
      title: "Referral commission: what it is calculated on and what percentage to set",
      blocks: [
        { p: "In “Commission (%)”, tap one of the preset rates, 5%, 10%, 15% or 20%, or type another figure. The note under the field explains the calculation: it is a share of the value of bookings made through the link. The example on screen: a €50.00 booking at 10% gives €5.00 commission." },
        { p: "The lesson does not recommend a figure, and the video only uses 10% as an example. When you decide for yourself, three things are worth weighing:" },
        {
          ul: [
            "**What the salon keeps after paying.** The commission is calculated on the booking value, while the salon still pays for products and the technician's time.",
            "**Whether new clients come back.** A referred client who becomes a regular is worth many times the first appointment.",
            "**Fairness between partners.** People doing the same thing should get the same rate, so nobody feels compared.",
          ],
        },
        { p: "Each partner has their own rate, shown next to their name in the list, for example “10% commission”. The pencil icon next to the name lets you edit the partner's details." },
      ],
    },
    {
      id: "link-and-qr",
      title: "A personal referral link and QR code for each partner",
      blocks: [
        { p: "Once saved, the partner appears under “Your partners” with their own link. The partner shares it, and clients tap it and book as usual. Clients do not have to enter a code or mention anyone's name, because the link already carries that information." },
        { p: "The “Link code (optional)” field is up to you. Its note says: capital letters and numbers, 3–20 characters; leave it empty for a random one. A code with the referrer's name helps them recognise their link and share it with confidence." },
        { img: { src: shot("partner-qr-code-for-flyers"), alt: "The window Camille Laurent's QR code with a large QR code on a purple card outlined in gold, the salon's name above and the link below", caption: "Each partner's QR code: print it on flyers or business cards, or keep it at their counter." } },
        { p: "The QR code is for places where nobody can tap a link. Download it and print it on flyers or business cards. Scanning it opens the booking page, and the booking is credited to the right partner. A partner with a shop of their own can keep a card with the code at their counter." },
        { note: "This is each partner's own link, different from the salon's general booking link in the guide to [sharing your booking link](lesson:chia-se-link). Bookings made through the general link earn nobody a commission.", kind: "info", title: "Personal link and general link" },
      ],
    },
    {
      id: "track-and-pay",
      title: "Tracking results and paying commission to referrers",
      blocks: [
        { p: "The top of the “Affiliate marketing” page shows the totals: partners, link clicks, bookings referred, revenue referred and commission owed. You can view them for 30 days, 90 days, 12 months or all time." },
        { img: { src: shot("affiliate-totals-clicks-bookings-commission-owed"), alt: "The Affiliate marketing totals with the Partners, Link clicks, Bookings referred and Revenue referred tiles outlined in gold, and the gold Commission owed tile below", caption: "The gold “Commission owed” tile counts visits that have happened, minus what you have paid." } },
        { p: "The small print in “Commission owed” matters: it counts visits that have happened, minus what you have already paid. Below, each partner has four numbers of their own. Reading them in pairs tells you a lot:" },
        {
          table: {
            head: ["What you see", "What it may mean"],
            rows: [
              ["Many clicks, few bookings", "People are interested but not booking. Check your booking page: services, prices, free times"],
              ["Few clicks", "The partner has not shared the link much. Ask what they need, such as a QR code to print"],
              ["Steady bookings and revenue", "A partner worth keeping. Pay on time and thank them"],
            ],
          },
        },
        { img: { src: shot("still-owed-all-paid"), alt: "A partner card with clicks, bookings, revenue and commission, and the Still owed box showing All paid outlined in gold", caption: "Each partner's “Still owed” box. When nothing is owed, it says “All paid”." } },
        { p: "VaraaAi only does the tracking. You pay the commission to your partner in the way you agreed. Once paid, use “Record payment” so your books stay clear. Record it on the day you pay. Leave it for a few months and even you will not remember how far you have paid." },
        { p: "These totals only count clients who came through partners. For the salon as a whole, see the [overview page](lesson:tong-quan)." },
      ],
    },
    {
      id: "everyday-situations",
      title: "Common situations when working with partners",
      blocks: [
        {
          table: {
            head: ["Situation", "What to do"],
            rows: [
              ["A partner wants a link that reads well for clients", "Set a “Link code (optional)” with their name when adding them"],
              ["A partner hands out flyers and cannot send a link", "Tap the QR icon next to their link to download the code for printing"],
              ["A partner asks how much they have earned this month", "Check the commission and “Still owed” on their card"],
              ["A client says she was referred but booked through the general link", "Only bookings through a personal link are credited. Remind partners to always share their own link"],
            ],
          },
        },
        { p: "If you want a partner's printout to look like the salon's own posters, paste their personal link into the [QR poster tool](lesson:poster-qr), because the poster's QR code opens whatever link you paste in. For regular clients who are happy to recommend you without a commission, the client referral programme and the [loyalty card](lesson:the-tich-diem) are a lighter option." },
      ],
    },
  ],
  howTo: {
    title: "Steps to set up a salon affiliate programme in VaraaAi",
    id: "affiliate-steps",
    after: "before-you-start",
    lead: "The seven steps go from opening “Affiliate marketing” to paying the commission, in the order of the lesson video.",
    steps: [
      {
        name: "Open “Marketing”, then “Affiliate marketing”",
        text: "In the business dashboard, tap “Marketing”. The “Affiliate marketing” button is at the top of that page. Tap it to open the partner page.",
      },
      {
        name: "Tap “Add partner”",
        text: "At the top of the page is a short introduction and the gold “Add partner” button. Tap it to open the “Add a new partner” form.",
        image: { src: shot("add-partner-button-affiliate-marketing"), alt: "The Affiliate marketing page with the gold Add partner button outlined in gold, and the period buttons and Partners and Link clicks tiles below" },
      },
      {
        name: "Fill in “Partner name” and email",
        text: "Enter the “Partner name” and their email. Use the full name so the list stays clear once you have several partners.",
        image: { src: shot("add-a-new-partner-name-and-email"), alt: "The Add a new partner form with the Partner name and Email fields outlined in gold, and Phone and the commission rates below" },
      },
      {
        name: "Choose the “Commission (%)”",
        text: "Tap 5%, 10%, 15% or 20%, or type another figure in the field below. This is a percentage of the value of bookings made through the link, so choose the rate you both agreed.",
        image: { src: shot("choose-commission-percentage"), alt: "The Commission (%) field with the rates 5%, 10%, 15% and 20%, 10% selected, and the example of a €50.00 booking giving €5.00 commission" },
      },
      {
        name: "Set a link code if you like, then tap “Save”",
        text: "You can choose your own easy-to-remember link code, or leave it empty for a random one. The “Note” field is the place to record your agreement, such as when commission is paid. Then tap “Save”.",
        image: { src: shot("set-link-code-for-partner"), alt: "The Link code (optional) field with CAMILLE10 outlined in gold, its note about capital letters and numbers, and the Note field and Save button below" },
      },
      {
        name: "Copy the link or download the QR code for the partner",
        text: "Under “Your partners”, tap the copy icon to get the partner's own link and send it to them. Tap the QR icon if they need a code to print on flyers or business cards.",
        image: { src: shot("copy-partner-link"), alt: "A partner card under Your partners with the copy icon next to the partner's personal link outlined in gold" },
      },
      {
        name: "Follow the results and record payments",
        text: "Every time a client books through the link, VaraaAi records the link clicks, bookings, revenue and commission owed for each partner. You pay them yourself. Once paid, record the payment.",
        image: { src: shot("results-for-each-partner"), alt: "A partner card with the Clicks, Bookings, Revenue and Commission tiles outlined in gold, and the Still owed box below" },
      },
    ],
  },
  faq: [
    {
      q: "How does the system know which partner referred a client?",
      a: "Each partner has their own link and QR code. A booking made through a link is credited to that partner, with its commission.",
    },
    {
      q: "Who pays the commission to the salon's partners?",
      a: "The salon owner pays. VaraaAi only tracks and calculates the commission. After paying, record the payment so your books stay clear.",
    },
    {
      q: "What is a partner's commission calculated on?",
      a: "On the value of bookings made through the partner's link. You choose 5%, 10%, 15%, 20% or your own figure. The example on screen: a €50.00 booking at 10% gives €5.00 commission.",
    },
    {
      q: "Who can be a referral partner for a salon?",
      a: "Staff, friends or regular clients. You add them as partners in “Affiliate marketing”, and each one gets their own link.",
    },
    {
      q: "How do I put a partner's link on a flyer?",
      a: "Use the partner's QR code. Under “Your partners”, tap the QR icon to download the code and print it on flyers or business cards. Scanning it opens the salon's booking page.",
    },
    {
      q: "Can I give each partner an easy-to-remember link code?",
      a: "Yes. The “Link code (optional)” field takes capital letters and numbers, 3–20 characters. If you leave it empty, a random code is created.",
    },
  ],
  related: ["khach-dan-khach", "tong-quan", "chia-se-link", "poster-qr"],
};

export default article;
