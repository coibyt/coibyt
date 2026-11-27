import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/chi-nhanh/${name}.webp`;
const shot = (name: string) => `/wiki/chi-nhanh/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "multi-location-salon-management-add-branches",
  lesson: "chi-nhanh",
  category: "salon",
  title: "Multi-location salon management: how to add a new branch and use one booking link for the chain",
  metaTitle: "Multi-location salon management in one account",
  metaDescription:
    "How to run a salon chain on VaraaAi: add a branch in Settings, set up its own services and staff, switch between locations and share one chain booking page.",
  keyword: "multi-location salon management",
  keywords: [
    "manage a salon with several branches",
    "open a second nail salon location",
    "salon chain software",
    "add a branch on VaraaAi",
    "one booking page for a salon chain",
    "several locations in one account",
  ],
  excerpt: "Every branch lives in the same account, and each location has its own booking page, calendar and staff. Switching between them takes one tap.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-lam-toc-cho-khach-tai-chi-nhanh-moi"),
    alt: "A stylist in a cream jacket brushes the hair of a blonde client seated in a purple velvet chair, in a room with three gilt-framed mirrors",
  },
  takeaways: [
    "Opening another location **does not need a new account**: every branch lives in the same account.",
    "Add it under **“Settings”, in the “Branches” section, with “Add branch”**, fill in the details and press “Submit application”.",
    "Each branch has **its own booking page, calendar and staff**, so the figures never mix.",
    "Once you have two or more branches, a **“Branch”** picker appears at the top of the dashboard so you can switch between them.",
    "The **chain booking page** is one shared link: customers pick a branch, then book.",
  ],
  intro: [
    "Multi-location salon management starts the day you sign the lease on a second space. From then on, one diary is no longer enough: two addresses, two teams, two sets of opening hours, and clients who need to be certain which location they are booking.",
    "This guide follows the VaraaAi Academy lesson “Several branches”. You will add a new branch to the account you already use, know what has to be set up again for that location, switch between locations while managing them, and know when to send clients one shared link for the whole chain.",
  ],
  sections: [
    {
      id: "why-separate-branches",
      title: "Why managing several branches means keeping each location separate",
      blocks: [
        { p: "The habit many owners fall into when they open a second location is to put everything in one diary, with an abbreviation in front of each client's name. It breaks down quickly. A client books at one location and turns up at the other. Staff from both places appear in one list. At the end of the month, you cannot tell which location is doing well." },
        { p: "VaraaAi takes the opposite approach: one account, several branches, and each branch is a complete salon. Each location has its own booking page, calendar and staff. Each location's calendar and figures stay separate, and you still only log in once." },
        { img: { src: img("tho-cat-toc-nam-tai-co-so-thu-hai"), alt: "A bearded barber in a dark green waistcoat cuts the hair of a male client seated in a brown leather chair beside a large window", caption: "Each location has its own team and clients, so it needs its own calendar too." } },
        { p: "Keeping them apart helps clients as well. Someone living near the new location only needs to see that location's free times and team. They do not have to read through the staff list of a place across town." },
      ],
    },
    {
      id: "before-you-start",
      title: "What to prepare before adding a new branch",
      blocks: [
        { p: "The new branch form asks for the same information you gave when you [registered your first salon](lesson:dang-ky-salon). Have the following ready and you can fill it in one go:" },
        {
          ul: [
            "**The branch name.** Add the area or street name after the salon's name, so clients can tell the two locations apart from the name alone.",
            "**A short description** of the new location.",
            "**The main service category** of that location. Two locations do not have to offer the same kind of services.",
            "**The full address, country and city.**",
            "**The new location's own phone number**, so clients call the place they are actually going to.",
          ],
        },
        { note: "The note under the “Country” field explains that the country sets the salon's time zone, which you can change later in Settings. If the new branch is in a different country from the first, choose that branch's country so appointment times match local time.", kind: "info", title: "The “Country” field and time zones" },
      ],
    },
    {
      id: "separate-and-shared",
      title: "What is separate and what is shared between branches",
      blocks: [
        { p: "Understanding this line before you start saves you from changing things in the wrong place." },
        {
          table: {
            head: ["Part", "Separate or shared", "What that means"],
            rows: [
              ["Login account", "Shared", "One login, and you see all your locations"],
              ["Booking page", "Separate per branch", "Each location has its own page to send to clients"],
              ["Calendar", "Separate per branch", "One location's bookings do not appear at the other"],
              ["Staff", "Separate per branch", "Clients only see the team of the location they are booking"],
              ["Chain booking page", "Shared", "One link for the whole chain, clients pick a branch first"],
            ],
          },
        },
        { p: "Because calendars and staff are separate, every number you see in the dashboard belongs to the location currently selected. In the “Branches” section, that location is marked “Viewing”. Get into the habit of glancing at that badge before you change a price or the opening hours." },
      ],
    },
    {
      id: "set-up-new-branch",
      title: "Setting up the new branch: services, staff and opening hours",
      blocks: [
        { p: "Once you press “Submit application”, the new branch has its own booking page, but the page is empty. The lesson names three things to add for that branch, just as you did for your first salon:" },
        {
          ol: [
            "[Services and prices](lesson:dich-vu). The new location may have a shorter menu or different prices, so enter what that location really offers.",
            "[Staff](lesson:nhan-vien) working at the new location, with the services each person can do.",
            "[Opening hours and days off](lesson:gio-mo-cua), because clients can only book within opening hours.",
          ],
        },
        { img: { src: img("le-tan-don-khach-tai-quay-mot-chi-nhanh"), alt: "A receptionist in a purple jacket hands a glass of water to a client in a cream coat at a marble counter, with clients waiting on velvet chairs behind", caption: "A new branch only receives bookings once it has services, staff and opening hours." } },
        { p: "Do not send the new branch's link to clients before these three are done. A booking page with no services to choose from makes clients think the location is not open yet." },
        { note: "Open the new branch's booking page on your phone and make a test booking yourself. You will see straight away which service or which opening hours are still missing.", kind: "tip", title: "Make a test booking" },
      ],
    },
    {
      id: "chain-booking-page",
      title: "One booking page for the salon chain, or a link per location",
      blocks: [
        { p: "“Settings” also has the chain booking page. It is one shared link: clients open it, choose a branch, then book. You only need to share one link for the whole chain." },
        { p: "Each branch still has its own link too. Which one to use depends on whether the client already knows which location they want. The table below is this guide's suggestion:" },
        {
          table: {
            head: ["Where the link goes", "Use"],
            rows: [
              ["The brand's shared Facebook or Instagram page", "The chain booking page, because viewers live all over"],
              ["A QR poster on one location's door", "That location's own link, because the client is standing right there"],
              ["A message to the regulars of one location", "The link of the location the client already visits"],
              ["Business cards or flyers shared across the chain", "The chain booking page"],
            ],
          },
        },
        { img: { src: img("chu-salon-cam-may-tinh-bang-quan-ly-chuoi-salon"), alt: "A woman with curly hair in a purple silk blouse stands by a marble counter holding a tablet, with a bright salon and gilt-framed mirrors behind her", caption: "With the chain link, you only have to remember and share one address for every location." } },
        { p: "How to get each location's link and QR code is covered in the guide to [sharing your booking link](lesson:chia-se-link). To print the code for a door sticker, see the guide to [making a QR poster](lesson:poster-qr)." },
      ],
    },
    {
      id: "everyday-situations",
      title: "Common situations when managing several locations",
      blocks: [
        {
          table: {
            head: ["Situation", "What to do"],
            rows: [
              ["You cannot see the “Branch” picker at the top of the dashboard", "It only appears once the account has two or more branches"],
              ["You are not sure which location you are editing", "Go to “Settings”, “Branches”. The location you are managing is marked “Viewing”"],
              ["A client asks for the booking link without saying which location", "Send the chain booking page so the client chooses the branch"],
              ["The new branch has not had any bookings", "Check that services, staff and opening hours have been added for that branch"],
            ],
          },
        },
        { p: "With several locations, two guides are worth reading next: the [dashboard overview](lesson:tong-quan), to see how the business is doing each morning, and [salon inventory](lesson:kho-hang), where you see how much stock each branch has." },
      ],
    },
  ],
  howTo: {
    title: "Steps to add a branch for multi-location salon management in VaraaAi",
    id: "add-branch-steps",
    after: "before-you-start",
    lead: "The seven steps go from opening “Settings” to having one shared booking link for the whole chain.",
    steps: [
      {
        name: "Go to “Settings” and scroll to “Branches”",
        text: "In the business dashboard, tap “Settings” and scroll down to the “Branches” section. It lists your locations. The one you are managing now is marked “Viewing”.",
        image: { src: shot("branches-section-in-settings"), alt: "The Branches section in Settings outlined in gold, explaining that each branch has its own booking page, calendar and staff, with Lumi Beauty Paris marked Viewing and Add branch below" },
      },
      {
        name: "Press “Add branch”",
        text: "Press “Add branch” just below the list of locations. A form opens for the new branch's details. You stay in your existing account and do not have to register from scratch.",
        image: { src: shot("add-branch-button"), alt: "The Add branch button outlined in gold just below the active salon in the Branches section" },
      },
      {
        name: "Enter the name, short description and category",
        text: "Fill in the branch's “Business name”, write a few lines in “Short description” and choose the “Service category”. Pick a name clients can tell apart from the first location, because two identical names make clients choose the wrong one.",
        image: { src: shot("new-branch-business-name-description"), alt: "The new branch form with the Business name and Short description fields outlined in gold, and Service category set to Spa & massage and the Address field below" },
      },
      {
        name: "Enter the address, country, city and phone number",
        text: "Fill in the address, choose the country, and enter the city and the new branch's phone number. This is the address clients will look for, so include the full street name and number.",
        image: { src: shot("new-branch-country-city-phone"), alt: "The Country field with its time zone note, and the City and Phone number fields of the new branch, outlined in gold above the Submit application button" },
      },
      {
        name: "Press “Submit application”",
        text: "Read everything through once and press “Submit application” at the bottom of the form. The new branch gets its own booking page.",
        image: { src: shot("submit-application-new-branch"), alt: "The bottom of the new branch form with Address, Country, City and Phone number, and the black Submit application button outlined in gold" },
      },
      {
        name: "Add services, staff and opening hours for the new branch",
        text: "Add services, staff and opening hours for that branch, just as you did for your first salon. Only then do clients have something to choose and times to book.",
      },
      {
        name: "Switch with the “Branch” picker and share the chain link",
        text: "Once you have two or more branches, a “Branch” picker appears at the top of the dashboard. Tap it to switch between locations in one tap. In “Settings”, use the chain booking page to get one shared link for clients.",
      },
    ],
  },
  faq: [
    {
      q: "Do I need a new VaraaAi account to open another branch?",
      a: "No. Every branch lives in the same account. You add the new location in the “Branches” section of “Settings” and keep logging in as before.",
    },
    {
      q: "Where do I add a new branch in VaraaAi?",
      a: "Go to “Settings”, scroll to the “Branches” section and press “Add branch”. Fill in the name, short description, service category, address, country, city and phone number, then press “Submit application”.",
    },
    {
      q: "What does each branch have of its own?",
      a: "Each branch has its own booking page, calendar and staff. That keeps each location's calendar and figures separate.",
    },
    {
      q: "How do I switch between branches while managing them?",
      a: "When the account has two or more branches, a “Branch” picker appears at the top of the dashboard. Tap it and choose the location you want to manage.",
    },
    {
      q: "What is the chain booking page for?",
      a: "It is one shared link for the whole chain. Clients open it, choose a branch and then book, so you only share one link instead of several.",
    },
    {
      q: "Can clients book at a new branch as soon as I add it?",
      a: "The new branch has its own booking page as soon as you submit it. Add services, staff and opening hours for that branch, as you did for your first salon, so clients have something to choose.",
    },
  ],
  related: ["tong-quan", "kho-hang", "dang-ky-salon", "chia-se-link"],
};

export default article;
