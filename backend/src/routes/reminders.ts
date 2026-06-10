import cron from "node-cron";
import { supabase } from "../lib/supabase";
import { sendLessonReminder } from "../lib/mailer";

// Runs every hour to check for upcoming lessons
export const startReminderCron = () => {
  cron.schedule("0 * * * *", async () => {
    console.log("⏰ Running reminder check...");

    try {
      const now = new Date();
      const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      const in25Hours = new Date(now.getTime() + 25 * 60 * 60 * 1000);

      // Find bookings happening in the next 24-25 hours that haven't been reminded yet
      const { data: bookings, error } = await supabase
        .from("bookings")
        .select(`
          *,
          users (
            parent_name,
            email,
            child_name
          )
        `)
        .eq("reminder_sent", false)
        .eq("status", "scheduled")
        .gte("lesson_time", in24Hours.toISOString())
        .lte("lesson_time", in25Hours.toISOString());

      if (error) {
        console.error("Reminder cron DB error:", error);
        return;
      }

      if (!bookings || bookings.length === 0) {
        console.log("No reminders to send right now.");
        return;
      }

      for (const booking of bookings) {
        const user = booking.users as {
          parent_name: string;
          email: string;
          child_name: string;
        };

        const lessonTimeFormatted = new Date(booking.lesson_time).toLocaleString(
          "en-US",
          {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }
        );

        // Send the reminder email
        await sendLessonReminder(
          user.parent_name,
          user.email,
          user.child_name,
          lessonTimeFormatted,
          booking.meeting_link
        );

        // Mark reminder as sent
        await supabase
          .from("bookings")
          .update({ reminder_sent: true })
          .eq("id", booking.id);

        console.log(`✅ Reminder sent to ${user.email} for ${user.child_name}'s lesson`);
      }
    } catch (err) {
      console.error("Reminder cron error:", err);
    }
  });

  console.log("🕐 Reminder cron job started — checks every hour");
};