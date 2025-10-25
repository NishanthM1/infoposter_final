const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// GET all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single post by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create new post (with optional image upload)
router.post("/", [auth, upload.single("image")], async (req, res) => {
  try {
    console.log("Received post creation request.");
    console.log("Request body:", req.body);
    console.log("Authenticated user ID:", req.user.id);
    console.log("Uploaded file:", req.file);

    const { title, description, source, category, isDraft } = req.body;
    const newPost = new Post({
      title,
      description,
      source,
      category,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : undefined,
      isDraft: isDraft || false,
      user: req.user.id,
    });
    await newPost.save();

    // Add post to user's createdPosts
    const user = await User.findById(req.user.id);
    user.createdPosts.push(newPost._id);
    await user.save();

    console.log("Post saved successfully:", newPost);
    res.status(201).json(newPost);
  } catch (err) {
    console.error("Error creating post:", err); // Log the full error for debugging
    res.status(400).json({ message: err.message });
  }
});

// PATCH update post
router.patch("/:id", auth, async (req, res) => { // Added auth middleware
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Ensure user owns the post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPost);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// DELETE post
router.delete("/:id", auth, async (req, res) => { // Added auth middleware
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Ensure user owns the post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Delete image if it exists
    if (post.imageUrl) {
      const imagePath = path.join(__dirname, "..", post.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// @route   PUT api/posts/:id/save
// @desc    Save a post
// @access  Private
router.put("/:id/save", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.savedPosts.includes(req.params.id)) {
      return res.status(400).json({ msg: "Post already saved" });
    }
    user.savedPosts.push(req.params.id);
    await user.save();
    res.json(user.savedPosts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/posts/:id/save
// @desc    Unsave a post
// @access  Private
router.delete("/:id/save", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.savedPosts = user.savedPosts.filter(
      (postId) => postId.toString() !== req.params.id
    );
    await user.save();
    res.json(user.savedPosts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/posts/myposts
// @desc    Get all published posts by user
// @access  Private
router.get("/myposts", auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id, isDraft: false }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/posts/saved/posts
// @desc    Get all saved posts
// @access  Private
router.get("/saved/posts", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("savedPosts");
    res.json(user.savedPosts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/posts/mydrafts
// @desc    Get all draft posts by user
// @access  Private
router.get("/mydrafts", auth, async (req, res) => {
  try {
    const drafts = await Post.find({ user: req.user.id, isDraft: true }).sort({ createdAt: -1 });
    res.json(drafts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
