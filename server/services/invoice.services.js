const Customer = require("../schemas/cutomer.schema"); 
const Invoice = require("../schemas/invoice.schema"); 
const User = require('../schemas/user.schema')

const invoiceServices = {};

invoiceServices.createInvoice = async (invoiceData) => {
  const { customer, items, invoiceDate, dueDate, createdBy, firmId, invoiceType, invoiceSubType } = invoiceData;

  let customerData;
  const existingCustomer = await Customer.findOne({ email: customer.email, firmId });
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
    });

    const savedCustomer = await newCustomer.save();
    customerData = {
      customerName: `${savedCustomer.firstName} ${savedCustomer.lastName}`,
      customerEmail: savedCustomer.email,
      customerPhone: savedCustomer.mobile,
      customerAddress: savedCustomer.address,
      firmId: savedCustomer.firmId
    };
  }

  let totalAmount = 0;
  items.forEach(item => {
    const itemTotal = (item.price * item.quantity) ;
    item.total = itemTotal; // add this total back to item if needed
    totalAmount += itemTotal;
  });

  const newInvoice = new Invoice({
    invoiceNumber: `INV-${Date.now()}`, 
    customerName: customerData.customerName,
    customerEmail: customerData.customerEmail,
    customerPhone: customerData.customerPhone,
    customerAddress: customerData.customerAddress,
    invoiceType,
    // invoiceSubType,
    firmId,
    items,
    invoiceDate,
    dueDate,
    totalAmount,
    createdBy
  });

  const savedInvoice = await newInvoice.save();
  return savedInvoice;
};

// GET INVOICES IN A SINGLE FIRM
invoiceServices.getInvoices = async (adminId) => {
  const invoices = await Invoice.find({firmId:adminId})
  .populate({
    path: 'firmId',
    select: "-password"
  })
  .populate({
    path: 'createdBy',
    select: "firstName lastName email"
  });
  if(!invoices){
    throw new Error('No items found')
  }
  return invoices
}


//  GET SINGLE INVOICE DATA 
invoiceServices.getInvoice = async (invoiceId) => {
  const invoice = await Invoice.findOne({_id: invoiceId})
  .populate({
    path: 'firmId',
    select: "-password"
  })
  .populate({
    path: 'createdBy',
    select: "firstName lastName email"
  });
  if(!invoice){
    throw new Error('No items found')
  }
  return invoice
}


// DELETE INVOICE SUCCESSFULLY
invoiceServices.deleteInvoice = async (invoiceId) => {
  const existingInvoice = await Invoice.findOne({_id: invoiceId})
  if(!existingInvoice){
    throw new Error('No Invoices found')
  }

  const deletedInvoice = await Invoice.findOneAndUpdate(
    {_id: invoiceId},
    {deleted_at: Date.now()},
    {new: true}
  )
  return deletedInvoice
}

// UPDATE INVOICE APPROVAL
invoiceServices.updateInvoiceApproval = async (body) => {
  const { id, userId, approvalStatus} = body
  const user = await User.findOne({_id: userId})
  if(!user){
    throw new Error('User not found')
  }
  const invoice = await Invoice.findOne({_id: id})
  if(!invoice){
    throw new Error('Invoice not found')
  }
  if(invoice.firmId !== user.adminId && user.role !== "firm_admin"){
    throw new Error("Only Firm Admin is authorized to update the Approval of Invoices")
  }
  if(user.role === "firm_admin"){
    const updatedInvoice = await Invoice.findOneAndUpdate(
      { _id: id, firmId: user.adminId }, 
      { $set: { approvalStatus: approvalStatus } },
      { new: true }
    );
    return updatedInvoice
  }
}

module.exports = invoiceServices;
