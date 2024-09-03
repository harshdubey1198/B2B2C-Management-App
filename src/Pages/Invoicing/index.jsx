import React, { useState, useRef, useEffect } from 'react';
import { Button, Form, Container } from 'reactstrap';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';
import InvoiceInputs from '../../components/InvoicingComponents/InvoiceInputs';
// import PrintFormat from '../../components/InvoicingComponents/printFormat';
import { validatePhone } from '../Utility/FormValidation';
import axios from 'axios';

const Index = () => {
    const [companyData, setCompanyData] = useState({});
    const [invoiceData, setInvoiceData] = useState({
        companyName: "",
        companyAddress: "",
        companyLogo: "",
        companyPhone: "",
        companyEmail: "",
        bankName: "",
        IFSCCode: "",
        branchName: "",
        accountNumber: "",
        gstin: "",
        customerName: '',
        customerAddress: '',
        customerPhone: '',
        date: '',
        country: 'India',
        items: [],
        paymentLink: '',
        id: ''
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [variants, setVariants] = useState([]);
    const [fakeItems, setFakeItems] = useState([]);
    const printRef = useRef();
    const authuser = JSON.parse(localStorage.getItem("authUser"));

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL}/firmadmin/firmdata/${authuser?.response?._id}`)
            .then((response) => {
                const address = Array.isArray(response.companyAddress) ? response.companyAddress[0] : {};
                setCompanyData(response, "response");
                setInvoiceData((prevData) => ({
                    ...prevData,
                    companyName: response.firmName,
                    companyAddress: `${address.h_no || ""} ${address.nearby || ""} ${address.zip_code || ""} ${address.district || ""} ${address.state || ""} ${address.city || ""} ${address.country || ""}`.trim() || "",
                    companyLogo: response.avatar,
                    officeAddress: address.h_no,
                    companyCity: address.city,
                    companyNearby: address.nearby,
                    companyZip: address.zip_code,
                    companyDistrict: address.district,
                    companyState: address.state,
                    companyCountry: address.country,
                    companyPhone: response.firmPhone,
                    companyEmail: response.firmEmail,
                    customerHouse: '',
                    customerCity: '',
                    customerNearby: '',
                    customerZip: '',
                    customerDistrict: '',
                    customerState: '',
                    customerCountry: '',
                    customerPhone: '',
                    gstin: response.gstin,
                    bankName: response.bankName,
                    IFSCCode: response.ifscCode,
                    accountNumber: response.accountNumber,
                    branchName: response.branchName
                }));
            }).catch((error) => {
                console.log(error, "error");
            });

        const storedItemData = JSON.parse(localStorage.getItem("inventoryItems"));
        setFakeItems(storedItemData);
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
        updatedItems[index] = { ...updatedItems[index], [name]: value };
        setInvoiceData(prevState => ({ ...prevState, items: updatedItems }));
        if (name === "name"){
            const selectedItem = fakeItems.find(item => item.id === value);
            if (selectedItem) {
                const updatedItems = [...invoiceData.items];
                updatedItems[index] = {
                    ...updatedItems[index],
                    description: selectedItem.name,
                    price: selectedItem.price,
                    variants: selectedItem.variants,
                    id: selectedItem.id,
                    hsn: selectedItem.hsn,
                    quantity: 1,  
                    availableQuantity: selectedItem.variants.reduce((acc, variant) => acc + (parseFloat(variant.quantity) || 0), 0) // Ensure numeric addition
                };
                setInvoiceData(prevState => ({ ...prevState, items: updatedItems }));
                setVariants(selectedItem.variants || []);
        }
    }
    };


    // const handleDescriptionChange = (index, e) => {
    //     const { value } = e.target;
    //     const selectedItem = fakeItems.find(item => item.id === value);
    //     if (selectedItem) {
    //         const updatedItems = [...invoiceData.items];
    //         updatedItems[index] = {
    //             ...updatedItems[index],
    //             description: selectedItem.name,
    //             price: selectedItem.price,
    //             variants: selectedItem.variants,
    //             id: selectedItem.id,
    //             hsn: selectedItem.hsn,
    //             quantity: 1,  
    //             availableQuantity: selectedItem.variants.reduce((acc, variant) => acc + (parseFloat(variant.quantity) || 0), 0) // Ensure numeric addition
    //         };
    //         setInvoiceData(prevState => ({ ...prevState, items: updatedItems }));
    //         setVariants(selectedItem.variants || []);
    //     }
    // };
    
    
    const handleVariantChange = (index, e) => {
        const { value } = e.target;
        const selectedVariant = variants.find(variant => variant.id === value);
    
        if (selectedVariant) {
            const updatedItems = [...invoiceData.items];
            updatedItems[index] = {
                ...updatedItems[index],
                selectedVariant: selectedVariant.name, 
                id: selectedVariant.id,
                price: selectedVariant.price,
                availableQuantity: selectedVariant.quantity,
                quantity: 1
            };
            setInvoiceData(prevState => ({ ...prevState, items: updatedItems }));
        }
    };
    
    const addItem = () => {
        setInvoiceData(prevState => ({
            ...prevState,
            items: [...prevState.items, { quantity: 1, availableQuantity: 0 }]
        }));
    };

    const removeItem = (index) => {
        const updatedItems = invoiceData.items.filter((_, i) => i !== index);
        setInvoiceData(prevState => ({ ...prevState, items: updatedItems }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validatePhone(invoiceData.customerPhone)) {
            toast.error("Invalid Phone Number");
            return;
        }

        const newInvoice = {
            ...invoiceData,
            id: Math.floor(Math.random() * 1000000)
        };

        // Add the new invoice to localStorage
        const storedInvoices = JSON.parse(localStorage.getItem("Invoice Form")) || [];
        storedInvoices.push(newInvoice);
        localStorage.setItem("Invoice Form", JSON.stringify(storedInvoices));

        // Clear the form state after submission
        setInvoiceData({
            companyName: "",
            companyAddress: "",
            companyCity: "",
            officeAddress: "",
            companyNearby: "",
            companyZip: "",
            companyDistrict: "",
            companyState: "",
            companyCountry: "",
            companyLogo: "",
            companyPhone: "",
            companyEmail: "",
            customerName: '',
            customerAddress: '',
            customerHouse: '',
            customerCity: '',
            customerNearby: '',
            customerZip: '',
            customerDistrict: '',
            customerState: '',
            customerCountry: '',
            customerPhone: '',
            date: '',
            country: 'India',
            items: [], 
            paymentLink: ''
        });

        toast.success("Invoice Form Submitted Successfully");
    };

    const printInvoice = useReactToPrint({
        content: () => printRef.current
    });

    return (
        <Container>
            <div className='page-content'>
                <Form onSubmit={handleSubmit}>
                    <InvoiceInputs
                        invoiceData={invoiceData}
                        handleInputChange={handleInputChange}
                        handleFileChange={handleFileChange}
                        handleItemChange={handleItemChange}
                        // handleItemChange={() => {}}  // Remove quantity change handler
                        // handleDescriptionChange={handleDescriptionChange}
                        variants={variants}
                        fakeItems={fakeItems}
                        handleVariantChange={handleVariantChange}
                        addItem={addItem}
                        removeItem={removeItem}
                    />

                    <div className='d-flex justify-content-evenly mb-4'>
                        <Button color="success" type="submit">Submit</Button>
                        <Button color="info" onClick={printInvoice}>Print PDF</Button>
                    </div>
                </Form>

                {/* <PrintFormat ref={printRef} invoiceData={invoiceData} /> */}
            </div>
        </Container>
    );
};

export default Index;
