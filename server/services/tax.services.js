const Tax = require("../schemas/tax.schema");
const User = require("../schemas/user.schema");

const TaxServices = {};

TaxServices.createTax = async (userId, body) => {
    const user = await User.findOne({_id: userId})
    if (!user) {
        throw new Error('User not found')
    } 
    const { taxName,taxRates } = body
    const existingTax = await Tax.findOne({taxName, firmId: user.adminId})
    if(existingTax){
        throw new Error('Tax with this name already exists');
    }

    const newTax = new Tax({
        taxName,
        taxRates,
        firmId: user.adminId,
        createdBy: user._id
    })
    await newTax.save()
    return newTax
}

TaxServices.getAllTaxes = async (adminId) => {
    const data = await Tax.find({firmId: adminId, deleted_at: null})
    if(!data){
        throw new Error('There is no Tax for this Firms!')
    }
    return data
}

TaxServices.getTaxById = async (taxId) => {
    const tax = await Tax.findOne({_id: taxId, deleted_at: null})
    if(!tax){
        throw new Error('Tax not Found')
    }
    return tax
}

TaxServices.updateTax = async (body) => {
    const {taxId, userId, updateData} = body
    const user = await User.findOne({_id: userId})
    if (!user) {
        throw new Error('User not found')
    }
    if (user.role !== 'firm_admin' && user.role !== 'accountant') {
        throw new Error('Only firm admins or accountants can update the tax');
    }

    const existingTax = await Tax.findOne({ _id: taxId, deleted_at: null });
    if (!existingTax) {
        throw new Error('Tax not found');
    }
    const updatedTax = await Tax.findOneAndUpdate({_id: taxId}, updateData, { new: true });    
    return updatedTax;
}

TaxServices.deleteTax = async (taxId) => {
    const existingTax = await Tax.findOne({_id: taxId})
    if(!existingTax){
        throw new Error('Tax not found')
    }
    const deletedTax = await  Tax.findOneAndUpdate(
        {_id: taxId},
        {deleted_at: new Date()},
        {new : true}
    )
    if(!deletedTax){
        throw new Error('Unable to delete tax')
    }
    return deletedTax
}


module.exports = TaxServices