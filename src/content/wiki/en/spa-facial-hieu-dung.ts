import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/spa-facial-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "what-is-a-facial-and-its-steps",
  lesson: "spa-facial-hieu-dung",
  category: "spa",
  title: "What is a facial? The order of a salon facial and the reason for each step",
  metaTitle: "What is a facial? The steps of a facial and why they matter",
  metaDescription:
    "What is a facial and what does a basic one include: why double cleanse, how over-exfoliating harms the skin, when to skip steam and when extractions are safe.",
  keyword: "what is a facial",
  keywords: [
    "what does a facial include",
    "facial steps in order",
    "double cleansing",
    "over-exfoliated skin",
    "facial steam for sensitive skin",
    "are facial extractions safe",
    "basic facial treatment",
  ],
  excerpt: "A facial goes from clean, to clear, then nourish and protect. Knowing why each step is there tells you when to do it, when to skip it and how gentle to be.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("chuyen-vien-spa-tu-van-cham-soc-da-mat-cho-khach"),
    alt: "A skin therapist in a cream tunic points to a tray of three skin care products while a client in a white robe sits on the bed and listens closely",
  },
  takeaways: [
    "A basic facial follows a fixed order: **cleanse**, exfoliate, warm, extractions if needed, mask and massage, toner, moisturiser, and sunscreen in the daytime.",
    "If the client wears make-up, cleanse twice: make-up remover first, then a cleanser for her skin type.",
    "Choose the exfoliant by skin type and keep to the brand's time. **Over-exfoliating** damages the skin barrier, which can take weeks to recover.",
    "Very sensitive or red skin, or visible small blood vessels: skip the steam, or use only a cool, damp towel.",
    "Extractions only if you are trained and local rules allow it; extractors must be **sterilised** after every client.",
  ],
  intro: [
    "What is a facial? Most people would answer straight away: cleanse, mask, moisturise. A fuller answer is that a facial is a salon skin treatment that follows a fixed order, from cleansing, to clearing the skin, to nourishing and protecting it. Every step has a reason, and the order has a reason too.",
    "This article follows the VaraaAi Academy lesson “A basic facial: understand it for clean, healthy skin” in the Spa & skin care course, the theory half of the topic. It does not teach hand movements. It explains why each step sits where it does, so you know when to do it, when to skip it and how gentle to be. The hands-on routine is in the article [How to do a facial step by step](lesson:spa-facial).",
  ],
  sections: [
    {
      id: "facial-steps-in-order",
      title: "The steps of a basic facial, in order",
      blocks: [
        { p: "A basic facial does not need many products. It needs the right order: clean first, then clear, and only then nourish and protect. Change the order and the next step loses its point. Moisturiser applied to skin that is not clean just sits on a layer of residue." },
        {
          table: {
            head: ["Step", "What it is for", "Remember"],
            rows: [
              ["Cleanse", "Remove make-up and sunscreen, then clean the skin itself", "Twice if the client wears make-up"],
              ["Exfoliate", "Remove dead cells for brighter, smoother skin", "Choose by skin type, keep to the brand's time"],
              ["Warm the skin", "Comfort, softer skin, easier cleansing", "Warm towel or steam; skip it on red skin"],
              ["Extractions, if needed", "Clear a few small blackheads", "Only if trained and local rules allow it"],
              ["Mask and massage", "Care for the skin type, help the client relax", "Some salons massage before the mask, some after"],
              ["Toner, moisturiser", "Hold in water, protect the skin barrier", "A cream that suits the skin type"],
              ["Sunscreen", "Protect the skin when the client goes out", "The last step in the morning or daytime"],
            ],
          },
        },
        { p: "Before any of this comes the skin analysis. The skin type and the skin's condition that day decide which products you use and which steps you leave out. How to do it is in [How to do a skin analysis](lesson:spa-soi-da)." },
      ],
    },
    {
      id: "double-cleansing",
      title: "Double cleansing: why you still cleanse after removing make-up",
      blocks: [
        { p: "Cleansing is the foundation of every step that follows. With a client who wears make-up, the therapist cleanses twice, and each cleanse has its own job." },
        {
          ul: [
            "**First cleanse, make-up removal.** It takes off the make-up and sunscreen sitting on the surface.",
            "**Second cleanse, a cleanser for the skin type.** Only now is the skin itself being cleaned.",
          ],
        },
        { p: "Skip the second cleanse and everything you apply afterwards, from exfoliant to moisturiser, sits on a layer of residue." },
        { h3: "Eyes and lips" },
        { p: "The skin around the eyes and lips is very thin, so you never rub there. Place a soaked cotton pad on the closed eye, hold it for a few seconds to soften the mascara, then wipe gently. No product may run into the eyes." },
        { img: { src: img("tay-trang-mat-bang-bong-truoc-khi-facial"), alt: "A therapist's hand rests a round cotton pad on the closed eye of a client in a white headband lying on a spa bed", caption: "Hold the pad on the eye for a few seconds to soften the mascara, then wipe without rubbing." } },
      ],
    },
    {
      id: "exfoliation",
      title: "Exfoliation by skin type, and what over-exfoliated skin looks like",
      blocks: [
        { p: "Exfoliation removes the layer of dead cells on the surface, so the skin looks brighter and smoother. Three kinds are common in salons, and which one you use depends on the skin in front of you." },
        {
          table: {
            head: ["Type of exfoliant", "Which skin, and how"],
            rows: [
              ["Enzyme", "Gentle; usually suits sensitive or thin skin"],
              ["Mild acid", "Thicker, oilier skin can usually tolerate it"],
              ["Grains (scrub)", "The grains must be very fine and rubbed very gently"],
            ],
          },
        },
        { p: "Whatever the type, leave it on for the time the brand states. Leaving it longer “just to be sure” does not make the skin any cleaner." },
        { img: { src: img("thoa-tay-da-chet-bang-co-va-dong-ho-cat"), alt: "A therapist brushes a thin layer of clear product onto a client's cheek, her eyes covered with two cotton pads, an hourglass standing on the trolley", caption: "A thin layer applied with a brush, eyes covered, and the brand's time kept exactly." } },
        { h3: "Over-exfoliating: smooth skin today, red and sore in a few days" },
        { p: "This happens a lot. The skin looks rough, so the therapist exfoliates very thoroughly, several times, on top of the acids or retinoids the client already uses at home. That day the skin looks smooth and glowing. A few days later it is red and sore, stings when cream goes on, and sometimes peels in patches. That is a damaged skin barrier, and the skin needs time, sometimes a few weeks, to recover." },
        { note: "Always ask what the client uses at home before choosing an exfoliant. If she is on acids or retinoids, the salon exfoliation comes on top of them, so exfoliate just enough and keep it gentle.", kind: "warn", title: "Ask before you exfoliate" },
      ],
    },
    {
      id: "warm-towels-and-steam",
      title: "Warm towels and facial steam: what they are for and when to skip them",
      blocks: [
        { p: "After exfoliation the skin is warmed, with a warm towel or with steam. The aim is simple: the client is comfortable, the skin is softer and easier to cleanse. Since that is all it is for, this step does not need to be hot or long." },
        {
          ul: [
            "**Warm towel:** warm, not hot. Test it on your own wrist before it goes on the client's face.",
            "**Steamer:** placed far enough from the face, and not for long.",
          ],
        },
        { img: { src: img("xong-hoi-da-mat-may-dat-cach-xa"), alt: "A white facial steamer stands about an arm's length from a client's face, a thin mist drifting towards her as she lies with cotton pads over her eyes, the therapist beside her", caption: "The steamer is far enough away that the mist only just reaches the face, and the eyes are covered." } },
        { p: "Heat makes sensitive, red skin redder. For very sensitive skin, red skin or skin with visible small blood vessels, skip the steam, or use only a cool, damp towel." },
        { img: { src: img("da-nhay-cam-do-ma-khong-nen-xong-hoi"), alt: "Close-up of a woman in a white headband with her eyes closed, her cheeks and the sides of her nose flushed red with a few tiny visible blood vessels", caption: "Red skin with visible small vessels: no steam, only a cool, damp towel." } },
      ],
    },
    {
      id: "extractions",
      title: "Are facial extractions safe? The step most likely to cause harm",
      blocks: [
        { p: "Of all the steps in a facial, extractions are the one most likely to leave damage. That is why they come with conditions before technique: do them only if you have been trained, and only if the rules where you work and your salon allow it. Even then, the method stays cautious:" },
        {
          ul: [
            "Always wear gloves.",
            "Wrap soft tissue around your fingertips, then press very gently on both sides of the blackhead.",
            "No fingernails, no hard squeezing, no forcing it out at any cost. If it doesn't come, leave it.",
            "A few small ones, in a short time, is enough.",
          ],
        },
        { h3: "Comedone extractors must be sterilised" },
        { p: "Metal comedone extractors, and anything else that can break the skin, must be cleaned and sterilised after every client and then stored in a sealed pouch. Wiping with alcohol is not enough. The [City of Helsinki hygiene guidance](https://www.hel.fi/static/liitteet-2019/Kymp/asuminen-ja-ymparisto/ymparistoterveys/Hygiene-premises-instructions.pdf) states plainly that blackhead extractors must be sterilised. Lancets are single-use, and only where the rules where you work allow them. The sterilising steps are in the lesson [Tools after every client](lesson:ve-sinh-dung-cu)." },
        { img: { src: img("dung-cu-lay-nhan-mun-trong-tui-tiet-trung"), alt: "A marble trolley top with a steel comedone extractor inside a sealed sterilisation pouch, three individually packed lancets, cotton pads, tissues and black gloves", caption: "The extractor stays in its sealed sterilisation pouch; lancets are packed separately and used once." } },
        { note: "How far you may go with extractions, and whether lancets may be used at all, is set by the rules where you work, and they differ from country to country. This article is a training aid, not a licence.", kind: "warn", title: "Rules differ by country" },
      ],
    },
    {
      id: "mask-moisturiser-sunscreen",
      title: "Mask, toner, moisturiser and sunscreen",
      blocks: [
        { p: "Once the skin is clean and clear, it is time to nourish it. The mask is chosen by skin type too:" },
        {
          table: {
            head: ["Type of mask", "Suits"],
            rows: [
              ["Clay", "Oily and congested skin"],
              ["Cream or gel", "Dry, dehydrated and sensitive skin"],
            ],
          },
        },
        { p: "Apply the mask evenly with a brush, avoiding the eyes, nostrils and lips, and leave it on for the brand's time. With clay, do not let it dry and crack for too long on dry skin." },
        { img: { src: img("dap-mat-na-dat-set-bang-co"), alt: "A therapist brushes a pale green clay mask onto a client's face, leaving the cotton-covered eyes, the nostrils and the lips bare" } },
        { p: "Facial massage helps the client relax; some salons do it before the mask, some after. It has its own article: [facial massage, explained before you start](lesson:spa-massage-mat-hieu-dung)." },
        { p: "The treatment ends with toner, wiped or patted on gently, then a moisturiser that suits the skin type to hold in water and protect the skin barrier. In the morning or daytime, sunscreen is the very last step. It is also the most useful advice to give the client: sunscreen every morning is a very important habit at home, especially after exfoliation." },
      ],
    },
    {
      id: "hygiene-and-reactions",
      title: "Hygiene, patch testing and what to do if the skin reacts",
      blocks: [
        { p: "Hygiene in skin care is easy to underestimate: there are no files, no nippers and no dust to see. Four things are fixed for every client:" },
        {
          ul: [
            "Wash your hands before every client.",
            "Take cream out of the jar with a clean spatula, never with your fingers.",
            "Brushes, bowls and tools: single-use, or cleaned and disinfected after every client.",
            "Towels, headband and bed linen: fresh for each client.",
          ],
        },
        { img: { src: img("lay-kem-duong-bang-que-sach"), alt: "A therapist scoops cream from a white jar with a small wooden spatula on a marble trolley, a client lying on the spa bed behind her" } },
        { note: "A jar shared by many clients is contaminated for everyone after it by a single finger. Always keep clean spatulas ready on the trolley.", kind: "tip", title: "From the trade" },
        { h3: "Test new products on a small area of skin" },
        { p: "When you use a new product on a client, especially one with sensitive skin or a history of allergies, test it first on a small area of skin as the brand instructs. A test is no absolute guarantee, but it prevents many reactions. The lesson [Allergies and chemicals](lesson:di-ung-hoa-chat) goes into this in more depth." },
        { img: { src: img("thu-san-pham-tren-vung-da-nho-o-canh-tay"), alt: "A therapist dabs a little cream with a cotton bud onto the inner forearm of a client in a white robe to test the product" } },
        { h3: "The skin turns red, burns or itches during the facial" },
        { p: "The signs to stop are redness, burning, strong itching or stinging that does not go away. Then work in this order:" },
        {
          ol: [
            "Stop using that product at once.",
            "Rinse gently with cool water, then apply a cool compress.",
            "Do not put another product on to fix it.",
            "Write down the product name, the batch number and what happened.",
          ],
        },
        { img: { src: img("dap-bong-mat-khi-da-mat-bi-do-rat"), alt: "A therapist holds a cool, damp cotton pad against the flushed cheekbone of a client lying on a spa bed, her other hand gently supporting the side of the face" } },
        { note: "A swollen face or lips, or difficulty breathing, is a severe reaction: call 112, or the emergency number where you are, straight away. How to handle each situation is in the lesson [Incidents in the salon](lesson:xu-ly-su-co).", kind: "warn", title: "When to call an ambulance" },
        { p: "Notes are what make the next visit safer. In VaraaAi you write in the internal notes in your [client list](lesson:khach-hang) which products you used, any reaction and the batch number, so they can be avoided next time." },
      ],
    },
  ],
  faq: [
    {
      q: "What is a facial and what does it include?",
      a: "A facial is a skin treatment for the face in a salon or spa. The basic order is cleanse, exfoliate, warm the skin with a towel or steam, extractions if needed, mask and massage, toner, moisturiser, and sunscreen in the daytime. It goes from clean, to clear, then nourishes and protects the skin.",
    },
    {
      q: "Why do you cleanse twice in a facial?",
      a: "The first cleanse removes make-up and sunscreen. The second uses a cleanser that suits the skin type to clean the skin itself. Without the second cleanse, the products applied afterwards just sit on a layer of residue.",
    },
    {
      q: "What happens if you over-exfoliate your skin?",
      a: "Exfoliating too hard, too many times, or on top of acids or retinoids used at home can damage the skin barrier. A few days later the skin is red and sore, stings when cream goes on and sometimes peels in patches. It needs time, sometimes a few weeks, to recover.",
    },
    {
      q: "Is facial steam good for sensitive skin?",
      a: "No. Heat makes sensitive, red skin redder. For very sensitive skin, red skin or skin with visible small blood vessels, the steam is skipped, or replaced with a cool, damp towel.",
    },
    {
      q: "Are extractions during a facial safe?",
      a: "Extractions are the step most likely to cause harm if done wrong. The therapist must be trained and allowed to do them by local rules, wear gloves, wrap tissue around the fingertips, press very gently and leave any blackhead that will not come out. Extractors must be cleaned and sterilised after every client, and the rules differ from country to country.",
    },
    {
      q: "What should you do if the skin turns red and burns during a facial?",
      a: "Stop the product at once, rinse gently with cool water and apply a cool compress. Do not apply another product to fix it, and note the product name and batch number. If the face or lips swell, or breathing becomes difficult, call 112 or the emergency number where you are.",
    },
  ],
  related: ["spa-facial", "spa-soi-da-hieu-dung", "spa-massage-mat-hieu-dung", "di-ung-hoa-chat"],
};

export default article;
