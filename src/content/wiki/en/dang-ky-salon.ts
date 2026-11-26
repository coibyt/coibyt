import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/dang-ky-salon/${name}.webp`;
const shot = (name: string) => `/wiki/dang-ky-salon/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "free-salon-booking-software",
  lesson: "dang-ky-salon",
  category: "salon",
  title: "Free salon booking software: how to register and activate your salon on VaraaAi",
  metaTitle: "Free salon booking software: register your salon in minutes",
  metaDescription:
    "How nail, hair, lash and spa owners register on VaraaAi: create your account, enter the salon details, pick the country and verify your email to go live.",
  keyword: "free salon booking software",
  keywords: [
    "register salon on VaraaAi",
    "online booking page for a nail salon",
    "free booking system for hair salons",
    "salon booking app with no monthly fee",
    "does salon registration need approval",
    "booking software for spa and beauty salons",
  ],
  excerpt: "Create your account, enter the salon details, choose the right country and verify your email. The salon goes live at once, with no review and no fee.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("salon-lam-dep-dong-khach-nhan-dat-lich-online"),
    alt: "Inside an elegant hair salon with tall arched windows, where several stylists work on clients seated in purple chairs",
  },
  takeaways: [
    "Registering a salon on VaraaAi is **free** and takes a few minutes, and you can do it on your phone.",
    "Press **“Verify email”** in the email VaraaAi sends you and the salon is live at once, with no one to approve it.",
    "The **“Country”** field sets the time zone of your calendar, so choose the country where the salon actually trades.",
    "No verification email? Look in your Spam or Promotions folder before you do anything else.",
    "Once the salon is active, press “Go to dashboard” and add your services, staff and opening hours.",
  ],
  intro: [
    "Most owners start looking for free salon booking software on the day the phone rings while their hands are full of gel brushes and the messages asking about free times arrive at midnight. With a booking page of your own, clients choose a service and a free time themselves, day or night, and you pay no monthly fee for it.",
    "This guide follows the VaraaAi Academy lesson “Register and activate your salon”. By the end you will know what to have ready before you open the form, how to fill in each field, and why a small choice such as “Country” affects every appointment that follows.",
  ],
  sections: [
    {
      id: "why-a-booking-page",
      title: "Why nail, hair, lash and spa salons need an online booking page",
      blocks: [
        { p: "Many clients only have time to think about their nails or hair in the evening, after the salon has closed. If the only way to book is to phone, they have to remember to call the next morning, and plenty of them forget. A booking page lets them hold a place the moment they think of it." },
        { p: "For the salon, every call asking whether there is a place tomorrow means a technician stops work, takes off her gloves and opens the diary. The booking page answers for you: clients see the services, the prices and the times that are really free, and pick one. You can walk through the whole process from the client's side in the guide to [booking a salon appointment online](lesson:dat-lich-online)." },
        { p: "It also helps when a client and the salon do not share a first language. The client reads the service names and picks a date and time on screen, so fewer bookings depend on a phone call in a second language." },
        { p: "VaraaAi is free for salon owners and for the clients who book. Registration has no review step either: you fill in the details, verify your email and the salon is live." },
      ],
    },
    {
      id: "what-to-prepare",
      title: "What to have ready before you register your salon",
      blocks: [
        { p: "The registration page has two parts: your own account and the salon's details. To fill it in without stopping to look things up, have these ready:" },
        {
          ul: [
            "**An email address you can open straight away.** The verification email goes there, and the salon is only activated when you press the button in it.",
            "**The business name** spelled exactly as on your sign, so a client who sees the name on the door finds the right salon online.",
            "**A few lines of introduction:** what the salon does and what brings clients back.",
            "**The full address**, the city and the country where the salon trades.",
            "**The salon's phone number**, the one clients can reach during opening hours.",
            "**Your main service category**, for example nails, hair or spa.",
          ],
        },
        { note: "Write the introduction in a notes app first and paste it in. The lesson on [the salon profile](lesson:ho-so-salon) recommends at least 80 characters, so writing it carefully once now saves editing later.", kind: "tip", title: "Small tip" },
      ],
    },
    {
      id: "country-and-time-zone",
      title: "The “Country” field and your calendar's time zone",
      blocks: [
        { p: "Of all the fields on the page, this is the one most often chosen in a hurry. VaraaAi uses the country you pick to set the salon's time zone, and every appointment time after that is shown in it. Pick the wrong country and the times in the calendar no longer match the clock on the salon wall." },
        { p: "If you live in one country and run a salon in another, choose the country where the salon opens its doors. The people who book live around the salon, and the times they see must be their local time." },
        { note: "The small text under “Country” says it “Sets your salon's timezone” and that you can change it later in Settings. Even so, get it right from the start, before the first appointment comes in.", kind: "info", title: "Chose the wrong one?" },
      ],
    },
    {
      id: "after-activation",
      title: "After activation: what to do next in the dashboard",
      blocks: [
        { p: "“Go to dashboard” takes you to the place where you run the salon. The salon is live by now, but the page is still empty: there are no services to choose, no one to do them and no opening hours. The next lessons in the Academy's first course cover each part, in the order worth following:" },
        {
          ol: [
            "[Complete the salon profile](lesson:ho-so-salon): logo, cover photo and contact details.",
            "[Add services and prices](lesson:dich-vu): the name, duration and price of each service.",
            "[Add your staff](lesson:nhan-vien) and choose which services each person does.",
            "[Set opening hours and days off](lesson:gio-mo-cua), because clients can only book inside opening hours.",
            "[Set the cancellation policy and how you take payment](lesson:thanh-toan-chinh-sach).",
          ],
        },
        { img: { src: img("le-tan-don-khach-tai-quay-salon"), alt: "A receptionist in a plum suit welcomes a woman in a cream trench coat at the salon's marble counter while other clients wait behind", caption: "With services, staff and opening hours in place, clients who book online arrive on time like any other appointment." } },
        { p: "When those five jobs are done, you can [share your booking link](lesson:chia-se-link) on Facebook and Instagram or send it straight to your regular clients." },
      ],
    },
    {
      id: "common-situations",
      title: "Common situations when you register a salon",
      blocks: [
        {
          table: {
            head: ["Situation", "What to do"],
            rows: [
              ["You submitted the form but no email has arrived", "Look in your Spam or Promotions folder. The verification email sometimes lands there"],
              ["You already have a VaraaAi account from booking as a client", "Press “Sign in” on the line “Already have an account?” at the bottom of the form instead of creating a new account"],
              ["The salon offers several kinds of service", "Under “Service category”, choose the salon's main kind of service"],
              ["You have no good introduction yet", "Write a few honest lines about the salon. You can rewrite them when you complete the profile"],
              ["You are not sure the country is right", "Check it before you press “Submit application”, because the country sets the calendar's time zone"],
            ],
          },
        },
        { p: "If you are stuck at any step, open [VaraaAi for salons](/business) to read the overview again, or send your question through the [support page](/support)." },
      ],
    },
  ],
  howTo: {
    title: "How to register your salon on VaraaAi's free booking software",
    id: "register-salon-steps",
    after: "what-to-prepare",
    lead: "The seven steps follow the screens of the lesson video in order. Names in quotation marks are the words you will see on the page.",
    steps: [
      {
        name: "Open varaaai.com and press the line for salon owners",
        text: "On the [varaaai.com](/) home page, find the line “Own a salon? Bring it to VaraaAi for free” and press it. It sits above the “Get the app” button and the “Browse by category” section.",
        image: { src: shot("own-a-salon-link-on-home-page"), alt: "The VaraaAi home page on a tablet with the line Own a salon? Bring it to VaraaAi for free outlined in gold" },
      },
      {
        name: "Press “Register your salon free”",
        text: "The page for salon owners opens. Press the orange button “Register your salon free” to reach the registration form. The line under the button says “No credit card needed”.",
        image: { src: shot("register-your-salon-free-button"), alt: "The VaraaAi page for salon owners with the orange Register your salon free button outlined in gold and No credit card needed below it" },
      },
      {
        name: "Create your account",
        text: "If you have no account yet, the page starts with “Create your account”. Enter “Full name”, “Email”, “Password” and “Confirm password”. Use an email you can open on your phone right away, because the last step needs it. This account is your sign-in as the salon owner and also your own VaraaAi customer account.",
        image: { src: shot("create-your-account-form-salon-owner"), alt: "The Create your account form with the Full name, Email, Password and Confirm password fields outlined in gold" },
      },
      {
        name: "Enter the salon's name, description and category",
        text: "Scroll down to the salon's details. Enter the “Business name”, write a few lines in “Short description” and choose a “Service category”, for example nails, hair or spa. The business name is what clients see, so spell it exactly as on your sign.",
        image: { src: shot("business-name-short-description-service-category"), alt: "The salon details part of the form with Business name, the Short description box outlined in gold and the Service category list" },
      },
      {
        name: "Enter the address, country, city and phone number",
        text: "Fill in “Address”, choose the “Country”, then enter the “City” and the “Phone number”. Pause for a second at “Country”: it sets your calendar's time zone, so it must be the country where the salon trades.",
        image: { src: shot("address-country-city-salon"), alt: "The Address field outlined in gold above Country with the note Sets your salon's timezone, then the City and Phone number fields" },
      },
      {
        name: "Check everything, then press “Submit application”",
        text: "Read the form once from top to bottom, above all the email address and the country. When everything is right, press the black “Submit application” button at the bottom of the page.",
        image: { src: shot("submit-application-button"), alt: "The end of the registration form with the City and Phone number fields and the black Submit application button outlined in gold" },
      },
      {
        name: "Verify your email and open the dashboard",
        text: "VaraaAi sends you an email. Open it and press “Verify email”, and the salon is activated at once. If you cannot see it, check your Spam or Promotions folder. Then press “Go to dashboard” to start adding services, staff and opening hours.",
        image: { src: shot("verify-email-salon-activated"), alt: "A woman with curly hair smiles at her phone on a sofa, next to a gold tick showing that her email is verified" },
      },
    ],
  },
  faq: [
    {
      q: "Does it cost anything to register a salon on VaraaAi?",
      a: "No. VaraaAi is free for salon owners and for the clients who book, and there is no monthly fee. The page for salon owners also states that no credit card is needed to register.",
    },
    {
      q: "How long after I submit does the salon go live?",
      a: "As soon as you press “Verify email” in the email VaraaAi sends you. There is no review lasting several days, so you can register and start adding services in the same sitting.",
    },
    {
      q: "What if the verification email does not arrive?",
      a: "First look in the Spam or Promotions folder of your inbox, because the email sometimes lands there. You do not need to register again from scratch just because it is not in your main inbox.",
    },
    {
      q: "Why does the country have to be right when I register?",
      a: "The country sets the time zone of your calendar, and appointment times are shown in that time zone. Choose the country where the salon opens its doors so the calendar matches the real time at the salon.",
    },
    {
      q: "I already have a VaraaAi customer account. Do I need a new one?",
      a: "No. “Create your account” is for people without an account. If you already have one, press “Sign in” at the bottom of the registration page. One account works for both roles, salon owner and customer.",
    },
    {
      q: "Can clients book as soon as I have registered?",
      a: "The salon is live once your email is verified, but clients need services to choose and can only book inside opening hours. Go to the dashboard and add services, staff and opening hours before you send clients your link.",
    },
  ],
  related: ["ho-so-salon", "dich-vu", "nhan-vien", "gio-mo-cua"],
};

export default article;
