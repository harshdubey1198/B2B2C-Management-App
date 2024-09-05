import React, { useState, useRef, useEffect } from 'react';
import { Button, Form, Container, Breadcrumb, Card, CardBody } from 'reactstrap';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';
import InvoiceInputs from '../../components/InvoicingComponents/InvoiceInputs';
import axios from 'axios';
import { validatePhone } from '../Utility/FormValidation';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import PrintFormat from '../../components/InvoicingComponents/printFormat';
import CompanyModal from '../../components/InvoicingComponents/companyModal';

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
    const [isCompanyModalOpen, setCompanyModalOpen] = useState(false);
    const toggleCompanyModal = () => setCompanyModalOpen(!isCompanyModalOpen);
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
                    companyPhone: response.firmPhone,
                    companyEmail: response.firmEmail,
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

    const addItem = () => {
        setInvoiceData({
            ...invoiceData,
            items: [...invoiceData.items, { itemName: '', variant: '', quantity: 1, price: 0 }]
        });
    };

    const removeItem = (index) => {
        const newItems = [...invoiceData.items];
        newItems.splice(index, 1);
        setInvoiceData({ ...invoiceData, items: newItems });
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

        const storedInvoices = JSON.parse(localStorage.getItem("Invoice Form")) || [];
        storedInvoices.push(newInvoice);
        localStorage.setItem("Invoice Form", JSON.stringify(storedInvoices));

        setInvoiceData({
            companyName: "",
            companyAddress: "",
            companyLogo: "",
            companyPhone: "",
            companyEmail: "",
            gstin: "",
            bankName: "",
            IFSCCode: "",
            accountNumber: "",
            branchName: "",
            customerName: '',
            customerAddress: '',
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
                <Breadcrumbs title="aaMOBee" breadcrumbItem="Create Invoice" />
                <Card>
                    <CardBody>
                    <Form onSubmit={handleSubmit}>
                    <InvoiceInputs
                        invoiceData={invoiceData}
                        handleInputChange={handleInputChange}
                        handleFileChange={handleFileChange}
                        fakeItems={fakeItems}
                        toggleCompanyModal={toggleCompanyModal}
                        printInvoice={printInvoice}
                        addItem={addItem}
                        removeItem={removeItem}
                    />
                </Form>
                    </CardBody>
                </Card>
                <CompanyModal
                    isOpen={isCompanyModalOpen}
                    toggle={toggleCompanyModal}
                    invoiceData={invoiceData}
                    handleInputChange={handleInputChange}
                />
                <PrintFormat ref={printRef} invoiceData={invoiceData} />
            </div>
        </Container>
    );
};

export default Index;
