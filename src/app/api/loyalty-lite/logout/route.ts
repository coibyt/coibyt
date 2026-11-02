import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { LITE_COOKIE } from "@/lib/loyalty-lite";

export async function POST() {
  (await cookies()).delete(LITE_COOKIE);
  return NextResponse.json({ ok: true });
}
