import { Router, Response } from "express";
import Booking from "../models/Booking";
import User from "../models/User";
import { sendBookingConfirmation } from "../lib/mailer";
import { protect, AuthRequest } from "../middleware/auth";

const router = Router();

// ── POST /api/booking/create ──────────────────────────────────
router.post("/create", protect, async (req: AuthRequest, res: Response) => {
  try {
    const { calendlyEventUri, calendlyInviteeUri, eventTypeName, lessonTime, meetingLink } = req.body;
    const userId = req.user!.id;

    if (!eventTypeName || !lessonTime) {
      return res.status(400).json({ error: "eventTypeName and lessonTime are required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const booking = await Booking.create({
      user: userId, calendlyEventUri, calendlyInviteeUri,
      eventTypeName, lessonTime: new Date(lessonTime),
      meetingLink: meetingLink || "", status: "scheduled",
    });

    // Send confirmation email
    const formatted = new Date(lessonTime).toLocaleString("en-US", {
      weekday: "long", year: "numeric", month: "long",
      day: "numeric", hour: "2-digit", minute: "2-digit",
    });

    sendBookingConfirmation(
      user.email, user.parentName, user.childName, formatted, meetingLink
    ).catch(console.error);

    return res.status(201).json({ message: "Booking created", booking });
  } catch (err) {
    console.error("Create booking error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// ── GET /api/booking/my-bookings ──────────────────────────────
router.get("/my-bookings", protect, async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await Booking.find({ user: req.user!.id })
      .sort({ lessonTime: 1 });
    return res.json({ bookings });
  } catch (err) {
    console.error("My bookings error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// ── PUT /api/booking/:id/cancel ───────────────────────────────
router.put("/:id/cancel", protect, async (req: AuthRequest, res: Response) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, user: req.user!.id },
      { status: "cancelled" },
      { new: true }
    );
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    return res.json({ message: "Booking cancelled", booking });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;