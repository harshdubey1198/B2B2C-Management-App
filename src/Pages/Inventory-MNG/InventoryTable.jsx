import React, { useEffect, useState } from 'react';
import { Table, Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import axios from 'axios'; 

function InventoryTable() {
  const [inventoryData, setInventoryData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);  
  const [modalOpen, setModalOpen] = useState(false);

  const token = JSON.parse(localStorage.getItem("authUser")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/inventory/get-items', config);
        setInventoryData(response.data); 
      } catch (error) {
        console.error('Error fetching inventory data:', error);
      }
    };
    fetchInventoryData();
  },[]);

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Inventory Management" breadcrumbItem="Inventory Table" />

        <div className="table-responsive">
          <Table bordered className="mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Brand</th>
                <th>Cost Price</th>
                <th>Selling Price</th>
                <th>Actions</th> 
              </tr>
            </thead>
            <tbody>
              {inventoryData.length > 0 ? (
                inventoryData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.quantity} {item.qtyType}</td>
                    <td>{item.brand}</td>
                    <td>${item.costPrice?.toFixed(2)}</td>
                    <td>${item.sellingPrice?.toFixed(2)}</td>
                    <td>
                      <Button color="info" onClick={() => handleViewDetails(item)}>
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No inventory items found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        <Modal modalClassName="custom-modal-width" isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
          <ModalHeader  toggle={() => setModalOpen(!modalOpen)}>
            {selectedItem?.name} Details
          </ModalHeader>
          <ModalBody >
            {selectedItem && (
              <div>
                <p><strong>Description:</strong> {selectedItem.description}</p>
                <p><strong>Quantity:</strong> {selectedItem.quantity} {selectedItem.qtyType}</p>
                <p><strong>Brand:</strong> {selectedItem.brand}</p>
                <p><strong>Cost Price:</strong> ${selectedItem.costPrice?.toFixed(2)}</p>
                <p><strong>Selling Price:</strong> ${selectedItem.sellingPrice?.toFixed(2)}</p>
                <p><strong>Supplier:</strong> {selectedItem.supplier}</p>
                <p><strong>Manufacturer:</strong> {selectedItem.manufacturer}</p>
                <p><strong>HSN Code:</strong> {selectedItem.ProductHsn}</p>
                
                <div>
                  <strong>Variants:</strong>
                  {selectedItem.variants.length > 0 ? (
                    <Table bordered className="mt-3">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Variation Type</th>
                          <th>Option Label</th>
                          <th>Price ⬆️</th>
                          <th>Stock</th>
                          <th>SKU</th>
                          <th>Barcode</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedItem.variants.map((variant, vIndex) => (
                          <tr key={vIndex}>
                            <td>{vIndex + 1}</td>
                            <td>{variant.variationType}</td>
                            <td>{variant.optionLabel}</td>
                            <td>${variant.priceAdjustment}</td>
                            <td>{variant.stock}</td>
                            <td>{variant.sku}</td>
                            <td>{variant.barcode}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <p>No Variants</p>
                  )}
                </div>

              </div>
            )}
          </ModalBody>
        </Modal>
      </div>
    </React.Fragment>
  );
}

export default InventoryTable;
