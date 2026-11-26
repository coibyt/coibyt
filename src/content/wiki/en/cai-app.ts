import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cai-app/${name}.webp`;
const shot = (name: string) => `/wiki/cai-app/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "install-beauty-booking-app",
  lesson: "cai-app",
  category: "booking",
  title: "How to install a beauty booking app on Android, iPhone and your computer: the VaraaAi app",
  metaTitle: "Install a beauty booking app: VaraaAi on Android and iPhone",
  metaDescription:
    "How to install the VaraaAi beauty booking app on your home screen: one button on Android and computers, Safari on iPhone. Free, no Google Play or App Store.",
  keyword: "install a beauty booking app",
  keywords: [
    "install the VaraaAi app",
    "add to home screen on iPhone",
    "install an app without Google Play",
    "free salon booking app",
    "install VaraaAi on a computer",
    "nail appointment app",
  ],
  excerpt: "Put VaraaAi on your home screen in one tap on Android and computers, or a few taps on iPhone. Free, and no app store needed.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-mo-app-varaaai-tren-dien-thoai-o-quan-ca-phe"),
    alt: "A blonde woman in a plum scarf sits by a café window holding her phone in both hands next to a cup of coffee",
  },
  takeaways: [
    "The VaraaAi app installs **straight from your browser** at varaaai.com/app, with no Google Play or App Store, and it is free.",
    "**Android and computers:** open the page in Chrome, Edge or Samsung Internet, press “Install the app”, then choose “Install”.",
    "**iPhone and iPad:** open the page in Safari, tap the Share button, choose “Add to Home Screen”, then tap “Add”.",
    "The app updates together with the website, so there is never a new version to download.",
    "No need to remember the address: the bottom of every VaraaAi page has buttons to install on Android, on iPhone and on desktop.",
  ],
  intro: [
    "If you often book nails, a haircut or lashes online, it pays to install a beauty booking app on your phone: you skip opening the browser and typing an address. With VaraaAi it takes one tap on Android, a few taps on iPhone, and no app store at all.",
    "This guide follows the VaraaAi Academy lesson “Install the VaraaAi app”. You will learn which browser to use on each kind of device, which buttons to press, and what to do when the install button does not appear.",
  ],
  sections: [
    {
      id: "what-the-app-is",
      title: "What the VaraaAi app is and why install it",
      blocks: [
        { p: "The VaraaAi app is varaaai.com itself, placed on your phone's home screen with its own icon so it opens like any other app. Because it installs straight from the browser, you will not find it in Google Play or the App Store, and you do not need an app store account." },
        { p: "The install page gives four reasons to install it, all of them for people who book regularly:" },
        {
          ul: [
            "**Book in seconds:** open the app and your salons are right there; pick a time and book without typing any address.",
            "**Appointment reminders:** reminders, confirmations and changes from your salon arrive right on your phone.",
            "**Offers from salons you follow:** deals, new looks and news show up in your feed.",
            "**Always up to date:** the app updates with the website, so there is nothing to download again and no storage used.",
          ],
        },
        { img: { src: shot("why-install-the-app"), alt: "The Why install the app section on a tablet with the Book in seconds and Appointment reminders cards", caption: "“Why install the app?” on the VaraaAi install page." } },
        { p: "Without the app you can still [book a salon appointment online](lesson:dat-lich-online) in your browser as usual. The app only shortens the way: one tap on the icon instead of opening the browser, typing the address and waiting for the page." },
      ],
    },
    {
      id: "right-browser",
      title: "Choose the right browser for your device",
      blocks: [
        { p: "The only thing to get right is opening the install page in the right browser. Most cases of “I can't see the install button” come from opening the page in a different browser from the one the instructions name." },
        {
          table: {
            head: ["Device", "Browser", "What to press"],
            rows: [
              ["Android phone", "Chrome, Edge or Samsung Internet", "“Install the app”, then “Install”"],
              ["Computer", "Chrome or Edge", "“Install the app”, then “Install”"],
              ["iPhone and iPad", "Safari", "The Share button, “Add to Home Screen”, then “Add”"],
            ],
          },
        },
        { note: "If you tap a VaraaAi link inside a messaging or social media app, the page often opens in that app's own built-in browser. Open varaaai.com/app again in Safari on iPhone, or in Chrome on Android, before you install.", kind: "tip", title: "Opening a link from another app" },
      ],
    },
    {
      id: "buttons-at-bottom",
      title: "Can't remember the install page address?",
      blocks: [
        { p: "You do not need to know varaaai.com/app by heart. Scroll to the bottom of any VaraaAi page and you will find the box “Get the VaraaAi app” with three buttons: Install on Android, Install on iPhone and Install on Desktop. Press the one for your device to start, without going back to the home page or hunting through a menu." },
        { img: { src: shot("install-buttons-at-bottom-of-every-page"), alt: "The Get the VaraaAi app box at the bottom of a page with three dark buttons to install on Android, iPhone and Desktop", caption: "The three install buttons appear at the bottom of every VaraaAi page." } },
        { p: "The install page also has a QR code under the line “On a computer?”. If you are looking at VaraaAi on a computer but want the app on your phone, scanning the code with your phone's camera opens the install page on the phone, with no address to retype." },
      ],
    },
    {
      id: "common-situations",
      title: "Common situations when installing the VaraaAi app",
      blocks: [
        {
          table: {
            head: ["Situation", "What to do"],
            rows: [
              ["You searched Google Play or the App Store and found nothing", "The app is not in the app stores. Open varaaai.com/app in your browser and install it from there"],
              ["Android: you pressed “Install the app” but the browser asked nothing", "Check that you are in Chrome, Edge or Samsung Internet. If not, open the page again in one of those three"],
              ["iPhone: “Add to Home Screen” is missing", "Check that you are in Safari, then scroll down the Share sheet: the option sits below the first row of choices"],
              ["You are not sure which button is Share", "It is the square with an arrow pointing up, at the bottom of the Safari screen"],
              ["You want the app on a computer at home or at the front desk", "Open varaaai.com/app in Chrome or Edge and follow the Android steps"],
              ["It is installed but you cannot find it", "Look for the VaraaAi icon on your phone's home screen"],
            ],
          },
        },
      ],
    },
    {
      id: "after-installing",
      title: "Using the app once it is installed",
      blocks: [
        { p: "Tap the VaraaAi icon on your home screen and the app opens with everything you are used to seeing on the website. If you have no account yet, [create an account and sign in](lesson:tai-khoan) once so that your bookings, loyalty cards and messages with salons follow you." },
        { p: "From then on, the two things you will do most in the app are booking at your regular salon and opening [My bookings](lesson:lich-hen-cua-toi) to check your appointment time. If you [follow a salon](lesson:theo-doi-salon), its offers and new looks are waiting in your feed whenever you open the app." },
        { note: "Own a salon? Your customers install the app with exactly the steps in this guide. See [VaraaAi for salons](/business) to put your salon on VaraaAi for free.", kind: "info", title: "For salon owners" },
      ],
    },
  ],
  howTo: {
    title: "Steps to install the VaraaAi beauty booking app",
    id: "install-steps",
    after: "right-browser",
    lead: "The first two steps are for Android and computers, the next two for iPhone and iPad. Do only the part that matches your device.",
    steps: [
      {
        name: "Android and computer: open the install page",
        text: "Open [varaaai.com/app](/app) in Chrome, Edge or Samsung Internet. The section “Install in 3 steps” lists the exact order for each kind of device, so you can read and tap at the same time.",
        image: { src: shot("install-in-3-steps-android-and-computer"), alt: "The Install in 3 steps section of the install page with the Android and computer instructions highlighted in gold" },
      },
      {
        name: "Press “Install the app”, then choose “Install”",
        text: "Press the “Install the app” button at the top of the page. Your browser asks you to confirm; choose “Install”. The VaraaAi icon appears on your home screen right away, and Android and computers are done.",
        image: { src: shot("press-install-the-app-android"), alt: "The Install the VaraaAi app page on a tablet with the Install the app button highlighted in gold" },
      },
      {
        name: "iPhone and iPad: open it in Safari and tap Share",
        text: "Open [varaaai.com/app](/app) in Safari. Tap the Share button, the square with an arrow pointing up at the bottom of the screen. A sheet of options slides up from the bottom.",
        image: { src: shot("iphone-tap-share-button-safari"), alt: "The iPhone and iPad instructions on the install page with the line about tapping the Share button highlighted in gold" },
      },
      {
        name: "Choose “Add to Home Screen”, then tap “Add”",
        text: "Scroll down the sheet until you see “Add to Home Screen” and tap it. Tap “Add” to confirm. The VaraaAi icon now sits on your home screen like any other app.",
        image: { src: shot("iphone-add-to-home-screen"), alt: "The iPhone and iPad instructions with the line Choose Add to Home Screen, then tap Add highlighted in gold" },
      },
      {
        name: "Open the app from your home screen",
        text: "Find the VaraaAi icon on your home screen and tap it. From now on you go straight into VaraaAi without the browser, and booking is just a few taps away.",
      },
    ],
  },
  faq: [
    {
      q: "Is the VaraaAi app free?",
      a: "Yes. The VaraaAi app is free and installs straight from varaaai.com/app. Searching for salons and booking on VaraaAi is free for customers too.",
    },
    {
      q: "Why can't I find VaraaAi in Google Play or the App Store?",
      a: "Because the app is not published through the app stores. You install it from your browser: open varaaai.com/app and press “Install the app” on Android and computers, or use Safari's Share button on iPhone.",
    },
    {
      q: "How do I install the VaraaAi app on an iPhone?",
      a: "Open varaaai.com/app in Safari. Tap the Share button, the square with an arrow pointing up at the bottom of the screen, scroll down to “Add to Home Screen” and tap “Add”.",
    },
    {
      q: "Does the app need updating, and does it take up storage?",
      a: "The app updates together with the website, so you always have the latest version without downloading anything again. According to the VaraaAi install page, it uses no storage.",
    },
    {
      q: "Can I book without installing the app?",
      a: "Yes. You can book on varaaai.com in any browser as usual. The app just opens faster from your home screen and brings appointment reminders to your phone.",
    },
    {
      q: "Can I install the VaraaAi app on a computer?",
      a: "Yes. Open varaaai.com/app in Chrome or Edge on your computer, press “Install the app” and choose “Install” when the browser asks, just as on Android.",
    },
  ],
  related: ["dat-lich-online", "tai-khoan", "lich-hen-cua-toi", "theo-doi-salon"],
};

export default article;
