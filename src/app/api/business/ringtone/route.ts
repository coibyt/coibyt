import { NextResponse } from "next/server";
import { getBusinessAccess } from "@/lib/current-business";
import { getRingtoneSetting } from "@/lib/ringtone-settings";
import { DEFAULT_RINGTONE } from "@/lib/ringtones";

/** The ringtone the booking alarm should use for the signed-in salon owner or staff member (chosen by the admin). */
export async function GET() {
  const access = await getBusinessAccess();
  if (!access) return NextResponse.json({ id: DEFAULT_RINGTONE });
  return NextResponse.json({ id: await getRingtoneSetting(access.isOwner ? "owner" : "staff") });
}
