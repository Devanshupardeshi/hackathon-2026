import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import ConfirmModal from "../components/ConfirmModal";
import PageHeader from "../components/PageHeader";
import api, { apiOrigin } from "../services/api";
import { useAuth } from "../context/AuthContext";

const CATEGORIES = ["Placement", "Projects", "Learning", "Clubs"];

const FeedPage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Projects");
  const [comment, setComment] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchPosts = useCallback(async () => {
    try {
      const { data } = await api.get("/posts");
      setPosts(data);
      setError("");
    } catch (e) {
      setError(e?.response?.data?.message || "Could not load feed");
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    if (!imageFile) {
      setImagePreview("");
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setImagePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const mediaUrl = useMemo(() => (path) => (path && path.startsWith("http") ? path : `${apiOrigin}${path}`), []);

  const createPost = async (e) => {
    e.preventDefault();
    const text = content.trim();
    if (!text && !imageFile) {
      setError("Add text or choose an image");
      return;
    }
    try {
      const fd = new FormData();
      fd.append("content", text);
      fd.append("category", category);
      if (imageFile) fd.append("image", imageFile);
      await api.post("/posts", fd);
      setContent("");
      setImageFile(null);
      await fetchPosts();
    } catch (err) {
      setError(err?.response?.data?.message || "Could not create post");
    }
  };

  const onLike = (id) => api.patch(`/posts/${id}/like`).then(fetchPosts);

  const onComment = (id) => {
    const text = comment[id]?.trim();
    if (!text) return;
    return api.post(`/posts/${id}/comment`, { text }).then(() => {
      setComment((c) => ({ ...c, [id]: "" }));
      fetchPosts();
    });
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    api.delete(`/posts/${deleteTarget}`).then(() => {
      setDeleteTarget(null);
      fetchPosts();
    });
  };

  const isLiked = (post) =>
    (post.likes || []).some((x) => String(x._id || x) === String(user?.id));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Collaboration feed"
        subtitle="Share builds, screenshots, placement questions, or learning goals."
      />
      {error && (
        <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-800">{error}</p>
      )}
      <Card title="New post" subtitle="Optional image — JPEG, PNG, GIF, or WebP up to gallery-size.">
        <form className="space-y-3" onSubmit={createPost}>
          <textarea
            className="input-field min-h-[100px] resize-y"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Say something… (optional if you attach an image)"
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-violet-300 bg-violet-50 px-4 py-3 text-sm font-medium text-violet-900 shadow-sm hover:bg-violet-100/80">
              <input
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                className="sr-only"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
              {imageFile ? imageFile.name : "Attach image"}
            </label>
            {imagePreview && (
              <img src={imagePreview} alt="" className="h-16 w-auto max-w-[120px] rounded-lg object-cover ring-2 ring-white shadow-md" />
            )}
            <select className="input-field sm:max-w-xs" value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <Button type="submit" className="sm:ml-auto">
              Publish
            </Button>
          </div>
        </form>
      </Card>

      <div className="space-y-4">
        {posts.map((p) => {
          const count = Array.isArray(p.likes) ? p.likes.length : 0;
          const liked = isLiked(p);
          return (
            <Card key={p._id} title={p.author?.name || "Member"} subtitle={`${p.category} · ${new Date(p.createdAt).toLocaleString()}`}>
              {p.content ? <p className="mb-4 text-slate-700">{p.content}</p> : null}
              {p.imageUrl ? (
                <div className="mb-4 overflow-hidden rounded-xl ring-1 ring-slate-200/80 shadow-md">
                  <img src={mediaUrl(p.imageUrl)} alt="" className="max-h-80 w-full object-cover" loading="lazy" />
                </div>
              ) : null}
              <div className="mb-4 flex flex-wrap gap-2">
                <Button type="button" variant={liked ? "primary" : "secondary"} onClick={() => onLike(p._id)}>
                  {liked ? "♥ Liked" : "♥ Like"} · {count}
                </Button>
                <Button type="button" variant="danger" onClick={() => setDeleteTarget(p._id)}>
                  Remove
                </Button>
              </div>
              <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm">
                {(p.comments || []).map((c) => (
                  <p key={c._id}>
                    <span className="font-semibold text-slate-800">{c.user?.name || "User"}</span>
                    <span className="text-slate-600"> {c.text}</span>
                  </p>
                ))}
                <div className="flex gap-2 pt-1">
                  <input
                    className="input-field flex-1 py-2 text-sm"
                    value={comment[p._id] || ""}
                    onChange={(e) => setComment((prev) => ({ ...prev, [p._id]: e.target.value }))}
                    placeholder="Write a comment"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    className="shrink-0 border border-slate-200"
                    onClick={() => onComment(p._id)}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
        {!posts.length && !error && <p className="text-center text-sm text-slate-500">No posts yet. Be the first to share.</p>}
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete this post?"
        message="This removes the post for everyone. You can’t undo this action."
        confirmLabel="Delete post"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default FeedPage;
