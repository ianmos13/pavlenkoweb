export const parseCloudPaymentsBody = async (req) => {
  const contentType = req.headers.get("content-type") || "";
  const rawBody = await req.text();

  if (!rawBody) {
    return { rawBody: "", payload: {} };
  }

  if (contentType.includes("application/json")) {
    try {
      return { rawBody, payload: JSON.parse(rawBody) };
    } catch {
      return { rawBody, payload: {} };
    }
  }

  const params = new URLSearchParams(rawBody);
  const payload = {};
  for (const [key, value] of params.entries()) {
    payload[key] = value;
  }

  return { rawBody, payload };
};

export const parseJsonField = (value) => {
  if (!value) return {};
  if (typeof value === "object") return value;

  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
};

export const getFundraisingSlugFromPayload = (payload) => {
  const data = parseJsonField(payload.Data ?? payload.data);
  return (
    data.fundraisingSlug ||
    data.FundraisingSlug ||
    payload.fundraisingSlug ||
    ""
  );
};

export const normalizeEmail = (email) =>
  typeof email === "string" ? email.trim().toLowerCase() : "";

export const toAmountNumber = (value) => {
  const amount = Number.parseFloat(String(value).replace(",", "."));
  return Number.isFinite(amount) ? amount : 0;
};
