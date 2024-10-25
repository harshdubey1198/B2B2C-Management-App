import React, { useState } from 'react';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import FetchManufacturers from './FetchManufacturers';
import { Table } from 'reactstrap';

const Manufacturers = () => {
  const authuser = JSON.parse(localStorage.getItem("authUser")).response;
  const firmId = authuser?.adminId;
  const [manufacturers, setManufacturers] = useState([]);

  const handleManufacturersFetched = (fetchedManufacturers) => {
    setManufacturers(fetchedManufacturers);
    console.log(fetchedManufacturers);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Inventory Management" breadcrumbItem="Manufacturer" />
          <FetchManufacturers onManufacturersFetched={handleManufacturersFetched} firmId={firmId} />
        </div>
        <div className='table-responsive'>
            <Table bordered className='table table-centered table-nowrap mb-0'>
                <thead className='thead-light'>
                <tr>
                    <th>Title</th>
                    <th>Lead</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {manufacturers.map((manufacturer) => (
                    <tr key={manufacturer._id}>
                    <td>{manufacturer.name}</td>
                    <td>{manufacturer.contactPerson}</td>
                    <td>{manufacturer.phone}</td>
                    <td>
                        <i className='bx bx-edit' style={{ fontSize: '22px', fontWeight: 'bold', cursor: 'pointer' }}></i>
                        <i className='bx bx-trash' style={{ fontSize: '22px', fontWeight: 'bold', cursor: 'pointer', marginLeft: '5px' }}></i>
                    </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Manufacturers;
