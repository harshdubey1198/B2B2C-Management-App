import React, { useEffect, useState } from "react";
import { FormGroup, Label, Input, Row, Col, Form } from "reactstrap";
// import InvoiceItems from "./InvoiceItems";

const countries = {
  India: { currency: "INR", gst: 18 },
  Malaysia: { currency: "MYR", gst: 6 },
  Dubai: { currency: "AED", gst: 5 },
  Indonesia: { currency: "IDR", gst: 10 },
};

const InvoiceInputs = ({ invoiceData, handleInputChange }) => {
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
              <Label for="customerAddress.h_no">Customer House No.</Label>
              <Input
                type="text"
                name="customerAddress.h_no"
                id="customerAddress.h_no"
                placeholder='House No.'
                value={invoiceData.customerAddress.h_no}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="customerAddress.nearby">Nearby Landmark</Label>
              <Input
                type="text"
                name="customerAddress.nearby"
                id="customerAddress.nearby"
                placeholder='Nearby Landmark'
                value={invoiceData.customerAddress.nearby}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="customerEmail">Customer Email</Label>
              <Input
                type="email"
                name="customerEmail"
                id="customerEmail"
                placeholder='Customer Email'
                value={invoiceData.customerEmail}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="customerAddress.district">District</Label>
              <Input
                type="text"
                name="customerAddress.district"
                id="customerAddress.district"
                placeholder='District'
                value={invoiceData.customerAddress.district}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="customerAddress.city">City</Label>
              <Input
                type="text"
                name="customerAddress.city"
                id="customerAddress.city"
                placeholder='City'
                value={invoiceData.customerAddress.city}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="customerAddress.zip_code">Zip Code</Label>
              <Input
                type="text"
                name="customerAddress.zip_code"
                id="customerAddress.zip_code"
                placeholder='Zip Code'
                value={invoiceData.customerAddress.zip_code}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="customerAddress.state">State</Label>
              <Input
                type="text"
                name="customerAddress.state"
                id="customerAddress.state"
                placeholder='State'
                value={invoiceData.customerAddress.state}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="customerAddress.country">Country</Label>
              <Input
                type="text"
                name="customerAddress.country"
                id="customerAddress.country"
                placeholder='Country'
                value={invoiceData.customerAddress.country}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="customerPhone">Customer Phone</Label>
              <Input
                type="number"
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
      
       
      </div>
    </>
  );
};

export default InvoiceInputs;
