import cron from "node-cron";
import Booking from "../models/Booking";
import User from "../models/User";
import { sendLessonReminder } from "./mailer";

export const startReminderCron = () => {
  // Runs every hour
  cron.schedule("0 * * * *", async () => {
    console.log("⏰ Checking for lesson reminders...");
    try {
      const now = new Date();
      const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      const in25h = new Date(now.getTime() + 25 * 60 * 60 * 1000);

      const bookings = await Booking.find({
        reminderSent: false,
        status: "scheduled",
        lessonTime: { $gte: in24h, $lte: in25h },
      }).populate("user");

      for (const booking of bookings) {
        const user = await User.findById(booking.user);
        if (!user) continue;

        const formatted = new Date(booking.lessonTime).toLocaleString("en-US", {
          weekday: "long", year: "numeric", month: "long",
          day: "numeric", hour: "2-digit", minute: "2-digit",
        });

        await sendLessonReminder(
          user.email, user.parentName, user.childName,
          formatted, booking.meetingLink
        );

        await Booking.findByIdAndUpdate(booking._id, { reminderSent: true });
        console.log(`✅ Reminder sent to ${user.email}`);
      }
    } catch (err) {
      console.error("Reminder cron error:", err);
    }
  });

  console.log("🕐 Reminder cron started — checks every hour");
};