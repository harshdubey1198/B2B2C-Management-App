import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody, FormGroup, Label, Input, Button } from "reactstrap";
import { checkEmptyFields } from "../Utility/FormValidation";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "react-toastify";
import hsnData from '../../data/hsn.json';
import { mdiDelete } from '@mdi/js';
import Icon from '@mdi/react';


const InventoryItemForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    quantity: "",
    category: "",
    supplier: "",
    hsn: "",
    variants: [],
    type: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [taxationData, setTaxationData] = useState([]);
  const [manualHSN, setManualHSN] = useState(false);

  useEffect(() => {
    const storedTaxationTable = JSON.parse(localStorage.getItem("taxationData")) || [];
    setTaxationData(storedTaxationTable);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (e) => {
    const { value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      description: value,
    }));

    if (!manualHSN) {
      const matchingHSN = hsnData.find((item) => item.description.toLowerCase().includes(value.toLowerCase()));
      setFormValues((prevState) => ({
        ...prevState,
        hsn: matchingHSN ? matchingHSN.hsn : "",
      }));
    }
  };

  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const newVariants = [...formValues.variants];
    newVariants[index] = { ...newVariants[index], [name]: value };
    setFormValues({ ...formValues, variants: newVariants });
  };

  const handleAddVariant = () => {
    setFormValues({
      ...formValues,
      variants: [...formValues.variants, { id: uuidv4(), name: "", price: "", tax: "", quantity: "" }],
    });
  };

  const handleRemoveVariant = (index) => {
    setFormValues({
      ...formValues,
      variants: formValues.variants.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (checkEmptyFields({ formValues })) {
      toast.error("Please fill in all fields.");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      const storedData = JSON.parse(localStorage.getItem("inventoryItems")) || [];
      const newItems = {
        ...formValues,
        id: uuidv4(),
      };
      storedData.push(newItems);
      localStorage.setItem("inventoryItems", JSON.stringify(storedData));
      toast.success("Item added successfully.");
      setLoading(false);

      setFormValues({
        name: "",
        description: "",
        quantity: "",
        category: "",
        supplier: "",
        hsn: "",
        variants: [],
        type: "",
      });
    }, 1000);
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
                    <FormGroup>
                      <Label htmlFor="description">Description</Label>
                      <Input
                        type="textarea"
                        id="description"
                        name="description"
                        placeholder="Enter item description"
                        value={formValues.description}
                        onChange={handleDescriptionChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="hsn">HSN Code</Label>
                      <Input
                        type="text"
                        id="hsn"
                        name="hsn"
                        placeholder="HSN number will be suggested here"
                        value={formValues.hsn}
                        onChange={(e) => {
                          if (manualHSN) {
                            setFormValues((prevState) => ({
                              ...prevState,
                              hsn: e.target.value,
                            }));
                          }
                        }}
                        readOnly={!manualHSN}
                      />
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="checkbox"
                            checked={manualHSN}
                            onChange={() => setManualHSN(!manualHSN)}
                          />{' '}
                          Enter HSN Code Manually
                        </Label>
                      </FormGroup>
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        type="number"
                        id="quantity"
                        name="quantity"
                        placeholder="Enter quantity"
                        value={formValues.quantity}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="category">Category</Label>
                      <Input
                        type="text"
                        id="category"
                        name="category"
                        placeholder="Enter category"
                        value={formValues.category}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="supplier">Supplier</Label>
                      <Input
                        type="text"
                        id="supplier"
                        name="supplier"
                        placeholder="Enter supplier"
                        value={formValues.supplier}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="variants" style={{ marginRight: "20px" }}>Variants</Label>
                      {formValues.variants.map((variant, index) => (
                        <div
                          key={index}
                          className="mb-3 p-3 border rounded position-relative"
                          style={{ border: "1px solid #ddd", padding: "1.5rem" }}
                        >
                          <Button
                            color="danger"
                            onClick={() => handleRemoveVariant(index)}
                            style={{ 
                              position: 'absolute', 
                              top: '7px', 
                              right: '7px', 
                              cursor: 'pointer',
                              zIndex: 10,
                              padding: '0',
                            }}
                          >
                            <Icon path={mdiDelete} size={1} />
                          </Button>
                          <div className="row mt-3">
                            <div className="col-md-6 mb-2">
                              <Input
                                type="text"
                                name="name"
                                placeholder={`Variant Name ${index + 1}`}
                                value={variant.name}
                                onChange={(e) => handleVariantChange(index, e)}
                              />
                            </div>
                            <div className="col-md-6 mb-2">
                              <Input
                                type="number"
                                name="price"
                                placeholder={`Price ${index + 1}`}
                                value={variant.price}
                                onChange={(e) => handleVariantChange(index, e)}
                              />
                            </div>
                            <div className="col-md-6 mb-2">
                              <Input
                                type="number"
                                name="quantity"
                                placeholder={`Quantity ${index + 1}`}
                                value={variant.quantity}
                                onChange={(e) => handleVariantChange(index, e)}
                              />
                            </div>
                            <div className="col-md-6 mb-2">
                              <Input
                                type="select"
                                name="tax"
                                value={variant.tax}
                                onChange={(e) => handleVariantChange(index, e)}
                              >
                                <option value="">Select Tax</option>
                                {taxationData.map((tax) => (
                                  <option key={tax.id} value={tax.rate}>
                                    {tax.name} ({tax.rate}%)
                                  </option>
                                ))}
                              </Input>
                            </div>
                          </div>
                        </div>
                      ))}
                      <Button color="success" onClick={handleAddVariant}>
                        Add Variant
                      </Button>
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="type">Type</Label>
                      <Input
                        type="text"
                        id="type"
                        name="type"
                        placeholder="Enter inventory type"
                        value={formValues.type}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <Button color="primary" type="submit" disabled={loading}>
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
