import { useCallback, useEffect, useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import ConfirmModal from "../components/ConfirmModal";
import PageHeader from "../components/PageHeader";
import api from "../services/api";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const load = useCallback(() => api.get("/tasks").then((res) => setTasks(res.data)), []);

  useEffect(() => {
    load();
  }, [load]);

  const confirmDelete = () => {
    if (!deleteId) return;
    api.delete(`/tasks/${deleteId}`).then(() => {
      setDeleteId(null);
      load();
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Tasks" subtitle="Capture work, check it off, keep momentum." />
      <Card title="Add task">
        <form
          className="flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            if (!title.trim()) return;
            api.post("/tasks", { title: title.trim() }).then(() => {
              setTitle("");
              load();
            });
          }}
        >
          <input
            className="input-field flex-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs done?"
          />
          <Button type="submit" className="sm:w-auto">
            Add
          </Button>
        </form>
      </Card>
      <Card title="In progress" subtitle={`${tasks.filter((t) => !t.completed).length} open`}>
        {tasks.length ? (
          <ul className="divide-y divide-slate-100">
            {tasks.map((task) => (
              <li key={task._id} className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
                <span className={`text-sm ${task.completed ? "text-slate-400 line-through" : "font-medium text-slate-800"}`}>
                  {task.title}
                </span>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => api.put(`/tasks/${task._id}`, { completed: !task.completed }).then(load)}
                  >
                    {task.completed ? "Reopen" : "Done"}
                  </Button>
                  <Button type="button" variant="danger" onClick={() => setDeleteId(task._id)}>
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-500">No tasks yet. Add one above.</p>
        )}
      </Card>

      <ConfirmModal
        open={!!deleteId}
        title="Delete task?"
        message="Remove this task from your list permanently."
        confirmLabel="Delete task"
        onCancel={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default TasksPage;
