"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
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

export function CustomersManager({
  customers,
  locale,
}: {
  customers: CustomerRow[];
  locale: string;
}) {
  const t = useTranslations("customers");
  const [query, setQuery] = useState("");

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
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-mist-50 text-left text-xs uppercase text-ink-400">
              <tr>
                <th className="px-4 py-3">{t("columnName")}</th>
                <th className="px-4 py-3">{t("columnContact")}</th>
                <th className="px-4 py-3">{t("columnVisits")}</th>
                <th className="px-4 py-3">{t("columnLastVisit")}</th>
                <th className="px-4 py-3">{t("columnSpent")}</th>
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
                  <td className="px-4 py-3 text-ink-700">
                    <div>{c.email}</div>
                    {c.phone && <div className="text-xs text-ink-400">{c.phone}</div>}
                  </td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
