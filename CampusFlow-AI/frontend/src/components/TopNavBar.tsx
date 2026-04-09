export default function TopNavBar() {
  return (
    <header className="fixed top-0 left-64 right-0 z-40 bg-[#f5f7f9]/80 dark:bg-slate-950/80 backdrop-blur-md flex justify-between items-center px-8 py-3 font-['Plus_Jakarta_Sans'] text-sm tracking-tight h-[60px] border-b border-surface-container-highest/50">
      <div className="flex items-center gap-8">
        <span className="text-lg font-black text-[#4a40e0] dark:text-[#9795ff]">Kinetic Intelligence</span>
        <div className="hidden md:flex items-center bg-surface-container-low px-4 py-1.5 rounded-full focus-within:ring-2 focus-within:ring-[#4a40e0]/20 transition-all">
        <span className="material-symbols-outlined text-outline text-lg mr-2">search</span>
        <input className="bg-transparent border-none focus:ring-0 text-sm w-64 outline-none" placeholder="Search insights..." type="text"/>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button className="text-[#2c2f31] dark:text-slate-300 hover:opacity-80 transition-opacity flex items-center gap-2">
        <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="text-[#2c2f31] dark:text-slate-300 hover:opacity-80 transition-opacity flex items-center gap-2">
        <span className="material-symbols-outlined">smart_toy</span>
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-surface-container-highest">
        <span className="font-bold text-[#4a40e0]">Profile</span>
        <img alt="User Avatar" className="w-8 h-8 rounded-full bg-primary-container" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDo5TsKdV1ad4D5p4g0wxWLy8ht_nGrcm4A9pT4hSNkTvyBKKnSdNETuqnKB-NQA_M5IW7S4shqacK56Mh6lhrtJZtwlhFgrR7CLRCMVg9zqJxbj6PtMvQ8a8RAimxx-W4JLnu8_cBpER9ewr93-OSaxYT1t4hGzyX0wcsYCakNJmvjx93vxZ6ALNt5OG4-wTY3BSIW_HAWSTx4HfqxtCN-ieCtbZ_9d41E8F1haJC9i9KJFt8eTKT27LHHE2QPGgcAJg5VWw72vWqo" crossOrigin="anonymous"/>
        </div>
      </div>
    </header>
  );
}
