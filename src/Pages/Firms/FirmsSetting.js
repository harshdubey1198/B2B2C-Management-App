import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import FirmSwitcher from './FirmSwitcher';
import axios from 'axios';

// const getFirmsFromLocalStorage = () => {
//   const firms = JSON.parse(localStorage.getItem('Firms')) || [];
//   return firms;
// };

// const saveFirmsToLocalStorage = (firms) => {
//   localStorage.setItem('Firms', JSON.stringify(firms));
// };

function FirmSettings() {
  const [firmsData, setFirmsData] = useState([]);
  const [selectedFirmId, setSelectedFirmId] = useState(firmsData[0]?.fuid || null);
  const [firmDetails, setFirmDetails] = useState(firmsData.find(firm => firm.fuid === selectedFirmId) || {});
  const authuser = JSON.parse(localStorage.getItem("authUser"));

  useEffect(() => {
    if (selectedFirmId) {
      setFirmDetails(firmsData.find(firm => firm.fuid === selectedFirmId) || {});
    }

    if(authuser){
      axios.get(`${process.env.REACT_APP_URL}/clientadmin/getFirms/${authuser?.response._id}`).then((response) => {
        setFirmsData(response);
      }).catch((error) => {
        console.log(error, "error getting firms");
      });
    }
  }, []);

  console.log(firmsData, "firmsdata")

  const handleFirmChange = (id) => {
    console.log(id, "firmchange")
    setSelectedFirmId(id);
    setFirmDetails(firmsData.find(firm => firm.fuid === id) || {});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFirmDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_URL}/clientadmin/updatefirm/${firmDetails?._id}`, firmDetails).then((response) => {
      setFirmsData(prevData => prevData.map(firm =>
        firm.fuid === selectedFirmId ? firmDetails : firm
      ));
      alert('Firm details updated successfully!');
    }).catch((error) => {
      console.log(error, "error getting firms");
    });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container">
          {authuser.response.role === "client_admin" && (
            <FirmSwitcher
              firms={firmsData}
              selectedFirmId={selectedFirmId}
              onSelectFirm={handleFirmChange}
            />
          )}
          <Col lg={8} className="mx-auto mt-2">
            <Card>
              <CardBody>
                <h4 className="mb-4">Edit Firm Settings</h4>
                {selectedFirmId ? (
                  <Form onSubmit={handleSubmit}>
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
                          {firmDetails.avatar && (
                            <img
                              src={firmDetails.avatar}
                              alt="Firm Avatar"
                              className="img-fluid mt-2"
                              style={{ maxWidth: '150px' }}
                            />
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="companyAddress">Company Address</Label>
                          <Input
                            type="text"
                            id="companyAddress"
                            name="companyAddress"
                            value={firmDetails.companyAddress || ''}
                            onChange={handleInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
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
                    <Button color="primary" type="submit">Save Changes</Button>
                  </Form>
                ) : (
                  <p>Select a firm to edit.</p>
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
