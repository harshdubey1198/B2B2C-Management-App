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
    const data = await Category.find().populate("parentId")
    if(!data){
        throw new Error('There is no category')
    }
    return data
}

//  UPDATE CATEGORY
categoryServices.updateCategory = async (id, body) => {
    const {parentId} = body
    const existingCategory = await Category.findOne({_id:id})
    if(!existingCategory){
        throw new Error('Category does not exist')
    }
    if (parentId && parentId !== id) {
        const parentCategory = await Category.findById(parentId);
        if (!parentCategory) {
            throw new Error('Parent category does not exist');
        }
    }

    const updateCategory = await Category.findByIdAndUpdate(id, body, {new:true})
    return updateCategory
} 

module.exports = categoryServices;
