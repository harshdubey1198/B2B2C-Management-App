import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import FirmSwitcher from './FirmSwitcher';
import axios from 'axios';

// Utility function to get firm data from local storage
const getFirmsFromLocalStorage = () => {
  const firms = JSON.parse(localStorage.getItem('Firms')) || [];
  return firms;
};

// Utility function to save firm data to local storage
const saveFirmsToLocalStorage = (firms) => {
  localStorage.setItem('Firms', JSON.stringify(firms));
};

function FirmSettings() {
  const [firmsData, setFirmsData] = useState([]);
  const [selectedFirmId, setSelectedFirmId] = useState(firmsData[0]?.id || null);
  const [firmDetails, setFirmDetails] = useState(firmsData.find(firm => firm.id === selectedFirmId) || {});
  const authuser = JSON.parse(localStorage.getItem("authUser"))

  useEffect(() => {
    if (selectedFirmId) {
      setFirmDetails(firmsData.find(firm => firm.id === selectedFirmId) || {});
    }

    if(authuser){
      axios.get(`${process.env.REACT_APP_URL}/clientadmin/getFirms/${authuser?.response._id}`).then((response) => {
        setFirmsData(response)
      }).catch((error) => {
        console.log(error, "error getting firms")
      })
    }
  }, []);

  const handleFirmChange = (id) => {
    setSelectedFirmId(id);
    setFirmDetails(firmsData.find(firm => firm.id === id) || {});
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
    const updatedFirmsData = firmsData.map(firm =>
      firm.id === selectedFirmId ? firmDetails : firm
    );
    setFirmsData(updatedFirmsData);
    saveFirmsToLocalStorage(updatedFirmsData);
    alert('Firm details updated successfully!');
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container mt-4">
          <FirmSwitcher
            firms={firmsData}
            selectedFirmId={selectedFirmId}
            onSelectFirm={handleFirmChange}
          />
          <Col lg={8} className="mx-auto mt-4">
            <Card>
              <CardBody>
                <h4 className="mb-4">Edit Firm Settings</h4>
                {selectedFirmId ? (
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label for="firmName">Firm Name</Label>
                      <Input
                        type="text"
                        id="firmName"
                        name="name"
                        value={firmDetails.name || ''}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="firmLogo">Firm Logo URL</Label>
                      <Input
                        type="text"
                        id="firmLogo"
                        name="logo"
                        value={firmDetails.logo || ''}
                        onChange={handleInputChange}
                        required
                      />
                      {firmDetails.logo && (
                        <img
                          src={firmDetails.logo}
                          alt="Firm Logo"
                          className="img-fluid mt-2"
                          style={{ maxWidth: '150px' }}
                        />
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="firmAddress">Firm Address</Label>
                      <Input
                        type="text"
                        id="firmAddress"
                        name="address"
                        value={firmDetails.address || ''}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="firmContact">Firm Contact Number</Label>
                      <Input
                        type="text"
                        id="firmContact"
                        name="contact"
                        value={firmDetails.contact || ''}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="firmDescription">Firm Description</Label>
                      <Input
                        type="textarea"
                        id="firmDescription"
                        name="description"
                        value={firmDetails.description || ''}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="firmEmail">Firm Email</Label>
                      <Input
                        type="email"
                        id="firmEmail"
                        name="email"
                        value={firmDetails.email || ''}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="firmPhone">Firm Phone</Label>
                      <Input
                        type="text"
                        id="firmPhone"
                        name="phone"
                        value={firmDetails.phone || ''}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="firmStartDate">Start Date</Label>
                      <Input
                        type="date"
                        id="firmStartDate"
                        name="startDate"
                        value={firmDetails.startDate || ''}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="firmPermissions">Permissions</Label>
                      <Input
                        type="text"
                        id="firmPermissions"
                        name="permissions"
                        value={firmDetails.permissions?.join(', ') || ''}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
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
