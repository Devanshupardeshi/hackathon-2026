/** Escape user-controlled fragments embedded in HTML email */
export const escapeHtml = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/**
 * CampusFlow AI — registration OTP (table layout + inline CSS for email clients)
 */
export const buildRegisterOtpEmail = (code) => {
  const safe = escapeHtml(code);
  const text = [
    "CampusFlow AI",
    "",
    "Your sign-up verification code is:",
    code,
    "",
    "This code expires in 10 minutes.",
    "If you did not request this, you can ignore this email.",
    "",
    "— CampusFlow AI"
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify your email</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f1f5f9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:520px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(15,23,42,0.08);border:1px solid #e2e8f0;">
          <tr>
            <td bgcolor="#7c3aed" style="height:4px;background:linear-gradient(90deg,#7c3aed,#a855f7,#6366f1);line-height:4px;font-size:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:32px 36px 24px 36px;">
              <p style="margin:0 0 4px 0;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#7c3aed;">CampusFlow</p>
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#0f172a;line-height:1.25;">Verify your email</h1>
              <p style="margin:12px 0 0 0;font-size:15px;line-height:1.55;color:#475569;">You’re almost in. Use this one-time code to finish creating your <strong style="color:#334155;">CampusFlow AI</strong> account.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 36px 28px 36px;" align="center">
              <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;max-width:280px;">
                <tr>
                  <td align="center" bgcolor="#faf5ff" style="background:linear-gradient(135deg,#faf5ff 0%,#f5f3ff 50%,#eef2ff 100%);border-radius:12px;border:1px solid #ddd6fe;padding:20px 24px;">
                    <p style="margin:0 0 8px 0;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#6d28d9;">Your code</p>
                    <p style="margin:0;font-size:32px;font-weight:700;letter-spacing:0.35em;color:#5b21b6;font-family:ui-monospace,'Cascadia Code','Segoe UI Mono',monospace;">${safe}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 36px 28px 36px;">
              <p style="margin:0;font-size:14px;line-height:1.6;color:#64748b;">This code expires in <strong style="color:#334155;">10 minutes</strong>. Don’t share it with anyone — our team will never ask for it.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 36px 32px 36px;border-top:1px solid #f1f5f9;">
              <p style="margin:20px 0 0 0;font-size:13px;line-height:1.5;color:#94a3b8;">If you didn’t try to sign up, you can safely ignore this message.</p>
              <p style="margin:16px 0 0 0;font-size:12px;color:#cbd5e1;">© CampusFlow AI · Campus collaboration &amp; placements</p>
            </td>
          </tr>
        </table>
        <p style="margin:20px 0 0 0;font-size:12px;color:#94a3b8;max-width:520px;">This is an automated message. Please do not reply to this email.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { text, html };
};
