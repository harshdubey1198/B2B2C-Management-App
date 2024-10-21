const Variant = require('../schemas/variant.schema');
const Category = require('../schemas/category.schema');
const InventoryItem = require('../schemas/inventoryItem.schema');
const User = require('../schemas/user.schema');
const VariantMaster = require('../schemas/mastervariant.schema');
const Vendor = require('../schemas/vendor.schema');

let inventoryServices = {};


// CALCULATE STOCK FUNCTION FOR REUSABILITY
const calculateStock = (variants) => {
    console.log(variants, "varianst")
    return variants.reduce((sum, variant) => sum + (variant.stock || 0), 0 )
}

// CREATE INVENTORY ITEM WITH VARIANTS
inventoryServices.createItem = async (userId, body) => {
    const { name, description, quantity, qtyType, ProductHsn, supplier, manufacturer, vendorId, brand, costPrice, sellingPrice, categoryId, subcategoryId, variants } = body;

    const existingItem = await InventoryItem.findOne({ name, createdBy: userId });
    if (existingItem) {
        throw new Error('Item with this name already exists for this user');
    }

    const [user, category, vendor] = await Promise.all([
        User.findById(userId),
        Category.findById(categoryId),
        vendorId ? Vendor.findById(vendorId) : null 
    ]);

    if (!user) {
        throw new Error('User not found');
    }

    if (!category) {
        throw new Error('This category is not available');
    }

    if(subcategoryId){
        const subcategory = await Category.findOne({_id: subcategoryId})
        if (!subcategory || String(subcategory.parentId) !== String(categoryId)) {
            throw new Error('Invalid subcategory or subcategory does not belong to the parent category');
        }
    }

    if (vendorId && !vendor) {
        throw new Error('Vendor not found');
    }

    const totalStock = calculateStock(variants)
    const newItem = new InventoryItem({
        name,
        description,
        quantity: totalStock,
        qtyType,
        supplier,
        manufacturer,
        brand,
        costPrice,
        sellingPrice,
        categoryId,
        ProductHsn,
        vendor: vendor ? vendor._id : null, 
        createdBy: user._id,
        firmId: user.adminId,
        subcategoryId: subcategoryId || null,
        variants: variants || []
    });
    await newItem.save();
    return newItem;
};

// GET ALL INVENTORY ITEMS WITH VARIANTS
inventoryServices.getAllItems = async (adminId) => {
    const items = await InventoryItem.find({firmId:adminId, deleted_at: null})
    .populate('categoryId')
    .populate('subcategoryId')
    .populate({
        path: 'createdBy',
        select: "firstName lastName email"
    });
    if(!items){
        throw new Error('No items found')
    }
    return items
};

// GET SINGLE ITEM 
inventoryServices.getItem = async (id) => {
    const items = await InventoryItem.findOne({_id: id, deleted_at:null})
    .populate('categoryId')
    .populate('subcategoryId');
    if(!items){
        throw new Error('No items found')
    }
    return items
};

// UPDATE INVENTORY ITEM
inventoryServices.updateItem = async (id, body) => {
    const { name, description, quantity, qtyType, supplier, manufacturer, brand, costPrice, sellingPrice, categoryId, subcategoryId, variants } = body;
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

    let totalStock = existingItem.quantity;
    if(variants && variants.length > 0){
        for (const variant of variants){
            const {_id, price, optionLabel, stock, sku, barcode} = variant;
            await InventoryItem.updateOne(
            { _id:id, "variants._id": _id },
            {
                $set: {
                    "variants.$.price": price,
                    "variants.$.optionLabel": optionLabel,
                    "variants.$.stock": stock,
                    "variants.$.sku": sku,
                    "variants.$.barcode": barcode
                }
            }
            )
        }
    }
    const updateItem = await InventoryItem.findById(id);
    totalStock = calculateStock(updateItem.variants);
    const updatedItem = await InventoryItem.findByIdAndUpdate(
        id,
        {   name,
            description,
            quantity: totalStock,
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
    const existingItem = await InventoryItem.findOne({ _id: id, deleted_at: null }); 
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

// DELETE VARIANTS FROM EXISTING ITEM
inventoryServices.deleteVariant = async (itemId, variantId) => {
    const item = await InventoryItem.findById(itemId);
    if (!item){
        throw new Error('Item not found');
    } 
    item.variants.pull({_id: variantId});
    item.quantity = calculateStock(item.variants);
    const updatedItem = await item.save();

    return updatedItem;
};

// ADD VARINST TO THE EXISTING ITEM AND ARRAY
inventoryServices.addVariant = async (itemId, variant) => {
    const existingItem = await InventoryItem.findOne({_id: itemId})
    if (!existingItem) {
        throw new Error('Inventory item not found');
    }

    const existingVariant = existingItem.variants.some(
        (existingVariant) => existingVariant.sku === variant.sku && existingVariant.barcode === variant.barcode
    )
    if (existingVariant) {
        throw new Error('Variant already exist')
    }    

    existingItem.variants.push(variant)
    existingItem.quantity = calculateStock(existingItem.variants)
    const updatedItem = await existingItem.save()
    return updatedItem 
}
// // GET CATEGORY VARIANTS
// inventoryServices.getCategoryVariants = async (categoryId) => {
//     const category = await Category.findOne({_id: categoryId})
//     if (!category) {
//         return []
//     }

//     const variants = await VariantMaster.find({categories: categoryId})
//     return variants.length > 0 ? variants : []
// }

// //  CREATE VARIANT BASED ON CATEGORY
// // Create or Update a Variant for Multiple Categories
// inventoryServices.createCategoryVariants = async (variantData) => {
//     try {
//         const { variantType, optionLabel, categoryId } = variantData;
//         console.log(categoryId)
//         let variant = await VariantMaster.findOne({ variantType });
//         if (variant) {
//             if (!variant.options.some(option => option.label === optionLabel)) {
//                 variant.options.push({ label: optionLabel });
//             }

//             // Add the new categories if they are not already linked
//             if (!variant.categories.includes(categoryId)) {
//                 variant.categories.push(categoryId);
//             }
//         } else {
//             variant = new VariantMaster({
//                 variantType,
//                 options: [{ label: optionLabel }],
//                 categories: categoryId
//             });
//         }
//         await variant.save();
//         return variant;
//     } catch (error) {
//         console.error('Error creating/updating variant:', error);
//         throw new Error('Error creating/updating variant');
//     }
// };


module.exports = inventoryServices;
