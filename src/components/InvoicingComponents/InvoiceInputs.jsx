import React from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, Card, CardBody } from 'reactstrap';

const countries = {
    India: { currency: 'INR', gst: 18 },
    Malaysia: { currency: 'MYR', gst: 6 },
    Dubai: { currency: 'AED', gst: 5 },
    Indonesia: { currency: 'IDR', gst: 10 }
};


const InvoiceInputs = ({
    invoiceData,
    setInvoiceData,
    handleInputChange,
    handleFileChange,
    handleItemChange,
    handleDescriptionChange,
    fakeItems,
    variants,
    handleVariantChange,
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
                    {/* <FormGroup>
                        <Label for="companyLogo">Company Logo</Label>
                        <Input
                            type="file"
                            name="companyLogo"
                            id="companyLogo"
                            // onChange={handleFileChange}
                            required
                        />
                    </FormGroup> */}
                    <FormGroup>
                        <Label for="companyName">Company Name</Label>
                        <Input
                            type="text"
                            name="companyName"
                            id="companyName"
                            value={invoiceData.companyName}
                            // onChange={handleInputChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="companyAddress">Company Address</Label>
                        <Input 
                        type="text"
                        name="officeAddress"
                        id="officeAddress"
                        value={invoiceData.officeAddress}
                        // onChange={handleInputChange}
                        required
                        />
                        <Input
                        type="text"
                        name="companyNearby"
                        id="companyNearby"
                        value={invoiceData.companyNearby}
                        // onChange={handleInputChange}
                        required
                        />
                        <Input 
                        type="text" 
                        name="companyDistrict"
                        id="companyDistrict"
                        value={invoiceData.companyDistrict}
                        // onChange={handleInputChange}
                        required
                        />
                        <Input 
                        type="text"
                        name="companyCity"
                        id="companyCity"
                        value={invoiceData.companyCity}
                        // onChange={handleInputChange}
                        required
                        />
                        <Input
                        type="text"
                        name="companyZip"
                        id="companyZip"
                        value={invoiceData.companyZip}
                        // onChange={handleInputChange}
                        required
                        />
                        <Input
                        type="text"
                        name="companyState"
                        id="companyState"
                        value={invoiceData.companyState}
                        // onChange={handleInputChange}
                        required
                        />
                        <Input
                        type="text"
                        name="companyCountry"
                        id="companyCountry"
                        value={invoiceData.companyCountry}
                        // onChange={handleInputChange}
                        required
                        />
                        
                    </FormGroup>
                    <FormGroup>
                        <Label for="companyPhone">Company Phone</Label>
                        <Input
                            type="text"
                            name="companyPhone"
                            id="companyPhone"
                            value={invoiceData.companyPhone}
                            // onChange={handleInputChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="companyEmail">Company Email</Label>
                        <Input
                            type="text"
                            name="companyEmail"
                            id="companyEmail"
                            value={invoiceData.companyEmail}
                            // onChange={handleInputChange}
                            required
                        />
                    </FormGroup>
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
                    <FormGroup>
                        <Label for="invoiceType">Invoice Type</Label> <br/>
                        {/* <Input type="radio" name="invoiceType" value="GST" onChange={handleInputChange} required /> GST &nbsp; &nbsp; &nbsp; &nbsp; 
                        <Input type="radio" name="invoiceType" value="Non-GST" onChange={handleInputChange} required /> Non-GST  */}
                        <Input type="select" name="invoiceType" id="invoiceType" value={invoiceData.invoiceType} onChange={handleInputChange} required>
                            <option value="">Select Invoice Type</option>
                            <option value="GST">GST</option>
                            <option value="Non-GST">Non-GST</option>
                        </Input>
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
                        {/* <Input
                            type="text"
                            name="customerAddress"
                            id="customerAddress"
                            value={invoiceData.customerAddress}
                            onChange={handleInputChange}
                            required
                        /> */}
                         <Input 
                        type="text"
                        name="customerHouse"
                        id="customerHouse"
                        placeholder='House No.'
                        value={invoiceData.customerHouse}
                        onChange={handleInputChange}
                        required
                        />
                        <Input
                        type="text"
                        name="customerNearby"
                        id="customerNearby"
                        placeholder='Nearby Landmark'
                        value={invoiceData.customerNearby}
                        onChange={handleInputChange}
                        required
                        />
                        <Input 
                        type="text" 
                        name="customerDistrict"
                        id="customerDistrict"
                        placeholder='District'
                        value={invoiceData.customerDistrict}
                        onChange={handleInputChange}
                        required
                        />
                        <Input 
                        type="text"
                        name="customerCity"
                        id="customerCity"
                        placeholder='City'
                        value={invoiceData.customerCity}
                        onChange={handleInputChange}
                        required
                        />
                        <Input
                        type="text"
                        name="customerZip"
                        id="customerZip"
                        placeholder='Zip Code'
                        value={invoiceData.customerZip}
                        onChange={handleInputChange}
                        required
                        />
                        <Input
                        type="text"
                        name="customerState"
                        id="customerState"
                        placeholder='State'
                        value={invoiceData.customerState}
                        onChange={handleInputChange}
                        required
                        />
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
                        <Input type="text" name="customerPhone" id="customerPhone" value={invoiceData.customerPhone} onChange={handleInputChange} required />        
                    </FormGroup>
                    <FormGroup>
                        <Label for="dueDate">Due Date</Label>
                        <Input type="date" name="dueDate" id="dueDate" value={invoiceData.dueDate} onChange={handleInputChange} required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="issueDate">Issue Date</Label>
                        <Input type="date" name="issueDate" id="issueDate" value={invoiceData.issueDate} onChange={handleInputChange} required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="invoiceSubType" >Invoice Sub Type</Label>
                        <Input type="select" name="invoiceSubType" id="invoiceSubType" value={invoiceData.invoiceSubType} onChange={handleInputChange} required>
                            <option value="">Select Invoice Sub Type</option>
                            <option value="Original">     Original</option>
                            <option value="Duplicate">    Duplicate</option>
                            <option value="Triplicate">   Triplicate</option>
                            <option value="Quadruplicate">Quadruplicate</option>
                        </Input>
                    </FormGroup>
                </Col>
            </Row>
            
    <h4>Items</h4>
    {invoiceData.items.map((item, index) => (
                <Row key={index} className="mb-3">
                    <Col md={3}>
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
                    <Col md={3}>
                        <FormGroup>
                            <Label for={`variant${index}`}>Variants</Label>
                            <Input
                                type="select"
                                name={`variant${index}`}
                                id={`variant${index}`}
                                // value={item.variant || ''}
                                onChange={(e) => handleVariantChange(index, e)}
                            >
                                <option value="">Select Variant</option>
                                {variants.map(variant => (
                                    <option key={variant.id} value={variant.id}>{variant.name}</option>
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
                                value={item.quantity || 0}
                                onChange={(e) => handleItemChange(index, e)}
                                min="1"
                                max={item.availableQuantity || 0}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={1}>
                        <FormGroup>
                            <Label for={`availableQuantity${index}`}>Av. Qty</Label>
                            <Input
                                type="text"
                                id={`availableQuantity${index}`}
                                value={item.availableQuantity || 0}
                                readOnly
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
                                value={((item.quantity || 0) * (item.price || 0)).toFixed(2)}
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
            {/* <Button color="success" type="submit" className="ml-2">Generate Invoice</Button> */}
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
