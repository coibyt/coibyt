import { z } from "zod";
import { INVENTORY_CATEGORIES, INVENTORY_UNITS } from "@/lib/inventory";

/** An item as typed in the stock page — shared by create and edit. */
export const itemFieldsSchema = z.object({
  name: z.string().trim().min(1).max(160),
  brand: z.string().trim().max(80).optional().default(""),
  category: z.enum(INVENTORY_CATEGORIES).nullable().optional().default(null),
  unit: z.enum(INVENTORY_UNITS).optional().default("pcs"),
  barcode: z.string().trim().max(64).optional().default(""),
  minQty: z.number().int().min(0).max(100000).optional().default(0),
  // What one unit costs to buy, smallest currency unit; null = not set.
  costCents: z.number().int().min(0).max(100_000_000).nullable().optional().default(null),
  note: z.string().trim().max(500).optional().default(""),
  // A JPEG/PNG/WebP data URL, already shrunk in the browser; null removes it.
  photo: z.string().max(900_000).nullable().optional(),
});

/** "YYYY-MM-DD" (an expiry date) → a Date at UTC midnight. */
export const expiryDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
export const toDate = (d: string | null | undefined) => (d ? new Date(`${d}T00:00:00Z`) : d === null ? null : undefined);

/** "data:image/jpeg;base64,…" → bytes and type, or null when it isn't one. */
export function decodePhoto(dataUrl: string | null | undefined) {
  const m = dataUrl?.match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/);
  if (!m) return null;
  const bytes = Buffer.from(m[2], "base64");
  return bytes.length > 0 && bytes.length <= 600_000 ? { bytes, mime: m[1] } : null;
}
