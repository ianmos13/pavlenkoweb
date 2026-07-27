import { NextResponse } from "next/server";
import { verifyCloudPaymentsHmac } from "@/lib/cloudpayments/verifyHmac";
import {
  getFundraisingSlugFromPayload,
  parseCloudPaymentsBody,
} from "@/lib/cloudpayments/parseNotification";
import { processPayNotification } from "@/lib/fundraising/donations";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { rawBody, payload } = await parseCloudPaymentsBody(req);

    if (!verifyCloudPaymentsHmac(rawBody, req.headers)) {
      return NextResponse.json(
        { code: 13, message: "Invalid HMAC signature" },
        { status: 401 }
      );
    }

    const fundraisingSlug = getFundraisingSlugFromPayload(payload);
    await processPayNotification(payload, fundraisingSlug);

    return NextResponse.json({ code: 0 });
  } catch (error) {
    console.error("[cloudpayments/pay]", error);
    const isMissingSlug = String(error.message || "").includes("fundraisingSlug");
    if (isMissingSlug) {
      return NextResponse.json({ code: 0 });
    }

    return NextResponse.json(
      { code: 13, message: error.message || "Pay processing failed" },
      { status: 500 }
    );
  }
}
