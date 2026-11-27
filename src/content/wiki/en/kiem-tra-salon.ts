import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/kiem-tra-salon/${name}.webp`;
const shot = (name: string) => `/wiki/kiem-tra-salon/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "salon-online-presence-check",
  lesson: "kiem-tra-salon",
  category: "marketing",
  title: "Salon online presence check: score your website, Google, Facebook and Instagram for free",
  metaTitle: "Salon online presence check: free score for 4 channels",
  metaDescription:
    "How to use VaraaAi's free salon check: get an online presence score for your website, Google profile, Facebook and Instagram, plus a list of what to fix first.",
  keyword: "salon online presence check",
  keywords: [
    "how does my salon look online",
    "online presence score for a salon",
    "salon marketing where to start",
    "Google Business Profile for a salon",
    "how clients find a nail salon on Google",
    "keywords for a nail, hair or beauty salon",
    "free salon website check",
  ],
  excerpt: "Enter your salon's name and address and get a score out of 100 for your website, Google, Facebook and Instagram, plus what to fix first. No email or sign-up.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-tim-salon-tren-dien-thoai-truoc-khi-den"),
    alt: "A young woman with long brown hair sits on a sofa by a window with potted plants, smiling at the phone in her hands",
  },
  takeaways: [
    "VaraaAi's salon check is **free, with no email and no sign-up**. The result appears right on the page.",
    "The report gives an **online presence score** out of 100 and separate scores for four channels: website, Google profile, Facebook and Instagram.",
    "Each channel gets a rating such as **“Strong”** or **“Weak”**. Press “View details” to see why.",
    "**“Your biggest opportunities”** tells you what to do first, and each point comes with “What to do”.",
    "Work through the suggestions one by one, then run the check again to watch the score rise.",
  ],
  intro: [
    "A salon online presence check is a better first step in marketing than ads or daily posting: you look at your salon the way a stranger sees it after finding it online. New clients usually look a salon up before they visit, and they only see what is out there.",
    "This guide follows the VaraaAi Academy lesson “Check how your salon looks online”. You will use the free check, understand the report and know which task to tackle first to win more clients.",
  ],
  sections: [
    {
      id: "why-check-first",
      title: "Why check how your salon looks online before you start marketing",
      blocks: [
        { p: "You see your salon from the inside: you know the opening hours, the prices and how to get there. A new client sees it from the outside, on a phone screen. If the website does not show opening hours or prices, they do not ring to ask. They move on to the next salon in the search results." },
        { p: "So before you put effort into any channel, find out which channels are weak and where. The tool in this lesson scores your salon's website, Google, Facebook and Instagram, then shows exactly what to do to win more clients. The whole thing takes about a minute." },
        { p: "The tool is open to everyone. A salon that does not use VaraaAi can run the check, and so can a salon without a website." },
      ],
    },
    {
      id: "what-it-checks",
      title: "What the check looks at on your website, Google, Facebook and Instagram",
      blocks: [
        { p: "Just below the check button is a short “What we check” list. Read it and you also have a list of what a salon needs online:" },
        {
          table: {
            head: ["Channel", "What is checked"],
            rows: [
              ["Website", "Mobile, booking button, prices, opening hours"],
              ["Google Business Profile", "The profile and reviews"],
              ["Facebook and Instagram", "Found from your salon's website"],
              ["Keywords", "Keywords to target and marketing ideas"],
            ],
          },
        },
        { img: { src: shot("check-for-free-now-button"), alt: "The orange Check for free now button with the line No email, no sign-up below it and the start of the What we check list", caption: "The “What we check” list sits just below the “Check for free now” button." } },
        { p: "The website items match what a new client wants to know: does the page work on a phone, where do I book, what does it cost and when are you open." },
      ],
    },
    {
      id: "before-you-start",
      title: "What to have ready for a free salon check",
      blocks: [
        {
          ul: [
            "**Your salon name**, exactly as on your sign and online.",
            "**Your salon address.** In the lesson video, the tool suggests the full address as you type, so you can pick it.",
            "**Your salon type**, for example nail salon, hair salon, spa or lash studio. According to the hint on screen, it is used for keyword and marketing ideas.",
            "**Your website address**, if you have one. The field is optional and it is fine to leave it empty. If you add it, the tool finds your Facebook and Instagram on it automatically.",
            "**The answer to one question:** does the salon have a Google Business Profile? If you do not remember, choose “Not sure”.",
          ],
        },
        { note: "You do not need an account and you do not leave an email address. The line under the check button says it plainly: no email, no sign-up, and the results show up right there.", kind: "info", title: "No sign-up" },
      ],
    },
    {
      id: "reading-the-report",
      title: "How to read your salon's online presence score",
      blocks: [
        { p: "The report goes from the overall picture to the details. At the top is the online presence score out of 100, with a short verdict. Below are the scores for each channel, each also out of 100 with a rating such as “Strong” or “Weak”." },
        { img: { src: shot("online-presence-score-out-of-100"), alt: "The top of an online presence report with a score ring showing 45 out of 100 outlined in gold and the verdict Needs attention now below the salon name" } },
        { p: "The example salon in the lesson video helps you picture it. The figures below belong to that example salon only, not to any standard:" },
        {
          table: {
            head: ["Channel", "Example salon's score", "Rating"],
            rows: [
              ["Overall", "45/100", "Needs attention now"],
              ["Website", "0/100", "Weak"],
              ["Google profile", "90/100", "Strong"],
              ["Facebook", "No score", "Not checked"],
              ["Instagram", "No score", "Not checked"],
            ],
          },
        },
        { img: { src: shot("website-and-google-profile-scores"), alt: "Two score cards in the report: Website 0 out of 100 rated Weak, outlined in gold, and Google profile 90 out of 100 rated Strong below" } },
        { p: "The example salon has no website, so the tool had nothing to find Facebook and Instagram on, and both channels show “Not checked”. That is a good reminder that the channels depend on each other." },
        { img: { src: shot("facebook-instagram-not-checked"), alt: "The Facebook and Instagram cards in the report, both labelled Not checked with no score and a View details link" } },
        { p: "Do not stop at the numbers. Each card has a “View details” link that explains why the channel scored as it did. The lowest score is not always the first job; the next part of the report answers that." },
      ],
    },
    {
      id: "biggest-opportunities",
      title: "“Your biggest opportunities”: what to do first",
      blocks: [
        { p: "This is the most important part of the report. It lists the things that most affect whether a client picks your salon. Each point is numbered, has an impact label and comes with “What to do”." },
        { img: { src: shot("biggest-opportunity-what-to-do"), alt: "Point 1 of Your biggest opportunities with the High impact label, the line Your salon doesn't have a website and the What to do box, outlined in gold", caption: "Each point has an impact label and a “What to do” box." } },
        { p: "For the example salon in the video, the first point is that it does not have a website. The advice is to create a free profile and booking page on VaraaAi, with no coding needed. For salons on VaraaAi, the tasks a check often raises each have their own guide:" },
        {
          table: {
            head: ["Task", "Guide"],
            rows: [
              ["Show your opening hours for each day", "[Set salon opening hours](lesson:gio-mo-cua)"],
              ["Show services with prices", "[Salon service menu](lesson:dich-vu) and [salon price list template](lesson:bang-gia)"],
              ["Have a website with a booking button", "[Free salon website](lesson:website-salon)"],
              ["Collect more Google reviews", "[Reviews and Google](lesson:danh-gia-google)"],
            ],
          },
        },
        { note: "Choose one task, finish it, then run the check again. Working through them one at a time shows you the score rising after each one and tells you which tasks really make a difference.", kind: "tip", title: "One task at a time" },
      ],
    },
    {
      id: "keywords",
      title: "Keywords for a nail, hair or beauty salon: what the report suggests",
      blocks: [
        { p: "Near the end of the report is “Keywords to target”. These are phrases a client might type when looking for a salon like yours. The ideas are based on your salon type and area, for your website, Google, Facebook and YouTube." },
        { p: "For the example nail salon in the video, the suggestions combine the salon type with the street address, and with words for nearby, trusted, affordable, booking and reviews." },
        { p: "The most practical use is to put these phrases where clients read: the introduction on your website, your profile description, the captions of your posts. Write them into natural sentences rather than pasting the whole list in one place." },
      ],
    },
    {
      id: "save-and-recheck",
      title: "Save the report and check again after your changes",
      blocks: [
        { p: "Press “Print / Save PDF” to keep the report. The saved copy is your baseline: a few weeks later, when you have done the suggested tasks, run the check again and put the two side by side." },
        { img: { src: shot("print-save-pdf-report"), alt: "The summary at the top of the report with the Print / Save PDF button outlined in gold and the Check another salon button below it" } },
        { p: "“Check another salon” takes you back to the form to check another salon. Owners with several locations should check each address, because each branch has its own profile and address online. Running several locations in VaraaAi is covered in the lesson on [branches](lesson:chi-nhanh)." },
      ],
    },
  ],
  howTo: {
    title: "How to run a free salon online presence check on VaraaAi",
    id: "salon-check-steps",
    after: "before-you-start",
    lead: "These six steps follow the order of the lesson video. From opening the tool to reading the report takes about a minute.",
    steps: [
      {
        name: "Open the salon check",
        text: "Open varaaai.com, scroll to the bottom and tap “Free salon check” in the “Business” group, or go straight to the [salon check](/salon-check). You do not need to sign in.",
        image: { src: shot("free-salon-check-link-in-footer"), alt: "The bottom of the VaraaAi home page on a phone with the Free salon check link outlined in gold in the Business group" },
      },
      {
        name: "Enter the “Salon name” and “Salon address”",
        text: "In the “Check your salon” box, type the “Salon name” and then the “Salon address”. Write the name as clients see it on your sign and online, so the tool finds the right salon.",
        image: { src: shot("salon-name-and-address-to-check"), alt: "The Check your salon box with the Salon name filled in and the Salon address field outlined in gold above a suggested full address" },
      },
      {
        name: "Choose the “Salon type” and add your “Website” if you have one",
        text: "Choose the “Salon type”, for example nail salon, hair salon, spa or lash studio. If you have a website, add it in the “Website” field. It is optional, but with a website the report is more complete, because the tool finds your Facebook and Instagram from it.",
        image: { src: shot("salon-type-nail-salon"), alt: "The salon type field showing Nail salon outlined in gold, with the optional Website field and the Google Business Profile question below" },
      },
      {
        name: "Answer the Google question and press “Check for free now”",
        text: "Under “Does your salon have a Google Business Profile?”, choose “Yes”, “Not sure” or “No”. Then press “Check for free now”. No email or sign-up is needed, and the report appears a few seconds later.",
        image: { src: shot("google-business-profile-question"), alt: "The question Does your salon have a Google Business Profile with the Yes, Not sure and No options outlined in gold above the orange Check for free now button" },
      },
      {
        name: "Read the online presence score and each channel",
        text: "Look at the overall score out of 100 at the top of the report, then scroll down to the scores for website, Google profile, Facebook and Instagram. Press “View details” under each channel to see why it got its rating.",
      },
      {
        name: "Read “Your biggest opportunities”, then press “Print / Save PDF”",
        text: "Scroll down to “Your biggest opportunities” and read the “What to do” box for each point. Press “Print / Save PDF” to keep the report, or “Check another salon” if you have more than one location. After each task, come back and run the check again.",
      },
    ],
  },
  faq: [
    {
      q: "Do I need to sign up or give an email for the VaraaAi salon check?",
      a: "No. The tool is free and open to everyone, with no email and no sign-up. You enter your salon's details, press “Check for free now” and the results appear right on the page.",
    },
    {
      q: "Which channels does the salon check score?",
      a: "Four channels: website, Google profile, Facebook and Instagram. Each gets a score out of 100 and a rating such as “Strong” or “Weak”, and there is an overall online presence score too.",
    },
    {
      q: "Can I check my salon if it has no website?",
      a: "Yes. The “Website” field is optional, so you can leave it empty and run the check as normal. If you do add a website, the tool uses it to find your salon's Facebook and Instagram.",
    },
    {
      q: "Which part of the report tells me what to do first?",
      a: "“Your biggest opportunities”. It lists the things that most affect whether a client picks your salon, and each point has a “What to do” box, for example creating a website with a booking page.",
    },
    {
      q: "How do I save the salon check report?",
      a: "Press “Print / Save PDF” near the top of the report to print it or save it as a PDF. The saved copy lets you compare with your next check, once you have done the suggested tasks.",
    },
    {
      q: "How do I check a salon with several locations?",
      a: "When you have read the report for one salon, press “Check another salon” and enter the name and address of the next location. Each location gets its own report.",
    },
  ],
  related: ["website-salon", "bang-gia", "chia-se-link", "danh-gia-google"],
};

export default article;
