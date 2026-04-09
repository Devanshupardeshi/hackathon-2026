import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../models/User.js";
import RegisterOtp from "../models/RegisterOtp.js";
import generateToken from "../utils/generateToken.js";
import { sendRegisterOtpEmail } from "../utils/mailer.js";
import { logError, logInfo } from "../utils/logger.js";

const normalizeEmail = (email) => String(email || "").trim().toLowerCase();

const publicUser = (userDoc) => ({
  id: userDoc._id,
  name: userDoc.name,
  email: userDoc.email,
  role: userDoc.role,
  bio: userDoc.bio ?? "",
  skills: userDoc.skills ?? []
});

export const sendRegisterOtp = async (req, res) => {
  const email = normalizeEmail(req.body.email);
  if (!email) return res.status(400).json({ message: "Email required" });

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      logInfo("sendRegisterOtp: skipped (email already registered)", { code: "EMAIL_IN_USE" });
      return res.status(400).json({
        message: "This email is already registered",
        hint: "Use Sign in on the login page, or register with a different email.",
        code: "EMAIL_IN_USE"
      });
    }

    await RegisterOtp.deleteMany({ email });
    const code = String(crypto.randomInt(100000, 1000000));
    const codeHash = await bcrypt.hash(code, 10);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await RegisterOtp.create({ email, codeHash, expiresAt });

    try {
      await sendRegisterOtpEmail({ to: email, code });
    } catch (mailErr) {
      await RegisterOtp.deleteMany({ email });
      logError("sendRegisterOtp email", { message: mailErr.message, code: mailErr.code });
      return res.status(502).json({
        message: "Could not send verification email",
        detail: mailErr.message,
        hint:
          "Gmail: use an App Password (2FA on), .env lines like SMTP_HOST=smtp.gmail.com with no spaces around =, no quotes on values. OTP is still in server logs if SMTP is off."
      });
    }

    return res.json({ message: "Verification code sent to your email" });
  } catch (error) {
    logError("sendRegisterOtp", { message: error.message });
    return res.status(500).json({
      message: "Could not start verification",
      detail: error.message
    });
  }
};

export const register = async (req, res) => {
  try {
    const { name, password, role, otp } = req.body;
    const email = normalizeEmail(req.body.email);
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password required" });
    }
    if (!otp || String(otp).trim().length < 6) {
      return res.status(400).json({ message: "Enter the 6-digit code from your email" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({
        message: "This email is already registered",
        hint: "Use Sign in instead of completing registration.",
        code: "EMAIL_IN_USE"
      });
    }

    const record = await RegisterOtp.findOne({ email }).sort({ createdAt: -1 });
    if (!record || record.expiresAt < new Date()) {
      return res.status(400).json({ message: "Code expired or missing. Request a new code." });
    }

    const valid = await bcrypt.compare(String(otp).trim(), record.codeHash);
    if (!valid) return res.status(400).json({ message: "Invalid verification code" });

    await RegisterOtp.deleteMany({ email });

    const allowedRoles = ["student", "admin", "recruiter"];
    const r = allowedRoles.includes(role) ? role : "student";

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role: r });

    return res.status(201).json({
      token: generateToken(user._id),
      user: publicUser(user)
    });
  } catch (error) {
    return res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const { password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    return res.json({
      token: generateToken(user._id),
      user: publicUser(user)
    });
  } catch (error) {
    return res.status(500).json({ message: "Login failed", error: error.message });
  }
};

export const me = async (req, res) => {
  const u = await User.findById(req.user._id).select("-password");
  if (!u) return res.status(404).json({ message: "User not found" });
  return res.json({ user: publicUser(u) });
};

export const updateProfile = async (req, res) => {
  try {
    const { name, bio, skills } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name != null) {
      const n = String(name).trim();
      if (n.length < 2) return res.status(400).json({ message: "Name too short" });
      user.name = n;
    }
    if (bio != null) user.bio = String(bio);
    if (skills != null) {
      if (!Array.isArray(skills)) {
        return res.status(400).json({ message: "Skills must be an array" });
      }
      user.skills = skills.map((s) => String(s).trim()).filter(Boolean);
    }

    await user.save();
    return res.json({ user: publicUser(user) });
  } catch (error) {
    return res.status(500).json({ message: "Could not update profile", error: error.message });
  }
};
