import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs"

const getFamilyStatusLabel = (value) => {
  switch (value) {
    case "free":
      return "холост";
    case "substitute":
      return "замужем(женат)";
    case "divorce":
      return "в разводе";
    default:
      return "";
  }
};

const getChildrenLabel = (value) => {
  switch (value) {
    case "no":
      return "нет";
    case "one":
      return "1 ребенок";
    case "morethanone":
      return "более 1 ребенка";
    default:
      return "";
  }
};

const getEnglishLevelLabel = (value) => {
  switch (value) {
    case "beginner":
      return "начальный уровень";
    case "intermediate":
      return "средний уровень";
    case "uper_intermediate":
      return "продвинутый уровень";
    default:
      return "";
  }
};

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") || "";
    const age = formData.get("age") || "";
    const city = formData.get("city") || "";
    const citizenship = formData.get("citizenship") || "";
    const family = formData.get("family") || "";
    const children = formData.get("children") || "";
    const education = formData.get("education") || "";
    const work = formData.get("work") || "";
    const rewards = formData.get("rewards") || "";
    const operation = formData.get("operation") || "";
    const english = formData.get("english") || "";
    const phone = formData.get("phone") || "";
    const mail = formData.get("mail") || "";
    const additionalInfo = formData.get("additionalInfo") || "";

    const specialization = formData.getAll("specialization");

    const allFiles = formData.getAll("files");

    const attachments = [];
    for (const file of allFiles) {
      if (file && typeof file.arrayBuffer === "function") {
        const buffer = Buffer.from(await file.arrayBuffer());
        attachments.push({
          filename: file.name,
          content: buffer,
        });
      }
    }


    const transporter = nodemailer.createTransport({
      host: "smtp.yandex.ru",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });


    const messageText = `
Новая заявка на обучение:

ФИО: ${name}
Возраст: ${age}
Город: ${city}
Гражданство: ${citizenship === "yes" ? "Да" : "Нет"}
Семейное положение: ${getFamilyStatusLabel(family)}
Дети: ${getChildrenLabel(children)}
Образование: ${education}
Место работы: ${work}
Награды: ${rewards}
Видео операции (YouTube): ${operation}
Уровень английского: ${getEnglishLevelLabel(english)}
Телефон: ${phone}
Email: ${mail}
Выбранные направления: ${specialization.join(", ")}
Доп. информация: ${additionalInfo}
`;


    const mailOptions = {
      from: ` <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: "Новая заявка на обучение",
      text: messageText,
      attachments,
    };


    await transporter.sendMail(mailOptions);


    return NextResponse.json({ success: true, message: "Письмо отправлено!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
        { error: "Ошибка при отправке письма" },
        { status: 500 }
    );
  }
}