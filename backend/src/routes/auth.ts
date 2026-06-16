import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { sendWelcomeEmail } from "../lib/mailer";

const router = Router();

const generateToken = (id: string, email: string, role: string) =>
  jwt.sign({ id, email, role }, process.env.JWT_SECRET!, { expiresIn: "7d" });

// ── POST /api/auth/signup ─────────────────────────────────────
router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { parentName, email, password, phone, childName, childAge } = req.body;

    if (!parentName || !email || !password || !phone || !childName || !childAge) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: "Email already registered" });

    const user = await User.create({ parentName, email, password, phone, childName, childAge });

    const token = generateToken(user._id.toString(), user.email, user.role);

    // Send welcome email (don't await to not block response)
    sendWelcomeEmail(user.email, user.parentName, user.childName).catch(console.error);

    return res.status(201).json({
      message: "Account created successfully",
      token,
      user: {
        id: user._id, parentName: user.parentName, email: user.email,
        childName: user.childName, childAge: user.childAge, role: user.role,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// ── POST /api/auth/login ──────────────────────────────────────
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ error: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = generateToken(user._id.toString(), user.email, user.role);

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id, parentName: user.parentName, email: user.email,
        childName: user.childName, childAge: user.childAge, role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// ── GET /api/auth/me ──────────────────────────────────────────
router.get("/me", async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({ error: "No token" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const user = await User.findById(decoded.id).select("-password");

    if (!user) return res.status(404).json({ error: "User not found" });

    return res.json({ user });
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
});

export default router;