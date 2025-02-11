import React from "react";
import Select from "react-select";
import IconsDataMdi from "../CommonData/Data/mdiIconsData";

const IconSelector = ({ selectedIcon, setSelectedIcon }) => {
  const options = IconsDataMdi.map(icon => ({
    value: icon.name,
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <i className={icon.name} style={{ marginRight: 10 }}></i>
        {icon.name}
      </div>
    ),
  }));

  const handleChange = (selectedOption) => {
    setSelectedIcon(selectedOption ? selectedOption.value : "");
  };

  return (
    <Select
      options={options}
      onChange={handleChange}
      isSearchable
      placeholder="Select an icon..."
      value={options.find(option => option.value === selectedIcon)}
    />
  );
};

export default IconSelector;
