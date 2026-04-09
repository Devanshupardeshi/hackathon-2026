export default function Settings() {
  return (
    <div className="max-w-7xl mx-auto w-full">
      <header className="mb-12">
        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-2">
          <span className="w-8 h-[2px] bg-primary"></span>
          System Settings
        </div>
        <h1 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight">Configuration Hub</h1>
        <p className="text-on-surface-variant mt-2 max-w-xl">Tailor your CampusFlow experience. Manage your identity, security protocols, and collaborative environment.</p>
      </header>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Profile Settings (Bento Item 1) */}
        <section className="xl:col-span-8 bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/15 shadow-sm" id="profile">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-xl font-headline font-bold text-on-surface">Profile Identity</h2>
              <p className="text-sm text-on-surface-variant">Update how you appear to fellow researchers and students.</p>
            </div>
            <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
              View public profile <span className="material-symbols-outlined text-sm">open_in_new</span>
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-shrink-0 flex flex-col items-center gap-4">
              <div className="relative w-32 h-32 rounded-xl overflow-hidden group">
                <img alt="Alex Rivera" className="w-full h-full object-cover" crossOrigin="anonymous" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDr8dFz1HycVQzR81dRcskbJhOCHXAOj4M89-OobPQYEqrnA3ZznWO1_55GwClwgYNwN22p_Kr1Ogjl8UZA0qAST8P2LwmCWHloi8bTmZiaa5H5OU0nbfTD71IslPtjNCARyGUlNYImCqm2AUmcAAJTXbkHjqSSdwppd7k3iYgyMPR1VQV5eTLwUw7fGxhOaEqStG23xJqkclA-wyIiAFu46vfz0lCgznDmKmNlsKsEFpx9F99ssUdF1HbFx8LYIxcO6yyGtXyRW8JH"/>
                <div className="absolute inset-0 bg-on-surface/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <span className="material-symbols-outlined text-white">photo_camera</span>
                </div>
              </div>
              <button className="text-xs font-bold text-on-surface-variant hover:text-primary transition-colors">Change Photo</button>
            </div>
            
            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface/60 uppercase tracking-tighter">Full Name</label>
                <input className="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-on-surface outline-none" type="text" defaultValue="Alex Rivera"/>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface/60 uppercase tracking-tighter">Academic Year</label>
                <select className="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-on-surface outline-none" defaultValue="Senior">
                  <option>Freshman</option>
                  <option>Sophomore</option>
                  <option>Junior</option>
                  <option value="Senior">Senior</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-on-surface/60 uppercase tracking-tighter">Bio &amp; Interests</label>
                <textarea className="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-on-surface outline-none" rows={3} defaultValue="Senior CS major at Stanford. Passionate about AI ethics, collaborative coding, and helping peers land FAANG internships." />
              </div>
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-on-surface/60 uppercase tracking-tighter">University Email</label>
                <div className="relative">
                  <input className="w-full bg-surface-container px-4 py-3 rounded-lg border-none text-on-surface-variant opacity-60 outline-none" disabled type="email" defaultValue="alex.rivera@stanford.edu"/>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI System Preferences (Bento Item 2) */}
        <section className="xl:col-span-4 bg-white/70 backdrop-blur-md rounded-xl p-8 border border-outline-variant/15 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-tertiary">psychology</span>
              <h2 className="text-xl font-headline font-bold text-on-surface">System</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-on-surface">Visual Theme</p>
                  <p className="text-xs text-on-surface-variant">Adaptive interface appearance</p>
                </div>
                <div className="flex bg-surface-container-high p-1 rounded-full">
                  <button className="p-2 rounded-full bg-white shadow-sm text-primary"><span className="material-symbols-outlined text-sm">light_mode</span></button>
                  <button className="p-2 rounded-full text-on-surface-variant"><span className="material-symbols-outlined text-sm">dark_mode</span></button>
                  <button className="p-2 rounded-full text-on-surface-variant"><span className="material-symbols-outlined text-sm">desktop_windows</span></button>
                </div>
              </div>
              
              <div className="space-y-1.5">
                <p className="font-bold text-on-surface">AI Assistance Level</p>
                <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-gradient-to-r from-[#4a40e0] to-[#9795ff]"></div>
                </div>
                <div className="flex justify-between text-[10px] font-bold text-on-surface-variant uppercase">
                  <span>Minimal</span>
                  <span>Active Catalyst</span>
                  <span>Full Automation</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-on-surface/5 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-on-surface">Real-time Translation</p>
                  <div className="w-10 h-5 bg-primary/20 rounded-full relative cursor-pointer">
                    <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-primary rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-on-surface">Accessibility Mode</p>
                  <div className="w-10 h-5 bg-surface-container-high rounded-full relative cursor-pointer">
                    <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <div className="p-4 rounded-xl bg-tertiary/5 border border-tertiary/10">
              <p className="text-[10px] font-black text-tertiary uppercase tracking-widest mb-1">AI Recommendation</p>
              <p className="text-xs text-on-surface leading-snug">Alex, you seem to collaborate most between 8 PM and 11 PM. Enable "Night Focus" for a softer interface during those hours?</p>
              <button className="mt-3 text-xs font-bold text-tertiary hover:underline">Apply Optimization</button>
            </div>
          </div>
        </section>

        {/* Account Security (Bento Item 3) */}
        <section className="xl:col-span-6 bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/15 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-secondary">security</span>
            <h2 className="text-xl font-headline font-bold text-on-surface">Security &amp; Access</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-surface-container-low transition-colors group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">password</span>
                </div>
                <div>
                  <p className="font-bold text-on-surface">Change Password</p>
                  <p className="text-xs text-on-surface-variant">Last updated 4 months ago</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-surface-container-low transition-colors group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">phonelink_lock</span>
                </div>
                <div>
                  <p className="font-bold text-on-surface">Two-Factor Authentication</p>
                  <p className="text-xs text-secondary font-bold">Enabled via Authenticator App</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">settings</span>
            </div>
            
            <div className="pt-4">
              <p className="text-xs font-bold text-on-surface/60 uppercase tracking-tighter mb-4">Active Sessions</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-on-surface-variant">laptop_mac</span>
                    <span className="font-medium">MacBook Pro — Palo Alto, CA</span>
                  </div>
                  <span className="text-[10px] font-bold text-secondary uppercase bg-secondary/10 px-2 py-0.5 rounded">Current</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-on-surface-variant">smartphone</span>
                    <span className="font-medium">iPhone 15 — San Francisco, CA</span>
                  </div>
                  <button className="text-[10px] font-bold text-error uppercase hover:underline">Revoke</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Notifications & Privacy (Bento Item 4) */}
        <section className="xl:col-span-6 bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/15 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">notifications_active</span>
                <h2 className="text-lg font-headline font-bold text-on-surface">Alerts</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Collab Requests</span>
                  <div className="w-8 h-4 bg-primary rounded-full relative cursor-pointer">
                    <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Task Reminders</span>
                  <div className="w-8 h-4 bg-primary rounded-full relative cursor-pointer">
                    <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between opacity-50">
                  <span className="text-sm font-medium">Placement Updates</span>
                  <div className="w-8 h-4 bg-surface-container rounded-full relative cursor-pointer">
                    <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Daily AI Digest</span>
                  <div className="w-8 h-4 bg-primary rounded-full relative cursor-pointer">
                    <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-secondary">visibility</span>
                <h2 className="text-lg font-headline font-bold text-on-surface">Privacy</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Profile Discovery</span>
                  <div className="w-8 h-4 bg-primary rounded-full relative cursor-pointer">
                    <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Show Activity</span>
                  <div className="w-8 h-4 bg-primary rounded-full relative cursor-pointer">
                    <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Data Sharing</span>
                  <div className="w-8 h-4 bg-surface-container rounded-full relative cursor-pointer">
                    <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 rounded-xl bg-surface-container-low text-[10px] text-on-surface-variant">
                  All data is encrypted using AES-256 protocols. Your educational records are never sold to third parties.
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer Actions */}
        <div className="xl:col-span-12 flex justify-end gap-4 items-center pt-8 border-t border-on-surface/5">
          <button className="px-6 py-3 text-sm font-bold text-on-surface-variant hover:text-on-surface transition-colors">Discard Changes</button>
          <button className="px-8 py-3 bg-gradient-to-br from-primary to-primary-dim text-white font-bold rounded-full shadow-lg shadow-primary/30 transition-transform hover:scale-105 active:scale-95">Save Preferences</button>
        </div>
        
      </div>
    </div>
  );
}
