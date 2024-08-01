import React, { useState, useRef, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, Alert } from 'reactstrap';
import { useReactToPrint } from 'react-to-print';

const countries = {
    India: { currency: 'INR', gst: 18 }, // GST as 18% for India
    Malaysia: { currency: 'MYR', gst: 6 }, // GST as 6% for Malaysia
    Dubai: { currency: 'AED', gst: 5 }, // VAT as 5% for Dubai
    Indonesia: { currency: 'IDR', gst: 10 } // VAT as 10% for Indonesia
};

const fakeItems = [
    { id: 1, name: 'Item A', price: 10.00 },
    { id: 2, name: 'Item B', price: 20.00 },
    { id: 3, name: 'Item C', price: 30.00 }
];

const Index = () => {
    const [invoiceData, setInvoiceData] = useState({
        customerName: '',
        date: '',
        country: 'India', 
        items: [{ description: '', quantity: 1, price: 0 }]
    });
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const authUser = localStorage.getItem('authUser');
        if (authUser) {
            const user = JSON.parse(authUser);
            setUserRole(user?.response?.role); 
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInvoiceData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const updatedItems = [...invoiceData.items];
        updatedItems[index][name] = parseFloat(value) || 0; 
        setInvoiceData(prevState => ({ ...prevState, items: updatedItems }));
    };

    const handleDescriptionChange = (index, e) => {
        const { value } = e.target;
        const selectedItem = fakeItems.find(item => item.id === parseInt(value));
        if (selectedItem) {
            const updatedItems = [...invoiceData.items];
            updatedItems[index] = {
                ...updatedItems[index],
                description: selectedItem.name,
                price: selectedItem.price 
            };
            setInvoiceData(prevState => ({ ...prevState, items: updatedItems }));
        }
    };

    const addItem = () => {
        setInvoiceData(prevState => ({
            ...prevState,
            items: [...prevState.items, { description: '', quantity: 1, price: 0 }]
        }));
    };

    const removeItem = (index) => {
        const updatedItems = invoiceData.items.filter((_, i) => i !== index);
        setInvoiceData(prevState => ({ ...prevState, items: updatedItems }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Invoice data submitted:', invoiceData);
    };

    const PrintInvoice = React.forwardRef((props, ref) => {
        const { country } = invoiceData;
        const taxRate = countries[country]?.gst || 0;
        const totalAmount = invoiceData.items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
        const taxAmount = (totalAmount * taxRate) / 100;

        return (
            <div ref={ref} className="card p-4  border rounded">
                <h2>Invoice</h2>
                <p><strong>Customer Name:</strong> {invoiceData.customerName}</p>
                <p><strong>Date:</strong> {invoiceData.date}</p>
                <p><strong>Country:</strong> {country}</p>
                <p><strong>Currency:</strong> {countries[country]?.currency || 'Unknown'}</p>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoiceData.items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.description}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price.toFixed(2)}</td>
                                <td>{(item.quantity * item.price).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p><strong>Subtotal:</strong> {totalAmount.toFixed(2)}</p>
                <p><strong>Tax ({taxRate}%):</strong> {taxAmount.toFixed(2)}</p>
                <p><strong>Total:</strong> {(totalAmount + taxAmount).toFixed(2)}</p>
            </div>
        );
    });

    const printInvoice = useReactToPrint({
        content: () => printRef.current
    });

    const printRef = useRef();

    return (
        <React.Fragment>
            <div className='page-content'>
                {userRole && (
                    <div>
                        {['super_admin', 'client_admin', 'firm_admin', 'accountant'].includes(userRole) ? (
                            <div>
                                <Form onSubmit={handleSubmit}>
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
                                                        disabled // Price is now automatically set by the dropdown
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md={2} className="d-flex align-items-center">
                                                <Button color="danger" onClick={() => removeItem(index)}>Remove</Button>
                                            </Col>
                                        </Row>
                                    ))}
                                    <div className='d-flex justify-content-evenly mb-4'>
                                      <Button color="primary" onClick={addItem}>Add Item</Button>
                                      <Button color="success" type="submit">Submit</Button>
                                      <Button color="info" onClick={printInvoice}>Print PDF</Button>
                                    </div>
                                </Form>
                                <PrintInvoice ref={printRef} />
                            </div>
                        ) : (
                            <Alert color="warning">You do not have permission to view this page.</Alert>
                        )}
                    </div>
                )}
            </div>
        </React.Fragment>
    );
};

export default Index;
