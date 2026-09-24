"use client";

import { useState } from "react";
import { X } from "lucide-react";

export function CancellationPolicyLink({
  policy,
  locale,
}: {
  policy: string;
  locale: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-sm font-medium text-primary-600 hover:underline"
      >
        {locale === "vi" ? "Chính sách hủy đặt chỗ" : "Cancellation policy"}
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 p-4">
          <div className="card w-full max-w-md animate-slide-up p-6">
            <div className="mb-3 flex items-start justify-between">
              <p className="font-bold text-ink-900">
                {locale === "vi" ? "Chính sách hủy đặt chỗ" : "Cancellation policy"}
              </p>
              <button onClick={() => setOpen(false)} className="text-ink-400">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="whitespace-pre-line text-sm text-ink-700">{policy}</p>
          </div>
        </div>
      )}
    </>
  );
}
