"use client";

import { useSession } from "next-auth/react";
import { CloudUpload, ShieldCheck } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { accountStrings } from "@/lib/academy/account-strings";

/** "Save your progress": a sign-up invitation for visitors, a quiet
 * confirmation for signed-in learners. Both links come back to this page. */
export function AcademyAccountCta({ locale, tone = "light", className = "" }: { locale: string; tone?: "light" | "dark"; className?: string }) {
  const s = accountStrings(locale);
  const { data, status } = useSession();
  const path = usePathname();
  const back = `?callbackUrl=${encodeURIComponent(path)}`;
  const dark = tone === "dark";

  if (status === "loading") return null;

  if (status === "authenticated") {
    return (
      <div className={`flex items-start gap-3 rounded-2xl px-4 py-3 text-sm ${dark ? "bg-white/10 text-white/85 ring-1 ring-white/15" : "bg-emerald-50 text-emerald-900 ring-1 ring-emerald-100"} ${className}`}>
        <ShieldCheck className={`mt-0.5 h-5 w-5 shrink-0 ${dark ? "text-[#e8d3a6]" : "text-emerald-600"}`} />
        <div>
          <p className="font-bold">{s.savedTitle}</p>
          <p className={`mt-0.5 ${dark ? "text-white/70" : "text-emerald-800/80"}`}>{s.savedBody(data?.user?.name || data?.user?.email || "")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden rounded-3xl p-5 ${dark ? "bg-white/10 text-white ring-1 ring-white/15" : "bg-gradient-to-br from-[#2a1f3d] via-primary-900 to-[#150f20] text-white shadow-card ring-1 ring-[#e8d3a6]/30"} ${className}`}>
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f0dcae] to-[#b9852d] text-[#1f182d]">
          <CloudUpload className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="text-base font-extrabold">{s.saveTitle}</p>
          <p className="mt-1 text-sm text-white/75">{s.saveBody}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href={`/auth/sign-up${back}`} className="inline-flex items-center rounded-full bg-gradient-to-r from-[#f0d9a0] via-[#e8d3a6] to-[#c9a25a] px-4 py-2 text-sm font-extrabold text-primary-900 shadow-card">
              {s.signUp}
            </Link>
            <Link href={`/auth/sign-in${back}`} className="inline-flex items-center rounded-full px-4 py-2 text-sm font-bold text-white ring-1 ring-white/30 hover:bg-white/10">
              {s.signIn}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
