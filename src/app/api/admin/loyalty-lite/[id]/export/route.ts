import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

/** Admin: a Loyalty Lite salon's customers or staff as CSV (opens in Excel). */
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const { id } = await params;
  const kind = new URL(req.url).searchParams.get("kind") === "staff" ? "staff" : "customers";
  const salon = await prisma.liteSalon.findUnique({ where: { id }, select: { salonName: true } });
  if (!salon) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  const cell = (v: string | number | null | undefined) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const iso = (d: Date | null) => (d ? d.toISOString().slice(0, 16).replace("T", " ") : "");
  let rows: (string | number | null)[][];
  if (kind === "staff") {
    const staff = await prisma.liteStaff.findMany({ where: { liteSalonId: id }, orderBy: { createdAt: "asc" } });
    rows = [["Tên", "Email", "Trạng thái", "Tạo ngày", "Đăng nhập gần nhất"], ...staff.map((s) => [s.name, s.email, s.active ? "Hoạt động" : "Tạm khoá", iso(s.createdAt), iso(s.lastSeenAt)])];
  } else {
    const cards = await prisma.liteCard.findMany({ where: { liteSalonId: id }, orderBy: { createdAt: "asc" } });
    rows = [
      ["Khách hàng", "Email", "Mã thẻ", "Dấu hiện có", "Tổng dấu", "Ưu đãi đã đổi", "Cấp ngày", "Lần đóng dấu cuối"],
      ...cards.map((c) => [c.customerName, c.customerEmail, c.token, c.stamps, c.totalStamps, c.rewardsUsed, iso(c.createdAt), iso(c.lastStampAt)]),
    ];
  }
  // BOM so Excel reads Vietnamese letters correctly.
  const body = "﻿" + rows.map((r) => r.map(cell).join(",")).join("\r\n");
  const name = `${salon.salonName.replace(/[^\p{L}\p{N}]+/gu, "-")}-${kind === "staff" ? "nhan-vien" : "khach-hang"}.csv`;
  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${kind}.csv"; filename*=UTF-8''${encodeURIComponent(name)}`,
      "Cache-Control": "no-store",
    },
  });
}
