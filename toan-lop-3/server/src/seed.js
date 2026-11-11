// Nhập các file assets/content/**/*.json vào content_documents (đã xuất bản, rev 1).
import fs from 'node:fs/promises';
import path from 'node:path';
import { documentIdOf, titleOf } from './content.js';

export async function listContentFiles(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await listContentFiles(full)));
    else if (entry.name.endsWith('.json')) out.push(full);
  }
  return out.sort();
}

/**
 * @param {import('pg').Pool} db
 * @param {{validateDocument: Function}} validator
 * @param {string} contentDir
 * @param {{force?: boolean, log?: (s: string) => void}} [opts]
 *   force = ghi đè tài liệu đã có (xuất bản thành rev mới); mặc định bỏ qua tài liệu đã có.
 * @returns {Promise<{inserted: string[], updated: string[], skipped: string[], invalid: {file: string, issues: object[]}[]}>}
 */
export async function seedContent(db, validator, contentDir, { force = false, log = () => {} } = {}) {
  const files = await listContentFiles(contentDir);
  const docs = [];
  const invalid = [];
  for (const file of files) {
    const rel = path.relative(contentDir, file);
    let body;
    try {
      body = JSON.parse(await fs.readFile(file, 'utf8'));
    } catch (err) {
      invalid.push({ file: rel, issues: [{ path: '/', message: `JSON lỗi: ${err.message}` }] });
      continue;
    }
    const { issues } = validator.validateDocument(body);
    if (issues.length) invalid.push({ file: rel, issues });
    else docs.push({ rel, body, id: documentIdOf(body) });
  }
  const result = { inserted: [], updated: [], skipped: [], invalid };
  if (invalid.length) return result; // không nhập gì nếu có file lỗi

  for (const { rel, body, id } of docs) {
    const { rows } = await db.query(
      `INSERT INTO content_documents(id, kind, title, body, published_body, rev, published, published_at)
       VALUES ($1, $2, $3, $4, $4, 1, true, now())
       ON CONFLICT (id) DO NOTHING
       RETURNING id`,
      [id, body.kind, titleOf(body), body],
    );
    if (rows.length) {
      result.inserted.push(id);
      log(`  + ${id}  (${rel})`);
    } else if (force) {
      await db.query(
        `UPDATE content_documents
            SET kind = $2, title = $3, body = $4, published_body = $4, rev = rev + 1,
                published = true, updated_at = now(), published_at = now()
          WHERE id = $1`,
        [id, body.kind, titleOf(body), body],
      );
      result.updated.push(id);
      log(`  ~ ${id}  (${rel}) — ghi đè, xuất bản rev mới`);
    } else {
      result.skipped.push(id);
      log(`  = ${id}  (${rel}) — đã có, bỏ qua (dùng --force để ghi đè)`);
    }
  }
  return result;
}
