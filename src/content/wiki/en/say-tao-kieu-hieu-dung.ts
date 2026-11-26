import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/say-tao-kieu-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "how-to-blow-dry-hair-without-damage",
  lesson: "say-tao-kieu-hieu-dung",
  category: "hair",
  title: "How to blow-dry hair without damage: why hair shines, holds its shape and survives the heat",
  metaTitle: "How to blow-dry hair without damage: shine, hold, safe heat",
  metaDescription:
    "Blow-drying explained: why the nozzle points down, rough-drying first, round and paddle brushes, the cool shot, drying curly hair and using heat safely.",
  keyword: "how to blow-dry hair without damage",
  keywords: [
    "does blow-drying damage hair",
    "why is my hair frizzy after blow-drying",
    "what is the cool shot button for",
    "round brush or paddle brush",
    "heat protection before blow-drying",
    "how to diffuse curly hair",
    "blow-dry without dry, brittle hair",
  ],
  excerpt: "Hair holds a shape once it is fully dry and cool, and it shines when the air flows down the hair shaft. Those two facts explain most of what a stylist does with a brush and a dryer.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-toc-say-toc-dai-bang-luoc-tron-va-may-say"),
    alt: "A stylist lifts a section on top of a client's head with a round brush and dries it with a black hairdryer while the long-haired blonde client smiles in a gold-framed mirror",
  },
  takeaways: [
    "Wet hair is easy to reshape. It only holds the new shape once it is **completely dry and cool**, which makes the cool shot a real styling step.",
    "The nozzle always points **down the hair shaft**. Air blowing upwards lifts the cuticle and leaves the hair frizzy and dull.",
    "Rough-dry by hand to about seventy or eighty percent before using a brush: it is faster and the hair takes less heat.",
    "A paddle brush is for straight, smooth hair; a round brush for volume, bent ends and curls. Natural curls you want to keep need a diffuser and no brushing.",
    "Never press the nozzle against the scalp, never hold it in one place too long, and ask the client whether it is too hot.",
  ],
  intro: [
    "Learning how to blow-dry hair without damage does not start with the round brush. It starts with two short facts about the hair itself: wet hair is easy to reshape and only holds a shape once it is dry and cool, and the surface of each hair is covered in scales lying from root to tip. Anyone who understands these two facts can answer for themselves why hair frizzes after drying, why a style drops within an hour, and how to dry without harming the hair.",
    "This article follows the VaraaAi Academy lesson “Blow-drying: understand it for smooth, shiny hair without damage” in the Hair course. Blow-drying is the last step of every hair service, and clients often judge the whole visit by those final minutes: a beautiful cut dried frizzy still does not look beautiful to them. By the end you will understand the reason behind each move. The step-by-step routine on long hair is in [how to blow-dry hair with a round brush](lesson:say-tao-kieu).",
  ],
  sections: [
    {
      id: "why-blow-drying-shapes-hair",
      title: "Why blow-drying shapes hair, and why the style drops",
      blocks: [
        { p: "When hair is wet, water loosens small bonds inside each hair. At that point the hair is easy to bend into the shape you want. As it dries and cools, those bonds close again and hold the hair in its new shape." },
        { p: "That has two consequences a stylist works with every day:" },
        {
          ul: [
            "**Hair has to be completely dry and cool for the style to hold.** Any dampness left at the roots or at the nape and the style will drop.",
            "**When hair gets wet again, or meets humid air, the style gradually goes.** That is the nature of hair, not a fault of whoever dried it.",
          ],
        },
      ],
    },
    {
      id: "frizz-after-blow-drying",
      title: "Why is my hair frizzy after blow-drying: the cuticle and airflow",
      blocks: [
        { p: "The surface of each hair has a cuticle, a layer of overlapping scales like roof tiles, pointing from the root towards the tip. The direction of the air decides how those tiles lie." },
        {
          table: {
            head: ["Airflow", "The cuticle", "How the hair looks"],
            rows: [
              ["Down the hair, root to tip", "Lies flat", "Light reflects evenly, the hair shines"],
              ["Up the hair, tip to root", "Lifts up", "Frizzy and dull"],
            ],
          },
        },
        { p: "So the nozzle always points down the hair shaft, even when you are lifting the hair for volume. Blow upwards from the ends and the hair frizzes straight away, even though nothing is wrong with it." },
      ],
    },
    {
      id: "before-the-brush",
      title: "Before the brush: towel-drying, heat protection and rough-drying",
      blocks: [
        { p: "A good blow-dry starts before the dryer is switched on. Towel-dry by pressing gently, not rubbing. Detangle from the ends upwards. Then apply a heat protector, sprayed or worked evenly through the lengths and ends, in the amount and way the product's instructions say." },
        { img: { src: img("tham-khan-ep-toc-uot-truoc-khi-say"), alt: "A stylist standing behind a client gently presses her wet hair in a cream towel while the client sits upright in front of the mirror", caption: "Press the towel from root to tip, without rubbing." } },
        { note: "A heat protector reduces damage, but it does not replace good technique. With heat that is too high, or a dryer held too long in one place, no product will save the hair.", kind: "warn", title: "A product does not replace technique" },
        { h3: "Rough-dry by hand first" },
        { p: "Do not pick up the round brush straight away. Rough-dry by hand until the hair is roughly seventy or eighty percent dry, and only then section it and use a brush. Rough-drying is much faster and the hair takes less heat. Working a brush through soaking-wet hair takes a long time and pulls the hair a lot." },
        { p: "The hair is sectioned as for a cut, starting at the nape and working upwards. Each section is no wider than the brush and not too thick, so the air can get through all of it." },
      ],
    },
    {
      id: "brushes-nozzle-cool-shot",
      title: "Round brush or paddle brush, the concentrator nozzle and the cool shot",
      blocks: [
        {
          table: {
            head: ["Tool", "Used for", "Watch out for"],
            rows: [
              ["Wide paddle brush", "Straight, smooth hair, fast, little volume", "The dryer moves above the brush, nozzle pointing down"],
              ["Large round brush", "Volume and softly bent ends", "Many have metal or ceramic barrels that get hot; keep them off the scalp"],
              ["Small round brush", "Curlier ends", "Same warning about a hot barrel"],
              ["Concentrator nozzle", "Focuses the air into a narrow strip where the brush is working", "Always on when styling"],
            ],
          },
        },
        { img: { src: img("say-toc-thang-bang-luoc-det"), alt: "A stylist brushes a long section of a client's blonde hair straight down with a wide paddle brush, the black dryer held above it pointing down", caption: "A paddle brush gives straight, smooth hair with little volume." } },
        { p: "The concentrator sits parallel to the brush, pointing down the hair a few centimetres away from it. The dryer follows the brush from root to tip. The brush needs enough tension for the hair to come out smooth and shiny, but you pull the hair, not the client's head." },
        { note: "If the client's head follows the brush, you are pulling too hard. Ease off and take smaller sections.", kind: "tip", title: "A sign you are pulling too hard" },
        { h3: "What the cool shot button is for" },
        { p: "Many stylists skip this button. When a section has been dried with hot air, keep it on the brush, press the cool shot for a few seconds to cool it, and only then release the brush. Hair keeps the shape it cooled in for longer. Release the brush while the hair is still hot and the section easily relaxes and drops." },
        { img: { src: img("giu-lon-toc-tren-luoc-tron-bam-gio-mat"), alt: "Close-up of a blonde section wound round a large round brush near the ends, with the concentrator of a black dryer aimed at the hair on the brush", caption: "The section stays on the brush until it has cooled." } },
      ],
    },
    {
      id: "volume-smooth-under-curls",
      title: "Volume, smooth, ends turned under, and drying curly hair",
      blocks: [
        { p: "The same round brush gives different results depending on where you hold the section relative to the head." },
        {
          table: {
            head: ["You want", "Hold the hair", "Dry it"],
            rows: [
              ["Root volume", "Lift the section high, against the way it lies", "Roots first, so they dry standing up"],
              ["Smooth, close to the head", "Direct the section down, close to the head", "Downwards from root to tip"],
              ["Ends turned under, as in a bob", "Round brush underneath the section", "Turn the brush inwards at the ends"],
            ],
          },
        },
        { img: { src: img("say-cup-duoi-toc-bob-bang-luoc-tron"), alt: "A stylist dries a client's chin-length blonde bob with a large round brush, turning the ends gently under, the dryer pointing down from above", caption: "Ends under: the brush goes beneath the section and turns in at the ends." } },
        { h3: "Natural curls are different" },
        { p: "If the client wants to keep her curls, do not use a brush and do not comb the hair while it is drying, because the curls break up into frizz. Use a diffuser, the large round attachment with many prongs, on low airflow and medium heat. Lift the hair into the bowl of the diffuser, hold it still for a while, then move on. Touch the hair as little as possible until it is completely dry." },
        { img: { src: img("toc-xoan-tu-nhien-giu-lon-sau-khi-say"), alt: "A woman with dry chestnut ringlets while the stylist lifts one bouncy curl gently with her fingertips", caption: "The curls keep their shape when the hair dries without being brushed." } },
      ],
    },
    {
      id: "does-blow-drying-damage-hair",
      title: "Does blow-drying damage hair: heat, distance and the scalp",
      blocks: [
        { p: "Heat harms hair when it is too high for that hair, or when it stays in one place. Both are in the hands of the person holding the dryer." },
        {
          ul: [
            "**Fine, fragile, coloured or bleached hair:** moderate heat.",
            "**Thick, coarse hair:** can take more heat, but keep the dryer moving at all times.",
            "**Every hair type:** never press the nozzle against the scalp, never hold it in one place too long.",
          ],
        },
        { note: "The scalp, the ears and the nape burn easily. Ask the client from time to time whether it is too hot, and use the dryer as the manufacturer instructs. What to do if a client does get burnt is covered in [first aid in the salon](lesson:xu-ly-su-co).", kind: "warn", title: "Scalp burns really happen" },
        { p: "What this article describes is common trade experience for practice. Every country and every school has its own way of working, and the lesson is a training aid, not a licence." },
      ],
    },
    {
      id: "posture-hygiene-notes",
      title: "The stylist's posture, brush hygiene and client notes",
      blocks: [
        { p: "A day of blow-drying many clients puts a lot of strain on a stylist's shoulders and wrists. Raise the client's chair to a height that keeps your elbows below your shoulders. Stand with your back straight, feet slightly apart and wrists straight. Switch hands when you can, and choose a light dryer." },
        { p: "After every client, remove all the hair from the brushes, wash them and disinfect them as the product instructs, as in [how to disinfect tools](lesson:ve-sinh-dung-cu). The filter at the back of the dryer needs regular cleaning too: when it clogs with dust and hair, the dryer runs hotter, loses airflow and wears out sooner." },
        { img: { src: img("go-toc-khoi-luoc-tron-sau-moi-khach"), alt: "Two hands in black gloves use the tail of a comb to pull hair out of a round brush on a stone counter, beside a paddle brush and a spray bottle on a towel" } },
        { p: "A blow-dry is a service that needs its own time. In VaraaAi, [set separate durations](lesson:dich-vu) for “Cut + blow-dry” and “Blow-dry only”, so the [appointment calendar](lesson:lich-hen) does not get squeezed. In the client's notes in the [customer records](lesson:khach-hang), write down the brush, the products and the look she likes, volume or sleek, so whoever dries her hair next time knows." },
      ],
    },
  ],
  faq: [
    {
      q: "How do you blow-dry hair without damaging it?",
      a: "Towel-dry by pressing, detangle, apply a heat protector as instructed, and rough-dry by hand to about seventy or eighty percent before using a brush. Keep the nozzle pointing down the hair shaft and always moving, use moderate heat on fine or coloured hair, and cool each section with the cool shot before releasing the brush.",
    },
    {
      q: "Why is my hair frizzy after blow-drying?",
      a: "Usually because the air blew upwards from the ends towards the roots. The cuticle lies like roof tiles from root to tip, and air blowing the wrong way lifts it, so the hair looks frizzy and dull. Point the nozzle down the hair shaft. With curly hair, brushing while it dries also breaks the curls into frizz.",
    },
    {
      q: "What is the cool shot button on a hairdryer for?",
      a: "It cools the section you have just dried while it is still on the brush. Hair holds its shape once it is dry and cool, so a few seconds of cool air before releasing the brush makes the style last longer. Release it while the hair is still hot and the section easily relaxes and drops.",
    },
    {
      q: "Does blow-drying damage hair?",
      a: "It can, if the heat is too high or the dryer stays in one place too long. Fine, fragile, coloured or bleached hair should get moderate heat; thick hair can take more, but the dryer must keep moving. A heat protector reduces damage but does not replace good technique.",
    },
    {
      q: "Should I use a round brush or a paddle brush?",
      a: "A wide paddle brush is for straight, smooth hair, quickly and with little volume. A round brush is for volume, bent ends or curls: a large one gives a soft bend, a small one more curl. Round brushes with metal or ceramic barrels get hot, so keep them off the scalp.",
    },
    {
      q: "How do you dry naturally curly hair and keep the curls?",
      a: "Use a diffuser on low airflow and medium heat. Lift the hair into the bowl of the diffuser, hold it still for a while, then move on, touching it as little as possible and not brushing it until it is completely dry.",
    },
  ],
  related: ["say-tao-kieu", "cat-nu-tang-hieu-dung", "cat-mai-hieu-dung", "ve-sinh-dung-cu"],
};

export default article;
