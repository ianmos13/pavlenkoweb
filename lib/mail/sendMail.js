import nodemailer from "nodemailer";

let transporter = null;

export const getMailTransporter = () => {
  if (transporter) return transporter;

  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    throw new Error("EMAIL_USER / EMAIL_PASS are not configured");
  }

  transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 587,
    secure: false,
    auth: {
      user,
      pass,
    },
  });

  return transporter;
};

export const sendMail = async ({
  to,
  subject,
  text,
  html,
  from,
  fromName,
  replyTo,
  attachments,
  headers,
} = {}) => {
  if (!to) {
    throw new Error("Mail recipient (to) is required");
  }
  if (!subject) {
    throw new Error("Mail subject is required");
  }
  if (!text && !html) {
    throw new Error("Mail text or html is required");
  }

  const user = process.env.EMAIL_USER;
  const mailTransporter = getMailTransporter();

  const fromAddress = from || user;
  const formattedFrom = fromName
    ? `"${fromName}" <${fromAddress}>`
    : `<${fromAddress}>`;

  return mailTransporter.sendMail({
    from: formattedFrom,
    to,
    subject,
    ...(text ? { text } : {}),
    ...(html ? { html } : {}),
    ...(replyTo ? { replyTo } : {}),
    ...(attachments?.length ? { attachments } : {}),
    ...(headers ? { headers } : {}),
  });
};

export const sendMailToAdmin = async (options = {}) => {
  const adminEmail = process.env.EMAIL_TO;

  if (!adminEmail) {
    throw new Error("EMAIL_TO is not configured");
  }

  return sendMail({
    ...options,
    to: options.to || adminEmail,
  });
};
