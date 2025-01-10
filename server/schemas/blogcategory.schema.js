const mongoose = require('mongoose');

const blogCategorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true},
    slug: { type: String, required: true, unique: false,},
    status: { type: String, enum: ["active", "inactive"], default: "active",},
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: "BlogCategory", default: null,},
    deleted_at: { type: Date, default: null }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const BlogCategory = mongoose.model('BlogCategory', blogCategorySchema);
module.exports = BlogCategory;