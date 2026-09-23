import crypto from "crypto";

/**
 * Hand-rolled MoMo "captureWallet" (AIO v2) integration per
 * https://developers.momo.vn/v3/vi/docs/payment/api/wallet/onetime/
 * (sandbox endpoint below) — verified against MoMo's own docs rather than
 * assuming a third-party npm wrapper is up to date.
 */

interface MomoCreateResponse {
  payUrl?: string;
  deeplink?: string;
  qrCodeUrl?: string;
  resultCode: number;
  message: string;
  [key: string]: unknown;
}

export async function createMomoPayment(params: {
  orderId: string;
  requestId: string;
  amountCents: number; // whole VND
  orderInfo: string;
  extraData?: string; // base64, "" if unused
}): Promise<MomoCreateResponse> {
  const partnerCode = requireEnv("MOMO_PARTNER_CODE");
  const accessKey = requireEnv("MOMO_ACCESS_KEY");
  const secretKey = requireEnv("MOMO_SECRET_KEY");
  const endpoint = requireEnv("MOMO_ENDPOINT");
  const redirectUrl = requireEnv("MOMO_REDIRECT_URL");
  const ipnUrl = requireEnv("MOMO_IPN_URL");

  const amount = String(Math.round(params.amountCents));
  const extraData = params.extraData ?? "";
  const requestType = "captureWallet";

  const rawSignature =
    `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}` +
    `&ipnUrl=${ipnUrl}&orderId=${params.orderId}&orderInfo=${params.orderInfo}` +
    `&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}` +
    `&requestId=${params.requestId}&requestType=${requestType}`;

  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  const body = {
    partnerCode,
    partnerName: "VaraaAi.Com",
    storeId: "VaraaAiStore",
    requestId: params.requestId,
    amount,
    orderId: params.orderId,
    orderInfo: params.orderInfo,
    redirectUrl,
    ipnUrl,
    lang: "vi",
    requestType,
    extraData,
    signature,
  };

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return res.json();
}

export interface MomoIpnPayload {
  partnerCode: string;
  orderId: string;
  requestId: string;
  amount: string;
  orderInfo: string;
  orderType: string;
  transId: string;
  resultCode: string | number;
  message: string;
  payType: string;
  responseTime: string | number;
  extraData: string;
  signature: string;
}

export function verifyMomoSignature(payload: MomoIpnPayload): boolean {
  const accessKey = requireEnv("MOMO_ACCESS_KEY");
  const secretKey = requireEnv("MOMO_SECRET_KEY");

  const rawSignature =
    `accessKey=${accessKey}&amount=${payload.amount}&extraData=${payload.extraData}` +
    `&message=${payload.message}&orderId=${payload.orderId}&orderInfo=${payload.orderInfo}` +
    `&orderType=${payload.orderType}&partnerCode=${payload.partnerCode}&payType=${payload.payType}` +
    `&requestId=${payload.requestId}&responseTime=${payload.responseTime}` +
    `&resultCode=${payload.resultCode}&transId=${payload.transId}`;

  const expected = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  return expected === payload.signature;
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set`);
  return value;
}
