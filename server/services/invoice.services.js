const Customer = require("../schemas/cutomer.schema"); 
const Invoice = require("../schemas/invoice.schema"); 


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


module.exports = invoiceServices;
