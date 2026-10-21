import webPush from "web-push";
import { prisma } from "@/lib/prisma";

let configured = false;

function ensureConfigured(): boolean {
  if (configured) return true;
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const subject = process.env.VAPID_SUBJECT;
  if (!publicKey || !privateKey || !subject) return false;
  webPush.setVapidDetails(subject, publicKey, privateKey);
  configured = true;
  return true;
}

/** Pushes a real OS-level notification to every device a user has
 * subscribed from (see POST /api/push/subscribe) — e.g. "a customer wants to
 * talk to you" while they don't have the dashboard open. Silently does
 * nothing if VAPID isn't configured or the user has no subscriptions; a
 * subscription the push service reports as gone (410/404) is deleted so it
 * stops being retried. Never throws — this is always a best-effort nudge
 * alongside the real notification (email), never something a caller should
 * need to handle failure for. */
export async function sendPushToUser(
  userId: string,
  payload: { title: string; body: string; url?: string; tag?: string; urgent?: boolean; vibrate?: number[] }
): Promise<void> {
  if (!ensureConfigured()) return;

  const subscriptions = await prisma.pushSubscription.findMany({ where: { userId } });
  if (subscriptions.length === 0) return;

  await Promise.all(
    subscriptions.map(async (sub) => {
      try {
        await webPush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          JSON.stringify(payload),
          // "high" wakes a sleeping phone right away instead of batching.
          payload.urgent ? { urgency: "high", TTL: 60 * 60 } : undefined
        );
      } catch (err) {
        const statusCode = (err as { statusCode?: number } | null)?.statusCode;
        if (statusCode === 404 || statusCode === 410) {
          await prisma.pushSubscription.delete({ where: { id: sub.id } }).catch(() => {});
        } else {
          console.error("[push] send failed", err);
        }
      }
    })
  );
}
