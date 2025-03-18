import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col, Form, FormGroup, Label, Input, Button, Row, Alert } from 'reactstrap';
import FirmSwitcher from './FirmSwitcher';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import firmAddressForm from '../../components/FirmComponents/firmAddressForm';
import FirmAddressForm from '../../components/FirmComponents/firmAddressForm';
import axiosInstance from '../../utils/axiosInstance';
import FirmTypeForm from '../../components/FirmComponents/firmTypeForm';
import { validateEmail } from '../Utility/FormValidation';
import Select from 'react-select';

function FirmSettings() {
  const [firmsData, setFirmsData] = useState([]);
  const [selectedFirmId, setSelectedFirmId] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(""); 
  const [firmDetails, setFirmDetails] = useState({
    address: [],
    firmDetails: { firmType: "", bankName: "", accountNumber: "", ifscCode: "", cifNumber: "", branchName: "", accountHolder: "", gstin: "", pan: "", partnershipDeed: "", llpAgreement: "", aoa: "", moa: "", digitalSignature: "", din: "", udyam: "",
    },
  });
  // const firmType = firmDetails.firmDetails.firmType;
  const [firmType, setFirmType] = useState("");
  const [authUser, setAuthUser] = useState(null);
  const [trigger, setTrigger] = useState(0)
  const token = JSON.parse(localStorage.getItem("authUser")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log(firmDetails , "firm details");

  
  useEffect(() => {
    const fetchAuthUser = () => {
      const user = JSON.parse(localStorage.getItem("authUser"));
      setAuthUser(user);
    };

    fetchAuthUser();
  }, []);

  // currency dropdown for only indian , malaysian , saudi arabia , uae with symbols to showcase
  const currencyOptions = [
    { value: "INR", label: "₹ INR" },
    { value: "AED", label: "د.إ AED" },
    { value: "SAR", label: "﷼ SAR" },
    { value: "MYR", label: "RM MYR" },
  ];
  const countryOptions = [
    { value: "India", label: "🇮🇳 India" },
    { value: "UAE", label: "🇦🇪 UAE" },
    { value: "Saudi Arabia", label: "🇸🇦 Saudi Arabia" },
    { value: "Malaysia", label: "🇲🇾 Malaysia" },
  ];

  const countryDocuments = {
    India: ["PAN", "GSTIN", "Udyam Registration", "Shop & Establishment License"],
    UAE: ["Trade License", "VAT Registration Certificate", "Chamber of Commerce Certificate"],
    "Saudi Arabia": ["Commercial Registration (CR)", "Chamber of Commerce Certificate", "VAT Certificate"],
    Malaysia: ["SSM Certificate", "LHDN Tax Registration", "Business Bank Account Statement"],
  };

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption.value);
    setFirmDetails((prevDetails) => ({
      ...prevDetails,
      country: selectedOption.value,
      // currency: currencyOptions[selectedOption.value]?.value || "INR",
    }));
  };
  
  const handleDocumentUpload = (docType, file) => {
    setFirmDetails((prevDetails) => ({
      ...prevDetails,
      firmDetails: {
        ...prevDetails.firmDetails,
        [docType]: file,
      },
    }));
  };
  useEffect(() => {
    if (authUser?.response?.role === "client_admin") {
      const fetchFirms = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_URL}/auth/getCompany/${authUser.response._id}`,config);
          const firms = response || [];
          setFirmsData(firms);
          if (firms.length > 0 && !selectedFirmId) {
            setSelectedFirmId(firms[0]._id);
          }
        } catch (error) {
          console.error("Error getting firms:", error.response || error.message);
          toast.error("Failed to fetch firms data");
        }
      };
      fetchFirms();
    }
  }, [authUser , trigger]);
  
  useEffect(() => {
    if (authUser?.response?.role === "firm_admin") {
      const fetchFirmAdminData = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_URL}/auth/getfirm/${authUser.response.adminId}`,config);
          const firmData = response[0] || {};
          // console.log(firmData);
          setFirmDetails({ ...firmData, address: firmData.address || [] });

        } catch (error) {
          console.error("Error fetching firm data:", error.response?.data || error.message);
          toast.error("Failed to fetch firm data");
        }
      };
      fetchFirmAdminData();
    }
  }, [authUser]);

  useEffect(() => {
    if (selectedFirmId) {
      const selectedFirm = firmsData.find(firm => firm._id === selectedFirmId) || {};
      localStorage.setItem("defaultFirm", JSON.stringify({
        firmId: selectedFirm._id || "",
        fuid: selectedFirmId || "",
        name: selectedFirm.firmName || "",
      }));
      setFirmDetails({ ...selectedFirm, address: selectedFirm.address || [] });
    }
  }, [selectedFirmId, firmsData]);

  // console.log(firmDetails.bankName , "firm id")

  const handleFirmTypeChange = (selectedType, additionalFields) => {
    setFirmDetails((prevDetails) => ({
      ...prevDetails,
      firmType: selectedType,
      ...Object.fromEntries(
        additionalFields.map((field) => [field.toLowerCase().replace(/\s+/g, ""), ""])
      ),
    }));
  };

  const handleFieldChange = (fieldName, value) => {
    setFirmDetails((prevDetails) => ({
      ...prevDetails,
      [fieldName.toLowerCase().replace(/\s+/g, "")]: value,
    }));
  };

  const handleFirmChange = (id) => {
    setSelectedFirmId(id);
    // Fetch details for the newly selected firm
    const selectedFirm = firmsData.find(firm => firm._id === id) || {};
    setFirmDetails({ ...selectedFirm, address: selectedFirm.address || [] })
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFirmDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
    // //toast.error("");
    // setError("");
  };

  const handleAddressChange = (index, e) => {
    const { name, value } = e.target;
    setFirmDetails(prevDetails => {
        const updatedAddress = [...prevDetails.address];
        updatedAddress[index] = {
            ...updatedAddress[index],
            [name]: value
        };
        return { ...prevDetails, address: updatedAddress };
    });
  };
// console.log(firmDetails._id);
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axiosInstance.put(`${process.env.REACT_APP_URL}/auth/update/${firmDetails._id}`, firmDetails );
    toast.success("Firm details updated successfully");

    // Increment trigger to refetch data
    setTrigger(prev => prev + 1);
    
    // Refetch firm details for firm_admin after successful update
    if (authUser?.response?.role === "firm_admin") {
      const fetchFirmAdminData = async () => {
        try {
          const response = await axiosInstance.get(`${process.env.REACT_APP_URL}/auth/getfirm/${authUser.response.adminId}`);
          const firmData = response[0] || {};
          setFirmDetails({ ...firmData, address: firmData.address || [] });
        } catch (error) {
          console.error("Error fetching updated firm data:", error.response?.data || error.message);
          toast.error("Failed to fetch updated firm data");
        }
      };
      fetchFirmAdminData();
    } else {
      // Fetch updated data for client_admin
      handleFirmChange(selectedFirmId); 
    }
    
  } catch (error) {
    console.error("Error updating firm details:", error.response?.data || error.message);
    toast.error("Failed to update firm details");
  }
};

  
  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container">
         
          <Col lg={12} className="mx-auto mt-2">
            <Card>
              <CardBody>
              <div className="row d-flex justify-content-between align-items-center mb-2">
                <h4 className="col-lg-6 col-md-6 col-sm-12 mb-3 m-text-center">Edit Firm Settings</h4>
                <div className="col-lg-6 col-md-6 col-sm-12 mb-3 text-end m-text-center">
                {authUser?.response?.role === "client_admin" && (
                  <FirmSwitcher
                    firms={firmsData}
                    selectedFirmId={selectedFirmId}
                    onSelectFirm={handleFirmChange}
                  />
                )}
                {/* {authUser?.response?.role === "client_admin" && (
                  <FirmSwitcher
                    firms={firmsData}
                    selectedFirmId={selectedFirmId}
                    onSelectFirm={handleFirmChange}
                  />
                )} */}
                </div>
              </div>
            {authUser?.response?.role === "firm_admin" || selectedFirmId ? (
               <Form onSubmit={handleSubmit}>
                     <div className=' d-flex flex-row justify-content-center'>
                     {firmDetails.avatar && (
                            <img
                              src={firmDetails.avatar}
                              alt="Firm Avatar"
                              className="img-fluid my-1 mt-0"
                              style={{ width:'auto', height:'150px', objectFit:'cover' , borderRadius:'10px' , border:"2px solid var(--bs-header-dark-bg)" }}
                            />
                          )}
                     </div>
                    <Row>
                    <div className="col-lg-3 col-md-3 col-sm-12 mb-3">
                        <FormGroup>
                          <Label for="companyTitle">Firm Name</Label>
                          <Input
                            type="text"
                            id="companyTitle"
                            name="companyTitle"
                            value={firmDetails.companyTitle || ''}
                            onChange={handleInputChange}
                            // //required
                          />
                        </FormGroup>
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-12 mb-3">
                        <FormGroup>
                          <Label for="firmEmail">Firm Email</Label>
                          <Input
                            type="email"
                            id="firmEmail"
                            name="firmEmail"
                            value={firmDetails.email || ''}
                            onChange={handleInputChange}
                            //required
                          />
                        </FormGroup>
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-12 mb-3">
                        <FormGroup>
                          <Label for="firmPhone">Firm Phone</Label>
                          <Input
                            type="text"
                            id="firmPhone"
                            name="firmPhone"
                            value={firmDetails.companyMobile || ''}
                            onChange={handleInputChange}
                            //required
                          />
                        </FormGroup>
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-12 mb-3">
                        <FormGroup>
                          <Label for="avatar">Avatar URL</Label>
                          <Input
                            type="text"
                            id="avatar"
                            name="avatar"
                            value={firmDetails.avatar || ''}
                            onChange={handleInputChange}
                          />
                         
                        </FormGroup>
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-12 mb-3">
                        <FormGroup>
                          {/* currency select */}
                          <Label for="currency">Currency</Label>
                          <Select
                            options={currencyOptions}
                            // value={currencyOptions.find(option => option.value === firmDetails.currency)}
                            value={currencyOptions.find(option => option.value === firmDetails.currency)}
                            onChange={(selectedOption) => handleFieldChange("currency", selectedOption.value)}
                          />
                        </FormGroup>
                      </div>
                      <Col lg={3} md={6} sm={12}>
                        <FormGroup>
                          <Label for="country">Country</Label>
                          <Select
                            options={countryOptions}
                            value={countryOptions.find((option) => option.value === selectedCountry)}
                            onChange={handleCountryChange}
                          />
                        </FormGroup>
                      </Col>
                      {/* <hr/> */}
                      <div
                      className='p-2 my-2 col-lg-3 col-md-3 col-sm-12 rounded'  
                      style={{
                        width:"100%",
                        height:"auto",
                        fontWeight:"bolder",
                        background : "var(--bs-header-dark-bg)",
                        color:"white"
                          }}> 
                            Banking Details 
                      </div>
                      <br/>
                        <div className="col-lg-3 col-md-3 col-sm-12 mb-3">
                        <FormGroup>
                          <Label for="bankName">Bank Name</Label>
                          <Input
                            type="text"
                            id="bankName"
                            name="bankName"
                            value={firmDetails.bankName || ''}
                            onChange={handleInputChange}
                            //required
                          />
                        </FormGroup>
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-12 mb-3">
                        <FormGroup>
                          <Label for="accountNumber">Account Number</Label>
                          <Input
                            type="text"
                            id="accountNumber"
                            name="accountNumber"
                            value={firmDetails.accountNumber || ''}
                            onChange={handleInputChange}
                            //required
                          />
                        </FormGroup>
                      </div>
                      <div  className="col-lg-3 col-md-3 col-sm-12 mb-3">
                        <FormGroup>
                          <Label for="ifscCode">IFSC Code</Label>
                          <Input
                            type="text"
                            id="ifscCode"
                            name="ifscCode"
                            value={firmDetails.ifscCode || ''}
                            onChange={handleInputChange}
                            //required
                          />
                        </FormGroup>
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-12 mb-3">
                        <FormGroup>
                          <Label for="accountHolder">Account Holder</Label>
                          <Input
                            type="text"
                            id="accountHolder"
                            name="accountHolder"
                            value={firmDetails.accountHolder || ''}
                            onChange={handleInputChange}
                            //required
                          />
                        </FormGroup>
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-12 mb-3">
                        <FormGroup>
                          <Label for="cifNumber">CIF Number</Label>
                          <Input
                            type="text"
                            id="cifNumber"
                            name="cifNumber"
                            value={firmDetails.cifNumber || ''}
                            onChange={handleInputChange}
                            //required
                          />
                        </FormGroup>
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-12 mb-3">
                        <FormGroup>
                          <Label for="gstin">GSTIN</Label>
                          <Input
                            type="text"
                            id="gstin"
                            name="gstin"
                            value={firmDetails.gstin || ''}
                            onChange={handleInputChange}
                            //required
                          />
                        </FormGroup>
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-12 mb-3">
                        <FormGroup>
                          <Label for="branchName">Branch Name</Label>
                          <Input
                            type="text"
                            id="branchName"
                            name="branchName"
                            value={firmDetails.branchName || ''}
                            onChange={handleInputChange}
                            //required
                          />
                        </FormGroup>
                      </div>
                      {/* Business Verification Documents */}
                        <Row className="mt-3">
                          <Col lg={12}>
                            <h5>Business Verification Documents</h5>
                            {selectedCountry &&
                              countryDocuments[selectedCountry]?.map((doc) => (
                                <FormGroup key={doc}>
                                  <Label>{doc}</Label>
                                  <Input type="file" onChange={(e) => handleDocumentUpload(doc, e.target.files[0])} />
                                </FormGroup>
                              ))}
                          </Col>
                        </Row>

                    </Row>
                  {firmDetails.address.length > 0 ? (
                        firmDetails.address.map((address, index) => (
                          <FirmAddressForm 
                            key={index}
                            address={address}
                            index={index}
                            handleAddressChange={handleAddressChange}
                          />
                        ))
                      ) : (
                        <FirmAddressForm
                          index={0}
                          handleAddressChange={handleAddressChange}
                        />
                      )}
                    <FirmTypeForm firmDetails={firmDetails} setFirmDetails={setFirmDetails} />
                    <Button color="primary" type="submit" className='m-w-100'>Save Changes</Button>
                  </Form>
                ) : (
                  <Alert color="info">Please select a firm to edit its settings.</Alert>
                )}
                

              </CardBody>
            </Card>
          </Col>
        </div>
      </div>
    </React.Fragment>
  );
}

export default FirmSettings;
