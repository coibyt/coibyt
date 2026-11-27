import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/san-pham-don-hang/${name}.webp`;
const shot = (name: string) => `/wiki/san-pham-don-hang/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "sell-salon-products-online-and-manage-orders",
  lesson: "san-pham-don-hang",
  category: "salon",
  title: "Sell salon products online: open your salon shop and handle orders in 8 steps",
  metaTitle: "Sell salon products online: your shop and orders",
  metaDescription:
    "How salons sell aftercare products on VaraaAi: add photos and prices, pin featured items, share the shop link and handle orders clients collect at the salon.",
  keyword: "sell salon products online",
  keywords: [
    "salon retail products",
    "online shop for a salon",
    "sell aftercare products in a nail salon",
    "manage salon product orders",
    "order online, collect at the salon",
    "add products to your salon page",
    "retail sales in a beauty salon",
  ],
  excerpt: "Add photos, a name, a description and a price, and the product is in your salon's online shop. Clients order online, collect at the salon, and you mark the order complete.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("san-pham-cham-soc-tren-ke-da-cua-salon"),
    alt: "A dropper bottle of oil and a jar of cream on a marble top beside a purple velvet towel and a gilt-framed mirror",
  },
  takeaways: [
    "The salon shop works as **order online, collect at the salon**, so there is no packing and no posting.",
    "Each product can have **up to 8 photos**, and the first one is the cover.",
    "Switch on **“Featured”** to pin a product to the top of the shop. Switch on **“Sold out”** and it stays visible but cannot be ordered.",
    "When the client collects, open “Orders” and press the button that marks the order **handed over and complete**. The order then counts towards your income.",
    "Keep **“Email the customer”** ticked, and the client gets an email at each step of the order.",
  ],
  intro: [
    "When salons try to sell salon products online, they are usually moving beyond a shelf next to the till that clients only see for a few hurried minutes while paying. Yet a client who has just had a treatment often wants something to use at home, and the person they trust most for advice is the professional who has just looked after them.",
    "This guide follows the VaraaAi Academy lesson “Sell products and manage orders”. You will be able to put a product in your salon's online shop yourself, use the visibility switches, send clients the shop link and handle an order from the moment it is placed until the client collects it at the salon.",
  ],
  sections: [
    {
      id: "why-sell-products",
      title: "Why a salon should sell aftercare products",
      blocks: [
        { p: "A set of nails or a good haircut only lasts if the client looks after it properly at home. The technician recommends a cuticle oil, a hand cream or the right shampoo, and then the client has to go and find it somewhere else. When the salon has exactly the product it recommended, the advice becomes something the client can act on straight away." },
        { p: "The trouble with a shelf in the salon is that clients only see it while they are there. A few weeks later, when the oil runs out, they cannot remember the product's name and it is awkward to drop in and ask. An online shop keeps that shelf open all the time: clients look at the photos, read the description, order on their phone and pick it up on their next visit." },
        { p: "With VaraaAi, the salon has its own shop right on its page. The line at the top of “Products” sums up how it works: clients order online and collect at the salon. There is no shipping, so even a small salon can run it without extra staff. To see what it looks like on the client's side, read the guide to [following a salon and buying its products](lesson:theo-doi-salon)." },
        { note: "“Products” is for goods you sell to clients. Polish, liquids and supplies the team uses at work are tracked elsewhere; see the guide to [salon inventory](lesson:kho-hang).", kind: "info", title: "Not the same as your stock of supplies" },
      ],
    },
    {
      id: "before-you-start",
      title: "What to prepare before adding products to your salon page",
      blocks: [
        { p: "The new product page is split into “Photos”, “Details”, “Pricing” and “Visibility”. Have the following ready and each product takes only a few minutes:" },
        {
          ul: [
            "**Product photos.** Up to 8 photos in JPG, PNG or WebP, max 5MB each. The first photo is the cover, the one clients see before they tap.",
            "**The product name** with its size or volume, so clients can tell two sizes of the same product apart.",
            "**The brand.** This field is optional.",
            "**A description.** The hint in the box suggests three things to include: benefits, key ingredients and how to use it.",
            "**The price**, and the **regular price** if the item is on sale.",
          ],
        },
        { note: "Start with a few products your team already recommends after every appointment. Clients have heard of them and seen them in person, so they are the easiest to order.", kind: "tip", title: "Which products to add first" },
      ],
    },
    {
      id: "photos-and-description",
      title: "Photos, name and description that clients trust",
      blocks: [
        { p: "A client ordering online cannot pick the jar up and look at it. The photos and description have to do that job. Because the first photo is the cover, choose a clear shot of the whole product on a clean background. Use the following photos for the ingredients label, the texture of the cream or the real size next to a hand." },
        {
          table: {
            head: ["Field", "What to write"],
            rows: [
              ["“Product name”", "The name clients use, with the size. The example in the video: Lumi cuticle oil 15 ml"],
              ["“Brand”", "The maker's name, if clients ask by brand. It can be left empty"],
              ["“Description”", "What it is for, key ingredients, how and when to use it"],
              ["“Price”", "The price the client pays at the salon"],
              ["“Regular price (when on sale)”", "Fill in only when the product is discounted"],
            ],
          },
        },
        { p: "Write the description the way you would explain it to a client in the chair: when to apply it, how much and what to avoid. Describe only the benefits the manufacturer states on the packaging, and do not promise treatment results." },
        { p: "At the bottom of the page is “Customers will see”, a preview of the product card with the cover photo and name exactly as they appear in the shop. Check it before saving to catch a typo or a badly cropped cover photo." },
      ],
    },
    {
      id: "featured-sold-out-hidden",
      title: "“Featured”, “Sold out”, “Hide from shop”: which switch to use when",
      blocks: [
        { p: "The “Visibility” section has three switches. They decide whether clients see the product, where they see it and whether they can order it." },
        {
          table: {
            head: ["Switch", "When it is on", "Use it for"],
            rows: [
              ["“Featured”", "The product is pinned to “Customer favourites” at the top of the shop", "Best sellers, new arrivals, items on sale"],
              ["“Sold out”", "The product is still shown but cannot be ordered", "Temporarily out of stock and coming back"],
              ["“Hide from shop”", "Only you see it, in the dashboard", "Not ready to sell, or still being written"],
            ],
          },
        },
        { p: "Knowing the difference between “Sold out” and “Hide from shop” saves an awkward moment: a client orders, arranges a day to collect, and only then learns the item has run out. When something really runs out, switch on “Sold out” that day. Regular clients still see the product in the shop and know it will be back." },
        { img: { src: shot("salon-product-list"), alt: "The salon's product list with Peony hand cream 50 ml at €14.00 and Lumi cuticle oil 15 ml at €18.00 marked Featured, each with a drag handle on the left", caption: "Saved products appear in your list. Drag the handle on the left to reorder them; clients see the shop in this order." } },
        { p: "Do not pin too many items. If everything is featured, clients no longer know what you are recommending. The rest follow the order you set by dragging in the list." },
        { img: { src: shot("customer-favourites-in-shop"), alt: "The salon shop as clients see it, with the Customer favourites section headed Our specialists' picks and a card for Lumi cuticle oil 15 ml at €18.00 marked New" } },
      ],
    },
    {
      id: "manage-orders",
      title: "Managing salon product orders, from order to collection",
      blocks: [
        { p: "When a client orders, the order appears under “Orders”, which opens from the button of the same name at the top of “Products”. Each order is a card that shows four things: who ordered, what they ordered, how they are paying and the client's note. In the video the sample order is paid in cash at the salon, with a note from the client saying they will pick it up on Saturday afternoon." },
        { p: "The card has three connected stages: “Ordered”, “Confirmed” and “Completed”. The highlighted stage tells you where the order stands. At the top of the page, orders are also grouped by status, such as “To confirm” and “Confirmed”, with a search box for customer, product or order number." },
        { img: { src: shot("email-the-customer-checkbox-orders"), alt: "The Orders page with the Email the customer box ticked, the Export to Excel (CSV) button below it and a confirmed order of €18.00 paid in cash at the salon", caption: "“Email the customer” sits just below the search box. Keep it ticked." } },
        { p: "Read the client's note carefully. If they give a day and time, have the product waiting at the desk with their name on it. When they arrive, hand it over, take payment as stated on the order and press the gold button that marks it handed over and complete. The order moves to completed and counts towards your income. If you need paperwork, press “Print slip”." },
        { p: "With “Email the customer” ticked, the client gets an email at each step of the order. They know the salon has seen it and the product is waiting, which saves you follow-up messages." },
      ],
    },
    {
      id: "situations-and-promotion",
      title: "Everyday situations, and getting the shop in front of clients",
      blocks: [
        {
          table: {
            head: ["Situation", "What to do"],
            rows: [
              ["An item is temporarily out of stock", "Switch on “Sold out”. The product stays visible but cannot be ordered"],
              ["An item is on sale", "Enter the new price in “Price” and the old one in “Regular price (when on sale)”"],
              ["You want to see the shop as clients do", "Press “View shop” at the top of “Products”"],
              ["A client will not collect and cancels", "Open the order under “Orders” and press “Cancel order”"],
              ["You need records of your orders", "The “Orders” page has an “Export to Excel (CSV)” button"],
            ],
          },
        },
        { p: "A shop with products still needs people to know about it. “Copy link” gives you the shop's address to send to clients. Three good places to paste it: your reply when a client asks to buy something, a [Fanpage post](lesson:fanpage) about a new arrival, and a [promotional email](lesson:email-marketing) to your regulars with a button that leads to the shop." },
        { p: "In the salon, the most natural introduction is still a word from the technician as the client is leaving: use this at home, and when it runs out, order it on the salon's page and pick it up. If the salon has its [own website](lesson:website-salon), regulars will find the shop again more easily." },
      ],
    },
  ],
  howTo: {
    title: "Steps to sell salon products online through your VaraaAi shop",
    id: "sell-products-steps",
    after: "before-you-start",
    lead: "The first six steps add one product; the last two share the shop and handle an order. The order follows the lesson video.",
    steps: [
      {
        name: "Open “Products” and press “Add product”",
        text: "In the business dashboard, tap “Products”. At the top are “View shop”, “Copy link”, “Orders” and “Add product”, with a few numbers below such as items on sale and views. Press “Add product” to open the form.",
        image: { src: shot("add-product-view-shop-copy-link"), alt: "The Products page in the dashboard with the Add product button outlined in gold next to View shop, Copy link and Orders, and the On sale and Views tiles below" },
      },
      {
        name: "Add photos",
        text: "Under “Photos”, drop pictures into the box or click to choose them from your device. You can add up to 8, and the first is the cover. Put your clearest photo first, because it is what clients see before they read a word.",
        image: { src: shot("add-product-photos-up-to-8"), alt: "The empty Photos box outlined in gold with Drop photos here or click to choose, and the note that the first photo is the cover, up to 8 photos" },
      },
      {
        name: "Fill in “Product name”, “Brand” and “Description”",
        text: "Under “Details”, type the “Product name” and “Brand”. In “Description”, write the benefits, key ingredients and how to use it. Clients cannot ask anyone while ordering online, so the description should answer the questions they usually ask in the salon.",
        image: { src: shot("product-name-brand-description"), alt: "The Details section with the Product name and optional Brand fields outlined in gold, and the Group and Description fields below" },
      },
      {
        name: "Enter the price and the regular price",
        text: "Scroll down to “Pricing”, choose the currency and enter the price. If the product is on sale, also enter the old price in “Regular price (when on sale)”. Leave that field empty when there is no discount.",
        image: { src: shot("product-price-and-regular-price"), alt: "The Pricing section with the currency set to EUR and the Price (EUR) field showing 18 outlined in gold, and the Regular price (when on sale) field below" },
      },
      {
        name: "Switch on “Featured” or “Sold out” if needed",
        text: "Under “Visibility”, switch on “Featured” to pin the product to the top of the shop. When it runs out, switch on “Sold out”: the product stays visible but cannot be ordered. You can change both switches at any time.",
        image: { src: shot("featured-and-sold-out-switches"), alt: "The Visibility section with the Featured switch outlined in gold, and the Sold out and Hide from shop switches below" },
      },
      {
        name: "Press “Save product”",
        text: "Check the “Customers will see” preview at the bottom of the page, then press “Save product”. The product appears in your list and in the salon's shop.",
        image: { src: shot("customers-will-see-save-product"), alt: "The bottom of the product form with the visibility switches, the Video field and the Save product button outlined in gold next to Cancel" },
      },
      {
        name: "Press “View shop” or “Copy link”",
        text: "Go back to the top of “Products”. Press “View shop” to see it as clients do, or “Copy link” to send it to clients by message or on social media. Open the shop once on your own phone before you send the link out.",
      },
      {
        name: "Open “Orders” and mark the order as handed over",
        text: "When an order comes in, open “Orders” to see who ordered, what, how they are paying and their note. When the client collects, press the gold button that marks the order handed over and complete, and “Print slip” if you need it. Only complete an order once the product is really in the client's hands, because completed orders count towards income.",
        image: { src: shot("order-handed-over-print-slip"), alt: "A confirmed order paid in cash at the salon with the client's name, the cuticle oil, the client's note and the gold handed over and complete button outlined next to Print slip" },
      },
    ],
  },
  faq: [
    {
      q: "Where do clients get the products they buy from a salon on VaraaAi?",
      a: "At the salon. The salon shop works as order online, collect at the salon, so nothing needs to be posted. The client orders online and picks the product up at the salon.",
    },
    {
      q: "How many photos can a product have?",
      a: "Up to 8 photos per product. The first photo is the cover, so put the clearest and best one first.",
    },
    {
      q: "What does switching on “Featured” do?",
      a: "The product is pinned to the top of the shop, so clients see it first. Use it for the few items you most want to show, such as best sellers or new arrivals.",
    },
    {
      q: "Should I delete a product that is temporarily out of stock?",
      a: "No. Switch on “Sold out”: the product stays visible in the shop but cannot be ordered. When stock arrives, switch it off and clients can order again.",
    },
    {
      q: "The client has collected the order. What do I press under Orders?",
      a: "Press the gold button on that order that marks it handed over and complete. The order moves to completed and counts towards your income. If you need paperwork, also press “Print slip”.",
    },
    {
      q: "Are clients told when their order changes?",
      a: "Yes, if the “Email the customer” box on the “Orders” page is ticked. The client then gets an email at each step of the order.",
    },
  ],
  related: ["email-marketing", "the-qua-tang-salon", "kho-hang", "fanpage"],
};

export default article;
