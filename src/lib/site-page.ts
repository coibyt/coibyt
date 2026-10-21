import { notFound } from "next/navigation";
import { Prisma } from "@prisma/client";
import { auth } from "@/auth";
import { isValidLocale } from "@/i18n/is-valid-locale";
import { routing } from "@/i18n/routing";

/** What every /site/* page needs for its header, footer and colours. */
export const SITE_BUSINESS_SELECT = Prisma.validator<Prisma.BusinessSelect>()({
  id: true,
  ownerId: true,
  slug: true,
  name: true,
  description: true,
  logoUrl: true,
  status: true,
  defaultLocale: true,
  timezone: true,
  addressLine: true,
  city: true,
  phone: true,
  email: true,
  website: true,
  googleMapsUrl: true,
  facebookUrl: true,
  instagramUrl: true,
  tiktokUrl: true,
  youtubeUrl: true,
  whatsapp: true,
  hours: { select: { weekday: true, openMinute: true, closeMinute: true } },
  landingPage: { select: { id: true, published: true, theme: true } },
});

export type SiteBusiness = Prisma.BusinessGetPayload<{ select: typeof SITE_BUSINESS_SELECT }>;

export function resolveSiteLocale(raw: string | undefined, businessDefault: string) {
  return isValidLocale(raw) ? raw : isValidLocale(businessDefault) ? businessDefault : routing.defaultLocale;
}

/** 404s unless the site is live — except for its own owner, who sees an
 * unpublished site as a preview while they build it. */
export async function siteAccess(business: {
  status: string;
  ownerId: string;
  landingPage: { published: boolean } | null;
} | null): Promise<{ preview: boolean }> {
  if (!business || business.status !== "APPROVED" || !business.landingPage) notFound();
  if (business.landingPage.published) return { preview: false };
  const session = await auth();
  if (session?.user?.id && session.user.id === business.ownerId) return { preview: true };
  notFound();
}

/** The salon's local weekday and minute of the day right now. */
export function salonNow(timezone: string) {
  let parts: Intl.DateTimeFormatPart[];
  try {
    parts = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(new Date());
  } catch {
    parts = new Intl.DateTimeFormat("en-US", { weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
  }
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { weekday: Math.max(0, weekday), minute: Number(get("hour")) * 60 + Number(get("minute")) };
}

/** Whether the salon is open right now, and when it opens next today. */
export function openStatus(
  hours: { weekday: number; openMinute: number; closeMinute: number }[],
  timezone: string
): { open: boolean; opensAtMinute: number | null; weekday: number } | null {
  if (hours.length === 0) return null;
  const now = salonNow(timezone);
  const today = hours.filter((h) => h.weekday === now.weekday);
  const open = today.some((h) => now.minute >= h.openMinute && now.minute < h.closeMinute);
  const later = today.filter((h) => h.openMinute > now.minute).sort((a, b) => a.openMinute - b.openMinute)[0];
  return { open, opensAtMinute: open ? null : (later?.openMinute ?? null), weekday: now.weekday };
}

/** A Google Maps embed for the salon's address — no API key needed. */
export function mapEmbedUrl(business: { name: string; addressLine: string | null; city: string | null }) {
  const q = [business.addressLine, business.city].filter(Boolean).join(", ");
  if (!q) return null;
  return `https://maps.google.com/maps?q=${encodeURIComponent(`${business.name}, ${q}`)}&z=15&output=embed`;
}

export function directionsUrl(business: { name: string; addressLine: string | null; city: string | null; googleMapsUrl: string | null }) {
  if (business.googleMapsUrl) return business.googleMapsUrl;
  const q = [business.name, business.addressLine, business.city].filter(Boolean).join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}
