const Category = require("../schemas/category.schema");
const User = require("../schemas/user.schema");

const categoryServices = {};

// CREATE CATEGORY
categoryServices.createCategory = async (userId, body) => {
    const { categoryName, parentId , description } = body;
    if (!categoryName) {
        throw new Error('Category name is required');
    }
    const user = await User.findOne({_id: userId})
    if (!user) {
        throw new Error('User not found')
    } 
    const existingCategory = await Category.findOne({ categoryName, firmId: user.adminId });
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
        description,
        parentId: parentId || null,
        createdBy: user._id,
        firmId: user.adminId
    });
    await newCategory.save();
    return newCategory;
};

// GET CATEGORY
categoryServices.getCategory = async (adminId) => {
    const data = await Category.find({firmId: adminId}).populate("parentId")
    if(!data){
        throw new Error('There is no category')
    }
    return data
}

// GET SUB CATEGORY
categoryServices.getSubcategories = async (id) => {
    try {
        // Find subcategories that have the provided parentId
        const subcategories = await Category.find({ parentId: id });
        if (subcategories.length === 0) {
            throw new Error('No subcategories found');
        }
        return subcategories;
    } catch (error) {
        throw new Error(`Error fetching subcategories: ${error.message}`);
    }
};  

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

// DELETE CATEGORY
categoryServices.deleteCategory = async (id) => {
    const existingCategory = await Category.findById(id);
    if (!existingCategory) {
        throw new Error('Category does not exist')
    }

    const subcategory = await Category.find({parentId: id})
    if(subcategory.length > 0){
        throw new Error('Cannot delete category with subcategories. Delete or reassign subcategories first.');
    }

    const deletedCategory = await Category.findByIdAndUpdate(
        id,
        { deleted_at: new Date() },  // Set `deleted_at` to the current date (soft delete)
        { new: true } 
    );
    if (!deletedCategory) {
        throw new Error("Unable to find category");
    }
    return deletedCategory;
}

module.exports = categoryServices;
