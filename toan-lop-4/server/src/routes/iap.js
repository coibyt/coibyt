// /v1/iap/verify — xác minh giao dịch mua VIP.
import express from 'express';
import { accountJson, requireAuth } from '../auth.js';
import { ah, badRequest } from '../http.js';
import { applyPurchase, PLATFORMS, PRODUCTS, verifyWithStore } from '../iap.js';

export function iapRoutes({ db, config }) {
  const r = express.Router();

  r.post(
    '/iap/verify',
    requireAuth(db),
    ah(async (req, res) => {
      const { platform, productId, receipt } = req.body ?? {};
      if (!PLATFORMS.includes(platform)) throw badRequest('platform phải là "ios" hoặc "android".');
      if (!Object.hasOwn(PRODUCTS, productId ?? '')) throw badRequest('Mã sản phẩm không hợp lệ.', 'invalid_product');
      if (typeof receipt !== 'string' || !receipt || receipt.length > 100_000) {
        throw badRequest('Thiếu biên nhận (receipt) hợp lệ.', 'invalid_receipt');
      }
      const verified = await verifyWithStore(platform, productId, receipt, config);
      const row = await applyPurchase(db, {
        accountId: req.account.id,
        platform,
        productId,
        receipt,
        transactionId: verified.transactionId,
        devMode: verified.devMode,
      });
      res.json({ account: accountJson(row) });
    }),
  );

  return r;
}
