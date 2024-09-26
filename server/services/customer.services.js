const { customerFilter } = require("../filter");
const Customer = require("../schemas/cutomer.schema");

const customerServices = {};

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

module.exports = customerServices;
