"use client";

import { useState } from "react";
import { Download, GraduationCap, Lock } from "lucide-react";
import { academyStrings } from "@/lib/academy/strings";
import type { Audience } from "@/lib/academy/types";
import { useAcademyProgress } from "@/components/academy/use-progress";

const W = 1600;
const H = 1130;

function loadImage(src: string) {
  return new Promise<HTMLImageElement | null>((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

/** Text that shrinks until it fits the given width. */
function fitText(ctx: CanvasRenderingContext2D, text: string, weight: string, size: number, family: string, max: number) {
  let px = size;
  do {
    ctx.font = `${weight} ${px}px ${family}`;
    px -= 4;
  } while (ctx.measureText(text).width > max && px > 24);
}

/** The reward for finishing a whole track: a certificate with the learner's
 * name, drawn in the browser and saved as a picture. */
export function AcademyCertificate({ locale, audience, done, total }: { locale: string; audience: Audience; done: number; total: number }) {
  const s = academyStrings(locale);
  const { state, update } = useAcademyProgress();
  const [busy, setBusy] = useState(false);
  const complete = total > 0 && done === total;
  const name = state.name ?? "";

  if (total === 0) return null;

  const download = async () => {
    const who = name.trim();
    if (!who || busy) return;
    setBusy(true);
    try {
      const family = getComputedStyle(document.body).fontFamily || "sans-serif";
      await document.fonts?.ready;
      const canvas = document.createElement("canvas");
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, "#2a1f3d");
      bg.addColorStop(0.55, "#1f182d");
      bg.addColorStop(1, "#120d1c");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);
      const glow = ctx.createRadialGradient(W * 0.82, H * 0.1, 0, W * 0.82, H * 0.1, 620);
      glow.addColorStop(0, "rgba(176,138,62,0.34)");
      glow.addColorStop(1, "rgba(176,138,62,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      const gold = ctx.createLinearGradient(0, 0, W, 0);
      gold.addColorStop(0, "#b08a3e");
      gold.addColorStop(0.5, "#f0d9a0");
      gold.addColorStop(1, "#b08a3e");
      ctx.strokeStyle = gold;
      ctx.lineWidth = 6;
      ctx.strokeRect(46, 46, W - 92, H - 92);
      ctx.lineWidth = 1.5;
      ctx.strokeRect(66, 66, W - 132, H - 132);

      const logo = await loadImage("/icons/icon-192.png");
      if (logo) {
        ctx.save();
        ctx.beginPath();
        if (typeof ctx.roundRect === "function") ctx.roundRect(W / 2 - 55, 120, 110, 110, 28);
        else ctx.rect(W / 2 - 55, 120, 110, 110);
        ctx.clip();
        ctx.drawImage(logo, W / 2 - 55, 120, 110, 110);
        ctx.restore();
      }

      ctx.textAlign = "center";
      ctx.fillStyle = "#e8d3a6";
      ctx.font = `700 30px ${family}`;
      ctx.fillText(spaced(s.certHeading), W / 2, 310);

      ctx.fillStyle = "#ffffff";
      fitText(ctx, who, "800", 112, family, W - 320);
      ctx.fillText(who, W / 2, 480);

      ctx.fillStyle = gold;
      ctx.fillRect(W / 2 - 110, 530, 220, 3);

      ctx.fillStyle = "rgba(255,255,255,0.78)";
      ctx.font = `500 36px ${family}`;
      ctx.fillText(s.certLine, W / 2, 620);

      ctx.fillStyle = "#f0d9a0";
      fitText(ctx, s.certTrack[audience], "800", 58, family, W - 320);
      ctx.fillText(s.certTrack[audience], W / 2, 710);

      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.font = `500 30px ${family}`;
      const date = new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" }).format(new Date());
      ctx.fillText(`${s.certIssued} ${date}  ·  ${s.lessonsCount(total)}`, W / 2, 820);

      ctx.fillStyle = "#ffffff";
      ctx.font = `800 40px ${family}`;
      ctx.fillText("VaraaAi", W / 2, 950);
      ctx.fillStyle = "rgba(232,211,166,0.9)";
      ctx.font = `600 24px ${family}`;
      ctx.fillText("varaaai.com/academy", W / 2, 992);

      const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/png"));
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `varaaai-academy-${audience}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-br from-[#2a1f3d] via-primary-900 to-[#150f20] p-6 text-white ring-1 ring-[#e8d3a6]/30 sm:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <div className="flex items-start gap-4 md:flex-1">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f0d9a0] to-[#b08a3e] text-primary-900 shadow-[0_12px_30px_-10px_rgba(176,138,62,0.9)]">
            {complete ? <GraduationCap className="h-7 w-7" /> : <Lock className="h-6 w-6" />}
          </span>
          <div className="min-w-0">
            <h2 className="text-xl font-extrabold sm:text-2xl">{s.certTitle}</h2>
            <p className="mt-1 text-sm font-semibold text-[#e8d3a6]">{s.certTrack[audience]}</p>
            <p className="mt-2 text-sm leading-relaxed text-white/75">{complete ? s.certReady : s.certLocked(total - done)}</p>
            {!complete && (
              <div className="mt-4 h-2 max-w-sm overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-[#f0d9a0] to-[#b08a3e] transition-[width] duration-500" style={{ width: `${(done / total) * 100}%` }} />
              </div>
            )}
          </div>
        </div>
        {complete && (
          <div className="w-full md:w-[340px]">
            <label htmlFor="academy-cert-name" className="text-xs font-bold uppercase tracking-[0.16em] text-[#e8d3a6]">
              {s.certName}
            </label>
            <input
              id="academy-cert-name"
              value={name}
              maxLength={60}
              onChange={(e) => update((st) => ({ ...st, name: e.target.value }))}
              placeholder={s.certNamePh}
              autoComplete="name"
              className="mt-1.5 w-full rounded-2xl bg-white/10 px-4 py-3 text-base font-semibold text-white outline-none ring-1 ring-white/20 placeholder:text-white/40 focus:ring-2 focus:ring-[#e8d3a6]"
            />
            <button
              type="button"
              onClick={download}
              disabled={!name.trim() || busy}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f0d9a0] to-[#b08a3e] px-6 py-3 text-sm font-extrabold text-primary-900 transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              {s.certDownload}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/** Letter-spaced capitals (canvas letterSpacing isn't available everywhere). */
const spaced = (t: string) => t.split("").join("  ");
