export default function Login() {
  return (
    <main className="flex h-screen w-full bg-surface text-on-surface antialiased overflow-hidden">
      {/* Visual/Hero Side */}
      <section className="hidden lg:flex lg:w-1/2 relative flex-col justify-end p-16 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img alt="Campus Life" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAn4GK5734P77GMjFHBMmUq4Vc2YASXY2DAB3zms9SE2mKfugykoiPNvn19V-BknJWGASlqZrix9R4QDJQ0gMuJQMb7LQJXS-gGSzRO4AMRgk5AebtPpTOnQReE7iriHDwqgXiVtLlI1hYHsMrERI7hKb7SHQGQFn9py_V9vSVZ6hNZIj6c78uyOqJi3nwFIIudJPKLUDLS5EuphvKFy_juLT15-YoKcRYmyg_60yQtAdlZ1q0H9Y1kag_9_Mq28pHgG2vT_ZckKFg" crossOrigin="anonymous"/>
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dim/90 via-primary-dim/40 to-transparent"></div>
        </div>

        {/* Content on Hero */}
        <div className="relative z-10 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-surface-container-lowest rounded-2xl flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-3xl">auto_awesome</span>
            </div>
            <span className="text-surface-container-lowest font-headline font-bold text-2xl tracking-tight">Kinetic Campus</span>
          </div>
          <h1 className="text-surface-container-lowest font-headline font-extrabold text-5xl leading-tight tracking-tighter">
            Accelerating Potential <br/>Through AI Collaboration.
          </h1>
          <p className="text-primary-fixed-dim text-lg font-medium max-w-md">
            Join the digital ecosystem where academic intelligence meets career momentum. Your journey starts here.
          </p>
          <div className="flex items-center space-x-4 pt-4">
            <div className="flex -space-x-2">
              <img className="w-10 h-10 rounded-full border-2 border-primary-dim" alt="Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYyvUVv_Z0ktTNr2sULvqjy2H1ffYcJWHvoPBbp-ujB0320WycZx8fzFARrtLDPZ71jNIkwWcTKlmW-WMcAErkVcQZBFwNlr-1FTAJDeNVIGibAmiznJgRfHaMy_KF_pXY7njKjYVvYTU45jNPa6QtQ64KNpDF8TImeByXR2NPbEEPj621fVlickFv_IU6qg8Mvl6gUsrIuGr-zjMXY7zGPBWfgVmmg52EpPn-uiqZAVp6PjgXQKBsee1MS1x4DrJ0RPtqv4o_2cHu" crossOrigin="anonymous"/>
              <img className="w-10 h-10 rounded-full border-2 border-primary-dim" alt="Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzzz95_Lu530RassvwvTT5Ug-lohqzyOEBw6xrbexDNQBBZmRg1BzrRp6oBQA0jOh6OC_dDuCMhCzN9Q3pBMMRB9B_SbfBouVc7HF8-BQlby06egrjffKX_XSppcq6yfoQMdM-NTxmIxU4FgP5Xjo4PzPp1S9lmHhQJxpEq7Ls77GUDjUyDMQkYkr24D1WCbVOVtGgjKzlhcEOSEaz6sEJY3B87w2giBGA0aHVyEECytdXimY6bmS3vOF8Sln9aQU4XdKXWArK6Krc" crossOrigin="anonymous"/>
              <img className="w-10 h-10 rounded-full border-2 border-primary-dim" alt="Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDWkcrrqugm1B7d66xgvI-U7s7Dc92Hf4hZbA8ia_cBjKsGD0hqDqqUgfLwBSNGubn1EpzPVpLhukZw75nq--pv5NuQFZFNcgLmhpiovyqW5ZUd-qWTfyu_17U6brsISGj_KCUttjJ1Os8cZmOKM1PCAQeeoOOjTmUTP--mtbadp-N3TXbLlL9AOyQZ4iHuvNm4WstyYvCM9jW1MuIJblH6-WRK2RH7zXE4tDLrVJkK6_-pZ10blze2OWWhJ7qjvpgBDSgP6LymNdb" crossOrigin="anonymous"/>
            </div>
            <p className="text-surface-container-lowest text-sm">
              <span className="font-bold">2,400+</span> students and mentors active now.
            </p>
          </div>
        </div>
        {/* Decorative Element */}
        <div className="absolute top-0 right-0 p-12">
          <div className="glass-panel rounded-3xl p-6 border border-white/10 shadow-2xl flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-secondary-container">rocket_launch</span>
            </div>
            <div>
              <div className="text-on-surface font-headline font-bold text-sm">Career Boost AI</div>
              <div className="text-on-surface-variant text-xs">Trending: 12 New Placements</div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Side */}
      <section className="w-full lg:w-1/2 bg-surface flex flex-col justify-center items-center p-8 md:p-16 overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Branding */}
          <div className="lg:hidden flex items-center space-x-3 mb-12">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-white">auto_awesome</span>
            </div>
            <span className="text-on-surface font-headline font-bold text-xl tracking-tight">Kinetic Campus</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-on-surface font-headline font-extrabold text-3xl tracking-tight">Welcome to the Flow.</h2>
            <p className="text-on-surface-variant font-medium">Elevate your campus experience with AI-powered insights.</p>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-widest text-outline">Select your entry point</label>
            <div className="grid grid-cols-3 gap-3">
              <button className="flex flex-col items-center justify-center p-4 rounded-3xl bg-primary-container text-on-primary-container border-2 border-primary transition-all duration-200 ring-4 ring-primary/10">
                <span className="material-symbols-outlined mb-2">school</span>
                <span className="text-xs font-bold">Student</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 rounded-3xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high transition-all duration-200">
                <span className="material-symbols-outlined mb-2">admin_panel_settings</span>
                <span className="text-xs font-bold">Admin</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 rounded-3xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high transition-all duration-200">
                <span className="material-symbols-outlined mb-2">work</span>
                <span className="text-xs font-bold">Recruiter</span>
              </button>
            </div>
          </div>

          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); window.location.href='/events'; }}>
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline group-focus-within:text-primary">alternate_email</span>
                </div>
                <input className="w-full pl-12 pr-4 py-4 rounded-2xl bg-surface-container-lowest border-0 focus:ring-4 focus:ring-primary/10 text-on-surface font-medium transition-all" placeholder="University Email Address" type="email" required />
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline group-focus-within:text-primary">lock</span>
                </div>
                <input className="w-full pl-12 pr-12 py-4 rounded-2xl bg-surface-container-lowest border-0 focus:ring-4 focus:ring-primary/10 text-on-surface font-medium transition-all" placeholder="Password" type="password" required />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer">
                  <span className="material-symbols-outlined text-outline">visibility</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input className="w-5 h-5 rounded-lg border-surface-container-highest text-primary focus:ring-primary/20" type="checkbox"/>
                <span className="text-sm text-on-surface-variant font-medium group-hover:text-on-surface">Keep me in flow</span>
              </label>
              <a className="text-sm font-bold text-primary hover:text-primary-dim transition-colors" href="#">Forgot Access?</a>
            </div>

            <button className="w-full bg-gradient-to-r from-[#4a40e0] to-[#9795ff] text-[#f4f1ff] py-4 rounded-full font-headline font-bold text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center space-x-2" type="submit">
              <span>Sign into Workspace</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </form>

          <div className="flex items-center space-x-4">
            <div className="h-[1px] flex-1 bg-surface-container-highest/50"></div>
            <span className="text-xs font-bold text-outline-variant uppercase tracking-widest">or continue with</span>
            <div className="h-[1px] flex-1 bg-surface-container-highest/50"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center space-x-2 py-3 px-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/10 hover:bg-surface-container-low transition-colors">
              <img alt="Google" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpfpO2qb-5M-WGEWFRRxotkm5Sf5dDKwYzQ3qIN6IgfWr9ChPUX10EPa2IDQ98OQqCgrDTbbD2RfJFEu9MrzJE0s5D7-YXC1h1SvWM1tkWG3yoI-pmVEqAL1qEf7jYjavmVpZrcl6HLeAhROBVXdmw4NrjPzm4iQok-gHo1qu0lM3Y8pAi6P1jpiN43FABEgEH75gKroz5bxvrEwiGB9_msUc38CiwU8hnGkbx4YLarg4zseSvWambly43-JSOlmHhC9K9m9mCdr1A" crossOrigin="anonymous"/>
              <span className="text-sm font-bold text-on-surface">Google Sync</span>
            </button>
            <button className="flex items-center justify-center space-x-2 py-3 px-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/10 hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined text-on-surface">integration_instructions</span>
              <span className="text-sm font-bold text-on-surface">SSO</span>
            </button>
          </div>

          <p className="text-center text-on-surface-variant font-medium">
            New to the ecosystem? 
            <a className="text-primary font-bold hover:underline ml-1" href="/register">Start Enrollment</a>
          </p>
        </div>

        <div className="mt-12 flex space-x-6 text-[10px] font-bold uppercase tracking-widest text-outline-variant">
          <a className="hover:text-on-surface transition-colors" href="#">Privacy Policy</a>
          <a className="hover:text-on-surface transition-colors" href="#">Terms of Flow</a>
          <a className="hover:text-on-surface transition-colors" href="#">Accessibility</a>
        </div>
      </section>

      {/* Floating Tip */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="glass-panel p-4 rounded-3xl shadow-[0px_24px_48px_rgba(44,47,49,0.1)] border border-white/20 flex items-center space-x-4 max-w-xs transition-transform">
          <div className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-on-tertiary-container">smart_toy</span>
          </div>
          <p className="text-xs font-semibold text-on-surface leading-tight">
            "Need help choosing your role? Click on the 'Student' chip for personalized learning paths."
          </p>
          <button className="text-outline-variant hover:text-on-surface">
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      </div>
    </main>
  );
}
