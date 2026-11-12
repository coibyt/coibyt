import { prisma } from "@/lib/prisma";
import { SITE } from "@/lib/seo";

// Lists the live salons, so it is built per request (and cached for an hour).
export const dynamic = "force-dynamic";

/** /llms.txt — a short plain-text guide to VaraaAi for AI assistants
 * (llmstxt.org): what the site is, who it is for, and the pages worth reading. */
export async function GET() {
  const salons = await prisma.business
    .findMany({
      where: { status: "APPROVED" },
      select: { slug: true, name: true, city: true, categories: { select: { category: { select: { slug: true } } } } },
      orderBy: { updatedAt: "desc" },
      take: 200,
    })
    .catch(() => []);

  const lines = [
    "# VaraaAi",
    "",
    "> VaraaAi (varaaai.com) is a free online booking platform and salon-management system for beauty businesses: nail salons, hair salons, lash and brow studios, spas, massage and skincare clinics. Customers find a salon and book an appointment 24/7; salon owners get an online booking page, a calendar, staff and income tools, loyalty cards, gift cards, marketing and their own website. It is available in Finnish, English and Vietnamese and is used mainly in Finland and Vietnam.",
    "",
    "Key facts:",
    "- For salon owners VaraaAi is free: sign-up, online bookings, staff, reminders, loyalty cards, gift cards and the salon's own website, with no credit card, no hidden fees and no booking limits.",
    "- Customers book without phone calls: real free times, instant confirmation, reminders, and reviews only from people who actually booked.",
    "- Languages: the main ones are Finnish (/fi), English (/en) and Vietnamese (no prefix); the interface is available in 35 languages. The same page exists in each language.",
    "- Each salon has a public profile at /b/{salon} with services, prices, opening hours, address, reviews and a Book button.",
    "",
    "## For customers",
    `- [Find and book a salon](${SITE}/en): search by service, city or \u201cnear me\u201d`,
    `- [Search salons](${SITE}/en/search): filter by category (nails, hair, lashes and brows, spa and massage, skincare, makeup, wellness) and city`,
    `- [All salons, services and cities](${SITE}/en/directory)`,
    `- [VaraaAi app](${SITE}/en/app): install on iPhone or Android`,
    "",
    "## For salon owners",
    `- [VaraaAi for salons](${SITE}/en/business): every feature, how to start, and frequently asked questions`,
    `- [Free loyalty cards](${SITE}/en/loyalty-lite): QR stamp cards for salon customers, ready in 30 seconds`,
    `- [Free multilingual price list maker](${SITE}/en/tools/price-list): up to 3 languages side by side, AI translation, booking QR code, printable PDF`,
    `- [Free QR booking poster maker](${SITE}/en/tools/qr-poster)`,
    `- [Free salon check](${SITE}/en/salon-check): scores a salon's website, Google, Facebook and Instagram presence in 60 seconds`,
    `- [Help centre](${SITE}/en/help/getting-started): step-by-step guides to every feature`,
    `- [Support](${SITE}/en/support)`,
    "",
    "## Salons on VaraaAi",
    ...salons.map((s) => {
      const cats = s.categories.map((c) => c.category.slug).join(", ");
      const where = [s.city?.trim(), cats].filter(Boolean).join(" \u2014 ");
      return `- [${s.name}](${SITE}/en/b/${s.slug})${where ? `: ${where}` : ""}`;
    }),
    "",
    "## Policies",
    `- [Privacy](${SITE}/en/privacy)`,
    `- [Terms](${SITE}/en/terms)`,
    `- [Sitemap](${SITE}/sitemap.xml)`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
