import assert from 'node:assert/strict';
import { after, before, describe, test } from 'node:test';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { loadConfig } from '../src/config.js';
import { bearer, freshDb, makeApp, register, testConfig } from './helpers.js';

const MONTH = 'vn.ongvang.toan3.vip_month';
const YEAR = 'vn.ongvang.toan3.vip_year';
const DAY = 86_400_000;

describe('IAP', () => {
  let db;
  let app;
  before(async () => {
    db = await freshDb();
    app = makeApp(db, { iapDevMode: true });
  });
  after(() => db.end());

  const verify = (a, token, body) => request(a).post('/v1/iap/verify').set(bearer(token)).send(body);

  test('cần đăng nhập', async () => {
    await request(app).post('/v1/iap/verify').send({ platform: 'ios', productId: MONTH, receipt: 'TEST-x' }).expect(401);
  });

  test('dev mode: TEST- được chấp nhận, gia hạn từ max(now, vipUntil)', async () => {
    const u = await register(app);
    const r1 = await verify(app, u.token, { platform: 'ios', productId: MONTH, receipt: 'TEST-iap-1' }).expect(200);
    assert.equal(r1.body.account.isVip, true);
    const until1 = Date.parse(r1.body.account.vipUntil);
    assert.ok(Math.abs(until1 - (Date.now() + 30 * DAY)) < 60_000);

    const r2 = await verify(app, u.token, { platform: 'android', productId: YEAR, receipt: 'TEST-iap-2' }).expect(200);
    const until2 = Date.parse(r2.body.account.vipUntil);
    assert.ok(Math.abs(until2 - (until1 + 365 * DAY)) < 1000, 'cộng tiếp từ vipUntil hiện tại');

    // gửi lại cùng biên nhận: không cộng thêm
    const r3 = await verify(app, u.token, { platform: 'android', productId: YEAR, receipt: 'TEST-iap-2' }).expect(200);
    assert.equal(r3.body.account.vipUntil, r2.body.account.vipUntil);

    const me = await request(app).get('/v1/me').set(bearer(u.token)).expect(200);
    assert.deepEqual(me.body.account, r3.body.account);

    const { rows } = await db.query('SELECT product_id, days_granted, dev_mode FROM purchases WHERE account_id = $1 ORDER BY id', [u.account.id]);
    assert.deepEqual(rows, [
      { product_id: MONTH, days_granted: 30, dev_mode: true },
      { product_id: YEAR, days_granted: 365, dev_mode: true },
    ]);
  });

  test('VIP đã hết hạn: gia hạn tính từ bây giờ', async () => {
    const u = await register(app);
    await db.query("UPDATE accounts SET vip_until = now() - interval '100 days' WHERE id = $1", [u.account.id]);
    const r = await verify(app, u.token, { platform: 'ios', productId: MONTH, receipt: 'TEST-expired' }).expect(200);
    assert.ok(Math.abs(Date.parse(r.body.account.vipUntil) - (Date.now() + 30 * DAY)) < 60_000);
  });

  test('biên nhận đã dùng cho tài khoản khác → 409 receipt_used', async () => {
    const a = await register(app);
    const b = await register(app);
    await verify(app, a.token, { platform: 'ios', productId: MONTH, receipt: 'TEST-shared' }).expect(200);
    const r = await verify(app, b.token, { platform: 'ios', productId: MONTH, receipt: 'TEST-shared' }).expect(409);
    assert.equal(r.body.error, 'receipt_used');
    const me = await request(app).get('/v1/me').set(bearer(b.token)).expect(200);
    assert.equal(me.body.account.isVip, false);
  });

  test('dữ liệu sai → 400', async () => {
    const u = await register(app);
    assert.equal((await verify(app, u.token, { platform: 'web', productId: MONTH, receipt: 'TEST-a' }).expect(400)).body.error, 'invalid_request');
    assert.equal((await verify(app, u.token, { platform: 'ios', productId: 'vip_forever', receipt: 'TEST-a' }).expect(400)).body.error, 'invalid_product');
    assert.equal((await verify(app, u.token, { platform: 'ios', productId: MONTH, receipt: '' }).expect(400)).body.error, 'invalid_receipt');
  });

  test('dev mode tắt → 501 iap_not_configured (kể cả biên nhận TEST-)', async () => {
    const prodLike = makeApp(db, { iapDevMode: false });
    const u = await register(prodLike);
    for (const platform of ['ios', 'android']) {
      const r = await verify(prodLike, u.token, { platform, productId: MONTH, receipt: 'TEST-nope' }).expect(501);
      assert.equal(r.body.error, 'iap_not_configured');
    }
    // dev mode bật nhưng biên nhận thật (không TEST-) → vẫn 501 vì chưa cấu hình cửa hàng
    const r = await verify(app, u.token, { platform: 'ios', productId: MONTH, receipt: 'MIIT...real' }).expect(501);
    assert.equal(r.body.error, 'iap_not_configured');
    const me = await request(app).get('/v1/me').set(bearer(u.token)).expect(200);
    assert.equal(me.body.account.isVip, false);
  });

  test('IAP_DEV_MODE=true bị từ chối khi NODE_ENV=production', () => {
    assert.throws(() => loadConfig({ NODE_ENV: 'production', IAP_DEV_MODE: 'true' }), /production/);
    assert.throws(() => createApp({ db, config: testConfig({ nodeEnv: 'production', iapDevMode: true }) }), /production/);
    assert.equal(loadConfig({ NODE_ENV: 'production', IAP_DEV_MODE: 'false' }).iapDevMode, false);
  });
});
