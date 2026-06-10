import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "../lib/supabase";
import { sendEmail } from "../lib/mailer";

const router = Router();

// ── POST /api/auth/signup ──────────────────────────────────────
// Registers a new parent account
router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { parentName, email, password, phone, childName, childAge } = req.body;

    if (!parentName || !email || !password || !phone || !childName || !childAge) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if email already exists
    const { data: existing } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (existing) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Insert user into Supabase
    const { data: user, error } = await supabase
      .from("users")
      .insert({
        parent_name: parentName,
        email,
        password: hashedPassword,
        phone,
        child_name: childName,
        child_age: childAge,
        role: "parent",
      })
      .select()
      .single();

    if (error) throw error;

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // Send welcome email
    await sendEmail(
      email,
      "Welcome to Mihrab Academy!",
      `<div style="font-family: Georgia, serif; padding: 32px; background: #1a1035; color: #fff; border-radius: 12px;">
        <h2 style="color: #d4af6a;">Welcome, ${parentName}!</h2>
        <p style="color: #a78bca;">Your account has been created successfully. You can now book lessons for <strong style="color:#fff;">${childName}</strong>.</p>
        <p style="color: #a78bca55; font-size: 12px;">Jazakum Allah Khayran — Mihrab Academy</p>
      </div>`
    );

    return res.status(201).json({
      message: "Account created successfully",
      token,
      user: {
        id: user.id,
        parentName: user.parent_name,
        email: user.email,
        childName: user.child_name,
        childAge: user.child_age,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// ── POST /api/auth/login ───────────────────────────────────────
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        parentName: user.parent_name,
        email: user.email,
        childName: user.child_name,
        childAge: user.child_age,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;