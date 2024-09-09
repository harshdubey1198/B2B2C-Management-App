import React, { useState, useRef, useEffect } from 'react';
import { Button, Form, Container, Card, CardBody, FormGroup } from 'reactstrap';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';
import InvoiceInputs from '../../components/InvoicingComponents/InvoiceInputs';
import axios from 'axios';
import { validatePhone } from '../Utility/FormValidation';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import PrintFormat from '../../components/InvoicingComponents/printFormat';
import CompanyModal from '../../components/InvoicingComponents/companyModal';
import InvoiceItems from '../../components/InvoicingComponents/InvoiceItems';

const Index = () => {
  const [companyData, setCompanyData] = useState({});
  const [invoiceData, setInvoiceData] = useState({
    companyName: "",
    companyAddresses: [{ h_no: "", nearby: "", zip_code: "", district: "", state: "", city: "", country: "" }],
    companyLogo: "",
    companyPhone: "",
    companyEmail: "",
    bankName: "",
    invoiceType: "Tax Invoice",
    invoiceSubType: "",
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
        const addresses = response.companyAddress || [];
        setCompanyData(response);
        setInvoiceData(prevData => ({
          ...prevData,
          companyName: response.firmName,
          companyAddresses: addresses.length > 0 ? addresses : [{ h_no: "", nearby: "", zip_code: "", district: "", state: "", city: "", country: "" }],
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
        console.log(error);
      });

    const storedItemData = JSON.parse(localStorage.getItem("inventoryItems"));
    setFakeItems(storedItemData || []);
    // console.log(fakeItems);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddressChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAddresses = [...invoiceData.companyAddresses];
    updatedAddresses[index][name] = value;
    setInvoiceData(prevState => ({ ...prevState, companyAddresses: updatedAddresses }));
  };

  const removeAddress = (index) => {
    const updatedAddresses = [...invoiceData.companyAddresses];
    updatedAddresses.splice(index, 1);
    setInvoiceData(prevState => ({ ...prevState, companyAddresses: updatedAddresses }));
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
    setInvoiceData(prevData => ({
      ...prevData,
      items: [...prevData.items, { name: '', variant: '', quantity: 1, price: 0 }]
    }));
  };

  const removeItem = (index) => {
    const newItems = [...invoiceData.items];
    newItems.splice(index, 1);
    setInvoiceData(prevData => ({ ...prevData, items: newItems }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...invoiceData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setInvoiceData(prevData => ({ ...prevData, items: newItems }));

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
      companyAddresses: [{ h_no: "", nearby: "", zip_code: "", district: "", state: "", city: "", country: "" }],
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
      paymentLink: '',
      invoiceType: '',
      invoiceSubType: '',
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
              <h3>Invoice Items</h3>
              <InvoiceItems
                items={invoiceData.items}
                fakeItems={fakeItems}
                handleItemChange={handleItemChange}
                removeItem={removeItem}
              />
              <FormGroup>
                <div className="d-flex justify-content-evenly mt-5">
                  <Button color="info" onClick={addItem}>Add Item</Button>
                  <Button type="submit" color="primary">Submit</Button>
                  <Button type="button" color="secondary" onClick={printInvoice}>Print Invoice</Button>
                  <Button type="button" color="info" onClick={toggleCompanyModal}>View Company Details</Button>
                </div>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
        <CompanyModal
          isOpen={isCompanyModalOpen}
          toggle={toggleCompanyModal}
          invoiceData={invoiceData}
          handleInputChange={handleInputChange}
          handleAddressChange={handleAddressChange}
          removeAddress={removeAddress}
        />
        <PrintFormat 
          ref={printRef} 
          invoiceData={invoiceData}
          companyData={companyData}
        />
      </div>
    </Container>
  );
};

export default Index;
