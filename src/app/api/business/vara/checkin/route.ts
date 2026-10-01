import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { claimDailyCheckin } from "@/lib/vara-points";

export async function POST() {
  const session = await auth();
  if (!session?.user || session.user.role !== "BUSINESS_OWNER") {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }

  const newBalance = await claimDailyCheckin(session.user.id);
  if (newBalance === null) {
    return NextResponse.json({ error: "ALREADY_CHECKED_IN" }, { status: 409 });
  }

  return NextResponse.json({ varaPoints: newBalance });
}
