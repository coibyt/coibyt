import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/tien-ich-nhom/${name}.webp`;
const shot = (name: string) => `/wiki/tien-ich-nhom/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "salon-staff-training-team-chat-notices",
  lesson: "tien-ich-nhom",
  category: "salon",
  title: "Salon staff training: team chat, staff notices and a training library for the whole salon",
  metaTitle: "Salon staff training: team chat, notices and lessons",
  metaDescription:
    "How to use the VaraaAi Team hub with your salon team: team chat, notices staff confirm they have read, and required lessons where you see who finished.",
  keyword: "salon staff training",
  keywords: [
    "training new nail technicians",
    "salon team chat",
    "house rules notice for salon staff",
    "salon standard operating procedures",
    "read confirmation for staff notices",
    "internal communication in a salon",
    "required training for staff",
  ],
  excerpt: "One shared place for the owner and the team: group chat, official notices with read confirmation, and a training library staff open on their phones.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("doi-ngu-tho-lam-viec-trong-salon-toc-lon"),
    alt: "Several hairdressers stand working on clients along a row of chairs in a large salon with tall arched windows and chandeliers",
  },
  takeaways: [
    "The **“Team hub”** has three main parts: “Team chat”, “Notices” and “Training”.",
    "The **“Whole salon”** group already includes every member. Tap “New chat” to message one staff member privately.",
    "Notices have three priorities, **“Normal”, “Important” and “Urgent”**, and can be pinned to the top.",
    "Switch on **“Ask staff to confirm”** to see who has read a notice.",
    "A lesson can hold steps, a YouTube video link and attached files. Switch on **“Required”** to track who has completed it.",
  ],
  intro: [
    "In most salons, salon staff training happens by word of mouth: an experienced colleague shows the new one between two clients, and everyone remembers it slightly differently. Rota changes and new house rules travel the same way, so a salon with a bigger team easily ends up with everyone having heard a different version.",
    "This guide follows the VaraaAi Academy lesson “Team hub: chat, notices and staff training”. You will learn to use the salon's team chat, post an official notice and see who has read it, write a training lesson for the whole team and follow who has finished it.",
  ],
  sections: [
    {
      id: "why-one-place",
      title: "Why a salon with a growing team needs one place for internal communication",
      blocks: [
        { p: "A team of three or four can still talk face to face. Add more people, more shifts and part-timers, and there is never a moment when everyone is in the salon at once. The owner explains something in the morning and the afternoon shift never hears it. Someone who started last week does not know the rule agreed last month." },
        { p: "Many salons use a group on a personal messaging app. That works for a while, then three weaknesses show. Work messages get mixed up with private ones. An important announcement disappears under a few dozen messages. And nobody knows for sure whether a colleague has read it." },
        { p: "The VaraaAi “Team hub” is the whole team's shared workspace, separate from personal messages. It sorts information into three kinds, each with its own place: everyday conversation in “Team chat”, official news in “Notices”, and professional know-how in “Training”." },
        { img: { src: shot("team-hub-your-salons-workspace"), alt: "The Team hub overview with the Your salon's workspace card outlined in gold, showing the number of team members", caption: "The Team hub overview shows how many members the team has." } },
      ],
    },
    {
      id: "before-you-start",
      title: "What to prepare before bringing the whole team in",
      blocks: [
        { p: "The Team hub overview shows how many members your team has. If that number does not match the people in your salon, go through the guide to [adding staff and setting permissions](lesson:nhan-vien) first." },
        { p: "The most useful thing to do before you start is to agree on which kind of message goes where. The table below follows the way the lesson describes the three parts:" },
        {
          table: {
            head: ["Kind of information", "Where it goes", "Why"],
            rows: [
              ["Quick questions during the day, a photo of the look a client wants", "“Team chat”", "Needs an answer now, done once it is read"],
              ["Rotas, house rules, events", "“Notices”", "Official news from the owner that should stay in one place"],
              ["How to do a service, how to clean tools", "“Training”", "Used long term, and new staff still need to read it"],
            ],
          },
        },
        { note: "Make it clear to the whole salon from day one: anything posted in “Notices” counts as everyone having been told. That agreement is only fair if you really post every piece of official news there.", kind: "tip", title: "One agreement for the whole salon" },
      ],
    },
    {
      id: "team-chat",
      title: "Salon team chat: what to use it for",
      blocks: [
        { p: "“Team chat” already has the “Whole salon” group, which every member is in automatically. You do not need to invite anyone, and new team members are not left out. Type your message and tap send; you can send photos and videos too." },
        { p: "Photos and videos are what make the chat useful in a beauty salon. A technician shares the set of nails she has just finished. The receptionist shares the inspiration photo a client sent and asks who can do it. These exchanges need to be quick and do not need to be kept for long." },
        { p: "“New chat” opens a private conversation with one staff member. Use it for things that concern only one person, such as feedback about a shift or swapping shifts. Private feedback in private is a courtesy every salon needs." },
        { img: { src: shot("type-a-message-in-team-chat"), alt: "The team chat screen with the message box saying Don't forget: team meeting on Monday at 9 am outlined in gold, and the round send button on the right", caption: "Type your message and tap the send button on the right." } },
      ],
    },
    {
      id: "staff-notices",
      title: "Notices for staff: three priorities, pinning and read confirmation",
      blocks: [
        { p: "“Notices” is for official news from the owner: rotas, house rules, events. Unlike the chat, a notice has a title and a priority and stays on the notice board until you edit or delete it." },
        {
          table: {
            head: ["Priority", "Suggested use (examples)"],
            rows: [
              ["“Normal”", "Good to know but not urgent, such as a salon event next month"],
              ["“Important”", "Affects everyone's shifts, such as the holiday rota"],
              ["“Urgent”", "Must be known today, such as the salon closing unexpectedly"],
            ],
          },
        },
        { p: "The lesson only names the three priorities; the examples are this guide's suggestion. The thing to remember is to use “Urgent” sparingly. If there is an urgent notice every week, the word stops working." },
        { img: { src: shot("posted-notice-important-pinned"), alt: "The notice board with the notice Christmas week schedule outlined in gold, marked Important and Pinned, with its text about opening hours from 21 to 24 December", caption: "The sample notice in the video: the Christmas week schedule, marked “Important” and pinned to the top." } },
        { p: "Two switches below the priority decide how the notice is treated. “Pin to top” keeps it at the top of the board. “Ask staff to confirm” shows you who has read it: staff tap to confirm that they have read and understood, and you see who has. Switch it on for house rules and shift changes. It replaces the question you would otherwise ask each person: have you read it?" },
        { p: "You can also attach photos, videos and documents to a notice, such as the rota as a picture." },
      ],
    },
    {
      id: "training-library",
      title: "A training library for the salon: how to write a lesson for new staff",
      blocks: [
        { p: "“Training” is the salon's own library. Each lesson has a title, a topic, written steps and, if you like, a YouTube video link or attached files. Staff open it and learn on their phone at any time." },
        { img: { src: shot("training-library-lesson-card"), alt: "The training library with a lesson card Our gel manicure routine outlined in gold, showing the topic Service techniques and a length of 10 min", caption: "A saved lesson appears as a card in the library, with its topic and length." } },
        { p: "When you write a lesson, you choose a topic. The video shows these topics: Service techniques, Hygiene & safety, Customer care, Products, House rules, Sales and Other. The list is also a good reminder of what a salon should have lessons about." },
        { p: "A useful lesson is usually short and follows the order in which the hands actually work. A few suggestions:" },
        {
          ul: [
            "**One task per lesson.** The routine for one service is one lesson; how to clear the station after each client is another.",
            "**Write numbered steps**, one action each, the way you want every technician in your salon to do it.",
            "**Add the reason** to the steps people tend to skip. Someone who understands why takes fewer shortcuts.",
            "**Add a video when a movement is hard to describe.** Paste a YouTube link into the video field.",
          ],
        },
        { p: "You do not have to write everything from scratch. The craft lessons in [VaraaAi Academy](/academy) can serve as a frame for your salon's own routines, such as [how to do gel polish](lesson:son-gel) for technique and [disinfecting tools](lesson:ve-sinh-dung-cu) for hygiene. Adapt them to your salon's products and way of working." },
        { note: "Switch on “Required” for lessons every staff member must take, such as hygiene and safety. You can then track who has completed them. Do not switch it on for every lesson, because when everything is required, nothing has priority.", kind: "info", title: "Which lessons to make required" },
      ],
    },
    {
      id: "everyday-situations",
      title: "Common situations with the Team hub",
      blocks: [
        {
          table: {
            head: ["Situation", "What to do"],
            rows: [
              ["An important notice gets pushed down by newer ones", "Switch on “Pin to top” for that notice"],
              ["You are not sure who has read the new house rules", "Switch on “Ask staff to confirm” when you post"],
              ["You want to talk to one person privately", "Tap “New chat” in “Team chat”"],
              ["A new technician does not know the salon's routines yet", "Show them “Training” and switch on “Required” for the lessons to take first"],
              ["A movement is hard to explain in words", "Paste a YouTube video link into the lesson"],
            ],
          },
        },
        { p: "The three parts of the Team hub support other work in the salon too. When you start using [salon inventory](lesson:kho-hang), a short lesson on scanning in and scanning out helps everyone do it the same way. When you change how [staff report their income](lesson:doanh-thu-nhan-vien), a notice with read confirmation makes sure nobody can say they did not know." },
      ],
    },
  ],
  howTo: {
    title: "Steps to use chat, notices and salon staff training in VaraaAi",
    id: "team-hub-steps",
    after: "before-you-start",
    lead: "The seven steps go through the three parts of the Team hub in turn, in the order of the lesson video.",
    steps: [
      {
        name: "Open “Team hub”",
        text: "In the business dashboard, tap “Team hub”. The overview shows how many members your team has and the three main parts: “Team chat”, “Notices” and “Training”. Tap each part to open it.",
      },
      {
        name: "Open “Team chat” and the “Whole salon” group",
        text: "Tap “Team chat”. The “Whole salon” group already includes every member, so you do not need to create a group or invite anyone. Tap the group to open the conversation.",
        image: { src: shot("team-chat-whole-salon-new-chat"), alt: "The Team chat section with the Whole salon group outlined in gold, and the search box and New chat button above it" },
      },
      {
        name: "Type a message and tap send",
        text: "Type your message in the message box and tap send. You can send photos and videos too. To message one staff member privately, go back to the list and tap “New chat”.",
      },
      {
        name: "Tap “Write a notice” and enter the text",
        text: "In “Notices”, tap “Write a notice”. Enter a title and the message. Write a title that says what the notice is about, because many people read only the title first.",
        image: { src: shot("write-a-notice-title-and-message"), alt: "The Write a notice window with the title Christmas week schedule and its message outlined in gold, and the three priorities below" },
      },
      {
        name: "Choose the priority, pin, ask for confirmation, then tap “Post notice”",
        text: "Choose a priority: “Normal”, “Important” or “Urgent”. Switch on “Pin to top” if the notice should stay at the top of the board, and “Ask staff to confirm” if you need to know who has read it. Then tap “Post notice”.",
        image: { src: shot("pin-to-top-ask-staff-to-confirm"), alt: "The priorities Normal, Important and Urgent, with the Pin to top and Ask staff to confirm switches outlined in gold and the Post notice button below" },
      },
      {
        name: "Tap “Add a lesson”, give it a title and topic and write the steps",
        text: "In “Training”, tap “Add a lesson”. Give it a title, choose a topic, then write the steps or paste a YouTube link. Write them in the real order of work in your salon so a new technician can follow straight away.",
        image: { src: shot("add-a-lesson-topic-and-steps"), alt: "The new lesson form with the topics outlined in gold, the YouTube video field below and the first steps of a gel manicure routine" },
      },
      {
        name: "Switch on “Required” if needed, then tap “Save lesson”",
        text: "Switch on “Required” if every staff member must take this lesson; you can then track who has completed it. Tap “Save lesson”, and staff can open it and learn on their phone at any time.",
        image: { src: shot("required-lesson-visible-to-staff"), alt: "The Required switch outlined in gold with its note that every staff member must complete it, the Visible to staff switch, the length in minutes and the Save lesson button" },
      },
    ],
  },
  faq: [
    {
      q: "What are the parts of the VaraaAi Team hub?",
      a: "The three main parts are “Team chat”, “Notices” and “Training”. It is the salon's shared workspace for the owner and staff, where the team chats, receives notices and learns.",
    },
    {
      q: "How can I see which staff have read a notice?",
      a: "When writing the notice, switch on “Ask staff to confirm”. Staff confirm after reading it, and you see who has.",
    },
    {
      q: "Should rotas and house rules go in the team chat or in notices?",
      a: "In “Notices”. That part is for official news from the owner such as rotas, house rules and events. You can set a priority and pin the notice to the top so it does not get lost.",
    },
    {
      q: "What can a staff training lesson contain?",
      a: "Written steps, a YouTube video link and attached files. Staff open the lesson and learn on their phone at any time.",
    },
    {
      q: "How do I know who has finished a training lesson?",
      a: "Switch on “Required” when you write the lesson. It becomes a lesson every staff member must take, and you can track who has completed it.",
    },
    {
      q: "How do I message one staff member privately?",
      a: "In “Team chat”, tap “New chat” to open a private conversation with that person. The “Whole salon” group is for messages to every member.",
    },
  ],
  related: ["nhan-vien", "kho-hang", "chi-nhanh", "doanh-thu-nhan-vien"],
};

export default article;
