import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/danh-gia-google/${name}.webp`;
const shot = (name: string) => `/wiki/danh-gia-google/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "how-to-get-google-reviews-for-a-salon",
  lesson: "danh-gia-google",
  category: "marketing",
  title: "How to get Google reviews for a salon: approve reviews, reply to clients and invite happy clients to Google",
  metaTitle: "How to get Google reviews for a salon, nail bar or spa",
  metaDescription:
    "How salon owners manage reviews on VaraaAi: approve each one before it goes live, reply with ready-made templates and add your Google Maps link for more reviews.",
  keyword: "how to get Google reviews for a salon",
  keywords: [
    "how to get more Google reviews for a nail salon",
    "how to respond to customer reviews",
    "reply to a 5-star review example",
    "how to respond to a bad review as a salon",
    "get more Google Maps reviews for a spa",
    "automatic review request email after an appointment",
    "approve reviews before they appear on the salon page",
  ],
  excerpt: "Clients get a review request by email after every completed appointment. You approve, publish and reply with templates, and your Google Maps link invites happy clients to Google too.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-nu-cuoi-nhin-dien-thoai-trong-salon"),
    alt: "A young woman with a blonde bob and a cream jumper smiles at her phone in a salon, with a glowing gift box icon above the screen",
  },
  takeaways: [
    "Clients **automatically get an email asking for a review** after every completed appointment. There is nothing for you to send.",
    "A new review only appears on your salon's page **after you press “Publish”**.",
    "The gold button above the list publishes every waiting 4–5 star review in one go.",
    "Reply with one of three templates, “Thank you”, “Appreciate it” or “Apology”, adjust the text and press “Post reply”.",
    "Add your **Google Maps link in “Settings”** so that happy clients are invited to review you on Google as well.",
  ],
  intro: [
    "The least tiring answer to how to get Google reviews for a salon is to make the asking happen after every visit, instead of remembering now and then to ask a client in person. New clients often read reviews before they choose a salon, so a few honest lines from people who have already been carry more weight than anything you write about yourself.",
    "This guide follows the VaraaAi Academy lesson “Reviews and Google”. You will learn to approve each review before it shows on your salon's page, answer clients with ready-made templates, and switch on the invitation that asks happy clients to review you on Google too.",
  ],
  sections: [
    {
      id: "where-reviews-come-from",
      title: "Where reviews come from: the automatic review request email",
      blocks: [
        { p: "The hard part of asking for reviews is remembering to ask. The technician is already busy with the next client, and the client who just paid is in a hurry to leave. On VaraaAi nobody has to remember: clients automatically receive an email asking for a review after every completed appointment." },
        { img: { src: shot("automatic-review-requests"), alt: "The Reviews page on a tablet with the Automatic review requests box outlined in gold, below the Get more Google reviews panel and its Open Settings button", caption: "The “Automatic review requests” box: clients get an email after every completed booking, with nothing for you to do." } },
        { p: "Two conditions hide in that sentence. The appointment has to be in the system, and it has to be marked as completed. A salon that keeps its calendar tidy, as shown in the guide to [managing appointments](lesson:lich-hen), sends the request to exactly the people who really came in." },
        { p: "To see what the client sees when they choose the stars and write a comment, read the guide on [how to write a salon review](lesson:viet-danh-gia)." },
      ],
    },
    {
      id: "reviews-page",
      title: "The “Reviews” page: average rating, awaiting approval and response rate",
      blocks: [
        { p: "Open “Reviews” and the top of the page gives you three numbers. Just below them sit your average rating and how many reviews you have at each star level." },
        {
          table: {
            head: ["Number", "What it means", "What you do"],
            rows: [
              ["Average rating", "The average stars out of 5 across your reviews", "Watch the trend rather than worrying about a single review"],
              ["“Awaiting approval”", "Reviews clients have sent that you have not yet published or hidden", "Check them regularly so new reviews go live soon"],
              ["“Response rate”", "The share of reviews the salon has replied to", "The more you answer, the higher it climbs"],
            ],
          },
        },
        { p: "Below are the filters “All”, “Awaiting”, “Unanswered”, “Published” and “Hidden”. “Awaiting” and “Unanswered” are your to-do list. There is also a search box for a client's name or words in the review, and at the bottom of the page a section called “Ratings by staff”." },
        { img: { src: shot("review-filters-all-awaiting-unanswered"), alt: "The filter row All, Awaiting and Unanswered outlined in gold, with the search box, the rating and sort menus and the gold publish button below", caption: "The pale gold box reminds you that new reviews appear on your salon's page only after you publish them." } },
      ],
    },
    {
      id: "approve-reviews",
      title: "Approve reviews before they appear on your salon page",
      blocks: [
        { p: "A new review does not go public on its own. It waits with the status “Awaiting” until you decide. For each review you have two choices: “Publish” to make it public, or “Hide” if the content is not suitable." },
        { p: "When several good reviews are waiting, you do not have to publish them one by one. The gold button above the list publishes every waiting 4–5 star review at once, and it shows how many there are." },
        { img: { src: shot("publish-pending-4-5-star-reviews-gold-button"), alt: "The gold button Publish 1 pending 4–5 star reviews outlined in gold, above a five-star review from Nam that is still awaiting approval" } },
        { note: "“Hide” is meant for content that is not suitable. A critical review with a real reason is different: published with a calm, courteous reply, it shows new clients how the salon deals with a problem. People read the salon's answer as well as the stars.", kind: "tip", title: "Do not hide every complaint" },
      ],
    },
    {
      id: "how-to-respond-to-reviews",
      title: "How to respond to customer reviews: three ready-made templates",
      blocks: [
        { p: "Press “Reply” under a review and the “Reply templates” open with three options. On screen, each template shows the star rating it suits:" },
        {
          table: {
            head: ["Template", "Suits", "What to add"],
            rows: [
              ["“Thank you (5★)”", "A 5-star review", "Mention the treatment or the technician's name"],
              ["“Appreciate it (4★)”", "A 4-star review", "Say which point of the feedback you have taken on board"],
              ["“Apology (≤3★)”", "A review of 3 stars or fewer", "Say what the salon will do differently and invite the client to get in touch"],
            ],
          },
        },
        { p: "A template is only a starting point. The lesson says to pick one and adjust it, because the same sentence under every review tells readers that nobody actually read them. One detail from that particular visit is enough to make it personal." },
        { img: { src: shot("salons-reply-under-customer-review"), alt: "A published five-star review from Nam with the Salon's reply thank-you message outlined in gold just below it and the Edit reply button underneath", caption: "The salon's reply appears straight under the client's review. “Edit reply” sits below it." } },
        { p: "Answer the good reviews as well as the critical ones. A client who took the time to write a few kind lines feels valued when the salon replies. When a client complains, also write what went wrong in the internal notes of your [client records](lesson:khach-hang), so the whole team knows next time." },
      ],
    },
    {
      id: "get-google-reviews",
      title: "Get more Google Maps reviews: add your link in Settings",
      blocks: [
        { p: "Reviews on your VaraaAi salon page help people who have already found you on VaraaAi. Reviews on Google help people who are searching for a salon on Google and Google Maps. The two work together, and the lesson shows you how to connect them." },
        { p: "The “Reviews” page has a panel called “Get more Google reviews”. It tells you to add your Google Maps link in Settings to invite clients to review you on Google, and it has an “Open Settings” button. The Google Maps link is the web address of your salon's place on Google Maps. Once you add it, happy clients are invited to review you on Google as well." },
        { img: { src: shot("get-more-google-reviews-open-settings"), alt: "The dark Get more Google reviews panel outlined in gold with its Open Settings button, and the Automatic review requests box below it", caption: "Press “Open Settings” to reach the place where you add your salon's Google Maps link." } },
        { p: "You do not pay Google anything for this. What you need is a salon that already appears on Google Maps. If you are not sure how your salon currently looks on Google, the [free salon check of your website, Google and Facebook](lesson:kiem-tra-salon) helps you look it over." },
        { note: "The email does the regular work. A word at the counter, when the client has just finished and is pleased with the result, still has its own effect, for example: “If you're happy with it, you'll get an email shortly. A few lines would mean a lot to us.”", kind: "tip", title: "Mention it in person too" },
      ],
    },
    {
      id: "common-situations",
      title: "Common situations when you manage reviews",
      blocks: [
        {
          table: {
            head: ["Situation", "What to do"],
            rows: [
              ["A client says they left a review but your page does not show it", "Open the “Awaiting” filter and press “Publish”. A review only shows after you publish it"],
              ["Several good reviews are waiting", "Press the gold button to publish every waiting 4–5 star review at once"],
              ["You receive a low rating", "Read it carefully, press “Reply”, choose the “Apology” template and adjust it to what happened"],
              ["You posted a reply but want to rewrite it", "Press “Edit reply” under the salon's reply"],
              ["You want more reviews on Google", "Press “Open Settings” in the “Get more Google reviews” panel and add your Google Maps link"],
            ],
          },
        },
        { p: "An unanswered message easily turns into a low rating. The guide to [messages and the AI assistant](lesson:tin-nhan-ai) shows how clients always get an answer, even when your hands are busy." },
      ],
    },
  ],
  howTo: {
    title: "How to approve, reply to and get Google reviews for a salon, step by step",
    id: "manage-reviews-steps",
    after: "reviews-page",
    lead: "The six steps follow the lesson video in order, from opening the “Reviews” page to connecting it with Google.",
    steps: [
      {
        name: "Open “Reviews”",
        text: "In the salon dashboard, press “Reviews”. At the top you see your “Response rate”, the number “Awaiting approval” and the reviews from the last 30 days, with your average rating below. The “Awaiting approval” number tells you how many reviews are waiting for you.",
        image: { src: shot("reviews-overview-response-rate-awaiting-approval"), alt: "The three boxes Response rate, Awaiting approval and Last 30 days outlined in gold, above an average rating of 5.0 out of 5 with the star breakdown" },
      },
      {
        name: "Filter the waiting reviews",
        text: "Press the “Awaiting” filter to see only reviews that have not been published yet. The other filters are “Unanswered”, “Published” and “Hidden”. Read each review before you decide what to do with it.",
      },
      {
        name: "Press “Publish” or “Hide”",
        text: "For each review, press “Publish” to make it public on your salon's page, or “Hide” if the content is not suitable. A new review only appears on your salon's page once you publish it.",
        image: { src: shot("publish-button-awaiting-review"), alt: "A five-star review from Nam marked Awaiting, outlined in gold, with the Reply, Publish and Hide buttons along its bottom edge" },
      },
      {
        name: "Publish all waiting 4–5 star reviews at once",
        text: "When several good reviews are waiting, press the gold button above the list. It publishes every waiting 4 and 5 star review in one go, so you only need to look separately at the lower ratings.",
      },
      {
        name: "Press “Reply”, pick a template and press “Post reply”",
        text: "Press “Reply” under the review. Choose a template, “Thank you”, “Appreciate it” or “Apology”, and adjust it for that client. Then press “Post reply”. Your answer appears right under the client's review.",
        image: { src: shot("reply-templates-thank-you-appreciate-apology"), alt: "The Reply templates Thank you (5★), Appreciate it (4★) and Apology (≤3★), a thank-you message in the text box and the gold Post reply button" },
      },
      {
        name: "Add your Google Maps link in “Settings”",
        text: "In the “Get more Google reviews” panel, press “Open Settings” and add your salon's Google Maps link. From then on, happy clients are also invited to review you on Google, alongside the automatic review request email after every completed appointment.",
      },
    ],
  },
  faq: [
    {
      q: "How do I get clients to review my salon on Google?",
      a: "Add your salon's Google Maps link in “Settings”. On the “Reviews” page, the “Get more Google reviews” panel has an “Open Settings” button that takes you there. Once the link is added, happy clients are invited to review you on Google as well.",
    },
    {
      q: "Do I have to send every client a review request myself?",
      a: "No. Clients automatically get an email asking for a review after every completed appointment. There is nothing for you to do.",
    },
    {
      q: "Do client reviews appear on my salon page automatically?",
      a: "No. A new review only appears on your salon's page after you press “Publish”. You approve each review before it goes public, and you can press “Hide” if the content is not suitable.",
    },
    {
      q: "Should a salon reply to 5-star reviews?",
      a: "Yes. Replying to good reviews too makes clients feel valued. Press “Reply”, choose the “Thank you” template, adjust it and press “Post reply”.",
    },
    {
      q: "How should a salon respond to a bad review?",
      a: "Press “Reply” and choose the “Apology” template, which is meant for reviews of 3 stars or fewer. Adjust it to what actually happened with that client and press “Post reply”. Your answer appears right under the review.",
    },
    {
      q: "How can I publish several good reviews at once?",
      a: "Press the gold button above the list of reviews. It publishes every 4–5 star review that is waiting for approval in one go.",
    },
  ],
  related: ["tin-nhan-ai", "khach-hang", "viet-danh-gia", "kiem-tra-salon"],
};

export default article;
