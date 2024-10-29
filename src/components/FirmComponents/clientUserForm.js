import React, { useEffect, useState } from "react";
import { Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import axios from "axios";
import { checkEmptyFields, validateEmail, validatePhone } from "../../Pages/Utility/FormValidation";
import { toast } from "react-toastify";
import AddressForm from "./adressForm";

const ClientUserCreateForm = ({ isOpen, toggle, setTrigger, selectedFirm, formValues, setFormValues, availableRoles }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [firms, setFirms] = useState([]);
  const [show, setShow] = useState({
    password: false,
    confirmPassword: false,
  });
  const [address, setAddress] = useState({});
  const authuser = JSON.parse(localStorage.getItem("authUser"));

  const handleFirmChange = (e) => {
    const selectedFirm = firms.find((firm) => firm.companyTitle === e.target.value);
    if (selectedFirm) {
      setFormValues((prevState) => ({
        ...prevState,
        firmName: e.target.value,
        firmId: selectedFirm._id,
      }));
    }
  };
  const firmId = formValues.firmId;
  useEffect(() => {
    if (authuser) {
      axios.get(`${process.env.REACT_APP_URL}/auth/getCompany/${authuser?.response._id}`)
        .then((response) => {
          setFirms(response);  
          console.log(response, "Firms");
        })
        .catch((error) => {
          console.log(error, "Error getting firms");
        });
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // if (checkEmptyFields(formValues)) {
    //   setError("Fill All the Fields");
    //   toast.error("Fill All the Fields");
    //   return;
    // }
    if (!formValues.firstName || !formValues.lastName || !formValues.email || !formValues.mobile || !formValues.password || !formValues.confirmPassword || !formValues.birthday || !formValues.role )
    {
      setError("Fill All the Fields");
      toast.error("Fill All the Fields");
      return;
    }


    if (!validateEmail(formValues.email)) {
      setError("Invalid Email");
      toast.error("Invalid Email");
      return;
    }
    
    if (!validatePhone(formValues.mobile)) {
      setError("Invalid Phone Number");
      toast.error("Invalid Phone Number");
      return;
    }
    if (formValues.password !== formValues.confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    if (Object.keys(address).length === 0) {
      setError("Address is required");
      toast.error("Address is required");
      return;
    }
    if (!formValues.firmId) {
      setError("No firm selected");
      toast.error("No firm selected");
      return;
    }

    axios
      .post(`${process.env.REACT_APP_URL}/auth/createUser/${firmId}`, {
        ...formValues,
        address
      })
      .then((response) => {
        toast.success("User added successfully.");
        setError("");
        setTrigger((prev) => prev + 1);
        setFormValues({
          firstName: "",
          lastName: "",
          email: "",
          mobile: "",
          password: "",
          confirmPassword: "",
          birthday: "",
          gender: "",
          role: "",
        });
        setAddress({});
        toggle();
      })
      .catch((error) => {
        console.log("Full error object:", error);
        // toast.error("Error creating user");
      });
  };


  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add New User</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <Row>
            <FormGroup>
              <Label>Firm Name</Label>
              <Input
                type="select"
                name="firmName"
                value={formValues.firmName} 
                onChange={handleFirmChange}
              >
                <option value="">Select Firm</option>
                {firms.map((firm) => (
                  <option key={firm._id} value={firm.companyTitle}>
                    {firm.companyTitle}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>First Name</Label>
                <Input
                  name="firstName"
                  value={formValues.firstName}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup className="position-relative">
                <Label>Password</Label>
                <Input
                  name="password"
                  type={show.password ? "text" : "password"}
                  value={formValues.password}
                  onChange={handleChange}
                />
                <button
                  className="cursor btn btn-link position-absolute end-0"
                  style={{ top: "74%", transform: "translateY(-50%)" }}
                  onClick={() =>
                    setShow((prevState) => ({
                      ...prevState,
                      password: !prevState.password,
                    }))
                  }
                  type="button"
                >
                  <i className={`mdi mdi-eye${show.password ? "-off" : ""}`}></i>
                </button>
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  name="email"
                  type="email"
                  value={formValues.email}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Date of Birth</Label>
                <Input
                  name="birthday"
                  type="date"
                  value={formValues.birthday}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label>Last Name</Label>
                <Input
                  name="lastName"
                  value={formValues.lastName}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup className="position-relative">
                <Label>Confirm Password</Label>
                <Input
                  name="confirmPassword"
                  type={show.confirmPassword ? "text" : "password"}
                  value={formValues.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  className="cursor btn btn-link position-absolute end-0"
                  style={{ top: "74%", transform: "translateY(-50%)" }}
                  onClick={() =>
                    setShow((prevState) => ({
                      ...prevState,
                      confirmPassword: !prevState.confirmPassword,
                    }))
                  }
                  type="button"
                >
                  <i className={`mdi mdi-eye${show.confirmPassword ? "-off" : ""}`}></i>
                </button>
              </FormGroup>
              <FormGroup>
                <Label>Gender</Label>
                <Input
                  type="select"
                  name="gender"
                  value={formValues.gender}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="prefer not to say">Other</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label>Mobile</Label>
                <Input
                  name="mobile"
                  value={formValues.mobile}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Role</Label>
                <Input
                  type="select"
                  name="role"
                  value={formValues.role}
                  onChange={handleChange}
                >
                  <option value="">Select Role</option>
                  {availableRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
          </Row>

          <AddressForm
            address={address}
            handleAddressChange={handleAddressChange}
          />

          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </ModalFooter>
        </form>
        
      </ModalBody>
    </Modal>
  );
};

export default ClientUserCreateForm;
