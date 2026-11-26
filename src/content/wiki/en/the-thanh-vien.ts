import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/the-thanh-vien/${name}.webp`;
const shot = (name: string) => `/wiki/the-thanh-vien/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "salon-loyalty-card",
  lesson: "the-thanh-vien",
  category: "booking",
  title: "Salon loyalty card on VaraaAi: how to collect tickets, invite friends and get your discount",
  metaTitle: "Salon loyalty card: collect tickets, invite friends, save",
  metaDescription:
    "How a salon loyalty card works on VaraaAi: show its QR code for a ticket at each visit, invite friends for 2 extra tickets and get a discount when it is full.",
  keyword: "salon loyalty card",
  keywords: [
    "beauty salon loyalty programme",
    "nail salon loyalty card",
    "collect stamps at a salon",
    "refer a friend salon reward",
    "how does a salon member card work",
    "member card QR code",
  ],
  excerpt: "Each visit to your regular salon earns a ticket, a full card earns a discount, and a friend's first visit earns you two more. The card lives in your VaraaAi account.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-quen-lam-mong-tai-salon-co-the-thanh-vien"),
    alt: "A blonde nail technician in a cream jumper paints the nails of an auburn-haired client at a wooden table in a bright salon",
  },
  takeaways: [
    "The card is **activated by the salon** and emailed to you. To see it, tap your name at the top and choose “Loyalty cards”.",
    "At each visit, show the **QR code on your card** to the staff so they can scan it and add 1 ticket.",
    "The card shows how many tickets you have and how many more you need for your discount.",
    "Send friends your invite link: when one books through it and **visits the salon for the first time**, you get 2 extra tickets.",
    "When the card is full, tell the staff at your next visit to get your discount.",
  ],
  intro: [
    "A salon loyalty card is the salon's way of thanking customers who keep coming back: each treatment earns a ticket, and enough tickets earn a discount. On VaraaAi the card is not a paper card you leave at home. It lives in your account, has its own QR code and counts the tickets for you.",
    "This guide follows the VaraaAi Academy lesson “Member card: collect stamps, invite friends”. You will learn where to get a card, how to open it, what to do at the front desk to collect a ticket, and how to invite friends for bonus tickets.",
  ],
  sections: [
    {
      id: "what-it-is",
      title: "What a salon member card is and who it suits",
      blocks: [
        { p: "It is a loyalty card for one particular salon. You might have a card at your nail salon and another at your hair salon, and each counts its own tickets. If you visit the same place every few weeks for an infill, a lash refill or a haircut, the card turns those visits into a discount." },
        { p: "There are four things worth looking at on the card:" },
        {
          ul: [
            "**Salon name and reward:** the small line under the salon's name says how many tickets you need and what you get. In the lesson video, the card reads “Collect 5 tickets, get 15% off”.",
            "**Your own QR code:** what the staff scan at each visit.",
            "**Tickets:** how many you have out of the total, with a line telling you how many more you need for the discount.",
            "**The button “Open card & invite friends (+2 tickets)”:** opens the full card page.",
          ],
        },
        { img: { src: shot("member-card-qr-code-and-tickets"), alt: "The Lumi Beauty Paris member card highlighted in gold with its QR code, Tickets 1 of 5 and the Open card and invite friends button" } },
        { note: "Each salon sets its own number of tickets and its own discount, so the figures on your card may differ from the example in the video. Read the reward line just under the salon's name on your own card.", kind: "info", title: "Every salon sets its own reward" },
      ],
    },
    {
      id: "getting-a-card",
      title: "Where to get a member card",
      blocks: [
        { p: "You do not create the card yourself. The salon activates it for you and it is sent to your email. So getting one is simple: next time you are at your regular salon, ask whether they have member cards on VaraaAi and ask them to activate one for you." },
        { p: "Give the salon the email address you use to sign in to VaraaAi, so the card reaches the right inbox and appears in your own account. If you have no account yet, [create an account and sign in](lesson:tai-khoan) takes about a minute." },
      ],
    },
    {
      id: "invite-friends",
      title: "Inviting friends for extra tickets: the conditions",
      blocks: [
        { p: "Each card has its own invite link in the “Invite a friend” section. Copy the link and send it to people you know through any messaging app. When they open it, they see a page saying who invited them and to which salon, with a “Book now” button. The page also explains that booking through the link lets the salon know who sent them." },
        { img: { src: shot("friend-invite-page-book-now"), alt: "The invite page a friend receives, naming the person who invited them and Lumi Beauty Paris, with a gold Book now button", caption: "What your friend sees when they open your invite link." } },
        { p: "The bonus tickets come with two conditions, and both must be met:" },
        {
          ol: [
            "Your friend **books through your link**, rather than finding the salon and booking on their own.",
            "Your friend **visits the salon for the first time** on that booking.",
          ],
        },
        { note: "Bonus tickets are added only when your friend actually visits the salon, not when you send the link. Sending the link to many people changes nothing until someone comes in. When both conditions are met, the 2 tickets are added automatically; you do not need to tell anyone.", kind: "warn", title: "Sending the link is not enough" },
      ],
    },
    {
      id: "common-situations",
      title: "Common situations with a member card",
      blocks: [
        {
          table: {
            head: ["Situation", "What to do"],
            rows: [
              ["No card appears under “Loyalty cards”", "The salon may not have activated one for you yet. Ask the salon, and check your inbox for the email with your card"],
              ["You forgot to have your code scanned", "A ticket is added only when the staff scan the code. Open the card while you wait to pay"],
              ["You want to check that a ticket was added", "Press “Open card & invite friends” and look at the “Ticket history”: each salon visit is one line"],
              ["You sent the invite link but no bonus has appeared", "Bonus tickets are added only after your friend books through the link and visits for the first time"],
              ["Your card is full", "Tell the staff at your next visit to get the discount"],
              ["You have cards at several salons", "Each salon has its own card under “Loyalty cards”, with its own QR code and ticket count"],
            ],
          },
        },
      ],
    },
    {
      id: "with-booking",
      title: "Using the card alongside online booking",
      blocks: [
        { p: "A member card fits naturally with booking ahead. You [book a salon appointment online](lesson:dat-lich-online) at your regular salon, go in, show the QR code at the desk, and the tickets add up visit by visit. To open the card quickly at the desk without typing an address, [install the VaraaAi app](lesson:cai-app) on your home screen." },
        { p: "If you would rather give someone a treatment than invite them to book, see [buy and use a gift card](lesson:the-qua-tang). The two cards are different: a member card collects tickets for you, while a gift card is a present bought in advance for someone else." },
        { note: "Salons set up the programme, activate cards and add tickets in their dashboard. See the lessons [QR loyalty cards in the dashboard](lesson:the-tich-diem) and [Referrals: regulars bring new customers](lesson:khach-dan-khach).", kind: "info", title: "Own a salon?" },
      ],
    },
  ],
  howTo: {
    title: "Steps to use your salon loyalty card on VaraaAi",
    id: "card-steps",
    after: "getting-a-card",
    lead: "Once the salon has activated your card, everything else happens on your phone.",
    steps: [
      {
        name: "Open “Loyalty cards” in your account",
        text: "Sign in to VaraaAi, tap your name at the top and choose “Loyalty cards”. The page “My member cards” shows the cards you have, one per salon.",
        image: { src: shot("open-my-member-cards-from-account-menu"), alt: "The My member cards page on VaraaAi with the account button highlighted and the Lumi Beauty Paris card with its QR code and Tickets 1 of 5" },
      },
      {
        name: "Check how many tickets you have",
        text: "The line “Tickets” shows how many you have out of the total. Just below, a line tells you how many more you need to unlock your discount. Glance at these two lines before each appointment to know whether this is the visit with the discount.",
        image: { src: shot("tickets-left-to-unlock-discount"), alt: "A member card on VaraaAi with Tickets 1 of 5 and the line saying 4 more tickets to unlock your discount highlighted in gold" },
      },
      {
        name: "Show the QR code to the staff at the salon",
        text: "At the desk, open the card and show the screen with the QR code to the staff. As soon as they scan it, you get 1 ticket. Do this at every visit, because no scan means no ticket.",
        image: { src: shot("show-qr-code-to-staff"), alt: "The QR code on the Lumi Beauty Paris member card highlighted in gold, ready for the salon staff to scan" },
      },
      {
        name: "Press “Open card & invite friends” to see your progress",
        text: "This button opens the full card page. A progress ring shows how far you are towards your discount, with a reminder of how many tickets are still missing.",
        image: { src: shot("open-card-and-invite-friends-button"), alt: "The black Open card and invite friends plus 2 tickets button highlighted in gold at the bottom of the member card" },
      },
      {
        name: "Read “How to collect tickets” and your “Ticket history”",
        text: "Further down, “How to collect tickets” repeats the card's rules, and “Ticket history” lists each ticket you received with its date. This is where to check when you are not sure your last visit was scanned.",
        image: { src: shot("how-to-collect-tickets-and-ticket-history"), alt: "The How to collect tickets and Ticket history section of the card highlighted in gold, with one Salon visit plus 1 line" },
      },
      {
        name: "Press “Copy my invite link” and send it to friends",
        text: "In the “Invite a friend” section, press “Copy my invite link” and paste it into a message to people you know. When one of them books through the link and visits the salon for the first time, 2 extra tickets are added to your card automatically.",
        image: { src: shot("copy-my-invite-link"), alt: "The Invite a friend section of the member card with the gold Copy my invite link button highlighted and a plus 2 label" },
      },
      {
        name: "Card full: tell the staff to get your discount",
        text: "When the card shows you have all your tickets, mention it to the staff at your next visit. The salon applies the discount shown on your card to that visit.",
        image: { src: shot("tickets-away-from-discount"), alt: "The progress ring at 1 of 5 tickets with the line Only 4 tickets away from 15% off highlighted in gold" },
      },
    ],
  },
  faq: [
    {
      q: "How do I get a salon's member card on VaraaAi?",
      a: "Ask your regular salon. The salon activates the card and it is emailed to you. After that, you see it by tapping your name at the top and choosing “Loyalty cards”.",
    },
    {
      q: "How many tickets do I get per visit?",
      a: "One. You open the card, show the QR code to the staff, and as soon as they scan it, 1 ticket is added for that visit.",
    },
    {
      q: "How many tickets do I need for a discount?",
      a: "It depends on the salon. The number of tickets and the discount are written on your card, just under the salon's name. In the lesson video, 5 tickets earn 15% off the next visit.",
    },
    {
      q: "What do I get for inviting a friend, and when?",
      a: "You get 2 extra tickets. They are added automatically when your friend books through your invite link and visits the salon for the first time, not when you send the link.",
    },
    {
      q: "Where do I see my member card and tickets?",
      a: "Sign in to VaraaAi, tap your name at the top and choose “Loyalty cards”. Each card shows its own QR code, the tickets you have and how many more you need for your discount.",
    },
    {
      q: "Is the discount applied automatically when my card is full?",
      a: "Tell the staff at your next visit to get your discount. Open your card and show them your tickets when you pay.",
    },
  ],
  related: ["the-qua-tang", "theo-doi-salon", "hoa-don", "lich-hen-cua-toi"],
};

export default article;
