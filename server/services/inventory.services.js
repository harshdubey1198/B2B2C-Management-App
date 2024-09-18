const Variant = require('../schemas/variant.schema');
const Category = require('../schemas/category.schema');
const InventoryItem = require('../schemas/inventoryItem.schema');

let inventoryServices = {};

// CREATE INVENTORY ITEM WITH VARIANTS
inventoryServices.createItem = async (body) => {
    const { name, description, quantity, qtyType, supplier, manufacturer, brand, costPrice, sellingPrice, categoryId, subcategoryId } = body;

    const existingItem = await InventoryItem.findOne({name: name})
    if(existingItem) {
        throw new Error('Item already exists')
    }

    const category = await Category.findOne({_id: categoryId})
    if(!category){
        throw new Error('This category is not Available')
    }

    if(subcategoryId){
        const subcategory = await Category.findOne({_id: subcategoryId})
        console.log(subcategory, "subcategory")
        if (!subcategory || String(subcategory.parentId) !== String(categoryId)) {
            throw new Error('Invalid subcategory or subcategory does not belong to the parent category');
        }
    }

    const newItem = new InventoryItem({
        name,
        description,
        quantity,
        qtyType,
        supplier,
        manufacturer,
        brand,
        costPrice,
        sellingPrice,
        category,
        subcategory: subcategoryId || null
    });
    await newItem.save();
    return newItem;
};

// GET ALL INVENTORY ITEMS WITH VARIANTS
inventoryServices.getItems = async () => {
    const items = await InventoryItem.find().populate('categoryId').populate('subcategoryId');
    if(!items){
        throw new Error('No items found')
    }
    return items
};

// UPDATE INVENTORY ITEM
inventoryServices.updateItem = async (id, data) => {
    try {
        const updatedItem = await InventoryItem.findByIdAndUpdate(id, data, { new: true });

        // If there are variants to update, update them separately
        if (data.variants && data.variants.length > 0) {
            await Variant.deleteMany({ productId: id });  // Remove old variants
            const variants = data.variants.map(variant => ({
                ...variant,
                productId: id  // Link the variants to the product
            }));
            await Variant.insertMany(variants);
        }

        return updatedItem;
    } catch (err) {
        console.log("Error updating inventory item:", err);
        return Promise.reject("Error updating inventory item.");
    }
};

// DELETE INVENTORY ITEM
inventoryServices.deleteItem = async (id) => {
    try {
        // Delete the item
        const deletedItem = await InventoryItem.findByIdAndDelete(id);

        // Delete associated variants
        await Variant.deleteMany({ productId: id });

        return deletedItem;
    } catch (err) {
        console.log("Error deleting inventory item:", err);
        return Promise.reject("Error deleting inventory item.");
    }
};

module.exports = inventoryServices;
