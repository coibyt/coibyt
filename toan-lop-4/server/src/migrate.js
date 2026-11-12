// Áp dụng các file migrations/*.sql theo thứ tự tên, ghi lại vào bảng schema_migrations.
import fs from 'node:fs/promises';
import path from 'node:path';
import { SERVER_DIR } from './config.js';

export const MIGRATIONS_DIR = path.join(SERVER_DIR, 'migrations');
const LOCK_KEY = 74_302_003; // khoá advisory: tránh hai tiến trình migrate cùng lúc

export async function runMigrations(pool, { log = () => {} } = {}) {
  const client = await pool.connect();
  const applied = [];
  try {
    await client.query('SELECT pg_advisory_lock($1)', [LOCK_KEY]);
    await client.query(`CREATE TABLE IF NOT EXISTS schema_migrations (
      filename   TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`);
    const done = new Set((await client.query('SELECT filename FROM schema_migrations')).rows.map((r) => r.filename));
    const files = (await fs.readdir(MIGRATIONS_DIR)).filter((f) => f.endsWith('.sql')).sort();
    for (const file of files) {
      if (done.has(file)) continue;
      const sql = await fs.readFile(path.join(MIGRATIONS_DIR, file), 'utf8');
      try {
        await client.query('BEGIN');
        await client.query(sql);
        await client.query('INSERT INTO schema_migrations(filename) VALUES ($1)', [file]);
        await client.query('COMMIT');
      } catch (err) {
        await client.query('ROLLBACK');
        throw new Error(`Migration ${file} lỗi: ${err.message}`);
      }
      applied.push(file);
      log(`  đã áp dụng ${file}`);
    }
  } finally {
    await client.query('SELECT pg_advisory_unlock($1)', [LOCK_KEY]).catch(() => {});
    client.release();
  }
  return applied;
}
