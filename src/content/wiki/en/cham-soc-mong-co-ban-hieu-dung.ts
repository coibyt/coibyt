import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cham-soc-mong-co-ban-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "basic-manicure-and-pedicure",
  lesson: "cham-soc-mong-co-ban-hieu-dung",
  category: "nail",
  title: "Basic manicure and pedicure: cuticles, cutting toenails, foot spa hygiene and regular polish",
  metaTitle: "Basic manicure and pedicure: 7 things to understand",
  metaDescription:
    "Basic manicure and pedicure: why living skin is not cut, toenails cut straight across, foot spa hygiene, clients with diabetes, calluses, regular polish vs gel.",
  keyword: "basic manicure and pedicure",
  keywords: ["should you cut your cuticles", "how to cut toenails properly", "pedicure foot spa hygiene", "pedicure for diabetics", "regular nail polish vs gel", "ingrown toenail from cutting corners", "should calluses be removed"],
  excerpt: "A basic manicure and pedicure with regular polish looks simple. Here are seven things a technician needs to understand so clients leave with nails that look good, healthy skin and peace of mind.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("mong-tay-son-thuong-mau-do-dang-cho-kho"),
    alt: "A client's two hands resting on a cream cushion with freshly painted glossy red nails, a bottle of red nail polish beside them",
  },
  takeaways: [
    "The aim of the service is **healthy nails and healthy skin**. The colour is only the final part.",
    "Never cut the living fold of skin at the base of the nail. Remove only the thin dead tissue on the nail plate and dry flakes that have lifted.",
    "Toenails are **cut straight across** with only slightly softened corners, never dug into the corners, the edge level with the tip of the toe.",
    "A disposable liner in the foot basin for every client; pedicure tools always sterilised and stored separately (under the City of Helsinki guidance; rules where you work may differ).",
    "Always ask about diabetes and circulation. Ulcers, wounds, or thick or discoloured nails mean no treatment and a suggestion to see a doctor.",
  ],
  intro: [
    "A basic manicure and pedicure with regular polish is often seen as a beginner's job. In fact it is the service that shows a client most clearly whether your salon is careful and clean: she watches you open the tool pouch, line the foot basin and hold the nippers close to her skin.",
    "This article follows the VaraaAi Academy lesson “Basic manicure and pedicure: understand them for healthy, beautiful hands and feet” in the Nails course. Afterwards you will be able to explain to a client why you do not cut deep, cut toenails so they do not become ingrown, follow the hygiene rules for the foot basin, and know when to go gently or to say no.",
  ],
  sections: [
    {
      id: "cutting-cuticles",
      title: "Should you cut your cuticles?",
      blocks: [
        { p: "Start with the purpose. In a basic manicure or pedicure the polish comes last. The main part is healthy nails and healthy skin: nails neatly trimmed and filed, soft clean skin around them, feet that feel light. An observant technician is also often the first to notice something unusual on a client's nails or skin, and to suggest she sees a doctor." },
        { p: "That purpose explains the rule about skin. The nail grows from the matrix, under the fold of skin at the base of the nail. That living fold works like a seal, keeping bacteria away from the place where the nail is made. So living skin is not cut." },
        { img: { src: img("mat-cat-dau-ngon-tay-mam-mong-va-nep-da"), alt: "An illustration of a fingertip in cross-section, showing the nail plate on the nail bed and its root hidden under the fold of skin at the base", caption: "The nail grows from the matrix under the fold of skin at its base. That living fold seals and protects the matrix." } },
        { p: "A technician removes only two things: the thin, clear dead tissue stuck to the nail plate, and dry flakes of skin that have lifted. This is explained in more detail in [what is gel polish](lesson:gel-hieu-dung)." },
        { img: { src: img("kem-chi-cat-manh-da-chet-da-bong"), alt: "A nail technician in black gloves uses the tip of small nippers to trim a dry flake of lifted skin beside a client's natural nail", caption: "The nippers touch only the dead flake that has lifted, never the living fold." } },
        { p: "A common situation: a client is used to having her cuticles cut very deep and asks for deeper still. Cutting into living skin looks neat today, but the skin often grows back thicker and rougher, gets hangnails easily, and every cut is a way in for infection." },
        { note: "When a client insists on deep cuticle cutting, do not give in. Explain the alternative: a gentle push-back, removing the dead tissue and cuticle oil every day. Book her back in a few weeks so she can see for herself how much softer the skin has become.", kind: "tip", title: "What to tell the client" },
      ],
    },
    {
      id: "cutting-toenails",
      title: "How to cut toenails properly: straight across, never into the corners",
      blocks: [
        { p: "Toenails have one golden rule: cut straight across and round the corners only very slightly. Do not cut down in a deep curve at the sides, do not dig into the corners, and do not cut too short. The edge of the nail level with the tip of the toe is just right." },
        { img: { src: img("mong-chan-cat-thang-ngang-dung-cach"), alt: "Close-up from above of a big toe, its natural nail cut straight across with the edge level with the tip of the toe", caption: "Right: a straight edge with the corners intact, only softened so they are not sharp." } },
        { p: "The reason lies in how the nail grows. If the corners are cut deep, the nail can grow into the skin as it grows out and become an ingrown toenail: swollen, red, painful and sometimes infected. A nail cut too short can end the same way. The [NHS page on ingrown toenails](https://www.nhs.uk/conditions/ingrown-toenail/) is one of the sources the lesson cites." },
        { img: { src: img("loi-cat-mong-chan-cong-sau-vao-khoe"), alt: "Close-up of a big toe whose nail has been cut into a rounded half-moon, both corners cut deep down into the sides", caption: "An example of the mistake: a curved cut deep into both corners. As it grows, the edge can easily dig into the skin." } },
        { p: "This advice should go home with the client: when she cuts her own toenails, she cuts straight across and leaves the corners alone. If a nail grows into the skin and it turns red and painful, she should see a doctor early." },
      ],
    },
    {
      id: "foot-spa-hygiene",
      title: "Pedicure foot spa and tool hygiene",
      blocks: [
        { p: "This is the most important part of a pedicure. A warm, damp foot basin is a place where bacteria and fungi grow very easily if it is not handled correctly. The lesson follows the [City of Helsinki hygiene guidance](https://www.hel.fi/static/liitteet-2019/Kymp/asuminen-ja-ymparisto/ymparistoterveys/Hygiene-premises-instructions.pdf), which is also the basis of the lesson [Tools after every customer](lesson:ve-sinh-dung-cu)." },
        {
          table: {
            head: ["Item", "How it is handled", "When"],
            rows: [
              ["Foot basin", "Disposable liner; basin cleaned, then disinfected", "A new liner for every client; the basin after every client"],
              ["Pedicure tools", "Always sterilised and stored separately", "After every client"],
              ["Metal nippers and pushers", "Cleaned, then sterilised, because they can break the skin", "After every client"],
              ["Paper files, buffers, wooden sticks, toe separators", "Single-use: thrown away after use", "A new set for every client"],
            ],
          },
        },
        { img: { src: img("bon-ngam-chan-lot-tui-dung-mot-lan"), alt: "A white foot basin lined with a clear disposable plastic liner, a black-gloved hand filling it with warm water from a shower head", caption: "A new liner for every client. On top of the liner, the basin is still cleaned and disinfected after each client." } },
        { p: "It is the same with manicures: cleanliness is the first thing a client sees. Wash and sanitise your hands before every client, and open the tool pouch right in front of her. When clients see it, they feel reassured." },
        { img: { src: img("mo-tui-dung-cu-tiet-trung-truoc-mat-khach"), alt: "A nail technician in black gloves tears open a sterilisation pouch holding nippers and a pusher in front of a smiling client at a marble table" } },
        { note: "Hygiene rules differ by country. The points above follow the City of Helsinki guidance; find out the rules that apply where you work. This article is a training aid, not a licence.", kind: "warn", title: "Rules differ from place to place" },
      ],
    },
    {
      id: "diabetes-and-circulation",
      title: "Pedicures for clients with diabetes or circulation problems",
      blocks: [
        { p: "With some clients a technician has to be many times more careful: clients with diabetes, or with circulation problems in their legs and feet. So always ask before you start. Their feet may have reduced feeling, so they may not notice if the water is too hot or if they get scratched, and even a small scratch takes a long time to heal." },
        {
          ul: [
            "Lukewarm water only.",
            "A short soak.",
            "No cutting the skin, no blades.",
            "Very gentle filing.",
          ],
        },
        { img: { src: img("mong-chan-day-doi-mau-khong-nen-lam"), alt: "Close-up of the front of a foot on a cream towel, the big toenail thickened, cloudy and yellowed, unlike the other nails", caption: "A thickened, discoloured nail is a sign not to treat. The technician does not diagnose; she suggests a doctor." } },
        { note: "Nail technicians do not diagnose. Ulcers, wounds, thick or discoloured nails, or an ingrown nail mean no treatment, and a referral to a doctor or a foot-care professional. The lesson [When not to treat](lesson:khi-nao-khong-lam) covers these cases in detail.", kind: "warn", title: "When to say no" },
      ],
    },
    {
      id: "heel-calluses",
      title: "Calluses on the heels: smooth them, do not remove them all",
      blocks: [
        { p: "A callus is skin that thickens to protect the foot where it takes a lot of pressure, such as the heel and the sole. The technician's job is to soften and smooth it, not to take it all off. Use a fine foot file and glide lightly, following the tool's instructions." },
        { img: { src: img("dua-chan-min-lam-min-vet-chai-o-got"), alt: "A technician in black gloves holds a client's foot with one hand and glides a flat foot file lightly over the heel with the other", caption: "A fine foot file: a few light passes are enough to make the skin smoother." } },
        { p: "Do not use callus blades or rasps unless you have been trained and the place where you work allows it. Take off too much and the foot is sore, scratches easily, and the callus usually grows back thicker." },
      ],
    },
    {
      id: "regular-polish-vs-gel",
      title: "Regular nail polish vs gel: what is the difference",
      blocks: [
        {
          table: {
            head: ["Point", "Regular polish", "Gel"],
            rows: [
              ["How it dries", "Solvents evaporate into the air, no lamp needed", "Needs a lamp"],
              ["Removal", "Polish remover, very gentle on the nails", "More careful removal"],
              ["How long it lasts", "Softer; usually looks good for a few days to about a week", "Lasts longer"],
              ["Fully hard", "Surface dries quickly, underneath it takes a few hours", "Cured under the lamp"],
            ],
          },
        },
        { p: "Neither is better for every client. Help each client choose by what she needs. If she chooses gel, the prep is a little different: see [how to apply gel polish](lesson:son-gel)." },
      ],
    },
    {
      id: "massage-and-aftercare",
      title: "Massage, moisture and aftercare advice",
      blocks: [
        { p: "Do not rush the massage and moisturising. This is when the client relaxes most and remembers your salon longest. Lotion keeps the skin soft, and cuticle oil keeps the skin around the nails from drying and cracking. Remember one technical point: wipe the lotion and oil off the nail plate before polishing, or the polish will not stick." },
        { p: "Advice for the client before she leaves:" },
        {
          ul: [
            "Polish needs a few hours to harden fully: avoid hot water and do not put on closed shoes straight away.",
            "Use cuticle oil every day, and wear gloves for washing up and cleaning.",
            "At home, cut toenails straight across as well, without digging into the corners.",
            "If a nail grows into the skin and is red and painful, see a doctor early.",
          ],
        },
        { img: { src: img("mong-chan-son-do-sau-buoi-cham-soc"), alt: "A client's two feet side by side on a cream towel, ten short toenails painted glossy red, the toe separators just removed lying beside them" } },
        { p: "A basic manicure and pedicure done right is why clients come back every month. In VaraaAi, note what matters in the [client record](lesson:khach-hang), such as diabetes, allergies or a tendency to ingrown nails, so the whole team knows and takes care next time. Regular monthly clients are also a good fit for a [loyalty card](lesson:the-khach-quen). Every movement, from removing old polish to the top coat, is in the practice article [how to do a manicure and pedicure](lesson:cham-soc-mong-co-ban)." },
      ],
    },
  ],
  faq: [
    {
      q: "Should you cut your cuticles?",
      a: "Do not cut the living fold of skin at the base of the nail, because it seals and protects the nail matrix. Push it back gently and remove only the thin dead tissue stuck to the nail plate and dry flakes that have lifted. Cut living skin usually grows back thicker and rougher with more hangnails, and every cut is a way in for infection.",
    },
    {
      q: "What is the right way to cut toenails?",
      a: "Cut straight across, round the corners only very slightly, never dig into the corners and do not cut too short. The edge of the nail level with the tip of the toe is right. Corners cut deep or nails cut too short easily grow into the skin and become ingrown.",
    },
    {
      q: "Can people with diabetes have a pedicure in a salon?",
      a: "The technician needs to know beforehand and work very gently: lukewarm water only, a short soak, no cutting the skin, no blades and very gentle filing. The feet may have less feeling and scratches heal slowly. Ulcers, wounds, or thick or discoloured nails mean no treatment, and the client should see a doctor or a foot-care professional.",
    },
    {
      q: "How long does regular nail polish last, and how long does it take to dry?",
      a: "Regular polish usually looks good for a few days to about a week. The surface dries quickly, but underneath it takes a few hours to harden completely, so during that time avoid hot water and do not put on closed shoes straight away.",
    },
    {
      q: "Should calluses on the heels be removed completely?",
      a: "No. A callus is thickened skin that protects the foot where it takes pressure. It is only softened and smoothed with a fine foot file. Taking too much off hurts, scratches easily and the callus usually grows back thicker. Callus blades are only for people trained to use them, where it is allowed.",
    },
    {
      q: "How should a salon clean a pedicure foot basin?",
      a: "Under the City of Helsinki hygiene guidance the lesson follows, the basin gets a disposable liner for every client, and after every client it is cleaned and then disinfected. Pedicure tools are always sterilised and stored separately. Rules differ by country, so check the ones that apply where you work.",
    },
  ],
  related: ["cham-soc-mong-co-ban", "ve-sinh-dung-cu", "khi-nao-khong-lam", "gel-hieu-dung"],
};

export default article;
