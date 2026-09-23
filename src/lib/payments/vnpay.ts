import crypto from "crypto";

/**
 * Hand-rolled VNPay integration (API v2.1.0), following VNPay's official
 * sandbox docs at https://sandbox.vnpayment.vn/apis/ — no third-party SDK,
 * so there's nothing here whose behavior we can't verify directly against
 * VNPay's own spec.
 *
 * VNPay's backend is PHP, and its documented signing convention encodes
 * values with `encodeURIComponent` but then swaps `%20` for `+` (PHP's
 * `urlencode` behavior for spaces) — this must match exactly, or VNPay
 * recomputes a different hash than ours and rejects the request. Plain
 * `URLSearchParams`/`encodeURIComponent` alone do NOT produce the same
 * output for values containing `!`, `'`, `(`, `)`, or `~`, so we replicate
 * VNPay's own encoding function rather than relying on either.
 *
 * Flow:
 *   1. buildVnpayPaymentUrl(...)   -> redirect the customer here
 *   2. VNPay redirects back to VNPAY_RETURN_URL with vnp_* query params
 *   3. verifyVnpaySignature(query) -> confirm it really came from VNPay
 */

function vnpEncode(value: string): string {
  return encodeURIComponent(value).replace(/%20/g, "+");
}

/** Sorts by key and encodes each value the way VNPay's own examples do. */
function sortAndEncode(obj: Record<string, string>): [string, string][] {
  return Object.keys(obj)
    .sort()
    .map((key) => [key, vnpEncode(obj[key])]);
}

function buildSignData(pairs: [string, string][]): string {
  return pairs.map(([key, value]) => `${key}=${value}`).join("&");
}

export function buildVnpayPaymentUrl(params: {
  txnRef: string;
  amountCents: number; // whole VND, e.g. 150000
  orderInfo: string;
  ipAddr: string;
  locale?: "vn" | "en";
}): string {
  const tmnCode = requireEnv("VNPAY_TMN_CODE");
  const hashSecret = requireEnv("VNPAY_HASH_SECRET");
  const host = requireEnv("VNPAY_HOST");
  const returnUrl = requireEnv("VNPAY_RETURN_URL");

  const createDate = formatVnpayDate(new Date());

  const rawParams: Record<string, string> = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: tmnCode,
    vnp_Locale: params.locale ?? "vn",
    vnp_CurrCode: "VND",
    vnp_TxnRef: params.txnRef,
    vnp_OrderInfo: params.orderInfo,
    vnp_OrderType: "other",
    // VNPay requires the amount multiplied by 100 (no decimals).
    vnp_Amount: String(Math.round(params.amountCents) * 100),
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: params.ipAddr,
    vnp_CreateDate: createDate,
  };

  const encodedPairs = sortAndEncode(rawParams);
  const signData = buildSignData(encodedPairs);
  const secureHash = crypto
    .createHmac("sha512", hashSecret)
    .update(Buffer.from(signData, "utf-8"))
    .digest("hex");

  const query = `${signData}&vnp_SecureHash=${secureHash}`;
  return `${host}/paymentv2/vpcpay.html?${query}`;
}

/** Verifies the vnp_SecureHash on a return/IPN callback. */
export function verifyVnpaySignature(
  query: Record<string, string>
): { valid: boolean; params: Record<string, string> } {
  const hashSecret = requireEnv("VNPAY_HASH_SECRET");
  const { vnp_SecureHash, vnp_SecureHashType, ...rest } = query;

  const signData = buildSignData(sortAndEncode(rest));
  const expected = crypto
    .createHmac("sha512", hashSecret)
    .update(Buffer.from(signData, "utf-8"))
    .digest("hex");

  return { valid: expected === vnp_SecureHash, params: rest };
}

function formatVnpayDate(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}` +
    `${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`
  );
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set`);
  return value;
}
