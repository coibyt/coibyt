import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/the-qua-tang/${name}.webp`;
const shot = (name: string) => `/wiki/the-qua-tang/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "buy-salon-gift-card-online",
  lesson: "the-qua-tang",
  category: "booking",
  title: "Salon gift card: how to buy one online on the salon's website and use it at the salon",
  metaTitle: "Salon gift card: buy online and use it at the salon",
  metaDescription:
    "How to buy a salon gift card on the salon's website: choose a card, get the code and QR code by email, when the card is activated and how to use it at the salon.",
  keyword: "salon gift card",
  keywords: [
    "beauty gift voucher",
    "buy a spa gift card online",
    "nail salon gift card",
    "how to use a salon gift card",
    "salon gift card code",
    "beauty treatment gift for mum",
  ],
  excerpt: "Choose a card on the salon's website, buy it in a minute, get the code and QR code by email, then forward it to the person you are treating.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("nguoi-nhan-the-qua-tang-lam-dep-qua-email"),
    alt: "A young woman with short hair in a cream jumper sits in a salon, smiling with delight at her phone beneath a glowing gold gift icon",
  },
  takeaways: [
    "Gift cards are sold in the **“Gift cards”** section of the salon's website. Each card shows the service, the discount, how long it is valid and the price.",
    "Press “Buy this card”, fill in your name and email, then press “Buy”. The card code and a QR code are emailed to you straight away.",
    "The card works only **after the salon confirms your payment**.",
    "To give it as a present, **forward the email** with the code to the person you are treating.",
    "At the salon, show the QR code or read out the card code. The staff check it and record one use on the card.",
  ],
  intro: [
    "A salon gift card is an easy present for a friend's birthday or a thank-you to your mum: the person receiving it gets a treatment at a salon, and you do not have to guess a dress size or a lipstick shade. At salons that use VaraaAi, you buy the card right on the salon's website and get the code by email in about a minute.",
    "This guide follows the VaraaAi Academy lesson “Buy and use a gift card”. You will learn where to find the cards, what to read before buying, why the card may not work the moment you have the code, and what the recipient does at the salon.",
  ],
  sections: [
    {
      id: "what-it-is",
      title: "What a salon gift card is",
      blocks: [
        { p: "It is a card issued and sold by the salon itself on its own website. Each card is tied to one of the salon's services and to a discount on that service. Nobody needs a plastic card: the holder has a card code and a QR code in an email." },
        { p: "Because each card belongs to one salon, you use it at the salon you bought it from. Before you buy one as a gift, choose a salon that is convenient for the recipient and a service they would really like." },
        { img: { src: img("khach-thu-gian-o-spa-voi-the-qua-tang-lam-dep"), alt: "A woman in a white robe relaxes by a candlelit spa pool while a staff member in a black uniform brings a tray of tea", caption: "A salon treatment is a present the recipient can enjoy straight away." } },
      ],
    },
    {
      id: "read-the-card",
      title: "Read the card carefully before you buy",
      blocks: [
        { p: "The lesson's tip is to check how long the card is valid and how many times it can be used before you press buy. Every card in the “Gift cards” section shows the details below." },
        {
          table: {
            head: ["On the card", "What it means"],
            rows: [
              ["Service", "Which of the salon's services the card is for, for example a gel manicure"],
              ["Discount", "What percentage off that service the holder gets"],
              ["Validity", "How long the card can be used. In the lesson video, the example card is valid for 90 days after activation"],
              ["Number of uses", "How many times the card can be used. The example card in the video allows 1 use"],
              ["Price", "What you pay the salon for the card"],
            ],
          },
        },
        { note: "Validity is the detail givers most often miss. If the recipient is busy or lives far away, choose a card that is valid long enough, and tell them the expiry date when you pass it on.", kind: "tip", title: "From experience" },
      ],
    },
    {
      id: "activation",
      title: "You have the code but the card does not work yet: activation",
      blocks: [
        { p: "After you press “Buy”, the card code arrives in your email straight away. But having the code does not mean the card can be used yet. The card is activated once the salon confirms your payment, and the thank-you screen after the purchase says so as well." },
        { p: "The sensible order is therefore: buy, pay the salon, wait for the salon to confirm, and only then hand over the card. If you are not sure how the salon takes payment, ask it directly through the [salon chat](lesson:chat-voi-salon) or call the number on its page." },
        { note: "Do not forward the email to the recipient just before their appointment if the salon has not yet confirmed your payment. A card that is not activated cannot be used, and the recipient will be left confused at the desk.", kind: "warn", title: "Give the card once it is active" },
      ],
    },
    {
      id: "giving-and-using",
      title: "Giving the card and using it at the salon",
      blocks: [
        { p: "Giving the card is just a matter of forwarding an email. The email you receive after buying contains the card code and the QR code. Forward the whole email to the recipient with a few words of your own, and they have everything they need to take to the salon." },
        { p: "At the salon, you or the recipient show the QR code for the staff to scan, or read out the card code. The staff check the code on the salon's screen: which card it is, whether it is active, how many uses are left and when it expires. They then record a use, and one use is taken off the card." },
        { img: { src: shot("staff-record-a-use-on-gift-card"), alt: "The salon's Check and redeem a card screen showing an active gel manicure gift card with uses left, expiry date and the Record a use button", caption: "What the staff see after checking the card code." } },
        { p: "The recipient should book before coming in. They can [book a salon appointment online](lesson:dat-lich-online) at that same salon: the details step has a “Discount code” box that takes discount codes and gift card codes, followed by “Apply”." },
      ],
    },
    {
      id: "common-situations",
      title: "Common situations with a salon gift card",
      blocks: [
        {
          table: {
            head: ["Situation", "What to do"],
            rows: [
              ["The salon's website has no “Gift cards” section", "That salon does not sell gift cards on its website yet. Ask the salon or choose another"],
              ["No email after buying", "Check your spam folder and the email address you typed. The card code also appears on the thank-you screen, so write it down"],
              ["At the salon, the staff say the card is not active", "The salon has not confirmed payment yet. Complete the payment with the salon so the card can be activated"],
              ["The recipient cannot open the QR code", "Read the card code out, letters and numbers, for the staff to type in"],
              ["You do not want to give a phone number", "The phone field is optional. Name and email are enough"],
              ["You want to use the card for a different service", "The card states which service it is for. Ask the salon before your visit if you want to change"],
            ],
          },
        },
        { p: "If the person you are treating goes to the same salon regularly, they can also ask for its [member card](lesson:the-thanh-vien) to collect tickets after each visit. A gift card is a present for one occasion; a member card stays with the customer for the long run." },
        { note: "Salons create card templates, confirm payments and check codes in their dashboard. See the owner lesson [Gift cards](lesson:the-qua-tang-salon).", kind: "info", title: "Own a salon?" },
      ],
    },
  ],
  howTo: {
    title: "Steps to buy a salon gift card and use it at the salon",
    id: "gift-card-steps",
    after: "read-the-card",
    lead: "The first four steps happen on the salon's website; the last two are handing over the card and using it.",
    steps: [
      {
        name: "Open the salon's website and find “Gift cards”",
        text: "Open the website of the salon you want to buy from and scroll down to “Gift cards”. Each card shows the service, the discount, the validity and the price. Read all of it, then pick the card you like.",
        image: { src: shot("choose-gift-card-on-salon-website"), alt: "The Gift cards section of a salon website with a gel manicure gift card highlighted, showing 20% off, valid 90 days, 36 euros and Buy this card" },
      },
      {
        name: "Press “Buy this card”",
        text: "The “Buy this card” button sits just below the card's price. Press it and the fields for your details open inside the card.",
        image: { src: shot("press-buy-this-card"), alt: "The gel manicure gift card on the salon's website with the Buy this card button highlighted in gold below the price" },
      },
      {
        name: "Fill in your details and press “Buy”",
        text: "Enter your name and email. The phone number is up to you; the field is optional. Type the email carefully because the card code is sent there, then press “Buy”.",
        image: { src: shot("fill-in-name-email-and-buy"), alt: "The gift card purchase form with name, email and Phone (optional) fields highlighted in gold above the Buy button" },
      },
      {
        name: "Note the card code and open your email",
        text: "The screen says “Thanks for buying a gift card!” and shows your card code. At the same time, the code and a QR code are emailed to you. The card activates once the salon confirms payment.",
        image: { src: shot("thanks-for-buying-a-gift-card-code"), alt: "The thank-you message for buying a gift card with the card code and a note that the card activates once the salon confirms payment" },
      },
      {
        name: "Forward the email to the recipient",
        text: "If the card is a present, forward the email with the card code to the person receiving it. Tell them which service and salon it is for and when it expires.",
      },
      {
        name: "At the salon: show the QR code or read out the card code",
        text: "At the salon, the cardholder shows the QR code to the staff or reads out the card code. The staff check the code and record one use on the card.",
        image: { src: shot("staff-check-gift-card-code"), alt: "The salon's Check and redeem a card screen with the card code field highlighted in gold above the Check code button" },
      },
    ],
  },
  faq: [
    {
      q: "Where do I buy a salon's gift card?",
      a: "In the “Gift cards” section of the salon's website. Choose a card, press “Buy this card”, fill in your name and email and press “Buy”. It takes about a minute.",
    },
    {
      q: "How is a salon gift card used at the salon?",
      a: "The cardholder shows the QR code or reads out the card code to the staff. The staff check the code and record a use, which takes one use off the card.",
    },
    {
      q: "Can I use the card as soon as I have bought it?",
      a: "Not necessarily. The card code and QR code arrive by email right after you buy, but the card is activated only once the salon confirms your payment.",
    },
    {
      q: "How do I give a gift card to someone else?",
      a: "Forward the email with the card code and QR code to the person you are treating. At the salon, they show the QR code or read out the card code to the staff, just as you would.",
    },
    {
      q: "Does a salon gift card expire?",
      a: "Yes. Each card shows how long it is valid and how many times it can be used, as set by the salon. Check both before you buy, especially when it is a present.",
    },
    {
      q: "Do I have to give a phone number to buy a gift card?",
      a: "No. You fill in your name and email; the phone number is optional. The email matters most because the card code is sent there.",
    },
  ],
  related: ["the-thanh-vien", "theo-doi-salon", "hoa-don", "dat-lich-online"],
};

export default article;
