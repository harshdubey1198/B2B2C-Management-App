const Variant = require('../schemas/variant.schema');
const Category = require('../schemas/category.schema');
const InventoryItem = require('../schemas/inventoryItem.schema');

let inventoryServices = {};

// CREATE INVENTORY ITEM WITH VARIANTS
inventoryServices.createItem = async (body) => {
    const { name, description, quantity, qtyType, supplier, manufacturer, brand, costPrice, sellingPrice, categoryId, subcategoryId, variants } = body;

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
        categoryId,
        subcategoryId: subcategoryId || null,
        variants: variants || []
    });
    await newItem.save();
    return newItem;
};

// GET ALL INVENTORY ITEMS WITH VARIANTS
inventoryServices.getAllItems = async () => {
    const items = await InventoryItem.find().populate('categoryId').populate('subcategoryId');
    if(!items){
        throw new Error('No items found')
    }
    return items
};

// GET SINGLE ITEM 
inventoryServices.getItem = async (id) => {
    const items = await InventoryItem.findOne({_id: id}).populate('categoryId').populate('subcategoryId');
    if(!items){
        throw new Error('No items found')
    }
    return items
};

// UPDATE INVENTORY ITEM
inventoryServices.updateItem = async (id, body) => {
    const { name, description, quantity, qtyType, supplier, manufacturer, brand, costPrice, sellingPrice, categoryId, subcategoryId } = body;
    const existingItem = await InventoryItem.findById(id);
    if (!existingItem) {
        throw new Error('Inventory item not found');
    }

    if(categoryId){
        const category = await Category.findOne({_id: categoryId})
        if(!category){
            throw new Error('This category is not Available')
        }
    }

    if(subcategoryId){
        const subcategory = await Category.findOne({_id: subcategoryId})
        if (!subcategory || String(subcategory.parentId) !== String(existingItem.categoryId)) {
            throw new Error('Invalid subcategory or subcategory does not belong to the parent category');
        }
    }

    const updatedItem = await InventoryItem.findByIdAndUpdate(
        id,
        {
            name,
            description,
            quantity,
            qtyType,
            supplier,
            manufacturer,
            brand,
            costPrice,
            sellingPrice,
            categoryId,
            subcategoryId: subcategoryId || null 
        },
        { new: true } 
    );
    return updatedItem;
};

// DELETE INVENTORY ITEM
inventoryServices.deleteItem = async (id) => {
    const existingItem = await InventoryItem.findOne({_id: id})
    if (!existingItem) {
        throw new Error('Inventory item not found');
    }

    const deletedItem = await InventoryItem.findByIdAndUpdate(
        id,
        {deleted_at: Date.now()},
        {new: true}
    )
    return deletedItem
};

module.exports = inventoryServices;
