import React, { useState, useRef, useEffect } from 'react';
import { Button, Form, Alert, Container } from 'reactstrap';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';
import InvoiceInputs from '../../components/InvoicingComponents/InvoiceInputs';
import PrintFormat from '../../components/InvoicingComponents/printFormat';
import { checkEmptyFields, validatePhone } from '../Utility/FormValidation';

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
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const printRef = useRef();

  

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInvoiceData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setInvoiceData(prevState => ({
                    ...prevState,
                    companyLogo: reader.result 
                }));
            };
            reader.readAsDataURL(file);
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

        // setError("");
        // setSuccess("");
        //toast.error("");
        toast.success("");

      
        if (!validatePhone(invoiceData.customerPhone)) {
            // setError("Invalid Phone Number");
            toast.error("Invalid Phone Number");
            return;
        }

        const newdata = {
            ...invoiceData,
            id: Math.floor(Math.random() * 1000000)
        };

        
        setTimeout(() => {
            const storedData = JSON.parse(localStorage.getItem("Invoice Form")) || [];
            storedData.push(newdata);
            localStorage.setItem("Invoice Form", JSON.stringify(storedData));

            
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

            toast.success("Invoice Form Submitted Successfully");
        }, 1000);
    };

    const printInvoice = useReactToPrint({
        content: () => printRef.current
    });

    return (
        <Container>
            <div className='page-content'>
                <Form onSubmit={handleSubmit}>
                    {/* {error && <Alert color='danger'>{error}</Alert>}
                    {success && <Alert color='success'>{success}</Alert>} */}

                    <InvoiceInputs 
                        invoiceData={invoiceData}
                        handleInputChange={handleInputChange}
                        handleFileChange={handleFileChange}
                        handleItemChange={handleItemChange}
                        handleDescriptionChange={handleDescriptionChange}
                        addItem={addItem}
                        removeItem={removeItem}
                    />

                    <div className='d-flex justify-content-evenly mb-4'>
                        <Button color="success" type="submit">Submit</Button>
                        <Button color="info" onClick={printInvoice}>Print PDF</Button>
                    </div>
                </Form>

                <PrintFormat ref={printRef} invoiceData={invoiceData} />
            </div>
        </Container>
    );
};

export default Index;
