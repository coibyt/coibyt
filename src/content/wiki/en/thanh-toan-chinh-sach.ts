import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/thanh-toan-chinh-sach/${name}.webp`;
const shot = (name: string) => `/wiki/thanh-toan-chinh-sach/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "salon-cancellation-policy-payments-invoices",
  lesson: "thanh-toan-chinh-sach",
  category: "salon",
  title: "Salon cancellation policy: set a deadline, take bank transfers and fill in your invoice details",
  metaTitle: "Salon cancellation policy: deadline, transfers, invoices",
  metaDescription:
    "How to set a salon cancellation policy on VaraaAi: choose the deadline, write a short policy, add bank details for transfers and the details invoices need.",
  keyword: "salon cancellation policy",
  keywords: [
    "cancellation deadline for salon appointments",
    "salon no-show fee",
    "nail salon cancellation policy example",
    "take bank transfer payments as a salon",
    "salon invoice details",
    "late cancellations at a salon",
    "salon payment settings",
  ],
  excerpt: "Three small jobs in “Settings” save the salon a lot of trouble: a cancellation deadline, bank transfer details and the details your invoices need.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("chu-salon-kiem-tra-cai-dat-tren-may-tinh-bang"),
    alt: "A salon owner with curly hair in a plum silk blouse holds a tablet beside a marble counter in a salon with chandeliers",
  },
  takeaways: [
    "**“Customers can cancel up to”** is the deadline: after it, clients can no longer cancel online themselves, and only the salon can.",
    "The **“Cancellation policy”** is the text clients read right after booking and in their confirmation email.",
    "Add your bank details so clients see where to **transfer money straight to the salon** when they book.",
    "The **“Invoice details”** must be complete before you can issue invoices at the counter.",
    "Each of the three parts has its own save button. Save each part when you finish it.",
  ],
  intro: [
    "A clearly written salon cancellation policy does not put clients off. It does the opposite: clients know in advance how late they can cancel, and the salon does not have to argue every time someone cancels at the last minute. What annoys people is a rule they only hear about after the fact.",
    "This guide follows the VaraaAi Academy lesson “Payments, cancellation policy and invoice details”. You will set the cancellation deadline, write a few lines of policy, add the account clients can pay into and fill in the details your invoices need, all on the “Settings” page.",
  ],
  sections: [
    {
      id: "why-a-cancellation-policy",
      title: "Why a salon needs a written cancellation policy",
      blocks: [
        { p: "A technician's hour cannot be stored and sold later. If a client cancels a day ahead, the salon still has time to fill the slot. If a client cancels ten minutes before, or simply does not turn up, that hour is lost. With long services such as lash extensions or hair colour, one no-show can take half a day from a technician." },
        { p: "A cancellation deadline solves most of this without anyone having to raise their voice. Clients see the rule when they book, so anyone who needs to move an appointment does it early. And when every client reads the same rule, you do not end up making exceptions for one person and not for another." },
        { p: "The other two parts of the lesson are also do-once jobs. With bank details in place, clients do not have to message you for the account number. With invoice details in place, you can issue an invoice at the counter the moment a client asks for one." },
      ],
    },
    {
      id: "deadline-and-policy",
      title: "Cancellation deadline and cancellation policy: two different things",
      blocks: [
        { p: "Under “Salon preferences” there are two lines right next to each other that are easy to mistake for one. They do quite different jobs:" },
        {
          table: {
            head: ["Line", "What it is", "What it does"],
            rows: [
              ["“Customers can cancel up to”", "A deadline you choose, for example 24 hours before the appointment", "After the deadline, clients can no longer cancel online themselves. Only the salon can, from the dashboard"],
              ["“Cancellation policy”", "A short text you write yourself", "Clients read it right after booking and in their confirmation email"],
            ],
          },
        },
        { p: "Put simply, the first line is the lock and the second is the sign explaining the lock. The deadline is something the booking page enforces for you. The policy is what the salon tells clients, for example whether late cancellations are charged." },
        { note: "The two lines must give the same number. If you choose 24 hours, the policy text should say 24 hours too. Whenever you change the deadline, reread the text below it and update it to match.", kind: "tip", title: "Keep them in step" },
      ],
    },
    {
      id: "writing-the-policy",
      title: "How to write a short cancellation policy clients understand at once",
      blocks: [
        { p: "The lesson suggests writing your salon's rules in a few lines, for example that late cancellations and no-shows are charged. A workable policy answers two questions: until when can the client cancel or reschedule free of charge, and what happens after that." },
        { p: "In the lesson video the sample salon writes that clients can cancel or reschedule free of charge up to 24 hours before the appointment, and that for later cancellations or no-shows the salon may charge 50% of the service price. You can use the same two-sentence structure and put in the numbers your salon decides on." },
        {
          ul: [
            "**Write in a positive, polite tone.** Clients read it just after booking, while they feel good about the salon.",
            "**Give a specific number.** “Cancel early” means something different to everyone; “24 hours before your appointment” can only be read one way.",
            "**Only write what the salon really does.** Regular clients soon notice a rule that is never applied.",
          ],
        },
        { note: "The size of a late-cancellation fee is each salon's own decision, and the rules on charging consumers differ from country to country. Before you state a fee, check the rules where your salon operates.", kind: "warn", title: "About late-cancellation fees" },
      ],
    },
    {
      id: "bank-transfers",
      title: "Taking bank transfer payments as a salon",
      blocks: [
        { p: "The box “Receive bank transfer payments” sits in the “Payments & invoices” part. Its note says: “Customers will see these details to transfer money directly to your salon when booking.” The money goes straight from the client's account to the salon's." },
        { img: { src: shot("receive-bank-transfer-payments"), alt: "The Receive bank transfer payments box with the Bank name, Account number, Account holder name and optional BIC/SWIFT code fields", caption: "The line under the heading tells you that clients see these details when they book." } },
        { p: "The three fields to fill in are “Bank name”, “Account number” and “Account holder name”. The video also shows a “BIC/SWIFT code” field marked optional. Copy the account number from your banking app rather than typing it from memory, and write the holder's name exactly as the bank has it. A transfer sent to the wrong account because of one wrong digit wastes time on both sides." },
        { p: "This part is especially useful if you take [deposits for some services](lesson:dich-vu), because clients then have somewhere to pay straight away." },
      ],
    },
    {
      id: "invoice-details",
      title: "Your salon's invoice details",
      blocks: [
        { p: "The last box is “Invoice details”. Its note is plain: fill this in before you can issue an invoice from “Pay at the counter”. The company name, address, business ID and VAT are printed on the invoice." },
        {
          table: {
            head: ["Field", "What to enter"],
            rows: [
              ["“Company name”", "The legal name of the business, which may differ from the name on your sign"],
              ["“Company address”", "The registered address of the business"],
              ["“Business ID / tax number”", "Exactly as on your business registration"],
              ["“VAT (%)”", "The VAT rate that applies to your salon's services"],
            ],
          },
        },
        { p: "If you are unsure about the business ID or the VAT rate, ask your accountant before saving, because these numbers appear on every invoice. How to issue an invoice to each client is covered in the guide to [taking payment and sending invoices at the counter](lesson:thanh-toan-hoa-don)." },
      ],
    },
    {
      id: "common-situations",
      title: "Common situations: late cancellations and other questions",
      blocks: [
        {
          table: {
            head: ["Situation", "What to do"],
            rows: [
              ["A client wants to cancel after the deadline", "They can no longer cancel online. They contact the salon, and you cancel from the dashboard if you agree"],
              ["A client asks where the cancellation policy is", "On the screen right after booking and in the confirmation email they received"],
              ["A client asks which account to pay into", "The salon's bank details appear when they book"],
              ["You cannot issue an invoice at the counter", "Check that all four fields of “Invoice details” are filled in and that you pressed “Save invoice details”"],
            ],
          },
        },
        { p: "On the client's side, cancelling within the deadline happens in “My bookings”, as described in the guide to [cancelling a salon appointment](lesson:lich-hen-cua-toi). On the salon's side, you handle each appointment in the [appointment calendar](lesson:lich-hen) of the dashboard." },
      ],
    },
  ],
  howTo: {
    title: "Steps to set your salon cancellation policy, bank transfers and invoice details on VaraaAi",
    id: "settings-steps",
    after: "deadline-and-policy",
    lead: "The eight steps go from the top to the bottom of “Settings”: four for the cancellation policy, two for bank transfers and two for invoices.",
    steps: [
      {
        name: "Open “Settings” and find “Salon preferences”",
        text: "In the dashboard, open “Settings” and scroll to “Booking & policies”, where the “Salon preferences” box is. It brings together the salon's default language, default currency, cancellation deadline and cancellation policy.",
        image: { src: shot("salon-preferences-in-settings"), alt: "The Booking & policies part of Settings with the Salon preferences heading outlined in gold, Default language, Default currency and the cancellation deadline" },
      },
      {
        name: "Choose a deadline under “Customers can cancel up to”",
        text: "Open the list under “Customers can cancel up to” and choose a deadline, for example 24 hours before. After that point, clients can no longer cancel online themselves. Choose a deadline that leaves the salon enough time to fill the empty slot.",
        image: { src: shot("customers-can-cancel-up-to-24-hours"), alt: "The line Customers can cancel up to set to 24 hours before, outlined in gold in the Salon preferences box" },
      },
      {
        name: "Write the “Cancellation policy”",
        text: "Right below is the “Cancellation policy” box. Write your salon's rules in a few lines, for example that late cancellations and no-shows are charged. Clients see this text right after booking and in their confirmation email.",
        image: { src: shot("cancellation-policy-text-box"), alt: "The Cancellation policy box outlined in gold, holding a policy about free cancellation or rescheduling up to 24 hours before the appointment" },
      },
      {
        name: "Press “Save”",
        text: "Press the “Save” button just below the policy box. It saves both the deadline and the policy text you have written.",
        image: { src: shot("save-cancellation-policy"), alt: "The black Save button under the Cancellation policy box outlined in gold, with the Payments & invoices part below" },
      },
      {
        name: "Fill in “Receive bank transfer payments”",
        text: "Scroll down to “Payments & invoices”. In the box “Receive bank transfer payments”, enter the “Bank name”, “Account number” and “Account holder name”. Read the account number back digit by digit before you move on.",
        image: { src: shot("bank-name-account-number-holder"), alt: "The Bank name, Account number and Account holder name fields outlined in gold in the Receive bank transfer payments box" },
      },
      {
        name: "Press “Save bank details”",
        text: "Press “Save bank details”. From now on, clients see the salon's transfer details when they book.",
        image: { src: shot("save-bank-details"), alt: "The Save bank details button outlined in gold, with the Invoice details box and its Company name field below" },
      },
      {
        name: "Fill in the “Invoice details”",
        text: "In “Invoice details”, enter the “Company name”, “Company address”, “Business ID / tax number” and “VAT (%)”. All four must be filled in before you can issue invoices at the counter.",
        image: { src: shot("invoice-details-business-id-vat"), alt: "The Invoice details box with the Company name, Company address, Business ID / tax number and VAT (%) fields outlined in gold" },
      },
      {
        name: "Press “Save invoice details”",
        text: "Press “Save invoice details” and you are done. These details will be printed on the salon's invoices.",
        image: { src: shot("save-invoice-details"), alt: "The Save invoice details button outlined in gold under the Business ID / tax number and VAT (%) fields in Settings" },
      },
    ],
  },
  faq: [
    {
      q: "What does “Customers can cancel up to 24 hours before” mean?",
      a: "Clients can cancel online themselves until 24 hours before their appointment. After that deadline they can no longer cancel themselves, and only the salon can cancel, from the dashboard.",
    },
    {
      q: "Where do clients see the salon's cancellation policy?",
      a: "Clients see the text of the “Cancellation policy” box right after booking and in their confirmation email. That is why it should be short enough to understand in one reading.",
    },
    {
      q: "What should a nail or hair salon cancellation policy say?",
      a: "Two things: until when the client can cancel or reschedule free of charge, and what happens after that or if they do not turn up, for example whether a fee is charged. The number in the policy should match the deadline you chose under “Customers can cancel up to”.",
    },
    {
      q: "When do clients see the salon's bank transfer details?",
      a: "When they book. Once you have entered the bank name, account number and account holder name and pressed “Save bank details”, clients see them so they can transfer money straight to the salon.",
    },
    {
      q: "Why do I need to fill in the “Invoice details”?",
      a: "Because invoices can only be issued at the counter once these details are complete. The company name, address, business ID and VAT percentage are printed on the invoice.",
    },
    {
      q: "What if a client wants to cancel after the deadline?",
      a: "They can no longer cancel online themselves, so they need to contact the salon. The salon can still cancel the appointment from the dashboard, and whether a fee applies follows the policy you have published.",
    },
  ],
  related: ["gio-mo-cua", "dich-vu", "thanh-toan-hoa-don", "lich-hen"],
};

export default article;
