import React from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col, Card, CardBody } from "reactstrap";
import InvoiceItems from "./InvoiceItems";

const countries = {
  India: { currency: "INR", gst: 18 },
  Malaysia: { currency: "MYR", gst: 6 },
  Dubai: { currency: "AED", gst: 5 },
  Indonesia: { currency: "IDR", gst: 10 },
};

const InvoiceInputs = ({ invoiceData, handleInputChange, toggleCompanyModal, printInvoice, addItem, removeItem }) => {
    return (
      <>
        <div className="invoice-form">
          <h3>Invoice Details</h3>
          <Row>
            <Col sm={6}>
              <FormGroup>
                <Label for="customerName">Customer Name</Label>
                <Input
                  type="text"
                  name="customerName"
                  id="customerName"
                  value={invoiceData.customerName}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup>
                <Label for="customerAddress">Customer Address</Label>
                <Input
                  type="text"
                  name="customerAddress"
                  id="customerAddress"
                  value={invoiceData.customerAddress}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup>
                <Label for="customerPhone">Customer Phone</Label>
                <Input
                  type="text"
                  name="customerPhone"
                  id="customerPhone"
                  value={invoiceData.customerPhone}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup>
                <Label for="date">Date</Label>
                <Input
                  type="date"
                  name="date"
                  id="date"
                  value={invoiceData.date}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup>
                <Label for="country">Country</Label>
                <Input
                  type="select"
                  name="country"
                  id="country"
                  value={invoiceData.country}
                  onChange={handleInputChange}
                  required
                >
                  {/* Replace with actual country options */}
                  <option value="India">India</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Dubai">Dubai</option>
                  <option value="Indonesia">Indonesia</option>
                </Input>
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup>
                <Label for="paymentLink">Payment Link</Label>
                <Input
                  type="text"
                  name="paymentLink"
                  id="paymentLink"
                  value={invoiceData.paymentLink}
                  onChange={handleInputChange}
                />
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
           <div className="d-flex justify-content-evenly ">
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