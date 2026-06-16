import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  await transporter.sendMail({
    from: `"Mihrab Academy" <${process.env.GMAIL_USER}>`,
    to, subject, html,
  });
};

const emailWrapper = (content: string) => `
  <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#1a3a2f;color:#fff;padding:40px;border-radius:16px;">
    <h2 style="color:#c9a96e;margin-bottom:4px;">Mihrab Academy</h2>
    <hr style="border-color:rgba(201,169,110,0.2);margin-bottom:24px;" />
    ${content}
    <p style="color:rgba(201,169,110,0.4);font-size:12px;margin-top:40px;">Jazakum Allah Khayran — Mihrab Academy</p>
  </div>`;

export const sendWelcomeEmail = async (email: string, parentName: string, childName: string) => {
  await sendEmail(email, "Welcome to Mihrab Academy!", emailWrapper(`
    <p style="color:rgba(255,255,255,0.8);">Assalamu Alaikum, <strong>${parentName}</strong></p>
    <p style="color:rgba(255,255,255,0.7);line-height:1.7;">
      Alhamdulillah! Your account has been created. You can now book lessons for
      <strong style="color:#c9a96e;">${childName}</strong>.
    </p>
    <a href="${process.env.FRONTEND_URL}/booking"
      style="display:inline-block;background:#5a4a2f;color:#c9a96e;padding:12px 28px;border-radius:50px;text-decoration:none;font-size:14px;margin-top:16px;">
      Book Your First Lesson →
    </a>`));
};

export const sendBookingConfirmation = async (
  email: string, parentName: string, childName: string,
  lessonTime: string, meetingLink: string
) => {
  await sendEmail(email, "✅ Lesson Booked — Mihrab Academy", emailWrapper(`
    <p style="color:rgba(255,255,255,0.8);">Assalamu Alaikum, <strong>${parentName}</strong></p>
    <p style="color:rgba(255,255,255,0.7);line-height:1.7;">
      <strong style="color:#c9a96e;">${childName}</strong>'s lesson has been booked successfully!
    </p>
    <div style="background:rgba(0,0,0,0.3);border:1px solid rgba(201,169,110,0.2);border-radius:12px;padding:20px;margin:20px 0;text-align:center;">
      <p style="color:#c9a96e;font-size:18px;margin:0;font-weight:bold;">${lessonTime}</p>
    </div>
    <a href="${meetingLink}" style="display:inline-block;background:#5a4a2f;color:#c9a96e;padding:12px 28px;border-radius:50px;text-decoration:none;font-size:14px;">
      Join Lesson →
    </a>`));
};

export const sendLessonReminder = async (
  email: string, parentName: string, childName: string,
  lessonTime: string, meetingLink: string
) => {
  await sendEmail(email, "⏰ Reminder: Lesson Tomorrow — Mihrab Academy", emailWrapper(`
    <p style="color:rgba(255,255,255,0.8);">Assalamu Alaikum, <strong>${parentName}</strong></p>
    <p style="color:rgba(255,255,255,0.7);line-height:1.7;">
      This is a reminder that <strong style="color:#c9a96e;">${childName}</strong>'s lesson is tomorrow!
    </p>
    <div style="background:rgba(0,0,0,0.3);border:1px solid rgba(201,169,110,0.2);border-radius:12px;padding:20px;margin:20px 0;text-align:center;">
      <p style="color:#c9a96e;font-size:18px;margin:0;font-weight:bold;">${lessonTime}</p>
    </div>
    <a href="${meetingLink}" style="display:inline-block;background:#5a4a2f;color:#c9a96e;padding:12px 28px;border-radius:50px;text-decoration:none;font-size:14px;">
      Join Lesson →
    </a>`));
};