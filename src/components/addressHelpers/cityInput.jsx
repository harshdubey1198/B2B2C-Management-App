import React, { useState } from "react";
import Select from "react-select";
import cityData from "../../CommonData/Data/cities.json"; // Ensure correct path

const CityInput = ({ formValues, setFormValues }) => {
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  const handleInputChange = (inputValue) => {
    const words = inputValue.trim().split(/\s+/);
    if (words.length >= 2) {
      const matchedCities = cityData
        .filter((city) =>
          city.name.toLowerCase().includes(inputValue.toLowerCase())
        )
        .map((city) => ({
          label: city.name,
          value: city.name,
          state: city.state_code,
          country: city.country_code,
        }));
      setFilteredCities(matchedCities);
    } else {
      setFilteredCities([]);
    }
  };

  const handleCityChange = (selectedOption) => {
    if (!selectedOption) {
      setSelectedCity(null);
      setFormValues((prev) => ({
        ...prev,
        city: "",
        state: "",
        country: "",
      }));
      return;
    }

    setSelectedCity(selectedOption);
    setFormValues((prev) => ({
      ...prev,
      city: selectedOption.value,
      state: selectedOption.state,
      country: selectedOption.country,
    }));
  };

  return (
    <div className="mb-3">
      <label className="form-label">City</label>
      <Select
        options={filteredCities}
        value={selectedCity}
        onInputChange={handleInputChange}
        onChange={handleCityChange}
        placeholder="Type at least 2 words..."
        isClearable
      />
    </div>
  );
};

export default CityInput;
