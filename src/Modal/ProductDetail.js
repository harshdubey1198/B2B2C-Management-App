import React from 'react';
import { Modal, ModalHeader, ModalBody, Table, FormGroup, Label, Input, Button } from 'reactstrap';

const ProductDetail = ({ isOpen, toggleModal, selectedItemDetails }) => {
  
  console.log(selectedItemDetails)
  return (
    <Modal isOpen={isOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Product Details</ModalHeader>
      <ModalBody>
        {selectedItemDetails && (
          <div>
            <h4>{selectedItemDetails.name}</h4>
            <p><strong>Description:</strong> {selectedItemDetails.description}</p>
            <p><strong>Category:</strong> {selectedItemDetails.category}</p>
            <p><strong>Brand:</strong> {selectedItemDetails.brandName}</p>
            <p><strong>Supplier:</strong> {selectedItemDetails.supplier}</p>

            <h5>Variants:</h5>
            <Table bordered>
              <thead>
                <tr>
                  <th>Variant</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Tax</th>
                </tr>
              </thead>
              <tbody>
                {selectedItemDetails.variants.map(variant => (
                  <tr key={variant.id}>
                    <td>{variant.name}</td>
                    <td>${variant.price.toFixed(2)}</td>
                    <td>{variant.quantity}</td>
                    <td>{variant.tax}%</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </ModalBody>
    </Modal>
  );
};

export default ProductDetail;
