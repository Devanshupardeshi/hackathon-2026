const Card = ({ title, children, className = "" }) => (
  <section className={`bg-white rounded-2xl shadow-sm p-5 ${className}`}>
    {title && <h3 className="text-lg font-semibold mb-3">{title}</h3>}
    {children}
  </section>
);

export default Card;
