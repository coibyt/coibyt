import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/toc-tu-van-chia-vung-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "hair-consultation-before-a-haircut",
  lesson: "toc-tu-van-chia-vung-hieu-dung",
  category: "hair",
  title: "Hair consultation before a haircut: touch points, reading the hair and 5 cutting terms",
  metaTitle: "Hair consultation before a haircut: what stylists check",
  metaDescription:
    "Hair consultation for stylists: agree length with touch points, read face shape, density, texture and growth patterns, wet versus dry hair, and elevation terms.",
  keyword: "hair consultation",
  keywords: [
    "hair consultation questions",
    "should curly hair be cut wet or dry",
    "how to cut a cowlick",
    "what is a guideline in hair cutting",
    "what is elevation in hair cutting",
    "why section hair before cutting",
    "cross-checking a haircut",
  ],
  excerpt: "Many haircuts go wrong in the first five minutes, before the scissors come out. How to agree length, read the hair while it is dry and learn the words every cut uses.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-toc-tu-van-cho-khach-truoc-guong-salon"),
    alt: "A stylist with a brown bob stands behind a client with long blonde hair at an oval gold-framed mirror in a Parisian-style salon, both smiling",
  },
  takeaways: [
    "Do not agree length in words like a little, a lot, short or long. Use a number or **a touch point** on the client: the chin, the shoulder, the collarbone.",
    "Read the hair **while it is dry**: face shape, head shape, density, texture, curl and growth pattern.",
    "Wavy and curly hair **shrinks as it dries**. Cut longer than you intend, or cut it dry with a technique you have been trained in.",
    "Where there is a whorl, leave the hair a little longer or cut with the direction of growth.",
    "Five words every cut uses: **guideline, elevation, over-direction, tension, cross-checking**.",
  ],
  intro: [
    "A hair consultation is the part of the appointment that happens before the stylist picks up the scissors, and a great many haircuts are lost right there. The scissors are not to blame. The cut goes wrong in the first five minutes, when stylist and client use the same word and picture two different lengths.",
    "This article follows the VaraaAi Academy lesson “Consultation and sectioning: understand them to cut precisely” from the Hair course. By the end you will know what to ask, how to agree a length nobody can misread, how to read a head of hair before it gets wet, and what the five terms mean that come back in every cutting lesson after this one.",
  ],
  sections: [
    {
      id: "why-cuts-go-wrong",
      title: "Why so many haircuts go wrong at the consultation",
      blocks: [
        { p: "It happens all the time. The client says “just take a little off”. To the client, a little means one centimetre. To the stylist, a little can mean five. After the cut the client is unhappy, and the stylist has no idea what went wrong." },
        { p: "The lesson draws one simple rule from this: do not talk in words like a little, a lot, short or long. Everybody hears them differently. A number, or a specific point on the client's body, means the same thing to both of you." },
      ],
    },
    {
      id: "hair-consultation-questions",
      title: "Hair consultation questions and how to agree the length",
      blocks: [
        { p: "A complete consultation covers three things." },
        {
          ol: [
            "Ask what the client likes and dislikes about their hair as it is now, and ask to see a reference photo.",
            "Agree the length with a number, or with a **touch point** on the client: to the chin, touching the shoulders, level with the collarbone.",
            "Lift a section of hair, hold it exactly at that point and ask again.",
          ],
        },
        { img: { src: img("thong-nhat-do-dai-toc-bang-diem-cham-ngang-vai"), alt: "The stylist holds a lock of the client's long blonde hair between two fingers at shoulder level while the client watches in the oval gold-framed mirror", caption: "Hold the lock at the touch point and ask again: the new length stops here." } },
        { note: "Always repeat what you agreed in your own words: “So we cut to the shoulder, right?” One question saves a whole unhappy appointment.", kind: "tip", title: "One question back" },
        { h3: "Ask about the client's everyday life" },
        { p: "Do they blow-dry at home, how long do they spend on their hair each morning, do they often tie it up, do they play sport? A style that looks great in the salon but that the client cannot recreate at home is a style they will stop liking a few days later." },
      ],
    },
    {
      id: "reading-dry-hair",
      title: "Reading the hair while it is dry: face shape, density, texture and whorls",
      blocks: [
        { p: "Pull all the hair back and look at the face: round, long, square or oval. The cutting line, the volume and the point where the hair stops can make a face look longer or rounder. Look at the head shape the same way. Some people are quite flat at the back of the head; leave more weight there and the head looks rounder and more attractive." },
        {
          table: {
            head: ["What to read", "How to check", "What it means for the cut"],
            rows: [
              ["Density", "Make a parting and see how much scalp shows", "Tells you whether the hair is thick or thin"],
              ["Fine texture", "Look at and feel the strand", "Shows every scissor line; a small mistake is visible at once"],
              ["Coarse texture", "Look at and feel the strand", "Stiff and stands up easily"],
              ["Curl pattern", "Straight, wavy or curly", "Each one needs a different way of cutting"],
            ],
          },
        },
        { img: { src: img("re-ngoi-xem-mat-do-toc-va-da-dau"), alt: "The stylist uses both hands to make a straight parting on top of a blonde client's head, showing a clean line of scalp and the thickness of hair on each side", caption: "A parting shows the density of the hair and the condition of the scalp." } },
        { h3: "Whorls and growth patterns" },
        { p: "New stylists often overlook the direction the hair grows. Almost everyone has a whorl at the crown. Many people also have one at the nape, or a cowlick at the front hairline. In those places the hair will not lie down the way you want, and if you cut it too short it stands straight up." },
        { img: { src: img("xoay-toc-o-dinh-dau-khach-nam"), alt: "Looking down from behind at the crown of a man with dark brown hair, the hair fanning out in a spiral from a single point", caption: "A crown whorl: the hair fans out from one point and does not lie where the stylist wants it." } },
        { p: "Before you cut, comb the hair in several directions and watch how it falls naturally. Over a whorl you usually leave the hair a little longer, or cut with the direction of growth." },
      ],
    },
    {
      id: "curly-hair-wet-or-dry",
      title: "Wet hair versus dry hair: how to cut curly hair",
      blocks: [
        { p: "Wet hair is heavy, stretches out straight and looks longer. Wavy and curly hair shrinks as it dries, sometimes by a lot. A curl pulled straight to below the shoulders can end up at the chin once it is dry." },
        { img: { src: img("toc-xoan-khi-uot-keo-thang-dai-qua-vai"), alt: "A woman with chestnut curly hair just after shampooing, the wet hair dark, while the stylist pulls one wet lock straight down past her shoulder", caption: "Curly hair when wet: pulled straight, it reaches past the shoulder." } },
        { img: { src: img("toc-xoan-khi-kho-co-len-ngang-cam"), alt: "The same chestnut curly hair once dry, the curls springing up between chin and shoulder as the stylist supports one curl on her fingertips", caption: "The same hair dry: the curls spring up and sit much shorter." } },
        { p: "So with curly hair there are two options: cut longer than you intend, or cut it dry using a technique you have been trained in. You can always take more off, but hair that has been cut cannot be put back." },
      ],
    },
    {
      id: "scalp-check-and-shampoo",
      title: "Check the scalp before the shampoo, and shampoo gently",
      blocks: [
        { p: "Look at the scalp before you shampoo. An open wound, inflammation, red and swollen skin, pus or head lice mean no service. Speak quietly and privately with the client and suggest they see a doctor; do not let them feel embarrassed in front of others. The lesson [When not to treat a customer](lesson:khi-nao-khong-lam) covers how to say no." },
        { p: "For the client the shampoo is the most relaxing moment of the visit. For the stylist it is when the client decides whether you are careful or not. A few things the client notices straight away:" },
        {
          ul: [
            "You test the water on your own wrist before it touches the client, then ask whether the temperature is right. Tap temperature can change suddenly, and everyone feels heat differently.",
            "A towel keeps the collar dry, and the neck rests comfortably in the basin with nothing pressing into it.",
            "The scalp is massaged with the pads of the fingers, never the nails.",
            "While rinsing, one hand shields the hairline so water does not run into the face and ears.",
            "The hair is blotted with a towel, pressed gently and never rubbed. Rubbing tangles the hair and roughens the cuticle of each strand.",
          ],
        },
        { p: "The order of each move at the basin, how to detangle and how to make every parting are in the practice article [how to section hair for cutting](lesson:toc-tu-van-chia-vung)." },
      ],
    },
    {
      id: "why-section-hair",
      title: "Why section hair before cutting",
      blocks: [
        { p: "You can only cut precisely the hair you can see and control. With straight partings and sections that are not too big, you can always find your previous cutting line again." },
        { p: "The most common method uses **seven sections**: the top, two side sections over the ears, two upper back sections at the crown and two nape sections. Each section is twisted neatly, clipped flat against the head and kept evenly damp with a spray bottle." },
      ],
    },
    {
      id: "five-cutting-terms",
      title: "Guideline, elevation and three more hair cutting terms",
      blocks: [
        { h3: "Guideline" },
        { p: "The guideline is the first cut. Every cut after it follows it, so if the guideline is off, the whole haircut is off." },
        { img: { src: img("duong-chuan-dau-tien-o-gay-khi-cat-toc"), alt: "Close-up of the back of a client's neck: the upper sections are clipped away and the stylist holds a thin layer of hair between two fingers, cutting straight across", caption: "The first cut at the nape becomes the guideline for every layer let down after it." } },
        { h3: "Elevation" },
        { p: "Elevation is the angle at which you hold the hair away from the head." },
        {
          table: {
            head: ["Elevation", "How the hair is held", "Result"],
            rows: [
              ["0°", "Falls straight down", "One-length line, weight at the bottom"],
              ["45°", "Lifted halfway to a right angle", "Low layers that keep their weight"],
              ["90°", "At a right angle to the scalp", "Even layers following the head shape"],
              ["180°", "Lifted straight up to the top", "Hair below gets longer: long layers"],
            ],
          },
        },
        { img: { src: img("goc-nang-90-do-toc-vuong-goc-voi-da-dau"), alt: "Side view of a stylist pulling a damp section from behind the client's crown straight out between two fingers, at a right angle to the head", caption: "90° elevation: the section is held at a right angle to the scalp." } },
        { p: "Elevation matters most in layered cuts; see [what is a layered haircut](lesson:cat-nu-tang-hieu-dung)." },
        { h3: "Over-direction, tension and cross-checking" },
        {
          ul: [
            "**Over-direction** means pulling the hair away from where it naturally falls, towards the guideline. Whichever way you over-direct, the hair gets gradually longer in the opposite direction.",
            "**Tension** is how firmly you pull the section: even and moderate. Pull too tight, especially on wet hair, curly hair or around the ears, and once it dries the hair springs up shorter than you wanted.",
            "**Cross-checking** means that once you have cut in one direction, you section the hair the opposite way to check it, then compare the left and right sides.",
          ],
        },
        { img: { src: img("so-hai-ben-toc-de-kiem-tra-sau-khi-cat"), alt: "The stylist stands behind the client holding two locks from either side of her face at the same height in front of her chest, comparing the length in the mirror", caption: "Comparing left and right in the mirror is the last part of the cross-check." } },
        { note: "In VaraaAi, write the agreed length, any whorls and the hair type in the notes on the [customer record](lesson:khach-hang), so whoever works on the client next time knows. When you set up a haircut as a [service](lesson:dich-vu), include the shampoo and sectioning in its duration.", kind: "tip", title: "Write it down for next time" },
        { note: "Leave conditioner on for the time the product instructions give. Hygiene rules differ by country. This article is a training aid, not a licence to practise.", kind: "info", title: "Please note" },
      ],
    },
  ],
  faq: [
    {
      q: "What questions should you ask in a hair consultation?",
      a: "Ask what the client likes and dislikes about their current hair, ask to see a reference photo, then ask about their routine at home: do they blow-dry, how long do they spend each morning, do they tie their hair up, do they play sport. Then agree the length with a number or a touch point on the client and repeat it back to them.",
    },
    {
      q: "The client says “just a little off”. How much do you cut?",
      a: "Do not guess. A little can mean one centimetre to the client and five to the stylist. Hold a lock at a specific point, such as touching the shoulder or level with the collarbone, and ask the client again before you cut.",
    },
    {
      q: "Should curly hair be cut wet or dry?",
      a: "Curly and wavy hair shrinks as it dries, sometimes far shorter than it looked when wet. If you cut it wet, leave it longer than you intend and do not pull it tight. The other option is to cut it dry, with a technique the stylist has been trained in.",
    },
    {
      q: "How do you cut hair with a whorl or cowlick?",
      a: "Comb the hair in several directions before cutting and see how it falls naturally. Over a whorl you usually leave the hair a little longer or cut with the direction of growth, because cut too short it stands straight up.",
    },
    {
      q: "What is a guideline in hair cutting?",
      a: "The guideline is the first cut of a haircut. Every later cut is measured against it and follows it, so the guideline has to sit at exactly the length you agreed with the client.",
    },
    {
      q: "What is the difference between 0°, 45°, 90° and 180° elevation?",
      a: "At 0° the hair falls straight down and gives a one-length line with weight at the bottom. 45° gives low layers that keep their weight. At 90° the hair is held at a right angle to the scalp for even layers that follow the head shape. At 180° it is lifted straight up and the hair below gets gradually longer, giving long layers.",
    },
  ],
  related: ["toc-tu-van-chia-vung", "cat-nu-bang-hieu-dung", "cat-nu-tang-hieu-dung", "cat-nam-co-ban-hieu-dung"],
};

export default article;
