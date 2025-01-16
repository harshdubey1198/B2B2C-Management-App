import React, { useState, useEffect } from 'react';
import { FormGroup, Label, Input, Spinner } from 'reactstrap';
import axiosInstance from '../../utils/axiosInstance';

const InvoiceItems = ({ items, removeItem, setInvoiceData }) => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const authuser = JSON.parse(localStorage.getItem("authUser"));
  const firmId = authuser?.response?.adminId;

  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_URL}/inventory/get-items/${firmId}`);
        setInventoryItems(response.data);
      } catch (err) {
        // setError(err.message);
        console.log(err);
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
  

  // const calculateTotal = (quantity,varSelPrice, price, tax, discount) => {
  //   // const totalBeforeTax =  quantity * varSelPrice;
  //   const totalBeforeTax = (varSelPrice > 0) ? (quantity * varSelPrice) : (quantity * price);
  //   const totalTax = totalBeforeTax * (tax / 100);
  //   const totalDiscount = totalBeforeTax * (discount / 100);
  //   const total = totalBeforeTax + totalTax - totalDiscount ;
  //   return parseFloat(total.toFixed(2));
  // };

  const calculateTotal = (quantity, varSelPrice, price, taxComponents, discount) => {
    const totalBeforeTax = varSelPrice > 0 ? quantity * varSelPrice : quantity * price;
    const totalTax = Array.isArray(taxComponents)
      ? taxComponents.reduce((acc, tax) => acc + (totalBeforeTax * (tax.rate / 100)), 0)
      : 0; 
    const totalDiscount = totalBeforeTax * (discount / 100);
    const total = totalBeforeTax + totalTax - totalDiscount;
    const afterTax = totalTax;
  
    return {
      total: parseFloat(total.toFixed(2)),
      afterTax: parseFloat(afterTax.toFixed(2)),
    };
  };
  
  
  const handleItemSelection = (index, selectedItemId) => {
    if (!selectedItemId) {
      const updatedItems = [...items];
      updatedItems[index] = {
        itemId: "",
        name: "",
        description: "",
        quantity: 0,
        price: 0,
        ProductHsn:"",
        discount: 0,
        total: 0,
        selectedVariant: [],
        taxComponents: [],
      };
  
      setInvoiceData((prevData) => ({
        ...prevData,
        items: updatedItems,
      }));
      return;
    }
  
    const updatedItems = [...items];
    updatedItems[index] = {
      itemId: selectedItemId,
      name: "",
      description: "",
      quantity: 0,
      price: 0,
      tax: 0,
      ProductHsn:"",
      taxComponents: [], 
      discount: 0,
      total: 0,
      selectedVariant: [],
    };
  
    const selectedItem = inventoryItems.find((invItem) => invItem._id === selectedItemId);
    if (selectedItem) {
      const price = getSellingPrice(selectedItem._id);
      const taxComponents = selectedItem.tax?.components || []; // Get tax components
      updatedItems[index] = {
        ...updatedItems[index],
        name: selectedItem.name,
        description: selectedItem.description || '',
        price,
        ProductHsn:selectedItem.ProductHsn,
        taxComponents, // Set tax components in the item
        total: calculateTotal(0, 0, price, taxComponents, 0).total,
      };
  
      setInvoiceData((prevData) => ({
        ...prevData,
        items: updatedItems,
      }));
    }
  };
  
  
  const handleVariantChange = (itemId, variantName, index) => {
    const updatedItems = [...items];
    const selectedItem = updatedItems[index];
  
    if (!variantName) {
      updatedItems[index] = {
        ...selectedItem,
        selectedVariant: [],
        price: getSellingPrice(itemId),
      };
      const { quantity = 0, discount = 0 } = updatedItems[index];
  
      const taxComponents = inventoryItems.find((invItem) => invItem._id === itemId)?.tax?.components || [];
      updatedItems[index].taxComponents = taxComponents; 
  
      const itemPrice = updatedItems[index].price;
      updatedItems[index].total = calculateTotal(quantity, 0, itemPrice, taxComponents, discount).total;
      updatedItems[index].afterTax = calculateTotal(quantity, 0, itemPrice, taxComponents, discount).afterTax;
  
      setInvoiceData((prevData) => ({
        ...prevData,
        items: updatedItems,
      }));
      return;
    }
  
    const selectedVariant = inventoryItems.find((invItem) => invItem._id === itemId)?.variants.find((variant) => variant.optionLabel === variantName);
  
    if (selectedVariant) {
      const basePrice = getSellingPrice(itemId);
      const variantPrice = selectedVariant.price || 0;
      const quantity = selectedItem.quantity || 0;
      const discount = selectedItem.discount || 0;
      const sku = selectedVariant.sku || "";
      const barcode = selectedVariant.barcode || "";
      const variationType = selectedVariant.variationType || "";
      // console.log(sku);
      const price = basePrice;
      const varSelPrice = basePrice + variantPrice;
  
      const taxComponents = inventoryItems.find((invItem) => invItem._id === itemId)?.tax?.components || [];
      updatedItems[index] = {
        ...selectedItem,
        selectedVariant: [{ optionLabel: variantName, sku:sku ,variationType, barcode, varSelPrice, price: variantPrice }],
        price,
        varSelPrice,
        variationType,
        barcode,
        sku,
        taxComponents,
      };
  
      updatedItems[index].total = calculateTotal(quantity, varSelPrice, price, taxComponents, discount).total;
      updatedItems[index].afterTax = calculateTotal(quantity, varSelPrice, price, taxComponents, discount).afterTax;
  
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
    const discount = selectedItem.discount || 0;
    const taxComponents = inventoryItems.find((invItem) => invItem._id === selectedItem.itemId)?.tax?.components || [];
    // console.log(taxComponents);
    newItems[index].total = calculateTotal(quantity, varSelPrice, price, taxComponents, discount).total;
    newItems[index].afterTax = calculateTotal(quantity, varSelPrice, price, taxComponents, discount).afterTax;
  
    setInvoiceData(prevData => ({ ...prevData, items: newItems }));
  };
  
const totalItems = items.length;
const totalPrice = items.reduce((acc, item) => acc + (item.total || 0), 0);
const totalTax = items.reduce((acc, item) => acc + (item.afterTax || 0), 0);
const totalAfterTax = totalPrice - totalTax;


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
           <FormGroup>
                <p>Tax <span style={{fontSize:"10px",fontWeight:"bolder"}}>{` (${inventoryItems.find((invItem) => invItem._id === item.itemId)?.tax?.taxId?.taxName || 'N/A'})`}</span></p>
                {inventoryItems.find((invItem) => invItem._id === item.itemId)?.tax?.components && inventoryItems.find((invItem) => invItem._id === item.itemId).tax.components.map((taxComponent, index) => (
                    <div key={index}>
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
                  {variant.optionLabel} - {variant.price}₹
                </option>
              ))}
            </Input>
         
          </FormGroup>
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
              onWheel={(e) => e.target.blur()}
              onChange={(e) =>
                handleItemChange(
                  index,
                  'quantity',
                  Math.max(0 , Math.min(parseFloat(e.target.value), getMaxQuantity(item.itemId, item.selectedVariant?.[0]?.optionLabel || "")))
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
              value={(item.selectedVariant && item.selectedVariant.length > 0) ? item.varSelPrice : item.price || 0}
              required
              readOnly
            />
          </FormGroup>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-12">
                <FormGroup>
                  <Label for={`afterTax-${index}`}>Tax Applied</Label>
                  <Input
                    type="number"
                    name={`afterTax-${index}`}
                    id={`afterTax-${index}`}
                    value={item.afterTax || 0}
                    readOnly
                  />
                </FormGroup>
              </div>

          <div className="col-lg-2 col-md-3 col-sm-12">
          <FormGroup>
            <Label for={`total-${index}`}>Total <span style={{fontSize:"10px"}}>Item + variant,tax</span></Label>
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
      <div className="summary-panel bg-light p-3 my-3">
          <h5 className="mb-3">Invoice Summary</h5>
          <p><strong>Total Items:</strong> {totalItems}</p>
          <p><strong>Total Price (Before Tax):</strong> ₹ {totalAfterTax.toFixed(2)}</p>
          <p><strong>Total Tax:</strong> ₹ {totalTax.toFixed(2)}</p>
          <p><strong>Total After Tax:</strong> ₹ {totalPrice.toFixed(2)}</p> 
      </div>

    </div>
  );
};

export default InvoiceItems;
