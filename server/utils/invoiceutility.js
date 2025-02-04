const generateInvoiceNumber = async (firmId) => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = String(currentDate.getFullYear()).slice(-2);
  
    const lastInvoice = await Invoice.findOne({ firmId }).sort({ createdAt: -1 });
  
    if (lastInvoice) {
      const lastInvoiceParts = lastInvoice.invoiceNumber.split("-");
      const lastInvoiceIncrement = parseInt(lastInvoiceParts[4], 10);
      return `INV-${day}-${month}-${year}-${lastInvoiceIncrement + 1}`;
    } else {
      return `INV-${day}-${month}-${year}-1`;
    }
};

const handleCustomer = async (customer, firmId, createdBy) => {
    let existingCustomer = await Customer.findOne({ email: customer.email, firmId });
  
    if (existingCustomer) {
      return {
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
        createdBy,
      });
      const savedCustomer = await newCustomer.save();
      return {
        customerName: `${savedCustomer.firstName} ${savedCustomer.lastName}`,
        customerEmail: savedCustomer.email,
        customerPhone: savedCustomer.mobile,
        customerAddress: savedCustomer.address,
        firmId: savedCustomer.firmId,
      };
    }
  };
  
  const calculateInvoiceAmount = async (items) => {
    let totalAmount = 0;
    for (let item of items) {  
      const inventoryItem = await InventoryItem.findById(item.itemId);
      if (!inventoryItem) {
        throw new Error(`Item with ID ${item.itemId} not found in inventory`);
      }
  
      let priceToUse = item.sellingPrice;
      if (item.selectedVariant && item.selectedVariant.length > 0) {
        if (item.selectedVariant[0].price) {
          priceToUse += item.selectedVariant[0].price; 
        }
      }
  
      const itemQuantity = parseInt(item.quantity, 10);
      const itemTotal = priceToUse * itemQuantity;
  
      const totalTaxForItem = await calculateTotalTax(inventoryItem, itemTotal);
  
      const itemTotalWithTax = Math.round(itemTotal + totalTaxForItem);
  
      item.total = itemTotalWithTax;
      totalAmount += itemTotalWithTax;
    }
    return totalAmount;
  };
  
  const calculateTotalTax = async (inventoryItem, itemTotal) => {
    const tax = await Tax.findById(inventoryItem.tax.taxId);
    if (!tax) {
      throw new Error(`Tax with ID ${inventoryItem.tax.taxId} not found`);
    }
  
    let totalTaxForItem = 0;
    inventoryItem.tax.components.forEach((selectedComponent) => {
      const taxComponent = tax.taxRates.find((tc) => tc.taxType.toLowerCase() === selectedComponent.taxType.toLowerCase());
      if (!taxComponent) {
        throw new Error(
          `Selected tax component ${selectedComponent.taxType} not found in tax object`
        );
      }
      const taxAmount = (itemTotal * taxComponent.rate) / 100;
      totalTaxForItem += taxAmount;
    });
  
    return totalTaxForItem;
  };
  
  // update stock function
  const updateInventoryStock = async (items, isProforma) => {
    for (let item of items) {
      const inventoryItem = await InventoryItem.findById(item.itemId);
      if (!inventoryItem) {
        throw new Error(`Item with ID ${item.itemId} not found in inventory`);
      }
  
      // If the item has variants, manage stock per variant
      if (inventoryItem.variants && inventoryItem.variants.length > 0) {
        item.selectedVariant.forEach((variant) => {
          const inventoryVariant = inventoryItem.variants.find(
            (v) => v.sku === variant.sku
          );
          if (inventoryVariant) {
            // Calculate available stock (total stock minus reserved stock)
            const availableStock = inventoryVariant.stock - inventoryVariant.reservedQuantity;
            if (isProforma) {
              // Reserve stock for Proforma
              if (availableStock < item.quantity) {
                throw new Error(
                  `Insufficient stock to reserve for variant: ${variant.optionLabel}. Available: ${availableStock}, Requested: ${item.quantity}`
                );
              }
              inventoryVariant.reservedQuantity += item.quantity; 
            } else {
              const requestedQuantity = item.quantity;
              if (inventoryVariant.stock < requestedQuantity) {
                throw new Error(
                  `Insufficient stock for variant: ${variant.optionLabel}. Available: ${inventoryVariant.stock}, Requested: ${requestedQuantity}`
                );
              }
              inventoryVariant.stock -= requestedQuantity;
              if (inventoryVariant.reservedQuantity > 0) {
                inventoryVariant.reservedQuantity -= Math.min(inventoryVariant.reservedQuantity, requestedQuantity);
              } 
            }
          } else {
            throw new Error(
              `Variant with SKU ${variant.sku} not found for item: ${inventoryItem.name}`
            );
          }
        });
  
        // Update the total stock of the item based on the variants' stock
        inventoryItem.quantity = inventoryItem.variants.reduce(
          (sum, v) => sum + v.stock,
          0
        );
      } else {
        // If no variants, adjust the quantity directly at the item level
        const availableStock = inventoryItem.quantity;
  
        if (isProforma) {
          // Reserve stock for Proforma at the item level
          if (availableStock < item.quantity) {
            throw new Error(
              `Insufficient stock to reserve for item: ${inventoryItem.name}. Available: ${availableStock}, Requested: ${item.quantity}`
            );
          }
          inventoryItem.quantity -= item.quantity; // Reduce available quantity to reserve it
        } else {
          // Deduct stock for Tax Invoice directly
          if (inventoryItem.quantity < item.quantity) {
            throw new Error(
              `Insufficient stock for item: ${inventoryItem.name}. Available: ${inventoryItem.quantity}, Requested: ${item.quantity}`
            );
          }
          inventoryItem.quantity -= item.quantity;
        }
      }
  
      await inventoryItem.save();
    }
  };

module.exports = { generateInvoiceNumber, handleCustomer, calculateInvoiceAmount, calculateTotalTax, updateInventoryStock}