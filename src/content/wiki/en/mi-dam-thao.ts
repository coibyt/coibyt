import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mi-dam-thao/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "how-to-remove-lash-extensions-and-refill",
  lesson: "mi-dam-thao",
  category: "lash",
  title: "How to remove lash extensions and do a refill in the salon: 12 steps without pulling a single lash",
  metaTitle: "How to remove lash extensions and do a refill: 12 steps",
  metaDescription:
    "Lash refill and removal step by step: check every lash, dab cream remover on the bond, slide the extension off, refill to the map, remove a full set and cleanse.",
  keyword: "how to remove lash extensions",
  keywords: [
    "how to do a lash refill",
    "lash refill steps",
    "removing lash extensions with cream remover",
    "how to use lash remover",
    "removing grown-out lash extensions",
    "professional lash extension removal",
    "remove lash extensions without losing natural lashes",
  ],
  excerpt: "A refill means removing the right extensions and adding the right ones. A removal means remover in the right place, the right waiting time and a gentle glide. Twelve steps for both.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-mi-dam-mi-cho-khach-trong-studio"),
    alt: "A lash technician with a high bun sits at the head of the bed holding tweezers, working on a client lying under a cream blanket in a studio with purple velvet curtains",
  },
  takeaways: [
    "Two things hold throughout: the client's eyes stay closed, and **an extension is never pulled**.",
    "At a refill, put only **a dot of cream remover on the bond** of the extension you are removing, with a single-use micro-brush, never on the lid skin or the roots.",
    "If an extension will not slide off, the bond is not soft yet: add a little more, wait longer and try again.",
    "For a full removal, lay a thin line of cream along the bonds, **wait the time the maker gives**, then glide gently from base to tip.",
    "If the client shows signs of a reaction, do not refill: remove the whole set very gently and advise her to see a doctor.",
  ],
  intro: [
    "How to remove lash extensions properly comes down to three things: put the remover in exactly the right place, wait long enough, and let the extension slide off on its own. No step needs any pulling. A lash refill uses the very same moves, except that you remove single grown-out extensions instead of the whole set, then add new ones.",
    "This article follows the VaraaAi Academy lesson “Refills and removal: step by step” in the Lashes course. Part one is seven steps for refilling a client who comes back after a few weeks; part two is five steps for removing a full set safely. Watch the video below to see how the brush and tweezers are held, then read each step again.",
  ],
  sections: [
    {
      id: "before-refill-or-removal",
      title: "Before a lash refill or removal",
      blocks: [
        { p: "Both jobs are done on a lash line full of glue, right next to the eye. So two things stay the same from start to finish: the client's eyes stay closed, and you never pull an extension. The glue holds the extension on the natural lash, so pulling the extension pulls the natural lash out of the follicle with it." },
        { p: "Why clients need a refill after 2–3 weeks, and why oil is no substitute for remover, is covered in [how often do you need lash refills](lesson:mi-dam-thao-hieu-dung). This article goes straight to the hands." },
        {
          table: {
            head: ["What you see when the client arrives", "What to do"],
            rows: [
              ["Healthy eyes, a thinner set, a few grown-out lashes", "Refill: remove what needs removing, add new extensions"],
              ["Red, itchy or swollen eyes after last time, or signs of a reaction now", "No refill. Remove the whole set very gently and advise her to see a doctor"],
              ["The set is too messy, every lash crooked", "Stop, be honest with the client and suggest removing everything and starting a new set"],
            ],
          },
        },
        { note: "Remover type, amount and waiting time always follow the maker's instructions. Rules on beauty services and products differ from country to country. This is a training aid, not a licence.", kind: "info", title: "Note" },
      ],
    },
    {
      id: "using-cream-remover",
      title: "How to use lash remover: right place, right amount, right time",
      blocks: [
        {
          table: {
            head: ["Job", "Where it goes", "How much"],
            rows: [
              ["Removing one extension at a refill", "Exactly on that extension's bond", "A small dot on the tip of a single-use micro-brush"],
              ["Removing a full set", "Along the bonds, a little away from the roots, inner to outer corner", "A thin line; excess runs towards the eye"],
            ],
          },
        },
        { p: "In both cases the remover stays on the lashes only. It never touches the lid skin or the waterline. When removing single extensions at a refill, it also stays off the roots and the neat extensions next to it, so those stay where they are." },
        { note: "Do not rush. Glide before the maker's waiting time is up and the bond is not soft yet, so you pull out the natural lash. While you wait, stay with the client; do not walk away.", kind: "tip", title: "Wait the full time" },
      ],
    },
    {
      id: "common-mistakes",
      title: "Common mistakes in lash refills and removal",
      blocks: [
        {
          table: {
            head: ["Mistake", "Result", "Do this instead"],
            rows: [
              ["Gliding or sliding before the bond is soft", "The natural lash is pulled out of the follicle", "Add a little more, wait longer, try again"],
              ["Too much remover", "It runs towards the eye", "A thin line, on the lashes only"],
              ["Leaving remover on the natural lash after removing an extension", "The new extension bonds poorly", "Wipe it off before applying a new one"],
              ["Applying to a baby lash that is still too short and fine", "The baby lash carries more than it can", "Leave it for the next refill"],
              ["Going longer or thicker than last time because the client wants more drama", "The natural lashes are overloaded", "The extension always matches what the natural lash can carry"],
              ["Remover left on the lashes after a full removal", "It can irritate", "Wash thoroughly with lash shampoo, rinse with clean water, dry"],
            ],
          },
        },
      ],
    },
    {
      id: "client-feels-stinging",
      title: "What to do if the client feels stinging during removal",
      blocks: [
        { p: "Before applying any remover, tell the client one thing: if anything stings or burns, say so at once. Remover must not get into the eye, and stinging is the signal to stop. Do not speed up to finish, and do not ask her to open her eyes to check. Stop, wipe off the remover and act as in [Incidents](lesson:xu-ly-su-co)." },
        { p: "When a set is removed because of a reaction, the skin around the eyes is sensitive. Work very gently and slowly, and add no product that is not needed. Afterwards, advise her to see a doctor and note it in her profile. The signs of a glue allergy are in [Allergies and chemicals](lesson:di-ung-hoa-chat)." },
        { p: "Under-eye pads are still needed for a full removal. Here they also protect the skin and the lower lashes from the remover, so apply them carefully." },
      ],
    },
    {
      id: "record-and-book",
      title: "After the appointment: clean up, record and book the refill",
      blocks: [
        { p: "Used swabs, micro-brushes and pads go into a lidded bin. Tweezers are cleaned and disinfected as in [Tools after every customer](lesson:ve-sinh-dung-cu)." },
        { img: { src: img("bo-do-dung-mot-lan-vao-thung-co-nap"), alt: "A black-gloved hand drops single-use items into a white lidded bin on a stone table, with a client resting on the bed in the background", caption: "Single-use items go straight into a lidded bin after every client." } },
        { p: "Book the next refill while the client is still there, usually after 2–3 weeks. Then write four things in the internal notes of the [client's profile](lesson:khach-hang) in VaraaAi: how the lashes held, how many extensions you removed, the cause of any loss, and what you advised. Next time, whoever does the refill knows what to watch for." },
        { note: "Open the lash map in the client's internal notes before the refill, and update the notes when you finish. A refill done to the same map looks as even as the first set.", kind: "tip", title: "The lash map lives in the client's profile" },
        { p: "If the salon takes bookings through VaraaAi, create the refill [appointment](lesson:lich-hen) right at the desk, and keep “Lash refill” and “Lash removal” as two separate items in your [services](lesson:dich-vu), so clients book the job they actually need." },
      ],
    },
  ],
  howTo: {
    title: "How to do a lash refill and remove lash extensions, step by step",
    id: "lash-refill-removal-steps",
    after: "before-refill-or-removal",
    lead: "Steps 1 to 7 are a refill. Steps 8 to 12 remove a full set.",
    supplies: [
      "Lash remover, used as the maker says (the lesson uses a cream)",
      "Single-use micro-brushes and cotton swabs",
      "Lash shampoo, a soft brush and clean water",
      "Under-eye pads",
      "Straight tweezers and application tweezers",
      "Extensions and glue matching the client's recorded map (for a refill)",
      "Single-use lash wands",
    ],
    steps: [
      {
        name: "Refill: check in and look at the eyes",
        text: "The client sits with her eyes open. Ask whether her eyes were red, itchy or swollen after last time, how many lashes fell and whether anything bothered her. Look at the eyes in good light. Any sign of a reaction means no refill: switch to a full removal.",
        image: { src: img("nhin-mat-khach-duoi-anh-sang-truoc-khi-dam-mi"), alt: "A lash technician in black gloves holds a magnifier and looks at the open eye of a seated client under a bright ring light in the studio" },
      },
      {
        name: "Cleanse the lashes and apply the pads",
        text: "The client lies down with her eyes closed. Wash both the extensions and the natural lashes with lash shampoo and a soft brush, because after a few weeks oil and dust have built up at the base. Rinse with clean water, dry thoroughly, then apply pads that cover every lower lash without touching the waterline, as in [preparing for lash extensions](lesson:mi-chuan-bi).",
      },
      {
        name: "Inspect every lash",
        text: "Brush through, then glide the straight tweezers lightly over the lash line and look at each lash in turn. Look for grown-out extensions, with the bond far from the lid or the extension turned sideways or sticking out. Look for stickies and loose ones too. Those come off; neat ones stay.",
        image: { src: img("kiem-tra-tung-soi-mi-noi-bang-nhip-thang"), alt: "The tip of straight tweezers in a black-gloved hand lifts a grown-out extension sticking out at the outer corner of a client's closed eye" },
      },
      {
        name: "Dab remover on the bond only",
        text: "Take a little cream remover on the tip of a single-use micro-brush. Dab it only on the bond of the extension you are removing, never on the lid skin or the roots. Wait the time the maker gives for the bond to soften.",
        image: { src: img("cham-kem-thao-vao-moi-keo-cua-mot-soi-mi"), alt: "A small cotton-tipped brush in a black-gloved hand dabs a little pink cream remover onto one lash extension, the client's eye closed above a white pad" },
      },
      {
        name: "Slide the extension off, never pull",
        text: "One pair of tweezers holds the natural lash steady while the other slides the extension gently towards the tip and off. If it will not slide, the bond is not soft yet: add a little more, wait longer and try again. Then wipe the remaining remover off the natural lash so the new extension bonds well.",
        image: { src: img("truot-soi-mi-noi-ra-bang-hai-nhip"), alt: "Two pairs of tweezers in black-gloved hands, one holding the natural lash and the other sliding an extension coated in pink remover towards the tip" },
      },
      {
        name: "Refill to the recorded map",
        text: "On the natural lashes you have just freed and on baby lashes that have grown long enough, isolate one lash at a time and apply as in the [classic](lesson:mi-classic) or [volume](lesson:mi-volume) lesson, following the map in the client's profile. Leave baby lashes that are still too short and fine for next time. Never go longer or thicker than last time just because the client wants more drama.",
      },
      {
        name: "Check for stickies and finish",
        text: "After each zone, glide the tweezers from base to tip: every lash must stand on its own. Brush again, compare both eyes and remove the pads while her eyes are still closed. Book the next refill and record the appointment in her profile.",
      },
      {
        name: "Removal: apply the pads and brief the client",
        text: "Apply the pads carefully so they cover every lower lash; now they also protect the skin and lower lashes from the remover. The client's eyes stay closed. Ask her to say at once if anything stings or burns.",
      },
      {
        name: "Lay a thin line of cream along the bonds",
        text: "With a micro-brush, lay a thin line of cream remover along the bonds, a little away from the roots, from the inner to the outer corner. The cream stays on the lashes only, off the lid skin and the waterline, with no excess. Wait the maker's time and stay with the client.",
        image: { src: img("boi-kem-thao-mi-doc-moi-keo"), alt: "A micro-brush in a black-gloved hand draws a thin line of pink cream remover along the lash extensions of a client with her eyes closed and a pad under the eye" },
      },
      {
        name: "Glide gently from base to tip",
        text: "With a cotton swab or a clean micro-brush, glide gently along the lashes from base to tip. The extensions slide off and drop onto the pad. Use a clean side or a fresh swab for each stroke. If any still hold, add more cream and wait; never pull.",
        image: { src: img("vuot-mi-noi-tu-chan-ra-ngon-bang-que-bong"), alt: "A cotton swab in a black-gloved hand glides along the lashes of a client with her eyes closed, a few removed extensions lying on the white pad" },
      },
      {
        name: "Wash off the remover",
        text: "Remover left on the lashes can irritate. Wash the lashes thoroughly with lash shampoo, brushing from base to tip, then rinse with clean water and dry.",
        image: { src: img("rua-sach-kem-thao-mi-bang-bot-rua-mi"), alt: "A soft brush covered in lash shampoo foam in a black-gloved hand brushes the lashes of a client with her eyes closed, the white pad still under the eye" },
      },
      {
        name: "Check the natural lashes and give aftercare",
        text: "Check for any extension or glue left behind and any broken or thin areas, and ask whether anything stings or burns. Remove the pads gently and let her open her eyes slowly. Tell her beforehand that natural lashes often look sparser after removal than she remembers, which is normal. Advise no rubbing, oil-free products and gentle brushing.",
        image: { src: img("mi-that-sau-khi-thao-het-mi-noi"), alt: "Close-up of a closed eye after all extensions have been removed, the natural lashes short and fine, a few removed extensions lying on the white pad" },
      },
    ],
  },
  faq: [
    {
      q: "What do you use to remove lash extensions?",
      a: "A professional lash remover; the lesson uses a cream because it stays where you put it. The remover softens the glue, and the extensions are then glided or slid off the natural lashes. Product type, amount and waiting time always follow the maker's instructions.",
    },
    {
      q: "How long do you leave lash remover on before removing the extensions?",
      a: "Exactly as long as the product maker says, which differs from product to product. Gliding before the bond is soft pulls out the natural lash. If an extension still will not slide off, add a little more remover, wait longer and try again.",
    },
    {
      q: "Do you remove all the old extensions at a refill?",
      a: "No. At a refill the technician removes only grown-out extensions, stickies and loose ones, with a dot of remover on each one's bond. Neat extensions still close to the lid stay. The whole set only comes off when it has become too messy or the client has a reaction.",
    },
    {
      q: "What if a lash extension will not slide off?",
      a: "It means the bond is not soft yet. Add a little more remover, wait longer and try again. Never pull harder, because pulling now pulls the natural lash out of the follicle.",
    },
    {
      q: "What do you do if the client's eyes sting during lash removal?",
      a: "Stop at once, wipe off the remover and follow the Incidents lesson. Remover must not get into the eye, so the client's eyes stay closed throughout and she should be told beforehand to say at once if anything stings or burns.",
    },
    {
      q: "Why use under-eye pads for a full lash removal?",
      a: "The pads cover the lower lashes and the skin under the eye, keeping the remover off the skin, the lower lashes and the eye. The extensions that slide off also land on the pad instead of on the client's face.",
    },
  ],
  related: ["mi-dam-thao-hieu-dung", "mi-classic", "mi-chuan-bi", "xu-ly-su-co"],
};

export default article;
