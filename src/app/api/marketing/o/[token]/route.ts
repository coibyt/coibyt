import { readTrackingToken } from "@/lib/marketing-email";
import { recordCampaignEvent } from "@/lib/marketing-send";

const GIF = Buffer.from("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "base64");

/** The invisible image in a campaign email: counts the recipient's open. */
export async function GET(_req: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const t = readTrackingToken(token.replace(/\.gif$/i, ""));
  if (t) await recordCampaignEvent(t.campaignId, t.customerId, "OPEN");
  return new Response(new Uint8Array(GIF), {
    headers: { "Content-Type": "image/gif", "Cache-Control": "no-store, max-age=0" },
  });
}
