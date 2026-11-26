import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/ho-so-salon/${name}.webp`;
const shot = (name: string) => `/wiki/ho-so-salon/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "salon-profile-description-logo-cover-photo",
  lesson: "ho-so-salon",
  category: "salon",
  title: "Salon profile: how to complete your description, logo and cover photo so clients book with confidence",
  metaTitle: "Salon profile: description, logo and cover photo to 85%",
  metaDescription:
    "How to complete your salon profile on VaraaAi: read the completeness card, write an 80+ character description, upload a cover photo and logo, add social links.",
  keyword: "salon profile",
  keywords: [
    "how to write a salon description",
    "salon cover photo and logo",
    "salon profile completeness",
    "nail salon description example",
    "unlock loyalty cards on VaraaAi",
    "salon contact details on a booking page",
  ],
  excerpt: "The “Profile completeness” card lists every missing item. Write the description, upload a cover photo and logo, add your contacts and the profile passes 85%.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("chu-salon-cam-may-tinh-bang-trong-tiem"),
    alt: "A woman with curly hair in a plum silk blouse holds a tablet and smiles beside a marble counter in an elegant salon",
  },
  takeaways: [
    "The **“Profile completeness”** card at the top of “Settings” shows your percentage and which items are still missing.",
    "A profile at **85%** unlocks “Loyalty cards” and “Marketing”.",
    "Make the “Short description” at least **80 characters**, because the salon description counts towards completeness.",
    "The cover photo is the first thing clients see on your booking page, so use a real, well-lit photo of the salon.",
    "The “Add” button next to each missing item takes you straight to the right field, so you never have to hunt for it.",
  ],
  intro: [
    "A complete salon profile does the work of your shop sign and your receptionist online. A client who has never visited looks at the cover photo, reads a few lines of description, checks the address and decides whether to book. An empty profile with no photo and no description gives them little reason to trust you with a place in the diary.",
    "This guide follows the VaraaAi Academy lesson “Salon profile, logo and cover photo”. You will learn to read the “Profile completeness” card, fill in each part of “Settings” and take the profile past 85% to unlock the tools that bring clients back.",
  ],
  sections: [
    {
      id: "what-a-complete-profile-does",
      title: "What a complete salon profile does for your business",
      blocks: [
        { p: "VaraaAi gives the reason on the card itself: “A complete profile stands out on the search map and makes customers more confident to book.” The two go together. A client looking for a nail or hair salon near home sees several results at once, and the salon with a clear cover photo and a specific description is the one that gets the first tap." },
        { p: "There is a practical reason too. When the profile reaches 85%, “Loyalty cards” and “Marketing” are unlocked in the dashboard. These are the tools that bring past clients back, such as a [loyalty card for regulars](lesson:the-tich-diem). Below that mark you cannot use them yet." },
        { img: { src: shot("profile-completeness-card-92-percent"), alt: "The Profile completeness card at 92 percent with the line Loyalty cards & Marketing unlocked and the list of items below", caption: "The card sits at the top of “Settings”. The percentage climbs as you fill in each item." } },
      ],
    },
    {
      id: "what-completeness-counts",
      title: "What the profile completeness percentage counts",
      blocks: [
        { p: "The card has two groups. At the top, under a line such as “1 items left to complete”, are the missing items, each with an “Add” button on the right. Below them are the items already done, each with a green tick. In the lesson video the card lists these items:" },
        {
          table: {
            head: ["Item on the card", "Where you fill it in"],
            rows: [
              ["Salon logo, Cover photo", "“Settings”, with the “Upload logo” and “Upload cover photo” buttons"],
              ["Description (80+ characters)", "The “Short description” field under “Salon info”"],
              ["Address and map location, Service categories", "The “Salon info” part"],
              ["Contact phone, Website or social media", "The “Contact & social links” part"],
              ["Opening hours", "The “Opening hours” section of the dashboard"],
              ["At least 1 service, At least 1 staff member", "The services and staff sections of the dashboard"],
              ["Cancellation policy, Bank account, Invoicing details", "“Settings”, under “Booking & policies” and “Payments & invoices”"],
            ],
          },
        },
        { p: "As the table shows, the profile is wider than photos and text. The card also counts work you do elsewhere, such as [adding services](lesson:dich-vu), [setting opening hours](lesson:gio-mo-cua) or [writing a cancellation policy](lesson:thanh-toan-chinh-sach). If you work through the lessons of the first course in order, the percentage rises on its own." },
      ],
    },
    {
      id: "writing-the-description",
      title: "How to write a short salon description clients want to book from",
      blocks: [
        { p: "The “Short description” appears under the salon name on your public page, so it is the first text a client reads about you. The lesson asks for at least 80 characters. That is the minimum for the item to count, not the ideal length." },
        { p: "A good description answers the questions a client is already asking: what the salon specialises in, where it is, and why they should choose it over the one next door. Write it with real details of your own salon." },
        {
          ul: [
            "**Worth writing:** your strongest services, the area, the languages your team speaks, and whether you take appointments only or walk-ins as well.",
            "**Worth avoiding:** lines any salon could write, such as “top quality at fair prices”. The client learns nothing new about you.",
          ],
        },
        { note: "For example: “A small nail studio near the central station, specialising in gel polish and sculpted extensions on forms. Appointments only, and we speak English and Spanish.” Two sentences like these pass 80 characters and give a client a reason to look at your service list.", kind: "tip", title: "A sample to adapt to your salon" },
      ],
    },
    {
      id: "cover-photo-and-logo",
      title: "Choosing a cover photo and logo for your salon",
      blocks: [
        { p: "In “Settings”, a short line under each item says where the picture is used. The cover photo is “Shown at the top of your business page and in search results.” The logo is “A square image used as your business's avatar.”" },
        { p: "Because the cover photo also appears in search results, it competes directly with the photos of other salons. A well-lit, tidy photo of your real salon persuades more than a stock image, because clients see the same room when they arrive. For the logo, choose a simple mark that is still recognisable when shrunk to a small square." },
        { note: "If you have no photo you like yet, take one just after the salon has been cleaned, in daylight, and upload that first. You can replace it at any time with the same “Upload cover photo” button.", kind: "tip", title: "No good photo yet" },
      ],
    },
    {
      id: "contact-and-social-links",
      title: "Salon contact details and social media links",
      blocks: [
        { p: "The “Contact & social links” part is “Shown on your public page so customers can reach you directly.” The lesson covers these fields: phone number, email, website, Facebook, Instagram and TikTok." },
        { img: { src: shot("facebook-instagram-tiktok-links"), alt: "The Facebook, Instagram and TikTok fields in the Contact & social links part of Settings outlined in gold", caption: "Paste the full address of your salon's own page into each field. The more you fill in, the easier you are to find." } },
        { p: "Only fill in the channels the salon really uses. An Instagram account with fresh photos of nails or hair shows clients what your team can do. A link to a page left empty for months gives the opposite impression. The phone number should be one someone answers during opening hours." },
      ],
    },
    {
      id: "after-85-percent",
      title: "Once the profile passes 85%",
      blocks: [
        { p: "Go back to the top of “Settings” to see the new number on the card. If any item still has an “Add” button, press it and finish that too. Past 85%, the card shows “Loyalty cards & Marketing unlocked”." },
        { p: "By now the salon page has the photos and words it needs to be shown around. A sensible next step is to [share your booking link](lesson:chia-se-link) on the channels you have just added, or to [make a QR code poster](lesson:poster-qr) for the salon." },
      ],
    },
  ],
  howTo: {
    title: "Steps to complete your salon profile on VaraaAi",
    id: "complete-profile-steps",
    after: "what-completeness-counts",
    lead: "Everything below happens in “Settings” in the dashboard. You can do it on your phone or on a computer.",
    steps: [
      {
        name: "Open “Settings” and read the completeness card",
        text: "Go to “Settings”. The “Profile completeness” card at the top shows the percentage your profile has reached and which items are missing. Read the list first so you know whether you need photos or text ready.",
      },
      {
        name: "Press “Add” next to a missing item",
        text: "Each missing item has an “Add” button on the right. Press it and the page takes you to the exact place to fill it in. That is quicker than scrolling through every part of “Settings” yourself.",
        image: { src: shot("items-left-to-complete-add-button"), alt: "The completeness card with the missing item Bank account and its Add button outlined in gold above the ticked items" },
      },
      {
        name: "Fill in “Salon info”",
        text: "Under “Salon info”, enter the “Salon name” and a “Short description” of 80 characters or more. Then fill in “Address”, “City” and “Country”. Check that the pin on the map sits on your salon, because clients use it to find their way.",
        image: { src: shot("short-description-and-address-on-map"), alt: "The Short description field with a demo text, the Address field and a map with a blue pin on the salon's location" },
      },
      {
        name: "Tick your service categories and press “Save”",
        text: "Tick the salon's categories under “Service categories”, for example “Nails”, “Hair salon” or “Brows & lashes”. Clients search by service, so the right categories put you in front of the people looking for what you do. Then press “Save”.",
        image: { src: shot("service-categories-and-save"), alt: "The Service categories boxes with Nails ticked, including Spa & massage, Barber and Brows & lashes, and the Save button outlined in gold" },
      },
      {
        name: "Upload a cover photo",
        text: "Scroll down to “Cover photo”, press “Upload cover photo” and pick a picture from your device. It appears at the top of the salon page and in search results, so it is the first thing clients see.",
        image: { src: shot("upload-cover-photo"), alt: "The Cover photo part with a photo of a salon interior and the Upload cover photo button outlined in gold, the Logo part below" },
      },
      {
        name: "Upload your logo",
        text: "Right below is “Logo”. Press “Upload logo” and choose a square image. Until you add one, the box only shows the first letter of the salon's name.",
        image: { src: shot("upload-salon-logo"), alt: "The Logo part with a square purple L logo and the Upload logo button outlined in gold, Contact & social links below" },
      },
      {
        name: "Fill in “Contact & social links”",
        text: "Under “Contact & social links”, enter the salon's “Phone number” and “Email”, then the website, Facebook, Instagram and TikTok if you have them. These details appear on your public page so clients can contact you directly.",
        image: { src: shot("contact-phone-number-and-email"), alt: "The Contact & social links part with the Phone number and Email fields outlined in gold and the Website and WhatsApp fields below" },
      },
    ],
  },
  faq: [
    {
      q: "What percentage does a salon profile need to unlock Loyalty cards and Marketing?",
      a: "85%. The “Profile completeness” card in “Settings” states this mark and shows where your profile stands.",
    },
    {
      q: "How long should a salon's short description be?",
      a: "At least 80 characters. The item “Description (80+ characters)” counts towards profile completeness, so a shorter text is not counted yet. Two specific sentences about your services and your area are enough.",
    },
    {
      q: "Where do the cover photo and logo appear?",
      a: "The cover photo is shown at the top of your business page and in search results. The logo is a square image used as the salon's avatar.",
    },
    {
      q: "How do I see what is missing from my salon profile?",
      a: "Open “Settings” and look at the “Profile completeness” card. It lists each missing item with an “Add” button that takes you to the right place to fill it in.",
    },
    {
      q: "Do I have to add Facebook, Instagram and TikTok?",
      a: "Only add the channels your salon actually uses. The completeness card has one item, “Website or social media”, and the more you fill in, the easier clients find you.",
    },
    {
      q: "Does completing the salon profile cost anything?",
      a: "No. VaraaAi is free for salon owners, and every part of the profile, from the description and cover photo to the logo and contact details, is filled in under “Settings” in your salon account.",
    },
  ],
  related: ["dang-ky-salon", "dich-vu", "gio-mo-cua", "thanh-toan-chinh-sach"],
};

export default article;
