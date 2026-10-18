import type { Prisma } from "@prisma/client";
import type { PriceListDoc } from "./types";

const MAX_LOGO_BYTES = 2_500_000;

/** Stores the logo in its own blob column instead of inside the JSON. */
export function splitLogo(doc: PriceListDoc): { data: Prisma.InputJsonValue; logoData: Buffer | null; logoMime: string | null } {
  const { logo, ...rest } = doc;
  const m = logo ? /^data:(image\/(?:png|jpeg));base64,(.+)$/.exec(logo) : null;
  const buf = m ? Buffer.from(m[2], "base64") : null;
  const ok = buf && buf.length <= MAX_LOGO_BYTES;
  return {
    data: rest as unknown as Prisma.InputJsonValue,
    logoData: ok ? buf : null,
    logoMime: ok ? m![1] : null,
  };
}

export function joinLogo(data: unknown, logoData: Uint8Array | null, logoMime: string | null): unknown {
  if (!data || typeof data !== "object") return data;
  return {
    ...(data as object),
    logo: logoData && logoMime ? `data:${logoMime};base64,${Buffer.from(logoData).toString("base64")}` : null,
  };
}
