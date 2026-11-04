import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto";
import nodemailer, { type Transporter } from "nodemailer";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";
import { withSeasonBand } from "@/lib/platform-season";

/** Separate mailboxes for salons' marketing emails, set by the admin
 * (/admin/marketing-email), up to 8, used in turn: each email goes out from
 * the next one, so the load is spread and if bulk mail ever gets flagged as
 * spam it is these addresses, never the one booking confirmations come
 * from. A mailbox that fails is skipped for a while and the next one tries.
 * Passwords are stored encrypted with APP_SECRET. With none set, marketing
 * goes out through the main SMTP as before. */

const KEY = "marketingSmtp";
export const MAX_MARKETING_MAILBOXES = 8;
const FAIL_PAUSE_MS = 30 * 60 * 1000;

export interface MarketingMailbox {
  user: string;
  /** Encrypted; never sent to the browser. */
  pass: string;
  enabled: boolean;
}

export interface MarketingSmtp {
  host: string;
  port: number;
  boxes: MarketingMailbox[];
}

function cipherKey() {
  return createHash("sha256").update(`marketing-smtp:${process.env.APP_SECRET ?? ""}`).digest();
}

function encrypt(text: string) {
  const iv = randomBytes(12);
  const c = createCipheriv("aes-256-gcm", cipherKey(), iv);
  const data = Buffer.concat([c.update(text, "utf8"), c.final()]);
  return [iv, c.getAuthTag(), data].map((b) => b.toString("base64")).join(".");
}

function decrypt(blob: string) {
  const [iv, tag, data] = blob.split(".").map((s) => Buffer.from(s, "base64"));
  const d = createDecipheriv("aes-256-gcm", cipherKey(), iv);
  d.setAuthTag(tag);
  return Buffer.concat([d.update(data), d.final()]).toString("utf8");
}

let cache: { at: number; smtp: MarketingSmtp | null } | null = null;
const transports = new Map<string, Transporter>();
/** Mailbox → until when it is skipped after failing. */
const failedUntil = new Map<string, number>();
let turn = 0;

export async function getMarketingSmtp(): Promise<MarketingSmtp | null> {
  if (cache && Date.now() - cache.at < 60_000) return cache.smtp;
  const row = await prisma.platformSetting.findUnique({ where: { key: KEY } });
  let smtp: MarketingSmtp | null = null;
  try {
    smtp = row ? (JSON.parse(row.value) as MarketingSmtp) : null;
    if (smtp && !Array.isArray(smtp.boxes)) smtp = null;
  } catch {
    smtp = null;
  }
  cache = { at: Date.now(), smtp };
  return smtp;
}

/** Saves the mailboxes. A mailbox with an empty password keeps the one
 * already saved for that address; one with neither is dropped. */
export async function setMarketingSmtp(input: { host: string; port: number; boxes: { user: string; pass: string; enabled: boolean }[] }) {
  const current = await getMarketingSmtp();
  const saved = new Map((current?.boxes ?? []).map((b) => [b.user.toLowerCase(), b.pass]));
  const boxes: MarketingMailbox[] = [];
  for (const b of input.boxes.slice(0, MAX_MARKETING_MAILBOXES)) {
    const user = b.user.trim().toLowerCase();
    const pass = b.pass ? encrypt(b.pass) : saved.get(user);
    if (user && pass && !boxes.some((x) => x.user === user)) boxes.push({ user, pass, enabled: b.enabled });
  }
  if (!boxes.length) return clearMarketingSmtp();
  const value: MarketingSmtp = { host: input.host, port: input.port, boxes };
  await prisma.platformSetting.upsert({ where: { key: KEY }, update: { value: JSON.stringify(value) }, create: { key: KEY, value: JSON.stringify(value) } });
  cache = null;
  transports.clear();
  failedUntil.clear();
}

export async function clearMarketingSmtp() {
  await prisma.platformSetting.deleteMany({ where: { key: KEY } });
  cache = null;
  transports.clear();
}

function transporterFor(smtp: MarketingSmtp, box: MarketingMailbox) {
  const key = `${smtp.host}:${smtp.port}:${box.user}:${box.pass}`;
  let t = transports.get(key);
  if (!t) {
    t = nodemailer.createTransport({ host: smtp.host, port: smtp.port, secure: smtp.port === 465, auth: { user: box.user, pass: decrypt(box.pass) } });
    transports.set(key, t);
  }
  return t;
}

/** Signs in to each saved mailbox; null = fine, else the error. */
export async function verifyMarketingSmtp(): Promise<Record<string, string | null>> {
  const smtp = await getMarketingSmtp();
  if (!smtp) return {};
  const results = await Promise.all(
    smtp.boxes.map((b) =>
      transporterFor(smtp, b)
        .verify()
        .then(() => [b.user, null] as const)
        .catch((err: Error) => [b.user, err.message] as const),
    ),
  );
  return Object.fromEntries(results);
}

type MailOpts = {
  to: string;
  subject: string;
  html: string;
  fromName: string;
  /** The salon's own verified address, when the admin allows it. */
  replyTo?: string | null;
  unsubscribeUrl?: string | null;
  attachments?: { filename: string; content: Buffer; contentType?: string }[];
};

async function sendFrom(smtp: MarketingSmtp, box: MarketingMailbox, opts: MailOpts) {
  await transporterFor(smtp, box).sendMail({
    from: { name: opts.fromName, address: box.user },
    ...(opts.replyTo ? { replyTo: { name: opts.fromName, address: opts.replyTo } } : {}),
    to: opts.to,
    subject: opts.subject,
    html: await withSeasonBand(opts.html),
    attachments: opts.attachments,
    headers: opts.unsubscribeUrl ? { "List-Unsubscribe": `<${opts.unsubscribeUrl}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" } : undefined,
  });
}

/** Sends one marketing email from the next marketing mailbox in turn
 * (falling back to the main SMTP only when none is set up), with the
 * salon's name as the sender's name and a List-Unsubscribe header, which
 * mail providers expect on bulk mail. */
export async function sendMarketingMail(opts: MailOpts) {
  const smtp = await getMarketingSmtp();
  const boxes = smtp?.boxes.filter((b) => b.enabled) ?? [];
  if (!smtp || !boxes.length || !process.env.SMTP_HOST) {
    await sendMail({ to: opts.to, subject: opts.subject, html: opts.html, fromName: opts.fromName, replyTo: opts.replyTo, attachments: opts.attachments });
    return;
  }
  // Mailboxes that failed lately go last, so they only get tried when
  // every other one fails too.
  const now = Date.now();
  const start = turn++ % boxes.length;
  const order = [...boxes.slice(start), ...boxes.slice(0, start)].sort((a, b) => Number((failedUntil.get(a.user) ?? 0) > now) - Number((failedUntil.get(b.user) ?? 0) > now));
  let lastErr: unknown;
  for (const box of order) {
    try {
      await sendFrom(smtp, box, opts);
      failedUntil.delete(box.user);
      return;
    } catch (err) {
      failedUntil.set(box.user, Date.now() + FAIL_PAUSE_MS);
      console.error("[marketing mailbox]", box.user, (err as Error).message);
      lastErr = err;
    }
  }
  throw lastErr;
}

/** A test email from one particular mailbox. */
export async function sendMarketingTest(user: string, opts: MailOpts) {
  const smtp = await getMarketingSmtp();
  const box = smtp?.boxes.find((b) => b.user === user.toLowerCase());
  if (!smtp || !box) throw new Error("NOT_SET");
  await sendFrom(smtp, box, opts);
}
