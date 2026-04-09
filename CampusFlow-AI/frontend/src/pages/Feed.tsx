export default function Feed() {
  return (
    <div className="p-8 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
      {/* Left Column: Feed Content */}
      <div className="lg:col-span-8 space-y-6">
        {/* Create Post Section */}
        <section className="bg-surface-container-lowest rounded-xl p-6 transition-all shadow-sm">
          <div className="flex gap-4 mb-4">
            <img alt="Felix" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfLHzeTyrxfSWYSDdPJ3SgVP5M7_D2ISVxqu9n4q11bz-8MGJLBbqdHgtWh-Ph2ItkLaYO8N-ixU0809pqDFmnath2Y5G76GT2N95ydCqRZ5wvjPlfblGIt24-hznfymfAaocRoO2mzksaPZuIVsMy_9utxvNJoLvE3wTEV-34AbZOx9j0e-PuJXujCQwbDMvSzlBNjUHJL5M6TMIxaYmZe7PP_kONVJSPqyXMFi0ThcxfB1QsBRBWuxrgjiM4ls_4zcLebn5ijyaU" crossOrigin="anonymous"/>
            <button className="flex-1 text-left px-6 py-3 bg-surface-container-low rounded-full text-on-surface-variant font-body text-sm hover:bg-surface-container-high transition-colors">
              Start a collaboration or share a learning win...
            </button>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-surface-container-low">
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-surface-container-low text-secondary font-medium text-sm transition-all md:px-3">
                <span className="material-symbols-outlined text-sm">image</span>
                <span className="hidden sm:inline">Media</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-surface-container-low text-tertiary font-medium text-sm transition-all md:px-3">
                <span className="material-symbols-outlined text-sm">event</span>
                <span className="hidden sm:inline">Event</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-surface-container-low text-[#006576] font-medium text-sm transition-all md:px-3">
                <span className="material-symbols-outlined text-sm">article</span>
                <span className="hidden sm:inline">Write</span>
              </button>
            </div>
            <button className="bg-primary hover:bg-primary-dim text-white px-6 py-2 rounded-full font-bold text-sm transition-all shadow-lg shadow-primary/10">
              Post
            </button>
          </div>
        </section>

        {/* Filters */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          <button className="whitespace-nowrap px-6 py-2 rounded-full bg-primary text-white font-bold text-sm transition-all shadow-sm">All Feed</button>
          <button className="whitespace-nowrap px-6 py-2 rounded-full bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high font-medium text-sm transition-all shadow-sm">Placements</button>
          <button className="whitespace-nowrap px-6 py-2 rounded-full bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high font-medium text-sm transition-all shadow-sm">Projects</button>
          <button className="whitespace-nowrap px-6 py-2 rounded-full bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high font-medium text-sm transition-all shadow-sm">Learning</button>
          <button className="whitespace-nowrap px-6 py-2 rounded-full bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high font-medium text-sm transition-all shadow-sm">Clubs</button>
        </div>

        {/* Feed Items */}
        <div className="space-y-6">
          {/* Post Card 1: Project Collaboration */}
          <article className="bg-surface-container-lowest rounded-xl p-0 overflow-hidden transition-all group shadow-sm border border-transparent hover:border-primary/20">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3">
                  <img alt="Aria" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkETLbf2SJjJKCPvywwO4lL-M5iQccBm5RZBVsjChkZWeEXXVkMoMh8Cl4OiZscPhWrFm8_HEPxRi4Is2QW8K3yFqXueYdtiyf3WOHUnInupd14NnXPEVOeeSXEWwi82vWLxKsRVh0f7iOSi8IgEUs6hf6D0grZ1RloFopIMv6xq8wXo3znm-ii5qDndsqq6iKiGN7rMvkMUMuIHtZ8JrKAVU-6SLoZ7ZNaHqSjHE5lWMaNjBFHxvkK0Ku32Y424IiCjDcCLKnWOrf" crossOrigin="anonymous"/>
                  <div>
                    <h3 className="font-headline font-bold text-on-surface leading-none mb-1">Aria Chen</h3>
                    <p className="text-xs text-on-surface-variant">AI Research Lead • 2h ago</p>
                  </div>
                </div>
                <button className="text-outline hover:text-on-surface transition-colors">
                  <span className="material-symbols-outlined">more_horiz</span>
                </button>
              </div>
              <p className="text-on-surface font-body mb-4 leading-relaxed">
                Looking for 2 more collaborators for the <span className="text-primary font-semibold">Kinetic Flow Optimization</span> project. We're using React and FastAPI. Bonus if you have experience with vector databases! 🚀
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-bold uppercase rounded-full tracking-wide">Projects</span>
                <span className="px-3 py-1 bg-tertiary/10 text-tertiary text-[10px] font-bold uppercase rounded-full tracking-wide">AI Research</span>
              </div>
            </div>
            <div className="h-64 w-full relative">
              <img alt="Code interface" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_ToBOgb6l05UcBE3G7oYzY7y-EMvNYUp_F7-Ss2ecGBy9OMiC8bwU-jQi5vJrSZ-UQ1l4sxY68Zziy7ST85SxVQvdM-evfiYURNsfGmVugbeJhI1t54W4xr0QBr51zfLgK5lRRn2yAFRqb35z4cV0PNDS4G7ckGxGE9e_GR0lMGy1c96WASfrqYEd0ChXu8-73pgc4A6cOV89njz6RVG55bHGqv0khRzOoza7ZvUdgx69xt9MXB0EhkLLaIYhZ6RDb6pvOas9HVG_" crossOrigin="anonymous"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="px-6 py-4 flex items-center justify-between border-t border-surface-container-low bg-surface-container-lowest">
              <div className="flex gap-6">
                <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-xl">favorite</span>
                  <span className="text-sm font-medium">124</span>
                </button>
                <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-xl">chat_bubble</span>
                  <span className="text-sm font-medium">18</span>
                </button>
                <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors hidden sm:flex">
                  <span className="material-symbols-outlined text-xl">share</span>
                  <span className="text-sm font-medium">Share</span>
                </button>
              </div>
              <button className="bg-primary/5 text-primary px-4 py-2 rounded-lg font-bold text-sm hover:bg-primary/10 transition-all">
                Apply Now
              </button>
            </div>
          </article>

          {/* Post Card 2: Learning Resource */}
          <article className="bg-surface-container-lowest rounded-xl p-6 transition-all shadow-sm border-l-4 border-transparent hover:border-primary">
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-3">
                <img alt="Marcus" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVLj5F1cXpJPmkPEsLAYF0SN8vQYE2zdyStoLYJ9NWXzwWVyWhqQb5rXEHSC668xst7oq7VFcwNuECSyKmZN7wtqdsjhq22B4M7nwaAp-h9Tx3-xRTrW0mtbmPa3NPNqPL_ZsUD3LNJIItVQPbOgELXJkCdz7ZyonuvYKVYxfVG9qS596XQ18S86IdhhjJnRQr_v3WMAUgE7MUphOdRM4jhNLu7oaO-CWtlb053_oSKE9mTRtWckhbfuPd0A2cftT6mLP26dXfrff0" crossOrigin="anonymous"/>
                <div>
                  <h3 className="font-headline font-bold text-on-surface leading-none mb-1">Marcus Thorne</h3>
                  <p className="text-xs text-on-surface-variant">Cloud Engineering Senior • 5h ago</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-tertiary/10 text-tertiary text-[10px] font-bold uppercase rounded-full tracking-wide">Learning</span>
            </div>
            <p className="text-on-surface font-body mb-6 leading-relaxed">
              Just finished a deep dive into AWS Lambda cold starts. Compiled a 5-page summary of optimization strategies. Drop a "Cloud" in the comments if you want the PDF! ☁️
            </p>
            <div className="bg-surface-container-low rounded-xl p-4 flex items-center gap-4 border-l-4 border-tertiary cursor-pointer hover:bg-surface-container-high transition-colors">
              <div className="w-12 h-12 bg-surface-container-lowest rounded-lg flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-tertiary">picture_as_pdf</span>
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-sm text-on-surface truncate">AWS_Lambda_Performance_v2.pdf</h4>
                <p className="text-xs text-on-surface-variant truncate">2.4 MB • Shared with Kinetic Campus</p>
              </div>
            </div>
            <div className="mt-6 flex gap-6 pt-4 border-t border-surface-container-low">
              <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-xl">favorite</span>
                <span className="text-sm font-medium">452</span>
              </button>
              <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-xl">chat_bubble</span>
                <span className="text-sm font-medium">89</span>
              </button>
            </div>
          </article>
        </div>
      </div>

      {/* Right Column: AI Insights & Sidebar */}
      <div className="hidden lg:block lg:col-span-4 space-y-6">
        {/* NavigationDrawer Style Component (AI Insights) */}
        <section className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-[0px_24px_48px_rgba(44,47,49,0.06)] border border-white/20 sticky top-24">
          <div className="mb-6">
            <span className="text-xs uppercase tracking-widest text-[#702ae1] font-bold">AI Insights</span>
            <h2 className="text-xl font-headline font-extrabold text-on-surface mt-1">Powered by Kinetic AI</h2>
            <p className="text-xs text-on-surface-variant mt-2">Personalized opportunities based on your activity</p>
          </div>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-4 p-4 bg-[#702ae1]/10 text-[#702ae1] rounded-xl text-left transition-all hover:shadow-[0_0_15px_rgba(112,42,225,0.2)]">
              <span className="material-symbols-outlined">auto_awesome</span>
              <div className="flex-1">
                <p className="font-semibold text-sm">Summarize Feed</p>
                <p className="text-[10px] opacity-80">Get the top 3 trends today</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-4 p-4 text-on-surface hover:bg-surface-container-low rounded-xl text-left transition-all">
              <span className="material-symbols-outlined">edit_note</span>
              <div className="flex-1">
                <p className="font-semibold text-sm">Draft Message</p>
                <p className="text-[10px] text-on-surface-variant">Pitch to Aria Chen</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-4 p-4 text-on-surface hover:bg-surface-container-low rounded-xl text-left transition-all">
              <span className="material-symbols-outlined">plumbing</span>
              <div className="flex-1">
                <p className="font-semibold text-sm">Task Extractor</p>
                <p className="text-[10px] text-on-surface-variant">Find project roles for you</p>
              </div>
            </button>
          </div>
          <button className="w-full mt-6 py-3 bg-tertiary text-white font-bold rounded-xl text-sm transition-all hover:opacity-90 shadow-lg shadow-tertiary/20">
            Launch Full Workspace
          </button>
        </section>

        {/* Trending Section */}
        <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
          <h3 className="font-headline font-bold text-lg mb-4">Trending in Placement Hub</h3>
          <div className="space-y-4">
            <div className="group cursor-pointer">
              <h4 className="font-bold text-sm group-hover:text-primary transition-colors">#GoogleSummerOfCode</h4>
              <p className="text-xs text-on-surface-variant mt-0.5">1,240 people talking about this</p>
            </div>
            <div className="group cursor-pointer">
              <h4 className="font-bold text-sm group-hover:text-primary transition-colors">#FullStackInternship</h4>
              <p className="text-xs text-on-surface-variant mt-0.5">892 active listings</p>
            </div>
            <div className="group cursor-pointer">
              <h4 className="font-bold text-sm group-hover:text-primary transition-colors">#DSAChallenge</h4>
              <p className="text-xs text-on-surface-variant mt-0.5">Join 45 others in 12 min</p>
            </div>
          </div>
        </section>

        {/* User Stats Card */}
        <section className="bg-surface-container-low rounded-xl overflow-hidden">
          <div className="h-20 bg-gradient-to-r from-primary to-primary-container relative">
            <div className="absolute -bottom-6 left-6">
              <img alt="Felix" className="w-16 h-16 rounded-2xl border-4 border-surface-container-low object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA35oqXMwVJ4yh7AZZOh77dD9lLqGky4vnM6iF5jeeGQpgTW0knb-SGxBaSI7_p5gE8vD1SIF9WLqFZrq__qzI5j13cANmBTbD7YVzUn1H1AY-k3n8WwveW-ed6gggy2bcQT3N0xXnYfmBFexP7T5mv3OQ2Q4eciFpvDUO-8iVxlGTER585t9Yzut3v2NZ54sYR1FwVOKZ4U1rkYUqKU9WDkulP_ho7f6MSdxR0wA_PamfypQQeRtSjwLOYYlMDEvz2nntRkV4JhN2Z" crossOrigin="anonymous"/>
            </div>
          </div>
          <div className="pt-8 pb-6 px-6">
            <h3 className="font-headline font-bold text-on-surface">Felix V.</h3>
            <p className="text-xs text-on-surface-variant">UX Design • Campus Leader</p>
            <div className="mt-6 flex justify-between border-t border-surface-container-high pt-4">
              <div className="text-center">
                <p className="text-sm font-bold">12</p>
                <p className="text-[10px] text-on-surface-variant uppercase">Projects</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold">1.2k</p>
                <p className="text-[10px] text-on-surface-variant uppercase">Reach</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold">98</p>
                <p className="text-[10px] text-on-surface-variant uppercase">Insights</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
