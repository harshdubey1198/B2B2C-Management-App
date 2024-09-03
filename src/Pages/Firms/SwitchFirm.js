import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Table } from 'reactstrap';

function SwitchFirm() {
  const [firms, setFirms] = useState([]);
  const [currentFirm, setCurrentFirm] = useState(null);
  const authuser = JSON.parse(localStorage.getItem("authUser"))

  useEffect(() => {
    // Fetch firms from localStorage
    // const storedFirms = JSON.parse(localStorage.getItem("Firms")) || [];
    // setFirms(storedFirms);
    if(authuser){
      axios.get(`https://b2b2c-management-app.onrender.com/api/clientadmin/getFirms/${authuser?.response._id}`).then((response) => {
        setFirms(response)
      }).catch((error) => {
        console.log(error, "error getting firms")
      })
    }
  }, []);

  useEffect(() => {
      setCurrentFirm(firms[0]);
  }, [firms]);

  const handleSwitchFirm = (firm) => {
    setCurrentFirm(firm);
  };

  return (
    <React.Fragment>
      <div className='page-content'>
        <div className='container mt-4'>
          <div className='text-center mb-4'>
            {currentFirm ? (
              <>
                <img
                  src={currentFirm.avatar}
                  // src={currentFirm.image}
                  alt={currentFirm.name}
                  className='img-fluid mb-2 rounded-circle'
                  style={{ maxWidth: '100px' }}
                />
                <h1>{currentFirm.firmName}</h1>
                {/* <h1>{currentFirm.name}</h1> */}
              </>
            ) : (
              <p>No firm selected</p>
            )}
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
                  {firms.map(firm => (
                    <tr key={firm.id}>
                      <td className='text-center'>
                        <img
                          src={firm?.avatar}
                          // src={firm?.image}
                          alt={firm.name}
                          className='img-fluid'
                          style={{ maxWidth: '50px' }}
                        />
                      </td>
                      <td className='text-center'>{firm.firmName}</td>
                      {/* <td className='text-center'>{firm.name}</td> */}
                      <td className='text-center'>
                        <button
                          className={`btn ${currentFirm?.id === firm.id ? 'btn-primary' : 'btn-primary'}`}
                          onClick={() => handleSwitchFirm(firm)}
                        >
                          {currentFirm?.id === firm.id ? 'Current Firm' : 'Switch'}
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
