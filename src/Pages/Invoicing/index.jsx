import React, { useState, useRef, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, Alert } from 'reactstrap';
import { useReactToPrint } from 'react-to-print';

// Updated fakeItems with prices
const fakeItems = [
    { id: 1, name: 'Item A', price: 10.00 },
    { id: 2, name: 'Item B', price: 20.00 },
    { id: 3, name: 'Item C', price: 30.00 }
];

const Index = () => {
    const [invoiceData, setInvoiceData] = useState({
        customerName: '',
        date: '',
        items: [{ description: '', quantity: 1, price: 0 }]
    });
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        // Fetch user role from local storage
        const authUser = localStorage.getItem('authUser');
        if (authUser) {
            const user = JSON.parse(authUser);
            setUserRole(user.role); // Set user role based on local storage data
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInvoiceData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const updatedItems = [...invoiceData.items];
        updatedItems[index][name] = parseFloat(value) || 0; // Convert to number
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
                price: selectedItem.price // Set price based on selected item
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
        // Validation and submission logic here
        // e.g., axios.post('/api/invoices', invoiceData);
    };

    const PrintInvoice = React.forwardRef((props, ref) => (
        <div ref={ref} className="invoice p-4 bg-white border rounded">
            <h2>Invoice</h2>
            <p><strong>Customer Name:</strong> {invoiceData.customerName}</p>
            <p><strong>Date:</strong> {invoiceData.date}</p>
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
            <p><strong>Total:</strong> {invoiceData.items.reduce((acc, item) => acc + (item.quantity * item.price), 0).toFixed(2)}</p>
        </div>
    ));

    const printInvoice = useReactToPrint({
        content: () => printRef.current
    });

    const printRef = useRef();

    return (
        <React.Fragment>
            <div className='page-content'>
                {userRole && (
                    <div>
                        {['Master', 'client_admin', 'firm_admin', 'accountant'].includes(userRole) ? (
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
