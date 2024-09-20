import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Card, CardBody, FormText } from 'reactstrap';
import axios from 'axios';

const ProfileSettings = () => {
  const [formData, setFormData] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    phone: '', 
    profilePicture: null, 
    newEmail: '',
    confirmEmail: '',
    newPassword: '',
    confirmPassword: '',
    otp: '',
    emailOtp: '',  
  });

  const [editMode, setEditMode] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
  });

  const [logoPreview, setLogoPreview] = useState(null);
  const [preview, setPreview] = useState(null);

  const authUser = JSON.parse(localStorage.getItem('authUser'));
  const token = JSON.parse(localStorage.getItem("authUser")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/auth/getAccount/${authUser?.response._id}`,);
        const userData = response;
        setFormData({
          ...formData,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phone: userData.mobile,
          profilePicture: userData.avatar,
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
        profilePicture: file,
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
    updatedData.append('phone', formData.phone);
    if (formData.profilePicture instanceof File) {
      updatedData.append('profilePicture', formData.profilePicture);
    }
    try {
     
      const response = await axios.put(
        `${process.env.REACT_APP_URL}/auth/update/${authUser?.response._id}`,
        updatedData,
        config
      );
      toast.success('Profile updated successfully!');
      setFormData({
        ...formData,
        profilePicture: response.avatar,
      });
      setPreview(response.avatar);
    } catch (error) {
      console.error('Failed to update profile', error);
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
          <Row>
            <Col md={6}>
              <Card>
                <CardBody>
                  <h2>Profile Settings</h2>
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
                          <Button color="info" onClick={() => toggleEditMode('firstName')}>
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
                          <Button color="info" onClick={() => toggleEditMode('lastName')}>
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
                          <Button color="info" onClick={() => toggleEditMode('email')}>
                            Edit
                          </Button>
                        </div>
                      )}
                    </FormGroup>

                    {/* Phone */}
                    <FormGroup>
                      <Label for="phone">Phone</Label>
                      {editMode.phone ? (
                        <div className='d-flex align-items-center'>
                          <Input
                            type="text"
                            name="phone"
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            className='flex-grow-1'
                          />
                          <Button color="info" onClick={() => toggleEditMode('phone')} className='ml-2'>
                            Save
                          </Button>
                        </div>
                      ) : (
                        <div className='d-flex align-items-center'>
                          <div className='flex-grow-1'>{formData.phone || 'No phone number set'}</div>
                          <Button color="info" onClick={() => toggleEditMode('phone')}>
                            Edit
                          </Button>
                        </div>
                      )}
                    </FormGroup>
                    <Button color="primary" type="submit">Update Profile</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>

            {/* Profile Picture Section */}
            <Col md={6}>
              <Card>
                <CardBody>
                  <h2>Profile Picture</h2>
                  <Form>
                    <FormGroup>
                      <Label for="profilePicture">Upload Profile Picture</Label>
                      <Input
                        type="file"
                        name="profilePicture"
                        id="profilePicture"
                        onChange={handleFileChange}
                      />
                      {preview && (
                        <div className="mt-2 d-flex justify-content-center">
                          <img src={preview} alt="Profile Preview" className="img-thumbnail" style={{ width: '98px', height: '98.81px' }} />
                        </div>
                      )}
                      <FormText color="muted">
                        Choose a profile picture to upload.
                      </FormText>
                    </FormGroup>
                    <Button color="primary" type="submit">Update Profile Picture</Button>
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
