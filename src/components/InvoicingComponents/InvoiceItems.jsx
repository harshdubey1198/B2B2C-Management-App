import React from 'react';
import { FormGroup, Label, Input, Button } from 'reactstrap';

const InvoiceItems = ({ items, handleItemChange,  removeItem }) => {
    return (
        <div>
            {items.map((item, index) => (
                    <div className="d-flex flex-wrap flex-lg-row justify-content-between align-items-center w-100">                    <FormGroup>
                        <Label for={`itemName-${index}`}>Item Name</Label>
                        <Input 
                            type="select"
                            name={`itemName-${index}`}
                            id={`itemName-${index}`}
                            value={item.itemName}
                            onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                            required
                        >
                            <option value="">Select Item</option>
                            <option value="item1">Item 1</option>
                            <option value="item2">Item 2</option>
                            <option value="item3">Item 3</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for={`variant-${index}`}>Variant</Label>
                        <Input
                            type="select"
                            name={`variant-${index}`}
                            id={`variant-${index}`}
                            value={item.variant}
                            onChange={(e) => handleItemChange(index, 'variant', e.target.value)}
                            required
                        >
                            <option value="">Select Variant</option>
                            <option value="variant1">Variant 1</option>
                            <option value="variant2">Variant 2</option>
                            <option value="variant3">Variant 3</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for={`quantity-${index}`}>Quantity</Label>
                        <Input
                            type="number"
                            name={`quantity-${index}`}
                            id={`quantity-${index}`}
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
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
                        />
                    </FormGroup>
                    <Button color='danger' onClick={() => removeItem(index)}>Remove Item</Button>
                </div>
            ))}
        </div>
    );
};

export default InvoiceItems;
