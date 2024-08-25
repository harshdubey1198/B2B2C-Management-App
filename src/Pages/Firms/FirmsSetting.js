import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col, Form, FormGroup, Label, Input, Button, Row, Alert } from 'reactstrap';
import FirmSwitcher from './FirmSwitcher';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FirmSettings() {
  const [firmsData, setFirmsData] = useState([]);
  const [selectedFirmId, setSelectedFirmId] = useState(null);
  const [firmDetails, setFirmDetails] = useState({
    companyAddress: []
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [authUser, setAuthUser] = useState(null);

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
          setError("Failed to fetch firms data");
        }
      };
      fetchFirms();
    }
  }, [authUser]);
  
  useEffect(() => {
    if (authUser?.response?.role === "firm_admin") {
      const fetchFirmAdminData = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_URL}/firmadmin/firmdata/${authUser.response._id}`);
          const firmData = response || {};
          console.log(firmData, "response");
          setFirmDetails({ ...firmData, companyAddress: firmData.companyAddress || [] });
        } catch (error) {
          console.error("Error fetching firm data:", error.response?.data || error.message);
          setError("Failed to fetch firm data");
          toast.error("Failed to fetch firm data");
        }
      };

      fetchFirmAdminData();
    }
  }, [authUser]);

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
    setError("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_URL}/clientadmin/updatefirm/${firmDetails._id}`, firmDetails);
      // setSuccess("Firm details updated successfully!");
      toast.success("Firm details updated successfully!");
      setError("");
    } catch (error) {
      console.error("Error updating firm details:", error.response?.data || error.message);
      setError("Failed to update firm details");
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


                {error && <Alert color="danger">{error}</Alert>}
                {success && <Alert color="success">{success}</Alert>}
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
                        <Row key={index}>
                          <Col md={6}>
                            <FormGroup>
                              <Label for={`h_no_${index}`}>House Number</Label>
                              <Input
                                type="text"
                                id={`h_no_${index}`}
                                name="h_no"
                                value={address.h_no || ''}
                                onChange={(e) => handleAddressChange(index, e)}
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col md={6}>
                            <FormGroup>
                              <Label for={`nearby_${index}`}>Nearby</Label>
                              <Input
                                type="text"
                                id={`nearby_${index}`}
                                name="nearby"
                                value={address.nearby || ''}
                                onChange={(e) => handleAddressChange(index, e)}
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col md={6}>
                            <FormGroup>
                              <Label for={`district_${index}`}>District</Label>
                              <Input
                                type="text"
                                id={`district_${index}`}
                                name="district"
                                value={address.district || ''}
                                onChange={(e) => handleAddressChange(index, e)}
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col md={6}>
                            <FormGroup>
                              <Label for={`city_${index}`}>City</Label>
                              <Input
                                type="text"
                                id={`city_${index}`}
                                name="city"
                                value={address.city || ''}
                                onChange={(e) => handleAddressChange(index, e)}
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col md={6}>
                            <FormGroup>
                              <Label for={`state_${index}`}>State</Label>
                              <Input
                                type="text"
                                id={`state_${index}`}
                                name="state"
                                value={address.state || ''}
                                onChange={(e) => handleAddressChange(index, e)}
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col md={6}>
                            <FormGroup>
                              <Label for={`zip_code_${index}`}>Zip Code</Label>
                              <Input
                                type="text"
                                id={`zip_code_${index}`}
                                name="zip_code"
                                value={address.zip_code || ''}
                                onChange={(e) => handleAddressChange(index, e)}
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col md={6}>
                            <FormGroup>
                              <Label for={`country_${index}`}>Country</Label>
                              <Input
                                type="text"
                                id={`country_${index}`}
                                name="country"
                                value={address.country || ''}
                                onChange={(e) => handleAddressChange(index, e)}
                                required
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      ))
                    ) : (
                      <Alert color="info">No addresses available.</Alert>
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
