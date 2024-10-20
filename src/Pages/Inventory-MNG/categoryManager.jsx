import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, Button, Table, Modal, ModalHeader, ModalBody, FormGroup, Label, Input, ModalFooter } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import axios from 'axios';
import { toast } from 'react-toastify';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [modal, setModal] = useState(false);
  const [formValues, setFormValues] = useState({
    categoryName: "",
    description: "",
    parentId: "",
    
  });
  const [parentCategories, setParentCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const token = JSON.parse(localStorage.getItem("authUser")).token;

  const toggleModal = () => setModal(!modal);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const createdBy = JSON.parse(localStorage.getItem("authUser")).response._id;
  const firmId = JSON.parse(localStorage.getItem("authUser")).response.adminId;
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/category/get-categories/${firmId}`, config);
      setCategories(response.data);
      setParentCategories(response.data.filter(category => !category.parentId));
    } catch (error) {
      toast.error('Failed to fetch categories.');
    }
  };

  useEffect(() => {
    fetchCategories(); 
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const updatedFormValues = { ...formValues, createdBy, firmId }; 
    if (!updatedFormValues.parentId) {
      updatedFormValues.parentId = null;
    }
  
    try {
      if (editMode) {
        const response = await axios.put(
          `${process.env.REACT_APP_URL}/category/update-category/${selectedCategoryId}`,
          updatedFormValues,
          config
        );
        toast.success(response.message);
      } else {
        const response = await axios.post(
          `${process.env.REACT_APP_URL}/category/create-category/${createdBy}`,
          updatedFormValues,
          config
       
        );
        
        toast.success(response.message);
      }
      setModal(false);
      setFormValues({
        categoryName: "",
        description: "",
        parentId: ""
      });
  
      fetchCategories();
  
    } catch (error) {
      toast.error('Failed to save category.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleEdit = (category) => {
    setFormValues({
      categoryName: category.categoryName,
      description: category.description,
      parentId: category.parentId || ""
    });
    setSelectedCategoryId(category._id);
    setEditMode(true);
    setModal(true);
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const response = await axios.delete(`${process.env.REACT_APP_URL}/category/delete-category/${categoryId}`, config);
        fetchCategories(); 
        toast.warn(response.message);
      } catch (error) {
        toast.error('Failed to delete category.');
      }
    }
  };

  const openAddCategoryModal = () => {
    setFormValues({
      categoryName: "",
      description: "",
      parentId: ""
    });
    setEditMode(false);
    setSelectedCategoryId(null);
    setModal(true);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Inventory Management" breadcrumbItem="Category Manager" />
        <Container>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody className='relative'>
                  <Button className='position-absolute top-0 end-0' style={{ margin: '1.2rem' }} color="primary" onClick={openAddCategoryModal}>
                    Add Category
                  </Button>

                  <Table className="table table-bordered mt-5">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Category Name</th>
                        <th>Description</th>
                        <th>Parent Category</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.length > 0 ? (
                        categories.map((category, index) => (
                          <tr key={category._id}>
                            <td>{index + 1}</td>
                            <td>{category.categoryName}</td>
                            <td>{category.description}</td>
                            <td>
                              {category.parentId ? category.parentId.categoryName : "None"}
                            </td>
                            <td>{category.status}</td>
                            <td className='d-flex gap-2'>
                              {/* <Button color="warning" className="mr-2" onClick={() => handleEdit(category)}>
                                Edit
                              </Button> */}
                              <i className="bx bx-edit mr-2" style={{ fontSize: "22px", fontWeight: "bold", cursor: "pointer" }} onClick={() => handleEdit(category)}></i>
                              {/* <Button color="danger" onClick={() => handleDelete(category._id)}>
                                Delete
                              </Button> */}
                              <i className="bx bx-trash" style={{ fontSize: "22px", fontWeight: "bold", cursor: "pointer" }} onClick={() => handleDelete(category._id)}></i>
                              </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">No categories found.</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>

                  <Modal isOpen={modal} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>{editMode ? "Edit Category" : "Add Category"}</ModalHeader>
                    <ModalBody>
                      <form onSubmit={handleSubmit}>
                        <FormGroup>
                          <Label htmlFor="categoryName">Category Name</Label>
                          <Input
                            type="text"
                            id="categoryName"
                            name="categoryName"
                            placeholder="Enter category name"
                            value={formValues.categoryName}
                            onChange={handleChange}
                            required
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="description">Description</Label>
                          <Input
                            type="textarea"
                            id="description"
                            name="description"
                            placeholder="Enter description"
                            value={formValues.description}
                            onChange={handleChange}
                            required
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="parentId">Parent Category</Label>
                          <Input
                            type="select"
                            id="parentId"
                            name="parentId"
                            value={formValues.parentId}
                            onChange={handleChange}
                          >
                            <option value="">Select Parent Category (Optional)</option>
                            {parentCategories.map((parent) => (
                              <option key={parent._id} value={parent._id}>
                                {parent.categoryName}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                      </form>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={toggleModal}>
                        Cancel
                      </Button>
                      <Button color="primary" onClick={handleSubmit} disabled={loading}>
                        {loading ? (editMode ? "Updating..." : "Adding...") : (editMode ? "Update Category" : "Add Category")}
                      </Button>
                    </ModalFooter>
                  </Modal>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CategoryManager;
