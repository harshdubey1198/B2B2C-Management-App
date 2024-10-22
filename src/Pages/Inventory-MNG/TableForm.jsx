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
  const [editIndex, setEditIndex] = useState(null); 
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
  const [taxes, setTaxes] = useState([]);
  const [selectedTax, setSelectedTax] = useState("");
  const [selectedRate, setSelectedRate] = useState([]); 
  const [formValues, setFormValues] = useState({ name: "", description: "", costPrice: "", sellingPrice: "", supplier: "", manufacturer: "", brand: "", ProductHsn: "", qtyType: "", categoryId: "", subcategoryId: "", vendorId: "", quantity: "", tax: {}, selectedTaxTypes: [], });
  
  const token = JSON.parse(localStorage.getItem("authUser")).token;
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const handleReset = () => {
    setFormValues({ name: "", description: "", costPrice: "", sellingPrice: "", supplier: "", manufacturer: "", brand: "", ProductHsn: "", qtyType: "", categoryId: "", subcategoryId: "", vendorId: "", quantity: "", tax: "", selectedTaxTypes: [], });
    setVariants([]); 
  };
  useEffect(() => {
    const fetchTaxes = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/tax/get-taxes/${firmId}`, config);
        setTaxes(response.data);

      } catch (error) {
        toast.error("Failed to fetch tax rates.");
      }
    };

    fetchTaxes();
  }, []);
  const handleTaxChange = (e) => {
    const value = e.target.value;
    setSelectedTax(value);
    setSelectedRate("");
    setFormValues((prevState) => ({
      ...prevState,
      tax: value, 
      // taxName: taxes.find((tax) => tax._id === value).taxName,
    }));
    
  };
  const handleRateChange = (e) => {
    const value = e.target.value;
    setFormValues((prevState) => {
      let selectedTaxTypes = [...prevState.selectedTaxTypes];
      if (selectedTaxTypes.includes(value)) {
        selectedTaxTypes = selectedTaxTypes.filter(rate => rate !== value);
      } else {
         selectedTaxTypes.push(value);
      }
      return {
        ...prevState,
        selectedTaxTypes: selectedTaxTypes,
      };
    });
  };


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        
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

  const addOrUpdateVariant = () => {
    if (
      variant.variationType &&
      variant.optionLabel &&
      variant.price &&
      variant.stock &&
      variant.sku &&
      variant.barcode
    ) {
      if (editIndex !== null) {
        const updatedVariants = [...variants];
        updatedVariants[editIndex] = variant;
        setVariants(updatedVariants);
        setEditIndex(null);
      } else {
        setVariants([...variants, variant]);
      }
      setVariant({ variationType: "", optionLabel: "", price: "", stock: "", sku: "", barcode: "",   });
      toggleModal();
    } else {
      toast.error("Please fill in all variant details");
    }
  };

  const editVariant = (index) => {
    setVariant(variants[index]);
    setEditIndex(index);
    toggleModal();
  };

  const deleteVariant = (index) => {
    const updatedVariants = variants.filter((_, i) => i !== index);
    setVariants(updatedVariants);
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
    const dataToSend = {
      ...formValues,
      taxId: selectedTax, 
      selectedTaxTypes: selectedRate ? selectedRate.split(',') : [],
      variants,
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/inventory/create-item/${createdBy}`, { ...formValues, variants }, config);
      setFormValues({
        name: "", description: "", costPrice: "", sellingPrice: "", ProductHsn: "", qtyType: "", categoryId: "", subcategoryId: "", vendorId: "",  quantity: "", brand: "", manufacturer: "", supplier: ""
      });
      setVariants([]);
      handleReset();

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
                          <Col md={6}>
                            <FormGroup>
                              <Label htmlFor="taxId">Select Tax</Label>
                              <Input
                                type="select"
                                id="taxId"
                                name="taxId"
                                value={selectedTax}
                                onChange={handleTaxChange}
                              >
                                <option value="">Select Tax</option>
                                {taxes.map((tax) => (
                                  <option key={tax._id} value={tax._id}>
                                    {tax.taxName}
                                  </option>
                                ))}
                              </Input>
                            </FormGroup>
                          </Col>


                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="ProductHsn">HSN</Label>
                          <Input type="text" id="ProductHsn" name="ProductHsn" placeholder="Enter HSN" value={formValues.ProductHsn} />
                        </FormGroup>
                      </Col>
                      {selectedTax && (
                        <Row>
                          <Col md={6}>
                            <FormGroup>
                              <Label>Select Tax Types</Label>
                              {taxes
                                .find((tax) => tax._id === selectedTax)
                                ?.taxRates.map((rate) => (
                                  <FormGroup check key={rate._id}>
                                    <Label check>
                                      <Input
                                        type="checkbox" 
                                        name="selectedTaxTypes"
                                        value={rate._id}
                                        checked={formValues.selectedTaxTypes.includes(rate._id)}
                                        onChange={handleRateChange}
                                      />
                                      {rate.taxType} ({rate.rate}%)
                                    </Label>
                                  </FormGroup>
                                ))}
                            </FormGroup>
                          </Col>
                        </Row>
                      )}
                    </Row>
                    <VariantModal
                      isOpen={modal} 
                      toggle={toggleModal} 
                      variant={variant}
                      handleVariantChange={handleVariantChange}
                      addVariant={addOrUpdateVariant}
                    />
                    <Row className="mt-3">
                      <Col md={12}>
                        <Button className="mx-2" color="primary" onClick={toggleModal}>Add Variant</Button>
                        <Button className="mx-2" type="submit" color="success" disabled={loading}>{loading ? "Saving..." : "Submit"}</Button>
                        <Button className="mx-2" color="secondary" onClick={handleReset}>Reset</Button>
                      </Col>
                    </Row>
                  </form>
                  {variants.length > 0 && (
                  <div className="mt-4">
                    <h5 className="font-size-15 mb-3">Variants</h5>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th>Option</th>
                          <th>Price</th>
                          <th>Stock</th>
                          <th>SKU</th>
                          <th>Barcode</th>
                          <th>Actions</th>
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
                            <td>
                              <i className="bx bx-edit mr-2" style={{ fontSize: "22px", fontWeight: "bold", cursor: "pointer" }} onClick={() => editVariant(index)}></i>
                              <i className="bx bx-trash" style={{ fontSize: "22px", fontWeight: "bold", cursor: "pointer" }} onClick={() => deleteVariant(index)}></i>
                            </td>
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
        </Container>
      </div>
    </React.Fragment>
  );
};

export default InventoryItemForm;
