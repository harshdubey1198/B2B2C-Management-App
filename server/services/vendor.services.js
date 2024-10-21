const User = require("../schemas/user.schema");
const Vendor = require("../schemas/vendor.schema");

const VendorServices = {};

// CREATE VENDOR
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

// GET VENDOR
VendorServices.getVendors = async (adminId) => {
    const data = await Vendor.find({firmId: adminId, deleted_at: null})
    if(!data){
        throw new Error('There is no Vendors for this Firms.')
    }
    return data
}

module.exports = VendorServices;
