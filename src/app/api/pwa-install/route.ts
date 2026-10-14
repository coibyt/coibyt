import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  locale: z.string().max(10).optional(),
});

/** Fire-and-forget beacon the client calls once when the browser's own
 * `appinstalled` event fires (see useInstallPrompt) — purely so the admin
 * dashboard can show how many times the site has been installed as an app.
 * Never blocks or fails visibly to the client; a bad/missing body just
 * records an untagged row rather than erroring. */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  const session = await auth();

  await prisma.pwaInstall.create({
    data: {
      customerId: session?.user?.id,
      locale: parsed.success ? parsed.data.locale : undefined,
    },
  });

  return NextResponse.json({ ok: true });
}
