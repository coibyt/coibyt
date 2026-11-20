import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { courseSeoById } from "@/lib/academy/course-pages";
import { isUnfollowToken } from "@/lib/academy/community";
import { ensureAcademyTables } from "@/lib/academy/setup";

/** The "stop these emails" link in a new-lesson email: works without signing
 * in (signed token), then opens the course page. */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("f") ?? "";
  const token = url.searchParams.get("t") ?? "";
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? url.origin;
  if (!id || !token || !isUnfollowToken(id, token) || !(await ensureAcademyTables())) return NextResponse.redirect(`${site}/academy`);
  const row = await prisma.academyFollow.findUnique({ where: { id }, select: { courseId: true, locale: true } });
  if (row) await prisma.academyFollow.delete({ where: { id } });
  const slug = row ? courseSeoById(row.courseId)?.slug : null;
  const prefix = row && row.locale !== "vi" ? `/${row.locale}` : "";
  return NextResponse.redirect(`${site}${prefix}${slug ? `/academy/khoa-hoc/${slug}` : "/academy"}?unfollowed=1`);
}
