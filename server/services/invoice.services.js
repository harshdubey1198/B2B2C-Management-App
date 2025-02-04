const Customer = require("../schemas/cutomer.schema");
const Invoice = require("../schemas/invoice.schema");
const User = require("../schemas/user.schema");
const InventoryItem = require("../schemas/inventoryItem.schema");
const Tax = require("../schemas/tax.schema");
const { handleCustomer, calculateInvoiceAmount, generateInvoiceNumber, updateInventoryStock } = require("../utils/invoiceutility");
const { default: mongoose } = require("mongoose");

const invoiceServices = {};

// invoiceServices.createInvoice = async (invoiceData) => {
//   const {
//     customer,
//     items,
//     invoiceDate,
//     dueDate,
//     amountPaid,
//     createdBy,
//     firmId,
//     invoiceType,
//     invoiceSubType,
//   } = invoiceData;

//   let customerData;
//   const existingCustomer = await Customer.findOne({
//     email: customer.email,
//     firmId,
//   });
//   if (existingCustomer) {
//     customerData = {
//       customerName: `${existingCustomer.firstName} ${existingCustomer.lastName}`,
//       customerEmail: existingCustomer.email,
//       customerPhone: existingCustomer.mobile,
//       customerAddress: existingCustomer.address,
//       firmId: existingCustomer.firmId,
//     };
//   } else {
//     const newCustomer = new Customer({
//       firstName: customer.firstName,
//       lastName: customer.lastName,
//       email: customer.email,
//       mobile: customer.mobile,
//       address: customer.address,
//       firmId,
//       createdBy,
//     });

//     const savedCustomer = await newCustomer.save();
//     customerData = {
//       customerName: `${savedCustomer.firstName} ${savedCustomer.lastName}`,
//       customerEmail: savedCustomer.email,
//       customerPhone: savedCustomer.mobile,
//       customerAddress: savedCustomer.address,
//       firmId: savedCustomer.firmId,
//     };
//   }
 
//   let totalAmount = 0;
//   for (let item of items) {  
//     const inventoryItem = await InventoryItem.findById(item.itemId);
//     if (!inventoryItem) {
//       throw new Error(`Item with ID ${item.itemId} not found in inventory`);
//     }
//         let priceToUse = item.sellingPrice;
//     if (item.selectedVariant && item.selectedVariant.length > 0) {
  
//       if (item.selectedVariant[0].price) {
//         priceToUse += item.selectedVariant[0].price; 
//       }
//     } else {
//       console.log("No variant selected for item.");
//     }
  
//     const itemQuantity = parseInt(item.quantity, 10);
//     const itemTotal = priceToUse * itemQuantity;
  
//     // Fetch tax for the inventory item
//     const tax = await Tax.findById(inventoryItem.tax.taxId);
//     if (!tax) {
//       throw new Error(`Tax with ID ${inventoryItem.tax.taxId} not found`);
//     }
    
//     let totalTaxForItem = 0;
//     inventoryItem.tax.components.forEach((selectedComponent) => {
//       const taxComponent = tax.taxRates.find(
//         (tc) => tc.taxType === selectedComponent.taxType
//       );
  
//       if (!taxComponent) {
//         throw new Error(
//           `Selected tax component ${selectedComponent.taxType} not found in tax object`
//         );
//       }
    
//       // Calculate the tax for the item
//       const taxAmount = (itemTotal * taxComponent.rate) / 100;
//       console.log(`Tax amount for ${selectedComponent.taxType}:`, taxAmount);
//       totalTaxForItem += taxAmount;
//     });
  
//     // Calculate the item total with tax
//     const itemTotalWithTax = Math.round(itemTotal + totalTaxForItem);  
//     // Store the total for the item
//     item.total = itemTotalWithTax;
//     // Add the item total (with tax) to the overall invoice total
//     totalAmount += itemTotalWithTax;
//   }
    
//   const currentDate = new Date();
//   const day = String(currentDate.getDate()).padStart(2, "0");
//   const month = String(currentDate.getMonth() + 1).padStart(2, "0");
//   const year = String(currentDate.getFullYear()).slice(-2);

//   const lastInvoice = await Invoice.findOne({ firmId }).sort({ createdAt: -1 });

//   let invoiceNumber;
//   if (lastInvoice) {
//     const lastInvoiceParts = lastInvoice.invoiceNumber.split("-");
//     const lastInvoiceIncrement = parseInt(lastInvoiceParts[4], 10);
//     invoiceNumber = `INV-${day}-${month}-${year}-${lastInvoiceIncrement + 1}`;
//   } else {
//     invoiceNumber = `INV-${day}-${month}-${year}-1`;
//   }

//   const amountDue = totalAmount - (amountPaid || 0);

//   const newInvoice = new Invoice({
//     invoiceNumber,
//     customerName: customerData.customerName,
//     customerEmail: customerData.customerEmail,
//     customerPhone: customerData.customerPhone,
//     customerAddress: customerData.customerAddress,
//     invoiceType,
//     invoiceSubType,
//     amountPaid,
//     amountDue,
//     firmId,
//     items,
//     invoiceDate,
//     dueDate,
//     totalAmount,
//     createdBy,
//   });

//   if (invoiceType === "Proforma") {
//     await updateInventoryStock(items, true);
//   } else if (invoiceType === "Tax Invoice") {
//     await updateInventoryStock(items, false);
//   }

//   const savedInvoice = await newInvoice.save();
//   return savedInvoice;
// };

invoiceServices.createInvoice = async (invoiceData) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      customer,
      items,
      invoiceDate,
      dueDate,
      amountPaid,
      createdBy,
      firmId,
      invoiceType,
      invoiceSubType,
    } = invoiceData;

    // Handle customer creation or retrieval
    const customerData = await handleCustomer(customer, firmId, createdBy, session);

    // Calculate total amount
    const totalAmount = await calculateInvoiceAmount(items, session);

    // Generate invoice number
    const invoiceNumber = await generateInvoiceNumber(firmId, session);
    const amountDue = Math.max(totalAmount - amountPaid, 0);

    const newInvoice = new Invoice({
      invoiceNumber,
      customerName: customerData.customerName,
      customerEmail: customerData.customerEmail,
      customerPhone: customerData.customerPhone,
      customerAddress: customerData.customerAddress,
      invoiceType,
      invoiceSubType,
      amountPaid,
      amountDue,
      firmId,
      items,
      invoiceDate,
      dueDate,
      totalAmount,
      createdBy,
    });

    if (invoiceType === "Proforma") {
      await updateInventoryStock(items, true, session);
    } else if (invoiceType === "Tax Invoice") {
      await updateInventoryStock(items, false, session);
    }

    const savedInvoice = await newInvoice.save({ session });

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    return savedInvoice;
  } catch (error) {
    // Rollback transaction if anything fails
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

// PERFORMA INVOICE GETS REJECTED
invoiceServices.rejectInvoice = async (invoiceId) => {
  // Find the invoice by ID
  const invoice = await Invoice.findById(invoiceId);
  if (!invoice) {
    throw new Error(`Invoice with ID ${invoiceId} not found`);
  }
  // Ensure it’s a Proforma invoice before proceeding
  if (invoice.invoiceType !== "Proforma") {
    throw new Error("Only Proforma invoices can be rejected");
  }
  // Check if the invoice is already rejected or canceled
  if (invoice.status === "rejected" || invoice.status === "Canceled") {
    throw new Error("This invoice has already been rejected or canceled");
  }
  // Mark the invoice as rejected
  invoice.status = "rejected";
  // Release reserved stock back to available stock
  await releaseReservedStock(invoice.items);
  // Save the invoice with updated status
  await invoice.save();
  return invoice;
};

// Function to release reserved stock when a Proforma invoice is rejected
const releaseReservedStock = async (items) => {
  for (let item of items) {
    const inventoryItem = await InventoryItem.findById(item.itemId);
    if (!inventoryItem) {
      throw new Error(`Item with ID ${item.itemId} not found in inventory`);
    }

    // If the item has variants, handle reserved stock
    if (inventoryItem.variants && inventoryItem.variants.length > 0) {
      item.selectedVariant.forEach((variant) => {
        const inventoryVariant = inventoryItem.variants.find(
          (v) => v.sku === variant.sku
        );
        if (inventoryVariant) {
          if (inventoryVariant.reservedQuantity < item.quantity) {
            throw new Error(
              `Cannot release more than reserved quantity for variant: ${variant.optionLabel}`
            );
          }
          // Reduce reserved quantity, but do NOT modify stock as it was only reserved
          inventoryVariant.reservedQuantity -= item.quantity;

          // Note: Do NOT increase the actual stock since it's only reserved
          // inventoryVariant.stock should remain unchanged as it already reflects the available stock
        } else {
          throw new Error(
            `Variant with SKU ${variant.sku} not found for item: ${inventoryItem.name}`
          );
        }
      });

      // Recalculate the total stock, but without adding the reserved stock back into total stock
      inventoryItem.quantity = inventoryItem.variants.reduce(
        (sum, v) => sum + v.stock,
        0
      );
    } else {
      // If no variants, adjust stock directly at item level
      // Here we would just return the reserved quantity back if needed, but no change in stock
      inventoryItem.quantity += 0; // No change in the stock level here
    }

    await inventoryItem.save();
  }
};

invoiceServices.getInvoices = async (adminId) => {
  const invoices = await Invoice.find({ firmId: adminId, deleted_at: null })
    .populate({ path: "items.itemId", populate: {path: "tax.taxId"} })
    .populate({ path: "firmId", select: "-password" })
    .populate({ path: "createdBy", select: "firstName lastName email" });

  if (invoices.length === 0) {
    throw new Error("No Invoices found");
  }
  return invoices;
};

invoiceServices.getInvoice = async (invoiceId) => {
  const invoice = await Invoice.findOne({ _id: invoiceId, deleted_at: null })
    .populate({ path: "items.itemId" })
    .populate({ path: "firmId", select: "-password" })
    .populate({ path: "createdBy", select: "firstName lastName email" });

  if (!invoice) {
    throw new Error("No invoice found");
  }
  return invoice;
};

invoiceServices.deleteInvoice = async (invoiceId) => {
  const existingInvoice = await Invoice.findOne({ _id: invoiceId });
  if (!existingInvoice) {
    throw new Error("No Invoices found");
  }

  const deletedInvoice = await Invoice.findOneAndUpdate(
    { _id: invoiceId },
    { deleted_at: Date.now() },
    { new: true }
  );
  return deletedInvoice;
};

invoiceServices.updateInvoiceApproval = async (body) => {
  const { id, userId, approvalStatus } = body;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new Error("User not found");
  }

  const invoice = await Invoice.findOne({ _id: id });
  if (!invoice) {
    throw new Error("Invoice not found");
  }

  if (invoice.firmId !== user.adminId && user.role !== "firm_admin") {
    throw new Error(
      "Only Firm Admin is authorized to update the Approval of Invoices"
    );
  }

  if (user.role === "firm_admin") {
    const updatedInvoice = await Invoice.findOneAndUpdate(
      { _id: id, firmId: user.adminId },
      { $set: { approvalStatus: approvalStatus } },
      { new: true }
    );
    return updatedInvoice;
  }
};

invoiceServices.countInvoices = async (firmId) => {
  const count = await Invoice.countDocuments({
    firmId: firmId,
    deleted_at: null,
  });
  return count;
};

module.exports = invoiceServices;
