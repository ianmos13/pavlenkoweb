import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const fullName = formData.get("fullName") || "";
    const email = formData.get("email") || "";
    const comment = formData.get("comment") || "";
    const amount = formData.get("amount") || "";
    const frequency = formData.get("frequency") || "";
    const subscribeNews = formData.get("subscribeNews") || "";
    const showNameOnSite = formData.get("showNameOnSite") || "";

    const transporter = nodemailer.createTransport({
      host: "smtp.yandex.ru",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const messageText = `Новая заявка на пожертвование:

ФИО: ${fullName}
Email: ${email}
Комментарий: ${comment}
Сумма: ${amount} руб.
Частота: ${frequency === "monthly" ? "Ежемесячно" : "Разово"}
Подписка на новости: ${subscribeNews}
Согласен на размещение имени: ${showNameOnSite}
`;

    const mailOptions = {
      from: `<${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: "Заполнена форма на пожертвование",
      text: messageText,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Письмо отправлено (пожертвование)!",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ошибка при отправке письма" },
      { status: 500 }
    );
  }
}
