const BlogCategory = require("../schemas/blogcategory.schema");
const slugify = require("slugify");

const BlogCategoryServices = {};

// CREATE BLOG CATEGORY
BlogCategoryServices.createBlogCategory = async (userId, body) => {
    const { categoryName, parentId, description } = body;

    if (!categoryName) {
        throw new Error('Category name is required');
    }
    const slug = slugify(categoryName, { lower: true, strict: true });
    const existingCategory = await BlogCategory.findOne({ categoryName });
    if (existingCategory) {
        throw new Error(`Blog category "${categoryName}" already exists`);
    }

    if (parentId) {
        const parentCategory = await BlogCategory.findById(parentId);
        if (!parentCategory) {
            throw new Error('Parent category does not exist');
        }
    }

    const newBlogCategory = new BlogCategory({
        categoryName,
        slug,
        description,
        parentId: parentId || null,
        createdBy: userId
    });
    await newBlogCategory.save();
    return newBlogCategory;
};

// GET ALL BLOG CATEGORIES
BlogCategoryServices.getBlogCategories = async () => {
    const data = await BlogCategory.find({ deleted_at: null }).populate("parentId");
    if (data.length === 0) {
        throw new Error('No blog categories found');
    }
    return data;
};

// GET SINGLE BLOG CATEGORY BY ID
BlogCategoryServices.getBlogCategoryById = async (categoryId) => {
    const data = await BlogCategory.findOne({ _id: categoryId, deleted_at: null }).populate("parentId");
    if (!data) {
        throw new Error('Blog category not found');
    }
    return data;
};

// UPDATE BLOG CATEGORY
BlogCategoryServices.updateBlogCategory = async (id, body) => {
    const existingCategory = await BlogCategory.findOne({ _id: id, deleted_at: null });
    if (!existingCategory) {
        throw new Error('Blog category does not exist');
    }

    if (body.categoryName) {
        body.slug = slugify(body.categoryName, { lower: true, strict: true });
    }

    const updatedCategory = await BlogCategory.findByIdAndUpdate(id, body, { new: true });
    return updatedCategory;
};

// DELETE BLOG CATEGORY
BlogCategoryServices.deleteBlogCategory = async (categoryId) => {
    const existingCategory = await BlogCategory.findOne({ _id: categoryId, deleted_at: null });
    if (!existingCategory) {
        throw new Error('Blog category does not exist');
    }

    const deletedCategory = await BlogCategory.findOneAndUpdate(
        { _id: categoryId },
        { deleted_at: new Date() },
        { new: true }
    );
    if (!deletedCategory) {
        throw new Error('Unable to delete blog category');
    }
    return deletedCategory;
};
// BlogCategoryServices.deleteBlogCategory = async (categoryId) => {
//     const parentCategory = await BlogCategory.findOne({ _id: categoryId, deleted_at: null });
//     if (!parentCategory) {
//         throw new Error('Parent category does not exist');
//     }

//     // Soft delete parent
//     parentCategory.deleted_at = new Date();
//     await parentCategory.save();

//     // Soft delete children
//     await BlogCategory.updateMany({ parentId: categoryId }, { deleted_at: new Date() });

//     return parentCategory;
// };

module.exports = BlogCategoryServices;