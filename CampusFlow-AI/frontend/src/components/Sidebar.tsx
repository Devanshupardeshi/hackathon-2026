import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { path: '/feed', label: 'Collaboration Feed', icon: 'forum' },
  { path: '/tasks', label: 'Task Management', icon: 'assignment_turned_in' },
  { path: '/placements', label: 'Placement Hub', icon: 'work_history' },
  { path: '/events', label: 'Events & Clubs', icon: 'groups' },
  { path: '/profile', label: 'Profile', icon: 'account_circle' },
  { path: '/settings', label: 'Settings', icon: 'settings' },
];

export default function Sidebar() {
  return (
    <aside className="flex flex-col h-screen py-6 px-4 w-64 border-r-0 bg-[#eef1f3] dark:bg-slate-900 sticky top-0 hidden lg:flex">
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
          <span className="material-symbols-outlined text-on-primary">rocket_launch</span>
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#2c2f31] dark:text-white leading-tight">CampusFlow</h1>
          <p className="text-[10px] uppercase tracking-widest text-primary font-bold">Collaborative Catalyst</p>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-3 px-4 py-3 rounded-xl text-[#4a40e0] dark:text-[#9795ff] font-bold border-l-4 border-[#4a40e0] bg-[#dfe3e6] dark:bg-slate-800 font-['Plus_Jakarta_Sans'] text-sm scale-[0.98]"
                : "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-[#2c2f31] dark:text-slate-400 opacity-70 hover:bg-[#dfe3e6] dark:hover:bg-slate-800 font-['Plus_Jakarta_Sans'] font-medium text-sm"
            }
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="mt-auto p-4 rounded-2xl bg-surface shadow-sm">
        <p className="text-xs font-bold text-tertiary mb-1">AI INSIGHTS</p>
        <p className="text-[11px] text-on-surface-variant leading-relaxed">
          3 upcoming events match your career goal "UX Research".
        </p>
      </div>
    </aside>
  );
}
