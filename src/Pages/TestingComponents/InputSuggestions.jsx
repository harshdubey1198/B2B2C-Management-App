// import React from "react";
// import Breadcrumbs from "../../components/Common/Breadcrumb";
// import CityInput from "../../components/addressHelpers/cityInput";

// const InputSuggestions = () => {
//   const handleCitySelection = (city, state, country) => {
//     console.log("Selected City Details:", { city, state, country });
//   };

//   return (
//     <React.Fragment>
//       <div className="page-content">
//         <Breadcrumbs title="Forms" breadcrumbItem="Input Suggestions" />

//         <div className="container mt-4">
//           <h4>Auto-fill State & Country by City</h4>
//           <CityInput onChange={handleCitySelection} />
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };

// export default InputSuggestions;
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
      // **If user clears input, reset all fields**
      setSelectedCity(null);
      setSelectedState(null);
      setSelectedCountry(null);
      return;
    }

    setSelectedCity(selectedOption);
    setSelectedState({ label: selectedOption.state, value: selectedOption.state });
    setSelectedCountry({ label: selectedOption.country, value: selectedOption.country });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Forms" breadcrumbItem="Input Suggestions" />

        <div className="container mt-4">
          <h4>Auto-fill State & Country by City</h4>

          {/* City Selection */}
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

          {/* State Auto-filled */}
          <div className="mb-3">
            <label className="form-label">State</label>
            <Select value={selectedState} isDisabled placeholder="State will be auto-filled" />
          </div>

          {/* Country Auto-filled */}
          <div className="mb-3">
            <label className="form-label">Country</label>
            <Select value={selectedCountry} isDisabled placeholder="Country will be auto-filled" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default InputSuggestions;
