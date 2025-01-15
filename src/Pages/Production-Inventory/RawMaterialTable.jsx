import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { Modal, ModalHeader, ModalBody,Row, ModalFooter, Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { getItemCategories, getItemSubCategories } from '../../apiServices/service';

function RawMaterialTable() {
  const [rawMaterials, setRawMaterials] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const itemsPerPage = 10;
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  

  const authuser = JSON.parse(localStorage.getItem('authUser'));
  const userId = authuser?.response?._Id;
  const [newMaterial, setNewMaterial] = useState({
    name: '',
    description: '',
    quantity: 0,
    qtyType: '',
    note: '',
    userId: userId,
  });

  const fetchCategories = async () => {
    try {
      const response = await getItemCategories();
      const parentCategories = response.data.filter(category => category.parentId === null);
      setCategories(parentCategories);
      // console.log(parentCategories);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubCategories = async (categoryId) => {
    try {
      const response = await getItemSubCategories(categoryId);
      setSubCategories(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (newMaterial.categoryId) {
      fetchSubCategories(newMaterial.categoryId);
    }
  }, [newMaterial.categoryId]);


  useEffect(() => {
    const storedMaterials = JSON.parse(localStorage.getItem('rawMaterials')) || [];
    setRawMaterials(storedMaterials);
    setFilteredMaterials(storedMaterials);
    fetchCategories();
  }, []);



  
  useEffect(() => {
    const filtered = rawMaterials.filter(material => {
      return (
        (filterType === 'All' || material.qtyType === filterType) &&
        material.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFilteredMaterials(filtered);
    setCurrentPage(1); // Reset to first page on search or filter
  }, [searchQuery, filterType, rawMaterials]);

  useEffect(() => {
    localStorage.setItem('rawMaterials', JSON.stringify(rawMaterials));
  }, [rawMaterials]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMaterial({ ...newMaterial, [name]: value });
  };

  const openModal = (material = null) => {
    setEditingMaterial(material);
    if (material) {
      setNewMaterial({
        name: material.name,
        description: material.description,
        quantity: material.quantity,
        qtyType: material.qtyType,
        note: '',
        userId: material.userId,
      });
    } else {
      setNewMaterial({ name: '', description: '', quantity: 0, qtyType: '', note: '' });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewMaterial({ name: '', description: '', quantity: 0, qtyType: '', note: '' });
    setEditingMaterial(null);
  };

  const saveMaterial = () => {
    if (!newMaterial.name || !newMaterial.qtyType || newMaterial.quantity <= 0) {
      alert('Please fill in all fields with valid values.');
      return;
    }
    if (editingMaterial) {
      setRawMaterials(
        rawMaterials.map(material =>
          material.id === editingMaterial.id
            ? { ...material, ...newMaterial, updatedAt: new Date(), id: editingMaterial.id }
            : material
        )
      );
    } else {
      setRawMaterials([
        ...rawMaterials,
        { ...newMaterial, id: Date.now(), createdAt: new Date(), updatedAt: null },
      ]);
    }
    closeModal();
  };

  const deleteRawMaterial = (id) => {
    setRawMaterials(rawMaterials.filter(material => material.id !== id));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMaterials = filteredMaterials.slice(indexOfFirstItem, indexOfLastItem);

  



  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Production & Inventory" breadcrumbItem="Raw Material Table" />
        <div className="container mt-4 mb-4">

          {/* <Button color="primary" onClick={() => openModal()}>
            Add New Raw Material
          </Button> */}

          <div className="mt-3 d-flex justify-content-between">
            <Input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={handleSearch}
              className="form-control w-50"
            />

            <Input
              type="select"
              className="form-control w-25"
              value={filterType}
              onChange={handleFilterChange}
            >
              <option value="All">All</option>
              <option value="kg">kg</option>
              <option value="liters">litres</option>
              <option value="pcs">pieces</option>
            </Input>
            <i className='bx bx-book-add' style={{ fontSize: '2rem', cursor: 'pointer' }} onClick={() => openModal()}></i>
          </div>

          <h4 className="mt-4">Raw Materials</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit Type</th>
                <th>Updated By</th>
                <th>Note</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentMaterials.map(material => (
                <tr key={material.id}>
                  <td>{material.name}</td>
                  <td>{material.description}</td>
                  <td>{material.quantity}</td>
                  <td>{material.qtyType}</td>
                  <td>{material.userId || 'N/A'}</td>
                  <td>{material.note || 'N/A'}</td>
                  <td>
                    {/* <Button color="warning" size="sm" onClick={() => openModal(material)}>
                      Edit
                    </Button>
                    <Button
                      color="danger"
                      size="sm"
                      className="ml-2"
                      onClick={() => deleteRawMaterial(material.id)}
                    >
                      Delete
                    </Button> */}
                    <i className='bx bx-edit' style={{ fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => openModal(material)}></i>
                    <i className='bx bx-trash' style={{ fontSize: '1.5rem', cursor: 'pointer', marginLeft: '1rem' }} onClick={() => deleteRawMaterial(material.id)}></i>
                  </td>
                </tr>
              ))}
              {currentMaterials.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center">No raw materials available.</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="d-flex justify-content-between">
            <div>
              Page {currentPage} of {Math.ceil(filteredMaterials.length / itemsPerPage)}
            </div>
            <div>
              {[...Array(Math.ceil(filteredMaterials.length / itemsPerPage)).keys()].map(pageNumber => (
                <Button
                  key={pageNumber}
                  color={currentPage === pageNumber + 1 ? 'primary' : 'light'}
                  size="sm"
                  className="mx-1"
                  onClick={() => paginate(pageNumber + 1)}
                >
                  {pageNumber + 1}
                </Button>
              ))}
            </div>
          </div>

          <Modal isOpen={showModal} toggle={closeModal}>
            <ModalHeader toggle={closeModal}>
              {editingMaterial ? 'Edit Raw Material' : 'Add New Raw Material'}
            </ModalHeader>
            <ModalBody>
              <Form>
                <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      value={newMaterial.name}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="description">Description</Label>
                    <Input
                      type="text"
                      name="description"
                      id="description"
                      value={newMaterial.description}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  </Col>
                </Row>
                <Row>
                    <Col md={6}>
                    <FormGroup>
                      <Label htmlFor="categoryId">Category</Label>
                      <Input type="select" id="categoryId" name="categoryId" value={newMaterial.categoryId} onChange={handleInputChange} >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                          <option key={category._id} value={category._id}>
                            {category.categoryName}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                    </Col>
                    <Col md={6}>

                    <FormGroup>
                      <Label htmlFor="subcategoryId">Sub Category</Label>
                      <Input type="select" id="subcategoryId" name="subcategoryId" value={newMaterial.subcategoryId} onChange={handleInputChange} >
                        <option value="">Select Sub Category</option>
                        {subCategories.map(subCategory => (
                          <option key={subCategory._id} value={subCategory._id}>
                            {subCategory.categoryName}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                <FormGroup>
                  <Label for="quantity">Quantity</Label>
                  <Input
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={newMaterial.quantity}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                </Col>
                <Col md={6}>
                <FormGroup>
                  <Label for="qtyType">Unit Type</Label>
                  <Input
                    type="text"
                    name="qtyType"
                    id="qtyType"
                    value={newMaterial.qtyType}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                </Col>
                </Row>
                <FormGroup>
                  <Label for="note">Note</Label>
                  <Input
                    type="textarea"
                    name="note"
                    id="note"
                    rows="3"
                    value={newMaterial.note}
                    onChange={handleInputChange}
                  />
                </FormGroup>

              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={closeModal}>
                Close
              </Button>
              <Button color="primary" onClick={saveMaterial}>
                Save Changes
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </React.Fragment>
  );
}

export default RawMaterialTable;
