import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody, FormGroup, Label, Input, Button } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { toast } from "react-toastify";
import axios from "axios";  
import { useNavigate } from "react-router-dom";
import VariantModal from "./VariantModal";  
import hsnData from "../../data/hsn.json";

const InventoryItemForm = () => {
  const createdBy = JSON.parse(localStorage.getItem("authUser")).response._id;
  const firmId = JSON.parse(localStorage.getItem("authUser")).response.adminId;
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [variant, setVariant] = useState({
    variationType: "",
    optionLabel: "",
    price: "",
    stock: "",
    sku: "",
    barcode: "",
  });
  
  const [variants, setVariants] = useState([]);
  const toggleModal = () => setModal(!modal);

  const [subcategories, setSubcategories] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    costPrice: "",
    sellingPrice: "",
    supplier: "",
    manufacturer: "",
    brand: "",
    ProductHsn: "",
    qtyType: "",
    categoryId: "",
    subcategoryId: "",
    vendorId: "",
    quantity: ""
  });
  
  const token = JSON.parse(localStorage.getItem("authUser")).token;
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  
  const handleReset = () => {
    setFormValues({
      name: "",
      description: "",
      costPrice: "",
      sellingPrice: "",
      supplier: "",
      manufacturer: "",
      brand: "",
      ProductHsn: "",
      qtyType: "",
      categoryId: "",
      subcategoryId: "",
      vendorId: "",
      quantity: "",
    });
  };
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`${process.env.REACT_APP_URL}/category/get-categories/${firmId}`, config);
        const parentCategories = response.data.filter(category => category.parentId === null);
        setCategories(parentCategories);
      } catch (error) {
        toast.error("Failed to fetch categories.");
        console.error(error.message);
      }
    };
    const fetchVendors = async () => { 
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`${process.env.REACT_APP_URL}/vendor/get-vendors/${firmId}`, config);
        setVendors(response.data);
      } catch (error) {
        toast.error("Failed to fetch vendors.");
        console.error(error.message);
      }
    };
    fetchCategories();
    fetchVendors(); 
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleVariantChange = (e) => {
    const { name, value } = e.target;
    setVariant((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addVariant = () => {
    if (
      variant.variationType &&
      variant.optionLabel &&
      variant.price &&
      variant.stock &&
      variant.sku &&
      variant.barcode
    ) {
      setVariants([...variants, variant]);
      setVariant({
        variationType: "",
        optionLabel: "",
        price: "",
        stock: "",
        sku: "",
        barcode: "",
      });
      toggleModal();
    } else {
      toast.error("Please fill in all variant details");
    }
  };

  const handleCategory = async (e) => {
    const { value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      categoryId: value,
    }));

    const selectedCategory = categories.find((category) => category._id === value);
    if (selectedCategory) {
      const hsnNumber = hsnData.find((hsn) =>
        hsn.description.toLowerCase().includes(selectedCategory.categoryName.toLowerCase())
      );
      if (hsnNumber) {
        setFormValues((prevState) => ({
          ...prevState,
          ProductHsn: hsnNumber.hsn,
        }));
      } else {
        setFormValues((prevState) => ({
          ...prevState,
          ProductHsn: "",
        }));
      }
    } else {
      setFormValues((prevState) => ({
        ...prevState,
        ProductHsn: "",
      }));
    }

    if (value) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`${process.env.REACT_APP_URL}/category/subcategories/${value}`, config);
        const subcategoryData = response.data;
        if (subcategoryData.length === 0) {
          toast.info("This category doesn't have any subcategories.");
        }
        setSubcategories(subcategoryData);
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
      const response = await axios.post(`${process.env.REACT_APP_URL}/inventory/create-item/${createdBy}`, { ...formValues, variants }, config);
      setFormValues({
        name: "",
        description: "",
        costPrice: "",
        sellingPrice: "",
        ProductHsn: "",
        qtyType: "",
        categoryId: "",
        subcategoryId: "",
        vendorId: "", 
        quantity: "",
        brand: "",
        manufacturer: "",
        supplier: ""
      });
      setVariants([]);
      toast.success(response.message);
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
                          <Input className="xyz" type="text" id="name" name="name" placeholder="Enter item name" value={formValues.name} onChange={handleChange} />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="description">Item Description</Label>
                          <Input type="text" id="description" name="description" placeholder="Enter item description" value={formValues.description} onChange={handleChange} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="categoryId">Category</Label>
                          <Input type="select" id="categoryId" name="categoryId" value={formValues.categoryId} onChange={handleCategory} >
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
                          <Label htmlFor="subcategoryId">Subcategory</Label>
                          <Input type="select" id="subcategoryId" name="subcategoryId" value={formValues.subcategoryId} onChange={handleChange} >
                            <option value="">Select Subcategory</option>
                            {subcategories.map(subcategory => (
                              <option key={subcategory._id} value={subcategory._id}>
                                {subcategory.categoryName}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="vendorId">Vendor</Label>
                          <Input type="select" id="vendorId" name="vendorId" value={formValues.vendorId} onChange={handleChange} >
                            <option value="">Select Vendor</option>
                            {vendors.map(vendor => (
                              <option key={vendor._id} value={vendor._id}>
                                {vendor.name}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="costPrice">Cost Price</Label>
                          <Input type="number" id="costPrice" name="costPrice" placeholder="Enter cost price" value={formValues.costPrice} onChange={handleChange} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="sellingPrice">Selling Price</Label>
                          <Input type="number" id="sellingPrice" name="sellingPrice" placeholder="Enter selling price" value={formValues.sellingPrice} onChange={handleChange} />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="quantity">Quantity</Label>
                          <Input type="number" id="quantity" name="quantity" placeholder="Enter quantity" value={formValues.quantity} onChange={handleChange} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <Label htmlFor="ProductHsn">HSN</Label>
                          <Input type="text" id="ProductHsn" name="ProductHsn" placeholder="Enter HSN" value={formValues.ProductHsn} readOnly />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <Button color="primary" onClick={toggleModal}>Add Variant</Button>
                      </Col>
                    </Row>
                    <VariantModal isOpen={modal} toggle={toggleModal} variant={variant} handleChange={handleVariantChange} addVariant={addVariant} />
                    <Row className="mt-3">
                      <Col md={12}>
                        <Button type="submit" color="success" disabled={loading}>
                          {loading ? "Adding..." : "Add Item"}
                        </Button>
                        <Button type="button" color="secondary" className="mx-2" onClick={handleReset}>Reset</Button>
                      </Col>
                    </Row>
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
