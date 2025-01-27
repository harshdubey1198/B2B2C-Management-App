import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Input, Row, Col, Card, CardBody } from 'reactstrap';

function QuantityUpdateModal({
  modalOpen,
  setModalOpen,
  selectedOrder,
  handleUpdateQuantity,
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [newQuantity, setNewQuantity] = useState(selectedOrder?.quantity || '');
  const [newNote, setNewNote] = useState(selectedOrder?.notes || '');

  const handleSave = () => {
    const updatedData = { quantity: newQuantity, notes: newNote };
    handleUpdateQuantity(selectedOrder._id, updatedData);
  };

  return (
    <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)} size="lg">
      <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
        {isEditMode ? `Edit Order #${selectedOrder?.productionOrderNumber}` : `View Order #${selectedOrder?.productionOrderNumber}`}
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col md={6}>
            <div>
              <strong>Product Name:</strong> {selectedOrder?.bomId?.productName}
            </div>
            <div>
              <strong>Order Created By:</strong> {selectedOrder?.createdBy?.firstName} {selectedOrder?.createdBy?.lastName}
            </div>
            <div>
              <strong>Notes:</strong> {isEditMode ? (
                <Input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Enter note for this update"
                  required
                />
              ) : (
                selectedOrder?.notes
              )}
            </div>
          </Col>
          <Col md={6}>
            <div>
              <strong>Order Date:</strong> {new Date(selectedOrder?.createdAt).toLocaleString()}
            </div>
            <div>
              <strong>Updated On:</strong> {new Date(selectedOrder?.updatedAt).toLocaleString()}
            </div>
            <div>
              <strong>Status:</strong>{' '}
              {selectedOrder?.status
                .split('_')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </div>
          </Col>
        </Row>

        <Card className="mt-3">
          <CardBody>
            <h5>Raw Materials:</h5>
            <ul>
              {selectedOrder?.rawMaterials?.map((rawMaterial, index) => (
                <li key={index}>
                  <strong>{rawMaterial?.itemId?.name}</strong> ({rawMaterial?.itemId?.qtyType}) - {rawMaterial?.quantity} units
                  <br />
                  <span>
                    <strong>Cost Price:</strong> ₹{rawMaterial?.itemId?.costPrice}
                  </span>
                  <br />
                  <span>
                    <strong>Selling Price:</strong> ₹{rawMaterial?.itemId?.sellingPrice}
                  </span>
                  <br />
                  <span>
                    <strong>Description:</strong> {rawMaterial?.itemId?.description}
                  </span>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>

        <div className="form-group mt-3">
          <label htmlFor="quantity">Quantity:</label>
          {isEditMode ? (
            <Input
              type="number"
              id="quantity"
              value={newQuantity}
              onChange={(e) => setNewQuantity(e.target.value)}
              required
              placeholder="Enter new quantity"
            />
          ) : (
            <div>{selectedOrder?.quantity} units</div>
          )}
        </div>
      </ModalBody>
      <ModalFooter>
        {isEditMode ? (
          <>
            <Button color="primary" onClick={handleSave}>
              Save Changes
            </Button>{' '}
            <Button color="secondary" onClick={() => setIsEditMode(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <Button color="primary" onClick={() => setIsEditMode(true)}>
            Edit
          </Button>
        )}
        <Button color="secondary" onClick={() => setModalOpen(false)}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default QuantityUpdateModal;
