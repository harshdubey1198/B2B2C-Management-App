import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Card, CardBody, FormText } from 'reactstrap';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';

const ProfileSettings = () => {
  const [formData, setFormData] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    mobile: '', 
    avatar: null, 
  });

  const [editMode, setEditMode] = useState({
    firstName: false,
    lastName: false,
    email: false,
    mobile: false,
  });

  const [preview, setPreview] = useState(null);

  const authUser = JSON.parse(localStorage.getItem('authUser'));
  const token = authUser.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_URL}/auth/getAccount/${authUser?.response._id}`,
        );
        const userData = response;
        setFormData({
          ...formData,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          mobile: userData.mobile,
          avatar: userData.avatar,
        });
        setPreview(userData.avatar);
      } catch (error) {
        toast.error('Failed to load user data');
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        avatar: file,
      });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    updatedData.append('firstName', formData.firstName);
    updatedData.append('lastName', formData.lastName);
    updatedData.append('email', formData.email);
    updatedData.append('mobile', formData.mobile);

    if (formData.avatar instanceof File) {
      updatedData.append('avatar', formData.avatar);
    }

    try {
      const response = await axiosInstance.put(
        `${process.env.REACT_APP_URL}/auth/update/${authUser?.response._id}`,
        updatedData
      );
      toast.success('Profile updated successfully!');
      setPreview(response.avatar); 
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const toggleEditMode = (field) => {
    setEditMode({
      ...editMode,
      [field]: !editMode[field],
    });
  };

  return (
    <React.Fragment>
      <div className='page-content'>
        <Container>
          <Row >
          <Col xs={12} sm={6} md={6} lg={6}>
              <Card>
              <h2 className="card-title-heading">Profile Settings</h2>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    {/* First Name */}
                    <FormGroup>
                      <Label for="firstName">First Name</Label>
                      {editMode.firstName ? (
                        <div className='d-flex align-items-center'>
                          <Input
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Enter your first name"
                            className='flex-grow-1'
                          />
                          <Button color="info" onClick={() => toggleEditMode('firstName')} className='ml-2'>
                            Save
                          </Button>
                        </div>
                      ) : (
                        <div className='d-flex align-items-center'>
                          <div className='flex-grow-1'>{formData.firstName || 'No first name set'}</div>
                          <Button color="primary" onClick={() => toggleEditMode('firstName')}>
                            Edit
                          </Button>
                        </div>
                      )}
                    </FormGroup>

                    {/* Last Name */}
                    <FormGroup>
                      <Label for="lastName">Last Name</Label>
                      {editMode.lastName ? (
                        <div className='d-flex align-items-center'>
                          <Input
                            type="text"
                            name="lastName"
                            id="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Enter your last name"
                            className='flex-grow-1'
                          />
                          <Button color="info" onClick={() => toggleEditMode('lastName')} className='ml-2'>
                            Save
                          </Button>
                        </div>
                      ) : (
                        <div className='d-flex align-items-center'>
                          <div className='flex-grow-1'>{formData.lastName || 'No last name set'}</div>
                          <Button color="primary" onClick={() => toggleEditMode('lastName')}>
                            Edit
                          </Button>
                        </div>
                      )}
                    </FormGroup>

                    {/* Email */}
                    <FormGroup>
                      <Label for="email">Email</Label>
                      {editMode.email ? (
                        <div className='d-flex align-items-center'>
                          <Input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className='flex-grow-1'
                          />
                          <Button color="info" onClick={() => toggleEditMode('email')} className='ml-2'>
                            Save
                          </Button>
                        </div>
                      ) : (
                        <div className='d-flex align-items-center'>
                          <div className='flex-grow-1'>{formData.email || 'No email set'}</div>
                          <Button color="primary" onClick={() => toggleEditMode('email')}>
                            Edit
                          </Button>
                        </div>
                      )}
                    </FormGroup>

                    {/* Mobile */}
                    <FormGroup>
                      <Label for="mobile">Mobile</Label>
                      {editMode.mobile ? (
                        <div className='d-flex align-items-center'>
                          <Input
                            type="text"
                            name="mobile"
                            id="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            placeholder="Enter your mobile number"
                            className='flex-grow-1'
                          />
                          <Button color="info" onClick={() => toggleEditMode('mobile')} className='ml-2'>
                            Save
                          </Button>
                        </div>
                      ) : (
                        <div className='d-flex align-items-center'>
                          <div className='flex-grow-1'>{formData.mobile || 'No mobile number set'}</div>
                          <Button color="primary" onClick={() => toggleEditMode('mobile')}>
                            Edit
                          </Button>
                        </div>
                      )}
                    </FormGroup>
                    <Button color="primary" type="submit" className='mb-1'>Update Profile</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>

            {/* Profile Picture Section */}
            <Col xs={12} sm={6} md={6} lg={6}>
              <Card>
              <h2 class="card-title-heading">Profile Picture</h2>
                <CardBody>                  
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label for="avatar" class="mb-4">Upload Profile Picture</Label>
                      <Input
                        type="file"
                        name="avatar"
                        id="avatar"
                        onChange={handleFileChange}
                      />
                      {preview && (
                        <div className="d-flex justify-content-center text-bg-light border-dashed p-4 my-4">
                          <img src={preview} alt="Profile Preview" className="img-thumbnail" style={{ width: '98px', height: '98.81px' }} />
                        </div>
                      )}
                      <FormText color="muted">
                        Choose a profile picture to upload.
                      </FormText>
                    </FormGroup>
                    <Button color="primary" type="submit" className='my-3'>Update Profile Picture</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ProfileSettings;
