"use client";

import type { ReactNode } from "react";
import { usePathname } from "@/i18n/navigation";

/** Pages where the working area matters more than the chrome around it: on a
 * phone the menu shrinks to one slim row so the booking calendar gets the
 * height. Every other dashboard page keeps the roomy layout. */
export function isCompactDashboardPage(pathname: string) {
  return pathname === "/business/dashboard/bookings";
}

export function DashboardShell({ children }: { children: ReactNode }) {
  const compact = isCompactDashboardPage(usePathname());
  return (
    <div
      className={`container grid grid-cols-1 md:grid-cols-[180px_1fr] md:gap-6 md:py-10 ${
        compact ? "gap-2 py-2" : "gap-6 py-10"
      }`}
    >
      {children}
    </div>
  );
}
