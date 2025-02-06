import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VariantModal from "./VariantModal";  
import hsnData from "../../data/hsn.json";
import BrandModal from "../../Modal/BrandModal";
import ManufacturerModal from "../../Modal/ManufacturerModal";
import FetchBrands from "./FetchBrands";
import FetchManufacturers from "./fetchManufacturers";
import { getItemCategories, getItemSubCategories, getTaxes, getVendors } from "../../apiServices/service";
import Select from "react-select";
import VendorModal from "../../Modal/VendorModal";

const InventoryItemForm = () => {
  const createdBy = JSON.parse(localStorage.getItem("authUser")).response._id;
  const firmId = JSON.parse(localStorage.getItem("authUser")).response.adminId;
  const token = JSON.parse(localStorage.getItem("authUser")).token;
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [vendorModalOpen, setVendorModalOpen] = useState(false);
  const [variantModalOpen, setVariantModalOpen] = useState(false);
  const [vendorData, setVendorData] = useState({
    name: "",
    contactPerson: "",
    phone: "",
    email: "",
    address: { h_no: "", city: "", state: "", zip_code: "", country: "", nearby: "" }
  });
  const [editIndex, setEditIndex] = useState(null); 
  const [variant, setVariant] = useState({ variationType: "", optionLabel: "", price: "", stock: "", sku: "", barcode: "", });
  const [taxes, setTaxes] = useState([]);
  const [selectedTaxTypes, setSelectedTaxTypes] = useState([]);
  const [variants, setVariants] = useState([]);
  // const toggleModal = () => setModal(!modal);
  const [subcategories, setSubcategories] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [formValues, setFormValues] = useState({name: "" , type:""  ,description: "",costPrice: "",sellingPrice: "",supplier: "",manufacturer: "",brand: "",ProductHsn: "",qtyType: "",categoryId: "",subcategoryId: "",vendorId: "",quantity: "",taxId:  "", selectedTaxTypes: [],});
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [ tosendTaxtype, setToSendTaxtype] = useState([]);
  const [brands, setBrands] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [triggerManufacturer, setTriggerManufacurer] = useState(0)
  const [triggerBrand, setTriggerBrand] = useState(0)
  const [triggerVendor , setTriggerVendor] = useState(0)

  const handleBrandsFetched = (fetchedBrands) => {
    setBrands(fetchedBrands);
  };
  const handleManufacturersFetched = (fetchedManufacturers) => {
    setManufacturers(fetchedManufacturers);
  };
  
  const handleVendorsFetched = (fetchedVendors) => {
    setVendors(fetchedVendors);
  };


  const handleReset = () => {
    setFormValues({ name: "",type:"", description: "", costPrice: "", sellingPrice: "", supplier: "", manufacturer: "", brand: "", ProductHsn: "", qtyType: "", categoryId: "", subcategoryId: "", vendorId: "", quantity: "",taxId:"", selectedTaxTypes: [], });
    setVariants([]); 
  };
  useEffect(() => {
    const fetchTaxes = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_URL}/tax/get-taxes/${firmId}`);
        setTaxes(response.data);
        // console.log(response.data);  
      } catch (error) {
        toast.error("Failed to fetch tax rates.");
      }
    };

    fetchTaxes();
  }, []);
  const toggleBrandModal = () => {
    setModalOpen(!modalOpen);
  };
 
  const toggleManufacturerModal = () => {
    setModal(!modal);
  };
  const toggleVendorModal = () => {
    setVendorModalOpen(!vendorModalOpen);
    setVendorData({  // Reset form when opening
      name: "",
      contactPerson: "",
      phone: "",
      email: "",
      address: { h_no: "", city: "", state: "", zip_code: "", country: "", nearby: "" }
    });
  };

  const fetchVendors = async () => { 
    try {
      const response = await getVendors();
      setVendors(response.data || []);
      console.log("fetching Vendors")
       } catch (error) {
      toast.error("Failed to fetch vendors.");
      console.error(error.message);
    }
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {        
        const response = await getItemCategories();
        // const parentCategories = response.data.filter(category => category.parentId === null);
        // setCategories(parentCategories);
        const parentCategories = response.data.length > 0 ? response.data.filter(category => category.parentId === null) : [];
        setCategories(parentCategories);
      } catch (error) {        
        toast.error("Failed to fetch categories.");
        console.error(error.message);
      }
    };
    
    const fetchTaxes = async () => {
      try {
        const response = await getTaxes();
        setTaxes(response.data || []);
      } catch (error) {
        toast.error("Failed to fetch taxes.");
        console.error(error.message);
      }
    };
    fetchCategories();
    fetchVendors(); 
    fetchTaxes();
  }, [] );

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
  
  const handleTaxChange = (e) => {
    setFormValues({
      ...formValues,
      taxId: e.target.value,
      selectedTaxTypes: [],
    });
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
      setVariantModalOpen(false);
    } else {
      toast.error("Please fill in all variant details");
    }
  };

  const editVariant = (index) => {
    setVariant(variants[index]);
    setEditIndex(index);
    setVariantModalOpen(true);
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
        const response = await getItemSubCategories(value);
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
    try {
      const response = await axiosInstance.post(`${process.env.REACT_APP_URL}/inventory/create-item/${createdBy}`, { ...formValues, variants  });
      setFormValues({ name: "", description: "",  type:"", costPrice: "", sellingPrice: "", ProductHsn: "", qtyType: "", categoryId: "", subcategoryId: "", vendorId: "",  quantity: "", brand: "", manufacturer: "", supplier: "", taxId: "" , selectedTaxTypes: [] });
      setVariants([]); 
      handleReset();
      toast.success(response.message);
    } catch (error) {
      toast.error("Failed to add item. Please try again.");
      console.error(error.message);
    } finally {
      setLoading(false);
    }};

  return (
    <React.Fragment>
      <FetchBrands firmId={firmId} onBrandsFetched={handleBrandsFetched} triggerBrand={triggerBrand}/>
      <FetchManufacturers firmId={firmId} onManufacturersFetched={handleManufacturersFetched} triggerManufacturer={triggerManufacturer}/>
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
                            {categories.length > 0 ? categories.map((category) => (
                              <option key={category._id} value={category._id}>
                                {category.categoryName}
                              </option>
                            )) : <option value="">No Categories Available</option>}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="subcategoryId">Subcategory</Label>
                          <Input type="select" id="subcategoryId" name="subcategoryId" value={formValues.subcategoryId} onChange={handleChange} >
                            <option value="">Select Subcategory</option>
                            {subcategories.length > 0 ? subcategories.map((subcategory) => (
                              <option key={subcategory._id} value={subcategory._id}>  
                                {subcategory.categoryName}
                              </option>
                            )) : <option value="">No Subcategories Available</option>}

                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                          <FormGroup>
                            <Label htmlFor="brand">Brand</Label>
                            <div className="d-flex align-items-center">
                              <select id="brand" name="brand" value={formValues.brand} onChange={handleChange} className="form-control" style={{ flex: 1 }} >
                                <option value="">Select Brand</option>
                               {brands.length > 0 ? brands.map((brand) => (
                                  <option key={brand._id} value={brand._id}>
                                    {brand.name}
                                  </option>
                                )) : <option value="">No Brands Available</option>}
                              </select>
                              {/* <Button color="primary" onClick={toggleBrandModal} style={{ marginLeft: "10px" }} > Add Brand </Button> */}
                              <i className="bx bx-plus" style={{ fontSize: "24px", fontWeight: "bold", cursor: "pointer", backgroundColor:"lightblue" , padding:"2px",marginLeft:"5px" , borderRadius:"5px" }} onClick={toggleBrandModal}></i>
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label htmlFor="manufacturer">Manufacturer</Label>
                            <div className="d-flex align-items-center">
                              <select id="manufacturer" name="manufacturer" value={formValues.manufacturer} onChange={handleChange} className="form-control" style={{ flex: 1 }} >
                                <option value="">Select </option>
                                {manufacturers.length > 0 ? manufacturers.map((manufacturer) => (
                                  <option key={manufacturer._id} value={manufacturer._id}>
                                    {manufacturer.name}
                                  </option>
                                )) : <option value="">No Manufacturers Available</option>}

                              </select>
                              {/* <Button color="primary" onClick={toggleManufacturerModal} style={{ marginLeft: "10px" }} > Add Manufacturer </Button> */}
                                <i className="bx bx-plus" style={{ fontSize: "24px", fontWeight: "bold", cursor: "pointer", backgroundColor:"lightblue" , padding:"2px",marginLeft:"5px" , borderRadius:"5px" }} onClick={toggleManufacturerModal}></i>
                            </div>
                          </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="vendorId">Vendor</Label>
                          {/* <Input type="select" id="vendorId" name="vendorId" value={formValues.vendorId} onChange={handleChange} >
                            <option value="">Select Vendor</option>
                              {vendors.length > 0 ? vendors.map((vendor) => (
                                <option key={vendor._id} value={vendor._id}>
                                  {vendor.name}
                                </option>
                              )) : <option value="">No Vendors Available</option>}


                          </Input> */}
                          <div className="d-flex align-items-center">
                            <select id="vendorId" name="vendorId" value={formValues.vendorId} onChange={handleChange} className="form-control" style={{ flex: 1 }} >
                              <option value="">Select Vendor</option>
                              {vendors.length > 0 ? vendors.map((vendor) => (
                                <option key={vendor._id} value={vendor._id}>
                                  {vendor.name}
                                </option>
                              )) : <option value="">No Vendors Available</option>}
                            </select>
                            <i className="bx bx-plus" style={{ fontSize: "24px", fontWeight: "bold", cursor: "pointer", backgroundColor:"lightblue" , padding:"2px",marginLeft:"5px" , borderRadius:"5px" }} onClick={toggleVendorModal}></i>
                          </div>
                        </FormGroup>
                      </Col>

                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="type">Type</Label>
                          <select id="type" name="type" value={formValues.type} onChange={handleChange} className="form-control">
                            <option value="">Select Type</option>
                            <option value="raw_material">Raw Material</option>
                            <option value="finished_good">Finished Good</option>
                          </select>
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
                          <Label htmlFor="quantity">Quantity</Label>
                          <Input type="number" id="quantity" name="quantity" placeholder="Enter quantity" value={formValues.quantity} onChange={handleChange} />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="qtyType">Quantity Type</Label>
                          <select id="qtyType" name="qtyType" value={formValues.qtyType} onChange={handleChange} className="form-control">
                            <option value="">Select Quantity Type</option>
                            <option value="kg">Kilograms</option>
                            <option value="grams">Grams</option>
                            <option value="pcs">Pieces</option>
                            <option value="litre">Litre</option>
                            <option value="meters">Meters</option>
                            <option value="centimeters">Centimeters</option>
                            <option value="feet">Feet</option>
                          </select>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="tax">Tax</Label>
                          <Input type="select" id="tax" name="tax" value={formValues.taxId} onChange={handleTaxChange}>
                            <option value="">Select Tax</option>
                            {taxes.length > 0 ? taxes.map((tax) => (
                              <option key={tax._id} value={tax._id}>
                                {tax.taxName}
                              </option>
                            )) : <option value="">No Taxes Available</option>}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="ProductHsn">HSN</Label>
                          <Input type="text" id="ProductHsn" name="ProductHsn" placeholder="Enter HSN" value={formValues.ProductHsn} />
                        </FormGroup>
                      </Col>
                      {formValues.taxId && (
                        <Row className="mt-3">
                          <Col md={6}>
                          <FormGroup>
                              <Label>Select Tax Components</Label>
                              <Select
                                  isMulti
                                  name="selectedTaxTypes"
                                  value={formValues.selectedTaxTypes.map((id) => ({
                                    value: id,
                                    label: taxes
                                      .find((tax) => tax.taxRates.some((rate) => rate._id === id))
                                      ?.taxRates.find((rate) => rate._id === id)?.taxType +
                                      " - " +
                                      taxes
                                        .find((tax) => tax.taxRates.some((rate) => rate._id === id))
                                        ?.taxRates.find((rate) => rate._id === id)?.rate +
                                      "%",
                                  }))}
                                  onChange={(selectedOptions) => {
                                    const selectedIds = selectedOptions.map((option) => option.value);
                                    console.log("Selected Tax Type IDs:", selectedIds);

                                    setFormValues({
                                      ...formValues,
                                      selectedTaxTypes: selectedIds,
                                    });
                                  }}
                                  options={taxes
                                    .filter((tax) => tax._id === formValues.taxId)
                                    .flatMap((tax) =>
                                      tax.taxRates.map((taxRate) => ({
                                        value: taxRate._id,
                                        label: `${taxRate.taxType} - ${taxRate.rate}%`,
                                      }))
                                    )}
                                />
                            </FormGroup>
                          </Col>
                        </Row>
                      )}
                    </Row>

                    <VariantModal  isOpen={variantModalOpen} toggleModal={() => setVariantModalOpen(!variantModalOpen)}  variant={variant} handleVariantChange={handleVariantChange} addVariant={addOrUpdateVariant} />
                    <Row className="mt-3">
                      <Col md={12}>
                        <Button className="mx-2" color="primary" onClick={()=>{
                          setVariantModalOpen(true);
                        }}>Add Variant</Button>
                        {/* <Button className="mx-2" color="primary" onClick={toggleBatchModal}>Add Batch</Button> */}
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
        <BrandModal isOpen={modalOpen} toggle={toggleBrandModal} onBrandsFetched={handleBrandsFetched} firmId={firmId} setTriggerBrand={setTriggerBrand}/>
        <ManufacturerModal isOpen={modal} toggle={toggleManufacturerModal} setTriggerManufacurer={setTriggerManufacurer}/>
        <VendorModal
            modalOpen={vendorModalOpen}
            toggleModal={toggleVendorModal}
            vendorData={vendorData}
            handleInputChange={(e) => {
              const { name, value } = e.target;
              if (name in vendorData.address) {
                setVendorData({ ...vendorData, address: { ...vendorData.address, [name]: value } });
              } else {
                setVendorData({ ...vendorData, [name]: value });
              }
            }}
            handleVendorSubmit={async () => {
              try {
                const response = await fetch(`${process.env.REACT_APP_URL}/vendor/create-vendor/${createdBy}`, {
                  method: "POST",
                  headers: { 
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(vendorData),
                });
            
                const result = await response.json();
            
                if (response.ok && result.message === "Vendor created successfully") {
                  console.log("Vendor created successfully");
            
                  await fetchVendors(); 
                  toast.success(result.message);
            
                  setVendorModalOpen(false);
                } else {
                  throw new Error(result.error || "Failed to create vendor");
                }
              } catch (error) {
                console.error(error);
                toast.error("Failed to create vendor.");
              }
            }}
            
            editMode={false}
          />
      </div>
    </React.Fragment>
  );
};

export default InventoryItemForm;
