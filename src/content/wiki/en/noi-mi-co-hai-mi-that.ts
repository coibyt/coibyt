import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/noi-mi-co-hai-mi-that/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "do-lash-extensions-damage-natural-lashes",
  lesson: "noi-mi-co-hai-mi-that",
  category: "tips",
  title: "Do lash extensions damage your natural lashes? When they cause lash loss, and how to avoid it",
  metaTitle: "Do lash extensions damage natural lashes? What to know",
  metaDescription:
    "Do lash extensions damage natural lashes? Correct work about 1 mm from the lid versus clumped glue, the right weight, and why you never pull them off.",
  keyword: "do lash extensions damage natural lashes",
  keywords: ["can lash extensions make your lashes fall out", "do lash extensions thin your lashes", "clumped lash extensions", "removing lash extensions at home", "lash extensions too heavy", "lash extensions long term"],
  excerpt: "Lash extensions only cost you natural lashes when the work is wrong: clumped glue, lashes glued to the skin, extensions too heavy, or pulled off at home. Here is how to tell good work.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-mi-so-hai-mat-khach-tu-dau-giuong"),
    alt: "Seen from the head of the treatment bed, a client lies with eyes closed and pads under both eyes while gloved hands rest on either side",
  },
  takeaways: [
    "Lash extensions applied correctly do not make your natural lashes fall out: they keep growing and shedding on their own cycle.",
    "Correct work means one extension on **one natural lash**, about 1 mm from the lid, no glue on the skin, every lash separate.",
    "Wrong work with **clumped glue** sticks several lashes together, so when one sheds it pulls its neighbours out with it.",
    "Extensions have to **suit your natural lashes**: a fine lash carrying an extension that is too long or too thick gets dragged down and breaks.",
    "To get rid of extensions, go to the salon for removal with a glue remover. Never pull them off yourself.",
  ],
  intro: [
    "Do lash extensions damage natural lashes, and will you be left with bare lids once they come off? It is the worry almost everyone has before a first set. The answer lies in the technique. A correctly applied set lets your own lashes grow and shed as usual; a badly applied set with clumped glue is what thins them out.",
    "This article follows the lesson “Do lash extensions ruin your natural lashes?” from the Moja Beauty course at VaraaAi Academy, a set of short videos for customers from the Moja Beauty salon in Helsinki. By the end you will be able to tell correct work from wrong work, understand why the weight of an extension matters, and know what to do when you want your extensions off.",
  ],
  sections: [
    {
      id: "natural-lashes-shed",
      title: "First: natural lashes fall out every day anyway",
      blocks: [
        { p: "Every natural lash has its own life cycle: it grows, stops getting longer, rests for a while and then falls out so a new one can replace it. Losing a few lashes a day is therefore normal, with or without extensions." },
        { p: "An extension is attached to a natural lash, so when that lash sheds, the extension goes with it. Many people spot a fallen extension with a natural lash still attached and conclude that extensions make lashes fall out. In fact that lash had reached the end of its cycle. The lesson [why losing 2–5 lashes a day is normal](lesson:chu-ky-rung-mi) explains the cycle in more detail." },
        { p: "So the real question is not whether lashes fall out, but whether natural lashes are being pulled out before their time. That depends on how the extensions are applied." },
      ],
    },
    {
      id: "correct-vs-wrong",
      title: "Correct application versus clumped glue",
      blocks: [
        {
          table: {
            head: ["", "Correct", "Wrong"],
            rows: [
              ["Extension attached to", "One natural lash", "Several lashes stuck together"],
              ["Distance from the lid", "About 1 mm", "Right against the skin, glue on the skin"],
              ["Glue", "A small, neat bond at the base", "Clumped, in lumps"],
              ["When one lash sheds", "Only that lash goes", "It pulls its neighbours out too"],
            ],
          },
        },
        { h3: "Correct work" },
        { p: "The lash technician uses tweezers to isolate exactly one natural lash, then attaches the extension along it, about 1 mm from the lid. The glue does not touch the skin. Every lash stays separate, so each natural lash still grows and sheds on its own schedule." },
        { img: { src: img("nhip-tach-rieng-mot-soi-mi-that-truoc-khi-gan"), alt: "Two pairs of tweezers in a technician's black-gloved hands, one isolating a single natural lash on a client lying with eyes closed", caption: "One natural lash is isolated before the extension goes on." } },
        { img: { src: img("soi-mi-noi-gan-cach-da-mi-khong-cham-da"), alt: "Close-up of a client's closed eye with a neat row of extensions, their bases sitting a small distance from the skin of the lid", caption: "The base of each extension sits clear of the lid, with no glue on the skin." } },
        { h3: "Wrong work" },
        { p: "Clumped glue sticks several lashes together, or the extension is glued right against the skin. Natural lashes grow at different speeds, so when they are glued together they pull on each other. When one reaches the end of its cycle, it drags out the neighbouring lashes that were still growing, and the natural lash line gets thinner. Glue on the skin also feels scratchy and can irritate." },
        { img: { src: img("loi-noi-sai-bet-keo-dinh-nhieu-soi-mi"), alt: "An example of wrong work: a dark lump of glue holds several lashes together in a clump on a client's closed eye", caption: "Wrong: clumped glue sticks several lashes together." } },
      ],
    },
    {
      id: "right-weight",
      title: "Extensions must suit your natural lashes",
      blocks: [
        { p: "Placing the extension correctly is half the job. The other half is weight. A natural lash can only carry so much. A fine lash wearing an extension that is too long or too thick gets dragged down, the root takes the strain, and the lash breaks or falls out early." },
        { img: { src: img("loi-mi-noi-qua-nang-keo-trieu-mi-that"), alt: "An example of extensions that are too heavy: a dense row of lashes droops, the lashes bent and pointing in different directions on a closed eye", caption: "Wrong: extensions that are too heavy bend the natural lashes down." } },
        { p: "That is why a careful lash technician always looks at your natural lashes before suggesting a style. Long, strong lashes can carry multi-lash volume fans; fine, short or sparse lashes need finer, shorter extensions or fans with fewer lashes. If you want a very full look and your lashes are weak, you may be offered something lighter this time. It can feel like a disappointment, but an over-heavy set is paid for by your natural lashes. The lesson on [the four lash styles](lesson:4-kieu-noi-mi) compares them side by side." },
        { note: "Signs your lashes are overloaded: lashes bending down, twisting or pointing in odd directions, or gaps where lashes have fallen early. If you notice this, tell your technician at the next refill so the set can be made lighter.", kind: "warn", title: "Check in the mirror" },
      ],
    },
    {
      id: "safe-removal",
      title: "Want them off? Do not pull them out",
      blocks: [
        { p: "Pulling off an extension pulls the natural lash carrying it out of its follicle too. Doing it once or twice shows no obvious damage, but done again and again, the lashes that grow back can be sparser and weaker. Even when a single extension catches or sticks out, leave it alone." },
        { p: "The right way is a salon visit. The technician applies a professional glue remover to the bonds, waits for the glue to soften, then slides the extensions off gently. Your eyes stay closed throughout, and your natural lashes stay where they are." },
        { img: { src: img("boi-kem-thao-mi-chuyen-dung-doc-moi-keo"), alt: "A technician in black gloves uses a small applicator to run a line of pale pink remover cream along the extensions on a client's closed eye" } },
        { img: { src: img("soi-mi-noi-truot-ra-sau-khi-keo-mem"), alt: "A cotton swab glides along the lashes while a few loosened extensions rest on the white pad under the client's closed eye", caption: "Once the glue softens, the extensions slide off with no pulling." } },
        { p: "Do not use oil near your eyes to dissolve the glue at home unless the product maker clearly says to. After removal, your natural lashes often look thinner and shorter than you remember. That is because your eyes have got used to the extensions, not because lashes have been lost." },
        { img: { src: img("mi-that-con-nguyen-sau-khi-thao-mi-noi"), alt: "A client's closed eye after removal, the fine natural lashes still in place on the lid and a few removed extensions lying on the pad" } },
        { p: "How the salon side of this works is described in the article on [lash refills and removal](lesson:mi-dam-thao)." },
      ],
    },
    {
      id: "healthy-lashes",
      title: "Keeping your natural lashes healthy while wearing extensions",
      blocks: [
        {
          ul: [
            "Do not rub your eyes or tug and pick at your lashes. Rubbing twists the extensions and loosens them, taking natural lashes with them.",
            "Avoid oil-based make-up removers and creams around the eyes, because oil softens the glue.",
            "Wash and brush your lashes gently every day, as shown in [how to wash lash extensions at home](lesson:rua-mi-noi-tai-nha).",
            "Book a refill every two to three weeks, so the technician can remove grown-out extensions and check for clumps.",
          ],
        },
        { p: "Would you like someone to check whether your current set was applied correctly? You can visit Moja Beauty in Helsinki; appointments are booked on VaraaAi through [Moja Beauty's booking page](/b/moja-beauty)." },
      ],
    },
  ],
  faq: [
    {
      q: "Do lash extensions make your natural lashes fall out?",
      a: "Not when they are applied correctly: each extension sits on one natural lash, about 1 mm from the lid, and your lashes keep growing and shedding naturally. Only wrong work, with clumped glue, lashes glued to the skin or extensions that are too heavy, thins your natural lashes over time.",
    },
    {
      q: "Why does a natural lash come out with the extension?",
      a: "Because the extension is attached to a natural lash, so when that lash reaches the end of its cycle and sheds, the extension goes with it. Losing a few lashes every day is normal.",
    },
    {
      q: "Are clumped lash extensions bad for your lashes?",
      a: "Yes. Clumped glue sticks several lashes together, and when one sheds it pulls the others out with it. Go back to the salon so the technician can separate or remove the clump, rather than pulling at it yourself.",
    },
    {
      q: "Can I remove lash extensions at home?",
      a: "It is best not to. Pulling an extension off pulls the natural lash out of its follicle too. At the salon, the technician uses a professional glue remover so the extensions slide off and your natural lashes stay in place.",
    },
    {
      q: "Do lash extensions thin your lashes in the long term?",
      a: "When every set is applied correctly, suits the strength of your natural lashes and is removed properly, your lashes keep following their natural growth cycle. Thinning usually comes from clumped glue, extensions that are too heavy, or a habit of rubbing and picking at the lashes.",
    },
    {
      q: "Can you get lash extensions if your natural lashes are thin?",
      a: "Usually yes, but the extensions need to be finer and shorter, or the fans lighter, so your lashes are not dragged down. A good technician looks at your natural lashes first and then suggests a style.",
    },
  ],
  related: ["chu-ky-rung-mi", "4-kieu-noi-mi", "rua-mi-noi-tai-nha", "mi-dam-thao-hieu-dung"],
};

export default article;
