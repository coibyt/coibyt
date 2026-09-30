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
