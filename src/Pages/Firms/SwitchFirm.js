import React, { useState } from 'react';
import { Col, Table } from 'reactstrap';

// const firms = [
//   { id: 1, name: 'Firm A', logo: 'https://res.cloudinary.com/harshdubey1198/image/upload/v1722844391/abstract-colorful-logo_1017-8753_qptgtx.avif' },
//   { id: 2, name: 'Firm B', logo: 'https://res.cloudinary.com/harshdubey1198/image/upload/v1722844388/business-logo_23-2147503133_sw5xjq.avif' },
//   { id: 3, name: 'Firm C', logo: 'https://res.cloudinary.com/harshdubey1198/image/upload/v1722844376/gradient-logo-with-abstract-shape_23-2148219550_mgiwzf.avif' },
//   { id: 4, name: 'Firm D', logo: 'https://res.cloudinary.com/harshdubey1198/image/upload/v1722844367/colorful-floral-logo_1025-262_ahzfec.avif' },
// ];

const firms = JSON.parse(localStorage.getItem("Firms")) || []
console.log(firms, "firms")

function SwitchFirm() {
  const [currentFirm, setCurrentFirm] = useState(firms[0]);

  const handleSwitchFirm = (firm) => {
    setCurrentFirm(firm);
  };

  return (
    <React.Fragment>
      <div className='page-content'>
        <div className='container mt-4'>
          <div className='text-center mb-4'>
            <img
              src={currentFirm.imageUrl}
              alt={currentFirm.name}
              className='img-fluid mb-2 rounded-circle'
              style={{ maxWidth: '100px' }}
            />
            <h1>{currentFirm.name}</h1>
          </div>
          <Col lg={6} className='mx-auto'>
            <div className='table-responsive'>
              <Table bordered>
                <thead>
                  <tr>
                    <th className='text-center'>Logo</th>
                    <th className='text-center'>Name</th>
                    <th className='text-center'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {firms && firms.map(firm => (
                    <tr key={firm.id}>
                      <td className='text-center'>
                        <img
                          src={firm.imageUrl}
                          alt={firm.name}
                          className='img-fluid'
                          style={{ maxWidth: '50px' }}
                        />
                      </td>
                      <td className='text-center'>{firm.name}</td>
                      <td className='text-center'>
                        <button
                          className={`btn ${currentFirm.id === firm.id ? 'btn-primary' : 'btn-secondary'}`}
                          onClick={() => handleSwitchFirm(firm)}
                        >
                          {currentFirm.id === firm.id ? 'Current Firm' : 'Switch'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SwitchFirm;
