import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/thanh-toan-hoa-don/${name}.webp`;
const shot = (name: string) => `/wiki/thanh-toan-hoa-don/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "salon-checkout-software-payments-and-invoices",
  lesson: "thanh-toan-hoa-don",
  category: "salon",
  title: "Salon checkout software: take payment at the counter and send the invoice by email or QR code",
  metaTitle: "Salon checkout software: pay at the counter, invoices",
  metaDescription:
    "How to check out clients on VaraaAi in a nail, hair or spa salon: fill in invoice details, choose the payment method, then email the invoice or show a QR code.",
  keyword: "salon checkout software",
  keywords: [
    "nail salon checkout",
    "pay at the counter in a salon",
    "how to invoice a nail client",
    "email an invoice to a client",
    "invoice by QR code for salons",
    "salon invoice details",
    "record cash, bank transfer and gift card payments",
  ],
  excerpt: "Fill in your invoice details once. After that each client takes a few taps: open the booking, “Pay at the counter”, choose the method, confirm and send the invoice.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-va-nhan-vien-cam-dien-thoai-tai-quay-salon"),
    alt: "A red-haired woman and a fair-haired man in a suit stand either side of a salon's marble counter, each holding a phone and smiling",
  },
  takeaways: [
    "Do this once first: fill in the **“Invoice details”** in “Settings”. Until they are complete, payments cannot be confirmed.",
    "When a client comes to pay: open “Bookings”, tap their booking and press **“Pay at the counter”**.",
    "There are three payment methods: **“Cash”, “Bank transfer” and “Gift card”**. Choose the right one so your income reports stay accurate.",
    "After you press “Confirm payment”, the screen shows “Payment confirmed” with the invoice number.",
    "Three ways to give the client the invoice: “View / download invoice”, their email and “Send”, or “Show QR code” for them to scan.",
  ],
  intro: [
    "Salon owners looking for salon checkout software rarely need a complicated till. They need three things to happen smoothly at the counter: know how much the client owes, record how the client paid and hand over a proper invoice. When the appointment is already in VaraaAi, all three start from the client's booking, because the service and price are already there.",
    "This guide follows the VaraaAi Academy lesson “Checkout and invoices”. You will fill in your invoice details, record a payment from start to finish and send the invoice to each client in the way that suits them.",
  ],
  sections: [
    {
      id: "why-record-at-the-counter",
      title: "Why record payments at the counter, straight from the booking",
      blocks: [
        { p: "In many salons the money is taken at the counter and the books are written up at the end of the day, from memory. Those few hours are where mistakes creep in: a bank transfer forgotten, a gift card remembered as cash. Recording the payment while the client is standing at the counter fixes the numbers while everything is still in front of you." },
        { p: "Doing it from the booking also saves typing. The service, price and client name are already in the calendar. You check the total, choose the payment method and confirm, all in a few taps." },
        { p: "The client benefits too. They get the invoice on their phone or in their inbox, with the salon's company name, address and business ID. A client who needs a receipt has a clear invoice straight away instead of waiting for a handwritten one." },
      ],
    },
    {
      id: "invoice-details",
      title: "Your salon's invoice details: a one-off job before you take payment",
      blocks: [
        { p: "Before the first payment, fill in “Invoice details” in “Settings”. The note on the screen says it plainly: fill this in before you can issue an invoice from “Pay at the counter”. There are four fields:" },
        {
          table: {
            head: ["Field", "What to enter", "Sample salon in the video"],
            rows: [
              ["“Company name”", "The legal name of the business, which may differ from the name on your sign", "Lumi Beauty SARL"],
              ["“Company address”", "The registered address of the business", "10 Rue de Rivoli, 75004 Paris"],
              ["“Business ID / tax number”", "The number issued where the business is registered", "FR 00 000 000 000"],
              ["“VAT (%)”", "The VAT rate that applies to your services", "20"],
            ],
          },
        },
        { img: { src: shot("invoice-details-company-name-address"), alt: "The Invoice details part of Settings with the Company name field, the Company address field outlined in gold, Business ID / tax number, VAT (%) and the Save invoice details button" } },
        { p: "These four details appear on every invoice the salon issues, so copy them from your business registration rather than typing from memory. When you are done, press “Save invoice details”." },
        { note: "VAT rates and what must appear on an invoice differ from country to country. The 20 in the video is only the sample salon's example. Ask your accountant or the tax authority where you operate so you enter the right figures.", kind: "warn", title: "Tax rules differ by country" },
        { p: "This part is also covered in the guide to the [salon cancellation policy and payments](lesson:thanh-toan-chinh-sach), where you also set the cancellation deadline and the bank details for transfers." },
      ],
    },
    {
      id: "payment-methods",
      title: "Recording cash, bank transfer and gift card payments",
      blocks: [
        { p: "The checkout has three choices under “Payment method”. Pick the one that matches how the client just paid:" },
        {
          table: {
            head: ["Method", "When to choose it"],
            rows: [
              ["“Cash”", "The client pays in cash at the counter"],
              ["“Bank transfer”", "The client pays through the bank, for example by transfer"],
              ["“Gift card”", "The client pays with one of the salon's gift cards"],
            ],
          },
        },
        { img: { src: shot("payment-method-cash-bank-transfer-gift-card"), alt: "The Pay at the counter window with Relax massage at 70 EUR, a total of €70.00 and the payment methods Cash, Bank transfer and Gift card, with Bank transfer outlined in gold" } },
        { p: "Choosing the right method keeps your income reports accurate. At the end of the day the cash in the drawer should match the total of all the “Cash” payments. One wrong choice means a till that does not add up and no idea why." },
        { p: "Above the payment method are the service with its price and the “Total” line. You can change the price if needed, for example when the client added or dropped something compared with the booking. Below is “Add info to the receipt” for a note about that payment." },
        { p: "If the salon does not sell gift cards yet, see the lesson on [salon gift cards](lesson:the-qua-tang-salon) to set them up." },
      ],
    },
    {
      id: "sending-the-invoice",
      title: "Three ways to send the invoice: download, email or QR code",
      blocks: [
        { p: "When you press “Confirm payment”, the screen shows “Payment confirmed” with the invoice number and the amount. Right below are three ways to get the invoice to the client:" },
        {
          table: {
            head: ["Way", "What you do", "Suits"],
            rows: [
              ["Open the invoice", "Press “View / download invoice”", "Checking the invoice or downloading the file"],
              ["Email", "Enter the client's email under “Email the invoice” and press “Send”", "Clients who want the invoice in their inbox to keep or forward"],
              ["QR code", "Press “Show QR code” and let the client scan the screen", "Clients who want it on their phone straight away, without email"],
            ],
          },
        },
        { img: { src: shot("payment-confirmed-view-download-invoice"), alt: "The Payment confirmed screen with the invoice number, €70.00, the View / download invoice button outlined in gold, the Email the invoice field and Show QR code" } },
        { p: "The QR code is the fastest option while the client is standing in front of you: they scan it and the invoice opens on their phone, and you do not have to ask for and type an email address. The client's side of scanning and reopening the invoice is described in the guide to the [salon invoice by QR code](lesson:hoa-don)." },
        { img: { src: shot("show-qr-code-for-invoice"), alt: "The Payment confirmed screen with the Show QR code button outlined in gold, below View / download invoice and the Email the invoice field" } },
      ],
    },
    {
      id: "common-situations",
      title: "Common situations at the checkout",
      blocks: [
        {
          table: {
            head: ["Situation", "What to do"],
            rows: [
              ["You press to confirm but the page asks for invoice details", "Go to “Settings”, complete the “Invoice details” and press “Save invoice details”. Then come back and confirm the payment"],
              ["The amount taken differs from the booking price", "Change the price on the checkout before pressing “Confirm payment”"],
              ["The client does not want an email", "Press “Show QR code” so they can scan and download the invoice"],
              ["The client pays with a gift card", "Choose “Gift card” under “Payment method”"],
              ["You need a note about this payment", "Write it in “Add info to the receipt”"],
            ],
          },
        },
        { p: "Checkout records what the client paid. If the salon has several staff and you want to know what each person took, tips included, read the guide to [staff income reports](lesson:doanh-thu-nhan-vien). Everything else on the calendar, from adding bookings to marking no-shows, is in the guide to the [salon appointment calendar](lesson:lich-hen)." },
      ],
    },
  ],
  howTo: {
    title: "Steps to check out a client and send the invoice on VaraaAi",
    id: "checkout-steps",
    after: "invoice-details",
    lead: "The first step is done once. The next five repeat for every client who comes to pay, in the order of the lesson video.",
    steps: [
      {
        name: "Fill in the “Invoice details” in “Settings”",
        text: "Open “Settings” and scroll down to “Invoice details”. Enter the “Company name”, “Company address”, “Business ID / tax number” and “VAT (%)”, then press “Save invoice details”. You only do this once.",
        image: { src: shot("vat-and-save-invoice-details"), alt: "The Company address, Business ID / tax number and VAT (%) fields with the VAT field outlined in gold and the Save invoice details button below" },
      },
      {
        name: "Open “Bookings” and tap the client's booking",
        text: "When the client has been served and comes to the counter, open “Bookings” and tap their booking. The details show the service, the time and the total to collect.",
        image: { src: shot("open-the-customers-booking"), alt: "The day calendar of three staff members with Sofia Rossi's Relax massage booking at 10:45–11:45 in Léa's column outlined in gold" },
      },
      {
        name: "Press “Pay at the counter”",
        text: "In the booking details, press “Pay at the counter”. The checkout opens with the service and price taken from the booking, so you do not type them again.",
        image: { src: shot("pay-at-the-counter-in-booking-details"), alt: "Booking details for a Relax massage with €70.00 to collect and the Pay at the counter button outlined in gold next to Complete" },
      },
      {
        name: "Check the total and choose the “Payment method”",
        text: "Look over the “Total” line and change the price if you need to. Then choose the “Payment method”: “Cash”, “Bank transfer” or “Gift card”, matching how the client just paid.",
        image: { src: shot("check-total-before-payment"), alt: "The Pay at the counter window with the Relax massage line at 70 EUR and the Total €70.00 outlined in gold, the payment methods below" },
      },
      {
        name: "Press “Confirm payment”",
        text: "If needed, add a note in “Add info to the receipt”. Then press “Confirm payment”. The screen shows “Payment confirmed” with the invoice number.",
        image: { src: shot("add-info-to-receipt-confirm-payment"), alt: "The Pay at the counter window with the Add info to the receipt field and the black Confirm payment button outlined in gold next to Cancel" },
      },
      {
        name: "Send the invoice to the client",
        text: "Press “View / download invoice” to open it. To send it, enter the client's email under “Email the invoice” and press “Send”. Or press “Show QR code”: the client scans it and the invoice opens on their phone.",
        image: { src: shot("email-the-invoice-send"), alt: "The Payment confirmed screen with the Email the invoice field and Send button outlined in gold, Show QR code and Close below" },
      },
    ],
  },
  faq: [
    {
      q: "What do I need to do before confirming my first payment on VaraaAi?",
      a: "Fill in the invoice details in “Settings”: company name, company address, business ID or tax number and VAT. These appear on the invoice. Until they are filled in, payments cannot be confirmed, and the page reminds you to complete them in Settings first.",
    },
    {
      q: "How many payment methods can I choose at the counter?",
      a: "Three: “Cash”, “Bank transfer” and “Gift card”. Choose the one that matches how the client paid so your income reports stay accurate.",
    },
    {
      q: "How does a client get the invoice on their phone straight away?",
      a: "After confirming the payment, press “Show QR code” and let the client scan it. The invoice opens on their phone. You can also enter their email and press “Send”.",
    },
    {
      q: "Can I change the price at checkout?",
      a: "Yes. The checkout shows the total taken from the booking, and you can change the price if needed before pressing “Confirm payment”.",
    },
    {
      q: "Where do I start checking out a client?",
      a: "On the “Bookings” page. Tap the client's booking to open the details, then press “Pay at the counter”. The checkout opens with the service and total of that booking.",
    },
    {
      q: "What VAT rate should I enter on salon invoices?",
      a: "You enter the “VAT (%)” yourself under “Invoice details”. Rates differ by country, so ask your accountant or the tax authority where the salon operates to get it right.",
    },
  ],
  related: ["lich-hen", "doanh-thu-nhan-vien", "thanh-toan-chinh-sach", "the-qua-tang-salon"],
};

export default article;
