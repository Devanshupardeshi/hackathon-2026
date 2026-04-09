export default function PlacementHub() {
  return (
    <section className="p-8 max-w-7xl mx-auto w-full relative">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
        <div>
          <h2 className="text-4xl font-extrabold font-headline tracking-tight text-on-surface mb-2">Placement Hub</h2>
          <p className="text-on-surface-variant max-w-xl">Curated opportunities powered by Kinetic AI. Find your next career milestone through our smart matching engine.</p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button className="px-6 py-2.5 bg-surface-container-high text-primary font-bold rounded-full text-sm hover:bg-surface-container-highest transition-all">
            Saved Roles
          </button>
          <button className="px-6 py-2.5 bg-gradient-to-r from-[#4a40e0] to-[#9795ff] text-white font-bold rounded-full text-sm shadow-lg shadow-primary/20 hover:scale-105 transition-all">
            Career Compass AI
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Job Listing (Asymmetric Column) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Filter Chips */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            <button className="px-5 py-2 bg-primary text-white rounded-full text-xs font-bold whitespace-nowrap shadow-sm">All Openings</button>
            <button className="px-5 py-2 bg-surface-container-lowest text-on-surface-variant hover:bg-primary/5 transition-colors rounded-full text-xs font-bold border border-outline-variant/15 whitespace-nowrap shadow-sm">Software Engineering</button>
            <button className="px-5 py-2 bg-surface-container-lowest text-on-surface-variant hover:bg-primary/5 transition-colors rounded-full text-xs font-bold border border-outline-variant/15 whitespace-nowrap shadow-sm">Data Science</button>
            <button className="px-5 py-2 bg-surface-container-lowest text-on-surface-variant hover:bg-primary/5 transition-colors rounded-full text-xs font-bold border border-outline-variant/15 whitespace-nowrap shadow-sm">Product Design</button>
            <button className="px-5 py-2 bg-surface-container-lowest text-on-surface-variant hover:bg-primary/5 transition-colors rounded-full text-xs font-bold border border-outline-variant/15 whitespace-nowrap shadow-sm">Marketing</button>
          </div>

          {/* Job Cards */}
          <div className="space-y-4">
            {/* Card 1 */}
            <div className="bg-surface-container-lowest rounded-[2rem] p-6 hover:shadow-xl hover:shadow-primary/5 transition-all group relative overflow-hidden shadow-sm border border-transparent hover:border-primary/20">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                <div className="flex gap-5">
                  <div className="w-16 h-16 bg-surface-container-low rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
                    <img alt="Company" className="w-10 h-10 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6y3HzDgZhZu2THdDI8Uy3jOPHm_6fOljfXddheXjcrKvLLIWDkFq9Sxok73qZm_gRhmU7QSUAIq9qypvckoc__KeD7T5sZ1R5qrAJCfTIjc0F5jx-uLh_tZoUCbsKeaqIO1eke0yiNt4D7mnmP-_TbqfVi8_kYBgGWgoIJc7L8XUv-7cL7b9axjEp8ogJy9g_1YScUtg5ytvaLuMrSPXAY5NF_GyKDdrG9NpcO4cO35lSKfd2ONsJ-NCy-dQm4WylSX1OBNQw6-aL" crossOrigin="anonymous"/>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-wider rounded">AI Recommended</span>
                      <span className="text-outline-variant text-[10px] font-bold uppercase tracking-widest">• Posted 2h ago</span>
                    </div>
                    <h3 className="text-xl font-bold font-headline text-on-surface group-hover:text-primary transition-colors">Junior AI Engineer (Internship)</h3>
                    <p className="text-on-surface-variant font-medium mb-3">Kinetic Systems Inc. • San Francisco (Hybrid)</p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-1.5 text-xs text-on-surface-variant bg-surface-container-low px-3 py-1.5 rounded-full">
                        <span className="material-symbols-outlined text-[16px]">payments</span>
                        $45 - $60 / hr
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-on-surface-variant bg-surface-container-low px-3 py-1.5 rounded-full">
                        <span className="material-symbols-outlined text-[16px]">schedule</span>
                        6 Months
                      </div>
                    </div>
                  </div>
                </div>
                <button className="shrink-0 px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary-dim transition-all active:scale-95 shadow-md shadow-primary/20 w-full sm:w-auto mt-4 sm:mt-0">Apply Now</button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-surface-container-lowest rounded-[2rem] p-6 hover:shadow-xl hover:shadow-primary/5 transition-all group relative overflow-hidden shadow-sm border border-transparent hover:border-primary/20">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                <div className="flex gap-5">
                  <div className="w-16 h-16 bg-surface-container-low rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
                    <img alt="Company" className="w-10 h-10 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHrHvwj-TPLGuPCz2DUx2zOkZ6j-qMCxwq5pT6fvzBrEuTHhe5uFj9FwK8OCiI7DupgYTK5pECJAUUg2N4XROV91qle9pdFsp4toXbJoiJov0P8uLeVudquYlJSNgCMuDwbwrU_KRpqgs86_1dQnBnC5Qmbq9SYQIKTUjlsHD4oqYAI4evp4y5xu7ia_YL7xrGb-sR7ihEKv-LiIhW22KssWROdeDPh94_CzdP9Nq1EapCsjx7LAb3wdj6RR9uuh9d9js0R_HAl2VJ" crossOrigin="anonymous"/>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-tertiary/10 text-tertiary text-[10px] font-black uppercase tracking-wider rounded">High Demand</span>
                      <span className="text-outline-variant text-[10px] font-bold uppercase tracking-widest">• Posted 5h ago</span>
                    </div>
                    <h3 className="text-xl font-bold font-headline text-on-surface group-hover:text-primary transition-colors">Associate UX Researcher</h3>
                    <p className="text-on-surface-variant font-medium mb-3">DesignFlow Labs • New York (Remote)</p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-1.5 text-xs text-on-surface-variant bg-surface-container-low px-3 py-1.5 rounded-full">
                        <span className="material-symbols-outlined text-[16px]">payments</span>
                        $75k - $90k / yr
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-on-surface-variant bg-surface-container-low px-3 py-1.5 rounded-full">
                        <span className="material-symbols-outlined text-[16px]">work</span>
                        Full-time
                      </div>
                    </div>
                  </div>
                </div>
                <button className="shrink-0 px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary-dim transition-all active:scale-95 shadow-md shadow-primary/20 w-full sm:w-auto mt-4 sm:mt-0">Apply Now</button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-surface-container-lowest rounded-[2rem] p-6 hover:shadow-xl hover:shadow-primary/5 transition-all group relative overflow-hidden shadow-sm border border-transparent hover:border-primary/20">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                <div className="flex gap-5">
                  <div className="w-16 h-16 bg-surface-container-low rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
                    <img alt="Company" className="w-10 h-10 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAX6rtmbjG74R_rmeO4F3Po7vp6VFt8WCofR5UQhjwqfeA5efM8YxwJuyXe7tYRY-0GDIMX4fZl01tW1q5UmZCk1hwhPQrJG2SCnMNk7nYnjAnA05ARbQVfsZo4I2u2eaDw-Y4M48WqA8YXimMRbI7hLZ0q73DKSD9xIh77nJl5T4dqcP3G3-sNuyuBRaAGj-PprK-HjhHv-yFLhFefYphPMXxaYLFanjU-wfd9XxxfkyHTUHy1VOjYXl_bqtM8h4Gn8w4a6j3_kbp4" crossOrigin="anonymous"/>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-outline-variant text-[10px] font-bold uppercase tracking-widest">Posted 1d ago</span>
                    </div>
                    <h3 className="text-xl font-bold font-headline text-on-surface group-hover:text-primary transition-colors">Full-Stack Development Lead</h3>
                    <p className="text-on-surface-variant font-medium mb-3">SparkScale • Austin, TX</p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-1.5 text-xs text-on-surface-variant bg-surface-container-low px-3 py-1.5 rounded-full">
                        <span className="material-symbols-outlined text-[16px]">payments</span>
                        $120k - $150k / yr
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-on-surface-variant bg-surface-container-low px-3 py-1.5 rounded-full">
                        <span className="material-symbols-outlined text-[16px]">work</span>
                        Full-time
                      </div>
                    </div>
                  </div>
                </div>
                <button className="shrink-0 px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary-dim transition-all active:scale-95 shadow-md shadow-primary/20 w-full sm:w-auto mt-4 sm:mt-0">Apply Now</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar (AI Widgets & Insights) */}
        <div className="lg:col-span-4 space-y-8">
          {/* AI Resume Feedback Widget (The Highlight) */}
          <div className="bg-[#ffffff]/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 shadow-[0px_24px_48px_rgba(44,47,49,0.06)] sticky top-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-tertiary/10 rounded-2xl text-tertiary">
                <span className="material-symbols-outlined">auto_awesome</span>
              </div>
              <div>
                <p className="text-[10px] font-black text-tertiary uppercase tracking-widest">AI Insights</p>
                <h3 className="text-lg font-bold font-headline leading-tight">Resume Optimizer</h3>
              </div>
            </div>
            
            <div className="bg-surface p-6 rounded-3xl border-2 border-dashed border-outline-variant/30 text-center mb-6 group hover:border-tertiary/50 transition-all cursor-pointer">
              <span className="material-symbols-outlined text-4xl text-outline-variant group-hover:text-tertiary mb-3 block transition-colors">upload_file</span>
              <p className="text-sm font-bold text-on-surface mb-1">Drop your resume here</p>
              <p className="text-xs text-on-surface-variant">PDF or DOCX (Max 5MB)</p>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-surface-container-low rounded-2xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-on-surface">Target Score</span>
                  <span className="text-xs font-black text-secondary">85/100</span>
                </div>
                <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-secondary w-3/4 rounded-full"></div>
                </div>
              </div>
              <button className="w-full py-4 bg-tertiary text-white font-bold rounded-full flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-tertiary/30 transition-all active:scale-95">
                <span className="material-symbols-outlined text-[18px]">science</span>
                Run AI Analysis
              </button>
              <p className="text-[10px] text-center text-on-surface-variant px-4">
                Our AI checks for ATS compatibility, keyword density, and structural clarity based on top tech recruiters' standards.
              </p>
            </div>
          </div>

          {/* Career Growth Card */}
          <div className="bg-gradient-to-r from-[#4a40e0] to-[#9795ff] rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
            <h4 className="text-xl font-bold font-headline mb-3 relative z-10">Career Compass Pro</h4>
            <p className="text-sm text-white/80 mb-6 relative z-10 leading-relaxed">
              Upgrade to unlock personalized interview coaching and direct networking with alumni at Fortune 500 companies.
            </p>
            <button className="px-6 py-2.5 bg-white text-primary font-bold rounded-full text-xs relative z-10 hover:bg-surface-container-lowest transition-all">
              Launch Workspace
            </button>
          </div>

          {/* Market Insights */}
          <div className="bg-surface-container-low rounded-[2.5rem] p-8">
            <h4 className="text-sm font-black text-on-surface uppercase tracking-widest mb-6">Market Trends</h4>
            <div className="space-y-6">
              <div className="flex gap-4 items-center">
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-on-surface">Remote Design Roles</p>
                  <p className="text-[10px] text-on-surface-variant">Growing +12% this month</p>
                </div>
                <span className="material-symbols-outlined text-secondary text-sm">trending_up</span>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-2 h-2 rounded-full bg-tertiary"></div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-on-surface">Data Engineering</p>
                  <p className="text-[10px] text-on-surface-variant">Avg. salary increase +$15k</p>
                </div>
                <span className="material-symbols-outlined text-tertiary text-sm">trending_up</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* AI Navigation Drawer Mini (Right Side) */}
      <div className="hidden 2xl:flex fixed right-0 top-0 h-full w-20 bg-white/70 backdrop-blur-xl border-l border-white/20 flex flex-col items-center py-8 z-50 shadow-[-10px_0_30px_rgba(0,0,0,0.02)] pt-[80px]">
        <div className="mb-10 text-tertiary mt-4">
          <span className="material-symbols-outlined text-3xl">auto_awesome</span>
        </div>
        <div className="flex-1 flex flex-col gap-8">
          <button className="p-3 bg-tertiary/10 text-tertiary rounded-xl hover:shadow-[0_0_15px_rgba(112,42,225,0.3)] transition-all">
            <span className="material-symbols-outlined">summarize</span>
          </button>
          <button className="p-3 text-on-surface-variant hover:bg-tertiary/5 hover:text-tertiary rounded-xl transition-all">
            <span className="material-symbols-outlined">edit_note</span>
          </button>
          <button className="p-3 text-on-surface-variant hover:bg-tertiary/5 hover:text-tertiary rounded-xl transition-all">
            <span className="material-symbols-outlined">plumbing</span>
          </button>
          <button className="p-3 text-on-surface-variant hover:bg-tertiary/5 hover:text-tertiary rounded-xl transition-all">
            <span className="material-symbols-outlined">science</span>
          </button>
        </div>
        <div className="mt-auto">
          <div className="w-10 h-10 bg-secondary/10 text-secondary rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
            <span className="material-symbols-outlined">chat_bubble</span>
          </div>
        </div>
      </div>
    </section>
  );
}
