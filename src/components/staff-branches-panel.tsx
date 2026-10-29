"use client";

import { useEffect, useState } from "react";
import { Building2, Check, Info, Loader2 } from "lucide-react";

const L = {
  vi: {
    title: "Làm việc ở chi nhánh khác",
    hint: "Bật chi nhánh mà nhân viên này cũng nhận khách. Hồ sơ, ảnh và các dịch vụ trùng tên được sao chép sang đó; nhân viên dùng cùng tài khoản để xem lịch ở mọi chi nhánh.",
    lock: "Khi khách đặt lịch với người này ở một chi nhánh, giờ đó ở các chi nhánh khác tự khoá lại và ghi “Có khách ở …”.",
    saved: "Đã lưu",
    error: "Không lưu được",
  },
  en: {
    title: "Also works at other branches",
    hint: "Turn on the branches where this person also takes customers. Their profile, photo and services with the same names are copied there; they use the same login to see their bookings at every branch.",
    lock: "When a customer books this person at one branch, that time is locked at the others and marked “Customer at …”.",
    saved: "Saved",
    error: "Couldn't save",
  },
  fi: {
    title: "Työskentelee myös muissa toimipisteissä",
    hint: "Valitse toimipisteet, joissa tämä henkilö myös palvelee asiakkaita. Profiili, kuva ja samannimiset palvelut kopioidaan sinne; sama tunnus näyttää varaukset kaikissa toimipisteissä.",
    lock: "Kun asiakas varaa tämän henkilön yhdessä toimipisteessä, sama aika lukitaan muissa ja merkitään ”Asiakas toimipisteessä …”.",
    saved: "Tallennettu",
    error: "Tallennus epäonnistui",
  },
};

interface Branch {
  id: string;
  name: string;
  city: string | null;
  on: boolean;
}

/** In the staff edit drawer: which of the owner's other branches this person
 * also works at (src/app/api/business/staff/[id]/branches). Hidden for an
 * owner with a single branch. */
export function StaffBranchesPanel({ staffId, locale, className }: { staffId: string; locale: string; className: string }) {
  const t = (L as Record<string, (typeof L)["en"]>)[locale] ?? L.en;
  const [branches, setBranches] = useState<Branch[] | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [status, setStatus] = useState<"saved" | "error" | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/business/staff/${staffId}/branches`)
      .then((r) => (r.ok ? r.json() : { branches: [] }))
      .then((d) => !cancelled && setBranches(d.branches ?? []));
    return () => {
      cancelled = true;
    };
  }, [staffId]);

  async function toggle(id: string) {
    if (!branches) return;
    const next = branches.map((b) => (b.id === id ? { ...b, on: !b.on } : b));
    setBusy(id);
    setStatus(null);
    const res = await fetch(`/api/business/staff/${staffId}/branches`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ businessIds: next.filter((b) => b.on).map((b) => b.id) }),
    }).catch(() => null);
    setBusy(null);
    if (res?.ok) {
      setBranches(next);
      setStatus("saved");
    } else setStatus("error");
  }

  if (!branches || branches.length === 0) return null;

  return (
    <section className={className}>
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#b08a3e]">
          <Building2 className="h-3.5 w-3.5" />
          {t.title}
        </p>
        {status && (
          <span className={`text-[11px] font-semibold ${status === "saved" ? "text-emerald-600" : "text-berry-500"}`}>
            {status === "saved" ? `✓ ${t.saved}` : t.error}
          </span>
        )}
      </div>
      <p className="mb-3 text-[11px] leading-relaxed text-ink-400">{t.hint}</p>
      <ul className="space-y-2">
        {branches.map((b) => (
          <li key={b.id}>
            <button
              type="button"
              onClick={() => toggle(b.id)}
              disabled={busy !== null}
              className={`flex w-full items-center gap-3 rounded-2xl p-3 text-left ring-1 transition ${
                b.on ? "bg-[#1f182d] text-white ring-[#1f182d]" : "bg-white text-ink-900 ring-ink-100 hover:bg-mist-50"
              }`}
            >
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${b.on ? "bg-white/10 text-[#e8d3a6]" : "bg-mist-50 text-ink-400"}`}>
                <Building2 className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold">{b.name}</span>
                {b.city && <span className={`block truncate text-[11px] ${b.on ? "text-white/60" : "text-ink-400"}`}>{b.city}</span>}
              </span>
              <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${b.on ? "bg-[#c99a3f] text-white" : "ring-1 ring-ink-200"}`}>
                {busy === b.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : b.on ? <Check className="h-3.5 w-3.5" /> : null}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-3 flex items-start gap-1.5 rounded-2xl bg-[#f1ecf8] px-3 py-2 text-[11px] leading-snug text-[#40325c]">
        <Info className="mt-px h-3.5 w-3.5 shrink-0" />
        {t.lock}
      </p>
    </section>
  );
}
