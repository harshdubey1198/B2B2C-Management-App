const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  short_description: {
    type: String,
    required: true,
  },
  main_description: {
    type: String,
    required: true,
  },
  blogImage: {
    type: String,
    required: true,
  },
  // blogtype: {
  //   type: String,
  //   enum: ['text', 'video', 'reel'],
  //   required: true,
  // },
  // article: {
  //   type: Boolean,
  //   default: false,
  // },
  // trending: {
  //   type: Boolean,
  //   default: false,
  // },
  // news: {
  //   type: Boolean,
  //   default: false,
  // },
  // latest: {
  //   type: Boolean,
  //   default: false,
  // },
  // order: {
  //   type: Number,
  //   default: null,
  // },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  scheduleToPublish: {
    type: Date,
    default: null,
  },
  blogStatus: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft',
  },
  blog_slug: {
    type: String,
    unique: true,
    sparse: true, 
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BlogCategory',
    default: null,
  },
  subcategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BlogCategory',
    default: null,
  },
  blog_tags: {
    type: [String],
    default: [],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  deleted_at: { type: Date, default: null }
}, { timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;