import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mi-mapping-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "what-is-lash-mapping",
  lesson: "mi-mapping-hieu-dung",
  category: "lash",
  title: "What is lash mapping? Lash extension styles for each eye shape and the J, B, C, CC, D, L curls",
  metaTitle: "What is lash mapping? Lash styles for eye shapes and curls",
  metaDescription:
    "Lash mapping plans the length and curl of each zone before the first lash. The five main styles, which suit round, downturned or hooded eyes, and choosing curl.",
  keyword: "what is lash mapping",
  keywords: [
    "lash extension styles for eye shapes",
    "cat eye lash extensions",
    "doll eye lash extensions",
    "fox eye lash extensions",
    "lash mapping for hooded eyes",
    "lash curls J B C CC D L",
    "best lash style for downturned eyes",
  ],
  excerpt: "A lash map sets the length and curl of every zone of the lash line. The five main styles, which eye shape each usually suits, and how to choose the curl.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-mi-chon-do-dai-do-cong-tren-vi-mi-de-len-ban-do"),
    alt: "A lash technician with her hair in a high bun sits by a studio window, holding a pale pink lash tile and pointing at one strip with tweezers",
  },
  takeaways: [
    "Lash mapping means **planning the length and curl of each zone** of the lash line before the first extension goes on.",
    "Three things decide the map: the eye shape, the natural lashes and what the client wants. Read the eye shape with the client **sitting up, eyes open, looking straight ahead**.",
    "The five main styles are natural, doll, cat eye, squirrel and fox. What separates them is where the **longest point** sits.",
    "Curls run from nearly straight (J, B) to strongly curled (CC, D); choose by the **growth direction of the natural lash** so the base of the extension lies along it.",
    "Pairings of style and eye shape are common tendencies, not rules. Every client has to be looked at in person.",
  ],
  intro: [
    "What is lash mapping? It is drawing a map of the lash line: deciding which extension goes where before you attach anything. With the same hands and the same technique, changing only the length and curl zone by zone can make the eyes look bigger, longer or sadder. Mapping is the thinking part of lash work.",
    "This article follows the VaraaAi Academy lesson “Lash mapping: understand it to choose a style that suits the eye” in the Lashes course. You will learn to read a pair of eyes, tell the five main styles apart, understand why a cat eye can make downturned eyes look more tired, and pick a curl that matches the way the natural lashes grow.",
  ],
  sections: [
    {
      id: "what-lash-mapping-is",
      title: "What lash mapping is and why a set needs a map",
      blocks: [
        { p: "Mapping is the plan you make before the first lash. The technician divides the lash line into a few zones from the inner to the outer corner and notes two things for each: how long the lashes are and which curl they have." },
        { p: "With a map, both eyes come out the same and the result is exactly what you agreed with the client. Without one, you work by feel, and a very common outcome is a client who sits up at the end with one eye looking longer than the other." },
        { p: "This article is about how to think. Drawing the lines on the under-eye pad, writing the numbers for each zone and placing the anchor lashes are covered in the practice article [how to do lash mapping](lesson:mi-mapping)." },
      ],
    },
    {
      id: "reading-the-eyes",
      title: "Read the eyes before you choose a style: shape, natural lashes, the client's wish",
      blocks: [
        { h3: "Eye shape" },
        {
          ul: [
            "**Almond:** slightly long and tapered at both ends.",
            "**Round:** wide open, showing a lot of the iris.",
            "**Hooded:** a fold of skin from the brow bone hangs down over the lid.",
            "**Monolid:** a smooth lid with no crease.",
            "**Downturned:** the outer corner sits lower than the inner corner. **Upturned:** the outer corner sits higher.",
            "**Deep-set:** the eyes sit deep under the brow bone.",
            "**Spacing:** close-set or wide-set.",
          ],
        },
        { img: { src: img("dang-mat-hanh-nhan-tron-sup-mi-mot-mi"), alt: "A grid of four close-up photos of the eyes of four European women looking straight ahead without make-up, each with a different eye shape", caption: "Left to right, top to bottom: almond, round, hooded and monolid eyes." } },
        { note: "Look at the eye shape while the client is sitting up with her eyes open and looking straight ahead. Once she is lying down with her eyes closed, nearly all eyes look the same.", kind: "tip", title: "Read the eyes before she lies down" },
        { h3: "Natural lashes" },
        { p: "Long or short, strong or fine, growing downwards, straight or already curled, with sparse areas or gaps. The rule from [classic lash extensions](lesson:mi-classic-hieu-dung) sits above every map: an extension is never longer or heavier than the natural lash can carry. However good the map looks, if the natural lashes cannot support it, it will not work." },
        { h3: "What the client wants" },
        { p: "Natural or striking, an office job or a wedding coming up. Also ask whether she wears glasses, because lashes that are too long or too curled will touch the lenses." },
      ],
    },
    {
      id: "lash-extension-styles",
      title: "The main lash extension styles: natural, doll, cat eye, squirrel and fox",
      blocks: [
        { p: "These five styles are general tendencies. Salons and lash brands name them slightly differently, but where the longest point sits stays the same." },
        {
          table: {
            head: ["Style", "How the length is spread", "How the eyes look"],
            rows: [
              ["Natural", "Follows the natural lash line: short at the inner corner, a little longer towards the outer corner, only slightly longer than the natural lashes", "Like the client's own lashes, only fuller; suits almost everyone and is a safe first set"],
              ["Doll (open eye)", "Longest in the middle of the eye, right above the pupil, shorter towards both ends", "Bigger, rounder and brighter"],
              ["Cat eye", "Short at the inner corner, getting longer, longest at the outer corner", "Elongated, with the outer corner gently lifted"],
              ["Squirrel", "Longest at about the outer third, then a little shorter right at the outer corner", "Lifted without the outer corner being dragged down"],
              ["Fox eye", "Inner and middle fairly short and natural; only the outermost part longer, usually more curled, pointing up towards the tail of the brow", "Outer corner lifted, slim and sharp"],
            ],
          },
        },
        { img: { src: img("kieu-noi-mi-tu-nhien"), alt: "A blonde client looks straight ahead wearing a natural-style lash set, the extensions only slightly longer than her own and gently longer towards the outer corners", caption: "Natural style: it follows the client's own lash line." } },
        { img: { src: img("kieu-noi-mi-bup-be-dai-nhat-o-giua-mat"), alt: "A blonde client looks straight ahead wearing doll-style lashes, the longest extensions in the middle of each eye so the eyes look round and wide open", caption: "Doll style: the longest point is in the middle of the eye, above the pupil." } },
        { img: { src: img("kieu-noi-mi-mat-meo-dai-nhat-o-duoi-mat"), alt: "A blonde client looks straight ahead wearing cat eye lashes, short at the inner corners and longest at the outer corners, which lengthens the eyes", caption: "Cat eye: the longest point is at the outer corner." } },
        { img: { src: img("kieu-noi-mi-mat-cao-nang-duoi-mat"), alt: "A blonde client looks straight ahead wearing fox eye lashes, the outer lashes longer and angled upwards towards the tail of the brow", caption: "Fox eye: only the outermost part is long and points upwards." } },
      ],
    },
    {
      id: "style-for-eye-shape",
      title: "Which lash style usually suits which eye shape",
      blocks: [
        { p: "The table lists what is usually seen. It gives you a starting point for the consultation and never replaces looking at the real eyes in front of you." },
        {
          table: {
            head: ["Eye shape", "Usually suits", "Watch out for"],
            rows: [
              ["Almond, small eyes", "Doll", "Natural is still the safe choice for a first set"],
              ["Round", "Cat eye, because it lengthens the eye", "Doll can make an already round eye too round"],
              ["Close-set", "Cat eye, because it draws the eyes outwards", "The longest point sits at the outer corner"],
              ["Wide-set", "Emphasis at the inner corner and the middle", "Avoid extending the outer corner"],
              ["Downturned", "Doll, or the longest point moved towards the middle with more curl on the outer part", "Avoid putting the longest lashes at the outer corner"],
              ["Hooded, monolid", "More curl, so the lashes rise above the fold and show", "The skin fold easily hides the lashes"],
              ["Deep-set", "Moderate length and curl", "Lashes that are too long or curled may touch the upper lid or brow bone when the eyes open"],
            ],
          },
        },
        { h3: "Downturned eyes and the cat eye: a situation that comes up often" },
        { p: "A client with downturned eyes sees a cat eye photo online and wants exactly that. Do it, and the longest, heaviest lashes are concentrated at the outer corner and pull it down even more. The eyes look more tired and sadder. With downturned eyes, move the longest point closer to the middle and use more curl on the outer part to lift the eye." },
        { img: { src: img("loi-kieu-mat-meo-tren-mat-cup"), alt: "Close-up of a woman with downturned eyes wearing very long, dense extensions at the outer corners that droop past the corner and make the eyes look heavy", caption: "Example of a styling mistake: long, heavy lashes concentrated at the outer corner pull downturned eyes down further." } },
        { img: { src: img("mat-sup-mi-voi-soi-mi-noi-cong-nhieu"), alt: "Close-up of a woman with hooded eyes looking straight ahead, her extensions curling up past the fold of skin over the lid so they remain clearly visible", caption: "Hooded eyes: a stronger curl lets the lashes show above the fold." } },
      ],
    },
    {
      id: "lash-curls",
      title: "Lash extension curls J, B, C, CC, D, L and the direction of the natural lash",
      blocks: [
        { p: "Extensions are named by letters, and the idea is simple: they go from nearly straight to strongly curled." },
        {
          table: {
            head: ["Curl", "Shape", "Effect"],
            rows: [
              ["J, B", "Nearly straight", "A natural look"],
              ["C", "More curled than J and B", "The most common curl"],
              ["CC, D", "More curled than C", "More defined lashes, more open eyes"],
              ["L", "Straight base that then bends upwards", "Some technicians choose it for natural lashes that point down, so the base hugs the lash"],
            ],
          },
        },
        { img: { src: img("cac-do-cong-mi-noi-tu-gan-thang-den-cong-nhieu"), alt: "Six black lash extensions of the same length arranged in six rows and seen from the side, the curl at the tip increasing from the top row to the bottom row", caption: "The curl increases from top to bottom; the bottom lash has a straight base before it bends up like an L." } },
        { p: "There are a few other types besides these six. Each brand curls a little differently, so the same letter from two brands may not look exactly the same." },
        { h3: "Why the natural lash decides the curl" },
        { p: "The base of the extension has to lie flat along the natural lash. If the natural lash grows straight or downwards and you attach one that is too curled, only a tiny point touches: it holds poorly, falls early and looks bent. For downward lashes, some technicians choose a straight-base type such as L, so the base hugs the lash before it curls up. The opposite also goes wrong: on a lash that is already curled, an extension that is too straight sticks out." },
      ],
    },
    {
      id: "symmetry-and-consultation",
      title: "Balancing both eyes and an honest consultation",
      blocks: [
        { p: "Two eyes are rarely identical. The natural lashes on one side may be longer or sparser than on the other. So the map is not copied exactly from one eye to the other: the goal is a result that looks balanced, and sometimes that means adjusting the lengths a little on one side." },
        { p: "Before you start, show the client example photos and be honest about which style suits these eyes and how much her natural lashes can carry. Do not simply copy the picture she brings. Tell her whether it suits her and why. Begin only once you both agree." },
        { note: "Write the style and the length and curl of each zone in the internal notes of the [client's profile](lesson:khach-hang) in VaraaAi. At the next [refill](lesson:mi-dam-thao-hieu-dung), any technician in the salon can repeat the same map, and you can book the [refill appointment](lesson:lich-hen) before the client leaves.", kind: "tip", title: "Keep the map" },
        { note: "The styles and eye-shape suggestions here are general trade tendencies, not fixed rules; names and curls differ a little between brands. Always choose for each client's eyes and the strength of her natural lashes, and follow the lash and glue makers' instructions. Rules on beauty services and products differ from country to country. This article is a training aid, not a licence.", kind: "info", title: "Note" },
      ],
    },
  ],
  faq: [
    {
      q: "What is lash mapping?",
      a: "Lash mapping is the plan made before a lash set: the lash line is divided into a few zones from the inner to the outer corner, and each zone gets a length and a curl. With a map, both eyes match and the result is what was agreed with the client.",
    },
    {
      q: "What lash style is best for downturned eyes?",
      a: "With downturned eyes it is usually best to avoid putting the longest lashes at the outer corner, because long, heavy lashes there pull the eye down further. A doll style, or moving the longest point towards the middle with more curl on the outer part, helps lift the eye. This is a common tendency, and the technician still has to look at the actual eyes.",
    },
    {
      q: "Should round eyes get a cat eye or a doll lash style?",
      a: "A cat eye usually suits round eyes because it lengthens them. A doll style puts the longest lashes in the middle of the eye, so on eyes that are already round it can make them look too round.",
    },
    {
      q: "Which curl is best for hooded eyes or monolids?",
      a: "On hooded eyes and monolids the skin fold easily hides the lashes, so they usually need more curl to rise above the fold and show. The exact curl still depends on the direction the natural lashes grow, because the base of the extension has to lie along the natural lash.",
    },
    {
      q: "What is the difference between J, B, C, CC, D and L curls?",
      a: "The letters run from nearly straight to strongly curled: J and B are nearly straight for a natural look, C is the most common curl, and CC and D are more curled and make the eyes look more open. L has a straight base and then bends upwards. Brands curl their lashes slightly differently, so the same letter may not look identical.",
    },
    {
      q: "Can I have long, curled lash extensions if I wear glasses?",
      a: "Lashes that are too long or too curled will touch the lenses. Tell your lash technician at the consultation so the length and curl can be chosen to suit your glasses.",
    },
  ],
  related: ["mi-mapping", "mi-classic-hieu-dung", "mi-hybrid-hieu-dung", "mi-mega-wispy-hieu-dung"],
};

export default article;
