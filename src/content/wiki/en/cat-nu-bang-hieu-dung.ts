import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cat-nu-bang-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "what-is-a-bob-haircut",
  lesson: "cat-nu-bang-hieu-dung",
  category: "hair",
  title: "What is a bob haircut? One-length, A-line and graduated bobs, and why the line goes uneven",
  metaTitle: "What is a bob haircut? One-length, A-line and graduated",
  metaDescription:
    "What a bob haircut and a one-length cut are, the three common bob shapes, choosing the length by neck, nape and shoulders, zero elevation and why bobs go uneven.",
  keyword: "what is a bob haircut",
  keywords: [
    "what is a one-length haircut",
    "types of bob haircut",
    "what is an A-line bob",
    "graduated bob",
    "shoulder-length hair flicking out",
    "bob haircut for curly hair",
    "why is my bob uneven",
  ],
  excerpt: "A bob has only one line, so the slightest error shows. What a one-length cut is, the three bob shapes and the small details that keep the line straight and balanced.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("toc-bob-bang-ngang-cam-duong-cat-thang"),
    alt: "A woman with honey-blonde hair sits beside a gold-framed oval mirror, wearing a centre-parted one-length bob with the ends cut straight just below the chin",
  },
  takeaways: [
    "One-length means every hair, falling naturally, stops at **the same line**. Cut to around the chin, it is usually called a bob.",
    "Agree the length with a **touch point** on the client, such as at the chin, never with words like “short” or “a little”.",
    "A one-length cut follows the natural fall at **zero elevation**, with light, even tension. Lift the hair even slightly and you get layers.",
    "Hair that stops right on the shoulders hits them and flicks out. Go above the shoulders or clearly below them.",
    "Never pull the hair tight over the ear, and always straighten the client's head before you compare the two sides.",
  ],
  intro: [
    "What is a bob haircut? It is a one-length cut worn short, to around the chin: all the hair falls to the same line, with no layers. It sounds like the easiest cut there is. Yet precisely because there is only one line, the client sees it in the mirror straight away if that line is even slightly off.",
    "This article follows the VaraaAi Academy lesson “One-length cuts and bobs: understand them for a straight, balanced line” in the Hair course, the theory half of the topic. By the end you can tell the three bob shapes apart, advise on length by looking at the client's neck, nape and shoulders, and understand the small details that decide the line: elevation, tension, the guideline and head position. The cut itself, step by step, is in [how to cut a bob](lesson:cat-nu-bang).",
  ],
  sections: [
    {
      id: "what-is-one-length",
      title: "What is a one-length haircut, and when is it a bob",
      blocks: [
        { p: "In a one-length cut, every strand, falling naturally, stops at the same line. That line can sit at the shoulders, at the collarbone, or as short as around the chin. Cut to around the chin, it is usually called a bob." },
        { p: "A correct one-length line shows itself in three ways. From behind, it runs straight across. From the side, it is parallel to the floor. And the ends look thick, heavy and shiny, because every hair finishes in the same place." },
        { img: { src: img("toc-bob-bang-nhin-tu-phia-sau-duong-cat-ngang"), alt: "A honey-blonde bob seen straight from behind, the ends forming one level line across the middle of the neck above the collar of a black cape", caption: "From behind: one straight line across, with thick, even ends." } },
      ],
    },
    {
      id: "types-of-bob",
      title: "Types of bob haircut: one-length, A-line and graduated",
      blocks: [
        { p: "Three bob shapes come up again and again in the salon. The one-length bob is the base of the other two, which is why training usually starts with it." },
        {
          table: {
            head: ["Bob shape", "Cutting line", "How it looks"],
            rows: [
              ["One-length bob", "One level line all round the head", "Neat and crisp, with heavy ends"],
              ["A-line bob", "A diagonal: shorter at the back, getting longer towards the face", "In profile the ends slope down towards the chin"],
              ["Graduated (stacked) bob", "The nape is cut with a little elevation so the hair stacks", "Rounded volume at the back of the head"],
            ],
          },
        },
        { img: { src: img("toc-bob-chu-a-sau-ngan-truoc-dai"), alt: "A woman with dark brown hair and a blunt fringe, seen in profile, wearing an A-line bob that is short at the nape and grows longer towards the chin", caption: "A-line bob: a diagonal line, short at the back and longer at the front." } },
        { img: { src: img("toc-bob-xep-tang-phong-o-gay"), alt: "A blonde woman in profile with a graduated bob, the hair at the nape cut short and stacked to give rounded volume at the back of the head", caption: "Graduated bob: stacked at the nape, rounded at the back." } },
        { note: "The names of bob shapes and the way they are taught differ between schools and countries. When a client asks for a style by name, look at a reference photo together rather than trusting the name. This article is a training aid and does not replace a professional qualification.", kind: "info", title: "Names vary" },
      ],
    },
    {
      id: "choosing-the-length",
      title: "Choosing bob length: touch point, neck, nape whorls and shoulders",
      blocks: [
        { p: "Going from long hair to a bob is a huge change, so the length has to be agreed very clearly. Hold a section of hair, fold it up to exactly the spot and ask: we are cutting to here, at the chin, is that right? Agreeing by touch point is covered in detail in the article on the [hair consultation](lesson:toc-tu-van-chia-vung-hieu-dung)." },
        { img: { src: img("thong-nhat-do-dai-toc-bob-bang-diem-cham-ngang-cam"), alt: "A stylist holds a flat hand just below the chin of a smiling client with long hair, showing the length that will be cut", caption: "A touch point at the chin: show it on the client instead of saying “short” or “a little”." } },
        { p: "Also ask whether she often ties her hair up or tucks it behind her ears. A chin-length bob can hardly be tied up any more, and she needs to know that before you cut. Then read her build:" },
        {
          ul: [
            "**A long neck or a short neck.** Wherever the bob line stops on the neck is where the eye stops.",
            "**A whorl at the nape.** If the hair at the nape grows upwards, a bob line that is too short there easily kicks out. Keep the line below the whorl, or a little longer.",
            "**The shoulders.** Hair that stops right on the shoulders hits them with every movement and flicks outwards. Choose above the shoulders, or well past them.",
          ],
        },
        { img: { src: img("xoay-o-chan-toc-gay-truoc-khi-cat-bob"), alt: "A stylist lifts all of a client's blonde hair high with one hand, revealing the nape and the hairline at the back of the neck", caption: "Lift the hair and look at the nape hairline before deciding where the bob line will sit." } },
      ],
    },
    {
      id: "zero-elevation-and-tension",
      title: "Zero elevation and tension: why a one-length cut is combed straight down",
      blocks: [
        { p: "A one-length cut follows the natural fall of the hair. You comb the hair straight down, exactly where it falls, at 0° elevation, meaning you do not lift it at all. Lift it even a little and the layers end up at different lengths once they drop, and the line turns into layers. How elevation creates layers is explained in [what is a layered haircut](lesson:cat-nu-tang-hieu-dung)." },
        { p: "Tension has to be light and even as well. Pull too tight, especially on wet hair, and once it dries the hair shrinks up, shorter than intended and uneven." },
        { h3: "Wet hair, dry hair and curly hair" },
        { p: "Straight hair also shrinks up a little as it dries. Wavy and curly hair shrink far more. So with curly hair, a stylist leaves it longer than intended, or cuts it dry using a technique they have been trained in." },
        { img: { src: img("toc-xoan-khi-uot-keo-thang-dai-qua-vai"), alt: "A woman with wet chestnut curls while the stylist pulls one curl straight down, the stretched curl reaching past her shoulder", caption: "Curly hair when wet: stretched straight, it reaches past the shoulders." } },
        { img: { src: img("toc-xoan-khi-kho-co-len-ngan-hon"), alt: "The same woman with her hair dry, brown curls springing up around her chin and shoulders while the stylist lifts one curl lightly with a fingertip", caption: "The same hair dry: the curls spring up, much shorter than when wet." } },
      ],
    },
    {
      id: "guideline-and-head-position",
      title: "The stationary guideline at the nape and the client's head position",
      blocks: [
        { p: "Once the hair is sectioned cleanly and straight, the stylist starts at the nape with a very thin horizontal section. That is the **guideline**. Every following layer is combed straight down and cut exactly to it. The guideline stays in one place and the other layers come to it, which is why it is called a stationary guideline." },
        { img: { src: img("lop-toc-chai-thang-xuong-phu-len-duong-chuan-o-gay"), alt: "From behind, the client's hair is clipped up high while the stylist holds a thin layer combed straight down onto the nape with a black comb, the ends cut level", caption: "A thin layer combed straight down at the nape. With a thin section, the guideline underneath stays visible." } },
        { p: "Sections have to be thin because you need to see the guideline through the hair. With thick sections, you are guessing." },
        { h3: "Chin down for the nape, head upright for the sides" },
        { p: "For the nape, the client tips her head forward slightly, chin a little down. The nape flattens, the hair lies close to the neck and the line is easy to see. But however far she bends, the line changes when she lifts her head again. So she bends moderately and holds that same position until the back is finished." },
        { p: "Before you move to the sides, ask her to lift her head straight again, sit up straight and uncross her legs. Uneven shoulders or a tilted head mean an uneven line." },
        { h3: "The ears" },
        { p: "The ear sticks out and pushes the hair outwards. Pull the hair tight over the ear and cut, and when you let go the ear pushes it up, leaving a gap right above the ear. Around the ear, comb the hair to fall naturally and hold it very lightly, without tension. Some stylists support the hair with the comb against the skin before cutting." },
      ],
    },
    {
      id: "why-bobs-go-uneven",
      title: "Why is my bob uneven or flicking out, and how to check it",
      blocks: [
        {
          table: {
            head: ["What you see", "Cause", "How to avoid it"],
            rows: [
              ["The line turns into layers, thin ends", "The hair was lifted slightly while cutting", "Comb straight down, 0° elevation"],
              ["Shorter and uneven once dry", "Wet hair pulled tight", "Light, even tension; leave curls longer"],
              ["A gap just above the ear", "Hair pulled tight over the ear", "Let it fall naturally at the ear, hold it lightly"],
              ["One side longer than the other", "Tilted head, uneven shoulders, crossed legs", "Client sits straight, head upright before the sides"],
              ["Ends kicking up at the nape", "A nape whorl and a bob line that is too short", "Keep the line below the whorl"],
              ["Ends flicking outwards", "Hair stopping right on the shoulders", "Above the shoulders or clearly below"],
            ],
          },
        },
        { p: "Checking is a job for the whole service, not just the end. After each side, compare both sides in the mirror: hold the two front ends in front of the face at the same height. Then look from behind and from the side, on each side. The line must be continuous, with no corners and no steps." },
        { img: { src: img("so-hai-duoi-toc-bob-truoc-mat-khach"), alt: "A stylist standing behind a client who looks straight ahead holds the two ends of her bob at either side of her chin to compare their length", caption: "Head straight, eyes forward, both ends compared at the same height." } },
        { note: "Tilt the head a little and the sides look uneven even when you cut them correctly. Always straighten the client's head before you compare.", kind: "tip", title: "From the trade" },
        { p: "After blow-drying, check once more, because now the hair lies exactly as the client will see it at home. Trim the odd stray strand lightly with the tips of the scissors. If she prefers softer ends, point cut: turn the scissors up and snip small notches into the ends, so the line is less harsh but keeps its shape. If she likes a crisp, sharp bob, keep the line blunt and do not point cut." },
      ],
    },
    {
      id: "safety-and-records",
      title: "Safety, hygiene and recording the length for next time",
      blocks: [
        { note: "When cutting close to the neck, your fingers always stay between the blade and the client's skin, and the tips of the scissors never point towards her face. Scissors, combs and clips are cleaned and disinfected after every client as the product instructs, and neck strips are single-use. Rules differ by country; see also [how to disinfect tools](lesson:ve-sinh-dung-cu).", kind: "warn", title: "Safety close to the neck" },
        { p: "A beautiful bob line does not come from expensive scissors. It comes from thin sections, light tension, the right head position and checking many times. In VaraaAi, note the length you cut and the touch point in the client's notes in the [customer records](lesson:khach-hang), so whoever cuts next time gets it right. If the salon offers both a new bob and a bob trim, list them as two services with their own durations in the [service menu](lesson:dich-vu), and put the next trim in the salon's [appointment calendar](lesson:lich-hen) while the client is still at the desk." },
      ],
    },
  ],
  faq: [
    {
      q: "What is a bob haircut?",
      a: "A bob is a one-length cut worn short, to around the chin. One-length means every hair, falling naturally, stops at the same line, with no layers. From behind the line runs straight across, and from the side it is parallel to the floor.",
    },
    {
      q: "What is the difference between a one-length, an A-line and a graduated bob?",
      a: "A one-length bob has a level line all round the head. An A-line bob has a diagonal line, shorter at the back and getting longer towards the face. A graduated bob has the nape cut with a little elevation, so the hair stacks and gives rounded volume at the back. Names can differ from place to place.",
    },
    {
      q: "Why does shoulder-length hair flick out?",
      a: "Because the ends stop right on the shoulders. With every movement they hit the shoulders and flick outwards. For a one-length cut it is better to choose a length above the shoulders or clearly below them.",
    },
    {
      q: "Can you cut a bob on curly hair?",
      a: "Yes, but you have to allow for shrinkage. Wavy and curly hair spring up far more than straight hair as they dry, so the stylist leaves the hair longer than intended, or cuts it dry with a technique they have been trained in. The client should hear this during the consultation.",
    },
    {
      q: "Can you tie your hair up after a bob haircut?",
      a: "A chin-length bob can hardly be tied up any more. That is why the stylist should ask, before cutting, whether the client often ties her hair up or tucks it behind her ears, and only then agree the length.",
    },
    {
      q: "Why is a one-length cut uneven on the two sides?",
      a: "The usual cause is posture: a tilted head, uneven shoulders or crossed legs while the sides are cut. Pulling wet hair tight, or pulling hair tight over the ear, also makes it shorter once released. Seat the client straight, keep the tension light and compare both front ends with her head straight.",
    },
  ],
  related: ["cat-nu-bang", "toc-tu-van-chia-vung-hieu-dung", "cat-nu-tang-hieu-dung", "cat-mai-hieu-dung"],
};

export default article;
