import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./lib/db";
import authRoutes from "./routes/auth";
import bookingRoutes from "./routes/booking";
import contactRoutes from "./routes/contact";
import { startReminderCron } from "./lib/reminders";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000", credentials: true }));
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/contact", contactRoutes);

// ── Health check ──────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "Mihrab Academy API running 🕌" });
});

// ── 404 ───────────────────────────────────────────────────────
app.use((_req, res) => res.status(404).json({ error: "Route not found" }));

// ── Start ─────────────────────────────────────────────────────
const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    startReminderCron();
  });
};

start();
export default app;