import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api, getErrorMessage } from "../services/api";
import type { Placement, PlacementPoster } from "../types/models";

function posterInfo(job: Placement): PlacementPoster | null {
  const pb = job.postedBy;
  if (pb && typeof pb === "object" && "name" in pb) return pb;
  return null;
}

export default function PlacementHub() {
  const { user } = useAuth();
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [applyResume, setApplyResume] = useState<Record<string, string>>({});
  const [aiInput, setAiInput] = useState("");
  const [aiType, setAiType] = useState<"resume" | "roadmap">("resume");
  const [aiOut, setAiOut] = useState("");
  const [aiBusy, setAiBusy] = useState(false);

  const canPost = user?.role === "admin" || user?.role === "recruiter";
  const canApply = user?.role === "student";

  const load = useCallback(async () => {
    setError("");
    try {
      const { data } = await api.get<Placement[]>("/placements");
      setPlacements(data);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const applied = useMemo(() => {
    if (!user) return new Set<string>();
    return new Set(
      placements
        .filter((p) => p.applications?.some((a) => String(a.applicant) === user.id))
        .map((p) => p._id)
    );
  }, [placements, user]);

  const createPlacement = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !company.trim()) return;
    setError("");
    try {
      const { data } = await api.post<Placement>("/placements", {
        title: title.trim(),
        company: company.trim(),
        description: description.trim()
      });
      setPlacements((prev) => [data, ...prev]);
      setTitle("");
      setCompany("");
      setDescription("");
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const apply = async (id: string) => {
    const resumeUrl = (applyResume[id] || "").trim();
    if (!resumeUrl) {
      setError("Add a resume URL (e.g. link to PDF on Drive or your portfolio).");
      return;
    }
    setError("");
    try {
      const { data } = await api.post<Placement>(`/placements/${id}/apply`, { resumeUrl });
      setPlacements((prev) => prev.map((p) => (p._id === data._id ? data : p)));
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const runAi = async () => {
    if (!aiInput.trim()) return;
    setAiBusy(true);
    setAiOut("");
    setError("");
    try {
      const { data } = await api.post<{ text: string }>("/ai/generate", {
        type: aiType,
        input: aiInput.trim()
      });
      setAiOut(data.text);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setAiBusy(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto w-full relative space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-extrabold font-headline tracking-tight text-on-surface mb-2">Placement Hub</h2>
          <p className="text-on-surface-variant max-w-xl">
            Every signed-in user sees the same placement list (including roles published by campus admins). Students apply
            with a resume link; admins and recruiters can publish openings.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <Link
            to="/feed"
            className="px-6 py-2.5 bg-surface-container-high text-primary font-bold rounded-full text-sm hover:bg-surface-container-highest transition-all"
          >
            Collaboration feed
          </Link>
          <Link
            to="/ai-assistant"
            className="px-6 py-2.5 bg-gradient-to-r from-[#4a40e0] to-[#9795ff] text-white font-bold rounded-full text-sm shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
          >
            Full AI suite
          </Link>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl bg-error/10 text-error text-sm font-semibold px-4 py-3 border border-error/20">
          {error}
        </div>
      )}

      {canPost && (
        <form
          onSubmit={createPlacement}
          className="bg-surface-container-lowest rounded-[2rem] p-8 border border-outline-variant/10 shadow-sm space-y-4"
        >
          <h3 className="text-lg font-bold font-headline">Post a new role</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="w-full bg-surface-container-low rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Job title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="w-full bg-surface-container-low rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <textarea
              className="md:col-span-2 w-full bg-surface-container-low rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 min-h-[100px]"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="px-8 py-3 bg-primary text-white font-bold rounded-full text-sm shadow-md shadow-primary/20"
          >
            Publish placement
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-4">
          {loading ? (
            <p className="text-on-surface-variant text-sm">Loading placements…</p>
          ) : placements.length === 0 ? (
            <p className="text-on-surface-variant text-sm">No placements yet.</p>
          ) : (
            placements.map((job) => {
              const poster = posterInfo(job);
              return (
              <div
                key={job._id}
                className="bg-surface-container-lowest rounded-[2rem] p-6 hover:shadow-xl hover:shadow-primary/5 transition-all shadow-sm border border-transparent hover:border-primary/20"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                  <div className="flex gap-5 min-w-0">
                    <div className="w-16 h-16 bg-surface-container-low rounded-2xl flex items-center justify-center shrink-0 font-black text-primary text-xl">
                      {job.company.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        {poster?.role === "admin" ? (
                          <span className="px-2 py-0.5 bg-primary/15 text-primary text-[10px] font-black uppercase tracking-wider rounded-md">
                            Campus admin
                          </span>
                        ) : poster?.role === "recruiter" ? (
                          <span className="px-2 py-0.5 bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-wider rounded-md">
                            Recruiter
                          </span>
                        ) : null}
                      </div>
                      <h3 className="text-xl font-bold font-headline text-on-surface">{job.title}</h3>
                      <p className="text-on-surface-variant font-medium mb-2">{job.company}</p>
                      {job.description ? (
                        <p className="text-sm text-on-surface-variant whitespace-pre-wrap">{job.description}</p>
                      ) : null}
                      <p className="text-[10px] font-bold text-outline-variant uppercase tracking-widest mt-3">
                        {poster
                          ? `Posted by ${poster.name} · ${new Date(job.createdAt).toLocaleString()}`
                          : `Posted ${new Date(job.createdAt).toLocaleString()}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 w-full sm:w-auto shrink-0">
                    {canApply ? (
                      applied.has(job._id) ? (
                        <span className="px-8 py-3 text-center rounded-full bg-secondary/10 text-secondary font-bold text-sm">
                          Applied
                        </span>
                      ) : (
                        <>
                          <input
                            className="w-full sm:w-64 bg-surface-container-low rounded-full px-4 py-2 text-sm outline-none"
                            placeholder="Resume URL (https://…)"
                            value={applyResume[job._id] || ""}
                            onChange={(e) =>
                              setApplyResume((m) => ({ ...m, [job._id]: e.target.value }))
                            }
                          />
                          <button
                            type="button"
                            onClick={() => apply(job._id)}
                            className="px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary-dim transition-all shadow-md shadow-primary/20"
                          >
                            Apply now
                          </button>
                        </>
                      )
                    ) : (
                      <span className="text-xs text-on-surface-variant font-semibold px-4 py-2 bg-surface-container-low rounded-full">
                        Recruiter and admin accounts cannot apply as students. Post roles above or share listings with
                        students.
                      </span>
                    )}
                  </div>
                </div>
              </div>
              );
            })
          )}
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-[#ffffff]/70 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 shadow-[0px_24px_48px_rgba(44,47,49,0.06)] sticky top-24 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-tertiary/10 rounded-2xl text-tertiary">
                <span className="material-symbols-outlined">auto_awesome</span>
              </div>
              <div>
                <p className="text-[10px] font-black text-tertiary uppercase tracking-widest">AI</p>
                <h3 className="text-lg font-bold font-headline leading-tight">Resume &amp; roadmap</h3>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setAiType("resume")}
                className={`flex-1 py-2 rounded-full text-xs font-bold ${
                  aiType === "resume" ? "bg-primary text-white" : "bg-surface-container-low"
                }`}
              >
                Resume feedback
              </button>
              <button
                type="button"
                onClick={() => setAiType("roadmap")}
                className={`flex-1 py-2 rounded-full text-xs font-bold ${
                  aiType === "roadmap" ? "bg-primary text-white" : "bg-surface-container-low"
                }`}
              >
                Roadmap
              </button>
            </div>
            <textarea
              className="w-full min-h-[120px] bg-surface rounded-2xl px-4 py-3 text-sm outline-none border border-outline-variant/20"
              placeholder={
                aiType === "resume"
                  ? "Paste resume text or bullet points…"
                  : "Describe your goal (e.g. become a full-stack intern in 6 months)…"
              }
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
            />
            <button
              type="button"
              disabled={aiBusy}
              onClick={runAi}
              className="w-full py-4 bg-tertiary text-white font-bold rounded-full flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <span className="material-symbols-outlined text-[18px]">science</span>
              {aiBusy ? "Running…" : "Run AI analysis"}
            </button>
            {aiOut ? (
              <div className="text-xs text-on-surface whitespace-pre-wrap max-h-64 overflow-y-auto bg-surface-container-low rounded-2xl p-4 border border-outline-variant/10">
                {aiOut}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
