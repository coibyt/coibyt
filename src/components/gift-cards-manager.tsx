"use client";

import { useEffect, useMemo, useState } from "react";
import { addDays } from "date-fns";
import {
  CheckCircle2,
  ChevronDown,
  Download,
  Eye,
  Gift,
  Loader2,
  Mail,
  Plus,
  QrCode,
  Search,
  Send,
  Sparkles,
  Ticket,
  TrendingUp,
  Wallet,
  XCircle,
} from "lucide-react";
import { formatMoney } from "@/lib/money";
import { GiftCardPreview } from "@/components/gift-card-preview";

interface ServiceOption {
  id: string;
  name: string;
}

interface CardRow {
  id: string;
  name: string;
  serviceName: string;
  discountPercent: number;
  validDays: number;
  maxUses: number;
  salePriceCents: number;
  currency: string;
  active: boolean;
}

interface PurchaseRow {
  id: string;
  code: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string | null;
  cardName: string;
  serviceName: string;
  discountPercent: number;
  priceCents: number;
  currency: string;
  usesLeft: number;
  maxUses: number;
  redeemedCount: number;
  expiresAt: string | null;
  createdAt: string;
  state: "PENDING" | "ACTIVE" | "EXPIRED" | "USED_UP" | "CANCELLED";
}

interface Stats {
  sold: number;
  pending: number;
  active: number;
  redeemed: number;
  revenueCents: number;
  currency: string | null;
}

interface Lookup {
  code: string;
  buyerName: string;
  cardName: string;
  serviceName: string;
  discountPercent: number;
  usesLeft: number;
  maxUses: number;
  expiresAt: string | null;
  state: PurchaseRow["state"];
}

const STATE_STYLE: Record<PurchaseRow["state"], { vi: string; en: string; fi: string; cls: string }> = {
  PENDING: { vi: "Chờ thanh toán", en: "Awaiting payment", fi: "Odottaa maksua", cls: "bg-peach-100 text-coral-600" },
  ACTIVE: { vi: "Đang hiệu lực", en: "Active", fi: "Voimassa", cls: "bg-teal-50 text-teal-600" },
  EXPIRED: { vi: "Hết hạn", en: "Expired", fi: "Vanhentunut", cls: "bg-ink-50 text-ink-400" },
  USED_UP: { vi: "Đã dùng hết", en: "Used up", fi: "Käytetty loppuun", cls: "bg-primary-50 text-primary-600" },
  CANCELLED: { vi: "Đã huỷ", en: "Cancelled", fi: "Peruttu", cls: "bg-berry-50 text-berry-500" },
};

export function GiftCardsManager({
  locale,
  services,
  defaultCurrency,
  businessName,
  initialCode = "",
}: {
  locale: string;
  services: ServiceOption[];
  defaultCurrency: string;
  businessName: string;
  initialCode?: string;
}) {
  const vi = locale === "vi";
  const fi = locale === "fi";
  const [cards, setCards] = useState<CardRow[] | null>(null);
  const [purchases, setPurchases] = useState<PurchaseRow[] | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);

  const [form, setForm] = useState({
    serviceId: services[0]?.id ?? "",
    name: "",
    discountPercent: "30",
    validDays: "90",
    maxUses: "1",
    salePrice: "",
    currency: defaultCurrency,
  });
  const [showCreate, setShowCreate] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [issue, setIssue] = useState({
    giftCardId: "",
    recipientName: "",
    recipientEmail: "",
    recipientPhone: "",
    message: "",
    paid: true,
  });
  const [issuing, setIssuing] = useState(false);
  const [issueResult, setIssueResult] = useState<{ ok: boolean; text: string; purchaseId?: string } | null>(null);

  const [code, setCode] = useState(initialCode.toUpperCase());
  const [lookup, setLookup] = useState<Lookup | null>(null);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [redeemed, setRedeemed] = useState(false);
  const [busy, setBusy] = useState(false);

  const [query, setQuery] = useState("");
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [sentId, setSentId] = useState<string | null>(null);

  async function loadAll() {
    const [c, p] = await Promise.all([
      fetch("/api/business/gift-cards").then((r) => r.json()),
      fetch("/api/business/gift-cards/purchases").then((r) => r.json()),
    ]);
    const list: CardRow[] = c.cards ?? [];
    setCards(list);
    setPurchases(p.purchases ?? []);
    setStats(p.stats ?? null);
    setIssue((s) => (s.giftCardId || !list.find((x) => x.active) ? s : { ...s, giftCardId: list.find((x) => x.active)!.id }));
  }

  useEffect(() => {
    loadAll();
    // A QR scanned with a phone camera lands here with ?code= — check it at once.
    if (initialCode.trim().length >= 4) runLookup("lookup");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeCards = (cards ?? []).filter((c) => c.active);
  const selectedCard = activeCards.find((c) => c.id === issue.giftCardId) ?? null;

  const filteredPurchases = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!purchases || !q) return purchases;
    return purchases.filter(
      (p) => p.code.toLowerCase().includes(q) || p.buyerName.toLowerCase().includes(q) || p.buyerEmail.toLowerCase().includes(q)
    );
  }, [purchases, query]);

  async function createCard(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setFormError(null);
    const res = await fetch("/api/business/gift-cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceId: form.serviceId,
        name: form.name,
        discountPercent: Number(form.discountPercent),
        validDays: Number(form.validDays),
        maxUses: Number(form.maxUses),
        salePrice: Number(form.salePrice),
        currency: form.currency,
      }),
    });
    setSaving(false);
    if (!res.ok) {
      setFormError(vi ? "Không tạo được mẫu thẻ — kiểm tra lại các ô." : fi ? "Korttipohjan luonti epäonnistui – tarkista kentät." : "Couldn't create the card — check the fields.");
      return;
    }
    const { id } = await res.json();
    setForm((f) => ({ ...f, name: "", salePrice: "" }));
    setShowCreate(false);
    setIssue((s) => ({ ...s, giftCardId: id }));
    loadAll();
  }

  async function toggleCard(card: CardRow) {
    await fetch(`/api/business/gift-cards/${card.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !card.active }),
    });
    loadAll();
  }

  async function issueCard(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedCard) return;
    setIssuing(true);
    setIssueResult(null);
    const res = await fetch("/api/business/gift-cards/issue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...issue, locale }),
    });
    const data = await res.json().catch(() => ({}));
    setIssuing(false);
    if (!res.ok) {
      setIssueResult({ ok: false, text: vi ? "Không tạo được thẻ — kiểm tra lại thông tin." : fi ? "Kortin luonti epäonnistui – tarkista tiedot." : "Couldn't create the card — check the details." });
      return;
    }
    setIssueResult({
      ok: data.emailSent,
      purchaseId: data.id,
      text: data.emailSent
        ? vi
          ? `Đã tạo thẻ ${data.code} và gửi ảnh thẻ tới ${issue.recipientEmail}.`
          : fi ? `Kortti ${data.code} luotu ja lähetetty osoitteeseen ${issue.recipientEmail}.` : `Card ${data.code} created and emailed to ${issue.recipientEmail}.`
        : vi
          ? `Đã tạo thẻ ${data.code} nhưng chưa gửi được email — bạn có thể bấm "Gửi lại email" trong danh sách.`
          : fi ? `Kortti ${data.code} luotu, mutta sähköpostin lähetys epäonnistui – käytä listan painiketta "Lähetä sähköposti uudelleen".` : `Card ${data.code} created, but the email couldn't be sent — use "Resend email" in the list.`,
    });
    setIssue((s) => ({ ...s, recipientName: "", recipientEmail: "", recipientPhone: "", message: "" }));
    loadAll();
  }

  async function resend(id: string) {
    setSendingId(id);
    setSentId(null);
    const res = await fetch(`/api/business/gift-cards/purchases/${id}/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale }),
    });
    setSendingId(null);
    if (res.ok) setSentId(id);
    else alert(vi ? "Không gửi được email." : fi ? "Sähköpostin lähetys epäonnistui." : "Couldn't send the email.");
  }

  async function confirmPurchase(id: string) {
    setBusy(true);
    await fetch(`/api/business/gift-cards/purchases/${id}/confirm`, { method: "POST" });
    setBusy(false);
    loadAll();
  }

  async function runLookup(action: "lookup" | "redeem") {
    setBusy(true);
    setLookupError(null);
    setRedeemed(false);
    const res = await fetch("/api/business/gift-cards/redeem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: code || initialCode, action }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (data.card) setLookup(data.card);
    else setLookup(null);
    if (!res.ok && action === "lookup") setLookupError(vi ? "Không tìm thấy mã này." : fi ? "Koodia ei löytynyt." : "Code not found.");
    if (!res.ok && action === "redeem" && data.reason) {
      const label = STATE_STYLE[data.reason as PurchaseRow["state"]];
      setLookupError(
        label ? (vi ? `Không dùng được: ${label.vi.toLowerCase()}.` : fi ? `Ei voi käyttää: ${label.fi.toLowerCase()}.` : `Can't redeem: ${label.en.toLowerCase()}.`) : vi ? "Không dùng được." : fi ? "Ei voi käyttää." : "Can't redeem."
      );
    }
    if (res.ok && action === "redeem") {
      setRedeemed(true);
      loadAll();
    }
  }

  const previewValidUntil =
    selectedCard && issue.paid
      ? addDays(new Date(), selectedCard.validDays).toLocaleDateString(vi ? "vi-VN" : locale === "fi" ? "fi-FI" : "en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : null;
  const cardLocale = locale === "vi" || locale === "fi" ? locale : "en";

  return (
    <div className="space-y-6">
      {stats && (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
          {[
            { icon: Ticket, label: vi ? "Đã bán" : fi ? "Myyty" : "Sold", value: String(stats.sold), cls: "from-primary-500 to-primary-700" },
            { icon: Wallet, label: vi ? "Chờ thanh toán" : fi ? "Odottaa" : "Pending", value: String(stats.pending), cls: "from-peach-300 to-coral-500" },
            { icon: CheckCircle2, label: vi ? "Đang hiệu lực" : fi ? "Voimassa" : "Active", value: String(stats.active), cls: "from-teal-400 to-teal-600" },
            { icon: Gift, label: vi ? "Lượt đã dùng" : fi ? "Käyttökerrat" : "Redemptions", value: String(stats.redeemed), cls: "from-coral-400 to-berry-500" },
            {
              icon: TrendingUp,
              label: vi ? "Doanh thu" : fi ? "Myynti" : "Revenue",
              value: stats.currency ? formatMoney(stats.revenueCents, stats.currency, locale) : "—",
              cls: "from-primary-700 to-primary-900",
            },
          ].map((t, i) => (
            <div
              key={t.label}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${t.cls} p-4 text-white shadow-md ${i === 4 ? "col-span-2 lg:col-span-1" : ""}`}
            >
              <t.icon className="pointer-events-none absolute -bottom-3 -right-3 h-16 w-16 text-white/15" />
              <p className="truncate text-2xl font-bold leading-none">{t.value}</p>
              <p className="mt-2 text-xs font-medium text-white/85">{t.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Issue + email a designed card */}
      <section className="relative overflow-hidden rounded-[28px] border border-ink-100 bg-gradient-to-br from-white via-primary-50/60 to-peach-50 p-5 shadow-sm sm:p-7">
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-coral-400/10 blur-3xl" />
        <div className="relative mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-md">
            <Send className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-ink-900">{vi ? "Gửi thẻ quà tặng cho khách" : fi ? "Lähetä lahjakortti" : "Send a gift card"}</h2>
            <p className="text-xs text-ink-400">
              {vi
                ? "Điền thông tin khách — hệ thống tạo ảnh thẻ có mã QR và gửi thẳng vào email của khách."
                : fi ? "Täytä vastaanottajan tiedot – teemme kortista kuvan QR-koodeineen ja lähetämme sen hänelle sähköpostilla." : "Fill in the recipient — we design the card image with its QR code and email it to them."}
            </p>
          </div>
        </div>

        {cards !== null && activeCards.length === 0 ? (
          <div className="relative rounded-2xl border-2 border-dashed border-primary-200 bg-white/70 p-6 text-center text-sm text-ink-700">
            {vi ? "Bạn cần tạo ít nhất một mẫu thẻ trước." : fi ? "Luo ensin vähintään yksi korttipohja." : "Create at least one card template first."}
            <div className="mt-3">
              <button type="button" className="btn-primary" onClick={() => setShowCreate(true)}>
                <Plus className="h-4 w-4" />
                {vi ? "Tạo mẫu thẻ" : fi ? "Luo korttipohja" : "Create a card template"}
              </button>
            </div>
          </div>
        ) : (
          <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start">
            <form onSubmit={issueCard} className="space-y-3">
              <label className="block text-xs font-medium text-ink-700">
                {vi ? "Mẫu thẻ" : fi ? "Korttipohja" : "Card template"}
                <select
                  className="input mt-1"
                  value={issue.giftCardId}
                  onChange={(e) => setIssue({ ...issue, giftCardId: e.target.value })}
                >
                  {activeCards.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} · {formatMoney(c.salePriceCents, c.currency, locale)}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-xs font-medium text-ink-700">
                {vi ? "Tên khách nhận thẻ" : fi ? "Vastaanottajan nimi" : "Recipient name"}
                <input required maxLength={120} className="input mt-1" value={issue.recipientName} onChange={(e) => setIssue({ ...issue, recipientName: e.target.value })} />
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block text-xs font-medium text-ink-700">
                  {fi ? "Sähköposti" : "Email"}
                  <input required type="email" maxLength={180} className="input mt-1" value={issue.recipientEmail} onChange={(e) => setIssue({ ...issue, recipientEmail: e.target.value })} />
                </label>
                <label className="block text-xs font-medium text-ink-700">
                  {vi ? "Số điện thoại" : fi ? "Puhelin" : "Phone"}
                  <input maxLength={30} className="input mt-1" value={issue.recipientPhone} onChange={(e) => setIssue({ ...issue, recipientPhone: e.target.value })} placeholder={vi ? "Không bắt buộc" : fi ? "Valinnainen" : "Optional"} />
                </label>
              </div>
              <label className="block text-xs font-medium text-ink-700">
                {vi ? "Lời nhắn trên thẻ" : fi ? "Viesti kortissa" : "Message on the card"}
                <textarea
                  maxLength={160}
                  rows={2}
                  className="input mt-1 !rounded-2xl"
                  value={issue.message}
                  onChange={(e) => setIssue({ ...issue, message: e.target.value })}
                  placeholder={vi ? "VD: Chúc mừng sinh nhật!" : fi ? "esim. Hyvää syntymäpäivää!" : "e.g. Happy birthday!"}
                />
                <span className="mt-1 block text-right text-[10px] text-ink-400">{issue.message.length}/160</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-ink-700">
                <input type="checkbox" checked={issue.paid} onChange={(e) => setIssue({ ...issue, paid: e.target.checked })} className="h-4 w-4 accent-primary-500" />
                {vi ? "Khách đã thanh toán — kích hoạt thẻ ngay" : fi ? "Maksettu – aktivoi kortti heti" : "Paid — activate the card now"}
              </label>
              {issueResult && (
                <div
                  className={`flex items-start gap-2 rounded-2xl px-4 py-3 text-sm ${
                    issueResult.ok ? "bg-teal-50 text-teal-700" : "bg-peach-100 text-coral-600"
                  }`}
                >
                  {issueResult.ok ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : <XCircle className="mt-0.5 h-4 w-4 shrink-0" />}
                  <span>
                    {issueResult.text}{" "}
                    {issueResult.purchaseId && (
                      <a
                        href={`/api/business/gift-cards/purchases/${issueResult.purchaseId}/image?locale=${locale}`}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold underline"
                      >
                        {vi ? "Xem ảnh thẻ" : fi ? "Näytä kortti" : "View card"}
                      </a>
                    )}
                  </span>
                </div>
              )}
              <button type="submit" disabled={issuing || !selectedCard} className="btn-primary w-full !py-3">
                {issuing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                {vi ? "Tạo ảnh thẻ & gửi email cho khách" : fi ? "Luo korttikuva ja lähetä se sähköpostilla" : "Create card image & email it"}
              </button>
            </form>

            <div className="space-y-2">
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-400">
                <Eye className="h-3.5 w-3.5" />
                {vi ? "Xem trước thẻ khách sẽ nhận" : fi ? "Kortin esikatselu" : "Preview of the card"}
              </p>
              {selectedCard ? (
                <GiftCardPreview
                  salonName={businessName}
                  title={selectedCard.name}
                  serviceName={selectedCard.serviceName}
                  amountText={formatMoney(selectedCard.salePriceCents, selectedCard.currency, cardLocale)}
                  discountPercent={selectedCard.discountPercent}
                  maxUses={selectedCard.maxUses}
                  validUntilText={previewValidUntil}
                  recipientName={issue.recipientName || (vi ? "Tên khách hàng" : fi ? "Vastaanottajan nimi" : "Recipient name")}
                  recipientEmail={issue.recipientEmail || "email@example.com"}
                  recipientPhone={issue.recipientPhone || null}
                  message={issue.message || null}
                  code="XXXXXXXXXX"
                  qrDataUrl={null}
                  locale={cardLocale}
                />
              ) : (
                <div className="flex aspect-[1200/750] items-center justify-center rounded-[24px] bg-mist-100">
                  <Loader2 className="h-5 w-5 animate-spin text-ink-400" />
                </div>
              )}
              <p className="text-[11px] text-ink-400">
                {vi
                  ? "Mã thẻ và mã QR thật được tạo khi gửi. Khách đưa mã QR, nhân viên quét bằng camera điện thoại là mở đúng thẻ."
                  : fi ? "Oikea koodi ja QR-koodi luodaan lähetettäessä. Henkilökunta avaa kortin skannaamalla QR-koodin puhelimen kameralla." : "The real code and QR are generated on send. Staff scan the QR with a phone camera to open the card."}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Check & redeem */}
      <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 p-5 text-white shadow-xl sm:p-7">
        <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-coral-400/25 blur-3xl" />
        <div className="relative flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
            <QrCode className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold">{vi ? "Kiểm tra và dùng thẻ" : fi ? "Tarkista ja käytä kortti" : "Check and redeem a card"}</h2>
            <p className="text-xs text-white/70">
              {vi
                ? "Quét QR trên thẻ bằng camera điện thoại, hoặc nhập mã thẻ rồi bấm kiểm tra."
                : fi ? "Skannaa kortin QR-koodi puhelimen kameralla tai kirjoita koodi ja tarkista se." : "Scan the card's QR with your phone camera, or type the code and check it."}
            </p>
          </div>
        </div>
        <div className="relative mt-5 flex flex-col gap-2 sm:flex-row">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && code.trim().length >= 4 && !busy && runLookup("lookup")}
            placeholder={vi ? "Mã thẻ" : fi ? "Kortin koodi" : "Card code"}
            className="h-12 flex-1 rounded-full border border-white/20 bg-white/10 px-5 font-mono text-base tracking-[0.25em] text-white placeholder:tracking-normal placeholder:text-white/50 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
          />
          <button
            type="button"
            disabled={busy || code.trim().length < 4}
            onClick={() => runLookup("lookup")}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-peach-200 to-coral-400 px-6 font-semibold text-primary-900 shadow-lg transition hover:brightness-105 disabled:opacity-50"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            {vi ? "Kiểm tra mã" : fi ? "Tarkista koodi" : "Check code"}
          </button>
        </div>
        {lookupError && <p className="relative mt-3 text-sm font-medium text-amber-200">{lookupError}</p>}
        {lookup && (
          <div className="relative mt-4 rounded-2xl bg-white p-4 text-sm text-ink-700 shadow-lg">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-mono text-xs font-semibold tracking-widest text-primary-500">{lookup.code}</p>
                <p className="mt-0.5 text-base font-bold text-ink-900">{lookup.cardName}</p>
                <p className="text-xs text-ink-400">
                  {lookup.serviceName} · {vi ? "giảm" : fi ? "alennus" : "off"} {lookup.discountPercent}%
                </p>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${STATE_STYLE[lookup.state].cls}`}>
                {vi ? STATE_STYLE[lookup.state].vi : fi ? STATE_STYLE[lookup.state].fi : STATE_STYLE[lookup.state].en}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-mist-50 p-2">
                <p className="text-[10px] uppercase text-ink-400">{vi ? "Khách" : fi ? "Asiakas" : "Customer"}</p>
                <p className="truncate text-xs font-semibold text-ink-900">{lookup.buyerName}</p>
              </div>
              <div className="rounded-xl bg-mist-50 p-2">
                <p className="text-[10px] uppercase text-ink-400">{vi ? "Còn lại" : fi ? "Käyttökertoja jäljellä" : "Uses left"}</p>
                <p className="text-xs font-semibold text-ink-900">
                  {lookup.usesLeft}/{lookup.maxUses}
                </p>
              </div>
              <div className="rounded-xl bg-mist-50 p-2">
                <p className="text-[10px] uppercase text-ink-400">{vi ? "Hết hạn" : fi ? "Vanhenee" : "Expires"}</p>
                <p className="text-xs font-semibold text-ink-900">
                  {lookup.expiresAt ? new Date(lookup.expiresAt).toLocaleDateString(vi ? "vi-VN" : fi ? "fi-FI" : "en-GB") : "—"}
                </p>
              </div>
            </div>
            {redeemed && (
              <p className="mt-3 flex items-center gap-1.5 text-sm font-medium text-teal-600">
                <CheckCircle2 className="h-4 w-4" />
                {vi ? "Đã ghi nhận 1 lần dùng." : fi ? "Yksi käyttökerta kirjattu." : "One use recorded."}
              </p>
            )}
            {lookup.state === "ACTIVE" && (
              <button type="button" disabled={busy} onClick={() => runLookup("redeem")} className="btn-primary mt-3 w-full">
                {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                {vi ? "Ghi nhận lần dùng" : fi ? "Kirjaa käyttökerta" : "Record a use"}
              </button>
            )}
          </div>
        )}
      </section>

      {/* Card templates */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-lg font-bold text-ink-900">
            <Sparkles className="h-5 w-5 text-coral-500" />
            {vi ? "Mẫu thẻ quà tặng" : fi ? "Lahjakorttipohjat" : "Gift card templates"}
          </h2>
          <button type="button" onClick={() => setShowCreate((v) => !v)} className="btn-outline !px-4 !py-2 text-xs">
            {showCreate ? <ChevronDown className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
            {vi ? "Tạo mẫu thẻ mới" : fi ? "Uusi korttipohja" : "New template"}
          </button>
        </div>

        {showCreate && (
          <div className="rounded-[24px] border border-ink-100 bg-white p-5 shadow-sm">
            {services.length === 0 ? (
              <p className="text-sm text-ink-400">{vi ? "Hãy thêm dịch vụ trước." : fi ? "Lisää ensin palvelu." : "Add a service first."}</p>
            ) : (
              <form onSubmit={createCard} className="grid gap-3 sm:grid-cols-2">
                <label className="text-xs font-medium text-ink-700 sm:col-span-2">
                  {vi ? "Dịch vụ" : fi ? "Palvelu" : "Service"}
                  <select className="input mt-1" value={form.serviceId} onChange={(e) => setForm({ ...form, serviceId: e.target.value })}>
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </label>
                <label className="text-xs font-medium text-ink-700 sm:col-span-2">
                  {vi ? "Tên thẻ" : fi ? "Kortin nimi" : "Card name"}
                  <input required className="input mt-1" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={vi ? "VD: Thẻ quà tặng Sơn gel" : fi ? "esim. Geelilakkauksen lahjakortti" : "e.g. Gel polish gift card"} />
                </label>
                <label className="text-xs font-medium text-ink-700">
                  {vi ? "Giảm giá (%)" : fi ? "Alennus (%)" : "Discount (%)"}
                  <input required type="number" min={1} max={100} className="input mt-1" value={form.discountPercent} onChange={(e) => setForm({ ...form, discountPercent: e.target.value })} />
                </label>
                <label className="text-xs font-medium text-ink-700">
                  {vi ? "Hiệu lực (ngày sau khi kích hoạt)" : fi ? "Voimassa (päivää aktivoinnista)" : "Valid for (days after activation)"}
                  <input required type="number" min={1} className="input mt-1" value={form.validDays} onChange={(e) => setForm({ ...form, validDays: e.target.value })} />
                </label>
                <label className="text-xs font-medium text-ink-700">
                  {vi ? "Số lần được dùng" : fi ? "Käyttökertojen määrä" : "Times it can be used"}
                  <input required type="number" min={1} className="input mt-1" value={form.maxUses} onChange={(e) => setForm({ ...form, maxUses: e.target.value })} />
                </label>
                <label className="text-xs font-medium text-ink-700">
                  {vi ? "Giá trị / giá bán" : fi ? "Arvo / hinta" : "Value / price"}
                  <div className="mt-1 flex gap-2">
                    <input required type="number" min={0} step="0.01" className="input flex-1" value={form.salePrice} onChange={(e) => setForm({ ...form, salePrice: e.target.value })} />
                    <input className="input w-24" value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value.toUpperCase() })} maxLength={3} />
                  </div>
                </label>
                {formError && <p className="text-sm text-berry-500 sm:col-span-2">{formError}</p>}
                <div className="sm:col-span-2">
                  <button type="submit" disabled={saving} className="btn-primary">
                    {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                    {vi ? "Tạo mẫu thẻ" : fi ? "Luo korttipohja" : "Create template"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {cards === null ? (
          <Loader2 className="h-5 w-5 animate-spin text-ink-400" />
        ) : cards.length === 0 ? (
          <p className="text-sm text-ink-400">{vi ? "Chưa có mẫu thẻ nào." : fi ? "Ei vielä korttipohjia." : "No templates yet."}</p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {cards.map((c) => (
              <li
                key={c.id}
                className={`relative overflow-hidden rounded-2xl p-5 text-white shadow-md transition ${
                  c.active ? "bg-gradient-to-br from-primary-800 via-primary-700 to-primary-500" : "bg-gradient-to-br from-ink-700 to-ink-400 opacity-70"
                }`}
              >
                <div className="pointer-events-none absolute -right-6 -top-8 h-28 w-28 rounded-full bg-coral-400/30 blur-2xl" />
                <div className="pointer-events-none absolute right-10 top-0 h-full w-3 bg-gradient-to-b from-peach-200 to-coral-500 opacity-80" />
                <div className="relative pr-12">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-peach-200">{vi ? "Thẻ quà tặng" : fi ? "Lahjakortti" : "Gift card"}</p>
                  <p className="mt-1 text-lg font-bold leading-tight">{c.name}</p>
                  <p className="mt-0.5 truncate text-xs text-white/70">{c.serviceName}</p>
                  <p className="mt-3 text-2xl font-bold text-peach-200">{formatMoney(c.salePriceCents, c.currency, locale)}</p>
                  <p className="mt-1 text-[11px] text-white/70">
                    {vi ? "giảm" : fi ? "alennus" : "off"} {c.discountPercent}% · {c.validDays} {vi ? "ngày" : fi ? "päivää" : "days"} · {c.maxUses} {vi ? "lần" : fi ? "käyttökertaa" : "uses"}
                  </p>
                </div>
                <div className="relative mt-4 flex gap-2">
                  {c.active && (
                    <button
                      type="button"
                      onClick={() => {
                        setIssue((s) => ({ ...s, giftCardId: c.id }));
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-primary-800 hover:bg-peach-50"
                    >
                      <Send className="h-3.5 w-3.5" />
                      {vi ? "Gửi thẻ này" : fi ? "Lähetä tämä" : "Send this"}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => toggleCard(c)}
                    className="inline-flex flex-1 items-center justify-center rounded-full border border-white/40 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10"
                  >
                    {c.active ? (vi ? "Ngừng bán" : fi ? "Lopeta myynti" : "Stop selling") : vi ? "Mở bán lại" : fi ? "Jatka myyntiä" : "Resume selling"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Sold / issued cards */}
      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="flex items-center gap-2 text-lg font-bold text-ink-900">
            <Ticket className="h-5 w-5 text-primary-500" />
            {vi ? "Thẻ đã bán / đã gửi" : fi ? "Myydyt / lähetetyt kortit" : "Cards sold / sent"}
          </h2>
          {(purchases?.length ?? 0) > 3 && (
            <label className="relative sm:w-72">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={vi ? "Tìm mã, tên, email" : fi ? "Hae koodilla, nimellä tai sähköpostilla" : "Search code, name, email"} className="input !pl-10" />
            </label>
          )}
        </div>
        {filteredPurchases === null ? (
          <Loader2 className="h-5 w-5 animate-spin text-ink-400" />
        ) : filteredPurchases.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-ink-100 p-8 text-center text-sm text-ink-400">
            {query ? (vi ? "Không có thẻ nào khớp." : fi ? "Ei sopivia kortteja." : "No matching cards.") : vi ? "Chưa bán thẻ nào." : fi ? "Kortteja ei ole vielä myyty." : "No cards sold yet."}
          </div>
        ) : (
          <ul className="space-y-3">
            {filteredPurchases.map((p) => (
              <li key={p.id} className="rounded-2xl border border-ink-100 bg-white p-4 shadow-sm transition hover:shadow-md">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-100 to-peach-100 text-primary-600">
                      <Gift className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-ink-900">{p.buyerName}</p>
                      <p className="truncate text-xs text-ink-400">
                        {p.buyerEmail}
                        {p.buyerPhone ? ` · ${p.buyerPhone}` : ""}
                      </p>
                    </div>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${STATE_STYLE[p.state].cls}`}>
                    {vi ? STATE_STYLE[p.state].vi : fi ? STATE_STYLE[p.state].fi : STATE_STYLE[p.state].en}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-700">
                  <span className="font-mono font-semibold tracking-widest text-primary-600">{p.code}</span>
                  <span>{p.cardName}</span>
                  <span className="font-semibold">{formatMoney(p.priceCents, p.currency, locale)}</span>
                  <span className="text-ink-400">
                    {vi ? "còn" : fi ? "jäljellä" : "left"} {p.usesLeft}/{p.maxUses}
                    {p.expiresAt ? ` · ${vi ? "HSD" : fi ? "vanhenee" : "exp."} ${new Date(p.expiresAt).toLocaleDateString(vi ? "vi-VN" : fi ? "fi-FI" : "en-GB")}` : ""}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href={`/api/business/gift-cards/purchases/${p.id}/image?locale=${locale}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline !px-3 !py-1.5 text-xs"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    {vi ? "Xem ảnh thẻ" : fi ? "Näytä kortti" : "View card"}
                  </a>
                  <a
                    href={`/api/business/gift-cards/purchases/${p.id}/image?locale=${locale}&download=1`}
                    className="btn-outline !px-3 !py-1.5 text-xs"
                  >
                    <Download className="h-3.5 w-3.5" />
                    {vi ? "Tải ảnh" : fi ? "Lataa" : "Download"}
                  </a>
                  <button type="button" disabled={sendingId === p.id} onClick={() => resend(p.id)} className="btn-outline !px-3 !py-1.5 text-xs">
                    {sendingId === p.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : sentId === p.id ? <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" /> : <Mail className="h-3.5 w-3.5" />}
                    {sentId === p.id ? (vi ? "Đã gửi" : fi ? "Lähetetty" : "Sent") : vi ? "Gửi lại email" : fi ? "Lähetä sähköposti uudelleen" : "Resend email"}
                  </button>
                  {p.state === "PENDING" && (
                    <button type="button" disabled={busy} onClick={() => confirmPurchase(p.id)} className="btn-primary !px-3 !py-1.5 text-xs">
                      {vi ? "Xác nhận đã thanh toán" : fi ? "Vahvista maksu" : "Confirm payment"}
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
