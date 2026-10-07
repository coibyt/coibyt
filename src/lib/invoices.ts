import { randomBytes } from "crypto";
import QRCode from "qrcode";
import PDFDocument from "pdfkit";
import * as fontkit from "fontkit";
import { formatMoney } from "@/lib/money";
import { prisma } from "@/lib/prisma";
import type { Invoice } from "@prisma/client";
import {
  NOTO_SANS_REGULAR_B64,
  NOTO_SANS_BOLD_B64,
  NOTO_SANS_THAI_REGULAR_B64,
  NOTO_SANS_THAI_BOLD_B64,
  NOTO_SANS_KHMER_REGULAR_B64,
  NOTO_SANS_KHMER_BOLD_B64,
} from "@/lib/invoice-font-data";

export function randomInvoiceToken() {
  return randomBytes(16).toString("hex");
}

/** A human-facing invoice number — not a strict sequence (two invoices can
 * theoretically collide on the same millisecond + random suffix), which is
 * fine for a printed receipt: it only needs to look right and be easy to
 * read back over the phone, not reconcile against an accounting ledger. */
export function newInvoiceNumber(d = new Date()) {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  const suffix = randomBytes(2).toString("hex").toUpperCase();
  return `INV-${y}${m}${day}-${suffix}`;
}

export function invoicePublicUrl(token: string, locale?: string) {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com";
  // "as-needed" locale prefixing: the default locale (vi) has no prefix.
  const prefix = locale && locale !== "vi" ? `/${locale}` : "";
  return `${site}${prefix}/invoice/${token}`;
}

export function invoiceQrPng(token: string, locale?: string) {
  return QRCode.toBuffer(invoicePublicUrl(token, locale), { type: "png", width: 220, margin: 1 });
}

export interface InvoiceLine {
  name: string;
  qty: number;
  unitPriceCents: number;
  totalCents: number;
}

export interface InvoiceData {
  number: string;
  token: string;
  createdAt: Date;
  currency: string;
  lines: InvoiceLine[];
  subtotalCents: number;
  vatPercent: number;
  vatCents: number;
  totalCents: number;
  paymentMethod: "CASH" | "BANK_TRANSFER" | "GIFT_CARD";
  giftCardCode: string | null;
  note: string | null;
  companyName: string | null;
  companyAddress: string | null;
  companyTaxId: string | null;
  customerName: string;
  customerEmail: string | null;
  customerPhone: string | null;
  locale: string;
}

/** The token alone gates access, same trust model as the loyalty/gift-card
 * QR codes — anyone with the link (or who scans the printed QR) can view and
 * download that one invoice, nothing else. */
export async function findInvoiceByToken(token: string) {
  const invoice = await prisma.invoice.findUnique({ where: { token } });
  if (!invoice) return null;
  const customer = await prisma.user.findUnique({
    where: { id: invoice.customerId },
    select: { name: true, email: true, phone: true },
  });
  return { invoice, customer };
}

export function toInvoiceData(
  invoice: Invoice,
  customer: { name: string; email: string; phone: string | null } | null,
  locale: string
): InvoiceData {
  return {
    number: invoice.number,
    token: invoice.token,
    createdAt: invoice.createdAt,
    currency: invoice.currency,
    lines: invoice.lines as unknown as InvoiceLine[],
    subtotalCents: invoice.subtotalCents,
    vatPercent: invoice.vatPercent,
    vatCents: invoice.vatCents,
    totalCents: invoice.totalCents,
    paymentMethod: invoice.paymentMethod,
    giftCardCode: invoice.giftCardCode,
    note: invoice.note,
    companyName: invoice.companyName,
    companyAddress: invoice.companyAddress,
    companyTaxId: invoice.companyTaxId,
    customerName: customer?.name ?? "",
    customerEmail: customer?.email ?? null,
    customerPhone: customer?.phone ?? null,
    locale,
  };
}

export type InvoiceLocale = "vi" | "en" | "fi" | "pl" | "de" | "km" | "th";

export interface InvoiceLabels {
  documentTitle: string;
  fallbackTitle: string;
  invoiceNo: string;
  date: string;
  customer: string;
  service: string;
  qty: string;
  unit: string;
  lineTotal: string;
  subtotal: string;
  total: string;
  paymentMethod: string;
  giftCardCode: string;
  note: string;
  taxId: string;
  downloadPdf: string;
  scanToView: string;
  cash: string;
  bankTransfer: string;
  giftCard: string;
}

// Shared by both the public invoice page and the PDF renderer below, so the
// two never drift out of sync with each other.
export const INVOICE_LABELS: Record<InvoiceLocale, InvoiceLabels> = {
  vi: {
    documentTitle: "HÓA ĐƠN",
    fallbackTitle: "Hóa đơn",
    invoiceNo: "Số",
    date: "Ngày",
    customer: "Khách hàng",
    service: "Dịch vụ",
    qty: "SL",
    unit: "Đơn giá",
    lineTotal: "Thành tiền",
    subtotal: "Tạm tính",
    total: "Tổng cộng",
    paymentMethod: "Hình thức thanh toán",
    giftCardCode: "Mã thẻ quà tặng",
    note: "Ghi chú",
    taxId: "MST/ID DN",
    downloadPdf: "Tải xuống PDF",
    scanToView: "Quét để xem lại hóa đơn",
    cash: "Tiền mặt",
    bankTransfer: "Chuyển khoản ngân hàng",
    giftCard: "Thẻ quà tặng",
  },
  en: {
    documentTitle: "INVOICE",
    fallbackTitle: "Invoice",
    invoiceNo: "No.",
    date: "Date",
    customer: "Customer",
    service: "Service",
    qty: "Qty",
    unit: "Unit",
    lineTotal: "Total",
    subtotal: "Subtotal",
    total: "Total",
    paymentMethod: "Payment method",
    giftCardCode: "Gift card code",
    note: "Note",
    taxId: "Tax ID",
    downloadPdf: "Download PDF",
    scanToView: "Scan to view this invoice",
    cash: "Cash",
    bankTransfer: "Bank transfer",
    giftCard: "Gift card",
  },
  fi: {
    documentTitle: "LASKU",
    fallbackTitle: "Lasku",
    invoiceNo: "Nro",
    date: "Päivämäärä",
    customer: "Asiakas",
    service: "Palvelu",
    qty: "Määrä",
    unit: "Hinta/kpl",
    lineTotal: "Yhteensä",
    subtotal: "Välisumma",
    total: "Yhteensä",
    paymentMethod: "Maksutapa",
    giftCardCode: "Lahjakortin koodi",
    note: "Huomautus",
    taxId: "Y-tunnus",
    downloadPdf: "Lataa PDF",
    scanToView: "Skannaa nähdäksesi tämän laskun",
    cash: "Käteinen",
    bankTransfer: "Tilisiirto",
    giftCard: "Lahjakortti",
  },
  pl: {
    documentTitle: "FAKTURA",
    fallbackTitle: "Faktura",
    invoiceNo: "Nr",
    date: "Data",
    customer: "Klient",
    service: "Usługa",
    qty: "Ilość",
    unit: "Cena jedn.",
    lineTotal: "Razem",
    subtotal: "Suma częściowa",
    total: "Razem",
    paymentMethod: "Forma płatności",
    giftCardCode: "Kod karty podarunkowej",
    note: "Uwaga",
    taxId: "NIP",
    downloadPdf: "Pobierz PDF",
    scanToView: "Zeskanuj, aby zobaczyć tę fakturę",
    cash: "Gotówka",
    bankTransfer: "Przelew bankowy",
    giftCard: "Karta podarunkowa",
  },
  de: {
    documentTitle: "RECHNUNG",
    fallbackTitle: "Rechnung",
    invoiceNo: "Nr.",
    date: "Datum",
    customer: "Kunde",
    service: "Dienstleistung",
    qty: "Menge",
    unit: "Einzelpreis",
    lineTotal: "Gesamt",
    subtotal: "Zwischensumme",
    total: "Gesamt",
    paymentMethod: "Zahlungsart",
    giftCardCode: "Gutscheincode",
    note: "Hinweis",
    taxId: "Steuernummer",
    downloadPdf: "PDF herunterladen",
    scanToView: "Scannen, um diese Rechnung anzuzeigen",
    cash: "Bar",
    bankTransfer: "Banküberweisung",
    giftCard: "Geschenkgutschein",
  },
  km: {
    documentTitle: "វិក្កយបត្រ",
    fallbackTitle: "វិក្កយបត្រ",
    invoiceNo: "លេខ",
    date: "កាលបរិច្ឆេទ",
    customer: "អតិថិជន",
    service: "សេវាកម្ម",
    qty: "ចំនួន",
    unit: "តម្លៃឯកតា",
    lineTotal: "សរុប",
    subtotal: "សរុបរង",
    total: "សរុបទាំងអស់",
    paymentMethod: "វិធីទូទាត់",
    giftCardCode: "កូដកាតអំណោយ",
    note: "កំណត់ចំណាំ",
    taxId: "លេខអត្តសញ្ញាណពន្ធ",
    downloadPdf: "ទាញយក PDF",
    scanToView: "ស្កេនដើម្បីមើលវិក្កយបត្រនេះ",
    cash: "សាច់ប្រាក់",
    bankTransfer: "ផ្ទេរប្រាក់តាមធនាគារ",
    giftCard: "កាតអំណោយ",
  },
  th: {
    documentTitle: "ใบแจ้งหนี้",
    fallbackTitle: "ใบแจ้งหนี้",
    invoiceNo: "เลขที่",
    date: "วันที่",
    customer: "ลูกค้า",
    service: "บริการ",
    qty: "จำนวน",
    unit: "ราคาต่อหน่วย",
    lineTotal: "รวม",
    subtotal: "ยอดรวมย่อย",
    total: "ยอดรวมทั้งหมด",
    paymentMethod: "วิธีชำระเงิน",
    giftCardCode: "รหัสบัตรของขวัญ",
    note: "หมายเหตุ",
    taxId: "เลขผู้เสียภาษี",
    downloadPdf: "ดาวน์โหลด PDF",
    scanToView: "สแกนเพื่อดูใบแจ้งหนี้นี้",
    cash: "เงินสด",
    bankTransfer: "โอนเงินผ่านธนาคาร",
    giftCard: "บัตรของขวัญ",
  },
};

export function invoiceLabels(locale: string): InvoiceLabels {
  return INVOICE_LABELS[locale as InvoiceLocale] ?? INVOICE_LABELS.vi;
}

export function paymentMethodLabel(method: InvoiceData["paymentMethod"], locale: string): string {
  const l = invoiceLabels(locale);
  return method === "CASH" ? l.cash : method === "BANK_TRANSFER" ? l.bankTransfer : l.giftCard;
}

// Fonts are embedded as base64 (src/lib/invoice-font-data.ts, generated by
// scripts/embed-invoice-fonts.cjs) rather than read from src/assets/fonts at
// runtime — a loose file on disk depends on the host's deploy pipeline
// carrying it over correctly, which isn't guaranteed; a Buffer baked into
// the JS bundle always ships with the code that needs it.
function fontBuffer(b64: string): Buffer {
  return Buffer.from(b64, "base64");
}

// Noto Sans (Latin/Vietnamese) doesn't cover Thai or Khmer glyphs — those
// need their own Noto Sans Thai / Noto Sans Khmer files. But those script
// fonts are themselves subsets with NO Latin letters or digits (by Noto's
// own design, meant to be paired with a base Latin font) — so a Thai/Khmer
// invoice still needs Noto Sans too, for the customer's name, email, prices
// and dates, which stay Latin/digits regardless of the viewer's language.
function fontsForLocale(locale: string): { regular: Buffer; bold: Buffer; needsLatinFallback: boolean } {
  if (locale === "th")
    return {
      regular: fontBuffer(NOTO_SANS_THAI_REGULAR_B64),
      bold: fontBuffer(NOTO_SANS_THAI_BOLD_B64),
      needsLatinFallback: true,
    };
  if (locale === "km")
    return {
      regular: fontBuffer(NOTO_SANS_KHMER_REGULAR_B64),
      bold: fontBuffer(NOTO_SANS_KHMER_BOLD_B64),
      needsLatinFallback: true,
    };
  return { regular: fontBuffer(NOTO_SANS_REGULAR_B64), bold: fontBuffer(NOTO_SANS_BOLD_B64), needsLatinFallback: false };
}

/** Looks up, per character, whether the script font (Thai/Khmer) actually
 * has a glyph for it — rather than guessing from Unicode ranges, which
 * would miss punctuation the script font does or doesn't include. */
function glyphChecker(fontData: Buffer): (ch: string) => boolean {
  // Our font files are plain .ttf, never a .ttc collection.
  const font = fontkit.create(fontData) as fontkit.Font;
  return (ch: string) => {
    const cp = ch.codePointAt(0);
    if (cp === undefined) return false;
    try {
      return font.glyphForCodePoint(cp).id !== 0;
    } catch {
      return false;
    }
  };
}

type TextOpts = PDFKit.Mixins.TextOptions & { bold?: boolean };

/** Writes text that may mix the script font's own characters with
 * Latin/digit content the script font can't render — splitting into runs
 * and chaining them with pdfkit's `continued` text so they stay on one
 * line, each in whichever registered font actually has those glyphs. For
 * single-font locales (`hasScriptGlyph` null) it's just a thin pass-through. */
function createTextWriter(doc: PDFKit.PDFDocument, hasScriptGlyph: ((ch: string) => boolean) | null) {
  function runsFor(str: string): { text: string; useScript: boolean }[] {
    if (!hasScriptGlyph) return [{ text: str, useScript: true }];
    const runs: { text: string; useScript: boolean }[] = [];
    let cur = "";
    let curUseScript: boolean | null = null;
    for (const ch of Array.from(str)) {
      const useScript = hasScriptGlyph(ch);
      if (curUseScript === null) {
        curUseScript = useScript;
        cur = ch;
      } else if (useScript === curUseScript) {
        cur += ch;
      } else {
        runs.push({ text: cur, useScript: curUseScript });
        cur = ch;
        curUseScript = useScript;
      }
    }
    if (cur) runs.push({ text: cur, useScript: curUseScript! });
    return runs;
  }

  function render(str: string, x: number | undefined, y: number | undefined, opts: TextOpts) {
    const { bold, ...rest } = opts;
    const runs = runsFor(str);
    runs.forEach((run, i) => {
      doc.font(run.useScript ? (bold ? "Bold" : "Body") : bold ? "BoldLatin" : "BodyLatin");
      const isLast = i === runs.length - 1;
      if (i === 0 && (x !== undefined || y !== undefined)) {
        doc.text(run.text, x, y, { ...rest, continued: !isLast });
      } else {
        doc.text(run.text, { ...rest, continued: !isLast });
      }
    });
  }

  return {
    text: (str: string, opts: TextOpts = {}) => render(str, undefined, undefined, opts),
    textAt: (str: string, x: number, y: number, opts: TextOpts = {}) => render(str, x, y, opts),
  };
}

/** Renders one invoice as a one-page A4 PDF — service lines, VAT breakdown,
 * payment method and a QR code back to the public /invoice/[token] page so
 * the customer can always re-download it later, fully in the viewer's own
 * language (see INVOICE_LABELS above). */
export async function renderInvoicePdf(invoice: InvoiceData): Promise<Buffer> {
  const l = invoiceLabels(invoice.locale);
  const fonts = fontsForLocale(invoice.locale);
  const qrPng = await invoiceQrPng(invoice.token, invoice.locale);

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const chunks: Buffer[] = [];
    doc.on("data", (c) => chunks.push(c));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc.registerFont("Body", fonts.regular);
    doc.registerFont("Bold", fonts.bold);
    let hasScriptGlyph: ((ch: string) => boolean) | null = null;
    if (fonts.needsLatinFallback) {
      doc.registerFont("BodyLatin", fontBuffer(NOTO_SANS_REGULAR_B64));
      doc.registerFont("BoldLatin", fontBuffer(NOTO_SANS_BOLD_B64));
      hasScriptGlyph = glyphChecker(fonts.regular);
    }
    const w = createTextWriter(doc, hasScriptGlyph);

    doc.fontSize(20);
    w.text(invoice.companyName || l.fallbackTitle, { bold: true });
    doc.fontSize(10).fillColor("#555");
    if (invoice.companyAddress) w.text(invoice.companyAddress);
    if (invoice.companyTaxId) w.text(`${l.taxId}: ${invoice.companyTaxId}`);
    doc.fillColor("#000");
    doc.moveDown(1.2);

    doc.fontSize(14);
    w.text(l.documentTitle, { bold: true });
    doc.fontSize(10).fillColor("#555");
    w.text(`${l.invoiceNo}: ${invoice.number}`);
    w.text(`${l.date}: ${invoice.createdAt.toLocaleString(invoice.locale)}`);
    doc.fillColor("#000");
    doc.moveDown(0.8);

    doc.fontSize(11);
    w.text(l.customer, { bold: true });
    doc.fontSize(10);
    w.text(invoice.customerName);
    if (invoice.customerPhone) w.text(invoice.customerPhone);
    if (invoice.customerEmail) w.text(invoice.customerEmail);
    doc.moveDown(1);

    const tableTop = doc.y;
    const col = { name: 50, qty: 320, unit: 380, total: 470 };
    doc.fontSize(10);
    w.textAt(l.service, col.name, tableTop, { bold: true });
    w.textAt(l.qty, col.qty, tableTop, { bold: true });
    w.textAt(l.unit, col.unit, tableTop, { bold: true });
    w.textAt(l.lineTotal, col.total, tableTop, { bold: true });
    doc.moveTo(50, tableTop + 15).lineTo(545, tableTop + 15).strokeColor("#ddd").stroke();

    let y = tableTop + 22;
    for (const line of invoice.lines) {
      w.textAt(line.name, col.name, y, { width: 260 });
      w.textAt(String(line.qty), col.qty, y);
      w.textAt(formatMoney(line.unitPriceCents, invoice.currency, invoice.locale), col.unit, y);
      w.textAt(formatMoney(line.totalCents, invoice.currency, invoice.locale), col.total, y);
      y += 20;
    }
    doc.moveTo(50, y + 2).lineTo(545, y + 2).strokeColor("#ddd").stroke();
    y += 14;

    w.textAt(l.subtotal, col.unit, y);
    w.textAt(formatMoney(invoice.subtotalCents, invoice.currency, invoice.locale), col.total, y);
    y += 16;
    w.textAt(`VAT (${invoice.vatPercent}%)`, col.unit, y);
    w.textAt(formatMoney(invoice.vatCents, invoice.currency, invoice.locale), col.total, y);
    y += 16;
    doc.fontSize(12);
    w.textAt(l.total, col.unit, y, { bold: true });
    w.textAt(formatMoney(invoice.totalCents, invoice.currency, invoice.locale), col.total, y, { bold: true });
    doc.fontSize(10);
    y += 26;

    w.textAt(`${l.paymentMethod}: ${paymentMethodLabel(invoice.paymentMethod, invoice.locale)}`, 50, y);
    if (invoice.paymentMethod === "GIFT_CARD" && invoice.giftCardCode) {
      y += 14;
      w.textAt(`${l.giftCardCode}: ${invoice.giftCardCode}`, 50, y);
    }
    if (invoice.note) {
      y += 14;
      w.textAt(`${l.note}: ${invoice.note}`, 50, y, { width: 350 });
    }

    doc.image(qrPng, 465, tableTop + 60, { width: 80 });
    doc.fontSize(7).fillColor("#888");
    w.textAt(l.scanToView, 455, tableTop + 142, { width: 100, align: "center" });

    doc.end();
  });
}
