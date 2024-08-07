// FirmSwitcher.js
import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

// const firms = [
//   { id: 1, name: 'Firm A', logo: 'https://res.cloudinary.com/harshdubey1198/image/upload/v1722844391/abstract-colorful-logo_1017-8753_qptgtx.avif' },
//   { id: 2, name: 'Firm B', logo: 'https://res.cloudinary.com/harshdubey1198/image/upload/v1722844388/business-logo_23-2147503133_sw5xjq.avif' },
//   { id: 3, name: 'Firm C', logo: 'https://res.cloudinary.com/harshdubey1198/image/upload/v1722844376/gradient-logo-with-abstract-shape_23-2148219550_mgiwzf.avif' },
//   { id: 4, name: 'Firm D', logo: 'https://res.cloudinary.com/harshdubey1198/image/upload/v1722844367/colorful-floral-logo_1025-262_ahzfec.avif' },
// ];


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
