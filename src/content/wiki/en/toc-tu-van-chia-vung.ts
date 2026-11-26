import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/toc-tu-van-chia-vung/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "how-to-section-hair-for-cutting",
  lesson: "toc-tu-van-chia-vung",
  category: "hair",
  title: "How to section hair for cutting: 12 steps from consultation and shampoo to seven clean sections",
  metaTitle: "How to section hair for cutting: 12 steps, 7 sections",
  metaDescription:
    "Step by step before a haircut: neck strip, consultation with touch points, scalp check, shampoo and rinse, detangling from the ends, partings and seven sections.",
  keyword: "how to section hair for cutting",
  keywords: [
    "7 section haircut",
    "hair sectioning for beginners",
    "how to shampoo a client in a salon",
    "how to make a straight parting",
    "how to detangle wet hair",
    "neck strip for haircut",
    "how to prepare hair before cutting",
  ],
  excerpt: "From the moment the client sits down until the hair is shampooed and divided into seven sections, ready to cut. Twelve steps, with how to draw every parting.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-toc-keo-toc-ra-sau-xem-dang-mat-khach"),
    alt: "A stylist with a brown bob stands behind the client and gathers her long blonde hair back with both hands to see her face shape and hairline in the mirror",
  },
  takeaways: [
    "Wrap a **single-use neck strip** before you fasten the cape, so the cape never touches the client's skin.",
    "Consult and check the hair and scalp **while the hair is dry**; agree the length with a touch point and say it back to the client.",
    "Test the water on your own wrist first, massage with the pads of your fingers and shield the hairline with one hand while rinsing.",
    "Detangle wet hair **from the ends upwards**, holding the hair above with your other hand so the scalp is not pulled.",
    "Seven sections: **one top, two sides, two crown, two nape**. A crooked parting means a crooked cut afterwards.",
  ],
  intro: [
    "Learning how to section hair for cutting usually starts with seven sections: one top, two sides, two crown and two nape. Making them is not difficult, but straight, clean partings depend on everything that comes before: the consultation, a thorough shampoo, the right amount of towel-drying and hair detangled until it is smooth.",
    "This article follows the VaraaAi Academy lesson “Consultation, shampoo and sectioning: step-by-step practice” from the Hair course. You go with the stylist from the moment the client sits down until the hair is divided into seven neat sections, ready to cut. Watch the video below to see how the comb is held, then read the steps again.",
  ],
  sections: [
    {
      id: "why-section-hair",
      title: "What sectioning is for",
      blocks: [
        { p: "You can only cut precisely the hair you can see and control. Once the hair sits in sections with clear landmarks on the head, you can always find the previous cutting line again, and hair from a section you have not cut yet does not fall into the one you are working on." },
        { p: "The reasons behind each step, from the consultation questions to why curly hair shrinks when dry, are in the article on [hair consultation](lesson:toc-tu-van-chia-vung-hieu-dung). This one is about doing it." },
        { note: "A scalp with a wound, inflammation or lice means no service. Conditioner times follow the product's instructions. Hygiene rules differ by country, and this article is a training aid, not a licence to practise.", kind: "info", title: "Please note" },
      ],
    },
    {
      id: "seven-sections",
      title: "The seven sections of a haircut",
      blocks: [
        {
          table: {
            head: ["Section", "How many", "Where the line runs"],
            rows: [
              ["Top", "1", "Two straight lines from the temples back to the crown"],
              ["Side", "2", "A line from the top of the ear up to the top section; the hair in front of it is the side"],
              ["Crown (upper back)", "2", "The back split by a centre parting; the part above the line at the occipital bone"],
              ["Nape", "2", "The part below the line at the occipital bone"],
            ],
          },
        },
        { p: "The occipital bone is the part that sticks out a little at the back of the head. The horizontal line runs across it, from behind one ear to behind the other. Sectioning along the shape of the head like this gives every section clear landmarks." },
        { img: { src: img("chia-bay-vung-toc-nhin-tu-phia-sau"), alt: "Seen from behind a seated client: damp blonde hair divided by straight partings, each section held with a silver clip, the stylist standing beside her with a comb", caption: "The back of the head after sectioning: a centre parting runs down, and the line at the occipital bone separates the crown sections from the nape." } },
        { note: "Draw each parting in one continuous stroke with the tip of the tail comb instead of scratching back and forth. A clean parting shows at once where something is off.", kind: "tip", title: "One stroke" },
      ],
    },
    {
      id: "shampooing-a-client",
      title: "How to shampoo a client in a salon: where care slips",
      blocks: [
        {
          table: {
            head: ["Task", "Done right", "Why"],
            rows: [
              ["Positioning the neck", "Towel round the shoulders, neck resting comfortably in the basin, ask if anything presses", "A client with neck or back problems needs the chair adjusted first"],
              ["Testing the water", "On your own wrist first, then ask again once it touches the hair", "Tap temperature can change suddenly, and everyone feels heat differently"],
              ["Massage", "With the finger pads, in small circles", "Nails hurt and scratch the scalp"],
              ["Rinsing", "One hand on the shower head, the other shielding the hairline", "No water runs into the face or ears"],
              ["Conditioner", "On the mid-lengths and ends, left on as the product says", "Every product has its own time"],
            ],
          },
        },
      ],
    },
    {
      id: "common-mistakes",
      title: "Common mistakes when detangling and sectioning hair",
      blocks: [
        {
          table: {
            head: ["Mistake", "What happens", "Fix"],
            rows: [
              ["Rubbing and scrunching with the towel", "More tangles", "Wrap the hair in the towel and press gently from roots to ends"],
              ["Combing wet hair from the roots down", "Knots get pushed down, hair breaks, the scalp is pulled", "Start at the ends and work up, holding the hair above"],
              ["Scratching the comb back and forth for a parting", "Jagged parting, hard to see what is off", "Draw one continuous line"],
              ["Clips bulging, not flat to the head", "Hair pulls on the scalp and sits on the area to be cut", "Twist with moderate tension and clip flat to the head"],
              ["A few strands stray into the next section", "They get mixed into another section's cut", "Pick them back with the tail of the comb"],
              ["Hair left partly dry, partly wet", "Strands stretch and shrink differently, uneven line", "Mist evenly over the area you are about to cut"],
            ],
          },
        },
      ],
    },
    {
      id: "hygiene-and-when-to-stop",
      title: "Hygiene and when to stop",
      blocks: [
        { p: "The cape is used for many clients, so it must never touch the skin of the neck directly. A single-use neck strip is the hygiene barrier between clients, and it also keeps cut hair out of the collar. Combs, scissors and clips must have been cleaned and disinfected after the previous client, as in the lesson [Tools after every customer](lesson:ve-sinh-dung-cu). Wash your hands before you touch the client, following the lesson on [hand washing and gloves](lesson:rua-tay-gang-tay)." },
        { p: "If the check shows a wound, inflammation or lice on the scalp, stop and speak to the client privately. What to say and how to decline are in the lesson [When not to treat a customer](lesson:khi-nao-khong-lam)." },
        { p: "Once the client has left, used towels go into the laundry basket, the neck strip goes in the bin, and the combs, scissors and clips are cleaned and disinfected." },
      ],
    },
    {
      id: "after-sectioning",
      title: "After sectioning: cut, and write it down for next time",
      blocks: [
        { p: "The hair is ready. From here you let each section down in the order the cut calls for, as in the article on the [layered haircut](lesson:cat-nu-tang)." },
        { p: "In VaraaAi, record what you agreed with the client in the notes on the [customer record](lesson:khach-hang), so whoever works next time knows what the client likes. When you set up a haircut as a [service](lesson:dich-vu), give it a duration that includes the shampoo and sectioning, so the day's [appointments](lesson:lich-hen) do not get squeezed." },
      ],
    },
  ],
  howTo: {
    title: "How to section hair for cutting: consultation, shampoo and seven sections",
    id: "hair-sectioning-steps",
    after: "why-section-hair",
    lead: "Twelve steps in the order of the lesson video. The first three are done while the hair is still dry.",
    supplies: [
      "Single-use neck strip and cutting cape",
      "Clean towels",
      "Shampoo and conditioner",
      "Wide-tooth comb for detangling",
      "Tail comb for partings",
      "Sectioning clips",
      "Fine-mist spray bottle",
    ],
    steps: [
      {
        name: "Wash your hands, wrap the neck strip, fasten the cape",
        text: "Wash your hands before you touch the client, and use only combs, scissors and clips that have been cleaned and disinfected. Wrap a single-use neck strip round the client's neck first and fasten the cape over it, so the cape never touches the skin of the neck.",
        image: { src: img("quan-giay-co-dung-mot-lan-truoc-khi-cai-ao-choang"), alt: "A stylist wraps a white paper neck strip round the client's neck and fastens a black cape over it, the client's hair swept neatly to one side" },
      },
      {
        name: "Consult while the hair is dry",
        text: "Ask what the client likes and dislikes about their hair now, ask to see a reference photo, and ask whether they blow-dry or let it dry naturally and whether they often tie it up. Hold a lock at the touch point and say it back: we are cutting to shoulder level, is that right? With curly or wavy hair, explain beforehand that it will shrink once dry, so you leave it a little longer. Note what you agreed in the client record.",
        image: { src: img("tu-van-kieu-toc-voi-anh-mau-tren-may-tinh-bang"), alt: "The stylist sits next to the client holding a tablet with a photo of a long hairstyle, the client pointing at the picture, both smiling" },
      },
      {
        name: "Check the hair and scalp",
        text: "Pull the hair back and look at the face shape and hairline. Make a few partings to see the density, texture and scalp. Comb the hair in a few directions to find whorls at the crown and nape. A wound, inflammation or lice on the scalp means you stop and speak to the client privately.",
      },
      {
        name: "Take the client to the basin and test the water",
        text: "Put a towel round the shoulders, support the neck as it settles in the basin and ask whether anything presses. Turn on the water and test it on your own wrist. Then let it touch the client's hair and ask again whether the temperature is right.",
        image: { src: img("thu-nhiet-do-nuoc-tren-co-tay-truoc-khi-goi"), alt: "A stylist at a black ceramic basin lets the water from the tap run over her own wrist while the client leans back with a towel round her neck" },
      },
      {
        name: "Shampoo, rinse and condition",
        text: "Wet the hair evenly from roots to ends and use just enough shampoo. Massage the scalp with your fingertips in small circles, from the front hairline back to the nape, never with your nails. Rinse thoroughly with one hand shielding the hairline. Apply conditioner to the mid-lengths and ends, leave it on as the product instructs and rinse again thoroughly.",
        image: { src: img("xa-toc-mot-tay-che-chan-toc-cho-khach"), alt: "A stylist rinses the client's hair at the basin with a hand-held shower head, her other hand shielding the hairline so water does not reach the face and ears" },
      },
      {
        name: "Towel-dry by pressing",
        text: "Bring the client back to the chair. Wrap the hair in a towel and press gently from the roots down to the ends, with no rubbing or scrunching. The hair should be damp, not dripping.",
      },
      {
        name: "Detangle from the ends",
        text: "Use a wide-tooth comb. One hand holds the hair above while the comb starts at the ends. Only when the ends are free do you work gradually higher, up to the roots. The hand holding the hair stops the client feeling any pull on the scalp.",
        image: { src: img("go-roi-toc-uot-tu-ngon-bang-luoc-rang-thua"), alt: "Seen from behind, one of the stylist's hands holds the client's damp blonde hair firmly at mid-length while the other combs the ends with a wide-tooth comb" },
      },
      {
        name: "Make the parting",
        text: "Find the client's natural parting, or make a centre parting, depending on the cut. Place the tip of the tail comb at the front hairline and draw it straight back to the crown in one continuous line. A good parting is straight and clean, with a clear line of scalp showing.",
        image: { src: img("re-ngoi-thang-bang-luoc-duoi-chuot"), alt: "Seen from above, a stylist draws a straight centre parting through the client's damp blonde hair with the pointed tip of a tail comb" },
      },
      {
        name: "Section off the top and the two sides",
        text: "From each temple, draw a straight line back to the crown; twist that hair up and clip it flat, and you have the top section. Then draw a line from the top of the ear up to the top section: the hair in front of it is the side section. Twist, clip, and do exactly the same on the other side.",
        image: { src: img("xoan-va-kep-vung-dinh-khi-chia-vung-toc"), alt: "A stylist twists the client's top section into a small coil and holds it with a silver clip, the rest of the hair falling smoothly down" },
      },
      {
        name: "Divide the back into crown and nape sections",
        text: "Draw a straight centre parting from the crown down to the nape, splitting the back into left and right. Then draw a horizontal line from behind one ear to behind the other, across the occipital bone. Above the line are the two crown sections, below it the two nape sections. Twist and clip each one.",
      },
      {
        name: "Check the partings",
        text: "Look over everything once, in the mirror and from behind: are the partings straight, are both sides balanced, has any hair strayed into the wrong section? Comb and re-part anything that is off. A crooked parting means a crooked cut afterwards.",
      },
      {
        name: "Keep the hair evenly damp",
        text: "The hair dries as you work. Mist lightly and evenly over the area you are about to cut. Damp is enough; never let it drip.",
        image: { src: img("xit-suong-giu-toc-am-deu-truoc-khi-cat"), alt: "Seen from behind, a stylist holds a spray bottle and mists the client's sectioned and clipped blonde hair with a fine spray" },
      },
    ],
  },
  faq: [
    {
      q: "What are the 7 sections in hair cutting?",
      a: "One top section, two side sections over the ears, two crown sections and two nape sections. The back of the head is split by a centre parting, and a horizontal line at the occipital bone separates the two crown sections above from the two nape sections below.",
    },
    {
      q: "Do you section hair wet or dry?",
      a: "In the lesson the hair is shampooed, towel-dried until it is damp but not dripping, detangled, and only then parted and sectioned. While you work it is kept evenly damp with a fine-mist spray, because patchy moisture gives an uneven cutting line.",
    },
    {
      q: "Where do you start detangling wet hair?",
      a: "At the ends, working gradually up to the roots with a wide-tooth comb while one hand holds the hair above. Starting at the ends stops knots being pushed down, breaks less hair and does not pull on the client's scalp.",
    },
    {
      q: "How do you make a straight parting?",
      a: "Use the pointed tip of a tail comb: place it at the front hairline and draw one continuous line back to the crown, without scratching back and forth. A correct parting is straight and clean, with a clear line of scalp showing.",
    },
    {
      q: "Why use a neck strip before the cutting cape?",
      a: "The cape is used for many clients. A single-use neck strip stops the cape touching the skin of the neck directly, acts as a hygiene barrier between clients and keeps cut hair out of the collar.",
    },
    {
      q: "How do you test the water temperature when shampooing a client?",
      a: "Test it on your own wrist first, then let the water touch the client's hair and ask whether the temperature is right. Tap temperature can change suddenly, and everyone feels heat and cold differently.",
    },
  ],
  related: ["toc-tu-van-chia-vung-hieu-dung", "cat-nu-bang", "cat-nu-tang", "cat-nam-co-ban"],
};

export default article;
