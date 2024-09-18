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
    parentId: ""
  });
  const [parentCategories, setParentCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem("authUser")).token;
  const toggleModal = () => setModal(!modal);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/category/get-categories',config);
        setCategories(response.data);
        setParentCategories(response.data.filter(category => !category.parentId)); 
      } catch (error) {
        toast.error('Failed to fetch categories.');
      }
    };
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
    try {
      await axios.post('http://localhost:8000/api/category/create-category', formValues,config);
      toast.success('Category added successfully.');
      setModal(false);  
      setFormValues({
        categoryName: "",
        description: "",
        parentId: ""
      });
      const response = await axios.get('http://localhost:8000/api/category/get-categories' , config);
      setCategories(response.data);
      setParentCategories(response.data.filter(category => !category.parentId));
    } catch (error) {
      toast.error('Failed to add category.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Inventory Management" breadcrumbItem="Category Manager" />
        <Container>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <Row>
                    <Col md={6}>
                      <h4 className="card-title">Categories</h4>
                    </Col>
                    <Col md={6} className="text-right">
                      <Button color="primary" onClick={toggleModal}>
                        Add Category
                      </Button>
                    </Col>
                  </Row>

                  <Table className="table table-bordered mt-4">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Category Name</th>
                        <th>Description</th>
                        <th>Parent Category</th>
                        <th>Status</th>
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
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center">No categories found.</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>

                  <Modal isOpen={modal} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>Add Category</ModalHeader>
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
                        {loading ? "Adding..." : "Add Category"}
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
