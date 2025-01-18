import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Table, Form, FormGroup, Label, Input, Alert, Row, Col } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { toast } from 'react-toastify';

function ProductionOrders() {
  const [rawMaterials, setRawMaterials] = useState([]);
  const [readyProducts, setReadyProducts] = useState([]);
  const [boms, setBoms] = useState([]);
  const [selectedBom, setSelectedBom] = useState("");
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [error, setError] = useState("");
  const [isBomModalOpen, setIsBomModalOpen] = useState(false);
  const [editingBom, setEditingBom] = useState(null);
  const [bomForm, setBomForm] = useState({ name: "", materials: [{ rawMaterial: "", quantity: 1 }] });

  useEffect(() => {
    setRawMaterials(JSON.parse(localStorage.getItem("rawMaterials")) || []);
    setReadyProducts(JSON.parse(localStorage.getItem("readyProducts")) || []);
    setBoms(JSON.parse(localStorage.getItem("boms")) || []);
  }, []);

  const updateLocalStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));

  const toggleBomModal = () => {
    setEditingBom(null);
    setBomForm({ name: "", materials: [{ rawMaterial: "", quantity: 1 }] });
    setIsBomModalOpen(!isBomModalOpen);
  };

  const handleBomFormChange = (index, field, value) => {
    const updatedMaterials = [...bomForm.materials];
    updatedMaterials[index][field] = field === "quantity" ? Number(value) : value;
    setBomForm({ ...bomForm, materials: updatedMaterials });
  };

  const addMaterialField = () =>
    setBomForm({ ...bomForm, materials: [...bomForm.materials, { rawMaterial: "", quantity: 1 }] });

  const removeMaterialField = (index) => {
    const updatedMaterials = [...bomForm.materials];
    updatedMaterials.splice(index, 1);
    setBomForm({ ...bomForm, materials: updatedMaterials });
  };

  const saveBom = () => {
    if (editingBom) {
      const updatedBoms = boms.map((bom) => (bom.name === editingBom.name ? bomForm : bom));
      setBoms(updatedBoms);
      updateLocalStorage("boms", updatedBoms);
    } else {
      setBoms([...boms, bomForm]);
      updateLocalStorage("boms", [...boms, bomForm]);
    }
    toggleBomModal();
  };

  const editBom = (bom) => {
    setEditingBom(bom);
    setBomForm(bom);
    setIsBomModalOpen(true);
  };

  const deleteBom = (bomName) => {
    const updatedBoms = boms.filter((bom) => bom.name !== bomName);
    setBoms(updatedBoms);
    updateLocalStorage("boms", updatedBoms);
  };

  const applyBom = () => {
    if (!selectedBom || orderQuantity <= 0) {
      setError("Please select a BOM and specify a valid quantity.");
      return;
    }

    const selectedBomDetails = boms.find((bom) => bom.name === selectedBom);
    if (!selectedBomDetails) {
      setError("Invalid BOM selected.");
      return;
    }

    const insufficientMaterials = selectedBomDetails.materials.some((material) => {
      const isRaw = rawMaterials.find((rm) => rm.name === material.rawMaterial);
      const isReady = readyProducts.find((rp) => rp.name === material.rawMaterial);
      const availableQuantity = isRaw ? isRaw.quantity : isReady ? isReady.quantity : 0;
      return material.quantity * orderQuantity > availableQuantity;
    });

    if (insufficientMaterials) {
      setError("Insufficient materials to produce the specified quantity.");
      return;
    }

    const updatedRawMaterials = rawMaterials.map((rm) => {
      const bomMaterial = selectedBomDetails.materials.find((m) => m.rawMaterial === rm.name);
      if (bomMaterial) {
        return { ...rm, quantity: rm.quantity - bomMaterial.quantity * orderQuantity };
      }
      return rm;
    });

    const updatedReadyProducts = readyProducts.map((rp) => {
      const bomMaterial = selectedBomDetails.materials.find((m) => m.rawMaterial === rp.name);
      if (bomMaterial) {
        return { ...rp, quantity: rp.quantity - bomMaterial.quantity * orderQuantity };
      }
      return rp;
    });

    const newReadyProduct = { name: selectedBom, quantity: orderQuantity };
    const existingReadyProduct = updatedReadyProducts.find((rp) => rp.name === selectedBom);
    if (existingReadyProduct) {
      existingReadyProduct.quantity += orderQuantity;
    } else {
      updatedReadyProducts.push(newReadyProduct);
    }

    setRawMaterials(updatedRawMaterials);
    setReadyProducts(updatedReadyProducts);
    updateLocalStorage("rawMaterials", updatedRawMaterials);
    updateLocalStorage("readyProducts", updatedReadyProducts);

    setError("");
    setSelectedBom("");
    setOrderQuantity(1);
    // alert(`BOM "${selectedBom}" applied successfully for quantity ${orderQuantity}.`);
    toast.success(`BOM "${selectedBom}" applied successfully for quantity ${orderQuantity}.`); 
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Production & Inventory" breadcrumbItem="Production Orders" />
        <div className="container">
          <h5>BOMs</h5>
          <Button color="primary" onClick={toggleBomModal}>Add New BOM</Button>
          <Table bordered>
            <thead>
              <tr>
                <th>BOM Name</th>
                <th>Materials</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {boms.map((bom, index) => (
                <tr key={index}>
                  <td>{bom.name}</td>
                  <td>
                    <ul>
                      {bom.materials.map((material, idx) => (
                        <li key={idx}>
                          {material.rawMaterial} - {material.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    {/* <Button color="warning" size="sm" onClick={() => editBom(bom)}>Edit</Button>{' '}
                    <Button color="danger" size="sm" onClick={() => deleteBom(bom.name)}>Delete</Button> */}
                    <i className='bx bx-edit cursor-pointer me-2 font-size-20' onClick={() => editBom(bom)}></i>
                    <i className='bx bx-trash cursor-pointer font-size-20' onClick={() => deleteBom(bom.name)}></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* BOM Modal */}
          <Modal isOpen={isBomModalOpen} toggle={toggleBomModal}>
            <ModalHeader toggle={toggleBomModal}>{editingBom ? "Edit BOM" : "Add BOM"}</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="bomName">BOM Name</Label>
                  <Input
                    id="bomName"
                    type="text"
                    value={bomForm.name}
                    onChange={(e) => setBomForm({ ...bomForm, name: e.target.value })}
                  />
                </FormGroup>
                <h6>Materials</h6>
                {bomForm.materials.map((material, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    {/* <Input
                      type="text"
                      placeholder="Material"
                      value={material.rawMaterial}
                      onChange={(e) => handleBomFormChange(index, "rawMaterial", e.target.value)}
                      className="me-2"
                    /> */}
                    <Input type="select" value={material.rawMaterial} onChange={(e) => handleBomFormChange(index, "rawMaterial", e.target.value)}>
                      <option value="">Select Material</option>
                      {rawMaterials.map((rm, idx) => (
                        <option key={idx} value={rm.name}>
                          {rm.name}
                        </option>
                      ))}
                      {readyProducts.map((rp, idx) => (
                        <option key={idx} value={rp.name}>
                          {rp.name}
                        </option>
                      ))}
                    </Input>
                    <Input
                      type="number"
                      placeholder="Quantity"
                      value={material.quantity}
                      onChange={(e) => handleBomFormChange(index, "quantity", e.target.value)}
                      className="me-2"
                      min="1"
                    />
                    <Button color="danger" size="sm" onClick={() => removeMaterialField(index)}>Remove</Button>
                  </div>
                ))}
                <Button color="success" size="sm" onClick={addMaterialField}>Add Material</Button>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={saveBom}>{editingBom ? "Update" : "Save"}</Button>{' '}
              <Button color="secondary" onClick={toggleBomModal}>Cancel</Button>
            </ModalFooter>
          </Modal>

          <h5>Create Product From Raw Material Using BOM Formula</h5>
          {error && <Alert color="danger">{error}</Alert>}
          <Form className='mb-1'>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="selectedBom">Select BOM</Label>
                  <Input
                    id="selectedBom"
                    type="select"
                    value={selectedBom}
                    onChange={(e) => setSelectedBom(e.target.value)}
                  >
                    <option value="">Select BOM</option>
                    {boms.map((bom, index) => (
                      <option key={index} value={bom.name}>
                        {bom.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
                </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="orderQuantity">Quantity</Label>
                  <Input
                    id="orderQuantity"
                    type="number"
                    value={orderQuantity}
                    onChange={(e) => setOrderQuantity(Number(e.target.value))}
                    min="1"
                  />
                </FormGroup>
              </Col>
              <Col md={3} className='d-flex align-items-center'> 
                <Button color="primary" onClick={applyBom}>Approve & Apply</Button>
              </Col>
            </Row>
          </Form>

          <h5>Raw Materials</h5>
          <Table bordered>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {rawMaterials.map((rm, index) => (
                <tr key={index}>
                  <td>{rm.name}</td>
                  <td>{rm.quantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h5>Ready Products</h5>
          <Table bordered>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {readyProducts.map((rp, index) => (
                <tr key={index}>
                  <td>{rp.name}</td>
                  <td>{rp.quantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ProductionOrders;
