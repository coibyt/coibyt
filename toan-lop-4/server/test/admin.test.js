import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { after, before, describe, test } from 'node:test';
import request from 'supertest';
import { ADMIN_TOKEN, bearer, freshDb, makeApp, testConfig } from './helpers.js';

const LESSON_ID = 'kntt4.c4.nhan-2cs-1cs';
const readLesson = () =>
  JSON.parse(fs.readFileSync(path.join(testConfig().contentDir, 'lessons', `${LESSON_ID}.json`), 'utf8'));

function wordProblemPath(doc) {
  const i = doc.problems.findIndex((p) => p.solution.steps.some((s) => s.kind === 'word_problem'));
  const j = doc.problems[i].solution.steps.findIndex((s) => s.kind === 'word_problem');
  return { i, j };
}

describe('admin CMS', () => {
  let db;
  let app;
  const admin = bearer(ADMIN_TOKEN);
  before(async () => {
    db = await freshDb();
    app = makeApp(db);
  });
  after(() => db.end());

  test('ADMIN_TOKEN chưa đặt / còn placeholder / quá ngắn → 503 admin_disabled', async () => {
    for (const adminToken of ['', '<<ĐỔI-THÀNH-CHUỖI-NGẪU-NHIÊN>>', 'short']) {
      const off = makeApp(db, { adminToken });
      const r = await request(off).get('/v1/admin/documents').set(bearer('some-token-value-1234567890')).expect(503);
      assert.equal(r.body.error, 'admin_disabled');
    }
  });

  test('sai mã / thiếu mã → 401', async () => {
    const r = await request(app).get('/v1/admin/documents').set(bearer('test-admin-token-0123456789abcdeX')).expect(401);
    assert.equal(r.body.error, 'unauthorized');
    await request(app).get('/v1/admin/documents').expect(401);
    await request(app).put(`/v1/admin/documents/${LESSON_ID}`).send({ body: readLesson() }).expect(401);
  });

  test('PUT nội dung có phép tính sai → 422 invalid_content kèm issue', async () => {
    const doc = readLesson();
    const { i, j } = wordProblemPath(doc);
    doc.problems[i].solution.steps[j].lines[0].equation = '24 × 3 = 62 (cái)';
    const r = await request(app).put(`/v1/admin/documents/${LESSON_ID}`).set(admin).send({ body: doc }).expect(422);
    assert.equal(r.body.error, 'invalid_content');
    assert.ok(r.body.message);
    assert.deepEqual(r.body.issues.map((x) => x.path), [`/problems/${i}/solution/steps/${j}/lines/0/equation`]);
    assert.match(r.body.issues[0].message, /24 × 3/);
    const { rows } = await db.query('SELECT count(*)::int AS n FROM content_documents');
    assert.equal(rows[0].n, 0);
  });

  test('PUT: mã trên URL khác mã trong nội dung → 422', async () => {
    const r = await request(app).put('/v1/admin/documents/ma-khac').set(admin).send({ body: readLesson() }).expect(422);
    assert.equal(r.body.issues[0].path, '/id');
  });

  test('POST /v1/admin/validate', async () => {
    const ok = await request(app).post('/v1/admin/validate').set(admin).send({ body: readLesson() }).expect(200);
    assert.deepEqual(ok.body, { ok: true, issues: [] });
    const doc = readLesson();
    doc.theory.blocks.push({ kind: 'equation', text: '10 : 3 = 3' });
    const bad = await request(app).post('/v1/admin/validate').set(admin).send({ body: doc }).expect(200);
    assert.equal(bad.body.ok, false);
    assert.match(bad.body.issues[0].message, /không chia hết/);
  });

  test('hợp lệ → lưu nháp → xuất bản → rev tăng, API công khai trả bản mới', async () => {
    const doc = readLesson();
    const put = await request(app).put(`/v1/admin/documents/${LESSON_ID}`).set(admin).send({ body: doc }).expect(200);
    assert.equal(put.body.published, false);
    assert.equal(put.body.rev, 0);

    // nháp chưa xuất bản → công khai 404
    await request(app).get(`/v1/content/lessons/${LESSON_ID}`).expect(404);

    const list = await request(app).get('/v1/admin/documents').set(admin).expect(200);
    assert.deepEqual(list.body.documents, [
      { id: LESSON_ID, kind: 'lesson', rev: 0, access: 'free', published: false, updatedAt: put.body.updatedAt, title: doc.title },
    ]);

    const pub1 = await request(app).post(`/v1/admin/documents/${LESSON_ID}/publish`).set(admin).expect(200);
    assert.deepEqual(pub1.body, { id: LESSON_ID, rev: 1 });
    const g1 = await request(app).get(`/v1/content/lessons/${LESSON_ID}`).expect(200);
    assert.equal(g1.body.rev, 1);
    assert.equal(g1.headers.etag, `"${LESSON_ID}@1"`);

    // sửa → lưu nháp: app vẫn thấy bản rev 1 cho tới khi xuất bản
    doc.title = 'Nhân số có hai chữ số với số có một chữ số (bản mới)';
    const put2 = await request(app).put(`/v1/admin/documents/${LESSON_ID}`).set(admin).send({ body: doc }).expect(200);
    assert.equal(put2.body.published, false);
    const still = await request(app).get(`/v1/content/lessons/${LESSON_ID}`).expect(200);
    assert.equal(still.body.rev, 1);
    assert.notEqual(still.body.body.title, doc.title);

    const full = await request(app).get(`/v1/admin/documents/${LESSON_ID}`).set(admin).expect(200);
    assert.equal(full.body.body.title, doc.title);
    assert.equal(full.body.publishedBody.title, readLesson().title);
    assert.equal(full.body.published, false);

    const pub2 = await request(app).post(`/v1/admin/documents/${LESSON_ID}/publish`).set(admin).expect(200);
    assert.deepEqual(pub2.body, { id: LESSON_ID, rev: 2 });
    const g2 = await request(app)
      .get(`/v1/content/lessons/${LESSON_ID}`)
      .set('If-None-Match', `"${LESSON_ID}@1"`)
      .expect(200);
    assert.equal(g2.body.rev, 2);
    assert.equal(g2.body.body.title, doc.title);
    assert.equal(g2.headers.etag, `"${LESSON_ID}@2"`);
  });

  test('catalog dùng mã "catalog"; publish tài liệu không có → 404', async () => {
    const catalog = JSON.parse(fs.readFileSync(path.join(testConfig().contentDir, 'catalog.json'), 'utf8'));
    await request(app).put('/v1/admin/documents/catalog').set(admin).send({ body: catalog }).expect(200);
    await request(app).post('/v1/admin/documents/catalog/publish').set(admin).expect(200);
    const c = await request(app).get('/v1/catalog').expect(200);
    assert.deepEqual(c.body, catalog);
    await request(app).post('/v1/admin/documents/khong-co/publish').set(admin).expect(404);
    await request(app).get('/v1/admin/documents/khong-co').set(admin).expect(404);
  });

  test('GET /admin phục vụ trang CMS', async () => {
    const r = await request(app).get('/admin').expect(200);
    assert.match(r.headers['content-type'], /html/);
    assert.match(r.text, /Kiểm tra/);
    assert.match(r.text, /Lưu nháp/);
    assert.match(r.text, /Xuất bản/);
    assert.match(r.headers['content-security-policy'], /script-src 'self' https:\/\/cdn\.jsdelivr\.net/);
    await request(app).get('/admin/admin.js').expect(200);
  });
});
