import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import { api, getErrorMessage } from "../services/api";
import type { User, UserRole } from "../types/models";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    otp: string;
  }) => Promise<void>;
  sendRegisterOtp: (email: string) => Promise<void>;
  logout: () => void;
  setUser: (u: User | null) => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const { data } = await api.get<{ user: User }>("/auth/me");
    setUser(data.user);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    refreshUser()
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [refreshUser]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const { data } = await api.post<{ token: string; user: User }>("/auth/login", {
        email,
        password
      });
      localStorage.setItem("token", data.token);
      setUser(data.user);
    } catch (e) {
      throw new Error(getErrorMessage(e, "Login failed"));
    }
  }, []);

  const sendRegisterOtp = useCallback(async (email: string) => {
    try {
      await api.post("/auth/register-otp", { email });
    } catch (e) {
      throw new Error(getErrorMessage(e, "Could not send code"));
    }
  }, []);

  const register = useCallback(
    async (payload: {
      name: string;
      email: string;
      password: string;
      role: UserRole;
      otp: string;
    }) => {
      try {
        const { data } = await api.post<{ token: string; user: User }>("/auth/register", payload);
        localStorage.setItem("token", data.token);
        setUser(data.user);
      } catch (e) {
        throw new Error(getErrorMessage(e, "Registration failed"));
      }
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      sendRegisterOtp,
      logout,
      setUser,
      refreshUser
    }),
    [user, loading, login, register, sendRegisterOtp, logout, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
