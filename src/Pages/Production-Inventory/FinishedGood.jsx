import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';

function FinishedGood() {
  const ReadyProduct = [
    {
      id: 'P001',
      name: 'Product A',
      category: 'Category 1',
      subCategory: 'Subcategory A',
      quantity: 50,
      unit: 'kg',
      price: 100,
      details: 'This is a detailed description of Product A.',
      rawMaterials: [
        { name: 'Raw Material 1', quantity: 30, unit: 'kg', sellingPrice: 50 },
        { name: 'Raw Material 2', quantity: 20, unit: 'kg', sellingPrice: 100 },
      ]
    },
    {
      id: 'P002',
      name: 'Product B',
      category: 'Category 2',
      subCategory: 'Subcategory B',
      quantity: 30,
      unit: 'litres',
      price: 150,
      details: 'This is a detailed description of Product B.',
      rawMaterials: [
        { name: 'Raw Material A', quantity: 15, unit: 'litres' },
        { name: 'Raw Material B', quantity: 10, unit: 'litres' }
      ]
    },
    {
      id: 'P003',
      name: 'Product C',
      category: 'Category 1',
      subCategory: 'Subcategory C',
      quantity: 70,
      unit: 'pieces',
      price: 200,
      details: 'This is a detailed description of Product C.',
      rawMaterials: [
        { name: 'Raw Material X', quantity: 50, unit: 'pieces' },
        { name: 'Raw Material Y', quantity: 20, unit: 'pieces' }
      ]
    }
  ];

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [products, setProducts] = useState(ReadyProduct); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  
  const toggleEditModal = (product = null) => {
    setEditProduct(product); // Set product to edit or null for adding a new product
    setIsEditModalOpen(!isEditModalOpen);
  };
  const toggleDetailModal = (product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(!isDetailModalOpen);
  };
  const addProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };
  
  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products'); 
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  const updateProduct = (id, updatedProduct) => {
    setProducts(
      products.map((product) => (product.id === id ? updatedProduct : product))
    ); 
  };
  
  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <React.Fragment>
      <style>
        {`
          .custom-modal .modal-header {
            background-color: var(--bs-sidebar-dark-bg, #0d6efd);;
            color: #fff;
          }
          .custom-modal .modal-body {
            font-size: 16px;
          }
          .custom-modal .modal-footer {
            justify-content: center;
          }
          .row-details .col-title {
            font-weight: bold;
            // text-align: right;
          }
          .row-details .col-value {
            text-align: left;
          }
          @media (max-width: 768px) {
            .row-details .col-title, .row-details .col-value {
              text-align: left;
            }
          }
        `}
      </style>

      <div className='page-content'>
        <Breadcrumbs title='Production & Inventory' breadcrumbItem='Finished Good' />

        <div className='table-responsive'>
          <table className='table table-centered table-bordered table-hover mb-0'>
            <thead className='thead-light'>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ReadyProduct.map((product, key) => (
                <tr key={key}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.subCategory}</td>
                  <td>{product.quantity}</td>
                  <td>{product.unit}</td>
                  <td>{product.price}</td>
                  <td className='d-flex justify-content-evenly'>
                    <i
                      className='bx bx-show font-size-20 text-info'
                      style={{cursor:'pointer'}}
                      onClick={() => toggleDetailModal(product)}
                      title="View Details"
                    ></i>
                   <i
                      className="bx bx-edit font-size-20 text-primary"
                      style={{cursor:'pointer'}}
                      onClick={() => toggleEditModal(product)}
                      title="Edit Product"
                    ></i>
                    <i
                      className="bx bx-trash font-size-20 text-danger"
                      style={{cursor:'pointer'}}
                      onClick={() => deleteProduct(product.id)}
                      title="Delete Product"
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isEditModalOpen && (
            <Modal isOpen={isEditModalOpen} toggle={() => toggleEditModal(null)} className="custom-modal">
              <ModalHeader toggle={() => toggleEditModal(null)}>
                {editProduct ? 'Edit Product' : 'Add Product'}
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const updatedProduct = {
                      id: editProduct ? editProduct.id : `P${products.length + 1}`, // Auto-generate ID for new product
                      name: e.target.name.value,
                      category: e.target.category.value,
                      subCategory: e.target.subCategory.value,
                      quantity: parseInt(e.target.quantity.value),
                      unit: e.target.unit.value,
                      price: parseFloat(e.target.price.value),
                      details: e.target.details.value,
                      rawMaterials: [],
                    };

                    if (editProduct) {
                      updateProduct(editProduct.id, updatedProduct); // Update existing product
                    } else {
                      addProduct(updatedProduct); // Add new product
                    }

                    toggleEditModal(null);
                  }}
                >
                  <div className="mb-3">
                    <label>Product Name</label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={editProduct?.name || ''}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label>Category</label>
                    <input
                      type="text"
                      name="category"
                      defaultValue={editProduct?.category || ''}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label>Sub Category</label>
                    <input
                      type="text"
                      name="subCategory"
                      defaultValue={editProduct?.subCategory || ''}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label>Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      defaultValue={editProduct?.quantity || ''}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label>Unit</label>
                    <input
                      type="text"
                      name="unit"
                      defaultValue={editProduct?.unit || ''}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label>Price</label>
                    <input
                      type="number"
                      step="0.01"
                      name="price"
                      defaultValue={editProduct?.price || ''}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label>Details</label>
                    <textarea
                      name="details"
                      defaultValue={editProduct?.details || ''}
                      className="form-control"
                    ></textarea>
                  </div>
                  <Button type="submit" color="primary">
                    {editProduct ? 'Update Product' : 'Add Product'}
                  </Button>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={() => toggleEditModal(null)}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          )}

        {selectedProduct && (
          <Modal isOpen={isDetailModalOpen} toggle={() => toggleDetailModal(null)} className="custom-modal">
            <ModalHeader toggle={() => toggleDetailModal(null)}>
              Product Details - {selectedProduct.name}
            </ModalHeader>
            <ModalBody>
              <div className="container">
                <div className="row row-details mb-3">
                  <div className="col-4 col-md-3 col-title">Product ID:</div>
                  <div className="col-8 col-md-9 col-value">{selectedProduct.id}</div>
                </div>
                <div className="row row-details mb-3">
                  <div className="col-4 col-md-3 col-title">Category:</div>
                  <div className="col-8 col-md-9 col-value">{selectedProduct.category}</div>
                </div>
                <div className="row row-details mb-3">
                  <div className="col-4 col-md-3 col-title">Sub Category:</div>
                  <div className="col-8 col-md-9 col-value">{selectedProduct.subCategory}</div>
                </div>
                <div className="row row-details mb-3">
                  <div className="col-4 col-md-3 col-title">Quantity:</div>
                  <div className="col-8 col-md-9 col-value">{selectedProduct.quantity} {selectedProduct.unit}</div>
                </div>
                <div className="row row-details mb-3">
                  <div className="col-4 col-md-3 col-title">Price:</div>
                  <div className="col-8 col-md-9 col-value">₹{selectedProduct.price}</div>
                </div>
                <div className="row row-details mb-3">
                  <div className="col-12 col-title">Details:</div>
                  <div className="col-12 col-value">{selectedProduct.details}</div>
                </div>
                <h5>Raw Materials Used:</h5>
                <ul>
                  {selectedProduct.rawMaterials.map((material, index) => (
                    <li key={index}>
                      {material.name} - {material.quantity} {material.unit}
                    </li>
                  ))}
                </ul>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={() => toggleDetailModal(null)}>Close</Button>
            </ModalFooter>
          </Modal>
        )}
      </div>
    </React.Fragment>
  );
}

export default FinishedGood;
