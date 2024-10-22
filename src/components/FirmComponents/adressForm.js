import React from "react";
import { FormGroup, Label, Input, Col, Row } from "reactstrap";
import Select from "react-select";
import Autosuggest from "react-autosuggest";

const countryOptions = [
  { value: "India", label: "India" },
  { value: "Malaysia", label: "Malaysia" },
  { value: "United Arab Emirates", label: "United Arab Emirates" },
  { value: "USA", label: "USA" },
  { value: "Canada", label: "Canada" },
  { value: "Australia", label: "Australia" },
  { value: "UK", label: "UK" },
  { value: "Germany", label: "Germany" },
  { value: "Indonesia", label: "Indonesia" },
  { value: "Japan", label: "Japan" },
  { value: "Russia", label: "Russia" },
];

const citySuggestions = [
  { city: "New York" },
  { city: "Los Angeles" },
  { city: "Toronto" },
  { city: "Delhi" },
  { city: "Mumbai" },
];

const getCitySuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  return inputValue.length === 0
    ? []
    : citySuggestions.filter((city) =>
        city.city.toLowerCase().includes(inputValue)
      );
};

const AddressForm = ({ address = {}, handleAddressChange }) => {
  const [city, setCity] = React.useState(address.city || "");
  const [citySuggestionsList, setCitySuggestionsList] = React.useState([]);

  const handleCitySuggestionsFetch = ({ value }) => {
    setCitySuggestionsList(getCitySuggestions(value));
  };

  const handleCityChange = (event, { newValue }) => {
    setCity(newValue);
    handleAddressChange({
      target: { name: "city", value: newValue },
    });
};


const handleCountryChange = (selectedOption) => {
  if (!selectedOption) return;

  const event = {
    target: {
      name: "country",
      value: selectedOption.value,
    },
  };

  handleAddressChange( event); 
};





  return (
    <div className="mb-3">
      <h5 className="mt-3">Address</h5>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="h_no">House Number</Label>
            <Input
              type="text"
              name="h_no"
              id="h_no"
              value={address.h_no || ""}
              placeholder="House Number"
              onChange={(e) => handleAddressChange( e)} 
            />
          </FormGroup>
        </Col>
        
        <Col md={6}>
        <FormGroup>
          <Label for="nearby">Nearby Landmark</Label>
          <Input
            type="text"
            name="nearby"
            placeholder="Nearby Landmark"
            id="nearby"
            value={address.nearby || ""}
            onChange={(e) => handleAddressChange( e)} 
          />
        </FormGroup>
       </Col>

      </Row>
      <Row>  
      <Col md={6}>
      <FormGroup>
        <Label for="zip_code">Zip Code</Label>
        <Input
          type="text"
          name="zip_code"
          placeholder="Zip Code"
          id="zip_code"
          value={address.zip_code || ""}
          onChange={(e) => handleAddressChange(e)} 
        />
      </FormGroup></Col>
      <Col md={6}>
      <FormGroup>
        <Label for="district">District</Label>
        <Input
          type="text"
          name="district"
          placeholder="District"
          id="district"
          value={address.district || ""}
          onChange={(e) => handleAddressChange( e)} 
        />
      </FormGroup></Col>
      </Row>
      <Row><Col md={6}>
      <FormGroup>
        <Label for="city">City</Label>
        <Input
          type="text"
          placeholder="City"
          name="city"
          id="city"
          value={address.city || ""}
          onChange={(e) => handleAddressChange( e)} 
          //required
        />
      </FormGroup>
      </Col>
      <Col md={6}>
      <FormGroup>
        <Label for="state">State</Label>
        <Input
          type="text"
          name="state"
          placeholder="State"
          id="state"
          value={address.state || ""}
          onChange={(e) => handleAddressChange( e)} 
        />
      </FormGroup></Col>
      </Row>
      <FormGroup>
        <Label for="country">Country</Label>
        <Select
          options={countryOptions}
          defaultValue={countryOptions.find((option) => option.value === address.country)}
          onChange={handleCountryChange} 
          placeholder="Country"
        />
      </FormGroup>
    </div>
  );
};

export default AddressForm;
