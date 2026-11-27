import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/website-salon/${name}.webp`;
const shot = (name: string) => `/wiki/website-salon/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "free-salon-website",
  lesson: "website-salon",
  category: "marketing",
  title: "Free salon website: 8 steps to your own nail, hair or beauty salon website with a booking button",
  metaTitle: "Free salon website: build yours in 8 steps with booking",
  metaDescription:
    "How nail, hair, lash and beauty salon owners build their own website on VaraaAi: pick colours, write the hero section, switch sections on, preview and publish.",
  keyword: "free salon website",
  keywords: [
    "salon website builder",
    "nail salon website",
    "beauty salon website without a designer",
    "hair salon website with online booking",
    "salon landing page",
    "how to publish a salon website",
    "what to write on a salon home page",
  ],
  excerpt: "Pick a colour set, write a few lines in the hero section, switch on the sections you want and turn on “Publish”. Services, team and reviews come from data you already have.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-toc-tao-kieu-cho-khach-trong-salon-co-dien"),
    alt: "A stylist in a white jacket styles the hair of a blonde client sitting by a tall window in a salon with gilded mirrors and a chandelier",
  },
  takeaways: [
    "Your salon website lives under **“Landing page”** in the dashboard. You can build it yourself, without hiring a designer.",
    "Pick a style under **“Website colours”** and the whole website changes colour at once.",
    "Sections marked **“Automatic”** (services, team, reviews) use the data your salon already has, so you type nothing twice.",
    "While the site is a **draft**, clients cannot see it. Only after you switch on **“Publish”** can anyone open it.",
    "Press “Copy link” to send the website address to clients, or add it to Facebook, Instagram and Google Maps.",
  ],
  intro: [
    "Many salon owners want a free salon website but stop at the first question: who will build it, and who will update it every time prices change. For a salon already on VaraaAi, the answer is in the dashboard. The services, staff and reviews you already have are put together into a website with a booking button, and all that is left for you is to choose the colours and write a short introduction.",
    "This guide follows the VaraaAi Academy lesson “Your salon's own website”. You will choose a colour set, write the hero section, decide which sections appear on the home page, then publish the site and send the link to clients.",
  ],
  sections: [
    {
      id: "why-a-website",
      title: "Why a nail, hair or beauty salon needs its own website",
      blocks: [
        { p: "New clients usually look a salon up online before they walk in. They want to know what it looks like, what it offers, what it costs and what other people say. A social media page answers part of that, but the information is scattered across old posts. A website puts it all at one address." },
        { p: "The website in this lesson shows the salon's name, an introduction, the menu with prices, the team, reviews and a “Book now” button that stays in view. Clients can read it and book on the spot, without switching to a phone call or a message." },
        { img: { src: shot("salon-website-on-a-phone"), alt: "The Lumi Beauty Paris salon website on a phone with the large headline Refined beauty in the heart of Paris outlined in gold above a short introduction", caption: "The website clients see: the salon name at the top, the headline, the introduction and the booking button." } },
        { p: "You do not need to hire anyone. Everything happens on one page of the dashboard, and VaraaAi is free for salon owners." },
      ],
    },
    {
      id: "before-you-start",
      title: "What to have ready before you build a salon website",
      blocks: [
        { p: "Most of the website's content comes from what your salon already has. Before you open “Landing page”, check three things that already exist and prepare three things you will write:" },
        {
          table: {
            head: ["What you need", "Where it comes from"],
            rows: [
              ["Services with prices", "Entered under “Services”. The website picks them up"],
              ["Team: photo, name and title", "From your salon's staff list"],
              ["Client reviews", "Approved reviews, with your average rating"],
              ["A title and a few lines of introduction", "You write them in the hero section"],
              ["Slider images, up to 5", "Photos of the salon or your best work, uploaded by you"],
              ["Text on the button", "You set it under “Button label”, for example Book now"],
            ],
          },
        },
        { p: "If the service menu is still empty or your staff have no photos, do those first. See the guides to the [salon service menu](lesson:dich-vu) and [salon staff management](lesson:nhan-vien). The order of your services matters too, because “Signature services” shows your first 6 services in the order you dragged them into." },
      ],
    },
    {
      id: "website-colours",
      title: "Choose website colours that match your salon",
      blocks: [
        { p: "“Website colours” has five styles. Tap one and the whole website changes colour at once, so try each and see which looks most like your salon. Each colour set has a short description on screen:" },
        {
          table: {
            head: ["Colour set", "Description on screen"],
            rows: [
              ["Rose", "Soft and feminine"],
              ["Champagne", "Elegant and warm"],
              ["Black & Gold", "Luxurious and bold"],
              ["Emerald", "Natural and refined"],
              ["Lavender", "Modern and subtle"],
            ],
          },
        },
        { img: { src: shot("five-website-colour-sets"), alt: "The website colour sets with Rose and Champagne at the top and Black and Gold, Emerald and Lavender outlined in gold below" } },
        { note: "Choose the colour set closest to your salon's real colours: the walls, the chairs, the logo. A client who looks at the website and then walks in will recognise the place they just saw on their phone.", kind: "tip", title: "Choose for the salon, not for your taste" },
      ],
    },
    {
      id: "hero-section",
      title: "What to write in the hero section of a salon home page",
      blocks: [
        { p: "The hero section is the client's first impression. It has a layout, three text fields, slider images and a button. The three text fields do three different jobs:" },
        {
          table: {
            head: ["Field", "What to write", "Example in the lesson video"],
            rows: [
              ["“Small line above the title”", "The type of salon and where it is", "Nail & Lash Studio · Paris"],
              ["“Title”", "A short line about what the salon offers", "Refined beauty in the heart of Paris"],
              ["“Text”", "Two sentences: what you do, what the space is like, how to book", "Nails, lashes and skincare in a calm, luxurious setting. Book online in under a minute."],
            ],
          },
        },
        { p: "The “Layout” has four options: “Full-screen photo”, “Image on the right”, “Image on the left” and “Text only”. If you have good photos of the salon, let the photo take the space. If you do not have a photo you like yet, start with “Text only” and change it later." },
        { p: "“Slider images (up to 5)” takes up to five photos, which rotate automatically on the home page. According to the hint on screen, if none are uploaded, a default slide is shown instead. Real photos of your salon are more convincing, so replace it when you can." },
        { p: "At the end of the section are “Button label”, the text on the button, and “Button links to”, where it leads. In the video, the button says “Book now” and leads to the booking page. Remember to press “Save” before you scroll down to the other sections." },
      ],
    },
    {
      id: "home-page-sections",
      title: "Home page sections: which fill themselves and which you write",
      blocks: [
        { p: "Below the hero is the list of the home page's other sections. Each has a switch on the right to show or hide it. Sections marked “Automatic” take your salon's existing data." },
        {
          table: {
            head: ["Section", "What it shows", "Data"],
            rows: [
              ["About", "Your story and what makes the salon different", "You write it"],
              ["Signature services", "Your first 6 services, in the order you dragged them into", "Automatic"],
              ["Highlights", "Offers, packages or reasons to choose your salon", "You write it"],
              ["Gallery", "Up to 8 photos of your space and your best work", "You upload photos"],
              ["Team", "Photo, name and title from your staff list", "Automatic"],
              ["Customer reviews", "Approved reviews with your average rating", "Automatic"],
            ],
          },
        },
        { img: { src: shot("team-and-reviews-marked-automatic"), alt: "The sections Highlights, Gallery, Team and Customer reviews, each with a switch on the right, Team and Customer reviews carrying the Automatic label", caption: "“Team” and “Customer reviews” are marked “Automatic” and show how many items they hold." } },
        { p: "The switches help you avoid a common mistake on home-made websites: empty sections. A new salon without reviews can switch “Customer reviews” off and back on once reviews arrive. If you work alone, you can switch “Team” off if you feel it is not needed." },
        { img: { src: shot("customer-reviews-on-salon-website"), alt: "The reviews section of a salon website with a 5.0 star average from 2 reviews and a client's comment praising careful work and friendly staff" } },
      ],
    },
    {
      id: "draft-and-publish",
      title: "Draft, publish and send your website link to clients",
      blocks: [
        { p: "A new website starts as a draft. The status says that clients cannot see it yet, and only you can look at it with the “Preview” button. That way you can edit for as long as you like without anyone seeing a half-finished page." },
        { p: "When you are happy, switch on “Publish”. The status changes to “Live” and the preview button becomes “View website”. From then on, anyone with the link can open the site." },
        { img: { src: shot("publish-switch-website-live"), alt: "The Salon website card with the Live status, the View website button and the Publish switch turned on and outlined in gold" } },
        { p: "Press “Copy link” to get the website address. Send it to clients, or add it to your salon's Facebook, Instagram and Google Maps, so that wherever people find you, they reach the same page. Other ways to put a link in front of clients are covered in the guides to the [salon booking link](lesson:chia-se-link) and the [QR code poster for salon bookings](lesson:poster-qr)." },
        {
          table: {
            head: ["Situation", "What to do"],
            rows: [
              ["You sent the link but the client cannot open it", "Check that “Publish” is switched on. While the site is a draft, clients cannot see it"],
              ["Services appear in the wrong order on the website", "Drag them into a new order under “Services”. The website shows the first 6"],
              ["A section on the home page is empty", "Switch that section off and back on when you have content"],
              ["You want to change the colour of the whole website", "Pick another set under “Website colours”"],
            ],
          },
        },
      ],
    },
  ],
  howTo: {
    title: "How to build your free salon website on VaraaAi",
    id: "salon-website-steps",
    after: "before-you-start",
    lead: "These eight steps go from the top of “Landing page” to the bottom, in the order of the lesson video.",
    steps: [
      {
        name: "Open “Landing page”",
        text: "In the dashboard, tap “Landing page”. The card at the top is “Salon website”, and until you publish, its status shows that clients cannot see it yet. Every change from here until publishing is visible only to you.",
      },
      {
        name: "Choose “Website colours”",
        text: "Under “Website colours”, tap a style: Rose, Champagne, Black & Gold, Emerald or Lavender. The whole website changes colour at once. In the lesson video, “Champagne” is selected.",
        image: { src: shot("choose-website-colours-champagne"), alt: "The Website colours section with the colour sets Rose, Champagne selected with a tick, Black and Gold and Emerald" },
      },
      {
        name: "Choose a layout for the hero section",
        text: "Scroll down to the hero section and choose a layout: full-screen photo, image on the right, image on the left or text only. This is the first thing clients see when they open your website, so pick the layout that suits the photos you have.",
        image: { src: shot("hero-layout-and-title-for-salon-website"), alt: "The four layout options Full-screen photo, Image on the right, Image on the left and Text only outlined in gold, with the small line and title fields below" },
      },
      {
        name: "Fill in the small line, “Title” and “Text”",
        text: "Type the small line above the title, then the “Title” and the introduction under “Text”. Keep it short and say clearly what the salon does and where. Clients read this in a few seconds and decide whether to scroll on.",
      },
      {
        name: "Add slider images, set the “Button label” and press “Save”",
        text: "Upload up to five slider images. Set the text on the button under “Button label”, for example Book now, then press “Save” to keep the hero section before scrolling on.",
        image: { src: shot("slider-images-and-button-label"), alt: "The Slider images (up to 5) upload boxes outlined in gold with one salon photo added, and the Button label field reading Book now below" },
      },
      {
        name: "Switch the home page sections on or off",
        text: "Under the home page sections, use the switch on the right of each one: About, Signature services, Highlights, Gallery, Team, Customer reviews. Sections marked “Automatic” take your salon's data, so you type nothing again.",
        image: { src: shot("switch-home-page-sections-on-or-off"), alt: "The home page sections list with Signature services marked Automatic outlined in gold, each section with a switch on the right" },
      },
      {
        name: "Check the website with “Preview”",
        text: "Go back up to the “Salon website” card and open the site with “Preview”, or with “View website” once it is live. Read the title again, look at the photos and scroll to the end to make sure no section is empty.",
        image: { src: shot("view-website-button-and-publish-switch"), alt: "The Salon website card with the View website button outlined in gold next to the Publish switch" },
      },
      {
        name: "Switch on “Publish” and press “Copy link”",
        text: "When you are happy, switch on “Publish”. The salon website is live and anyone can open it. Press “Copy link” to send the address to clients, or add it to Facebook, Instagram and Google Maps.",
        image: { src: shot("copy-link-salon-website-address"), alt: "The Salon website card with the status Live and the Copy link button next to the website address outlined in gold" },
      },
    ],
  },
  faq: [
    {
      q: "Do I need to hire a designer to build a salon website on VaraaAi?",
      a: "No. You build it yourself under “Landing page” in the dashboard: choose the colours, write the hero section, switch on the sections you want and publish. Services, team and reviews come from your salon's existing data.",
    },
    {
      q: "When can clients see my salon website?",
      a: "Only after you switch on “Publish”. Before that the website is a draft that clients cannot see, and only you can look at it with the “Preview” button.",
    },
    {
      q: "What does the “Automatic” label on a home page section mean?",
      a: "A section marked “Automatic” uses data your salon already has. Services, team and reviews come from the dashboard, so you do not type them again.",
    },
    {
      q: "Where do I change the colours of the whole salon website?",
      a: "Under “Website colours” in “Landing page”. Tap a style, for example “Champagne”, and the whole website changes colour at once.",
    },
    {
      q: "How many slider images can a salon website have?",
      a: "The hero section takes up to 5 slider images, which rotate automatically on the home page. If you upload none, a default slide is shown instead.",
    },
    {
      q: "How do I send my salon website address to clients?",
      a: "After publishing, press “Copy link” on the “Salon website” card. Send that link to clients, or add it to your salon's Facebook, Instagram and Google Maps.",
    },
  ],
  related: ["chia-se-link", "fanpage", "bang-gia", "ho-so-salon"],
};

export default article;
