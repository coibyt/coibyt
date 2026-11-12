// Migration 002 trên CSDL đã có dữ liệu cũ: các bé cũ được gán biệt danh hợp lệ, mặc định tham gia bảng xếp hạng.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { after, before, describe, test } from 'node:test';
import pg from 'pg';
import { MIGRATIONS_DIR, runMigrations } from '../src/migrate.js';
import { isValidNickname } from '../src/nickname.js';
import { TEST_DATABASE_URL } from './helpers.js';

describe('migration 002_leaderboard', () => {
  let pool;
  before(async () => {
    assert.ok(new URL(TEST_DATABASE_URL).pathname.endsWith('_test'));
    pool = new pg.Pool({ connectionString: TEST_DATABASE_URL, max: 2 });
    await pool.query('DROP SCHEMA IF EXISTS public CASCADE; CREATE SCHEMA public;');
    // Dựng CSDL "cũ": chỉ có 001 + vài bé chưa có biệt danh.
    await pool.query(await fs.readFile(path.join(MIGRATIONS_DIR, '001_init.sql'), 'utf8'));
    await pool.query(`CREATE TABLE schema_migrations (filename TEXT PRIMARY KEY, applied_at TIMESTAMPTZ NOT NULL DEFAULT now());
                      INSERT INTO schema_migrations(filename) VALUES ('001_init.sql')`);
    const { rows } = await pool.query(
      "INSERT INTO accounts(email, password_hash) VALUES ('cu@example.com', 'x') RETURNING id",
    );
    for (let i = 0; i < 30; i++) {
      await pool.query('INSERT INTO children(account_id, name) VALUES ($1, $2)', [rows[0].id, `Bé ${i}`]);
    }
  });
  after(() => pool.end());

  test('gán biệt danh cho bé cũ, opt-in mặc định true, cột NOT NULL', async () => {
    const applied = await runMigrations(pool);
    assert.ok(applied.includes('002_leaderboard.sql'));
    const { rows } = await pool.query('SELECT name, nickname, leaderboard_opt_in FROM children');
    assert.equal(rows.length, 30);
    for (const r of rows) {
      assert.ok(isValidNickname(r.nickname), r.nickname);
      assert.equal(r.leaderboard_opt_in, true);
    }
    assert.ok(new Set(rows.map((r) => r.nickname)).size > 1, 'mỗi bé một biệt danh ngẫu nhiên');
    await assert.rejects(
      pool.query("INSERT INTO children(account_id, name) SELECT id, 'Mới' FROM accounts LIMIT 1"),
      /null value in column "nickname"/,
    );
  });
});
