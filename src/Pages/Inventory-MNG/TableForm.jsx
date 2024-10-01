import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody, FormGroup, Label, Input, Button } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { toast } from "react-toastify";
import axios from "axios";  
import { useNavigate } from "react-router-dom";
import VariantModal from "./VariantModal";  

const InventoryItemForm = () => {
  const createdBy = JSON.parse(localStorage.getItem("authUser")).response._id;
  const firmId = JSON.parse(localStorage.getItem("authUser")).response.adminId;
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [variant, setVariant] = useState({ variationType: "", optionLabel: "", price: "", stock: "", sku: "", barcode: "", });
  
  const [variants, setVariants] = useState([]);
  const toggleModal = () => setModal(!modal);

  const [subcategories, setSubcategories] = useState([]);
  const [formValues, setFormValues] = useState({ name: "", description: "", costPrice: "", sellingPrice: "", supplier: "", manufacturer: "", brand: "", ProductsHsn: "", qtyType: "", categoryId: "", subcategoryId: "", quantity: ""});
  const token = JSON.parse(localStorage.getItem("authUser")).token;
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  
  const handleReset = () => {
    setFormValues({ name: "", description: "", costPrice: "", sellingPrice: "", ProductsHsn: "", qtyType: "", categoryId: "", subcategoryId: "", quantity: "",
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
    fetchCategories();
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

  console.log(variant, "variant")

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
      if (response.status === 200) {
        toast.success("Item added successfully.");
        setFormValues({ name: "", description: "", costPrice: "", sellingPrice: "", ProductsHsn: "", qtyType: "", categoryId: "", subcategoryId: "", quantity: "", });
        setVariants([]);
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
                          <Input type="text" id="name" name="name" placeholder="Enter item name" value={formValues.name} onChange={handleChange} />
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
                          <Label htmlFor="costPrice">Cost Price</Label>
                          <Input type="number" id="costPrice" name="costPrice" placeholder="Enter cost price" value={formValues.costPrice} onChange={handleChange} />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="sellingPrice">Selling Price</Label>
                          <Input type="number" id="sellingPrice" name="sellingPrice" placeholder="Enter selling price" value={formValues.sellingPrice} onChange={handleChange} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="qtyType">Unit Type</Label>
                          <Input type="select" id="qtyType" name="qtyType" value={formValues.qtyType} onChange={handleChange} >
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
                          <Input type="number" id="quantity" name="quantity" placeholder="Enter quantity in stock" value={formValues.quantity} onChange={handleChange} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="ProductsHsn">HSN Code</Label>
                          <Input type="text" id="ProductsHsn" name="ProductsHsn" placeholder="Enter HSN code" value={formValues.ProductsHsn} onChange={handleChange} />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="brand">Brand</Label>
                          <Input type="text" id="brand" name="brand" placeholder="Enter brand" value={formValues.brand} onChange={handleChange} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="manufacturer">Manufacturer</Label>
                          <Input type="text" id="manufacturer" name="manufacturer" placeholder="Enter manufacturer" value={formValues.manufacturer} onChange={handleChange} />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="supplier">Supplier</Label>
                          <Input type="text" id="supplier" name="supplier" placeholder="Enter supplier" value={formValues.supplier} onChange={handleChange}/>
                        </FormGroup>
                      </Col>
                    </Row>
                  <div className=" d-flex gap-2 justify-content-center mt-4">
                    <Button color="info" onClick={toggleModal}>Add Variant</Button>
                    <Button color="primary" type="submit" disabled={loading}> {loading ? "Saving..." : "Save Item"} </Button>
                  </div>
                  </form>
                  {variants.length > 0 && (
                  <div className="mt-4">
                    <h5 className="font-size-16 text-muted">Added Variants</h5>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Variation Type</th>
                          <th>Option Label</th>
                          <th>Price Adjustment</th>
                          <th>Stock</th>
                          <th>SKU</th>
                          <th>Barcode</th>
                        </tr>
                      </thead>
                      <tbody>
                        {variants.map((variant, index) => (
                          <tr key={index}>
                            <td>{variant.variationType}</td>
                            <td>{variant.optionLabel}</td>
                            <td>{variant.price}</td>
                            <td>{variant.stock}</td>
                            <td>{variant.sku}</td>
                            <td>{variant.barcode}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                </CardBody>
              </Card>
            </Col>
          </Row>

          <VariantModal modal={modal} toggleModal={toggleModal} variant={variant} handleVariantChange={handleVariantChange} addVariant={addVariant}/>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default InventoryItemForm;
