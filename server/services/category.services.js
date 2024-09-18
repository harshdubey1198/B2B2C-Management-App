const Category = require("../schemas/category.schema");

let categoryServices = {}

categoryServices.createCategory = async (body) => {
    try {
        const { categoryName, parentId } = body;
        if (!categoryName) {
            throw new Error('Category name is required');
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
    } catch (error) {
        throw new Error(`Error creating category: ${error.message}`);
    }
} 

module.exports = categoryServices