import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

function FirmSwitcher({ selectedFirmId, onSelectFirm }) {
  const [firms, setFirms] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const authuser = JSON.parse(localStorage.getItem("authUser"))

  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  useEffect(() => {
    // Load firms from localStorage
    const storedFirms = JSON.parse(localStorage.getItem("Firms")) || [];
    setFirms(storedFirms);

    // Set the default firm if selectedFirmId is not provided
    const defaultFirm = JSON.parse(localStorage.getItem("defaultFirm"));
    if (defaultFirm && !selectedFirmId) {
      onSelectFirm(defaultFirm.id);
    }

    // SETTING FIRMS FROM BACKEND 
    // if(authuser){
    //     axios.get(`${process.env.REACT_APP_URL}/clientadmin/getFirms/${authuser?.response._id}`).then((response) => {
    //       setFirms(response)
    //     }).catch((error) => {
    //       console.log(error, "error getting firms")
    //     })
    // }
  }, [selectedFirmId, onSelectFirm]);

  useEffect(() => {
    if (selectedFirmId) {
      const selectedFirm = firms.find(firm => firm.id === selectedFirmId);
      if (selectedFirm) {
        localStorage.setItem("defaultFirm", JSON.stringify({
          id: selectedFirm.id,
          name: selectedFirm.name
        }));
      }
    }
  }, [selectedFirmId, firms]);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
      <DropdownToggle caret>
        {firms.find(firm => firm.id === selectedFirmId)?.name || 'Select Firm'}
      </DropdownToggle>
      <DropdownMenu>
        {firms.map(firm => (
          <DropdownItem
            key={firm.id}
            onClick={() => onSelectFirm(firm.id)}
            active={firm.id === selectedFirmId}
          >
            <img
              // src={firm.avatar}
              src={firm.image}
              alt={firm.name}
              className='img-fluid'
              style={{ maxWidth: '30px', marginRight: '10px' }}
            />
            {/* {firm.firmName} */}
            {firm.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

export default FirmSwitcher;
