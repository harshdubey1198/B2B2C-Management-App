import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import InvoiceItems from "./InvoiceItems";

const countries = {
  India: { currency: "INR", gst: 18 },
  Malaysia: { currency: "MYR", gst: 6 },
  Dubai: { currency: "AED", gst: 5 },
  Indonesia: { currency: "IDR", gst: 10 },
};

const InvoiceInputs = ({ invoiceData, handleInputChange, toggleCompanyModal, printInvoice, addItem, removeItem }) => {
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const [issueDate, setIssueDate] = useState(getCurrentDate());

  useEffect(() => {
    if (!invoiceData.issueDate) {
      handleInputChange({ target: { name: 'issueDate', value: issueDate } });
    }
  }, [issueDate, invoiceData.issueDate, handleInputChange]);

  return (
    <>
      <div className="invoice-form">
        <h3>Invoice Details</h3>
        <Row>
          <Col>
            <FormGroup>
              <Label for="customerName">Customer Name</Label>
              <Input
                type="text"
                name="customerName"
                placeholder='Customer Name'
                id="customerName"
                value={invoiceData.customerName}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="customerHouse">Customer House No.</Label>
              <Input
                type="text"
                name="customerHouse"
                id="customerHouse"
                placeholder='House No.'
                value={invoiceData.customerHouse}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="customerNearby">Nearby Landmark</Label>
              <Input
                type="text"
                name="customerNearby"
                id="customerNearby"
                placeholder='Nearby Landmark'
                value={invoiceData.customerNearby}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="customerDistrict">District</Label>
              <Input
                type="text"
                name="customerDistrict"
                id="customerDistrict"
                placeholder='District'
                value={invoiceData.customerDistrict}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="customerCity">City</Label>
              <Input
                type="text"
                name="customerCity"
                id="customerCity"
                placeholder='City'
                value={invoiceData.customerCity}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="customerZip">Zip Code</Label>
              <Input
                type="text"
                name="customerZip"
                id="customerZip"
                placeholder='Zip Code'
                value={invoiceData.customerZip}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="customerState">State</Label>
              <Input
                type="text"
                name="customerState"
                id="customerState"
                placeholder='State'
                value={invoiceData.customerState}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="customerCountry">Country</Label>
              <Input
                type="text"
                name="customerCountry"
                id="customerCountry"
                placeholder='Country'
                value={invoiceData.customerCountry}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="customerPhone">Customer Phone</Label>
              <Input
                type="text"
                name="customerPhone"
                id="customerPhone"
                placeholder='Customer Phone'
                value={invoiceData.customerPhone}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="issueDate">Issue Date</Label>
              <Input
                type="date"
                name="issueDate"
                id="issueDate"
                value={invoiceData.issueDate || issueDate}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="dueDate">Due Date</Label>
              <Input
                type="date"
                name="dueDate"
                id="dueDate"
                value={invoiceData.dueDate}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="invoiceType">Invoice Type</Label>
              <Input
                type="select"
                name="invoiceType"
                id="invoiceType"
                value={invoiceData.invoiceType}
                onChange={handleInputChange}
                required
              >
                <option value="Tax Invoice">Select Invoice Type</option>
                <option value="Tax Invoice">Tax Invoice</option>
                <option value="Bill of Supply">Bill of Supply</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="invoiceSubType">Invoice Sub Type</Label>
              <Input
                type="select"
                name="invoiceSubType"
                id="invoiceSubType"
                value={invoiceData.invoiceSubType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Invoice Sub Type</option>
                <option value="Original">Original</option>
                <option value="Duplicate">Duplicate</option>
                <option value="Triplicate">Triplicate</option>
                <option value="Quadruplicate">Quadruplicate</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <h3>Invoice Items</h3>
        <InvoiceItems
          items={invoiceData.items}
          handleItemChange={(index, field, value) => {
            const newItems = [...invoiceData.items];
            newItems[index] = { ...newItems[index], [field]: value };
            handleInputChange({ target: { name: 'items', value: newItems } });
          }}
          removeItem={removeItem}
        />
        <FormGroup>
          <div className="d-flex justify-content-evenly mt-5">
            <Button color="info" onClick={addItem}>Add Item</Button>
            <Button type="submit" color="primary">Submit</Button>
            <Button type="button" color="secondary" onClick={printInvoice}>Print Invoice</Button>
            <Button type="button" color="info" onClick={toggleCompanyModal}>Edit Company Details</Button>
          </div>
        </FormGroup>
      </div>
    </>
  );
};

export default InvoiceInputs;
