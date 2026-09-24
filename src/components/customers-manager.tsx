"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Search, Loader2, X } from "lucide-react";
import { formatMoney } from "@/lib/money";

interface CustomerRow {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  visits: number;
  spentCents: number;
  currency: string;
  lastVisit: string;
}

interface CustomerDetail {
  customer: { name: string; phone: string | null; email: string };
  visitCount: number;
  totalSpentCents: number;
  currency: string;
  bookings: {
    id: string;
    startsAt: string;
    status: string;
    staffName: string | null;
    cancelReason: string | null;
    serviceName: string;
    priceCents: number;
    currency: string;
  }[];
}

export function CustomersManager({
  customers,
  locale,
}: {
  customers: CustomerRow[];
  locale: string;
}) {
  const t = useTranslations("customers");
  const tStatus = useTranslations("booking.status");
  const tCancelReason = useTranslations("booking.cancelReason");
  const [query, setQuery] = useState("");
  const [detailFor, setDetailFor] = useState<CustomerRow | null>(null);
  const [detail, setDetail] = useState<CustomerDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        (c.phone ?? "").toLowerCase().includes(q)
    );
  }, [customers, query]);

  function openDetail(c: CustomerRow) {
    setDetailFor(c);
    setDetail(null);
    setLoadingDetail(true);
    fetch(`/api/business/customers/${c.id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then(setDetail)
      .finally(() => setLoadingDetail(false));
  }

  if (customers.length === 0) {
    return <p className="text-sm text-ink-400">{t("empty")}</p>;
  }

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="input !pl-9"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-ink-400">{t("noMatch")}</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-ink-100">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="bg-mist-50 text-left text-xs uppercase text-ink-400">
              <tr>
                <th className="px-4 py-3">{t("columnName")}</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">{locale === "vi" ? "Số điện thoại" : "Phone"}</th>
                <th className="px-4 py-3">{t("columnVisits")}</th>
                <th className="px-4 py-3">{t("columnLastVisit")}</th>
                <th className="px-4 py-3">{t("columnSpent")}</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-t border-ink-100">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-500">
                        {c.name.charAt(0).toUpperCase()}
                      </span>
                      <span className="font-medium text-ink-900">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-700">{c.email}</td>
                  <td className="px-4 py-3 text-ink-700">{c.phone ?? "—"}</td>
                  <td className="px-4 py-3 text-ink-700">{c.visits}</td>
                  <td className="px-4 py-3 text-ink-700">
                    {new Date(c.lastVisit).toLocaleDateString(
                      locale === "vi" ? "vi-VN" : "en-US",
                      { dateStyle: "medium" }
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-ink-900">
                    {formatMoney(c.spentCents, c.currency, locale)}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => openDetail(c)}
                      className="text-xs font-medium text-primary-600 hover:underline"
                    >
                      {locale === "vi" ? "Chi tiết" : "Details"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {detailFor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 p-4">
          <div className="card w-full max-w-md animate-slide-up p-6">
            <div className="mb-3 flex items-start justify-between">
              <p className="font-bold text-ink-900">{detailFor.name}</p>
              <button onClick={() => setDetailFor(null)} className="text-ink-400">
                <X className="h-5 w-5" />
              </button>
            </div>
            {loadingDetail && (
              <p className="flex items-center gap-2 text-sm text-ink-400">
                <Loader2 className="h-4 w-4 animate-spin" /> ...
              </p>
            )}
            {detail && (
              <div className="space-y-3 text-sm">
                <p className="text-ink-700">{detail.customer.email}</p>
                {detail.customer.phone && <p className="text-ink-700">{detail.customer.phone}</p>}
                <p className="text-ink-700">
                  {locale === "vi"
                    ? `Đã hoàn thành ${detail.visitCount} lượt`
                    : `${detail.visitCount} completed visit${detail.visitCount === 1 ? "" : "s"}`}
                  {detail.visitCount > 0 &&
                    ` · ${formatMoney(detail.totalSpentCents, detail.currency, locale)}`}
                </p>
                <ul className="max-h-64 space-y-2 overflow-y-auto">
                  {detail.bookings.map((b) => (
                    <li key={b.id} className="rounded-lg bg-mist-50 p-2.5 text-xs">
                      <div className="flex justify-between gap-2">
                        <span className="font-medium text-ink-900">
                          {new Date(b.startsAt).toLocaleDateString(
                            locale === "vi" ? "vi-VN" : "en-US",
                            { dateStyle: "medium" }
                          )}{" "}
                          — {b.serviceName}
                        </span>
                        <span className="shrink-0">{formatMoney(b.priceCents, b.currency, locale)}</span>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-x-2 text-ink-400">
                        {b.staffName && <span>{b.staffName}</span>}
                        <span>{tStatus(b.status as never)}</span>
                        {b.cancelReason && <span>{tCancelReason(b.cancelReason as never)}</span>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
