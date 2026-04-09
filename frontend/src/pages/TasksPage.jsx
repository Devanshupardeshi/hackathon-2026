import { useEffect, useState } from "react";
import Card from "../components/Card";
import api from "../services/api";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const load = () => api.get("/tasks").then((res) => setTasks(res.data));
  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-4">
      <Card title="Create Task">
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            api.post("/tasks", { title }).then(() => { setTitle(""); load(); });
          }}
        >
          <input className="border rounded p-2 flex-1" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Add a task" />
          <button className="bg-indigo-600 text-white px-4 rounded">Add</button>
        </form>
      </Card>
      <Card title="My Tasks">
        {tasks.map((task) => (
          <div key={task._id} className="flex justify-between items-center border-b py-2">
            <span className={task.completed ? "line-through text-slate-500" : ""}>{task.title}</span>
            <div className="space-x-2">
              <button className="px-3 py-1 bg-emerald-100 rounded" onClick={() => api.put(`/tasks/${task._id}`, { completed: !task.completed }).then(load)}>
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button className="px-3 py-1 bg-rose-100 rounded" onClick={() => api.delete(`/tasks/${task._id}`).then(load)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default TasksPage;
