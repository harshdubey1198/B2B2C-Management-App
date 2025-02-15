import React from 'react';
import { Modal, ModalHeader, ModalBody, Table, Button } from 'reactstrap';

const BomDetailsModal = ({ isOpen, toggle, selectedBom }) => {
  if (!selectedBom) return null;

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>BOM Details - {selectedBom.productName}</ModalHeader>
      <ModalBody>
        <Table bordered>
          <tbody>
            <tr>
              <th>Product Name</th>
              <td>{selectedBom.productName}</td>
            </tr>
            <tr>
              <th>Brand</th>
              <td>{selectedBom.brand?.name || 'N/A'}</td>
            </tr>
            <tr>
              <th>Category</th>
              <td>{selectedBom.categoryId?.categoryName || 'N/A'}</td>
            </tr>
            <tr>
              <th>Vendor</th>
              <td>{selectedBom.vendor?.name || 'N/A'}</td>
            </tr>
            <tr>
              <th>Total Cost Price</th>
              <td>{selectedBom.totalCostPrice}</td>
            </tr>
            <tr>
              <th>Selling Price</th>
              <td>{selectedBom.sellingPrice}</td>
            </tr>
            <tr>
              <th>Taxes</th>
              <td>
                {selectedBom.tax?.selectedTaxTypes?.map((tax) => (
                  <div key={tax._id}>{tax.taxType}: {tax.rate}%</div>
                )) || 'N/A'}
              </td>
            </tr>
            <tr>
              <th>Created By</th>
              <td>{selectedBom.createdBy?.firstName} {selectedBom.createdBy?.lastName}</td>
            </tr>
          </tbody>
        </Table>
        
        <h5>Raw Materials</h5>
        <Table bordered>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Waste %</th>
              <th>Cost Price</th>
            </tr>
          </thead>
          <tbody>
            {selectedBom.rawMaterials.map((material) => (
              <tr key={material._id}>
                <td>{material.itemId?.name || 'N/A'}</td>
                <td>{material.quantity} {material.itemId?.qtyType}</td>
                <td>{material.wastePercentage}%</td>
                <td>{material.itemId?.costPrice}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="text-end">
          <Button color="secondary" onClick={toggle}>Close</Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default BomDetailsModal;
