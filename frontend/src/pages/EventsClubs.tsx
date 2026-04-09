import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { api, getErrorMessage } from "../services/api";
import type { EventItem } from "../types/models";

function formatBlock(iso: string) {
  const d = new Date(iso);
  return {
    mon: d.toLocaleString("en-US", { month: "short" }),
    day: d.getDate().toString(),
    time: d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  };
}

export default function EventsClubs() {
  const { user } = useAuth();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const isAdmin = user?.role === "admin";

  const load = useCallback(async () => {
    setError("");
    try {
      const { data } = await api.get<EventItem[]>("/events");
      setEvents(data);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const joined = (ev: EventItem) => user && ev.attendees?.some((id) => String(id) === user.id);

  const join = async (id: string) => {
    setError("");
    try {
      const { data } = await api.post<EventItem>(`/events/${id}/join`, {});
      setEvents((prev) => prev.map((e) => (e._id === data._id ? data : e)));
    } catch (e) {
      setError(getErrorMessage(e));
    }
  };

  const create = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date) return;
    setError("");
    try {
      const { data } = await api.post<EventItem>("/events", {
        title: title.trim(),
        description: description.trim(),
        date: new Date(date).toISOString()
      });
      setEvents((prev) => [...prev, data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
      setTitle("");
      setDescription("");
      setDate("");
      setShowCreate(false);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const featured = events[0];

  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-extrabold uppercase tracking-widest">
              Campus calendar
            </span>
            <h2 className="text-5xl font-extrabold tracking-tight text-on-surface leading-[1.1]">
              Discovery is the <br />
              <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent italic">
                heart of campus.
              </span>
            </h2>
            <p className="text-on-surface-variant max-w-lg">
              RSVP to real events hosted on CampusFlow. Admins can publish new campus happenings for everyone.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {isAdmin && (
              <button
                type="button"
                onClick={() => setShowCreate(true)}
                className="px-6 py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-full font-bold shadow-lg shadow-primary/20 flex items-center gap-2 transition-transform active:scale-95"
              >
                <span className="material-symbols-outlined text-sm">add</span> Create event
              </button>
            )}
            <button
              type="button"
              className="px-6 py-3 bg-surface-container-high text-primary rounded-full font-bold transition-opacity hover:opacity-90"
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
            >
              Browse schedule
            </button>
          </div>
        </div>
        <div className="lg:col-span-5 h-64 rounded-[2rem] overflow-hidden relative group bg-surface-container-low">
          {featured ? (
            <>
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt=""
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcGYlnf1kofJn4pJz_gKhva_uTJnc_zgflbK5C-rNud7bcPumYjLPpwW04TqbFFvgqhcFr-Fo4DIOHhHUFBUk-wDWDKFI_NYQg4ZnN37f8vdx-mfQFKIfSKm765EN6LD0Tgnh3Bh_XaKFBQHfg5rp-pd6A_jjD5ClGwXgdEp9OkrMoS5ocGvaf9ykquhG8c1Rx2sUN8_xP7U4gK4ob80PtrE-0GZGmKb5l9soOdqAaYQnrsAcyAZd3_Y-Vb1Ua7ijwE4k4DuSbdlxL"
                crossOrigin="anonymous"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end gap-4">
                <div className="text-white min-w-0">
                  <p className="text-xs font-bold opacity-80 uppercase tracking-tighter">Next up</p>
                  <p className="font-bold truncate">{featured.title}</p>
                  <p className="text-xs opacity-90">{new Date(featured.date).toLocaleString()}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-on-surface-variant text-sm font-semibold p-6 text-center">
              No events scheduled yet. {isAdmin ? "Create the first one." : "Check back soon."}
            </div>
          )}
        </div>
      </section>

      {error && (
        <div className="rounded-2xl bg-error/10 text-error text-sm font-semibold px-4 py-3 border border-error/20">
          {error}
        </div>
      )}

      {showCreate && isAdmin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div className="bg-surface-container-lowest rounded-[2rem] p-8 max-w-lg w-full shadow-xl space-y-4">
            <h3 className="text-xl font-bold">New event</h3>
            <form className="space-y-4" onSubmit={create}>
              <input
                className="w-full bg-surface-container-low rounded-xl px-4 py-3 outline-none"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                className="w-full bg-surface-container-low rounded-xl px-4 py-3 outline-none min-h-[90px]"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                className="w-full bg-surface-container-low rounded-xl px-4 py-3 outline-none"
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded-full font-bold text-sm text-on-surface-variant"
                  onClick={() => setShowCreate(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full font-bold text-sm bg-primary text-white"
                >
                  Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <section className="space-y-6 pb-12 pt-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold tracking-tight">Upcoming campus events</h3>
        </div>

        <div className="bg-surface-container-lowest rounded-3xl overflow-hidden">
          {loading ? (
            <div className="p-6 text-sm text-on-surface-variant">Loading events…</div>
          ) : events.length === 0 ? (
            <div className="p-6 text-sm text-on-surface-variant">No events yet.</div>
          ) : (
            <div className="divide-y divide-surface-container-highest">
              {events.map((ev) => {
                const { mon, day, time } = formatBlock(ev.date);
                return (
                  <div
                    key={ev._id}
                    className="p-6 flex flex-col md:flex-row md:items-center gap-6 hover:bg-surface-container-low transition-colors group"
                  >
                    <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-surface-container-low shrink-0">
                      <span className="text-xs font-bold uppercase text-primary">{mon}</span>
                      <span className="text-2xl font-extrabold">{day}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{ev.title}</h4>
                      {ev.description ? (
                        <p className="text-sm text-on-surface-variant line-clamp-2 mb-2">{ev.description}</p>
                      ) : null}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-on-surface-variant">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">schedule</span>
                          {time}
                        </span>
                        {ev.createdBy?.name && (
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">person</span>
                            {ev.createdBy.name}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        type="button"
                        disabled={!!joined(ev)}
                        onClick={() => join(ev._id)}
                        className="px-6 py-2 bg-primary text-white rounded-full font-bold text-sm shadow-sm active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {joined(ev) ? "Joined" : "RSVP"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
