import { NextResponse } from "next/server";
import { sendMail, sendMailToAdmin } from "@/lib/mail/sendMail";

export const runtime = "nodejs";

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
    const q1 = formData.get("q1") || "";
    const q2 = formData.get("q2") || "";
    const q3 = formData.get("q3") || "";
    const q4 = formData.get("q4") || "";
    const howDidYouLearn = formData.get("howDidYouLearn") || "";

    const specialization = formData.getAll("specialization");

    const allFiles = formData.getAll("files");
    const filesCertificate = formData.get("files_certificate") || "";
    const filesResume = formData.get("files_resume") || "";
    const filesDoc = formData.get("files_doc") || "";

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
Видео операции: ${operation}
Уровень английского: ${getEnglishLevelLabel(english)}
Телефон: ${phone}
Email: ${mail}
Выбранные направления: ${specialization.join(", ")}

Чем заинтересовала данная программа обучения: ${q1}
Какие вы ставите перед собой цели и задачи в рамках обучения: ${q2}
Как вы видите свое профессиональное и карьерное развитие через 3, 5, 10 лет: ${q3}
Назовите ваши ключевые ценности и поясните их: ${q4}

Доп. информация: ${additionalInfo}
Как узнали о Школе Павленко: ${howDidYouLearn}
\n
Прикрепленные файлы:
- Сертификаты: ${filesCertificate || "—"}
- Резюме: ${filesResume || "—"}
- Прочие документы: ${filesDoc || "—"}
`;

    await sendMailToAdmin({
      subject: "Новая заявка на обучение",
      text: messageText,
      attachments,
    });

    if (mail) {
      const htmlTemplate = `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Школа Павленко</title>
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
            .logo {
              max-width: 200px;
              height: auto;
              margin-bottom: 20px;
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
              margin-bottom: 30px;
              line-height: 1.8;
              color: #141421;
            }
            .highlight {
              background-color: #f2f5fa;
              border-left: 4px solid #ed3834;
              padding: 20px;
              margin: 30px 0;
              border-radius: 0 8px 8px 0;
            }
            .highlight p {
              color: #ed3834;
              font-weight: 600;
              margin: 0 0 10px 0;
            }
            .highlight ul {
              margin: 10px 0;
              padding-left: 20px;
              color: #141421;
            }
            .footer {
              background-color: #f2f5fa;
              padding: 30px;
              text-align: center;
              color: #717780;
              font-size: 14px;
            }
            .contact-info {
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #cadbe0;
            }
            .contact-info p {
              margin: 5px 0;
            }
            .contact-info a {
              color: #577481;
              text-decoration: none;
              font-weight: 600;
            }
            .social-links {
              margin-top: 20px;
            }
            .social-links a {
              color: #577481;
              text-decoration: none;
              margin: 0 10px;
              font-weight: 600;
            }
            .button {
              display: inline-block;
              background-color: #ed3834;
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 6px;
              font-weight: 600;
              margin: 20px 0;
            }
            .button:hover {
              background-color: #d32f2f;
            }
            .email-link {
              color: #577481;
              text-decoration: none;
              font-weight: 600;
            }
            @media (max-width: 600px) {
              .container {
                margin: 0;
                box-shadow: none;
              }
              .header, .content, .footer {
                padding: 20px;
              }
              .greeting {
                font-size: 20px;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                <div style="width: 60px; height: 60px; margin-right: 20px; display: flex; align-items: center; justify-content: center;">
                  <img src="https://shkolapavlenko.ru/icon.svg" alt="Школа Павленко" style="width: 60px; height: 60px; object-fit: contain;" />
                </div>
                <div style="text-align: left;">
                  <h1 style="margin: 0; font-size: 28px; font-weight: 600;">ШКОЛА ПРАКТИЧЕСКОЙ ОНКОЛОГИИ</h1>
                  <p style="margin: 5px 0 0 0; font-size: 16px; opacity: 0.9;">им. Андрея Павленко</p>
                </div>
              </div>
            </div>
            
            <div class="content">
              <div class="greeting">Добро пожаловать в Школу Павленко!</div>
              
              <div class="message">
                <p>Спасибо за проявленный интерес к Школе Павленко и заполнение анкеты. Ваша заявка принята, ожидайте дальнейших сообщений о старте и времени тестирования.</p>
              </div>
              
              <div class="highlight">
                <p>Что дальше?</p>
                <ul>
                  <li>Мы рассмотрим вашу заявку в течение 5-7 рабочих дней</li>
                  <li>Свяжемся с вами для уточнения деталей</li>
                  <li>Пригласим на тестирование и собеседование</li>
                  <li>Сообщим о дате начала обучения</li>
                </ul>
              </div>
              
              <div class="message">
                <p>Если у вас есть вопросы, не стесняйтесь обращаться к нам. Мы всегда готовы помочь!</p>
                <p>С уважением,<br>Команда Школы Павленко</p>
              </div>
              
              <div style="margin-top: 30px; padding: 15px; background-color: #f8f9fa; border-radius: 8px; font-size: 12px; color: #666;">
                <p style="margin: 0;"><strong>Важно:</strong> Это письмо отправлено автоматически в ответ на вашу заявку на обучение. Если вы не подавали заявку, проигнорируйте это письмо.</p>
              </div>
            </div>
            
            <div class="footer">
              <div class="contact-info">
                <p><strong>Контакты:</strong></p>
                <p>📧 <a href="mailto:info@shkolapavlenko.ru" class="email-link">info@shkolapavlenko.ru</a></p>
                <p>📧 <a href="mailto:admission@shkolapavlenko.ru" class="email-link">admission@shkolapavlenko.ru</a> (для резидентов)</p>
                <p>🌐 <a href="https://shkolapavlenko.ru" class="email-link">shkolapavlenko.ru</a></p>
              </div>
              
              <div class="social-links">
                <p>Следите за нами в социальных сетях:</p>
                <a href="https://t.me/schoolpavlenko">Telegram</a> |
                <a href="https://vk.com/schoolpavlenko">VK</a> |
                <a href="https://dzen.ru/schoolpavlenko">Дзен</a>
              </div>
              
              <p style="margin-top: 20px; font-size: 12px; color: #999;">
                © ${new Date().getFullYear()} Школа Павленко. Все права защищены.
              </p>
            </div>
          </div>
        </body>
        </html>
      `;

      const textVersion = `
ШКОЛА ПРАКТИЧЕСКОЙ ОНКОЛОГИИ им. Андрея Павленко

Добро пожаловать в Школу Павленко!

Спасибо за проявленный интерес к Школе Павленко и заполнение анкеты. Ваша заявка принята, ожидайте дальнейших сообщений о старте и времени тестирования.

Что дальше?
- Мы рассмотрим вашу заявку в течение 5-7 рабочих дней
- Свяжемся с вами для уточнения деталей
- Пригласим на тестирование и собеседование
- Сообщим о дате начала обучения

Если у вас есть вопросы, не стесняйтесь обращаться к нам. Мы всегда готовы помочь!

Контакты:
📧 info@shkolapavlenko.ru
📧 admission@shkolapavlenko.ru (для резидентов)
🌐 https://shkolapavlenko.ru

Следите за нами в социальных сетях:
Telegram: https://t.me/schoolpavlenko
VK: https://vk.com/schoolpavlenko
Дзен: https://dzen.ru/schoolpavlenko

© ${new Date().getFullYear()} Школа Павленко. Все права защищены.

---
Это письмо отправлено автоматически в ответ на вашу заявку на обучение.
Если вы не подавали заявку, проигнорируйте это письмо.
      `;

      try {
        await sendMail({
          to: mail,
          fromName: "Школа Павленко",
          subject: "Ваша заявка принята - Школа Павленко",
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
        console.log(`Письмо резиденту отправлено на ${mail}`);
      } catch (residentError) {
        console.error("Ошибка при отправке письма резиденту:", residentError);
      }
    }

    return NextResponse.json({ success: true, message: "Письмо отправлено!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ошибка при отправке письма" },
      { status: 500 }
    );
  }
}
