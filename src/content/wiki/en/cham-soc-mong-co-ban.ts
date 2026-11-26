import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cham-soc-mong-co-ban/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "how-to-do-a-manicure-and-pedicure",
  lesson: "cham-soc-mong-co-ban",
  category: "nail",
  title: "How to do a manicure and pedicure with regular polish: 14 steps from consultation to basin clean-up",
  metaTitle: "How to do a manicure and pedicure: 14 steps",
  metaDescription:
    "Manicure and pedicure steps with regular polish: removing old polish, shaping, cuticles, base and two colour coats, foot soak, toenails, hygiene.",
  keyword: "how to do a manicure and pedicure",
  keywords: ["manicure steps", "pedicure steps", "how to remove nail polish properly", "how to push back cuticles", "how to paint nails with regular polish", "how to cut toenails straight across", "how long to soak feet for a pedicure"],
  excerpt: "A manicure and then a pedicure with regular polish, step by step: removing polish, filing, cuticle care, painting, the foot soak, cutting straight across, smoothing calluses and hygiene after the client.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-nail-cham-soc-mong-chan-cho-khach-tai-salon"),
    alt: "A nail technician in a cream top and black gloves sits on a low stool giving a pedicure to a client in an armchair in a Parisian-style salon",
  },
  takeaways: [
    "Three things hold throughout: **no cutting living skin**, **toenails cut straight across**, and everything that touches the client is clean.",
    "Remove old polish by holding a pad soaked in remover on the nail for a few seconds, then wiping one way from cuticle to tip, never back and forth.",
    "Regular polish: a thin base coat, two thin colour coats and a top coat. Let each coat set before the next one.",
    "Pedicure: a disinfected basin, a new liner, a short soak, small straight snips, never into the corners.",
    "Calluses get only a few light passes with a fine foot file: no blades, no rasps.",
  ],
  intro: [
    "Learning how to do a manicure and pedicure with regular polish is the first routine every nail student has to know by heart, and it is also the service clients book most regularly. There is no lamp and no gel, so everything depends on clean hands, thin coats of polish and the patience to let each coat set.",
    "This article is based on the VaraaAi Academy lesson “Manicure and pedicure: step by step” in the Nails course. The first seven steps are a manicure, the next seven a pedicure, ending with cleaning the basin after the client has left. Watch the lesson video below first, then use the article as a checklist while you practise.",
  ],
  sections: [
    {
      id: "three-rules",
      title: "Three rules before you start a manicure or pedicure",
      blocks: [
        {
          ol: [
            "**No cutting living skin.** The nippers only trim dead flakes that have lifted, even if the client asks for a deeper cut.",
            "**Toenails cut straight across.** Never deep into the corners, never digging into them.",
            "**Everything that touches the client is clean.** Washed and sanitised hands, metal tools from a sterilisation pouch, a new liner in the basin.",
          ],
        },
        { p: "The reasons behind these three rules, and how to work with clients who have diabetes or calluses, are explained in the theory article [basic manicure and pedicure](lesson:cham-soc-mong-co-ban-hieu-dung). This one is about the hands-on work." },
        { note: "With regular polish, a brief soak of the fingertips in warm water to soften the skin is fine. Gel is different: the nails are prepped dry, without soaking, as [how to apply gel polish](lesson:son-gel) explains.", kind: "info", title: "Regular polish and gel are prepped differently" },
      ],
    },
    {
      id: "painting-regular-polish",
      title: "How to paint nails with regular polish so it goes on evenly",
      blocks: [
        { p: "Regular polish dries in the air, so the thickness of each coat decides almost everything. Thick polish takes a long time to dry, dents easily and smudges easily." },
        {
          table: {
            head: ["What you see", "Usual cause", "Fix"],
            rows: [
              ["Polish not sticking, chipping early", "Lotion and oil left on the nail after the massage", "Wipe each nail with a lint-free wipe and cleanser, both sides and the tip included"],
              ["Slow to dry, dents easily", "Coats too thick", "Two thin colour coats, letting each one set before the next"],
              ["Polish on the skin", "Brush went too close to the skin", "Leave a small gap at the cuticle; clean the edge with a cotton-tipped wooden stick dipped in remover"],
              ["Old polish smeared into the corners", "Rubbing the pad back and forth", "Hold the pad on for a few seconds, then wipe one way; clean the corners with a cotton-tipped stick"],
              ["Dents after the client leaves", "The surface is dry, but underneath stays soft for a few hours", "Remind the client before she leaves the desk"],
            ],
          },
        },
        { note: "To speed up drying, you can put a drop of quick-dry on each nail while the client rests with her hands still.", kind: "tip", title: "While the polish dries" },
      ],
    },
    {
      id: "when-to-stop",
      title: "Signs to stop before the foot soak",
      blocks: [
        { p: "Before the client's feet go into the basin, look at them closely. This is not a formality: some things can only be seen while the skin is still dry." },
        {
          ul: [
            "Skin between the toes that is cracked, red, or white and soggy.",
            "Wounds or ulcers.",
            "Nails that are thickened, discoloured or growing into the skin.",
          ],
        },
        { p: "If you see these signs, do not work on that area, and advise the client to see a doctor or a foot-care professional. The same goes for a very thick callus or deep cracks. The lesson [When not to treat](lesson:khi-nao-khong-lam) gives the full list." },
        { note: "Ask about diabetes at the consultation. For clients with diabetes, keep the soak short and the water only lukewarm. Soaking times and product use always follow the product's instructions.", kind: "warn", title: "Clients with diabetes" },
      ],
    },
    {
      id: "hygiene-after-client",
      title: "Hygiene after every client: basin, tools and single-use items",
      blocks: [
        {
          table: {
            head: ["Item", "What to do once the client has gone"],
            rows: [
              ["Basin liner", "Take it out and throw it away"],
              ["Foot basin", "Clean it, then disinfect it for the full contact time on the product"],
              ["Files, cotton, toe separators and other single-use items", "Throw away"],
              ["Nippers and pushers", "Wash, then sterilise"],
            ],
          },
        },
        { img: { src: img("bo-tui-lot-bon-ngam-chan-sau-khach"), alt: "Two black-gloved hands lift a used liner out of a white foot basin, a disinfectant spray bottle and a tray of nippers beside it", caption: "A liner is used for one client only. The basin is still cleaned and disinfected afterwards." } },
        { p: "How to wash, disinfect and sterilise metal tools is covered in [Tools after every customer](lesson:ve-sinh-dung-cu)." },
        { note: "Hygiene rules differ by country. The lesson follows the City of Helsinki guidance; check the rules that apply where you work. This article is a training aid, not a licence.", kind: "warn", title: "Rules differ from place to place" },
      ],
    },
    {
      id: "next-appointment",
      title: "Book the next appointment and note the client's colour",
      blocks: [
        { p: "A basic manicure and pedicure is a repeat service, so the last part of the visit happens at the desk. In VaraaAi, book the client's next [appointment](lesson:lich-hen) about four weeks ahead, and note the polish colour in the [client record](lesson:khach-hang) so she does not have to remember it. For clients who come back every month, the salon can also use a [loyalty card](lesson:the-khach-quen)." },
      ],
    },
  ],
  howTo: {
    title: "Manicure and pedicure steps with regular polish",
    id: "manicure-pedicure-steps",
    after: "three-rules",
    lead: "Steps 1 to 7 are the manicure and steps 8 to 14 the pedicure, in the same order as the lesson video.",
    supplies: [
      "Metal nippers and cuticle pusher in a sterilisation pouch",
      "File, fine buffer, wooden sticks, toe separators: a new set for every client",
      "Cotton pads, lint-free wipes, polish remover and nail cleanser",
      "Cuticle softener, or a bowl of warm water",
      "Lotion, and a salt or sugar scrub",
      "Base coat, colour polish, top coat",
      "A disinfected foot basin, disposable liners and a fine foot file",
    ],
    steps: [
      {
        name: "Consult and check the nails and skin",
        text: "Wash and sanitise your own hands and the client's. Ask which shape and colour she wants, and ask about her health: any allergies, any diabetes. Look closely at the nails and skin; if you see anything unusual, do not do the service.",
      },
      {
        name: "Remove the old polish",
        text: "Hold a cotton pad soaked in remover on the nail for a few seconds to soften the polish, then wipe in one direction from the cuticle to the tip. Do not rub back and forth, or the polish smears onto the skin and into the corners. Clean anything left in the corners with a wooden stick wrapped in a little cotton.",
        image: { src: img("tay-son-mong-tay-cu-bang-bong"), alt: "A nail technician in black gloves presses a white cotton pad soaked in remover onto a client's chipped pink nail polish", caption: "Hold the pad on for a few seconds to soften the polish before wiping one way towards the tip." },
      },
      {
        name: "Trim if needed, then shape",
        text: "File in one direction, from the side towards the centre, into the shape the client chose. How to choose a shape and the filing path for each is in [how to file nails into shape](lesson:dua-form-mong).",
      },
      {
        name: "Soften the cuticles",
        text: "There are two ways. Soak the fingertips in warm water just briefly, then dry them thoroughly. Or apply a cuticle softener at the base of the nail, leave it for exactly the time on the product and wipe it off. It softens dead skin very quickly, so never leave it on longer than instructed.",
        image: { src: img("thoa-chat-lam-mem-da-o-chan-mong"), alt: "A nail technician squeezes a line of clear cuticle softener from a fine-tipped tube onto the base of a client's natural nail" },
      },
      {
        name: "Push back and remove only dead tissue",
        text: "Hold the pusher at a low angle and push the skin at the base of the nail back very gently, then remove the thin layer of dead tissue still stuck to the nail plate. The nippers are only for trimming dead flakes that have lifted. Never cut into the living fold, even if the client asks.",
        image: { src: img("day-da-mong-tay-nhe-nhang"), alt: "A metal cuticle pusher held like a pen rests at a low angle at the base of a client's natural nail, gently pushing the skin back", caption: "The pusher stays low and moves very gently." },
      },
      {
        name: "Buff lightly, massage and cleanse the nail plate",
        text: "Glide a fine buffer very lightly over the nail to make the surface even and smooth, without thinning the nail. Apply a little lotion and massage the back of the hand, each finger and the palm, slowly and evenly. Then wipe each nail thoroughly with a lint-free wipe and cleanser, sides and tip included, because leftover lotion and oil stop the polish from sticking.",
        image: { src: img("mat-xa-tay-voi-kem-duong"), alt: "A technician's two black-gloved hands hold a client's hand and massage a little white lotion into the back of it" },
      },
      {
        name: "Base coat, two colour coats, top coat, then dry",
        text: "A thin base coat protects the nail and helps the colour stick. Then two thin colour coats, each in three strokes: centre, left, right; leave a small gap at the cuticle and sweep lightly over the free edge. Let each coat set before the next, and finish with top coat. Have the client rest with her hands still, and remind her that the polish stays soft underneath for a few hours.",
      },
      {
        name: "Prepare the basin and look closely at the feet",
        text: "The basin has been cleaned and disinfected after the previous client. Put in a new disposable liner, add warm water and test it with your wrist: pleasantly warm, not hot. Pedicure tools come out of a sterilisation pouch opened in front of the client. Before the soak, check the skin between the toes, the skin of the feet and the toenails for anything unusual.",
      },
      {
        name: "Soak the feet for a few minutes",
        text: "A few minutes is enough to soften the skin. A long soak leaves the skin wrinkled and too soft, and very easy to scratch. For clients with diabetes, keep the soak short and the water only lukewarm.",
        image: { src: img("ngam-chan-trong-bon-co-tui-lot"), alt: "A client's two feet soaking in warm water in a basin lined with a clear plastic liner, a few rose petals floating on the surface", caption: "The liner folds over the rim of the basin. A short soak in pleasantly warm water." },
      },
      {
        name: "Cut the toenails straight across",
        text: "Place the clippers straight across the edge of the nail and cut in small snips, not the whole nail in one go: the nail does not split and you keep a straight line. Do not cut deep into the corners or dig into them. The edge of the nail level with the tip of the toe is just right.",
        image: { src: img("cat-mong-chan-thang-ngang-bang-kem"), alt: "A technician in black gloves holds a client's big toe and places nail clippers straight across the edge of the nail, the foot resting on a cream towel" },
      },
      {
        name: "File the toenails straight across",
        text: "File straight across along the edge of the nail, then round the corners only very slightly so they are not sharp. Do not file down into the corners.",
        image: { src: img("dua-mong-chan-thang-ngang"), alt: "A technician in black gloves holds a grey file straight across the edge of a client's big toenail, her other hand steadying the toe" },
      },
      {
        name: "Cuticles, calluses, scrub and massage",
        text: "Push the cuticles back gently as on the hands, removing only dead tissue. Glide a fine foot file lightly over the heel and areas of thick skin; a few even passes are enough, with no blades and no rasps. Rub a salt or sugar scrub gently over the feet and ankles, rinse and dry thoroughly, especially between the toes. Then massage the feet with lotion, slowly and evenly, along the sole.",
      },
      {
        name: "Toe separators and polish",
        text: "Wipe the lotion and oil off the nail plates and put in the toe separators. Apply base coat, two thin colour coats and top coat, just as on the hands. Wait until the polish has set before the client puts on her sandals.",
        image: { src: img("tach-ngon-va-son-mong-chan"), alt: "White toe separators between a client's toes while a technician in black gloves paints the big toenail red", caption: "Toe separators are single-use: a new set for every client." },
      },
      {
        name: "Clean the basin and process the tools",
        text: "Once the client has gone, take out the liner and throw it away. Clean the basin, then disinfect it for the full contact time on the product. Files, cotton and other single-use items go in the bin; nippers and pushers are washed and then sterilised.",
      },
    ],
  },
  faq: [
    {
      q: "What are the steps of a basic manicure?",
      a: "Consultation and nail check, removing old polish, shaping, softening the cuticles, pushing back and removing dead tissue, light buffing, hand massage, cleansing the nail plate, then base coat, two thin colour coats and top coat. Finally the polish dries, and the client is told it stays soft underneath for a few hours.",
    },
    {
      q: "How do you remove nail polish without smearing it on the skin?",
      a: "Hold a cotton pad soaked in remover on the nail for a few seconds to soften the polish, then wipe in one direction from the cuticle to the tip. Rubbing back and forth smears polish onto the skin and into the corners. Clean the corners with a wooden stick wrapped in a little cotton.",
    },
    {
      q: "How many coats of regular nail polish should you apply?",
      a: "A thin base coat, two thin colour coats and a top coat. Each colour coat goes on in three strokes, and each coat is left to set before the next. Thick polish dries slowly, dents easily and smudges easily.",
    },
    {
      q: "How long should you soak feet before a pedicure?",
      a: "A few minutes is enough to soften the skin. A long soak makes the skin wrinkled, too soft and very easy to scratch. For clients with diabetes, keep the soak short and the water only lukewarm.",
    },
    {
      q: "Why cut toenails in small snips?",
      a: "Small snips keep the nail from splitting and let you hold a straight line across the nail. Cutting the whole nail in one go makes it more likely to split and harder to keep the cut straight.",
    },
    {
      q: "Can you use a blade to remove calluses in a pedicure?",
      a: "Not in a basic pedicure: no blades and no rasps. A fine foot file is glided lightly over the skin a few times to make it smoother. A very thick callus or one with deep cracks is a job for a foot-care professional.",
    },
  ],
  related: ["cham-soc-mong-co-ban-hieu-dung", "dua-form-mong", "son-gel", "ve-sinh-dung-cu"],
};

export default article;
