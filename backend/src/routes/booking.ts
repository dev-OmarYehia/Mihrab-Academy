import { Router, Response } from "express";
import axios from "axios";
import { supabase } from "../lib/supabase";
import { sendBookingConfirmation } from "../lib/mailer";
import { protect, AuthRequest } from "../middleware/auth";

const router = Router();

const CALENDLY_API = "https://api.calendly.com";

const calendlyHeaders = () => ({
  Authorization: `Bearer ${process.env.CALENDLY_API_KEY}`,
  "Content-Type": "application/json",
});

// ── GET /api/booking/available-times ──────────────────────────
// Returns available slots from Calendly for a specific event type
router.get("/available-times", async (req: AuthRequest, res: Response) => {
  try {
    const { eventTypeUri, startTime, endTime } = req.query;

    if (!eventTypeUri || !startTime || !endTime) {
      return res.status(400).json({ error: "eventTypeUri, startTime, and endTime are required" });
    }

    const response = await axios.get(
      `${CALENDLY_API}/event_type_available_times`,
      {
        headers: calendlyHeaders(),
        params: {
          event_type: eventTypeUri,
          start_time: startTime,
          end_time: endTime,
        },
      }
    );

    return res.json({ availableTimes: response.data.collection });
  } catch (err) {
    console.error("Calendly available times error:", err);
    return res.status(500).json({ error: "Failed to fetch available times" });
  }
});

// ── GET /api/booking/event-types ──────────────────────────────
// Lists all event types (lesson types) configured in Calendly
router.get("/event-types", async (_req: AuthRequest, res: Response) => {
  try {
    const response = await axios.get(`${CALENDLY_API}/event_types`, {
      headers: calendlyHeaders(),
      params: { user: process.env.CALENDLY_USER_URI },
    });

    return res.json({ eventTypes: response.data.collection });
  } catch (err) {
    console.error("Calendly event types error:", err);
    return res.status(500).json({ error: "Failed to fetch event types" });
  }
});

// ── POST /api/booking/create ───────────────────────────────────
// Saves a booking after Calendly schedules it, and sends confirmation email
router.post("/create", protect, async (req: AuthRequest, res: Response) => {
  try {
    const {
      calendlyEventUri,
      calendlyInviteeUri,
      lessonTime,
      meetingLink,
      eventTypeName,
    } = req.body;

    const userId = req.user!.id;

    // Get user info for the email
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (userError || !user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Save booking to Supabase
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .insert({
        user_id: userId,
        calendly_event_uri: calendlyEventUri,
        calendly_invitee_uri: calendlyInviteeUri,
        lesson_time: lessonTime,
        meeting_link: meetingLink,
        event_type_name: eventTypeName,
        reminder_sent: false,
        status: "scheduled",
      })
      .select()
      .single();

    if (bookingError) throw bookingError;

    // Send booking confirmation email
    await sendBookingConfirmation(
      user.parent_name,
      user.email,
      user.child_name,
      new Date(lessonTime).toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      meetingLink
    );

    return res.status(201).json({
      message: "Booking saved and confirmation email sent",
      booking,
    });
  } catch (err) {
    console.error("Create booking error:", err);
    return res.status(500).json({ error: "Failed to create booking" });
  }
});

// ── GET /api/booking/my-bookings ──────────────────────────────
// Returns all bookings for the logged-in user
router.get("/my-bookings", protect, async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", req.user!.id)
      .order("lesson_time", { ascending: true });

    if (error) throw error;

    return res.json({ bookings: data });
  } catch (err) {
    console.error("My bookings error:", err);
    return res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

export default router;