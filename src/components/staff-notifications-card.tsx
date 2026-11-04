"use client";

import { useState } from "react";
import { BellRing, Check, Loader2, Mail } from "lucide-react";

type Key = "staffBookingEmails" | "staffAlarmOn";

const T = {
  vi: {
    emailTitle: "Gửi email cho nhân viên",
    emailSub: "Khi có khách đặt lịch mới, khi lịch hẹn được đổi giờ hoặc chuyển người, và khi lịch hẹn bị hủy — nhân viên phụ trách nhận email ngay. Chỉ nhân viên có tài khoản đăng nhập mới nhận được.",
    alarmTitle: "Chuông báo lịch hẹn trong ngày cho nhân viên",
    alarmSub: "Bật lên là điện thoại của mọi nhân viên đổ chuông khi có khách đặt lịch trong ngày hôm nay (trang quản trị hoặc ứng dụng VaraaAi đang mở). Khi tắt, từng nhân viên vẫn có thể tự bấm nút chuông 🔔 ở góc dưới bên trái để bật cho riêng mình.",
    on: "Đang bật",
    off: "Đang tắt",
    saved: "Đã lưu",
    error: "Không lưu được, vui lòng thử lại.",
  },
  en: {
    emailTitle: "Email staff about their bookings",
    emailSub: "When a customer books, when a booking is moved to another time or person, and when it is cancelled, the staff member it belongs to gets an email right away. Only staff with their own login can receive it.",
    alarmTitle: "Same-day booking alarm for staff",
    alarmSub: "When on, every staff member's phone rings when a customer books for today (with the dashboard or the VaraaAi app open). When off, each staff member can still turn it on for themselves with the 🔔 button at the bottom left.",
    on: "On",
    off: "Off",
    saved: "Saved",
    error: "Couldn't save, please try again.",
  },
  fi: {
    emailTitle: "Sähköposti työntekijöille heidän varauksistaan",
    emailSub: "Kun asiakas varaa, kun varaus siirretään toiseen aikaan tai toiselle tekijälle ja kun se perutaan, varauksen työntekijä saa heti sähköpostin. Vain omalla tunnuksella kirjautuvat työntekijät voivat saada sen.",
    alarmTitle: "Saman päivän varaushälytys työntekijöille",
    alarmSub: "Kun tämä on päällä, jokaisen työntekijän puhelin soi, kun asiakas varaa ajan tälle päivälle (hallintapaneeli tai VaraaAi-sovellus auki). Kun se on pois, jokainen voi silti ottaa sen itselleen käyttöön vasemman alakulman 🔔-painikkeella.",
    on: "Päällä",
    off: "Pois",
    saved: "Tallennettu",
    error: "Tallennus ei onnistunut, yritä uudelleen.",
  },
};

/** Settings → Staff notifications: the owner's two switches (both off by default). */
export function StaffNotificationsCard({ locale, initial }: { locale: string; initial: Record<Key, boolean> }) {
  const t = (T as Record<string, (typeof T)["en"]>)[locale] ?? T.en;
  const [values, setValues] = useState(initial);
  const [busy, setBusy] = useState<Key | null>(null);
  const [msg, setMsg] = useState<{ key: Key; ok: boolean } | null>(null);

  async function toggle(key: Key) {
    const next = !values[key];
    setBusy(key);
    setMsg(null);
    const res = await fetch("/api/business/staff-notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [key]: next }),
    }).catch(() => null);
    setBusy(null);
    if (res?.ok) setValues((v) => ({ ...v, [key]: next }));
    setMsg({ key, ok: !!res?.ok });
  }

  const rows: { key: Key; icon: typeof Mail; title: string; sub: string }[] = [
    { key: "staffBookingEmails", icon: Mail, title: t.emailTitle, sub: t.emailSub },
    { key: "staffAlarmOn", icon: BellRing, title: t.alarmTitle, sub: t.alarmSub },
  ];

  return (
    <div className="card divide-y divide-ink-100 !py-2">
      {rows.map(({ key, icon: Icon, title, sub }) => {
        const on = values[key];
        return (
          <div key={key} className="flex items-start gap-4 py-4">
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${on ? "bg-gradient-to-br from-coral-400 to-berry-500 text-white" : "bg-mist-50 text-ink-400"}`}>
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-ink-900">{title}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-500">{sub}</p>
              <p className={`mt-2 text-xs font-semibold ${msg?.key === key && !msg.ok ? "text-berry-500" : on ? "text-emerald-700" : "text-ink-400"}`}>
                {msg?.key === key && !msg.ok ? (
                  t.error
                ) : (
                  <>
                    {on ? t.on : t.off}
                    {msg?.key === key && msg.ok && (
                      <span className="ml-2 inline-flex items-center gap-1 text-emerald-700">
                        <Check className="h-3.5 w-3.5" /> {t.saved}
                      </span>
                    )}
                  </>
                )}
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={on}
              aria-label={title}
              onClick={() => toggle(key)}
              disabled={busy !== null}
              className={`relative mt-1 h-7 w-12 shrink-0 rounded-full transition-colors disabled:opacity-60 ${on ? "bg-primary-500" : "bg-ink-100"}`}
            >
              {busy === key ? (
                <Loader2 className="absolute left-3.5 top-1 h-5 w-5 animate-spin text-white" />
              ) : (
                <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? "left-6" : "left-1"}`} />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}
