import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { siteStrings } from "@/lib/site-content";
import { resolveSiteLocale } from "@/lib/site-page";
import { categoryName } from "@/lib/category-names";
import { SITE, absoluteUrl, metaDescription } from "@/lib/seo";

export type SitePageKey = "home" | "services" | "booking" | "about" | "contact";

const PATH: Record<SitePageKey, string> = {
  home: "",
  services: "/services",
  booking: "/booking",
  about: "/about",
  contact: "/contact",
};

/** Title, description, share image, favicon and canonical link for a page
 * of a salon's own website (/site/[slug]/…). An unpublished site (the
 * owner's preview) is kept out of search results. */
export async function siteMetadata(slug: string, rawLocale: string | undefined, page: SitePageKey): Promise<Metadata> {
  const b = await prisma.business.findUnique({
    where: { slug },
    select: {
      name: true,
      status: true,
      description: true,
      city: true,
      logoUrl: true,
      coverUrl: true,
      defaultLocale: true,
      landingPage: { select: { published: true } },
      categories: { select: { category: { select: { nameVi: true, nameEn: true } } } },
    },
  });
  if (!b || b.status !== "APPROVED" || !b.landingPage) return { robots: { index: false } };

  const locale = resolveSiteLocale(rawLocale, b.defaultLocale);
  const s = siteStrings(locale);
  const cats = b.categories.map((c) => categoryName(locale, c.category)).slice(0, 2).join(" & ");
  const home = `${b.name}${cats ? ` – ${cats}` : ""}${b.city ? `, ${b.city}` : ""}`;
  const label: Record<SitePageKey, string> = {
    home,
    services: s.navServices,
    booking: s.bookingPageTitle,
    about: s.aboutPageTitle,
    contact: s.contactPageTitle,
  };
  const title = page === "home" ? home : `${label[page]} | ${b.name}`;
  const fallback: Record<SitePageKey, string> = {
    home: s.servicesPageSubtitleFallback,
    services: s.servicesPageSubtitleFallback,
    booking: s.bookingPageSubtitleFallback,
    about: s.aboutPageSubtitleFallback,
    contact: s.contactPageSubtitleFallback,
  };
  const description = metaDescription(page === "home" || page === "about" ? b.description || fallback[page] : `${fallback[page]} ${b.name}${b.city ? `, ${b.city}` : ""}.`);
  // The site takes its language from ?locale=; the salon's own language is
  // the plain address.
  const url = `${SITE}/site/${slug}${PATH[page]}${locale === b.defaultLocale ? "" : `?locale=${locale}`}`;
  const image = absoluteUrl(b.coverUrl) ?? absoluteUrl(b.logoUrl);
  const logo = absoluteUrl(b.logoUrl);

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: b.landingPage.published ? undefined : { index: false, follow: false },
    openGraph: { type: "website", title, description, url, siteName: b.name, ...(image ? { images: [image] } : {}) },
    ...(logo ? { icons: { icon: logo, apple: logo } } : {}),
  };
}
