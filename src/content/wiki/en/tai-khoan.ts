import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/tai-khoan/${name}.webp`;
const shot = (name: string) => `/wiki/tai-khoan/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "create-beauty-booking-account",
  lesson: "tai-khoan",
  category: "booking",
  title: "How to create a beauty booking account on VaraaAi: sign up, sign in and reset your password",
  metaTitle: "Create a beauty booking account on VaraaAi in a minute",
  metaDescription:
    "How to create a beauty booking account on VaraaAi: sign up free in a minute, sign in, reset a forgotten password and find each section of your account.",
  keyword: "create a beauty booking account",
  keywords: [
    "VaraaAi sign up",
    "VaraaAi sign in",
    "forgot VaraaAi password",
    "reset password booking account",
    "is a VaraaAi account free",
    "change email and password",
  ],
  excerpt: "Sign up free in a minute, sign in, reset a forgotten password, and learn what each section of your account is for.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-thu-gian-tai-spa-sau-khi-co-tai-khoan-varaaai"),
    alt: "A woman in a white robe relaxes by the pool of an elegant spa while a staff member brings her a tray of tea",
  },
  takeaways: [
    "Creating a VaraaAi account is **free** and takes about a minute.",
    "You fill in five fields: “Full name”, “Email”, “Phone number”, “Password” and “Confirm password”.",
    "Offers are your choice: tick “By email”, “By text message”, both or neither.",
    "Forgot your password? Press “Forgot password?”, enter your email and follow the **reset link** sent to your inbox.",
    "Once signed in, tap **your name at the top** to open every part of your account; “My profile” is where you change your email and password.",
  ],
  intro: [
    "To create a beauty booking account on VaraaAi takes about a minute and costs nothing. With an account you can see your bookings again, cancel when something comes up, collect loyalty stamps at the salons you visit and message a salon without phoning.",
    "This guide follows the VaraaAi Academy lesson “Create an account and sign in”. By the end you will be able to sign up, sign in on later visits, reset a forgotten password on your own and know what each section of your account is for.",
  ],
  sections: [
    {
      id: "what-the-account-is-for",
      title: "What a VaraaAi account is for",
      blocks: [
        { p: "You can search for salons and compare prices without signing in. The account becomes useful the moment you have an appointment: everything about it is kept in one place, and you can handle most of what used to need a phone call to the salon yourself." },
        {
          ul: [
            "**See your bookings:** date, time, service and the salon's address are in [My bookings](lesson:lich-hen-cua-toi).",
            "**Cancel when something comes up:** you cancel yourself within the time the salon allows, without asking anyone.",
            "**Collect loyalty stamps:** your regular salon activates a [loyalty card](lesson:the-thanh-vien) for you, and the card lives in your account.",
            "**Message the salon:** ask about prices, free times or anything before your visit through the [salon chat](lesson:chat-voi-salon).",
          ],
        },
        { note: "If you have already booked on VaraaAi and entered your name, phone number, email and a password on the details step, your account was created right then. You do not need to sign up again: just sign in with that email and password.", kind: "info", title: "Booked before?" },
      ],
    },
    {
      id: "account-sections",
      title: "The sections of your account after you sign in",
      blocks: [
        { p: "When you are signed in, your name appears at the top of the page. Tap it and a menu with six sections opens. This is the way into everything that belongs to you on VaraaAi." },
        {
          table: {
            head: ["Section", "What it is for"],
            rows: [
              ["My profile", "Change your photo, email and password"],
              ["My bookings", "See each appointment, cancel it and write a review after your visit"],
              ["Loyalty cards", "Open the loyalty cards of your regular salons, see your stamps and the QR code"],
              ["Inbox", "Read your conversations with salons again"],
              ["Following", "The salons you have chosen to follow"],
              ["Feed", "New posts from the salons you follow"],
            ],
          },
        },
        { img: { src: img("khach-mo-tai-khoan-varaaai-tren-dien-thoai"), alt: "A blonde woman in a plum scarf sits by a café window looking at her phone next to a cup of coffee", caption: "Every part of your account opens on your phone after one tap on your name." } },
        { p: "Of these six, “My profile” is the one worth opening once right after you sign up, to check that your email is correct. One wrong character in the address and neither your booking confirmations nor a password reset link will reach you." },
      ],
    },
    {
      id: "email-and-password",
      title: "Choosing your email and password to avoid trouble later",
      blocks: [
        { p: "Your email matters more than anything else in the account. You sign in with it, booking confirmations go to it, and when you forget your password the reset link is sent there. Use an address you actually read on your phone, not an old inbox you never open." },
        { p: "You type the password twice, in “Password” and “Confirm password”. The two must match character for character, so type slowly and watch for capital letters. A password used only for VaraaAi, different from your email or bank password, is a safe habit for any account online." },
        { note: "Near the end of the form you are asked “How would you like to receive marketing messages?”, with two boxes: “By email” and “By text message”. Leave a tick if you want to hear about a salon's offers; untick both before you press “Create account” if you do not.", kind: "tip", title: "Offers are up to you" },
      ],
    },
    {
      id: "common-situations",
      title: "Common situations when signing up and signing in",
      blocks: [
        {
          table: {
            head: ["Situation", "What to do"],
            rows: [
              ["You forgot your password", "On the sign-in page press “Forgot password?”, enter your email and press “Send reset link”. Open the email and follow it to choose a new password"],
              ["The reset email does not arrive", "Check that you typed the same email you signed up with, and look in your spam folder"],
              ["You opened the sign-up page but already have an account", "Press “Sign in” on the line “Already have an account?” below the “Create account” button"],
              ["You opened the sign-in page but have no account yet", "Press “Sign up” on the line “Don't have an account?” below the “Sign in” button"],
              ["You want to change your email or password", "Sign in, tap your name at the top and open “My profile”"],
              ["You want to change your photo", "Also in “My profile”"],
            ],
          },
        },
        { p: "Creating a new account just because you forgot the password is the one fix to avoid. Your bookings, loyalty cards and messages with salons belong to the old account, so resetting its password is the shortest way back." },
      ],
    },
    {
      id: "after-signing-up",
      title: "What to do after you sign up",
      blocks: [
        { p: "The first thing is usually to book a place at a salon. Open [the salon search](/search), choose a service and an area, and follow the guide to [booking a salon appointment online](lesson:dat-lich-online). Because you are signed in, you do not have to type your personal details again at the end." },
        { p: "If you book often, [install the VaraaAi app on your phone](lesson:cai-app) so it opens straight from your home screen. Once you have a favourite salon, you can [follow the salon](lesson:theo-doi-salon) so its new posts appear in your “Feed”." },
      ],
    },
  ],
  howTo: {
    title: "Steps to create an account, sign in and reset your password",
    id: "account-steps",
    after: "what-the-account-is-for",
    lead: "The first three steps are signing up, which you do once. The last three are what you will repeat: signing in, and resetting your password when you forget it.",
    steps: [
      {
        name: "Press “Sign up” in the top right corner",
        text: "Open [varaaai.com](/) on your phone or computer. In the top right corner there are two buttons, “Sign in” and “Sign up”. Press “Sign up” and the page “Create your account” opens.",
        image: { src: shot("press-sign-up-top-right"), alt: "The VaraaAi page on a tablet with the Sign up button highlighted in the top right corner and the Create your account form below" },
      },
      {
        name: "Fill in your details",
        text: "Enter “Full name”, “Email”, “Phone number”, “Password” and “Confirm password”. Use an email you really use, because booking confirmations and password reset links are sent there. The confirmation field must match the password exactly.",
        image: { src: shot("create-your-account-form"), alt: "The Create your account form with the Full name, Email, Phone number, Password and Confirm password fields" },
      },
      {
        name: "Choose how to hear about offers, then press “Create account”",
        text: "Below the fields are two choices, “By email” and “By text message”. Tick how you want to receive offers, or untick them if you would rather not. Then press “Create account”. The small print underneath says that by continuing you agree to VaraaAi's Terms of Use and Privacy Policy.",
        image: { src: shot("marketing-messages-and-create-account"), alt: "The end of the sign-up form with the By email and By text message boxes highlighted above the Create account button" },
      },
      {
        name: "Sign in on later visits",
        text: "Next time, press “Sign in” at the top. On the page “Sign in to VaraaAi”, enter the “Email” and “Password” you signed up with and press the “Sign in” button. When your name appears at the top, you are in your account.",
        image: { src: shot("sign-in-to-varaaai-email-password"), alt: "The Sign in to VaraaAi page with the Email and Password fields highlighted in gold and the Sign in button below" },
      },
      {
        name: "Forgot it? Press “Forgot password?”",
        text: "If you cannot remember your password, do not keep guessing. Right above the “Password” field on the sign-in page is the link “Forgot password?”. Press it to open the page “Reset your password”.",
        image: { src: shot("forgot-password-link-on-sign-in"), alt: "The VaraaAi sign-in page with the Forgot password link highlighted in gold to the right of the Password label" },
      },
      {
        name: "Send the reset link and choose a new password",
        text: "Type your account email in “Email” and press “Send reset link”. Open your inbox, find the email you just received and follow its steps to choose a new password. Then go back to the sign-in page and sign in with the new one.",
        image: { src: shot("reset-your-password-send-reset-link"), alt: "The Reset your password page with an Email field and the Send reset link button highlighted in gold" },
      },
    ],
  },
  faq: [
    {
      q: "Does a VaraaAi account cost anything?",
      a: "No. Customers create an account and use VaraaAi completely free. You only pay the salon for the treatment you have.",
    },
    {
      q: "Do I have to sign up before I can book?",
      a: "No. When you book for the first time, you enter your name, phone number, email and a password on the details step, and your account is created there and then. Signing up first only makes that step quicker because you are already signed in.",
    },
    {
      q: "How do I reset a forgotten VaraaAi password?",
      a: "On the sign-in page, press “Forgot password?”, enter your account email and press “Send reset link”. VaraaAi sends a link to that email; open it and follow the steps to choose a new password.",
    },
    {
      q: "Where do I change my email or password?",
      a: "Sign in, tap your name at the top and choose “My profile”. There you can change your photo, your email and your password.",
    },
    {
      q: "Will I get advertising after I sign up?",
      a: "That is your choice. The sign-up form asks whether you want marketing messages “By email” or “By text message”. Untick both boxes if you do not want any.",
    },
    {
      q: "Where are my bookings and loyalty cards once I am signed in?",
      a: "Tap your name at the top of the page. The menu shows “My profile”, “My bookings”, “Loyalty cards”, “Inbox”, “Following” and “Feed”. Your appointments are in the second section and your cards in the third.",
    },
  ],
  related: ["dat-lich-online", "cai-app", "lich-hen-cua-toi", "chat-voi-salon"],
};

export default article;
