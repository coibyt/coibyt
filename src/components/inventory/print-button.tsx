"use client";

import { Printer } from "lucide-react";

export function PrintButton({ label }: { label: string }) {
  return (
    <button type="button" onClick={() => window.print()} className="flex items-center gap-1.5 rounded-full bg-[#1f182d] px-4 py-2.5 text-sm font-bold text-white">
      <Printer className="h-4 w-4" />
      {label}
    </button>
  );
}
