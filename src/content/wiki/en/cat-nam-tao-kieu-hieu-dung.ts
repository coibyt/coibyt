import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cat-nam-tao-kieu-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "mens-haircut-for-face-shape",
  lesson: "cat-nam-tao-kieu-hieu-dung",
  category: "hair",
  title: "Men's haircut for face shape: side part or French crop, pomade or matte paste",
  metaTitle: "Men's haircut for face shape: side part or French crop",
  metaDescription:
    "Choosing a men's haircut for face shape, density, whorls and morning routine: side part or French crop, hard part, pomade, matte paste, sea-salt spray.",
  keyword: "men's haircut for face shape",
  keywords: [
    "best men's haircut for a round face",
    "men's haircut for a long face",
    "what is a side part haircut",
    "what is a French crop",
    "pomade vs matte paste",
    "hair products for fine hair men",
    "what is a hard part",
  ],
  excerpt: "A style that looks great in a photo will not always look great on your client. How to choose between a side part and a crop by face, hair and the client's life.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("kieu-toc-nam-re-ngoi-lech-side-part"),
    alt: "A male client in a leather barber chair with a side part: a clear parting, the top combed glossy to one side and short sides",
  },
  takeaways: [
    "A **side part** looks smart but needs a blow-dry and a little product every morning. A **crop** is very low-maintenance: towel-dry and work in a little matte product.",
    "A round face gains from some height on top; a long face should not go too high. This is trade guidance, not a rule.",
    "Hair that is thinning at the front usually suits a crop better than a side part, because hair pushed forward covers the thin area.",
    "The parting should be the **natural parting**: wet the hair, comb it back, push the top forward and see where it splits.",
    "Matte paste or clay gives texture without shine; pomade gives shine and a neat finish; fine hair needs a light hold.",
  ],
  intro: [
    "Choosing a men's haircut for face shape is the barber's job before the scissors come out, and it is where many cuts fail even when the cutting technique is right. The same cut either suits or does not depending on matching the right style to the right person. A style that looks great in a photo will not necessarily look great on the client sitting in front of the mirror.",
    "This article follows the VaraaAi Academy lesson “Men's styles: understand them to suit the face” in the Hair course. It is built around two styles clients ask for a lot, the classic side part and the crop (French crop). By the end you can suggest a style to suit the client's face, hair and lifestyle, choose the styling product and teach the client to do it at home. The cut itself, step by step, is in the article [how to cut a side part and a French crop](lesson:cat-nam-tao-kieu).",
  ],
  sections: [
    {
      id: "side-part-and-crop",
      title: "What a side part and a French crop are",
      blocks: [
        {
          table: {
            head: ["Style", "What it is", "Every morning"],
            rows: [
              ["Side part", "Longer top, longest at the front, swept to one side with a defined parting. Short sides, tapered or faded", "Needs a blow-dry and a little product"],
              ["Crop (French crop)", "Short textured top pushed forward, with a short fringe on the forehead. Sides usually faded", "After washing, towel-dry and work in a little matte product"],
            ],
          },
        },
        { p: "A side part looks smart and suits the office and events. A crop suits busy people and people who play sport. The difference in upkeep matters as much as the difference in shape, and it should be said to the client from the start." },
        { img: { src: img("kieu-toc-french-crop-mai-ngan-hai-ben-fade"), alt: "A young man with ash-blond hair in a French crop: a short top pushed forward, a short fringe across the forehead and faded sides", caption: "French crop: a short textured top, a short fringe on the forehead and faded sides." } },
        { h3: "Soft part and hard part" },
        { p: "The parting in a side part comes in two kinds. A **soft part** is simply where the hair naturally separates. A **hard part** is a thin line shaved along the parting. A hard part looks sharp, but it grows back stubbly and the client can no longer switch sides. Because it is shaved with a razor, a hard part always uses a single-use blade, as in the lesson [Tools after every customer](lesson:ve-sinh-dung-cu)." },
        { h3: "The top and the sides have to balance" },
        { p: "A side part over sides that are too short makes the long top look like a hat sitting on the head. A crop with thick sides makes the head look round and heavy. So in the consultation, always talk about both parts together: what happens on top, and what happens on the sides." },
        { img: { src: img("hai-ben-taper-nhe-cho-kieu-toc-nam-cong-so"), alt: "A man with a short beard and wavy brown hair in profile: the sides lightly shortened around the ear, the longer top combed back", caption: "Sides lightly shortened but still with hair: a discreet choice for a side part. For tapers and fades, see [what is a fade haircut](lesson:cat-nam-fade-hieu-dung)." } },
      ],
    },
    {
      id: "face-shape",
      title: "Men's haircut for a round, long or square face",
      blocks: [
        { p: "The face is the first thing a barber looks at. The general principle is to use the hair to rebalance proportions: add height where it is missing, take it away where there is too much." },
        {
          table: {
            head: ["Face shape", "Suggestion"],
            rows: [
              ["Round face", "Add a little height on top. A side part with some volume makes the face look longer"],
              ["Long face", "Do not push the hair up too high. A short fringe, as in a crop, makes the face look shorter"],
              ["Square or oval face", "Suits most styles"],
              ["Large or slightly protruding ears", "Do not cut the sides too short"],
            ],
          },
        },
        { note: "Face-shape suggestions are shared trade experience, not rules. In the end it comes down to what the client likes, and the barber's job is to say honestly what they see.", kind: "info", title: "Guidance, not rules" },
      ],
    },
    {
      id: "choosing-by-hair",
      title: "Choosing by the hair: thinning, whorls, thick hair, wavy hair",
      blocks: [
        { p: "After the face comes the hair. Four things are worth looking at, and each tips the choice towards one of the two styles." },
        {
          ul: [
            "**Thinning at the front.** A side part can sometimes show scalp along the parting. A crop pushes the hair forward and covers thin spots.",
            "**A cowlick at the front hairline.** The hair stands up there. Cut the fringe too short and it will not lie down. Sometimes parting the hair in the direction of the cowlick is easier.",
            "**Thick, coarse, straight hair.** Holds a crop very well.",
            "**Slightly wavy hair.** Gives a side part beautiful movement.",
          ],
        },
        { p: "How to read density, texture and growth direction is covered in detail in the article on [hair consultation](lesson:toc-tu-van-chia-vung-hieu-dung)." },
      ],
    },
    {
      id: "lifestyle-questions",
      title: "Three questions about the client's mornings",
      blocks: [
        { p: "A hairstyle lives at the client's home more than in the salon. Before you settle on a style, ask: how many minutes do you have for your hair each morning, do you blow-dry, do you wear a helmet or a sports cap?" },
        { img: { src: img("tho-tu-van-chon-kieu-toc-nam-truoc-guong"), alt: "A barber stands beside a male client at a brass-framed mirror, lifting the hair on top with one hand while the client gestures to describe what he wants", caption: "Consult while the hair is dry: look at the real hair, then ask about the morning routine." } },
        { p: "Something very common: a client picks a side part that looks great in a photo but never blow-dries at home. A week later the hair is flat and falls all over the place, and the client thinks the cut was bad. Suggest a style the client can really do himself." },
      ],
    },
    {
      id: "styling-techniques",
      title: "The techniques behind the style: point cutting, texturising and the natural parting",
      blocks: [
        { h3: "Point cutting" },
        { p: "Instead of cutting straight across in a line, the barber points the scissor tips straight into the ends and cuts small notches. The ends come out softer, with movement and no hard cutting line. The texture of a crop comes from this technique." },
        { img: { src: img("cat-tia-dau-keo-tao-ket-cau-cho-toc-nam"), alt: "A barber holds a section of a blond male client's top hair between two fingers and points the scissor tips at an angle into the ends to cut notches", caption: "Point cutting: the scissor tips go into the ends instead of cutting straight across." } },
        { h3: "Texturising" },
        { p: "Texturising removes weight where the hair is thick. With fine, thin hair, go easy, because overdoing it makes the hair flat and shows scalp. Do not texturise close to the roots along the parting or at a whorl: those short hairs will stand straight up." },
        { h3: "Finding the natural parting" },
        { p: "For a side part, the barber does not just pick a spot for the parting. Wet the hair, comb it all back, then push the top gently forward with your palm. The hair separates by itself at one place, and that is the client's natural parting. Part it there and the hair lies well, and the client can easily repeat it at home. If the client has worn his parting on one side for years, ask him and look at how the hair is used to lying." },
      ],
    },
    {
      id: "pomade-paste-sea-salt",
      title: "Pomade vs matte paste, and when to use sea-salt spray",
      blocks: [
        { p: "There are many product names on the shelf, but broadly they divide along two questions: shiny or matte, strong or light hold." },
        {
          table: {
            head: ["Product", "What it gives", "Suits"],
            rows: [
              ["Matte paste or clay", "Texture, no shine", "Crop"],
              ["Pomade", "Shine and a neat, set shape. Water-based types wash out more easily", "Classic side part"],
              ["Sea-salt spray", "Volume and grip. Used before blow-drying", "Hair that needs more volume"],
              ["Light-hold product", "Hold without weighing the hair down", "Fine hair"],
            ],
          },
        },
        { img: { src: img("pomade-sap-li-xit-muoi-bien-tao-kieu-toc-nam"), alt: "On a marble surface: a tin of glossy amber pomade, a jar of grey matte paste, two unlabelled spray bottles and a black comb", caption: "From the left: glossy pomade, matte paste, spray bottles. Each gives the hair a different finish." } },
        { p: "Heavy products make fine hair go flat, so for fine hair a sea-salt spray before blow-drying and a light-hold product are enough. Whatever you use, use little: take a small amount on a fingertip and rub it evenly between your palms before it goes on the hair." },
        { note: "Use styling products as the manufacturer instructs. Before applying, ask whether the client has a sensitive scalp or any allergies. Rules on products and tools in salons differ by country.", kind: "warn", title: "Ask before you apply" },
      ],
    },
    {
      id: "teach-the-client",
      title: "Teaching the client to style at home",
      blocks: [
        { p: "A haircut is only complete when the client can recreate it the next morning. As you style, talk him through it: which direction to blow-dry, how much product to take, how to work it in. Tell him what to avoid as well. Too much paste makes the hair greasy and heavy. A side part left to dry naturally usually goes flat at the front." },
        { img: { src: img("tho-vuot-san-pham-tao-kieu-len-toc-nam"), alt: "A barber works styling product through the top of a male client's hair with his hand, moving it back and slightly to one side" } },
        { note: "Hand the client the dryer or the paste and let him try once, right there in the chair. If he can do it himself, he will love the cut for a whole month, not just a day.", kind: "tip", title: "From the trade" },
        { p: "In VaraaAi, note the style, the parting side and the product the client uses in the [customer records](lesson:khach-hang). If the salon sells paste or pomade, you manage them under [products and orders](lesson:san-pham-don-hang). A cut with styling should have enough time set in the [service menu](lesson:dich-vu) to leave room for those few minutes of teaching." },
      ],
    },
  ],
  faq: [
    {
      q: "What is the best men's haircut for a round face?",
      a: "Shared trade experience says a round face gains from a little height on top. A side part with some volume makes the face look longer. This is guidance rather than a rule, and the client's hair density and styling habits matter just as much.",
    },
    {
      q: "What men's haircut suits a long face?",
      a: "With a long face, do not push the hair up too high on top. A short fringe on the forehead, as in a crop, helps the face look shorter.",
    },
    {
      q: "What is a side part haircut and is it hard to look after?",
      a: "A side part is the classic style with a longer top, longest at the front, swept to one side with a defined parting and tapered or faded sides. It looks smart and suits the office, but it needs a blow-dry and a little product every morning. Left to dry naturally, the front usually goes flat.",
    },
    {
      q: "What is a French crop and who does it suit?",
      a: "A French crop has a short, textured top pushed forward with a short fringe on the forehead, usually with faded sides. It is very easy to look after, so it suits busy people and people who play sport. It also covers hair that is thinning at the front well.",
    },
    {
      q: "What is the difference between pomade and matte paste?",
      a: "Pomade gives shine and a neat, set shape and suits a classic side part; water-based pomades wash out more easily. Matte paste or clay gives texture without shine and suits a crop. Use either sparingly and rub it evenly between your palms first.",
    },
    {
      q: "What styling product makes fine hair look thicker for men?",
      a: "Fine hair suits a sea-salt spray used before blow-drying, for volume, together with a light-hold product. Heavy pastes or a lot of shiny pomade make fine hair go flat.",
    },
  ],
  related: ["cat-nam-tao-kieu", "cat-nam-fade-hieu-dung", "cat-nam-co-ban-hieu-dung", "say-tao-kieu-hieu-dung"],
};

export default article;
