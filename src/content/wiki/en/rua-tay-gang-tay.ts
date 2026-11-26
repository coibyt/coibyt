import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/rua-tay-gang-tay/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "gloves-for-nail-technicians",
  lesson: "rua-tay-gang-tay",
  category: "safety",
  title: "Gloves for nail technicians: nitrile, vinyl or latex, when to change them and how to wash your hands",
  metaTitle: "Gloves for nail technicians: nitrile, vinyl or latex?",
  metaDescription:
    "Choosing gloves for nail technicians: nitrile, vinyl or latex, when to change them, how to take them off, hand washing and sanitising, masks and eye protection.",
  keyword: "gloves for nail technicians",
  keywords: [
    "nitrile vs vinyl gloves",
    "latex glove allergy",
    "how to wash your hands properly",
    "how to remove gloves safely",
    "how long to rub in hand sanitiser",
    "best mask for nail dust",
    "nail technician hand dermatitis",
  ],
  excerpt: "Gloves do not replace hand washing. How to wash and sanitise your hands, choose and change gloves, take them off safely and protect your own skin.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-lam-dep-deo-gang-tay-nitrile-ben-bon-rua-tay"),
    alt: "A beauty therapist in a short-sleeved cream top stands at a white stone basin, pulling a black nitrile glove onto her hand",
  },
  takeaways: [
    "**Gloves do not replace hand washing.** A glove is an extra layer over hands that are already washed and disinfected.",
    "Wash with soap for about 40–60 seconds, dry thoroughly with a single-use paper towel, then disinfect your hands before every client and before gloving up.",
    "Of the three common glove types, **nitrile** is usually the best choice: stronger than vinyl, better against chemicals and free of natural rubber latex.",
    "A fresh pair for every client. Change straight away when a glove tears, gets gel or acetone on it, or touches your phone, a door handle, the lamp or your hair.",
    "Dry, cracked hands are where allergies start: lukewarm water, hands fully dry before gloving, fragrance-free hand cream.",
  ],
  intro: [
    "Gloves for nail technicians are often seen as the sign of a clean salon. Yet a pair put on in the morning and worn from one client to the next, while answering the phone, opening the door and taking cash, is as dirty as an unwashed hand. Gloves only help when the hands inside them are clean and when they are changed at the right moment.",
    "This article follows the VaraaAi Academy lesson “Hand hygiene, gloves and protective wear” in the Hygiene & safety course. By the end you will know when and how to wash your hands, which gloves to buy, when to change them and how to take them off, when a mask and safety glasses are needed, and how to keep the skin on your own hands healthy for years in the trade.",
  ],
  sections: [
    {
      id: "gloves-are-not-hand-washing",
      title: "Why you still wash your hands when you wear gloves",
      blocks: [
        { p: "Your hands are the tool you use most in this work, and they are also one of the main routes by which germs pass from one client to the next. A glove does not cut that route if the hand inside is not clean, or if the outside of the glove has touched everything around the room." },
        { p: "There is one more reason that few people think of. Inside a glove, hands are warm and damp, so bacteria multiply very quickly. Hands need to be clean before the gloves go on, and washed or disinfected again once they come off." },
        { h3: "When to wash your hands" },
        {
          ul: [
            "Before and after every client.",
            "Before putting on gloves and after taking them off.",
            "After using the toilet and after eating.",
            "After touching rubbish or dirty tools.",
          ],
        },
        { p: "The hygiene guidance of the City of Helsinki in Finland, which the lesson uses as its example, puts it plainly: wash your hands with soap and then disinfect them before every treatment and before putting on gloves." },
        { img: { src: img("thao-nhan-dong-ho-truoc-khi-rua-tay"), alt: "A woman's hand slips a gold ring off at the basin, her watch and bracelet already lying in a small porcelain dish on the stone counter", caption: "Rings, watches and bracelets come off before work starts, not before each wash." } },
        { note: "Take off rings, watches and bracelets before work. Bacteria shelter underneath, where soap and water cannot reach, and rings tear gloves easily. Keep your own nails short and clean. If you wear them long or enhanced, scrub under them well every time you wash.", kind: "info", title: "Look at your hands before you wash" },
      ],
    },
    {
      id: "choosing-gloves",
      title: "Nitrile vs vinyl vs latex gloves: which to choose for the salon",
      blocks: [
        { p: "The three kinds of disposable glove you meet in beauty salons differ in material, and the material decides two things: how likely the glove is to cause an allergy, and how well it holds back chemicals." },
        { img: { src: img("gang-tay-latex-vinyl-nitrile"), alt: "Three pairs of disposable gloves side by side on white stone: cream latex, clear vinyl and black nitrile", caption: "From left: latex, vinyl and nitrile gloves." } },
        {
          table: {
            head: ["Glove type", "Strength", "Weakness"],
            rows: [
              ["Latex (natural rubber)", "Snug fit", "Can cause allergy in technician and client, so many salons have dropped it"],
              ["Vinyl", "Cheap", "Loose, tears easily, poor against chemicals"],
              ["Nitrile", "Stronger, better against chemicals, no natural rubber", "Still protects only for a short time"],
            ],
          },
        },
        { p: "For nails, lashes and any service that involves chemicals, nitrile is usually the best choice. Even so, no disposable glove holds chemicals back forever. Gel, acrylic liquid and glue slowly work their way through a thin glove within a few minutes to a few tens of minutes, even when it is not torn at all. Acetone gets through faster still." },
        { note: "A glove with gel on it or wet with acetone is changed at once, not wiped and kept on. Whatever has soaked through sits against your skin for the rest of the session, and repeated contact like that is the road to an allergy. The lesson [Allergies and chemicals](lesson:di-ung-hoa-chat) explains how it happens.", kind: "warn", title: "An intact glove may already have stopped working" },
      ],
    },
    {
      id: "when-to-change-gloves",
      title: "When to change gloves and how to remove them safely",
      blocks: [
        { p: "The basic rule is a new pair for every client. On top of that, gloves are changed mid-service whenever:" },
        {
          ul: [
            "a glove tears or gets a hole;",
            "it gets gel, glue or acrylic liquid on it, or gets wet with acetone;",
            "the gloved hand has touched anything outside the work area: a phone, a door handle, the lamp, your own hair.",
          ],
        },
        { img: { src: img("deo-gang-tay-cam-dien-thoai-la-sai"), alt: "A hand in a black nitrile glove holds a phone while the other hand still rests on the client's hand on the arm cushion", caption: "An example of what not to do: a glove that has touched a phone counts as dirty and is changed before you carry on." } },
        { p: "The Helsinki guidance picks a very everyday example: if you reach up to adjust the lamp during a treatment, you change your gloves. Disposable gloves are never washed or sprayed with alcohol to be used again." },
        { h3: "How to take gloves off without touching the dirty side" },
        { p: "The outside of a used glove is the dirty side. The aim is for bare skin to touch only the inside." },
        {
          ol: [
            "Pinch the outside of one glove at the wrist and peel it off so it turns inside out.",
            "Hold the removed glove in the hand that is still gloved.",
            "Slide a bare finger inside the cuff of the other glove, touching only the inside, and peel it off so it wraps around the first one.",
            "Put both in the bin, then wash or disinfect your hands.",
          ],
        },
        { img: { src: img("cach-thao-gang-tay-nhum-mat-ngoai"), alt: "Two hands in black nitrile gloves, one pinching the outside of the other glove right at the wrist to peel it off", caption: "Step one: pinch the outside at the wrist and peel the glove off inside out." } },
        { img: { src: img("cach-thao-gang-tay-luon-ngon-vao-mat-trong"), alt: "A bare hand slides two fingers inside the cuff of the remaining black glove while the gloved hand holds the first glove balled up", caption: "Step three: the bare fingers touch only the inside of the glove." } },
      ],
    },
    {
      id: "masks-glasses-clothes",
      title: "Masks, safety glasses and work clothes",
      blocks: [
        { p: "When you file and drill, the dust rises right in front of your face. What matters most here is **extraction at the table**, because it removes the dust where it is made, before it can rise. A mask is only the second line of defence, and each kind stops something different." },
        {
          table: {
            head: ["What you need to stop", "How to protect yourself"],
            rows: [
              ["Splashes and coarse dust", "An ordinary surgical mask"],
              ["Fine dust from filing and drilling", "Table extraction plus a well-fitted particle filtering mask (such as FFP2)"],
              ["Chemical vapours", "Ventilation. A mask does not stop vapours"],
              ["Nail clippings, acetone or disinfectant splashing into the eyes", "Safety glasses when drilling, clipping nails, pouring acetone or mixing disinfectant"],
            ],
          },
        },
        { img: { src: img("kinh-bao-ho-khau-trang-loc-bui-khi-mai-mong"), alt: "A nail technician in safety glasses and a filtering mask uses an e-file on a client's nail above the dust extractor" } },
        { p: "Work clothes are protective wear too. The Helsinki guidance asks for smooth fabric that is easy to wash, no thick or porous knits, and frequent changes. For services that can break the skin, work clothes are changed whenever needed and at least once a day. Hair tied back, sleeves short." },
        { p: "Dust and vapours concern the whole room, not one table. Ventilation and the cleaning routine are covered in [Daily salon cleaning and the in-house control plan](lesson:ve-sinh-tiem)." },
      ],
    },
    {
      id: "your-own-skin",
      title: "Looking after the skin on your own hands",
      blocks: [
        { p: "Frequent washing and long hours in gloves leave the skin dry, red and then cracked. Doctors call this irritant dermatitis. It is more than a cosmetic problem: chemicals get into cracked skin far more easily, and allergies often start there." },
        {
          ul: [
            "Wash with lukewarm water, never hot.",
            "Dry your hands completely before putting on gloves.",
            "Use a fragrance-free hand cream at breaks and after work.",
            "When your hands are not visibly dirty, hand disinfectant is usually kinder to the skin than washing with soap over and over.",
          ],
        },
        { note: "If the skin on your hands stays red, itchy or cracked and will not heal, see a doctor early. Healthy hands are what let you stay in this work for a long time.", kind: "warn", title: "Do not put up with it" },
      ],
    },
    {
      id: "rules-and-routine",
      title: "Rules differ by place, a routine is needed everywhere",
      blocks: [
        { p: "The examples in this article come from the City of Helsinki's guidance, listed as the source at the end. Every country and city has its own requirements, so ask the health authority where you work for the exact rules that apply to your salon." },
        { p: "Hand washing and glove changes only become habits when the whole salon does them the same way. If you run your salon with VaraaAi, you can use the [team hub](lesson:tien-ich-nhom) to post notices and train staff on the shared rules, and keep track of gloves, paper towels and hand disinfectant in [inventory](lesson:kho-hang) so nobody reuses a pair because the box ran out. The other half of hygiene after every client, the tools, is in [Tools after every customer](lesson:ve-sinh-dung-cu)." },
      ],
    },
  ],
  howTo: {
    title: "How to wash your hands properly and disinfect them before every client",
    id: "how-to-wash-hands",
    after: "gloves-are-not-hand-washing",
    lead: "The wash takes about 40 seconds to a minute. The order below runs from the easy parts to the places people miss most.",
    supplies: [
      "A basin with running water and soap",
      "Single-use paper towels",
      "Hand disinfectant",
    ],
    steps: [
      {
        name: "Wet your hands and take soap",
        text: "Wet both hands and take some soap. Rub palm against palm until it lathers, then rub the back of each hand.",
      },
      {
        name: "Wash between the fingers",
        text: "Interlace your fingers and rub back and forth so the soap gets in between them. Running water alone does not clean these gaps.",
      },
      {
        name: "Grip and rotate each thumb",
        text: "Grip one thumb in the other hand and rotate, then swap sides. The thumb is the place forgotten most often, although it touches tools and clients as much as any other finger.",
        image: { src: img("rua-tay-dung-cach-xoay-ngon-cai"), alt: "Two soapy hands over a basin, one hand wrapped around the thumb of the other to rotate and wash it", caption: "Wrap the thumb in the other palm and rotate." },
      },
      {
        name: "Clean the fingertips and under the nails",
        text: "Bunch your fingertips together and rub them in circles in the opposite palm to clean the tips and under the nails. Technicians with long or enhanced nails need to take more care over this step.",
      },
      {
        name: "Wash the wrists and rinse",
        text: "Rub around each wrist. Then rinse thoroughly under the tap until all the soap is gone.",
      },
      {
        name: "Dry thoroughly and turn the tap off with the towel",
        text: "Dry with a single-use paper towel, because wet hands pass on more bacteria than dry ones. Use the same towel to turn off the tap so your clean hands do not touch it again. Never dry your hands on a cloth towel the whole salon shares.",
        image: { src: img("khoa-voi-nuoc-bang-giay-lau-tay"), alt: "A hand uses a white paper towel to turn off a brass tap, a stack of single-use paper towels beside the basin" },
      },
      {
        name: "Rub in disinfectant until dry",
        text: "Take enough to wet both hands completely and rub with the same movements as washing until your hands are fully dry. That is usually about 30 seconds, but follow whatever time the product label gives. Visibly dirty hands are washed first, because disinfectant does not remove dirt.",
        image: { src: img("sat-khuan-tay-xoa-den-khi-kho"), alt: "Two bare hands rub hand disinfectant together above a stone counter, a clear unlabelled pump bottle beside them" },
      },
    ],
  },
  faq: [
    {
      q: "Do you need to wash your hands if you wear gloves?",
      a: "Yes. Gloves do not replace hand washing; they are only an extra layer over clean hands. Wash with soap and disinfect before putting gloves on, and wash or disinfect again after taking them off, because hands inside gloves are warm and damp and bacteria multiply quickly.",
    },
    {
      q: "Should nail technicians use nitrile, vinyl or latex gloves?",
      a: "Nitrile is usually the best choice: it is stronger, resists chemicals better and contains no natural rubber latex. Latex gloves can cause allergy in both technician and client. Vinyl gloves are cheap but loose, tear easily and protect poorly against chemicals.",
    },
    {
      q: "Can you spray disposable gloves with alcohol and reuse them?",
      a: "No. Disposable gloves are never washed or sprayed for reuse. Use a fresh pair for every client, and change straight away when a glove tears, gets gel or acetone on it, or touches a phone, a door handle, the lamp or your hair.",
    },
    {
      q: "Why change a glove with gel or acetone on it if it is not torn?",
      a: "Because disposable gloves protect only for a short time. Gel, acrylic liquid, glue and above all acetone work their way through a thin glove to the skin, even when it is intact. Wiping the glove does not remove what has already soaked in.",
    },
    {
      q: "How long should you wash and sanitise your hands?",
      a: "A soap wash takes about 40–60 seconds to cover palms, backs, between the fingers, thumbs, fingertips and wrists. Hand disinfectant is rubbed in until the hands are completely dry, usually about 30 seconds, and always for the time on the product label.",
    },
    {
      q: "Does a surgical mask protect against nail dust and chemical fumes?",
      a: "An ordinary surgical mask only stops splashes and coarse dust. Fine dust needs extraction at the table plus a well-fitted particle filtering mask such as FFP2. Chemical vapours are not stopped by a mask at all; they need ventilation.",
    },
  ],
  related: ["ve-sinh-dung-cu", "di-ung-hoa-chat", "ve-sinh-tiem", "xu-ly-su-co"],
};

export default article;
