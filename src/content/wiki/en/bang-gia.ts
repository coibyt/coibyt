import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/bang-gia/${name}.webp`;
const shot = (name: string) => `/wiki/bang-gia/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "salon-price-list-template",
  lesson: "bang-gia",
  category: "marketing",
  title: "Salon price list template: 9 steps to a free multilingual price list with a booking QR code",
  metaTitle: "Salon price list template: make yours free in 9 steps",
  metaDescription:
    "Make a price list for a nail, hair or beauty salon with VaraaAi's free tool: add services, translate them, add a booking QR code and download a PDF or PNG.",
  keyword: "salon price list template",
  keywords: [
    "nail salon price list",
    "free price list maker",
    "beauty salon price list design",
    "hair salon price list",
    "multilingual price list for a salon",
    "price list with booking QR code",
    "print price list A4, A5 or A3",
  ],
  excerpt: "Enter services and prices, choose languages, paste your booking link, pick a style and paper size, then download a PDF or PNG. Free, no design skills needed.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("chuyen-vien-noi-mi-cho-khach-trong-spa"),
    alt: "A therapist in a cream uniform uses tweezers to apply lash extensions to a client lying on a spa bed, beside a ring light and a gold tool tray",
  },
  takeaways: [
    "VaraaAi's price list maker is **free** and needs no design skills. You only sign in if you want to save the list and edit it later.",
    "A price list can show **1–3 languages side by side**. The first one is the main language, and **“Translate automatically”** translates service names for you.",
    "If a price is only a starting price, tick the **“From” price** box and the list shows “from …” before the amount.",
    "Paste your booking page link under “Booking QR code” so clients can scan the price list and book.",
    "**“Download PDF”** is for printing for the counter, **“Download PNG”** is for social media.",
  ],
  intro: [
    "Anyone looking for a salon price list template usually needs something very specific: a smart sheet that can be read from the counter, lists every service and price, and is finished in one evening. Downloading a template and editing it in design software takes time, and every price change means asking someone for help again. It is quicker to use a tool with the layout already built, where you only type in services and prices.",
    "This guide follows the VaraaAi Academy lesson “Make a multilingual price list”. You will make a complete price list for a nail salon, hair salon or spa, shown in several languages and with a booking QR code, and download it to print or post.",
  ],
  sections: [
    {
      id: "why-a-clear-price-list",
      title: "Why your salon needs a clear, good-looking price list",
      blocks: [
        { p: "A clear price list helps clients decide faster. When they can see the service, the price and the time it takes on paper, they choose for themselves instead of feeling awkward asking about each item. Your team also stops answering the same question over and over while their hands are busy with another client." },
        { p: "For a salon whose clients speak several languages, the price list also does some of the translating. The lesson's example is a list in Finnish, English and Vietnamese at the same time. Each client reads their own language, and client and technician can point at the same line." },
        { p: "The price list in this guide is a sheet to print or an image to post. It is not the same as the service menu on your booking page, which drives the calendar and is entered in the dashboard. That has its own guide on the [salon service menu](lesson:dich-vu)." },
      ],
    },
    {
      id: "before-you-start",
      title: "What to have ready before you make a salon price list",
      blocks: [
        { p: "The tool works from top to bottom through its sections. With these ready, you can fill it in in one go:" },
        {
          ul: [
            "**Salon name, address and phone number**, exactly as on your sign.",
            "**Your logo file**, if you have one. The logo box in the video takes PNG, JPG or SVG files up to 2 MB.",
            "**Your list of services**, grouped by category, each with a price and the minutes it takes.",
            "**The languages your clients read**, and the currency you charge in.",
            "**Your booking page link**, if you want a QR code on the price list. The guide to the [salon booking link](lesson:chia-se-link) shows where to find it.",
          ],
        },
        { note: "The “Booking QR code” section has a “No QR code” option, so you can make a price list even if you do not take online bookings yet. To get a link, see the guide to [registering and activating your salon](lesson:dang-ky-salon); it is free too.", kind: "info", title: "No booking link yet" },
      ],
    },
    {
      id: "multilingual-price-list",
      title: "A multilingual price list for a salon with international clients",
      blocks: [
        { p: "The “Languages & currency” section lets you choose one to three languages shown side by side on the same price list. The first language you pick is the main language, so it is worth thinking about the order: put first the language most of your clients read." },
        { img: { src: shot("languages-and-currency-on-price-list"), alt: "The Languages and currency section with the language list outlined in gold, English marked as the main language, an Add language button and EUR chosen as the currency", caption: "The hint in the tool: pick 1–3 languages shown side by side, and the first one is the main language." } },
        { p: "If you would rather not type each service name in every language, press “Translate automatically” and the tool translates the service names for you. Read the translations once before printing, especially for service names that are specific to your salon, because those are the exact words clients will read." },
        { p: "Choose the currency just below, in the “Currency” box. The example list in the video uses EUR. Choose the currency you charge so the figure on the list matches the amount at the till." },
      ],
    },
    {
      id: "how-to-show-prices",
      title: "How to show prices: fixed prices, “from” prices and descriptions",
      blocks: [
        { p: "Each service line has three main fields, the service name, the price and “Minutes”, with two small options underneath. Using the right option means no surprises for the client at the till." },
        {
          table: {
            head: ["Option", "When to use it", "What clients see"],
            rows: [
              ["Price only", "The service has one fixed price", "The amount you enter, with the currency"],
              ["Tick “From” price", "The price is only a starting price, depending on hair length or how complex the design is", "“from …” before the amount"],
              ["“Add description”", "You need to explain briefly what the service includes", "A short line under the service name"],
            ],
          },
        },
        { p: "The “Minutes” field tells clients how much time to set aside. In the lesson video, the example services in the “Nails” category include a gel manicure of 60 minutes, a gel pedicure of 75 minutes and nail art of 30 minutes. These are only examples; enter the real times for your salon." },
        { note: "A service that clients often query the price of deserves a description. One line saying whether the price includes removing the old product, for example, saves an awkward conversation at the counter.", kind: "tip", title: "Short descriptions in the right place" },
      ],
    },
    {
      id: "style-and-paper-size",
      title: "Choose a price list design and paper size for where it will be used",
      blocks: [
        { p: "The “Design” section has three styles: “Minimal”, “Luxury” and “Colorful”. Below them is the “Main color” palette so the list matches your salon, then the “Format”. These are the four formats in the video, with suggestions for where each one works:" },
        {
          table: {
            head: ["Format", "Suggested use"],
            rows: [
              ["“A4 portrait”", "Printed for the counter or slipped into a menu folder"],
              ["“A5 portrait”", "On a workstation, close to where clients sit"],
              ["“A3 poster”", "On a wall or the glass door, readable from a distance"],
              ["Instagram 1080×1080", "A square image for social media"],
            ],
          },
        },
        { img: { src: shot("main-color-and-paper-format"), alt: "The Design section with the Main color palette outlined in gold, and below it the Format options A4 portrait, A5 portrait, A3 poster and Instagram" } },
        { p: "The suggestions above are ordinary salon practice, not rules of the tool. You can download the same price list in several formats: an A4 copy for the counter and a square one for your social media page." },
        { p: "Just below the formats is a box for the small line saying the list was made free at VaraaAi.com. According to the hint on screen, salons registered on VaraaAi can hide this line." },
      ],
    },
    {
      id: "after-downloading",
      title: "After you download the price list: print, post and update when prices change",
      blocks: [
        { p: "Before printing many copies, read every price line again and scan the QR code with your phone. A typo on a sheet already on the counter turns into an explanation for every client." },
        { p: "Your prices will change. To avoid typing everything again next time, sign in and press “Save to my account”. The price list is kept, and you can open it and edit it whenever you need to." },
        { img: { src: shot("save-price-list-to-my-account"), alt: "The line Sign in to save your price lists and edit them later with the Save to my account link outlined in gold, above the Edit and Preview buttons", caption: "“Save to my account” sits above the “Edit” and “Preview” buttons." } },
        {
          table: {
            head: ["Situation", "What to do"],
            rows: [
              ["The price varies from client to client", "Tick “From” price so the list shows “from …”"],
              ["You do not want to type service names in several languages", "Press “Translate automatically” in “Languages & currency”, then check the translations"],
              ["The salon has no booking page yet", "Choose “No QR code”, or create a booking page and come back to paste the link"],
              ["You want to edit the price list later", "Sign in and press “Save to my account”"],
            ],
          },
        },
        { p: "If you also want a sign that only invites clients to scan and book, see the guide to the [QR code poster for salon bookings](lesson:poster-qr). Both tools have Minimal and Luxury styles and a “Main color” palette. Choose the same style and colour, and the price list and poster look like a set side by side." },
      ],
    },
  ],
  howTo: {
    title: "How to make a free salon price list on VaraaAi",
    id: "price-list-steps",
    after: "before-you-start",
    lead: "These nine steps follow the order of the sections in the tool, from top to bottom as in the lesson video.",
    steps: [
      {
        name: "Open the price list maker",
        text: "Open varaaai.com, scroll to the bottom and tap “Free price list maker” in the “Business” group, or go straight to the [price list maker](/tools/price-list). You can start typing straight away.",
        image: { src: shot("free-price-list-maker-link-in-footer"), alt: "The bottom of the VaraaAi home page on a phone with the Free price list maker link outlined in gold in the Business group" },
      },
      {
        name: "Fill in “Salon details”",
        text: "Under “Salon details”, enter the salon name, address and phone number. If you have a logo, upload it in the “Logo” box just below. The salon name appears at the top of the price list, so write it as it is on your sign.",
        image: { src: shot("salon-details-name-address-phone"), alt: "The Salon details section with Lumi Beauty Paris in the Salon name field outlined in gold, and the Address, Phone and Logo fields below" },
      },
      {
        name: "Choose languages and currency",
        text: "Under “Languages & currency”, press “Add language” to choose the languages for the price list, for example Finnish, English and Vietnamese, then choose the currency. If you would rather not type each language, press “Translate automatically” to translate the service names.",
      },
      {
        name: "Pick a category and press “Add service”",
        text: "Under “Services & prices”, tap a ready-made category such as “Nails”, “Hair salon” or “Spa & massage”. Then press “Add service” for each line. Grouping by category helps clients find their section without reading the whole sheet.",
        image: { src: shot("add-a-category-nails-hair-spa"), alt: "The Add a category box outlined in gold with the buttons Nails, Hair salon, Barber, Brows and lashes, Spa and massage, Skincare and facials, Makeup, Wellness and Other category" },
      },
      {
        name: "Enter the service name, price and “Minutes”",
        text: "For each service, type the name, the price and the number of minutes. Use the names clients actually use. The minutes should be the real treatment time, so clients can plan their visit.",
        image: { src: shot("service-name-price-and-minutes"), alt: "The Nails category with the Gel manicure line outlined in gold, the price field showing 45 and the minutes field showing 60, with Gel pedicure below" },
      },
      {
        name: "Tick “From” price and add a description if needed",
        text: "If the price is only a starting price, tick the “From” price box under that service. To explain more, press “Add description” and write a short line. Both options are set separately for each service.",
        image: { src: shot("from-price-and-add-description"), alt: "The From price tick box under the Gel manicure service outlined in gold, with the Add description link beneath it and Gel pedicure further down" },
      },
      {
        name: "Paste the link under “Booking QR code”",
        text: "Under “Booking QR code”, paste your salon's booking page link into the link field. The QR code on the price list then takes clients straight to that page, so scanning it is enough to book. If you do not take online bookings yet, choose “No QR code”.",
        image: { src: shot("booking-qr-code-link-for-price-list"), alt: "The Booking QR code section with the options My own link and No QR code, and the field holding the salon's booking page address outlined in gold" },
      },
      {
        name: "Choose a style, “Main color” and format",
        text: "Under “Design”, choose one of three styles: “Minimal”, “Luxury” or “Colorful”. Then pick a “Main color” and the format. Match the style and colour to your salon's interior and logo, so the price list looks like part of the counter.",
        image: { src: shot("price-list-style-minimal-luxury-colorful"), alt: "The Design section with the three styles Minimal, Luxury and Colorful outlined in gold, Luxury selected, and the Main color palette below" },
      },
      {
        name: "Press “Preview” and download",
        text: "Press “Preview” to see the finished price list with the salon name, each service category, prices, minutes and the QR code at the bottom. If you are happy with it, press “Download PDF” to print it for the counter or “Download PNG” to post it on social media.",
        image: { src: shot("price-list-preview-with-qr-code"), alt: "Preview of a black A4 portrait price list for Lumi Beauty Paris with nail services and prices, and a Scan to book QR code at the bottom" },
      },
    ],
  },
  faq: [
    {
      q: "Is it free to make a nail salon price list on VaraaAi?",
      a: "Yes. The price list maker is completely free and you do not need design skills. If you sign in, you can also save the price list to your account and edit it later.",
    },
    {
      q: "How many languages can a price list show at once?",
      a: "You can choose one to three languages shown side by side on the same price list, for example Finnish, English and Vietnamese. The first language you choose is the main language.",
    },
    {
      q: "What does “Translate automatically” do in the price list maker?",
      a: "It is in the “Languages & currency” section and translates the service names into the languages you have chosen. You do not have to type every service name in every language yourself.",
    },
    {
      q: "When should I tick the “From” price box?",
      a: "When the price is only a starting price and can be higher depending on the client. The price list then shows “from …” before the amount, so clients understand it is not the final price.",
    },
    {
      q: "Why add a booking QR code to a price list?",
      a: "The QR code takes clients straight to your salon's booking page. A client looking at the price list only needs to scan it with their phone to book, without phoning or searching for the salon online.",
    },
    {
      q: "Should I download the price list as a PDF or a PNG?",
      a: "Press “Download PDF” when you want to print the price list for the counter. Press “Download PNG” when you want to post it on social media.",
    },
  ],
  related: ["poster-qr", "chia-se-link", "website-salon", "dich-vu"],
};

export default article;
