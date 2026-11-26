import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cat-nam-fade-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "what-is-a-fade-haircut",
  lesson: "cat-nam-fade-hieu-dung",
  category: "hair",
  title: "What is a fade haircut? Low, mid and high fades, skin fades and tapers explained",
  metaTitle: "What is a fade haircut? Low, mid, high, skin fade and taper",
  metaDescription:
    "What a fade haircut is, where low, mid and high fades start, skin fade versus taper, why fades show lines, shaving sensitive skin and how long a fade lasts.",
  keyword: "what is a fade haircut",
  keywords: [
    "low fade vs mid fade vs high fade",
    "what is a skin fade",
    "what is a taper haircut",
    "taper vs fade",
    "how often to get a fade",
    "why does my fade have lines",
    "fade for a flat head",
  ],
  excerpt: "A fade is hair that gets shorter from the top down, so smoothly it looks like a change of shade. The heights, skin fades, tapers and why fades end up with lines.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("kieu-toc-fade-trung-binh-sat-da-nhin-nghieng"),
    alt: "A male client in profile with a mid fade: down to the skin around the ear and nape, darkening gradually into a longer top combed back",
  },
  takeaways: [
    "A fade is hair that **gets gradually shorter towards the bottom**. The transition must be seamless, with no lines and no steps.",
    "A low fade starts just above the ear, a mid fade around the temple line, a high fade near or above the parietal ridge. These are reference points only: point at the client's head to agree.",
    "In a **skin fade** the bottom goes down to the skin. A **taper** only graduates the hairline at the sideburns and nape.",
    "Erase a line where it is with the in-between length; do not push the whole fade higher than you promised.",
    "A fade looks its best for the first week or two. Many clients come back after about 2–3 weeks.",
  ],
  intro: [
    "What is a fade haircut, the cut male clients ask for most these days? It is a cut in which the hair gets gradually shorter from the top down: very short at the nape and around the ears, sometimes down to the skin, then longer and longer up to the top. A good fade looks soft, as if the colour of the hair shifts from light to dark. A single horizontal line or one patchy spot, and the client sees it in the mirror straight away.",
    "This article follows the VaraaAi Academy lesson “Fades: understand them for a smooth blend without lines” in the Hair course, the theory half of the fade topic. By the end you can tell the fade heights, skin fades and tapers apart, read the head shape before choosing a style and understand where lines come from. The clipper work itself is in the article [how to do a fade haircut](lesson:cat-nam-fade).",
  ],
  sections: [
    {
      id: "what-is-a-fade",
      title: "What a fade is and why it looks like a change of shade",
      blocks: [
        { p: "No hair in a fade is coloured. What creates the band of shade is length. Short hair shows more scalp, so it looks light. Longer hair covers more of the scalp and looks darker. When the length increases evenly from the bottom up, the eye sees a smooth band from light to dark." },
        { img: { src: img("skin-fade-nhin-tu-phia-sau-gay-sat-da"), alt: "A man's head seen straight from behind: skin showing at the nape, the hair darkening upwards into an even band with no lines", caption: "From behind: light at the nape, darker towards the top, without a single horizontal line." } },
        { p: "So the barber's goal is clear: the transition has to be seamless. The hard part of a fade is not fast hands. It is understanding how many lengths you are creating, and where each of them sits on the client's head." },
      ],
    },
    {
      id: "low-mid-high-fade",
      title: "Low fade vs mid fade vs high fade: where each one starts",
      blocks: [
        { p: "The three common heights differ in where the transition begins." },
        {
          table: {
            head: ["Style", "Where the transition sits", "How it looks"],
            rows: [
              ["Low fade", "Starts just above the ear and curves down to the nape", "Most of the sides keep their hair. Subtle; suits office workers and first-timers"],
              ["Mid fade", "Around the temple line, between the ear and the parietal ridge", "Sharper than a low fade, softer than a high one"],
              ["High fade", "Up near or past the parietal ridge, where the head is widest", "Sides almost down to the skin; bold and sharp"],
            ],
          },
        },
        { img: { src: img("fade-thap-bat-dau-ngay-tren-tai"), alt: "A male client with a short beard and wavy hair in profile: the fade's transition sits low, just above the ear, with plenty of hair left on the sides", caption: "Low fade: the transition sits just above the ear and the sides keep their hair." } },
        { img: { src: img("fade-cao-hai-ben-gan-sat-da"), alt: "A young man with thick black hair in profile: the sides almost down to the skin up to the widest part of the head, the top left long", caption: "High fade: the sides are almost down to the skin, up to near the parietal ridge." } },
        { note: "Every shop names the heights a little differently, so the three points above are only for reference. What matters is that barber and client point to the same spot on the head, in the mirror. For a client trying a fade for the first time, suggest starting a little lower: going higher next time is easy, but once it is high, you have to wait for it to grow.", kind: "tip", title: "Agree with a finger, not a name" },
      ],
    },
    {
      id: "skin-fade-and-taper",
      title: "Taper vs fade: what a skin fade and a taper are",
      blocks: [
        { p: "These two terms often get mixed up, yet they give very different results." },
        {
          table: {
            head: ["Style", "What it is", "Who it suits"],
            rows: [
              ["Skin fade", "The very bottom is shaved down to the skin", "Clients who want to see skin at the bottom and like a sharp look"],
              ["Taper", "Only the hairline at the sideburns and nape is gradually shortened; the rest of the sides keeps its hair", "Clients who want a neat look without showing skin"],
            ],
          },
        },
        { p: "So when a client says they want a fade, ask one question back: do you want to see skin at the bottom? The answer tells you whether you are doing a skin fade, a fade that stops at the clipper's shortest length, or just a taper." },
      ],
    },
    {
      id: "reading-the-head",
      title: "Reading the head shape before choosing the fade height",
      blocks: [
        { p: "A fade exposes the shape of the head, so read the head before you cut. Put your hands on it and feel gently for the **parietal ridge**, the widest part on each side, and the **occipital bone**, the part that sticks out slightly at the back. Both landmarks were introduced in the article on [men's haircut basics](lesson:cat-nam-co-ban-hieu-dung)." },
        { img: { src: img("tho-so-dang-dau-khach-truoc-khi-cat-fade"), alt: "A barber in a purple waistcoat stands behind a male client and places his hand on the back of the client's head to feel its shape, a brass-framed mirror in front", caption: "Feel the head shape before cutting: find the parietal ridge, the occipital bone and any flat spots." } },
        {
          ul: [
            "**A flat back of the head.** Very common. Push the fade too high and the flat spot shows, making the head look dented. Keep some length above the occipital bone and the head looks rounder.",
            "**Scars on the scalp.** A skin fade will show them. Ask the client first; sometimes it is better to leave a little more length there.",
            "**Whorls at the crown and nape.** The hair around a whorl lies in several directions, and a short fade passing through it easily turns patchy. Work the clipper over these spots from several directions.",
          ],
        },
      ],
    },
    {
      id: "why-fades-show-lines",
      title: "Why a fade has lines: the lever, half guards and erasing lines",
      blocks: [
        { p: "A line appears when two neighbouring lengths are too far apart. A good fade comes from many small steps, not one big jump. The tools that make those small steps are the clipper lever and half-size guards." },
        { h3: "The lever and half guards" },
        { p: "The lever sits on the side of the clipper. Open it and the blade moves back, leaving the hair a little longer. Close it and the blade moves forward, cutting shorter. The direction differs from machine to machine, so try it on your own clipper. The lever gives you the lengths between two guards. Many guard sets also include half sizes for very small steps." },
        { img: { src: img("can-gat-tren-tong-do-cat-fade"), alt: "A barber holds up a clipper without a guard, blade pointing upwards, his thumb on the metal lever on the side of the machine", caption: "The lever on the side: open is longer, closed is shorter. The direction depends on the clipper." } },
        { h3: "Working in bands and flicking out" },
        { p: "The usual method is to set a guideline with one guard all the way round the head at the chosen height. The area below it is worked in bands: the bottom band is the shortest, and each band going up uses a slightly longer length. At every stopping point, do not pull the clipper straight off. Flick your wrist and scoop the clipper outwards in a small curve, like scooping with a spoon, so the stopping point fades away instead of leaving a line." },
        { img: { src: img("vach-giua-cac-dai-khi-cat-fade"), alt: "The side of a male client's head halfway through a fade, with clear horizontal lines visible between bands of different lengths in the short hair", caption: "Work in progress: lines still show between the bands. This is when the in-between length erases them." } },
        { h3: "Erasing a line where it is" },
        { p: "However careful you are, a faint line often remains between two bands. To erase it, use the length between those two bands, with the lever half open or a half-size guard, and go only along the line, then flick out. Do not go over the whole area." },
        { note: "A very common mistake is being so afraid of lines that you keep going higher. The fade creeps up, higher than you promised the client. Stop and erase the line where it is; do not move it up.", kind: "warn", title: "Do not chase the line" },
        { h3: "Light and viewing angles" },
        { p: "Under light from above, lines and patches show very clearly. In dim light a fade can look smooth, and the client only sees the problem out in the sun. So check in good light: tilt the client's head, look from the left, from the right, crouch to eye level and look at the back. Finally, place a finger on each side to compare whether the fade sits at the same height, just as you would check sideburns." },
      ],
    },
    {
      id: "down-to-the-skin",
      title: "Down to the skin: foil shaver, razor and sensitive skin",
      blocks: [
        { p: "In a skin fade, the very bottom is usually done with a foil shaver or a razor. A foil shaver is gentler on the skin. A razor takes single-use blades only, a fresh blade for every client." },
        { p: "Sensitive skin easily gets red bumps or spots after shaving. With these clients, stretch the skin lightly, shave with the grain and do not go over the same spot many times. If a client is prone to irritation, stop at the clipper's shortest length and do not shave." },
        { note: "A scalp with a wound, inflammation or pustules means no shaving. Clippers, guards, combs and shavers are cleaned and disinfected after every client as the product instructs. Rules differ by country, so check the rules where you work. See also [Tools after every customer](lesson:ve-sinh-dung-cu) and [When not to treat a customer](lesson:khi-nao-khong-lam).", kind: "warn", title: "Shaving close safely" },
      ],
    },
    {
      id: "how-long-a-fade-lasts",
      title: "How long a fade lasts and how to rebook clients",
      blocks: [
        { p: "Tell the client up front that a fade looks its best for the first week or two. Hair grows about a centimetre a month, so the part close to the skin soon grows out. Many clients keep their fade by coming back after about 2–3 weeks. That is a common habit, not a rule, and it depends on how sharp the client likes it." },
        { p: "After every cut, note whether the fade was high or low, which guards you used and how the lever was set. In VaraaAi these notes live in the [customer records](lesson:khach-hang), so next time whoever cuts can do exactly the same. At checkout, suggest booking the next visit straight into the [appointment calendar](lesson:lich-hen), or use the [loyalty card](lesson:the-khach-quen) for clients who come back regularly." },
      ],
    },
  ],
  faq: [
    {
      q: "What is a fade haircut?",
      a: "A fade is a cut in which the hair gets gradually shorter from the top down: very short at the nape and around the ears, sometimes down to the skin, then longer up to the top. Short hair shows scalp and looks light, longer hair looks darker, so the eye sees a smooth change of shade. A correct fade has no lines or steps.",
    },
    {
      q: "What is the difference between a low, mid and high fade?",
      a: "Where the transition starts. A low fade starts just above the ear and curves down to the nape. A mid fade sits around the temple line. A high fade goes up near or past the parietal ridge, with the sides almost down to the skin. Shops name them a little differently, so barber and client should point to the spot on the head.",
    },
    {
      q: "What is the difference between a taper and a fade?",
      a: "A taper is softer than a fade. In a taper only the hairline at the sideburns and the nape is gradually shortened, and the rest of the sides keeps its hair. It suits clients who want a neat look without showing skin.",
    },
    {
      q: "What is a skin fade?",
      a: "A skin fade is a fade whose very bottom is shaved down to the skin, usually with a foil shaver or a razor with a single-use blade. Clients with sensitive skin who are prone to irritation after shaving are better off stopping at the clipper's shortest length.",
    },
    {
      q: "Which fade should I get for my first time?",
      a: "Start with a low fade, or a little lower than the style you had in mind. A low fade is subtle because most of the sides keep their hair. Going higher next time is easy, but once it has been cut high you have to wait for it to grow back.",
    },
    {
      q: "How often should you get a fade?",
      a: "A fade looks its best for the first week or two, after which the part close to the skin grows out, since hair grows about a centimetre a month. Many clients come back after about 2–3 weeks to keep their fade sharp. That is a common habit rather than a rule.",
    },
  ],
  related: ["cat-nam-fade", "cat-nam-co-ban-hieu-dung", "cat-nam-tao-kieu-hieu-dung", "toc-tu-van-chia-vung-hieu-dung"],
};

export default article;
