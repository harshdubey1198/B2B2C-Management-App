import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { createBom, getBoms, getInventoryItems } from '../../apiServices/service';
import { Table, Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Row, Col, } from 'reactstrap';

function BomPage() {
  const [boms, setBoms] = useState([]);
  const [items, setItems] = useState([]);
  const [bomModal, setBomModal] = useState(false);
  const [filteredBoms, setFilteredBoms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); 
  const authuser = JSON.parse(localStorage.getItem('authUser')) || {};
  const firmId = authuser?.response?.adminId || '';
  const createdBy = authuser?.response?._id || '';

  // console.log("firmId", firmId, "createdBy", createdBy);
  const [formData, setFormData] = useState({
    productName: '',
    rawMaterials: [],
    wastagePercentage: 0,
    firmId: firmId,
    createdBy: createdBy,
  });

  const fetchBoms = async () => {
    try {
      const result = await getBoms();
      setBoms(result.data || []);
      setFilteredBoms(result.data);
    //   console.log(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchItems = async () => {
    try {
      const result = await getInventoryItems();
      // console.log(result.data);
      setItems(result.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBoms();
    fetchItems();
  }, []);

  const toggleBomModal = () => setBomModal(!bomModal);

 

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = boms.filter((bom) =>
      bom.productName.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredBoms(filtered);
    setCurrentPage(1); 
}

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBoms || [].slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = [];
  if (filteredBoms && Array.isArray(filteredBoms)) {
    for (let i = 1; i <= Math.ceil(filteredBoms.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
 

  const handleMaterialChange = (materialIndex, field, value) => {
    const materials = [...formData.rawMaterials];
    materials[materialIndex] = { ...materials[materialIndex], [field]: value };
    setFormData({ ...formData, rawMaterials: materials });
  };
  
  const handleVariantChange = (materialIndex, variantIndex, field, value) => {
    const materials = [...formData.rawMaterials];
    const variants = [...(materials[materialIndex].variants || [])];
    
    // Add optionLabel dynamically if the field being updated is variantId
    if (field === 'variantId') {
      const selectedMaterial = items.find((item) => item._id === materials[materialIndex].itemId);
      const selectedVariant = selectedMaterial?.variants.find((v) => v._id === value);
      variants[variantIndex] = { 
        ...variants[variantIndex], 
        [field]: value, 
        optionLabel: selectedVariant?.optionLabel || '' 
      };
    } else {
      variants[variantIndex] = { 
        ...variants[variantIndex], 
        [field]: value 
      };
    }
  
    materials[materialIndex].variants = variants;
    setFormData({ ...formData, rawMaterials: materials });
  };
  
  const addMaterialField = () => {
    setFormData({
      ...formData,
      rawMaterials: [
        ...formData.rawMaterials,
        { itemId: '', quantity: '', wastePercentage: '', variants: [] },
      ],
    });
  };
  
  const removeMaterialField = (index) => {
    const materials = formData.rawMaterials.filter((_, i) => i !== index);
    setFormData({ ...formData, rawMaterials: materials });
  };
  
  const addVariantField = (materialIndex) => {
    const materials = [...formData.rawMaterials];
    const variants = [...(materials[materialIndex].variants || [])];
    variants.push({ variantId: '', optionLabel: '', quantity: '', wastePercentage: '' });
    materials[materialIndex].variants = variants;
    setFormData({ ...formData, rawMaterials: materials });
  };
  
  const removeVariantField = (materialIndex, variantIndex) => {
    const materials = [...formData.rawMaterials];
    const variants = materials[materialIndex].variants.filter((_, i) => i !== variantIndex);
    materials[materialIndex].variants = variants;
    setFormData({ ...formData, rawMaterials: materials });
  };
  

  const saveBom = async () => {
    console.log('BOM Data:', formData);
     try{
        const result = await createBom(formData);
        console.log(result);
        
        if (result.message==="bom created successfully"){
        fetchBoms();
        setFormData({
          productName: '',
          rawMaterials: [],
          wastagePercentage: 0,
          createdBy: createdBy,
          firmId: firmId,
        });}
    } 
    catch(err){
        console.error(err);
    }
  

    toggleBomModal();
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Production & Inventory" breadcrumbItem="Bill Of Materials" />
        <Button color="primary" onClick={toggleBomModal}>
          Add BOM
        </Button>
          <div className='mt-3'>
            <Input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search by Product Name"
            />
            </div>

            <div className='table-responsive mt-2'>
            <Table bordered>
                <thead>
                <tr>
                    <th>BOM Name</th>
                    <th>Materials</th>
                    <th>Created By</th>
                    {/* <th>Actions</th> */}
                </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((bom, index) => (
                      <tr key={index}>
                        <td>{bom.productName}</td>
                        <td>
                          <div className="d-flex flex-column">
                            {bom.rawMaterials.map((material, idx) => (
                              <div key={idx} className="d-flex justify-content-between align-items-center mb-2">
                                <span className="material-name">
                                  {material.itemId.name} ({material.itemId.qtyType})
                                </span>
                                <span>
                                  {material.variants.length > 0 ? (
                                    <>
                                      <span className="badge bg-info me-1">
                                        Variant: {material.variants[0].optionLabel} - {material.variants[0].quantity}
                                      </span>
                                      <span className="text-muted">(Total: {material.quantity})</span>
                                    </>
                                  ) : (
                                    <span>{material.quantity}</span>
                                  )}
                                </span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td>{bom.createdBy.firstName + " " + bom.createdBy.lastName}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center">No BOMs available</td>
                    </tr>
                  )}
                </tbody>

            </Table>
            </div>

            <div className="pagination-controls d-flex gap-2 mt-1 mb-3">
            {pageNumbers.map((number) => (
                <Button
                key={number}
                onClick={() => paginate(number)}
                className={currentPage === number ? "btn-primary" : "btn-secondary"}
                >
                {number}
                </Button>
            ))}
            </div>

            <Modal isOpen={bomModal} toggle={toggleBomModal}>
              <ModalHeader toggle={toggleBomModal}>Add BOM</ModalHeader>
                <ModalBody>
                    <FormGroup>
                    <Label for="productName">BOM Name</Label>
                    <Input
                        id="productName"
                        type="text"
                        value={formData.productName}
                        onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                    />
                    </FormGroup>
                    <h6 className="text-primary">Materials</h6>
                    {formData.rawMaterials.map((material, materialIndex) => (
                        <Row key={materialIndex} className="mb-3">
                            <Col md={3}>
                            <Label>Material</Label>
                            <Input
                                type="select"
                                value={material.itemId}
                                onChange={(e) => handleMaterialChange(materialIndex, 'itemId', e.target.value)}
                              >
                                <option value="">Select Material</option>
                                {items.length > 0 ? (
                                  items.map((item) => (
                                    <option key={item._id} value={item._id}>
                                      {item.name} - {item.qtyType}
                                    </option>
                                  ))
                                ) : (
                                  <option disabled>No items available</option>
                                )}
                              </Input>

                            </Col>
                            <Col md={2}>
                            <Label>Quantity</Label>
                            <Input
                                type="number"
                                value={material.quantity}
                                onChange={(e) => handleMaterialChange(materialIndex, 'quantity', e.target.value)}
                            />
                            </Col>
                            <Col md={2}>
                            <Label>Waste (%)</Label>
                            <Input
                                type="number"
                                value={material.wastePercentage}
                                onChange={(e) => handleMaterialChange(materialIndex, 'wastePercentage', e.target.value)}
                            />
                            </Col>
                            <Col md={2} className="d-flex align-items-center">
                            {/* <Button color="danger" onClick={() => removeMaterialField(materialIndex)} style={{width: '100%', height:"37px"}}>
                                Remove Material
                            </Button> */}
                              <i className='bx bx-trash' style={{fontSize: '1.5rem', cursor: 'pointer'}} onClick={() => removeMaterialField(materialIndex)}></i>
                            </Col>
                            <Col md={12} className="mt-2">
                            <h6 className="text-primary">Variants</h6>
                            {material.variants?.map((variant, variantIndex) => (
                                <Row key={variantIndex} className="mb-2">
                                <Col md={3}>
                                    <Label>Variant</Label>
                                    <Input
                                    type="select"
                                    value={variant.variantId}
                                    onChange={(e) =>
                                        handleVariantChange(materialIndex, variantIndex, 'variantId', e.target.value)
                                    }
                                    >
                                    <option value="">Select Variant</option>
                                    {items
                                        .find((item) => item._id === material.itemId)
                                        ?.variants.map((v) => (
                                        <option key={v._id} value={v._id}>
                                            {v.optionLabel} - {v.stock} Qty
                                        </option>
                                        ))}
                                    </Input>
                                </Col>
                                <Col md={2}>
                                    <Label>Quantity</Label>
                                    <Input
                                    type="number"
                                    value={variant.quantity}
                                    onChange={(e) =>
                                        handleVariantChange(materialIndex, variantIndex, 'quantity', e.target.value)
                                    }
                                    />
                                </Col>
                                <Col md={2}>
                                    <Label>Waste (%)</Label>
                                    <Input
                                    type="number"
                                    value={variant.wastePercentage}
                                    onChange={(e) =>
                                        handleVariantChange(materialIndex, variantIndex, 'wastePercentage', e.target.value)
                                    }
                                    />
                                </Col>
                                <Col md={2}>
                                    <Button
                                    color="danger"
                                    onClick={() => removeVariantField(materialIndex, variantIndex)}
                                    >
                                    Remove Variant
                                    </Button>
                                </Col>
                                </Row>
                            ))}
                            <Button color="success" onClick={() => addVariantField(materialIndex)}>
                                Add Variant
                            </Button>
                            </Col>
                        </Row>
                        ))}
                        <Button color="success" onClick={addMaterialField}>
                        Add Material
                        </Button>

                </ModalBody>
               <ModalFooter>
                    <Button color="primary" onClick={saveBom}>
                    Save
                    </Button>
                    <Button color="secondary" onClick={toggleBomModal}>
                    Cancel
                    </Button>
               </ModalFooter>
            </Modal>


      </div>
    </React.Fragment>
  );
}

export default BomPage;
