import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/hoa-don/${name}.webp`;
const shot = (name: string) => `/wiki/hoa-don/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "salon-invoice-by-qr-code",
  lesson: "hoa-don",
  category: "booking",
  title: "Salon invoice by QR code: get your receipt on your phone at the counter or by email",
  metaTitle: "Salon invoice by QR code: your receipt on your phone",
  metaDescription:
    "How to get your salon invoice by QR code after a treatment: scan the code on the salon's screen, read services, VAT and total, save the link or get it by email.",
  keyword: "salon invoice by QR code",
  keywords: [
    "digital receipt from a salon",
    "scan a QR code for a receipt",
    "beauty treatment invoice for my company",
    "get a salon invoice by email",
    "save a hair salon receipt",
    "electronic salon invoice",
  ],
  excerpt: "Scan the QR code on the salon's screen when you pay and the invoice opens on your phone. Not at the counter? Ask the staff to email it.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-thanh-toan-tai-quay-salon-va-nhan-hoa-don-tren-dien-thoai"),
    alt: "A woman holding her phone stands at a salon counter while a smiling blond receptionist faces her, with a card terminal on the counter",
  },
  takeaways: [
    "When you pay at the counter, ask the staff to press **“Show QR code”** on the salon's screen.",
    "Open your phone's camera and scan the code: the invoice opens in your browser straight away.",
    "The invoice shows the salon's name, invoice number, date and time, services, tax, total and how you paid.",
    "**Take a screenshot** or **save the link** to look at it again any time.",
    "Not at the counter? Ask the staff to email the invoice, then tap the link in the email.",
  ],
  intro: [
    "A paper receipt from a beauty appointment tends to sit in a coat pocket for a few days and then vanish, just when you need it to check your spending or send it to your company. At salons that use VaraaAi you get your salon invoice by QR code instead: one scan at the counter and the invoice is on your phone.",
    "This guide follows the VaraaAi Academy lesson “Open your invoice with a QR code”. You will learn which button the staff press, how to scan the code, what each part of the invoice tells you, how to keep it so you can find it later, and what to do when you are not at the counter.",
  ],
  sections: [
    {
      id: "why-a-phone-invoice",
      title: "What an invoice on your phone is good for",
      blocks: [
        { p: "The lesson gives two reasons customers want to keep the invoice: to check it later, and to send it to their company. The first is familiar to anyone who tracks their spending: what you had done last time, what it cost, how you paid. The second applies to people whose employer covers part of the cost and needs a document for it." },
        { p: "Both are easier when the invoice is a link rather than a slip of paper. A link does not crease or fade, and passing it on to someone takes seconds." },
        { note: "You do not need a separate app to receive the invoice. In the lesson, the phone's own camera scans the code and the invoice opens in the browser.", kind: "info", title: "What you need" },
      ],
    },
    {
      id: "reading-the-invoice",
      title: "Reading the invoice: what each part tells you",
      blocks: [
        { p: "The invoice reads from top to bottom: who sold, to whom, what, and for how much. The table follows the example invoice in the lesson video." },
        {
          table: {
            head: ["Part of the invoice", "What it shows"],
            rows: [
              ["Salon name", "The name and address of the place where you had the treatment"],
              ["Invoice number, date and time", "The invoice's own reference and when it was issued. Quote this when you ask the salon about a payment"],
              ["QR code “Scan to view this invoice”", "A code that opens this same invoice again later"],
              ["Services", "Each service you had, with quantity, unit price and total"],
              ["Tax and total", "The subtotal, the VAT and the total you paid"],
              ["Payment method", "How you paid, for example cash"],
            ],
          },
        },
        { img: { src: shot("vat-total-and-payment-method"), alt: "The end of the invoice on a phone highlighted in gold, with the subtotal, VAT at 20%, the total and Payment method Cash", caption: "Tax, total and payment method are at the end of the invoice." } },
        { p: "Glance through the invoice while you are still at the counter. If a service is missing or the amount differs from what you just paid, it is far easier to sort out then than a few days later." },
      ],
    },
    {
      id: "scan-or-email",
      title: "Scan at the counter or get the invoice by email",
      blocks: [
        { p: "There are two ways for the invoice to reach you, and both lead to the same invoice page." },
        {
          table: {
            head: ["How", "What you do", "Suits you when"],
            rows: [
              ["Scan the QR code at the counter", "Ask the staff to press “Show QR code” and scan it with your phone's camera", "You are at the counter with your phone in hand"],
              ["By email", "Ask the staff to email the invoice, open the email and tap the link", "You have left, your phone is flat, or someone else paid for you"],
            ],
          },
        },
        { note: "When you ask for the invoice by email, spell your address slowly for the staff and ask them to read it back. One wrong character and the invoice goes astray.", kind: "tip", title: "Spell your email clearly" },
      ],
    },
    {
      id: "keeping-the-invoice",
      title: "How to keep the invoice so you can find it again",
      blocks: [
        { p: "The lesson suggests two ways to keep it: a screenshot, or saving the link. Each has its strengths." },
        {
          ul: [
            "**Screenshot:** quickest, and it works without a connection. A long invoice may need two screenshots to cover both the services and the total.",
            "**Saved link:** opens the full invoice again. Bookmark the page in your browser, or send the link to yourself in a messaging app.",
            "**The QR code on the invoice:** the invoice carries its own “Scan to view this invoice” code. If you screenshot the top of the invoice, next time you can simply scan the code in that picture.",
          ],
        },
        { img: { src: shot("services-and-prices-on-invoice"), alt: "An invoice on a phone with the Gel manicure service line, quantity, unit price and total highlighted in gold", caption: "When you take a screenshot, include both the services and the total." } },
        { note: "Which documents a company accepts for reimbursement depends on the company and the country. Before you send it, ask your finance team whether a link or a screenshot of the invoice is enough, or whether they need more details from the salon.", kind: "warn", title: "Sending the invoice to your company" },
      ],
    },
    {
      id: "common-situations",
      title: "Common situations when getting a salon invoice",
      blocks: [
        {
          table: {
            head: ["Situation", "What to do"],
            rows: [
              ["The staff do not offer the code", "Say you would like the invoice and ask them to press “Show QR code” on the salon's screen"],
              ["The camera will not read the code", "Hold the phone a little closer and steady, and avoid glare on the screen"],
              ["You remember only after leaving", "Contact the salon and ask for the invoice by email"],
              ["You closed the invoice page by mistake", "Open the saved link again, or scan the QR code in your screenshot of the invoice"],
              ["A service is missing or wrong on the invoice", "Tell the staff at the counter straight away so the salon can check it"],
            ],
          },
        },
        { p: "To contact the salon once you are home, you can [message the salon](lesson:chat-voi-salon) on VaraaAi, or find its phone number in [My bookings](lesson:lich-hen-cua-toi). That section also shows the date, time and price of each appointment." },
        { p: "If you are paying with a [gift card](lesson:the-qua-tang), or collecting tickets on a [member card](lesson:the-thanh-vien), the counter is also the moment to show that card's code to the staff." },
        { note: "Salons take payment at the counter, email invoices or let customers scan the QR code from their dashboard. See the lesson [Checkout and invoices](lesson:thanh-toan-hoa-don).", kind: "info", title: "Own a salon?" },
      ],
    },
  ],
  howTo: {
    title: "Steps to open your salon invoice by QR code",
    id: "invoice-steps",
    after: "why-a-phone-invoice",
    lead: "The first three steps happen at the counter and take less than a minute. The rest are for when you are not at the counter or want to open the invoice again.",
    steps: [
      {
        name: "Ask the staff to press “Show QR code”",
        text: "Once you have paid, the salon's screen shows “Payment confirmed” with the invoice number and the amount. Ask the staff to press “Show QR code”. A QR code appears on the screen for you to scan.",
        image: { src: shot("salon-screen-payment-confirmed"), alt: "The salon's screen showing Payment confirmed with the invoice number and 45 euros, above View / download invoice and the Email the invoice field" },
      },
      {
        name: "Scan the code with your phone's camera",
        text: "Open your phone's camera and point it at the QR code. Tap the link your phone suggests. The invoice opens straight away in your browser.",
        image: { src: shot("invoice-qr-code-on-salon-screen"), alt: "The QR code on the salon's screen highlighted in gold, with the line Customer scans to download the invoice below it" },
      },
      {
        name: "Read the invoice",
        text: "Check the salon's name, invoice number, date and time at the top. Scroll down for the services you had, the tax, the total and the payment method. If anything looks wrong, ask the staff right away.",
        image: { src: shot("invoice-opens-on-phone-after-scan"), alt: "The top of the invoice on a phone highlighted in gold, with the salon's name, address, invoice number, date and time and a small QR code" },
      },
      {
        name: "Take a screenshot or save the link",
        text: "Take a screenshot of the invoice, or save the page's link, so you can look at it again whenever you like. If you need to send it to your company, the link is the easiest thing to forward.",
      },
      {
        name: "Not at the counter: ask for the invoice by email",
        text: "If you are not at the counter, the staff can email the invoice to you. Open the email and tap the link, and the invoice opens exactly as it does when you scan the code.",
        image: { src: shot("email-the-invoice-to-customer"), alt: "The salon's screen with the Email the invoice field and Send button highlighted in gold, and the Show QR code button below" },
      },
      {
        name: "Next time: scan the QR code on the invoice",
        text: "The invoice carries its own QR code with the line “Scan to view this invoice”. When you need it again, scan this code instead of hunting for the old link.",
        image: { src: shot("scan-to-view-this-invoice-qr"), alt: "The salon's invoice on a phone with the small QR code next to the invoice number highlighted in gold" },
      },
    ],
  },
  faq: [
    {
      q: "How do I get the invoice on my phone at the salon counter?",
      a: "Ask the staff to press “Show QR code” on the salon's screen, then open your phone's camera and scan the code. The invoice opens straight away in your browser.",
    },
    {
      q: "What does the salon invoice show?",
      a: "The salon's name, the invoice number, the date and time, the services you had, the tax, the total and how you paid. That is enough to keep it or send it to your company.",
    },
    {
      q: "I have already left the salon. How do I get the invoice?",
      a: "Ask the staff to email the invoice. The email contains a link; tap it to see the invoice without going back to the salon.",
    },
    {
      q: "How do I find an old invoice again?",
      a: "Open the screenshot or the link you saved. The invoice also carries its own “Scan to view this invoice” QR code, so next time you can simply scan that.",
    },
    {
      q: "Do I need to install an app to scan the invoice code?",
      a: "In the lesson, the phone's own camera scans the code and the invoice opens in the browser. You need nothing but your phone.",
    },
    {
      q: "Can I send this invoice to my company?",
      a: "The invoice shows the salon's name, the invoice number, the services, the tax, the total and the payment method, and you can forward it as a link or a screenshot. Which documents your company accepts depends on its own rules, so check with your finance team.",
    },
  ],
  related: ["the-qua-tang", "the-thanh-vien", "theo-doi-salon", "lich-hen-cua-toi"],
};

export default article;
