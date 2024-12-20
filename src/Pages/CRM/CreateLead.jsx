import React, { useState } from "react";
import { Row, Col, Form, FormGroup, Label, Input, Button, Card, CardBody } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { addLead } from "../../apiServices/service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CreateLead() {
  const navigate = useNavigate();
  const [lead, setLead] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    platform: "",
    adName: "",
    adId: "",
    status: "New",
  });
  const [additionalFields, setAdditionalFields] = useState([]);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLead({ ...lead, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setLead({ ...lead, [name]: checked });
  };

  const handleAddField = () => {
    setAdditionalFields([...additionalFields, { key: "", value: "" }]);
  };

  const handleAdditionalFieldChange = (index, type, value) => {
    const fields = [...additionalFields];
    fields[index][type] = value;
    setAdditionalFields(fields);
  };

  const handleRemoveField = (index) => {
    const fields = additionalFields.filter((_, i) => i !== index);
    setAdditionalFields(fields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Merge additional fields into the lead object
      const additionalData = additionalFields.reduce((acc, field) => {
        if (field.key) acc[field.key] = field.value;
        return acc;
      }, {});
      const data = { ...lead, ...additionalData };
      const result = await addLead(data);
      setMessage(result.message);
      toast.success(result.message);
        setLead({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            platform: "",
            isOrganic: false,
            adName: "",
            adId: "",
            status: "New",
        });
        //clear additional fields
        setAdditionalFields([]);

    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="CRM" breadcrumbItem="Create Lead" />
        <div className="button-panel">
            <button className="btn btn-primary" onClick={() => {
                navigate('/crm/all-leads');
                }}>Back</button>
        </div>
        <Card>
            <CardBody>
            <Row className="justify-content-center">
          <Col md={8}>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="firstName">First Name</Label>
                    <Input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={lead.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="lastName">Last Name</Label>
                    <Input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={lead.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={lead.email}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="phoneNumber">Phone Number</Label>
                    <Input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={lead.phoneNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="platform">Platform</Label>
                    <Input
                      type="text"
                      id="platform"
                      name="platform"
                      value={lead.platform}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="adName">Ad Data</Label>
                    <Input
                      type="text"
                      id="adName"
                      name="adName"
                      value={lead.adName}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="adId">Ad ID</Label>
                    <Input
                      type="text"
                      id="adId"
                      name="adId"
                      value={lead.adId}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col>
                  <h5>Additional Fields</h5>
                  {additionalFields.map((field, index) => (
                    <Row key={index} className="mb-2">
                      <Col md={5}>
                        <Input
                          type="text"
                          placeholder="Key"
                          value={field.key}
                          onChange={(e) =>
                            handleAdditionalFieldChange(index, "key", e.target.value)
                          }
                        />
                      </Col>
                      <Col md={5}>
                        <Input
                          type="text"
                          placeholder="Value"
                          value={field.value}
                          onChange={(e) =>
                            handleAdditionalFieldChange(index, "value", e.target.value)
                          }
                        />
                      </Col>
                      <Col md={2}>
                        <Button
                          color="danger"
                          onClick={() => handleRemoveField(index)}
                        >
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  ))}
                  <Button color="secondary" onClick={handleAddField}>
                    Add Field
                  </Button>
                </Col>
              </Row>

              <Button color="primary" type="submit" className="mt-4">
                Submit
              </Button>
            </Form>
            {/* {message && <p className="mt-3">{message}</p>} */}
          </Col>
        </Row>
            </CardBody>
        </Card>
      </div>
    </React.Fragment>
  );
}

export default CreateLead;
