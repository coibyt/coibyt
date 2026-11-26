import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cat-nam-co-ban-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "mens-haircut-basics",
  lesson: "cat-nam-co-ban-hieu-dung",
  category: "hair",
  title: "Men's haircut basics: clipper guards, holding scissors and 6 common mistakes",
  metaTitle: "Men's haircut basics: clipper guards, scissors, mistakes",
  metaDescription:
    "Men's haircut basics: the parts of a cut, clipper guard numbers and the taper lever, holding scissors, scissor-over-comb, blending the top, outline and 6 mistakes.",
  keyword: "men's haircut basics",
  keywords: [
    "clipper guard numbers explained",
    "which clipper guard to start with",
    "how to hold hairdressing scissors",
    "scissor over comb technique",
    "clip with or against the grain",
    "men's haircut mistakes",
    "how often should men get a haircut",
  ],
  excerpt: "The shorter a men's cut, the more every mistake shows. What makes a men's haircut clean and balanced, explained before you switch the clippers on.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-cat-toc-tu-van-kieu-toc-nam-cho-khach"),
    alt: "A barber in a purple waistcoat stands beside a male client seated at a brass-framed mirror, lifting the hair on top of his head as they talk",
  },
  takeaways: [
    "The blend between short and long usually sits around two landmarks: the **parietal ridge** and the **occipital bone**.",
    "A guard number only tells you roughly how much length is left, and it varies by brand. Always start with a **longer guard**.",
    "Clip against the growth, guard flat, slowly, with overlapping strokes. Pressing hard or tilting the clipper makes holes.",
    "The weakest spot is where the sides meet the top: blend gradually from short to long until you feel no ridge when you brush upwards.",
    "A short cut usually keeps its shape for about **3–5 weeks**. Tell the client, so the next visit is booked at the right time.",
  ],
  intro: [
    "When people start learning men's haircut basics, they often assume a short cut is the easy one. It is the other way round: because the hair is short, every mistake shows. A dip, a ridge, sideburns that do not match, and the client sees it in the mirror straight away.",
    "This article follows the VaraaAi Academy lesson “Men's haircut basics: understand them for a clean, balanced cut” in the Hair course, the theory half of the topic. By the end you can name the parts of a men's cut, understand clipper guard numbers, hold scissors correctly and use the mirror to find your own mistakes. The work in the chair is in the article [how to cut men's hair step by step](lesson:cat-nam-co-ban).",
  ],
  sections: [
    {
      id: "parts-of-a-mens-cut",
      title: "The parts of a men's haircut and the two landmarks to know",
      blocks: [
        { p: "Barber and client can only talk about a cut if both call each area by the same name. A short men's cut has five parts." },
        {
          table: {
            head: ["Part", "Where it is"],
            rows: [
              ["Top", "The top of the head, usually kept the longest"],
              ["Sides", "On each side, above the ears"],
              ["Back", "The occipital area at the back of the head"],
              ["Nape", "The very bottom at the back"],
              ["Outline", "Around the ears, the sideburns and the neckline"],
            ],
          },
        },
        { img: { src: img("kieu-toc-nam-ngan-co-dien-nhin-nghieng"), alt: "A male client in profile after his cut: short sides blending softly into a longer top combed back, the ear fully visible with a curved outline around it", caption: "From the side you see the top, the sides, the sideburn and the outline round the ear, with no line between sides and top." } },
        { p: "Beyond the names, there are two landmarks every men's cutting lesson mentions. The **parietal ridge** is the widest part of the head on each side. The **occipital bone** is the part that sticks out slightly at the back. The blend from short to long usually sits around these two, so find them with your fingers on the client's head before you switch the clippers on." },
        { img: { src: img("kieu-toc-nam-ngan-nhin-tu-phia-sau-gay-tron"), alt: "A man's head seen straight from behind: the nape and back are cut short and gradually lengthen into the longer hair above, with a rounded neckline", caption: "From behind: the nape at the bottom, the occipital area above it. The hair gets longer from the nape up around the occipital bone." } },
      ],
    },
    {
      id: "clipper-guard-numbers",
      title: "Clipper guard numbers explained: sizes, the taper lever and starting long",
      blocks: [
        { p: "A guard is the plastic comb that clips onto the clipper blade. The number on it tells you roughly how much length will be left: the bigger the number, the longer the hair. But every brand is a little different, and the same number can leave slightly more or less. The chart that applies to you is the one from the brand of clipper you are using." },
        { img: { src: img("cac-cu-tong-do-tu-ngan-den-dai"), alt: "Five black plastic clipper guards lined up from smallest to largest on a marble surface, next to a clipper and a black comb", caption: "Guards in order from short to long. The longer the teeth, the more hair is left." } },
        { p: "Many clippers also have a lever on the side. Move it up or down and the blade shifts a little, so the hair is left a touch longer or shorter with the same guard. Barbers often use it to blend smoothly between two guards that sit next to each other." },
        { p: "The most important rule about guards is short: always start with a longer guard. You can always take more off. Once it is too short, all you can do is wait for it to grow." },
        { note: "When in doubt, put on a guard one size longer. Going over again with a shorter one takes a minute; cutting too short makes the client wait weeks.", kind: "tip", title: "From the trade" },
      ],
    },
    {
      id: "scissors-and-clippers",
      title: "How to hold hairdressing scissors and how to move the clippers",
      blocks: [
        { h3: "Holding scissors: only one blade moves" },
        { p: "Thumb in one ring, ring finger in the other, little finger resting on the tang. When you cut, only the thumb blade moves and the other stays still. That keeps the line straight and stops the hair being pushed out of place." },
        { p: "While combing, many barbers take the thumb out and palm the scissors, so the comb and scissors do not get in each other's way. Whether you are cutting or combing, never point the tips towards the client's face." },
        { h3: "Clippers: against the direction of growth" },
        { p: "Clipping against the growth lifts the hair, so the blade cuts more evenly. Keep the guard flat on the head and move slowly and steadily, each stroke overlapping the last a little. At the nape and around whorls the hair grows in several directions, so go over those areas from a few other directions as well." },
        { note: "Press the clipper hard into the head, or tilt it so the blade digs into the hair, and that spot ends up shorter than the rest: a hole that really shows. A light hand and a flat guard are all you need.", kind: "warn", title: "The beginner's clipper mistake" },
      ],
    },
    {
      id: "scissor-over-comb",
      title: "Scissor-over-comb and clipper-over-comb: blending short into long",
      blocks: [
        { p: "There are two ways to blend short hair into long, and both work on the same principle. The comb sits close to the head with its teeth angled slightly out. Whatever sticks out through the teeth is cut off. The angle of the comb decides whether the hair is left longer or shorter." },
        {
          table: {
            head: ["Method", "How", "Result"],
            rows: [
              ["Scissor-over-comb", "The blade runs parallel to the comb", "A soft blend"],
              ["Clipper-over-comb", "The clipper runs along the comb", "Faster and more even"],
            ],
          },
        },
        { img: { src: img("tong-do-tren-luoc-noi-hai-ben-len-dinh"), alt: "A barber holds a black comb lifting a layer of a male client's hair while his other hand runs a clipper with no guard along the spine of the comb", caption: "Clipper-over-comb: the comb lifts the hair and the clipper takes off what comes through the teeth." } },
        { p: "With scissors or clippers, the comb always moves upwards, steadily, without staying long in one place. Stop, and you get a step." },
        { h3: "The ridge between the sides and the top" },
        { p: "The place where men's cuts most often go wrong is where the sides meet the top. The sides are cut short with clippers, the top is left long, and a hard ridge is left in between. From the side it looks like a step." },
        { img: { src: img("loi-duong-go-cung-giua-hai-ben-va-dinh"), alt: "A man in profile with very short sides ending in a sharp horizontal line at the temple, the long hair on top overhanging it like a roof", caption: "An example of the mistake: sides and top not blended, leaving a hard horizontal line." } },
        { p: "The fix is to blend gradually from short to long, with scissor-over-comb or a longer guard run through the area in between. Keep going until you brush your hand upwards and no longer feel a ridge." },
      ],
    },
    {
      id: "balance-outline-mistakes",
      title: "Balance, the outline and 6 common men's haircut mistakes",
      blocks: [
        { p: "What makes a men's cut look professional is balance and the outline. The line round the ears is neat and natural, not cut too high. Both sideburns are the same length. The neckline is square or rounded, as the client prefers." },
        { p: "Uneven sideburns are a very common mistake, especially when the client tilts their head. Keep the head straight with the client looking straight into the mirror, then place a finger at the bottom of each sideburn to compare both at once. Then do not look from one side only: check in the mirror, from the side and from behind." },
        { img: { src: img("so-hai-ben-toc-mai-bang-hai-ngon-tay"), alt: "A barber standing behind a male client who looks straight ahead places both index fingers at the same height on either side of his face to compare the sideburns", caption: "Head straight, eyes on the mirror, two fingers comparing both sides at the same time." } },
        {
          table: {
            head: ["Mistake", "Why it happens", "How to avoid it"],
            rows: [
              ["A hole in the sides or nape", "Clipper pressed hard or tilted so the blade digs in", "Guard flat, light hand, move slowly"],
              ["A step across the blend", "The comb paused in one place", "Keep the comb moving up, steadily"],
              ["A hard ridge where sides meet top", "No gradual blend from short to long", "Scissor-over-comb or a longer guard in between, until no ridge is left"],
              ["Uneven sideburns", "The client tilted their head, the barber looked from one side", "Head straight, eyes on the mirror, two fingers comparing"],
              ["Outline cut too high round the ear", "The line crept above the natural hairline", "Follow the natural line around the ear"],
              ["Hair standing up, spiky", "Thick, coarse hair cut too short, or cut too close at a whorl", "Leave it a little longer or remove some bulk; do not cut close at a whorl"],
            ],
          },
        },
      ],
    },
    {
      id: "clipper-hygiene",
      title: "Cleaning clippers after every client, and when not to cut",
      blocks: [
        { p: "After every client, brush the hair out of the clipper blade, disinfect the blade and guards as the product instructs, then oil the blade. An oiled blade runs smoothly, stays cooler and pulls less. Combs and scissors are also cleaned and disinfected after every client. Razor blades are single-use." },
        { img: { src: img("chai-sach-toc-trong-luoi-tong-do"), alt: "Two hands in black nitrile gloves use a small brush to clear cut hair from a clipper blade on a stone counter, with guards and a spray bottle beside it", caption: "Brush the hair out of the blade first, then disinfect and oil it." } },
        { note: "A scalp with a wound, inflammation or lice means no cut. Salon hygiene rules differ by country, so check the rules where you work. The details are in the lessons [Tools after every customer](lesson:ve-sinh-dung-cu) and [When not to treat a customer](lesson:khi-nao-khong-lam).", kind: "warn", title: "Before the cape goes on" },
      ],
    },
    {
      id: "reading-hair-being-honest",
      title: "Reading the hair and being honest with the client",
      blocks: [
        { p: "The same style on two different heads of hair gives two different results. Before cutting, read the client's hair as in the article on [hair consultation](lesson:toc-tu-van-chia-vung-hieu-dung)." },
        {
          ul: [
            "**Thick, coarse hair.** Cut too short, it stands straight up and looks spiky. Leave it a little longer, or thin out some of the bulk.",
            "**Thin hair on top.** Left too long, it falls flat, separates and shows even more scalp. A shorter cut often looks fuller.",
            "**Whorls at the crown and the nape.** Do not cut too close there.",
          ],
        },
        { img: { src: img("xoay-toc-o-dinh-dau"), alt: "Close-up of a man's crown seen from behind, dark brown hair fanning out from one point in a clear spiral", caption: "A crown whorl. The hair around it grows in several directions and stands up if cut too close." } },
        { p: "Once you have read the hair, be honest, and do it before the cut, not after. If the client wants the crown very short and there is a strong whorl there, tell them the hair will stand up. If they bring a photo of someone with thick, coarse hair and their own is fine and thin, say clearly that you can do the shape but it will not look exactly like the photo. If they want a style that needs product every morning and they never use product, suggest an easier one." },
        { p: "It also helps to tell the client that a short cut usually keeps its shape for about 3–5 weeks. In VaraaAi you can record each client's guard and length in the [customer records](lesson:khach-hang), then remind them to rebook after a few weeks with the [loyalty card](lesson:the-khach-quen) or a message, so the cut always stays sharp." },
      ],
    },
  ],
  faq: [
    {
      q: "What do clipper guard numbers mean?",
      a: "The number on a guard tells you roughly how much length is left after clipping: the bigger the number, the longer the hair. The real length for the same number differs between brands, so check the chart for the clipper you use. When unsure, start with a longer guard.",
    },
    {
      q: "Which clipper guard should a beginner start with?",
      a: "Start with a guard longer than the length you are aiming for. Going over again with a shorter guard takes a minute, while hair cut too short takes weeks to grow back. This rule holds for every clipper brand.",
    },
    {
      q: "Do you clip with or against the grain?",
      a: "Against the direction of growth. That lifts the hair so the blade cuts more evenly. Keep the guard flat on the head, move slowly and overlap the strokes a little. At the nape and around whorls the hair grows in several directions, so go over it from a few other directions too.",
    },
    {
      q: "How do you hold hairdressing scissors correctly?",
      a: "Thumb in one ring, ring finger in the other, little finger resting on the tang. Only the thumb blade moves while you cut and the other stays still, which keeps the line straight and stops the hair being pushed aside. Never point the tips towards the client's face.",
    },
    {
      q: "Why is there a line between the sides and the top of a men's cut?",
      a: "Because the sides were cut short with clippers and the top left long, without a gradual blend from short to long in between. Fix it with scissor-over-comb or a longer guard through the middle area, until you brush your hand upwards and feel no ridge.",
    },
    {
      q: "How often should men get a short haircut?",
      a: "A short cut usually keeps its shape for about 3–5 weeks. The barber should tell the client this when the cut is finished, so the next appointment is booked at the right time and the style stays neat.",
    },
  ],
  related: ["cat-nam-co-ban", "toc-tu-van-chia-vung-hieu-dung", "cat-nam-fade-hieu-dung", "ve-sinh-dung-cu"],
};

export default article;
