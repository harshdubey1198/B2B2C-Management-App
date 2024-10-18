const Customer = require("../schemas/cutomer.schema");
const Invoice = require("../schemas/invoice.schema");
const User = require('../schemas/user.schema');
const InventoryItem = require("../schemas/inventoryItem.schema");

const invoiceServices = {};

invoiceServices.createInvoice = async (invoiceData) => {
  const { customer, items, invoiceDate, dueDate, amountPaid, createdBy, firmId, invoiceType, invoiceSubType } = invoiceData;

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
    const priceToUse = item.selectedVariant && item.selectedVariant.length > 0 && item.selectedVariant[0].price
      ? item.selectedVariant[0].price + item.sellingPrice
      : item.sellingPrice;
    const itemTotal = priceToUse * item.quantity;
    item.total = itemTotal;
    totalAmount += itemTotal;
  });

  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = String(currentDate.getFullYear()).slice(-2);

  const lastInvoice = await Invoice.findOne({ firmId }).sort({ createdAt: -1 });

  let invoiceNumber;
  if (lastInvoice) {
    const lastInvoiceParts = lastInvoice.invoiceNumber.split('-');
    const lastInvoiceIncrement = parseInt(lastInvoiceParts[4], 10);
    invoiceNumber = `INV-${day}-${month}-${year}-${lastInvoiceIncrement + 1}`;
  } else {
    invoiceNumber = `INV-${day}-${month}-${year}-1`;
  }

  const amountDue = totalAmount - (amountPaid || 0);

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
    createdBy
  });

  if (invoiceType === 'Proforma') {
    await updateInventoryStock(items, true);
  } else if (invoiceType === 'Tax Invoice') {
    await updateInventoryStock(items, false);
  }

  const savedInvoice = await newInvoice.save();
  return savedInvoice;
};

const updateInventoryStock = async (items, isProforma) => {
  for (let item of items) {
    const inventoryItem = await InventoryItem.findById(item.itemId);
    if (!inventoryItem) {
      throw new Error(`Item with ID ${item.itemId} not found in inventory`);
    }

    if (inventoryItem.variants && inventoryItem.variants.length > 0) {
      item.selectedVariant.forEach((variant) => {
        const inventoryVariant = inventoryItem.variants.find(v => v.sku === variant.sku);
        if (inventoryVariant) {
          if (isProforma) {
            if (inventoryVariant.stock < inventoryVariant.reservedQuantity + item.quantity) {
              throw new Error(`Insufficient stock to reserve for variant: ${variant.optionLabel}`);
            }
            inventoryVariant.reservedQuantity += item.quantity;
          } else {
            if (inventoryVariant.stock < item.quantity) {
              throw new Error(`Insufficient stock for variant: ${variant.optionLabel}`);
            }
            inventoryVariant.stock -= item.quantity;
            inventoryVariant.reservedQuantity -= item.quantity;
          }
        } else {
          throw new Error(`Variant with SKU ${variant.sku} not found for item: ${inventoryItem.name}`);
        }
      });

      inventoryItem.quantity = inventoryItem.variants.reduce((sum, v) => sum + v.stock, 0);
    } else {
      if (isProforma) {
        if (inventoryItem.quantity < item.quantity) {
          throw new Error(`Insufficient stock to reserve for item: ${inventoryItem.name}`);
        }
        inventoryItem.quantity -= item.quantity;
      } else {
        if (inventoryItem.quantity < item.quantity) {
          throw new Error(`Insufficient stock for item: ${inventoryItem.name}`);
        }
        inventoryItem.quantity -= item.quantity;
      }
    }

    await inventoryItem.save();
  }
};

invoiceServices.getInvoices = async (adminId) => {
  const invoices = await Invoice.find({ firmId: adminId, deleted_at: null })
    .populate({ path: 'items.itemId' })
    .populate({ path: 'firmId', select: "-password" })
    .populate({ path: 'createdBy', select: "firstName lastName email" });

  if (invoices.length === 0) {
    throw new Error('No Invoices found');
  }
  return invoices;
};

invoiceServices.getInvoice = async (invoiceId) => {
  const invoice = await Invoice.findOne({ _id: invoiceId, deleted_at: null })
    .populate({ path: 'items.itemId' })
    .populate({ path: 'firmId', select: "-password" })
    .populate({ path: 'createdBy', select: "firstName lastName email" });

  if (!invoice) {
    throw new Error('No invoice found');
  }
  return invoice;
};

invoiceServices.deleteInvoice = async (invoiceId) => {
  const existingInvoice = await Invoice.findOne({ _id: invoiceId });
  if (!existingInvoice) {
    throw new Error('No Invoices found');
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
    throw new Error('User not found');
  }

  const invoice = await Invoice.findOne({ _id: id });
  if (!invoice) {
    throw new Error('Invoice not found');
  }

  if (invoice.firmId !== user.adminId && user.role !== "firm_admin") {
    throw new Error("Only Firm Admin is authorized to update the Approval of Invoices");
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
  const count = await Invoice.countDocuments({ firmId: firmId, deleted_at: null });
  return count;
};

module.exports = invoiceServices;
