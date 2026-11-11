// Mua VIP trong app (In-App Purchase).
import { isPlaceholder } from './config.js';
import { withTransaction } from './db.js';
import { sha256 } from './auth.js';
import { HttpError } from './http.js';

/** Sản phẩm → số ngày VIP được cộng thêm. */
export const PRODUCTS = {
  'vn.ongvang.toan3.vip_month': 30,
  'vn.ongvang.toan3.vip_year': 365,
};

export const PLATFORMS = ['ios', 'android'];
export const DEV_RECEIPT_PREFIX = 'TEST-';

export function storeConfigured(platform, config) {
  if (platform === 'ios') return !isPlaceholder(config.appleSharedSecret);
  if (platform === 'android') return !isPlaceholder(config.googleServiceAccountJson);
  return false;
}

/**
 * Xác minh biên nhận với Apple / Google.
 * @returns {Promise<{ transactionId: string, devMode: boolean }>}
 * @throws {HttpError} 501 iap_not_configured khi chưa cấu hình / chưa cài đặt.
 */
export async function verifyWithStore(platform, productId, receipt, config) {
  // Chế độ thử: chấp nhận biên nhận "TEST-..." (KHÔNG BAO GIỜ bật trên production —
  // loadConfig/createApp từ chối chạy khi NODE_ENV=production và IAP_DEV_MODE=true).
  if (config.iapDevMode && config.nodeEnv !== 'production' && receipt.startsWith(DEV_RECEIPT_PREFIX)) {
    return { transactionId: receipt, devMode: true };
  }

  if (!storeConfigured(platform, config)) {
    throw new HttpError(
      501,
      'iap_not_configured',
      platform === 'ios'
        ? 'Server chưa được cấu hình để xác minh giao dịch với Apple.'
        : 'Server chưa được cấu hình để xác minh giao dịch với Google Play.',
    );
  }

  // TODO(IAP): cài đặt xác minh thật trước khi phát hành.
  //  - iOS: App Store Server API — "Get Transaction Info" / "Get All Subscription Statuses"
  //    https://developer.apple.com/documentation/appstoreserverapi
  //    (JWT ký bằng khoá In-App Purchase .p8; app gửi transactionId / JWS từ StoreKit 2.
  //    API cũ verifyReceipt dùng APPLE_SHARED_SECRET đã bị Apple khai tử:
  //    https://developer.apple.com/documentation/appstorereceipts/verifyreceipt)
  //  - Android: Google Play Developer API — purchases.subscriptionsv2.get
  //    https://developers.google.com/android-publisher/api-ref/rest/v3/purchases.subscriptionsv2/get
  //    (xác thực bằng service account trong GOOGLE_SERVICE_ACCOUNT_JSON; receipt = purchaseToken;
  //    nhớ gọi purchases.subscriptions.acknowledge).
  //  Khi xong: kiểm tra productId khớp, giao dịch còn hiệu lực, rồi trả về { transactionId, devMode: false }.
  void productId;
  throw new HttpError(
    501,
    'iap_not_configured',
    'Xác minh giao dịch với cửa hàng chưa được cài đặt trên server (TODO trong src/iap.js).',
  );
}

/**
 * Ghi nhận giao dịch và gia hạn VIP: vip_until = max(now, vip_until) + số ngày.
 * Cùng một biên nhận: tài khoản khác → 409 receipt_used; chính tài khoản đó → không cộng thêm lần nữa.
 * @returns {Promise<object>} hàng accounts sau khi cập nhật
 */
export async function applyPurchase(db, { accountId, platform, productId, receipt, transactionId, devMode }) {
  const days = PRODUCTS[productId];
  const receiptHash = sha256(`${platform}:${receipt}`);
  return withTransaction(db, async (client) => {
    // Khoá hàng tài khoản để các lần gia hạn đồng thời không giẫm lên nhau.
    await client.query('SELECT id FROM accounts WHERE id = $1 FOR UPDATE', [accountId]);
    const existing = await client.query('SELECT account_id FROM purchases WHERE receipt_hash = $1', [receiptHash]);
    if (existing.rows.length) {
      if (existing.rows[0].account_id !== accountId) {
        throw new HttpError(409, 'receipt_used', 'Biên nhận này đã được dùng cho một tài khoản khác.');
      }
      const { rows } = await client.query('SELECT id, email, vip_until FROM accounts WHERE id = $1', [accountId]);
      return rows[0];
    }
    const { rows } = await client.query(
      `UPDATE accounts
          SET vip_until = GREATEST(now(), COALESCE(vip_until, now())) + make_interval(days => $2)
        WHERE id = $1
        RETURNING id, email, vip_until`,
      [accountId, days],
    );
    const inserted = await client.query(
      `INSERT INTO purchases(account_id, platform, product_id, receipt_hash, receipt, transaction_id,
                             days_granted, vip_until_after, dev_mode)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       ON CONFLICT (receipt_hash) DO NOTHING
       RETURNING id`,
      [accountId, platform, productId, receiptHash, receipt, transactionId, days, rows[0].vip_until, devMode],
    );
    if (!inserted.rows.length) {
      // Tài khoản khác vừa dùng biên nhận này cùng lúc.
      throw new HttpError(409, 'receipt_used', 'Biên nhận này đã được dùng cho một tài khoản khác.');
    }
    return rows[0];
  });
}
