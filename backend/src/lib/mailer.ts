import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// ── Send a generic email ──────────────────────────────────────
export const sendEmail = async (
  to: string,
  subject: string,
  html: string
) => {
  await transporter.sendMail({
    from: `"Mihrab Academy" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

// ── 24hr lesson reminder email ────────────────────────────────
export const sendLessonReminder = async (
  parentName: string,
  parentEmail: string,
  childName: string,
  lessonTime: string,
  meetingLink: string
) => {
  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #1a1035; color: #ffffff; padding: 40px; border-radius: 16px;">
      <h1 style="color: #d4af6a; font-size: 24px; margin-bottom: 8px;">Mihrab Academy</h1>
      <hr style="border-color: #a78bca33; margin-bottom: 24px;" />

      <p style="color: #a78bca;">Assalamu Alaikum, <strong style="color: #fff;">${parentName}</strong></p>

      <p style="color: #a78bca; line-height: 1.7;">
        This is a friendly reminder that <strong style="color: #d4af6a;">${childName}</strong>'s
        first lesson is scheduled for:
      </p>

      <div style="background: #160d2e; border: 1px solid #a78bca33; border-radius: 12px; padding: 20px; margin: 24px 0; text-align: center;">
        <p style="color: #d4af6a; font-size: 20px; margin: 0; font-weight: bold;">${lessonTime}</p>
      </div>

      <a href="${meetingLink}"
        style="display: inline-block; background: #2d1f4e; color: #d4af6a; padding: 12px 28px; border-radius: 50px; text-decoration: none; font-size: 14px; border: 1px solid #d4af6a44;">
        Join Lesson →
      </a>

      <p style="color: #a78bca55; font-size: 12px; margin-top: 40px;">
        Jazakum Allah Khayran for choosing Mihrab Academy.<br/>
        If you have any questions, reply to this email or WhatsApp us at +20 15 53135708.
      </p>
    </div>
  `;

  await sendEmail(parentEmail, "⏰ Reminder: Your Child's Lesson is Tomorrow!", html);
};

// ── Booking confirmation email ─────────────────────────────────
export const sendBookingConfirmation = async (
  parentName: string,
  parentEmail: string,
  childName: string,
  lessonTime: string,
  meetingLink: string
) => {
  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #1a1035; color: #ffffff; padding: 40px; border-radius: 16px;">
      <h1 style="color: #d4af6a; font-size: 24px; margin-bottom: 8px;">Mihrab Academy</h1>
      <hr style="border-color: #a78bca33; margin-bottom: 24px;" />

      <p style="color: #a78bca;">Assalamu Alaikum, <strong style="color: #fff;">${parentName}</strong></p>

      <p style="color: #a78bca; line-height: 1.7;">
        Alhamdulillah! <strong style="color: #d4af6a;">${childName}</strong>'s lesson has been booked successfully.
        We will send you a reminder 24 hours before the lesson.
      </p>

      <div style="background: #160d2e; border: 1px solid #a78bca33; border-radius: 12px; padding: 20px; margin: 24px 0; text-align: center;">
        <p style="color: #d4af6a; font-size: 20px; margin: 0; font-weight: bold;">${lessonTime}</p>
      </div>

      <a href="${meetingLink}"
        style="display: inline-block; background: #2d1f4e; color: #d4af6a; padding: 12px 28px; border-radius: 50px; text-decoration: none; font-size: 14px; border: 1px solid #d4af6a44;">
        View Lesson Details →
      </a>

      <p style="color: #a78bca55; font-size: 12px; margin-top: 40px;">
        Jazakum Allah Khayran for choosing Mihrab Academy.
      </p>
    </div>
  `;

  await sendEmail(parentEmail, "✅ Lesson Booked — Mihrab Academy", html);
};