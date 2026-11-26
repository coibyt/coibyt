import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mong-co-can-tho/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "do-nails-need-to-breathe",
  lesson: "mong-co-can-tho",
  category: "tips",
  title: "Do nails need to breathe? The truth about taking a break between gel manicures",
  metaTitle: "Do nails need to breathe? When to take a break from gel",
  metaDescription:
    "Do nails need to breathe between gel manicures? What really damages nails, when to stop and ask a doctor, and how to keep nails healthy while wearing gel nonstop.",
  keyword: "do nails need to breathe",
  keywords: [
    "do you need a break between gel manicures",
    "is it bad to have gel nails all the time",
    "when to give your nails a rest",
    "weak nails after gel",
    "can you get gel nails with a fungal infection",
    "how to keep nails healthy with gel",
  ],
  excerpt: "Nails do not breathe, so “letting them breathe” does not make them healthier. What weakens nails is how gel is removed and filed, and there are times when you really should stop.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-nail-soi-mong-khach-bang-den-lup"),
    alt: "A nail technician in black clothes and black gloves examines a client's nails closely through a round magnifying lamp at a marble desk in an elegant salon",
  },
  takeaways: [
    "**Nails do not breathe.** The part of the nail you see is keratin and does not need air.",
    "The nail is fed from the **nail root under the skin**, through blood vessels.",
    "What makes nails thin is **peeling off gel, filing the nail surface too hard and wrong removal**.",
    "Take a break when a nail is **thin, painful, oddly discoloured or you suspect a fungal infection**, and ask a doctor or pharmacist before carrying on.",
    "Done properly, with **oil every day and gel removed at the salon**, you can wear gel continuously and your nails stay in good shape.",
  ],
  intro: [
    "Do nails need to breathe, and should you leave them bare for a while every few gel manicures so they can “breathe”? It is advice many people hear from friends and family. The short answer: nails do not breathe. That does not mean they never need a break. They need one for other reasons, and knowing the real reasons is what keeps nails healthy.",
    "This article follows the lesson “Do nails need to “breathe” between gel manicures?” from the Moja Beauty course at VaraaAi Academy, short customer videos from the Moja Beauty salon in Helsinki. By the end you will know where the nail gets its nourishment, what really harms it, when to stop, and how to care for your nails between appointments.",
  ],
  sections: [
    {
      id: "nails-do-not-breathe",
      title: "The fact: nails do not breathe",
      blocks: [
        { p: "The hard part of the nail that you see and paint is called the nail plate. It is made of keratin in many thin layers stacked on top of each other, and it does not need air. Covering it with gel does not “suffocate” it." },
        { p: "The nail is nourished from the nail root, the part hidden under the skin at the base of the nail. That is where blood vessels bring nutrients and new nail is formed and pushed gradually towards the fingertip. So whether the nail grows out strong or weak has nothing to do with whether its surface is left bare." },
        { img: { src: img("mat-cat-dau-ngon-tay-goc-mong-va-mach-mau"), alt: "An illustration of a lengthwise cross-section of a fingertip, showing the nail plate on top, the nail root hidden under a fold of skin and blood vessels below", caption: "The nail plate is on top. The nail is fed from the root under the skin, through blood vessels." } },
        { note: "Leaving your nails bare for a few weeks does not make them “healthier” in the way many people think. If they look better after a break, it is usually because the damaged part has grown out and been cut off, or because the nails are no longer being removed the wrong way.", kind: "info", title: "So what does “letting them breathe” do?" },
      ],
    },
    {
      id: "what-really-damages-nails",
      title: "What really makes nails weak after gel",
      blocks: [
        { p: "When nails get thinner after a period of wearing gel, the cause is lost layers, not a lack of air. These are the three most common ways it happens:" },
        {
          table: {
            head: ["What happens", "What it does to the nail"],
            rows: [
              ["Peeling off gel yourself", "The gel takes the top keratin layer with it"],
              ["Filing the surface too hard", "Each appointment removes another layer"],
              ["Wrong removal", "Scraping or grinding before the gel softens thins the nail"],
            ],
          },
        },
        { img: { src: img("cha-nham-nhe-mat-mong-truoc-khi-son-gel"), alt: "A nail technician in black gloves lightly buffs a client's natural nail with a white buffer, a gel lamp in the background", caption: "Before gel, buffing only needs to remove the shine. Buffing harder does not make the gel stick better; it only thins the nail." } },
        { p: "A thinned nail does not thicken again by itself; you have to wait for new nail to grow out. Fingernails grow about 3 mm a month, and a completely new nail takes about 4–6 months. The article [what peeling off gel polish does to your nails](lesson:tu-cay-son-gel) shows clearly what a nail looks like after peeling." },
        { img: { src: img("mong-mong-tach-lop-o-dau-mong"), alt: "Close-up of a short, thin natural nail with a split, slightly white tip, resting on a technician's black-gloved hand" } },
        { p: "A nail that looks slightly white and dry right after gel is removed properly, on the other hand, is usually just temporarily dehydrated by the remover. A few days of cuticle oil and it is less dry." },
        { img: { src: img("mong-trang-kho-sau-khi-thao-gel"), alt: "Close-up of a natural nail just after gel removal, the surface slightly white and dry, resting on a technician's black-gloved fingers", caption: "White and dry after removal: usually temporary dehydration, not damage." } },
      ],
    },
    {
      id: "when-to-take-a-break",
      title: "When to give your nails a rest",
      blocks: [
        { p: "Nails do not need a break to breathe, but there are times when you should stop wearing gel. That is when something is wrong with the nail:" },
        {
          ul: [
            "The nail is **thin**, soft and bends under light pressure.",
            "The nail or the skin around it is **painful**.",
            "The nail is **oddly discoloured**: yellowish, greenish or brownish, or with unusual streaks.",
            "You **suspect a fungal infection**, or the nail is separating from the nail bed.",
          ],
        },
        { img: { src: img("mong-doi-mau-can-hoi-bac-si"), alt: "Close-up of a natural nail turning yellow at the tip and showing signs of separating from the nail bed, resting on a technician's black-gloved hand", caption: "A discoloured nail separating from the bed: stop and ask a doctor or pharmacist." } },
        { note: "If your nails show any of these signs, ask a doctor or pharmacist before carrying on. Nail technicians do not diagnose, and a careful salon will decline to work on a problem nail until you have had it checked.", kind: "warn", title: "Ask a doctor first" },
        { p: "During the break, keep the nails short so the thin ones break less, apply cuticle oil every day and wait for new nail to grow out. When the nails are fine again, or your doctor says it is OK, you can go back to your usual routine." },
      ],
    },
    {
      id: "healthy-nails-with-gel",
      title: "Wearing gel continuously and keeping nails healthy",
      blocks: [
        { p: "The lesson puts it simply: done properly, gel can be worn continuously and the nails stay fine. “Properly” comes down to a few simple habits:" },
        {
          ol: [
            "**Apply cuticle oil every day** to the nail and the skin around it, even while you are wearing gel.",
            "**Have gel removed at the salon**, softened first and then lifted gently, with no peeling and no scraping.",
            "**Do not use your nails as tools**, and wear gloves for long wet jobs.",
            "**Book infills on time**, so the gel does not move towards the tip and make the nail easier to break.",
          ],
        },
        { img: { src: img("nho-dau-duong-quanh-mong-son-gel"), alt: "A nail technician in black gloves places a drop of golden cuticle oil on the skin at the base of a client's red gel nail on a hand cushion" } },
        { p: "If your nails are naturally thin and break often, ask your technician about BIAB: the builder gel layer stops the nail being bent back every day. The article [BIAB vs gel polish](lesson:gel-biab-bot-gelx) explains the difference. The habits that make gel lift early, and tempt you to peel it, are in [5 habits that make gel nails lift](lesson:5-thoi-quen-gel-bong)." },
      ],
    },
    {
      id: "ask-the-salon",
      title: "Ask the salon before your next set",
      blocks: [
        { p: "Not sure whether your nails are fine or whether you should stop? Take a photo of your nails and [message the salon](lesson:chat-voi-salon) to ask first, then [book online](lesson:dat-lich-online) once you know. This lesson comes from Moja Beauty in Helsinki, and you can see its services and book on [Moja Beauty's booking page](/b/moja-beauty). From the technician's side, [does gel removal damage nails](lesson:thao-gel-hieu-dung) explains in detail why nails get thin and when to advise a client to take a break." },
      ],
    },
  ],
  faq: [
    {
      q: "Do nails need to breathe?",
      a: "No. The visible part of the nail is keratin and does not need air. The nail is nourished from the root under the skin through blood vessels, so covering the surface with gel does not starve it of air.",
    },
    {
      q: "Do you need a break between gel manicures?",
      a: "Not if your nails are healthy and the gel is applied and removed properly. Take a break when a nail is thin, painful, oddly discoloured or you suspect a fungal infection, and ask a doctor or pharmacist before carrying on.",
    },
    {
      q: "Is it bad to have gel nails all the time?",
      a: "Done properly, gel can be worn continuously and the nails stay fine. What matters is having gel removed at the salon, never peeling it off, not having the nail surface filed too hard, and applying cuticle oil every day between appointments.",
    },
    {
      q: "Why are my nails weak and thin after gel?",
      a: "Nails get thinner because layers have been stripped, not because of a lack of air. The three most common causes are peeling off gel, filing the nail surface too hard and wrong removal. A thinned nail only gets stronger as new nail grows out.",
    },
    {
      q: "Can you get gel nails with a fungal infection?",
      a: "It is best not to. If a nail is oddly discoloured or thickened, or you suspect a fungal infection, stop and ask a doctor or pharmacist first. Only go back to gel once the nail has been checked and you have been told it is fine.",
    },
  ],
  related: ["tu-cay-son-gel", "5-thoi-quen-gel-bong", "gel-biab-bot-gelx", "thao-gel-hieu-dung"],
};

export default article;
