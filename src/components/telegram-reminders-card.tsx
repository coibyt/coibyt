"use client";

import { useEffect, useState } from "react";
import { AtSign, Check, Copy, Loader2, Send, Trash2, Users } from "lucide-react";

interface State {
  bot: string | null;
  addUrl: string | null;
  command: string | null;
  on: boolean;
  groups: { id: string; title: string }[];
  staff: { id: string; name: string; telegramUsername: string | null }[];
}

const T = {
  vi: {
    title: "Nhắc qua Telegram",
    text: "Bot nhắn vào nhóm Telegram của salon, gắn tên nhân viên có lịch hẹn quá 24 giờ chưa báo cáo thu nhập — mỗi ngày một lần, trong khoảng 10:00–20:00.",
    on: "Đang bật",
    off: "Đang tắt",
    notReady: "Bot Telegram đang được VaraaAi chuẩn bị. Tính năng sẽ sớm mở cho salon của bạn.",
    howTitle: "Cách cài bot vào nhóm",
    step1: "Tạo một nhóm Telegram có các nhân viên (hoặc dùng nhóm sẵn có).",
    step2: "Bấm “Thêm bot vào nhóm” bên dưới. Telegram mở ra — chọn nhóm của salon và bấm Thêm. Bot sẽ chào và báo “Đã kết nối” trong nhóm.",
    step2b: "Không thấy bot báo kết nối? Gửi lệnh này vào nhóm:",
    step3: "Điền tên người dùng Telegram (@username) của từng nhân viên để bot gắn tên đúng người. Nhân viên xem @username trong Telegram › Cài đặt.",
    step4: "Bật công tắc ở trên. Bấm “Gửi nhắc ngay” để thử.",
    add: "Thêm bot vào nhóm",
    copied: "Đã chép",
    groups: "Nhóm đã kết nối",
    noGroups: "Chưa có nhóm nào — làm bước 2 ở trên.",
    remove: "Gỡ",
    staff: "@username Telegram của nhân viên",
    save: "Lưu",
    saved: "Đã lưu",
    badUsername: "@username không hợp lệ (4–32 ký tự: chữ, số, dấu _).",
    sendNow: "Gửi nhắc ngay",
    sent: "Đã gửi vào {n} nhóm.",
    sendFail: "Không gửi được — kiểm tra bot còn trong nhóm.",
  },
  en: {
    title: "Telegram reminders",
    text: "The bot posts in your salon's Telegram group, tagging staff whose bookings ended over 24 hours ago without an income report — once a day, between 10:00 and 20:00.",
    on: "On",
    off: "Off",
    notReady: "VaraaAi is setting up the Telegram bot. This will open for your salon soon.",
    howTitle: "How to add the bot to a group",
    step1: "Create a Telegram group with your staff (or use one you already have).",
    step2: "Tap “Add the bot to a group” below. Telegram opens — pick your salon's group and tap Add. The bot says hello and confirms it's linked.",
    step2b: "No confirmation from the bot? Send this in the group:",
    step3: "Enter each staff member's Telegram @username so the bot tags the right person. They find it in Telegram › Settings.",
    step4: "Turn the switch on above. Tap “Send a reminder now” to try it.",
    add: "Add the bot to a group",
    copied: "Copied",
    groups: "Linked groups",
    noGroups: "No groups yet — do step 2 above.",
    remove: "Remove",
    staff: "Staff Telegram @usernames",
    save: "Save",
    saved: "Saved",
    badUsername: "That @username isn't valid (4–32 letters, numbers or _).",
    sendNow: "Send a reminder now",
    sent: "Sent to {n} groups.",
    sendFail: "Couldn't send — check the bot is still in the group.",
  },
  fi: {
    title: "Telegram-muistutukset",
    text: "Botti kirjoittaa salongin Telegram-ryhmään ja merkitsee työntekijät, joiden varaus päättyi yli 24 tuntia sitten ilman tuloraporttia — kerran päivässä klo 10–20.",
    on: "Päällä",
    off: "Pois",
    notReady: "VaraaAi valmistelee Telegram-bottia. Ominaisuus avautuu salongillesi pian.",
    howTitle: "Näin lisäät botin ryhmään",
    step1: "Luo Telegram-ryhmä henkilökunnalle (tai käytä olemassa olevaa).",
    step2: "Napauta ”Lisää botti ryhmään” alla. Telegram avautuu — valitse salongin ryhmä ja napauta Lisää. Botti tervehtii ja vahvistaa yhteyden.",
    step2b: "Eikö vahvistusta tullut? Lähetä tämä ryhmään:",
    step3: "Kirjoita jokaisen työntekijän Telegram-käyttäjänimi (@username), jotta botti merkitsee oikean henkilön. Sen löytää Telegram › Asetukset.",
    step4: "Laita kytkin päälle yllä. Kokeile napauttamalla ”Lähetä muistutus nyt”.",
    add: "Lisää botti ryhmään",
    copied: "Kopioitu",
    groups: "Yhdistetyt ryhmät",
    noGroups: "Ei vielä ryhmiä — tee vaihe 2 yllä.",
    remove: "Poista",
    staff: "Henkilökunnan Telegram-käyttäjänimet",
    save: "Tallenna",
    saved: "Tallennettu",
    badUsername: "Käyttäjänimi ei kelpaa (4–32 kirjainta, numeroa tai _).",
    sendNow: "Lähetä muistutus nyt",
    sent: "Lähetetty {n} ryhmään.",
    sendFail: "Lähetys epäonnistui — tarkista, että botti on yhä ryhmässä.",
  },
};

/** Owner, on the Doanh thu page: Telegram reminders for staff who haven't
 * reported income (/api/business/telegram, src/lib/telegram.ts). */
export function TelegramRemindersCard({ locale }: { locale: string }) {
  const t = (T as Record<string, (typeof T)["vi"]>)[locale] ?? T.en;
  const [s, setS] = useState<State | null>(null);
  const [names, setNames] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [note, setNote] = useState<{ ok: boolean; text: string } | null>(null);
  const [copied, setCopied] = useState(false);

  function take(d: State) {
    setS(d);
    setNames(Object.fromEntries(d.staff.map((x) => [x.id, x.telegramUsername ? `@${x.telegramUsername}` : ""])));
  }

  useEffect(() => {
    fetch("/api/business/telegram")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && take(d))
      .catch(() => {});
  }, []);

  async function patch(body: object, key: string) {
    setBusy(key);
    setNote(null);
    const res = await fetch("/api/business/telegram", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).catch(() => null);
    const d = await res?.json().catch(() => null);
    setBusy(null);
    if (!res?.ok) {
      setNote({ ok: false, text: d?.error === "BAD_USERNAME" ? t.badUsername : t.sendFail });
      return false;
    }
    take(d);
    return true;
  }

  async function sendNow() {
    setBusy("send");
    setNote(null);
    const res = await fetch("/api/business/telegram", { method: "POST" }).catch(() => null);
    const d = await res?.json().catch(() => null);
    setBusy(null);
    setNote(res?.ok && d?.sent > 0 ? { ok: true, text: t.sent.replace("{n}", String(d.sent)) } : { ok: false, text: t.sendFail });
  }

  async function removeGroup(id: string) {
    setBusy(`g-${id}`);
    const res = await fetch(`/api/business/telegram?group=${id}`, { method: "DELETE" }).catch(() => null);
    setBusy(null);
    if (res?.ok) take(await res.json());
  }

  if (!s) return null;

  const steps = [t.step1, t.step2, t.step3, t.step4];
  return (
    <section className="overflow-hidden rounded-3xl border border-ink-100 bg-white">
      <label className={`flex items-start gap-3 bg-gradient-to-br from-[#1f182d] to-[#40325c] p-4 text-white ${s.bot ? "cursor-pointer" : ""}`}>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#229ED9] text-white shadow-md shadow-[#229ED9]/30">
          <Send className="h-4 w-4" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center justify-between gap-2">
            <span className="text-sm font-bold">{t.title}</span>
            {s.bot && (
              <span className={`relative h-6 w-11 shrink-0 rounded-full transition ${s.on ? "bg-[#c99a3f]" : "bg-white/20"}`}>
                <input type="checkbox" className="sr-only" checked={s.on} disabled={!!busy} onChange={(e) => patch({ on: e.target.checked }, "on")} />
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${s.on ? "left-[22px]" : "left-0.5"}`} />
              </span>
            )}
          </span>
          <span className="mt-1 block text-[11px] leading-snug text-white/65">{t.text}</span>
          {s.bot && (
            <span className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${s.on ? "bg-emerald-400/20 text-emerald-200" : "bg-white/10 text-white/60"}`}>
              {s.on ? t.on : t.off} · @{s.bot}
            </span>
          )}
        </span>
      </label>

      {!s.bot ? (
        <p className="p-4 text-xs text-ink-500">{t.notReady}</p>
      ) : (
        <>
          <div className="border-b border-ink-100 p-4">
            <p className="text-sm font-bold text-ink-900">{t.howTitle}</p>
            <ol className="mt-3 space-y-3">
              {steps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f6efe1] text-[11px] font-extrabold text-[#8a6a2c]">{i + 1}</span>
                  <div className="min-w-0 flex-1 text-xs leading-relaxed text-ink-700">
                    {step}
                    {i === 1 && s.addUrl && (
                      <div className="mt-2 space-y-2">
                        <a
                          href={s.addUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-[#229ED9] px-4 py-2 text-xs font-bold text-white shadow-md shadow-[#229ED9]/25 transition hover:brightness-105"
                        >
                          <Send className="h-3.5 w-3.5" />
                          {t.add}
                        </a>
                        {s.command && (
                          <div>
                            <p className="text-[11px] text-ink-400">{t.step2b}</p>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(s.command!).catch(() => {});
                                setCopied(true);
                                setTimeout(() => setCopied(false), 1800);
                              }}
                              className="mt-1 inline-flex max-w-full items-center gap-2 rounded-lg bg-mist-50 px-2.5 py-1.5 font-mono text-[11px] text-ink-900 ring-1 ring-ink-100 hover:bg-white"
                            >
                              <span className="truncate">{s.command}</span>
                              {copied ? <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 shrink-0 text-ink-400" />}
                              {copied && <span className="font-sans text-[10px] font-bold text-emerald-700">{t.copied}</span>}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="border-b border-ink-100 p-4">
            <p className="flex items-center gap-2 text-sm font-bold text-ink-900">
              <Users className="h-4 w-4 text-[#c99a3f]" />
              {t.groups}
            </p>
            {s.groups.length === 0 ? (
              <p className="mt-2 text-[11px] text-ink-400">{t.noGroups}</p>
            ) : (
              <ul className="mt-2 space-y-1.5">
                {s.groups.map((g) => (
                  <li key={g.id} className="flex items-center justify-between gap-2 rounded-xl bg-mist-50/70 px-3 py-2 text-xs">
                    <span className="flex min-w-0 items-center gap-2 font-semibold text-ink-900">
                      <Send className="h-3.5 w-3.5 shrink-0 text-[#229ED9]" />
                      <span className="truncate">{g.title}</span>
                    </span>
                    <button type="button" disabled={!!busy} onClick={() => removeGroup(g.id)} className="flex shrink-0 items-center gap-1 text-[11px] font-semibold text-ink-400 hover:text-berry-600">
                      {busy === `g-${g.id}` ? <Loader2 className="h-3 w-3 animate-spin" /> : <Trash2 className="h-3 w-3" />}
                      {t.remove}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="p-4">
            <p className="flex items-center gap-2 text-sm font-bold text-ink-900">
              <AtSign className="h-4 w-4 text-[#c99a3f]" />
              {t.staff}
            </p>
            <ul className="mt-2 space-y-1.5">
              {s.staff.map((x) => (
                <li key={x.id} className="flex items-center gap-2">
                  <span className="w-24 shrink-0 truncate text-xs font-semibold text-ink-700">{x.name}</span>
                  <input
                    value={names[x.id] ?? ""}
                    onChange={(e) => setNames((n) => ({ ...n, [x.id]: e.target.value }))}
                    placeholder="@username"
                    className="h-9 min-w-0 flex-1 rounded-xl border border-ink-100 bg-white px-3 text-xs text-ink-900 focus:border-[#c99a3f] focus:outline-none"
                  />
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                disabled={!!busy}
                onClick={async () => {
                  if (await patch({ staff: Object.entries(names).map(([id, username]) => ({ id, username })) }, "staff")) setNote({ ok: true, text: t.saved });
                }}
                className="btn-outline !px-3 !py-1.5 text-xs"
              >
                {busy === "staff" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                {t.save}
              </button>
              <button type="button" disabled={!!busy || s.groups.length === 0} onClick={sendNow} className="btn-primary !px-3 !py-1.5 text-xs">
                {busy === "send" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                {t.sendNow}
              </button>
            </div>
            {note && <p className={`mt-2 text-[11px] font-semibold ${note.ok ? "text-emerald-700" : "text-berry-600"}`}>{note.text}</p>}
          </div>
        </>
      )}
    </section>
  );
}
