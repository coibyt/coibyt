"use client";

import { useEffect, useRef, useState } from "react";
import { CameraOff, Loader2 } from "lucide-react";

interface Detector {
  detect(source: CanvasImageSource): Promise<{ rawValue: string }[]>;
}
type DetectorCtor = {
  new (opts: { formats: string[] }): Detector;
  getSupportedFormats?: () => Promise<string[]>;
};

const FORMATS = ["ean_13", "ean_8", "upc_a", "upc_e", "code_128", "code_39", "code_93", "itf", "codabar", "qr_code", "data_matrix"];
// Safari (iPhone) has no BarcodeDetector: the same API built on ZXing, loaded
// from the CDN only when needed, so it isn't in the app's bundle.
const PONYFILL_URL = "https://cdn.jsdelivr.net/npm/barcode-detector@3.2.2/ponyfill/+esm";

let detectorPromise: Promise<Detector | null> | null = null;
function getDetector() {
  detectorPromise ??= (async () => {
    const native = (window as unknown as { BarcodeDetector?: DetectorCtor }).BarcodeDetector;
    if (native) {
      try {
        const supported = (await native.getSupportedFormats?.()) ?? FORMATS;
        const formats = FORMATS.filter((f) => supported.includes(f));
        if (formats.length) return new native({ formats });
      } catch {
        // fall through to the ponyfill
      }
    }
    try {
      const url = PONYFILL_URL;
      const mod = (await import(/* webpackIgnore: true */ url)) as { BarcodeDetector: DetectorCtor };
      return new mod.BarcodeDetector({ formats: FORMATS });
    } catch {
      return null;
    }
  })();
  return detectorPromise;
}

/** The phone's back camera, reading barcodes and QR codes continuously.
 * Calls onCode once per code (the same code again only after a pause), and
 * not at all while `paused`. Shows `offText` when there's no camera. */
export function CameraScanner({ onCode, paused, hint, offText }: { onCode: (code: string) => void; paused: boolean; hint: string; offText: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<"starting" | "on" | "off">("starting");
  const pausedRef = useRef(paused);
  const onCodeRef = useRef(onCode);
  pausedRef.current = paused;
  onCodeRef.current = onCode;

  useEffect(() => {
    let stream: MediaStream | null = null;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let stopped = false;
    let last = { code: "", at: 0 };

    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment", width: { ideal: 1280 } }, audio: false });
      } catch {
        if (!stopped) setState("off");
        return;
      }
      const video = videoRef.current;
      if (!video || stopped) return;
      video.srcObject = stream;
      await video.play().catch(() => {});
      const detector = await getDetector();
      if (stopped) return;
      if (!detector) {
        setState("off");
        return;
      }
      setState("on");
      const tick = async () => {
        if (stopped) return;
        if (!pausedRef.current && video.readyState >= 2) {
          try {
            const found = await detector.detect(video);
            const code = found[0]?.rawValue?.trim();
            const now = Date.now();
            if (code && (code !== last.code || now - last.at > 3000)) {
              last = { code, at: now };
              navigator.vibrate?.(60);
              onCodeRef.current(code);
            }
          } catch {
            // a frame that couldn't be read
          }
        }
        timer = setTimeout(tick, 220);
      };
      void tick();
    })();

    return () => {
      stopped = true;
      if (timer) clearTimeout(timer);
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-[#1f182d]">
      <video ref={videoRef} playsInline muted className={`h-full w-full object-cover transition ${paused ? "opacity-30 blur-sm" : ""}`} />
      {state === "on" && !paused && (
        <>
          <div className="pointer-events-none absolute inset-x-[12%] top-1/2 h-[42%] -translate-y-1/2 rounded-2xl border-2 border-white/80 shadow-[0_0_0_999px_rgba(31,24,45,0.35)]" />
          <div className="pointer-events-none absolute inset-x-[16%] top-1/2 h-0.5 -translate-y-1/2 animate-pulse bg-[#e0559b]" />
          <p className="absolute inset-x-0 bottom-3 text-center text-xs font-semibold text-white/90">{hint}</p>
        </>
      )}
      {state === "starting" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-7 w-7 animate-spin text-white/70" />
        </div>
      )}
      {state === "off" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
          <CameraOff className="h-8 w-8 text-white/60" />
          <p className="text-sm text-white/80">{offText}</p>
        </div>
      )}
    </div>
  );
}

/** A photo from the camera or gallery, shrunk to fit `maxSide`, as a JPEG data URL. */
export async function shrinkPhoto(file: File, maxSide: number, quality = 0.82): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = reject;
      i.src = url;
    });
    const scale = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.naturalWidth * scale);
    canvas.height = Math.round(img.naturalHeight * scale);
    canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", quality);
  } finally {
    URL.revokeObjectURL(url);
  }
}
