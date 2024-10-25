import React, { useState } from 'react';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { Container, Table } from 'reactstrap';
import FetchBrands from './FetchBrands';

const Brands = () => {
  const authuser = JSON.parse(localStorage.getItem("authUser")).response;
  const firmId = authuser?.adminId;
  const [brands, setBrands] = useState([]);

  const handleBrandsFetched = (fetchedBrands) => {
    setBrands(fetchedBrands);
    console.log(fetchedBrands);
  };

  const sliceDescription = (description) => {
    if (description.length > 100) {
      return description.slice(0, 30) + "...";
    }
    return description;
  };

  return ( 
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Inventory Management" breadcrumbItem="Brands" />
          <FetchBrands onBrandsFetched={handleBrandsFetched} firmId={firmId} />
        </div>
        <div className='table-responsive'>
          <Table bordered className='table table-centered table-nowrap mb-0'>
            <thead className='thead-light'>
              <tr>
                <th>Brand Name</th>
                <th>Country</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand) => (
                <tr key={brand._id}>
                  <td>
                    <a 
                      href={brand.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none', color: '#007bff' }}
                    >
                      {brand.name}
                    </a>
                  </td>
                  <td>{brand.country}</td>
                  <td>{sliceDescription(brand.description)}</td>
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

export default Brands;
