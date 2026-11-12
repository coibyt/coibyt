import assert from 'node:assert/strict';
import path from 'node:path';
import { after, before, describe, test } from 'node:test';
import { listContentFiles, seedContent } from '../src/seed.js';
import { freshDb, getValidator, testConfig } from './helpers.js';

describe('seed', () => {
  let db;
  const { contentDir } = testConfig();
  before(async () => {
    db = await freshDb();
  });
  after(() => db.end());

  test('nhập TẤT CẢ file trong assets/content, tất cả đều hợp lệ, xuất bản rev 1', async () => {
    const files = await listContentFiles(contentDir);
    assert.ok(files.some((f) => f.endsWith('catalog.json')));
    assert.ok(files.some((f) => f.includes(`${path.sep}lessons${path.sep}`)));
    assert.ok(files.some((f) => f.includes(`${path.sep}exams${path.sep}`)));

    const r = await seedContent(db, getValidator(), contentDir);
    assert.deepEqual(r.invalid, [], JSON.stringify(r.invalid, null, 2));
    assert.equal(r.inserted.length, files.length);

    const { rows } = await db.query('SELECT id, kind, rev, published, body::jsonb = published_body::jsonb AS same FROM content_documents ORDER BY id');
    assert.equal(rows.length, files.length);
    for (const row of rows) {
      assert.equal(row.rev, 1, row.id);
      assert.equal(row.published, true, row.id);
      assert.equal(row.same, true, row.id);
    }
    assert.ok(rows.some((x) => x.id === 'catalog' && x.kind === 'catalog'));
  });

  test('chạy lại: bỏ qua; --force: ghi đè thành rev 2', async () => {
    const again = await seedContent(db, getValidator(), contentDir);
    assert.equal(again.inserted.length, 0);
    assert.ok(again.skipped.length > 0);
    const forced = await seedContent(db, getValidator(), contentDir, { force: true });
    assert.equal(forced.updated.length, again.skipped.length);
    const { rows } = await db.query('SELECT DISTINCT rev FROM content_documents');
    assert.deepEqual(rows, [{ rev: 2 }]);
  });
});
