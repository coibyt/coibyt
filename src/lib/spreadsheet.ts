import { strFromU8, unzipSync } from "fflate";

/** Reads the first sheet of an Excel (.xlsx) or CSV file into rows of text,
 * in the browser. Old binary .xls files aren't supported — Excel can save
 * them as .xlsx or CSV. */
export async function readSpreadsheet(file: File): Promise<string[][]> {
  const name = file.name.toLowerCase();
  const buf = new Uint8Array(await file.arrayBuffer());
  if (name.endsWith(".xls")) throw new Error("XLS_UNSUPPORTED");
  // .xlsx files are zips ("PK").
  if (name.endsWith(".xlsx") || (buf[0] === 0x50 && buf[1] === 0x4b)) return readXlsx(buf);
  return parseCsv(decodeText(buf));
}

function decodeText(buf: Uint8Array) {
  const utf8 = new TextDecoder("utf-8").decode(buf);
  // Excel's "CSV" (not "CSV UTF-8") on Windows is Windows-1252.
  return utf8.includes("�") ? new TextDecoder("windows-1252").decode(buf) : utf8;
}

export function parseCsv(text: string): string[][] {
  text = text.replace(/^﻿/, "");
  const firstLine = text.split(/\r?\n/, 1)[0] ?? "";
  const delim = [";", "\t", ","].reduce((best, d) => (firstLine.split(d).length > firstLine.split(best).length ? d : best), ",");
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"' && cell === "") quoted = true;
    else if (ch === delim) {
      row.push(cell);
      cell = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else cell += ch;
  }
  if (cell !== "" || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.map((r) => r.map((c) => c.trim())).filter((r) => r.some((c) => c !== ""));
}

function xml(text: string) {
  return new DOMParser().parseFromString(text, "application/xml");
}

/** Column letters of a cell reference ("BC12") as a 0-based index. */
function colIndex(ref: string) {
  const letters = ref.replace(/\d+/g, "");
  let n = 0;
  for (const ch of letters) n = n * 26 + (ch.charCodeAt(0) - 64);
  return n - 1;
}

function readXlsx(buf: Uint8Array): string[][] {
  const files = unzipSync(buf);
  const get = (p: string) => (files[p] ? strFromU8(files[p]) : null);

  // The first sheet in the workbook's own order.
  let sheetPath = "xl/worksheets/sheet1.xml";
  const wb = get("xl/workbook.xml");
  const rels = get("xl/_rels/workbook.xml.rels");
  if (wb && rels) {
    const first = xml(wb).getElementsByTagName("sheet")[0];
    const rid = first?.getAttribute("r:id") ?? first?.getAttributeNS("http://schemas.openxmlformats.org/officeDocument/2006/relationships", "id");
    const rel = [...xml(rels).getElementsByTagName("Relationship")].find((r) => r.getAttribute("Id") === rid);
    const target = rel?.getAttribute("Target");
    if (target) sheetPath = target.startsWith("/") ? target.slice(1) : `xl/${target.replace(/^\.\//, "")}`;
  }

  const shared: string[] = [];
  const ss = get("xl/sharedStrings.xml");
  if (ss) {
    for (const si of xml(ss).getElementsByTagName("si")) {
      shared.push([...si.getElementsByTagName("t")].map((t) => t.textContent ?? "").join(""));
    }
  }

  const sheet = get(sheetPath);
  if (!sheet) throw new Error("NO_SHEET");
  const rows: string[][] = [];
  for (const r of xml(sheet).getElementsByTagName("row")) {
    const row: string[] = [];
    for (const c of r.getElementsByTagName("c")) {
      const ref = c.getAttribute("r");
      const idx = ref ? colIndex(ref) : row.length;
      const type = c.getAttribute("t");
      const v = c.getElementsByTagName("v")[0]?.textContent ?? "";
      let value: string;
      if (type === "s") value = shared[Number(v)] ?? "";
      else if (type === "inlineStr") value = [...c.getElementsByTagName("t")].map((t) => t.textContent ?? "").join("");
      else if (type === "b") value = v === "1" ? "TRUE" : "FALSE";
      // Phone numbers saved as numbers come back as e.g. "358401234567" or "4.0123E+8".
      else value = /e\+?\d+$/i.test(v) ? String(Number(v)) : v;
      while (row.length < idx) row.push("");
      row[idx] = value.trim();
    }
    if (row.some((x) => x !== "")) rows.push(row);
  }
  return rows;
}

export type ContactField = "email" | "name" | "surname" | "phone" | "note";

const HEADER_WORDS: Record<ContactField, RegExp> = {
  email: /e-?mail|mail|sähköposti|thư|correo/i,
  surname: /^(họ|ho|last ?name|surname|family ?name|sukunimi)$/i,
  name: /tên|ten\b|name|nimi|họ và tên|ho va ten|khách|customer|asiakas/i,
  phone: /phone|điện thoại|dien thoai|sđt|sdt|số đt|mobile|puhelin|tel/i,
  note: /note|ghi chú|ghi chu|muistiinpano|lisätiedot|comment/i,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmail(v: string) {
  return EMAIL_RE.test(v.trim());
}

/** Whether the first row is a header, and which column holds each field —
 * by header names first, then by the values (the column full of "@"). */
export function guessColumns(rows: string[][]) {
  const first = rows[0] ?? [];
  const hasHeader = first.length > 0 && !first.some(isEmail);
  const map: Record<ContactField, number> = { email: -1, name: -1, surname: -1, phone: -1, note: -1 };
  if (hasHeader) {
    for (const f of ["email", "surname", "phone", "note", "name"] as ContactField[]) {
      const i = first.findIndex((h, idx) => HEADER_WORDS[f].test(h.trim()) && !Object.values(map).includes(idx));
      if (i >= 0) map[f] = i;
    }
  }
  if (map.email < 0) {
    const body = rows.slice(hasHeader ? 1 : 0, 50);
    const width = Math.max(0, ...rows.map((r) => r.length));
    let best = -1;
    let bestHits = 0;
    for (let i = 0; i < width; i++) {
      const hits = body.filter((r) => isEmail(r[i] ?? "")).length;
      if (hits > bestHits) {
        best = i;
        bestHits = hits;
      }
    }
    map.email = best;
  }
  return { hasHeader, map };
}
