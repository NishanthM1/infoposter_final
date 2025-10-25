const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String },
  source: { type: String },
  category: { type: String, index: true },
  imageUrl: { type: String },
  isDraft: { type: Boolean, default: false }, // New field to distinguish drafts
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", PostSchema);
