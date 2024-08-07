import React, { useState, useRef, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, Alert, Container } from 'reactstrap';
import { useReactToPrint } from 'react-to-print';
import { checkEmptyFields, validatePhone } from '../Utility/FormValidation';

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

const Index = () => {
    const [invoiceData, setInvoiceData] = useState({
        companyName: "",
        companyAddress: "",
        companyLogo: "",
        customerName: '',
        customerAddress: '',
        customerPhone: '',
        date: '',
        country: 'India',
        items: [{ description: '', quantity: 1, price: 0 }],
        paymentLink: '',
        id: ''
    });
    const [userRole, setUserRole] = useState(null);
    const [logo, setLogo] = useState('');
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    useEffect(() => {
        const authUser = localStorage.getItem('authUser');
        if (authUser) {
            const user = JSON.parse(authUser);
            setUserRole(user?.response?.role);
        }

        // Retrieve logo from local storage
        const firmsData = localStorage.getItem('Firms');
        if (firmsData) {
            const firms = JSON.parse(firmsData);
            const currentFirm = firms.find(firm => firm.id === 1); // Change this as needed
            if (currentFirm) {
                setLogo(currentFirm.image || '');
            }
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInvoiceData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setInvoiceData((prevState) => ({
              ...prevState,
              companyLogo: reader.result, // Store the Base64 image string directly
            }));
          };
          reader.readAsDataURL(file); // Convert image to Base64
        }
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
        
        // Clear previous errors
        setError("");
        setSuccess("");
    
        // Perform validation checks
        
        if (!validatePhone(invoiceData.customerPhone)) {
            setError("Invalid Phone Number");
            return;
        }
    
        const newdata = {
            ...invoiceData,
            id: Math.floor(Math.random() * 1000000)
        }
        // Store data in local storage
        setTimeout(() => {
            const storedData = JSON.parse(localStorage.getItem("Invoice Form")) || [];
            storedData.push(newdata);
            localStorage.setItem("Invoice Form", JSON.stringify(storedData));
    
            // Clear the form data and show success message
            setInvoiceData({
                companyName: "",
                companyAddress: "",
                companyLogo: "",
                customerName: '',
                customerAddress: '',
                customerPhone: '',
                date: '',
                country: 'India',
                items: [{ description: '', quantity: 1, price: 0 }],
                paymentLink: ''
            });
    
            setSuccess("Invoice Form Submitted Successfully");
        }, 1000);
    };
    
    const PrintInvoice = React.forwardRef((props, ref) => {
        const { country, paymentLink } = invoiceData;
        const taxRate = countries[country]?.gst || 0;
        const totalAmount = invoiceData.items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
        const taxAmount = (totalAmount * taxRate) / 100;

        return (
            <div ref={ref} className="card p-4 border rounded">
                <div className="text-center mb-4">
                    {invoiceData && <img src={invoiceData.companyLogo} alt="Company Logo" style={{ maxWidth: '150px' }} />}
                    <h3>{invoiceData?.companyName}</h3>
                    <p>{invoiceData?.companyAddress}</p>
                </div>
                <h2>Invoice</h2>
                <p><strong>Invoice Number:</strong> {Math.floor(Math.random() * 1000000)}</p>
                <p><strong>Customer Name:</strong> {invoiceData.customerName}</p>
                <p><strong>Customer Address:</strong> {invoiceData.customerAddress}</p>
                <p><strong>Customer Phone:</strong> {invoiceData.customerPhone}</p>
                <p><strong>Date:</strong> {invoiceData.date}</p>
                <p><strong>Country:</strong> {country}</p>
                <p><strong>Currency:</strong> {countries[country]?.currency || 'Unknown'}</p>
                <p><strong>Prepared by:</strong> {userRole}</p>
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
                <p><strong>Payment Link:</strong> <a href={paymentLink} target="_blank" rel="noopener noreferrer">Pay Now</a></p>
            </div>
        );
    });

    const printInvoice = useReactToPrint({
        content: () => printRef.current
    });

    const printRef = useRef();

    return (
        <Container>
    <div className='page-content'>
        {userRole && (
            <div>
                {['super_admin', 'client_admin', 'firm_admin', 'accountant'].includes(userRole) ? (
                    <div>
                        <Form onSubmit={handleSubmit}>
                            {error && <Alert color='danger'>{error}</Alert>}
                            {success && <Alert color='success'>{success}</Alert>}
                            <Row className="mb-4">
                                <Col md={6}>
                                    <div className="company-info">
                                    <FormGroup>
                                            <Label for="customerName">Company Logo</Label>
                                            <Input
                                                type="file"
                                                name="companyLogo"
                                                id="companyLogo"
                                                onChange={handleFileChange}
                                                required
                                            />
                                        </FormGroup>                                        <FormGroup>
                                            <Label for="customerName">Company Name</Label>
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
                                            <Label for="customerName">Comapany Address</Label>
                                            <Input
                                                type="text"
                                                name="companyAddress"
                                                id="companyAddress"
                                                value={invoiceData.companyAddress}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </FormGroup>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="customer-info">
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
                                    </div>
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
                                                disabled
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
                                <Button color="success" type="submit"  onClick={handleSubmit}>Submit</Button>
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
</Container>

    );
};

export default Index;
