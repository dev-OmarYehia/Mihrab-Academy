import { Router, Request, Response } from "express";
import { supabase } from "../lib/supabase";
import { sendEmail } from "../lib/mailer";

const router = Router();

// ── POST /api/contact ──────────────────────────────────────────
// Saves contact form submission and notifies the academy
router.post("/", async (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, message } = req.body;

    if (!fullName || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required" });
    }

    // Save to Supabase
    const { error } = await supabase.from("contact_submissions").insert({
      full_name: fullName,
      email,
      phone: phone || null,
      message,
    });

    if (error) throw error;

    // Notify the academy (internal email)
    await sendEmail(
      process.env.GMAIL_USER!,
      `📬 New Contact Form Submission from ${fullName}`,
      `<div style="font-family: Georgia, serif; padding: 24px; background: #1a1035; color: #fff; border-radius: 12px;">
        <h2 style="color: #d4af6a;">New Message</h2>
        <p><strong style="color:#a78bca;">Name:</strong> ${fullName}</p>
        <p><strong style="color:#a78bca;">Email:</strong> ${email}</p>
        <p><strong style="color:#a78bca;">Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong style="color:#a78bca;">Message:</strong></p>
        <p style="background:#160d2e; padding:16px; border-radius:8px; color:#fff;">${message}</p>
      </div>`
    );

    // Send auto-reply to the person
    await sendEmail(
      email,
      "We received your message — Mihrab Academy",
      `<div style="font-family: Georgia, serif; padding: 32px; background: #1a1035; color: #fff; border-radius: 12px;">
        <h2 style="color: #d4af6a;">Assalamu Alaikum, ${fullName}!</h2>
        <p style="color: #a78bca; line-height: 1.7;">
          Jazakum Allah Khayran for reaching out to Mihrab Academy. 
          We have received your message and our admissions team will get back to you within 24 hours, in sha Allah.
        </p>
        <p style="color: #a78bca55; font-size: 12px; margin-top: 32px;">Mihrab Academy — Learn Qur'an with Proper Guidance</p>
      </div>`
    );

    return res.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error("Contact form error:", err);
    return res.status(500).json({ error: "Failed to send message" });
  }
});

export default router;