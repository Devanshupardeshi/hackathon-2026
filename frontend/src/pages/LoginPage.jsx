import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import Button from "../components/Button";
import PasswordField from "../components/PasswordField";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <AuthShell tagline="Sign in and stay ahead on campus">
      <form className="space-y-5" onSubmit={onSubmit}>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Welcome back</h1>
          <p className="mt-1 text-sm text-slate-600">Use your campus email to continue.</p>
        </div>
        {error && (
          <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">{error}</p>
        )}
        <div className="space-y-3">
          <input
            className="input-field"
            placeholder="Email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <PasswordField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            required
          />
        </div>
        <Button type="submit" className="w-full py-3">
          Continue
        </Button>
        <p className="text-center text-sm text-slate-600">
          New here?{" "}
          <Link to="/register" className="font-semibold text-violet-700 hover:text-violet-800 hover:underline">
            Create account
          </Link>
        </p>
      </form>
    </AuthShell>
  );
};

export default LoginPage;
