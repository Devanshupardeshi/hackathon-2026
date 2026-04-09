import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api, getErrorMessage } from "../services/api";
import type { User } from "../types/models";

export default function Settings() {
  const { user, refreshUser } = useAuth();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [skillsStr, setSkillsStr] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [adminUsers, setAdminUsers] = useState<User[]>([]);
  const [adminErr, setAdminErr] = useState("");

  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setBio(user.bio || "");
    setSkillsStr((user.skills || []).join(", "));
  }, [user]);

  useEffect(() => {
    if (user?.role !== "admin") return;
    let cancelled = false;
    (async () => {
      try {
        const { data } = await api.get<User[]>("/users");
        if (!cancelled) setAdminUsers(data);
      } catch (e) {
        if (!cancelled) setAdminErr(getErrorMessage(e));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user?.role]);

  const saveProfile = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setError("");
    setMessage("");
    const skills = skillsStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    try {
      await api.patch("/auth/profile", {
        name: name.trim(),
        bio,
        skills
      });
      await refreshUser();
      setMessage("Profile saved.");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto w-full">
      <header className="mb-12">
        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-2">
          <span className="w-8 h-[2px] bg-primary"></span>
          System settings
        </div>
        <h1 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight">Configuration hub</h1>
        <p className="text-on-surface-variant mt-2 max-w-xl">
          Update your profile stored on the CampusFlow API. Email and password changes are not available in this MVP.
        </p>
      </header>

      {error && (
        <div className="mb-6 rounded-2xl bg-error/10 text-error text-sm font-semibold px-4 py-3 border border-error/20">
          {error}
        </div>
      )}
      {message && (
        <div className="mb-6 rounded-2xl bg-secondary/10 text-secondary text-sm font-semibold px-4 py-3 border border-secondary/20">
          {message}
        </div>
      )}

      <form onSubmit={saveProfile}>
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          <section className="xl:col-span-8 bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/15 shadow-sm">
            <div className="flex justify-between items-start mb-8 flex-wrap gap-4">
              <div>
                <h2 className="text-xl font-headline font-bold text-on-surface">Profile identity</h2>
                <p className="text-sm text-on-surface-variant">Synced with your JWT session.</p>
              </div>
              <Link to="/profile" className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                View public profile <span className="material-symbols-outlined text-sm">open_in_new</span>
              </Link>
            </div>

            <div className="flex flex-col md:flex-row gap-10">
              <div className="flex-shrink-0 flex flex-col items-center gap-4">
                <div className="w-32 h-32 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container text-4xl font-black">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  Role: {user.role}
                </span>
              </div>

              <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface/60 uppercase tracking-tighter">Full name</label>
                  <input
                    className="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-on-surface outline-none"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface/60 uppercase tracking-tighter">Skills</label>
                  <input
                    className="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-on-surface outline-none"
                    type="text"
                    placeholder="Comma separated, e.g. React, Node, UX"
                    value={skillsStr}
                    onChange={(e) => setSkillsStr(e.target.value)}
                  />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-on-surface/60 uppercase tracking-tighter">Bio</label>
                  <textarea
                    className="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-on-surface outline-none"
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-on-surface/60 uppercase tracking-tighter">University email</label>
                  <div className="relative">
                    <input
                      className="w-full bg-surface-container px-4 py-3 rounded-lg border-none text-on-surface-variant opacity-60 outline-none"
                      disabled
                      type="email"
                      value={user.email}
                    />
                    <span
                      className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-secondary text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="xl:col-span-4 bg-white/70 backdrop-blur-md rounded-xl p-8 border border-outline-variant/15 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-tertiary">psychology</span>
                <h2 className="text-xl font-headline font-bold text-on-surface">Workspace</h2>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Theme toggles and notification preferences are UI-only for the hackathon MVP. Profile fields above are
                persisted to MongoDB via <code className="text-xs bg-surface-container-low px-1 rounded">PATCH /api/auth/profile</code>.
              </p>
            </div>
            <div className="mt-8 p-4 rounded-xl bg-tertiary/5 border border-tertiary/10">
              <p className="text-[10px] font-black text-tertiary uppercase tracking-widest mb-1">Tip</p>
              <p className="text-xs text-on-surface leading-snug">
                Use the AI assistant to turn your bio into a sharper elevator pitch, then paste it back here.
              </p>
            </div>
          </section>

          {user.role === "admin" && (
            <section className="xl:col-span-12 bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/15 shadow-sm">
              <h2 className="text-xl font-headline font-bold text-on-surface mb-2">Campus directory (admin)</h2>
              <p className="text-sm text-on-surface-variant mb-6">Read-only list from GET /api/users.</p>
              {adminErr && <p className="text-error text-sm font-semibold mb-4">{adminErr}</p>}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-on-surface-variant border-b border-surface-container-high">
                      <th className="py-2 pr-4">Name</th>
                      <th className="py-2 pr-4">Email</th>
                      <th className="py-2">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminUsers.map((u) => (
                      <tr key={u.id} className="border-b border-surface-container-high/60">
                        <td className="py-2 pr-4 font-semibold">{u.name}</td>
                        <td className="py-2 pr-4 text-on-surface-variant">{u.email}</td>
                        <td className="py-2 capitalize">{u.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          <div className="xl:col-span-12 flex justify-end gap-4 items-center pt-4 border-t border-on-surface/5">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-gradient-to-br from-primary to-primary-dim text-white font-bold rounded-full shadow-lg shadow-primary/30 transition-transform hover:scale-105 active:scale-95 disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save profile"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
