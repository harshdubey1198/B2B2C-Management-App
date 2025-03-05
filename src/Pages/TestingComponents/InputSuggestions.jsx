import React, { useState } from "react";
import Select from "react-select";
import cityStateCountryData from "../../CommonData/Data/countries+states+cities.json";
import Breadcrumbs from "../../components/Common/Breadcrumb";

const InputSuggestions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const allStates = cityStateCountryData.flatMap((country) =>
    country.states.map((state) => ({
      label: state.name,
      value: state.name,
      country: country.name,
    }))
  );

  const allCountries = cityStateCountryData.map((country) => ({
    label: country.name,
    value: country.name,
  }));

  const handleInputChange = (inputValue) => {
    setSearchTerm(inputValue);

    if (inputValue.length >= 3) {
      const matchedCities = cityStateCountryData.flatMap((country) =>
        country.states.flatMap((state) =>
          state.cities
            .filter((city) => city.name.toLowerCase().includes(inputValue.toLowerCase()))
            .map((city) => ({
              label: city.name,
              value: city.name,
              state: state.name,
              country: country.name,
            }))
        )
      );
      setFilteredCities(matchedCities);
    } else {
      setFilteredCities([]);
    }
  };

  const handleCityChange = (selectedOption) => {
    if (!selectedOption) {
      setSelectedCity(null);
      setSelectedState(null);
      setSelectedCountry(null);
      return;
    }

    setSelectedCity(selectedOption);
    setSelectedState({ label: selectedOption.state, value: selectedOption.state });
    setSelectedCountry({ label: selectedOption.country, value: selectedOption.country });
  };

  const handleStateChange = (selectedOption) => {
    if (!selectedOption) {
      setSelectedState(null);
      return;
    }

    setSelectedState(selectedOption);

    const matchedState = allStates.find((state) => state.value === selectedOption?.value);
    if (matchedState) {
      setSelectedCountry({ label: matchedState.country, value: matchedState.country });
    }
  };

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Forms" breadcrumbItem="Input Suggestions" />

        <div className="container mt-4">
          <h4>Auto-fill State & Country by City</h4>
          <div className="mb-3">
            <label className="form-label">Select City</label>
            <Select
              options={filteredCities}
              value={selectedCity}
              onInputChange={handleInputChange}
              onChange={handleCityChange}
              placeholder="Type at least 3 characters..."
              isClearable
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Select or Edit State</label>
            <Select
              options={allStates}
              value={selectedState}
              onChange={handleStateChange}
              placeholder="Search or Select State..."
              isClearable
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Select or Edit Country</label>
            <Select
              options={allCountries}
              value={selectedCountry}
              onChange={handleCountryChange}
              placeholder="Search or Select Country..."
              isClearable
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default InputSuggestions;
