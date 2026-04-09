const CampusFlowLogo = ({ className = "", size = "md", showWordmark = true, variant = "default" }) => {
  const scale = size === "sm" ? 0.75 : size === "lg" ? 1.15 : 1;
  const inverse = variant === "inverse";

  return (
    <div
      className={`inline-flex items-center gap-3 ${className}`}
      style={{ transform: `scale(${scale})`, transformOrigin: "left center" }}
    >
      <span
        className={`relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-indigo-600 shadow-lg ring-2 ${
          inverse ? "shadow-black/30 ring-white/40" : "shadow-violet-500/30 ring-white/30"
        }`}
        aria-hidden
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white drop-shadow-sm">
          <path d="M12 3L20 8v8l-8 5-8-5V8l8-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M12 8.5L16.5 11v5L12 18l-4.5-2v-5L12 8.5z" fill="currentColor" fillOpacity="0.25" />
        </svg>
      </span>
      {showWordmark && (
        <div className="leading-tight">
          <p
            className={`text-[0.65rem] font-bold uppercase tracking-[0.22em] ${
              inverse ? "text-violet-200/90" : "text-violet-600/80"
            }`}
          >
            CampusFlow
          </p>
          <p
            className={`text-xl font-bold tracking-tight ${
              inverse
                ? "bg-gradient-to-r from-white via-violet-100 to-fuchsia-100 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-violet-700 via-fuchsia-600 to-indigo-600 bg-clip-text text-transparent"
            }`}
          >
            AI
          </p>
        </div>
      )}
    </div>
  );
};

export default CampusFlowLogo;
