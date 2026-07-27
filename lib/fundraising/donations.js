import { strapiFetch } from "@/lib/strapi";
import { normalizeEmail, toAmountNumber } from "@/lib/cloudpayments/parseNotification";

const getItemId = (item) => item?.documentId ?? item?.id;
const getAttrs = (item) => item?.attributes ?? item ?? {};

export const findDonationByTransactionId = async (transactionId) => {
  const query = new URLSearchParams({
    "filters[transactionId][$eq]": String(transactionId),
    "pagination[pageSize]": "1",
  });

  const result = await strapiFetch(`/fundraising-donations?${query}`);
  return Array.isArray(result?.data) ? result.data[0] : null;
};

export const findFundraisingItemBySlug = async (slug) => {
  const query = new URLSearchParams({
    "filters[slug][$eq]": slug,
    "pagination[pageSize]": "1",
  });

  const result = await strapiFetch(`/fundraising-items?${query}`);
  return Array.isArray(result?.data) ? result.data[0] : null;
};

export const countCompletedDonationsByEmail = async (slug, email) => {
  if (!email) return 0;

  const query = new URLSearchParams({
    "filters[fundraisingSlug][$eq]": slug,
    "filters[email][$eq]": email,
    "filters[fundraisingStatus][$eq]": "completed",
    "pagination[pageSize]": "1",
  });

  const result = await strapiFetch(`/fundraising-donations?${query}`);
  return (
    result?.meta?.pagination?.total ??
    (Array.isArray(result?.data) ? result.data.length : 0)
  );
};

export const updateFundraisingCounters = async (item, collectedValue, peopleCount) => {
  const id = getItemId(item);
  if (!id) {
    throw new Error("fundraising-item id is missing");
  }

  return strapiFetch(`/fundraising-items/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      data: {
        collectedValue,
        peopleCount,
      },
    }),
  });
};

export const processPayNotification = async (payload, fundraisingSlug) => {
  const transactionId = String(payload.TransactionId ?? payload.transactionId ?? "");
  const amount = toAmountNumber(payload.Amount ?? payload.amount);
  const email = normalizeEmail(payload.Email ?? payload.email);
  const invoiceId = payload.InvoiceId ?? payload.invoiceId ?? "";
  const paidAtRaw = payload.DateTime ?? payload.dateTime ?? "";
  const paidAt = paidAtRaw
    ? new Date(paidAtRaw.replace(" ", "T") + "Z").toISOString()
    : new Date().toISOString();

  if (!transactionId) {
    throw new Error("TransactionId is required");
  }
  if (!fundraisingSlug) {
    throw new Error("fundraisingSlug is required in payment Data");
  }
  if (amount <= 0) {
    throw new Error("Amount must be greater than 0");
  }

  const existingDonation = await findDonationByTransactionId(transactionId);
  if (existingDonation) {
    return { alreadyProcessed: true };
  }

  const fundraisingItem = await findFundraisingItemBySlug(fundraisingSlug);
  if (!fundraisingItem) {
    throw new Error(`Fundraising item not found for slug: ${fundraisingSlug}`);
  }

  await strapiFetch("/fundraising-donations", {
    method: "POST",
    body: JSON.stringify({
      data: {
        transactionId,
        fundraisingSlug,
        amount,
        email: email || null,
        fundraisingStatus: "completed",
        invoiceId: invoiceId || null,
        paidAt,
        rawPayload: payload,
      },
    }),
  });

  const attrs = getAttrs(fundraisingItem);
  const currentCollected = toAmountNumber(attrs.collectedValue);
  const currentPeople = Number(attrs.peopleCount) || 0;

  let nextPeople = currentPeople;
  if (email) {
    const sameEmailCompleted = await countCompletedDonationsByEmail(
      fundraisingSlug,
      email
    );
    // After create above, count includes the new donation.
    // Unique person: only first completed donation for this email increases peopleCount.
    if (sameEmailCompleted === 1) {
      nextPeople = currentPeople + 1;
    }
  } else {
    // No email — count as a separate supporter
    nextPeople = currentPeople + 1;
  }

  await updateFundraisingCounters(
    fundraisingItem,
    Number((currentCollected + amount).toFixed(2)),
    nextPeople
  );

  return { alreadyProcessed: false };
};

export const processRefundNotification = async (payload) => {
  const paymentTransactionId = String(
    payload.PaymentTransactionId ?? payload.paymentTransactionId ?? ""
  );
  const refundAmount = toAmountNumber(payload.Amount ?? payload.amount);

  if (!paymentTransactionId) {
    throw new Error("PaymentTransactionId is required for refund");
  }

  const donation = await findDonationByTransactionId(paymentTransactionId);
  if (!donation) {
    // Original pay may belong to another product; acknowledge quietly.
    return { skipped: true, reason: "donation_not_found" };
  }

  const donationAttrs = getAttrs(donation);
  if (donationAttrs.fundraisingStatus === "refunded") {
    return { alreadyProcessed: true };
  }

  const donationId = getItemId(donation);
  const slug = donationAttrs.fundraisingSlug;
  const email = normalizeEmail(donationAttrs.email);
  const originalAmount = toAmountNumber(donationAttrs.amount);
  const amountToSubtract = refundAmount > 0 ? refundAmount : originalAmount;

  await strapiFetch(`/fundraising-donations/${donationId}`, {
    method: "PUT",
    body: JSON.stringify({
      data: {
        fundraisingStatus: "refunded",
        rawPayload: {
          ...(donationAttrs.rawPayload || {}),
          refund: payload,
        },
      },
    }),
  });

  const fundraisingItem = await findFundraisingItemBySlug(slug);
  if (!fundraisingItem) {
    return { skipped: true, reason: "fundraising_item_not_found" };
  }

  const attrs = getAttrs(fundraisingItem);
  const currentCollected = toAmountNumber(attrs.collectedValue);
  const currentPeople = Number(attrs.peopleCount) || 0;

  let nextPeople = currentPeople;
  if (email) {
    const remainingCompleted = await countCompletedDonationsByEmail(slug, email);
    if (remainingCompleted === 0 && currentPeople > 0) {
      nextPeople = currentPeople - 1;
    }
  } else if (currentPeople > 0) {
    nextPeople = currentPeople - 1;
  }

  await updateFundraisingCounters(
    fundraisingItem,
    Math.max(0, Number((currentCollected - amountToSubtract).toFixed(2))),
    Math.max(0, nextPeople)
  );

  return { alreadyProcessed: false };
};
