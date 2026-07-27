import { NextResponse } from "next/server";
import { verifyCloudPaymentsHmac } from "@/lib/cloudpayments/verifyHmac";
import { parseCloudPaymentsBody } from "@/lib/cloudpayments/parseNotification";
import { processRefundNotification } from "@/lib/fundraising/donations";

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

    await processRefundNotification(payload);

    return NextResponse.json({ code: 0 });
  } catch (error) {
    console.error("[cloudpayments/refund]", error);
    return NextResponse.json(
      { code: 13, message: error.message || "Refund processing failed" },
      { status: 500 }
    );
  }
}
