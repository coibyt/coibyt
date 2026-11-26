import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/french-ombre-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "what-is-a-french-manicure",
  lesson: "french-ombre-hieu-dung",
  category: "nail",
  title: "What is a French manicure? The smile line, four French styles and baby boomer ombré nails",
  metaTitle: "What is a French manicure? Smile line, styles and ombré",
  metaDescription:
    "What a French manicure is, what makes a good smile line, classic, deep, micro and coloured French, baby boomer ombré, and why the white stays thin.",
  keyword: "what is a French manicure",
  keywords: ["French manicure smile line", "types of French manicure", "micro French nails", "what are baby boomer nails", "ombré nails vs French", "French tips on short nails", "why French tips wrinkle"],
  excerpt: "A beautiful French set comes from an even smile line on all ten nails. Here is what makes a good smile line, how deep the white should be, the French styles and baby boomer ombré.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("bo-mong-french-co-dien-tren-hai-ban-tay"),
    alt: "A client's two hands resting one over the other on a cream cushion, ten classic French nails with a sheer pink base and even white tips",
  },
  takeaways: [
    "With a French, the beauty lies in **all ten nails side by side**: one deep tip next to a shallow one is the first thing a client sees.",
    "A good smile line has four qualities: even depth, two halves that mirror each other, a crisp edge and the same line on all ten nails.",
    "There is no fixed number for the white. Short nails get a slim tip; long nails can take a deeper one.",
    "Ombré (baby boomer) has no smile line: pink at the cuticle fades into milky white, thanks to **very thin white** and gradual blending.",
    "White gel is very opaque, so a thick layer struggles to cure through. Two thin layers, each cured for the brand's full time, always beat one thick layer.",
  ],
  intro: [
    "What is a French manicure? Almost every client can picture it: a sheer pink base with a band of white at the tip. It is elegant and clean, and it suits nearly everyone, from brides to office workers. Because it is so simple, though, even a small mistake shows straight away, and the technician has no pattern to hide behind.",
    "This article follows the VaraaAi Academy lesson “French and ombré: understand them for an even, beautiful smile line” in the Nails course. Afterwards you will be able to look at a smile line and say whether it is right, choose a French style for each nail length, explain how ombré differs from French, and tell a client why the style in her photo may not suit her own nails.",
  ],
  sections: [
    {
      id: "french-smile-line",
      title: "The French manicure and its smile line: judge ten nails, not one",
      blocks: [
        { p: "The soul of a French set is the **smile line**: the curve where the white tip meets the pink. Every judgement about a French, good or not yet good, comes back to this curve." },
        { img: { src: img("duong-cuoi-mong-french-can-doi"), alt: "Close-up of a French nail on a client's finger, the white tip meeting the sheer pink base in a balanced curve", caption: "The smile line is the curve where the white meets the pink." } },
        { p: "There is a failure that happens a lot to skilled technicians. Looked at one by one, every nail is beautiful. Then the client lays both hands on the table, and this nail has a deep white tip, that one a shallow tip, this one is balanced and that one lopsided. The client says nothing; she simply does not come back." },
        { p: "The reason is simple: the client looks at both hands at once. One uneven nail makes the whole set look off. So with a French, the technician treats the ten nails as one piece of work from the moment the smile line is chosen." },
      ],
    },
    {
      id: "good-smile-line",
      title: "What makes a good French manicure smile line",
      blocks: [
        {
          ol: [
            "**Even depth.** The white has no high and low spots.",
            "**Balance.** The two halves of the curve mirror each other.",
            "**A crisp, clean edge.** The border between white and pink is sharp, with no blurring.",
            "**The same on all ten nails.**",
          ],
        },
        { h3: "Follow the natural free edge, or choose a line" },
        { p: "The most natural approach is to follow the client's own free-edge line, where the nail leaves the skin of the fingertip. The trouble is that this line changes from finger to finger: some curve deeply, some are almost straight, some are crooked." },
        { img: { src: img("duong-dau-mong-that-truoc-khi-ve-french"), alt: "Close-up of an unpainted natural nail on a client's finger, showing the clear border between the pink nail bed and the ivory free edge", caption: "The natural free-edge line: where the pink nail turns into the free edge. Every finger has a slightly different line." } },
        { p: "When the natural line is good, follow it. When it is crooked, do not follow the crookedness. Choose one good smile line that suits the whole hand and paint exactly that line on all ten nails. Where the natural free edge underneath is uneven, cover it with a slightly more opaque pink base." },
        { img: { src: img("loi-duong-cuoi-french-lech-hai-ben"), alt: "Close-up of a French nail where the white on one side reaches much further towards the cuticle than on the other, so the smile line is lopsided", caption: "An example of the mistake: the two sides have different depths, so the smile line is lopsided." } },
        { note: "Before painting, have the client lay her hand flat and look at the nails from above. Set the depth by the shortest or most uneven nail, so the whole set can match.", kind: "tip", title: "Set the depth by the hardest nail" },
      ],
    },
    {
      id: "white-tip-proportion",
      title: "How deep should the white tip be? Balance it with length and shape",
      blocks: [
        { p: "There is no fixed number for the white. The principle is to balance it with the length and shape of the nail." },
        {
          ul: [
            "**Short nails:** keep the white slim, and the fingers look slimmer and longer. A white tip that is too deep on short nails makes the fingers look short and stubby.",
            "**Long nails:** the white can go deeper.",
            "**Square nails:** a flatter smile line.",
            "**Almond nails:** a deeper curve that follows the shape.",
          ],
        },
        { p: "Because the smile line has to suit the shape, the nails are always shaped before you paint. If you want to review the shapes and how to choose them for a hand, read [nail shapes and how to choose](lesson:dua-form-mong-hieu-dung)." },
      ],
    },
    {
      id: "types-of-french",
      title: "Types of French manicure: classic, deep, micro and coloured",
      blocks: [
        { p: "The proportion rules above give rise to a few French styles. The painting technique stays the same; only the height of the white, or its colour, changes." },
        {
          table: {
            head: ["Style", "What it looks like", "Note"],
            rows: [
              ["Classic French", "Sheer pink base, moderate white tip", "The most familiar style and the starting point for learning the others"],
              ["Deep French", "Higher white, more pronounced curve", "Suits long nails"],
              ["Micro French", "Just a hairline of white at the edge of the tip", "Perfect for short nails, or clients who want something very discreet"],
              ["Coloured French", "The white replaced by another colour, such as burgundy, gold glitter or a shade to match an outfit", "Exactly the same technique as white French"],
            ],
          },
        },
        { img: { src: img("mong-micro-french-duong-trang-manh"), alt: "Close-up of a micro French nail, only a very fine white line running along the edge of the tip over a sheer pink base", caption: "Micro French: a fine white line at the edge, ideal for short nails." } },
        { img: { src: img("mong-french-sau-phan-trang-cao"), alt: "Close-up of a deep French nail, the white covering almost the front half of the nail with a pronounced curve over the pink", caption: "Deep French: a high white tip and a clear curve, for long nails." } },
        { img: { src: img("mong-french-mau-do-ruou"), alt: "Close-up of a coloured French nail, the tip painted glossy burgundy with a crisp smile line over a sheer pink base", caption: "Coloured French: the same technique, just a different colour at the tip." } },
      ],
    },
    {
      id: "baby-boomer-ombre",
      title: "What are baby boomer nails, and how ombré differs from French",
      blocks: [
        { p: "Ombré, also called baby boomer, is a colour fade: natural pink at the cuticle fading into milky white at the tip. There is no smile line. A good ombré is one where you cannot see where the colour starts to change, like a thin mist." },
        { img: { src: img("mong-ombre-baby-boomer-hong-trang-sua"), alt: "Close-up of a baby boomer ombré nail, natural pink at the cuticle fading into milky white at the tip with no visible border", caption: "Baby boomer ombré: pink fades gradually into milky white, with no smile line." } },
        { p: "For clients who want their nails to look natural for a long time, it is a great suggestion. The area at the cuticle is already pink, so as the nail grows out, the new growth blends in and there is no obvious gap of the kind a dark colour leaves." },
        { p: "That mist comes from two things:" },
        {
          ol: [
            "**Very thin white.** When the white layer is thin, the pink underneath still shows through, so the colour fades softly.",
            "**Building it up gradually.** Blend lightly in several rounds rather than trying to finish in one go.",
          ],
        },
        { p: "The typical mistake of a technician in a hurry is to put on one thick layer of white and then try to blend it. The result is a white band across the nail, patchy in places, as if paint had been smeared on." },
      ],
    },
    {
      id: "common-faults",
      title: "Common French and ombré faults",
      blocks: [
        {
          table: {
            head: ["Fault", "Why it happens", "What to do"],
            rows: [
              ["Uneven depth", "The two sides of a nail differ, or the nails differ from each other", "Choose one smile line for the whole hand before painting"],
              ["White too thick", "White gel is very opaque, lamp light struggles through, so a thick layer under-cures, wrinkles and lifts", "Two thin white layers, each fully cured"],
              ["Blurred edge", "The smile line was not cleaned up before curing", "Sharpen the line while the gel is still uncured"],
              ["White too chalky or streaky", "Trying to cover in one layer, or gel not stirred well", "Stir the gel and cover in two thin layers"],
              ["A band across an ombré", "Thick white, blended in a hurry", "Thin layers, blended lightly in several rounds"],
            ],
          },
        },
        { img: { src: img("loi-phan-trang-french-qua-day"), alt: "Close-up of a French nail with a white tip applied far too thick, raised at the edge, the surface lumpy and unevenly streaked", caption: "An example of the mistake: the white is too thick. A layer like this easily stays under-cured underneath." } },
        { p: "The principle that thin layers cure evenly while thick layers wrinkle and stay soft underneath is explained in [what is gel polish](lesson:gel-hieu-dung). With white it is even more true. Two thin layers of white, each cured for the full time the brand gives, are better than one thick layer." },
        { note: "Under-cured gel lifts easily and is more likely to cause an allergy, and uncured gel must never touch the skin. Curing times and product use always follow the manufacturer's instructions. Rules on nail products differ by country, so check the ones that apply where you work. This article is a training aid, not a licence.", kind: "warn", title: "Working safely with white gel" },
        { p: "The signs of a gel allergy and how to prevent one are covered in [Allergies and chemicals](lesson:di-ung-hoa-chat)." },
      ],
    },
    {
      id: "gels-and-brushes",
      title: "Choosing gels and brushes for French and ombré",
      blocks: [
        { p: "No special brand is needed. What matters is that each product does its own job well." },
        {
          ul: [
            "**White gel for the tips:** thick enough not to run, and opaque enough to look even in one or two thin layers.",
            "**Pink or nude base gel:** sheer, or slightly opaque when the natural free edge needs hiding.",
            "**White and nude builder gel:** many technicians paint tips with it because it is thick, holds its shape and is easy to control.",
            "**A long, thin liner brush** to paint the smile line, and **a small flat brush** to clean up the line.",
            "**A small sponge or a clean brush** for blending ombré.",
          ],
        },
        { img: { src: img("gel-va-co-ve-french-ombre"), alt: "Three bottles of white, pink and clear gel, a pot of white builder gel, three brushes, two sponges and a bottle of cleanser on a cream towel" } },
        { p: "How to hold each brush, which corner to start from and how to blend are shown slowly in the practice article [how to do French tips and ombré nails](lesson:french-ombre)." },
      ],
    },
    {
      id: "advice-and-booking",
      title: "Honest advice, and putting French and ombré in your salon calendar",
      blocks: [
        { p: "Some clients bring a photo of long nails with a deep smile line, while their own nails are short and the free edge is crooked. Be honest that on these nails that style will make the fingers look shorter. Then suggest a micro French, a slimmer classic or an ombré, explain why and show it on her own nails. Clients are usually grateful, because they can see you are doing it for them and not just to get the job done." },
        { p: "French and ombré take longer to do well than a single colour. In VaraaAi, [set them up as their own services](lesson:dich-vu) with their own duration and price, so clients book the right thing and your calendar leaves enough time. The price of each style can go on the [price list](lesson:bang-gia) in the salon, and the next visit can be booked straight into the [appointment calendar](lesson:lich-hen)." },
      ],
    },
  ],
  faq: [
    {
      q: "What is a French manicure?",
      a: "A French manicure has a sheer pink base and a white tip, with the two meeting in a curve called the smile line. The classic style has a moderate white tip; there are also deep French, micro French and coloured French.",
    },
    {
      q: "What is the smile line on French nails?",
      a: "The smile line is the curve where the white tip meets the pink. A good smile line has an even depth, two halves that mirror each other, a crisp edge with no blurring, and looks the same on all ten nails.",
    },
    {
      q: "Can you do French tips on short nails?",
      a: "Yes, but keep the white slim. A micro French, just a hairline of white at the edge of the tip, suits short nails very well and makes fingers look slimmer and longer. A white tip that is too deep on short nails makes the fingers look short and stubby.",
    },
    {
      q: "Are ombré and baby boomer nails the same thing?",
      a: "In the nail trade, baby boomer is another name for a pink and white ombré: natural pink at the cuticle fading into milky white at the tip. It has no smile line, and you should not be able to see where the colour starts to change.",
    },
    {
      q: "Why does the white on my French tips wrinkle or lift?",
      a: "Usually because the white layer is too thick. White gel is very opaque and the lamp's light struggles to get through, so a thick layer stays under-cured underneath, then wrinkles and lifts. The fix is two thin white layers, each cured for the full time in the gel brand's instructions.",
    },
    {
      q: "Does ombré show regrowth as the nail grows?",
      a: "Less than a dark colour does. The cuticle area of an ombré is already natural pink, so as the nail grows out there is no obvious gap. That is why ombré suits clients who want their nails to look natural for longer.",
    },
  ],
  related: ["french-ombre", "dua-form-mong-hieu-dung", "gel-hieu-dung", "builder-gel-hieu-dung"],
};

export default article;
