// FirmSwitcher.js
import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


function FirmSwitcher({ selectedFirmId, onSelectFirm }) {
  const [firms, setFirms] = useState([])
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);
  useEffect(() => {
    setFirms(JSON.parse(localStorage.getItem("Firms")) || [])
  }, [])

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
      <DropdownToggle caret>
        {firms.find(firm => firm.id === selectedFirmId)?.name || 'Select Firm'}
      </DropdownToggle>
      <DropdownMenu>
        {firms && firms.map(firm => (
          <DropdownItem
            key={firm.id}
            onClick={() => onSelectFirm(firm.id)}
            active={firm.id === selectedFirmId}
          >
            <img
              src={firm.image}
              alt={firm.name}
              className='img-fluid'
              style={{ maxWidth: '30px', marginRight: '10px' }}
            />
            {firm.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

export default FirmSwitcher;
