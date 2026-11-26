import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/theo-doi-salon/${name}.webp`;
const shot = (name: string) => `/wiki/theo-doi-salon/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "follow-salon-offers-and-shop",
  lesson: "theo-doi-salon",
  category: "booking",
  title: "Follow a salon for offers on VaraaAi: see new looks in your feed and buy the salon's products",
  metaTitle: "Follow a salon for offers, new looks and products | VaraaAi",
  metaDescription:
    "How to follow a salon on VaraaAi to see its offers and new looks in your Feed, and how to buy its products: the bag, payment options and collecting at the salon.",
  keyword: "follow a salon for offers",
  keywords: [
    "salon offers from my regular salon",
    "beauty salon feed",
    "buy salon products online",
    "buy cuticle oil from a nail salon",
    "unfollow a salon",
    "collect products at the salon",
  ],
  excerpt: "Press “Follow” so your regular salon's offers and new looks appear in your “Feed”, and order its care products to collect at the salon.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-xem-bang-tin-salon-tren-dien-thoai"),
    alt: "A young woman with long wavy hair in a cream jumper sits on a sofa by the window, smiling as she looks at her phone",
  },
  takeaways: [
    "The **“Follow”** button is on the salon's page, below “Book now”. Once pressed, it changes to “Following”.",
    "New posts from the salons you follow appear in your **“Feed”**: tap your name at the top to open it.",
    "If the salon sells products, its page has a **“Products”** button that opens the salon's shop.",
    "When you order, you choose one of three ways to pay: at the salon, by bank transfer, or by agreeing with the salon.",
    "Products are **collected at the salon**. The salon contacts you to arrange a time.",
  ],
  intro: [
    "Once you have a favourite salon, you want to know early when it has an offer, a new look or some news. On VaraaAi you follow a salon for offers like these with one tap: from then on, the salon's new posts appear in your feed on their own.",
    "This guide follows the VaraaAi Academy lesson “Follow salons, your feed and the shop”. You will learn where to press follow, how to read your feed, and how to order the care products a salon sells, from the bag to collecting them at the salon.",
  ],
  sections: [
    {
      id: "why-follow",
      title: "Why follow a salon",
      blocks: [
        { p: "Following commits you to nothing. It does not book anything for you and costs nothing. The only thing that changes is your “Feed”: what the salon posts comes to you, without you visiting each salon's page to check." },
        { p: "It suits three kinds of customer:" },
        {
          ul: [
            "People with a **regular salon** who do not want to miss its discounts.",
            "People **comparing a few salons**, who want to see what each one posts before choosing.",
            "People who often **buy care products** at the salon and want to know when something new arrives.",
          ],
        },
        { note: "If you [install the VaraaAi app](lesson:cai-app) on your phone, your feed is right there in the app. Open it and you see the offers, new looks and news from the salons you follow.", kind: "tip", title: "Reach your feed faster" },
      ],
    },
    {
      id: "whats-in-the-feed",
      title: "What you find in your feed",
      blocks: [
        { p: "The “Feed” page says it shows the latest posts from salons you follow. At the top is a row headed “Salons you follow” with each salon's logo. Below are the posts, each with the salon's name and when it was posted." },
        { p: "Posts usually fall into the three kinds the lesson mentions: offers, new looks and salon news. The offer post in the lesson video carries an “Offer” label, a short text and a photo, with a “Book now” button right under it." },
        { img: { src: shot("salon-offer-post-in-feed"), alt: "A Lumi Beauty Paris offer post in the Feed highlighted in gold, with a December gel discount text, a spa photo and a Book now button below", caption: "A salon's offer post in the “Feed”." } },
        { p: "That “Book now” button is what makes the feed more useful than an ordinary news page. Salon offers are often time-limited, and you can book the moment you read one instead of leaving it and forgetting. The steps after pressing it are the same as in [booking a salon appointment online](lesson:dat-lich-online)." },
      ],
    },
    {
      id: "buying-products",
      title: "Buying the salon's products: payment and collection",
      blocks: [
        { p: "Many salons also sell care products to use at home between appointments, such as cuticle oil. On VaraaAi these are in the salon's shop, opened with the “Products” button on its page. You order online and collect at the salon; there is no delivery step." },
        { p: "When you order, you choose one of three ways to pay:" },
        {
          table: {
            head: ["Payment", "How it works", "Suits you when"],
            rows: [
              ["Pay at the salon", "Cash or card when you collect", "You are going to the salon soon, for example on your appointment day"],
              ["Bank transfer", "You get the account details right after you order", "You want to pay in advance, or someone else is collecting"],
              ["Talk to the salon", "Agree on payment with the salon over chat", "You have a special request to sort out first"],
            ],
          },
        },
        { note: "The “Note for the salon” box is the place to say when you plan to collect. In the lesson video, the customer writes that she will pick it up on Saturday afternoon. A note like that helps the salon have the order ready and saves a follow-up question.", kind: "tip", title: "Add a note when you order" },
        { p: "After you place the order, the salon contacts you to confirm it and arrange collection. The easiest option is usually to pick it up at your next beauty appointment." },
      ],
    },
    {
      id: "common-situations",
      title: "Common situations when following salons and ordering products",
      blocks: [
        {
          table: {
            head: ["Situation", "What to do"],
            rows: [
              ["You want to stop seeing a salon's posts", "Tap your name at the top, open “Following” and press “Unfollow” next to that salon"],
              ["Your feed is empty", "You do not follow any salon yet, or the salons you follow have not posted. Open a salon's page and press “Follow”"],
              ["Not sure whether you already follow a salon", "Open its page: “Following” means you do, “Follow” means you do not"],
              ["No “Products” button on the salon's page", "The salon may not have opened a product shop on VaraaAi. Ask the salon if you want to buy something"],
              ["You have a question about a product before buying", "Use the “Chat with salon” button on the salon's page"],
              ["You ordered but do not know when to collect", "Wait for the salon to contact you with a collection time"],
            ],
          },
        },
        { p: "For questions about ingredients, how to use a product or which one suits your nails or hair, [message the salon](lesson:chat-voi-salon) before you order. The technician who looks after you knows best what you should use." },
      ],
    },
    {
      id: "regular-customer",
      title: "Following, member cards and reviews: three habits of a regular",
      blocks: [
        { p: "Following brings you the salon's news. The other two habits bring you rewards and a voice. With a [member card](lesson:the-thanh-vien), each visit earns a ticket and a full card earns a discount. After each appointment you can [leave a review](lesson:viet-danh-gia) so the salon knows what you liked." },
        { note: "Salons open their shop, confirm orders and notify customers by email from their dashboard. See the lesson [Sell products and manage orders](lesson:san-pham-don-hang).", kind: "info", title: "Own a salon?" },
      ],
    },
  ],
  howTo: {
    title: "Steps to follow a salon, read your feed and buy products",
    id: "follow-steps",
    after: "why-follow",
    lead: "The first four steps are following and reading your feed. The last four are only needed when you want to buy the salon's products.",
    steps: [
      {
        name: "Open the salon's page and press “Follow”",
        text: "Find the salon on the [search page](/search) and open its page. The “Follow” button, with a heart, sits just below “Book now”. One press is all it takes.",
        image: { src: shot("press-follow-on-salon-page"), alt: "The Lumi Beauty Paris page on VaraaAi with the heart-shaped Follow button highlighted in gold below the Book now button" },
      },
      {
        name: "Check that the button now says “Following”",
        text: "After you press it, the button changes to “Following”. When you see that, you are following the salon, and its new posts will appear in your feed from now on.",
        image: { src: shot("button-changes-to-following"), alt: "The salon page after following, with the Following button highlighted in gold next to the Products button and above Fanpage" },
      },
      {
        name: "Open your “Feed”",
        text: "Tap your name at the top of the page and choose “Feed”. This page gathers the latest posts from every salon you follow in one place.",
        image: { src: shot("open-feed-from-account-menu"), alt: "The Feed page on VaraaAi with the account button highlighted, the Salons you follow row and the first salon post below" },
      },
      {
        name: "Read the posts and book right under them",
        text: "Scroll down through offers, new looks and news. When you see an offer that suits you, press “Book now” under the post to book straight away, without going back to the salon's page.",
        image: { src: shot("book-now-under-feed-post"), alt: "A salon post in the Feed with the purple Book now button highlighted in gold above the Like, Comment and Share buttons" },
      },
      {
        name: "On the salon's page, press “Products”",
        text: "To buy care products, open the salon's page and press “Products”. The salon's shop opens with a photo, name and price for each item.",
        image: { src: shot("press-products-salon-shop"), alt: "The Lumi Beauty Paris page with the Products button highlighted in gold next to the Following button" },
      },
      {
        name: "Tap the bag icon on what you want",
        text: "Each product has a bag icon on its photo. Tap it to add the item to your bag. When you have everything, tap the bag at the bottom of the screen to review it.",
        image: { src: shot("tap-bag-icon-on-product"), alt: "The salon's shop with a Lumi cuticle oil 15 ml at 18 euros highlighted, showing the bag icon in the corner of the product photo" },
      },
      {
        name: "Press “Continue to checkout” and choose how to pay",
        text: "In the bag, press “Continue to checkout”. Choose one of the three payment methods: pay at the salon when you collect, bank transfer, or talk to the salon over chat. Add a “Note for the salon” if needed.",
        image: { src: shot("choose-how-to-pay-for-order"), alt: "The checkout screen with three payment methods highlighted in gold: Pay at the salon, Bank transfer and Talk to the salon" },
      },
      {
        name: "Press “Place order”",
        text: "Check the order, then press “Place order”. The screen shows “Order placed!” with a summary and the total. The salon will contact you to arrange collection.",
        image: { src: shot("order-placed-collect-at-salon"), alt: "The Order placed screen highlighted in gold, saying the salon will contact you to confirm and arrange collection, with the order and total" },
      },
    ],
  },
  faq: [
    {
      q: "What do I get from following a salon on VaraaAi?",
      a: "The salon's new posts appear in your “Feed”, including offers, new looks and news. You know as soon as your regular salon has a promotion without visiting its page.",
    },
    {
      q: "Where is the “Follow” button?",
      a: "On the salon's page, just below “Book now”. Once you press it, the button changes to “Following”.",
    },
    {
      q: "How do I unfollow a salon?",
      a: "Tap your name at the top, open “Following” and press “Unfollow” next to the salon whose posts you no longer want to see.",
    },
    {
      q: "Where do I collect products bought from a salon's shop?",
      a: "At the salon. You order online, and the salon then contacts you to arrange a time to collect.",
    },
    {
      q: "How can I pay for products from a salon?",
      a: "There are three ways: pay at the salon when you collect, by bank transfer, or by agreeing on payment with the salon over chat. You choose whichever is easiest at checkout.",
    },
    {
      q: "Does following a salon cost anything or book appointments automatically?",
      a: "No. VaraaAi is free for customers, and following only brings the salon's posts into your feed. An appointment is made only when you book and confirm it yourself.",
    },
  ],
  related: ["the-thanh-vien", "the-qua-tang", "hoa-don", "chat-voi-salon"],
};

export default article;
