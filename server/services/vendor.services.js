const User = require("../schemas/user.schema");
const Vendor = require("../schemas/vendor.schema");

const VendorServices = {};

// CREATE CATEGORY
VendorServices.createVendor = async (userId, body) => {
    const user = await User.findOne({_id: userId})
    if (!user) {
        throw new Error('User not found')
    } 
    const { name, contactPerson, phone, email, address } = body;

    const existingVendor = await Vendor.findOne({ name, email, firmId: user.adminId });
    if (existingVendor) {
        throw new Error('Vendor with this name and email already exists');
    }

    // Create new vendor
    const newVendor = new Vendor({
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

module.exports = VendorServices;
