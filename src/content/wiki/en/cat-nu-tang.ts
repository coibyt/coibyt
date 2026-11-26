import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cat-nu-tang/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "how-to-cut-long-layers",
  lesson: "cat-nu-tang",
  category: "hair",
  title: "How to cut long layers: 10 steps to face-framing layers that keep the length",
  metaTitle: "How to cut long layers: 10 steps that keep the length",
  metaDescription:
    "How to cut long layers step by step: touch points, the perimeter at 0°, top layers at 180°, sides over-directed back to keep the front long, then face framing.",
  keyword: "how to cut long layers",
  keywords: [
    "how to cut layers in long hair",
    "layered haircut step by step",
    "how to cut face-framing layers",
    "long layered haircut",
    "how to cut layers for beginners",
    "how often to trim long layers",
  ],
  excerpt: "A long layered cut with face framing in ten steps: the perimeter first, the top at 180°, the sides over-directed back, and only then the hair around the face.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-toc-va-khach-voi-kieu-toc-tang-dai"),
    alt: "A stylist with a brown bob stands behind a blonde client with freshly cut long layers, both smiling in a Parisian-style salon with purple velvet curtains",
  },
  takeaways: [
    "Agree with **touch points** while the hair is dry: where the ends will stop and where the face framing starts.",
    "Cut the **outer perimeter first**, at 0°. It is the length of the whole haircut, and the layers must never cut into it.",
    "Long layers on top: comb straight up to **180°**, gather to one point, take a little and let it down to look.",
    "Over-direct the sides back to keep the front long. For face framing, pull forwards, eyes closed, scissor tips away from the face.",
    "Always start long. You can go shorter at any time; going longer means waiting for the hair to grow.",
  ],
  intro: [
    "This guide on how to cut long layers is for the request heard most often in the chair: a long-haired client wants hair that is lighter and fuller, with face-framing layers, but does not want to lose length. The style is cut in four parts, each with its own elevation and direction of pull, and each part builds on the one before.",
    "The article follows the VaraaAi Academy lesson “Layered cuts: step-by-step practice” in the Hair course. Follow the ten steps below and you can cut a complete long layered style, from wrapping the neck strip to writing up the client record. The reasons behind each elevation are in the theory article [what is a layered haircut](lesson:cat-nu-tang-hieu-dung); read it first if guidelines and over-direction are new to you.",
  ],
  sections: [
    {
      id: "four-parts",
      title: "This long layered haircut is cut in four parts",
      blocks: [
        { p: "Before going into the steps, look at the whole style as a plan. Each part has its own job, and each one builds on the one before." },
        {
          table: {
            head: ["Part", "How you hold the hair", "What it does"],
            rows: [
              ["Outer perimeter", "Combed straight down, 0°", "Sets the length of the whole haircut"],
              ["Top layers", "Combed straight up to 180°, gathered to one point above the head", "Shortest on top, longer further down, blending into the perimeter"],
              ["Sides", "Sections in front of the ear over-directed back to a guide behind the ear", "Keeps the length at the front"],
              ["Face framing", "Front section combed forward over the face, cut on a diagonal", "Short around the face, longer towards the back"],
            ],
          },
        },
        { p: "Beginners often want to cut around the face first, because it is the most visible part. Leave it until last. Only once the perimeter and the layers behind are done do you know what the face framing has to connect to." },
        { note: "Elevation names and teaching methods differ between schools and countries. This article is a training aid and does not replace a professional qualification.", kind: "info", title: "Before you start" },
      ],
    },
    {
      id: "three-habits",
      title: "Three habits that keep the layers even all the way through",
      blocks: [
        { p: "You can follow the ten steps in the right order and still end up with uneven layers if these three habits are missing. They do not belong to any one step; they come with you from the first cut to the last." },
        {
          ol: [
            "**Stand in the right place.** Move round the client so your body is always right in front of the section you are cutting. Stand off to one side and your hands pull to that side without you noticing.",
            "**Hold the elevation.** Over a long cut your arm tires and drops little by little. When the elevation changes, so do the layers.",
            "**Always start long.** You can always take more off.",
          ],
        },
        { note: "When your arm feels tired, do not push on to finish the area. Stop, drop your arm, reposition yourself and then carry on. A few seconds' pause costs far less than one side of layers sitting lower than the other.", kind: "tip", title: "A tired arm drops the elevation" },
      ],
    },
    {
      id: "fixing-layers",
      title: "Layered haircut gone wrong: what you see and how to fix it",
      blocks: [
        { p: "Most fixes happen during the cut itself, at the check and after the blow-dry. The table brings together the situations the lesson mentions." },
        {
          table: {
            head: ["You see", "Usual cause", "What to do"],
            rows: [
              ["Layers not visible enough once let down", "You took only a little the first time, as you should", "Lift to 180° again and take a little more the same way"],
              ["A piece sticks out when cross-checking", "Uneven elevation or tension between vertical sections", "Trim what sticks out"],
              ["The two shortest face pieces at different heights", "Different guide or tension on each side", "Trim the longer side, a little at a time"],
              ["Hair standing up on top", "Top layers too short, especially at the whorl", "Cannot be fixed on the day; next time take less on top and leave the whorl longer"],
              ["Side hair pokes out when she ties it up", "Side layers too short for the way she wears it", "Ask about tying it up during the consultation"],
            ],
          },
        },
        { p: "The last two rows show why you start long and ask carefully: some mistakes only time can fix." },
      ],
    },
    {
      id: "drying-and-aftercare",
      title: "Blow-drying layers, air-drying and when to trim",
      blocks: [
        { p: "Long layers also look good air-dried, as long as the layers are not too short. Before the client leaves the chair, show her both ways: blow-dried with a round brush, turning the face pieces gently away from the face, and left to dry naturally. A client who knows how her hair looks both ways is rarely disappointed the next morning. Drying technique has its own article, [how to blow-dry hair](lesson:say-tao-kieu)." },
        { img: { src: img("toc-tang-dai-nhin-tu-phia-sau"), alt: "Long honey-blonde hair reaching the shoulder blades seen from behind after layering, the long layers giving light volume and the ends soft and even", caption: "The result from behind: the length is still there, the layers blend softly into the perimeter and the ends stay full." } },
        { p: "With long layers, many clients come back for a trim after about 2–3 months. That is a common habit, not a rule. Regular trims keep the ends full and help the layers hold their shape for longer." },
      ],
    },
    {
      id: "safety-and-hygiene",
      title: "Safety and hygiene when cutting layers",
      blocks: [
        {
          ul: [
            "Cut only to the length agreed with the client. If you want to go shorter, ask again first.",
            "When cutting around the face, ask the client to close her eyes and point the scissor tips away from her face.",
            "The neck strip is single-use, wrapped on first with the cape fastened over it, and thrown away once the client leaves.",
            "Scissors, combs and clips are cleaned and disinfected after every client as the product instructs. The routine is in [how to disinfect tools](lesson:ve-sinh-dung-cu).",
            "Sweep up the hair under the chair before the next client sits down.",
          ],
        },
        { note: "Hygiene rules and the rules for practising hairdressing differ by country. Check the rules where you work.", kind: "warn", title: "Rules vary" },
      ],
    },
    {
      id: "client-record",
      title: "Write up the client record so the next cut matches",
      blocks: [
        { p: "A client who likes today's cut will want exactly the same next time, and after two or three months neither of you will remember whether the layers started at the chin or the cheekbone. In VaraaAi, note the length and where the face framing starts in the client's notes in the [customer records](lesson:khach-hang), then suggest the next [appointment](lesson:lich-hen) as she pays. A layered cut deserves its own duration on the booking page, long enough for the consultation, shampoo and blow-dry: see how to [add a service](lesson:dich-vu)." },
      ],
    },
  ],
  howTo: {
    title: "How to cut long layers with face framing: the steps",
    id: "long-layers-steps",
    after: "four-parts",
    lead: "Ten steps in the order of the lesson video. Steps 4 to 7 are the four parts of the style, and in each you take a little first and only then more.",
    supplies: [
      "Cutting scissors, comb and sectioning clips, cleaned and disinfected",
      "Single-use neck strip and cape",
      "Towel and water spray bottle",
      "Hairdryer and round brush",
      "Hand mirror to show the back",
    ],
    steps: [
      {
        name: "Prepare the client and the tools",
        text: "Wash your hands and check that the scissors, combs and clips have been cleaned and disinfected. Wrap the neck strip round the client's neck before fastening the cape over it, so the cape never touches the skin of her neck directly.",
        image: { src: img("quan-giay-co-va-ao-choang-truoc-khi-cat"), alt: "A stylist wraps a white neck strip round a client's neck and fastens a black cape over it, the client's hair swept over one shoulder" },
      },
      {
        name: "Consult while the hair is dry",
        text: "Look at a reference photo together and ask three things: how much comes off the ends, where the shortest layer at the front should start, and whether she blow-dries in the morning. Ask too what she disliked about her last cut and whether she often ties her hair up. Fix it with touch points: put your hand exactly where the ends will stop and where the face framing starts, for example at the chin. Read the hair at the same time: thick or fine, straight or curly, and where the whorls are. Fine hair gets fewer layers.",
        image: { src: img("thong-nhat-do-dai-bang-diem-cham"), alt: "A stylist beside a client in front of a gold-framed oval mirror holds the end of a long dry section of hair to show the length that will be cut", caption: "Show it with your hand on the real hair. “Just a little off” means a different length to everyone." },
      },
      {
        name: "Shampoo, detangle, part and section",
        text: "Shampoo, blot with a towel and detangle from the ends upwards. Part the hair where she will wear it every day; in the video it is a centre parting. Section and clip neatly. Keep the hair evenly damp with the spray bottle throughout, because dry and wet patches stretch and shrink differently.",
        image: { src: img("chia-vung-toc-truoc-khi-cat-tang"), alt: "A client's wet blonde hair seen from behind, divided into sections by straight partings and silver clips, with the stylist holding a comb beside it" },
      },
      {
        name: "Cut the outer perimeter at 0°",
        text: "The client sits straight with her head upright. Let down the hair at the back and comb it straight down her back. Hold the ends between two horizontal fingers at the agreed length and cut straight across just below them, centre first, then out to the sides. Connect the sides using the back line as the guide. A rounded U or pointed V outline has to be agreed beforehand. This is the length of the whole haircut, and the layers that follow never cut into it.",
        image: { src: img("cat-duong-vien-ngoai-goc-0-do"), alt: "A stylist standing beside a client combs her long wet hair straight down her back and holds the ends between her fingers to cut a level perimeter", caption: "The hair falls straight down, not lifted. From behind, the perimeter runs parallel to the floor." },
      },
      {
        name: "Cut long layers on top at 180°",
        text: "Section the top from the two front corners of the forehead back to the crown. Comb the whole area straight up, gather it to one point directly above the head, hold it between two fingers and cut straight across. That point is the stationary guideline. The lower you cut, the shorter the layers, so take a little the first time and let the hair down to look. For more visible layers, take a little more the same way. Do not cut too short at the whorl or the hair will stand up.",
      },
      {
        name: "Cut the sides, over-directed back",
        text: "Take a vertical section just behind the ear, lift it away from the head and connect it to the top layers. This section is the stationary guideline for the side. Then take the vertical sections in front of the ear, over-direct them back to exactly that guide and cut only the ends that reach past your fingers. That way the front hair stays longer and keeps its length. Do exactly the same on the other side, with the same guide and the same tension.",
        image: { src: img("keo-lech-toc-ra-sau-giu-do-dai-phia-truoc"), alt: "A client sits side-on while the stylist behind her pulls a wet section from the side of the head backwards and cuts the excess ends with scissors", caption: "The section in front of the ear is brought back to be cut. Released to its place, it is longer than the guide." },
      },
      {
        name: "Cut the face-framing layers",
        text: "Take a triangular section at the front, from the parting down to the corner of the forehead, comb it forward over the face and ask the client to close her eyes. Hold the section along a diagonal with the top end at exactly the agreed point, then cut along that diagonal with the scissor tips pointing away from her face. The next section behind is also combed forward to the first one and cut to it, so the hair gets gradually longer towards the back. Cut the other side to the same height.",
        image: { src: img("cat-tang-om-mat-khach-nham-mat"), alt: "A client with her eyes closed and wet centre-parted hair while the stylist behind her holds a front section on a diagonal at chin level and positions the scissors", caption: "Eyes closed, scissor tips away from the face. Start a little longer than the agreed point." },
      },
      {
        name: "Cross-check and balance both sides",
        text: "Check the areas you cut with vertical sections using horizontal ones, and trim anything that sticks out. Then stand behind the client, look in the mirror, pull the two shortest pieces at either side of the face down and compare their height. If they differ, trim the longer side a little at a time.",
        image: { src: img("so-hai-lon-toc-hai-ben-mat"), alt: "A stylist behind a client holds one section of hair at each side of her face while both look into a gold-framed oval mirror to compare the length" },
      },
      {
        name: "Blow-dry and check again once dry",
        text: "Dry in the direction the hair falls. Use a round brush to lift the roots on top gently and turn the face-framing pieces away from the face. Once dry, look at three things: are the sides balanced, is the volume even, are the ends still full? Trim lightly while dry wherever something is uneven.",
        image: { src: img("say-toc-tang-bang-luoc-tron"), alt: "A stylist blow-dries a client's long layered blonde hair, a round brush lifting a section on top and a black hairdryer held above it" },
      },
      {
        name: "Finish, record and clean up",
        text: "Brush off the loose hair, show the client the back with a hand mirror and ask whether she would like anything adjusted. Show her how to dry the face framing at home. Record the length and where the layers start in the client record. When she has gone, clean and disinfect the scissors, combs and clips, throw away the neck strip and sweep the hair from under the chair.",
      },
    ],
  },
  faq: [
    {
      q: "What do you cut first when layering long hair?",
      a: "Usually the outer perimeter, at 0°, to exactly the length agreed with the client. The perimeter is the length of the whole haircut. Then come the top layers, the sides and finally the face framing, so the layers blend softly into the perimeter without cutting into it.",
    },
    {
      q: "How do you cut layers without losing length?",
      a: "On top, comb the hair straight up to 180° and gather it to one point above the head to cut: the top ends up shortest and the hair gets longer further down. On the sides, over-direct the sections in front of the ear back to a guide behind the ear and cut only the excess, so the front keeps its length.",
    },
    {
      q: "Where should face-framing layers start?",
      a: "Wherever the client chooses: at the cheekbone, the chin or the collarbone. Agree it by putting your hand on exactly that point while the hair is dry, and ask whether she often ties her hair up, because side layers that are too short poke out of a ponytail. When cutting, start a little longer than the chosen point.",
    },
    {
      q: "How do you make the layers shorter and more visible?",
      a: "With the top lifted to 180°, the lower you cut, the shorter the layers. Take a little more at a time in the same way and let the hair down to look. Do not pull the hair tight to cut it, because once dry it will shrink up unevenly.",
    },
    {
      q: "Do long layers need blow-drying every day?",
      a: "No. Long layers also look good air-dried, as long as the layers are not too short. If she does blow-dry, a round brush lifts the roots on top and turns the face-framing pieces away from the face.",
    },
    {
      q: "How often should long layers be trimmed?",
      a: "Many clients come back for a trim after about 2–3 months. It is a common habit rather than a rule. Regular trims keep the ends full and help the layers hold their shape for longer.",
    },
  ],
  related: ["cat-nu-tang-hieu-dung", "toc-tu-van-chia-vung", "cat-nu-bang", "say-tao-kieu"],
};

export default article;
