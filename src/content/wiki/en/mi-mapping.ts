import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mi-mapping/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "how-to-do-lash-mapping",
  lesson: "mi-mapping",
  category: "lash",
  title: "How to do lash mapping: 11 steps from measuring the natural lashes to placing anchor lashes",
  metaTitle: "How to do lash mapping: a lash map in 11 steps",
  metaDescription:
    "Lash mapping step by step: measure the natural lashes, draw five zones on the pad, note length and curl, mirror the other eye, then place anchor lashes and check.",
  keyword: "how to do lash mapping",
  keywords: [
    "lash map",
    "lash mapping for beginners",
    "cat eye lash map",
    "lash mapping zones",
    "what are anchor lashes",
    "how to measure natural lashes",
    "lash mapping stickers",
  ],
  excerpt: "Draw a lash map, then follow it: measure the natural lashes, split the pad into five zones, write length and curl, place anchor lashes, fill in and compare both eyes.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-mi-lam-theo-ban-do-mi-cho-khach-trong-studio"),
    alt: "A lash technician sits at the head of the bed in an elegant studio, leaning over a client lying down, with a gold-framed standing mirror and an arched lamp behind her",
  },
  takeaways: [
    "The lash map is drawn **on the under-eye pad**: a few short lines split the lash line into five zones, and the length and curl go under each line.",
    "Measure the natural lashes **looking straight down from above**, never from the side. Their length and strength are the limit of the map.",
    "The other eye gets a mirror image of the map, and you **measure its natural lashes again** instead of copying the numbers.",
    "Place **anchor lashes** first, a few per zone, so you see the shape of the style while it is still easy to correct.",
    "Lengths blend from zone to zone instead of jumping in steps. At the end, record the map for the next refill.",
  ],
  intro: [
    "How to do lash mapping comes in two halves: think first on the under-eye pad, then attach exactly what you wrote down. The map divides the lash line into zones and fixes the length and curl of each one in advance. With it, both eyes come out balanced and the style is the one you agreed with the client.",
    "This article follows the VaraaAi Academy lesson “Lash mapping: drawing a lash map step by step” in the Lashes course. The example is a soft cat eye for a client with almond eyes. The lengths are only an example for one client: a real map always depends on the eyes and natural lashes of the person lying in front of you.",
  ],
  sections: [
    {
      id: "what-the-map-is-for",
      title: "What a lash map is for",
      blocks: [
        { p: "The map is a reminder sitting right next to the lash line. While you work, you do not have to remember how many millimetres each zone takes, or guess what you did on the other eye. Everything is written on the pad." },
        { p: "This article is about the thinking before you attach. Placing each lash, from isolation to the distance from the lid, stays exactly as in the practice article [how to do classic lash extensions](lesson:mi-classic). Which style suits which eye shape, and how the J, B, C, CC, D and L curls differ, is explained in the theory article [What is lash mapping](lesson:mi-mapping-hieu-dung)." },
      ],
    },
    {
      id: "cat-eye-lash-map",
      title: "An example lash map for a soft cat eye",
      blocks: [
        { p: "This is the map used in the lesson video, for a client with almond eyes." },
        {
          table: {
            head: ["Zone", "Length (example)", "Curl (example)"],
            rows: [
              ["1, inner corner", "8 mm", "C"],
              ["2", "9 mm", "C"],
              ["3", "10 mm", "C"],
              ["4", "11 mm", "C"],
              ["5, outer corner", "12 mm", "C"],
            ],
          },
        },
        { img: { src: img("bo-mi-kieu-mat-meo-nhe-dai-dan-ve-duoi-mat"), alt: "Close-up of a closed eye with a finished soft cat eye classic set, the lashes short at the inner corner and getting evenly longer towards the outer corner", caption: "The result of the example map: length rising from the inner to the outer corner, with no steps." } },
        { note: "These numbers are only an example for one client. The length in each zone must never exceed what the natural lashes you measured can carry: where the lashes are weak, that zone gets shorter and lighter, however good the map looks.", kind: "warn", title: "Do not copy the numbers" },
        { p: "Two common variations: for a doll style, the longest point goes right at the line marking the pupil. For a fox eye, you can also write a stronger curl for the outer zone, for example switching from C to D, so the outer corner is lifted." },
      ],
    },
    {
      id: "landmarks-and-angle",
      title: "Two landmarks to remember and the angle for measuring",
      blocks: [
        { p: "While the client is still sitting up with her eyes open and looking straight ahead, remember two landmarks: **the position of the pupil** and **the highest point of the eyebrow**. Once she is lying down with her eyes closed you can no longer see them, yet you need them to place the longest point of the style." },
        { p: "When you measure and when you draw, look at the eye straight down from above. A side view skews the lengths and the position of the zones, the map is wrong from the start, and the two eyes will not match." },
        { note: "Use a fine, non-toxic pen that is safe for skin. The tip touches only the pad, never the lashes and never the eye. Today the pad has to be really flat and neat, because it is the paper you draw on.", kind: "warn", title: "The pen touches only the pad" },
      ],
    },
    {
      id: "anchor-lashes",
      title: "What anchor lashes are and why they go on first",
      blocks: [
        { p: "Anchor lashes are a few extensions attached first in each zone, at exactly the length on the map. They are the frame of the whole set. Looking at them, you see straight away the curve of the style: does it rise gradually towards the outer corner, is there a break anywhere?" },
        { p: "It is also the easiest moment to correct anything, because only a few lashes are on. Some salons let the client sit up for a quick look in the mirror after the anchors, once the glue has set and her eyes do not sting. If yours does not, stand at the head of the bed, look down and compare the two eyes before you fill in." },
      ],
    },
    {
      id: "lash-mapping-mistakes",
      title: "Three common mistakes when working from a lash map",
      blocks: [
        {
          table: {
            head: ["Mistake", "Result", "How to avoid it"],
            rows: [
              ["Measuring and drawing from the side", "The map is off from the start and the eyes do not match", "Look straight down from above when you measure and draw"],
              ["Copying the map unchanged to the other eye", "Ignores that the natural lashes on each side differ", "Mirror the map, measure that side again and adjust the lengths if needed"],
              ["Jumping too far in length between zones", "The lash line looks stepped", "Let the lengths blend where two zones meet"],
            ],
          },
        },
        { p: "All three are avoided by working slowly and looking carefully at every step." },
      ],
    },
    {
      id: "record-the-map",
      title: "Record the map for the next refill",
      blocks: [
        { p: "The pad is removed at the end of the appointment, so the map has to be copied before the client leaves: the style, and the length and curl of each zone. At the next [refill](lesson:mi-dam-thao), you can repeat it exactly or adjust it to her wishes." },
        { p: "In VaraaAi, the place for it is the internal notes in the [client's profile](lesson:khach-hang), which only the salon can see. Whichever technician sees the client next time can follow the same map. Book the refill [appointment](lesson:lich-hen) while she is still in the salon." },
        { note: "The lengths in this article (8–12 mm, C curl) are only an example for one client; a real map always depends on each client's eyes and the strength of her natural lashes, the lash maker's chart and the glue maker's instructions. Rules on beauty services and products differ from country to country. This article is a training aid, not a licence.", kind: "info", title: "Note" },
      ],
    },
  ],
  howTo: {
    title: "How to do lash mapping and follow the map, step by step",
    id: "lash-mapping-steps",
    after: "what-the-map-is-for",
    lead: "Eleven steps in the order of the lesson video. The first six draw the map, the last five follow it.",
    supplies: [
      "Under-eye pads, applied really flat and neat",
      "A fine, non-toxic, skin-safe pen, or printed lash mapping stickers",
      "An extension of known length to compare with, or a small lash ruler",
      "Lash trays with the lengths on the map, plus a shorter strip for baby lashes",
      "Glue, tweezers and single-use items as in the classic lesson",
    ],
    steps: [
      {
        name: "Consult and agree on one style",
        text: "The client sits up, eyes open, looking straight ahead. Look at the eye shape and the natural lashes, ask what she wants, show her example photos of a few styles and explain which one suits her and why. Remember where the pupil and the highest point of the brow are. Do not start while she is still undecided.",
        image: { src: img("tu-van-xem-anh-mau-kieu-mi-tren-may-tinh-bang"), alt: "A lash technician and a client sit on a cream sofa in the studio looking at an example lash style on a tablet, the client smiling and pointing at the screen" },
      },
      {
        name: "Prep as in the classic lesson",
        text: "Make the client comfortable, cleanse the lashes, apply the under-eye pads and brush the lashes. The pads have to be perfectly flat and neat, because you are about to draw on them.",
      },
      {
        name: "Measure the natural lashes",
        text: "Look at the eye straight down from above. At the inner corner, the middle and the outer corner, hold an extension of known length parallel to a natural lash to compare; some technicians use a small lash ruler. Note how long and how strong the lashes are in each zone: that is the limit of your map.",
        image: { src: img("do-mi-that-bang-mot-soi-mi-noi-da-biet-do-dai"), alt: "Tweezers in a black-gloved hand hold a lash extension parallel to one of the client's natural lashes, her eye closed, to compare the length" },
      },
      {
        name: "Divide the pad into five zones",
        text: "With the fine pen, draw a few short lines on the pad, dividing the lash line from the inner to the outer corner into five zones. Printed mapping stickers work too. Also mark the position of the pupil you noted while the client was sitting up.",
        image: { src: img("ve-vach-chia-nam-vung-tren-mieng-lot-mat"), alt: "A black-gloved hand holds a fine plum-coloured pen and draws short lines on the white pad under a client's closed eye to mark the zones", caption: "The pen touches only the pad, well away from the lashes and the eye." },
      },
      {
        name: "Write the length and curl for each zone",
        text: "Write them just under each line. For the soft cat eye in the example: 8, 9, 10, 11 and 12 mm from the inner to the outer corner, all with a C curl. Wherever the natural lashes are weak, write a shorter, lighter lash.",
      },
      {
        name: "Mirror the map on the other eye",
        text: "The inner corner is still zone one and the outer corner still zone five. Measure the natural lashes on that side again, because two eyes are rarely identical, and adjust the lengths if needed so the result looks balanced.",
      },
      {
        name: "Set out the strips in map order",
        text: "Arrange the lash strips in the order of the map, the shortest for the inner corner and then longer. Keep an extra, shorter strip ready for the baby lashes at the inner corner. Your hands do not have to search, and you are less likely to mix up lengths.",
        image: { src: img("xep-vi-mi-theo-thu-tu-ban-do"), alt: "A white stone tray with gold edging seen from above, holding a pale pink lash tile with strips ordered from short to long, a jade stone with a glue drop, two tweezers and a glue bottle" },
      },
      {
        name: "Place the anchor lashes",
        text: "In each zone, attach a few lashes first at exactly the length on the map. The technique is the classic one: isolate a single natural lash, keep the base off the lid and never on the skin. Look at the anchors to check the curve of the style.",
        image: { src: img("gan-mi-neo-o-tung-vung-theo-so-do"), alt: "Close-up of a closed eye with a few black extensions attached at even intervals along the natural lash line, resting on a white pad", caption: "Anchor lashes: a few spread across the zones, enough to show the shape of the style." },
      },
      {
        name: "Check the shape",
        text: "If your salon lets the client sit up and look in the mirror after the anchors, do it once the glue has set and her eyes do not sting. Otherwise stand at the head of the bed, look down and compare the eyes. Correct things now, while only a few lashes are on.",
      },
      {
        name: "Fill in zone by zone",
        text: "Attach the remaining lashes zone by zone. Where two zones meet, let the lengths change gradually so the line stays soft, with no steps. Alternate between zones as in the classic lesson, so the glue has time to cure and nothing sticks together.",
      },
      {
        name: "Check symmetry, finish and record the map",
        text: "Stand at the head of the bed and look down at both eyes at once: are the outer length, the longest point and the curl the same on both sides? Add a few lashes wherever something is missing and brush through. Remove the pads while her eyes are still closed, give aftercare as in the classic lesson and record the map in her profile.",
        image: { src: img("kiem-tra-can-doi-hai-mat-tu-dau-giuong"), alt: "A client lying on the bed seen from the head of the bed, both eyes closed with white pads still on, the two finished lash lines looking alike" },
      },
    ],
  },
  faq: [
    {
      q: "How many zones does a lash map have?",
      a: "In this lesson the lash line is divided into five zones, from the inner to the outer corner, with a few short lines drawn on the under-eye pad. Printed mapping stickers can be used instead. The length and curl of each zone are written under its line.",
    },
    {
      q: "What pen do you use to draw a lash map?",
      a: "A fine pen that is non-toxic and safe for skin. The tip touches only the under-eye pad, never the lashes and never the eye.",
    },
    {
      q: "What lengths go in a cat eye lash map?",
      a: "The example in the lesson is a soft cat eye: 8, 9, 10, 11 and 12 mm from the inner to the outer corner, all in a C curl. That is only an example for one client. The length in each zone must never exceed what the natural lashes there can carry.",
    },
    {
      q: "What are anchor lashes?",
      a: "Anchor lashes are a few extensions placed first in each zone at exactly the length on the map, as a frame for the set. They show whether the curve of the style is right, and it is the easiest moment to correct because only a few lashes are on.",
    },
    {
      q: "Can I copy the lash map from one eye to the other?",
      a: "Not unchanged. The other eye gets a mirror image, with the inner corner still zone one and the outer corner zone five, but you measure the natural lashes on that side again and adjust the lengths if needed. The goal is a result that looks balanced, not two identical maps.",
    },
    {
      q: "Why measure the natural lashes from above?",
      a: "Looking from the side skews the lengths and the position of the zones. If the map is wrong from the start, the two eyes will not match, however carefully the later steps are done.",
    },
  ],
  related: ["mi-mapping-hieu-dung", "mi-classic", "mi-hybrid", "mi-dam-thao"],
};

export default article;
