import { useEffect, useState } from "react";
import Card from "../components/Card";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const PlacementsPage = () => {
  const [placements, setPlacements] = useState([]);
  const [form, setForm] = useState({ title: "", company: "", description: "" });
  const [resumeUrl, setResumeUrl] = useState("");
  const { user } = useAuth();

  const load = () => api.get("/placements").then((res) => setPlacements(res.data));
  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-4">
      {(user?.role === "admin" || user?.role === "recruiter") && (
        <Card title="Post Placement">
          <form
            className="grid md:grid-cols-3 gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              api.post("/placements", form).then(() => {
                setForm({ title: "", company: "", description: "" });
                load();
              });
            }}
          >
            <input className="border rounded p-2" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <input className="border rounded p-2" placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            <input className="border rounded p-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <button className="bg-indigo-600 text-white px-4 py-2 rounded">Create</button>
          </form>
        </Card>
      )}
      <Card title="Open Placements">
        <div className="space-y-3">
          <input className="border rounded p-2 w-full" placeholder="Resume URL (for quick MVP upload flow)" value={resumeUrl} onChange={(e) => setResumeUrl(e.target.value)} />
          {placements.map((p) => (
            <div key={p._id} className="border rounded-xl p-3 flex justify-between items-center">
              <div>
                <h4 className="font-semibold">{p.title}</h4>
                <p className="text-sm">{p.company}</p>
              </div>
              <button className="bg-violet-600 text-white px-3 py-2 rounded-lg" onClick={() => api.post(`/placements/${p._id}/apply`, { resumeUrl }).then(load)}>
                Apply
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default PlacementsPage;
