import { headers } from "next/headers";

// In-memory fixed-window counters, per server process. Good enough to stop a
// single visitor hammering a free, unauthenticated endpoint (AI translation,
// PDF rendering); not a distributed limiter.
const buckets = new Map<string, { count: number; resetAt: number }>();

/** The caller's IP as seen through the CDN, or "unknown". */
export async function clientIp(): Promise<string> {
  const h = await headers();
  return (h.get("cf-connecting-ip") ?? h.get("x-forwarded-for")?.split(",")[0] ?? h.get("x-real-ip") ?? "unknown").trim();
}

/** Counts one hit for `key`; returns false once `limit` hits have been used
 * within `windowMs`. */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || b.resetAt <= now) {
    if (buckets.size > 10_000) {
      for (const [k, v] of buckets) if (v.resetAt <= now) buckets.delete(k);
    }
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (b.count >= limit) return false;
  b.count++;
  return true;
}
