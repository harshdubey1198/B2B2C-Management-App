import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Input } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { mdiPencil, mdiDelete, mdiCheck } from '@mdi/js';
import Icon from '@mdi/react';

function InventoryTable() {
  const [inventoryData, setInventoryData] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [role, setRole] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('inventoryItems')) || [];
    setInventoryData(storedData.map(item => ({
      ...item,
      variants: Array.isArray(item.variants) ? item.variants.map(v => ({
        ...v,
        price: Number(v.price),
        tax: Number(v.tax)
      })) : []
    })));

    const storedRoles = JSON.parse(localStorage.getItem('role')) || "";
    setRole(storedRoles);
  }, []);

  const handleRowClick = (id) => {
    if (selectedItemId === id) {
      setSelectedItemId(null);
    } else {
      setSelectedItemId(id);
    }
  };

  const handleEditClick = (item) => {
    setEditItem(item);
    setEditModal(true);
  };

  const handleDeleteClick = (itemId, variantIndex) => {
    const updatedData = inventoryData.map(item => {
      if (item.id === itemId) {
        const updatedVariants = item.variants.filter((_, index) => index !== variantIndex);
        return { ...item, variants: updatedVariants };
      }
      return item;
    }).filter(item => item.variants.length > 0); // Optionally remove items without any variants left

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

  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    setEditItem(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveChanges = () => {
    const updatedData = inventoryData.map(item =>
      item.id === editItem.id ? editItem : item
    );
    setInventoryData(updatedData);
    localStorage.setItem('inventoryItems', JSON.stringify(updatedData));
    setEditModal(false);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Inventory Management" breadcrumbItem="Inventory Table" />
        <p className='mm-active'>
          This is the Inventory Table page. Here you can view and manage your inventory items.
        </p>
        <Col lg={12}>
          <Card>
            <CardBody>
              <div className="table-responsive">
                <table className="table table-bordered mb-0">
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
                              {/* <td>{index === 0 ? item.quantity : ''}</td>
                               */}
                              <td>{index === 0 ? calculateTotalQuantity(item.variants) : ''}</td>
                              <td>{index === 0 ? item.brandName : ''}</td>
                              <td>{index === 0 ? item.supplier : ''}</td>
                              <td>${variant.price.toFixed(2)}</td>
                              <td>{index === 0 ? item.category : ''}</td>
                              <td>
                                {variant.name} - ${calculatePriceAfterTax(variant.price, variant.tax)} - <span>{variant.quantity}</span>
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
                                  <Button color="warning" onClick={() => handleEditClick(item)} style={{ marginRight: '5px' }} title="Edit">
                                    <Icon path={mdiPencil} size={1} />
                                  </Button>
                                  <Button color="danger" onClick={() => handleDeleteClick(item.id, index)} title="Delete">
                                    <Icon path={mdiDelete} size={1} />
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

        <Modal isOpen={editModal} toggle={() => setEditModal(!editModal)}>
          <ModalHeader toggle={() => setEditModal(!editModal)}>Edit Inventory Item</ModalHeader>
          <ModalBody>
            {editItem && (
              <FormGroup>
                <Label for="itemName">Item Name</Label>
                <Input
                  type="text"
                  id="itemName"
                  name="name"
                  value={editItem.name}
                  onChange={handleModalInputChange}
                />
                <Label for="itemDescription">Description</Label>
                <Input
                  type="textarea"
                  id="itemDescription"
                  name="description"
                  value={editItem.description}
                  onChange={handleModalInputChange}
                />
                <Label for="itemQuantity">Quantity</Label>
                <Input
                  type="number"
                  id="itemQuantity"
                  name="quantity"
                  value={editItem.quantity}
                  onChange={handleModalInputChange}
                />
                <Label for="itemBrand">Brand</Label>
                <Input
                  type="text"
                  id="itemBrand"
                  name="brand"
                  value={editItem.brand}
                  onChange={handleModalInputChange}
                />
                <Label for="itemSupplier">Supplier</Label>
                <Input
                  type="text"
                  id="itemSupplier"
                  name="supplier"
                  value={editItem.supplier}
                  onChange={handleModalInputChange}
                />
                <Label for="itemPrice">Original Price</Label>
                <Input
                  type="number"
                  id="itemPrice"
                  name="price"
                  value={editItem.price}
                  onChange={handleModalInputChange}
                />
                <Label for="itemCategory">Category</Label>
                <Input
                  type="text"
                  id="itemCategory"
                  name="category"
                  value={editItem.category}
                  onChange={handleModalInputChange}
                />
                <Label for="itemType">Type</Label>
                <Input
                  type="text"
                  id="itemType"
                  name="type"
                  value={editItem.type}
                  onChange={handleModalInputChange}
                />
                <Button color="primary" onClick={handleSaveChanges}>Save Changes</Button>
              </FormGroup>
            )}
          </ModalBody>
        </Modal>
      </div>
    </React.Fragment>
  );
}

export default InventoryTable;
