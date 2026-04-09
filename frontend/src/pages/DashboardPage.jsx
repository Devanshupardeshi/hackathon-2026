import { useEffect, useState } from "react";
import CampusFlowLogo from "../components/CampusFlowLogo";
import Card from "../components/Card";
import LoadingScreen from "../components/LoadingScreen";
import PageHeader from "../components/PageHeader";
import api from "../services/api";

const Empty = ({ children }) => <p className="text-sm text-slate-500">{children}</p>;

const DashboardPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data: res } = await api.get("/dashboard");
        if (!cancelled) setData(res);
      } catch (e) {
        if (!cancelled) setError(e?.response?.data?.message || "Could not load dashboard");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <>
        <PageHeader title="Dashboard" subtitle="Your day at a glance." />
        <Card title="Something went wrong" tilt={false}>
          <p className="text-sm text-rose-600">{error}</p>
        </Card>
      </>
    );
  }

  if (!data) return <LoadingScreen label="Loading your workspace" />;

  return (
    <div className="space-y-8">
      <section className="surface-hero p-6 sm:p-8">
        <div className="surface-hero-accent" aria-hidden />
        <div className="relative flex flex-col gap-6 pt-2 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <CampusFlowLogo size="lg" className="shrink-0" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{data.welcome}</h1>
              <p className="mt-2 max-w-xl text-sm text-slate-600 sm:text-base">
                Events, tasks, placements, and AI tips—organized in one clear view.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-900 ring-1 ring-violet-200">
              Live workspace
            </span>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900 ring-1 ring-emerald-200">
              Phase 1
            </span>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card title="Upcoming events" subtitle="Next on your calendar">
          {data.upcomingEvents?.length ? (
            <ul className="space-y-2 text-sm text-slate-700">
              {data.upcomingEvents.map((e) => (
                <li key={e._id} className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2 last:border-0">
                  <span className="font-medium">{e.title}</span>
                  <span className="shrink-0 text-xs text-slate-500">
                    {e.date ? new Date(e.date).toLocaleDateString() : "—"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <Empty>No upcoming events yet.</Empty>
          )}
        </Card>
        <Card title="Your tasks" subtitle="Recent focus items">
          {data.tasks?.length ? (
            <ul className="space-y-2 text-sm text-slate-700">
              {data.tasks.map((t) => (
                <li
                  key={t._id}
                  className={`border-b border-slate-100 pb-2 last:border-0 ${t.completed ? "text-slate-400 line-through" : "font-medium"}`}
                >
                  {t.title}
                </li>
              ))}
            </ul>
          ) : (
            <Empty>Add tasks from the Tasks page.</Empty>
          )}
        </Card>
        <Card title="Placements" subtitle="Fresh roles nearby">
          {data.placements?.length ? (
            <ul className="space-y-2 text-sm text-slate-700">
              {data.placements.map((p) => (
                <li key={p._id} className="border-b border-slate-100 pb-2 last:border-0">
                  <span className="font-medium">{p.company}</span>
                  <span className="text-slate-500"> — {p.title}</span>
                </li>
              ))}
            </ul>
          ) : (
            <Empty>No placements posted yet.</Empty>
          )}
        </Card>
      </div>

      <Card
        title="AI productivity nudges"
        subtitle="Quick wins you can act on today"
        className="border-violet-200 bg-gradient-to-br from-white to-violet-50"
      >
        <ul className="space-y-2 text-sm text-slate-700">
          {data.aiSuggestions?.map((s, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
              {s}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default DashboardPage;
