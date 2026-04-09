import { useCallback, useEffect, useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import PageHeader from "../components/PageHeader";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const PlacementsPage = () => {
  const [placements, setPlacements] = useState([]);
  const [form, setForm] = useState({ title: "", company: "", description: "" });
  const [resumeUrl, setResumeUrl] = useState("");
  const { user } = useAuth();

  const load = useCallback(() => api.get("/placements").then((res) => setPlacements(res.data)), []);

  useEffect(() => {
    load();
  }, [load]);

  const canPost = user?.role === "admin" || user?.role === "recruiter";
  const canApply = user?.role === "student";

  return (
    <div className="space-y-6">
      <PageHeader title="Placements" subtitle="Roles from admins and recruiters—apply with your resume link." />

      {canPost && (
        <Card title="Post a role" subtitle="Visible to all logged-in students">
          <form
            className="grid gap-3 md:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              api.post("/placements", form).then(() => {
                setForm({ title: "", company: "", description: "" });
                load();
              });
            }}
          >
            <input
              className="input-field"
              placeholder="Role title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <input
              className="input-field"
              placeholder="Company"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              required
            />
            <input
              className="input-field md:col-span-2"
              placeholder="Short description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <Button type="submit" className="md:col-span-2 md:w-fit">
              Publish placement
            </Button>
          </form>
        </Card>
      )}

      <Card title="Open listings">
        {canApply && (
          <div className="mb-4">
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Resume URL</label>
            <input
              className="input-field"
              placeholder="https://… or cloud link to your PDF"
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
            />
          </div>
        )}
        {placements.length ? (
          <ul className="space-y-3">
            {placements.map((p) => (
              <li
                key={p._id}
                className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h4 className="font-semibold text-slate-900">{p.title}</h4>
                  <p className="text-sm text-slate-600">{p.company}</p>
                  {p.description && <p className="mt-1 text-sm text-slate-500">{p.description}</p>}
                </div>
                {canApply ? (
                  <Button type="button" onClick={() => api.post(`/placements/${p._id}/apply`, { resumeUrl }).then(load)}>
                    Apply
                  </Button>
                ) : (
                  <span className="text-xs text-slate-400">Students can apply from their account</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-500">No placements yet.</p>
        )}
      </Card>
    </div>
  );
};

export default PlacementsPage;
