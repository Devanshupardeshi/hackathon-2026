import { useCallback, useEffect, useState, type FormEvent } from "react";
import { api, getErrorMessage } from "../services/api";
import type { Task } from "../types/models";

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const load = useCallback(async () => {
    setError("");
    try {
      const { data } = await api.get<Task[]>("/tasks");
      setTasks(data);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addTask = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setError("");
    try {
      const { data } = await api.post<Task>("/tasks", {
        title: title.trim(),
        description: description.trim()
      });
      setTasks((prev) => [data, ...prev]);
      setTitle("");
      setDescription("");
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const toggle = async (t: Task) => {
    try {
      const { data } = await api.put<Task>(`/tasks/${t._id}`, { completed: !t.completed });
      setTasks((prev) => prev.map((x) => (x._id === data._id ? data : x)));
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const remove = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <div className="max-w-5xl mx-auto w-full space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2 block">Productivity</span>
          <h1 className="text-4xl font-extrabold text-on-surface font-headline tracking-tight">Task management</h1>
          <p className="text-on-surface-variant mt-2">Create, complete, and clear tasks synced with your dashboard.</p>
        </div>
      </header>

      {error && (
        <div className="rounded-2xl bg-error/10 text-error text-sm font-semibold px-4 py-3 border border-error/20">
          {error}
        </div>
      )}

      <section className="bg-surface-container-lowest rounded-[2rem] p-8 border border-outline-variant/10 shadow-sm">
        <h2 className="text-lg font-bold font-headline mb-4">New task</h2>
        <form onSubmit={addTask} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none md:col-span-2"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="md:col-span-2">
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-primary to-primary-container text-white font-bold rounded-full text-sm shadow-lg shadow-primary/20"
            >
              Add task
            </button>
          </div>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold font-headline">Your tasks</h2>
        {loading ? (
          <p className="text-on-surface-variant text-sm">Loading…</p>
        ) : tasks.length === 0 ? (
          <p className="text-on-surface-variant text-sm">No tasks yet. Add one above.</p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((t) => (
              <li
                key={t._id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 p-6 rounded-2xl bg-surface-container-lowest border border-transparent hover:border-primary/15 shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggle(t)}
                  className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border-2 ${
                    t.completed ? "bg-primary border-primary text-white" : "border-outline-variant text-transparent"
                  }`}
                  aria-label={t.completed ? "Mark incomplete" : "Mark complete"}
                >
                  <span className="material-symbols-outlined text-xl">check</span>
                </button>
                <div className="flex-1 min-w-0">
                  <p className={`font-bold ${t.completed ? "line-through text-on-surface-variant" : "text-on-surface"}`}>
                    {t.title}
                  </p>
                  {t.description ? (
                    <p className="text-sm text-on-surface-variant mt-1">{t.description}</p>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => remove(t._id)}
                  className="text-error text-sm font-bold hover:underline shrink-0"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
