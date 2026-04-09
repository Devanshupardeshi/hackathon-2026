import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto w-full space-y-8">
      <header>
        <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">Identity</span>
        <h1 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight">Your profile</h1>
        <p className="text-on-surface-variant mt-2">How teammates see you across CampusFlow.</p>
      </header>

      <section className="bg-surface-container-lowest rounded-[2rem] p-8 border border-outline-variant/15 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-primary-container flex items-center justify-center text-on-primary-container text-2xl font-black shrink-0">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold font-headline text-on-surface">{user.name}</h2>
            <p className="text-on-surface-variant text-sm mt-1">{user.email}</p>
            <span className="inline-block mt-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider">
              {user.role}
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-on-surface/60 uppercase tracking-tighter mb-2">Bio</h3>
          <p className="text-on-surface leading-relaxed whitespace-pre-wrap">
            {user.bio?.trim() ? user.bio : "No bio yet. Add one in Settings."}
          </p>
        </div>

        <div>
          <h3 className="text-xs font-bold text-on-surface/60 uppercase tracking-tighter mb-2">Skills</h3>
          {user.skills?.length ? (
            <div className="flex flex-wrap gap-2">
              {user.skills.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full"
                >
                  {s}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-on-surface-variant">No skills listed.</p>
          )}
        </div>

        <Link
          to="/settings"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-container text-white font-bold rounded-full text-sm shadow-lg shadow-primary/20"
        >
          <span className="material-symbols-outlined text-lg">edit</span>
          Edit in settings
        </Link>
      </section>
    </div>
  );
}
