import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { UserRole } from "../types/models";

const roles: { id: UserRole; label: string; icon: string }[] = [
  { id: "student", label: "Student", icon: "school" },
  { id: "admin", label: "Admin", icon: "admin_panel_settings" },
  { id: "recruiter", label: "Recruiter", icon: "work" }
];

export default function Register() {
  const navigate = useNavigate();
  const { user, register, sendRegisterOtp } = useAuth();
  const [role, setRole] = useState<UserRole>("student");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSendOtp = async () => {
    setError("");
    if (!email.trim()) {
      setError("Enter your email");
      return;
    }
    setBusy(true);
    try {
      await sendRegisterOtp(email.trim());
      setOtpSent(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not send code");
    } finally {
      setBusy(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        password,
        role,
        otp: otp.trim()
      });
      navigate("/dashboard", { replace: true });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Registration failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="flex h-screen w-full bg-surface text-on-surface antialiased overflow-hidden">
      <section className="hidden lg:flex lg:w-1/2 relative flex-col justify-end p-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Campus Life"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAn4GK5734P77GMjFHBMmUq4Vc2YASXY2DAB3zms9SE2mKfugykoiPNvn19V-BknJWGASlqZrix9R4QDJQ0gMuJQMb7LQJXS-gGSzRO4AMRgk5AebtPpTOnQReE7iriHDwqgXiVtLlI1hYHsMrERI7hKb7SHQGQFn9py_V9vSVZ6hNZIj6c78uyOqJi3nwFIIudJPKLUDLS5EuphvKFy_juLT15-YoKcRYmyg_60yQtAdlZ1q0H9Y1kag_9_Mq28pHgG2vT_ZckKFg"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dim/90 via-primary-dim/40 to-transparent"></div>
        </div>
        <div className="relative z-10 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-surface-container-lowest rounded-2xl flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-3xl">auto_awesome</span>
            </div>
            <span className="text-surface-container-lowest font-headline font-bold text-2xl tracking-tight">
              CampusFlow AI
            </span>
          </div>
          <h1 className="text-surface-container-lowest font-headline font-extrabold text-5xl leading-tight tracking-tighter">
            Join the campus <br />
            collaboration network.
          </h1>
          <p className="text-primary-fixed-dim text-lg font-medium max-w-md">
            Verify your email, pick your role, and start using placements, feed, tasks, and AI tools.
          </p>
        </div>
      </section>

      <section className="w-full lg:w-1/2 bg-surface flex flex-col justify-center items-center p-8 md:p-16 overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-white">auto_awesome</span>
            </div>
            <span className="text-on-surface font-headline font-bold text-xl tracking-tight">CampusFlow AI</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-on-surface font-headline font-extrabold text-3xl tracking-tight">Create your account</h2>
            <p className="text-on-surface-variant font-medium">
              We will email a 6-digit code. Use a real inbox you can open.
            </p>
          </div>

          {error && (
            <div className="rounded-2xl bg-error/10 text-error text-sm font-semibold px-4 py-3 border border-error/20">
              {error}
            </div>
          )}

          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-widest text-outline">Your role</label>
            <div className="grid grid-cols-3 gap-3">
              {roles.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={`flex flex-col items-center justify-center p-4 rounded-3xl border-2 transition-all duration-200 ${
                    role === r.id
                      ? "bg-primary-container text-on-primary-container border-primary ring-4 ring-primary/10"
                      : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high border-transparent"
                  }`}
                >
                  <span className="material-symbols-outlined mb-2">{r.icon}</span>
                  <span className="text-xs font-bold">{r.label}</span>
                </button>
              ))}
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline group-focus-within:text-primary">
                    alternate_email
                  </span>
                </div>
                <input
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-surface-container-lowest border-0 focus:ring-4 focus:ring-primary/10 text-on-surface font-medium transition-all"
                  placeholder="University email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={busy}
                />
              </div>
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={busy}
                className="w-full py-3 rounded-2xl border border-primary/30 text-primary font-bold text-sm hover:bg-primary/5 transition-colors disabled:opacity-50"
              >
                {otpSent ? "Resend verification code" : "Send verification code"}
              </button>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline group-focus-within:text-primary">badge</span>
                </div>
                <input
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-surface-container-lowest border-0 focus:ring-4 focus:ring-primary/10 text-on-surface font-medium transition-all"
                  placeholder="Full name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={busy}
                />
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline group-focus-within:text-primary">lock</span>
                </div>
                <input
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-surface-container-lowest border-0 focus:ring-4 focus:ring-primary/10 text-on-surface font-medium transition-all"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  disabled={busy}
                />
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline group-focus-within:text-primary">pin</span>
                </div>
                <input
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-surface-container-lowest border-0 focus:ring-4 focus:ring-primary/10 text-on-surface font-medium transition-all"
                  placeholder="6-digit code from email"
                  inputMode="numeric"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  disabled={busy}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={busy}
              className="w-full bg-gradient-to-r from-[#4a40e0] to-[#9795ff] text-[#f4f1ff] py-4 rounded-full font-headline font-bold text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-60"
            >
              <span>{busy ? "Please wait…" : "Complete enrollment"}</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </form>

          <p className="text-center text-on-surface-variant font-medium">
            Already enrolled?
            <Link className="text-primary font-bold hover:underline ml-1" to="/login">
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
