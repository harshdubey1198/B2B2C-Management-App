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

module.exports = TaxServices