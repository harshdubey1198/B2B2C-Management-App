import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { getBlogCategories, updateBlogCategory, deleteBlogCategory, createBlogCategory } from '../../apiServices/service';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';

function ManageCategories() {
  const [categoryName, setCategoryName] = useState('');
  const [status, setStatus] = useState('active');
  const [parentId, setParentId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(null);

  const fetchBlogCategories = async () => {
    try {
      const response = await getBlogCategories();
      setCategories(response.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateOrUpdate = async () => {
    const data = {
      categoryName,
      status,
      parentId,
    };

    try {
      if (isEditing && editCategory) {
        const response = await updateBlogCategory(editCategory._id, data);
        if (response) {
          fetchBlogCategories();
          toggleModal();
        }
      } else {
        const response = await createBlogCategory(data);
        if (response) {
          fetchBlogCategories();
          toggleModal();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCategory = async () => {
    if (deleteCategory) {
      try {
        const response = await deleteBlogCategory(deleteCategory._id);
        if (response) {
          fetchBlogCategories();
          toggleDeleteModal();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    if (!modalOpen) {
      setCategoryName('');
      setStatus('active');
      setParentId(null);
      setEditCategory(null);
      setIsEditing(false);
    }
  };

  const toggleDeleteModal = () => {
    setDeleteModalOpen(!deleteModalOpen);
    if (!deleteModalOpen) {
      setDeleteCategory(null);
    }
  };

  const handleEdit = (category) => {
    setCategoryName(category.categoryName);
    setStatus(category.status || 'active');
    setParentId(category.parentId?._id || null);
    setEditCategory(category);
    setIsEditing(true);
    setModalOpen(true);
  };

  const confirmDelete = (category) => {
    setDeleteCategory(category);
    setDeleteModalOpen(true);
  };

  useEffect(() => {
    fetchBlogCategories();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Blogs" breadcrumbItem="Manage Categories" />
        <div className="mb-3">
          <Button color="primary" onClick={toggleModal}>
            Add New Category
          </Button>
        </div>
        <div className="table-responsive">
          <table className="table table-centered table-nowrap mb-0">
            <thead className="thead-light">
              <tr>
                <th>Category Name</th>
                <th>Parent Category</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={index}>
                  <td>{category.categoryName}</td>
                  <td>{category.parentId ? category.parentId.categoryName : 'None'}</td>
                  <td>{category.status}</td>
                  <td>
                    <i
                      className="mdi mdi-pencil me-2 text-primary"
                      style={{ fontSize: '24px', cursor: 'pointer' }}
                      onClick={() => handleEdit(category)}
                    ></i>
                    <i
                      className="mdi mdi-delete text-danger"
                      style={{ fontSize: '24px', cursor: 'pointer' }}
                      onClick={() => confirmDelete(category)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {isEditing ? 'Edit Category' : 'Create New Category'}
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="categoryName">Category Name</Label>
            <Input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="status">Status</Label>
            <Input
              type="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="parentId">Parent Category</Label>
            <Input
              type="select"
              id="parentId"
              value={parentId || ''}
              onChange={(e) => setParentId(e.target.value)}
            >
              <option value="">None</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.categoryName}
                </option>
              ))}
            </Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleCreateOrUpdate}>
            {isEditing ? 'Update' : 'Create'}
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModalOpen} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>Delete Category</ModalHeader>
        <ModalBody>
          Are you sure you want to delete the category{' '}
          <strong>{deleteCategory?.categoryName}</strong>?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDeleteCategory}>
            Delete
          </Button>
          <Button color="secondary" onClick={toggleDeleteModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}

export default ManageCategories;
