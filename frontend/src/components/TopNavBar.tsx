import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function TopNavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 z-40 bg-[#f5f7f9]/80 dark:bg-slate-950/80 backdrop-blur-md flex justify-between items-center px-4 sm:px-8 py-3 font-['Plus_Jakarta_Sans'] text-sm tracking-tight h-[60px] border-b border-surface-container-highest/50">
      <div className="flex items-center gap-4 sm:gap-8 min-w-0">
        <span className="text-base sm:text-lg font-black text-[#4a40e0] dark:text-[#9795ff] truncate">
          CampusFlow AI
        </span>
        <div className="hidden md:flex items-center bg-surface-container-low px-4 py-1.5 rounded-full focus-within:ring-2 focus-within:ring-[#4a40e0]/20 transition-all">
          <span className="material-symbols-outlined text-outline text-lg mr-2">search</span>
          <input
            className="bg-transparent border-none focus:ring-0 text-sm w-64 outline-none"
            placeholder="Search pages…"
            type="search"
            disabled
            title="Search coming soon"
          />
        </div>
      </div>
      <div className="flex items-center gap-3 sm:gap-6 shrink-0">
        <Link
          to="/ai-assistant"
          className="text-[#2c2f31] dark:text-slate-300 hover:opacity-80 transition-opacity flex items-center gap-2"
          title="AI Assistant"
        >
          <span className="material-symbols-outlined">smart_toy</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-surface-container-highest min-w-0">
          <Link to="/profile" className="min-w-0 hidden sm:block">
            <span className="font-bold text-[#4a40e0] truncate max-w-[140px] block">{user?.name}</span>
            <span className="text-[10px] uppercase font-bold text-on-surface-variant">{user?.role}</span>
          </Link>
          <Link to="/settings" className="p-1 rounded-lg hover:bg-surface-container-low" title="Settings">
            <span className="material-symbols-outlined text-on-surface">settings</span>
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="text-xs font-bold text-primary hover:underline whitespace-nowrap"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}
