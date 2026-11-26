import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/5-dang-mong/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "what-nail-shape-should-i-get",
  lesson: "5-dang-mong",
  category: "tips",
  title: "What nail shape should I get? Square, round, almond, ballerina or stiletto, and which suits your hands",
  metaTitle: "What nail shape should I get? 5 shapes compared",
  metaDescription:
    "What nail shape should you get? Square, round, almond, ballerina and stiletto compared: the strongest, the most fragile, and how to choose for your hands.",
  keyword: "what nail shape should I get",
  keywords: [
    "round or square nails",
    "who suits almond nails",
    "are ballerina and coffin nails the same",
    "do stiletto nails break easily",
    "nail shape for wide nail beds",
    "best nail shape for typing",
  ],
  excerpt: "Change the nail shape and the same hand looks completely different. Five popular shapes, which last, which are fussy, and how to choose before you book.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("mong-dang-hanh-nhan-tren-hai-ban-tay"),
    alt: "A client's hands on a cream hand cushion, ten almond-shaped nails in milky pink gel polish tapering gently towards the tips",
  },
  takeaways: [
    "**Round** is the strongest shape and suits short nails and people who type or work with their hands a lot.",
    "**Almond** makes fingers look longer and slimmer and suits almost every hand.",
    "**Square** looks neat and modern on long fingers, but when it is very long the corners catch easily.",
    "**Ballerina** needs length to show; **stiletto** is the boldest shape and also breaks most easily.",
    "If your natural nails are thin and weak, do not file them into a point; for long, pointed shapes, wear them on enhancements.",
  ],
  intro: [
    "What nail shape should I get? The answer depends on your own hands, not on a sample photo. On the same hand, switching from square to almond already makes the fingers look longer and softer. The shape also decides how well your nails hold up: some shapes follow the fingertip and cope with knocks, others look stunning but snap the first time they catch on a cupboard door.",
    "This article follows the lesson “5 nail shapes on the same hand” from the Moja Beauty course at VaraaAi Academy, short customer videos from the Moja Beauty salon in Helsinki. By the end you will be able to tell the five popular shapes apart, know which one suits your fingers and your work, and explain to your nail technician what you want.",
  ],
  sections: [
    {
      id: "five-nail-shapes",
      title: "Five popular nail shapes in one table",
      blocks: [
        {
          table: {
            head: ["Shape", "What it looks like", "Suits"],
            rows: [
              ["Square", "Straight tip, sharp corners", "Long, slim fingers; a neat look"],
              ["Round", "Follows the fingertip, natural", "Short nails, typing, hands-on work"],
              ["Almond", "Tapers to a softly rounded tip", "Almost every hand"],
              ["Ballerina", "Tapered body, flat tip", "Long nails, an elegant, bold look"],
              ["Stiletto", "Pointed tip", "Parties and special occasions"],
            ],
          },
        },
        { p: "The lesson's quick rule: square for neat, round for strong, almond for slender, ballerina for elegant and stiletto for statement. Besides these five, salons often file squoval and oval, two shapes that sit between square and round." },
      ],
    },
    {
      id: "square-and-round",
      title: "Square and round nails: neat or strong",
      blocks: [
        { h3: "Square" },
        { p: "The tip is filed straight across, the sides run parallel and both corners are sharp. It looks modern and suits long, slim fingers. The wide tip makes it fairly strong, but the sharp corners are where it catches on clothes and bags and chips. That is why square nails look best short or medium." },
        { img: { src: img("mong-dang-vuong-goc-sac-net"), alt: "A client's hands on a hand cushion, ten square nails in milky pink gel polish with straight tips and two sharp corners", caption: "Square: a flat tip and sharp corners. Worn very long, the corners catch easily." } },
        { p: "On short fingers with wide nail beds, a square shape can make the fingers look shorter. If you like the square look but worry about catching, ask your technician to soften the corners into a squoval." },
        { h3: "Round" },
        { p: "The tip follows the curve of your fingertip, with no corners at all. It is the most natural and the strongest shape, because a knock is not concentrated on a point or a sharp corner. Round suits short nails and people who type all day or work with their hands." },
        { img: { src: img("mong-dang-tron-ngan-tu-nhien"), alt: "A client's hands on a cream hand cushion, ten short round nails in milky pink gel polish, evenly curved to follow the fingertips" } },
        { img: { src: img("can-canh-mong-tron-bo-theo-dau-ngon"), alt: "Close-up of one fingertip resting on a technician's black-gloved hand, a short round nail in glossy pink gel with an even curve", caption: "Short round nails catch less, break less and suit people who use their hands a lot." } },
      ],
    },
    {
      id: "almond-ballerina-stiletto",
      title: "Almond, ballerina and stiletto nails",
      blocks: [
        { h3: "Almond" },
        { p: "The sides taper towards the tip, which is softly rounded like an almond. The shape visually lengthens the fingers, looks feminine and suits almost any hand. Short fingers with wide nails often look noticeably slimmer once they switch to almond." },
        { p: "Worth knowing: a shape that narrows towards a point leaves less material at the tip. Strong natural nails cope fine with a short almond. If your nails are thin and you want a long almond, wear it on gel or acrylic enhancements." },
        { h3: "Ballerina" },
        { p: "The body tapers like an almond, but the tip is filed flat, like the toe of a ballet shoe. Some salons call it coffin. It looks elegant and bold, but it needs length before the shape shows, so it is usually done on enhancements." },
        { img: { src: img("mong-dang-ballerina-dau-bang"), alt: "A client's hands held upright over a towel, ten long ballerina nails in milky pink gel polish with tapered sides and flat filed tips", caption: "Ballerina needs long nails. On short nails the shape is hard to see." } },
        { h3: "Stiletto" },
        { p: "The tip is drawn into a point. It is the boldest, most eye-catching shape, and also the one that breaks most easily, because every knock lands on one small point. The lesson suggests keeping it for parties rather than everyday life." },
        { img: { src: img("can-canh-mong-dang-nhon"), alt: "Close-up of one finger resting on a technician's black-gloved hand, a long stiletto nail in milky pink gel polish tapering to a fine point" } },
        { note: "If your natural nails are thin, soft or splitting at the tip, do not file them to a point and do not grow them long. A short round or oval shape lasts longer. If you want stiletto, ask for it on enhancements. The article [BIAB vs gel polish](lesson:gel-biab-bot-gelx) explains the different kinds.", kind: "warn", title: "Weak nails and pointed shapes" },
      ],
    },
    {
      id: "choose-by-hands-and-work",
      title: "Choosing a nail shape for your fingers and your work",
      blocks: [
        { p: "Before you open the sample photos, look at three things: your fingers, the base of your nail, and what you do all day." },
        {
          table: {
            head: ["You have", "Shapes to try"],
            rows: [
              ["Long, slim fingers", "Nearly any shape, square included"],
              ["Short fingers, wide nails", "Almond, oval; avoid long square"],
              ["Typing, hands-on work", "Round or squoval, kept short"],
              ["Thin nails that break", "Short round or oval"],
              ["A wish for long, bold nails", "Ballerina or stiletto on enhancements"],
            ],
          },
        },
        { img: { src: img("ban-tay-ngon-dai-thon-mong-tu-nhien"), alt: "A woman's hands with long, slim fingers resting on a cream hand cushion on a marble desk, natural nails without polish" } },
        { p: "A trick technicians often use: the tip usually looks most balanced when it echoes the curve at the base of the nail. A round base suits round or oval, a squarer base suits squoval. It is a starting point, not a rule, so you can still try the shape you like." },
        { note: "Some workplaces, such as hospitals and kitchens, have their own rules about nails. If you work in one, check the rules before you choose a length and shape.", kind: "info" },
        { p: "The article [nail shapes](lesson:dua-form-mong-hieu-dung) in the nail technician course goes into seven shapes in more depth and why some are stronger than others." },
      ],
    },
    {
      id: "tell-your-technician",
      title: "What to tell your technician when you want a new shape",
      blocks: [
        { p: "Bringing a sample photo helps, but also tell your technician what you do for a living, where your nails tend to break and how long you want the set to last. A good technician will tell you honestly if the shape you picked does not suit your natural nails, and offer options: a shorter almond on your own nails, for example, or enhancements for a long shape." },
        { img: { src: img("tho-nail-dua-dau-mong-tao-dang"), alt: "A nail technician in black gloves files the tip of a client's natural nail with a straight file, the client's hand on a cushion in a bright salon", caption: "Natural nails are filed in one direction with a fine file, and not deep into the side corners, so the nail is not weakened." } },
        { p: "All ten nails should be the same length and shape, with the tip centred on the finger. When the filing is done, look from above and from the tip: both sides should be even. If one nail looks off, say so straight away; it is far easier to fix then." },
        { p: "Changing shape but worried the gel will lift early? Read [5 habits that make gel nails lift](lesson:5-thoi-quen-gel-bong)." },
      ],
    },
    {
      id: "book-a-new-shape",
      title: "Booking a new nail shape",
      blocks: [
        { p: "You can [chat with the salon](lesson:chat-voi-salon) and send a photo of your hands to ask which shape suits you, then [book online](lesson:dat-lich-online) on VaraaAi: choose the service, choose the time, done. This lesson comes from Moja Beauty in Helsinki, where you can book on [Moja Beauty's booking page](/b/moja-beauty)." },
      ],
    },
  ],
  faq: [
    {
      q: "What is the strongest nail shape?",
      a: "Round is the strongest shape because it follows the fingertip and has no corner or point for knocks to concentrate on. Round, oval and squoval are the most practical shapes for natural nails, especially when kept short.",
    },
    {
      q: "What are almond nails and who do they suit?",
      a: "Almond nails have sides that taper towards a softly rounded tip, like an almond. The shape makes fingers look longer and slimmer and suits almost every hand. If your nails are thin and you want a long almond, wear it on enhancements.",
    },
    {
      q: "Are ballerina and coffin nails the same?",
      a: "Yes, they are two names for the same shape: a tapered body with a tip filed flat, like the toe of a ballet shoe. It needs length to look right, so it is usually done on gel or acrylic enhancements.",
    },
    {
      q: "Do stiletto nails break easily?",
      a: "Yes. Stiletto is the shape that breaks most easily, because there is very little material at the tip and every knock lands on one small point. It suits parties better than everyday work, and should be done on enhancements if your natural nails are thin.",
    },
    {
      q: "What nail shape is best for short fingers?",
      a: "Short fingers with wide nails usually look slimmer with an almond or oval shape. A square shape, especially worn long, tends to make the fingers look shorter.",
    },
    {
      q: "What nail shape is best if you type a lot?",
      a: "People who type or work with their hands are usually most comfortable with short nails in a round or squoval shape. Short nails catch less, break less and do not get in the way of work.",
    },
  ],
  related: ["gel-biab-bot-gelx", "5-thoi-quen-gel-bong", "mong-co-can-tho", "dua-form-mong-hieu-dung"],
};

export default article;
