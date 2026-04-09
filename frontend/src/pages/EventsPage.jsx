import { useEffect, useState } from "react";
import Card from "../components/Card";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", date: "" });
  const { user } = useAuth();

  const load = () => api.get("/events").then((res) => setEvents(res.data));
  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-4">
      {user?.role === "admin" && (
        <Card title="Create Event">
          <form
            className="grid md:grid-cols-3 gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              api.post("/events", form).then(() => {
                setForm({ title: "", description: "", date: "" });
                load();
              });
            }}
          >
            <input className="border rounded p-2" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <input className="border rounded p-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <input className="border rounded p-2" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            <button className="bg-indigo-600 text-white px-4 py-2 rounded">Create</button>
          </form>
        </Card>
      )}
      <Card title="Events & Clubs">
        {events.map((ev) => (
          <div key={ev._id} className="flex justify-between items-center border-b py-3">
            <div>
              <h4 className="font-semibold">{ev.title}</h4>
              <p className="text-sm text-slate-600">{new Date(ev.date).toDateString()}</p>
            </div>
            <button className="bg-emerald-600 text-white px-3 py-2 rounded" onClick={() => api.post(`/events/${ev._id}/join`).then(load)}>
              Join
            </button>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default EventsPage;
