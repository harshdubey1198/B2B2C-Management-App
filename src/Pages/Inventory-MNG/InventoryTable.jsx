import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Button } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { mdiPencil, mdiDelete } from '@mdi/js';
import Icon from '@mdi/react';

function InventoryTable() {
  const [inventoryData, setInventoryData] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('inventoryItems')) || [];
    setInventoryData(storedData.map(item => ({
      ...item,
      // price: Number(item.price), 
      variants: Array.isArray(item.variants) ? item.variants.map(v => ({
        ...v,
        price: Number(v.price), 
        tax: Number(v.tax) 
      })) : [] 
    })));
  }, []);


  const handleRowClick = (id) => {
    if (selectedItemId === id) {
      setSelectedItemId(null); 
    } else {
      setSelectedItemId(id);
    }
  };

  const handleEditClick = (id) => {
  
    console.log("Edit item:", id);
  };

  const handleDeleteClick = (id) => {
    const updatedData = inventoryData.filter(item => item.id !== id);
    setInventoryData(updatedData);
    localStorage.setItem('inventoryItems', JSON.stringify(updatedData));
  };

  const calculatePriceAfterTax = (price, taxRate) => {
    return (price + (price * (taxRate / 100))).toFixed(2);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Inventory Management" breadcrumbItem="Inventory Table" />
        <p className='mm-active'>
          This is the Inventory Table page. 
          Here you can view and manage your inventory items.
        </p>
        <Col lg={12}>
          <Card>
            <CardBody>
              <div className="table-responsive">
                <table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Supplier</th>
                      <th>Original Price</th>
                      <th>Category</th>
                      <th>Variants</th>
                      <th>Type</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryData.map(item => (
                      <React.Fragment key={item.id}>
                        {item.variants.length > 0 ? (
                          item.variants.map((variant, index) => (
                            <tr 
                              key={`${item.id}-${index}`} 
                              onClick={() => handleRowClick(item.id)}
                              style={{ cursor: 'pointer' }} // Pointer cursor for clickable rows
                            >
                              <td>{index === 0 ? item.name : ''}</td>
                              <td>{index === 0 ? item.description : ''}</td>
                              <td>{index === 0 ? item.quantity : ''}</td>
                              <td>{index === 0 ? item.supplier : ''}</td>
                              <td>${variant.price.toFixed(2)}</td>
                              <td>{index === 0 ? item.category : ''}</td>
                              <td>
                                {variant.name} - ${calculatePriceAfterTax(variant.price, variant.tax)}
                              </td>
                              <td>{index === 0 ? item.type : ''}</td>
                              <td>
                                <div className='d-flex'>
                                <Button color="warning" onClick={() => handleEditClick(item.id)} title="Edit">
                                  <Icon path={mdiPencil} size={1} />
                                </Button>
                                <Button color="danger" onClick={() => handleDeleteClick(item.id)} style={{ marginLeft: '5px' }} title="Delete">
                                  <Icon path={mdiDelete} size={1} />
                                </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="9">No variants available</td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </Col>

        {selectedItemId && (
          <Card>
            <CardBody>
              <div className="hover-details mt-3">
                <h5>Item Details:</h5>
                {inventoryData.find(item => item.id === selectedItemId) && (
                  <div className='d-flex justify-content-evenly'>
                    <img
                      src={inventoryData.find(item => item.id === selectedItemId).image}
                      alt="Item"
                      style={{ maxWidth: '200px', display: 'block', marginBottom: '10px' }}
                    />
                    <ul>
                      <li>Name: {inventoryData.find(item => item.id === selectedItemId).name}</li>
                      <li>Description: {inventoryData.find(item => item.id === selectedItemId).description}</li>
                      <li>Quantity: {inventoryData.find(item => item.id === selectedItemId).quantity}</li>
                      <li>Supplier: {inventoryData.find(item => item.id === selectedItemId).supplier}</li>
                      <li>Price: ${Number(inventoryData.find(item => item.id === selectedItemId).price).toFixed(2)}</li>
                      <li>Category: {inventoryData.find(item => item.id === selectedItemId).category}</li>
                      <li>Variants: {inventoryData.find(item => item.id === selectedItemId).variants.map(v => (
                        <div key={v.variantName}>
                          {v.variantName} - Original: ${v.price.toFixed(2)}, After Tax: ${calculatePriceAfterTax(v.price, v.tax)}
                        </div>
                      ))}</li>
                      <li>Type: {inventoryData.find(item => item.id === selectedItemId).type}</li>
                    </ul>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </React.Fragment>
  );
}

export default InventoryTable;
