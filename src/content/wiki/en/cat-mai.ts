import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cat-mai/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "how-to-cut-a-curtain-fringe",
  lesson: "cat-mai",
  category: "hair",
  title: "How to cut a curtain fringe: 10 steps to a centre-parted fringe and face-framing pieces",
  metaTitle: "How to cut a curtain fringe: 10 steps without cutting short",
  metaDescription:
    "How to cut a curtain fringe step by step: the triangle section, a long first cut, two diagonal halves, face-framing pieces, then drying and refining dry.",
  keyword: "how to cut a curtain fringe",
  keywords: [
    "curtain fringe step by step",
    "how to trim a curtain fringe",
    "how to cut face-framing pieces",
    "how to style a curtain fringe",
    "curtain fringe for beginners",
    "how to section a fringe",
  ],
  excerpt: "Ten steps to a centre-parted curtain fringe on long hair: a deliberately long cut on damp hair, the diagonals, the blow-dry, and only then the agreed length on dry hair.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("kiem-tra-hai-ben-mai-bay-co-can-khong"),
    alt: "A stylist standing behind a woman with long blonde hair holds the two ends of her curtain fringe at cheekbone height to compare the length of both sides",
  },
  takeaways: [
    "Make the first cut **deliberately long**, at the tip of the nose. Damp hair shrinks as it dries, so do not cut to the agreed length yet.",
    "Comb the fringe down **without tension**, your fingers only lightly supporting it.",
    "Each half of a curtain fringe is cut on a **diagonal** from the middle of the forehead to the cheekbone. The face-framing pieces continue that diagonal.",
    "Dry the fringe first, then refine the length on dry hair, a few millimetres at a time.",
    "Eyes closed while you cut around the face. Scissor tips point sideways, down or outwards, never towards the eyes.",
  ],
  intro: [
    "Learning how to cut a curtain fringe means learning two cuts, not one: the first on damp hair, kept long on purpose, and the second once the hair is blow-dried, bringing the fringe to the length agreed with the client. In between come the diagonals that give the curtain fringe its shape: shortest in the middle of the forehead, longer out towards both cheekbones.",
    "The article follows the VaraaAi Academy lesson “Curtain fringe and face framing: step-by-step practice” in the Hair course, cut on a client with long hair. Follow the ten steps and you can cut a centre-parted curtain fringe with face-framing pieces that flow straight on from it. If you are still deciding which fringe suits a client, or want to understand why fringes so often end up shorter than intended, read the theory article [types of fringe](lesson:cat-mai-hieu-dung).",
  ],
  sections: [
    {
      id: "shape-and-two-cuts",
      title: "A centre-parted curtain fringe: the shape you are after and the two-cut rule",
      blocks: [
        { p: "Before you pick up the scissors, picture the result. The fringe parts exactly in the middle. Its shortest point sits in the middle of the forehead, usually touching the brows or just below them. From there the hair gets longer along a diagonal out to the cheekbones, then joins the face-framing pieces down to the chin or collarbone. The long hair behind hardly changes." },
        {
          table: {
            head: ["Cut", "The hair", "How far"],
            rows: [
              ["First cut", "Slightly damp", "To the tip of the nose; only a temporary length"],
              ["Diagonals on both halves", "Slightly damp", "From the middle of the forehead out to the cheekbone"],
              ["Refining after the blow-dry", "Dry", "Gradually to the agreed length, a few millimetres at a time"],
            ],
          },
        },
        { p: "The reason for this order is simple: damp hair shrinks up as it dries. Cut long first and refine when dry, and you never cut too short." },
        { note: "Fringe cutting methods differ between schools and countries. The lesson is a training aid, not a licence.", kind: "info", title: "Before you start" },
      ],
    },
    {
      id: "three-common-mistakes",
      title: "Three common mistakes when cutting a curtain fringe",
      blocks: [
        {
          table: {
            head: ["Mistake", "What happens", "How to avoid it"],
            rows: [
              ["Pulling the fringe tight and then cutting", "Once released it jumps up shorter than you wanted", "Comb down without tension, fingers only lightly supporting"],
              ["Cutting while the client tilts her head or looks down at her phone", "When she sits up straight the fringe is uneven", "Only cut and compare with the head straight and the eyes ahead"],
              ["Taking hair too far out towards the temples", "The fringe covers the whole face, looks heavy and is very hard to fix", "The corners of the triangle stop at the corners of the forehead, above the outer brows"],
            ],
          },
        },
        { p: "The third mistake is the hardest to fix. That is why you always take less hair first when sectioning." },
      ],
    },
    {
      id: "adjusting-for-each-client",
      title: "Adjusting the fringe for each client: thick or wispy, glasses, cowlicks",
      blocks: [
        { p: "The ten steps stay the same, but a few small decisions change with the person in the chair." },
        {
          ul: [
            "**She wants a thick fringe.** Move the tip of the triangle back a little to take more hair.",
            "**She wants a light, wispy fringe.** Take a shallower triangle with less hair. If it is not enough, add a thin layer from behind.",
            "**She wears glasses.** The fringe should stop a little above the frames, so they do not push it up.",
            "**She has a cowlick at the front hairline.** Tell her beforehand and leave the fringe longer on the cowlick side.",
            "**She often ties her hair up.** Take only thin sections for the face framing. Take too much and when she ties her hair up, a whole panel of short hair hangs down at the sides.",
          ],
        },
        { note: "Hair you have cut cannot be put back, but hair you have not taken can always be added. When you are unsure between two amounts, choose the smaller one.", kind: "tip", title: "Take less first" },
      ],
    },
    {
      id: "styling-and-advice",
      title: "How to style a curtain fringe, and what to tell the client",
      blocks: [
        { p: "A curtain fringe only takes shape when it is dried properly, so the advice matters as much as the cut. Drying at home works exactly as in step 7: dry the fringe first while it is still wet, nozzle pointing down, brush it left and then right, then turn the two halves out to the sides with a round brush. Let the client hold the dryer and try it once herself, right there in the chair. See [how to blow-dry hair](lesson:say-tao-kieu) for the rest of the head." },
        {
          ul: [
            "The longer a curtain fringe gets, the easier it is to live with. If she wants to grow it out, she can; it blends into the hair round the face.",
            "Book her in for a fringe trim after a few weeks.",
          ],
        },
      ],
    },
    {
      id: "safety-and-hygiene",
      title: "Safety around the eyes and tool hygiene",
      blocks: [
        {
          ul: [
            "The client keeps her eyes closed whenever the scissors are near her face. Closed eyes also keep cut hair out of them.",
            "Scissor tips point sideways, down or outwards, never towards the eyes. When point cutting, your fingers stay between the scissors and her face.",
            "Brush cut hair off her face with a soft brush before she opens her eyes.",
            "Neck strips are single-use. Combs, scissors and clips are cleaned and disinfected after every client, as in [how to disinfect tools](lesson:ve-sinh-dung-cu).",
          ],
        },
        { note: "Hygiene rules and the rules for practising the trade differ by country. Check the rules where you work.", kind: "warn", title: "Rules vary" },
      ],
    },
    {
      id: "fringe-trim-service",
      title: "Record the fringe and offer a fringe trim on the booking page",
      blocks: [
        { p: "The fringe is what brings clients back to the salon most often between haircuts. In VaraaAi, note how long the fringe is and which side the cowlick is on in the client's notes in the [customer records](lesson:khach-hang). You can also [create a short service](lesson:dich-vu) called “Fringe trim”, so clients can book their own [appointment](lesson:lich-hen) a few weeks later without having to message first." },
      ],
    },
  ],
  howTo: {
    title: "How to cut a centre-parted curtain fringe: the steps",
    id: "curtain-fringe-steps",
    after: "shape-and-two-cuts",
    lead: "Ten steps in the order of the lesson video, cut on a client with long hair.",
    supplies: [
      "Cutting scissors, tail comb and clips, cleaned and disinfected",
      "Single-use neck strip and cape",
      "Spray bottle to dampen the fringe lightly",
      "Hairdryer and small round brush",
      "Soft brush for clippings on the face",
    ],
    steps: [
      {
        name: "Prepare",
        text: "Wash your hands. The combs, scissors and clips have been cleaned and disinfected since the previous client. Wrap a single-use neck strip round the client's neck, then fasten the cape.",
        image: { src: img("quan-giay-co-truoc-khi-cat-mai"), alt: "A stylist wraps a white neck strip round a woman's neck and fastens a black cape over it before the cut" },
      },
      {
        name: "Consult on dry hair and look for cowlicks",
        text: "Lay the hair on the forehead with your fingers so the client sees where the fringe will stop. With a curtain fringe, the shortest point usually touches the brows or sits just below them. Ask whether she can blow-dry every morning, whether she wears glasses and whether she often ties her hair up. Then lift the hair to look for a cowlick at the front hairline, and if there is one, tell her before you cut.",
        image: { src: img("chi-cho-mai-dung-tren-tran-khach"), alt: "A stylist beside the client lays the dry front hair down on her forehead with both hands to show where the fringe will stop", caption: "Show the length right on the client's face while the hair is dry." },
      },
      {
        name: "Section the triangle",
        text: "Dampen the hair lightly and comb it smooth. Place the point of the tail comb at the corner of the forehead, just above the outer end of the brow, and draw a diagonal up to the tip of the triangle on top of the head, then do the same on the other side. Comb the hair inside the triangle straight down over the face and comb the rest back and clip it. From the front, both sides of the triangle must be equal. Take less hair first; you can always add more.",
        image: { src: img("chia-tam-giac-toc-mai-bang-luoc-duoi-nhon"), alt: "The damp hair of the triangle section combed straight down over the client's face while the stylist holds a black comb and the side hair is clipped back" },
      },
      {
        name: "Make the first cut deliberately long",
        text: "Ask the client to close her eyes and keep her head straight. Comb the fringe straight down the middle of the face without tension. Support the hair lightly with your index and middle fingers at the tip of the nose and cut straight across just below them, the blades parallel to your fingers and the tips pointing sideways. This is only a temporary length, because the hair is damp and will shrink up as it dries.",
        image: { src: img("duong-cat-mai-dau-tien-ngang-dau-mui"), alt: "A client with her eyes closed, the damp fringe combed straight down the middle of her face, while the stylist supports it with two fingers and holds the scissors level at nose height", caption: "The first cut stops at the tip of the nose, scissors level, tips pointing sideways." },
      },
      {
        name: "Cut the two halves on a diagonal",
        text: "Part the fringe exactly in the middle. Comb one half down beside the face and lay two fingers on a diagonal from the middle of the forehead down to the cheekbone. Cut along the outside edge of your fingers, blades parallel to them, low down and away from the client's eyes. Cut the other half at exactly the same angle, then compare it with the first.",
        image: { src: img("cat-cheo-nua-mai-bay-tu-giua-tran-ra-go-ma"), alt: "A client with her eyes closed, one half of the damp fringe combed down beside her face, while the stylist lays her fingers diagonally from forehead to cheekbone and cuts below with the scissors", caption: "Fingers on the diagonal, the scissors following them low down, away from the eyes." },
      },
      {
        name: "Cut the face-framing pieces",
        text: "Release the side clips. Take a thin section in front of the ear and comb it forward over the face. Lay your fingers on a diagonal that continues the fringe line down to the chin or collarbone, as agreed, and cut below your fingers with the scissors pointing down, away from her face. Do the same on the other side. Take only thin sections, so the long hair behind keeps its thickness.",
        image: { src: img("tia-toc-om-quanh-mat-noi-tiep-mai-bay"), alt: "A woman with her eyes closed while the stylist behind her holds a wet section beside her face on a diagonal at chin level and places the scissors below her fingers" },
      },
      {
        name: "Dry the fringe first",
        text: "The fringe dries fastest, so it is dried first. Point the dryer nozzle down the length of the hair. Brush the fringe to the left and dry it, then to the right and dry it, a few times over, so the roots lie flat, including at a cowlick. Then use a small round brush to lift the roots gently and turn the two halves out to the sides, away from the face.",
        image: { src: img("say-mai-bay-bang-luoc-tron-nho"), alt: "A stylist dries a client's fringe with a small round brush and a black dryer pointing downwards while the client relaxes with her eyes closed" },
      },
      {
        name: "Refine the length on dry hair",
        text: "Only now can you see where the fringe really sits. Ask the client to close her eyes, shorten it a few millimetres at a time and let go to look again. Point cut to soften the ends: scissor tips up, small snips into the ends, your fingers between the scissors and her face. Do not point cut too deep, or the fringe goes choppy and thin.",
      },
      {
        name: "Check the symmetry",
        text: "The client sits up straight, head straight, eyes looking ahead into the mirror. Hold both sides of the fringe and compare them at the same point by the cheekbones; trim the side that is longer. Step back to see the whole face, then ask her whether the length is right.",
      },
      {
        name: "Finish and record",
        text: "Brush the clippings gently off her face with a soft brush before she opens her eyes. Show her how to dry the fringe and let her try it once herself. Note in the client record how long the fringe is and which side the cowlick is on, and book a fringe trim in a few weeks. When she has gone, clean and disinfect the combs, scissors and clips.",
      },
    ],
  },
  faq: [
    {
      q: "Should a curtain fringe be cut wet or dry?",
      a: "Both. The first cut and the diagonals are made on slightly damp hair and kept deliberately long, at the tip of the nose. Only after blow-drying is the fringe refined to the agreed length, a few millimetres at a time, because only then can you see where it really sits.",
    },
    {
      q: "How do you section hair for a curtain fringe?",
      a: "Section a triangle: the two bottom corners at the corners of the forehead, just above the outer brows, and the tip on top of the head. Both sides must be equal. For a thicker fringe move the tip back; for a wispy one take a shallower triangle, and always take less hair first.",
    },
    {
      q: "How long should a curtain fringe be?",
      a: "The shortest point in the middle usually touches the brows or sits just below them, then the fringe gets longer out to the cheekbones. If the client wears glasses, the fringe should stop a little above the frames so they do not push it up. The length is agreed on dry hair by laying it on her forehead.",
    },
    {
      q: "Why is my curtain fringe uneven on the two sides?",
      a: "Usually because it was cut or compared while the client was tilting her head or looking down. Have her sit up straight with her eyes looking ahead into the mirror, hold both sides of the fringe and compare them at the same point by the cheekbones. Trim the side that is longer.",
    },
    {
      q: "How do you style a curtain fringe so it parts nicely to the sides?",
      a: "Dry the fringe first while the hair is still wet, with the nozzle pointing down. Brush it left and then right a few times so the roots lie flat, then lift the roots gently with a small round brush and turn the two halves out to the sides, away from the face.",
    },
    {
      q: "Does a curtain fringe need cutting again as it grows?",
      a: "Not necessarily. The longer a curtain fringe gets, the more it blends into the hair around the face, so the client can let it grow. To keep the original length, book a trim after a few weeks.",
    },
  ],
  related: ["cat-mai-hieu-dung", "cat-nu-tang", "say-tao-kieu", "toc-tu-van-chia-vung"],
};

export default article;
