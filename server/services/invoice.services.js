const Customer = require("../schemas/cutomer.schema");

const invoiceServices = {};

invoiceServices.createInvoice = async (invoiceData) => {
  const {customer, items, invoiceDate, dueDate, createdBy, firmId, invoiceType, invoiceSubType} = invoiceData;

  let customerData;
  const existingCustomer = await Customer.findOne({email: customer.email, firmId,});
  if (existingCustomer) {
    customerData = {
      customerName: `${existingCustomer.firstName} ${existingCustomer.lastName}`,
      customerEmail: existingCustomer.email,
      customerPhone: existingCustomer.mobile,
      customerAddress: existingCustomer.address,
      firmId: existingCustomer.firmId,
    };
  } else {
    const newCustomer = new Customer({
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        mobile: customer.mobile,
        address: customer.address,
        firmId,
        createdBy
    })

    const savedCustomer = await newCustomer.save();
    customerData = {
        customerName: `${savedCustomer.firstName} ${savedCustomer.lastName}`,
        customerEmail: savedCustomer.email,
        customerPhone: savedCustomer.mobile,
        customerAddress: savedCustomer.address,
        firmId: savedCustomer.firmId
    }
  }

  return customerData
};














// GET INVOICES IN A SINGLE FIRM
invoiceServices.getInvoices = async (adminId) => {
  const invoices = await Invoice.find({firmId:adminId})
  .populate('firmId')
  .populate({
    path: 'createdBy',
    select: "firstName lastName email"
  });
  if(!invoices){
    throw new Error('No items found')
  }
  return invoices
}

module.exports = invoiceServices;
