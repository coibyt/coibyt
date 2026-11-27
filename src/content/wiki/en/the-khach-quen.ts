import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/the-khach-quen/${name}.webp`;
const shot = (name: string) => `/wiki/the-khach-quen/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "free-digital-stamp-card-for-salons",
  lesson: "the-khach-quen",
  category: "marketing",
  title: "Free digital stamp card for salons: create a QR card, give it to clients and stamp every visit",
  metaTitle: "Free digital stamp card for salons and nail bars",
  metaDescription:
    "How to create a free QR stamp card for a nail, hair, lash or spa salon: set the stamps and reward, email the card to clients, stamp each visit and redeem it.",
  keyword: "free digital stamp card for salons",
  keywords: [
    "digital loyalty stamp card",
    "QR code stamp card",
    "stamp card for regular clients",
    "loyalty card without printing",
    "stamp card for a nail salon",
    "how to get salon clients to come back",
    "loyalty card with no app",
  ],
  excerpt: "No paper cards to print and no app for clients to install. Choose the stamps and the reward, email the card, and press “Add 1 stamp” at every visit.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-dua-the-tich-diem-tren-dien-thoai-de-quet"),
    alt: "A woman with auburn hair holds out her phone screen while a young man opposite scans it with his own phone, in a salon with product shelves",
  },
  takeaways: [
    "VaraaAi's QR stamp card is **free**: no paper cards to print, and clients do not need to install an app.",
    "Start by setting up the card: choose the **“Stamps for a reward”** and write the **“Reward”**. The settings apply to every card, including ones already given.",
    "Clients with an email get the card in their inbox. Clients without one simply photograph the QR code on your screen.",
    "Press **“Add 1 stamp”** at every visit. Press “Redeem reward” only when the client uses the reward.",
    "If you started with the trial, enter your email and press **“Save my salon”**, so the cards are not lost when you change phones or clear the browser.",
  ],
  intro: [
    "A free digital stamp card for salons solves the problem every owner knows from paper cards: clients leave them at home, and the salon has no idea who has how many stamps. The old way was a stack of printed cards and a rubber stamp. This guide shows the other way, a stamp card with a QR code that lives on the client's phone and takes about thirty seconds to create on VaraaAi.",
    "The guide follows the VaraaAi Academy lesson “A free stamp card in 30 seconds”. By the end you will be able to set up the stamp card, give your first client a card, stamp it at each visit and redeem the reward when the card is full.",
  ],
  sections: [
    {
      id: "why-stamp-cards-work",
      title: "Why a stamp card brings clients back to your salon",
      blocks: [
        { p: "A client comes once and never returns. Every salon has seen it. Usually there was nothing wrong: the next time they needed their nails done, they simply went to whichever place was on their way. A stamp card gives them a concrete reason to choose you again. Each visit earns a stamp, and enough stamps earn a reward." },
        { p: "A card on the phone removes the usual problems of paper cards:" },
        {
          ul: [
            "**Nothing to print.** The card is a page with a QR code, ready as soon as you create it.",
            "**Clients do not forget it.** It opens on their phone straight from the email, with no app to install.",
            "**You know who has how many stamps.** Every card has its own code and sits in the salon's list.",
          ],
        },
        { p: "The card in this guide is a separate tool that works even if your salon has no VaraaAi booking page yet. Salons that already run their bookings in the VaraaAi dashboard have a loyalty programme linked to appointments: see the guide to [the loyalty programme in the salon dashboard](lesson:the-tich-diem)." },
      ],
    },
    {
      id: "stamps-and-reward",
      title: "Before you start: choose the number of stamps and the reward",
      blocks: [
        { p: "A stamp card comes down to two decisions, and both are worth settling before you open the page." },
        { h3: "Stamps for a reward" },
        { p: "The screen lets you choose from 3 to 20 stamps. The lesson video uses 10 as its example. Match the number to how often your clients come. For a service people book often, the card can have more stamps. For a treatment clients book only now and then, choose fewer, or the reward will feel too far away to bother collecting." },
        { img: { src: shot("stamps-for-a-reward"), alt: "The Your stamp card section with the Stamps for a reward grid from 3 to 20 outlined in gold and the number 10 selected", caption: "Choose between 3 and 20 stamps. The lesson's example is 10." } },
        { h3: "Reward" },
        { p: "The “Reward” field is free text. The lesson's example is “15% off your next visit”. Write it so a client knows at a glance what they get and when they can use it. A vague promise such as “a lovely surprise” does not bring anyone back." },
        { note: "The card settings apply to every card, including the ones already given. That is handy when you want to adjust something, but it also means that changing the number of stamps affects clients who are halfway through a card. Choose carefully at the start and change it as little as possible.", kind: "warn", title: "One change applies to every card" },
      ],
    },
    {
      id: "two-ways-to-start",
      title: "Create a stamp card online: try it first or start with your email",
      blocks: [
        { p: "The free loyalty cards page has two ways in. Neither asks you to set a password." },
        {
          table: {
            head: ["Way in", "What you do", "Best when"],
            rows: [
              ["Trial", "Press “Try it now”. The button says that no email is needed", "You want to look around first, with a sample card to practise on"],
              ["With your email", "Enter “Salon name” and “Your email”, then press “Create free cards”", "You have decided to use it and want the salon saved straight away"],
            ],
          },
        },
        { p: "If you come in through the trial, the salon is not saved yet. It only exists in the browser you are using, so changing device or clearing the browser data means losing your clients' cards. The card studio reminds you with a box titled “Your salon isn't saved yet”, with an email field and a “Save my salon” button. In the video the box also shows how many trial cards have been given, as 0/3." },
        { note: "If you are about to give cards to real clients, save the salon with your email before you give the first one. The trial is for looking around, not for running the card long term.", kind: "tip", title: "Save before you give real cards" },
      ],
    },
    {
      id: "the-clients-card",
      title: "What the client's QR stamp card looks like",
      blocks: [
        { p: "Once a client has a card, they have their own card page. It shows the salon's name, the client's name, the QR code, the row of stamps, the card code and the reward you wrote. Under the card a line tells them how many more stamps they need for the reward." },
        { img: { src: shot("customers-vip-card-qr-code"), alt: "A deep pink VIP stamp card on a phone with the salon name, Anna (sample card), a large QR code and a row of stamps showing 3 of 10", caption: "The client's card: the QR code in the middle and the stamps below it." } },
        { p: "Clients with an email receive the card in their inbox and open it with one tap. The card page also suggests taking a screenshot so it opens quickly at the salon. Clients without an email still get a card: they photograph the QR code shown on your screen." },
        { p: "You can send clients the guide to the [salon loyalty card](lesson:the-thanh-vien), written for their side, so they understand how to collect stamps and use the card." },
      ],
    },
    {
      id: "stamp-and-redeem",
      title: "Stamping cards for regular clients and redeeming the reward",
      blocks: [
        { p: "Two buttons on the card do two different jobs, and mixing them up is the most common mistake new staff make:" },
        {
          table: {
            head: ["Button", "When to press it", "What happens"],
            rows: [
              ["“Add 1 stamp”", "At every visit", "The card gets one more stamp. A client with an email is told automatically"],
              ["“Redeem reward”", "When the card is full and the client uses the reward", "The card starts a new round"],
            ],
          },
        },
        { p: "Tie the stamp to a fixed moment, for example when the client pays. Once it is part of checkout, staff rarely forget, and clients get used to holding out their phone." },
        { p: "The “Scan a card at a visit” section finds a card in two ways: scan the QR code with the camera, or type the card code into the box. In the video the screen also has a note for browsers that cannot scan inside the page. In that case you open your phone's own camera and point it at the QR code, and the client's card page shows the “Add 1 stamp” button." },
        { img: { src: shot("customers-list-search-cards"), alt: "The Customers tab of the card studio with the search box for name, email or card code and a sample card with its Add 1 stamp button outlined in gold", caption: "“Customers” lists every card you have given. Search by name, email or card code." } },
        { p: "Under “Customers” you see all your cards, search them by name, email or card code, and can even add a stamp straight from the list." },
      ],
    },
    {
      id: "after-you-have-cards",
      title: "Once your salon has a stamp card",
      blocks: [
        { p: "A card only works when clients know about it. Offer it the first time a client visits and add the first stamp in front of them. A card that already has one stamp feels like something they have started." },
        {
          table: {
            head: ["Situation", "What to do"],
            rows: [
              ["The client has no email", "Give the card anyway. The client photographs the QR code on the screen"],
              ["The client forgot their phone or cannot open the card", "Type the card code into the search box, or search for their name under “Customers”"],
              ["The client deleted the email with the card", "Find them under “Customers” and send the card again"],
              ["Someone pressed “Redeem reward” instead of “Add 1 stamp”", "Tell staff that “Redeem reward” is only for when the client actually uses the reward"],
              ["You gave cards during the trial", "Enter your email and press “Save my salon” at once so the cards are kept"],
            ],
          },
        },
        { p: "When your regulars have cards, the next step is getting them to bring new clients. The guide to [client referrals](lesson:khach-dan-khach) explains the invite link that comes with the loyalty card in the salon dashboard." },
        { p: "The card studio also points to the full VaraaAi for salons, with online booking and reminders. According to the text on screen, clients' cards and stamps move over automatically when you sign up with the same email. Signing up is covered in the guide to [registering and activating your salon](lesson:dang-ky-salon)." },
      ],
    },
  ],
  howTo: {
    title: "How to create a free digital stamp card for your salon on VaraaAi",
    id: "create-stamp-card-steps",
    after: "stamps-and-reward",
    lead: "The nine steps follow the lesson video in order. You can do all of it on your phone at the reception desk.",
    steps: [
      {
        name: "Open the free loyalty cards page",
        text: "Open varaaai.com, scroll to the bottom of the page and press “Free loyalty cards” in the business links. You can also go straight to the [free stamp card page](/loyalty-lite).",
        image: { src: shot("free-loyalty-cards-link-in-footer"), alt: "The bottom of the VaraaAi home page on a phone with the Free loyalty cards link outlined in gold in the Business group" },
      },
      {
        name: "Choose how to start",
        text: "Press “Try it now” to go straight to your card studio with a sample card, with no email needed. Or enter “Salon name” and “Your email” and press “Create free cards”. Neither way asks for a password.",
        image: { src: shot("try-it-now-or-create-free-cards"), alt: "The Welcome to VaraaAi window with the pink Try it now button outlined in gold and the option to create the cards with your email below it" },
      },
      {
        name: "Choose the “Stamps for a reward”",
        text: "In the card studio, find “Your stamp card”. Tap a number under “Stamps for a reward”, for example 10. This is how many visits a client needs to earn the reward.",
      },
      {
        name: "Write the “Reward” and press “Save”",
        text: "Type the reward into the “Reward” field, for example “15% off your next visit”, then press “Save”. The setting applies to every card, including the ones already given, so make the reward clear from the start.",
        image: { src: shot("reward-and-save"), alt: "The Reward field reading 15% off your next visit with the pink Save button below it and the Customers, Guide and Profile tabs further down" },
      },
      {
        name: "Give the client a card",
        text: "Under “Give a customer a card”, enter the “Customer's name” and “Customer's email”. With an email filled in, the button sends the card straight to the client's inbox. With the email left empty the button reads “Create card”: you can still create it, and the client photographs the QR code on screen.",
        image: { src: shot("give-a-customer-a-card"), alt: "The Give a customer a card section with the Customer's name and Customer's email fields outlined in gold and the Create card button below" },
      },
      {
        name: "Scan the card when the client arrives",
        text: "At each visit, go to “Scan a card at a visit”, open your phone's camera and point it at the QR code on the client's card. If the code will not scan, type the card code into the box.",
        image: { src: shot("scan-a-card-at-a-visit"), alt: "The Scan a card at a visit section outlined in gold, with a note about scanning with the phone camera and the card code box below" },
      },
      {
        name: "Press “Add 1 stamp”",
        text: "The client's card opens. Press “Add 1 stamp” in the “For the salon” box. The card gets one more stamp, and a client with an email is told automatically about the new stamp.",
        image: { src: shot("add-1-stamp-for-the-salon"), alt: "The bottom of the client's card with the Add 1 stamp button outlined in gold in the For the salon box and the line 7 more stamps to your reward below" },
      },
      {
        name: "Press “Redeem reward” when the client uses it",
        text: "The last stamp on the card is a star. When the client reaches it, they have earned the reward shown on the card. When they use it, press “Redeem reward”. The card starts a new round and the client collects again from the beginning.",
      },
      {
        name: "Enter your email and press “Save my salon”",
        text: "If you started with “Try it now”, the salon is not saved yet. Enter your email in the box “Your salon isn't saved yet” and press “Save my salon”, so you do not lose your clients' cards when you change phones or clear your browser.",
        image: { src: shot("save-my-salon"), alt: "The Your salon isn't saved yet box with the salon name, an email field and the pink Save my salon button outlined in gold" },
      },
    ],
  },
  faq: [
    {
      q: "Does a digital stamp card for my salon cost anything on VaraaAi?",
      a: "No. The QR stamp card is free to create. You do not print paper cards, and clients do not need to install an app because the card opens on their phone straight from the email.",
    },
    {
      q: "How does a client without an email get a stamp card?",
      a: "The card is still created. The client simply photographs the QR code shown on your screen and shows that picture at each visit so the salon can scan it.",
    },
    {
      q: "Which button do I press at each visit?",
      a: "Press “Add 1 stamp”. “Redeem reward” is only for when the card is full and the client uses the reward. After you redeem it, the card starts a new round.",
    },
    {
      q: "How many stamps should a salon stamp card have?",
      a: "The screen lets you choose from 3 to 20 stamps, and the lesson's example is 10. Match it to how often clients come: for a treatment people book only now and then, choose fewer stamps so the reward does not feel too far away.",
    },
    {
      q: "Why do I need to press “Save my salon” after the trial?",
      a: "A trial salon only lives in the browser you are using until you save it with an email. If you do not save it, you can lose your clients' cards when you change phones or clear your browser.",
    },
    {
      q: "If I change the stamps or the reward, do cards already given change too?",
      a: "Yes. The settings under “Your stamp card” apply to every card, including the ones already given. That is why it pays to choose the number of stamps and the reward carefully at the start.",
    },
  ],
  related: ["the-tich-diem", "khach-dan-khach", "the-qua-tang-salon", "the-thanh-vien"],
};

export default article;
