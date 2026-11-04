import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/require-admin";
import {
  MAX_MARKETING_MAILBOXES,
  clearMarketingSmtp,
  getMarketingSmtp,
  sendMarketingTest,
  setMarketingSmtp,
  verifyMarketingSmtp,
} from "@/lib/marketing-mailer";

/** Admin: the mailboxes salons' marketing emails go out from, in turn. */
async function status() {
  const smtp = await getMarketingSmtp();
  return smtp ? { host: smtp.host, port: smtp.port, boxes: smtp.boxes.map((b) => ({ user: b.user, enabled: b.enabled })) } : null;
}

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  return NextResponse.json({ smtp: await status() });
}

const schema = z.object({
  host: z.string().trim().min(3).max(120),
  port: z.number().int().min(1).max(65535),
  boxes: z
    .array(
      z.object({
        user: z.string().trim().email().max(191).or(z.literal("")),
        // Empty keeps the saved one for this address.
        pass: z.string().max(200),
        enabled: z.boolean(),
      }),
    )
    .max(MAX_MARKETING_MAILBOXES),
});

/** Saves the mailboxes, then signs in to each once to check it. */
export async function PUT(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  await setMarketingSmtp(parsed.data);
  return NextResponse.json({ smtp: await status(), checks: await verifyMarketingSmtp() });
}

const testSchema = z.object({ from: z.string().trim().email(), to: z.string().trim().email().max(191) });

/** A test email from one mailbox. */
export async function POST(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = testSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  try {
    await sendMarketingTest(parsed.data.from, {
      to: parsed.data.to,
      subject: `VaraaAi — kiểm tra hộp thư ${parsed.data.from}`,
      html: `<p>Hộp thư <strong>${parsed.data.from}</strong> gửi email marketing của VaraaAi đang hoạt động.</p><p>The VaraaAi marketing mailbox ${parsed.data.from} works.</p>`,
      fromName: "VaraaAi Marketing",
    });
  } catch (err) {
    return NextResponse.json({ error: "SEND_FAILED", detail: (err as Error).message }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  await clearMarketingSmtp();
  return NextResponse.json({ smtp: null });
}
