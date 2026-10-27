import { createHmac, timingSafeEqual } from "crypto";

// Deterministic per-user token so the unsubscribe link needs no DB lookup or
// storage of its own — anyone can recompute it from the userId, but only
// with APP_SECRET, so a customer can't unsubscribe someone else by guessing
// their id. Reuses APP_SECRET (already provisioned — see cron/reminders)
// rather than adding a new env var.
export function unsubscribeToken(userId: string): string {
  const secret = process.env.APP_SECRET ?? "";
  return createHmac("sha256", secret).update(userId).digest("hex").slice(0, 32);
}

export function isValidUnsubscribeToken(userId: string, token: string): boolean {
  const expected = unsubscribeToken(userId);
  const a = Buffer.from(expected);
  const b = Buffer.from(token);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Token in a campaign email's open pixel and tracked links: which campaign
 * and which recipient, signed so stats can't be inflated by guessing ids. */
export function trackingToken(campaignId: string, customerId: string): string {
  const payload = Buffer.from(`${campaignId}.${customerId}`).toString("base64url");
  const sig = createHmac("sha256", process.env.APP_SECRET ?? "").update(`track:${payload}`).digest("base64url").slice(0, 16);
  return `${payload}.${sig}`;
}

export function readTrackingToken(token: string): { campaignId: string; customerId: string } | null {
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = createHmac("sha256", process.env.APP_SECRET ?? "").update(`track:${payload}`).digest("base64url").slice(0, 16);
  const a = Buffer.from(expected);
  const b = Buffer.from(sig);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  const [campaignId, customerId] = Buffer.from(payload, "base64url").toString().split(".");
  return campaignId && customerId ? { campaignId, customerId } : null;
}
