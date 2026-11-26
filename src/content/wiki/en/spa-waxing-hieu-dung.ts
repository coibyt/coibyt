import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/spa-waxing-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "hard-wax-vs-soft-wax-and-waxing-safety",
  lesson: "spa-waxing-hieu-dung",
  category: "spa",
  title: "Hard wax vs soft wax: which to use, who should not be waxed and aftercare for the skin",
  metaTitle: "Hard wax vs soft wax: who should not be waxed, aftercare",
  metaDescription:
    "Hard wax vs soft wax explained: hair length for waxing, wax temperature, who should not be waxed, why you never pull straight up and what to avoid after waxing.",
  keyword: "hard wax vs soft wax",
  keywords: [
    "what is waxing",
    "how long does hair need to be to wax",
    "who should not get waxed",
    "waxing while on isotretinoin",
    "what to avoid after waxing",
    "ingrown hairs after waxing",
    "wax burn treatment",
  ],
  excerpt: "Waxing done in a hurry burns, grazes and reddens the skin; done properly, it hurts less and leaves the skin smooth. This article explains the small habits that make the difference.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("chuyen-vien-thoa-sap-wax-long-chan-cho-khach"),
    alt: "A therapist in black gloves spreads wax with a wooden spatula onto the lower leg of a client lying under a white towel, beside a wax heater on a marble trolley",
  },
  takeaways: [
    "Soft wax is used with strips and suits large areas such as legs and arms. **Hard wax** needs no strip, grips the skin less and suits the underarms, brows and upper lip.",
    "Before every client, test the wax on the inside of your own wrist, then on a small spot of the client's skin. Too hot burns, too cool drags the skin.",
    "A client taking **isotretinoin** is not waxed. A recent peel or laser, sunburn, broken skin, cold sores, rashes, varicose veins: do not wax that area.",
    "Soft wax goes on with the direction of hair growth and comes off against it, low and almost parallel to the skin. Never pull straight up.",
    "No double-dipping: a spatula that has touched the client never goes back into the pot.",
  ],
  intro: [
    "Hard wax vs soft wax is the first choice in any waxing service. Waxing itself is simple: warm wax goes on the skin, grips the hairs and is pulled off. In a salon, though, it is the service most likely to burn, graze or redden a client's skin when it is rushed. Done properly, it hurts less, leaves the skin smooth, and the client comes back.",
    "This article follows the VaraaAi Academy lesson “Waxing: understand it for less pain and safe skin” in the Spa & skin care course, the theory half of the topic. By the end you will know which wax to use on each area, which clients should not be waxed, why the direction of the pull matters and what to tell the client afterwards. The step-by-step method for the lower leg, underarm and brows is in the article [How to wax step by step](lesson:spa-waxing). Intimate waxing is not covered here.",
  ],
  sections: [
    {
      id: "soft-and-hard-wax",
      title: "Soft wax and hard wax: how they differ",
      blocks: [
        { p: "Salons use two main kinds of wax. They differ in how they go on and come off, and so in the areas they suit." },
        {
          table: {
            head: ["Compared", "Soft wax (strip wax)", "Hard wax"],
            rows: [
              ["How it goes on", "A very thin layer", "Thicker"],
              ["How it comes off", "A strip is pressed on and pulled off", "No strip: it sets and is lifted by its edge"],
              ["Character", "Quick", "Grips the hair, sticks less to the skin"],
              ["Suits", "Large areas such as legs and arms", "Small areas with thin skin: underarms, brows, upper lip"],
            ],
          },
        },
        { img: { src: img("sap-mem-va-sap-cung-wax-long"), alt: "Two wax pots side by side on a stone surface: on the left honey-coloured soft wax with a stack of wax strips, on the right pink hard wax with a piece of set wax", caption: "Left: soft wax, used with strips. Right: hard wax, which sets into a piece you lift off." } },
        { p: "Every wax brand is different, so temperature, timing and use always follow the manufacturer's instructions." },
      ],
    },
    {
      id: "wax-temperature",
      title: "Wax temperature: safety rule number one",
      blocks: [
        { p: "Two accidents are very common, and both start at the wax pot. The salon is busy, the pot is too hot, the therapist does not test it and spreads it straight onto the client's leg: the client flinches and is left with a red, burning stripe. Or the opposite: the wax has cooled, the therapist pulls slowly and straight up, the skin is dragged with it, and the next day it is bruised and grazed." },
        { p: "Each wax has its own working temperature, given in the manufacturer's instructions. Do not trust your eyes alone. Before every client:" },
        {
          ol: [
            "Take a little wax on a new spatula and test it on the inside of your own wrist.",
            "Test a small spot on the client's skin.",
            "Ask the client whether it feels too hot.",
          ],
        },
        { img: { src: img("thu-nhiet-do-sap-wax-tren-co-tay"), alt: "A hand in a black glove holds a wooden spatula with yellow wax and dabs a little onto the inner wrist of the other hand, a warm wax pot beside it", caption: "Test on the inside of your own wrist first, then on the client's skin." } },
        { p: "Wax at the right temperature is warm and flows evenly like honey. Too hot and it burns. Too cool and it drags the skin and hurts." },
      ],
    },
    {
      id: "hair-length",
      title: "How long does hair need to be to wax, and how to prepare the skin",
      blocks: [
        { p: "The hair has to be long enough for the wax to grip, usually about half a centimetre, roughly the size of a grain of rice." },
        {
          ul: [
            "**Too short** and the wax cannot hold the hair. If the client has just shaved, rebook in a few weeks.",
            "**Too long** and it is trimmed first, so it hurts less.",
            "**The skin must be clean and dry:** no cream, oil or sweat. Wipe it with a pre-wax cleanser as the manufacturer instructs.",
          ],
        },
      ],
    },
    {
      id: "who-should-not-be-waxed",
      title: "Who should not get waxed: medicines, skin conditions and health",
      blocks: [
        { p: "Always ask about medicines before waxing, regulars included. Some medicines make the skin so thin and fragile that waxing can lift it off." },
        {
          table: {
            head: ["Situation", "What to do"],
            rows: [
              ["Taking the acne medicine isotretinoin", "No waxing"],
              ["Has recently stopped isotretinoin", "The wait is usually about six months. The client asks her doctor when waxing is safe again"],
              ["Using retinoid creams or exfoliating acids", "Do not wax the treated area; follow the wax manufacturer's and the prescriber's advice"],
              ["A recent peel or laser, sunburn, broken skin, cold sores, a rash", "Do not wax that area"],
              ["Varicose veins", "Do not wax over them"],
              ["Diabetes, poor circulation, thin skin that bruises easily, blood thinners", "Skin heals more slowly: take great care and suggest she asks her doctor first"],
            ],
          },
        },
        { p: "On isotretinoin, the lesson cites the [NHS advice](https://www.nhs.uk/medicines/isotretinoin-capsules/common-questions-about-isotretinoin-capsules/): no waxing during treatment. A therapist does not diagnose. When in doubt, don't. The lesson [When not to treat a client](lesson:khi-nao-khong-lam) covers how to say no in more detail." },
        { img: { src: img("tu-van-khach-truoc-khi-wax-long"), alt: "A blonde client in a cream robe sits on the edge of a spa bed and hands a tube of cream to the therapist sitting opposite her", caption: "Ask which medicines the client takes and what she puts on her skin before you switch on the wax heater." } },
        { h3: "Patch test first-time clients" },
        { p: "For a first-time client, sensitive skin or a history of allergies, do a patch test first. Many waxes contain rosin (colophony), which some people are allergic to. Test a small piece in a discreet spot, usually the day before or as the manufacturer instructs. A test without redness is still no guarantee. See also the lesson [Allergies and chemicals](lesson:di-ung-hoa-chat)." },
      ],
    },
    {
      id: "application-and-removal",
      title: "Apply with the hair growth, remove against it",
      blocks: [
        { p: "In waxing technique, direction matters most. Soft wax is applied in the direction of hair growth. It is removed against the direction of growth: fast and decisive, low to the skin and almost parallel to it." },
        { img: { src: img("loi-giat-giay-wax-thang-len"), alt: "A therapist pulls a wax strip straight up off a client's lower leg, her other hand raised and not holding the skin, showing a technique mistake", caption: "The mistake to avoid: pulling straight up without holding the skin taut. The skin is dragged with it, bruises and grazes easily, and hairs break." } },
        {
          ul: [
            "**Never pull straight up.** The skin is dragged along, bruises and grazes easily, and hairs break halfway.",
            "**The other hand always holds the skin taut,** right next to the wax. Taut skin hurts less and is not pulled along.",
            "**Right after the pull, press your palm** on the waxed area for a few seconds. The sting eases noticeably.",
            "**No more than two passes of soft wax on one spot.** Tweeze the few strays rather than waxing again.",
            "**In the underarm** the hair grows in several directions, so work in small sections, each following its own growth.",
          ],
        },
      ],
    },
    {
      id: "waxing-hygiene",
      title: "Waxing hygiene: no double-dipping",
      blocks: [
        { p: "A spatula that has touched the client's skin never goes back into the wax pot. Every dip is a fresh spatula. Otherwise the pot becomes a place where bacteria travel from one client to the next." },
        { img: { src: img("bo-que-da-dung-lay-que-moi-khi-wax"), alt: "A therapist in black gloves drops a waxy wooden spatula into a lidded bin while her other hand takes a fresh one from a glass jar beside the wax pot", caption: "The used spatula goes into a lidded bin; the next dip is a fresh spatula." } },
        {
          ul: [
            "Wax that has been taken out never goes back into the pot.",
            "Gloves, a fresh couch roll, single-use strips.",
            "The client stays covered, with only the area being waxed uncovered.",
            "Face and brows: hard wax, a tiny amount, worked carefully and well away from the eye.",
          ],
        },
        { p: "Hand washing and glove use are covered in the lesson [Hand washing and gloves](lesson:rua-tay-gang-tay). Intimate waxing is a separate technique that needs its own training, and it is not part of this article." },
        { note: "Rules for beauty work differ from country to country. This article is a training aid, not a licence.", kind: "warn", title: "Rules differ by country" },
      ],
    },
    {
      id: "after-waxing",
      title: "What to avoid after waxing, ingrown hairs and wax burns",
      blocks: [
        { p: "After waxing, mild redness and a few little bumps at the follicles are normal and usually fade within a few hours." },
        { img: { src: img("da-do-nhe-cham-nho-sau-khi-wax-long"), alt: "Close-up of a woman's freshly waxed lower leg on a spa bed, the skin slightly pink with small red dots at the follicles", caption: "Mild redness and small dots at the follicles straight after waxing are a normal reaction." } },
        { h3: "For about the first day" },
        { p: "Advise the client to avoid sunbathing, sauna, very hot baths and fragranced products, deodorant included after an underarm wax. If the wax manufacturer gives its own aftercare advice, follow that." },
        { h3: "Ingrown hairs" },
        { p: "Clients ask about these a lot. After a few days, exfoliate very gently and moisturise regularly. No squeezing, no plucking. If the spot is swollen, painful or has pus, advise her to see a doctor." },
        { h3: "If the wax burns or lifts the skin" },
        { p: "A wax burn: cool it straight away under cool running water for about twenty minutes. That is also the [NHS advice on treating burns](https://www.nhs.uk/conditions/burns-and-scalds/treatment/), and it is covered in the lesson [Incidents in the salon](lesson:xu-ly-su-co). Skin that has lifted: stop, do not wax that spot again, and note it." },
        { img: { src: img("lam-mat-vet-bong-sap-duoi-voi-nuoc"), alt: "A hand in a black glove supports a client's forearm under cool running water over a stone basin, a red mark on the inside of the client's wrist", caption: "A burn: cool it under cool running water for about twenty minutes." } },
        { p: "In VaraaAi you note in the client's internal notes in your [client list](lesson:khach-hang) the wax you used, the areas waxed and how the skin reacted, so whoever does the next visit knows." },
      ],
    },
  ],
  faq: [
    {
      q: "What is the difference between hard wax and soft wax?",
      a: "Soft wax goes on in a very thin layer, a strip is pressed on and pulled off; it is quick and suits large areas such as legs and arms. Hard wax goes on thicker, needs no strip, sets and is lifted by its edge. It grips the hair and sticks less to the skin, so it suits small areas with thin skin such as the underarms, brows and upper lip.",
    },
    {
      q: "What is waxing?",
      a: "Waxing is hair removal with wax: warm wax is spread on the skin in the direction of hair growth and pulled off against it. Salons use two main kinds, soft wax used with strips and hard wax used without. Done properly, it hurts less and leaves the skin smooth.",
    },
    {
      q: "How long does hair need to be for waxing?",
      a: "Usually about half a centimetre, roughly the size of a grain of rice, so the wax can grip it. After shaving, wait a few weeks for the hair to grow back. Very long hair is trimmed before waxing so it hurts less.",
    },
    {
      q: "Can you get waxed while taking isotretinoin for acne?",
      a: "No. The medicine makes the skin thin and fragile, waxing can lift it off, and the NHS advises against waxing during treatment. After stopping, the wait is usually about six months; ask your doctor when waxing is safe again.",
    },
    {
      q: "What should you avoid after waxing?",
      a: "For about the first day, avoid sunbathing, sauna, very hot baths and fragranced products, deodorant included after an underarm wax. Mild redness and small bumps at the follicles are normal and usually fade within a few hours. If the wax manufacturer gives its own advice, follow it.",
    },
    {
      q: "What should you do about ingrown hairs after waxing?",
      a: "After a few days, exfoliate very gently and moisturise regularly. Do not squeeze or pluck them. If the area becomes swollen, painful or has pus, see a doctor.",
    },
  ],
  related: ["spa-waxing", "khi-nao-khong-lam", "di-ung-hoa-chat", "xu-ly-su-co"],
};

export default article;
