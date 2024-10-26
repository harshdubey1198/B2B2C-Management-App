import React, { useState, useEffect } from 'react';
import { FormGroup, Label, Input, Button, Spinner } from 'reactstrap';
import axios from 'axios';

const InvoiceItems = ({ items, removeItem, setInvoiceData }) => {
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

  const getMaxQuantity = (itemId, selectedVariantName) => {
    const selectedItem = inventoryItems.find((invItem) => invItem._id === itemId);
    if (!selectedItem) return 1;
  
    if (selectedItem.variants && selectedItem.variants.length > 0) {
      const selectedVariant = selectedItem.variants.find(
        (variant) => variant.optionLabel === selectedVariantName
      );
      if (selectedVariant) {
        const availableQuantity = selectedVariant.stock - selectedVariant.reservedQuantity;
        return availableQuantity > 0 ? availableQuantity : 0; 
      }
    }
    return selectedItem.quantity || 0;
  };
  

  const calculateTotal = (quantity,varSelPrice, price, tax, discount) => {
    // const totalBeforeTax =  quantity * varSelPrice;
    const totalBeforeTax = (varSelPrice > 0) ? (quantity * varSelPrice) : (quantity * price);
    const totalTax = totalBeforeTax * (tax / 100);
    const totalDiscount = totalBeforeTax * (discount / 100);
    const total = totalBeforeTax + totalTax - totalDiscount ;
    return parseFloat(total.toFixed(2));
  };

  const handleItemSelection = (index, selectedItemId) => {
    if (!selectedItemId) {
      // If item is deselected, reset the item fields
      const updatedItems = [...items];
      updatedItems[index] = {
        itemId: "",
        name: "",
        description: "",
        quantity: 0,
        price: 0,
        tax: 0,
        discount: 0,
        total: 0,
        selectedVariant: [],
      };
  
      setInvoiceData((prevData) => ({
        ...prevData,
        items: updatedItems,
      }));
      return;
    }
  
    // Reset fields for new item selection
    const updatedItems = [...items];
    updatedItems[index] = {
      itemId: selectedItemId,
      name: "",
      description: "",
      quantity: 0,
      price: 0,
      tax: 0,
      discount: 0,
      total: 0,
      selectedVariant: [], // Reset selectedVariant when new item is selected
    };
  
    const selectedItem = inventoryItems.find((invItem) => invItem._id === selectedItemId);
    if (selectedItem) {
      const price = getSellingPrice(selectedItem._id);
      updatedItems[index] = {
        ...updatedItems[index],
        name: selectedItem.name,
        description: selectedItem.description || '',
        price,
        total: calculateTotal(0, 0, price, 0, 0),
      };
  
      setInvoiceData((prevData) => ({
        ...prevData,
        items: updatedItems,
      }));
    }
  };
  
  
  const handleVariantChange = (itemId, variantName, index) => {
    if (!variantName) {
      const updatedItems = [...items];
      updatedItems[index] = {
        ...updatedItems[index],
        selectedVariant: [],
        price: getSellingPrice(itemId),
        total: calculateTotal(updatedItems[index].quantity || 1, getSellingPrice(itemId), updatedItems[index].tax || 0, updatedItems[index].discount || 0),
      };
  
      setInvoiceData((prevData) => ({
        ...prevData,
        items: updatedItems,
      }));
      return;
    }
  
    const selectedItem = items[index];
    const selectedVariant = inventoryItems.find((invItem) => invItem._id === itemId)?.variants.find((variant) => variant.optionLabel === variantName);
  
    if (selectedVariant) {
      const maxQuantity = selectedVariant.stock - selectedVariant.reservedQuantity;
      const updatedItems = [...items];
      const basePrice = getSellingPrice(itemId);
      const variantPrice = selectedVariant.price || 0;
      const quantity = selectedItem.quantity || 0;
      const tax = selectedItem.tax || 0;
      const discount = selectedItem.discount || 0;
  
      const price = basePrice;
      const varSelPrice= basePrice + variantPrice;
      const total = calculateTotal(quantity, price, tax, discount);
  
      updatedItems[index] = {
        ...selectedItem,
        selectedVariant: [{ optionLabel: variantName, varSelPrice:varSelPrice, price: variantPrice, stock: selectedVariant.stock, sku: selectedVariant.sku, barcode: selectedVariant.barcode }],
        price,
        varSelPrice,
        total,
      };
  
      setInvoiceData((prevData) => ({
        ...prevData,
        items: updatedItems,
      }));
    }
  };
  

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };

    const selectedItem = newItems[index];
    const quantity = selectedItem.quantity || 0;
    const price = selectedItem.price || 0;
    const varSelPrice = selectedItem.varSelPrice || 0;
    const tax = selectedItem.tax || 0;
    const discount = selectedItem.discount || 0;

    newItems[index].total = calculateTotal(quantity,varSelPrice, price, tax, discount);
    setInvoiceData(prevData => ({ ...prevData, items: newItems }));
  };

  if (loading) return <Spinner color="primary" />;

  return (
    <div>
      {items.map((item, index) => (
        <div className="row d-flex  align-items-center w-100 mb-3 p-4 bg-light" key={index}>
          <div className="col-lg-2 col-md-3 col-sm-12">
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
          </div>
          <div className="col-lg-2 col-md-3 col-sm-12">
          {/* <FormGroup>
            <Label for={`tax-${index}`}>Tax</Label>
          <Input
            type="select" 
            name={`tax-${index}`}
            id={`tax-${index}`}
            value={item.tax || ""}
            onChange={(e) => handleItemChange(index, 'tax', e.target.value)}
            required
          >
          <option value="">Select Tax</option>
          {inventoryItems.find((invItem) => invItem._id === item.itemId)?.tax?.components.map((taxComponent, index) => (
            <option key={index} value={taxComponent.taxType}>
              {taxComponent.taxType} - {taxComponent.rate}%
            </option>
          ))}
          </Input>
          </FormGroup> */}
             <FormGroup>
                  <p>Tax</p>
                  {inventoryItems
                    .find((invItem) => invItem._id === item.itemId)
                    ?.tax?.components.map((taxComponent, index) => (
                      <div key={index} >
                        {taxComponent.taxType} - {taxComponent.rate}%
                      </div>
                    ))}
                </FormGroup>
          </div>

          <div className="col-lg-2 col-md-3 col-sm-12">
          <FormGroup>
            <Label for={`variant-${index}`}>Variant</Label>
            <Input
              type="select"
              name={`variant-${index}`}
              id={`variant-${index}`}
              value={item.selectedVariant?.[0]?.optionLabel || ""}
              onChange={(e) => handleVariantChange(item.itemId, e.target.value, index)}
              // required
            >
              <option value="">Select Variant</option>
              {inventoryItems.find((invItem) => invItem._id === item.itemId)?.variants.map((variant) => (
                <option key={variant._id} value={variant.optionLabel}>
                  {variant.optionLabel} 
                  {/* - {getMaxQuantity(item.itemId, item.selectedVariant?.[0]?.optionLabel || "")} */}
                </option>
              ))}
            </Input>
         
          </FormGroup>

          {/* <small className="text-muted">
            Available Stock: {getMaxQuantity(item.itemId, item.selectedVariant?.[0]?.optionLabel || "")}
          </small> */}
            


            </div>
            <div className="col-lg-2 col-md-3 col-sm-12">
          <FormGroup>
            <Label for={`quantity-${index}`}>Quantity</Label>
            <Input
              type="number"
              name={`quantity-${index}`}
              id={`quantity-${index}`}
              max={getMaxQuantity(item.itemId, item.selectedVariant?.[0]?.optionLabel || "")}
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(
                  index,
                  'quantity',
                  Math.max(0, Math.min(parseFloat(e.target.value), getMaxQuantity(item.itemId, item.selectedVariant?.[0]?.optionLabel || "")))
                )
              }
              required
            />
          </FormGroup>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-12">
          <FormGroup>
            <Label for={`price-${index}`}>Item Price</Label>
            <Input
              type="number"
              name={`price-${index}`}
              id={`price-${index}`}
              value={item.price || 0}
              required
              readOnly
            />
          </FormGroup>
          </div>
          {/* <div className="col-lg-2 col-md-3 col-sm-12">
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
          </div> */}
          {/* <div className="col-lg-2 col-md-3 col-sm-12">
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
          </div> */}
          <div className="col-lg-2 col-md-3 col-sm-12">
          <FormGroup>
            <Label for={`total-${index}`}>Total <span style={{fontSize:"10px"}}>Item + variant</span></Label>
            <Input
              type="number"
              name={`total-${index}`}
              id={`total-${index}`}
              value={item.total || 0}
              readOnly
            />
          </FormGroup>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-12">
            <i className="bx bx-trash text-danger" style={{ cursor: 'pointer', fontSize:'22px' }} onClick={() => removeItem(index)}></i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvoiceItems;
