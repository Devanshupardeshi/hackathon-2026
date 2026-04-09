import { Link, useLocation } from "react-router-dom";
import CampusFlowLogo from "../components/CampusFlowLogo";
import Button from "../components/Button";
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
    <div className="app-shell-bg min-h-screen">
      <div className="flex min-h-screen">
        <aside className="sidebar-3d relative z-20 hidden w-72 shrink-0 flex-col bg-gradient-to-b from-violet-950 via-indigo-950 to-slate-950 px-5 py-8 text-white lg:flex">
          <div className="scene mb-10">
            <Link to="/dashboard" className="block transform-gpu transition hover:scale-[1.02]">
              <CampusFlowLogo variant="inverse" showWordmark />
              <p className="mt-4 text-sm text-violet-200/70">Collaborate. Place. Grow.</p>
            </Link>
          </div>
          <nav className="flex flex-1 flex-col gap-1">
            {links.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`nav-link-3d rounded-xl px-3 py-2.5 text-sm font-medium text-violet-100/90 ${
                    active ? "nav-link-active text-white" : "hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-8 rounded-2xl border border-white/15 bg-violet-950/40 p-4">
            <p className="text-sm font-semibold text-white">{user?.name}</p>
            <p className="mt-0.5 text-xs uppercase tracking-wide text-violet-300/80">{user?.role}</p>
            <Button variant="secondary" className="mt-4 w-full !bg-white !text-violet-900" type="button" onClick={logout}>
              Sign out
            </Button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-10 border-b border-slate-200 bg-white px-4 py-3 shadow-sm lg:hidden">
            <div className="flex items-center justify-between">
              <Link to="/dashboard" className="flex items-center">
                <CampusFlowLogo size="sm" />
              </Link>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-800">
                  {user?.role}
                </span>
                <button
                  type="button"
                  className="text-xs font-semibold text-violet-700 underline-offset-2 hover:underline"
                  onClick={logout}
                >
                  Log out
                </button>
              </div>
            </div>
            <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {links.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${
                    pathname === item.to
                      ? "bg-violet-600 text-white"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
            <div className="mx-auto max-w-5xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
