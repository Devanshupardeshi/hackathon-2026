const variants = {
  primary:
    "bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:brightness-105 active:scale-[0.98]",
  secondary:
    "bg-white/80 text-slate-800 border border-slate-200/80 shadow-sm hover:bg-white hover:border-slate-300 active:scale-[0.98]",
  danger:
    "bg-rose-500/90 text-white shadow-md shadow-rose-500/20 hover:bg-rose-500 active:scale-[0.98]",
  ghost: "text-slate-600 hover:bg-slate-100/80 active:scale-[0.98]"
};

const Button = ({
  children,
  className = "",
  variant = "primary",
  type = "button",
  disabled,
  ...props
}) => (
  <button
    type={type}
    disabled={disabled}
    className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 ${variants[variant] ?? variants.primary} ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
