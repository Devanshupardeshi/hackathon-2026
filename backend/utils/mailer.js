import nodemailer from "nodemailer";
import { buildRegisterOtpEmail } from "./emailTemplates.js";
import { logError, logInfo } from "./logger.js";

/** Dotenv often leaves quotes/spaces — strip so Nodemailer gets a clean host/user/pass */
const clean = (key) => {
  const raw = process.env[key];
  if (raw == null) return "";
  let s = String(raw).trim();
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    s = s.slice(1, -1).trim();
  }
  return s;
};

const buildTransport = () => {
  const host = clean("SMTP_HOST").toLowerCase();
  const user = clean("SMTP_USER");
  const pass = String(clean("SMTP_PASS") || "").replace(/\s+/g, "");
  const port = Number(clean("SMTP_PORT")) || 587;
  const secure =
    clean("SMTP_SECURE") === "true" || clean("SMTP_SECURE") === "1";

  const isGmail =
    host === "smtp.gmail.com" ||
    clean("SMTP_SERVICE").toLowerCase() === "gmail";

  if (!user || !pass) return null;
  if (!isGmail && !host) return null;

  if (isGmail) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass }
    });
  }

  return nodemailer.createTransport({
    host: host || "smtp.gmail.com",
    port,
    secure,
    auth: { user, pass },
    requireTLS: !secure && port === 587
  });
};

export const sendRegisterOtpEmail = async ({ to, code }) => {
  let from = clean("EMAIL_FROM") || clean("SMTP_USER") || "noreply@campusflow.local";
  if (from.includes("@") && !from.includes("<")) {
    from = `"CampusFlow AI" <${from}>`;
  }
  const subject = "Your CampusFlow AI code — verify your email";
  const { text, html } = buildRegisterOtpEmail(code);

  const transport = buildTransport();
  if (!transport) {
    logInfo("SMTP not configured — OTP logged for development", { to, code });
    return;
  }

  try {
    await transport.sendMail({ from, to, subject, text, html });
    logInfo("Register OTP email sent", { to });
  } catch (err) {
    logError("Failed to send OTP email", {
      to,
      message: err.message,
      code: err.code,
      response: err.response
    });
    throw err;
  }
};
