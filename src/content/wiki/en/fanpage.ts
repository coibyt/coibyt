import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/fanpage/${name}.webp`;
const shot = (name: string) => `/wiki/fanpage/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "salon-promotion-post-fanpage",
  lesson: "fanpage",
  category: "marketing",
  title: "Salon promotion post: how to use the VaraaAi Fanpage to tell regular clients about offers and new work",
  metaTitle: "Salon promotion post: share offers on the VaraaAi Fanpage",
  metaDescription:
    "How nail, hair and beauty salon owners post on the VaraaAi Fanpage: write the text, pick a label, add a Book now button, photos or video, schedule and pin posts.",
  keyword: "salon promotion post",
  keywords: [
    "salon fanpage on VaraaAi",
    "how to post a nail salon offer",
    "tell regular clients about a salon offer",
    "schedule a salon post",
    "pin a post to the top",
    "what to post for a nail, hair or beauty salon",
    "book now button under a post",
  ],
  excerpt: "Write the text, pick a label, add a “Book now” button and a photo, then post. Clients who follow the salon see it straight away in their feed.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-quen-gap-nhau-tai-khu-cho-cua-salon"),
    alt: "Two women laugh and hug hello in a sunny salon waiting area, with two other clients behind them sitting on purple chairs holding coffee cups",
  },
  takeaways: [
    "Every salon on VaraaAi has its **own Fanpage**. Clients who follow the salon see new posts straight away in their feed.",
    "The fanpage is public: besides followers, anyone can read the posts on your salon's fanpage.",
    "Add a **“Book now”** button under an offer so clients go straight to your booking page with one tap.",
    "**“Schedule”** publishes a post at the date and time you choose. **“Pin to top”** is for important posts.",
    "After posting, press “View fanpage” to see the page as clients do, or “Copy link” to share it.",
  ],
  intro: [
    "Writing a salon promotion post sounds simple, but the real question is whether it reaches the right people. You have new looks or a weekend offer, and the people who most need to know are the clients who have already been in. On VaraaAi, every salon has its own Fanpage for exactly this: you post, and clients who follow the salon see it right away in their feed.",
    "This guide follows the VaraaAi Academy lesson “Fanpage: post for your followers”. You will post with a label, a photo and a booking button, know when to schedule and when to pin, and see your salon's fanpage exactly as clients see it.",
  ],
  sections: [
    {
      id: "what-is-the-fanpage",
      title: "What the salon Fanpage on VaraaAi is, and who sees your posts",
      blocks: [
        { p: "The Fanpage is your salon's news channel on VaraaAi. The line at the top of the page in the dashboard sums it up: post offers, new work and news. Two groups of people can read your posts:" },
        {
          ul: [
            "**Clients who follow the salon.** New posts appear straight away in their feed, without them having to look.",
            "**Anyone who opens your salon's fanpage.** The fanpage is public, so people who do not follow you can still read the posts.",
          ],
        },
        { p: "The first group is where the value lies. Most of your followers are clients who have already visited, the people most likely to come back when they hear about something new. How clients follow a salon and read their feed is covered in the guide to [following a salon for offers](lesson:theo-doi-salon)." },
        { img: { src: shot("salon-fanpage-as-customers-see-it"), alt: "The Lumi Beauty Paris fanpage as clients see it, with the salon's cover photo, round logo, post and follower counts, and the Following and Book buttons outlined in gold", caption: "The fanpage clients see: salon name, number of posts and followers, and the “Book” button right below." } },
        { p: "At the top of “Fanpage” in the dashboard are four numbers: “Posts”, “Followers”, “Likes” and “Comments”. They tell you how many people will receive your next post." },
      ],
    },
    {
      id: "before-you-post",
      title: "What to decide before you post for a nail, hair or beauty salon",
      blocks: [
        { p: "Posting is quick if you have already thought about these four things:" },
        {
          ul: [
            "**What the post is about.** One post should carry one piece of news: an offer, a new look or a notice.",
            "**The photo or video to go with it.** One post can hold several photos. Real photos of your salon and your team's real work are more convincing than pictures from the internet.",
            "**What clients should do after reading.** Book, look at products or call. The answer decides which button goes under the post.",
            "**Post now or later.** If the post should go out at another time, use “Schedule”.",
          ],
        },
        { note: "The “Book now” button takes clients to your salon's booking page. Make sure the service in the post is in your [salon service menu](lesson:dich-vu) with the right name and price, so clients find it as soon as they arrive.", kind: "info", title: "Before you add a booking button" },
      ],
    },
    {
      id: "label-and-button",
      title: "Choosing the right label and button for a post",
      blocks: [
        { p: "The “Label” tells clients what kind of post it is before they read the text. On a published post, the label appears just above the text. There are four labels plus “No label”:" },
        {
          table: {
            head: ["Label", "Suggested use"],
            rows: [
              ["“Offer”", "Time-limited deals, discounts, a gift with a treatment"],
              ["“New work”", "Photos of nails, hair or lashes your team has just done"],
              ["“News”", "Changed opening hours, days off, a new service"],
              ["“Beauty tip”", "Advice on aftercare once a treatment is done"],
            ],
          },
        },
        { img: { src: shot("choose-post-label-offer-new-work"), alt: "The Label options No label, Offer, New work selected, News and Beauty tip outlined in gold, with the Button options below" } },
        { p: "The “Button” is what you want the client to do next. There are three buttons plus “None”:" },
        {
          table: {
            head: ["Button", "Best for"],
            rows: [
              ["“Book now”", "Offers and new work. Clients tap it and go straight to your booking page"],
              ["“Shop products”", "Posts about products your salon sells"],
              ["“Call now”", "Posts where clients need to talk to the salon directly"],
              ["“None”", "Notices where clients do not need to do anything"],
            ],
          },
        },
        { img: { src: shot("button-under-post-book-now"), alt: "The Button options None, Book now selected, Shop products and Call now outlined in gold, with Photos, Video, Schedule, Pin to top and Post below" } },
        { note: "Add the “Book now” button under an offer so clients can book with one tap. An offer without a button leaves clients to find your booking page themselves, and many will leave it for later and forget.", kind: "tip", title: "An offer always needs a button" },
      ],
    },
    {
      id: "schedule-and-pin",
      title: "Scheduling a post and pinning it to the top of the fanpage",
      blocks: [
        { p: "Two small buttons next to “Photos” and “Video” solve two different problems." },
        { h3: "“Schedule”: write when you have time, post when it matters" },
        { p: "Press “Schedule”, choose the date and time, and the post goes live at that moment. Salon owners often only have free hands at the end of the day, after closing. You can write the post then and schedule it for the next day, instead of remembering to open your phone in the middle of a busy shift." },
        { h3: "“Pin to top”: keep an important post first" },
        { p: "Each new post pushes older ones down. For an important post, such as an offer running all month, press “Pin to top” so people who open the fanpage see it first." },
        { img: { src: shot("schedule-and-pin-to-top"), alt: "The post composer with the Schedule button outlined in gold, next to Photos 1/6, Video and Pin to top, with the Post button below", caption: "The row of buttons under the composer: “Photos”, “Video”, “Schedule”, “Pin to top” and the “Post” button." } },
      ],
    },
    {
      id: "writing-an-offer",
      title: "How to write a nail salon offer that gets bookings",
      blocks: [
        { p: "The example post in the lesson video is a compact model: a December offer with 15% off every gel service when clients book online before the 20th, ending with “See you at Lumi Beauty Paris”. The 15% is only an example from the video, but the structure is worth copying." },
        {
          table: {
            head: ["The post must answer", "In the video's example"],
            rows: [
              ["What is the offer", "A percentage discount"],
              ["Which service", "Every gel service"],
              ["On what condition", "Booking online"],
              ["Until when", "Before the 20th"],
            ],
          },
        },
        { p: "A post that covers these four points saves clients from messaging to ask. Add the “Offer” label, a photo and the “Book now” button." },
        { img: { src: shot("december-offer-post-with-book-now"), alt: "A Lumi Beauty Paris post with the December offer text, a photo of a client relaxing in a spa and the Book now button below" } },
        { p: "The fanpage reaches clients who already follow the salon. For everyone else you still need other channels, such as your [salon booking link](lesson:chia-se-link) or [email marketing](lesson:email-marketing)." },
      ],
    },
    {
      id: "after-posting",
      title: "After posting: view the fanpage, share the link and common situations",
      blocks: [
        { p: "The post appears on your salon's Fanpage straight away, with its photo and the button you chose. Clients can like, comment and share it, and the four numbers at the top of “Fanpage” change accordingly." },
        { img: { src: shot("like-comment-share-on-post"), alt: "The bottom of a post with the spa photo, the Book now button and the Like, Comment and Share buttons outlined in gold" } },
        { p: "Press “View fanpage” to see the page exactly as clients do. Press “Copy link” to get the fanpage address and send it to clients in a message or add it to your salon's social media. Anyone who opens the link can read the posts, because the fanpage is public." },
        { img: { src: shot("view-fanpage-and-copy-link"), alt: "The top of Fanpage in the dashboard with the View fanpage button and the Copy link button outlined in gold, above the Posts counter showing 1", caption: "After your first post, the “Posts” counter at the top of “Fanpage” shows 1." } },
        {
          table: {
            head: ["Situation", "What to do"],
            rows: [
              ["You want the post to go out tomorrow", "Press “Schedule” and choose the date and time"],
              ["An offer is being pushed down by new posts", "Press “Pin to top” for the offer"],
              ["Clients read the post but do not book", "Choose “Book now” under “Button”"],
              ["You want to know how clients see the fanpage", "Press “View fanpage”"],
              ["The fanpage has few followers", "Press “Copy link” and send the fanpage link to regular clients"],
            ],
          },
        },
        { p: "If you also want a full introduction page with services, team and reviews, see the guide to a [free salon website](lesson:website-salon). “Landing page” sits right next to “Fanpage” in the dashboard." },
      ],
    },
  ],
  howTo: {
    title: "How to publish a salon promotion post on the VaraaAi Fanpage",
    id: "fanpage-post-steps",
    after: "before-you-post",
    lead: "These seven steps follow the lesson video, from the composer to checking the fanpage.",
    steps: [
      {
        name: "Open “Fanpage”",
        text: "In the dashboard, tap “Fanpage”. At the top are your posts, followers, likes and comments. The box for writing a post is just below.",
        image: { src: shot("posts-followers-likes-comments"), alt: "The top of Fanpage with the four counters Posts, Followers, Likes and Comments outlined in gold, and the post composer below" },
      },
      {
        name: "Write your text in the composer",
        text: "Type the post in the box that asks what is new at the salon today. Keep it short and put the main news in the first sentence: what the offer is, for which service and until when. Clients scrolling their feed only read the first lines.",
        image: { src: shot("write-salon-post-text"), alt: "The post composer outlined in gold with the text New this week: soft almond nails in our winter colours, and a photo and the Label options below" },
      },
      {
        name: "Choose a “Label”",
        text: "Tap one of the four labels: “Offer”, “New work”, “News” or “Beauty tip”. The label appears above the post text and helps clients recognise the kind of news before they read.",
      },
      {
        name: "Choose a “Button”",
        text: "Choose the button clients will tap after reading: “Book now”, “Shop products” or “Call now”. For an offer, choose “Book now” so clients go straight to your booking page.",
      },
      {
        name: "Tap “Photos” or “Video” to add pictures",
        text: "Tap “Photos” or “Video” and choose the file. One post can hold several photos; in the lesson video, the counter next to “Photos” reads 1/6 after the first one. Added photos appear right under the text so you can check them.",
        image: { src: shot("photo-added-to-salon-post"), alt: "A spa photo just added to the post outlined in gold under the text, with the Label and Button options below" },
      },
      {
        name: "Tap “Schedule” or “Pin to top” if needed",
        text: "To publish the post at another time, tap “Schedule” and choose the date and time. For an important post, tap “Pin to top”. Both are optional, and everyday posts can skip this step.",
      },
      {
        name: "Tap “Post”, then “View fanpage”",
        text: "Tap “Post”. The post appears on your salon's Fanpage straight away, with its photo and the “Book now” button. Then tap “View fanpage” to see the page as clients do, or “Copy link” to send it to them.",
        image: { src: shot("post-button-on-fanpage"), alt: "The black Post button at the bottom of the composer outlined in gold, with the Photos, Video, Schedule and Pin to top buttons above it" },
      },
    ],
  },
  faq: [
    {
      q: "Who sees posts on a salon's Fanpage on VaraaAi?",
      a: "Clients who follow the salon see new posts straight away in their feed. The fanpage is also the salon's public channel, so anyone can read the posts on it.",
    },
    {
      q: "How do I schedule a post to go out tomorrow?",
      a: "In the composer, tap “Schedule” and choose the date and time. The post goes live at that moment, without you having to open the app again.",
    },
    {
      q: "Which button under a post helps clients book fastest?",
      a: "The “Book now” button. Clients tap it and go straight to your salon's booking page, so it belongs under every offer.",
    },
    {
      q: "Which labels can a Fanpage post have?",
      a: "There are four labels: “Offer”, “New work”, “News” and “Beauty tip”. You can also choose “No label” if the post does not fit any of them.",
    },
    {
      q: "When should I use “Pin to top”?",
      a: "For an important post you want clients to see first, such as an offer that is running now. Tap “Pin to top” in the composer before posting.",
    },
    {
      q: "How do I send my salon's fanpage to clients?",
      a: "In “Fanpage” in the dashboard, tap “Copy link” to get the fanpage address and send it to clients. You can also tap “View fanpage” to see the page as clients do before you share it.",
    },
  ],
  related: ["website-salon", "chia-se-link", "email-marketing", "theo-doi-salon"],
};

export default article;
