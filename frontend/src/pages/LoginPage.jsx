import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-indigo-100 to-purple-100">
      <form className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-4" onSubmit={onSubmit}>
        <h1 className="text-2xl font-bold">Login to CampusFlow AI</h1>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <input className="w-full border rounded-lg p-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full border rounded-lg p-3" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-3 rounded-lg font-semibold">Login</button>
        <p className="text-sm">
          New user? <Link to="/register" className="text-indigo-700">Create account</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
