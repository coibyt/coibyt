import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/the-qua-tang-salon/${name}.webp`;
const shot = (name: string) => `/wiki/the-qua-tang-salon/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "sell-salon-gift-cards",
  lesson: "the-qua-tang-salon",
  category: "marketing",
  title: "Sell salon gift cards: create a card template, email the card and check the code at the visit",
  metaTitle: "Sell salon gift cards: templates, QR cards and redemption",
  metaDescription:
    "How nail, hair and spa owners sell gift cards on VaraaAi: create a card template, email a card image with a QR code, confirm payment and record each use.",
  keyword: "sell salon gift cards",
  keywords: [
    "gift cards for a nail salon",
    "how to make gift vouchers for a spa",
    "beauty gift voucher for a salon",
    "gift card with a QR code",
    "sell gift cards online on the salon website",
    "check a gift card code",
    "gift card validity and number of uses",
  ],
  excerpt: "Create a card template, email the client a card image with a QR code, then scan the code and record a use when they come in. Cards bought on your website need you to confirm payment.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("nhan-vien-spa-mang-tra-cho-khach-ben-ho-nuoc"),
    alt: "A spa attendant in a black uniform carries a tea tray to a guest in a white robe sitting beside an indoor pool lit with candles and orchids",
  },
  takeaways: [
    "Start by **creating at least one card template**. The template sets the service, discount, validity, number of uses and price.",
    "To send a card you only need the recipient's name and email. The system creates a **card image with a QR code** and emails it straight to them.",
    "A card only works once it is **activated**: tick the paid box when you send it, or press “Confirm payment” for a card bought on your website.",
    "When the client comes in: scan the QR or type the code, press “Check code”, then **“Record a use”**.",
    "The “Cards sold / sent” list lets you view a card, download its image and resend the email.",
  ],
  intro: [
    "When you sell salon gift cards, you get two things at once. The salon is paid before the treatment is done, and it gains new clients: people buy cards for friends and family, and the person who receives one comes to you. For a nail, hair or spa salon, a gift card is also a gentle way for regulars to introduce the salon to someone else.",
    "This guide follows the VaraaAi Academy lesson “Gift cards”. You will be able to create a card template, email a card to a client, activate it once you have been paid, and check the code when the recipient brings the card in.",
  ],
  sections: [
    {
      id: "why-gift-cards",
      title: "Why a nail salon or spa should offer gift cards",
      blocks: [
        { p: "A manicure or a facial is an easy present: the giver does not have to guess a size or a colour, and the recipient gets a reason to treat themselves. Most owners have heard a client ask whether the salon sells gift vouchers. When the answer is yes, the salon takes payment for a treatment not yet done and welcomes a client who has never been in." },
        { p: "Gift cards on VaraaAi need no printing. Each card is an image with a QR code, sent by email, and checking whether a card is still valid happens right in the salon dashboard. You do not need a handwritten book of which cards have been used." },
        { p: "What the buyer and the recipient see is covered separately in the guide to the [salon gift card](lesson:the-qua-tang). This article is the owner's side." },
      ],
    },
    {
      id: "card-template",
      title: "How to make gift vouchers for a spa or salon: the six fields of a template",
      blocks: [
        { p: "Before you can send any card, you need at least one card template. A template is the pattern: you create it once, and every time you sell a card you simply pick it again. A template has six fields:" },
        {
          table: {
            head: ["Field", "What it means", "Example in the lesson video"],
            rows: [
              ["“Service”", "The service the card is for, chosen from the salon's menu", "Gel manicure"],
              ["“Card name”", "The name shown on the card and in the list", "Gel manicure gift card"],
              ["“Discount (%)”", "The card's discount as a percentage", "20"],
              ["“Valid for (days after activation)”", "How many days the card can be used, counted from activation", "90"],
              ["“Times it can be used”", "How many times the card can be used", "1"],
              ["“Value / price”", "What the client pays for the card, with the currency", "36 EUR"],
            ],
          },
        },
        { p: "The “Service” field takes its options from the salon's service list, so the menu needs to exist first. If it does not yet, see the guide to your [salon service menu](lesson:dich-vu)." },
        { p: "The two fields worth the most thought are validity and the number of uses. Validity counts from the day the card is activated, not the day you created the template. Recipients rarely book straight away, so a very short period can mean a client turning up with an expired card, which is awkward for everyone. More than one use suits cards you want clients to come back with several times." },
        { img: { src: shot("times-it-can-be-used-value-price"), alt: "The template fields Discount (%) 20 and Valid for 90 days, with Times it can be used set to 1 outlined in gold above Value / price 36 EUR and the Create template button" } },
        { note: "Name the card after the service and write it so the recipient understands at once what they are getting. The card name appears on the image the client receives by email.", kind: "tip", title: "The card name is what the recipient reads first" },
      ],
    },
    {
      id: "two-ways-to-sell",
      title: "Two ways to sell: send from the dashboard or sell gift cards online on your salon website",
      blocks: [
        { p: "Gift cards reach clients in two ways. The key difference is who activates the card, and when." },
        {
          table: {
            head: ["Way of selling", "How it happens", "Activating the card"],
            rows: [
              ["You send the card", "The client buys at the desk or asks by message. You fill in “Send a gift card” and email it", "Tick the paid box before sending and the card is activated straight away"],
              ["The client buys on the salon website", "The client picks a card and orders it. It appears in the “Cards sold / sent” list", "You press “Confirm payment” once the money has arrived"],
            ],
          },
        },
        { p: "With the second way, the client gets the code by email as soon as they order, but the card only works once the salon confirms it has been paid. That rule protects the salon: nobody can use a card that has not been paid for." },
        { img: { src: shot("confirm-payment-button"), alt: "A card marked Awaiting payment in the Cards sold / sent list, with View card, Download and Resend email, and the black Confirm payment button outlined in gold", caption: "A card bought on the website waits as “Awaiting payment” until you press “Confirm payment”." } },
        { note: "Check the “Cards sold / sent” list every day. A card the client has paid for but you have not confirmed still does not work when the recipient arrives, and that spoils the present.", kind: "warn", title: "Do not leave paid cards waiting" },
        { p: "Gift cards on a website are only available once the salon has a site. The guide to a [free salon website](lesson:website-salon) shows how to create one." },
      ],
    },
    {
      id: "when-the-card-comes-in",
      title: "Checking a gift card code when the client brings the card",
      blocks: [
        { p: "The person bringing a card is often a new client who received it as a present. Their first impression of the salon starts when you take the card, so this step needs to be quick and certain." },
        { p: "Under “Check and redeem a card”, scan the QR code on the card with your phone camera, or type the code and press “Check code”. The card appears with what you need to know before the treatment:" },
        {
          ul: [
            "The card name, the service and the discount.",
            "The status, for example “Active”.",
            "The name of the client the card was given to.",
            "The number of uses left.",
            "The expiry date.",
          ],
        },
        { img: { src: shot("check-and-redeem-card-code"), alt: "The Check and redeem a card box with a card code outlined in gold, the Check code button and an Active Gel manicure gift card with 1 of 1 uses left" } },
        { p: "If the card is valid and has uses left, do the treatment and press “Record a use”. One use is taken off the card. Check the code as soon as the client arrives, before you start, so any question about the expiry date is cleared up from the beginning." },
        { p: "When you take payment at the desk, “Gift card” is one of the payment methods, as shown in the guide to [checkout and invoices](lesson:thanh-toan-hoa-don). Choosing the right method keeps gift card payments separate in your income reports." },
      ],
    },
    {
      id: "cards-sold-sent",
      title: "The “Cards sold / sent” list: view, download and resend",
      blocks: [
        { p: "Further down the page is the list of every card sold and sent. Each entry shows the client's name, email, card code, template name, price, uses left and expiry, with the card's status." },
        { img: { src: shot("cards-sold-sent-list"), alt: "The Cards sold / sent list with a card for Nam marked Awaiting payment outlined in gold, showing the code, Gel manicure gift card, 36 euros and the action buttons", caption: "Each card has the buttons “View card”, “Download” and “Resend email”." } },
        {
          table: {
            head: ["Button", "When to use it"],
            rows: [
              ["“View card”", "You want to see the card the client received"],
              ["“Download”", "You want the card image as a file to send through another channel"],
              ["“Resend email”", "The client cannot find the email or has deleted it"],
              ["“Confirm payment”", "A card the client bought on your website, once you have the money"],
            ],
          },
        },
        { p: "Buyers often like to give the present themselves. They simply forward the email with the card code to the recipient. If a client wants to hand over the gift in their own way, download the card image and send it to them." },
      ],
    },
    {
      id: "common-situations",
      title: "Common situations when you sell salon gift cards",
      blocks: [
        {
          table: {
            head: ["Situation", "What to do"],
            rows: [
              ["There is no template to choose when sending a card", "Press “New template” and create at least one first"],
              ["A client who bought online says the card does not work", "Check that you have received the money, then press “Confirm payment” in the card list"],
              ["The client lost the email with the card", "Find the card under “Cards sold / sent” and press “Resend email”"],
              ["The client cannot open the QR code", "Type the card code by hand and press “Check code”"],
              ["The client asks how many uses are left", "Check the code. The card shows the uses left and the expiry date"],
            ],
          },
        },
        { p: "A gift card brings a new client in once. Keeping them is the job of that visit and of a [salon loyalty programme](lesson:the-tich-diem): activate a loyalty card for the recipient on the day they come in to use their gift." },
      ],
    },
  ],
  howTo: {
    title: "How to create, send and redeem salon gift cards on VaraaAi",
    id: "gift-card-steps",
    after: "card-template",
    lead: "The seven steps follow the life of one card, in the same order as the lesson video.",
    steps: [
      {
        name: "Open “Gift cards” and press “New template”",
        text: "In the salon dashboard, press “Gift cards”. Under “Gift card templates”, press “New template” to open the fields. You need at least one template before you can send a card.",
        image: { src: shot("gift-card-templates-new-template"), alt: "The Gift card templates section with the New template button at the top, the Service field set to Gel manicure and the Card name field outlined in gold" },
      },
      {
        name: "Fill in the template and press “Create template”",
        text: "Choose the “Service”, enter the “Card name” and “Discount (%)”, the number of days in “Valid for (days after activation)”, “Times it can be used” and “Value / price”. Read it through once, then press “Create template”.",
      },
      {
        name: "Choose the “Card template” and enter the recipient",
        text: "Under “Send a gift card”, choose the “Card template”. Enter the “Recipient name”, “Email” and “Message on the card”, for example a birthday greeting. The phone field is optional.",
        image: { src: shot("send-a-gift-card-recipient-name-email"), alt: "The Send a gift card section with the Gel manicure gift card template chosen and the Recipient name and Email fields outlined in gold" },
      },
      {
        name: "Tick the paid box and send the card",
        text: "If the client has already paid, tick the “Paid” box, which activates the card straight away. Then press “Create card image & email it”. The client receives a card image with a QR code, and the “Preview of the card” just below shows you what they will get.",
        image: { src: shot("paid-box-and-create-card-image-button"), alt: "The ticked box Paid, activate the card now outlined in gold above the black Create card image & email it button and the card preview" },
      },
      {
        name: "When the client comes in, press “Check code”",
        text: "Go to “Check and redeem a card”. Scan the QR code on the card with your phone camera, or type the code and press “Check code”. The card appears, showing whether it is still valid and how many uses are left.",
      },
      {
        name: "Press “Record a use”",
        text: "When the client uses the card for a treatment, press “Record a use”. One use is taken off the card. Do not skip this step, or the card keeps all its uses.",
        image: { src: shot("record-a-use-button"), alt: "The result of a code check showing an Active Gel manicure gift card for Claire with the black Record a use button outlined in gold" },
      },
      {
        name: "Confirm payment for cards bought online",
        text: "Cards clients buy on your salon website also appear in the “Cards sold / sent” list. Once the money has arrived, press “Confirm payment” to activate the card.",
      },
    ],
  },
  faq: [
    {
      q: "What do I need to do first to sell salon gift cards on VaraaAi?",
      a: "Create at least one card template. The template sets the service, discount, validity, number of uses and price. Only then can you send cards to clients.",
    },
    {
      q: "How does the client receive the gift card?",
      a: "You choose the template, enter the recipient's name, email and a message, then press “Create card image & email it”. The client receives a card image with a QR code in their inbox.",
    },
    {
      q: "When is a gift card bought on the salon website activated?",
      a: "When you press “Confirm payment”. The client gets the code by email as soon as they order, but the card only works once the salon confirms it has been paid.",
    },
    {
      q: "What do I do when a client brings a gift card to the salon?",
      a: "Scan the QR code on the card or type the code, then press “Check code” to see whether the card is valid and how many uses are left. Then press “Record a use”.",
    },
    {
      q: "When does a gift card's validity start?",
      a: "The validity field is the number of days after activation. The period starts when the card is activated, and the expiry date appears when you check the code.",
    },
    {
      q: "What if a client loses the email with their gift card?",
      a: "Find the card in the “Cards sold / sent” list and press “Resend email”. From there you can also view the card and download its image.",
    },
  ],
  related: ["the-tich-diem", "khach-dan-khach", "thanh-toan-hoa-don", "the-qua-tang"],
};

export default article;
