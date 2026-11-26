import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cat-nu-bang/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "how-to-cut-a-bob",
  lesson: "cat-nu-bang",
  category: "hair",
  title: "How to cut a bob: 10 steps to a straight, balanced chin-length line",
  metaTitle: "How to cut a bob: 10 steps from the nape to the front",
  metaDescription:
    "How to cut a one-length bob step by step: agree a touch point, section, cut the nape guideline at zero elevation, then the back, sides and ears, and check it dry.",
  keyword: "how to cut a bob",
  keywords: [
    "how to cut a one-length haircut",
    "how to cut hair straight across",
    "chin-length bob",
    "how to cut shoulder-length hair",
    "bob haircut step by step",
    "cutting long hair into a bob",
    "how often to trim a bob",
  ],
  excerpt: "Long hair cut into a chin-length one-length bob in ten steps: a guideline at the nape, thin layers combed straight down, the sides, then a final check once dry.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-toc-va-khach-voi-kieu-bob-bang-vua-cat"),
    alt: "A stylist in a cream silk blouse stands behind a blonde client with a freshly cut chin-length one-length bob, both smiling in a Parisian-style salon",
  },
  takeaways: [
    "Fix the length with a **touch point** while the hair is still dry: fold a section up to the chin and say the length back to the client.",
    "The guideline is one very thin horizontal section at the nape, combed straight down at **zero elevation** with very light tension.",
    "Every following layer is combed down over the guideline and cut exactly to it. At the occipital bone, lift even slightly and you get layers.",
    "Chin slightly down for the nape; before the sides, the client **lifts her head straight**, sits up and uncrosses her legs.",
    "Blow-dry and check again, because only then does the hair sit as the client will see it at home.",
  ],
  intro: [
    "Learning how to cut a bob is not about any single difficult cut. The hard part is getting dozens of sections, cut at different moments, to stop at one straight line. To do it, the stylist builds a guideline at the nape and brings each layer down to exactly that line, without lifting and without tension.",
    "This article follows the routine of the VaraaAi Academy lesson “One-length cuts and bobs: step-by-step practice” in the Hair course, in which long hair is cut into a chin-length one-length bob. Follow it and you can cut the whole style and check the line from all three sides yourself. Why it has to be zero elevation and why the client has to sit straight are explained in the theory article [what is a bob haircut](lesson:cat-nu-bang-hieu-dung).",
  ],
  sections: [
    {
      id: "before-you-cut",
      title: "Before cutting long hair into a bob",
      blocks: [
        { p: "Going from long hair to a bob, a lot of length comes off, and three things are best decided before you pick up the scissors." },
        {
          ul: [
            "**Take off the extra length first.** Many stylists first cut away some of the long ends, leaving the hair a few centimetres longer than the bob line, so it is easier to handle. This is not yet the real line.",
            "**Does the client want to keep her hair.** If so, ask before the shampoo, tie the hair into a ponytail and cut it while it is still dry.",
            "**Curly or wavy hair.** Tell the client beforehand that the hair shrinks up once dry, so you will leave it a little longer.",
          ],
        },
        { p: "The consultation and the sectioning are done as in the articles on the [hair consultation](lesson:toc-tu-van-chia-vung-hieu-dung) and [how to section hair for cutting](lesson:toc-tu-van-chia-vung)." },
      ],
    },
    {
      id: "thin-sections-damp-hair",
      title: "Thin sections and evenly damp hair: two conditions for a one-length cut",
      blocks: [
        { p: "A one-length line depends entirely on seeing the guideline underneath the hair you are holding. So the sections have to be clipped neatly and flat against the head, and you only ever let down one thin horizontal section at a time." },
        { img: { src: img("chia-vung-toc-kep-gon-truoc-khi-cat-bob"), alt: "Seen from behind, a client's damp blonde hair divided by straight partings, each section clipped neatly with silver clips", caption: "Neatly clipped sections and straight partings. The lowest hair at the nape is let down first." } },
        { img: { src: img("tha-lon-ngang-mong-o-gay-de-cat-duong-chuan"), alt: "A stylist beside a client whose hair is clipped up on top combs a thin layer of hair at the nape straight down against the neck with a black comb", caption: "One thin horizontal section at the nape combed straight down, everything else clipped up." } },
        { p: "The layers at the back are about one to two centimetres thick. With thick hair, take even thinner layers. The hair only needs to be evenly damp, never dripping. As it dries while you work, mist it again, so every layer meets the blade at the same dampness." },
      ],
    },
    {
      id: "three-common-mistakes",
      title: "Three common mistakes when cutting a bob",
      blocks: [
        {
          table: {
            head: ["Mistake", "Result", "How to avoid it"],
            rows: [
              ["Lifting the hair slightly without noticing, especially at the occipital bone", "The line turns into layers and the ends lose their weight", "Comb really straight down, close to the layer below"],
              ["Pulling hair tight over the ear", "Once released it springs up, leaving a gap just above the ear", "Hold the hair very lightly at the ear and let it fall naturally"],
              ["A tilted head, or the client crossing her legs", "The two sides end up uneven without you knowing", "Client sits straight, head upright before the sides and before comparing"],
            ],
          },
        },
        { p: "All three are avoided with the same habits: thin sections, light hands and frequent looks in the mirror." },
      ],
    },
    {
      id: "trim-when-dry",
      title: "Trimming once dry: stray hairs and point cutting",
      blocks: [
        { p: "Hair shrinks as it dries and settles into its real fall. Strands that stick out of the line only show clearly now. Comb the hair straight down, look at the line again and snip the strays one by one with the tips of the scissors." },
        { img: { src: img("tia-soi-toc-loi-ra-khi-toc-bob-da-kho"), alt: "A stylist combs the dry ends of a client's bob straight down with a black comb in one hand and brings the scissors close to the line with the other", caption: "Dry hair: comb straight down and take only the strands that stick out." } },
        { p: "Point cutting into the ends is a different job, and is only done when the client wants softer ends. Then you point cut very lightly at the ends. If she likes a crisp, sharp bob, keep the line blunt." },
      ],
    },
    {
      id: "safety-and-hygiene",
      title: "Safety and hygiene when cutting close to the neck",
      blocks: [
        { note: "Your fingers always stay between the blade and the client's skin, especially when cutting the guideline close to the neck. Cut only to the length agreed with the client. Scissors, combs and clips are cleaned and disinfected after every client as the product instructs, and neck strips are single-use. Rules differ by country; see also [how to disinfect tools](lesson:ve-sinh-dung-cu).", kind: "warn", title: "Do not skip" },
        { p: "Bob names and teaching methods differ between schools and countries. This article is a training aid and does not replace a professional qualification." },
      ],
    },
    {
      id: "rebooking-the-trim",
      title: "How often to trim a bob, and what to note in the client record",
      blocks: [
        { p: "Many clients come back for a trim after about 6–8 weeks to keep the line. That is a common habit, not a rule. Before the client leaves, show her how to blow-dry at home: in the direction the hair falls, turning the ends gently under." },
        { p: "In VaraaAi, note the length you cut and the touch point in the client's notes in the [customer records](lesson:khach-hang), so whoever cuts next time gets it right. When she pays, suggest booking the next trim straight away in the [appointment calendar](lesson:lich-hen). If the salon prices a new cut and a trim separately, give each its own duration in the [service menu](lesson:dich-vu)." },
      ],
    },
  ],
  howTo: {
    title: "How to cut a chin-length bob: the steps",
    id: "bob-haircut-steps",
    after: "before-you-cut",
    lead: "Ten steps in the order of the lesson video: the back first, the sides next, and two checks, one wet and one dry.",
    supplies: [
      "Cutting scissors, cutting comb and tail comb, cleaned and disinfected",
      "Sectioning clips",
      "Fine-mist spray bottle and towel",
      "Hairdryer and round brush",
      "Single-use neck strip and cape",
      "Hand mirror",
    ],
    steps: [
      {
        name: "Wash your hands and wrap the neck strip",
        text: "Wash your hands and check that the scissors, combs and clips have been cleaned and disinfected since the previous client. Wrap a single-use neck strip round the client's neck, and only then fasten the cape over it.",
        image: { src: img("quan-giay-co-truoc-khi-cat-toc-bob"), alt: "A stylist fastens a black cape round the neck of a blonde client, a white paper strip wrapped close to her neck inside the collar" },
      },
      {
        name: "Consult and fix the touch point",
        text: "Consult while the hair is dry: look at the reference photo and ask whether she ties her hair up or tucks it behind her ears. Fold a section up to the chin and say the length back to her. Check the nape hairline for whorls and look at her neck and shoulders.",
      },
      {
        name: "Shampoo, detangle and keep the hair evenly damp",
        text: "Shampoo, blot with a towel and detangle from the ends upwards. The hair only needs to be evenly damp, not dripping. If it is very long, take off the extra length first, leaving it a few centimetres longer than the bob line.",
      },
      {
        name: "Make a centre parting and section",
        text: "Part the hair in the centre from the front hairline to the crown, then divide the sections and clip each one neatly and flat against the head. At the back, let down one very thin horizontal section at the nape and clip everything else up.",
        image: { src: img("re-ngoi-giua-bang-duoi-luoc-truoc-khi-chia-vung"), alt: "Seen from above, a stylist draws a centre parting through a client's damp blonde hair with the pointed tail of a comb", caption: "The centre parting drawn with the tail of the comb, from the front hairline to the crown." },
      },
      {
        name: "Cut the guideline at the nape",
        text: "Ask the client to tip her head forward slightly, chin a little down, and hold still. Comb the section straight down against the neck at 0° elevation and hold it between your index and middle fingers, fingers horizontal, with very light tension. Cut a straight horizontal line just below your fingers, centre first, then the sides to match the centre. For a chin-length bob the nape line usually sits around the middle of the neck or lower, depending on the agreed shape. Check straight away that both ends are level and the line is parallel to the floor.",
        image: { src: img("cat-duong-chuan-o-gay-goc-nang-0-do"), alt: "Close-up of a client's nape: the stylist's hand holds a thin section flat against the neck between two fingers while the scissors cut straight across just below them", caption: "Fingers horizontal, hair held close to the neck. The blade runs parallel to the fingers, below them." },
      },
      {
        name: "Cut the back layers",
        text: "Let down the next horizontal section and comb it straight down over the guideline. Look through the thin layer to see the guideline underneath and cut exactly to it, with no lifting and no tension. Work layer by layer up to the occipital bone and then to the crown, with the client holding her head in the same position. At the occipital bone the head curves out and the hair is easily pulled outwards with it, so comb really straight down, close to the layer below.",
      },
      {
        name: "Cut the sides",
        text: "Ask the client to lift her head straight again, sit up straight and uncross her legs. Let down the lowest horizontal section by the ear, comb it down, take a little of the already cut hair from the back as a guide and continue the line forwards to the chin. At the ear, never pull the hair tight over it. Work layer by layer up to the parting, then do exactly the same on the other side.",
        image: { src: img("cat-hai-ben-toc-bob-ngang-cam"), alt: "A client sits upright in profile with her damp blonde hair combed straight down while the stylist lightly holds the side layer and cuts straight across at chin height", caption: "Head straight, side hair falling naturally, the line connected from the back to the front." },
      },
      {
        name: "Check both sides and the back",
        text: "Stand behind the client and look in the mirror, her head straight and eyes forward. Hold the two ends at either side of the chin to compare their height, and trim the longer side a little at a time. Comb the hair straight down and look from behind and from each side: the line must be straight, continuous and parallel to the floor. Just behind the ear, where the back meets the sides, there is often a small corner; trim it lightly so the line flows.",
        image: { src: img("toc-bob-bang-nhin-nghieng-song-song-voi-san"), alt: "A blonde client in profile, head upright, her one-length cut showing an even line of ends running level from the nape to the front", caption: "In profile: the ends run level, parallel to the floor, with no step behind the ear." },
      },
      {
        name: "Blow-dry and check it dry",
        text: "Dry in the direction the hair falls, from top to bottom, turning the ends gently under with a round brush. Once dry, comb the hair straight down and look at the line again. Snip any strand that sticks out with the tips of the scissors; if she wants softer ends, point cut very lightly into them.",
        image: { src: img("say-toc-bob-bang-luoc-tron-cuon-duoi-vao-trong"), alt: "A stylist with a black hairdryer and a round brush blow-dries a client's blonde bob, the ends curving gently round the brush" },
      },
      {
        name: "Finish, record and clean up",
        text: "Brush the loose hair off the neck and show her the back with a hand mirror. Ask if she would like anything adjusted and do it then and there, then show her how to blow-dry it at home. Write the length you cut in the client record. Once she has gone, clean and disinfect the scissors, combs and clips, throw away the neck strip and sweep up the hair under the chair.",
      },
    ],
  },
  faq: [
    {
      q: "Where do you start when cutting a bob?",
      a: "At the nape. After sectioning, the stylist lets down one very thin horizontal section at the nape, combs it straight down at zero elevation and cuts a straight line across: that is the guideline. The back layers, and then the sides, are all cut exactly to it.",
    },
    {
      q: "Should a one-length cut be done on wet or dry hair?",
      a: "In the lesson's routine the hair is shampooed and kept evenly damp, never dripping, and misted again as it dries. After blow-drying, the line is checked once more, because hair shrinks as it dries and stray strands only show clearly then. Curly and wavy hair shrink more, so they are left a little longer.",
    },
    {
      q: "Is cutting shoulder-length hair different from cutting a chin-length bob?",
      a: "The one-length technique is the same: a guideline at the nape, layers combed straight down at zero elevation and cut exactly to it. What changes is the touch point agreed with the client. Bear in mind that hair stopping right on the shoulders hits them and flicks out, so a length above the shoulders or clearly below is usually chosen.",
    },
    {
      q: "Why is there a gap above the ear after cutting a bob?",
      a: "Because the hair was pulled tight over the ear while cutting. The ear sticks out, so once released the hair springs up and ends up shorter than the rest. At the ear, hold the hair very lightly and let it fall naturally before you cut.",
    },
    {
      q: "What if the client wants to keep her long hair?",
      a: "Ask before the shampoo. If she wants to keep it, tie the hair into a ponytail and cut it while still dry, then shampoo and cut the bob line. Cut the ponytail a few centimetres longer than the bob line, because the real line is cut afterwards.",
    },
    {
      q: "How often should a bob be trimmed?",
      a: "Many clients come back for a trim after about 6–8 weeks to keep the line. It is a common habit rather than a rule, and depends on how crisp each person wants the bob line to stay.",
    },
  ],
  related: ["cat-nu-bang-hieu-dung", "toc-tu-van-chia-vung", "cat-nu-tang", "say-tao-kieu"],
};

export default article;
