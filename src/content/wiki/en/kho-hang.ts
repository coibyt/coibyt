import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/kho-hang/${name}.webp`;
const shot = (name: string) => `/wiki/kho-hang/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "salon-inventory-management-scan-in-scan-out",
  lesson: "kho-hang",
  category: "salon",
  title: "Salon inventory management on your phone: scan stock in, scan it out and print a shopping list",
  metaTitle: "Salon inventory management: scan in, scan out, to buy",
  metaDescription:
    "How to track salon supplies with VaraaAi: add items, set minimum levels, scan stock in and out with your phone, do a stock-take and print what to buy.",
  keyword: "salon inventory management",
  keywords: [
    "nail salon inventory",
    "track salon supplies",
    "gel polish stock tracking",
    "what is a minimum stock level",
    "scan barcodes with your phone",
    "salon shopping list for supplies",
    "monthly stock-take in a salon",
  ],
  excerpt: "Know what the salon has, which cupboard it is in and what to buy, all from your phone: scan when stock arrives, scan when you take it out, count at the end of the month.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("salon-toc-dong-khach-can-quan-ly-vat-tu"),
    alt: "A large hair salon with high ceilings and arched windows, where several stylists work on clients seated in a row of chairs in front of mirrors",
  },
  takeaways: [
    "The **“Minimum”** is the most important number for each item: when the quantity drops to it, the item goes on the shopping list by itself.",
    "When stock arrives, press **“Scan in”**; when you take something out to use, press **“Scan out”**. If scanning is awkward, use “+1” or “−1”.",
    "For something new that is not in stock yet, **take a photo of the product**: AI reads the name, brand and colour, and you only enter the quantity.",
    "At the end of the month, count what is in the cupboard, enter it under “Count” and press **“Update the count”**.",
    "The **“To buy”** tab gathers everything that has reached its minimum, with an estimated cost, ready to copy or print.",
  ],
  intro: [
    "Salon inventory management usually only comes to mind at the worst moment: in the middle of a treatment, you find the gel polish or the remover has run out. Most salons still track supplies in one person's head, and that person cannot count cupboards while looking after clients.",
    "This guide follows the VaraaAi Academy lesson “Inventory: scan in, scan out”. You will set up the salon's supplies on your phone, give each item a minimum level, record stock coming in and going out by scanning, and get a shopping list before every trip to the supplier.",
  ],
  sections: [
    {
      id: "why-track-supplies",
      title: "Why nail and hair salons need to track supplies",
      blocks: [
        { p: "A nail salon uses a lot of small items: gel polish in every shade, base, top coat, remover, cotton pads, foil. Hair salons and spas are the same with colour, shampoo and wax. Each item is cheap, but one missing item means turning down a service or changing the colour a client chose." },
        { p: "Without tracking, three things tend to happen. A popular item runs out and nobody says so. Another one gets bought twice because no one was sure whether there was any left. And bottles sit at the back of a drawer until they are found past their expiry date." },
        { p: "VaraaAi's stock answers three questions: what the salon has, where it is kept and what to buy, all from your phone. The top of the “Stock” page has four tiles: “Items”, “Running low”, “Out of stock” and “Taken in 7 days”. Below them is the stock value." },
        { img: { src: shot("your-salons-supplies-items-running-low"), alt: "The Your salon's supplies screen with the four tiles Items, Running low, Out of stock and Taken in 7 days outlined in gold, and the stock value below", caption: "The four tiles at the top of “Stock”. “Running low” and “Out of stock” are the two to check every morning." } },
        { note: "Stock is for things the salon uses at work. Products you sell for clients to take home are listed elsewhere; see the guide to [selling products and managing orders](lesson:san-pham-don-hang).", kind: "info", title: "Supplies, not retail products" },
      ],
    },
    {
      id: "before-you-start",
      title: "What to prepare before setting up stock on your phone",
      blocks: [
        {
          ul: [
            "**A phone with a camera**, because adding and taking stock are both done by scanning.",
            "**A list of supplies by type.** Walk past the cupboards and note them down, for example gel polish, regular polish, liquids.",
            "**A counting unit for each item.** In the video, gel polish is counted in bottles. Pick units the whole team understands the same way.",
            "**A minimum for each item**, meaning how many are left when it is time to buy more.",
            "**Names of cupboards and shelves**, if you also want to record where things are kept.",
          ],
        },
        { p: "You do not need to enter the whole stock in one session. Start with the items that would stop work if they ran out, and add the rest gradually as new deliveries arrive." },
      ],
    },
    {
      id: "minimum-level",
      title: "What a minimum stock level is and how high to set it",
      blocks: [
        { p: "The minimum is an item's warning line. The note just under the “Minimum” field says it plainly: at or below this, it goes on the shopping list. That way you buy more before you run out, not after a technician opens the cupboard and finds an empty shelf." },
        { img: { src: shot("set-minimum-level-for-item"), alt: "The new item form with Counted in set to bottles and the Minimum field showing 2 outlined in gold, with the note At or below this it goes on the shopping list", caption: "The example in the video: a gel polish shade counted in bottles, with a minimum of 2." } },
        { p: "The lesson gives no single number, because every item is different. A practical way to think about it: how many of this item does the salon use between placing an order and the delivery arriving? The minimum should cover that wait." },
        {
          table: {
            head: ["Type of supply", "Suggestion for the minimum"],
            rows: [
              ["Used every day, such as base, top coat, remover", "Set it higher, because running out stops the whole salon"],
              ["Shades few clients choose", "Set it low, so bottles do not sit until they expire"],
              ["Hard to get, ordered from far away", "Set it to cover the whole delivery time"],
            ],
          },
        },
        { p: "The table is this guide's suggestion, not a rule of the software. After a month or two you will see which items reach the “To buy” tab too late, and raise their minimum." },
      ],
    },
    {
      id: "scan-photo-or-tap",
      title: "Scan a barcode, take a photo or tap: which to use when",
      blocks: [
        { p: "Stock is only accurate if every item in and out is recorded. That is why there are several ways to record it, so there is always one quick enough." },
        {
          table: {
            head: ["Situation", "What to do"],
            rows: [
              ["A delivery arrives, the item is already in stock", "Press “Scan in” and hold the product's barcode up to the camera"],
              ["A delivery arrives, the item is new", "Take a photo of the product. AI reads the name, brand and colour, and you add the quantity"],
              ["You take a bottle out to use", "Press “Scan out” and scan the code"],
              ["Your hands are busy and scanning is awkward", "Tap the item in the list, then tap “−1” or “+1”"],
              ["The product has no barcode", "Print a QR label for it under “Cupboards & labels” and stick it on"],
            ],
          },
        },
        { note: "After photographing a new item, read the name, brand and colour before saving. Shades close to each other are easy to confuse, and a wrong name follows that item into every list afterwards.", kind: "tip", title: "Check after the photo" },
      ],
    },
    {
      id: "count-cupboards-expiry",
      title: "Monthly stock-take, cupboards and expiry dates",
      blocks: [
        { p: "However carefully the team scans, the number on screen and the bottles in the cupboard drift apart: a bottle gets spilled, a scan is forgotten. The stock-take is when you correct it. The lesson suggests doing it at the end of the month: count what is really in the cupboard, enter the number under “Count” and press “Update the count”." },
        { p: "On the same screen for each item, you can record which cupboard it is “Kept in” and its expiry date. The location lets a new team member find things without asking. The expiry date lets you use up bottles that are close to expiring and remove ones that have expired, instead of finding out in the middle of a treatment." },
        { img: { src: shot("cupboards-and-qr-labels"), alt: "The Cupboards & labels tab with This branch's cupboards, a field to name a cupboard, the Add button and the Print cupboard QR labels and Print QR labels for items without a barcode buttons outlined in gold", caption: "The “Cupboards & labels” tab: create cupboards and shelves, then print QR labels to stick on them." } },
        { p: "The “Cupboards & labels” tab is where you create cupboards and shelves and print QR labels for them. When scanning in, scan the cupboard label first and the items are filed in that cupboard automatically. That is much faster than choosing a location for every item." },
      ],
    },
    {
      id: "to-buy-and-history",
      title: "The supplies shopping list and the history of stock in and out",
      blocks: [
        { p: "The “To buy” tab gathers everything at or below its minimum. Each row shows how many are left, the minimum and a suggested quantity to buy. At the top of the list is an estimated cost, so you know roughly what this trip to the supplier will cost." },
        { p: "There are two buttons from here. “Copy the list” suits ordering from a supplier by message or email. “Print the list” suits going to collect the stock yourself with a sheet of paper to tick off line by line." },
        { img: { src: shot("stock-history-who-took-what"), alt: "The History tab of the stock listing two counts of gel polish, nude pink and wine red, with the date and time, the name of the person and the change in quantity", caption: "The “History” tab records each change: which item, when, who and by how much." } },
        { p: "The “History” tab records who added or took stock, and when. It is not there to watch your staff. Its value is that when a number is off, you can trace what happened instead of guessing." },
        { p: "Stock only works when the whole salon shares one habit: whoever takes something scans it. Make that clear when you [add staff](lesson:nhan-vien), and if the salon already uses [team tools](lesson:tien-ich-nhom), post an announcement or a short training on how to scan. Salons with several locations should also read the guide to [multiple branches](lesson:chi-nhanh), because stock shows what each branch has." },
      ],
    },
  ],
  howTo: {
    title: "Steps for salon inventory management in VaraaAi",
    id: "stock-steps",
    after: "before-you-start",
    lead: "The seven steps follow the order of the lesson video: set up the stock, record what comes in, record what goes out, count and go shopping.",
    steps: [
      {
        name: "Open “Stock”",
        text: "In the business dashboard, tap “Stock”. At the top are the number of items, what is running low, what is out of stock and the stock value. Look at these numbers before doing anything else in the stock.",
      },
      {
        name: "Press “Add an item” and fill it in",
        text: "Press “Add an item”, fill in the name, colour or shade, brand, type, what it is counted in and the “Minimum”, then press “Save”. Include the colour code in the shade field, because with gel polish the colour name alone is not enough to tell shades apart.",
      },
      {
        name: "Stock arrives: press “Scan in”",
        text: "When a delivery arrives, press “Scan in” and hold the product's barcode up to the camera. Scan as soon as you open the box, before putting things in the cupboard. Leave it until the end of the day and something will be missed.",
        image: { src: shot("scan-in-and-scan-out-buttons"), alt: "The Stock page with the green Scan in button outlined in gold, the pink Scan out button next to it and the Add an item button below" },
      },
      {
        name: "Something new: take a photo of the product",
        text: "If the item that has arrived is not in stock yet, press “Take a photo of the product”. AI reads the name, brand and colour, and you only enter the quantity. The scan screen also has a field to type the barcode by hand when the camera does not open.",
        image: { src: shot("scan-barcode-or-take-photo"), alt: "The scan screen with the Scan in, Scan out and Count tabs, the camera frame outlined in gold and the Take a photo of the product button below" },
      },
      {
        name: "Taking stock out: “Scan out” or “−1”",
        text: "Each time you take something out to use, press “Scan out” and scan the code. If scanning is awkward, tap the item in the list and then “−1”. Tap “+1” if you put back something unused.",
        image: { src: shot("plus-one-minus-one-buttons"), alt: "The screen for a wine red gel polish with 6 bottles left and a minimum of 2, with the −1 and +1 buttons outlined in gold" },
      },
      {
        name: "Count and press “Update the count”",
        text: "Tap an item, count what is really in the cupboard, enter it under “Count” and press “Update the count”. Just below, you can record which cupboard it is kept in and its expiry date.",
        image: { src: shot("count-and-update-the-count"), alt: "The Count section with the number 6 and the Update the count button outlined in gold, and the Kept in and Expiry date (if any) fields below" },
      },
      {
        name: "Open “To buy” before you go to the supplier",
        text: "Open the “To buy” tab to see everything that has reached its minimum, with an estimated cost. Press “Copy the list” or “Print the list” and off you go. When the stock arrives, go back to the scan-in step.",
        image: { src: shot("to-buy-shopping-list"), alt: "The To buy tab with the Shopping list, the estimated cost of €30.00 and the Copy the list and Print the list buttons outlined in gold, and two items to buy below" },
      },
    ],
  },
  faq: [
    {
      q: "What is the minimum level in stock for?",
      a: "It is the level that says it is time to buy more. When an item's quantity drops to its minimum, it goes on the shopping list by itself, so you restock before you run out.",
    },
    {
      q: "What is the quickest way to add something new to stock?",
      a: "Press “Scan in” and choose “Take a photo of the product”. AI reads the product's name, brand and colour, and you only need to enter the quantity.",
    },
    {
      q: "What if scanning a barcode is awkward when I take something out?",
      a: "Tap the item in the list, then tap “−1” when you take one out or “+1” when you add one. The quantity updates without holding the barcode up to the camera.",
    },
    {
      q: "Where do I see which supplies need buying?",
      a: "In the “To buy” tab on the “Stock” page. It gathers the items that have reached their minimum, with an estimated cost. Press “Copy the list” or “Print the list” to take it with you.",
    },
    {
      q: "How often should a salon do a stock-take?",
      a: "The lesson suggests the end of each month. Count what is in the cupboard, enter the number under “Count” for each item and press “Update the count”.",
    },
    {
      q: "Can I see who took something from stock?",
      a: "Yes. The “History” tab records who added or took stock, and when. When a quantity is off, check this tab to see where the change came from.",
    },
    {
      q: "What are the cupboard QR labels for?",
      a: "Under “Cupboards & labels” you create cupboards and shelves and print QR labels to stick on them. When scanning in, scan the cupboard label first and the items are filed there, so everyone knows where each item is kept.",
    },
  ],
  related: ["chi-nhanh", "tong-quan", "san-pham-don-hang", "nhan-vien"],
};

export default article;
