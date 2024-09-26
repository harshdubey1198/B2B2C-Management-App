const { customerFilter } = require("../filter");
const Customer = require("../schemas/cutomer.schema");

const customerServices = {};

// SEARCH FOR A CUSTOMER UNDER THAT FIRM
customerServices.searchCustomer = async (searchQuery, firmId) => {
  if (!searchQuery || !firmId) {
    throw new Error("Search query and firmId are required");
  }

  const filter = customerFilter(searchQuery)
  const customer = await Customer.find({
    firmId,
    ...filter
  }).limit(10);

  if (customer.length === 0) {
    throw new Error("No Customer Found");
  }
  return customer;
};

// GET ALL CUSTOMERS UNDER THAT FIRM
customerServices.getAllCustomers = async (firmId) => {
  if (!firmId) {
    throw new Error("firmId is required");
  }
  const customers = await Customer.find({firmId: firmId})
  .populate({
    path: "firmId",
    select: "companyTitle email avatar",
  })
  .populate({
    path: "createdBy",
    select: "firstName lastName email",
  });

  if(customers.length === 0){
    throw new Error("No Customers found for this firms")
  }   
  return customers
}

// GET SINGLE CUSTOMER SUCCEFULLY
customerServices.getCustomer = async (customerId) => {
  if (!customerId) {
    throw new Error("customerId is required");
  }
  const customer = await Customer.find({_id: customerId})
  .populate({
    path: "firmId",
    select: "companyTitle email avatar",
  })
  .populate({
    path: "createdBy",
    select: "firstName lastName email",
  });
  if(!customer){
    throw new Error("Customer Not Found")
  }
  return customer
}

module.exports = customerServices;
