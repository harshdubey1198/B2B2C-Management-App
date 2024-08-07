import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';

const initialTaxationData = [
  {
    id: 1,
    name: "VAT",
    rate: 5.00,
    description: "Value Added Tax",
  },
  {
    id: 2,
    name: "Service Tax",
    rate: 10.00,
    description: "Service Tax",
  },
];

function TaxationTable() {
  const [taxations, setTaxations] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("taxationData");
    if (storedData) {
      try {
        setTaxations(JSON.parse(storedData));
      } catch (e) {
        console.error("Failed to parse taxation data from local storage", e);
        setTaxations([]);
      }
    }
  }, []);

  useEffect(() => {
    // Save taxation data to local storage whenever it changes
    localStorage.setItem("taxationData", JSON.stringify(taxations));
  }, [taxations]);

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleEdit = (item) => {
    setEditingItem(item);
    toggleModal();
  };

  const handleDelete = (id) => {
    setTaxations(taxations.filter(item => item.id !== id));
  };

  const handleSave = () => {
    if (editingItem.id) {
      setTaxations(taxations.map(item => item.id === editingItem.id ? editingItem : item));
    } else {
      setTaxations([...taxations, { ...editingItem, id: taxations.length + 1 }]);
    }
    toggleModal();
    setEditingItem(null); // Reset editing item
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEditingItem({ ...editingItem, [id]: value });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Taxation Management" breadcrumbItem="Taxation Table" />
        <p className='mm-active'>
          This is the Taxation Table page. 
          Here you can view and manage taxation items.
        </p>
        <Col lg={12}>
          <Card>
            <CardBody>
              <div className="table-responsive">
                <Button color="primary" onClick={() => { setEditingItem({ id: null, name: '', rate: '', description: '' }); toggleModal(); }}>
                  Add New Taxation
                </Button>
                <table className="table table-bordered mb-0 mt-3">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Rate (%)</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {taxations.map(item => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.rate}</td>
                        <td>{item.description}</td>
                        <td>
                          <Button color="warning" onClick={() => handleEdit(item)}>Edit</Button>
                          <Button color="danger" onClick={() => handleDelete(item.id)}>Delete</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </Col>
      </div>

      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {editingItem?.id ? 'Edit Taxation' : 'Add New Taxation'}
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
            <Label for="rate">Rate (%)</Label>
            <Input
              type="number"
              id="rate"
              value={editingItem?.rate || ''}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="text"
              id="description"
              value={editingItem?.description || ''}
              onChange={handleInputChange}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>
            {editingItem?.id ? 'Save Changes' : 'Add Taxation'}
          </Button>{' '}
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}

export default TaxationTable;
 