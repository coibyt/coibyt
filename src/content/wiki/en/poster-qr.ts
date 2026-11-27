import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/poster-qr/${name}.webp`;
const shot = (name: string) => `/wiki/poster-qr/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "qr-code-poster-for-salon-bookings",
  lesson: "poster-qr",
  category: "marketing",
  title: "QR code poster for salon bookings: make a free “Scan to book” poster in a few minutes",
  metaTitle: "QR code poster for salons: make a free Scan to book poster",
  metaDescription:
    "How to make a booking QR code poster for a nail, hair or beauty salon with VaraaAi's free tool: paste your link, pick a headline, style and size, get PDF or PNG.",
  keyword: "QR code poster for salon",
  keywords: [
    "scan to book poster",
    "booking QR code for nail salon",
    "free QR code poster maker",
    "QR code sign for salon door",
    "print QR code A4, A5 or A6",
    "where to put a QR code in a salon",
    "QR code table tent for salon",
  ],
  excerpt: "Enter your link, pick a headline, style and size, then download a PDF or PNG. The tool is free, needs no sign-in and no design skills.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-va-chu-tiem-ben-the-dung-tai-quay-salon"),
    alt: "A man and a woman laugh together at a salon's marble counter, both looking at a phone beside a gold-framed table sign",
  },
  takeaways: [
    "VaraaAi's QR poster maker is **free and needs no sign-in**. A salon account only fills in the link for you.",
    "The QR code opens exactly the link you paste: your booking page, website, Facebook or Instagram.",
    "**“Download PDF”** is for printing, **“Download PNG”** is for social media.",
    "**Scan the code with your own phone** before you print a stack of copies.",
    "Four places that work: the glass door, the till, the nail desk and the mirror in front of the client's chair.",
  ],
  intro: [
    "A QR code poster for salon bookings works at two moments an online link cannot reach: when someone walks past your door, and when a client is waiting at the counter. They hold up their phone once and your booking page opens, with no need to ask anyone or remember the salon's name to search for it later.",
    "This guide follows the VaraaAi Academy lesson on making a “Scan to book” QR poster. You will make a finished poster in a few minutes, choose the right size for each spot in the salon and check the code before it goes to print.",
  ],
  sections: [
    {
      id: "why-a-qr-poster",
      title: "Why your salon needs a “Scan to book” poster",
      blocks: [
        { p: "A client who has just had a beautiful set of nails done is the person most likely to book the next visit. But at that moment they are standing at the counter with their wallet out, and they will not open a browser to type a web address. A QR code right in front of them turns that intention into a booking before they leave." },
        { p: "A poster also works when the salon is closed. Someone walking past late in the evening sees the poster on the glass door, scans the code and books for another day." },
        { p: "A poster like this used to mean hiring a designer. The tool in this lesson does the design for you: you enter your details and choose a style. It is free and works straight away, without signing in." },
      ],
    },
    {
      id: "before-you-start",
      title: "What to have ready before you make a QR code for your salon",
      blocks: [
        {
          ul: [
            "**The link clients open when they scan.** Your salon's booking page is the best choice; the guide to [sharing your booking link](lesson:chia-se-link) shows where to find it. You can also use your own link, such as your website, Facebook or Instagram.",
            "**Your salon name**, spelt exactly as on your sign.",
            "**Your logo file**, if you have one.",
            "**Where the poster will go.** The door, a table or Instagram decides which size you choose.",
          ],
        },
        { note: "If you do not have an online booking page yet, you can create one in a few minutes at no cost. See the guide to [registering and activating your salon](lesson:dang-ky-salon). When you are signed in with a salon account, the poster maker can fill in the link for you.", kind: "info", title: "No booking link yet" },
      ],
    },
    {
      id: "poster-text",
      title: "What to put on the poster: languages, headline and extra lines",
      blocks: [
        { p: "The “Poster text” section has three choices. Make each one based on your clients, not on personal taste." },
        { h3: "Languages" },
        { p: "A poster can show up to three languages side by side, and the first one you pick is the main language. That suits salons whose clients come from many countries: put the local language first, then add the languages your regular client groups speak." },
        { h3: "Headline" },
        { p: "Pick a ready-made “Headline” such as “Scan to book” or “Book here”. The headline is what clients read from a distance, so it should say one thing only: what scanning this code does." },
        { h3: "Extra lines" },
        { p: "Below the headline you can add “Extra lines (optional)”: “Offer”, “Opening hours”, “Phone” and “Wi-Fi”. None of them are required. The Wi-Fi line has a useful side effect: waiting clients often look for the Wi-Fi password, and when they find it on the poster they also see the QR code." },
        { note: "Do not fill in every line just because the box is there. The less text on the poster, the more the QR code and headline stand out. Choose one or two extra lines that are most useful where the poster will hang.", kind: "tip", title: "Less text, easier scanning" },
      ],
    },
    {
      id: "choose-size",
      title: "Print the QR code as A4, A5, A6 or a sticker: choose by where it goes",
      blocks: [
        { p: "The “Design” section has four styles, “Minimal”, “Luxury”, “Pastel” and “Seasonal”, and a “Main color” palette so the poster matches your salon. Then comes the “Format”. These are the sizes available and where each one fits:" },
        {
          table: {
            head: ["Format", "Where to use it"],
            rows: [
              ["“A4 portrait” or “A5 portrait”", "On the door"],
              ["“A6 (table)”", "On a table"],
              ["“Folded table tent”", "Standing on the counter or a desk"],
              ["“Round sticker 10 cm”", "On small surfaces"],
              ["“Instagram 1080×1080” and “Story 1080×1920”", "Posting on Instagram"],
            ],
          },
        },
        { p: "You do not have to pick just one. Once the A4 poster for the glass door is done, switch the format to A6 and download another copy for the nail desk. The text and style stay the same, so everything printed in the salon looks like one set." },
        { img: { src: shot("download-pdf-or-png"), alt: "Below the finished poster, the purple Download PDF button and the Download PNG button, with the tool's three short steps underneath", caption: "“Download PDF” gives you a file for printing, “Download PNG” an image for social media." } },
      ],
    },
    {
      id: "where-to-put-it",
      title: "Where to put a QR code in your salon",
      blocks: [
        { p: "The lesson names four places: the glass door, the till, the nail desk and the mirror in front of the client's chair. Each one catches clients at a different moment:" },
        {
          table: {
            head: ["Place", "When clients see it"],
            rows: [
              ["Glass door", "When they walk past, even after closing time"],
              ["Till", "When they have just finished and are paying, the easiest moment to book again"],
              ["Nail desk", "For the whole treatment, with the code within reach"],
              ["Mirror in front of the chair", "During a hair appointment, when the client is looking at the mirror"],
            ],
          },
        },
        { p: "If the QR code leads to your VaraaAi booking page, the [Overview](lesson:tong-quan) page counts the scans over the last 30 days. That number tells you whether the poster is being used and whether it should move somewhere else." },
      ],
    },
    {
      id: "check-before-printing",
      title: "Check before you print, and a few common situations",
      blocks: [
        { p: "Before you print many copies, scan the code once with your phone to make sure it opens the right booking page. One wrong character in the link and the whole stack of paper goes in the bin." },
        { img: { src: shot("edit-and-preview-buttons"), alt: "The QR poster maker on a phone with the Edit and Preview buttons outlined in gold, and the Salon details section with the salon name below", caption: "On a phone the tool has two buttons: “Edit” to enter your details and “Preview” to see the poster." } },
        {
          table: {
            head: ["Situation", "What to do"],
            rows: [
              ["The code opens the wrong page", "Check the link under “QR code & booking link”, correct it and download the poster again"],
              ["You cannot see the poster on your phone", "Press the “Preview” button at the top"],
              ["You want to post the poster on social media", "Choose the square or story format, then press “Download PNG”"],
              ["You are signed in with a salon account", "Choose “My VaraaAi booking page” so the link is filled in for you"],
            ],
          },
        },
        { p: "If the salon needs more printed material with a QR code, see the guide to the [multilingual price list](lesson:bang-gia), where you can also add your booking QR code to the price list." },
      ],
    },
  ],
  howTo: {
    title: "How to make a QR code poster for your salon",
    id: "qr-poster-steps",
    after: "before-you-start",
    lead: "These eight steps follow the order of the sections in the tool. They work on a phone or a computer.",
    steps: [
      {
        name: "Open the poster maker",
        text: "Open varaaai.com, scroll to the bottom and tap “QR booking poster maker”, or go straight to the [QR poster maker](/tools/qr-poster). You can use it immediately, without signing in. On a phone you will see two buttons, “Edit” and “Preview”.",
        image: { src: shot("qr-booking-poster-maker-link-in-footer"), alt: "The bottom of the VaraaAi home page on a phone with the QR booking poster maker link outlined in gold in the Business group" },
      },
      {
        name: "Enter the “Salon name” and upload a logo",
        text: "Under “Salon details”, enter the “Salon name” and upload your logo if you have one. The salon name appears above the poster's headline, so write it as it is on your sign so clients recognise it.",
        image: { src: shot("salon-name-and-logo-on-qr-poster"), alt: "The Salon details section of the poster maker with Lumi Beauty Paris in the Salon name field and the Logo upload box outlined in gold" },
      },
      {
        name: "Paste the link under “QR code & booking link”",
        text: "Paste the link clients will open when they scan. It can be your own link, such as your website, Facebook or Instagram. If you are signed in with your VaraaAi salon account, choose “My VaraaAi booking page” and the link is filled in for you.",
        image: { src: shot("paste-booking-link-for-qr-code"), alt: "The QR code and booking link section with My own link selected and the field holding the salon's booking page address outlined in gold" },
      },
      {
        name: "Choose languages and a headline",
        text: "Under “Poster text”, choose one to three languages. Then pick a ready-made “Headline”, for example “Scan to book” or “Book here”.",
        image: { src: shot("headline-scan-to-book"), alt: "The Headline box with the suggestions Scan to book, Book your next visit and Book here, Scan to book selected and outlined in gold" },
      },
      {
        name: "Add extra lines if you need them",
        text: "Fill in any extra lines you want on the poster: “Offer”, “Opening hours”, “Phone”, “Wi-Fi”. They are optional, so only fill in the ones that really help where the poster will hang.",
        image: { src: shot("extra-lines-offer-opening-hours-wifi"), alt: "The optional extra lines Offer, Opening hours, Phone and Wi-Fi outlined in gold, with the Design section below" },
      },
      {
        name: "Choose a style and “Main color”",
        text: "Under “Design”, choose one of four styles: “Minimal”, “Luxury”, “Pastel” or “Seasonal”. Then pick a “Main color” that matches your salon's walls, chairs or logo.",
        image: { src: shot("poster-style-and-main-color"), alt: "The four poster styles Minimal, Luxury, Pastel and Seasonal outlined in gold, with the Main color palette below" },
      },
      {
        name: "Choose the format",
        text: "Choose the format for where the poster will be used: A4 or A5 for the door, A6 for a table, a folded table tent, a round sticker, or the square and story sizes for Instagram.",
        image: { src: shot("poster-format-a4-a5-a6-sticker-instagram"), alt: "The Format options A4 portrait, A5 portrait, A6 (table), Folded table tent, Round sticker 10 cm, Instagram and Story outlined in gold" },
      },
      {
        name: "Press “Preview” and download",
        text: "Press “Preview” to see the finished poster. If you are happy with it, press “Download PDF” to print it or “Download PNG” to post it on social media. Scan the code once with your phone before printing many copies.",
        image: { src: shot("scan-to-book-poster-preview"), alt: "Preview of a black poster with the salon name, the headline Scan to book, the line Book online 24/7 and a large QR code in a gold frame" },
      },
    ],
  },
  faq: [
    {
      q: "Is VaraaAi's QR poster maker free, and do I need to sign in?",
      a: "It is free and you do not need to sign in. The tool is open to everyone and works straight away. A salon account only fills in your booking link for you when you choose “My VaraaAi booking page”.",
    },
    {
      q: "Where does the QR code on the poster lead?",
      a: "To exactly the link you paste under “QR code & booking link”. That can be your salon's booking page or your own link, such as your website, Facebook or Instagram.",
    },
    {
      q: "Should I download the poster as a PDF or a PNG?",
      a: "Press “Download PDF” for printing and “Download PNG” for social media. You can download both from the same poster.",
    },
    {
      q: "Where should I put a QR code poster in my salon?",
      a: "Four places work well: the glass door, the till, the nail desk and the mirror in front of the client's chair. Those are the spots clients see when walking past, when paying and during their treatment.",
    },
    {
      q: "Can a QR poster show more than one language?",
      a: "Yes. You can choose one to three languages, and they all appear side by side on the poster. This suits salons whose clients speak different languages.",
    },
    {
      q: "How can I see how many people scanned my QR code?",
      a: "If the QR code leads to your VaraaAi booking page, the Overview page in your dashboard counts the scans over the last 30 days.",
    },
    {
      q: "What should I do before printing many copies?",
      a: "Scan the code once with your phone to make sure it opens the right booking page. If it opens the wrong page, correct the link in the tool and download the poster again.",
    },
  ],
  related: ["chia-se-link", "bang-gia", "website-salon", "tong-quan"],
};

export default article;
