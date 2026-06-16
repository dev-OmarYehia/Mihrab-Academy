import { Router, Request, Response } from "express";
import Contact from "../models/Contact";
import { sendEmail } from "../lib/mailer";

const router = Router();

// ── POST /api/contact ─────────────────────────────────────────
router.post("/", async (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, message } = req.body;

    if (!fullName || !email || !message) {
      return res.status(400).json({ error: "Name, email and message are required" });
    }

    // Save to MongoDB
    await Contact.create({ fullName, email, phone, message });

    // Notify academy
    sendEmail(
      process.env.GMAIL_USER!,
      `📬 New Message from ${fullName}`,
      `<div style="font-family:Georgia,serif;padding:24px;background:#1a3a2f;color:#fff;border-radius:12px;">
        <h2 style="color:#c9a96e;">New Contact Form Submission</h2>
        <p><strong style="color:#c9a96e;">Name:</strong> ${fullName}</p>
        <p><strong style="color:#c9a96e;">Email:</strong> ${email}</p>
        <p><strong style="color:#c9a96e;">Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong style="color:#c9a96e;">Message:</strong></p>
        <p style="background:rgba(0,0,0,0.3);padding:16px;border-radius:8px;">${message}</p>
      </div>`
    ).catch(console.error);

    // Auto-reply to sender
    sendEmail(
      email,
      "We received your message — Mihrab Academy",
      `<div style="font-family:Georgia,serif;padding:32px;background:#1a3a2f;color:#fff;border-radius:12px;">
        <h2 style="color:#c9a96e;">Assalamu Alaikum, ${fullName}!</h2>
        <p style="color:rgba(255,255,255,0.7);line-height:1.7;">
          Jazakum Allah Khayran for reaching out. We have received your message and will get back to you within 24 hours, in sha Allah.
        </p>
        <p style="color:rgba(201,169,110,0.4);font-size:12px;margin-top:32px;">Mihrab Academy</p>
      </div>`
    ).catch(console.error);

    return res.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error("Contact error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;