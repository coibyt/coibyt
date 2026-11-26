import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/dua-form-mong/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "how-to-file-nails-into-shape",
  lesson: "dua-form-mong",
  category: "nail",
  title: "How to file nails into shape: 10 steps for 7 shapes, from square to stiletto",
  metaTitle: "How to file nails: 10 steps for all 7 nail shapes",
  metaDescription:
    "How to file nails step by step: even length first, centre line and stress points, filing square, round, oval, almond, coffin and stiletto, then checks.",
  keyword: "how to file nails",
  keywords: ["how to file nails evenly", "how to file squoval nails", "how to file almond nails", "how to file oval nails", "file nails in one direction", "how to file nails at home", "nail shaping step by step"],
  excerpt: "The full nail shaping routine: length before shape, the filing path for seven shapes and the checks that make all ten nails match.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-nail-dua-form-mong-cho-khach-tai-salon"),
    alt: "An auburn-haired nail technician in a cream top and black gloves files a blonde client's nails in a Parisian-style salon with a chandelier",
  },
  takeaways: [
    "**Length first, shape second:** all ten nails are the same length before any shaping starts.",
    "Every shape starts from the two stress points and the centre line: the side walls run straight out, and the tip sits on the centre line.",
    "Natural nails get a **fine file used in one direction**, with a light hand. Coarser files are for enhancements only.",
    "Keep the client's finger straight and hold the same file angle on both sides, or the nail ends up lopsided without you noticing.",
    "Check each nail from above and from the tip, then compare all ten and look at them from the client's side.",
  ],
  intro: [
    "Learning how to file nails properly does not start with the shape. It starts with the length: all ten nails even first, and only then does the file go into the angled strokes and rounded corners. Beginners often do it the other way round, and end up with ten nails in ten slightly different shapes.",
    "This article is based on the VaraaAi Academy lesson “Shaping nails: step by step” in the Nails course. You will go through ten steps, including the filing path for seven shapes: square, squoval, round, oval, almond, coffin and stiletto. Watch the lesson video below to see how the file is held, then come back to each step while you practise.",
  ],
  sections: [
    {
      id: "three-constants",
      title: "Three things to keep in mind throughout nail shaping",
      blocks: [
        { p: "Whatever the shape, natural nail or enhancement, three things stay the same from the first nail to the tenth." },
        {
          ol: [
            "**All ten nails the same length.** Only nails of the same length can be filed to the same shape.",
            "**The tip on the centre line.** Your eyes stay on the centre line of the nail while you file.",
            "**No filing deep into the side corners.** The shape is made at the tip; the side walls still run straight out from the stress points.",
          ],
        },
        { p: "If you are not yet sure which shape suits a client's hand and natural nails, read the theory article on [nail shapes and how to choose them](lesson:dua-form-mong-hieu-dung) first. This one is about the hands holding the file." },
      ],
    },
    {
      id: "shape-reminders",
      title: "What to remember for each nail shape",
      blocks: [
        { p: "The filing paths are in the steps above. The table gathers the short reminders worth knowing by heart before you take clients." },
        {
          table: {
            head: ["Shape", "Remember", "Done on"],
            rows: [
              ["Square", "Best on short to medium nails; the longer the nail, the more easily the corners break", "Natural nails or enhancements"],
              ["Squoval", "Both corners rounded equally", "Natural nails or enhancements"],
              ["Round", "One even curve at the tip, no straight part; suits male clients and people who work with their hands", "Short natural nails"],
              ["Oval", "Rounded tip right on the centre line; filing the sides too deep turns it into almond", "Slightly longer nails"],
              ["Almond", "Short to medium is the most beautiful and durable on natural nails", "Strong natural nails or enhancements"],
              ["Coffin", "Both tapered sides the same length, small flat end in the centre", "Needs length, usually enhancements"],
              ["Stiletto", "Sharp point right in the centre", "Enhancements or very strong natural nails only"],
            ],
          },
        },
        { note: "On enhancements, use a coarser file and go gently near the natural nail. How to build a long nail to file into coffin or stiletto is covered in [gel extensions with forms](lesson:noi-mong-form).", kind: "info", title: "Filing enhancements" },
      ],
    },
    {
      id: "nail-filing-mistakes",
      title: "Common nail filing mistakes and how to fix them",
      blocks: [
        { p: "A lopsided nail is rarely the file's fault. It usually comes from the position of the client's finger, or from the technician changing angle between the left and the right side." },
        { img: { src: img("loi-mui-mong-lech-khoi-duong-giua"), alt: "Close-up of a milky pink nail filed unevenly, one side cut straight and the other still full, the tip clearly off the centre line", caption: "An example of the mistake: one side filed more than the other, so the tip has moved off the centre line." } },
        {
          table: {
            head: ["What you see", "Usual cause", "Fix"],
            rows: [
              ["Nail leans to one side", "The client's finger is tilted, so the file tilts with it", "Keep the finger straight and your eyes on the centre line"],
              ["Sides are not equal", "Different file angle on the left and the right", "Keep one angle; after one side, check from above before filing the other"],
              ["Ten nails, different shapes", "Shaping started before the lengths were even", "Go back and even out the length, then correct the shape"],
              ["Tip splitting into layers", "Sawing back and forth, or too coarse a file on a natural nail", "File in one direction with a fine file"],
              ["Oval turned into almond", "Sides filed in too deep", "Stop sooner; picture the tip as the narrow end of an egg"],
              ["Nail weak and breaking at the sides", "Filing deep into the side corners", "Let the side walls run straight from the stress points"],
            ],
          },
        },
        { note: "Do the same step on all five fingers before moving on: the left side of all five nails, then the right side of all five, and only then the tips. Your hand keeps one filing angle and the nails come out more even.", kind: "tip", title: "A trick many technicians use" },
      ],
    },
    {
      id: "hygiene-and-safety",
      title: "Tool hygiene and when not to file",
      blocks: [
        { p: "Shaping is a gentle service, but it still means touching a client's nails and skin with tools. The hygiene rules do not relax." },
        {
          ul: [
            "Shared tools such as nail clippers are cleaned and disinfected after every client, as in the lesson [Tools after every customer](lesson:ve-sinh-dung-cu).",
            "Single-use files and buffers are new for each client.",
            "Dust from enhancements is extracted, never blown away.",
            "Nails with signs of disease or red, swollen skin around them mean no service. The lesson [When not to treat](lesson:khi-nao-khong-lam) explains the signs.",
          ],
        },
        { note: "This article is a training aid, not a licence. Rules on hygiene and on nail work differ by country, so check the ones that apply where you work.", kind: "warn", title: "Rules differ from place to place" },
      ],
    },
    {
      id: "aftercare-and-records",
      title: "Advice for a chipped nail, and recording the chosen shape",
      blocks: [
        { img: { src: img("nho-dau-duong-sau-khi-dua-mong"), alt: "A nail technician in black gloves holds a dropper and puts golden cuticle oil on the skin at the base of a client's nail, her hand resting on a cushion" } },
        { p: "The advice before the client leaves is short: if a nail chips or catches, do not bite it or tear it. File it lightly in one direction with a fine file, or come back to the salon." },
        { p: "The last job is writing down the shape and length she chose. In VaraaAi you add it to the [client's notes](lesson:khach-hang) right after the appointment, so nobody needs to ask again and whoever does her nails next time makes the same set. If she wants to keep the shape even, book her next visit in the [appointment calendar](lesson:lich-hen) before she leaves the desk." },
      ],
    },
  ],
  howTo: {
    title: "How to file nails, shape by shape",
    id: "nail-filing-steps",
    after: "three-constants",
    lead: "Ten steps in the order of the lesson video. The first four are the same for every shape, the middle four are the filing path for each shape, and the last two are checking and finishing.",
    supplies: [
      "Nail clippers, cleaned and disinfected",
      "A fine file for natural nails, usually 180 grit or higher",
      "A coarser file if you work on enhancements",
      "A fine buffer",
      "A soft dust brush, and dust extraction when filing enhancements",
      "Cuticle oil",
      "Pictures of the nail shapes for the client to choose from",
    ],
    steps: [
      {
        name: "Check the nails and agree on the shape",
        text: "Wash and sanitise your own hands and the client's, then look closely at the nails and the skin around them. Ask which shape and length she would like, and show her pictures of the shapes. Say honestly which shape suits her nails before you begin, because once filed, a nail cannot grow back on the spot.",
      },
      {
        name: "Make all ten nails the same length",
        text: "Trim nails that are much too long with clippers, a little at a time, leaving a bit extra for filing. A nail that is only slightly long is filed straight across to shorten it. If one nail has broken short, the overall length follows the shortest nail, or that nail gets its own extension.",
        image: { src: img("cat-bot-do-dai-mong-truoc-khi-dua"), alt: "A nail technician in black gloves trims the tip of a client's natural index fingernail with clippers, the client's hand on a cream cushion", caption: "Trim a little at a time and leave some length for filing. Shaping starts only when all ten nails are even." },
      },
      {
        name: "Find the centre line and the two stress points",
        text: "Look at the nail from above, then from the tip. Find the centre line, then the two stress points, where the nail starts to leave the skin bed on each side. Every shape starts here: the side walls run straight out from the stress points, and the tip sits on the centre line.",
      },
      {
        name: "Hold the file lightly and file in one direction",
        text: "Hold the file slightly angled under the free edge. On natural nails, use a fine file and work in one direction, from the side towards the centre; do not saw back and forth, because the nail heats up and the tip splits into layers. Keep the client's finger lying straight: if it tilts, the file tilts with it and the nail ends up lopsided.",
        image: { src: img("dua-mong-mot-chieu-duoi-dau-mong"), alt: "A nail technician holds a file at a slight angle under the tip of a client's natural index fingernail, a little fine white dust on her black glove" },
      },
      {
        name: "File square and squoval",
        text: "Square: hold the file at a right angle to the finger and file straight across the tip, then file the side walls straight and parallel. Glide lightly over the corners just to take off the sharpness so they do not catch. For squoval, do exactly the same first, then round both corners a little more with a few short strokes in an arc.",
        image: { src: img("dua-mong-vuong-bo-goc"), alt: "Close-up from above of a milky pink squoval nail, the tip straight across and both corners gently rounded", caption: "Squoval: the tip stays straight, and both corners are rounded equally." },
      },
      {
        name: "File round and oval",
        text: "Round is for short nails: file from one side along the curve of the fingertip up to the centre, then do the other side the same way. Oval needs a little more length: both sides curve in evenly and meet at a rounded tip right on the centre line. Do not file the sides in too deep, or the oval turns into an almond.",
        image: { src: img("dua-mong-o-van-dau-tron"), alt: "Close-up of a milky pink oval nail on a client's finger, both sides curving evenly into a broad, egg-shaped rounded tip" },
      },
      {
        name: "File almond",
        text: "Keep the side walls straight from the stress points, then file diagonally from each side towards the centre so the nail tapers into a soft, rounded point. Finish one side and look again from above before filing the other, so both sides match. On strong natural nails, a short to medium almond is the most beautiful and the most durable.",
        image: { src: img("dua-mong-hanh-nhan-mui-tron-mem"), alt: "Close-up of a milky pink almond nail, both sides tapering into a soft, rounded point in the middle of the finger", caption: "Almond: a soft, rounded point exactly on the centre line." },
      },
      {
        name: "File coffin and stiletto",
        text: "Coffin: taper both sides like an almond but stop earlier, then hold the file at a right angle and file straight across, leaving a small flat end in the centre. Stiletto: taper both sides even more steeply, to a sharp point right in the centre. Coffin needs length and is usually done on enhancements; stiletto only on enhancements or very strong natural nails.",
        image: { src: img("dua-mong-coffin-dau-bang"), alt: "Close-up of a long milky pink coffin nail, the sides tapering in and the tip filed into a small straight edge" },
      },
      {
        name: "Check every nail for symmetry",
        text: "From above, check that the tip is centred and both sides are equal. Turn the finger and look from the tip to see that the side walls are balanced. Put both hands side by side to compare all ten nails, then turn the client's hand around and look at it the way she will see it herself. Correct anything that is off straight away with a few light strokes.",
      },
      {
        name: "Smooth the edge, remove the dust and apply oil",
        text: "Glide a fine buffer very lightly under the edge of the tip to remove any tiny fibres. Brush the dust off with a soft brush; dust from enhancements is extracted, not blown. Finish with a drop of cuticle oil on the skin around the nails and a gentle massage.",
        image: { src: img("mai-min-mep-dau-mong-bang-phao"), alt: "A nail technician presses a white buffer against the edge of a client's index fingernail to smooth it, the hand resting on a cream cushion" },
      },
    ],
  },
  faq: [
    {
      q: "Should you file nails in one direction or back and forth?",
      a: "On natural nails, file in one direction, from the side towards the centre, with a fine file and a light hand. Sawing back and forth heats the nail and makes the tip split into layers.",
    },
    {
      q: "Should you cut or file nails first?",
      a: "Length first, shape second. Trim nails that are much too long a little at a time with clippers, leaving some length for filing, and file slightly long nails straight across. Start shaping only when all ten nails are the same length.",
    },
    {
      q: "What grit file should you use on natural nails?",
      a: "The higher the number on the file, the finer it is. Natural nails need a fine file, usually 180 grit or higher. Coarser files are for hard gel or acrylic enhancements.",
    },
    {
      q: "How do you file squoval nails?",
      a: "Start as for a square: the tip filed straight across and the side walls straight and parallel. Then round off both corners with a few short strokes in an arc, making sure both corners are rounded equally.",
    },
    {
      q: "How do you file both sides of a nail evenly?",
      a: "Keep the client's finger straight, keep your eyes on the centre line and hold the same file angle on both sides. After one side, look from above before filing the other. Many technicians do the same step on all five fingers before moving on, so the hand keeps one angle.",
    },
    {
      q: "What should you do if a nail chips at home?",
      a: "Do not bite or tear the chipped part. File it lightly in one direction with a fine file until it no longer catches, or go back to the salon to have the shape corrected.",
    },
  ],
  related: ["dua-form-mong-hieu-dung", "cham-soc-mong-co-ban", "son-gel", "noi-mong-form"],
};

export default article;
