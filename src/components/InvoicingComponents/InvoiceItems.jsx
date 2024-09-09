import React, { useState, useEffect } from 'react';
import { FormGroup, Label, Input, Button } from 'reactstrap';

const InvoiceItems = ({ items, handleItemChange, removeItem }) => {
  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
    const storedInventoryItems = JSON.parse(localStorage.getItem("inventoryItems")) || [];
    setInventoryItems(storedInventoryItems);
  }, []);
  console.log(inventoryItems);

  const getMaxQuantity = (name, variantName) => {
    const selectedItem = inventoryItems.find((invItem) => invItem.name === name);
    if (selectedItem) {
      const selectedVariant = selectedItem.variants.find((variant) => variant.name === variantName);
      return selectedVariant ? selectedVariant.quantity : 1;
    }
    return 1;
  };

  const getVariantPrice = (name, variantName) => {
    const selectedItem = inventoryItems.find((invItem) => invItem.name === name);
    if (selectedItem) {
      const selectedVariant = selectedItem.variants.find((variant) => variant.name === variantName);
      return selectedVariant ? selectedVariant.price : 0;
    }
    return 0;
  };

  const handleVariantChange = (index, name, variantName) => {
    const price = getVariantPrice(name, variantName);
    handleItemChange(index, 'variant', variantName);
    handleItemChange(index, 'price', price);
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
              value={item.name}
              onChange={(e) => handleItemChange(index, 'name', e.target.value)}
              required
            >
              <option value="">Select Item</option>
              {inventoryItems.map((inventoryItem) => (
                <option key={inventoryItem.id} value={inventoryItem.name}>
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
              onChange={(e) => handleVariantChange(index, item.name, e.target.value)}
              required
            >
              <option value="">Select Variant</option>
              {inventoryItems.find((invItem) => invItem.name === item.name)?.variants.map((variant) => (
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
              max={getMaxQuantity(item.name, item.variant)}
              value={item.quantity}
              onChange={(e) => handleItemChange(index, 'quantity', Math.max(1, Math.min(e.target.value, getMaxQuantity(item.name, item.variant))))}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for={`price-${index}`}>Price</Label>
            <Input
              type="number"
              name={`price-${index}`}
              id={`price-${index}`}
              value={item.price}
              onChange={(e) => handleItemChange(index, 'price', e.target.value)}
              required
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
