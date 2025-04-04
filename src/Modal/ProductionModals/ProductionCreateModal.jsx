import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap';
import { createProductionOrder, getBoms } from '../../apiServices/service';
import { toast } from 'react-toastify';

function ProductionCreateModal({ modalOpen, setModalOpen, trigger, firmId }) {
  const [boms, setBoms] = useState([]);
  const [selectedBom, setSelectedBom] = useState(null);
  const [selectedBomData, setSelectedBomData] = useState(null);
  const [quantity, setQuantity] = useState(0);

  const authuser = JSON.parse(localStorage.getItem('authUser'))?.response;
  const createdBy = authuser?._id;

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      setQuantity(value);
    }
  };

  const fetchBoms = async () => {
    if (!firmId) return; // Ensure firmId exists before fetching BOMs

    try {
      const response = await getBoms(firmId);
      setBoms(response.data || []);
    } catch (error) {
      console.error('Error fetching BOMs:', error.message);
    }
  };

  useEffect(() => {
    fetchBoms();
  }, [firmId]); // Fetch BOMs whenever firmId changes

  const createProduction = async () => {
    if (!selectedBom || quantity <= 0) {
      toast.error('Please select a BOM and enter a valid quantity.');
      return;
    }

    try {
      const response = await createProductionOrder({
        bomId: selectedBom,
        quantity,
        firmId,
        createdBy,
      });
        // console.log(response);  
      if (response.message === 'Production order created successfully') {
        toast.success('Production order created successfully');
        setModalOpen(false);
        resetForm();
        trigger();
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.error('Error creating production order:', error.message);
    }
  };

  const resetForm = () => {
    setSelectedBom(null);
    setQuantity(0);
    setSelectedBomData(null);
  };

  const handleBomSelect = (bomId) => {
    setSelectedBom(bomId);
    const bomData = boms.find((bom) => bom._id === bomId);
    setSelectedBomData(bomData);
  };

  return (
    <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)} size="lg">
      <ModalHeader toggle={() => setModalOpen(!modalOpen)}>Create Production Order</ModalHeader>
      <ModalBody>
        <Row>
          <Col md={6}>
            <Label for="bom">Select BOM</Label>
            <Input
              type="select"
              name="bom"
              id="bom"
              value={selectedBom || ''}
              onChange={(e) => handleBomSelect(e.target.value)}
            >
              <option value="">Select BOM</option>
              {/* {boms.map((bom) => (
                <option key={bom._id} value={bom._id}>
                  {bom.productName}
                </option>
              ))} */}
              {boms.length > 0 ? boms.map((bom) => (
                <option key={bom._id} value={bom._id}>
                  {bom.productName}
                </option>
              )) : <option value="">No BOMs found</option>}
              
            </Input>
          </Col>
          <Col md={6}>
            <Label for="quantity">Quantity</Label>
            <Input
              type="number"
              name="quantity"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              placeholder="Enter quantity"
              min="1"
            />
          </Col>
        </Row>

        {selectedBomData && (
          <>
            <Row className="mt-3">
              <Col md={6}>
                <strong>Product Name:</strong> {selectedBomData.productName}
              </Col>
              <Col md={6}>
                {selectedBomData.rawMaterials?.length > 0 && (
                  <div>
                    <strong>Raw Materials:</strong>
                    <ul>
                      {selectedBomData.rawMaterials.map((rawMaterial, index) => (
                        <li key={index}>
                          <strong>{rawMaterial?.itemId?.name || "Unknown"}</strong> 
                          ({rawMaterial?.itemId?.qtyType || "N/A"}) - 
                          {rawMaterial?.quantity || 0} units
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Col>
            </Row>

            {quantity > 0 && selectedBomData.rawMaterials?.length > 0 && (
              <div className="mt-4">
                <h5>Raw Material Usage</h5>
                <Table bordered>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Raw Material</th>
                      <th>Variant</th>
                      <th>Unit Type</th>
                      <th>Cost Price</th>
                      <th>Per Item Quantity</th>
                      <th>Total Quantity Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedBomData.rawMaterials.map((rawMaterial, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{rawMaterial?.itemId?.name || "Unknown"}</td>
                        <td>
                          {rawMaterial?.variants?.length > 0 ? (
                            rawMaterial.variants.map((variant, index) => (
                              <span key={index}>{variant?.optionLabel || "N/A"}</span>
                            ))
                          ) : (
                            <span>-</span>
                          )}
                        </td>
                        <td>{rawMaterial?.itemId?.qtyType || "N/A"}</td>
                        <td>{rawMaterial?.itemId?.costPrice || "0.00"}</td>
                        <td>
                          {rawMaterial?.variants?.length > 0
                            ? rawMaterial.variants.reduce((acc, variant) => acc + (variant.quantity || 0), 0)
                            : rawMaterial?.quantity || 0}
                        </td>
                        <td>
                          {((rawMaterial?.variants?.length > 0
                            ? rawMaterial.variants.reduce((acc, variant) => acc + (variant.quantity || 0), 0)
                            : rawMaterial?.quantity || 0) * quantity) || 0}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </>
        )}
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={createProduction}
          disabled={!selectedBom || quantity <= 0}
        >
          Save
        </Button>
        <Button color="secondary" onClick={() => setModalOpen(!modalOpen)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ProductionCreateModal;
