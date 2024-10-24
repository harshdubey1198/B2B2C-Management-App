const Brand = require("../schemas/brand.schema");
const User = require("../schemas/user.schema");

const BrandServices = {};

// CREATE VENDOR
BrandServices.createBrand = async (userId, body) => {
    const user = await User.findOne({_id: userId})
    if (!user) {
        throw new Error('User not found')
    } 
    const { name, description, website, country, manufacturerId } = body;

    const existingVendor = await Brand.findOne({ name, firmId: user.adminId });
    if (existingVendor) {
        throw new Error('Brand with this name already exists');
    }

    // Create new vendor
    const newBrand = new Brand({
        name,
        description,
        website,
        country,
        manufacturer: manufacturerId,
        createdBy: user._id,
        firmId: user.adminId
    });

    await newBrand.save();
    return newBrand;
};

module.exports = BrandServices