import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/tin-nhan-ai/${name}.webp`;
const shot = (name: string) => `/wiki/tin-nhan-ai/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "ai-chatbot-for-salons-auto-reply-to-clients",
  lesson: "tin-nhan-ai",
  category: "salon",
  title: "AI chatbot for salons: one inbox for client messages, quick replies and an AI assistant while you're away",
  metaTitle: "AI chatbot for salons: inbox, quick replies, auto-reply",
  metaDescription:
    "How to use the VaraaAi inbox in a nail, hair or spa salon: filter unread messages, answer with quick replies, let the AI assistant reply and turn on alerts.",
  keyword: "AI chatbot for salons",
  keywords: [
    "salon AI assistant",
    "auto reply to client messages",
    "quick reply templates for salons",
    "reply to booking enquiries",
    "manage client messages in one inbox",
    "answer clients while you're busy",
    "chat box on a salon website",
  ],
  excerpt: "The inbox gathers client messages in one place. Quick replies answer in one tap, and the AI assistant replies from your services and products while you're busy.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("chu-tiem-va-khach-noi-chuyen-ben-quay"),
    alt: "A fair-haired man in a jumper smiles as he talks to a woman holding a phone at a wooden counter beside a tall window",
  },
  takeaways: [
    "The “Messages” page gathers every client message in one place, with the number of **unread** messages and those **waiting for you**.",
    "Five quick replies are ready: “Welcome”, “How to book”, “Available”, “Fully booked” and “Thank you”. You can edit them before sending and add your own.",
    "Tick **“Enable AI assistant”** and the AI replies to clients while you're away, based on **the salon's services and products**.",
    "Clients can still tap “Talk to the owner” at any time to reach a real person.",
    "Press “Enable notifications on this device” so you never miss a message.",
  ],
  intro: [
    "Salon owners look for an AI chatbot for salons for a very practical reason: when a client messages, your hands are holding a brush or a pair of scissors. A message nobody answers is a lost client. The VaraaAi inbox brings client messages into one place, has ready-made replies and an AI assistant that covers for you when you are busy.",
    "This guide follows the VaraaAi Academy lesson “Messages and the AI assistant”. You will learn to read the inbox numbers, answer a client yourself or with a quick reply, switch on the AI assistant and understand what it bases its answers on.",
  ],
  sections: [
    {
      id: "slow-replies-lose-clients",
      title: "Why slow replies cost a salon clients",
      blocks: [
        { p: "Someone who asks whether you have a free slot on Saturday afternoon is usually deciding right then. If the salon stays silent, they message the next one. And beauty work is among the hardest jobs to answer quickly from: a set of nails or lashes does not let you put your hands down and pick up the phone." },
        { img: { src: shot("reply-sent-to-customer"), alt: "A conversation with the client Nam, who asks about a free gel manicure slot on Saturday afternoon, and the reply Yes, we do! You can book 2 pm on Saturday outlined in gold", caption: "A typical question and its answer. The line at the top shows whether the AI assistant is off or on for the salon." } },
        { p: "There are three ways to shorten a client's wait, and the “Messages” page has all three. Messages sit in one place, so none get lost. Quick replies cut typing down to one tap. The AI assistant answers when you cannot." },
        { p: "To see what the client sees when they message the salon, read the guide to [messaging a salon](lesson:chat-voi-salon)." },
      ],
    },
    {
      id: "inbox-and-numbers",
      title: "Manage client messages in one salon inbox",
      blocks: [
        { p: "The top of the “Messages” page is a set of number tiles. One look tells you how much work the inbox needs today:" },
        {
          table: {
            head: ["Tile", "Meaning", "What to do"],
            rows: [
              ["“Conversations”", "The number of client conversations in the inbox", "An overview only"],
              ["“Unread messages”", "Messages you have not opened", "Read them first, even if you cannot answer straight away"],
              ["“Waiting for you”", "Messages where the client is waiting for your answer", "The number to bring down to zero first"],
              ["“AI replies (30 days)”", "How many replies the AI assistant sent in 30 days", "Shows how much work the assistant is taking off you"],
            ],
          },
        },
        { p: "Below are the search box “Search customers…” and the client list. The filters “Unread” and “Waiting” narrow the list to the conversations that need you. A good habit is to open “Waiting” in the gap between two clients and answer everyone in one go." },
      ],
    },
    {
      id: "quick-replies",
      title: "Quick reply templates: five ready-made and your own",
      blocks: [
        { p: "Most client messages revolve around the same few questions. That is why the “Quick replies” row sits just below the message box, with five ready-made answers:" },
        {
          table: {
            head: ["Quick reply", "Use it when"],
            rows: [
              ["“Welcome”", "Opening a conversation with a client who has just written"],
              ["“How to book”", "The client asks how to make a booking"],
              ["“Available”", "The client asks whether you have room, and you do"],
              ["“Fully booked”", "The time the client asked about is taken"],
              ["“Thank you”", "Closing the conversation"],
            ],
          },
        },
        { p: "Tap a quick reply and the text is filled in for you, and you can still edit it before sending. Make use of that: add a specific time or the name of the service so the client feels answered personally. In the lesson video the client is told there is room and offered 2 pm on Saturday." },
        { img: { src: shot("quick-replies-welcome-how-to-book"), alt: "The Quick replies row with Welcome and How to book outlined in gold just below the message box, where a reply about Saturday at 2 pm has been typed", caption: "The quick replies sit right under the message box." } },
        { p: "You can also create your own with “Add reply”. Make one for anything you notice yourself typing again and again. Common examples in a beauty salon: directions and parking, what to do before a lash appointment, and how the salon takes payment." },
        { note: "A good quick reply answers the question and points to the next step. After saying you have room, for example, invite the client to book through the salon's [booking link](lesson:chia-se-link) so the time is held straight away.", kind: "tip", title: "Answer with the next step" },
      ],
    },
    {
      id: "what-the-ai-uses",
      title: "What a salon AI assistant bases its answers on",
      blocks: [
        { p: "“Message settings” contains the section “AI assistant while you're away”. The text on the screen says two things. When it is on, the AI assistant automatically replies to clients using the salon's current services and products. And clients can tap “Talk to the owner” at any time to ask for you directly." },
        { img: { src: shot("ai-assistant-while-youre-away"), alt: "Message settings with the section AI assistant while you're away outlined in gold, its explanation text and the Enable AI assistant checkbox, and the notification setting below" } },
        { p: "The first point decides the quality of the answers. The AI assistant repeats what your salon page holds. A wrong price on the menu means a wrong price in the reply. A service you no longer offer that is still on the list will still be suggested. So before switching it on, check two places:" },
        {
          ul: [
            "**The service menu**: names, durations and prices that match reality. See the guide to the [salon service menu](lesson:dich-vu).",
            "**Products**, if you sell any: names, prices and whether they are in stock. See the guide to [selling products and managing orders](lesson:san-pham-don-hang).",
          ],
        },
        { p: "The second point keeps clients from getting stuck with a machine. Some questions only someone in the salon can answer, such as a special nail art request or a complaint. When a client taps “Talk to the owner”, you are notified so you can reply yourself." },
        { note: "The AI assistant covers for you while you are away; it does not replace you. Keep opening the inbox every day, read what the AI has answered and take over where a client needs a real person.", kind: "warn", title: "Someone still needs to read it" },
      ],
    },
    {
      id: "notifications-and-chat-box",
      title: "Turn on alerts and add a chat box to the salon's website",
      blocks: [
        { p: "Just below the AI section is “Alerts when a customer wants you directly”. Press “Enable notifications on this device” and the phone or tablet in your hand gets a push notification, in addition to email, when a client taps “Talk to the owner”. Notifications are switched on per device, so press the button on the device you carry with you." },
        { p: "The same settings page has an “Embed chat box” section. According to its description, it lets clients chat with you right from your own website, without needing an account, and the chat shows up in this inbox. The buttons that go with it include “View page” and “Copy link”, plus one to get the embed code. If the salon has no website of its own yet, see the guide to [a free salon website](lesson:website-salon)." },
      ],
    },
    {
      id: "everyday-situations",
      title: "Everyday situations when answering client messages",
      blocks: [
        {
          table: {
            head: ["Situation", "What to do"],
            rows: [
              ["A client asks if you have a free slot while you are working", "Tap “Available” or “Fully booked”, add a specific time and send"],
              ["Messages arrive outside working hours", "Switch on the AI assistant so clients get an answer about services and products straight away"],
              ["The AI gives a wrong price", "Correct the price in the service menu. The AI answers from the salon's current services and products"],
              ["A client wants to talk to a real person", "The client taps “Talk to the owner”. You are notified and reply yourself"],
              ["You keep missing messages", "Press “Enable notifications on this device” on the device you use every day"],
            ],
          },
        },
      ],
    },
  ],
  howTo: {
    title: "Steps to answer client messages and switch on the AI chatbot in VaraaAi",
    id: "reply-and-ai-steps",
    after: "inbox-and-numbers",
    lead: "The seven steps go from the inbox, through one conversation, to the settings, in the order of the lesson video.",
    steps: [
      {
        name: "Open “Messages”",
        text: "In the business dashboard, tap “Messages”. At the top you see the number of conversations, unread messages and messages waiting for you. Look at these first to know whether anyone is waiting.",
        image: { src: shot("inbox-conversations-unread-waiting-for-you"), alt: "The inbox number tiles outlined in gold: 1 conversation, 2 unread messages, 1 waiting for you and 0 AI replies in 30 days" },
      },
      {
        name: "Filter by “Unread” or “Waiting”",
        text: "Below the search box, tap “Unread” or “Waiting” so the list shows only the clients who need you. Once the inbox holds many conversations, the filters keep you from missing someone who is waiting.",
        image: { src: shot("filter-messages-unread-waiting"), alt: "The filter row All, Unread, Waiting and AI answering outlined in gold above the client list in the inbox" },
      },
      {
        name: "Tap a client to open the conversation",
        text: "Tap the client's name in the list. The conversation opens with the client's name at the top and the messages below. Read the whole question before you answer.",
        image: { src: shot("tap-customer-to-open-conversation"), alt: "The inbox list with the client Nam's row outlined in gold, showing the latest message about booking 2 pm on Saturday" },
      },
      {
        name: "Type your reply and press send",
        text: "Type your answer in the message box at the bottom of the screen, then press the send button on the right. Answer exactly what the client asked, and give a specific time if they asked about free slots.",
        image: { src: shot("type-reply-and-press-send"), alt: "The message box with the reply See you on Saturday at 2 pm and the round send button next to it outlined in gold" },
      },
      {
        name: "Use a quick reply to go faster",
        text: "Just below the message box are “Welcome”, “How to book”, “Available”, “Fully booked” and “Thank you”. Tap one, adjust it and send. Press “Add reply” to create your own for the things you type most often.",
      },
      {
        name: "Tick “Enable AI assistant”",
        text: "Scroll down to “Message settings” and tick “Enable AI assistant”. From then on the AI replies to clients while you are away, based on the salon's services and products. Clients can still tap “Talk to the owner” when they want you.",
        image: { src: shot("enable-ai-assistant-checkbox"), alt: "The Enable AI assistant checkbox outlined in gold under the section AI assistant while you're away in Message settings" },
      },
      {
        name: "Press “Enable notifications on this device”",
        text: "Just below, press “Enable notifications on this device”. The device then alerts you when a client wants to talk to you directly, so you do not miss messages even when the dashboard is closed.",
        image: { src: shot("enable-notifications-on-this-device"), alt: "The Enable notifications on this device button outlined in gold, with the Embed chat box section and the View page and Copy link buttons below" },
      },
    ],
  },
  faq: [
    {
      q: "What does the VaraaAi AI assistant base its replies on?",
      a: "It replies using the salon's current services and products. Keep service names, prices and products correct, because the AI repeats exactly what your salon page holds.",
    },
    {
      q: "With the AI assistant on, how does a client reach a real person?",
      a: "The client taps “Talk to the owner” at any time. You get a notification so you can answer yourself.",
    },
    {
      q: "How do I turn on automatic AI replies to client messages?",
      a: "Open “Messages”, scroll down to “Message settings” and tick “Enable AI assistant”. The AI then replies to clients while you are away.",
    },
    {
      q: "Can I edit a quick reply before sending it?",
      a: "Yes. The quick replies sit just below the message box, and you can edit the text before you send it. You can also press “Add reply” to create your own.",
    },
    {
      q: "What is the quickest way to answer “Do you have a free slot?”",
      a: "Tap the quick reply “Available” below the message box, add a specific time if needed and send. If that time is taken, use “Fully booked”.",
    },
    {
      q: "How do I make sure I never miss a client message?",
      a: "In “Message settings”, press “Enable notifications on this device” on the device you use every day. In the inbox, filter by “Unread” or “Waiting” to see straight away who is waiting.",
    },
  ],
  related: ["khach-hang", "danh-gia-google", "dich-vu", "chat-voi-salon"],
};

export default article;
