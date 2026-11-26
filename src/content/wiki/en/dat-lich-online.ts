import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/dat-lich-online/${name}.webp`;
const shot = (name: string) => `/wiki/dat-lich-online/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "book-salon-appointment-online",
  lesson: "dat-lich-online",
  category: "booking",
  title: "How to book a salon appointment online: find a salon and book in a minute",
  metaTitle: "Book a salon appointment online: nails, hair, lashes, spa",
  metaDescription:
    "How to book nails, a haircut, lash extensions or a spa treatment online on VaraaAi: find a salon near you, pick a service, staff and a free time, then confirm.",
  keyword: "book a salon appointment online",
  keywords: ["book nails online", "book a haircut online", "book a spa treatment online", "salons near me", "book lash extensions online", "how to book on VaraaAi"],
  excerpt: "Search salons by service and area, choose who does the work, pick a free date and time, and confirm. No phone call needed, even at midnight.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-den-salon-sau-khi-dat-lich-online"),
    alt: "A woman in a cream trench coat is welcomed by the receptionist at the front desk of an elegant beauty salon",
  },
  takeaways: [
    "Booking on VaraaAi is **free** for customers and takes about a minute.",
    "You see the salon's **real free times**, grouped into morning, afternoon and evening, so there is no need to phone and ask.",
    "No account yet? You can still book: enter your name, phone number, email and a password, and your account is created as you go.",
    "The usual payment option is **“Pay at the salon”**: you pay after the treatment, by cash or card.",
    "If something comes up, you can cancel yourself under “My bookings”, as long as the salon's cancellation deadline has not passed.",
  ],
  intro: [
    "When you book a salon appointment online, you skip the phone call asking whether anyone has a free slot tomorrow. You open your phone, see which salons have time, what the service costs and who would do it, then hold your place in about a minute, even when the salon is closed for the night.",
    "This guide shows, step by step, how to book nails, a haircut, lash extensions or a spa treatment on VaraaAi, following the first customer lesson at VaraaAi Academy, “Find a salon and book online”. The video below was recorded on the real screens, so you can watch and follow along at the same time.",
  ],
  sections: [
    {
      id: "before-you-book",
      title: "What you need before you book",
      blocks: [
        { p: "Almost nothing. A phone or computer with an internet connection, and an idea of the service you want. Booking costs nothing and you do not need to install anything, although you can [install the VaraaAi app](/app) if you like opening it straight from your home screen." },
        { p: "If you have a discount code or a gift card from the salon, keep the code to hand, because you enter it on the details step." },
      ],
    },
    {
      id: "salon-page",
      title: "How to read a salon's page before you choose",
      blocks: [
        { p: "The search results show the matching salons with their **rating** and **lowest price**. You can switch between “List” and “Map” to pick a place near home or near work." },
        { p: "When you open a salon, you see its address, phone number and three tabs:" },
        {
          ul: [
            "**Services:** each service shows how long it takes and what it costs.",
            "**Reviews:** comments from customers who actually booked and came in.",
            "**Opening hours:** the days and times the salon works.",
          ],
        },
        { img: { src: shot("salon-page-services-reviews-opening-hours"), alt: "A salon page on a phone with the Book now and Chat with salon buttons and the Services, Reviews and Opening hours tabs", caption: "The salon page: “Book now” at the top, the three tabs underneath." } },
        { note: "Look at how long the service takes before you pick a time. A set of lash extensions or a colour appointment can run longer than you expect, so leave enough room before your next commitment.", kind: "tip", title: "Small tip" },
      ],
    },
    {
      id: "after-booking",
      title: "After booking: check, change or cancel",
      blocks: [
        { p: "Once the screen confirms your booking, a confirmation email is on its way too. Press “View my bookings” to see the date, time, service and salon address whenever you need them." },
        { p: "If something comes up, you can cancel yourself under “My bookings”, as long as you are within the salon's cancellation deadline. Each salon sets its own deadline in its cancellation policy, which you accepted on the confirmation step. Cancelling early lets the salon offer that time to someone else." },
        { p: "The next Academy lesson covers this in detail: [See and cancel a booking](lesson:lich-hen-cua-toi). If you want to ask the salon something before your visit, you can [chat with the salon](lesson:chat-voi-salon) right on VaraaAi." },
      ],
    },
    {
      id: "common-situations",
      title: "Common situations when booking",
      blocks: [
        {
          table: {
            head: ["Situation", "What to do"],
            rows: [
              ["No times show on the day you picked", "The salon is fully booked or closed that day. Pick another day, or choose “Any available staff” to see everyone's free times"],
              ["You want two services in one visit", "Tick each service in the list, then press “Continue”"],
              ["You do not mind who does it", "Leave “Any available staff” selected and the salon assigns whoever is free"],
              ["You already have an account", "Press “Sign in” instead of typing your details again"],
              ["You want to tell the salon something", "Write it in “Note for the salon (optional)” on the details step"],
            ],
          },
        },
      ],
    },
    {
      id: "salon-owners",
      title: "Do you own a salon?",
      blocks: [
        { p: "Everything a customer sees in this guide is what your own customers will see once your salon has a booking page on VaraaAi: services, prices, real free times and a book button that works around the clock. Signing up is free for salon owners. See the lesson [Register and activate your salon](lesson:dang-ky-salon) or open [VaraaAi for salons](/business)." },
      ],
    },
  ],
  howTo: {
    title: "How to book a beauty appointment on VaraaAi",
    id: "booking-steps",
    after: "salon-page",
    lead: "The seven steps follow the screens in order. Names in quotation marks are the labels you will see on the page.",
    steps: [
      {
        name: "Search by service and area",
        text: "Open [varaaai.com](/). Type the service you need under “Service or salon”, for example nails. Type your city under “Area”, or press “Near me” to search around where you are, then press “Search”. You can also scroll down and pick from “Browse by category”.",
        image: { src: shot("search-salon-by-service-and-area"), alt: "The VaraaAi home page on a phone with the Service or salon field, the Area field, the Near me button and the Search button" },
      },
      {
        name: "Choose a salon from the results",
        text: "View the results as a “List” or on the “Map”. Each salon shows its rating and lowest price. Tap the salon you like to open its page.",
        image: { src: shot("salon-search-results-list-and-map"), alt: "Search results screen showing four salons in Finland, the List and Map switch and a salon card with its rating and From price" },
      },
      {
        name: "Choose the service",
        text: "Under “Services”, press “Book” next to the service you want. For several services in one visit, tick each one and press “Continue”.",
        image: { src: shot("choose-service-and-press-book"), alt: "A salon's service list on a phone, each service with its length in minutes, its price and a Book button" },
      },
      {
        name: "Choose who does it",
        text: "Under “Choose staff”, pick the person you know, or leave it on “Any available staff” if anyone will do.",
        image: { src: shot("choose-staff-any-available"), alt: "The Choose staff screen with the Any available staff option highlighted next to two named staff members, and the Select date calendar below" },
      },
      {
        name: "Pick a free date and time",
        text: "Under “Select date”, tap the day you want. “Select time” then shows the free times, grouped into morning, afternoon and evening. Tap the one that suits you.",
        image: { src: shot("select-free-time-slot"), alt: "The Select time screen with free morning slots in a grid, one time highlighted, and the afternoon slots starting below" },
      },
      {
        name: "Enter your details and how you will pay",
        text: "No account yet: fill in “Full name”, “Phone number”, “Email” and a “Password”; your account is created for you. Already have one: press “Sign in”. Under “Choose a payment method”, the usual choice is “Pay at the salon”. If you have a discount code or a gift card, type it under “Discount code” and press “Apply”.",
        image: { src: shot("pay-at-the-salon-and-discount-code"), alt: "The payment step with the Pay at the salon option, the Note for the salon box and the Discount code field with an Apply button" },
      },
      {
        name: "Check and confirm",
        text: "Check “Your appointment”: the right service, date, time and price. Tick the box “I accept the Cancellation Policy and VaraaAi Terms of Use”, then press “Confirm booking”. When the screen confirms your booking, your place is held.",
        image: { src: shot("confirm-booking-summary"), alt: "The Your appointment summary with date, time, staff member and price due at the salon, the acceptance checkbox and the Confirm booking button" },
      },
    ],
  },
  faq: [
    {
      q: "Does it cost anything to book on VaraaAi?",
      a: "No. Booking is completely free for customers. You only pay the salon for the service, and with “Pay at the salon” you pay after the treatment, by cash or card.",
    },
    {
      q: "Can I book outside the salon's opening hours?",
      a: "Yes. The booking page works day and night, so you can book even at midnight. You can only choose times the salon still has free within its working hours.",
    },
    {
      q: "Can I book without an account?",
      a: "Yes. On the details step you enter your full name, phone number, email and a password. Your account is created while you book, and next time you simply sign in.",
    },
    {
      q: "How do I know my booking went through?",
      a: "After you press “Confirm booking”, the screen confirms the booking and you receive a confirmation email. You can also see the appointment under “My bookings”.",
    },
    {
      q: "How do I cancel a salon booking?",
      a: "Open “My bookings” and cancel the appointment there. You can do it yourself as long as you are within the deadline set in the salon's cancellation policy.",
    },
    {
      q: "Where do I enter a discount code or gift card?",
      a: "On the details step, right below the payment method, there is a “Discount code” box. It takes both discount codes and gift-card codes. Type the code and press “Apply” before you confirm the booking.",
    },
  ],
  related: ["lich-hen-cua-toi", "tai-khoan", "cai-app", "the-qua-tang"],
};

export default article;
