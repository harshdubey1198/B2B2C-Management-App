import React, { useState, useRef, useEffect } from 'react';
import { Button, Form, Alert, Container } from 'reactstrap';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';
import InvoiceInputs from '../../components/InvoicingComponents/InvoiceInputs';
import PrintFormat from '../../components/InvoicingComponents/printFormat';
import { checkEmptyFields, validatePhone } from '../Utility/FormValidation';
import axios from 'axios';

// const fakeItems = [
//     { id: 1, name: 'Item A', price: 10.00 },
//     { id: 2, name: 'Item B', price: 20.00 },
//     { id: 3, name: 'Item C', price: 30.00 }
// ];

const Index = () => {
    const [companyData, setCompanyData] = useState({})
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
    const [variants, setVariants] = useState([])
    const [fakeItems, setFakeItems] = useState([])
    const printRef = useRef();
    const authuser = JSON.parse(localStorage.getItem("authUser"))

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL}/firmadmin/firmdata/${authuser?.response?._id}`).then((response) => {
            console.log(response, "response")
            const address = Array.isArray(response.companyAddress) ? response.companyAddress[0] : {};
            setCompanyData(response, "response")
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
            }))
        }).catch((error) => {
            console.log(error, "error")
        })

        const storedItemData = JSON.parse(localStorage.getItem("inventoryItems"))
        console.log(storedItemData, "storeddatata")
        setFakeItems(storedItemData)    
        setInvoiceData((prevState) => ({
            ...prevState,
            items: storedItemData ? storedItemData : []
        }))
    },[])
    
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
        const selectedItem = fakeItems.find(item => item.id === (value));
        if (selectedItem) {
            const updatedItems = [...invoiceData.items];
            updatedItems[index] = {
                ...updatedItems[index],
                description: selectedItem.name,
                price: selectedItem.price,
                variants: selectedItem.variants,
                id: selectedItem.id,
                quantity: selectedItem.quantity
            };
            setInvoiceData(prevState => ({ ...prevState, items: updatedItems }));
            setVariants(selectedItem.variants);
        }
    };
    
    console.log(variants, "variants")
    const handleVariantChange = (index, e) => {
        const { value } = e.target;
        console.log(value, "value");
        const selectedItemVariant = variants.find(variant => variant.id === value);
        console.log(selectedItemVariant, "selectedvarieant")
        if (selectedItemVariant) {
            const updatedItems = [...invoiceData.items];
            updatedItems[index] = {
                ...updatedItems[index],
                selectedVariant: selectedItemVariant.name,
                variantId: selectedItemVariant.id,
                quantity: selectedItemVariant.quantity,
                price: selectedItemVariant.price
            };
            setInvoiceData(prevState => ({ ...prevState, items: updatedItems }));
        }
    };

    const addItem = () => {
        setInvoiceData(prevState => ({
            ...prevState,
            items: [...prevState.items]
        }));
    };

    const removeItem = (index) => {
        const updatedItems = invoiceData.items.filter((_, i) => i !== index);
        setInvoiceData(prevState => ({ ...prevState, items: updatedItems }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
     
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
        }, 1000);
    };

    const printInvoice = useReactToPrint({
        content: () => printRef.current
    });
    console.log(invoiceData, "invoicedata")
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

                <PrintFormat ref={printRef} invoiceData={invoiceData} />
            </div>
        </Container>
    );
};

export default Index;
