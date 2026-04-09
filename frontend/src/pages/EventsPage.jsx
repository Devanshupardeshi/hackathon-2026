import { useCallback, useEffect, useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import PageHeader from "../components/PageHeader";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", date: "" });
  const { user } = useAuth();

  const load = useCallback(() => api.get("/events").then((res) => setEvents(res.data)), []);

  useEffect(() => {
    load();
  }, [load]);

  const isAdmin = user?.role === "admin";

  return (
    <div className="space-y-6">
      <PageHeader title="Events & clubs" subtitle="Discover what is happening on campus and RSVP in one tap." />

      {isAdmin && (
        <Card title="Create event" subtitle="Admin only">
          <form
            className="grid gap-3 md:grid-cols-3"
            onSubmit={(e) => {
              e.preventDefault();
              api
                .post("/events", { ...form, date: form.date ? new Date(form.date).toISOString() : form.date })
                .then(() => {
                  setForm({ title: "", description: "", date: "" });
                  load();
                });
            }}
          >
            <input
              className="input-field"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <input
              className="input-field md:col-span-2"
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <input className="input-field" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
            <Button type="submit" className="md:col-span-3 md:w-fit">
              Publish
            </Button>
          </form>
        </Card>
      )}

      <Card title="Upcoming">
        {events.length ? (
          <ul className="divide-y divide-slate-100">
            {events.map((ev) => (
              <li key={ev._id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h4 className="font-semibold text-slate-900">{ev.title}</h4>
                  <p className="text-sm text-slate-500">{new Date(ev.date).toLocaleString()}</p>
                  {ev.description && <p className="mt-1 text-sm text-slate-600">{ev.description}</p>}
                </div>
                <Button type="button" variant="secondary" onClick={() => api.post(`/events/${ev._id}/join`).then(load)}>
                  Join
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-500">No events scheduled.</p>
        )}
      </Card>
    </div>
  );
};

export default EventsPage;
