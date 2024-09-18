import React, { useState } from "react";
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
    itemName: "",
    itemDescription: "",
    costPrice: "",
    sellingPrice: "",
    ProductsHsn: "",
    unitType: "",
    categoryId: "",
    subcategoryId: "",
    quantityInStock: "",
    reorderLevel: "",
    variants: [],
  });

  const [loading, setLoading] = useState(false);
  const [manualHSN, setManualHSN] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCategory = (e) => {
    const { value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      categoryId: value,
    }));

    if (!manualHSN) {
      const matchingHSN = hsnData.find((item) => item.description.toLowerCase().includes(value.toLowerCase()));
      setFormValues((prevState) => ({
        ...prevState,
        ProductsHsn: matchingHSN ? matchingHSN.hsn : "",
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
      variants: [...formValues.variants, { id: uuidv4(), variantName: "", sku: "", quantityInStock: "" }],
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
        itemName: "",
        itemDescription: "",
        costPrice: "",
        sellingPrice: "",
        ProductsHsn: "",
        unitType: "",
        categoryId: "",
        subcategoryId: "",
        quantityInStock: "",
        reorderLevel: "",
        variants: [],
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
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="itemName">Item Name</Label>
                          <Input
                            type="text"
                            id="itemName"
                            name="itemName"
                            placeholder="Enter item name"
                            value={formValues.itemName}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="categoryId">Category</Label>
                          <Input
                            type="text"
                            id="categoryId"
                            name="categoryId"
                            placeholder="Enter category"
                            value={formValues.categoryId}
                            onChange={handleCategory}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      {/* <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="ProductsHsn">HSN Code</Label>
                          <Input
                            type="text"
                            id="ProductsHsn"
                            name="ProductsHsn"
                            placeholder="HSN number will be suggested here"
                            value={formValues.ProductsHsn}
                            onChange={(e) => {
                              if (manualHSN) {
                                setFormValues((prevState) => ({
                                  ...prevState,
                                  ProductsHsn: e.target.value,
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
                      </Col> */}
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="itemDescription">Item Description</Label>
                          <Input
                            type="text"
                            id="itemDescription"
                            name="itemDescription"
                            placeholder="Enter item description"
                            value={formValues.itemDescription}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="subcategoryId">Sub Category</Label>
                          <Input
                            type="text"
                            id="subcategoryId"
                            name="subcategoryId"
                            placeholder="Enter sub category"
                            value={formValues.subcategoryId}
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
                          <Label htmlFor="quantityInStock">Quantity in Stock</Label>
                          <Input
                            type="number"
                            id="quantityInStock"
                            name="quantityInStock"
                            placeholder="Enter quantity in stock"
                            value={formValues.quantityInStock}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="unitType">Unit Type</Label>
                          <Input
                            type="select"
                            id="unitType"
                            name="unitType"
                            value={formValues.unitType}
                            onChange={handleChange}
                          >
                            <option value="">Select Unit Type</option>
                            <option value="litres">Litres</option>
                            <option value="kg">Kg</option>
                            <option value="packets">Packets</option>
                            <option value="pieces">Pieces</option>
                            <option value="single unit">Single Unit</option>
                            <option value="gm">Grams</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="Manufacturer" >Manufacturer</Label>
                          <Input
                            type="text"
                            id="Manufacturer"
                            name="Manufacturer"
                            placeholder="Enter Manufacturer"
                            
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="Brand" >Brand</Label>
                          <Input
                            type="text"
                            id="Brand"
                            name="Brand"
                            placeholder="Enter Brand"
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