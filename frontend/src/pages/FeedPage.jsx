import { useEffect, useState } from "react";
import Card from "../components/Card";
import api from "../services/api";

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Projects");
  const [comment, setComment] = useState({});

  const fetchPosts = async () => {
    const { data } = await api.get("/posts");
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async (e) => {
    e.preventDefault();
    await api.post("/posts", { content, category });
    setContent("");
    fetchPosts();
  };

  return (
    <div className="space-y-4">
      <Card title="Create Collaboration Post">
        <form className="space-y-2" onSubmit={createPost}>
          <textarea className="w-full border rounded-lg p-3" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Share a project, placement query, or learning request..." />
          <select className="border rounded-lg p-2" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Placement</option><option>Projects</option><option>Learning</option><option>Clubs</option>
          </select>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">Post</button>
        </form>
      </Card>
      {posts.map((p) => (
        <Card key={p._id} title={`${p.author?.name || "User"} • ${p.category}`}>
          <p className="mb-3">{p.content}</p>
          <div className="flex gap-2 mb-2">
            <button className="px-3 py-1 bg-slate-100 rounded" onClick={() => api.patch(`/posts/${p._id}/like`).then(fetchPosts)}>
              Like ({p.likes.length})
            </button>
            <button className="px-3 py-1 bg-rose-100 rounded" onClick={() => api.delete(`/posts/${p._id}`).then(fetchPosts)}>
              Delete
            </button>
          </div>
          <div className="space-y-1 text-sm">
            {p.comments.map((c) => <p key={c._id}><b>{c.user?.name || "User"}:</b> {c.text}</p>)}
          </div>
          <div className="mt-2 flex gap-2">
            <input
              className="border rounded p-2 flex-1"
              value={comment[p._id] || ""}
              onChange={(e) => setComment({ ...comment, [p._id]: e.target.value })}
              placeholder="Add comment"
            />
            <button
              className="bg-slate-800 text-white px-3 rounded"
              onClick={() => api.post(`/posts/${p._id}/comment`, { text: comment[p._id] || "" }).then(fetchPosts)}
            >
              Send
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default FeedPage;
