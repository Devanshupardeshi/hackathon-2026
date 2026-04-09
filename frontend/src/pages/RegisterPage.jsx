import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-cyan-100 to-indigo-100">
      <form className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-4" onSubmit={onSubmit}>
        <h1 className="text-2xl font-bold">Create your account</h1>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <input className="w-full border rounded-lg p-3" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="w-full border rounded-lg p-3" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full border rounded-lg p-3" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <select className="w-full border rounded-lg p-3" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
          <option value="recruiter">Recruiter</option>
        </select>
        <button className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-3 rounded-lg font-semibold">Register</button>
        <p className="text-sm">
          Already have account? <Link to="/login" className="text-indigo-700">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
