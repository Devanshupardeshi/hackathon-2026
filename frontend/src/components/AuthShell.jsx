const AuthShell = ({ children, tagline = "AI-powered campus collaboration" }) => (
  <div className="relative min-h-screen overflow-hidden bg-mesh">
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="orb orb-1 animate-float-slow" aria-hidden />
      <div className="orb orb-2 animate-float-delayed" aria-hidden />
      <div className="orb orb-3 animate-drift" aria-hidden />
    </div>
    <div className="relative z-10 grid min-h-screen place-items-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-200/90">CampusFlow AI</p>
          <h2 className="mt-1 bg-gradient-to-r from-white via-violet-100 to-fuchsia-100 bg-clip-text text-2xl font-bold text-transparent">
            {tagline}
          </h2>
        </div>
        <div className="card-3d-enter auth-panel">{children}</div>
      </div>
    </div>
  </div>
);

export default AuthShell;
