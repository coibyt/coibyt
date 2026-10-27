import { z } from "zod";
import { SEGMENTS } from "@/lib/marketing-segments";

/** What the owner writes in the marketing studio — validated the same way
 * for preview, test sends, sending now and scheduling. */
export const campaignContentSchema = z.object({
  subject: z.string().trim().min(1).max(150),
  preheader: z.string().trim().max(200).optional().default(""),
  headline: z.string().trim().max(160).optional().default(""),
  message: z.string().trim().min(1).max(5000),
  imageId: z.string().trim().max(40).nullable().optional().default(null),
  ctaKind: z.enum(["NONE", "BOOK", "URL"]).default("BOOK"),
  ctaLabel: z.string().trim().max(60).optional().default(""),
  ctaUrl: z
    .string()
    .trim()
    .max(500)
    .optional()
    .default("")
    .refine((u) => u === "" || /^https?:\/\/[^\s]+$/i.test(u), "INVALID_URL"),
  offerTitle: z.string().trim().max(80).optional().default(""),
  offerCode: z.string().trim().max(40).optional().default(""),
  offerExpires: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .nullable()
    .optional()
    .default(null),
  segment: z.enum(SEGMENTS).default("ALL"),
  includeCooldown: z.boolean().optional().default(false),
});

export type CampaignContent = z.infer<typeof campaignContentSchema>;

/** `{ten}` / `{name}` / `{nimi}` in the subject or text become the
 * recipient's first name (or a friendly fallback when there's none). */
export function personalize(text: string, name: string | null, fallback: string) {
  const first = name?.trim().split(/\s+/)[0] || fallback;
  return text.replace(/\{\s*(ten|tên|name|nimi)\s*\}/gi, first);
}

/** The stored columns for a campaign's content. */
export function campaignColumns(c: CampaignContent) {
  return {
    subject: c.subject,
    preheader: c.preheader || null,
    headline: c.headline || null,
    message: c.message,
    imageId: c.imageId || null,
    ctaKind: c.ctaKind,
    ctaLabel: c.ctaLabel || null,
    ctaUrl: c.ctaKind === "URL" ? c.ctaUrl || null : null,
    offerTitle: c.offerTitle || null,
    offerCode: c.offerCode || null,
    offerExpires: c.offerExpires ? new Date(`${c.offerExpires}T23:59:59Z`) : null,
    segment: c.segment,
    includeCooldown: c.includeCooldown,
  };
}
