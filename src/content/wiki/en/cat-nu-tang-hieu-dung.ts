import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cat-nu-tang-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "what-is-a-layered-haircut",
  lesson: "cat-nu-tang-hieu-dung",
  category: "hair",
  title: "What is a layered haircut? Elevation at 0°, 45°, 90° and 180°, and how to keep the length",
  metaTitle: "What is a layered haircut? Elevation and keeping length",
  metaDescription:
    "What a layered haircut is, what layers take from the ends, whether fine hair should be layered, elevation at 0°, 45°, 90° and 180°, guidelines and four mistakes.",
  keyword: "what is a layered haircut",
  keywords: [
    "layers vs one-length haircut",
    "should fine hair be layered",
    "haircut elevation angles",
    "layers without losing length",
    "travelling and stationary guideline",
    "face-framing layers",
    "layered haircut mistakes",
  ],
  excerpt: "Layers make hair lighter and fuller but take weight from the ends. Elevation and the direction you pull the hair decide where the layers fall and how much length stays.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("toc-tang-dai-co-tang-om-mat-sau-khi-cat"),
    alt: "A woman with honey-blonde hair past her shoulders, freshly layered, with two face-framing pieces starting at the chin, sitting in a Parisian-style salon",
  },
  takeaways: [
    "Layering makes the upper hair shorter than the hair below. The hair gets lighter and fuller, but **the ends lose some weight**.",
    "Thick, heavy hair suits layers. Fine, thin hair needs **few, long layers**, or the ends turn see-through.",
    "For layers that keep the length, the top is lifted to **180°**, straight up. 90° all over takes the length out of long hair.",
    "The further hair is from a stationary guideline, the longer it stays. Pull the front back to keep length at the front; pull it forward to frame the face.",
    "Starting longer than intended, standing right in front of the section and cross-checking often prevent all four common mistakes.",
  ],
  intro: [
    "What is a layered haircut, and why does nearly every long-haired client ask for one in the same words: lighter, more volume, more movement, but please don't cut it short? Put simply, a layered cut makes the hair on top shorter than the hair underneath, so the lengths overlap like roof tiles. The client's request is entirely possible, as long as the stylist understands one thing really clearly: elevation.",
    "This article follows the VaraaAi Academy lesson “Layered cuts: understand them for lightness and movement without losing length” in the Hair course, the theory half of the topic. By the end you know what layers do and what they take away, how much layering a given head of hair can take, what the four elevations give you, and why the direction you pull the hair decides the length at the front. The hands-on routine is in [how to cut long layers](lesson:cat-nu-tang).",
  ],
  sections: [
    {
      id: "layers-vs-one-length",
      title: "What is a layered haircut, and how is it different from a one-length cut",
      blocks: [
        { p: "In a one-length cut every strand stops at the same line. All the weight sits at the ends, so the line looks thick and heavy, as in a bob." },
        { img: { src: img("toc-cat-bang-duong-vien-thang-goc-0-do"), alt: "A honey-blonde bob seen from behind, the ends forming one thick, even line straight across the middle of the nape", caption: "One-length: every hair stops at one line, and all the weight is at the ends." } },
        { p: "In a layered cut the hair on top is shorter than the hair below. The layers overlap, the ends get lighter, and the hair gains volume and movement. Long hair feels less heavy, lies less flat against the head and is easier to style when blow-drying." },
        { p: "The price of layering is **weight at the ends**. Every extra layer is hair that no longer reaches the perimeter. On thick hair, that is what the client wants. On fine, thin hair, too many layers leave the ends wispy and see-through, looking straggly. So the stylist's first question is how much layering this hair can carry, and only then which style to cut." },
      ],
    },
    {
      id: "which-hair-suits-layers",
      title: "Fine, thick or curly: should your hair be layered",
      blocks: [
        { p: "Before you pick up the scissors, read the hair as described in the article on the [hair consultation](lesson:toc-tu-van-chia-vung-hieu-dung): thick or fine, straight or curly, and where the whorls are. The same layered style on four different heads of hair gives four different results." },
        { img: { src: img("doc-mai-toc-truoc-khi-cat-tang"), alt: "A stylist uses both hands to part a client's dry blonde hair along a straight line on top of the head to see how thick it is" } },
        {
          table: {
            head: ["Hair", "What layers do", "How to cut"],
            rows: [
              ["Thick, heavy", "Lighter, less bulk at the ends", "Suits layers, they can be clearly visible"],
              ["Fine, thin", "Ends easily go wispy and straggly", "Few, long layers to keep the ends thick"],
              ["Curly", "Gives the curls shape", "Cut longer than intended, or dry with a technique you have learned"],
              ["A whorl at the crown", "Short layers there stand straight up", "Keep the layers at the whorl long enough"],
            ],
          },
        },
        { img: { src: img("toc-xoan-co-len-khi-kho"), alt: "A woman with dry chestnut curls while the stylist lifts one curl lightly with a fingertip and it springs back up", caption: "Curly hair shrinks a lot as it dries. The wet length is not the length the client goes home with." } },
        { img: { src: img("xoay-toc-o-dinh-dau"), alt: "Close-up of the crown of a man with dark brown hair, the hair growing in a clockwise spiral from one point", caption: "A whorl at the crown. Layers cut too short here will not lie down." } },
        { note: "A client with fine hair asking for “lots of layers to make it thicker” is a very common situation. Layers do not thicken hair; they take hair away from the ends. Say so before you cut and suggest few, long layers.", kind: "tip", title: "Be honest with fine hair" },
      ],
    },
    {
      id: "elevation",
      title: "Haircut elevation angles: 0°, 45°, 90° and 180°",
      blocks: [
        { p: "Elevation is the angle at which you hold the section away from the head. The higher the hair is lifted when you cut, the more the lengths differ once it falls. The four numbers below are the common names in the trade." },
        {
          table: {
            head: ["Elevation", "How you hold the hair", "Result"],
            rows: [
              ["0°", "Hair falls straight down", "A one-length line, as in a bob"],
              ["45°", "Lifted at a slant in the lower part", "Hair stacks low down and keeps weight; called graduation or low layers"],
              ["90°", "At right angles to the scalp, exactly where you cut", "Even layers following the head shape; suits short and medium hair, long hair loses length"],
              ["180°", "Lifted straight up to the top of the head", "Shortest on top, longer further down; long layers that keep the length"],
            ],
          },
        },
        { img: { src: img("goc-nang-45-do-tang-thap"), alt: "A stylist behind a client lifts a section of wet hair at a slant in the lower back of the head and places the scissors, the upper hair clipped away", caption: "Lifted at a slant low down: the hair stacks and keeps its weight." } },
        { img: { src: img("goc-nang-90-do-vuong-goc-da-dau"), alt: "A stylist pulls a vertical section behind the crown straight back at right angles to the scalp, holding it between two fingers with the comb", caption: "90°: the section at right angles to the scalp exactly where it is being cut." } },
        { img: { src: img("goc-nang-180-do-tang-dai-o-dinh"), alt: "A stylist combs the hair on top of a client's head straight up towards the ceiling, holds it between two fingers and cuts straight across above them", caption: "180°: the top hair lifted straight up. This is the angle for long layers." } },
        { p: "For a long-haired client who wants layers without losing length, the answer on top is 180°. The hair on top sits closest to the cutting point, so it ends up shortest. The lower the hair grows, the further it has to travel to reach the cutting point, so the longer it is once it falls. Cut at 90° all over, and every section is the same length measured from the scalp, so long hair loses its ends." },
        { note: "0°, 45°, 90° and 180° are common names. Every school measures and names them a little differently, and teaching differs between countries, but the idea is the same. This article is a training aid and does not replace a professional qualification.", kind: "info", title: "About the names of the angles" },
      ],
    },
    {
      id: "guidelines-and-over-direction",
      title: "Travelling and stationary guidelines, and over-direction",
      blocks: [
        { p: "A guideline is a cut section you use as the reference for the sections that follow. There are two kinds, and they give very different results." },
        {
          ul: [
            "**Travelling guideline.** Each new section takes in a little of the one just cut and is cut to match it. The guideline moves with you round the head, and the result is even layers.",
            "**Stationary guideline.** The guideline stays in one place, and every section is pulled to exactly that place to be cut. The further a section is from the guideline, the longer it stays.",
          ],
        },
        { p: "A haircut often uses both, travelling in one area and stationary in another. When you use a stationary guideline, you are **over-directing**: moving the hair away from where it naturally falls in order to cut it. The direction you pull decides what ends up long and what ends up short." },
        {
          table: {
            head: ["You want", "Pull the hair", "Result"],
            rows: [
              ["To keep length at the front", "Front hair back, to a guideline at the back", "The front hair stays longer"],
              ["Layers that frame the face", "Forwards", "Short around the face, gradually longer towards the back"],
            ],
          },
        },
        { note: "Many new stylists lose length at the front only because they do not notice which way they are pulling the hair. Before each cut, ask yourself: is this section being moved forwards or backwards from where it falls?", kind: "tip", title: "Always know which way you are pulling" },
      ],
    },
    {
      id: "perimeter-and-face-framing",
      title: "The perimeter first, the layers next, then face-framing layers",
      blocks: [
        { p: "The usual order is to cut the outer perimeter first, at 0°, to exactly the length agreed with the client. The perimeter is the length of the whole haircut. The layers inside are cut afterwards and must connect softly to the perimeter, never cut into it. Layers cut too short for the perimeter leave the ends thin, with a visible break between the two parts." },
        { h3: "Face-framing layers: what the client sees in the mirror every day" },
        { p: "The layers around the face are the part the client notices most. Agree where the shortest layer starts: at the cheekbone, the chin or the collarbone. Then start a little longer than you intend, because you can always go shorter." },
        { p: "Ask too how she wears her hair at home, because the answer changes the cut:" },
        {
          ul: [
            "**She often ties it up.** Side layers that are too short poke out of a ponytail.",
            "**She lets it air-dry.** On straight, fine hair, lots of short layers easily look choppy. Fewer, longer layers are easier to look after.",
            "**She blow-dries every morning.** Layered hair is easier to style with a dryer, so show her how to dry the face-framing pieces. See also [blow-dry styling](lesson:say-tao-kieu-hieu-dung).",
          ],
        },
        { p: "Layer ends cut blunt look crisp. Point cutting the ends of the layers makes them softer, so they blend into each other more naturally." },
        { note: "When cutting the hair at the front of the face, the scissor tips always point away from the client's face, and ask her to close her eyes so cut hair does not fall into them.", kind: "warn", title: "Safety around the face" },
      ],
    },
    {
      id: "common-mistakes",
      title: "Keeping layers even, and four common layered haircut mistakes",
      blocks: [
        { p: "An elevation that is right in theory can still go wrong on the client's head, because three small things shift it without you noticing." },
        {
          ul: [
            "**Tension.** Keep it light and even, as when [cutting a bob](lesson:cat-nu-bang-hieu-dung). Layers cut with strong tension shrink up once dry, shorter and uneven.",
            "**Dampness.** Keep the hair evenly damp with the spray bottle. Where some parts are dry and others wet, the hair stretches and shrinks differently.",
            "**Where you stand.** Your body goes right in front of the section you are cutting. Stand off to one side and your hands pull to that side, changing the elevation without you knowing.",
          ],
        },
        { img: { src: img("xit-am-deu-toc-khi-cat-tang"), alt: "A stylist standing behind a client mists water from a metal spray bottle over blonde hair that has been sectioned and clipped neatly", caption: "Re-mist the parts that have dried before you carry on, so the whole head is equally damp." } },
        { h3: "Cross-checking and balance" },
        { p: "Where you cut with vertical sections, check with horizontal ones, and the other way round. Trim whatever sticks out. Then pull the two shortest pieces at either side of the face down and see whether they are at the same height. After blow-drying, look once more: is the volume even on both sides, and is there a hole anywhere?" },
        { h3: "Four mistakes and what to look at" },
        {
          table: {
            head: ["Mistake", "Why it happens", "How to avoid it"],
            rows: [
              ["Top layers so short they stand up like a hat", "Too much cut on top, especially at the whorl", "Cut a little, let the hair fall and look, then cut more"],
              ["Wispy, see-through ends", "Too many layers for the hair's density, or layers too short for the perimeter", "Few, long layers on fine hair; never cut layers into the perimeter"],
              ["The two sides of the face unbalanced", "Standing off to one side, different tension each side, no comparison", "Same guideline and tension; compare the two shortest pieces in the mirror"],
              ["Lost length at the front", "Over-directing the wrong way", "To keep the front long, pull the front hair back"],
            ],
          },
        },
        { p: "All four come down to three habits: start long, hold the hair at the right angle and check often." },
      ],
    },
    {
      id: "tools-and-client-notes",
      title: "After the cut: tools and notes for next time",
      blocks: [
        { p: "Scissors, combs and clips are cleaned and disinfected after every client as the product instructs, as in the article on [disinfecting tools](lesson:ve-sinh-dung-cu). Hygiene rules and the rules for practising the trade differ by country, so check the rules where you work." },
        { p: "A layered cut can only be repeated exactly when you remember two things: the length, and where the face framing starts. In VaraaAi, note both in the client's notes in the [customer records](lesson:khach-hang) and read them again when she has her next [appointment](lesson:lich-hen), so you can cut it the same way. If the salon's booking page does not yet list a layered cut, [add the service](lesson:dich-vu) with a duration long enough for the consultation and the blow-dry." },
      ],
    },
  ],
  faq: [
    {
      q: "What is a layered haircut, and how is it different from a one-length cut?",
      a: "In a one-length cut every strand stops at the same line, so the ends are thick and heavy. In a layered cut the hair on top is shorter than the hair below and overlaps it like roof tiles. The hair gets lighter, with volume and movement, but the ends lose some of their weight.",
    },
    {
      q: "Should fine hair be layered?",
      a: "It can be, with few, long layers. Layers take weight away from the ends, so lots of layering on fine, thin hair leaves the ends wispy and see-through. Layers do not make hair thicker.",
    },
    {
      q: "Does a layered haircut make your hair shorter?",
      a: "Not necessarily. On long hair, the stylist cuts the perimeter to the agreed length and lifts the top straight up to 180° for long layers: shortest on top, getting longer further down. Length is only lost when the whole head is cut at 90° or when the layers cut into the perimeter.",
    },
    {
      q: "What is the difference between 90° and 180° elevation?",
      a: "At 90° the section is held at right angles to the scalp where you cut, giving even layers that follow the head shape, which suits short and medium hair. At 180° the hair is lifted straight up to the top of the head, giving long layers that keep the length. These are common names, and schools measure them a little differently.",
    },
    {
      q: "Why do my top layers stick up?",
      a: "Because the layers on top were cut too short, usually right at the whorl. Short hair at a whorl is not heavy enough to lie down. To avoid it, cut a little first, let the hair fall and look, and keep the hair at the whorl long enough.",
    },
    {
      q: "What should you watch for when layering curly hair?",
      a: "Layers give curls their shape, but curly hair shrinks a lot as it dries. So the stylist cuts it longer than intended, or cuts it dry with a technique they have learned, so the dry length is what the client wanted.",
    },
  ],
  related: ["cat-nu-tang", "toc-tu-van-chia-vung-hieu-dung", "cat-nu-bang-hieu-dung", "cat-mai-hieu-dung"],
};

export default article;
