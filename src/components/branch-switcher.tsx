"use client";

import { useState } from "react";
import { Building2, Plus, Loader2 } from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";

const LABELS: Record<string, { branch: string; addBranch: string }> = {
  vi: { branch: "Chi nhánh", addBranch: "Thêm chi nhánh" },
  en: { branch: "Branch", addBranch: "Add branch" },
  fi: { branch: "Toimipiste", addBranch: "Lisää toimipiste" },
  pl: { branch: "Oddział", addBranch: "Dodaj oddział" },
  de: { branch: "Filiale", addBranch: "Filiale hinzufügen" },
  km: { branch: "សាខា", addBranch: "បន្ថែមសាខា" },
  th: { branch: "สาขา", addBranch: "เพิ่มสาขา" },
};

/** Lets an owner with several branches jump between them from any dashboard
 * page (including the bookings calendar), and start a new branch. */
export function BranchSwitcher({
  branches,
  activeId,
  locale,
}: {
  branches: { id: string; name: string }[];
  activeId: string;
  locale: string;
}) {
  const router = useRouter();
  const l = LABELS[locale] ?? LABELS.en;
  const [switching, setSwitching] = useState(false);

  async function switchTo(businessId: string) {
    if (businessId === activeId) return;
    setSwitching(true);
    await fetch("/api/business/switch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ businessId }),
    });
    router.refresh();
    setSwitching(false);
  }

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      {branches.length > 1 && (
        <label className="flex items-center gap-2 text-sm font-medium text-ink-900">
          {switching ? (
            <Loader2 className="h-4 w-4 animate-spin text-ink-400" />
          ) : (
            <Building2 className="h-4 w-4 text-ink-400" />
          )}
          <span className="sr-only">{l.branch}</span>
          <select
            className="input !w-auto !py-1.5 text-sm"
            value={activeId}
            disabled={switching}
            onChange={(e) => switchTo(e.target.value)}
            aria-label={l.branch}
          >
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </label>
      )}
      <Link href="/business/apply?branch=1" className="btn-ghost !px-3 !py-1.5 text-xs">
        <Plus className="h-3.5 w-3.5" /> {l.addBranch}
      </Link>
    </div>
  );
}
