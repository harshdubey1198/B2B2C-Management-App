const Category = require("../schemas/category.schema");

const categoryServices = {};

// CREATE CATEGORY
categoryServices.createCategory = async (body) => {
    const { categoryName, parentId } = body;
    if (!categoryName) {
        throw new Error('Category name is required');
    }
    const existingCategory = await Category.findOne({ categoryName });
    if (existingCategory) {
        throw new Error('Category with this name already exists');
    }
    if (parentId) {
        const parentCategory = await Category.findById(parentId);
        if (!parentCategory) {
            throw new Error('Parent category does not exist');
        }
    }
    const newCategory = new Category({
        categoryName,
        parentId: parentId || null
    });
    await newCategory.save();
    return newCategory;
};


// GET CATEGORY
categoryServices.getCategory = async () => {

}
module.exports = categoryServices;
