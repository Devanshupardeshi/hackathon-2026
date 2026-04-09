import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import Button from "../components/Button";
import PasswordField from "../components/PasswordField";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student", otp: "" });
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [sending, setSending] = useState(false);
  const { register, requestRegisterOtp } = useAuth();
  const navigate = useNavigate();

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const sendOtp = async () => {
    setError("");
    setInfo("");
    const email = form.email.trim();
    if (!email) {
      setError("Enter your email first");
      return;
    }
    setSending(true);
    try {
      await requestRegisterOtp(email);
      setOtpSent(true);
      setInfo("Check your inbox. If nothing arrives, check the backend terminal for logs.");
    } catch (err) {
      const d = err?.response?.data;
      setError(
        [d?.message, d?.detail, d?.hint].filter(Boolean).join(" — ") || "Could not send code"
      );
    } finally {
      setSending(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    try {
      await register(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <AuthShell tagline="Join your campus workspace">
      <form className="space-y-5" onSubmit={onSubmit}>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Create account</h1>
          <p className="mt-1 text-sm text-slate-600">We email a 6-digit code to verify your address.</p>
        </div>
        {error && (
          <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">{error}</p>
        )}
        {info && (
          <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">{info}</p>
        )}
        <div className="space-y-3">
          <input className="input-field" placeholder="Full name" value={form.name} onChange={update("name")} required />
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              className="input-field flex-1"
              placeholder="Email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={update("email")}
              required
            />
            <Button type="button" variant="secondary" className="shrink-0 whitespace-nowrap" disabled={sending} onClick={sendOtp}>
              {sending ? "Sending…" : otpSent ? "Resend code" : "Send code"}
            </Button>
          </div>
          <input
            className="input-field"
            placeholder="6-digit code from email"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={form.otp}
            onChange={update("otp")}
            required
          />
          <PasswordField
            value={form.password}
            onChange={update("password")}
            placeholder="Password"
            autoComplete="new-password"
            required
          />
          <select className="input-field" value={form.role} onChange={update("role")}>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
            <option value="recruiter">Recruiter</option>
          </select>
        </div>
        <Button type="submit" className="w-full py-3">
          Verify &amp; register
        </Button>
        <p className="text-center text-sm text-slate-600">
          Already onboard?{" "}
          <Link to="/login" className="font-semibold text-violet-700 hover:text-violet-800 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
};

export default RegisterPage;
