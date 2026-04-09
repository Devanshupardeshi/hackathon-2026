import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, getErrorMessage } from "../services/api";
import type { DashboardPayload } from "../types/models";

function formatEventDate(iso: string) {
  const d = new Date(iso);
  return {
    mon: d.toLocaleString("en-US", { month: "short" }),
    day: d.getDate().toString()
  };
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardPayload | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data: d } = await api.get<DashboardPayload>("/dashboard");
        if (!cancelled) setData(d);
      } catch (e) {
        if (!cancelled) setError(getErrorMessage(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric"
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh] text-on-surface-variant text-sm font-semibold">
        Loading dashboard…
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-2xl bg-error/10 text-error text-sm font-semibold px-4 py-3 border border-error/20 max-w-xl">
        {error || "Could not load dashboard"}
      </div>
    );
  }

  const openTasks = data.tasks.filter((t) => !t.completed).length;

  return (
    <div className="flex relative w-full h-full">
      <div className="max-w-7xl mx-auto w-full space-y-8 lg:pr-80">
        <section className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2 block font-label">
              {today}
            </span>
            <h1 className="text-4xl font-extrabold text-on-surface font-headline tracking-tight">{data.welcome}</h1>
            <p className="text-on-surface-variant mt-2 text-lg">
              You have{" "}
              <span className="font-bold text-secondary">
                {openTasks} open task{openTasks === 1 ? "" : "s"}
              </span>{" "}
              on your list. Keep momentum on placements and events below.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/events"
              className="px-6 py-2.5 bg-surface-container-high text-primary font-bold rounded-full text-sm hover:opacity-80 transition-opacity flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">calendar_today</span>
              View events
            </Link>
            <Link
              to="/tasks"
              className="px-6 py-2.5 bg-gradient-to-r from-primary to-primary-container text-white font-bold rounded-full text-sm shadow-lg shadow-primary/20 hover:scale-105 transition-transform flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              Tasks
            </Link>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 glass-panel rounded-[2rem] p-8 border border-white/20 shadow-[0px_24px_48px_rgba(44,47,49,0.06)] relative overflow-hidden flex flex-col justify-between min-h-[320px]">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-tertiary/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="material-symbols-outlined text-tertiary text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  auto_awesome
                </span>
                <h2 className="text-2xl font-bold font-headline tracking-tight">AI suggestions</h2>
              </div>
              <div className="space-y-4 max-w-2xl">
                {data.aiSuggestions.map((line, i) => (
                  <div
                    key={i}
                    className="bg-white/60 dark:bg-slate-800/60 p-5 rounded-2xl border border-white/40 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-4">
                      <div className="shrink-0 w-10 h-10 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
                        <span className="material-symbols-outlined text-sm">spark</span>
                      </div>
                      <p className="text-sm text-on-surface leading-relaxed">{line}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative z-10 mt-8">
              <Link
                to="/ai-assistant"
                className="inline-flex px-4 py-2 bg-tertiary/5 rounded-full text-tertiary text-xs font-bold items-center gap-2 hover:bg-tertiary/10 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">smart_toy</span>
                Open AI assistant
              </Link>
            </div>
          </div>

          <div className="md:col-span-4 bg-surface-container-lowest rounded-[2rem] p-8 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-headline">Events</h2>
              <Link to="/events" className="text-primary text-sm font-bold">
                See all
              </Link>
            </div>
            <div className="space-y-6 flex-1 overflow-y-auto pr-2">
              {data.upcomingEvents.length === 0 ? (
                <p className="text-sm text-on-surface-variant">No upcoming events yet.</p>
              ) : (
                data.upcomingEvents.map((ev) => {
                  const { mon, day } = formatEventDate(ev.date);
                  return (
                    <div key={ev._id} className="group cursor-pointer">
                      <div className="flex gap-4">
                        <div className="w-12 h-14 bg-surface-container-low rounded-xl flex flex-col items-center justify-center shrink-0 group-hover:bg-primary-container transition-colors">
                          <span className="text-[10px] font-bold text-on-surface-variant uppercase group-hover:text-primary">
                            {mon}
                          </span>
                          <span className="text-lg font-black text-on-surface group-hover:text-white">{day}</span>
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-on-surface truncate">{ev.title}</h4>
                          <p className="text-xs text-on-surface-variant mt-1 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">schedule</span>
                            {new Date(ev.date).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="md:col-span-5 bg-surface-container-lowest rounded-[2rem] p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold font-headline">New placements</h2>
              <Link to="/placements" className="text-primary text-sm font-bold">
                Hub
              </Link>
            </div>
            <div className="space-y-4">
              {data.placements.length === 0 ? (
                <p className="text-sm text-on-surface-variant">No placements posted yet.</p>
              ) : (
                data.placements.map((p) => (
                  <div
                    key={p._id}
                    className="p-4 bg-surface-container-low rounded-2xl hover:bg-white transition-all border border-transparent hover:border-surface-container-high"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-sm">{p.title}</h4>
                        <p className="text-xs text-on-surface-variant">{p.company}</p>
                        {p.postedBy && typeof p.postedBy === "object" && p.postedBy.role === "admin" ? (
                          <span className="inline-block mt-1 text-[9px] font-black uppercase text-primary bg-primary/10 px-2 py-0.5 rounded">
                            Admin post
                          </span>
                        ) : null}
                      </div>
                      <Link
                        to="/placements"
                        className="text-primary hover:bg-primary/10 p-1 rounded-lg transition-colors"
                        aria-label="View placement"
                      >
                        <span className="material-symbols-outlined text-lg">chevron_right</span>
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="md:col-span-7 bg-surface-container-lowest rounded-[2rem] p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold font-headline">Your recent tasks</h2>
              <Link to="/tasks" className="text-primary text-sm font-bold">
                Manage
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.tasks.length === 0 ? (
                <p className="text-sm text-on-surface-variant sm:col-span-2">No tasks yet.</p>
              ) : (
                data.tasks.slice(0, 4).map((t) => (
                  <div
                    key={t._id}
                    className={`p-6 rounded-3xl border transition-all ${
                      t.completed
                        ? "bg-surface-container-low border-transparent opacity-70"
                        : "bg-primary/5 border-primary/10 hover:shadow-xl hover:shadow-primary/5"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="p-2 bg-primary/10 rounded-xl text-primary">
                        <span className="material-symbols-outlined text-xl">assignment</span>
                      </span>
                      <span className="text-[10px] font-bold text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded">
                        {t.completed ? "Done" : "Open"}
                      </span>
                    </div>
                    <h4 className="font-bold text-on-surface mb-1 line-clamp-2">{t.title}</h4>
                    {t.description ? (
                      <p className="text-xs text-on-surface-variant line-clamp-2">{t.description}</p>
                    ) : null}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex fixed right-0 top-0 h-full z-50 p-6 flex-col w-80 bg-[#ffffff]/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-l-3xl shadow-[0px_24px_48px_rgba(44,47,49,0.06)] border-l border-white/20 pt-[80px]">
        <div className="flex flex-col gap-1 mb-8">
          <span className="text-sm uppercase tracking-widest text-[#702ae1] font-headline font-bold">Shortcuts</span>
          <span className="text-xs text-on-surface-variant font-semibold">Jump back into your flow</span>
        </div>
        <div className="space-y-4">
          <Link
            to="/feed"
            className="w-full flex items-center gap-4 p-4 bg-[#702ae1]/10 text-[#702ae1] rounded-xl font-semibold text-left"
          >
            <span className="material-symbols-outlined">forum</span>
            <span className="text-sm">Collaboration feed</span>
          </Link>
          <Link
            to="/placements"
            className="w-full flex items-center gap-4 p-4 text-on-surface hover:bg-surface-container-high rounded-xl transition-all font-semibold text-left"
          >
            <span className="material-symbols-outlined">work_history</span>
            <span className="text-sm">Placement hub</span>
          </Link>
          <Link
            to="/ai-assistant"
            className="w-full flex items-center gap-4 p-4 text-on-surface hover:bg-surface-container-high rounded-xl transition-all font-semibold text-left"
          >
            <span className="material-symbols-outlined">smart_toy</span>
            <span className="text-sm">AI assistant</span>
          </Link>
        </div>
        <Link
          to="/dashboard"
          className="mt-auto py-4 px-6 bg-gradient-to-r from-tertiary to-[#4a40e0] text-white rounded-full text-sm font-bold shadow-lg shadow-tertiary/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-center"
        >
          Refresh dashboard
        </Link>
      </div>
    </div>
  );
}
