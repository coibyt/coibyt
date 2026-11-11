import assert from 'node:assert/strict';
import { after, before, describe, test } from 'node:test';
import request from 'supertest';
import { seedContent } from '../src/seed.js';
import { bearer, freshDb, getValidator, makeApp, register, testConfig } from './helpers.js';

const FREE_EXAM = 'kntt3.c4.de-1';
const VIP_EXAM = 'kntt3.c4.nang-cao-1';
const FREE_LESSON = 'kntt3.c4.nhan-2cs-1cs';

describe('content (sau khi seed)', () => {
  let db;
  let app;
  before(async () => {
    db = await freshDb();
    const r = await seedContent(db, getValidator(), testConfig().contentDir);
    assert.deepEqual(r.invalid, []);
    app = makeApp(db);
  });
  after(() => db.end());

  test('GET /v1/catalog trả về body của catalog + ETag', async () => {
    const res = await request(app).get('/v1/catalog').expect(200);
    assert.equal(res.body.kind, 'catalog');
    assert.ok(Array.isArray(res.body.books));
    assert.equal(res.headers.etag, '"catalog@1"');
    await request(app).get('/v1/catalog').set('If-None-Match', '"catalog@1"').expect(304);
  });

  test('bài học / đề miễn phí: không cần đăng nhập', async () => {
    const l = await request(app).get(`/v1/content/lessons/${FREE_LESSON}`).expect(200);
    assert.equal(l.body.rev, 1);
    assert.equal(l.body.body.id, FREE_LESSON);
    assert.equal(l.body.body.kind, 'lesson');
    const e = await request(app).get(`/v1/content/exams/${FREE_EXAM}`).expect(200);
    assert.equal(e.body.body.kind, 'exam');
  });

  test('ETag "<id>@<rev>" và If-None-Match → 304', async () => {
    const r = await request(app).get(`/v1/content/exams/${FREE_EXAM}`).expect(200);
    assert.equal(r.headers.etag, `"${FREE_EXAM}@1"`);
    const nm = await request(app).get(`/v1/content/exams/${FREE_EXAM}`).set('If-None-Match', `"${FREE_EXAM}@1"`).expect(304);
    assert.equal(nm.text, '');
    await request(app).get(`/v1/content/exams/${FREE_EXAM}`).set('If-None-Match', `W/"x@9", "${FREE_EXAM}@1"`).expect(304);
    await request(app).get(`/v1/content/exams/${FREE_EXAM}`).set('If-None-Match', `"${FREE_EXAM}@0"`).expect(200);
  });

  test('nội dung VIP: 403 khi chưa đăng nhập / chưa VIP, OK sau khi mua (IAP dev)', async () => {
    const anon = await request(app).get(`/v1/content/exams/${VIP_EXAM}`).expect(403);
    assert.equal(anon.body.error, 'vip_required');
    // 304 cũng không được lộ cho người không có quyền
    await request(app).get(`/v1/content/exams/${VIP_EXAM}`).set('If-None-Match', `"${VIP_EXAM}@1"`).expect(403);

    const u = await register(app);
    await request(app).get(`/v1/content/exams/${VIP_EXAM}`).set(bearer(u.token)).expect(403);

    const buy = await request(app)
      .post('/v1/iap/verify')
      .set(bearer(u.token))
      .send({ platform: 'android', productId: 'vn.ongvang.toan3.vip_month', receipt: 'TEST-content-1' })
      .expect(200);
    assert.equal(buy.body.account.isVip, true);

    const ok = await request(app).get(`/v1/content/exams/${VIP_EXAM}`).set(bearer(u.token)).expect(200);
    assert.equal(ok.body.body.id, VIP_EXAM);
    assert.equal(ok.headers.etag, `"${VIP_EXAM}@1"`);
    assert.match(ok.headers['cache-control'], /private/);
    await request(app)
      .get(`/v1/content/exams/${VIP_EXAM}`)
      .set(bearer(u.token))
      .set('If-None-Match', `"${VIP_EXAM}@1"`)
      .expect(304);

    // VIP hết hạn → lại 403
    await db.query("UPDATE accounts SET vip_until = now() - interval '1 day' WHERE id = $1", [u.account.id]);
    await request(app).get(`/v1/content/exams/${VIP_EXAM}`).set(bearer(u.token)).expect(403);
  });

  test('bài học VIP theo catalog', async () => {
    // Đánh dấu bài học là VIP trong catalog đang phát hành.
    await db.query(
      `UPDATE content_documents
          SET published_body = jsonb_set(published_body::jsonb, '{books,0,chapters,0,lessons,1,access}', '"vip"')::json
        WHERE id = 'catalog'`,
    );
    const lessonId = 'kntt3.c4.chia-2cs-1cs';
    const r = await request(app).get(`/v1/content/lessons/${lessonId}`).expect(403);
    assert.equal(r.body.error, 'vip_required');
    await request(app).get(`/v1/content/lessons/${FREE_LESSON}`).expect(200);
  });

  test('không tồn tại / sai loại / chưa xuất bản → 404', async () => {
    await request(app).get('/v1/content/lessons/khong-co').expect(404);
    await request(app).get(`/v1/content/lessons/${FREE_EXAM}`).expect(404); // là exam, không phải lesson
    await request(app).get(`/v1/content/videos/${FREE_EXAM}`).expect(404);
    await db.query(
      `INSERT INTO content_documents(id, kind, title, body) SELECT 'nhap.chua-xb', kind, title, body
         FROM content_documents WHERE id = $1`,
      [FREE_EXAM],
    );
    await request(app).get('/v1/content/exams/nhap.chua-xb').expect(404);
  });
});

describe('content giữ nguyên thứ tự khoá', () => {
  test('catalog trả về đúng thứ tự khoá như file gốc', async () => {
    const fs = await import('node:fs');
    const path = await import('node:path');
    const db = await freshDb();
    try {
      const dir = testConfig().contentDir;
      await seedContent(db, getValidator(), dir);
      const res = await request(makeApp(db)).get('/v1/catalog').expect(200);
      const original = JSON.parse(fs.readFileSync(path.join(dir, 'catalog.json'), 'utf8'));
      assert.equal(JSON.stringify(res.body), JSON.stringify(original));
    } finally {
      await db.end();
    }
  });
});
