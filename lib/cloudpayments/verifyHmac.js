import crypto from "crypto";

export const verifyCloudPaymentsHmac = (rawBody, requestHeaders) => {
  const apiSecret = process.env.CLOUDPAYMENTS_API_SECRET;

  if (!apiSecret) {
    console.warn(
      "[cloudpayments] CLOUDPAYMENTS_API_SECRET is not set — HMAC check skipped"
    );
    return true;
  }

  const contentHmac =
    requestHeaders.get("content-hmac") ||
    requestHeaders.get("Content-HMAC") ||
    "";
  const xContentHmac =
    requestHeaders.get("x-content-hmac") ||
    requestHeaders.get("X-Content-HMAC") ||
    "";

  const expected = crypto
    .createHmac("sha256", apiSecret)
    .update(rawBody, "utf8")
    .digest("base64");

  const matches = (headerValue) => {
    if (!headerValue) return false;
    const a = Buffer.from(expected);
    const b = Buffer.from(headerValue);
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  };

  return matches(contentHmac) || matches(xContentHmac);
};
