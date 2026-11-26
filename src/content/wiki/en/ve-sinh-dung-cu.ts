import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/ve-sinh-dung-cu/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "how-to-disinfect-nail-tools",
  lesson: "ve-sinh-dung-cu",
  category: "safety",
  title: "How to disinfect and sterilise nail, lash, hair and spa tools after every client",
  metaTitle: "How to disinfect nail tools: clean, disinfect, sterilise",
  metaDescription:
    "The routine for salon tools after every client: cleaning, disinfecting, sterilising and storage, which tool needs which level, and the shortcuts that fail.",
  keyword: "how to disinfect nail tools",
  keywords: ["how to sterilise nail tools", "disinfection vs sterilisation", "how to clean cuticle nippers", "autoclave for nail salon", "salon tool hygiene", "disinfecting hair salon tools"],
  excerpt: "Cleaning, disinfecting and sterilising are three different levels. This guide shows which tool needs which, and the routine to follow after every client.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-lam-dep-cam-tui-dung-cu-da-tiet-trung"),
    alt: "A beauty technician in a cream top stands at the tool-processing station holding a sterilisation pouch with cuticle nippers inside",
  },
  takeaways: [
    "There are three levels: **cleaning**, **disinfection** and **sterilisation**. A higher level never replaces the one before it.",
    "Always scrub first. Dirt left on a tool shields microbes and makes the next two steps useless.",
    "Tools that can pierce or cut the skin or touch broken skin (cuticle nippers, blades, needles, extractors, pedicure tools) must be **heat sterilised**.",
    "Single-use items such as paper files, wooden sticks and lash wands go in the bin after one client.",
    "A spray of alcohol and a wipe is not proper disinfection, and a soaking solution does not replace an autoclave.",
  ],
  intro: [
    "How to disinfect nail tools properly is something every technician deals with many times a day, and it is the first job that gets rushed when the salon is busy. The same goes for lash tweezers, hair scissors and spa extractors. However skilled you are, tools that are not clean can still give a client an infection.",
    "This article follows the lesson “Tools after every customer: the routine, step by step” from the Hygiene & safety course at VaraaAi Academy. You will learn to tell the three levels apart, know which tool needs which level, and have a fixed routine to follow after each client.",
  ],
  sections: [
    {
      id: "how-infections-spread",
      title: "How infections spread in a beauty salon",
      blocks: [
        { p: "Bacteria, fungi and viruses, including the hepatitis viruses, pass from one client to the next in three ways: through **tools**, through the **technician's hands** and through **surfaces** such as the table, hand rest, treatment bed and chair." },
        { p: "The risk is highest when a tool touches scratched or broken skin or a mucous membrane, such as the eye area during lash work. A small nick from cuticle nippers is enough to let germs in. That is why the level of processing each tool needs depends on where it touches the client." },
      ],
    },
    {
      id: "three-levels",
      title: "Cleaning, disinfection and sterilisation: what is the difference",
      blocks: [
        { p: "The three words are often used as if they meant the same thing. They do not." },
        {
          table: {
            head: ["Level", "What you do", "What it achieves"],
            rows: [
              ["1. Cleaning", "Scrub with water, soap and a brush", "Removes visible dirt. Required before both other levels"],
              ["2. Disinfection", "Fully submerge in an instrument disinfectant at the right strength, for the full time", "Brings microorganisms down to a safe level, but may not kill spores"],
              ["3. Sterilisation", "Heat, in an autoclave or a dry heat steriliser", "Kills all microorganisms, spores included"],
            ],
          },
        },
        { note: "A soaking solution sold as “sterilising” does not replace an autoclave or a dry heat steriliser.", kind: "warn", title: "Do not trust the label on the bottle" },
      ],
    },
    {
      id: "which-tool-which-level",
      title: "Which salon tools need which level",
      blocks: [
        { p: "An easy way to remember it: the more likely a tool is to break the skin, the higher the level it needs." },
        {
          table: {
            head: ["Tool group", "Examples", "Minimum after every client"],
            rows: [
              ["Touches the client, does not break the skin", "Combs, hair scissors, clippers, lash tweezers", "Clean and disinfect"],
              ["Can pierce or cut the skin, or touch broken skin", "Cuticle nippers, blades, needles, comedone extractors, pedicure tools", "Clean, then sterilise"],
              ["Single use", "Paper files, wooden sticks, lash wands, cotton swabs", "Bin them, never reuse"],
            ],
          },
        },
        { img: { src: img("phan-loai-dung-cu-ban-va-do-dung-mot-lan"), alt: "A steel tray holds used nippers, a cuticle pusher and scissors set apart, while a gloved hand drops a file and a wooden stick into the bin", caption: "The client has just stood up: single-use items into the bin, metal tools into the tray for used items." } },
      ],
    },
    {
      id: "hands-and-surfaces",
      title: "Hands and surfaces: the other two routes",
      blocks: [
        { p: "Clean tools in dirty hands achieve nothing. Before every client and before putting on gloves, wash your hands with soap, dry them and then disinfect them. Gloves only protect you for a short while, so change them often. With gloves on, do not touch your phone, door handles or the lamp; if you do, put on a fresh pair." },
        { p: "After every client, wipe down the table, hand rest, bed and chair, then disinfect the surfaces that touched the client's skin. Towels and paper liners are fresh for each person. This part has its own lesson: [Hand hygiene, gloves and protective wear](lesson:rua-tay-gang-tay)." },
      ],
    },
    {
      id: "by-trade",
      title: "Notes for hair, lash, pedicure and acrylic work",
      blocks: [
        {
          ul: [
            "**Hair salons:** a disposable neck strip under the cape. Combs, scissors and clippers are cleaned and disinfected after every client.",
            "**Lash extensions:** tweezers are cleaned and disinfected after every client. Lash wands and cotton swabs are used once.",
            "**Pedicures:** a disposable liner in the foot bath, and pedicure tools kept apart from manicure tools.",
            "**Acrylic nails:** dust extraction right at the table.",
          ],
        },
        { img: { src: img("giay-quan-co-dung-mot-lan-o-tiem-toc"), alt: "A male hairdresser wraps a white disposable neck strip around a client's neck before the cape, with a jar of soaking combs on the counter", caption: "In a hair salon, a disposable neck strip keeps the cape from touching the client's skin directly." } },
      ],
    },
    {
      id: "if-you-draw-blood",
      title: "If you accidentally make a client bleed",
      blocks: [
        {
          ol: [
            "Stop straight away.",
            "Put on fresh gloves.",
            "Clean, disinfect and cover the wound.",
            "Disinfect every surface with blood on it.",
            "Send that tool straight for processing; it is not used again until it has been cleaned and sterilised.",
          ],
        },
        { p: "If a client's skin or nails already show signs of infection, politely decline and advise them to see a doctor first. The lesson [When not to treat a customer](lesson:khi-nao-khong-lam) covers these cases in detail, and accidents in the salon are handled in [Incidents: bleeding, allergic reactions, burns](lesson:xu-ly-su-co)." },
      ],
    },
    {
      id: "local-rules",
      title: "Rules differ by country and city",
      blocks: [
        { p: "Every country and every city sets its own hygiene requirements for beauty businesses. In Finland, for example, most beauty premises offering skin treatments must notify the municipal health protection authority at least 30 days before opening and keep an in-house control plan. The examples in this article come from the City of Helsinki's guidance, which is listed as a source at the end of the article." },
        { p: "Before you open, ask the health authority where you work for the exact requirements on sterilising equipment, records and inspections." },
        { note: "Cleanliness is the best advertisement a salon can have. Once your routine is in place, mention it in the description on [your salon profile](lesson:ho-so-salon) so clients can read about it before they book.", kind: "tip", title: "Let clients see how careful you are" },
      ],
    },
  ],
  howTo: {
    title: "How to disinfect and sterilise tools after every client",
    id: "tool-routine",
    after: "which-tool-which-level",
    lead: "Follow this order for every reusable metal tool. The sterilisation steps are for the group of tools that can break the skin.",
    supplies: [
      "A separate tray for used tools",
      "Gloves, a brush and soap",
      "An instrument disinfectant and a lidded soaking container",
      "Sterilisation pouches with an indicator",
      "An autoclave or a dry heat steriliser",
      "A dry, clean, dust-free storage place",
    ],
    steps: [
      {
        name: "Sort as soon as the client gets up",
        text: "Single-use items go in the bin. Metal tools go into a separate tray for used items, never mixed with clean ones.",
      },
      {
        name: "Clean under running water",
        text: "Wearing gloves, open each tool fully and scrub it with a brush and soap under running water, paying attention to joints and grooves. Do it straight away, before the dirt dries on. Then rinse with clean water and dry thoroughly.",
        image: { src: img("cha-rua-kem-cat-da-bang-ban-chai-duoi-voi-nuoc"), alt: "A hand in a black glove scrubs fully opened cuticle nippers with a brush under running water", caption: "Open the nippers fully so the brush reaches the joint, where dirt collects." },
      },
      {
        name: "Disinfect for the full contact time",
        text: "Submerge the tools completely in a disinfectant made for instruments. Mix it at the right concentration and leave the tools in for the full time on the label, never less. Change the solution as the manufacturer instructs.",
        image: { src: img("ngam-dung-cu-trong-dung-dich-khu-khuan"), alt: "A clear plastic container of blue disinfectant with metal tools fully submerged, an hourglass standing beside it" },
      },
      {
        name: "Seal the tools in a pouch",
        text: "For tools that can pierce or cut the skin: put the clean, dry tools into a sterilisation pouch and seal it. A tool that is still wet or dirty does not go into a pouch.",
        image: { src: img("cho-dung-cu-vao-tui-tiet-trung"), alt: "A gloved hand slides dried cuticle nippers into a transparent sterilisation pouch" },
      },
      {
        name: "Run the autoclave or dry heat steriliser",
        text: "Place the pouches in the autoclave or dry heat steriliser and run the correct programme on the machine. The pouch usually carries an indicator strip that changes colour to show the cycle worked; if it has not changed, run the load again.",
        image: { src: img("noi-hap-tiet-trung-dung-cu-nail"), alt: "A mesh tray of tool pouches being placed into a sterilising autoclave on a stone countertop" },
      },
      {
        name: "Date the pouch and store it apart",
        text: "Write the date on the pouch and store it somewhere dry, clean and dust-free, separate from unsterilised items.",
      },
      {
        name: "Open the pouch in front of the client",
        text: "Only open the pouch as you begin, in front of the client. Seeing it opened puts clients at ease straight away.",
        image: { src: img("mo-tui-dung-cu-tiet-trung-truoc-mat-khach"), alt: "A nail technician tears open a sterilisation pouch in front of a female client seated at the manicure table" },
      },
      {
        name: "Wipe and disinfect the surfaces",
        text: "Wipe down the table, hand rest, bed and chair, and disinfect the surfaces that touched the client's skin. Lay out fresh towels and paper for the next person.",
      },
    ],
  },
  faq: [
    {
      q: "What is the difference between disinfection and sterilisation?",
      a: "Disinfection brings the number of microorganisms down to a safe level but may not kill spores. Sterilisation kills all microorganisms, spores included, and is done with heat in an autoclave or a dry heat steriliser. Both come after the tool has been scrubbed clean.",
    },
    {
      q: "Is spraying cuticle nippers with alcohol enough?",
      a: "No. A quick spray of alcohol and a wipe is not proper disinfection. Cuticle nippers can cut the skin, so they must be scrubbed clean, dried and then sterilised in an autoclave or a dry heat steriliser.",
    },
    {
      q: "Why do you have to wash tools before disinfecting them?",
      a: "Because dirt left on a tool shields microbes, so disinfection and sterilisation stop working. Wash tools straight after use, before the dirt has a chance to dry on.",
    },
    {
      q: "Can paper files and wooden sticks be disinfected and reused?",
      a: "No. They are single-use items that cannot be cleaned properly, so they go in the bin after one client.",
    },
    {
      q: "What if a small salon does not have an autoclave?",
      a: "Tools that can pierce or cut the skin still need heat sterilisation, in an autoclave or a dry heat steriliser; a soaking solution cannot replace it. Equipment requirements differ by country and city, so ask the health authority where you work.",
    },
    {
      q: "How should sterilised tool pouches be stored?",
      a: "Write the date on the pouch and keep it somewhere dry, clean and dust-free, apart from unsterilised items. Open the pouch only when you start working on the client.",
    },
  ],
  related: ["rua-tay-gang-tay", "ve-sinh-tiem", "khi-nao-khong-lam", "xu-ly-su-co"],
};

export default article;
