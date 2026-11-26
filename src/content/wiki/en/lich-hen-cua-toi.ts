import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/lich-hen-cua-toi/${name}.webp`;
const shot = (name: string) => `/wiki/lich-hen-cua-toi/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "cancel-salon-appointment-online",
  lesson: "lich-hen-cua-toi",
  category: "booking",
  title: "How to cancel a salon appointment online and check the bookings you have made on VaraaAi",
  metaTitle: "How to cancel a salon appointment online | VaraaAi",
  metaDescription:
    "How to check and cancel a salon appointment in My bookings on VaraaAi: the booking details, the salon's cancellation policy, and what to do when it is late.",
  keyword: "cancel a salon appointment",
  keywords: [
    "how to cancel a beauty appointment",
    "check my salon booking",
    "cancel a nail appointment",
    "salon cancellation policy",
    "reschedule a salon appointment",
    "VaraaAi My bookings",
  ],
  excerpt: "Open “My bookings” to check your appointment time and the salon's address, and cancel yourself within the salon's deadline, without phoning.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-xem-lai-lich-hen-lam-dep-tren-dien-thoai"),
    alt: "A blonde woman in a plum scarf sits by a window looking intently at her phone, with a cup of coffee on the table",
  },
  takeaways: [
    "All your bookings are in **“My bookings”**, which you open by tapping your name at the top.",
    "Press “View booking details” to see the staff member, the time and the salon's **address and phone number**.",
    "To cancel: press “Cancel booking”, read the “Cancellation policy”, then press “Confirm cancellation”.",
    "Each salon sets its own **self-cancellation deadline**, for example up to 24 hours before the appointment. After that, contact the salon directly.",
    "A cancelled booking changes to “Cancelled”. Cancelling early gives the salon time to offer the slot to someone else.",
  ],
  intro: [
    "When something comes up and you need to cancel a salon appointment, or you simply want to check what time you booked and where, there is no need to phone the salon and wait for someone to answer. On VaraaAi you can do both yourself under “My bookings”.",
    "This guide follows the VaraaAi Academy lesson “See and cancel a booking”. You will learn where to find your bookings, how to read the booking details, how to cancel properly within the salon's deadline, and what to do once that deadline has passed.",
  ],
  sections: [
    {
      id: "what-my-bookings-shows",
      title: "What “My bookings” tells you",
      blocks: [
        { p: "This is the list of every booking you have made with your account. Each booking is a card of its own, and the card alone gives you the essentials without opening anything else." },
        {
          table: {
            head: ["You want to know", "Where to look"],
            rows: [
              ["Which salon and which service", "The first two lines of the card: salon name and service"],
              ["The date and time", "The line just below the service"],
              ["The price", "The amount at the bottom left of the card"],
              ["Whether the salon has accepted it", "The status label, for example “Confirmed”"],
              ["Who will do it, where the salon is, which number to call", "Press “View booking details”"],
            ],
          },
        },
        { img: { src: shot("leave-a-review-button-after-visit"), alt: "The My bookings list with booking cards showing prices, Confirmed and Cancelled labels, View booking details and a highlighted Leave a review button", caption: "Each booking is a card with its price, status and action buttons." } },
        { p: "You need to be signed in to see this section. If you entered an email and a password on the details step of your first booking, your account already exists. If you are unsure how to sign in or have forgotten your password, see [create an account and sign in](lesson:tai-khoan)." },
      ],
    },
    {
      id: "cancellation-deadline",
      title: "The self-cancellation deadline and the salon's cancellation policy",
      blocks: [
        { p: "VaraaAi does not set one cancellation deadline for every salon. Each salon writes its own in its cancellation policy, and you see that policy twice: when you confirm the booking, and when you press “Cancel booking”. In the lesson video, the example salon's policy says you can cancel or reschedule free of charge up to 24 hours before your appointment, and that later cancellations or no-shows may be charged." },
        { p: "The deadline has a practical reason. A slot that falls empty at the last minute is almost impossible for the salon to fill, and the person booked to do the work is left waiting. The earlier you cancel, the more likely that time goes to another customer who needs it." },
        { note: "If the self-cancellation deadline has passed, contact the salon directly. The salon can cancel or move the booking for you. Its phone number is right there in “View booking details”.", kind: "warn", title: "Past the deadline" },
      ],
    },
    {
      id: "change-the-time",
      title: "Want to change the time instead of cancelling?",
      blocks: [
        { p: "The lesson covers the two things a customer does in this section: checking and cancelling. Moving a booking to another time is something the salon does for you. So when you want a different time, the simplest way is to tell the salon when you would like to come instead." },
        {
          ul: [
            "**Call:** the salon's phone number is in “View booking details”.",
            "**Send a message:** open the salon's page and use the [salon chat](lesson:chat-voi-salon); the salon replies in the same chat.",
            "**Book again yourself:** if you are still within the self-cancellation deadline, cancel the old booking and [make a new one](lesson:dat-lich-online) at a better time.",
          ],
        },
        { note: "When you rebook yourself, check that the salon still has a free time on the day you want before you cancel the old booking. Cancel first, find the day full, and you lose both.", kind: "tip", title: "From experience" },
      ],
    },
    {
      id: "common-situations",
      title: "Common situations with a booking you have made",
      blocks: [
        {
          table: {
            head: ["Situation", "What to do"],
            rows: [
              ["You forgot the appointment time", "Open “My bookings”: the date and time are on the card"],
              ["You can't remember the salon's address", "Press “View booking details”: the address and phone number are in the details box"],
              ["You pressed “Cancel booking” by mistake", "On the policy screen, press “Keep booking” instead of “Confirm cancellation”. Nothing changes"],
              ["The self-cancellation deadline has passed", "Contact the salon directly and ask it to cancel or move the booking"],
              ["You cancelled but want to go after all", "Make a new booking on the salon's page"],
              ["No bookings appear in the list", "Check that you are signed in to the account you used when booking"],
            ],
          },
        },
      ],
    },
    {
      id: "after-your-visit",
      title: "After your visit: come back to leave a review",
      blocks: [
        { p: "“My bookings” is useful after the treatment too. The booking card has a “Leave a review” button. Press it to give stars and write a few lines about how the visit went. The lesson [write a review after your visit](lesson:viet-danh-gia) shows how." },
        { p: "If you go to the same salon regularly, ask about a [loyalty card](lesson:the-thanh-vien): each visit earns a stamp, and a full card earns a discount. To open your bookings faster, you can also [install the VaraaAi app](/app) on your phone's home screen." },
      ],
    },
  ],
  howTo: {
    title: "Steps to check and cancel a salon appointment on VaraaAi",
    id: "cancel-steps",
    after: "what-my-bookings-shows",
    lead: "The first three steps are for checking a booking, the last three for cancelling it. If you only need the time, stop after step three.",
    steps: [
      {
        name: "Open “My bookings”",
        text: "Sign in to VaraaAi. Tap your name at the top of the page and choose “My bookings” from the menu that opens. Your bookings appear as separate cards.",
        image: { src: shot("open-my-bookings-from-account-menu"), alt: "The My bookings page on a tablet with the account button highlighted in the top right corner and two booking cards below" },
      },
      {
        name: "Read the booking card",
        text: "Each card shows the salon, the service, the date and time, the price and the status, for example “Confirmed”. Find the right booking before you press anything, especially if you have several at the same salon.",
        image: { src: shot("booking-card-salon-service-time-price"), alt: "A booking card highlighted in gold showing the salon, a relax massage, the date and time, 70 euros and the Confirmed label" },
      },
      {
        name: "Press “View booking details”",
        text: "A details box opens with the staff member's name, the time, and the salon's address and phone number. This is where to get the address for directions, or the number when you need to call.",
        image: { src: shot("view-booking-details-staff-address-phone"), alt: "The booking details box showing the salon, the service, the staff member Emma, the time, the address, the phone number and the price" },
      },
      {
        name: "Press “Cancel booking”",
        text: "If you need to cancel, the “Cancel booking” button is at the bottom of that box. Pressing it does not cancel straight away: you are shown the salon's policy first.",
        image: { src: shot("press-cancel-booking"), alt: "The booking details box on VaraaAi with the red-outlined Cancel booking button highlighted in gold at the bottom" },
      },
      {
        name: "Read the “Cancellation policy”, then press “Confirm cancellation”",
        text: "The “Cancellation policy” tells you how long you can cancel yourself, for example up to 24 hours before the appointment. Once you have read it, press “Confirm cancellation” to cancel. If you change your mind, press “Keep booking”.",
        image: { src: shot("cancellation-policy-confirm-cancellation"), alt: "The salon's cancellation policy text with the red Confirm cancellation button highlighted and the Keep booking option beside it" },
      },
      {
        name: "Check for the “Cancelled” status",
        text: "Back in the list, the booking you cancelled now carries the label “Cancelled” instead of “Confirmed”. When you see it, the cancellation is done and the time is free again for the salon.",
        image: { src: shot("booking-status-cancelled"), alt: "The My bookings list with the relax massage booking highlighted in gold and its status label now showing Cancelled" },
      },
    ],
  },
  faq: [
    {
      q: "Where do I cancel a salon appointment on VaraaAi?",
      a: "Sign in, tap your name at the top and choose “My bookings”. On the booking you want to cancel, press “View booking details”, then “Cancel booking”, read the cancellation policy and press “Confirm cancellation”.",
    },
    {
      q: "How far in advance can I cancel?",
      a: "It depends on the salon. Each salon sets its own self-cancellation deadline in its “Cancellation policy”, which you see when you press “Cancel booking”. In the lesson's example, you can cancel yourself up to 24 hours before the appointment.",
    },
    {
      q: "What if the cancellation deadline has passed?",
      a: "Contact the salon directly. The salon can cancel or move the booking for you. Its phone number is in “View booking details” for that booking.",
    },
    {
      q: "How do I change my appointment time?",
      a: "Ask the salon by phone or message to move the booking. If you are still within the self-cancellation deadline, you can also cancel the old booking and make a new one at another time.",
    },
    {
      q: "How do I know the cancellation went through?",
      a: "After you press “Confirm cancellation”, the booking in the list changes to “Cancelled”. If the card still says “Confirmed”, the booking has not been cancelled.",
    },
    {
      q: "Where can I see the address and phone number of the salon I booked?",
      a: "In “My bookings”, press “View booking details” on the booking. The details box shows the staff member, the time, and the salon's address and phone number.",
    },
  ],
  related: ["chat-voi-salon", "viet-danh-gia", "dat-lich-online", "tai-khoan"],
};

export default article;
