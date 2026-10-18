"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";

/** Copies an absolute URL (built from the current origin + `path`). */
export function CopyLinkButton({
  path,
  label,
  copiedLabel,
  className,
}: {
  path: string;
  label: string;
  copiedLabel: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(`${window.location.origin}${path}`);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          // Clipboard blocked — nothing useful to do here.
        }
      }}
      className={className}
    >
      {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
      {copied ? copiedLabel : label}
    </button>
  );
}
