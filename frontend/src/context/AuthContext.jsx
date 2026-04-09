import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    setUser(data.user);
  };

  const requestRegisterOtp = async (email) => {
    const { data } = await api.post("/auth/register-otp", { email });
    return data;
  };

  const register = async (payload) => {
    const { data } = await api.post("/auth/register", payload);
    localStorage.setItem("token", data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const bootstrap = async () => {
      const token = localStorage.getItem("token");
      if (!token) return setLoading(false);
      try {
        const { data } = await api.get("/auth/me");
        setUser(data.user);
      } catch (_e) {
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };
    bootstrap();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, requestRegisterOtp, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
