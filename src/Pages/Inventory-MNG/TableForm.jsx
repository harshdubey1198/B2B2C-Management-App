import React, { useState } from "react";
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

const InventoryItemForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    quantity: "",
    price: "",
    category: "",
    supplier: "",
    image: null, // For the image file
    imageUrl: "", // For previewing the uploaded image
    variant: "",
    type: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormValues((prevState) => ({
        ...prevState,
        image: file,
        imageUrl: URL.createObjectURL(file), // Create a URL for previewing
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (checkEmptyFields({
      ...formValues,
      image: formValues.image ? 'Not Empty' : '' // Ensure image is provided
    })) {
      setError("Please fill in all fields and upload an image.");
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const storedData = JSON.parse(localStorage.getItem("inventoryItems")) || [];
      const newItems = {
        ...formValues,
        id: uuidv4(), // Generate a unique ID
        image: formValues.imageUrl // Store image URL (in practice, you might upload the image to a server)
      };
      storedData.push(newItems);
      localStorage.setItem("inventoryItems", JSON.stringify(storedData));
      setSuccess("Item added successfully.");
      setLoading(false);
      setError("");

      setFormValues({
        name: "",
        description: "",
        quantity: "",
        price: "",
        category: "",
        supplier: "",
        image: null,
        imageUrl: "",
        variant: "",
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
                  {error && <Alert color="danger">{error}</Alert>}
                  {success && <Alert color="success">{success}</Alert>}
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
                      <Label htmlFor="price">Price</Label>
                      <Input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Enter price"
                        value={formValues.price}
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
                      <Label htmlFor="variant">Variant</Label>
                      <Input
                        type="text"
                        id="variant"
                        name="variant"
                        placeholder="Enter item variant"
                        value={formValues.variant}
                        onChange={handleChange}
                      />
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
