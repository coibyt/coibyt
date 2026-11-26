import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/chat-voi-salon/${name}.webp`;
const shot = (name: string) => `/wiki/chat-voi-salon/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "message-a-salon-online",
  lesson: "chat-voi-salon",
  category: "booking",
  title: "How to message a salon online on VaraaAi: ask about prices and free times without phoning",
  metaTitle: "Message a salon online: ask prices and free times | VaraaAi",
  metaDescription:
    "How to message a salon on VaraaAi: press Chat with salon, type your question, attach a photo of the look you want, read the reply and find every chat in Inbox.",
  keyword: "message a salon online",
  keywords: [
    "chat with a salon",
    "ask a nail salon for a price",
    "does the salon have a free slot",
    "send a nail design photo to a salon",
    "find old messages with a salon",
    "VaraaAi Inbox",
  ],
  excerpt: "Press “Chat with salon” on the salon's page to ask about prices or free times, attach a photo of the look you want, and find the replies in “Inbox”.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-nhan-tin-cho-salon-lam-dep-tren-dien-thoai"),
    alt: "A young woman with long wavy hair in a cream jumper sits on a sofa by the window, smiling as she types on her phone",
  },
  takeaways: [
    "The **“Chat with salon”** button is on every salon's page, right next to “Book now”.",
    "Type your question in “Type a message...” and press send. The salon replies in the same chat window.",
    "You can **attach a photo**, for example a nail design you like, so the salon can advise and quote more precisely.",
    "Every conversation is kept in **“Inbox”**: tap your name at the top to open it.",
    "The chat is for questions. To hold a place, you still press “Book now” and pick a time as usual.",
  ],
  intro: [
    "Many questions before a beauty appointment are not worth a phone call: is there a free slot on Saturday afternoon, what does this nail design cost, do I need my old gel removed first. On VaraaAi you can message a salon online right on its page, attach a photo of the look you want, and read the answer when it suits you.",
    "This guide follows the VaraaAi Academy lesson “Chat with the salon”. You will learn where the chat button is, how to write a message the salon can answer straight away, and where to find your old conversations in “Inbox”.",
  ],
  sections: [
    {
      id: "when-to-message",
      title: "When to message a salon instead of calling",
      blocks: [
        { p: "Phoning has two drawbacks. A technician busy with a client cannot easily pick up, and you cannot show the look you want with your voice. A message solves both: the salon answers when its hands are free, and one picture says more than several sentences." },
        { p: "The lesson names the things customers message about most:" },
        {
          ul: [
            "**Free times:** whether the salon can take you on the day and at the time you have in mind.",
            "**Prices:** what a particular design, haircut or treatment costs.",
            "**Notes before your visit:** anything you want the salon to know ahead of the appointment.",
          ],
        },
        { note: "Sign in before you start. “Inbox”, where conversations are kept, is part of your account. If you have no account yet, see [create an account and sign in](lesson:tai-khoan); it takes about a minute and is free.", kind: "info", title: "Before you start" },
      ],
    },
    {
      id: "how-to-write",
      title: "How to write a message the salon can answer straight away",
      blocks: [
        { p: "A message like “how much is this?” without a picture usually brings three or four questions back from the salon. You save time on both sides by putting the key details in your first message." },
        {
          table: {
            head: ["You want to ask", "Include"],
            rows: [
              ["Whether there is a free time", "The service, the day and roughly when you can come"],
              ["The price of a nail design", "A photo of the design, and your current nails: natural, or with old gel or acrylic to remove"],
              ["The price of a cut or a colour", "A photo of the style you like and of your hair now, and whether it has been bleached or coloured before"],
              ["Lash extensions or a lash lift", "A photo of the look you like, and whether you still have old extensions"],
              ["Notes before your visit", "What the salon should know: sensitive skin or eyes, coming with a small child, needing to finish by a certain time"],
            ],
          },
        },
        { note: "Attaching a picture of the look you want is the lesson's main tip. Two people can picture very different things behind the same name, such as “cat-eye nails” or “layered hair”, but a photo can only be read one way. With a picture, the salon advises and quotes more precisely.", kind: "tip", title: "One photo instead of many words" },
      ],
    },
    {
      id: "inbox",
      title: "Inbox: where your messages with salons are kept",
      blocks: [
        { p: "You do not need to go back to each salon's page to find an answer. Tap your name at the top and choose “Inbox”: every conversation with every salon is there, one row per salon, with the latest message." },
        { img: { src: shot("inbox-conversations-with-salons"), alt: "The Inbox page on VaraaAi with the Lumi Beauty Paris conversation highlighted in gold and its latest message about booking 2 pm on Saturday", caption: "Each salon you have messaged is one row in “Inbox”." } },
        { p: "Inbox is most useful on the day of your visit. Open the conversation again and you have the price the salon quoted, the time it suggested and the photo you sent, ready to show the technician." },
      ],
    },
    {
      id: "chat-note-or-call",
      title: "Chat, a booking note or a phone call: which to use",
      blocks: [
        {
          table: {
            head: ["Situation", "Best way"],
            rows: [
              ["Not sure yet whether to book; you want to ask about price or times first", "Press “Chat with salon” on the salon's page"],
              ["You have chosen the service and time and just want to add a line", "Write it in “Note for the salon (optional)” on the details step of the booking"],
              ["You want the salon to see a design before quoting", "Chat and attach a photo"],
              ["Something urgent on the day, such as running late", "Call the number on the salon's page or in “View booking details”"],
              ["The self-cancellation deadline has passed and you need to cancel or move", "Contact the salon directly, by phone or by message"],
            ],
          },
        },
        { p: "How quickly a salon replies depends on the salon and on how busy it is. For anything measured in minutes, the phone is still the safer choice." },
      ],
    },
    {
      id: "after-the-reply",
      title: "After the salon replies",
      blocks: [
        { p: "A message does not hold a place for you. When the salon says it has a free time, close the chat and press “Book now” right beside it to choose the service, staff member, date and time, as in the guide to [booking a salon appointment online](lesson:dat-lich-online). Your booking then appears in [My bookings](lesson:lich-hen-cua-toi), where you can check it or cancel it yourself." },
        { p: "If this is a salon you plan to go back to, [follow the salon](lesson:theo-doi-salon) so its offers and new looks show up in your feed." },
        { note: "Salons answer customers in the messages section of their dashboard, with saved replies and an AI assistant that can reply while they are away. See the lesson [Messages and the AI assistant](lesson:tin-nhan-ai).", kind: "info", title: "Own a salon?" },
      ],
    },
  ],
  howTo: {
    title: "Steps to message a salon on VaraaAi",
    id: "message-steps",
    after: "when-to-message",
    lead: "Six steps, of which attaching a photo is optional. Button names in quotation marks are what you see on the screen.",
    steps: [
      {
        name: "Open the salon's page and press “Chat with salon”",
        text: "Find the salon on the [search page](/search) and open its page. Below the salon's name, address and phone number is a row of buttons: “Chat with salon” sits right next to “Book now”. Press it and the chat window opens.",
        image: { src: shot("chat-with-salon-button-next-to-book-now"), alt: "The Lumi Beauty Paris salon page on VaraaAi with the Chat with salon button highlighted in gold next to the black Book now button" },
      },
      {
        name: "Type your question in “Type a message...”",
        text: "Write your question as precisely as you can: which service, which day, roughly what time. In the lesson video, the customer asks whether there is a free slot for a gel manicure on Saturday afternoon.",
        image: { src: shot("type-your-question-in-message-box"), alt: "The chat window on a salon page with the message box highlighted in gold and a question about booking a lash lift being typed" },
      },
      {
        name: "Attach a photo if it helps",
        text: "The attach-photo button is to the left of the message box. Use it to send a nail design, hairstyle or lash look you like. With a picture, the salon quotes more accurately and you do not have to describe it in words.",
        image: { src: shot("attach-photo-button-chat"), alt: "The chat window with the paper-clip attach button highlighted in gold to the left of the message box" },
      },
      {
        name: "Press send",
        text: "The send button is the round button with an arrow, to the right of the message box. Press it once and your message appears in the chat.",
        image: { src: shot("press-send-message-to-salon"), alt: "The chat window on VaraaAi with the round send button with an arrow highlighted in gold to the right of the message box" },
      },
      {
        name: "Read the salon's reply",
        text: "When the salon answers, the reply appears straight away in the chat, below your message. If the answer leaves something open, simply ask again in the same window.",
        image: { src: shot("salon-reply-in-chat-window"), alt: "The chat with Lumi Beauty Paris, with the reply saying the customer can book 2 pm on Saturday highlighted in gold" },
      },
      {
        name: "Find it again in “Inbox”",
        text: "To read it later, tap your name at the top of the page and choose “Inbox”. Press the salon's row to open the whole conversation again.",
        image: { src: shot("open-inbox-page"), alt: "The Inbox page on VaraaAi with the Inbox heading highlighted in gold and the conversation list below it" },
      },
    ],
  },
  faq: [
    {
      q: "Where is the “Chat with salon” button?",
      a: "On each salon's page on VaraaAi, right next to the “Book now” button. Every salon has its own chat button, so open the page of the salon you want to ask and press it there.",
    },
    {
      q: "Does it cost anything to message a salon on VaraaAi?",
      a: "No. VaraaAi is free for customers, including searching for salons, booking and messaging salons.",
    },
    {
      q: "Can I send the salon a photo of the look I want?",
      a: "Yes. To the left of the “Type a message...” box is a button for attaching a photo. Sending a picture of a nail design, hairstyle or lash look helps the salon advise and quote more precisely.",
    },
    {
      q: "Where can I see my old messages with a salon?",
      a: "Tap your name at the top of the page and choose “Inbox”. All your conversations with salons are there.",
    },
    {
      q: "If I asked about a free time by message, do I still need to book?",
      a: "Yes. Messages are only for asking and agreeing details. To hold a place, press “Book now” on the salon's page, choose the service and a free date and time, and confirm.",
    },
    {
      q: "Where do I see the salon's answer?",
      a: "The reply appears right in the chat window you have open. If you have left the page, open “Inbox” in your account to read it.",
    },
  ],
  related: ["lich-hen-cua-toi", "viet-danh-gia", "dat-lich-online", "theo-doi-salon"],
};

export default article;
