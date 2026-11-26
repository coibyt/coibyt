import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cat-mai-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "types-of-fringe",
  lesson: "cat-mai-hieu-dung",
  category: "hair",
  title: "Types of fringe: blunt, wispy and curtain fringes, and how to choose one that is not cut too short",
  metaTitle: "Types of fringe: blunt, wispy and curtain fringes",
  metaDescription:
    "The common types of fringe and how to choose: who suits blunt, wispy and curtain fringes, cowlicks at the hairline and why fringes end up too short.",
  keyword: "types of fringe",
  keywords: [
    "what is a curtain fringe",
    "who suits a wispy fringe",
    "should I get a fringe",
    "fringe with a cowlick",
    "fringe cut too short",
    "how often to trim a fringe",
    "how to blow-dry a fringe",
  ],
  excerpt: "The three common fringes, the questions to ask before cutting, the cowlick at the front hairline and why a wet fringe must always be cut longer than the agreed length.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("toc-mai-bay-re-giua-om-go-ma"),
    alt: "A woman with long honey-blonde hair and a centre-parted curtain fringe, shortest in the middle of the forehead and longer round the cheekbones, sitting in a Parisian-style salon",
  },
  takeaways: [
    "Three common fringes: a **blunt fringe** is thick and crisp, a **wispy fringe** is light with the forehead showing through, and a **curtain fringe** is centre-parted, longer towards the cheekbones and the easiest to grow out.",
    "Before cutting, lift the hair and look for a **cowlick at the front hairline**. With a strong one, leave the fringe longer and heavier, choose a curtain fringe, or advise against a fringe.",
    "Agree the length on dry hair, right on the client's face. The first cut goes only to the tip of the nose or the lips, then shorter bit by bit.",
    "Cut a fringe with **almost no tension**: wet hair and stretched hair both get longer, then shrink up once dry and released.",
    "Eyes closed while you cut, fingers between the blade and the skin, and the scissor tips never point towards the eyes.",
  ],
  intro: [
    "The types of fringe differ in how much hair they take, in their cutting line and in how much styling they need each morning, but they share one thing: the fringe is the smallest part of a haircut and the most visible. It sits right above the eyes. A couple of millimetres crooked or too short and the client sees it the moment she looks in the mirror. Hair only grows about a centimetre a month, so a fringe cut too short is something she has to live with for a long time.",
    "This article follows the VaraaAi Academy lesson “Fringes and face framing: understand them so you never cut too short” in the Hair course. By the end you can name the three fringe types, know what to ask to help a client choose, and understand why fringes so often end up shorter than intended. The hands-on cutting is in the practice article [how to cut a curtain fringe](lesson:cat-mai).",
  ],
  sections: [
    {
      id: "three-fringes",
      title: "Common types of fringe: blunt, wispy and curtain",
      blocks: [
        { p: "Every place and every school names fringes a little differently. What matters is that you and the client picture the same shape, so use a reference photo and describe it clearly in words." },
        {
          table: {
            head: ["Fringe", "Shape", "Who it suits, what it needs"],
            rows: [
              ["Blunt fringe", "Thick, down to the brows, cut in one straight, crisp line", "Needs enough hair and fairly frequent trims"],
              ["Wispy fringe", "Only a little hair, soft ends, the forehead shows through", "Gentle; suits someone trying a fringe for the first time"],
              ["Curtain fringe", "Centre-parted, shortest in the middle, longer towards the sides, framing the cheekbones", "Easiest to grow out; suits clients who do not want to come back often"],
            ],
          },
        },
        { img: { src: img("toc-mai-bang-day-ngang-long-may"), alt: "Portrait of a woman with a dark brown bob and a thick blunt fringe, its ends forming one even straight line across her eyebrows", caption: "Blunt fringe: one thick, straight line. Because the line is so clear, any error shows." } },
        { p: "A curtain fringe is easy to grow out because the longer it gets, the more it blends into the hair around the face. A blunt fringe is the opposite: a straight line across the brows only keeps its shape with regular trims." },
      ],
    },
    {
      id: "should-i-get-a-fringe",
      title: "Should I get a fringe? What to ask first",
      blocks: [
        { p: "The consultation for a fringe has to be more thorough than for an ordinary cut. Start by pulling all the hair back to look at the face and forehead: is the forehead high or low, wide or narrow, the face round or long?" },
        { img: { src: img("keo-toc-ra-sau-xem-khuon-mat-va-vang-tran"), alt: "A stylist standing behind a client gathers her hair back with both hands, clearly revealing the forehead, hairline and face" } },
        { p: "Then ask about her daily life, because a fringe that looks good in the salon will not necessarily look good at home:" },
        {
          ul: [
            "**Does she have time to blow-dry every morning?** A fringe needs drying every day, even if only for a few minutes.",
            "**Does she wear glasses?** The frames and the ends of the fringe meet at the same place on the face.",
            "**Does she play sport or sweat a lot?**",
            "**Does she often tie her hair up?**",
          ],
        },
        { p: "And tell her one thing many clients do not expect: a fringe needs a trim after a few weeks. For a client who does not want to come back often, a long curtain fringe is easier to live with than a blunt one." },
      ],
    },
    {
      id: "cowlick",
      title: "A fringe with a cowlick: look at the front hairline before cutting",
      blocks: [
        { p: "What new stylists forget most often is the direction of growth at the front hairline. Lift the hair and look really closely. A lot of people have a cowlick there, and where there is a cowlick, the hair will not lie down." },
        { img: { src: img("tim-xoay-o-chan-toc-tran"), alt: "Close-up of a stylist lifting the dry front hair of a client with her fingertips to see the hairline along the forehead", caption: "Lift the hair and see which way it grows at the front hairline." } },
        { p: "Cut a short fringe over a cowlick and it stands straight up or splits in two, and the client fights with it every morning. With a strong cowlick you have three options:" },
        {
          ol: [
            "Leave the fringe longer and heavier, so the weight pulls it down.",
            "Choose a curtain fringe, parted in the direction the hair grows.",
            "Advise the client not to have a fringe. Sometimes that is the best advice.",
          ],
        },
        { note: "Cutting very short does not hide a cowlick: short hair there stands up or splits. Pulling it tight while cutting does not make it lie flat either; once released, the fringe springs up even higher.", kind: "warn", title: "Two wrong fixes" },
      ],
    },
    {
      id: "why-fringes-end-up-short",
      title: "Why a fringe gets cut too short: wet hair and tension",
      blocks: [
        { p: "Wet hair stretches longer and hangs heavier. Once dry it shrinks back, and over a cowlick it springs up as well. Stretched hair gets longer in just the same way. Pull a wet fringe down tight and cut it exactly at the brows, and once it is released and dry, it jumps higher than you expected, sometimes by a whole centimetre." },
        { p: "That gives three rules for length:" },
        {
          ul: [
            "**Agree the length on dry hair, right on the client's face.** Lay the hair on the forehead with your finger and point to exactly where the fringe will stop: touching the brows, below the brows or at the cheekbones.",
            "**Cut longer than that first.** The first cut goes only to the tip of the nose or the lips, and only then shorter, a little at a time.",
            "**Cut with almost no tension.** Comb the hair down, let it rest on the forehead by itself, and only support it lightly with your fingers.",
          ],
        },
        { p: "Many stylists cut fringes dry, or at least blow-dry before the final cut, to see exactly where the fringe will sit." },
        { note: "You can always cut more; hair cut too short cannot be put back. Never cut wet hair to the exact length you agreed with the client.", kind: "tip", title: "The one rule for fringes" },
      ],
    },
    {
      id: "triangle-and-point-cutting",
      title: "The triangle section, point cutting and the curtain fringe diagonal",
      blocks: [
        { h3: "How much hair goes into the fringe" },
        { p: "The fringe section is usually a triangle. Its tip sits on top of the head, where the head starts to curve down. The two bottom corners sit at the corners of the forehead, just above the outer ends of the brows. A deeper triangle reaching further back gives a thick fringe; a shallow one gives a wispy fringe. Comb the rest of the hair back and clip it neatly so it does not get mixed in while you cut." },
        { img: { src: img("chia-vung-tam-giac-de-cat-mai"), alt: "The wet hair of the triangle section at the front is combed straight down over the client's face while the stylist holds a comb and the sides, the rest of the hair clipped away", caption: "The triangle combed down over the face, the rest clipped back." } },
        { p: "Do not take the section too wide towards the temples. The fringe will cover the whole face and look very heavy." },
        { h3: "Point cutting for soft ends" },
        { p: "For soft ends, the stylist does not cut straight across but turns the scissor tips up and makes very small snips into the ends. A blunt fringe gets only a little point cutting, to keep its line. Wispy and curtain fringes get more, so the ends are light and fall naturally. Point cut too deep and the fringe looks choppy and gets much thinner." },
        { img: { src: img("tia-dau-mai-bang-mui-keo-khi-toc-kho"), alt: "Close-up of a client with her eyes closed while the stylist lifts a dry piece of fringe with her fingertips and points the scissor tips up into the ends", caption: "Point cutting on dry hair, scissor tips up into the ends, the client's eyes closed." } },
        { h3: "The curtain fringe and face framing as one line" },
        { p: "With a curtain fringe, once the centre length is set, the fringe is parted in two. Each half is cut on a diagonal, from the middle of the forehead getting longer out to the cheekbone. The face-framing pieces continue that diagonal down to the chin or collarbone. The cut goes outwards, away from the face, so the hair falls to the sides and opens the face up. There must be no break between the fringe and the face framing. How face-framing layers work within a layered cut is explained in [what is a layered haircut](lesson:cat-nu-tang-hieu-dung)." },
      ],
    },
    {
      id: "balance-and-safety",
      title: "Checking balance and staying safe near the eyes",
      blocks: [
        { p: "Only check the balance with the client's head straight and her eyes looking ahead. If she tilts her head slightly or looks down at her phone, the fringe looks uneven at once, and if you cut to match that, the line really will be uneven once she sits up. Hold both sides of the fringe at the same time and compare them at the same landmark, for example the cheekbones. Then step back and look at the whole face, not just the fringe." },
        {
          note: "The fringe is where you cut closest to the eyes. Ask the client to close her eyes while you cut. Your fingers always stay between the blade and her face. The scissor tips never point towards the eyes: when point cutting they point up into the ends, or outwards. If she is about to sneeze or wants to talk, stop and lift the scissors away. When you have finished, brush the cut hair off her face very gently before she opens her eyes.",
          kind: "warn",
          title: "Safety around the eyes",
        },
        { p: "Combs, scissors and clips are cleaned and disinfected after every client, as in [how to disinfect tools](lesson:ve-sinh-dung-cu). What this article describes is common trade experience for practice. Every country and every school has its own way of working, and the lesson is a training aid, not a licence." },
      ],
    },
    {
      id: "blow-dry-and-trims",
      title: "How to blow-dry a fringe at home, and how often to trim it",
      blocks: [
        { p: "A well-cut fringe can still frustrate the client if she does not know how to dry it. Before she leaves, show her three things:" },
        {
          ol: [
            "Dry the fringe first, while it is still wet, because a fringe dries very fast.",
            "Point the dryer nozzle downwards.",
            "Comb the fringe to the left, then to the right, and only then let it settle.",
          ],
        },
        { p: "Blow-drying technique for the whole head is covered in [blow-dry styling](lesson:say-tao-kieu-hieu-dung)." },
        { p: "Book her in for a fringe trim after a few weeks. Many salons offer a quick fringe trim between cuts, and it is worth putting on the booking page: in VaraaAi, [create a short service](lesson:dich-vu) called “Fringe trim” so clients can book it themselves, and note the fringe length and the cowlick side in her notes in the [customer records](lesson:khach-hang). Next time she sits down, you do not have to work it out again from scratch." },
      ],
    },
  ],
  faq: [
    {
      q: "What types of fringe are there?",
      a: "The three common ones are the blunt, the wispy and the curtain fringe. A blunt fringe is thick and cut in a straight line across the brows. A wispy fringe takes little hair, has soft ends and lets the forehead show through. A curtain fringe is centre-parted, shortest in the middle and longer towards the cheekbones. Names can differ from place to place.",
    },
    {
      q: "What is a curtain fringe, and why is it easy to grow out?",
      a: "A curtain fringe is parted in the centre, shortest in the middle of the forehead and getting longer towards the sides, framing the cheekbones. The longer it grows, the more it blends into the hair around the face, so the client can simply let it grow. That makes it a good choice for someone who does not want to come back to the salon often.",
    },
    {
      q: "What fringe works with a cowlick?",
      a: "Over a cowlick, short hair stands up or splits. Leave the fringe longer and heavier so the weight pulls it down, or choose a curtain fringe parted in the direction the hair grows. With a strong cowlick, sometimes the best advice is not to have a fringe at all.",
    },
    {
      q: "Why does my fringe end up shorter than I wanted?",
      a: "Because wet hair and stretched hair both get longer. Once dry and released, the fringe shrinks up, sometimes by a whole centimetre, especially over a cowlick. To avoid it, agree the length on dry hair, make the first cut long, use almost no tension and make the final adjustment once the hair is dry.",
    },
    {
      q: "How often does a fringe need trimming?",
      a: "A fringe needs a trim after a few weeks, and a blunt fringe fairly often to keep its line. Many salons offer a quick fringe trim between haircuts. Tell the client before cutting, so she can choose a fringe that fits her habits.",
    },
    {
      q: "How do you blow-dry a fringe so it sits right?",
      a: "Dry the fringe first, while the hair is still wet, because a fringe dries very fast. Point the dryer nozzle downwards, comb the fringe to the left and then to the right a few times, and only then let it settle into place.",
    },
  ],
  related: ["cat-mai", "cat-nu-tang-hieu-dung", "toc-tu-van-chia-vung-hieu-dung", "say-tao-kieu-hieu-dung"],
};

export default article;
