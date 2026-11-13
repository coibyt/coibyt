import { strToU8, zipSync } from "fflate";

/** Writes a real Excel file (.xlsx) in the browser.
 *
 * Why not CSV: Excel splits a CSV on the list separator of the computer's
 * region. In Finland and Vietnam that is ";", so a comma-separated file opens
 * with every row crammed into column A. An .xlsx has real cells, so it opens
 * the same everywhere, and amounts are numbers Excel can sum. */

export type XlsxCell = string | number | null | undefined;
/** A plain array is a normal row; `bold` marks a totals row. */
export type XlsxRow = XlsxCell[] | { cells: XlsxCell[]; bold?: boolean };

const XML_HEAD = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';

// Characters XML 1.0 forbids (control codes, lone surrogates) would make Excel
// call the file damaged. Emoji in service names are fine.
function esc(v: string) {
  return v
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F￾￿]/g, "")
    .replace(/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g, "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** A, B … Z, AA, AB … */
function colName(i: number) {
  let s = "";
  for (let n = i + 1; n > 0; n = Math.floor((n - 1) / 26)) s = String.fromCharCode(65 + ((n - 1) % 26)) + s;
  return s;
}

// Cell styles (see styles.xml below).
const STYLE = { text: 0, number: 1, header: 2, boldText: 3, boldNumber: 4 };

const STYLES_XML =
  XML_HEAD +
  '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' +
  '<fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts>' +
  '<fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill>' +
  '<fill><patternFill patternType="solid"><fgColor rgb="FFEDE7F6"/><bgColor indexed="64"/></patternFill></fill></fills>' +
  '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>' +
  '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>' +
  '<cellXfs count="5">' +
  '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>' +
  '<xf numFmtId="4" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>' +
  '<xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/>' +
  '<xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/>' +
  '<xf numFmtId="4" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1" applyNumberFormat="1"/>' +
  "</cellXfs>" +
  '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>' +
  "</styleSheet>";

/** The first row is the header: bold, tinted and frozen. Numbers become
 * numeric cells; in the `money` columns (0-based) they show two decimals. */
export function buildXlsx(sheetName: string, rows: XlsxRow[], opts: { money?: number[] } = {}): Uint8Array {
  const money = new Set(opts.money ?? []);
  const widths: number[] = [];
  const body = rows
    .map((row, r) => {
      const cells = Array.isArray(row) ? row : row.cells;
      const bold = !Array.isArray(row) && !!row.bold;
      const xml = cells
        .map((v, c) => {
          const text = v === null || v === undefined ? "" : String(v);
          // Wide enough to read, never absurdly wide (emoji count double).
          widths[c] = Math.min(60, Math.max(widths[c] ?? 8, text.length + (typeof v === "number" ? 5 : 2)));
          const ref = `${colName(c)}${r + 1}`;
          if (r === 0) return `<c r="${ref}" s="${STYLE.header}" t="inlineStr"><is><t xml:space="preserve">${esc(text)}</t></is></c>`;
          if (typeof v === "number" && Number.isFinite(v)) {
            const s = money.has(c) ? (bold ? STYLE.boldNumber : STYLE.number) : bold ? STYLE.boldText : STYLE.text;
            return `<c r="${ref}" s="${s}"><v>${v}</v></c>`;
          }
          if (text === "") return bold ? `<c r="${ref}" s="${STYLE.boldText}"/>` : "";
          return `<c r="${ref}" s="${bold ? STYLE.boldText : STYLE.text}" t="inlineStr"><is><t xml:space="preserve">${esc(text)}</t></is></c>`;
        })
        .join("");
      return `<row r="${r + 1}">${xml}</row>`;
    })
    .join("");

  const cols = widths.map((w, i) => `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join("");
  const sheet =
    XML_HEAD +
    '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' +
    '<sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>' +
    '<sheetFormatPr defaultRowHeight="15"/>' +
    (cols ? `<cols>${cols}</cols>` : "") +
    `<sheetData>${body}</sheetData>` +
    "</worksheet>";

  // Excel: at most 31 characters, none of [ ] : * ? / \
  const name = esc(sheetName.replace(/[[\]:*?/\\]/g, " ").trim().slice(0, 31) || "Sheet1").replace(/"/g, "&quot;");

  return zipSync({
    "[Content_Types].xml": strToU8(
      XML_HEAD +
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
        '<Default Extension="xml" ContentType="application/xml"/>' +
        '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>' +
        '<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>' +
        '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>' +
        "</Types>",
    ),
    "_rels/.rels": strToU8(
      XML_HEAD +
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>' +
        "</Relationships>",
    ),
    "xl/workbook.xml": strToU8(
      XML_HEAD +
        '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">' +
        `<sheets><sheet name="${name}" sheetId="1" r:id="rId1"/></sheets>` +
        "</workbook>",
    ),
    "xl/_rels/workbook.xml.rels": strToU8(
      XML_HEAD +
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>' +
        '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>' +
        "</Relationships>",
    ),
    "xl/styles.xml": strToU8(STYLES_XML),
    "xl/worksheets/sheet1.xml": strToU8(sheet),
  });
}

/** Builds the file and hands it to the browser as a download. */
export function downloadXlsx(filename: string, sheetName: string, rows: XlsxRow[], opts: { money?: number[] } = {}) {
  // A fresh copy: fflate's array may sit on a wider buffer type than Blob accepts.
  const blob = new Blob([new Uint8Array(buildXlsx(sheetName, rows, opts))], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  // Characters Windows refuses in a file name.
  a.download = `${filename.replace(/[\\/:*?"<>|]/g, "-").replace(/\.(csv|xlsx)$/i, "")}.xlsx`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 10_000);
}
