import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mau-lich-hen/${name}.webp`;
const shot = (name: string) => `/wiki/mau-lich-hen/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "change-booking-colours-online-and-salon-bookings",
  lesson: "mau-lich-hen",
  category: "salon",
  title: "Change booking colours on VaraaAi: tell online bookings from salon-added ones at a glance",
  metaTitle: "Change booking colours: online vs salon-added bookings",
  metaDescription:
    "How to change booking colours in VaraaAi Settings so online bookings stand apart from those the salon added, and how to see exactly when each booking was made.",
  keyword: "change booking colours",
  keywords: [
    "booking colours on VaraaAi",
    "tell online bookings from salon bookings",
    "colour-coded salon calendar",
    "see when a client booked",
    "look and colours settings for the calendar",
    "what does booked online mean",
  ],
  excerpt: "Open Settings, find the “Booking colours” card and pick a colour for each kind of booking. Tap a booking to see when it was made.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-cat-toc-nam-cho-khach-trong-tiem-sang-trong"),
    alt: "A bearded barber in a waistcoat cuts a smiling man's hair with scissors and a comb in a leather chair beside a brass-framed window",
  },
  takeaways: [
    "On the calendar, bookings **“Booked online by customers”** and bookings **“Added by the salon”** have different colours, and you choose the colour for each.",
    "Where to change them: **“Settings”**, the “Look & colours” part, the **“Booking colours”** card.",
    "Each kind has its own background and text colour. Tap a ready-made colour, or use “Background” and “Text” to pick your own.",
    "If both kinds end up the same colour, the system reminds you to change one.",
    "Tap a booking to read the line “Booked online at …” or “Added by the salon at …”.",
  ],
  intro: [
    "Salon owners usually look for a way to change booking colours for a very ordinary reason: the calendar is full of blocks, and you cannot tell which ones clients booked online and which ones someone at the salon typed in after a phone call. The two kinds deserve to look different, because they tell you how clients are finding their way to you.",
    "This guide follows the VaraaAi Academy lesson “Own colours for online bookings”. You will choose a colour for each kind of booking, check the result before going back to the calendar, and learn how to see exactly when a booking was made.",
  ],
  sections: [
    {
      id: "two-kinds-of-booking",
      title: "Booked online and added by the salon: two kinds of booking on one page",
      blocks: [
        { p: "Every booking in VaraaAi comes from one of two sources. The “Booking colours” card describes each one in a short line:" },
        {
          table: {
            head: ["Kind of booking", "What it is", "Icon on the block"],
            rows: [
              ["“Booked online by customers”", "Bookings made on the booking page or website", "A globe"],
              ["“Added by the salon”", "Bookings the owner or staff added", "A person with a pen"],
            ],
          },
        },
        { img: { src: shot("two-kinds-of-bookings-two-colours"), alt: "The day calendar of three staff members with purple booking blocks and one green block with a globe icon outlined in gold", caption: "In the lesson video, bookings made online are green and bookings added by the salon are purple." } },
        { p: "Salon-added bookings are usually phone clients or walk-ins, entered by holding an empty slot on the calendar. How to add them is covered in the guide to the [salon appointment calendar](lesson:lich-hen)." },
      ],
    },
    {
      id: "why-colour-code",
      title: "Why a colour-coded salon calendar helps",
      blocks: [
        { p: "The globe icon already shows where each booking came from, but icons are small. On a phone screen in the middle of a full day, colour is what the eye catches first. Two clearly different colours let you read three things without tapping a single block:" },
        {
          ul: [
            "**How your online booking channel is doing.** A calendar that is all “Added by the salon” means clients still have to phone, and your booking link is not reaching them.",
            "**Which bookings someone at the salon entered.** If something about such a booking is unclear, ask your own team first. With online bookings, the client chose the service and the time.",
            "**Who on the team gets the most online bookings.** In day view each staff member has a column, so the colours in each column tell you.",
          ],
        },
        { p: "If most of your bookings are still in the “Added by the salon” colour, the next step is to put your [online booking link](lesson:chia-se-link) in more places, or print a [QR code booking poster](lesson:poster-qr) for the counter." },
      ],
    },
    {
      id: "choosing-colours",
      title: "Choosing booking colours that are easy to read",
      blocks: [
        { p: "Each row of the “Booking colours” card has a set of ready-made colours, each marked “Aa” so you can see how the background and text colours look together. In the lesson video each kind of booking has eight of them. Below them are “Background” and “Text” for anyone who wants to mix a completely different colour." },
        { img: { src: shot("ready-made-colours-booked-online"), alt: "The Booked online by customers row with eight ready-made colours marked Aa outlined in gold, and the Background and Text buttons below", caption: "Each ready-made colour is a matched pair of background and text colours." } },
        { p: "A few rules that come from using the calendar every day:" },
        {
          ul: [
            "**Make the two kinds clearly different.** A cool colour and a warm one are easier to tell apart than two shades of the same colour. If you pick the same colours for both, the system warns you to change one.",
            "**The text must be readable on the background.** When you pick your own “Background” and “Text”, check the “Preview” to make sure client names and times are still clear.",
            "**The whole team uses the same code.** Colours only help when everyone knows what each one means. After changing them, tell your staff.",
          ],
        },
        { note: "Completed and no-show bookings keep their own status colours. The colours you choose here show where a booking came from; they do not replace the status colours.", kind: "info", title: "Status colours stay the same" },
      ],
    },
    {
      id: "when-was-it-booked",
      title: "Seeing when a client booked in the booking details",
      blocks: [
        { p: "The colour tells you where a booking came from. To find out when it was made, tap the booking on the calendar. In the details, just below the appointment date and time, there is a small line:" },
        {
          table: {
            head: ["Kind of booking", "Line in the details", "Example from the lesson video"],
            rows: [
              ["Booked online", "“Booked online at …”", "Booked online at 09:47, 16/11/2026"],
              ["Added by the salon", "“Added by the salon at …”", "Added by the salon at 09:53, 16/11/2026"],
            ],
          },
        },
        { img: { src: shot("booked-online-at-in-booking-details"), alt: "The details of a Gel pedicure booking for €55.00 with the line Booked online at 09:47, 16/11/2026 and its globe icon outlined in gold" } },
        { p: "The line gives both the time and the date, so you know exactly when the booking was created. That helps in a few concrete cases:" },
        {
          ul: [
            "When a client says they booked ages ago and nobody at the salon remembers, you open the booking and read the exact moment.",
            "When you need to compare with the deadline in the [salon's cancellation policy](lesson:thanh-toan-chinh-sach), you have a clear timestamp instead of a guess.",
            "When you want to know at what time of day clients tend to book, you look at this line on a few recent online bookings.",
          ],
        },
        { img: { src: shot("added-by-the-salon-at-in-booking-details"), alt: "The details of a Relax massage booking for €70.00 with the line Added by the salon at 09:53, 16/11/2026 and its person icon outlined in gold", caption: "For a booking the salon entered, the line says “Added by the salon at …”." } },
      ],
    },
    {
      id: "common-situations",
      title: "Common situations when changing booking colours",
      blocks: [
        {
          table: {
            head: ["Situation", "What to do"],
            rows: [
              ["You cannot find where to change the colours", "Open “Settings”, scroll down to “Look & colours” and find the “Booking colours” card"],
              ["The system tells you to change a colour", "Both kinds have the same colours. Pick a different colour on one of the two rows"],
              ["None of the ready-made colours suits you", "Use “Background” and “Text” to pick your own"],
              ["Completed bookings did not take the new colour", "That is by design: completed and no-show bookings keep their own status colours"],
              ["You want to know who created a booking and when", "Tap the booking and read “Booked online at …” or “Added by the salon at …”"],
            ],
          },
        },
        { p: "Choosing the colours is a one-off job. From then on, every time you open the calendar you can read where each booking came from while your hands are still busy with a client." },
      ],
    },
  ],
  howTo: {
    title: "Steps to change booking colours in VaraaAi Settings",
    id: "booking-colours-steps",
    after: "why-colour-code",
    lead: "The five steps follow the lesson video, from “Settings” to checking the result on the calendar.",
    steps: [
      {
        name: "Open “Settings” and find the “Booking colours” card",
        text: "In the dashboard, open “Settings” and scroll down to “Look & colours”. Find the “Booking colours” card. It has two rows: “Booked online by customers” at the top and “Added by the salon” below.",
        image: { src: shot("booking-colours-card-in-settings"), alt: "The Booking colours card in Settings with the Booked online by customers row outlined in gold, the colour choices below and the Added by the salon row" },
      },
      {
        name: "Pick a colour for “Booked online by customers”",
        text: "On the “Booked online by customers” row, tap one of the ready-made colours. For something completely different, use “Background” and “Text” to pick your own. A bright colour suits this kind, because these are bookings that arrived without the salon typing anything.",
        image: { src: shot("background-and-text-colour-buttons"), alt: "The Background and Text buttons under the colour choices of the Booked online by customers row outlined in gold, with the Added by the salon row below" },
      },
      {
        name: "Pick a colour for “Added by the salon”",
        text: "Do the same on the “Added by the salon” row: tap a ready-made colour or use “Background” and “Text”. Choose a different tone from the row above. If both kinds end up the same colour, the system reminds you to change one.",
        image: { src: shot("colours-for-added-by-the-salon"), alt: "The Added by the salon row with its ready-made colours and the Background and Text buttons outlined in gold, with the Preview below" },
      },
      {
        name: "Check the result under “Preview”",
        text: "The “Preview” just below shows two sample blocks, one for a booking made online and one added by the salon, in the colours you just chose. Check that the two look clearly different and that the text is easy to read.",
        image: { src: shot("preview-of-both-booking-colours"), alt: "The Preview outlined in gold with a green sample block marked booked online by customers and a light purple block marked added by the salon" },
      },
      {
        name: "Open a booking to see when it was made",
        text: "Go back to the “Bookings” page and tap any booking. In the details you see the line “Booked online at …” or “Added by the salon at …”, with the time and date the booking was created.",
      },
    ],
  },
  faq: [
    {
      q: "Where do I change booking colours on VaraaAi?",
      a: "Open “Settings”, scroll down to “Look & colours” and find the “Booking colours” card. There each kind of booking has its own background and text colour to choose.",
    },
    {
      q: "Which two kinds of booking get different colours?",
      a: "“Booked online by customers”, meaning bookings made on the booking page or website, and “Added by the salon”, meaning bookings the owner or staff added. The colour tells you where a booking came from.",
    },
    {
      q: "How can I see when a booking was made?",
      a: "Tap the booking on the calendar and read the line “Booked online at …”. For a booking the salon added, the line says “Added by the salon at …”. Both give the time and date the booking was created.",
    },
    {
      q: "What if I pick the same colour for both kinds of booking?",
      a: "The system reminds you to change one. Pick a different ready-made colour on one of the two rows and check the result under “Preview”.",
    },
    {
      q: "Do completed and no-show bookings change to the new colour?",
      a: "No. Completed and no-show bookings keep their own status colours. The colours on the “Booking colours” card only tell online bookings apart from those added by the salon.",
    },
    {
      q: "Can I use a colour that is not among the ready-made ones?",
      a: "Yes. On each row, use “Background” and “Text” to pick the colours you want, then check the result under “Preview”.",
    },
  ],
  related: ["lich-hen", "thanh-toan-hoa-don", "chia-se-link", "khach-hang"],
};

export default article;
