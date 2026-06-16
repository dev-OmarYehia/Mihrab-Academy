import mongoose, { Document, Schema } from "mongoose";

export interface IContact extends Document {
  fullName: string;
  email: string;
  phone?: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IContact>("Contact", ContactSchema);