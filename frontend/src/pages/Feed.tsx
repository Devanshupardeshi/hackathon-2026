import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api, assetUrl, getErrorMessage } from "../services/api";
import type { Post, PostCategory } from "../types/models";

const categories: PostCategory[] = ["Placement", "Projects", "Learning", "Clubs"];

function authorId(author: Post["author"]): string {
  if (author && typeof author === "object" && "_id" in author) return String(author._id);
  return String(author);
}

function authorName(author: Post["author"]): string {
  if (author && typeof author === "object" && "name" in author) return author.name;
  return "Member";
}

function likeIds(likes: Post["likes"]): string[] {
  return (likes || []).map((l) => (typeof l === "string" ? l : String(l._id)));
}

export default function Feed() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<PostCategory | "All">("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<PostCategory>("Projects");
  const [image, setImage] = useState<File | null>(null);
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});
  const [menuPost, setMenuPost] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Post | null>(null);

  const load = useCallback(async () => {
    setError("");
    try {
      const { data } = await api.get<Post[]>("/posts");
      setPosts(data);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const visible = useMemo(() => {
    if (filter === "All") return posts;
    return posts.filter((p) => p.category === filter);
  }, [posts, filter]);

  const submitPost = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    const fd = new FormData();
    fd.append("content", content.trim());
    fd.append("category", category);
    if (image) fd.append("image", image);
    try {
      const { data } = await api.post<Post>("/posts", fd);
      setPosts((prev) => [data, ...prev]);
      setContent("");
      setImage(null);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const toggleLike = async (post: Post) => {
    try {
      const { data } = await api.patch<Post>(`/posts/${post._id}/like`);
      setPosts((prev) => prev.map((p) => (p._id === data._id ? data : p)));
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const addComment = async (postId: string) => {
    const text = (commentDrafts[postId] || "").trim();
    if (!text) return;
    setError("");
    try {
      const { data } = await api.post<Post>(`/posts/${postId}/comment`, { text });
      setPosts((prev) => prev.map((p) => (p._id === data._id ? data : p)));
      setCommentDrafts((d) => ({ ...d, [postId]: "" }));
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setError("");
    try {
      await api.delete(`/posts/${deleteTarget._id}`);
      setPosts((prev) => prev.filter((p) => p._id !== deleteTarget._id));
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setDeleteTarget(null);
    }
  };

  const canDelete = (post: Post) => {
    const aid = authorId(post.author);
    return user && (aid === user.id || user.role === "admin");
  };

  const isLiked = (post: Post) => user && likeIds(post.likes).includes(user.id);

  return (
    <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
      {deleteTarget && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div className="bg-surface-container-lowest rounded-2xl p-6 max-w-md w-full shadow-xl space-y-4">
            <h3 className="font-bold text-lg">Delete this post?</h3>
            <p className="text-sm text-on-surface-variant">This cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="px-4 py-2 rounded-full text-sm font-bold text-on-surface-variant"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-full text-sm font-bold bg-error text-white"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="lg:col-span-8 space-y-6">
        <section className="bg-surface-container-lowest rounded-xl p-6 transition-all shadow-sm">
          <form onSubmit={submitPost}>
            <div className="flex gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-black shrink-0">
                {user?.name?.charAt(0).toUpperCase() ?? "?"}
              </div>
              <textarea
                className="flex-1 min-h-[88px] px-6 py-3 bg-surface-container-low rounded-2xl text-on-surface text-sm outline-none focus:ring-2 focus:ring-primary/20 resize-y"
                placeholder="Start a collaboration or share a learning win…"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-3 items-center mb-4">
              <label className="text-xs font-bold text-on-surface-variant uppercase">Category</label>
              <select
                className="bg-surface-container-low rounded-full px-4 py-2 text-sm font-semibold outline-none"
                value={category}
                onChange={(e) => setCategory(e.target.value as PostCategory)}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <label className="inline-flex items-center gap-2 text-sm font-medium cursor-pointer">
                <span className="material-symbols-outlined text-secondary text-lg">image</span>
                <span>Image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                />
              </label>
              {image ? <span className="text-xs text-on-surface-variant truncate max-w-[180px]">{image.name}</span> : null}
            </div>
            {error && (
              <p className="text-error text-sm font-semibold mb-3">{error}</p>
            )}
            <div className="flex items-center justify-end pt-4 border-t border-surface-container-low">
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dim text-white px-6 py-2 rounded-full font-bold text-sm transition-all shadow-lg shadow-primary/10"
              >
                Post
              </button>
            </div>
          </form>
        </section>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {(["All", ...categories] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={`whitespace-nowrap px-6 py-2 rounded-full font-bold text-sm transition-all shadow-sm ${
                filter === key
                  ? "bg-primary text-white"
                  : "bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high font-medium"
              }`}
            >
              {key === "All" ? "All feed" : key}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {loading ? (
            <p className="text-on-surface-variant text-sm">Loading feed…</p>
          ) : visible.length === 0 ? (
            <p className="text-on-surface-variant text-sm">No posts yet. Be the first to share.</p>
          ) : (
            visible.map((post) => (
              <article
                key={post._id}
                className="bg-surface-container-lowest rounded-xl overflow-hidden transition-all group shadow-sm border border-transparent hover:border-primary/20"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center font-bold text-primary shrink-0">
                        {authorName(post.author).charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-headline font-bold text-on-surface leading-none truncate">
                            {authorName(post.author)}
                          </h3>
                          {typeof post.author === "object" && post.author?.role === "admin" ? (
                            <span className="shrink-0 px-2 py-0.5 rounded-md bg-primary/15 text-primary text-[10px] font-black uppercase tracking-wide">
                              Admin
                            </span>
                          ) : null}
                        </div>
                        <p className="text-xs text-on-surface-variant">
                          {new Date(post.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="relative shrink-0">
                      <button
                        type="button"
                        className="text-outline hover:text-on-surface transition-colors"
                        onClick={() => setMenuPost((id) => (id === post._id ? null : post._id))}
                        aria-label="Post menu"
                      >
                        <span className="material-symbols-outlined">more_horiz</span>
                      </button>
                      {menuPost === post._id && canDelete(post) && (
                        <div className="absolute right-0 mt-1 bg-surface-container-lowest border border-outline-variant/20 rounded-xl shadow-lg py-1 z-10 min-w-[140px]">
                          <button
                            type="button"
                            className="w-full text-left px-4 py-2 text-sm font-bold text-error hover:bg-error/5"
                            onClick={() => {
                              setDeleteTarget(post);
                              setMenuPost(null);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  {post.content ? (
                    <p className="text-on-surface font-body mb-4 leading-relaxed whitespace-pre-wrap">{post.content}</p>
                  ) : null}
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-bold uppercase rounded-full tracking-wide">
                      {post.category}
                    </span>
                  </div>
                </div>
                {post.imageUrl ? (
                  <div className="h-64 w-full relative bg-surface-container-low">
                    <img
                      alt=""
                      className="w-full h-full object-cover"
                      src={assetUrl(post.imageUrl)}
                    />
                  </div>
                ) : null}
                <div className="px-6 py-4 flex flex-col gap-4 border-t border-surface-container-low bg-surface-container-lowest">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex gap-6">
                      <button
                        type="button"
                        onClick={() => toggleLike(post)}
                        className={`flex items-center gap-2 transition-colors ${
                          isLiked(post) ? "text-primary" : "text-on-surface-variant hover:text-primary"
                        }`}
                      >
                        <span
                          className="material-symbols-outlined text-xl"
                          style={isLiked(post) ? { fontVariationSettings: "'FILL' 1" } : undefined}
                        >
                          favorite
                        </span>
                        <span className="text-sm font-medium">{post.likes?.length ?? 0}</span>
                      </button>
                      <span className="flex items-center gap-2 text-on-surface-variant">
                        <span className="material-symbols-outlined text-xl">chat_bubble</span>
                        <span className="text-sm font-medium">{post.comments?.length ?? 0}</span>
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {(post.comments || []).map((c) => (
                      <div key={c._id} className="text-sm bg-surface-container-low rounded-xl px-3 py-2">
                        <span className="font-bold">{authorName(c.user)}:</span>{" "}
                        <span className="text-on-surface-variant">{c.text}</span>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <input
                        className="flex-1 bg-surface-container-low rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Write a comment…"
                        value={commentDrafts[post._id] || ""}
                        onChange={(e) =>
                          setCommentDrafts((d) => ({ ...d, [post._id]: e.target.value }))
                        }
                      />
                      <button
                        type="button"
                        onClick={() => addComment(post._id)}
                        className="px-4 py-2 rounded-full bg-primary text-white text-sm font-bold"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>

      <div className="hidden lg:block lg:col-span-4 space-y-6">
        <section className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-[0px_24px_48px_rgba(44,47,49,0.06)] border border-white/20 sticky top-24">
          <div className="mb-6">
            <span className="text-xs uppercase tracking-widest text-[#702ae1] font-bold">AI insights</span>
            <h2 className="text-xl font-headline font-extrabold text-on-surface mt-1">CampusFlow</h2>
            <p className="text-xs text-on-surface-variant mt-2">Use the assistant for summaries, ideas, and resume feedback.</p>
          </div>
          <Link
            to="/ai-assistant"
            className="w-full block text-center py-3 bg-tertiary text-white font-bold rounded-xl text-sm transition-all hover:opacity-90 shadow-lg shadow-tertiary/20"
          >
            Open AI assistant
          </Link>
        </section>

        <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
          <h3 className="font-headline font-bold text-lg mb-4">Categories</h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Posts are organized as <strong>Placement</strong>, <strong>Projects</strong>, <strong>Learning</strong>, and{" "}
            <strong>Clubs</strong> so your feed stays scannable.
          </p>
        </section>

        <section className="bg-surface-container-low rounded-xl overflow-hidden">
          <div className="h-20 bg-gradient-to-r from-primary to-primary-container relative" />
          <div className="pt-6 pb-6 px-6">
            <h3 className="font-headline font-bold text-on-surface">{user?.name}</h3>
            <p className="text-xs text-on-surface-variant capitalize">{user?.role}</p>
            <div className="mt-6 flex justify-between border-t border-surface-container-high pt-4">
              <Link to="/tasks" className="text-center flex-1 hover:text-primary">
                <p className="text-sm font-bold">Tasks</p>
                <p className="text-[10px] text-on-surface-variant uppercase">Manage</p>
              </Link>
              <Link to="/placements" className="text-center flex-1 hover:text-primary">
                <p className="text-sm font-bold">Placements</p>
                <p className="text-[10px] text-on-surface-variant uppercase">Apply</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
