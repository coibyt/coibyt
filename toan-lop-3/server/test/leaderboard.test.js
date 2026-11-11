import assert from 'node:assert/strict';
import { after, before, beforeEach, describe, test } from 'node:test';
import request from 'supertest';
import { LEADERBOARD_DAILY_CAP } from '../src/config.js';
import { periodBounds } from '../src/leaderboard.js';
import { generateNickname, isValidNickname } from '../src/nickname.js';
import { bearer, freshDb, makeApp, register } from './helpers.js';

// "Bây giờ" mặc định của các test: thứ Tư 11/11/2026 10:00 giờ VN.
const WED = new Date('2026-11-11T03:00:00Z');
// Chủ nhật 15/11/2026 23:59 giờ VN = 16:59 UTC; thứ Hai 16/11/2026 00:00 giờ VN = 17:00 UTC (vẫn Chủ nhật theo UTC).
const SUN_2359_VN = new Date('2026-11-15T16:59:00Z');
const MON_0000_VN = new Date('2026-11-15T17:00:00Z');

describe('periodBounds (giờ Việt Nam, UTC+7)', () => {
  test('tuần: thứ Hai → thứ Hai', () => {
    assert.deepEqual(periodBounds(WED, 'week'), { start: '2026-11-09', end: '2026-11-16' });
    assert.deepEqual(periodBounds(SUN_2359_VN, 'week'), { start: '2026-11-09', end: '2026-11-16' });
    assert.deepEqual(periodBounds(MON_0000_VN, 'week'), { start: '2026-11-16', end: '2026-11-23' });
    // tuần vắt qua hai tháng / hai năm
    assert.deepEqual(periodBounds(new Date('2026-12-02T05:00:00Z'), 'week'), { start: '2026-11-30', end: '2026-12-07' });
    assert.deepEqual(periodBounds(new Date('2027-01-01T05:00:00Z'), 'week'), { start: '2026-12-28', end: '2027-01-04' });
  });

  test('tháng: ngày 1 → ngày 1 tháng sau', () => {
    assert.deepEqual(periodBounds(WED, 'month'), { start: '2026-11-01', end: '2026-12-01' });
    // 30/11 23:59 VN vẫn là tháng 11; 30/11 17:00 UTC = 01/12 00:00 VN là tháng 12
    assert.deepEqual(periodBounds(new Date('2026-11-30T16:59:00Z'), 'month'), { start: '2026-11-01', end: '2026-12-01' });
    assert.deepEqual(periodBounds(new Date('2026-11-30T17:00:00Z'), 'month'), { start: '2026-12-01', end: '2027-01-01' });
    assert.deepEqual(periodBounds(new Date('2028-02-10T00:00:00Z'), 'month'), { start: '2028-02-01', end: '2028-03-01' });
  });
});

describe('GET /v1/leaderboard', () => {
  let db;
  let app;
  let now;
  before(async () => {
    db = await freshDb();
    app = makeApp(db, {}, { clock: () => now });
  });
  after(() => db.end());
  beforeEach(async () => {
    now = WED;
    await db.query('TRUNCATE accounts CASCADE');
  });

  async function addChild(token, name) {
    const res = await request(app).post('/v1/children').set(bearer(token)).send({ name }).expect(201);
    return res.body;
  }
  async function putPoints(token, childId, pointsByDay) {
    await request(app)
      .put(`/v1/children/${childId}/progress`)
      .set(bearer(token))
      .send({ progress: { pointsByDay, updatedAt: new Date().toISOString() } })
      .expect(200);
  }
  const board = (token, childId, period) =>
    request(app)
      .get('/v1/leaderboard')
      .query({ childId, ...(period !== undefined ? { period } : {}) })
      .set(bearer(token));

  /** Thêm nhanh n bé bằng SQL (một tài khoản), created_at tăng dần theo thứ tự mảng. */
  async function bulkChildren(accountId, pointsList, day = '2026-11-10') {
    const ids = [];
    for (const [i, pts] of pointsList.entries()) {
      const { rows } = await db.query(
        `INSERT INTO children(account_id, name, nickname, created_at)
         VALUES ($1, $2, $3, now() - interval '1 day' + $4 * interval '1 second') RETURNING id`,
        [accountId, `Tên Thật Số ${i}`, generateNickname(), i],
      );
      await db.query('INSERT INTO progress(child_id, doc) VALUES ($1, $2)', [rows[0].id, { pointsByDay: { [day]: pts } }]);
      ids.push(rows[0].id);
    }
    return ids;
  }

  test('xác thực, period, quyền sở hữu', async () => {
    const alice = await register(app);
    const bob = await register(app);
    const c = await addChild(alice.token, 'Na');
    await request(app).get('/v1/leaderboard').query({ childId: c.id }).expect(401);
    for (const period of ['year', 'WEEK', '', 'day']) {
      const r = await board(alice.token, c.id, period).expect(400);
      assert.equal(r.body.error, 'invalid_period');
    }
    const multi = await request(app).get(`/v1/leaderboard?period=week&period=month&childId=${c.id}`).set(bearer(alice.token));
    assert.equal(multi.status, 400);
    assert.equal((await board(bob.token, c.id).expect(404)).body.error, 'not_found');
    await board(alice.token, 'khong-phai-uuid').expect(404);
    await request(app).get('/v1/leaderboard').set(bearer(alice.token)).expect(404);
    await board(alice.token, '00000000-0000-0000-0000-000000000000').expect(404);

    const def = await board(alice.token, c.id).expect(200);
    assert.equal(def.body.period, 'week');
    assert.deepEqual(def.body.entries, []);
    assert.deepEqual(def.body.me, { rank: null, points: 0, nickname: c.nickname, optedIn: true, above: null, gapToAbove: null });
    const month = await board(alice.token, c.id, 'month').expect(200);
    assert.deepEqual([month.body.period, month.body.start, month.body.end], ['month', '2026-11-01', '2026-12-01']);
  });

  test('ranh giới tuần: Chủ nhật 23:59 VN vs thứ Hai 00:00 VN', async () => {
    const a = await register(app);
    const c = await addChild(a.token, 'Na');
    await putPoints(a.token, c.id, { '2026-11-08': 80, '2026-11-09': 10, '2026-11-15': 20, '2026-11-16': 40 });

    now = SUN_2359_VN;
    const sun = await board(a.token, c.id, 'week').expect(200);
    assert.deepEqual([sun.body.start, sun.body.end], ['2026-11-09', '2026-11-16']);
    assert.equal(sun.body.me.points, 30);
    assert.deepEqual(sun.body.entries, [{ rank: 1, nickname: c.nickname, points: 30, isMe: true }]);

    now = MON_0000_VN;
    const mon = await board(a.token, c.id, 'week').expect(200);
    assert.deepEqual([mon.body.start, mon.body.end], ['2026-11-16', '2026-11-23']);
    assert.equal(mon.body.me.points, 40);
    assert.equal(mon.body.me.rank, 1);
  });

  test('ranh giới tháng', async () => {
    const a = await register(app);
    const c = await addChild(a.token, 'Na');
    await putPoints(a.token, c.id, { '2026-10-31': 1, '2026-11-01': 2, '2026-11-30': 4, '2026-12-01': 8 });
    now = new Date('2026-11-30T16:59:00Z');
    assert.equal((await board(a.token, c.id, 'month').expect(200)).body.me.points, 6);
    now = new Date('2026-11-30T17:00:00Z');
    const dec = await board(a.token, c.id, 'month').expect(200);
    assert.deepEqual([dec.body.start, dec.body.end, dec.body.me.points], ['2026-12-01', '2027-01-01', 8]);
  });

  test(`giới hạn ${LEADERBOARD_DAILY_CAP} điểm mỗi ngày`, async () => {
    assert.equal(LEADERBOARD_DAILY_CAP, 1000);
    const a = await register(app);
    const c = await addChild(a.token, 'Na');
    await putPoints(a.token, c.id, { '2026-11-09': 5000, '2026-11-10': 1000, '2026-11-11': 999 });
    const r = await board(a.token, c.id).expect(200);
    assert.equal(r.body.me.points, 2999);
    assert.equal(r.body.entries[0].points, 2999);
  });

  test('bé tắt bảng xếp hạng: không có trong danh sách nhưng vẫn thấy điểm của mình', async () => {
    const a = await register(app);
    const shy = await addChild(a.token, 'Nhút Nhát');
    const other = await addChild(a.token, 'Bạn');
    const zero = await addChild(a.token, 'Chưa Chơi');
    await putPoints(a.token, shy.id, { '2026-11-10': 500 });
    await putPoints(a.token, other.id, { '2026-11-10': 100 });
    await request(app).patch(`/v1/children/${shy.id}`).set(bearer(a.token)).send({ leaderboardOptIn: false }).expect(200);

    const r = await board(a.token, shy.id).expect(200);
    assert.deepEqual(r.body.entries, [{ rank: 1, nickname: other.nickname, points: 100, isMe: false }]);
    assert.deepEqual(r.body.me, { rank: null, points: 500, nickname: shy.nickname, optedIn: false, above: null, gapToAbove: null });

    // bé 0 điểm: không được xếp hạng
    const z = await board(a.token, zero.id).expect(200);
    assert.deepEqual(z.body.me, { rank: null, points: 0, nickname: zero.nickname, optedIn: true, above: null, gapToAbove: null });
    assert.equal(z.body.entries.length, 1);

    // bật lại → lên hạng 1
    await request(app).patch(`/v1/children/${shy.id}`).set(bearer(a.token)).send({ leaderboardOptIn: true }).expect(200);
    const back = await board(a.token, other.id).expect(200);
    assert.deepEqual(
      back.body.entries.map((e) => [e.rank, e.points, e.isMe]),
      [
        [1, 500, false],
        [2, 100, true],
      ],
    );
    assert.equal(back.body.me.gapToAbove, 401);
  });

  test('bằng điểm: bé tạo trước đứng trên, rồi theo id; hạng không trùng', async () => {
    const a = await register(app);
    const [first, second, third] = await bulkChildren(a.account.id, [70, 70, 70]);
    // bé thứ ba tạo CÙNG lúc với bé thứ hai → so theo id
    await db.query('UPDATE children SET created_at = (SELECT created_at FROM children WHERE id = $1) WHERE id = $2', [
      second,
      third,
    ]);
    const [x, y] = [second, third].sort();
    const nick = async (id) => (await db.query('SELECT nickname FROM children WHERE id = $1', [id])).rows[0].nickname;
    const r = await board(a.token, y).expect(200);
    assert.deepEqual(
      r.body.entries.map((e) => [e.rank, e.points, e.isMe]),
      [
        [1, 70, false],
        [2, 70, false],
        [3, 70, true],
      ],
    );
    assert.deepEqual(
      r.body.entries.map((e) => e.nickname),
      [await nick(first), await nick(x), await nick(y)],
    );
    assert.equal(r.body.me.rank, 3);
    assert.deepEqual(r.body.me.above, { rank: 2, nickname: await nick(x), points: 70 });
    assert.equal(r.body.me.gapToAbove, 1);
  });

  test('chỉ trả top 50; bé ngoài top vẫn biết hạng và bạn ngay phía trên', async () => {
    const a = await register(app);
    // 55 bé: điểm 550, 540, …, 10 → hạng 1..55
    const points = Array.from({ length: 55 }, (_, i) => 550 - i * 10);
    const ids = await bulkChildren(a.account.id, points);

    const r = await board(a.token, ids[52]).expect(200); // hạng 53, 30 điểm
    assert.equal(r.body.entries.length, 50);
    assert.deepEqual(
      r.body.entries.map((e) => e.rank),
      Array.from({ length: 50 }, (_, i) => i + 1),
    );
    assert.deepEqual(
      r.body.entries.map((e) => e.points),
      points.slice(0, 50),
    );
    assert.ok(r.body.entries.every((e) => e.isMe === false));
    assert.equal(r.body.me.rank, 53);
    assert.equal(r.body.me.points, 30);
    assert.equal(r.body.me.above.rank, 52);
    assert.equal(r.body.me.above.points, 40);
    assert.equal(r.body.me.gapToAbove, 11);

    const top = await board(a.token, ids[0]).expect(200);
    assert.equal(top.body.entries.length, 50);
    assert.deepEqual(top.body.entries.filter((e) => e.isMe).map((e) => e.rank), [1]);
    assert.equal(top.body.me.rank, 1);
    assert.equal(top.body.me.above, null);
    assert.equal(top.body.me.gapToAbove, null);
  });

  test('gapToAbove = điểm bạn phía trên − điểm của mình + 1', async () => {
    const a = await register(app);
    const b = await register(app);
    const leader = await addChild(b.token, 'Thủ Khoa');
    const me = await addChild(a.token, 'Na');
    await putPoints(b.token, leader.id, { '2026-11-09': 95, '2026-11-10': 100 });
    await putPoints(a.token, me.id, { '2026-11-10': 100, '2026-11-11': 80 });
    const r = await board(a.token, me.id).expect(200);
    assert.deepEqual(r.body.me, {
      rank: 2,
      points: 180,
      nickname: me.nickname,
      optedIn: true,
      above: { rank: 1, nickname: leader.nickname, points: 195 },
      gapToAbove: 16,
    });
  });

  test('không lộ tên thật, email hay id của bé khác', async () => {
    const parents = [];
    for (let i = 0; i < 3; i++) parents.push(await register(app, `phuhuynh.bimat${i}@example.com`));
    const kids = [];
    for (const [i, p] of parents.entries()) {
      const k = await addChild(p.token, `Nguyễn Văn Bí Mật ${i}`);
      await putPoints(p.token, k.id, { '2026-11-10': 100 + i });
      kids.push(k);
    }
    const r = await board(parents[0].token, kids[0].id).expect(200);
    const text = JSON.stringify(r.body);
    for (const p of parents) {
      assert.ok(!text.includes(p.email));
      assert.ok(!text.includes(p.account.id));
    }
    for (const k of kids) {
      assert.ok(!text.includes(k.name));
      assert.ok(!text.includes(k.id));
    }
    assert.ok(!/[0-9a-f]{8}-[0-9a-f]{4}-/i.test(text), 'không có UUID nào');
    assert.ok(!/bí mật|@/i.test(text));
    assert.deepEqual(Object.keys(r.body).sort(), ['end', 'entries', 'me', 'period', 'start']);
    for (const e of r.body.entries) {
      assert.deepEqual(Object.keys(e).sort(), ['isMe', 'nickname', 'points', 'rank']);
      assert.ok(isValidNickname(e.nickname));
    }
    assert.deepEqual(Object.keys(r.body.me.above).sort(), ['nickname', 'points', 'rank']);
  });

  test('không đổi được "bây giờ" qua query', async () => {
    const a = await register(app);
    const c = await addChild(a.token, 'Na');
    const r = await request(app)
      .get('/v1/leaderboard')
      .query({ childId: c.id, now: '2020-01-01T00:00:00Z', clock: '2020-01-01' })
      .set(bearer(a.token))
      .expect(200);
    assert.deepEqual([r.body.start, r.body.end], ['2026-11-09', '2026-11-16']);
  });
});
