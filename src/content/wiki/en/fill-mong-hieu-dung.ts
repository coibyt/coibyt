import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/fill-mong-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "what-is-a-nail-infill",
  lesson: "fill-mong-hieu-dung",
  category: "nail",
  title: "What is a nail infill? Gel and acrylic infills: how often, and when everything has to come off",
  metaTitle: "What is a nail infill? How often, and when to remove it all",
  metaDescription:
    "What a nail infill is, why overdue nails break, how often gel and acrylic need one, when to infill and when to remove it all, and why never to cover lifting.",
  keyword: "what is a nail infill",
  keywords: ["how often to infill gel nails", "how often to infill acrylic nails", "infill or full removal", "can you infill lifted nails", "why do nails break before an infill", "builder gel infill", "can you put gel over acrylic"],
  excerpt: "An infill rebalances a gel or acrylic set after a few weeks of growth. Why it has to be done on time, when an infill is possible, and when everything has to come off.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-nail-tu-van-lich-dam-mong-cho-khach"),
    alt: "A nail technician in black gloves holds a client's hand and explains something at a stone table in an elegant salon, the brown-haired client smiling as she listens",
  },
  takeaways: [
    "As the nail grows it carries the product with it: a band of bare nail appears at the cuticle, and **the apex drifts towards the tip**.",
    "Usual infill intervals: **builder gel about every 3–4 weeks, acrylic about every 2–3 weeks**. Fast growth or heavy hand work means booking sooner.",
    "Infill while the old product is still well bonded. Large lifted areas or air pockets mean removing it all. Discolouration, pain or red, swollen skin mean no service and a doctor.",
    "**Never put product over lifting.** File the lifting away until the remaining edge is bonded and flush with the nail.",
    "An infill rebalances the set: thin the old product, cover the regrowth and rebuild the apex over the stress area.",
  ],
  intro: [
    "What is a nail infill, and why does every salon ask clients to come back after a few weeks? A client with builder gel or acrylic soon has natural nail growing out underneath, and the set needs an infill, sometimes called a fill or rebalance. Done right, the set lasts a very long time and stays balanced and strong. Done wrong, or left too long, the nails break and lift, and the client blames the product.",
    "This article follows the VaraaAi Academy lesson “Infills: understand them so the nails stay balanced and strong” in the Nails course. By the end you will be able to explain to a client why infills have to be on time, know when to infill and when to remove everything, and understand why product must never go over lifting.",
  ],
  sections: [
    {
      id: "as-the-nail-grows",
      title: "What happens to a set of nails as they grow",
      blocks: [
        { p: "The natural nail grows a little every day and carries the gel or acrylic with it. At the cuticle a strip of new natural nail appears with nothing covering it. The strip gets wider week by week, and where the old layer stops there is a small step." },
        { img: { src: img("mong-moc-ra-lo-khoang-mong-that-o-chan-mong"), alt: "Close-up from above of a grown-out acrylic nail, a band of pale natural nail at the cuticle and then the step where the old product begins", caption: "After a few weeks: a band of new nail at the cuticle and a step where the old product ends." } },
        { p: "Everyone sees the gap. What matters more is harder to see: the apex. On the day of the service the apex sits right over the stress area, slightly towards the back. As the nail grows, the apex slowly moves towards the tip too. The thickest part now sits in front, and the nail becomes long and top-heavy." },
        { img: { src: img("diem-apex-dung-cho-ngay-moi-lam"), alt: "A nail coated in clear pink gel seen from the side, the highest point of the gel sitting around the middle of the nail", caption: "On the day of the service: the high point sits over the stress area." } },
        { img: { src: img("apex-troi-ra-dau-mong-sau-vai-tuan"), alt: "A grown-out gel nail seen from the side, the thickest part of the gel pushed towards the tip and bare natural nail showing at the cuticle", caption: "A few weeks later: the thickest part has moved forward, and the nail is long and top-heavy." } },
        { p: "Picture a lever. The longer and heavier the tip, the more force goes into the stress area every time the client types, opens a lid or knocks her hand against something. And by now that area is no longer supported by the apex. The result is a nail that breaks straight across right there, or product that pops up at the cuticle and gradually lifts." },
      ],
    },
    {
      id: "how-often",
      title: "How often should you get an infill",
      blocks: [
        { p: "Do not wait for a nail to break or lift before booking an infill. The two figures below are the usual range." },
        {
          table: {
            head: ["Type of set", "Usual infill interval"],
            rows: [
              ["Builder gel", "About every 3–4 weeks"],
              ["Acrylic", "About every 2–3 weeks"],
            ],
          },
        },
        { p: "The right figure for each client also depends on how fast her nails grow, what she does with her hands and the brand of product. Fast-growing nails or heavy work with the hands mean booking sooner." },
      ],
    },
    {
      id: "infill-or-removal",
      title: "Infill or full removal",
      blocks: [
        { p: "When the client arrives, that is always the first question. The answer lies in the state of the old product." },
        {
          table: {
            head: ["What you see", "What to do"],
            rows: [
              ["The old product is still firmly bonded, with only slight lifting at the edge that filing will remove", "Infill"],
              ["The old product has lifted in large patches, with air pockets underneath", "Remove everything and start again"],
              ["A green mark or discolouration under the lifting, pain, red swollen skin, a nail separating from its bed", "No infill, no new product; suggest the client sees a doctor"],
            ],
          },
        },
        { img: { src: img("ho-nho-o-mep-chan-mong-con-dam-duoc"), alt: "Close-up of a pink acrylic nail whose edge is slightly raised at the cuticle while the rest is still firmly bonded to the nail", caption: "Slight lifting at the edge: file the lifted part away and the nail can be infilled." } },
        { img: { src: img("vet-xanh-duoi-cho-ho-khong-dam"), alt: "Close-up of an acrylic nail lifting near the cuticle, with a small olive-green mark on the natural nail underneath the gap", caption: "A green mark under lifting can be a sign of infection: no infill, no colour over it, and a suggestion to see a doctor." } },
        { p: "The signs that mean saying no are covered in the lesson [When not to treat](lesson:khi-nao-khong-lam). How to take off the old product without damaging the natural nail is in [how to remove gel properly](lesson:thao-gel)." },
      ],
    },
    {
      id: "never-cover-lifting",
      title: "Why you should never infill over lifting",
      blocks: [
        { p: "It is a familiar scene: a little lifting, a busy day, so gel or acrylic goes over it to seal it. It looks nice. But under the lifted part, water, oil and dirt have already got in. Building over it traps them inside, warm and damp. That is a place for bacteria and fungi to grow, and the natural nail underneath suffers. The new layer will lift very quickly too." },
        { note: "Wherever it has lifted, file it all away until the remaining edge is firmly bonded, thin and flush with the nail. Do not prise the lifted part off, because that pulls up layers of the natural nail with it.", kind: "warn", title: "The rule for lifting" },
      ],
    },
    {
      id: "same-system",
      title: "Gel on gel, acrylic on acrylic",
      blocks: [
        { p: "An infill uses the same type of product as the old layer. If you want to use two different types or two different brands, check whether the brand says they can be used together. Many brands make a whole system in which the bonding layer, the gel and the top coat belong together. Mix them at random, and sometimes they do not bond, and sometimes they do not cure evenly." },
        { p: "To refresh what makes each system different, see [what is builder gel](lesson:builder-gel-hieu-dung) and [what are acrylic nails](lesson:dap-bot-hieu-dung)." },
      ],
    },
    {
      id: "rebalancing",
      title: "An infill is a rebalance",
      blocks: [
        { p: "Filling the gap at the cuticle is the easy part. The most important job of an infill is to bring the structure back where it belongs:" },
        {
          ol: [
            "File the old product thinner, especially the thick part that has moved forward.",
            "If the nails have grown too long, shorten them, keeping the shape the client chose.",
            "Cover the new growth.",
            "Rebuild the apex over the stress area, slightly towards the back.",
          ],
        },
        { img: { src: img("lop-cu-da-dua-mong-truoc-khi-dam"), alt: "Close-up from above of a gel nail that has been filed thinner to an even matte surface, the technician's black gloves dusted with filing dust", caption: "The old product is filed thin and evenly matte before the new layer goes on." } },
        { p: "Once the infill is done, the nail seen from the side should look just as it did on the first day. A common mistake is doing infill after infill without thinning the old layer, adding another layer every time. The set gets thicker, stiffer and heavier-looking, and loses its natural shape completely. When the old product has lifted in many places or is discoloured, remove it all and start from scratch. That is what is good for the client's nails." },
        { note: "Look at the set from the side before you start and find the highest point. Wherever it has drifted to is where you file thinner, and the new apex has to move back from there.", kind: "tip", title: "Read the set before you file" },
      ],
    },
    {
      id: "filing-safely",
      title: "Filing safely at the cuticle, dust and allergy",
      blocks: [
        { p: "The cuticle area needs extreme care. That is new natural nail, still thin and soft. Only glide a buffer over it very lightly to take off the shine." },
        {
          ul: [
            "**Never file into the natural nail.** With every infill the nail gets a little thinner, the client feels heat and pain, and the nail gradually weakens.",
            "**Never file the skin.** It creates an open wound, a way in for bacteria.",
            "With a hand file or an e-file alike, always keep the tip of the file away from the skin.",
          ],
        },
        { img: { src: img("tho-nail-deo-khau-trang-dua-mong-co-may-hut"), alt: "A nail technician in safety glasses, a mask and black gloves uses an e-file on a client's nails next to a dust extraction vent in the table", caption: "Infills mean a lot of filing: extraction at the table, a mask and gloves. An e-file is only for those trained to use it." } },
        { p: "Infills mean a lot of filing, and so a lot of dust. Switch on the extraction at the table and wear a mask and gloves. Brush the dust away rather than blowing it. Dust from gel that is not fully cured, and gel on the skin, can both cause allergies, for the client and for you. There is more in the lesson [Allergies and chemicals](lesson:di-ung-hoa-chat). Rules on products and dust extraction differ from country to country." },
      ],
    },
    {
      id: "booking-the-next-infill",
      title: "What to tell the client, and booking the next infill",
      blocks: [
        { p: "A set that gets its infills on time and is rebalanced every time lasts a very long time, and the natural nails stay healthy. A set left past its time becomes top-heavy and sooner or later breaks or lifts. Then it often has to be removed completely, costing the client more time and money. So book the next infill before the client leaves, and explain why." },
        { p: "In VaraaAi you book the next infill at the desk in the [appointment calendar](lesson:lich-hen) and choose to email the client a confirmation and a reminder. Note which of her nails tend to lift or break in her [client record](lesson:khach-hang), so you know what to adjust next time. The hands-on part of an infill is in the practice article [how to do a nail infill](lesson:fill-mong)." },
      ],
    },
  ],
  faq: [
    {
      q: "What is a nail infill?",
      a: "An infill is the appointment where a builder gel or acrylic set is redone after a few weeks of growth. The technician files away any lifting, thins the old product, covers the new growth at the cuticle and rebuilds the apex over the stress area, instead of removing everything and starting again.",
    },
    {
      q: "How often should you get a nail infill?",
      a: "The usual range is about every 3–4 weeks for builder gel and about every 2–3 weeks for acrylic. It depends on how fast the nails grow, the client's work and the brand. Fast-growing nails or heavy hand work mean booking sooner.",
    },
    {
      q: "Why do nails break when an infill is overdue?",
      a: "Because growth carries the apex towards the tip. The long, heavy tip works like a lever, and the stress area is no longer supported by the apex. The nail breaks straight across there, or the product pops up at the cuticle.",
    },
    {
      q: "Can you infill nails that have lifted?",
      a: "Yes, if the old product is still firmly bonded and has only lifted slightly at the edge. The technician files the lifting away until the edge is bonded and then does the infill. If large areas have lifted or there are air pockets, everything has to come off. Product never goes over lifting.",
    },
    {
      q: "What does a green mark under lifted gel or acrylic mean?",
      a: "Discolouration under lifting can be a sign of infection. Do not infill, do not apply new product and do not cover it with colour. The technician stops and suggests the client sees a doctor.",
    },
    {
      q: "Can you infill acrylic with gel?",
      a: "The rule is to use the same type of product: gel on gel, acrylic on acrylic. To use a different type or brand, check whether the brand says they can be used together, because random mixing may not bond or may not cure evenly.",
    },
  ],
  related: ["fill-mong", "builder-gel-hieu-dung", "dap-bot-hieu-dung", "thao-gel-hieu-dung"],
};

export default article;
