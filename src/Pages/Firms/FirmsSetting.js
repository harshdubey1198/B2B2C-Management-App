import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col, Form, FormGroup, Label, Input, Button, Row, Alert } from 'reactstrap';
import FirmSwitcher from './FirmSwitcher';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddressForm from '../../components/FirmComponents/adressForm';

function FirmSettings() {
  const [firmsData, setFirmsData] = useState([]);
  const [selectedFirmId, setSelectedFirmId] = useState(null);
  const [firmDetails, setFirmDetails] = useState({
    companyAddress: []
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [authUser, setAuthUser] = useState(null);
  const [trigger, setTrigger] = useState(0)

  useEffect(() => {
    const fetchAuthUser = () => {
      const user = JSON.parse(localStorage.getItem("authUser"));
      setAuthUser(user);
    };

    fetchAuthUser();
  }, []);

  useEffect(() => {
    if (authUser?.response?.role === "client_admin") {
      const fetchFirms = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_URL}/clientadmin/getFirms/${authUser.response._id}`);
          const firms = response || [];
          setFirmsData(firms);
          if (firms.length > 0) {
            setSelectedFirmId(firms[0].fuid);
          }
        } catch (error) {
          console.error("Error getting firms:", error.response || error.message);
          // setError("Failed to fetch firms data");
          toast.error("Failed to fetch firms data");
        }
      };
      fetchFirms();
    }
  }, [authUser, trigger]);
  
  useEffect(() => {
    if (authUser?.response?.role === "firm_admin") {
      const fetchFirmAdminData = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_URL}/firmadmin/firmdata/${authUser.response._id}`);
          const firmData = response || {};
          // Ensure companyAddress is initialized as an array
          setFirmDetails({ ...firmData, companyAddress: firmData.companyAddress || [] });
        } catch (error) {
          console.error("Error fetching firm data:", error.response?.data || error.message);
          // setError("Failed to fetch firm data");
          toast.error("Failed to fetch firm data");
        }
      };

      fetchFirmAdminData();
    }
  }, [authUser, trigger]);

  useEffect(() => {
    if (selectedFirmId) {
      const selectedFirm = firmsData.find(firm => firm.fuid === selectedFirmId) || {};
      localStorage.setItem("defaultFirm", JSON.stringify({
        firmId: selectedFirm._id || "",
        fuid: selectedFirmId || "",
        name: selectedFirm.firmName || "",
      }));
      setFirmDetails({ ...selectedFirm, companyAddress: selectedFirm.companyAddress || [] });
    }
  }, [selectedFirmId, firmsData]);

  const handleFirmChange = (id) => {
    setSelectedFirmId(id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFirmDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
    toast.error("");
    // setError("");
  };

  const handleAddressChange = (index, e) => {
    const { name, value } = e.target;
    setFirmDetails(prevDetails => {
      const updatedAddress = [...prevDetails.companyAddress];
      updatedAddress[index] = {
        ...updatedAddress[index],
        [name]: value
      };
      return { ...prevDetails, companyAddress: updatedAddress };
    });
  };

  console.log(firmDetails, "firmdteiald")

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_URL}/clientadmin/updatefirm/${firmDetails._id}`, firmDetails);
      // setSuccess("Firm details updated successfully!");
      toast.success("Firm details updated successfully!");
      setTrigger(prev => prev + 1)
      // setError("");
      toast.error("");
    } catch (error) {
      console.error("Error updating firm details:", error.response?.data || error.message);
      // setError("Failed to update firm details");
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
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h4 className="w-50">Edit Firm Settings</h4>
                {authUser?.response?.role === "client_admin" && (
                  <FirmSwitcher
                    firms={firmsData}
                    selectedFirmId={selectedFirmId}
                    onSelectFirm={handleFirmChange}
                  />
                )}
              </div>


                {/* {error && <Alert color="danger">{error}</Alert>}
                {success && <Alert color="success">{success}</Alert>} */}
                {authUser?.response?.role === "firm_admin" || selectedFirmId ? (
                  
                  <Form onSubmit={handleSubmit}>
                     {firmDetails.avatar && (
                            <img
                              src={firmDetails.avatar}
                              alt="Firm Avatar"
                              className="img-fluid mt-2 rounded-circle"
                              style={{ maxWidth: '100px' }}
                            />
                          )}
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="firmName">Firm Name</Label>
                          <Input
                            type="text"
                            id="firmName"
                            name="firmName"
                            value={firmDetails.firmName || ''}
                            onChange={handleInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="firmEmail">Firm Email</Label>
                          <Input
                            type="email"
                            id="firmEmail"
                            name="firmEmail"
                            value={firmDetails.firmEmail || ''}
                            onChange={handleInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="firmPhone">Firm Phone</Label>
                          <Input
                            type="text"
                            id="firmPhone"
                            name="firmPhone"
                            value={firmDetails.firmPhone || ''}
                            onChange={handleInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
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
                      </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                        <FormGroup>
                          <Label for="bankName">Bank Name</Label>
                          <Input
                            type="text"
                            id="bankName"
                            name="bankName"
                            value={firmDetails.bankName || ''}
                            onChange={handleInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="accountNumber">Account Number</Label>
                          <Input
                            type="text"
                            id="accountNumber"
                            name="accountNumber"
                            value={firmDetails.accountNumber || ''}
                            onChange={handleInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="ifscCode">IFSC Code</Label>
                          <Input
                            type="text"
                            id="ifscCode"
                            name="ifscCode"
                            value={firmDetails.ifscCode || ''}
                            onChange={handleInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="cifNumber">CIF Number</Label>
                          <Input
                            type="text"
                            id="cifNumber"
                            name="cifNumber"
                            value={firmDetails.cifNumber || ''}
                            onChange={handleInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="gstin">GSTIN</Label>
                          <Input
                            type="text"
                            id="gstin"
                            name="gstin"
                            value={firmDetails.gstin || ''}
                            onChange={handleInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="branchName">Branch Name</Label>
                          <Input
                            type="text"
                            id="branchName"
                            name="branchName"
                            value={firmDetails.branchName || ''}
                            onChange={handleInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="accountHolder">Account Holder</Label>
                          <Input
                            type="text"
                            id="accountHolder"
                            name="accountHolder"
                            value={firmDetails.accountHolder || ''}
                            onChange={handleInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="cidm">CIDM</Label>
                          <Input
                            type="text"
                            id="cidm"
                            name="cidm"
                            value={firmDetails.cidm || ''}
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="fuid">FUID</Label>
                          <Input
                            type="text"
                            id="fuid"
                            name="fuid"
                            value={firmDetails.fuid || ''}
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <h5>Company Address</h5>
                    {firmDetails.companyAddress.length > 0 ? (
                        firmDetails.companyAddress.map((address, index) => (
                          <AddressForm
                            key={index}
                            address={address}
                            index={index}
                            handleAddressChange={handleAddressChange}
                          />
                        ))
                      ) : (
                        <AddressForm
                          index={0}
                          handleAddressChange={handleAddressChange}
                        />
                      )}
                    <Button color="primary" type="submit">Save Changes</Button>
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
