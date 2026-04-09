const LoadingScreen = ({ label = "Loading" }) => (
  <div className="grid min-h-[40vh] place-items-center">
    <div className="flex flex-col items-center gap-3">
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-violet-500/30 border-t-violet-600"
        role="status"
        aria-label={label}
      />
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  </div>
);

export default LoadingScreen;
