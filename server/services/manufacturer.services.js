const Manufacturer = require("../schemas/manufacturer.schema");
const User = require("../schemas/user.schema");

const ManufacturerServices = {};

// CREATE VENDOR
ManufacturerServices.createManufacturer = async (userId, body) => {
    const user = await User.findOne({_id: userId})
    if (!user) {
        throw new Error('User not found')
    } 
    const { name, contactPerson, phone, email, address } = body;

    const existingVendor = await Manufacturer.findOne({ name, email, firmId: user.adminId });
    if (existingVendor) {
        throw new Error('Manufacturer with this name and email already exists');
    }

    // Create new vendor
    const newVendor = new Manufacturer({
        name,
        contactPerson,
        phone,
        email,
        address,
        createdBy: user._id,
        firmId: user.adminId
    });

    await newVendor.save();
    return newVendor;
};