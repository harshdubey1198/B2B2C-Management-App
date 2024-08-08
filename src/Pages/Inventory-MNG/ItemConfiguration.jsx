import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Table } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';

// const initialItems = [
//   {
//     id: 1,
//     name: "Item A",
//     variants: [
//       { id: 1, variantName: "Small", price: 10.00 },
//       { id: 2, variantName: "Large", price: 15.00 }
//     ],
//     taxation: { id: 1, name: "VAT", rate: 5.00 }
//   },
// ];

// const initialTaxations = [
//   { id: 1, name: "VAT", rate: 5.00 },
//   { id: 2, name: "Service Tax", rate: 10.00 },
// ];

function ItemConfiguration() {
  const [items, setItems] = useState([]);
  const [taxations, setTaxations] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("taxationData")) || []
    setTaxations(storedData);
  }, [])

  useEffect(() => {
    const storedData = localStorage.getItem("itemConfigData");
    if (storedData) {
      try {
        setItems(JSON.parse(storedData));
      } catch (e) {
        console.error("Failed to parse taxation data from local storage", e);
        setItems([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("itemConfigData", JSON.stringify(items))
  },[items])

  const handleEdit = (item) => {
    setEditingItem(item);
    toggleModal();
  };

  const handleSave = () => {
    if (editingItem.id) {
      setItems(items.map(item => item.id === editingItem.id ? editingItem : item));
    } else {
      setItems([...items, { ...editingItem, id: items.length + 1 }]);
    }
    toggleModal();
    setEditingItem(null); 
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEditingItem({ ...editingItem, [id]: value });
  };

  const handleVariantChange = (index, e) => {
    const { id, value } = e.target;
    const updatedVariants = [...editingItem.variants];
    updatedVariants[index] = { ...updatedVariants[index], [id]: id === 'price' ? parseFloat(value) || 0 : value };
    setEditingItem({ ...editingItem, variants: updatedVariants });
  };

  const handleAddVariant = () => {
    setEditingItem({ ...editingItem, variants: [...editingItem.variants, { id: Date.now(), variantName: '', price: 0 }] });
  };

  const handleRemoveVariant = (index) => {
    const updatedVariants = editingItem.variants.filter((_, i) => i !== index);
    setEditingItem({ ...editingItem, variants: updatedVariants });
  };

  const handleTaxationChange = (e) => {
    const { value } = e.target;
    setEditingItem({ ...editingItem, taxation: taxations.find(t => t.id === parseInt(value)) });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Item Configuration" breadcrumbItem="Item Configuration" />
        <Col lg={12}>
          <Card>
            <CardBody>
              <Button color="primary" onClick={() => { setEditingItem({ id: null, name: '', variants: [], taxation: null }); toggleModal(); }}>
                Add New Item
              </Button>
              <Table className="table-bordered mt-3">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Variants</th>
                    <th>Taxation</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>
                        <ul>
                          {item.variants.map(variant => (
                            <li key={variant.id}>{variant.variantName} - ${variant.price.toFixed(2)}</li>
                          ))}
                        </ul>
                      </td>
                      <td>{item.taxation ? `${item.taxation.name} (${item.taxation.rate}%)` : 'N/A'}</td>
                      <td>
                        <Button color="warning" onClick={() => handleEdit(item)}>Edit</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </div>

      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {editingItem?.id ? 'Edit Item' : 'Add New Item'}
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              id="name"
              value={editingItem?.name || ''}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Variants</Label>
            {editingItem?.variants.map((variant, index) => (
              <div key={variant.id} className="d-flex mb-2">
                <Input
                  type="text"
                  id="variantName"
                  placeholder="Variant Name"
                  value={variant.variantName}
                  onChange={(e) => handleVariantChange(index, e)}
                />
                <Input
                  type="number"
                  id="price"
                  placeholder="Price"
                  value={variant.price}
                  onChange={(e) => handleVariantChange(index, e)}
                />
                <Button color="danger" onClick={() => handleRemoveVariant(index)}>Remove</Button>
              </div>
            ))}
            <Button color="success" onClick={handleAddVariant}>Add Variant</Button>
          </FormGroup>
          <FormGroup>
            <Label for="taxation">Taxation</Label>
            <Input
              type="select"
              id="taxation"
              value={editingItem?.taxation ? editingItem.taxation.id : ''}
              onChange={handleTaxationChange}
            >
              <option value="">Select Taxation</option>
              {taxations.map(tax => (
                <option key={tax.id} value={tax.id}>
                  {tax.name} ({tax.rate}%)
                </option>
              ))}
            </Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>
            {editingItem?.id ? 'Save Changes' : 'Add Item'}
          </Button>{' '}
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}

export default ItemConfiguration;
