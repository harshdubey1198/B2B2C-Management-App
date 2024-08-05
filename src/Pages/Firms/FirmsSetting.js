import React, { useState } from 'react';
import { Card, CardBody, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import FirmSwitcher from './FirmSwitcher'; 

const firmsData = [
  { id: 1, name: 'Firm A', logo: 'https://res.cloudinary.com/harshdubey1198/image/upload/v1722844391/abstract-colorful-logo_1017-8753_qptgtx.avif', address: '123 Main St', contact: '123-456-7890', description: 'A brief description of Firm A' },
  { id: 2, name: 'Firm B', logo: 'https://res.cloudinary.com/harshdubey1198/image/upload/v1722844388/business-logo_23-2147503133_sw5xjq.avif', address: '456 Elm St', contact: '098-765-4321', description: 'A brief description of Firm B' },
  { id: 3, name: 'Firm C', logo: 'https://res.cloudinary.com/harshdubey1198/image/upload/v1722844376/gradient-logo-with-abstract-shape_23-2148219550_mgiwzf.avif', address: '789 Oak St', contact: '555-123-4567', description: 'A brief description of Firm C' },
  { id: 4, name: 'Firm D', logo: 'https://res.cloudinary.com/harshdubey1198/image/upload/v1722844367/colorful-floral-logo_1025-262_ahzfec.avif', address: '101 Pine St', contact: '444-555-6666', description: 'A brief description of Firm D' },
];

function FirmSettings() {
  const [selectedFirmId, setSelectedFirmId] = useState(firmsData[0].id);
  const [firmDetails, setFirmDetails] = useState(firmsData.find(firm => firm.id === selectedFirmId));

  const handleFirmChange = (id) => {
    setSelectedFirmId(id);
    setFirmDetails(firmsData.find(firm => firm.id === id));
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
    console.log('Updated Firm Details:', firmDetails);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container mt-4">
          <FirmSwitcher
            selectedFirmId={selectedFirmId}
            onSelectFirm={handleFirmChange}
          />
          <Col lg={8} className="mx-auto mt-4">
            <Card>
              <CardBody>
                <h4 className="mb-4">Firm Settings</h4>
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
                    <img
                      src={firmDetails.logo}
                      alt="Firm Logo"
                      className="img-fluid mt-2"
                      style={{ maxWidth: '150px' }}
                    />
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
                  <Button color="primary" type="submit">Save Settings</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </div>
      </div>
    </React.Fragment>
  );
}

export default FirmSettings;
