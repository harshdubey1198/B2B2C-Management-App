const Customer = require("../schemas/cutomer.schema");

const customerServices = {};

customerServices.searchCustomer = async (searchQuery, firmId) => {
  if (!searchQuery || !firmId) {
    throw new Error("Search query and firmId are required");
  }
  const customer = await Customer.find({
    firmId,
    $or: [
      { firstName: { $regex: searchQuery, $options: "i" } },
      { email: { $regex: searchQuery, $options: "i" } },
    ],
  }).limit(10);

  if (customer.length === 0) {
    throw new Error("No Customer Found");
  }
  return customer;
};

module.exports = customerServices;
