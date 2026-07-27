import { NextResponse } from "next/server";
import { sendMailToAdmin } from "@/lib/mail/sendMail";

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

    const messageText = `Новая заявка на пожертвование:

ФИО: ${fullName}
Email: ${email}
Комментарий: ${comment}
Сумма: ${amount} руб.
Частота: ${frequency === "monthly" ? "Ежемесячно" : "Разово"}
Подписка на новости: ${subscribeNews}
Согласен на размещение имени: ${showNameOnSite}
`;

    await sendMailToAdmin({
      subject: "Заполнена форма на пожертвование",
      text: messageText,
    });

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
