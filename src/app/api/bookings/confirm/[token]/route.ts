import { NextResponse } from "next/server";
import { z } from "zod";
import { cancelByCustomerToken, confirmByCustomer } from "@/lib/booking-protect";

const schema = z.object({ action: z.enum(["confirm", "cancel"]) });

/** The customer's answer to the 24h confirm request — by the secret token
 * in the email / push links, so no sign-in is needed on a phone. */
export async function POST(req: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });

  if (parsed.data.action === "confirm") {
    const b = await confirmByCustomer(token);
    if (!b) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    return NextResponse.json({ ok: true });
  }

  const result = await cancelByCustomerToken(token);
  if (result === "gone") return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  if (result === "too_late") return NextResponse.json({ error: "CANCELLATION_WINDOW_PASSED" }, { status: 409 });
  return NextResponse.json({ ok: true });
}
