import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/viet-danh-gia/${name}.webp`;
const shot = (name: string) => `/wiki/viet-danh-gia/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "how-to-write-a-salon-review",
  lesson: "viet-danh-gia",
  category: "booking",
  title: "How to write a salon review after your treatment: star rating and a few honest words on VaraaAi",
  metaTitle: "How to write a salon review after your visit | VaraaAi",
  metaDescription:
    "How to write a salon review on VaraaAi: open it from the invitation email or My bookings, give 1 to 5 stars, add a few lines and submit. What to write.",
  keyword: "how to write a salon review",
  keywords: [
    "review a nail salon",
    "hair salon review",
    "rate a salon",
    "write a spa review",
    "review after a beauty treatment",
    "are VaraaAi reviews genuine",
  ],
  excerpt: "Give stars and a few words about your visit from the review invitation email or from “My bookings”. It takes about half a minute.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-noi-mi-lam-cho-khach-truoc-khi-khach-viet-danh-gia"),
    alt: "A lash technician in a cream uniform applies lash extensions to a client lying on a treatment bed in an elegant salon with a ring light",
  },
  takeaways: [
    "There are two ways in: the “Leave a review” button in the **review invitation email**, or the “Leave a review” button on your booking in “My bookings”.",
    "Under “Service quality”, choose **1 to 5 stars**, write a few lines and press “Submit review”.",
    "The whole thing takes about **half a minute**.",
    "Only customers who **booked** at a salon can review that salon.",
    "Your review appears on the salon's page once the salon has read and published it.",
  ],
  intro: [
    "Knowing how to write a salon review that is short and useful is a small skill that helps both sides: the salon learns what it does well and what to improve, and the customers who come after you have more to go on when choosing. On VaraaAi it takes about half a minute after each appointment.",
    "This guide follows the VaraaAi Academy lesson “Leave a review after your visit”. You will learn where to open the review window, how to rate and submit, what to write, and when your review appears on the salon's page.",
  ],
  sections: [
    {
      id: "why-review",
      title: "Why leave a review after a beauty treatment",
      blocks: [
        { p: "Technicians rarely hear honest feedback. A happy client usually says thank you and leaves; an unhappy one quietly does not come back. A few lines in a review are the simplest way for a salon to learn what is working and what needs adjusting." },
        { p: "For someone looking for a salon, reviews are the first thing they read. VaraaAi's search results show each salon's rating, and every salon page has its own “Reviews” tab. What you write today helps another person decide next week." },
        { note: "On VaraaAi, only customers who booked at a salon can write a review of it. People who never booked cannot. That is why the reviews you read on a salon's page all come from real customers.", kind: "info", title: "Who can write a review" },
      ],
    },
    {
      id: "what-to-write",
      title: "What to write in a salon review",
      blocks: [
        { p: "The text box only needs a few sentences. In the lesson video, the customer writes that the work was beautiful and careful, the staff were friendly and she will definitely be back. A short review like that is enough. If you want yours to help other readers more, add one or two specific details." },
        {
          table: {
            head: ["Worth mentioning", "Why it helps"],
            rows: [
              ["The service you had", "Readers know whether you mean gel polish, lash extensions or a haircut"],
              ["Skill and care", "This is what new customers care about most, and it is hard to judge from photos"],
              ["Attitude and advice", "Shows whether the salon listens and explains clearly"],
              ["On time, or a wait", "Helps busy people plan their day"],
              ["Anything you were not happy with, said specifically", "The salon knows exactly what to fix, and readers see a fair review"],
            ],
          },
        },
        { note: "Your stars should match your words. Five stars with a text full of complaints, or one star with no explanation, makes a review hard to trust. Rate the service quality as you honestly felt it, then use a few sentences to say why.", kind: "tip", title: "Stars and words should agree" },
        { p: "When something was not right, it is still worth writing, calmly and sticking to what happened. For things the salon can put right quickly, such as a nail lifting early, you can also [message the salon](lesson:chat-voi-salon) first so it has a chance to fix it." },
      ],
    },
    {
      id: "after-submitting",
      title: "After you submit: when your review appears on the salon's page",
      blocks: [
        { img: { src: shot("thanks-for-your-review"), alt: "A window saying Thanks for your review with five orange stars and a black OK button, shown over the My bookings list", caption: "“Thanks for your review!” confirms the review has been sent." } },
        { p: "A review does not go live the moment you press submit. The salon reads it first and then publishes it on its page. Once published, the rating and number of reviews sit right below the salon's name, where every visitor to the page sees them." },
        { img: { src: shot("rating-shown-on-salon-page"), alt: "The Lumi Beauty Paris page on VaraaAi with the 5.0 rating and review count highlighted in gold just below the salon's name", caption: "The rating appears right below the salon's name." } },
        { p: "If you cannot see your review on the page yet, it is still waiting for the salon to read and publish it. There is no need to send it again." },
      ],
    },
    {
      id: "common-situations",
      title: "Common situations when writing a review",
      blocks: [
        {
          table: {
            head: ["Situation", "What to do"],
            rows: [
              ["You did not get the invitation email", "No need to wait for it. Sign in, open “My bookings”, find your booking and press “Leave a review”"],
              ["You want to review a salon you never booked through VaraaAi", "That is not possible. Only customers who booked at that salon can review it"],
              ["You don't know what to write", "Give your stars first, then write two sentences: what service you had and what you remember most about the visit"],
              ["You submitted but it is not on the salon's page", "Reviews appear once the salon has read and published them"],
            ],
          },
        },
      ],
    },
    {
      id: "reading-reviews",
      title: "Using other people's reviews to choose a salon",
      blocks: [
        { p: "You benefit from other people's reviews too. When you [search for a salon](/search), look at the rating in the results, then open the salon's page and read its “Reviews” before you [book a salon appointment online](lesson:dat-lich-online). A salon with several specific comments about the exact service you want is a better sign than a score on its own." },
        { p: "After your appointment, everything comes back to [My bookings](lesson:lich-hen-cua-toi): you see your past bookings there and press “Leave a review” on the spot." },
        { note: "Salons read reviews, publish them on their page and reply to customers in their dashboard. See the lesson [Reviews and Google](lesson:danh-gia-google).", kind: "info", title: "Own a salon?" },
      ],
    },
  ],
  howTo: {
    title: "Steps to write a salon review on VaraaAi",
    id: "review-steps",
    after: "why-review",
    lead: "Five short steps you can do on your phone as soon as you leave the salon.",
    steps: [
      {
        name: "Open your booking from the email or from “My bookings”",
        text: "After each appointment, VaraaAi sends you an email inviting you to leave a review; press the button in that email. Or sign in, tap your name at the top and choose “My bookings” yourself.",
        image: { src: shot("open-my-bookings"), alt: "The My bookings page on a tablet with the My bookings heading highlighted in gold and booking cards below" },
      },
      {
        name: "Press “Leave a review” on the booking",
        text: "Find the booking for the visit you want to review and press its “Leave a review” button. A small window called “Rate your experience” opens.",
        image: { src: shot("press-leave-a-review-on-booking"), alt: "A booking card for a relax massage in My bookings with the Leave a review button highlighted in gold" },
      },
      {
        name: "Choose your stars under “Service quality”",
        text: "On the “Service quality” line, tap the star that matches your rating, from 1 to 5.",
        image: { src: shot("choose-stars-service-quality"), alt: "The Rate your experience window with the row of five stars under Service quality highlighted in gold" },
      },
      {
        name: "Write a few lines",
        text: "Tap the box “Share your experience...” below the stars and write a few lines about the visit: what you had done, and what pleased you or did not. It does not need to be long; specific is enough.",
        image: { src: shot("write-share-your-experience"), alt: "The review window on VaraaAi with the text box highlighted in gold, holding two sentences praising careful work and friendly staff" },
      },
      {
        name: "Press “Submit review” and check the thank-you message",
        text: "Read your stars and text once more, then press “Submit review” at the bottom of the window. The screen shows “Thanks for your review!” with your stars; press “OK” to close it. The salon then reads your review and publishes it on its page.",
        image: { src: shot("press-submit-review"), alt: "The review window with five stars and a comment filled in, and the black Submit review button highlighted in gold" },
      },
    ],
  },
  faq: [
    {
      q: "Who can review a salon on VaraaAi?",
      a: "Only customers who booked at that salon. People who never booked cannot write a review, which is why the reviews on VaraaAi come from real customers.",
    },
    {
      q: "Where do I write a salon review?",
      a: "There are two ways. Press the button in the review invitation email VaraaAi sends after your appointment, or open “My bookings”, find your booking and press “Leave a review”.",
    },
    {
      q: "How long does writing a review take?",
      a: "About half a minute. You choose 1 to 5 stars under “Service quality”, write a few lines and press “Submit review”.",
    },
    {
      q: "Does my review appear on the salon's page straight away?",
      a: "Not immediately. The salon reads the review first and then publishes it on its page. Once published, the rating and number of reviews appear below the salon's name.",
    },
    {
      q: "What if I did not get the review invitation email?",
      a: "You can still review without it. Sign in, tap your name at the top, open “My bookings”, find your booking and press “Leave a review”.",
    },
    {
      q: "Can I trust the reviews on VaraaAi?",
      a: "Every review is tied to a customer who booked at the salon, because people who never booked cannot write one. That is the difference from sites where anyone can leave a comment.",
    },
  ],
  related: ["lich-hen-cua-toi", "chat-voi-salon", "dat-lich-online", "the-thanh-vien"],
};

export default article;
