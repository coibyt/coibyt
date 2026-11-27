import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/khach-dan-khach/${name}.webp`;
const shot = (name: string) => `/wiki/khach-dan-khach/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "salon-referral-programme",
  lesson: "khach-dan-khach",
  category: "marketing",
  title: "Salon referral programme: regulars share an invite link, the friend visits and the referrer gets 2 tickets",
  metaTitle: "Salon referral programme: invite links and 2 bonus tickets",
  metaDescription:
    "How a salon referral programme works on VaraaAi: the invite link on every loyalty card, 60 days to book and 2 tickets when the friend visits.",
  keyword: "salon referral programme",
  keywords: [
    "refer a friend scheme for a salon",
    "how to get new clients for a nail salon",
    "invite link for friends to book",
    "reward clients for referrals",
    "word of mouth marketing for a spa",
    "referral reward for a hair salon",
    "refer a friend and get rewarded",
  ],
  excerpt: "Every loyalty card already has its own invite link. When a friend books through it and visits for the first time, the referrer gets 2 tickets automatically, with nothing extra to set up.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("hai-nguoi-ban-om-chao-nhau-trong-salon"),
    alt: "Two women hug warmly in a bright salon while two other clients sit behind them on purple chairs holding coffee cups",
  },
  takeaways: [
    "Every client's loyalty card **already has its own invite link**. There is nothing extra to set up.",
    "The client opens the card, scrolls to “Invite a friend” and presses “Copy my invite link” or the “Share” button.",
    "The link is **remembered for 60 days**, so a friend who books a little later still counts.",
    "The referrer gets **2 tickets** when the friend actually comes in for the first time, not when the link is sent.",
    "Only new clients on their first visit count, and nobody can invite themselves.",
  ],
  intro: [
    "A salon referral programme answers a question every owner has asked: what is the most effective advertising that costs almost nothing? The answer is regulars recommending you to their friends. What is usually missing is an easy way for them to do it, and a thank-you when they do.",
    "This guide follows the VaraaAi Academy lesson “Referrals: regulars bring new customers”. You will see where the invite link lives, what the friend sees when they open it, when the bonus tickets are added, and how to mention it to clients so the programme actually runs.",
  ],
  sections: [
    {
      id: "why-referrals",
      title: "Why referrals from regulars are the channel most worth your effort",
      blocks: [
        { p: "Nails, hair and lashes are done on the client's own body, so a friend's word carries more weight than any advert. A friend who says “they take real care there” has already answered the biggest worry a new client has." },
        { p: "VaraaAi's referral programme suits a small salon in two ways:" },
        {
          ul: [
            "**You only reward real clients.** The bonus tickets are added once the friend has come in. No new client, no cost to the salon.",
            "**Nobody has to keep track by hand.** The system knows who invited whom through the link, adds the tickets and emails the referrer by itself.",
          ],
        },
        { p: "The reward is tickets on the same loyalty card, so referrals are a branch of the loyalty programme you already run, not a separate system to manage." },
      ],
    },
    {
      id: "what-you-need",
      title: "What you need to start: loyalty cards switched on and activated",
      blocks: [
        { p: "There is nothing to set up for referrals as such. You need two things you may already have:" },
        {
          ol: [
            "The loyalty card programme switched on in the salon dashboard.",
            "A card activated for the client.",
          ],
        },
        { p: "Once both are done, the invite link is already built into each client's card. Setting up the programme and activating cards is covered step by step in the guide to the [salon loyalty programme](lesson:the-tich-diem)." },
        { note: "The more clients have a card, the more people carry an invite link. So the first job is to activate cards for your most loyal regulars, the people who are happy to speak well of you.", kind: "tip", title: "Start with your best regulars" },
      ],
    },
    {
      id: "reward-rules",
      title: "Rewarding clients for referrals: 2 tickets, 60 days and who counts",
      blocks: [
        { p: "Clients will ask about the rules, so the whole team should give the same answers. Everything fits in this table:" },
        {
          table: {
            head: ["Question", "Rule"],
            rows: [
              ["What does the referrer get?", "2 tickets, added automatically to their loyalty card"],
              ["When are the tickets added?", "When the friend actually visits the salon for the first time. Not when the link is sent, and not when the friend opens it"],
              ["How long does the friend have to book?", "The link is remembered for 60 days, so booking a little later still counts"],
              ["Who counts as a referred client?", "Only new clients on their first visit"],
              ["Can clients invite themselves?", "No"],
              ["How does the referrer find out?", "The system sends them an email with the good news when the tickets are added"],
            ],
          },
        },
        { p: "Whether two tickets feel like a lot depends on your programme. If, for example, your discount comes after 5 visits, one successful referral takes the client almost halfway there. That is a thank-you big enough to make sharing the link worthwhile." },
      ],
    },
    {
      id: "what-the-friend-sees",
      title: "The invite link: what the friend sees when they open it",
      blocks: [
        { p: "The friend does not land on a cold sign-up page. The link opens an invitation with your regular's name, the salon's name and address, and a line explaining that booking through this link lets the salon know who sent them." },
        { img: { src: shot("invitation-page-with-referrer-name"), alt: "The invitation page reading Nam invites you to Lumi Beauty Paris, with the address and Nam's message outlined in gold above the gold Book now button", caption: "The invitation carries the referrer's name, so the friend knows at once who sent it and where the salon is." } },
        { p: "Just below the “Book now” button are the salon's popular services, each with its duration and price. The friend can see what the salon does and what it costs before deciding." },
        { img: { src: shot("popular-services-on-invitation-page"), alt: "The Popular services list on the invitation page with Gel manicure, Gel pedicure, Classic lashes and Lash lift and tint, each with minutes and a euro price", caption: "Popular services are taken from the salon's own service menu." } },
        { p: "The invitation uses the name, address and services you entered for your salon. A clear menu with correct prices, as in the guide to your [salon service menu](lesson:dich-vu), and a [salon profile](lesson:ho-so-salon) with good photos make your regular's invitation far more convincing." },
      ],
    },
    {
      id: "mention-it-at-the-desk",
      title: "Word of mouth marketing for a spa or nail salon: when to mention it and what to say",
      blocks: [
        { p: "The invite link being there does not mean clients know about it. Most open their card only to show the QR code for scanning and may never have scrolled further down. The salon's job is to show them once." },
        { p: "The lesson's advice is to mention it at the counter, right after the treatment, when the client is happiest. That is when they are admiring their new nails or hair in the mirror, and when a friend who should try the salon most easily comes to mind." },
        {
          ul: [
            "**Show them in person.** When you scan the card to add a ticket, ask the client to scroll to “Invite a friend” and try “Copy my invite link”.",
            "**Say what the reward is.** One short sentence is enough, for example: “Send this link to a friend, and when they come in for the first time your card gets two extra tickets.”",
            "**Put up a small sign at the desk** saying “Refer a friend, get 2 tickets”, so clients can read it even when staff are busy.",
          ],
        },
        { p: "You can also send clients the guide to the [salon loyalty card](lesson:the-thanh-vien), written for their side, which includes the part about inviting friends." },
      ],
    },
    {
      id: "common-situations",
      title: "Common situations with a salon referral programme",
      blocks: [
        {
          table: {
            head: ["Situation", "Explanation"],
            rows: [
              ["The client sent the link but has no new tickets", "Tickets are only added when the friend actually visits for the first time, not when the link is sent"],
              ["The friend opened the link last month and is only booking now", "The link is remembered for 60 days. Booking within that time still counts"],
              ["The client referred someone who was already a client", "It does not count. Only new clients on their first visit count"],
              ["The client cannot find their invite link", "They open their loyalty card and scroll down to “Invite a friend”"],
              ["The client has no card yet", "Activate a card for them first. The invite link is built into the card"],
            ],
          },
        },
        { p: "Activate a card for a referred client on their very first visit too. They have just seen their friend rewarded, so they understand the programme faster than anyone and may become your next referrer. For another way to reach new clients through people they know, see the guide to [selling salon gift cards](lesson:the-qua-tang-salon)." },
      ],
    },
  ],
  howTo: {
    title: "How to run a salon referral programme, step by step",
    id: "referral-programme-steps",
    after: "what-you-need",
    lead: "The five steps follow one invitation, from your regular's card to the moment the bonus tickets are added.",
    steps: [
      {
        name: "Switch on loyalty cards and activate a card for the client",
        text: "Set up the loyalty card programme in the salon dashboard and activate a card for the client. There is no extra feature to switch on: the invite link is already on each client's card.",
        image: { src: shot("customer-card-in-cardholders-list"), alt: "The Cardholders list in the dashboard with Nam's card showing 2 of 5 tickets, 2 scans and 0 rewards, and the Activate a card for a customer section below" },
      },
      {
        name: "Show the client the “Invite a friend” section",
        text: "Ask the client to open their card and scroll down to “Invite a friend”. The section says it plainly: when a friend books through the link and visits for the first time, the client gets 2 tickets automatically.",
        image: { src: shot("invite-a-friend-section-on-card"), alt: "The Invite a friend section of the client's card outlined in gold, with a +2 ticket badge, the gold Copy my invite link button and a round share button" },
      },
      {
        name: "The client presses “Copy my invite link” or “Share”",
        text: "The client presses “Copy my invite link” to paste the link wherever they like, or the “Share” button to send it by message or on social media. Each client has their own link, so the system knows who the referrer is.",
        image: { src: shot("share-button-invite-link"), alt: "The round share button next to Copy my invite link outlined in gold in the Invite a friend section of the card" },
      },
      {
        name: "The friend opens the link and presses “Book now”",
        text: "The friend opens the link and sees an invitation with your regular's name and the salon's popular services. They press “Book now” and choose a service and a time. The link is remembered for 60 days, so booking a little later still counts.",
        image: { src: shot("friend-presses-book-now"), alt: "The invitation to Lumi Beauty Paris with the gold Book now button outlined in gold, below Nam's message to the friend" },
      },
      {
        name: "The friend visits and the referrer gets 2 tickets",
        text: "When the friend visits the salon for the first time, the system adds 2 tickets for the referrer and sends them an email with the news. You do not need to press anything. Next time you see your regular, a thank-you in person makes them want to refer again.",
      },
    ],
  },
  faq: [
    {
      q: "Does a salon referral programme on VaraaAi need its own set-up?",
      a: "No. You only need the loyalty card programme switched on and a card activated for the client. The invite link is already built into each client's card.",
    },
    {
      q: "What does the referrer get when a friend visits the salon?",
      a: "The referrer gets 2 tickets on their loyalty card. The system adds them automatically and emails the referrer.",
    },
    {
      q: "When are the bonus tickets added?",
      a: "When the friend actually visits the salon for the first time. They are not added when the link is sent or when the friend opens it, so the salon pays nothing unless a new client comes in.",
    },
    {
      q: "How long is a referral invite link valid?",
      a: "The link is remembered for 60 days. A friend who books later, within those 60 days, still counts for the referrer.",
    },
    {
      q: "Can a client invite themselves to earn tickets?",
      a: "No. Only new clients on their first visit count, and nobody can invite themselves.",
    },
    {
      q: "Where does a client find their invite link?",
      a: "They open their loyalty card, scroll down to “Invite a friend” and press “Copy my invite link” or the “Share” button to send it to friends.",
    },
  ],
  related: ["the-tich-diem", "the-khach-quen", "the-qua-tang-salon", "the-thanh-vien"],
};

export default article;
