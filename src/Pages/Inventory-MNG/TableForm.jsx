import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody, FormGroup, Label, Input, Button } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { toast } from "react-toastify";
import axios from "axios";  

const InventoryItemForm = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    costPrice: "",
    sellingPrice: "",
    supplier : "",
    manufacturer: "",
    brand : "",
    ProductsHsn: "",
    qtyType: "",
    categoryId: "",
    subcategoryId: "",
    quantity: "",
  });
  const token = JSON.parse(localStorage.getItem("authUser")).token;
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`${process.env.REACT_APP_URL}/category/get-categories`, config);
        const parentCategories = response.data.filter(category => category.parentId === null);
        setCategories(parentCategories);
      } catch (error) {
        toast.error("Failed to fetch categories.");
        console.error(error.message);
      }
    };
    fetchCategories();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCategory = async (e) => {
    const { value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      categoryId: value,
    }));
  
    if (value) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`${process.env.REACT_APP_URL}/category/subcategories/${value}`, config);
        setSubcategories(response.data);
      } catch (error) {
        toast.error("Failed to fetch subcategories.");
        console.error(error.message);
      }
    } else {
      setSubcategories([]);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formValues.name || !formValues.categoryId) {
      toast.error("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/inventory/create-item`, formValues, config);
      if (response.status === 200) {
        toast.success("Item added successfully.");
        setFormValues({
          name: "",
          description: "",
          costPrice: "",
          sellingPrice: "",
          ProductsHsn: "",
          qtyType: "",
          categoryId: "",
          subcategoryId: "",
          quantity: "",
          variants: [],
        });
      }
    } catch (error) {
      toast.error("Failed to add item. Please try again.");
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Inventory Management" breadcrumbItem="Inventory Form" />
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} md={10}>
              <Card>
                <CardBody>
                  <h4 className="font-size-18 text-muted mt-2 text-center">
                    Add Inventory Item
                  </h4>
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="name">Item Name</Label>
                          <Input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter item name"
                            value={formValues.name}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="categoryId">Category</Label>
                          <Input
                            type="select"
                            id="categoryId"
                            name="categoryId"
                            value={formValues.categoryId}
                            onChange={handleCategory}
                          >
                            <option value="">Select Category</option>
                            {categories.map(category => (
                              <option key={category._id} value={category._id}>
                                {category.categoryName}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="subcategoryId">Subcategory</Label>
                          <Input
                            type="select"
                            id="subcategoryId"
                            name="subcategoryId"
                            value={formValues.subcategoryId}
                            onChange={handleChange}
                          >
                            <option value="">Select Subcategory</option>
                            {subcategories.map(subcategory => (
                              <option key={subcategory._id} value={subcategory._id}>
                                {subcategory.categoryName}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="ProductsHsn">HSN Code</Label>
                          <Input
                            type="text"
                            id="ProductsHsn"
                            name="ProductsHsn"
                            placeholder="Enter HSN code"
                            value={formValues.ProductsHsn}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="costPrice">Cost Price</Label>
                          <Input
                            type="number"
                            id="costPrice"
                            name="costPrice"
                            placeholder="Enter cost price"
                            value={formValues.costPrice}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="sellingPrice">Selling Price</Label>
                          <Input
                            type="number"
                            id="sellingPrice"
                            name="sellingPrice"
                            placeholder="Enter selling price"
                            value={formValues.sellingPrice}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="qtyType">Unit Type</Label>
                          <Input
                            type="select"
                            id="qtyType"
                            name="qtyType"
                            value={formValues.qtyType}
                            onChange={handleChange}
                          >
                            <option value="">Select Unit Type</option>
                            <option value="litres">Litres</option>
                            <option value="kg">Kilograms</option>
                            <option value="packets">Packets</option>
                            <option value="pieces">Pieces</option>
                            <option value="single unit">Single Unit</option>
                            <option value="gm">Grams</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="quantity">Quantity In Stock</Label>
                          <Input
                            type="number"
                            id="quantity"
                            name="quantity"
                            placeholder="Enter quantity in stock"
                            value={formValues.quantity}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="description">Item Description</Label>
                          <Input
                            type="textarea"
                            id="description"
                            name="description"
                            placeholder="Enter item description"
                            value={formValues.description}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button type="submit" color="success" disabled={loading}>
                      {loading ? "Adding..." : "Add Item"}
                    </Button>
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default InventoryItemForm;
