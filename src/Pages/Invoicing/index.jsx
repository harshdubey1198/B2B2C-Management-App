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
import axiosInstance from '../../utils/axiosInstance';

const Index = () => {
  const [companyData, setCompanyData] = useState({});
  const [isCompanyModalOpen, setCompanyModalOpen] = useState(false);
  const toggleCompanyModal = () => setCompanyModalOpen(!isCompanyModalOpen);
  const [fakeItems, setFakeItems] = useState([]);
  const printRef = useRef();
  const authuser = JSON.parse(localStorage.getItem("authUser"));
  const firmId = authuser?.response?.adminId;
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
    amountPaid: "",
    accountNumber: "",
    gstin: "",
    firstName: "",
    lastName: "",
    customerName: "",
    customerAddress: { h_no: "", nearby: "", district: "", city: "", state: "", country: "", zip_code: "" }, 
    customerPhone: '',
    customerEmail: '',
    date: '',
    country: 'India',
    items: [],
    paymentLink: '',
    taxComponents: [],
    id: '',
    varSelPrice: '',
    overallAmount: '',
});
const fetchInventoryItems = () => {
  axiosInstance.get(`${process.env.REACT_APP_URL}/inventory/get-items/${firmId}`)
  .then(response => {
      setFakeItems(response.data || []);
      // console.log("response.data", response.data);
      // console.log("response.data[5]", response.data[5]);
      // console.log("tax rate", response.data[5].tax.components[0].rate);
      // console.log("tax type", response.data[5].tax.components[0].taxType);
    })
    .catch(error => {
      console.log(error);
      // toast.error("Failed to fetch inventory items");
    });
  };
  
  useEffect(() => {
    axiosInstance.get(`${process.env.REACT_APP_URL}/auth/getfirm/${authuser?.response?.adminId}`)
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
      fetchInventoryItems();
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
        zip_code: invoiceData.customerAddress.zip_code,
        country: invoiceData.customerAddress.country,
        nearby: invoiceData.customerAddress.nearby,
        district: invoiceData.customerAddress.district,
      },
    },
    items: invoiceData.items.map(item => ({
      itemId: item.itemId,
      selectedVariant: item.selectedVariant && item.selectedVariant.map(variant => ({
        variationType: variant.variationType,
        optionLabel: variant.optionLabel,
        price: variant.price,
        stock: variant.stock,
        sku: variant.sku,
        barcode: variant.barcode,
      })), 
      quantity: item.quantity,
      sellingPrice: item.price,
      discount: item.discount || 0,
      tax: item.tax || 0, 
    })),
    invoiceDate: invoiceData.issueDate, 
    dueDate: invoiceData.dueDate, 
    amountPaid: invoiceData.amountPaid,
    firmId: authuser?.response?.adminId, 
    createdBy: authuser?.response?.id,
    invoiceType: invoiceData.invoiceType,
    invoiceSubType: invoiceData.invoiceSubType,
    notes: 'Please pay by due date.'

  };
  axiosInstance.post(
    `${process.env.REACT_APP_URL}/invoice/create-invoice`,
    invoicePayload,
    
  )
  
  .then(response => {
    toast.success(response.message);
    fetchInventoryItems();
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
      amountPaid: '',
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


// console.log(invoiceData, "invoicedata")

// console.log(
//   "invoiceData tax component taxType : ",
//   invoiceData.items && invoiceData.items.length > 0 && invoiceData.items[0].taxComponents && invoiceData.items[0].taxComponents.length > 0
//     ? invoiceData.items[0].taxComponents[0].taxType
//     : "N/A"
// );

// console.log(
//   "invoiceData tax component rate    : ",
//   invoiceData.items && invoiceData.items.length > 0 && invoiceData.items[0].taxComponents && invoiceData.items[0].taxComponents.length > 0
//     ? invoiceData.items[0].taxComponents[0].rate
//     : "N/A"
// );



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
                setInvoiceData={setInvoiceData}
              />
               
              <h3 className='my-4'>Invoice Items</h3>
              <InvoiceItems
                items={invoiceData.items}
                fakeItems={fakeItems}
                removeItem={removeItem}
                setInvoiceData={setInvoiceData}
              />
              <FormGroup>
                <div className="row d-flex justify-content-evenly">
                  <div className="col-lg-3 col-md-3 col-sm-12 mb-3">
                  <Button className="w-100" color="info" onClick={addItem}>Add Item</Button>
                  </div>
                  <div className="col-lg-3 col-md-2 col-sm-12 mb-3">
                  <Button className="w-100" type="submit" color="primary">Submit</Button>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-12 mb-3">
                  <Button className="w-100" type="button" color="secondary" onClick={printInvoice}>Print Invoice</Button>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-12 mb-3">
                  <Button className="w-100" type="button" color="info" onClick={toggleCompanyModal}>View Company Details</Button>
                  </div>
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
          fakeItems={fakeItems}
          companyData={companyData}
        />
      </div>
    </Container>
  );
};

export default Index;
