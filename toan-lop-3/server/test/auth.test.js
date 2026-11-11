import assert from 'node:assert/strict';
import { after, before, describe, test } from 'node:test';
import request from 'supertest';
import { bearer, freshDb, makeApp, register } from './helpers.js';

describe('auth', () => {
  let db;
  let app;
  before(async () => {
    db = await freshDb();
    app = makeApp(db);
  });
  after(() => db.end());

  test('GET /healthz', async () => {
    const res = await request(app).get('/healthz').expect(200);
    assert.deepEqual(res.body, { ok: true });
    assert.equal(res.headers['x-content-type-options'], 'nosniff');
    assert.equal(res.headers['x-powered-by'], undefined);
  });

  test('register → me → logout → me 401', async () => {
    const res = await request(app)
      .post('/v1/auth/register')
      .send({ email: '  Me@Example.COM ', password: 'matkhau123' })
      .expect(201);
    assert.match(res.body.token, /^[A-Za-z0-9_-]{43}$/);
    assert.deepEqual(Object.keys(res.body.account).sort(), ['email', 'id', 'isVip', 'vipUntil']);
    assert.equal(res.body.account.email, 'me@example.com');
    assert.equal(res.body.account.isVip, false);
    assert.equal(res.body.account.vipUntil, null);

    const me = await request(app).get('/v1/me').set(bearer(res.body.token)).expect(200);
    assert.deepEqual(me.body.account, res.body.account);

    // chỉ lưu hash của token
    const { rows } = await db.query('SELECT token_hash, expires_at FROM sessions');
    assert.equal(rows.length, 1);
    assert.equal(rows[0].token_hash.length, 32);
    const days = (new Date(rows[0].expires_at) - Date.now()) / 86_400_000;
    assert.ok(days > 89.9 && days <= 90, `hạn phiên ${days} ngày`);

    await request(app).post('/v1/auth/logout').set(bearer(res.body.token)).expect(204);
    const after = await request(app).get('/v1/me').set(bearer(res.body.token)).expect(401);
    assert.equal(after.body.error, 'unauthorized');
    assert.ok(after.body.message);
  });

  test('login đúng / sai mật khẩu / email không tồn tại', async () => {
    const u = await register(app, 'login@example.com', 'dungmatkhau');
    const ok = await request(app).post('/v1/auth/login').send({ email: 'LOGIN@example.com', password: 'dungmatkhau' }).expect(200);
    assert.equal(ok.body.account.id, u.account.id);
    assert.notEqual(ok.body.token, u.token);
    await request(app).get('/v1/me').set(bearer(ok.body.token)).expect(200);

    const bad = await request(app).post('/v1/auth/login').send({ email: 'login@example.com', password: 'saimatkhau' }).expect(401);
    assert.equal(bad.body.error, 'invalid_credentials');
    const none = await request(app).post('/v1/auth/login').send({ email: 'khongco@example.com', password: 'abcdefgh' }).expect(401);
    assert.equal(none.body.error, 'invalid_credentials');
  });

  test('mật khẩu được băm bằng scrypt với salt riêng', async () => {
    await register(app, 'a1@example.com', 'cungmatkhau');
    await register(app, 'a2@example.com', 'cungmatkhau');
    const { rows } = await db.query("SELECT password_hash FROM accounts WHERE email IN ('a1@example.com','a2@example.com')");
    assert.equal(rows.length, 2);
    for (const r of rows) assert.match(r.password_hash, /^scrypt\$16384\$8\$1\$/);
    assert.notEqual(rows[0].password_hash, rows[1].password_hash);
  });

  test('đăng ký: email trùng 409, mật khẩu ngắn 400, email sai 400', async () => {
    await register(app, 'dup@example.com');
    const dup = await request(app).post('/v1/auth/register').send({ email: 'DUP@example.com', password: 'matkhau123' }).expect(409);
    assert.equal(dup.body.error, 'email_taken');
    const weak = await request(app).post('/v1/auth/register').send({ email: 'x@example.com', password: '1234567' }).expect(400);
    assert.equal(weak.body.error, 'weak_password');
    const badEmail = await request(app).post('/v1/auth/register').send({ email: 'khong-phai-email', password: 'matkhau123' }).expect(400);
    assert.equal(badEmail.body.error, 'invalid_email');
  });

  test('token sai / thiếu → 401', async () => {
    await request(app).get('/v1/me').expect(401);
    await request(app).get('/v1/me').set(bearer('khong-hop-le')).expect(401);
    await request(app).post('/v1/auth/logout').expect(401);
  });

  test('JSON hỏng → 400 invalid_json; đường dẫn lạ → 404', async () => {
    const res = await request(app).post('/v1/auth/login').set('Content-Type', 'application/json').send('{oops').expect(400);
    assert.equal(res.body.error, 'invalid_json');
    const nf = await request(app).get('/v1/khong-co').expect(404);
    assert.equal(nf.body.error, 'not_found');
  });

  test('giới hạn tần suất trên /v1/auth/*', async () => {
    const limited = makeApp(db, { authRateLimitPerMin: 3 });
    for (let i = 0; i < 3; i++) {
      await request(limited).post('/v1/auth/login').send({ email: 'x@example.com', password: 'abcdefgh' }).expect(401);
    }
    const res = await request(limited).post('/v1/auth/login').send({ email: 'x@example.com', password: 'abcdefgh' }).expect(429);
    assert.equal(res.body.error, 'rate_limited');
    assert.ok(res.headers['retry-after']);
  });

  test('CORS chỉ cho các origin cấu hình', async () => {
    const corsApp = makeApp(db, { corsOrigins: ['https://cms.ongvang.example'] });
    const ok = await request(corsApp).options('/v1/me').set('Origin', 'https://cms.ongvang.example').expect(204);
    assert.equal(ok.headers['access-control-allow-origin'], 'https://cms.ongvang.example');
    const no = await request(corsApp).get('/healthz').set('Origin', 'https://evil.example').expect(200);
    assert.equal(no.headers['access-control-allow-origin'], undefined);
    const def = await request(app).get('/healthz').set('Origin', 'https://cms.ongvang.example').expect(200);
    assert.equal(def.headers['access-control-allow-origin'], undefined);
  });
});
