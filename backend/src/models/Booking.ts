import mongoose, { Document, Schema } from "mongoose";

export interface IBooking extends Document {
  user: mongoose.Types.ObjectId;
  calendlyEventUri: string;
  calendlyInviteeUri: string;
  eventTypeName: string;
  lessonTime: Date;
  meetingLink: string;
  status: "scheduled" | "completed" | "cancelled";
  reminderSent: boolean;
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    calendlyEventUri: { type: String, default: "" },
    calendlyInviteeUri: { type: String, default: "" },
    eventTypeName: { type: String, required: true },
    lessonTime: { type: Date, required: true },
    meetingLink: { type: String, default: "" },
    status: { type: String, enum: ["scheduled", "completed", "cancelled"], default: "scheduled" },
    reminderSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IBooking>("Booking", BookingSchema);