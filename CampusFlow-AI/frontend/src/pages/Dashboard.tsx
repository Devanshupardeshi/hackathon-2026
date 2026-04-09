export default function Dashboard() {
  return (
    <div className="flex relative w-full h-full">
      {/* Dashboard Body */}
      <div className="max-w-7xl mx-auto w-full space-y-8 lg:pr-80">
        <section className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2 block font-label">Monday, Oct 23</span>
            <h1 className="text-4xl font-extrabold text-on-surface font-headline tracking-tight">Welcome back, Alex.</h1>
            <p className="text-on-surface-variant mt-2 text-lg">You have <span className="font-bold text-secondary">3 priorities</span> to address before your noon lecture.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-2.5 bg-surface-container-high text-primary font-bold rounded-full text-sm hover:opacity-80 transition-opacity flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">calendar_today</span>
              View Schedule
            </button>
            <button className="px-6 py-2.5 bg-gradient-to-r from-primary to-primary-container text-white font-bold rounded-full text-sm shadow-lg shadow-primary/20 hover:scale-105 transition-transform flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">add</span>
              New Project
            </button>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* AI Insights - Featured Card */}
          <div className="md:col-span-8 glass-panel rounded-[2rem] p-8 border border-white/20 shadow-[0px_24px_48px_rgba(44,47,49,0.06)] relative overflow-hidden flex flex-col justify-between min-h-[400px]">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-tertiary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent opacity-50"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-tertiary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <h2 className="text-2xl font-bold font-headline tracking-tight">AI Insights</h2>
              </div>
              <div className="space-y-6 max-w-2xl">
                <div className="bg-white/60 p-5 rounded-2xl border border-white/40 hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
                      <span className="material-symbols-outlined">timer</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-on-surface">Peak Focus Window</h4>
                      <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">Based on your activity, you're most productive between 10:00 AM and 1:00 PM. We suggest moving your "Database Research" task to this slot.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/60 p-5 rounded-2xl border border-white/40 hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined">group_work</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-on-surface">Collaboration Match</h4>
                      <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">3 classmates are currently working on "UX Principles" in the Library Commons. Joining them could reduce your research time by 40%.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative z-10 mt-8 flex flex-wrap gap-2">
              <div className="px-4 py-2 bg-tertiary/5 rounded-full text-tertiary text-xs font-bold flex items-center gap-2 hover:bg-tertiary/10 transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-sm">psychology</span>
                Optimize Schedule
              </div>
              <div className="px-4 py-2 bg-secondary/5 rounded-full text-secondary text-xs font-bold flex items-center gap-2 hover:bg-secondary/10 transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-sm">science</span>
                Research Assistant
              </div>
              <div className="px-4 py-2 bg-on-surface/5 rounded-full text-on-surface-variant text-xs font-bold flex items-center gap-2 hover:bg-on-surface/10 transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-sm">history</span>
                Activity Log
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="md:col-span-4 bg-surface-container-lowest rounded-[2rem] p-8 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-headline">Events</h2>
              <button className="text-primary text-sm font-bold">See All</button>
            </div>
            <div className="space-y-6 flex-1 overflow-y-auto pr-2">
              <div className="group cursor-pointer">
                <div className="flex gap-4">
                  <div className="w-12 h-14 bg-surface-container-low rounded-xl flex flex-col items-center justify-center shrink-0 group-hover:bg-primary-container transition-colors">
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase group-hover:text-primary">Oct</span>
                    <span className="text-lg font-black text-on-surface group-hover:text-white">24</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-on-surface truncate">Tech Career Fair</h4>
                    <p className="text-xs text-on-surface-variant mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      Main Plaza • 10:00 AM
                    </p>
                  </div>
                </div>
              </div>
              <div className="group cursor-pointer">
                <div className="flex gap-4">
                  <div className="w-12 h-14 bg-surface-container-low rounded-xl flex flex-col items-center justify-center shrink-0 group-hover:bg-primary-container transition-colors">
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase group-hover:text-primary">Oct</span>
                    <span className="text-lg font-black text-on-surface group-hover:text-white">25</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-on-surface truncate">AI Workshop</h4>
                    <p className="text-xs text-on-surface-variant mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      Lab 402 • 02:30 PM
                    </p>
                  </div>
                </div>
              </div>
              <div className="group cursor-pointer">
                <div className="flex gap-4">
                  <div className="w-12 h-14 bg-surface-container-low rounded-xl flex flex-col items-center justify-center shrink-0 group-hover:bg-primary-container transition-colors">
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase group-hover:text-primary">Oct</span>
                    <span className="text-lg font-black text-on-surface group-hover:text-white">27</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-on-surface truncate">Startup Pitch Night</h4>
                    <p className="text-xs text-on-surface-variant mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      Innovation Hub • 06:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 p-4 bg-secondary/5 rounded-2xl border border-secondary/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-secondary text-lg">verified</span>
                <span className="text-xs font-bold text-secondary uppercase tracking-tight">RSVP Reminder</span>
              </div>
              <p className="text-[11px] text-secondary leading-tight">Confirm attendance for 'AI Ethics Panel' by tomorrow.</p>
            </div>
          </div>

          {/* New Placements */}
          <div className="md:col-span-5 bg-surface-container-lowest rounded-[2rem] p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold font-headline">New Placements</h2>
              <span className="px-2 py-1 bg-secondary/10 text-secondary text-[10px] font-black rounded uppercase">Live Updates</span>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-surface-container-low rounded-2xl hover:bg-white transition-all border border-transparent hover:border-surface-container-high group">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
                      <img alt="Company Logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYs3m30lCivBz4_fE7s8RJy2sYLRHw55nmVVDBha25ruRG5zsAhevYiocCeIYu2xVeXR9ukUD1ojP0b-F79g8gTWHstQU54eKWnRLZzVg7GBFTJKT88Wv-QOKOh_QoFqvnISbiMM2uhDccyMkLPLoJTjWYXvFQkssCkL5Bmb5TY2s7CJz2iceMbh7KJIUW79D1wQA8mcQxBeHFgSPznzOL9ZuijkZqjbe9-t9u0oJQuSxRrog9xv63I7GDLbeqmVlhYaJ6J-tOOG_j" crossOrigin="anonymous"/>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Product Design Intern</h4>
                      <p className="text-xs text-on-surface-variant">Kinetic Systems • Remote</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-secondary bg-secondary/5 px-2 py-1 rounded-full whitespace-nowrap">High Match</span>
                </div>
              </div>
              <div className="p-4 bg-surface-container-low rounded-2xl hover:bg-white transition-all border border-transparent hover:border-surface-container-high">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
                      <img alt="Company Logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdU8bro34RvgIJyFnrY7JhUKO2e_fJAGoUBv3_deSjnPLAEDflJnxl3NKDRxwUrniklrv0BUN3ENodIrXBByT631gWmYSyLH0Naan5EhdwP_chD2jZAvnLeSYX3L7FGI5RxF9fe9-zfeHYDuS5TiyQB1tDUl9G3tRe-qsdhxqL6tLjtFhgICveLF2XwwhGXG3tNj6d4HLt065IIJis9jnMP8mapgR2YVr9jQ5DnsmzfNuu8LayThehwfpxfF4nQBxEVt7nswZMmHL7" crossOrigin="anonymous"/>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Junior AI Engineer</h4>
                      <p className="text-xs text-on-surface-variant">Insight Labs • New York</p>
                    </div>
                  </div>
                  <button className="text-primary hover:bg-primary/10 p-1 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-lg">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Active Tasks */}
          <div className="md:col-span-7 bg-surface-container-lowest rounded-[2rem] p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold font-headline">Active Tasks</h2>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <div className="w-2 h-2 rounded-full bg-surface-container-high"></div>
                <div className="w-2 h-2 rounded-full bg-surface-container-high"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10 hover:shadow-xl hover:shadow-primary/5 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <span className="p-2 bg-primary/10 rounded-xl text-primary">
                    <span className="material-symbols-outlined text-xl">menu_book</span>
                  </span>
                  <span className="text-[10px] font-bold text-on-primary-container bg-primary-container/30 px-2 py-0.5 rounded">Due Today</span>
                </div>
                <h4 className="font-bold text-on-surface mb-1">Human-AI Interaction Lab</h4>
                <p className="text-xs text-on-surface-variant mb-6">Complete the sentiment analysis module for the final project.</p>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    <img className="w-6 h-6 rounded-full border-2 border-white" alt="Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbyRdkKzOiiDzLO300LA62da_LnBk8KGUlavkBSOc02SSalOb6tNawCsmxEgAGJ7tyE_pg_1Ckomgzb9jdymicKGn2BI56O2f0VbBzlQNY-U7FCntLM9MN5558qZ78P_2PicNoWegzjZ9xH3dVspel_XPXSJDc_PDW7Pv5JsPYse01MWgPiBramPzfmsjZorZJNLSUb6XDuFWoMLPcP1tb4bKo5M0xMkGmGDzFf6MHeCzgVnmkyZXU7lmZPHKHQVzPGGe-6zuGQYFq" crossOrigin="anonymous"/>
                    <img className="w-6 h-6 rounded-full border-2 border-white" alt="Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSoww4gze1gRZ2WE0Jc1YqTEjVjfov19JEvHttUF9XBFS8IN9ZVe-nddNWi644hJrFzzy05RmZdZA3EKWLchGb4ytFtbpburJam6NpgiZCGQkDt4-pn6d1s4L_omYzv5VNia2B0e5XzQZCQN1cikgX-1oWjRya57ePwqzmmMNEnejbCCgLzX_6FjK_MDOfmwSNZq3NGvNGkrvUyb8PxunpUwoF1CqqKnnSIScjQlmBrKeE7u5d5Vu_v8GD8FTkBSRt_m0ge5sW8-hE" crossOrigin="anonymous"/>
                  </div>
                  <span className="text-[10px] font-bold text-primary">Task 4/5</span>
                </div>
              </div>
              <div className="p-6 bg-surface-container-low rounded-3xl border border-transparent hover:border-surface-container-high transition-all">
                <div className="flex justify-between items-start mb-4">
                  <span className="p-2 bg-white rounded-xl text-on-surface-variant">
                    <span className="material-symbols-outlined text-xl">edit_square</span>
                  </span>
                  <span className="text-[10px] font-bold text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded">3 Days Left</span>
                </div>
                <h4 className="font-bold text-on-surface mb-1">Final Paper Draft</h4>
                <p className="text-xs text-on-surface-variant mb-6">Submit initial draft of "The Ethics of Predictive Algorithms".</p>
                <div className="w-full bg-surface-container-high h-1.5 rounded-full">
                  <div className="bg-outline-variant h-full w-1/4 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side AI Drawer (NavigationDrawer Component) */}
      <div className="hidden lg:flex fixed right-0 top-0 h-full z-50 p-6 flex-col w-80 bg-[#ffffff]/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-l-3xl shadow-[0px_24px_48px_rgba(44,47,49,0.06)] border-l border-white/20 pt-[80px]">
        <div className="flex flex-col gap-1 mb-8">
          <span className="text-sm uppercase tracking-widest text-[#702ae1] font-headline font-bold">AI Insights</span>
          <span className="text-xs text-on-surface-variant font-['Plus_Jakarta_Sans'] font-semibold">Powered by Kinetic AI</span>
        </div>
        <div className="space-y-4">
          <button className="w-full flex items-center gap-4 p-4 bg-[#702ae1]/10 text-[#702ae1] rounded-xl hover:shadow-[0_0_15px_rgba(0,101,118,0.3)] transition-all font-['Plus_Jakarta_Sans'] font-semibold text-left">
            <span className="material-symbols-outlined">auto_awesome</span>
            <span className="text-sm">Summarize Page</span>
          </button>
          <button className="w-full flex items-center gap-4 p-4 text-[#2c2f31] dark:text-slate-400 hover:bg-surface-container-high rounded-xl transition-all font-['Plus_Jakarta_Sans'] font-semibold text-left">
            <span className="material-symbols-outlined">edit_note</span>
            <span className="text-sm">Draft Message</span>
          </button>
          <button className="w-full flex items-center gap-4 p-4 text-[#2c2f31] dark:text-slate-400 hover:bg-surface-container-high rounded-xl transition-all font-['Plus_Jakarta_Sans'] font-semibold text-left">
            <span className="material-symbols-outlined">plumbing</span>
            <span className="text-sm">Task Extractor</span>
          </button>
          <button className="w-full flex items-center gap-4 p-4 text-[#2c2f31] dark:text-slate-400 hover:bg-surface-container-high rounded-xl transition-all font-['Plus_Jakarta_Sans'] font-semibold text-left">
            <span className="material-symbols-outlined">science</span>
            <span className="text-sm">Research Assistant</span>
          </button>
        </div>
        <div className="mt-8 pt-8 border-t border-surface-container-highest/20">
          <div className="bg-gradient-to-br from-tertiary/10 to-primary/10 p-5 rounded-2xl border border-white/40">
            <h5 className="text-xs font-bold text-tertiary mb-2 uppercase tracking-wide">Pro Tip</h5>
            <p className="text-xs text-on-surface-variant leading-relaxed">Highlight any text on the dashboard to trigger AI Quick Actions like translation or simplification.</p>
          </div>
        </div>
        <button className="mt-auto py-4 px-6 bg-gradient-to-r from-tertiary to-[#4a40e0] text-white rounded-full text-sm font-bold shadow-lg shadow-tertiary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
          Launch Full Workspace
        </button>
      </div>
    </div>
  );
}
