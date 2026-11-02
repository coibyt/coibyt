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
    linked: "✅ Đã kết nối nhóm <b>{group}</b> với salon <b>{salon}</b> trên VaraaAi.\n\nMặc định, bot nhắc nhân viên có lịch hẹn kết thúc quá 24 giờ chưa báo cáo thu nhập (mỗi ngày một lần). Chủ salon chọn nội dung cho nhóm này — nhắc báo cáo, lịch hẹn mới trong ngày, nhân viên nào, chi nhánh nào — ở VaraaAi › Doanh thu › Bot Telegram.",
    badCode: "Mã kết nối không đúng. Chủ salon hãy mở VaraaAi › Doanh thu › Bot Telegram và bấm “Thêm bot vào nhóm” lại.",
    private: "Xin chào! Mình là bot của VaraaAi: nhắc nhân viên báo cáo thu nhập và báo lịch hẹn mới trong ngày.\n\nChủ salon hãy mở VaraaAi › Doanh thu › Bot Telegram, rồi bấm “Thêm bot vào nhóm” để thêm mình vào nhóm nhân viên.",
    title: "⏰ <b>Nhắc báo cáo thu nhập</b> · {salon}",
    line: "{who} — {n} lịch hẹn: {days}",
    body: "Các lịch hẹn này đã kết thúc hơn 24 giờ nhưng chưa có báo cáo thu nhập. Vào VaraaAi › Lịch hẹn, mở ngày đó và bấm vào từng lịch hẹn để báo cáo:",
    allDone: "✅ <b>{salon}</b>: mọi lịch hẹn đã được báo cáo thu nhập. Cảm ơn cả nhóm!",
    allBranches: "Tất cả chi nhánh",
    booking: "📅 <b>Lịch hẹn mới hôm nay</b> · {salon}\n\n🕐 <b>{time}</b> · {service}\n💇 Nhân viên: {who}\n🙋 Khách: {customer}",
    bookingLink: "Xem lịch hẹn:",
    noStaff: "chưa chọn",
    testBookings: "✅ Bot đang hoạt động. Nhóm này sẽ nhận thông báo khi có lịch hẹn mới trong ngày ({salon}).",
  },
  en: {
    linked: "✅ Group <b>{group}</b> is now linked to <b>{salon}</b> on VaraaAi.\n\nBy default the bot reminds staff whose bookings ended over 24 hours ago without an income report (once a day). The owner chooses what this group gets — reminders, new bookings today, which staff, which branches — under VaraaAi › Income › Telegram bot.",
    badCode: "That link code isn't valid. The salon owner can open VaraaAi › Income › Telegram bot and tap “Add the bot to a group” again.",
    private: "Hi! I'm VaraaAi's bot: I remind staff to report income and post today's new bookings.\n\nSalon owners: open VaraaAi › Income › Telegram bot and tap “Add the bot to a group” to add me to your staff group.",
    title: "⏰ <b>Income report reminder</b> · {salon}",
    line: "{who} — {n} bookings: {days}",
    body: "These bookings ended over 24 hours ago without an income report. Open VaraaAi › Bookings, go to that day and tap each booking to report it:",
    allDone: "✅ <b>{salon}</b>: every booking has its income report. Thanks, team!",
    allBranches: "All branches",
    booking: "📅 <b>New booking today</b> · {salon}\n\n🕐 <b>{time}</b> · {service}\n💇 Staff: {who}\n🙋 Customer: {customer}",
    bookingLink: "See the bookings:",
    noStaff: "not chosen",
    testBookings: "✅ The bot is working. This group gets a message for every new booking made for today ({salon}).",
  },
  fi: {
    linked: "✅ Ryhmä <b>{group}</b> on nyt yhdistetty salonkiin <b>{salon}</b> VaraaAi:ssa.\n\nOletuksena botti muistuttaa työntekijöitä, joiden varaus päättyi yli 24 tuntia sitten ilman tuloraporttia (kerran päivässä). Omistaja valitsee ryhmän sisällön — muistutukset, päivän uudet varaukset, työntekijät, toimipisteet — kohdassa VaraaAi › Tulot › Telegram-botti.",
    badCode: "Yhdistämiskoodi ei kelpaa. Salongin omistaja voi avata VaraaAi › Tulot › Telegram-botti ja napauttaa ”Lisää botti ryhmään” uudelleen.",
    private: "Hei! Olen VaraaAi:n botti: muistutan tuloraporteista ja kerron päivän uudet varaukset.\n\nSalongin omistaja: avaa VaraaAi › Tulot › Telegram-botti ja lisää minut henkilökunnan ryhmään napauttamalla ”Lisää botti ryhmään”.",
    title: "⏰ <b>Muistutus tuloraportista</b> · {salon}",
    line: "{who} — {n} varausta: {days}",
    body: "Nämä varaukset päättyivät yli 24 tuntia sitten ilman tuloraporttia. Avaa VaraaAi › Varaukset, siirry päivään ja raportoi jokainen varaus napauttamalla sitä:",
    allDone: "✅ <b>{salon}</b>: kaikista varauksista on tuloraportti. Kiitos, tiimi!",
    allBranches: "Kaikki toimipisteet",
    booking: "📅 <b>Uusi varaus tänään</b> · {salon}\n\n🕐 <b>{time}</b> · {service}\n💇 Työntekijä: {who}\n🙋 Asiakas: {customer}",
    bookingLink: "Katso varaukset:",
    noStaff: "ei valittu",
    testBookings: "✅ Botti toimii. Tämä ryhmä saa viestin jokaisesta tälle päivälle tehdystä uudesta varauksesta ({salon}).",
  },
};
const strings = (locale: string) => (T as Record<string, (typeof T)["vi"]>)[locale] ?? T.en;
const fill = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (m, k: string) => (k in v ? String(v[k]) : m));

const salonSelect = { id: true, name: true, ownerId: true, timezone: true, defaultLocale: true, incomeRemindersSince: true, incomeReportsFrom: true } as const;
type Salon = { id: string; name: string; ownerId: string; timezone: string; defaultLocale: string; incomeRemindersSince: Date | null; incomeReportsFrom: Date | null };
type GroupRow = { id: string; chatId: string; businessId: string; notifyIncome: boolean; notifyBookings: boolean; allBranches: boolean; staffIds: unknown; lastRemindedOn: string | null };
const groupSelect = { id: true, chatId: true, businessId: true, notifyIncome: true, notifyBookings: true, allBranches: true, staffIds: true, lastRemindedOn: true } as const;

/** The staff rows a group is limited to, or null for everyone. */
export function groupStaff(g: { staffIds: unknown }): string[] | null {
  return Array.isArray(g.staffIds) && g.staffIds.length ? g.staffIds.filter((x): x is string => typeof x === "string") : null;
}

/** "@lisa (Lisa)" tags them (Telegram notifies); otherwise the name in bold. */
const tag = (s: { name: string; telegramUsername: string | null }) => (s.telegramUsername ? `@${esc(s.telegramUsername)} (${esc(s.name)})` : `<b>${esc(s.name)}</b>`);

/** The branches a group covers: its own, or all the owner's live ones. */
async function groupSalons(g: GroupRow, home: Salon): Promise<Salon[]> {
  if (!g.allBranches) return [home];
  return prisma.business.findMany({ where: { ownerId: home.ownerId, status: "APPROVED" }, select: salonSelect, orderBy: { createdAt: "asc" } });
}

/** The reminder for a group — its branches and staff — or null when nobody is late. */
async function reminderText(g: GroupRow, home: Salon) {
  const S = strings(home.defaultLocale);
  const salons = await groupSalons(g, home);
  const only = groupStaff(g);
  const overdue: (OverdueBooking & { branch: string; tz: string })[] = [];
  for (const b of salons) {
    for (const o of await overdueBookings(b)) {
      if (o.staffId && (!only || only.includes(o.staffId))) overdue.push({ ...o, branch: b.name, tz: b.timezone });
    }
  }
  if (overdue.length === 0) return null;
  const byStaff = new Map<string, typeof overdue>();
  for (const o of overdue) byStaff.set(o.staffId!, [...(byStaff.get(o.staffId!) ?? []), o]);
  const staff = await prisma.staff.findMany({ where: { id: { in: [...byStaff.keys()] } }, select: { id: true, name: true, telegramUsername: true } });
  const lines = staff.map((s) => {
    const items = byStaff.get(s.id) ?? [];
    const dayFmt = new Intl.DateTimeFormat(home.defaultLocale, { weekday: "short", day: "numeric", month: "numeric", timeZone: items[0].tz });
    const days = [...new Set(items.map((i) => dayFmt.format(new Date(i.startsAt))))].join(", ");
    const where = salons.length > 1 ? ` · ${esc(items[0].branch)}` : "";
    return "• " + fill(S.line, { who: tag(s) + where, n: items.length, days: esc(days) });
  });
  const label = salons.length > 1 ? S.allBranches : home.name;
  return [fill(S.title, { salon: esc(label) }), "", ...lines, "", S.body, `${SITE_URL}/business/dashboard/bookings`].join("\n");
}

/** Called by the reminders cron: once a salon-local day, in the daytime,
 * each group that wants income reminders gets the staff (its staff, its
 * branches) with bookings not reported 24 hours after they ended. */
export async function sendTelegramIncomeReminders() {
  if (!(await botConfig())) return 0;
  const groups = await prisma.telegramGroup.findMany({
    where: { notifyIncome: true, business: { telegramRemindersOn: true, status: "APPROVED" } },
    select: { ...groupSelect, business: { select: salonSelect } },
  });
  let sent = 0;
  for (const g of groups) {
    const tz = g.business.timezone;
    const today = formatInTimeZone(new Date(), tz, "yyyy-MM-dd");
    const hour = Number(formatInTimeZone(new Date(), tz, "H"));
    if (hour < 10 || hour >= 20 || g.lastRemindedOn === today) continue;
    try {
      const text = await reminderText(g, g.business);
      if (text) {
        await sendTelegram(g.chatId, text);
        sent++;
      }
      await prisma.telegramGroup.update({ where: { id: g.id }, data: { lastRemindedOn: today } });
    } catch (err) {
      console.error("[telegram] remind", g.businessId, g.chatId, err);
    }
  }
  return sent;
}

/** The owner's "send now": each group that wants income reminders gets its
 * reminder (or an all-clear); a bookings-only group gets a short hello. */
export async function sendTelegramNow(businessId: string) {
  const b = await prisma.business.findUniqueOrThrow({ where: { id: businessId }, select: { ...salonSelect, telegramGroups: { select: groupSelect } } });
  const S = strings(b.defaultLocale);
  let sent = 0;
  for (const g of b.telegramGroups) {
    try {
      const text = g.notifyIncome
        ? ((await reminderText(g, b)) ?? fill(S.allDone, { salon: esc(g.allBranches ? S.allBranches : b.name) }))
        : fill(S.testBookings, { salon: esc(g.allBranches ? S.allBranches : b.name) });
      await sendTelegram(g.chatId, text);
      sent++;
    } catch (err) {
      console.error("[telegram] send now", businessId, g.chatId, err);
    }
  }
  return sent;
}

/** A booking was just made for today: the groups that want new bookings —
 * of this branch (or all branches) and this staff member (or everyone). */
export async function telegramNewBooking(bookingId: string) {
  if (!(await botConfig())) return;
  const bk = await prisma.booking.findUnique({
    where: { id: bookingId },
    select: {
      startsAt: true,
      endsAt: true,
      staffId: true,
      service: { select: { name: true } },
      customer: { select: { name: true } },
      staff: { select: { name: true, telegramUsername: true } },
      business: { select: { id: true, name: true, ownerId: true, timezone: true, defaultLocale: true } },
    },
  });
  if (!bk) return;
  const tz = bk.business.timezone;
  if (formatInTimeZone(new Date(), tz, "yyyy-MM-dd") !== formatInTimeZone(bk.startsAt, tz, "yyyy-MM-dd")) return;
  const groups = await prisma.telegramGroup.findMany({
    where: {
      notifyBookings: true,
      business: { telegramRemindersOn: true, status: "APPROVED" },
      OR: [{ businessId: bk.business.id }, { allBranches: true, business: { ownerId: bk.business.ownerId } }],
    },
    select: { chatId: true, staffIds: true, business: { select: { defaultLocale: true } } },
  });
  const done = new Set<string>();
  for (const g of groups) {
    const only = groupStaff(g);
    if (done.has(g.chatId) || (only && (!bk.staffId || !only.includes(bk.staffId)))) continue;
    done.add(g.chatId);
    const S = strings(g.business.defaultLocale);
    const time = `${formatInTimeZone(bk.startsAt, tz, "HH:mm")}–${formatInTimeZone(bk.endsAt, tz, "HH:mm")}`;
    const text = [
      fill(S.booking, {
        salon: esc(bk.business.name),
        time,
        service: esc(bk.service.name),
        who: bk.staff ? tag(bk.staff) : S.noStaff,
        customer: esc(bk.customer.name ?? "—"),
      }),
      "",
      `${S.bookingLink} ${SITE_URL}/business/dashboard/bookings`,
    ].join("\n");
    await sendTelegram(g.chatId, text).catch((err) => console.error("[telegram] booking", g.chatId, err));
  }
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
