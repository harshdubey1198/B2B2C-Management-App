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
    const newManufacturer = new Manufacturer({
        name,
        contactPerson,
        phone,
        email,
        address,
        createdBy: user._id,
        firmId: user.adminId
    });

    await newManufacturer.save();
    return newManufacturer;
};

ManufacturerServices.getManufacturers = async (firmId) => {
    const data = await Manufacturer.find({firmId: firmId, deleted_at: null})
    if(data.length === 0){
        throw new Error('No Manufacturer found for these firms')
    }
    return data
}

ManufacturerServices.getManufacturerById = async (manufacturerId) => {
    const data = await Manufacturer.findOne({_id: manufacturerId, deleted_at: null})
    if(!data){
        throw new Error('No Manufacturer found')
    }
    return data
}

// UPDATE VENDOR
ManufacturerServices.updateManufacturer = async (id, body) => {
    const existingManufacturer = await Manufacturer.findOne({ _id: id, deleted_at: null });
        if (!existingManufacturer) {
        throw new Error('Manufacturer does not exist');
    }
    const updatedManufacturer = await Manufacturer.findByIdAndUpdate(id, body, { new: true });
    return updatedManufacturer;
};

// DELETE VENDOR
ManufacturerServices.deleteManufacturer = async (manufacturerId) => {
    const existingManufacturer = await Manufacturer.findOne({ _id: manufacturerId, deleted_at: null });
    if (!existingManufacturer) {
        throw new Error('Manufacturer does not exist');
    }
    
    const deletedManufacturer = await Manufacturer.findOneAndUpdate(
        {_id: manufacturerId},
        {deleted_at: new Date()},
        {new: true}
    )
    if(!deletedManufacturer){
        throw new Error('unable to delete Manufacturer')
    }
    return deletedManufacturer
}

module.exports = ManufacturerServices