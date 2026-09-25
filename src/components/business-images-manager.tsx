"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Loader2, Upload } from "lucide-react";
import { useRouter } from "@/i18n/navigation";

export function BusinessImagesManager({
  logoUrl,
  coverUrl,
  businessName,
}: {
  logoUrl: string | null;
  coverUrl: string | null;
  businessName: string;
}) {
  const tDash = useTranslations("dashboard");
  const router = useRouter();
  const [logo, setLogo] = useState(logoUrl);
  const [cover, setCover] = useState(coverUrl);
  const [uploading, setUploading] = useState<"logo" | "cover" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const logoInput = useRef<HTMLInputElement>(null);
  const coverInput = useRef<HTMLInputElement>(null);

  async function upload(file: File, kind: "logo" | "cover") {
    if (file.size > 5 * 1024 * 1024) {
      setError(tDash("businessImages.imageTooLarge"));
      return;
    }
    setUploading(kind);
    setError(null);
    const form = new FormData();
    form.append("file", file);
    form.append("kind", kind);
    const res = await fetch("/api/business/upload", { method: "POST", body: form });
    const data = await res.json();
    setUploading(null);
    if (!res.ok) {
      setError(tDash("businessImages.uploadFailed"));
      return;
    }
    if (kind === "logo") setLogo(data.url);
    else setCover(data.url);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="card p-5">
        <h2 className="mb-1 font-semibold text-ink-900">
          {tDash("businessImages.coverPhoto")}
        </h2>
        <p className="mb-3 text-xs text-ink-400">
          {tDash("businessImages.coverPhotoHint")}
        </p>
        <div className="relative mb-3 aspect-[3/1] w-full overflow-hidden rounded-xl bg-mist-100">
          {cover ? (
            <Image src={cover} alt="" fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-ink-400">
              {tDash("businessImages.noCoverYet")}
            </div>
          )}
        </div>
        <input
          ref={coverInput}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          hidden
          onChange={(e) => e.target.files?.[0] && upload(e.target.files[0], "cover")}
        />
        <button
          onClick={() => coverInput.current?.click()}
          disabled={uploading === "cover"}
          className="btn-outline !px-3 !py-1.5 text-xs"
        >
          {uploading === "cover" ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Upload className="h-3.5 w-3.5" />
          )}
          {tDash("businessImages.uploadCoverPhoto")}
        </button>
      </div>

      <div className="card p-5">
        <h2 className="mb-1 font-semibold text-ink-900">{tDash("businessImages.logo")}</h2>
        <p className="mb-3 text-xs text-ink-400">
          {tDash("businessImages.logoHint")}
        </p>
        <div className="mb-3 flex items-center gap-4">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-mist-100">
            {logo ? (
              <Image src={logo} alt="" fill className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-lg font-bold text-primary-500">
                {businessName.charAt(0)}
              </div>
            )}
          </div>
          <input
            ref={logoInput}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            hidden
            onChange={(e) => e.target.files?.[0] && upload(e.target.files[0], "logo")}
          />
          <button
            onClick={() => logoInput.current?.click()}
            disabled={uploading === "logo"}
            className="btn-outline !px-3 !py-1.5 text-xs"
          >
            {uploading === "logo" ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Upload className="h-3.5 w-3.5" />
            )}
            {tDash("businessImages.uploadLogo")}
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-berry-500">{error}</p>}
    </div>
  );
}
