import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Input } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { mdiPencil, mdiDelete, mdiCheck, mdiEye } from '@mdi/js';
import Icon from '@mdi/react';
import ProductDetail from '../../Modal/ProductDetail'; // Import ProductDetail for viewing

function InventoryTable() {
  const [inventoryData, setInventoryData] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [role, setRole] = useState("");
  const [editModal, setEditModal] = useState(false); 
  const [editItem, setEditItem] = useState(null);
  const [editVariant, setEditVariant] = useState(null);
  const [viewProduct, setViewProduct] = useState(false); 
  const [selectedItemDetails, setselectedItemDetails] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('inventoryItems')) || [];
    setInventoryData(storedData.map(item => ({
      ...item,
      variants: Array.isArray(item.variants) ? item.variants.map(v => ({
        ...v,
        price: Number(v.price),
        tax: Number(v.tax),
        quantity: Number(v.quantity)
      })) : []
    })));

    const storedRoles = JSON.parse(localStorage.getItem('authUser')) || "";
    setRole(storedRoles?.response.role);
  }, []);

  const handleRowClick = (id) => {
    setSelectedItemId(selectedItemId === id ? null : id);
  };

  const handleEditClick = (item, variant) => {
    setEditItem(item);
    setEditVariant(variant); 
    setEditModal(true); // Open the edit modal
  };

  const handleViewClick = (item, variant) => {
    setselectedItemDetails(item); 
    setViewProduct(true); // Open the view modal (ProductDetail)
  };

  const handleDeleteClick = (itemId, variantIndex) => {
    const updatedData = inventoryData.map(item => {
      if (item.id === itemId) {
        const updatedVariants = item.variants.filter((_, index) => index !== variantIndex);
        return { ...item, variants: updatedVariants };
      }
      return item;
    }).filter(item => item.variants.length > 0);

    setInventoryData(updatedData);
    localStorage.setItem('inventoryItems', JSON.stringify(updatedData));
  };

  const handleApproveClick = (id) => {
    const updatedData = inventoryData.map(item =>
      item.id === id ? { ...item, approved: true } : item
    );
    setInventoryData(updatedData);
    localStorage.setItem('inventoryItems', JSON.stringify(updatedData));
  };

  const calculateTotalQuantity = (variants) => {
    return variants.reduce((acc, curr) => acc + Number(curr.quantity), 0);
  };

  const calculatePriceAfterTax = (price, taxRate) => {
    return (price + (price * (taxRate / 100))).toFixed(2);
  };

  // Handle input changes for the edit modal
  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    setEditVariant(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveChanges = () => {
    const updatedVariants = editItem.variants.map(v =>
      v.id === editVariant.id ? editVariant : v
    );
    const updatedItem = { ...editItem, variants: updatedVariants };

    const updatedData = inventoryData.map(item =>
      item.id === editItem.id ? updatedItem : item
    );

    setInventoryData(updatedData);
    localStorage.setItem('inventoryItems', JSON.stringify(updatedData));
    setEditModal(false); // Close the edit modal after saving changes
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Inventory Management" breadcrumbItem="Inventory Table" />
        <Col lg={12}>
          <Card>
            <CardBody>
              <div className="table-responsive">
                <table className="table table-bordered mb=0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Brand</th>
                      <th>Supplier</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Variants</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryData.map(item => (
                      <React.Fragment key={item.id}>
                        {item.variants.length > 0 ? (
                          item.variants.map((variant, index) => (
                            <tr
                              key={`${item.id}-${index}`}
                              onClick={() => handleRowClick(item.id)}
                              style={{ cursor: 'pointer' }}
                            >
                              <td>{index === 0 ? item.name : ''}</td>
                              <td>{index === 0 ? item.description : ''}</td>
                              <td>{index === 0 ? calculateTotalQuantity(item.variants) : ''}</td>
                              <td>{index === 0 ? item.brandName : ''}</td>
                              <td>{index === 0 ? item.supplier : ''}</td>
                              <td>${Number(variant.price).toFixed(2)}</td>
                              <td>{index === 0 ? item.category : ''}</td>
                              <td>
                                {variant.name} - ${calculatePriceAfterTax(Number(variant.price), variant.tax)} - <span>{variant.quantity}</span>
                              </td>
                              <td>{index === 0 ? item.type : ''}</td>
                              <td>
                                {item.approved ? (
                                  <span>Approved</span>
                                ) : (
                                  <span>Pending</span>
                                )}
                              </td>
                              <td>
                                <div className='d-flex'>
                                  {role === "Firm_Admin" && !item.approved && (
                                    <Button color="success" onClick={() => handleApproveClick(item.id)} style={{ marginRight: '5px' }} title="Approve">
                                      <Icon path={mdiCheck} size={1} />
                                    </Button>
                                  )}
                                  <Button color="warning" onClick={() => handleEditClick(item, variant)} style={{ marginRight: '5px' }} title="Edit">
                                    <Icon path={mdiPencil} size={1} />
                                  </Button>
                                  <Button color="danger" onClick={() => handleDeleteClick(item.id, index)} title="Delete">
                                    <Icon path={mdiDelete} size={1} />
                                  </Button>
                                  <Button color="info" onClick={() => handleViewClick(item, variant)} style={{ marginRight: '5px' }} title="View">
                                    <Icon path={mdiEye} size={1} />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="10">No variants available</td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Edit Modal stays in this file */}
        <Modal isOpen={editModal} toggle={() => setEditModal(!editModal)}>
          <ModalHeader toggle={() => setEditModal(!editModal)}>Edit Variant</ModalHeader>
          <ModalBody>
            {editVariant && (
              <FormGroup>
                <Label for="variantName">Variant Name</Label>
                <Input
                  type="text"
                  id="variantName"
                  name="name"
                  value={editVariant.name}
                  onChange={handleModalInputChange}
                />
                <Label for="variantPrice">Price</Label>
                <Input
                  type="number"
                  id="variantPrice"
                  name="price"
                  value={editVariant.price}
                  onChange={handleModalInputChange}
                />
                <Label for="variantTax">Tax (%)</Label>
                <Input
                  type="number"
                  id="variantTax"
                  name="tax"
                  value={editVariant.tax}
                  onChange={handleModalInputChange}
                />
                <Label for="variantQuantity">Quantity</Label>
                <Input
                  type="number"
                  id="variantQuantity"
                  name="quantity"
                  value={editVariant.quantity}
                  onChange={handleModalInputChange}
                />
                <Button color="primary" onClick={handleSaveChanges}>Save Changes</Button>
              </FormGroup>
            )}
          </ModalBody>
        </Modal>

        {/* View Modal using ProductDetail component */}
        {viewProduct && (
          <ProductDetail
            isOpen={viewProduct}
            toggleModal={() => setViewProduct(!viewProduct)}
            selectedItemDetails={selectedItemDetails}
            viewMode={true} // Set viewMode to true to make it read-only
          />
        )}
      </div>
    </React.Fragment>
  );
}

export default InventoryTable;
