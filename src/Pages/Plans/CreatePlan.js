import axios from "axios";
import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody, FormGroup, Label, Input, Button, Alert,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { toast } from "react-toastify";

const predefinedFeatures = [
  "Dashboard", "Profile", "Inventory", "User Management", "Item Configuration"
];

const predefinedIcons = ["fas fa-cube", "fas fa-trophy", "fas fa-shield-alt"];

function CreatePlan() {
  document.title = "Plan Form";
  const authuser = JSON.parse(localStorage.getItem("authUser"));
  console.log(authuser?.response._id, "authuser");
  const [formValues, setFormValues] = useState({
    title: "",
    caption: "",
    icon: "",
    price: "",
    features: [],
    maxFirms: "",
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
    // setError("");
    //toast.error("");
  };

  const handleFeatureChange = (e) => {
    const value = e.target.value;
    if (value && !formValues.features.includes(value)) {
      setFormValues((prevState) => ({
        ...prevState,
        features: [...prevState.features, value],
      }));
    }
  };

  const handleIconChange = (iconClass) => {
    setFormValues((prevState) => ({
      ...prevState,
      icon: iconClass,
    }));
  };

  const handleRemoveFeature = (index) => {
    const newFeatures = formValues.features.filter((_, i) => i !== index);
    setFormValues((prevState) => ({
      ...prevState,
      features: newFeatures,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // setError("");
    // setSuccess("");
    //toast.error("");
    toast.success("");

    // Basic validation
    if (
      !formValues.title ||
      !formValues.caption ||
      !formValues.icon ||
      !formValues.price ||
      formValues.features.length === 0 ||
      !formValues.maxFirms
    ) {
      // setError("Please fill in all fields.");
      toast.error("Please fill in all fields.");
      setLoading(false);
      return;
    }

    // Simulate API call
    axios
      .post(`${process.env.REACT_APP_URL}/plan/create/${authuser?.response._id}`, formValues)
      .then((response) => {
        // setSuccess("Plan added successfully.");
        toast.success("Plan added successfully.");
        console.log(response.data);
        setFormValues({
          title: "",
          caption: "",
          icon: "",
          price: "",
          features: [],
          maxFirms: "",
        });
      })
      .catch((error) => {
        // setError(error.response?.data?.message || "An error occurred.");
        toast.error(error.response?.data?.message || "An error occurred.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="aaMOBee" breadcrumbItem="Plan Management" />
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} md={10}>
              <Card className="mt-5">
                <CardBody>
                  <h4 className="font-size-18 text-muted mt-2 text-center">
                    Create Plan
                  </h4>
                  {/* {error && <Alert color="danger">{error}</Alert>}
                  {success && <Alert color="success">{success}</Alert>} */}
                  <form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter plan title"
                        value={formValues.title}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="caption">Caption</Label>
                      <Input
                        type="text"
                        id="caption"
                        name="caption"
                        placeholder="Enter plan caption"
                        value={formValues.caption}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="icon">Select an Icon</Label>
                      <div className="d-flex flex-wrap">
                        {predefinedIcons.map((iconClass, index) => (
                          <div
                            key={index}
                            className={`avatar-sm cursor-pointer me-3 mb-3 ${
                              formValues.icon === iconClass
                                ? "bg-primary text-white"
                                : "bg-light"
                            }`}
                            onClick={() => handleIconChange(iconClass)}
                            style={{
                              borderRadius: "50%",
                              padding: "10px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <i
                              className={`${iconClass} font-size-20`}
                              style={{
                                color:
                                  formValues.icon === iconClass
                                    ? "#fff"
                                    : "#000",
                              }}
                            ></i>
                          </div>
                        ))}
                      </div>
                      {formValues.icon && (
                        <div className="mt-2">
                          <p>Selected Icon:</p>
                          <div
                            className="avatar-sm bg-primary"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: "50%",
                              padding: "10px",
                            }}
                          >
                            <i
                              className={`${formValues.icon} font-size-30`}
                              style={{ color: "#fff" }}
                            ></i>
                          </div>
                        </div>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="price">Price per 3 Months</Label>
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
                      <Label htmlFor="features">Features</Label>
                      <Input
                        type="select"
                        id="features"
                        name="features"
                        onChange={handleFeatureChange}
                        value=""
                      >
                        <option value="" disabled>
                          Select a feature
                        </option>
                        {predefinedFeatures.map((feature, index) => (
                          <option key={index} value={feature}>
                            {feature}
                          </option>
                        ))}
                      </Input>
                      <div className="mt-2">
                        {formValues.features.map((feature, index) => (
                          <div
                            key={index}
                            className="d-flex align-items-center mb-2"
                          >
                            <span>{feature}</span>
                            <Button
                              color="danger"
                              size="sm"
                              onClick={() => handleRemoveFeature(index)}
                              className="ms-2"
                            >
                              &times;
                            </Button>
                          </div>
                        ))}
                      </div>
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="maxFirms">Max Firms</Label>
                      <Input
                        type="number"
                        id="maxFirms"
                        name="maxFirms"
                        placeholder="Enter maximum number of firms"
                        value={formValues.maxFirms}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <Button color="primary" type="submit" disabled={loading}>
                      {loading ? "Adding..." : "Add Plan"}
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
}

export default CreatePlan;
