import QRCode from "qrcode";

/** The QR code as a square grid of dark/light modules (no quiet zone). Used by
 * both renderers so the QR is drawn as crisp squares — vector in the PDF. */
export function qrMatrix(data: string, ec: "M" | "H" = "M"): { size: number; dark: (row: number, col: number) => boolean } {
  const qr = QRCode.create(data, { errorCorrectionLevel: ec });
  const { size, data: bits } = qr.modules as unknown as { size: number; data: Uint8Array };
  return { size, dark: (r, c) => bits[r * size + c] === 1 };
}
