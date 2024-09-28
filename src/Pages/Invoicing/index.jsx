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
    companyAddress: [{ h_no: "", nearby: "", zip_code: "", district: "", state: "", city: "", country: "" }],
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
    firstName: "",
    lastName: "",
    customerName: "",
    customerAddress: { h_no: "", nearby: "", district: "", city: "", state: "", country: "", zip: "" }, 
    customerPhone: '',
    customerEmail: '',
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
  const token = JSON.parse(localStorage.getItem("authUser")).token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/auth/getfirm/${authuser?.response?.adminId}`, config)
      .then((response) => {
        const companyDetails = response[0];
        const companyAddress = companyDetails.address ? companyDetails.address : [{ h_no: "", nearby: "", zip_code: "", district: "", state: "", city: "", country: "" }];
        
        setCompanyData(companyDetails);
        
        setInvoiceData(prevData => ({
          ...prevData,
          companyName: companyDetails.companyTitle,
          companyAddress: companyAddress,
          companyLogo: companyDetails.avatar,
          companyPhone: companyDetails.companyMobile,
          companyEmail: companyDetails.email,
          gstin: companyDetails.gstin,
          bankName: companyDetails.bankName,
          IFSCCode: companyDetails.ifscCode,
          accountNumber: companyDetails.accountNumber,
          branchName: companyDetails.branchName,
        }));
      }).catch((error) => {
        console.log(error);
      });
  
    const storedItemData = JSON.parse(localStorage.getItem("inventoryItems"));
    setFakeItems(storedItemData || []);
  }, []);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setInvoiceData(prevData => ({
        ...prevData,
        [parent]: {
          ...prevData[parent],
          [child]: value,
        },
      }));
    } else {
      setInvoiceData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  
  
  const handleAddressChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAddress = [...invoiceData.companyAddress];
    updatedAddress[index][name] = value;
    setInvoiceData(prevState => ({ ...prevState, companyAddress: updatedAddress }));
  };

  const removeAddress = (index) => {
    const updatedAddress = [...invoiceData.companyAddress];
    updatedAddress.splice(index, 1);
    setInvoiceData(prevState => ({ ...prevState, companyAddress: updatedAddress }));
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
    // console.log(newItems,"newitems")
    newItems[index] = { ...newItems[index], [field]: value };
    // console.log(newItems, "newitems")
    setInvoiceData(prevData => ({ ...prevData, items: newItems }));
};  
const handleSubmit = (e) => {
  e.preventDefault();

  if (!validatePhone(invoiceData.customerPhone)) {
    toast.error("Invalid Phone Number");
    return;
  }

  const invoicePayload = {
    customer: {
      firstName: invoiceData.firstName, 
      lastName: invoiceData.lastName , 
      email: invoiceData.customerEmail,
      mobile: invoiceData.customerPhone,
      address: {
        h_no: invoiceData.customerAddress.h_no,
        city: invoiceData.customerAddress.city,
        state: invoiceData.customerAddress.state,
        zip_code: invoiceData.customerAddress.zip,
        country: invoiceData.customerAddress.country,
        nearby: invoiceData.customerAddress.nearby,
        district: invoiceData.customerAddress.district,
      },
    },
    items: invoiceData.items.map(item => ({
      itemId: item.itemId,
      selectedVariant: item.selectedVariant.map(variant => ({
        variationType: variant.variationType,
        optionLabel: variant.optionLabel,
        price: variant.price,
        stock: variant.stock,
        sku: variant.sku,
        barcode: variant.barcode,
      })), 
      quantity: item.quantity,
      price: item.price,
      discount: item.discount || 0,
      tax: item.tax || 0, 
    })),
    invoiceDate: invoiceData.date, 
    dueDate: '', 
    firmId: authuser?.response?.adminId, 
    createdBy: authuser?.response?.id,
    invoiceType: invoiceData.invoiceType,
    invoiceSubType: invoiceData.invoiceSubType,
    notes: 'Please pay by due date.'

  };
  axios.post(
    `${process.env.REACT_APP_URL}/invoice/create-invoice`,
    invoicePayload,
    config
  )
  .then(response => {
    toast.success("Invoice created successfully");

    setInvoiceData({
      companyName: "",
      companyAddress: [{ h_no: "", nearby: "", zip_code: "", district: "", state: "", city: "", country: "" }],
      companyLogo: "",
      companyPhone: "",
      companyEmail: "",
      gstin: "",
      bankName: "",
      IFSCCode: "",
      accountNumber: "",
      branchName: "",
      firstName: "",
      lastName: "",
      customerName: '',
      customerAddress: [{ h_no: "", nearby: "", zip_code: "", district: "", state: "", city: "", country: "" }],
      customerEmail: '',
      customerPhone: '',
      date: '',
      country: 'India',
      items: [],
      paymentLink: '',
      invoiceType: '',
      invoiceSubType: '',
    });
  })
  .catch(error => {
    console.log(error);
    toast.error("Failed to create invoice");
  });
};

  const printInvoice = useReactToPrint({
    content: () => printRef.current
  });

  console.log(invoiceData, "invoicedata")

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
                setInvoiceData={setInvoiceData}
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
