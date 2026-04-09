export default function EventsClubs() {
  return (
    <>
      {/* Hero Section: Asymmetric & High Contrast */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-extrabold uppercase tracking-widest">Spring Term 2024</span>
            <h2 className="text-5xl font-extrabold tracking-tight text-on-surface leading-[1.1]">Discovery is the <br/><span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent italic">Heart of Campus.</span></h2>
            <p className="text-on-surface-variant max-w-lg">Kinetic AI analyzed your collaboration patterns. Here are the hubs and happenings waiting for your impact.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="px-6 py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-full font-bold shadow-lg shadow-primary/20 flex items-center gap-2 transition-transform active:scale-95">
              <span className="material-symbols-outlined text-sm">add</span> Create Event
            </button>
            <button className="px-6 py-3 bg-surface-container-high text-primary rounded-full font-bold transition-opacity hover:opacity-90">
              Explore Clubs
            </button>
          </div>
        </div>
        <div className="lg:col-span-5 h-64 rounded-[2rem] overflow-hidden relative group">
          <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Auditorium" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcGYlnf1kofJn4pJz_gKhva_uTJnc_zgflbK5C-rNud7bcPumYjLPpwW04TqbFFvgqhcFr-Fo4DIOHhHUFBUk-wDWDKFI_NYQg4ZnN37f8vdx-mfQFKIfSKm765EN6LD0Tgnh3Bh_XaKFBQHfg5rp-pd6A_jjD5ClGwXgdEp9OkrMoS5ocGvaf9ykquhG8c1Rx2sUN8_xP7U4gK4ob80PtrE-0GZGmKb5l9soOdqAaYQnrsAcyAZd3_Y-Vb1Ua7ijwE4k4DuSbdlxL" crossOrigin="anonymous"/>
          <div className="absolute inset-0 bg-gradient-to-t from-on-surface/60 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
            <div className="text-white">
              <p className="text-xs font-bold opacity-80 uppercase tracking-tighter">Live Now</p>
              <p className="font-bold">AI Ethics Symposium</p>
            </div>
            <span className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-white">
              <span className="material-symbols-outlined">play_arrow</span>
            </span>
          </div>
        </div>
      </section>

      {/* Filters & Category Chips */}
      <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
        <button className="px-5 py-2 bg-primary text-white rounded-full text-sm font-semibold whitespace-nowrap">All Activites</button>
        <button className="px-5 py-2 bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-full text-sm font-medium whitespace-nowrap">Technology</button>
        <button className="px-5 py-2 bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-full text-sm font-medium whitespace-nowrap">Creative Arts</button>
        <button className="px-5 py-2 bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-full text-sm font-medium whitespace-nowrap">Sports &amp; Wellness</button>
        <button className="px-5 py-2 bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-full text-sm font-medium whitespace-nowrap">Career Growth</button>
        <button className="px-5 py-2 bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-full text-sm font-medium whitespace-nowrap">Social Change</button>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="xl:col-span-8 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">Recommended for You</h3>
              <p className="text-xs text-tertiary font-bold flex items-center gap-1 uppercase tracking-widest mt-1">
                <span className="material-symbols-outlined text-[14px]">auto_awesome</span> Powered by Kinetic AI
              </p>
            </div>
            <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">View All</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-container-lowest rounded-3xl p-6 transition-all hover:translate-y-[-4px] flex flex-col h-full group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-surface-container-low rounded-2xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">design_services</span>
                </div>
                <span className="px-3 py-1 bg-tertiary/10 text-tertiary text-[10px] font-bold rounded-lg uppercase">98% Match</span>
              </div>
              <h4 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">UI/UX Workshop: Designing with Kinetic Layering</h4>
              <p className="text-on-surface-variant text-sm line-clamp-2 mb-6 flex-1">Learn how to build depth using tonal shifting and expansive white space in modern digital products.</p>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-surface-container-highest">
                <div className="flex -space-x-2">
                  <img className="w-7 h-7 rounded-full border-2 border-surface-container-lowest" alt="Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDP3jRl2y9oPQCRIyCT8Dw70sdnNZV4tZ7euo1QZOamqznztH-i1HfI9w27PMRaucNhW7ZmjQjH4eTdIctxsPcmdVLNxVFalGln3lePK5v3QlJgKi7pRuYyNtIn4PukfnKMsW_8YDvEdk383UQ1_2rRjRdkP3HDioTt5WI3CgLgFXtZZvoGxHnfYkOqjEPzZDvG1ft7P_K4Zo42c3MTCxOB4pRI1-Zsh-tWdjNJN3t5wH6CkehFEqN4Yu94KL1QN7zE4BBb7swgidZs" crossOrigin="anonymous"/>
                  <img className="w-7 h-7 rounded-full border-2 border-surface-container-lowest" alt="Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhmgeJVFaW3IcZQdghLsYfnqPU4-1C0XX60XmZ60MxfzGd9POl_4p8tKEsXk32o5X5Zu9MxHa5-x020EuIFIScuHR8RUADlH0F2wUe5CugXUhYXHiCRV_3Y-6ln5--5yJIJurVan8UthF1l40N6qMHT7CeHjXcrAvmSHqFVE6c6ytFKjwOnEPBWh6FpN7BK__rxPpubIyRDJ6J8vbugk-W7_aps0dr9VIWl_O6uwOWa8j-eOFkrsLWP3aodRq14fYs4xdAY8iQu5BN" crossOrigin="anonymous"/>
                  <div className="w-7 h-7 rounded-full bg-surface-container-high border-2 border-surface-container-lowest flex items-center justify-center text-[8px] font-bold">+12</div>
                </div>
                <button className="text-primary font-bold text-sm">RSVP Now</button>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-3xl p-6 transition-all hover:translate-y-[-4px] flex flex-col h-full group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-surface-container-low rounded-2xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary">psychology</span>
                </div>
                <span className="px-3 py-1 bg-tertiary/10 text-tertiary text-[10px] font-bold rounded-lg uppercase">Career Interest</span>
              </div>
              <h4 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">Cognitive Science &amp; AI Guest Lecture</h4>
              <p className="text-on-surface-variant text-sm line-clamp-2 mb-6 flex-1">Guest speakers from OpenMind Labs discuss the future of LLMs and human neuroplasticity.</p>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-surface-container-highest">
                <div className="flex items-center gap-2 text-on-surface-variant text-xs">
                  <span className="material-symbols-outlined text-sm">calendar_today</span> Oct 12, 4:00 PM
                </div>
                <button className="text-primary font-bold text-sm">RSVP Now</button>
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-4">
            <h3 className="text-2xl font-bold tracking-tight">Featured Clubs</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 bg-surface-container-low rounded-2xl border border-transparent hover:border-primary/10 transition-all text-center space-y-4">
                <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-3xl text-secondary">code</span>
                </div>
                <div>
                  <h5 className="font-bold">Algorithmic Art</h5>
                  <p className="text-xs text-on-surface-variant">42 Active Members</p>
                </div>
                <button className="w-full py-2 bg-white text-on-surface font-bold text-xs rounded-xl shadow-sm hover:bg-primary hover:text-white transition-colors">Join Club</button>
              </div>

              <div className="p-5 bg-surface-container-low rounded-2xl border border-transparent hover:border-primary/10 transition-all text-center space-y-4">
                <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-3xl text-primary">diversity_3</span>
                </div>
                <div>
                  <h5 className="font-bold">Sustainable Hub</h5>
                  <p className="text-xs text-on-surface-variant">128 Active Members</p>
                </div>
                <button className="w-full py-2 bg-white text-on-surface font-bold text-xs rounded-xl shadow-sm hover:bg-primary hover:text-white transition-colors">Join Club</button>
              </div>

              <div className="p-5 bg-surface-container-low rounded-2xl border border-transparent hover:border-primary/10 transition-all text-center space-y-4">
                <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-3xl text-tertiary">palette</span>
                </div>
                <div>
                  <h5 className="font-bold">Kinetic Creators</h5>
                  <p className="text-xs text-on-surface-variant">85 Active Members</p>
                </div>
                <button className="w-full py-2 bg-white text-on-surface font-bold text-xs rounded-xl shadow-sm hover:bg-primary hover:text-white transition-colors">Join Club</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="xl:col-span-4 space-y-8">
          <section className="glass-panel rounded-[2rem] p-8 shadow-[0px_24px_48px_rgba(44,47,49,0.06)] border border-white/40">
            <h3 className="text-xl font-extrabold mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">calendar_month</span> My Schedule
            </h3>
            <div className="space-y-6">
              <div className="relative pl-4 border-l-2 border-primary/20 hover:border-primary transition-colors pb-1">
                <p className="text-[10px] font-bold text-primary uppercase mb-1">Today • 14:00</p>
                <h5 className="font-bold text-sm">Product Strategy Sync</h5>
                <p className="text-xs text-on-surface-variant">Design Block, Room 402</p>
              </div>
              <div className="relative pl-4 border-l-2 border-primary/20 hover:border-primary transition-colors pb-1">
                <p className="text-[10px] font-bold text-primary uppercase mb-1">Tomorrow • 10:30</p>
                <h5 className="font-bold text-sm">Robotics Workshop</h5>
                <p className="text-xs text-on-surface-variant">Innovation Lab</p>
              </div>
              <div className="relative pl-4 border-l-2 border-primary/20 hover:border-primary transition-colors pb-1">
                <p className="text-[10px] font-bold text-primary uppercase mb-1">Fri, Oct 15 • 18:00</p>
                <h5 className="font-bold text-sm">Networking Night</h5>
                <p className="text-xs text-on-surface-variant">Great Hall</p>
              </div>
            </div>
            <button className="w-full mt-8 py-3 bg-surface-container-high text-on-surface font-bold text-sm rounded-2xl flex items-center justify-center gap-2">
              View Full Calendar
            </button>
          </section>

          <div className="bg-surface-container-lowest rounded-[2rem] p-8 space-y-6">
            <h3 className="text-lg font-bold">Trending in your network</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
                </div>
                <div>
                  <p className="text-sm font-medium">30+ friends joined the <span className="font-bold">Sustainability Hackathon</span></p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-tertiary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                </div>
                <div>
                  <p className="text-sm font-medium"><span className="font-bold">New Club Alert:</span> Neuro-Linguistics Collective</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Events List */}
      <section className="space-y-6 pb-12">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold tracking-tight">Upcoming Campus Events</h3>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg bg-surface-container-high text-on-surface-variant hover:bg-primary hover:text-white transition-all">
              <span className="material-symbols-outlined text-sm">grid_view</span>
            </button>
            <button className="p-2 rounded-lg bg-primary text-white shadow-sm shadow-primary/20">
              <span className="material-symbols-outlined text-sm">list</span>
            </button>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-3xl overflow-hidden">
          <div className="divide-y divide-surface-container-highest">
            <div className="p-6 flex flex-col md:flex-row md:items-center gap-6 hover:bg-surface-container-low transition-colors group">
              <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-surface-container-low shrink-0">
                <span className="text-xs font-bold uppercase text-primary">Oct</span>
                <span className="text-2xl font-extrabold">18</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-extrabold text-secondary uppercase tracking-widest mb-1">Technology • Lecture</p>
                <h4 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">Quantum Computing: From Theory to Qubits</h4>
                <div className="flex items-center gap-4 text-sm text-on-surface-variant">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">location_on</span> Main Science Auditorium</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">schedule</span> 15:30 - 17:00</span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button className="px-6 py-2 bg-primary text-white rounded-full font-bold text-sm shadow-sm active:scale-95 transition-all">RSVP</button>
                <button className="p-2 text-on-surface-variant hover:bg-surface-container-highest rounded-full">
                  <span className="material-symbols-outlined">share</span>
                </button>
              </div>
            </div>

            <div className="p-6 flex flex-col md:flex-row md:items-center gap-6 hover:bg-surface-container-low transition-colors group">
              <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-surface-container-low shrink-0">
                <span className="text-xs font-bold uppercase text-primary">Oct</span>
                <span className="text-2xl font-extrabold">20</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-extrabold text-tertiary uppercase tracking-widest mb-1">Arts • Exhibition</p>
                <h4 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">Annual Digital Arts Showcase</h4>
                <div className="flex items-center gap-4 text-sm text-on-surface-variant">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">location_on</span> Fine Arts Gallery</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">schedule</span> All Day Event</span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button className="px-6 py-2 bg-primary text-white rounded-full font-bold text-sm shadow-sm active:scale-95 transition-all">RSVP</button>
                <button className="p-2 text-on-surface-variant hover:bg-surface-container-highest rounded-full">
                  <span className="material-symbols-outlined">share</span>
                </button>
              </div>
            </div>

            <div className="p-6 flex flex-col md:flex-row md:items-center gap-6 hover:bg-surface-container-low transition-colors group">
              <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-surface-container-low shrink-0">
                <span className="text-xs font-bold uppercase text-primary">Oct</span>
                <span className="text-2xl font-extrabold">25</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-extrabold text-on-secondary-fixed-variant uppercase tracking-widest mb-1">Career • Networking</p>
                <h4 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">Startup Career Fair 2024</h4>
                <div className="flex items-center gap-4 text-sm text-on-surface-variant">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">location_on</span> Student Union Hall</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">schedule</span> 10:00 - 16:00</span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button className="px-6 py-2 bg-primary text-white rounded-full font-bold text-sm shadow-sm active:scale-95 transition-all">RSVP</button>
                <button className="p-2 text-on-surface-variant hover:bg-surface-container-highest rounded-full">
                  <span className="material-symbols-outlined">share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <button className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-primary to-primary-container text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform z-50">
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>
    </>
  );
}
