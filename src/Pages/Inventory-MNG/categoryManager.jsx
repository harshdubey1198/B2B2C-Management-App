import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, Button, Table, Modal, ModalHeader, ModalBody, FormGroup, Label, Input, ModalFooter, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import axios from 'axios';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axiosInstance';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
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
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyParents, setShowOnlyParents] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(7);

  const token = JSON.parse(localStorage.getItem("authUser")).token;
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const createdBy = JSON.parse(localStorage.getItem("authUser")).response._id;
  const firmId = JSON.parse(localStorage.getItem("authUser")).response.adminId;
  const [trigger , setTrigger] = useState(0);
  const toggleModal = () => setModal(!modal);

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
  }, [trigger]);

  const refetchCategories = () => {
    setTrigger(trigger + 1);
  };



  useEffect(() => {
    let updatedCategories = categories;

    if (searchTerm) {
      updatedCategories = updatedCategories.filter(category =>
        category.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (showOnlyParents) {
      updatedCategories = updatedCategories.filter(category => !category.parentId);
    }

    if (sortOrder === 'asc') {
      updatedCategories = updatedCategories.sort((a, b) => a.categoryName.localeCompare(b.categoryName));
    } else {
      updatedCategories = updatedCategories.sort((a, b) => b.categoryName.localeCompare(a.categoryName));
    }

    setFilteredCategories(updatedCategories);
  }, [categories, searchTerm, showOnlyParents, sortOrder]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterToggle = () => {
    setShowOnlyParents(!showOnlyParents);
    setCurrentPage(1);
  };

  const handleSortToggle = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const currentCategories = filteredCategories.slice(
    (currentPage - 1) * categoriesPerPage,
    currentPage * categoriesPerPage
  );

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
        const response = await axiosInstance.put(
          `${process.env.REACT_APP_URL}/category/update-category/${selectedCategoryId}`,
          updatedFormValues
        );
        toast.success(response.message);
      } else {
        const response = await axiosInstance.post(
          `${process.env.REACT_APP_URL}/category/create-category/${createdBy}`,
          updatedFormValues
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
                <CardBody>
                  <div className='d-flex align-items-center flex-column flex-md-row custom-gap'>
                    <i className='bx bx-refresh cursor-pointer'  style={{fontSize: "24.5px",fontWeight: "bold",color: "black",transition: "color 0.3s ease"}} onClick={refetchCategories} onMouseEnter={(e) => e.target.style.color = "green"}  onMouseLeave={(e) => e.target.style.color = "black"}></i>
                    <Input
                        type="text"
                        placeholder="Search by Category Name or Description"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="my-1 input-width"
                        style={{ width: "233px",maxHeight:"27.13px" , fontSize:"10.5px" , lineHeight:"1" }}
                      />

                    <FormGroup check>
                      <Label check>
                        <Input type="checkbox" checked={showOnlyParents} onChange={handleFilterToggle} />
                        <span style={{ width: "233px",maxHeight:"27.13px" , fontSize:"10.5px" , lineHeight:"1" }}>
                          Show Only Parent Categories
                          </span>
                      </Label>
                    </FormGroup>
                    {/* <Button color="link" onClick={handleSortToggle}>
                      Sort by Name ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
                    </Button> */}
                  <Button color="primary" className="p-2" style={{maxHeight:"27.13px",fontSize:"10.5px" , lineHeight:"1"}} onClick={openAddCategoryModal}>
                    Add Category
                  </Button>
                  </div>

                  <Table className="table table-bordered mt-2">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th onClick={handleSortToggle} className='cursor-pointer'>Category Name</th>
                        <th>Description</th>
                        <th>Parent Category</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentCategories.length > 0 ? (
                        currentCategories.map((category, index) => (
                          <tr key={category._id}>
                            <td>{index + 1 + (currentPage - 1) * categoriesPerPage}</td>
                            <td>{category.categoryName}</td>
                            <td>{category.description}</td>
                            <td>{category.parentId ? category.parentId.categoryName : "None"}</td>
                            <td>
                              <i
                                className="bx bx-edit"
                                style={{ fontSize: "22px", cursor: "pointer" }}
                                onClick={() => handleEdit(category)}
                              ></i>
                              <i
                                className="bx bx-trash"
                                style={{ fontSize: "22px", cursor: "pointer" }}
                                onClick={() => handleDelete(category._id)}
                              ></i>
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
                  <Pagination>
                      {[...Array(Math.ceil(filteredCategories.length / categoriesPerPage)).keys()].map((_, index) => (
                        <PaginationItem active={index + 1 === currentPage} key={index}>
                          <PaginationLink
                            onClick={() => handlePageChange(index + 1)}
                            className={`text-white ${index + 1 === currentPage ? "btn-primary" : "bg-secondary"}`}
                            style={{ fontWeight: index + 1 === currentPage ? "bold" : "normal" }}
                          >
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                    </Pagination>
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
