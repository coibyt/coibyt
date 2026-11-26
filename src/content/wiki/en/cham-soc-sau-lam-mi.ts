import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cham-soc-sau-lam-mi/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "lash-extension-and-lash-lift-aftercare",
  lesson: "cham-soc-sau-lam-mi",
  category: "tips",
  title: "Lash extension aftercare and lash lift aftercare: 3 rules for the first days so your lashes stay beautiful",
  metaTitle: "Lash extension aftercare: 3 rules for extensions and lifts",
  metaDescription:
    "Lash extension and lash lift aftercare: no rubbing, dry lashes and no sauna for 24 hours, refill after 2–3 weeks, new lift after 6–8, plus daily habits.",
  keyword: "lash extension aftercare",
  keywords: ["lash lift aftercare", "how long to keep lash extensions dry", "can you go in a sauna with lash extensions", "rubbing eyes with lash extensions", "how to sleep with lash extensions", "what not to do after lash extensions"],
  excerpt: "No rubbing, no water for the first 24 hours, and come back on time: three rules that keep extensions and a lash lift looking good, plus the daily habits worth keeping.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-soi-guong-ngam-mi-moi-lam-xong"),
    alt: "A blonde client in a cream chair smiles as she admires her lashes in a gold-rimmed hand mirror, the lash technician smiling behind her",
  },
  takeaways: [
    "**Do not rub your eyes or pull and pick at your lashes**: rubbing twists extensions and loosens them, taking natural lashes with them.",
    "**Keep your lashes dry for the first 24 hours**, with no steam and no sauna: lash glue and lifting solution need time to settle.",
    "Extensions need a **refill after 2–3 weeks**; a lash lift is redone after **6–8 weeks**, once new lashes have grown in.",
    "Every day: avoid oily products around the eyes, and wash and brush your lashes gently.",
    "Sleep on your back or lightly on your side, not face down in the pillow.",
  ],
  intro: [
    "Lash extension aftercare, and lash lift aftercare too, matters most in the first few days. That is when the glue and the lifting solution are still settling, and one rub of the eyes or an early sauna can undo the whole appointment you lay still for. The lesson sums it up in three rules: do not rub your eyes, keep them dry for 24 hours, and come back on time.",
    "This article follows the lesson “Lash after-care after extensions or a lift” from the Moja Beauty course at VaraaAi Academy, short videos for customers from the Moja Beauty salon in Helsinki. By the end you will know what to avoid on the first day, which habits keep your lashes looking good every day, and when to go back to the salon.",
  ],
  sections: [
    {
      id: "no-rubbing",
      title: "Rule 1: do not rub your eyes, pull or pick at your lashes",
      blocks: [
        { p: "Rubbing your eyes is the hardest habit to break and the one that harms lashes most. When you rub, the extensions get pushed out of place, twist together and come loose. Because each extension is attached to a natural lash, one that comes off usually takes the natural lash underneath with it." },
        { img: { src: img("thoi-quen-sai-keo-bung-mi-noi-truoc-guong"), alt: "An example of a bad habit: a blonde woman frowns into a mirror and tugs at the extensions at the outer corner of her eye with her fingers", caption: "A bad habit: pulling at extensions when they feel in the way." } },
        { p: "Pulling or picking is even worse. When a lash sticks out or catches, do not remove it yourself. Pulling an extension pulls the natural lash out of its follicle as well, and done repeatedly, the lashes grow back sparser and weaker. Leave it until your refill, or go to the salon sooner if it bothers you." },
        { note: "Do not use an eyelash curler on extensions, and avoid waterproof mascara. Both bend the extensions or pull on them when you remove the mascara.", kind: "tip", title: "Two small things people forget" },
      ],
    },
    {
      id: "first-24-hours",
      title: "Rule 2: keep your lashes dry for 24 hours, with no steam or sauna",
      blocks: [
        { p: "Lash glue and lash lift solution both need time to settle. In the first 24 hours, water, heat and steam interrupt that process, so the result does not last: extensions fall out early and a lift loses its curl. The first day is therefore a day for dry lashes." },
        {
          table: {
            head: ["In the first 24 hours", "What to do instead"],
            rows: [
              ["Washing your face", "Wash gently, keep water off the eye area"],
              ["Steam room, sauna", "Leave it until the next day"],
              ["Swimming", "Leave it until the next day"],
              ["Mascara", "No mascara on the first day"],
            ],
          },
        },
        { p: "The exact time can differ a little depending on the glue and lifting products the salon uses. If your technician tells you something different, follow their advice, because they know which product went on your lashes." },
        { img: { src: img("go-mieng-lot-nhe-nhang-khi-mat-van-nham"), alt: "A black-gloved finger gently lifts the white pad from under a client's closed eye, revealing a freshly finished, full black set of extensions" } },
      ],
    },
    {
      id: "come-back-on-time",
      title: "Rule 3: come back on time",
      blocks: [
        { p: "Natural lashes shed every day as part of their natural cycle, and the extensions go with them. After two to three weeks, the set starts to look sparse and uneven, and the remaining extensions have grown out with the natural lashes. That is the time for a refill." },
        { img: { src: img("bo-mi-noi-sau-ba-tuan-mi-thua-va-moc-dai"), alt: "Close-up of a client's closed eye with a set of extensions about three weeks old, a few grown out and the lash line starting to look sparse", caption: "A set after about three weeks: thinning, with a few grown-out extensions." } },
        { p: "A lash lift is different. The curl holds for about six to eight weeks, and you have a new lift once new lashes have grown in straight. Do not lift again sooner: lifting solution applied too often can leave the lashes dry and brittle." },
        {
          table: {
            head: ["Treatment", "Redo after"],
            rows: [
              ["Lash extensions", "Refill after 2–3 weeks"],
              ["Lash lift", "New lift after 6–8 weeks"],
            ],
          },
        },
        { p: "The easiest way is to book your next appointment before you leave the salon. Why an on-time refill is less work than starting again is explained in [why refill lashes and nails on time](lesson:dam-mi-mong-dung-hen)." },
      ],
    },
    {
      id: "daily-habits",
      title: "Daily habits that keep extensions looking good",
      blocks: [
        { p: "After the first 24 hours, extensions need to be kept clean, not kept away from water. Habits worth keeping:" },
        {
          ul: [
            "Wash your lashes gently with an oil-free lash foam, then brush them back into place. The steps are in [how to wash lash extensions at home](lesson:rua-mi-noi-tai-nha).",
            "Avoid oil-based make-up removers, creams and oils around the eyes, because oil softens the glue.",
            "Brush your lashes every day with a clean spoolie, from base to tip.",
            "Sleep on your back or lightly on your side. Face down in the pillow, the lashes get pressed, bent and shed more on one side.",
          ],
        },
        { img: { src: img("ngu-nam-ngua-tren-goi-lua-giu-mi-noi"), alt: "A blonde woman sleeps on her back on a champagne-coloured silk pillow, hands on her chest, her extensions resting freely without being pressed", caption: "Sleeping on your back keeps extensions from being bent." } },
        { p: "After a lash lift, the care is even simpler: once the first day is over, carry on as normal and just remember not to rub your eyes or pull at your lashes." },
        { img: { src: img("tho-chai-mi-sau-khi-uon-mi-xong"), alt: "A technician in black gloves gently brushes the freshly lifted natural lashes of a client lying with her eyes closed" } },
      ],
    },
    {
      id: "come-back-sooner",
      title: "When to go back to the salon sooner",
      blocks: [
        { p: "Sometimes you do not need to wait for your refill:" },
        {
          ul: [
            "A few extensions stick out, twist or feel scratchy.",
            "You are losing an unusual number of lashes in one spot.",
            "You want the extensions off: let the technician remove them with a professional remover, and do not pull them off yourself.",
          ],
        },
        { note: "Red, itchy, swollen or watering eyes after a lash treatment can be a sign of irritation or an allergic reaction. Tell the salon and see a doctor.", kind: "warn", title: "Signs to see a doctor" },
        { img: { src: img("tho-mi-hoi-tham-khach-quay-lai-tiem"), alt: "A lash technician with her hair in a bun leans down to check on and look at the eyes of a smiling blonde client sitting in a cream chair in the studio" } },
        { p: "You can read more about why correctly applied extensions do not harm your natural lashes in [do lash extensions damage natural lashes](lesson:noi-mi-co-hai-mi-that). Any questions about lash care, ask Moja Beauty; refills can be booked on VaraaAi on [Moja Beauty's page](/b/moja-beauty)." },
      ],
    },
  ],
  faq: [
    {
      q: "How long should I keep lash extensions dry?",
      a: "Keep your lashes dry for the first 24 hours: wash your face gently and keep water away from the eye area. After that you can wash your face as normal and clean your lashes with an oil-free lash foam.",
    },
    {
      q: "Can you go in a sauna with lash extensions?",
      a: "Not in the first 24 hours, because heat and steam stop the glue from settling. After the first day you can use the sauna as usual; just remember not to rub your eyes.",
    },
    {
      q: "What should you avoid after a lash lift?",
      a: "For the first 24 hours, do not get your lashes wet, avoid steam and the sauna, and do not rub your eyes. The lifting solution needs time to settle; if the lashes get wet too soon, the curl drops faster.",
    },
    {
      q: "What happens if I rub my eyes with lash extensions?",
      a: "Rubbing twists the extensions, loosens them and can take natural lashes with them. If you see an extension twisted or sticking out, do not pull it; brush it gently back into place or let the technician deal with it at your refill.",
    },
    {
      q: "How often should I get a lash refill or a new lash lift?",
      a: "Extensions need a refill after two to three weeks. A lash lift is redone after six to eight weeks, once new lashes have grown in.",
    },
    {
      q: "How should I sleep with lash extensions?",
      a: "On your back or lightly on your side. Face down in the pillow, the extensions get pressed and bent, so you tend to lose more of them on one side.",
    },
  ],
  related: ["rua-mi-noi-tai-nha", "dam-mi-mong-dung-hen", "noi-mi-vs-uon-mi", "mi-dam-thao-hieu-dung"],
};

export default article;
