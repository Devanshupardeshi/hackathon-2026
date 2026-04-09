import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/feed", label: "Feed" },
  { to: "/tasks", label: "Tasks" },
  { to: "/placements", label: "Placements" },
  { to: "/events", label: "Events" },
  { to: "/profile", label: "Profile" }
];

const AppLayout = ({ children }) => {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="w-64 bg-gradient-to-b from-indigo-600 to-violet-600 text-white p-5">
        <h1 className="font-bold text-2xl mb-6">CampusFlow AI</h1>
        <nav className="space-y-2">
          {links.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`block px-3 py-2 rounded-lg ${
                pathname === item.to ? "bg-white/25" : "hover:bg-white/15"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 text-sm opacity-90">
          <p>{user?.name}</p>
          <p className="uppercase tracking-wide">{user?.role}</p>
          <button
            onClick={logout}
            className="mt-4 bg-white text-indigo-700 px-4 py-2 rounded-lg font-semibold"
          >
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default AppLayout;
