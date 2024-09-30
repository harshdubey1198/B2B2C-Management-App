import React, { useState, useEffect } from 'react';
import { FormGroup, Label, Input, Button, Spinner } from 'reactstrap';
import axios from 'axios';

const InvoiceItems = ({ items, handleItemChange, removeItem, setInvoiceData }) => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const authuser = JSON.parse(localStorage.getItem("authUser"));
  const token = authuser?.token;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const firmId = authuser?.response?.adminId;

  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/inventory/get-items/${firmId}`, config);
        setInventoryItems(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInventoryItems();
  }, [firmId]);

  const getSellingPrice = (itemId) => {
    const selectedItem = inventoryItems.find((invItem) => invItem._id === itemId);
    return selectedItem ? selectedItem.sellingPrice : 0;
  };

  const getMaxQuantity = (itemId) => {
    const selectedItem = inventoryItems.find((invItem) => invItem._id === itemId);
    return selectedItem ? selectedItem.quantity : 1;
  };

  const calculateTotal = (quantity, price, tax, discount) => {
    const totalBeforeTax = quantity * price;
    const totalTax = totalBeforeTax * (tax / 100);
    const totalDiscount = totalBeforeTax * (discount / 100);
    return totalBeforeTax + totalTax - totalDiscount;
  };

  const handleItemSelection = (index, selectedItemId) => {
    const selectedItem = inventoryItems.find((invItem) => invItem._id === selectedItemId);
    if (selectedItem) {
      const updatedItems = [...items];
      const price = getSellingPrice(selectedItem._id); 

      updatedItems[index] = {
        ...updatedItems[index],
        itemId: selectedItem._id,
        name: selectedItem.name,
        description: selectedItem.description || '',
        quantity: 1,
        price,
        tax: 0,
        discount: 0,
        total: calculateTotal(1, price, 0, 0),
      };

      setInvoiceData(prevData => ({
        ...prevData,
        items: updatedItems,
      }));
    }
  };


  const handleVariantChange = (itemId, variantName, index) => {
    const selectedItem = items[index];
    const selectedVariant = inventoryItems.find((invItem) => invItem._id === itemId)?.variants.find((variant) => variant.optionLabel === variantName);
  
    if (selectedVariant) {
      const updatedItems = [...items];
      const basePrice = getSellingPrice(itemId); 
      const variantPrice = selectedVariant.price || 0; 
      const quantity = selectedItem.quantity || 1;
      const tax = selectedItem.tax || 0;
      const discount = selectedItem.discount || 0;
  
      const price = basePrice + variantPrice;
      const total = calculateTotal(quantity, price, tax, discount);
  
      updatedItems[index] = {
        ...selectedItem,
        selectedVariant: [{ optionLabel: variantName, price: variantPrice }],
        price, 
        total,
      };
  
      setInvoiceData(prevData => ({
        ...prevData,
        items: updatedItems,
      }));
    }
  };
  
  console.log(items, "items")

  if (loading) return <Spinner color="primary" />;

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
                <option key={inventoryItem._id} value={inventoryItem._id}>
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
              value={item.selectedVariant?.[0]?.optionLabel || ""}
              onChange={(e) => handleVariantChange(item.itemId, e.target.value, index)}
              required
            >
              <option value="">Select Variant</option>
              {inventoryItems.find((invItem) => invItem._id === item.itemId)?.variants.map((variant) => (
                <option key={variant._id} value={variant.optionLabel}>
                  {variant.optionLabel}
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
              max={getMaxQuantity(item.itemId || "")}
              value={item.quantity || 1}
              onChange={(e) =>
                handleItemChange(
                  index,
                  'quantity',
                  Math.max(1, Math.min(parseFloat(e.target.value), getMaxQuantity(item.itemId || "")))
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
