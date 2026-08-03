import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail/sendMail";
import { strapiFetch } from "@/lib/strapi";

export const runtime = "nodejs";

const getSiteUrl = () =>
  (process.env.NEXT_PUBLIC_SITE_URL || "https://shkolapavlenko.ru").replace(
    /\/$/,
    ""
  );

const getEntryFromPayload = (payload = {}) => {
  // Strapi webhook: { event, model, entry }
  if (payload.entry) {
    return payload.entry.attributes
      ? { id: payload.entry.id, documentId: payload.entry.documentId, ...payload.entry.attributes }
      : payload.entry;
  }

  // Прямой вызов API / ручной тест
  if (payload.data) {
    return payload.data.attributes
      ? { id: payload.data.id, documentId: payload.data.documentId, ...payload.data.attributes }
      : payload.data;
  }

  return payload;
};

const isWebhookAuthorized = (req) => {
  const expected = process.env.STRAPI_WEBHOOK_SECRET;
  if (!expected) return true;

  const authHeader = req.headers.get("authorization") || "";
  const tokenHeader =
    req.headers.get("x-strapi-webhook-token") ||
    req.headers.get("X-Strapi-Webhook-Token") ||
    "";

  const bearer = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7).trim()
    : "";

  return bearer === expected || tokenHeader === expected;
};

const markModerationEmailSent = async (entry) => {
  const id = entry.documentId ?? entry.id;
  if (!id) return;

  try {
    await strapiFetch(`/fundraising-items/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        data: {
          moderationEmailSent: true,
        },
      }),
    });
  } catch (error) {
    // Поле может ещё не быть заведено в Strapi — не валим весь процесс
    console.warn(
      "[send-fundraising-approved] Не удалось сохранить moderationEmailSent:",
      error.message
    );
  }
};

export async function POST(req) {
  try {
    if (!isWebhookAuthorized(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await req.json().catch(() => ({}));
    const entry = getEntryFromPayload(payload);
    const completeModeration = entry.completeModeration === true;
    if (!completeModeration) {
      return NextResponse.json({
        success: true,
        skipped: true,
        reason: "completeModeration_is_not_true",
      });
    }

    if (entry.moderationEmailSent === true) {
      return NextResponse.json({
        success: true,
        skipped: true,
        reason: "moderation_email_already_sent",
      });
    }

    const organizerEmail = String(entry.organizerEmail || "").trim();
    if (!organizerEmail) {
      return NextResponse.json(
        { error: "Email организатора обязателен" },
        { status: 400 }
      );
    }

    const organizerName = String(entry.organizerName || "").trim();
    const fundraisingName = String(entry.name || entry.fundraisingName || "").trim();
    const slug = String(entry.slug || "").trim();

    const siteUrl = getSiteUrl();
    const fundraisingUrl = slug
      ? `${siteUrl}/fundraising/${slug}`
      : `${siteUrl}/fundraising`;
    const displayName = organizerName || "друг";
    const campaignName = fundraisingName || "ваш сбор";

    const textVersion = `
ШКОЛА ПРАКТИЧЕСКОЙ ОНКОЛОГИИ им. Андрея Павленко

Здравствуйте, ${displayName}!

Отличные новости: ваш сбор «${campaignName}» прошёл модерацию и опубликован.

Страница сбора доступна по ссылке:
${fundraisingUrl}

Теперь вы можете делиться этой ссылкой с друзьями и коллегами.

Спасибо, что поддерживаете Школу Павленко!

С уважением,
Команда Школы Павленко

Контакты:
info@shkolapavlenko.ru
https://shkolapavlenko.ru

© ${new Date().getFullYear()} Школа Павленко. Все права защищены.
`;

    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="ru">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Сбор одобрен — Школа Павленко</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: 'Nunito', Arial, sans-serif;
            background-color: #f2f5fa;
            line-height: 1.6;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #0f384a 0%, #224858 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
          }
          .content {
            padding: 40px 30px;
            color: #141421;
          }
          .greeting {
            font-size: 24px;
            font-weight: 600;
            color: #0f384a;
            margin-bottom: 20px;
          }
          .message {
            font-size: 16px;
            margin-bottom: 24px;
            line-height: 1.8;
            color: #141421;
          }
          .highlight {
            background-color: #f2f5fa;
            border-left: 4px solid #ed3834;
            padding: 20px;
            margin: 24px 0;
            border-radius: 0 8px 8px 0;
          }
          .highlight p {
            color: #ed3834;
            font-weight: 600;
            margin: 0 0 10px 0;
          }
          .button {
            display: inline-block;
            background-color: #ed3834;
            color: #ffffff !important;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 10px 0 20px;
          }
          .footer {
            background-color: #f2f5fa;
            padding: 30px;
            text-align: center;
            color: #717780;
            font-size: 14px;
          }
          .email-link {
            color: #577481;
            text-decoration: none;
            font-weight: 600;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div style="display: flex; align-items: center; justify-content: center;">
              <div style="width: 60px; height: 60px; margin-right: 20px;">
                <img src="https://shkolapavlenko.ru/icon.svg" alt="Школа Павленко" style="width: 60px; height: 60px; object-fit: contain;" />
              </div>
              <div style="text-align: left;">
                <h1 style="margin: 0; font-size: 24px; font-weight: 600;">ШКОЛА ПРАКТИЧЕСКОЙ ОНКОЛОГИИ</h1>
                <p style="margin: 5px 0 0 0; font-size: 16px; opacity: 0.9;">им. Андрея Павленко</p>
              </div>
            </div>
          </div>

          <div class="content">
            <div class="greeting">Здравствуйте, ${displayName}!</div>
            <div class="message">
              <p>Отличные новости: ваш сбор <strong>«${campaignName}»</strong> прошёл модерацию и опубликован.</p>
              <p>Теперь страница сбора доступна всем, и вы можете делиться ссылкой с друзьями и коллегами.</p>
            </div>

            <div class="highlight">
              <p>Ваш сбор уже онлайн</p>
              <ul style="margin: 10px 0; padding-left: 20px; color: #141421;">
                <li>Страница опубликована</li>
                <li>Можно принимать поддержку</li>
                <li>Делитесь ссылкой — это помогает сбору расти</li>
              </ul>
            </div>

            <div class="message">
              <a class="button" href="${fundraisingUrl}">Открыть страницу сбора</a>
              <p style="font-size: 13px; color: #717780;">
                ${fundraisingUrl}
              </p>
            </div>

            <div class="message">
              <p>Спасибо, что поддерживаете Школу Павленко!</p>
              <p>С уважением,<br>Команда Школы Павленко</p>
            </div>
          </div>

          <div class="footer">
            <p>📧 <a href="mailto:info@shkolapavlenko.ru" class="email-link">info@shkolapavlenko.ru</a></p>
            <p>🌐 <a href="https://shkolapavlenko.ru" class="email-link">shkolapavlenko.ru</a></p>
            <p style="margin-top: 20px; font-size: 12px; color: #999;">
              © ${new Date().getFullYear()} Школа Павленко. Все права защищены.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
    await sendMail({
      to: organizerEmail.toLowerCase(),
      fromName: "Школа Павленко",
      subject: `Сбор «${campaignName}» одобрен и опубликован`,
      text: textVersion,
      html: htmlTemplate,
      replyTo: process.env.EMAIL_USER,
      headers: {
        "X-Mailer": "Школа Павленко",
        "X-Priority": "3",
        "X-MSMail-Priority": "Normal",
        Importance: "Normal",
      },
    });
    await markModerationEmailSent(entry);
    return NextResponse.json({
      success: true,
      message: "Письмо об одобрении сбора отправлено",
    });
  } catch (error) {
    console.error("[send-fundraising-approved]", error);
    return NextResponse.json(
      { error: "Ошибка при отправке письма об одобрении сбора" },
      { status: 500 }
    );
  }
}
