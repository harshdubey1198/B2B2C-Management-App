import React, { useState, useEffect } from 'react';
import { FormGroup, Label, Input, Button } from 'reactstrap';

const InvoiceItems = ({ items, handleItemChange, removeItem, fakeItems, setInvoiceData }) => {
  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
    setInventoryItems(fakeItems);
    console.log("Updated inventoryItems: ", fakeItems);
  }, [fakeItems]);

  const getMaxQuantity = (itemId, variantName) => {
    const selectedItem = inventoryItems.find((invItem) => invItem.id === itemId);
    if (selectedItem) {
      const selectedVariant = selectedItem.variants.find((variant) => variant.name === variantName);
      return selectedVariant ? selectedVariant.quantity : 1;
    }
    return 1;
  };

  const getVariantPrice = (itemId, variantName) => {
    const selectedItem = inventoryItems.find((invItem) => invItem.id === itemId);
    if (selectedItem) {
      const selectedVariant = selectedItem.variants.find((variant) => variant.name === variantName);
      return selectedVariant ? selectedVariant.price : 0;
    }
    return 0;
  };

  const calculateTotal = (quantity, price, tax, discount) => {
    const totalBeforeTax = quantity * price;
    const totalTax = totalBeforeTax * (tax / 100);
    const totalDiscount = totalBeforeTax * (discount / 100);
    return totalBeforeTax + totalTax - totalDiscount;
  };

  const handleItemSelection = (index, selectedItemId) => {
    const selectedItem = inventoryItems.find((invItem) => invItem.id === selectedItemId);
    if (selectedItem) {
      console.log(selectedItem, "selectedItem");
      const updatedItems = [...items];
      updatedItems[index] = {
        ...updatedItems[index],
        itemId: selectedItem.id,
        description: selectedItem.description || '',
        price: 0,
        quantity: 1,
        tax: 0,
        discount: 0,
        total: 0,
      };

      setInvoiceData(prevData => ({
        ...prevData,
        items: updatedItems
      }));
    }
  };

  const handleVariantChange = (itemId, variantName, index) => {
    const selectedItem = items[index];
    const selectedVariant = selectedItem.variants.find((variant) => variant.name === variantName);

    if (selectedVariant) {
      const updatedItems = [...items];
      const price = selectedVariant.price;
      const quantity = 1;
      const tax = updatedItems[index].tax || 0;
      const discount = updatedItems[index].discount || 0;
      const total = calculateTotal(quantity, price, tax, discount);

      updatedItems[index] = {
        ...selectedItem,
        variant: variantName,
        price,
        quantity,
        total,
      };

      setInvoiceData(prevData => ({
        ...prevData,
        items: updatedItems,
      }));
    }
  };

  return (
    <div>
      {items.map((item, index) => (
        <div className="d-flex flex-wrap flex-lg-row justify-content-between align-items-center w-100 mb-3" key={index}>
          <FormGroup>
            <Label for={`name-${index}`}>Item Name</Label>
            <Input
              type="select"
              name={`name-${index}`}
              id={`name-${index}`}
              value={item.itemId || ""}
              onChange={(e) => handleItemSelection(index, e.target.value)} 
              required
            >
              <option value="">Select Item</option>
              {inventoryItems.map((inventoryItem) => (
                <option key={inventoryItem.id} value={inventoryItem.id}>
                  {inventoryItem.name}
                </option>
              ))}
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for={`variant-${index}`}>Variant</Label>
            <Input
              type="select"
              name={`variant-${index}`}
              id={`variant-${index}`}
              value={item.variant || ""}
              onChange={(e) => handleVariantChange(item.itemId, e.target.value, index)}
              required
            >
              <option value="">Select Variant</option>
              {inventoryItems.find((invItem) => invItem.id === item.itemId)?.variants.map((variant) => (
                <option key={variant.id} value={variant.name}>
                  {variant.name}
                </option>
              ))}
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for={`quantity-${index}`}>Quantity</Label>
            <Input
              type="number"
              name={`quantity-${index}`}
              id={`quantity-${index}`}
              min={1}
              max={getMaxQuantity(item.itemId || "", item.variant || "")}
              value={item.quantity || 1}
              onChange={(e) =>
                handleItemChange(
                  index,
                  'quantity',
                  Math.max(1, Math.min(e.target.value, getMaxQuantity(item.itemId || "", item.variant || "")))
                )
              }
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for={`price-${index}`}>Price</Label>
            <Input
              type="number"
              name={`price-${index}`}
              id={`price-${index}`}
              value={item.price || 0}
              onChange={(e) => handleItemChange(index, 'price', e.target.value)}
              required
              readOnly
            />
          </FormGroup>

          <FormGroup>
            <Label for={`tax-${index}`}>Tax (%)</Label>
            <Input
              type="number"
              name={`tax-${index}`}
              id={`tax-${index}`}
              value={item.tax || 0}
              onChange={(e) => handleItemChange(index, 'tax', e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for={`discount-${index}`}>Discount (%)</Label>
            <Input
              type="number"
              name={`discount-${index}`}
              id={`discount-${index}`}
              value={item.discount || 0}
              onChange={(e) => handleItemChange(index, 'discount', e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for={`total-${index}`}>Total</Label>
            <Input
              type="number"
              name={`total-${index}`}
              id={`total-${index}`}
              value={item.total || 0}
              readOnly
            />
          </FormGroup>

          <Button color='danger' onClick={() => removeItem(index)}>
            Remove Item
          </Button>
        </div>
      ))}
    </div>
  );
};

export default InvoiceItems;
