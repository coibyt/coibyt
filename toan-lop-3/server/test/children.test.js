import assert from 'node:assert/strict';
import { after, before, describe, test } from 'node:test';
import request from 'supertest';
import { bearer, freshDb, makeApp, register } from './helpers.js';

describe('children + progress', () => {
  let db;
  let app;
  let alice;
  let bob;
  before(async () => {
    db = await freshDb();
    app = makeApp(db);
    alice = await register(app);
    bob = await register(app);
  });
  after(() => db.end());

  test('tạo và liệt kê hồ sơ bé', async () => {
    const empty = await request(app).get('/v1/children').set(bearer(alice.token)).expect(200);
    assert.deepEqual(empty.body, { children: [] });
    const c1 = await request(app).post('/v1/children').set(bearer(alice.token)).send({ name: ' Na ' }).expect(201);
    assert.deepEqual(Object.keys(c1.body).sort(), ['id', 'name']);
    assert.equal(c1.body.name, 'Na');
    const c2 = await request(app).post('/v1/children').set(bearer(alice.token)).send({ name: 'Tí' }).expect(201);
    const list = await request(app).get('/v1/children').set(bearer(alice.token)).expect(200);
    assert.deepEqual(list.body.children, [c1.body, c2.body]);
    const bobList = await request(app).get('/v1/children').set(bearer(bob.token)).expect(200);
    assert.deepEqual(bobList.body.children, []);
    await request(app).post('/v1/children').set(bearer(alice.token)).send({ name: '' }).expect(400);
    await request(app).get('/v1/children').expect(401);
  });

  test('hồ sơ của tài khoản khác → 404', async () => {
    const c = await request(app).post('/v1/children').set(bearer(alice.token)).send({ name: 'Bin' }).expect(201);
    const r1 = await request(app).get(`/v1/children/${c.body.id}/progress`).set(bearer(bob.token)).expect(404);
    assert.equal(r1.body.error, 'not_found');
    await request(app)
      .put(`/v1/children/${c.body.id}/progress`)
      .set(bearer(bob.token))
      .send({ progress: { totalPoints: 1 } })
      .expect(404);
    await request(app).get('/v1/children/khong-phai-uuid/progress').set(bearer(alice.token)).expect(404);
    await request(app)
      .get('/v1/children/00000000-0000-0000-0000-000000000000/progress')
      .set(bearer(alice.token))
      .expect(404);
    // dữ liệu của Alice không bị Bob ghi
    const own = await request(app).get(`/v1/children/${c.body.id}/progress`).set(bearer(alice.token)).expect(200);
    assert.deepEqual(own.body, { progress: null, updatedAt: null });
  });

  test('hai thiết bị đẩy dữ liệu khác nhau → server gộp theo quy tắc', async () => {
    const c = await request(app).post('/v1/children').set(bearer(alice.token)).send({ name: 'Na' }).expect(201);
    const url = `/v1/children/${c.body.id}/progress`;

    const phone = {
      v: 1,
      childName: 'Na',
      bookId: 'kntt3',
      totalPoints: 50,
      lessons: { l1: { bestStars: 2, bestPoints: 30, plays: 2, lastPlayed: '2026-11-01T08:00:00.000Z' } },
      skills: { s1: { correct: 3, total: 5 } },
      activeDays: ['2026-11-01'],
      exams: [{ examId: 'e1', score: 7, correct: 7, total: 10, usedSeconds: 500, at: '2026-11-01T09:00:00.000Z', weakSkillIds: [] }],
      badges: { first: '2026-11-01T08:00:00.000Z' },
      updatedAt: '2026-11-01T10:00:00.000Z',
    };
    const r1 = await request(app).put(url).set(bearer(alice.token)).send({ progress: phone }).expect(200);
    assert.equal(r1.body.progress.totalPoints, 50);
    assert.ok(!Number.isNaN(Date.parse(r1.body.updatedAt)));

    const tablet = {
      v: 1,
      childName: 'Bé Na',
      bookId: 'kntt3',
      totalPoints: 40,
      lessons: {
        l1: { bestStars: 3, bestPoints: 20, plays: 1, lastPlayed: '2026-10-31T08:00:00.000Z' },
        l2: { bestStars: 1, bestPoints: 10, plays: 1, lastPlayed: '2026-11-02T08:00:00.000Z' },
      },
      skills: { s1: { correct: 6, total: 8 }, s2: { correct: 1, total: 1 } },
      activeDays: ['2026-11-02', '2026-10-31'],
      exams: [
        { examId: 'e1', score: 7, correct: 7, total: 10, usedSeconds: 500, at: '2026-11-01T09:00:00.000Z', weakSkillIds: [] },
        { examId: 'e2', score: 9, correct: 9, total: 10, usedSeconds: 400, at: '2026-11-02T09:00:00.000Z', weakSkillIds: [] },
      ],
      badges: { first: '2026-11-02T08:00:00.000Z', streak3: '2026-11-02T08:00:00.000Z' },
      updatedAt: '2026-11-02T10:00:00.000Z',
    };
    const r2 = await request(app).put(url).set(bearer(alice.token)).send({ progress: tablet }).expect(200);
    const p = r2.body.progress;
    assert.equal(p.v, 1);
    assert.equal(p.totalPoints, 50);
    assert.equal(p.childName, 'Bé Na');
    assert.equal(p.bookId, 'kntt3');
    assert.deepEqual(p.lessons.l1, { bestStars: 3, bestPoints: 30, plays: 2, lastPlayed: '2026-11-01T08:00:00.000Z' });
    assert.deepEqual(p.lessons.l2, tablet.lessons.l2);
    assert.deepEqual(p.skills, { s1: { correct: 6, total: 8 }, s2: { correct: 1, total: 1 } });
    assert.deepEqual(p.activeDays, ['2026-10-31', '2026-11-01', '2026-11-02']);
    assert.deepEqual(p.exams.map((e) => e.examId), ['e1', 'e2']);
    assert.deepEqual(p.badges, { first: '2026-11-01T08:00:00.000Z', streak3: '2026-11-02T08:00:00.000Z' });
    assert.equal(p.updatedAt, '2026-11-02T10:00:00.000Z');

    // Điện thoại đẩy lại bản cũ: không mất gì của máy tính bảng.
    const r3 = await request(app).put(url).set(bearer(alice.token)).send({ progress: phone }).expect(200);
    assert.deepEqual(r3.body.progress, p);

    const got = await request(app).get(url).set(bearer(alice.token)).expect(200);
    assert.deepEqual(got.body.progress, p);
    assert.equal(got.body.updatedAt, r3.body.updatedAt);
  });

  test('progress sai kiểu → 400', async () => {
    const c = await request(app).post('/v1/children').set(bearer(alice.token)).send({ name: 'X' }).expect(201);
    const url = `/v1/children/${c.body.id}/progress`;
    const r = await request(app).put(url).set(bearer(alice.token)).send({ progress: 'abc' }).expect(400);
    assert.equal(r.body.error, 'invalid_progress');
    await request(app).put(url).set(bearer(alice.token)).send({ progress: { lessons: [] } }).expect(400);
    await request(app).put(url).set(bearer(alice.token)).send({}).expect(400);
  });
});
