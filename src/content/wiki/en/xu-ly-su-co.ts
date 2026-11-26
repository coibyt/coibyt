import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/xu-ly-su-co/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "first-aid-in-a-beauty-salon",
  lesson: "xu-ly-su-co",
  category: "safety",
  title: "First aid in a beauty salon: bleeding cuts, product in the eye, wax burns and fainting clients",
  metaTitle: "First aid in a beauty salon: cuts, eyes, burns, fainting",
  metaDescription:
    "First aid in a beauty salon: the first minute of a bleeding cut, glue or chemicals in the eye, a hot wax burn or a client fainting, and the incident record.",
  keyword: "first aid in a beauty salon",
  keywords: [
    "cut a client's cuticle and it bled",
    "lash glue in the eye what to do",
    "hot wax burn treatment",
    "client fainted during waxing",
    "salon incident report",
    "salon first aid kit contents",
    "nail technician cut by nippers",
  ],
  excerpt: "The first minute of a salon incident: a bleeding cut, product in the eye, a burn, a client who faints, a tool that pricks you. And what to do afterwards.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-lam-dep-mo-hop-so-cuu-trong-salon"),
    alt: "A blonde beauty therapist in a cream top stands at a white stone counter, opening a white first aid box marked with a green cross",
  },
  takeaways: [
    "Every incident starts the same way: **stop working**, **stay calm**, and if life is in danger call the emergency number first (112 in the EU).",
    "A bleeding cut: fresh gloves, clean gauze pressed straight onto the cut and held still until the bleeding stops.",
    "Product in the eye: rinse at once with gently running clean water for **at least 20 minutes**, then get medical help and take the bottle along.",
    "Heat burns: cool running water for at least 10 minutes, ideally 20. No ice, no creams, oils or toothpaste.",
    "Afterwards, tell the client the truth, write the incident record the same day and restock the first aid kit.",
  ],
  intro: [
    "First aid in a beauty salon is something nobody wants to need, but anyone who stays in the trade long enough will meet it: a cut that bleeds, a drop of chemical in an eye, a client who suddenly turns pale and faints. In that moment nobody has time to open a book. The people who handle it well are the ones who have already rehearsed in their heads what they will do in the first minute.",
    "This article follows the VaraaAi Academy lesson “Incidents: bleeding, allergic reactions, burns” in the Hygiene & safety course, one type of incident at a time, with what to do once things are calm again. It does not replace a first aid course. Every salon should have someone trained in first aid.",
  ],
  sections: [
    {
      id: "first-three-things",
      title: "Three things that are the same in every incident",
      blocks: [
        {
          ol: [
            "**Stop working.** Do not try to finish that nail or that set of lashes.",
            "**Stay calm.** The client reads your face to know whether to be scared.",
            "**If life is in danger, call the emergency number first.** In the European Union the common number is 112.",
          ],
        },
        { note: "Difficulty breathing, swollen lips or face, bleeding that will not stop, a client who does not come round: this is when you call for emergency help at once, without waiting to see whether it passes. First aid guidance and incident reporting rules differ from country to country.", kind: "warn", title: "When to call an ambulance at once" },
        { p: "Keep the emergency number and the salon's address written at the front desk, so whoever makes the call can read them out without having to remember." },
      ],
    },
    {
      id: "bleeding-cut",
      title: "You cut a client's skin and it bleeds",
      blocks: [
        { p: "This is the most common incident, usually caused by cuticle nippers. The order is the client first, the equipment afterwards." },
        {
          ol: [
            "Stop and put on fresh gloves.",
            "Press clean gauze straight onto the cut and hold it still until the bleeding stops. Do not keep lifting it to look.",
            "Rinse the wound with clean water, pat it dry and cover it.",
            "Tell the client to keep the wound clean and dry, and to see a doctor if it becomes swollen, red or more painful over the next few days.",
          ],
        },
        { img: { src: img("ep-gac-len-vet-cat-chay-mau-o-ngon-tay"), alt: "A nail technician in black gloves presses a folded square of white gauze against the side of a client's fingertip, an open first aid box beside them", caption: "Press the gauze straight onto the cut and hold it still." } },
        { p: "If pressure does not stop the bleeding, call for emergency help." },
        { h3: "Only then the equipment" },
        {
          ul: [
            "A surface with blood on it is always disinfected.",
            "The tool that caused the cut is not used again until it has been cleaned and sterilised, following [Tools after every customer](lesson:ve-sinh-dung-cu).",
            "Single-use blades and needles go into a sharps container.",
          ],
        },
        { img: { src: img("khu-khuan-mat-ban-va-hop-dung-vat-sac-nhon"), alt: "A hand in a black glove wipes a stone table with a disinfectant wipe, a tray of used nippers and a sharps container beside it" } },
      ],
    },
    {
      id: "product-in-the-eye",
      title: "Lash glue, tint or acetone in the eye: what to do",
      blocks: [
        { p: "When glue, tint, acetone or disinfectant gets into an eye, what matters most is rinsing at once and for a long time. Wiping with dry cotton and carrying on is the wrong response." },
        {
          ol: [
            "Let clean water that is not hot run gently over the open eye, continuously, for at least 20 minutes.",
            "If the client wears contact lenses, ask them to take them out if they can.",
            "Tell the client not to rub the eye. Rubbing makes the damage worse.",
            "Get medical help straight away and take the product bottle along so the doctor can read the label.",
          ],
        },
        { img: { src: img("rua-mat-khi-hoa-chat-ban-vao-mat"), alt: "A client in a cream robe tilts her head over a basin while a therapist in black gloves pours a gentle stream of water across her eye", caption: "Water runs gently over the open eye, with the head tilted so it drains away." } },
        { note: "With a strong chemical, keep rinsing and call for emergency help at the same time. Do not wait until you have finished rinsing.", kind: "warn" },
        { h3: "When a client reacts to a product" },
        { p: "If the client feels itching, burning, redness or swelling during the service, stop, remove the product very gently and rinse with plenty of water. The danger signs are difficulty breathing, a hoarse voice, swollen lips or face, and dizziness. If you see them, call for emergency help straight away. Ask whether the client carries an adrenaline auto-injector, help them into the position in which breathing is easiest, and stay with them. Causes and prevention are in [Allergies and chemicals](lesson:di-ung-hoa-chat)." },
      ],
    },
    {
      id: "burns",
      title: "Hot wax burns, chemical burns and nails burning under the lamp",
      blocks: [
        { p: "Burns in a beauty salon come from three sources: wax or tools that are too hot, chemicals such as bleach or perm solution burning the scalp, and nails that heat up under the gel lamp." },
        { h3: "Heat burns: cool running water straight away" },
        { p: "Hold the burn under cool running water. Current first aid guidance says at least 10 minutes, ideally 20. The steady flow of cool water draws the heat out of the skin. Take off rings and bracelets near the burn before the area swells." },
        { img: { src: img("xa-nuoc-mat-len-vet-bong-sap-wax"), alt: "A hand in a black glove supports a client's forearm under a cool tap, water running over a small red patch on the inside of the wrist" } },
        {
          table: {
            head: ["Do", "Do not"],
            rows: [
              ["Cool running water for at least 10 minutes, ideally 20", "Put ice on it"],
              ["Take off rings and bracelets near the burn before it swells", "Apply cream, oil or toothpaste"],
              ["After cooling, lay clean cling film loosely on top", "Burst blisters, or wrap cling film tightly around the limb"],
            ],
          },
        },
        { img: { src: img("che-vet-bong-bang-mang-boc-thuc-pham"), alt: "A therapist in black gloves lays a sheet of clear cling film loosely over a client's forearm resting on a white towel", caption: "The cling film lies loosely over the burn and is not wrapped round the arm." } },
        { h3: "When a burn needs a doctor" },
        {
          ul: [
            "A blistered burn larger than the client's own palm.",
            "A deep burn.",
            "A burn on the face or over a joint.",
            "Every chemical burn.",
          ],
        },
        { h3: "Chemicals on the skin and heat under the lamp" },
        { p: "With a chemical on the skin, rinse with lots of water for a long time, remove any towel or clothing soaked with it, and put nothing on the skin. When a client says it feels hot under the gel lamp, let them take the hand out at once. That burning feeling is a sign that the gel layer is too thick or the nail has become thin." },
      ],
    },
    {
      id: "fainting",
      title: "A client faints during waxing or on standing up",
      blocks: [
        { p: "Fainting is common during waxing, when someone gets up too fast after lying down for a long time, and in clients who are afraid of blood. There are usually warning signs: the client says they feel dizzy, turns pale or breaks into a sweat." },
        {
          ol: [
            "Lay the client down straight away, before they fall.",
            "Raise their legs.",
            "Loosen the collar and open a window for fresh air.",
            "Once they come round, let them rest lying down a little longer, then sit up very slowly.",
          ],
        },
        { img: { src: img("khach-xiu-nam-ke-cao-hai-chan"), alt: "A client lies on her back on a flat spa bed with both legs raised on two pillows, a therapist in a cream top standing beside her and the window open" } },
        { p: "Most people come round in under a minute. If the client is not awake after one minute, is not breathing normally, has a seizure or has chest pain, call for emergency help." },
      ],
    },
    {
      id: "sharps-injury",
      title: "When a tool used on a client pricks or cuts you",
      blocks: [
        { p: "A tiny prick from nippers that have just been used on a client is not something to shrug off. Some infections travel through blood, and preventive treatment only works when it starts early." },
        {
          ol: [
            "Let the wound bleed gently under running water. Do not squeeze hard and do not suck it.",
            "Wash with soap and plenty of water, then cover it.",
            "Tell the salon owner straight away.",
            "Contact a doctor or occupational health the same day.",
          ],
        },
        { p: "Spraying alcohol on it and forgetting about it is the wrong response. Whether you can keep working on clients with a hand wound is covered in [When not to treat a customer](lesson:khi-nao-khong-lam)." },
      ],
    },
    {
      id: "after-the-first-minute",
      title: "After the first minute: honesty, the incident record and the first aid kit",
      blocks: [
        { h3: "Tell the client the truth" },
        { p: "Explain what happened, what you did and what the client should watch for. Apologise sincerely, without blaming anyone and without hiding anything." },
        { h3: "Write the incident record the same day" },
        { p: "The record holds the date and time, who did the service, what happened, the product and its batch number, what you did and what you advised the client. Then tell the salon owner, who checks whether the insurer or an authority must be informed under the rules where you work." },
        { img: { src: img("ghi-bien-ban-su-co-trong-ngay"), alt: "A hand with a gold pen writes in a cream notebook open on a stone table, a small white first aid box beside it" } },
        { p: "In VaraaAi, note in the internal notes on the client's profile that there was an incident and what you advised; only the salon can see these notes. See the [customer book](lesson:khach-hang) lesson. The full incident record is kept wherever the owner has decided." },
        { h3: "What a salon first aid kit should contain" },
        {
          ul: [
            "Plasters in several sizes, sterile gauze, rolled bandages and medical tape.",
            "Eye pads.",
            "Disposable gloves and scissors.",
            "Saline for rinsing eyes and wounds.",
            "A first aid leaflet.",
          ],
        },
        { img: { src: img("tui-so-cuu-cua-tiem-lam-dep"), alt: "A first aid kit laid out on stone: plasters in several sizes, gauze, rolled bandage, tape, eye pads, scissors, gloves and saline vials" } },
        { p: "Keep no tablets or medicines in it. Store the kit where everyone knows to find it, check it regularly for anything used up or out of date, and restock it straight after every use." },
        { h3: "Most incidents can be prevented" },
        {
          ul: [
            "Test the wax temperature on your own wrist before it touches the client.",
            "Shield the client's eyes carefully when working with chemicals near the face.",
            "Do not rush, and do not look at your phone while you work.",
          ],
        },
        { img: { src: img("thu-nhiet-do-sap-wax-len-co-tay"), alt: "A hand in a black glove holds a wooden spatula with golden wax and dabs it on the inside of a bare wrist next to a warm wax heater", caption: "Test the wax on your own wrist before every application to the client." } },
        { p: "Take a first aid course and refresh it every few years. Safe waxing technique has its own lesson, [Waxing: step by step](lesson:spa-waxing)." },
      ],
    },
  ],
  faq: [
    {
      q: "What do you do if you cut a client's cuticle and it bleeds?",
      a: "Stop, put on fresh gloves, press clean gauze straight onto the cut and hold it still until the bleeding stops. Then rinse with clean water, pat dry and cover. Disinfect any surface with blood on it, and have the tool cleaned and sterilised before it is used again. If pressure does not stop the bleeding, call for emergency help.",
    },
    {
      q: "What should you do if lash glue gets in the eye?",
      a: "Rinse at once: let clean water that is not hot run gently over the open eye, continuously, for at least 20 minutes. Do not rub the eye, and take out contact lenses if possible. Then get medical help straight away and take the glue bottle so the doctor can read the label.",
    },
    {
      q: "Should you put ice or toothpaste on a hot wax burn?",
      a: "No. Cool the burn under cool running water for at least 10 minutes, ideally 20. No ice, no creams, oils or toothpaste, and do not burst blisters. After cooling, cover with clean cling film laid loosely on top.",
    },
    {
      q: "What does it mean when a client's nails burn under the gel lamp?",
      a: "It is a sign that the gel layer is too thick or the nail has become thin. Let the client take the hand out of the lamp at once, and apply thinner coats next time.",
    },
    {
      q: "What is the first aid for a client who faints in the salon?",
      a: "Lay them down straight away, raise their legs, loosen the collar and let in fresh air. Most people come round in under a minute; let them rest, then sit up very slowly. If they are not awake after one minute, are not breathing normally, have a seizure or chest pain, call for emergency help.",
    },
    {
      q: "Should a nail technician see a doctor after being cut by a client's nippers?",
      a: "Yes. Let the wound bleed gently under running water without squeezing hard or sucking it, wash with soap and plenty of water and cover it. Tell the owner and contact a doctor or occupational health the same day, because protection against blood-borne infections only works when it starts early.",
    },
  ],
  related: ["di-ung-hoa-chat", "khi-nao-khong-lam", "ve-sinh-dung-cu", "ve-sinh-tiem"],
};

export default article;
