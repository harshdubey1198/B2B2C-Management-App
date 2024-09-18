const InventoryItem = require('../schemas/inventory.schema');
const Variant = require('../schemas/variant.schema');

let InventoryServices = {};

// CREATE INVENTORY ITEM WITH VARIANTS
InventoryServices.createItem = async (data) => {
    const session = await InventoryItem.startSession();
    session.startTransaction();

    try {
        // First, create the Inventory Item
        const newItem = await InventoryItem.create([data], { session });

        // Now create variants if they exist in the request data
        if (data.variants && data.variants.length > 0) {
            const variants = data.variants.map(variant => ({
                ...variant,
                productId: newItem[0]._id  // Link the variant to the newly created product
            }));

            await Variant.insertMany(variants, { session });
        }

        await session.commitTransaction();
        session.endSession();

        return newItem;
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.log("Error creating inventory item:", err);
        return Promise.reject("Error creating inventory item. Try again later.");
    }
};

// GET ALL INVENTORY ITEMS WITH VARIANTS
InventoryServices.getItems = async () => {
    try {
        const items = await InventoryItem.find().populate('categoryId').populate('subcategoryId');
        const itemsWithVariants = await Promise.all(items.map(async (item) => {
            const variants = await Variant.find({ productId: item._id });
            return { ...item.toObject(), variants };
        }));
        return itemsWithVariants;
    } catch (err) {
        console.log("Error fetching inventory items:", err);
        return Promise.reject("Error fetching inventory items.");
    }
};

// UPDATE INVENTORY ITEM
InventoryServices.updateItem = async (id, data) => {
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
InventoryServices.deleteItem = async (id) => {
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

module.exports = InventoryServices;
