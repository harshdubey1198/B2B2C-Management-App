import React from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, Alert, Card, CardBody } from 'reactstrap';

const countries = {
    India: { currency: 'INR', gst: 18 },
    Malaysia: { currency: 'MYR', gst: 6 },
    Dubai: { currency: 'AED', gst: 5 },
    Indonesia: { currency: 'IDR', gst: 10 }
};

const fakeItems = [
    { id: 1, name: 'Item A', price: 10.00 },
    { id: 2, name: 'Item B', price: 20.00 },
    { id: 3, name: 'Item C', price: 30.00 }
];

const InvoiceInputs = ({
    invoiceData,
    setInvoiceData,
    handleInputChange,
    handleFileChange,
    handleItemChange,
    handleDescriptionChange,
    addItem,
    removeItem,
    handleSubmit,
    error,
    success
}) => {
    const renderInputsSection = () => (
        <Form onSubmit={handleSubmit}>
            {/* {error && <Alert color='danger'>{error}</Alert>}
            {success && <Alert color='success'>{success}</Alert>} */}
            {/* toast.error(error);
            toast.success(success); */}
            
            <Row className="mb-4">
                <Col md={6}>
                    <FormGroup>
                        <Label for="companyLogo">Company Logo</Label>
                        <Input
                            type="file"
                            name="companyLogo"
                            id="companyLogo"
                            onChange={handleFileChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="companyName">Company Name</Label>
                        <Input
                            type="text"
                            name="companyName"
                            id="companyName"
                            value={invoiceData.companyName}
                            onChange={handleInputChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="companyAddress">Company Address</Label>
                        <Input
                            type="text"
                            name="companyAddress"
                            id="companyAddress"
                            value={invoiceData.companyAddress}
                            onChange={handleInputChange}
                            required
                        />
                    </FormGroup>
                </Col>
                <Col md={6}>
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
            </Row>
            <Row className="mb-4">
                <Col md={6}>
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
                <Col md={6}>
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
                            {Object.keys(countries).map((country) => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </Input>
                    </FormGroup>
                </Col>
            </Row>
            <FormGroup>
                <Label for="paymentLink">Payment Link</Label>
                <Input
                    type="url"
                    name="paymentLink"
                    id="paymentLink"
                    value={invoiceData.paymentLink}
                    onChange={handleInputChange}
                    required
                />
            </FormGroup>
            <h4>Items</h4>
            {invoiceData.items.map((item, index) => (
                <Row key={index} className="mb-3">
                    <Col md={4}>
                        <FormGroup>
                            <Label for={`description${index}`}>Description</Label>
                            <Input
                                type="select"
                                name="description"
                                id={`description${index}`}
                                value={fakeItems.find(i => i.name === item.description)?.id || ''}
                                onChange={(e) => handleDescriptionChange(index, e)}
                                required
                            >
                                <option value="">Select Item</option>
                                {fakeItems.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Label for={`quantity${index}`}>Quantity</Label>
                            <Input
                                type="number"
                                name="quantity"
                                id={`quantity${index}`}
                                value={item.quantity}
                                onChange={(e) => handleItemChange(index, e)}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Label for={`price${index}`}>Price</Label>
                            <Input
                                type="number"
                                name="price"
                                id={`price${index}`}
                                value={item.price}
                                onChange={(e) => handleItemChange(index, e)}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Label>Total</Label>
                            <Input
                                type="text"
                                value={(item.quantity * item.price).toFixed(2)}
                                readOnly
                            />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <Button color="danger" onClick={() => removeItem(index)} className="mt-4">Remove</Button>
                    </Col>
                </Row>
            ))}
            <Button color="primary" onClick={addItem}>Add Item</Button>
            <Button color="success" type="submit" className="ml-2">Generate Invoice</Button>
        </Form>
    );

    const renderPreviewSection = () => (
        <Card className="mt-5">
            <CardBody>
                <h4>Invoice Preview</h4>
                <div>
                    <strong>Company Name:</strong> {invoiceData.companyName}
                </div>
                <div>
                    <strong>Company Address:</strong> {invoiceData.companyAddress}
                </div>
                <div>
                    <strong>Customer Name:</strong> {invoiceData.customerName}
                </div>
                <div>
                    <strong>Customer Address:</strong> {invoiceData.customerAddress}
                </div>
                <div>
                    <strong>Date:</strong> {invoiceData.date}
                </div>
                <div>
                    <strong>Country:</strong> {invoiceData.country}
                </div>
                <div>
                    <strong>Items:</strong>
                    <ul>
                        {invoiceData.items.map((item, index) => (
                            <li key={index}>
                                {item.description} - Quantity: {item.quantity}, Price: {item.price}, Total: {(item.quantity * item.price).toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* <div>
                    <strong>Payment Link:</strong> <a href={invoiceData.paymentLink} target="_blank" rel="noopener noreferrer">Click here to pay</a>
                </div> */}
            </CardBody>
        </Card>
    );

    return (
        <div>
            {renderInputsSection()}
            {renderPreviewSection()}
        </div>
    );
};

export default InvoiceInputs;
