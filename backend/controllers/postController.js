import Post from "../models/Post.js";

const populatePost = (query) =>
  query
    .populate("author", "name role")
    .populate("likes", "name")
    .populate("comments.user", "name");

export const getPosts = async (_req, res) => {
  const posts = await populatePost(Post.find().sort({ createdAt: -1 }));
  res.json(posts);
};

export const createPost = async (req, res) => {
  try {
    const { content, category } = req.body;
    if (!category) return res.status(400).json({ message: "Category required" });
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";
    const text = String(content || "").trim();
    if (!text && !imageUrl) {
      return res.status(400).json({ message: "Add text or an image" });
    }
    const post = await Post.create({
      author: req.user._id,
      content: text,
      category,
      imageUrl: imageUrl || undefined
    });
    const full = await populatePost(Post.findById(post._id));
    res.status(201).json(full);
  } catch (err) {
    res.status(400).json({ message: err.message || "Could not create post" });
  }
};

export const likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  const uid = req.user._id;
  const liked = post.likes.some((id) => id.equals(uid));
  const op = liked ? { $pull: { likes: uid } } : { $addToSet: { likes: uid } };
  await Post.updateOne({ _id: post._id }, op);

  const updated = await populatePost(Post.findById(post._id));
  res.json(updated);
};

export const addComment = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  post.comments.push({ user: req.user._id, text: req.body.text });
  await post.save();
  const updated = await populatePost(Post.findById(post._id));
  res.json(updated);
};

export const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  const isOwner = post.author.toString() === req.user._id.toString();
  if (!isOwner && req.user.role !== "admin") {
    return res.status(403).json({ message: "Not allowed" });
  }
  await post.deleteOne();
  res.json({ message: "Post removed" });
};
