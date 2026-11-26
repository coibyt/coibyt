import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mi-mong-mua-dong/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "winter-nail-care-and-lash-care",
  lesson: "mi-mong-mua-dong",
  category: "tips",
  title: "Winter nail care and lash care: 4 habits against dry, brittle nails and lashes",
  metaTitle: "Winter nail care: stop dry, brittle nails and lashes",
  metaDescription:
    "Winter nail care and lash care: cuticle oil every evening, gloves outdoors, hand cream after washing, no hot air near the eyes, and humidity in heated rooms.",
  keyword: "winter nail care",
  keywords: [
    "dry brittle nails in winter",
    "lash care in winter",
    "hangnails in winter",
    "when to use cuticle oil",
    "humidifier for skin and lashes",
    "dry lashes in cold weather",
  ],
  excerpt: "Cold outside, dry heating inside: nails break, the skin around them splits and lashes go brittle. Four simple habits for the whole cold season.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-mac-ao-khoac-mua-dong-tai-quay-salon-helsinki"),
    alt: "A blonde woman in a cream suit holding a notebook talks with a client in a wool coat and scarf at a stone reception desk in a bright salon",
  },
  takeaways: [
    "**Every evening**, rub oil into the cuticles and the nail surface: the skin stays soft, with fewer hangnails, and the nail is more flexible and breaks less.",
    "**Out in the cold**, always wear gloves; **after every hand wash**, apply a thin layer of hand cream straight away.",
    "**Lashes** also get drier and more brittle from the cold and the heating: brush them every day, keep hot air away from your eyes and do not stay in the sauna too long.",
    "**Indoors with the heating on**, a small humidifier helps a lot.",
    "**Drink enough water**, so your skin, nails and lashes all dry out less.",
  ],
  intro: [
    "Winter nail care is something many people only think about once a nail has broken and the skin around it has split and started to sting. Where winters are long, as in Finland, the air is both cold and dry. Outside there is icy wind, and inside the heating dries the air even more. Nails lose their flexibility and break easily, and lashes, both natural lashes and extensions, turn brittle too.",
    "This article follows the lesson “Keep lashes and nails from drying out in winter” from the Moja Beauty course at VaraaAi Academy, short customer videos from the Moja Beauty salon in Helsinki. The lesson comes down to four habits: cuticle oil, gloves, lash care away from heat, and humidity indoors. By the end you will know what to do every day and why each habit helps.",
  ],
  sections: [
    {
      id: "why-nails-break-in-winter",
      title: "Why nails get dry and brittle in winter",
      blocks: [
        { p: "Nails and the skin around them need a little moisture to stay flexible. When the air is cold and dry, that moisture is lost faster. Dry nails become hard and brittle, so a light knock is enough to crack them or make the tip split. Dry skin around the nails cracks and gets hangnails easily." },
        { img: { src: img("phu-nu-mac-ao-khoac-di-tren-pho-troi-lanh"), alt: "A woman in a camel wool coat walks along a cobbled street looking at her phone, a shop with a plum-red awning behind her", caption: "Cold wind outside, heating inside: hands, nails and lashes are dried out all day long." } },
        { p: "Indoor heating makes this worse, because the air gets warmer without gaining any water vapour. Washing your hands many times a day, especially with hot water and soap, also strips away the skin's natural oils." },
      ],
    },
    {
      id: "cuticle-oil-every-evening",
      title: "Habit 1: cuticle oil every evening",
      blocks: [
        { p: "Every evening before bed, put a drop of oil on the cuticles and the nail surface and massage it in gently. The skin around the nails softens and gets fewer hangnails. The nails become more flexible and break less." },
        { img: { src: img("nho-dau-duong-len-da-quanh-mong"), alt: "A nail technician in black gloves uses a dropper to place a drop of golden cuticle oil on a client's oval nail in milky pink gel polish" } },
        { p: "The habit works for every kind of nail: bare, ordinary polish, gel polish or BIAB. With gel, the oil keeps the skin around the nail from drying, cracking and peeling right next to the edge of the gel, so you have less reason to fiddle with that edge. The article [do nails need to breathe between gel manicures](lesson:mong-co-can-tho) explains why regular oiling matters more than giving your nails a break." },
        { note: "Keep the bottle of cuticle oil next to your bed or your toothbrush. Seeing it every evening makes it much easier to remember.", kind: "tip", title: "Small tip" },
      ],
    },
    {
      id: "gloves-and-hand-cream",
      title: "Habit 2: gloves outdoors, hand cream after washing",
      blocks: [
        { p: "Out in the cold, always wear gloves. They keep your hands warm and block the wind, so the cold air does not dry out the skin and nails all the way to your destination." },
        { p: "After every hand wash, apply a thin layer of hand cream straight away. A thin layer is enough; your hands should not feel slippery. For washing up and laundry, also wear rubber gloves: they stop your hands drying out and keep water and detergents from lifting gel nails early, as explained in [5 habits that make gel nails lift](lesson:5-thoi-quen-gel-bong)." },
        { img: { src: img("thoa-kem-duong-tay-sau-khi-rua-tay"), alt: "Two hands in black gloves smooth white hand cream over the back of a client's hand resting on a cream hand cushion", caption: "A thin layer of hand cream after every wash keeps the skin from cracking." } },
      ],
    },
    {
      id: "winter-lash-care",
      title: "Habit 3: lash care in winter, away from heat",
      blocks: [
        { p: "Lashes also get drier and more brittle in the cold and when you spend a long time near hot heating. The lesson gives three things to do:" },
        {
          table: {
            head: ["Do this", "Why"],
            rows: [
              ["Brush your lashes daily with a clean brush", "The lashes stay neat, untangled and do not twist together"],
              ["Keep hot air away from your eyes", "Heat makes lashes drier and more brittle"],
              ["Do not stay in the sauna too long", "Long exposure to high heat dries lashes out"],
            ],
          },
        },
        { img: { src: img("chai-mi-bang-choi-sach"), alt: "Close-up of a technician in black gloves brushing a client's lashes with a black lash brush, the client's eyes closed and a white pad under the eye", caption: "Brush your lashes gently every day with a clean brush." } },
        { p: "When you blow-dry your hair, point the hot air away from your face. If you wear lash extensions, how to wash and brush them at home is in [how to wash lash extensions at home](lesson:rua-mi-noi-tai-nha), and what to avoid after a lash appointment is in [lash aftercare after extensions or a lift](lesson:cham-soc-sau-lam-mi). Freshly laminated brows need regular conditioning too; see [keep a brow lamination looking good for 6 weeks](lesson:giu-nep-brow-lamination)." },
      ],
    },
    {
      id: "indoor-humidity",
      title: "Habit 4: humidity indoors and enough water",
      blocks: [
        { p: "With the heating on, indoor air gets very dry. A small humidifier in the bedroom or study helps a lot: your skin, lips, nails and lashes all dry out less overnight." },
        { img: { src: img("may-tao-am-nho-trong-phong"), alt: "A small cream humidifier releases a fine mist on a marble windowsill, next to a vase of white flowers and a cream armchair" } },
        { p: "The lesson adds one more simple thing: drink enough water. When your body is well hydrated, your skin, nails and lashes all dry out less." },
        { note: "If the skin around a nail is deeply cracked, red, swollen or painful, or a nail is unusually discoloured, it is no longer just dryness from the weather. Ask a doctor or pharmacist before getting your nails done.", kind: "warn", title: "When it is more than dryness" },
      ],
    },
    {
      id: "book-after-winter",
      title: "Dry nails or brittle lashes after the cold season? Book a treatment",
      blocks: [
        { p: "If your nails are dry and breaking or your lashes look brittle after the cold months, let a technician look at them in person and advise you on what to do next, from a nail care treatment to a lash refill. On VaraaAi you [book online](lesson:dat-lich-online) by choosing the service and the time, and you are done. This lesson comes from Moja Beauty in Helsinki, and you can book on [Moja Beauty's booking page](/b/moja-beauty)." },
      ],
    },
  ],
  faq: [
    {
      q: "Why do nails break more easily in winter?",
      a: "Cold, dry air outside and the heating indoors take moisture from the nails and the skin around them. Dry nails become hard and brittle and crack and split easily. Cuticle oil every evening and gloves outdoors keep the nails flexible and less likely to break.",
    },
    {
      q: "When should you use cuticle oil?",
      a: "Every evening, apply oil to the cuticles and the nail surface and massage it in gently. The skin around the nails gets softer with fewer hangnails, and the nails become more flexible. It works while you are wearing gel polish too.",
    },
    {
      q: "How do I stop my hands getting dry and cracked in winter?",
      a: "Wear gloves when you go out in the cold, and apply a thin layer of hand cream right after every hand wash. For washing up and laundry, wear rubber gloves so your hands are not in water and detergents for long.",
    },
    {
      q: "How should I look after my lashes in winter?",
      a: "Lashes get drier and more brittle in the cold and near hot heating. Brush them every day with a clean brush, keep hot air away from your eyes and do not stay in the sauna too long.",
    },
    {
      q: "Does a humidifier help skin, nails and lashes?",
      a: "Yes. With the heating on, indoor air is very dry, and a small humidifier helps a lot. Together with drinking enough water, it means your skin, nails and lashes all dry out less.",
    },
  ],
  related: ["mong-co-can-tho", "5-thoi-quen-gel-bong", "cham-soc-sau-lam-mi", "giu-nep-brow-lamination"],
};

export default article;
