import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { Modal, ModalHeader, ModalBody,Row, ModalFooter, Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { getBrands, getItemCategories, getItemSubCategories, getTaxes } from '../../apiServices/service';

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
  const [allCategories, setAllCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [variants, setVariants] = useState([]);
  const authuser = JSON.parse(localStorage.getItem('authUser'));
  const userId = authuser?.response?._Id;
  // const [categoryName, setCategoryName] = useState([]);
  const [taxes, setTaxes] = useState([]);
  const [newMaterial, setNewMaterial] = useState({
    name: '',
    description: '',
    quantity: 0,
    qtyType: '',
    note: '',
    userId: userId,
    categoryId: '',
    subcategoryId: '',
    brandId: '',  
    sellingPrice: '',
    costPrice: '',
    taxId: '',
    variants: [],
  });
  const [selectedUnitType, setSelectedUnitType] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');

  // Define unit types and corresponding units
  const unitTypes = {
    weight: ['kg', 'grams'],
    volume: ['liters', 'milliliters'],
    length: ['meters'],
    quantity: ['pcs'],
  };

  const handleUnitTypeChange = (e) => {
    const unitType = e.target.value;
    setSelectedUnitType(unitType);
    setSelectedUnit(''); // Reset selected unit when unit type changes
  };

  const handleUnitChange = (e) => {
    setSelectedUnit(e.target.value);
  };
  const fetchCategories = async () => {
    try {
      const response = await getItemCategories();
      setAllCategories(response.data);
      const parentCategories = response.data.filter(category => category.parentId === null);
      setCategories(parentCategories);
      // console.log(parentCategories);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTaxes = async () => {
    try {
      const response = await getTaxes();
      setTaxes(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  const fetchSubCategories = async (categoryId) => {
    try {
      const response = await getItemSubCategories(categoryId);
      setSubCategories(response.data || []);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await getBrands();
      setBrands(response.data);
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
    const updateCategoryAndSubCategoryNames = () => {
      const updatedMaterials = rawMaterials.map(material => {
        const category = allCategories.find(cat => cat._id === material.categoryId);
        const subCategory = subCategories.find(sub => sub._id === material.subcategoryId);
        return {
          ...material,
          categoryName: category ? category.categoryName : 'N/A',
          subCategoryName: subCategory ? subCategory.categoryName : 'N/A',
        };
      });
      setFilteredMaterials(updatedMaterials);
    };
  
    updateCategoryAndSubCategoryNames();
  }, [rawMaterials, allCategories, subCategories]);
  
  

  useEffect(() => {
    const storedMaterials = JSON.parse(localStorage.getItem('rawMaterials')) || [];
    setRawMaterials(storedMaterials);
    setFilteredMaterials(storedMaterials);
    fetchCategories();
    fetchBrands();
    fetchTaxes();
    
  }, []);
  // console.log(taxes); 


  const getTaxDetails = (taxId) => {
    const tax = taxes.find(t => t._id === taxId);
    return tax ? `${tax.taxName} (${tax.taxRates[0].rate}%)` : 'No Tax';
  };
  
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
        categoryId: material.categoryId,
        subcategoryId: material.subcategoryId,
        brandId: material.brandId,
        variants: material.variants,
        taxId: material.tax?.taxId,      
      });
    } else {
      setNewMaterial({ name: '', description: '', quantity: 0, qtyType: '', note: '', userId: userId, categoryId: '' , subcategoryId: '', brandId: '', variants: [] , taxId: ''});
    }
    setShowModal(true);
  };
//match the category with id material category id and set the name of the category

  const closeModal = () => {
    setShowModal(false);
    setNewMaterial({ name: '', description: '', quantity: 0, qtyType: '', note: '' , categoryId: '' , subcategoryId: '', brandId: '' , variants: [] , taxId: '' });
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
            ? { ...material, ...newMaterial,variants, updatedAt: new Date(), id: editingMaterial.id }
            : material
        )
      );
    } else {
      setRawMaterials([
        ...rawMaterials,
      { ...newMaterial,variants, id: Date.now(), createdAt: new Date(), updatedAt: null },
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

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index][field] = value;
    setVariants(updatedVariants);
  };
  
  const removeVariant = (index) => {
    const updatedVariants = variants.filter((_, i) => i !== index);
    setVariants(updatedVariants);
  };



  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Production & Inventory" breadcrumbItem="Raw Material Table" />
        <div className="container mt-4 mb-4">
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
              className="form-control w-25 no-appearance"
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
                <th>Tax</th>
                <th>Unit Type</th>
                <th>Updated By</th>
                <th>Category/SubCategory</th>
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
                  <td>{getTaxDetails(material.taxId)}</td>  
                  <td>{material.qtyType}</td>
                  <td>{material.userId || 'N/A'}</td>
                  <td>{material.categoryName || 'N/A'}<br/> {material.subCategoryName || ''}</td>
                  <td>{material.note || 'N/A'}</td>
                  <td>
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
                  <Col md={6} className={selectedUnitType ? 'd-flex justify-content-evenly' : ''}>
                  <FormGroup>
                        <Label for="qtyType">Unit Type</Label>
                        <Input
                          type="select"
                          name="qtyType"
                          id="qtyType"
                          value={selectedUnitType}
                          onChange={handleUnitTypeChange}
                        >
                          <option value="">Select Unit Type</option>
                          <option value="weight">Weight</option>
                          <option value="volume">Volume</option>
                          <option value="length">Length</option>
                          <option value="quantity">Quantity</option>
                        </Input>
                      </FormGroup>

                      {selectedUnitType && (
                        <FormGroup>
                          <Label for="unit">Unit</Label>
                          <Input
                            type="select"
                            name="unit"
                            id="unit"
                            value={selectedUnit}
                            onChange={handleUnitChange}
                          >
                            <option value="">Select Unit</option>
                            {unitTypes[selectedUnitType]?.map((unit) => (
                              <option key={unit} value={unit}>
                                {unit}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                      )}
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                  <FormGroup>
                    <Label for="brandId">Brand</Label>
                    <Input type="select" id="brandId" name="brandId" value={newMaterial.brandId} onChange={handleInputChange} >
                      <option value="">Select Brand</option>
                      {brands.map(brand => (
                        <option key={brand._id} value={brand._id}>
                          {brand.name}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="taxId">Tax</Label>
                      <Input type="select" id="taxId" name="taxId" value={newMaterial.taxId} onChange={handleInputChange} >
                        <option value="">Select Tax</option>
                        {taxes.map(tax => (
                          <option key={tax._id} value={tax._id}>
                            {tax.taxName}
                          </option>
                        ))}
                        </Input>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <FormGroup className='d-flex items-center w-100'>
                      <Label className='m-0'>Variants</Label>
                      <i className="bx bx-plus bg-primary rounded text-white" style={{ fontSize: '1.25rem', marginLeft:'10px' ,cursor: 'pointer' }} onClick={() => setVariants([...variants, { name: '', price: 0, quantity: 0 }])}></i>
                    </FormGroup>
                    {variants.map((variant, index) => (
                      <Row key={index} className="align-items-center">
                        <Col md={4}>
                          <FormGroup>
                            <Input
                              type="text"
                              placeholder="Variant Name"
                              value={variant.name}
                              onChange={(e) =>
                                handleVariantChange(index, 'name', e.target.value)
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col md={3}>
                          <FormGroup>
                            <Input
                              type="number"
                              placeholder="Price"
                              value={variant.price}
                              onChange={(e) =>
                                handleVariantChange(index, 'price', e.target.value)
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col md={3}>
                          <FormGroup>
                            <Input
                              type="number"
                              placeholder="Quantity"
                              value={variant.quantity}
                              onChange={(e) =>
                                handleVariantChange(index, 'quantity', e.target.value)
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col md={2}>
                          <Button color="danger" className='mb-3' onClick={() => removeVariant(index)}>
                            X
                          </Button>
                        </Col>
                      </Row>
                    ))}
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
