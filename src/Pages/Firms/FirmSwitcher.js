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
      onSelectFirm(defaultFirm.firmId);
    }

    if (authuser) {
      axios.get(`${process.env.REACT_APP_URL}/auth/getCompany/${authuser?.response._id}`)
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
      const selectedFirm = firms.find(firm => firm._id === selectedFirmId);
      if (selectedFirm) {
        localStorage.setItem("defaultFirm", JSON.stringify({
          fuid: selectedFirm.fuid,
          companyTitle: selectedFirm.companyTitle,
          name: selectedFirm.firmName,
          firmId: selectedFirm._id
        }));
      }
    }
  }, [selectedFirmId, firms]);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} style={{width:'200px'}}>
      <DropdownToggle  style={{ backgroundColor: '#0bb197' ,minWidth:'165px'}}>
        <span style={{ marginRight: '10px' }}>
          {firms.find(firm => firm._id === selectedFirmId)?.companyTitle }
        </span>

        {dropdownOpen 
          ? <i className="mdi mdi-chevron-up"></i> 
          : <i className="mdi mdi-chevron-down"></i>}
      </DropdownToggle>
      <DropdownMenu>
        {firms.map(firm => (
          <DropdownItem
            key={firm._id}
            onClick={() => onSelectFirm(firm._id)}
            active={firm._id === selectedFirmId}
          >
            <img
              src={firm.avatar}
              alt={firm.name}
              className="img-fluid"
              style={{ maxWidth: '30px', marginRight: '10px' }}
            />
            {firm.companyTitle}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

export default FirmSwitcher;
