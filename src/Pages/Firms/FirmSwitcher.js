import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

function FirmSwitcher({ selectedFirmId, onSelectFirm }) {
  const [firms, setFirms] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const authuser = JSON.parse(localStorage.getItem("authUser"));

  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  useEffect(() => {
    const defaultFirm = JSON.parse(localStorage.getItem("defaultFirm"));
    if (defaultFirm && !selectedFirmId) {
      onSelectFirm(defaultFirm.fuid);
    }

    if (authuser) {
      axios.get(`${process.env.REACT_APP_URL}/clientadmin/getFirms/${authuser?.response._id}`)
        .then((response) => {
          setFirms(response);  
        })
        .catch((error) => {
          console.log(error, "Error getting firms");
        });
    }
  }, [selectedFirmId, onSelectFirm]);

  useEffect(() => {
    if (selectedFirmId) {
      const selectedFirm = firms.find(firm => firm.fuid === selectedFirmId);
      if (selectedFirm) {
        localStorage.setItem("defaultFirm", JSON.stringify({
          fuid: selectedFirm.fuid,
          name: selectedFirm.firmName,
          firmId: selectedFirm._id
        }));
      }
    }
  }, [selectedFirmId, firms]);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} style={{width:'100px'}}>
      <DropdownToggle  style={{ backgroundColor: '#0bb197' ,width:'100px'}}>
        <span style={{ marginRight: '10px' }}>
          {firms.find(firm => firm.fuid === selectedFirmId)?.firmName || 'Select Firm'}
        </span>

        {dropdownOpen 
          ? <i className="mdi mdi-chevron-up"></i> 
          : <i className="mdi mdi-chevron-down"></i>}
      </DropdownToggle>
      <DropdownMenu>
        {firms.map(firm => (
          <DropdownItem
            key={firm.id}
            onClick={() => onSelectFirm(firm.fuid)}
            active={firm.fuid === selectedFirmId}
          >
            <img
              src={firm.avatar}
              alt={firm.name}
              className="img-fluid"
              style={{ maxWidth: '30px', marginRight: '10px' }}
            />
            {firm.firmName}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

export default FirmSwitcher;
