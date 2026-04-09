const Card = ({ title, children, className = "", subtitle, tilt = true }) => (
  <section
    className={`rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm ${
      tilt ? "card-3d" : ""
    } ${className}`}
  >
    {(title || subtitle) && (
      <header className="mb-4 border-b border-slate-100 pb-3">
        {title && <h3 className="text-lg font-semibold tracking-tight text-slate-900">{title}</h3>}
        {subtitle && <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>}
      </header>
    )}
    {children}
  </section>
);

export default Card;
