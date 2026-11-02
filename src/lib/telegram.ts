import { randomBytes } from "node:crypto";
import { formatInTimeZone } from "date-fns-tz";
import { prisma } from "@/lib/prisma";
import { SITE_URL } from "@/lib/email/ui";
import { overdueBookings, type OverdueBooking } from "@/lib/income-reminders";

/** The VaraaAi Telegram bot: the admin connects it once (admin › Telegram),
 * salon owners add it to their staff groups, and it reminds staff there to
 * report their income — the same overdue bookings as IncomeReminderAlarm.
 *
 * Linking a group: the owner's "Add to group" link is
 * t.me/<bot>?startgroup=<Business.telegramLinkCode>, so Telegram posts
 * "/start <code>" in the group as the bot joins; typing it works too. */

const KEYS = { token: "telegramBotToken", username: "telegramBotUsername", secret: "telegramWebhookSecret" } as const;
export const TELEGRAM_WEBHOOK_PATH = "/api/telegram/webhook";

export async function botConfig() {
  const rows = await prisma.platformSetting.findMany({ where: { key: { in: Object.values(KEYS) } } });
  const get = (k: string) => rows.find((r) => r.key === k)?.value ?? null;
  const token = get(KEYS.token);
  return token ? { token, username: get(KEYS.username) ?? "", secret: get(KEYS.secret) ?? "" } : null;
}

async function call<T = unknown>(token: string, method: string, params: Record<string, unknown> = {}) {
  const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
    signal: AbortSignal.timeout(15_000),
  });
  const d = (await res.json().catch(() => null)) as { ok: boolean; result?: T; description?: string } | null;
  if (!d?.ok) throw new Error(d?.description ?? `Telegram ${method} failed (${res.status})`);
  return d.result as T;
}

/** Admin: checks the token, points the bot's webhook at this site and saves it. */
export async function connectBot(token: string) {
  const me = await call<{ username: string; can_join_groups: boolean }>(token, "getMe");
  const secret = randomBytes(24).toString("hex");
  await call(token, "setWebhook", {
    url: `${SITE_URL}${TELEGRAM_WEBHOOK_PATH}`,
    secret_token: secret,
    allowed_updates: ["message", "my_chat_member"],
    drop_pending_updates: true,
  });
  const save = (key: string, value: string) => prisma.platformSetting.upsert({ where: { key }, update: { value }, create: { key, value } });
  await Promise.all([save(KEYS.token, token), save(KEYS.username, me.username), save(KEYS.secret, secret)]);
  return { username: me.username, canJoinGroups: me.can_join_groups };
}

export async function disconnectBot() {
  const cfg = await botConfig();
  if (cfg) await call(cfg.token, "deleteWebhook").catch(() => {});
  await prisma.platformSetting.deleteMany({ where: { key: { in: Object.values(KEYS) } } });
}

/** For the admin page: whether Telegram reaches the webhook. */
export async function botStatus() {
  const cfg = await botConfig();
  if (!cfg) return null;
  const info = await call<{ url: string; pending_update_count: number; last_error_message?: string; last_error_date?: number }>(cfg.token, "getWebhookInfo").catch(
    (err: Error) => ({ url: "", pending_update_count: 0, last_error_message: err.message, last_error_date: undefined }),
  );
  const [groups, salons] = await Promise.all([
    prisma.telegramGroup.count(),
    prisma.business.count({ where: { telegramRemindersOn: true } }),
  ]);
  return {
    username: cfg.username,
    webhookOk: info.url === `${SITE_URL}${TELEGRAM_WEBHOOK_PATH}`,
    pending: info.pending_update_count,
    lastError: info.last_error_message ?? null,
    lastErrorAt: info.last_error_date ? new Date(info.last_error_date * 1000).toISOString() : null,
    groups,
    salons,
  };
}

export async function sendTelegram(chatId: string, html: string) {
  const cfg = await botConfig();
  if (!cfg) throw new Error("NO_BOT");
  await call(cfg.token, "sendMessage", { chat_id: chatId, text: html, parse_mode: "HTML", link_preview_options: { is_disabled: true } });
}

/** The salon's code for linking a group, made on first use. */
export async function linkCode(businessId: string) {
  const b = await prisma.business.findUniqueOrThrow({ where: { id: businessId }, select: { telegramLinkCode: true } });
  if (b.telegramLinkCode) return b.telegramLinkCode;
  const code = randomBytes(8).toString("hex");
  await prisma.business.update({ where: { id: businessId }, data: { telegramLinkCode: code } });
  return code;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const T = {
  vi: {
    linked: "✅ Đã kết nối nhóm <b>{group}</b> với salon <b>{salon}</b> trên VaraaAi.\n\nTừ giờ, khi nhân viên có lịch hẹn kết thúc quá 24 giờ mà chưa báo cáo thu nhập, bot sẽ nhắc trong nhóm này mỗi ngày một lần.",
    badCode: "Mã kết nối không đúng. Chủ salon hãy mở VaraaAi › Doanh thu › Nhắc qua Telegram và bấm “Thêm bot vào nhóm” lại.",
    private: "Xin chào! Mình là bot nhắc báo cáo thu nhập của VaraaAi.\n\nChủ salon hãy mở VaraaAi › Doanh thu › Nhắc qua Telegram, rồi bấm “Thêm bot vào nhóm” để thêm mình vào nhóm nhân viên.",
    title: "⏰ <b>Nhắc báo cáo thu nhập</b> · {salon}",
    line: "{who} — {n} lịch hẹn: {days}",
    body: "Các lịch hẹn này đã kết thúc hơn 24 giờ nhưng chưa có báo cáo thu nhập. Vào VaraaAi › Lịch hẹn, mở ngày đó và bấm vào từng lịch hẹn để báo cáo:",
    allDone: "✅ <b>{salon}</b>: mọi lịch hẹn đã được báo cáo thu nhập. Cảm ơn cả nhóm!",
  },
  en: {
    linked: "✅ Group <b>{group}</b> is now linked to <b>{salon}</b> on VaraaAi.\n\nWhen a booking ended over 24 hours ago without an income report, the bot reminds the staff member here, once a day.",
    badCode: "That link code isn't valid. The salon owner can open VaraaAi › Income › Telegram reminders and tap “Add the bot to a group” again.",
    private: "Hi! I'm VaraaAi's income report reminder bot.\n\nSalon owners: open VaraaAi › Income › Telegram reminders and tap “Add the bot to a group” to add me to your staff group.",
    title: "⏰ <b>Income report reminder</b> · {salon}",
    line: "{who} — {n} bookings: {days}",
    body: "These bookings ended over 24 hours ago without an income report. Open VaraaAi › Bookings, go to that day and tap each booking to report it:",
    allDone: "✅ <b>{salon}</b>: every booking has its income report. Thanks, team!",
  },
  fi: {
    linked: "✅ Ryhmä <b>{group}</b> on nyt yhdistetty salonkiin <b>{salon}</b> VaraaAi:ssa.\n\nKun varaus päättyi yli 24 tuntia sitten ilman tuloraporttia, botti muistuttaa työntekijää täällä kerran päivässä.",
    badCode: "Yhdistämiskoodi ei kelpaa. Salongin omistaja voi avata VaraaAi › Tulot › Telegram-muistutukset ja napauttaa ”Lisää botti ryhmään” uudelleen.",
    private: "Hei! Olen VaraaAi:n tuloraporttien muistutusbotti.\n\nSalongin omistaja: avaa VaraaAi › Tulot › Telegram-muistutukset ja lisää minut henkilökunnan ryhmään napauttamalla ”Lisää botti ryhmään”.",
    title: "⏰ <b>Muistutus tuloraportista</b> · {salon}",
    line: "{who} — {n} varausta: {days}",
    body: "Nämä varaukset päättyivät yli 24 tuntia sitten ilman tuloraporttia. Avaa VaraaAi › Varaukset, siirry päivään ja raportoi jokainen varaus napauttamalla sitä:",
    allDone: "✅ <b>{salon}</b>: kaikista varauksista on tuloraportti. Kiitos, tiimi!",
  },
};
const strings = (locale: string) => (T as Record<string, (typeof T)["vi"]>)[locale] ?? T.en;
const fill = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (m, k: string) => (k in v ? String(v[k]) : m));

type Salon = { id: string; name: string; timezone: string; defaultLocale: string; incomeRemindersSince: Date | null; incomeReportsFrom: Date | null };

/** The reminder text for one salon, or null when nothing is overdue. */
async function reminderText(b: Salon, overdue: OverdueBooking[]) {
  if (overdue.length === 0) return null;
  const S = strings(b.defaultLocale);
  const byStaff = new Map<string, OverdueBooking[]>();
  for (const o of overdue) if (o.staffId) byStaff.set(o.staffId, [...(byStaff.get(o.staffId) ?? []), o]);
  const staff = await prisma.staff.findMany({ where: { id: { in: [...byStaff.keys()] } }, select: { id: true, name: true, telegramUsername: true } });
  const dayFmt = new Intl.DateTimeFormat(b.defaultLocale, { weekday: "short", day: "numeric", month: "numeric", timeZone: b.timezone });
  const lines = staff.map((s) => {
    const items = byStaff.get(s.id) ?? [];
    const days = [...new Set(items.map((i) => dayFmt.format(new Date(i.startsAt))))].join(", ");
    // @username tags them (Telegram notifies); otherwise their name.
    const who = s.telegramUsername ? `@${esc(s.telegramUsername)} (${esc(s.name)})` : `<b>${esc(s.name)}</b>`;
    return "• " + fill(S.line, { who, n: items.length, days: esc(days) });
  });
  return [fill(S.title, { salon: esc(b.name) }), "", ...lines, "", S.body, `${SITE_URL}/business/dashboard/bookings`].join("\n");
}

const salonSelect = { id: true, name: true, timezone: true, defaultLocale: true, incomeRemindersSince: true, incomeReportsFrom: true } as const;

/** Called by the reminders cron: once a salon-local day, in the daytime, each
 * linked group of a salon with Telegram reminders on gets the list of staff
 * with bookings not reported 24 hours after they ended. */
export async function sendTelegramIncomeReminders() {
  if (!(await botConfig())) return 0;
  const salons = await prisma.business.findMany({
    where: { telegramRemindersOn: true, status: "APPROVED", telegramGroups: { some: {} } },
    select: { ...salonSelect, telegramGroups: { select: { id: true, chatId: true, lastRemindedOn: true } } },
  });
  let sent = 0;
  for (const b of salons) {
    const today = formatInTimeZone(new Date(), b.timezone, "yyyy-MM-dd");
    const hour = Number(formatInTimeZone(new Date(), b.timezone, "H"));
    if (hour < 10 || hour >= 20) continue;
    const due = b.telegramGroups.filter((g) => g.lastRemindedOn !== today);
    if (due.length === 0) continue;
    const text = await reminderText(b, await overdueBookings(b));
    for (const g of due) {
      try {
        if (text) {
          await sendTelegram(g.chatId, text);
          sent++;
        }
        await prisma.telegramGroup.update({ where: { id: g.id }, data: { lastRemindedOn: today } });
      } catch (err) {
        console.error("[telegram] remind", b.id, g.chatId, err);
      }
    }
  }
  return sent;
}

/** The owner's "send now": the reminder (or an all-clear) to every linked group. */
export async function sendTelegramNow(businessId: string) {
  const b = await prisma.business.findUniqueOrThrow({ where: { id: businessId }, select: { ...salonSelect, telegramGroups: { select: { chatId: true } } } });
  const text = (await reminderText(b, await overdueBookings(b))) ?? fill(strings(b.defaultLocale).allDone, { salon: esc(b.name) });
  let sent = 0;
  for (const g of b.telegramGroups) {
    try {
      await sendTelegram(g.chatId, text);
      sent++;
    } catch (err) {
      console.error("[telegram] send now", businessId, g.chatId, err);
    }
  }
  return sent;
}

interface Update {
  message?: {
    chat: { id: number; type: string; title?: string };
    text?: string;
    migrate_to_chat_id?: number;
  };
  my_chat_member?: { chat: { id: number }; new_chat_member: { status: string } };
}

/** Webhook: links groups ("/start <code>"), follows group upgrades and drops
 * groups the bot was removed from. */
export async function handleUpdate(u: Update) {
  const removed = u.my_chat_member && ["left", "kicked"].includes(u.my_chat_member.new_chat_member.status);
  if (removed) {
    await prisma.telegramGroup.deleteMany({ where: { chatId: String(u.my_chat_member!.chat.id) } });
    return;
  }
  const m = u.message;
  if (!m) return;
  const chatId = String(m.chat.id);
  // A group that became a supergroup gets a new id.
  if (m.migrate_to_chat_id) {
    await prisma.telegramGroup.updateMany({ where: { chatId }, data: { chatId: String(m.migrate_to_chat_id) } });
    return;
  }
  const cmd = m.text?.trim().match(/^\/(start|connect)(?:@\w+)?(?:\s+(\S+))?/i);
  if (!cmd) return;
  const code = cmd[2];
  if (m.chat.type === "private") {
    await sendTelegram(chatId, strings("vi").private + "\n\n—\n\n" + strings("en").private);
    return;
  }
  if (!["group", "supergroup"].includes(m.chat.type) || !code) return;
  const b = await prisma.business.findUnique({ where: { telegramLinkCode: code }, select: { id: true, name: true, defaultLocale: true } });
  if (!b) {
    await sendTelegram(chatId, [strings("vi").badCode, "—", strings("en").badCode].join("\n\n"));
    return;
  }
  const title = (m.chat.title ?? "Telegram").slice(0, 255);
  await prisma.telegramGroup.upsert({
    where: { businessId_chatId: { businessId: b.id, chatId } },
    create: { businessId: b.id, chatId, title },
    update: { title },
  });
  await sendTelegram(chatId, fill(strings(b.defaultLocale).linked, { group: esc(title), salon: esc(b.name) }));
}
