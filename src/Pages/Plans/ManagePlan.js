import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input,} from "reactstrap";
import Breadcrumbs from '../../components/Common/Breadcrumb';
import axios from 'axios';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axiosInstance';

const predefinedIcons = ["fas fa-cube", "fas fa-trophy", "fas fa-shield-alt"];

function ManagePlan() {
  const [plansData, setPlansData] = useState([]);
  const [trigger, setTrigger] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [modal, setModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const authuser = JSON.parse(localStorage.getItem("authUser"));
  const token = authuser?.token; 
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/plan/all`, config ).then((response) => {
      setPlansData(response.response); 
    }).catch((error) => {
      toast.error('Error fetching data');
    });
  }, [trigger]);

  const toggleDropdown = (id) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleModal = () => setModal(!modal);

  const handleEdit = (plan) => {
    setSelectedPlan(plan);  
    toggleModal();  
  };
  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this plan?");
    if (confirmed) {
      axios.delete(`${process.env.REACT_APP_URL}/plan/delete/${id}` , config)
        .then((response) => {
          setTrigger(prev => prev + 1);
          toast.success(response.message);
        })
        .catch((error) => {
          toast.error('Error deleting plan');
        });
    }
  };
  const handleUpdate = () => {
       axiosInstance.put(`${process.env.REACT_APP_URL}/plan/update/${selectedPlan._id}`, selectedPlan)
      .then((response) => {
        setTrigger(prev => prev + 1);
        toggleModal();
        // console.log(response.message);
        toast.success(response.message);
      })
      .catch((error) => {
        toast.error('Error updating data');
      });
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedPlan({ ...selectedPlan, [name]: value });
  };

  const handleFirmChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setSelectedPlan((prevState) => ({
        ...prevState,
        maxFirms: parseInt(value, 10),
      }));
    }
  };
  
  const handleIconChange = (iconClass) => {
    setSelectedPlan((prevState) => ({
      ...prevState,
      icon: iconClass,
    }));
  };

  const getDropdownItems = (plan) => (
    <>
      <DropdownItem key="edit" onClick={() => handleEdit(plan)}>Edit</DropdownItem>
      <DropdownItem key="delete" onClick={() => handleDelete(plan._id)}>Delete</DropdownItem>
    </>
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="aaMOBee" breadcrumbItem="Plan Management" />
        <p className='mm-active'>
          This is the Plan Management page.
          Here the plan data table will be fetched and CRUD operations can be performed.
        </p>
        <Col lg={12}>
          <Card>
            <CardBody>
              <div className="table-responsive">
                <Table className="table-bordered mb-0">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Caption</th>
                      <th>Firms</th>
                      <th>Icon</th>
                      <th>Days</th>
                      <th>Price</th>
                      <th>Features</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plansData && plansData.map(plan => (
                      <tr key={plan._id}>
                        <td>{plan.title}</td>
                        <td>{plan.caption}</td>
                        <td>{plan.maxFirms}</td>
                        <td>
                          <div className="avatar-sm">
                            <span className="avatar-title rounded-circle bg-primary">
                              <i className={plan.icon + " font-size-20"}></i>
                            </span>
                          </div>
                        </td>
                        <td>{plan.days}</td>
                        <td>{plan.price}</td>
                        <td>
                          <ul>
                            {plan.features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </td>
                        <td>
                          <Dropdown isOpen={dropdownOpen[plan._id]} toggle={() => toggleDropdown(plan._id)}>
                            <DropdownToggle caret color="info">
                              Actions
                            </DropdownToggle>
                            <DropdownMenu>
                              {getDropdownItems(plan)}
                            </DropdownMenu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </Col>

    
      {/* Edit Modal */}
  <Modal isOpen={modal} toggle={toggleModal}>
    <ModalHeader toggle={toggleModal}>Edit Plan</ModalHeader>
    <ModalBody>
      {selectedPlan && (
        <Form>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              id="title"
              value={selectedPlan.title}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="caption">Caption</Label>
            <Input
              type="text"
              name="caption"
              id="caption"
              value={selectedPlan.caption}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="maxFirms">Max Firms</Label>
            <Input
              type="number"
              name="maxFirms"
              id="maxFirms"
              value={selectedPlan.maxFirms}
              onChange={handleFirmChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="icon">Select an Icon</Label>
            <div className="d-flex flex-wrap">
              {predefinedIcons.map((iconClass, index) => (
                <div
                  key={index}
                  className={`avatar-sm cursor-pointer me-3 mb-3 ${
                    selectedPlan.icon === iconClass ? "bg-primary text-white" : "bg-light"
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
                      color: selectedPlan.icon === iconClass ? "#fff" : "#000",
                    }}
                  ></i>
                </div>
              ))}
            </div>
            {selectedPlan.icon && (
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
                    className={`${selectedPlan.icon} font-size-30`}
                    style={{ color: "#fff" }}
                  ></i>
                </div>
              </div>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="price">Price</Label>
            <Input
              type="number"
              name="price"
              id="price"
              value={selectedPlan.price}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="days">Days</Label>
            <Input
              type="number"
              name="days"
              id="days"
              value={selectedPlan.days}
              onChange={handleChange}
            />
          </FormGroup>
          
          <FormGroup>
          <Label for="features">Features</Label>
          <ul>
            {selectedPlan.features.map((feature, index) => (
              <li key={index}>
                <Input
                  type="text"
                  name={`feature-${index}`} 
                  value={feature}
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: 'features',
                        value: selectedPlan.features.map((f, i) =>
                          i === index ? e.target.value : f
                        ),
                      },
                    })
                  }
                />
              </li>
            ))}
    {/* <li>
      <Input
        type="text"
        name="newFeature"
        placeholder="Add a new feature"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            const newFeature = e.target.value.trim();
            if (newFeature) {
              setSelectedPlan((prev) => ({
                ...prev,
                features: [...prev.features, newFeature],
              }));
              e.target.value = ''; // Clear input after adding
            }
          }
        }}
      />
    </li> */}
  </ul>
</FormGroup>


        </Form>
      )}
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={handleUpdate}>
        Update Plan
      </Button>{' '}
      <Button color="secondary" onClick={toggleModal}>
        Cancel
      </Button>
    </ModalFooter>
  </Modal>

      </div>
    </React.Fragment>
  );
}

export default ManagePlan;
