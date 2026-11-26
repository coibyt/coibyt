import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/chia-se-link/${name}.webp`;
const shot = (name: string) => `/wiki/chia-se-link/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "salon-booking-link-share-online",
  lesson: "chia-se-link",
  category: "marketing",
  title: "Salon booking link: how to get the link, QR code and embed code so clients can book from anywhere",
  metaTitle: "Salon booking link: get the link, QR code and embed code",
  metaDescription:
    "Where to find your salon booking link on VaraaAi, how to share it on Facebook, Instagram and in messages, download the QR code and embed booking on your website.",
  keyword: "salon booking link",
  keywords: [
    "add a booking link to Instagram bio",
    "booking link for Facebook page",
    "online booking link for nail salon",
    "salon QR code for bookings",
    "embed booking page on website",
    "booking button for salon website",
    "public booking page",
  ],
  excerpt: "One booking page, three ways to reach clients: copy the link for social media and messages, download the QR code for print, get the embed code for your website.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-mo-link-dat-lich-tren-dien-thoai"),
    alt: "A blonde woman in a purple scarf sits by a café window with a cup of coffee, looking at her phone",
  },
  takeaways: [
    "Your booking link sits **at the top of “Settings”**, under “Public booking page”.",
    "Tap the **copy icon** to copy the link, then paste it on your Facebook page, in your Instagram bio or in a message to a client.",
    "Tap the **QR icon** to download your salon's QR code for business cards, flyers or the counter.",
    "With your own website, use “Copy link” to put the link behind a button, or **“Get embed code”** so clients book right on your site.",
    "Before you share anything, press “View page” to see your salon page exactly as clients see it.",
  ],
  intro: [
    "A salon booking link only earns its keep when clients come across it. You can have every service, price and opening hour entered, but if the link stays hidden in your dashboard, clients keep messaging to ask whether you have a slot tomorrow.",
    "This guide follows the VaraaAi Academy lesson “Share your booking link”. You will learn where to find the link, how to download the QR code, how to add booking to your own website, and where to place each of them so clients actually see them.",
  ],
  sections: [
    {
      id: "why-share",
      title: "Why your booking link belongs everywhere clients look",
      blocks: [
        { p: "Clients do not go looking for your booking page. They are scrolling Instagram and see a set of nails they like, or they are on your Facebook page checking your opening hours. The wish to book appears right there, and it fades fast if they have to leave that spot to hunt for a phone number." },
        { p: "So the lesson's rule is simple: the more places your link appears, the easier it is for clients to book. Every place your salon shows up, from Facebook and Instagram to Google, your own website and the counter, should lead straight to your booking page." },
        { p: "None of this costs anything. VaraaAi is free for salon owners and for clients, and everything you need is already on the “Settings” page." },
      ],
    },
    {
      id: "link-qr-embed",
      title: "Booking link, salon QR code or embed code: which to use where",
      blocks: [
        { p: "All four tools below lead to the same booking page. They differ only in where you put them:" },
        {
          table: {
            head: ["Tool", "Where to find it", "Where to use it"],
            rows: [
              ["Booking link", "Copy icon under “Public booking page”", "Facebook page, Instagram bio, messages to clients"],
              ["QR code", "QR icon right next to it", "Business cards, flyers, the counter"],
              ["Link for your website", "“Copy link” under “Website & booking widget”", "Behind a button on your own website"],
              ["Embed code", "“Get embed code” in the same section", "Pasted into your website so clients book there"],
            ],
          },
        },
        { p: "The link is for places where clients can tap. The QR code is for anything printed, where nobody can tap and people simply hold up their phone to scan. The last two only matter once you have a website of your own." },
      ],
    },
    {
      id: "check-public-page",
      title: "Check your public booking page through a client's eyes first",
      blocks: [
        { p: "The “View page” button opens your salon page exactly as clients see it. Press it before you send the link anywhere, and look at the page as someone who has never been to your salon." },
        { img: { src: shot("salon-page-as-customers-see-it"), alt: "A salon's public page on a tablet with the name, a 5.0 star rating, address, phone number, a short description and the Book now and Chat with salon buttons", caption: "The salon page clients see when they open your link: name, address, description and the “Book now” button." } },
        {
          ul: [
            "**Name, address and phone number** are correct. If not, fix them in your [salon profile](lesson:ho-so-salon).",
            "**Services and prices** are complete and right. See the guide to [adding services and prices](lesson:dich-vu).",
            "**Opening hours** match reality, because clients can only book within your [opening hours](lesson:gio-mo-cua).",
          ],
        },
        { p: "Sharing a half-finished page wastes the effort. A client taps, finds it empty, and rarely taps again next time." },
      ],
    },
    {
      id: "facebook-instagram-messages",
      title: "Adding your booking link to Facebook, your Instagram bio and messages",
      blocks: [
        { p: "The lesson names three places to paste the link first: your salon's Facebook page, your Instagram bio and messages sent straight to clients." },
        {
          ul: [
            "**Facebook page:** put the link in the page information and repeat it in posts about new looks or offers.",
            "**Instagram bio:** this is where clients look when they open your profile after seeing a photo they like.",
            "**Messages:** when a client asks whether you have a free slot, send the link instead of listing times. They see what is free and pick a time themselves.",
          ],
        },
        { img: { src: shot("copy-booking-link-on-overview"), alt: "The Overview page of the salon dashboard with the Copy booking link button outlined in gold next to View salon page, Open calendar and Messages", caption: "The “Overview” page also has a “Copy booking link” button, handy when you need to send it quickly." } },
        { note: "When you are replying to a client, you do not need to go into “Settings”. Open “Overview”, press “Copy booking link” and paste it into the chat.", kind: "tip", title: "Send it quickly" },
      ],
    },
    {
      id: "salon-qr-code",
      title: "Your salon QR code for bookings: where to print it",
      blocks: [
        { p: "Scanning the QR code opens your booking page directly. The lesson suggests three places to print it: business cards, flyers and the counter. A client who has just finished and is standing at the counter to pay is in the best position to book the next visit." },
        { p: "The QR code you download from “Settings” works well inside business cards or flyers you already have a design for. If you want a finished poster with a “Scan to book” heading without designing anything, see the guide to [making a QR code booking poster](lesson:poster-qr). The [multilingual price list](lesson:bang-gia) tool can also add your booking QR code to a price list." },
      ],
    },
    {
      id: "own-website",
      title: "Embed your booking page on your website or add a booking button",
      blocks: [
        { p: "The “Website & booking widget” section sits further down the “Settings” page. Its “Embed booking page” box has two buttons for two different approaches:" },
        { img: { src: shot("website-and-booking-widget-section"), alt: "The Website and booking widget section with the Embed booking page box outlined in gold, an embed address and the View page, Copy link and Get embed code buttons" } },
        {
          ul: [
            "**“Copy link”:** you get an address to put behind a button on your website, for example a “Book” button. Clients who press it go to your booking page.",
            "**“Get embed code”:** you get a piece of code. Paste it into your website and the booking page appears right there, so clients book without leaving your site.",
          ],
        },
        { p: "If someone else built your website, copy the link or the code and send it to them. If you do not have a website yet, see the guide to a [salon website of your own](lesson:website-salon)." },
        { p: "Once the link is out on your channels, the [online salon check](/salon-check) shows how your salon looks across your website, Google, Facebook and Instagram." },
      ],
    },
  ],
  howTo: {
    title: "How to get and share your salon booking link on VaraaAi",
    id: "share-booking-link-steps",
    after: "link-qr-embed",
    lead: "The first five steps are for every salon. The last two are only needed if you have your own website.",
    steps: [
      {
        name: "Open “Settings” and find “Public booking page”",
        text: "In the dashboard, open “Settings”. Right at the top, below the salon name, is the “Public booking page” box with your salon's address and three buttons underneath.",
        image: { src: shot("public-booking-page-in-settings"), alt: "The top of the Settings page with the salon name and the Public booking page box showing the salon's booking address outlined in gold" },
      },
      {
        name: "Tap the copy icon to copy the link",
        text: "Tap the copy icon, the first button on the left. The booking link is copied to your phone or computer, ready to paste.",
        image: { src: shot("copy-icon-booking-link"), alt: "The copy icon under the Public booking page address outlined in gold, with the QR icon and the View page button beside it" },
      },
      {
        name: "Paste the link into Facebook, Instagram or a message",
        text: "Open your salon's Facebook page, your Instagram bio or a chat with a client and paste the link. Tap it once yourself after pasting to make sure it opens your salon's page.",
      },
      {
        name: "Tap the QR icon to download the QR code",
        text: "Tap the QR icon next to it to download your salon's QR code. Use the file to print on business cards and flyers, or print it out for the counter.",
        image: { src: shot("qr-code-icon-download"), alt: "The QR icon between the copy icon and the View page button outlined in gold in the Public booking page box" },
      },
      {
        name: "Press “View page”",
        text: "Press “View page” to see your salon page as clients see it. Check the name, address, services and the booking button before you promote the link more widely.",
        image: { src: shot("view-page-button"), alt: "The gold View page button outlined in the Public booking page box at the top of the salon Settings page" },
      },
      {
        name: "With your own website: press “Copy link”",
        text: "Scroll down to “Website & booking widget”. Press “Copy link” and put that address behind a button on your website.",
        image: { src: shot("copy-link-for-website-button"), alt: "The Embed booking page box with the Copy link button outlined in gold and the black Get embed code button below it" },
      },
      {
        name: "Or press “Get embed code”",
        text: "If you want clients to book right on your website, press “Get embed code” and paste the code into your web page. The booking page then appears exactly where you pasted it.",
        image: { src: shot("get-embed-code-button"), alt: "The black Get embed code button outlined in gold in the Embed booking page box of the Website and booking widget section" },
      },
    ],
  },
  faq: [
    {
      q: "Where do I find my salon's public booking link?",
      a: "At the top of the “Settings” page, under “Public booking page”. That box has a copy icon, a QR icon and a “View page” button. The “Overview” page also has a “Copy booking link” button.",
    },
    {
      q: "Where should I put my salon booking link?",
      a: "Start with your salon's Facebook page, your Instagram bio and messages to clients. If you have a website, add it behind a button there too. The more places the link appears, the easier it is for clients to book.",
    },
    {
      q: "What is the salon's QR code for?",
      a: "It is for printing on business cards and flyers or putting on the counter. A client scans it with their phone and your booking page opens directly, without typing an address.",
    },
    {
      q: "How can clients book directly on my own website?",
      a: "In “Settings”, scroll down to “Website & booking widget” and press “Get embed code”. Paste that code into your website and the booking page appears right there.",
    },
    {
      q: "What is the difference between “Copy link” and “Get embed code”?",
      a: "“Copy link” gives you an address to put behind a button on your website, and clients who press it go to your booking page. “Get embed code” gives you code to paste into your website, so clients book on your own page.",
    },
    {
      q: "How can I see my salon page the way clients see it?",
      a: "Press “View page” in the “Public booking page” box at the top of “Settings”. It opens your salon page exactly as clients see it when they tap your link.",
    },
  ],
  related: ["poster-qr", "bang-gia", "website-salon", "kiem-tra-salon"],
};

export default article;
