import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isValidUnsubscribeToken } from "@/lib/marketing-email";

function page(body: string) {
  return new NextResponse(
    `<!doctype html><html><head><meta charset="utf-8"/><title>VaraaAi.Com</title>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
    </head><body style="font-family:sans-serif;max-width:480px;margin:80px auto;text-align:center;color:#25302f">
      <h2 style="color:#624f89">VaraaAi.Com</h2>
      <p>${body}</p>
    </body></html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("u");
  const token = url.searchParams.get("t");

  if (!userId || !token || !isValidUnsubscribeToken(userId, token)) {
    return page("Liên kết không hợp lệ hoặc đã hết hạn. / Invalid or expired link.");
  }

  await prisma.user.updateMany({ where: { id: userId }, data: { marketingOptOut: true } });

  return page(
    "Bạn đã hủy nhận email quảng cáo thành công. Bạn vẫn sẽ nhận được email liên quan đến lịch hẹn của mình.<br/><br/>" +
      "You've been unsubscribed from marketing emails. You'll still receive emails about your own bookings."
  );
}
