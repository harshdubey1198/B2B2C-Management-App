import React, { useState, useMemo } from "react";
import Select from "react-select";
import cityStateCountryData from "../../CommonData/Data/countries+states+cities.json";

const CityInput = ({ onChange }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Extract city list with memoization for performance
  const cities = useMemo(() => {
    return cityStateCountryData.flatMap((country) =>
      country.states.flatMap((state) =>
        state.cities.map((city) => ({
          label: city.name,
          value: city.name,
          state: state.name,
          country: country.name,
        }))
      )
    );
  }, []);

  // Handle city selection
  const handleCityChange = (selectedOption) => {
    if (!selectedOption) {
      setSelectedCity(null);
      setSelectedState(null);
      setSelectedCountry(null);
      onChange && onChange(null, null, null);
      return;
    }

    setSelectedCity(selectedOption);
    setSelectedState({ label: selectedOption.state, value: selectedOption.state });
    setSelectedCountry({ label: selectedOption.country, value: selectedOption.country });

    // Pass selected values to parent if needed
    onChange && onChange(selectedOption.value, selectedOption.state, selectedOption.country);
  };

  return (
      <>
        <div className="mt-3">
        <label className="form-label">City</label>
        <Select
          options={searchTerm.length >= 3 ? cities : []} 
          value={selectedCity}
          onChange={handleCityChange}
          onInputChange={(input) => setSearchTerm(input)}
          placeholder="Type at least 3 characters..."
          isClearable
        />
       {/* show the selected city , state , country */}
            {selectedCity && (
            <div>
                <h5>Selected City Details</h5>
                <ul>
                    <li>
                    <strong>City:</strong> {selectedCity.label}
                    </li>
                    <li>
                    <strong>State:</strong> {selectedState.label}
                    </li>
                    <li>
                    <strong>Country:</strong> {selectedCountry.label}
                    </li>
                </ul>
            </div>
            )
    
            }
        </div>
      </>
  );
};

export default CityInput;
