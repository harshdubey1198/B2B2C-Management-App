import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
} from "reactstrap";
import { checkEmptyFields } from "../Utility/FormValidation";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "react-toastify";

const InventoryItemForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    quantity: "",
    category: "",
    supplier: "",
    image: null,
    imageUrl: "",
    variants: [], // Variants now hold objects with name, price, and tax
    type: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [taxationData, setTaxationData] = useState([]);

  useEffect(() => {
    // Retrieve taxation table from localStorage
    const storedTaxationTable = JSON.parse(localStorage.getItem("taxationData")) || [];
    setTaxationData(storedTaxationTable);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // setError("");
    //toast.error("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormValues((prevState) => ({
        ...prevState,
        image: file,
        imageUrl: URL.createObjectURL(file),
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
      variants: [...formValues.variants, { name: "", price: "", tax: "" }] 
    });
  };

  const handleRemoveVariant = (index) => {
    setFormValues({ 
      ...formValues, 
      variants: formValues.variants.filter((_, i) => i !== index) 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // setError("");
    // setSuccess("");
    //toast.error("");
    toast.success("");

    if (checkEmptyFields({
      ...formValues,
      image: formValues.image ? 'Not Empty' : ''
    })) {
      toast.error("Please fill in all fields and upload an image.");
      // setError("Please fill in all fields and upload an image.");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      const storedData = JSON.parse(localStorage.getItem("inventoryItems")) || [];
      const newItems = {
        ...formValues,
        id: uuidv4(),
        image: formValues.imageUrl
      };
      storedData.push(newItems);
      localStorage.setItem("inventoryItems", JSON.stringify(storedData));
      // setSuccess("Item added successfully.");
      toast.success("Item added successfully.");
      setLoading(false);
      // setError("");
      //toast.error("");

      setFormValues({
        name: "",
        description: "",
        quantity: "",
        category: "",
        supplier: "",
        image: null,
        imageUrl: "",
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
              <Card className="mt-5">
                <CardBody>
                  <h4 className="font-size-18 text-muted mt-2 text-center">
                    Add Inventory Item
                  </h4>
                  {/* {error && <Alert color="danger">{error}</Alert>}
                  {success && <Alert color="success">{success}</Alert>} */}
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
                        onChange={handleChange}
                      />
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
                      <Label htmlFor="image">Item Image</Label>
                      <Input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleFileChange}
                      />
                      {formValues.imageUrl && (
                        <img
                          src={formValues.imageUrl}
                          alt="Item Preview"
                          className="img-fluid mt-2"
                          style={{ maxWidth: '150px' }}
                        />
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="variants">Variants</Label>
                      {formValues.variants.map((variant, index) => (
                        <div key={index} className="d-flex align-items-center mb-2">
                          <Input
                            type="text"
                            name="name"
                            placeholder={`Variant Name ${index + 1}`}
                            value={variant.name}
                            onChange={(e) => handleVariantChange(index, e)}
                          />
                          <Input
                            type="number"
                            name="price"
                            placeholder={`Price ${index + 1}`}
                            value={variant.price}
                            onChange={(e) => handleVariantChange(index, e)}
                            className="ml-2"
                          />
                          <Input
                            type="select"
                            name="tax"
                            value={variant.tax}
                            onChange={(e) => handleVariantChange(index, e)}
                            className="ml-2"
                          >
                            <option value="">Select Tax</option>
                            {taxationData.map((tax) => (
                              <option key={tax.id} value={tax.rate}>
                                {tax.name} ({tax.rate}%)
                              </option>
                            ))}
                          </Input>
                          <Button
                            color="danger"
                            className="ml-2"
                            onClick={() => handleRemoveVariant(index)}
                          >
                            Remove
                          </Button>
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
