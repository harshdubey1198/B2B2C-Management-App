// AddressForm.js
import React from 'react';
import { FormGroup, Label, Input, Row, Col } from 'reactstrap';

const AddressForm = ({ address = {}, index, handleAddressChange }) => {
  return (
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
  );
};

export default AddressForm;
