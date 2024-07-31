import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert, Card, CardBody, FormText } from 'reactstrap';

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    name: 'Super Admin',
    email: 'master@gmail.com',
    phone: '1234567890',
    profilePicture: null,
    newEmail: '',
    confirmEmail: '',
    newPassword: '',
    confirmPassword: '',
    otp: ''
  });

  const [editMode, setEditMode] = useState({
    name: false,
    email: false,
    phone: false
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        profilePicture: file
      });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setSuccessMessage('Profile updated successfully!');
    setErrorMessage('');
  };

  const handleEmailChange = (e) => {
    e.preventDefault();
    // Handle email change logic here
    if (formData.newEmail === formData.confirmEmail) {
      setSuccessMessage('Verification email sent for email change!');
      setErrorMessage('');
    } else {
      setSuccessMessage('');
      setErrorMessage('Emails do not match!');
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Handle password change logic here
    if (formData.newPassword === formData.confirmPassword) {
      setSuccessMessage('Password change requested. Please check your email for the OTP.');
      setErrorMessage('');
    } else {
      setSuccessMessage('');
      setErrorMessage('Passwords do not match!');
    }
  };

  const toggleEditMode = (field) => {
    setEditMode({
      ...editMode,
      [field]: !editMode[field]
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
                  {successMessage && <Alert color="success">{successMessage}</Alert>}
                  {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label for="name">Name</Label>
                      {editMode.name ? (
                       <> <Input
                          type="text"
                          name="name"
                          id="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                        />
                        <Button color="info" onClick={() => toggleEditMode('name')}>
                            Save
                            </Button>
                        </>
                      ) : (
                        <Row md={12} className='flex'>
                        <div className='d-flex p-0 col-md-8 text-center align-items-center justify-content-center'>{formData.name || 'No name set'}</div>
                        <Button className="col-md-4" color="info" onClick={() => toggleEditMode('name')}>
                            Edit
                          </Button>
                        </Row>
                      )}
                     
                    </FormGroup>
                    <FormGroup>
                      <Label for="email">Email</Label>
                      {editMode.email ? (
                        <>
                          <Input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                          />
                          <Button color="info" onClick={() => toggleEditMode('email')}>
                            Save
                          </Button>
                        </>
                      ) : (
                        <Row md={12} className='flex'>
                          <div className='d-flex p-0 col-md-8 text-center align-items-center justify-content-center' >{formData.email || 'No email set'}</div>
                          <Button className="col-md-4" color="info" onClick={() => toggleEditMode('email')}>
                            Edit
                          </Button>
                        </Row>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="phone">Phone</Label>
                      {editMode.phone ? (
                        <Row md={12} className='flex'>
                          <Input
                            type="text"
                            name="phone"
                            id="phone"
                            className='col-md-8'
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                          />
                          <Button color="info"  className="col-md-4" onClick={() => toggleEditMode('phone')}>
                            Save
                          </Button>
                        </Row>
                      ) : (
                        <Row md={12} className='flex'>
                          <div className='d-flex p-0 col-md-8 text-center align-items-center justify-content-center' >{formData.phone || 'No phone number set'}</div>
                          <Button className="col-md-4" color="info" onClick={() => toggleEditMode('phone')}>
                            Edit
                          </Button>
                        </Row>
                      )}
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <CardBody>
                  <h2>Account Verification</h2>
                  <Form>
                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <Label for="emailVerification">Email Verification</Label>
                          <div className="d-flex justify-content-center">
                            <Button color="info" onClick={() => alert('Verification email sent!')}>Send Verification Email</Button>
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <Label for="mobileVerification">Mobile Verification</Label>
                          <div className="d-flex justify-content-center">
                            <Button color="info" onClick={() => alert('Verification SMS sent!')}>Send Verification SMS</Button>
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <Label for="twoFactorAuth">Two-Factor Authentication</Label>
                          <div className="d-flex justify-content-center">
                            <Button color="info" onClick={() => alert('Two-factor authentication setup!')}>Setup 2FA</Button>
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
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
                          <img src={preview} alt="Profile Preview" className="img-thumbnail" style={{ width: '200px', height: '200px' }} />
                        </div>
                      )}
                      <FormText color="muted">
                        Choose a profile picture to upload.
                      </FormText>
                    </FormGroup>
                    <Button color="primary" onClick={() => alert('Profile picture updated!')}>Update Profile Picture</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Card>
                <CardBody>
                  <h2>Email Change</h2>
                  <Form onSubmit={handleEmailChange}>
                    <FormGroup>
                      <Label for="newEmail">New Email</Label>
                      <Input
                        type="email"
                        name="newEmail"
                        id="newEmail"
                        value={formData.newEmail}
                        onChange={handleChange}
                        placeholder="Enter your new email"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="confirmEmail">Confirm New Email</Label>
                      <Input
                        type="email"
                        name="confirmEmail"
                        id="confirmEmail"
                        value={formData.confirmEmail}
                        onChange={handleChange}
                        placeholder="Confirm your new email"
                      />
                    </FormGroup>
                    <Button color="primary" type="submit">Send OTP to New Email</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <CardBody>
                  <h2>Password Change</h2>
                  <Form onSubmit={handlePasswordChange}>
                    <FormGroup>
                      <Label for="newPassword">New Password</Label>
                      <Input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="Enter your new password"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="confirmPassword">Confirm Password</Label>
                      <Input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your new password"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="otp">OTP</Label>
                      <Input
                        type="text"
                        name="otp"
                        id="otp"
                        value={formData.otp}
                        onChange={handleChange}
                        placeholder="Enter the OTP sent to your email"
                      />
                    </FormGroup>
                    <Button color="primary" type="submit">Change Password</Button>
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
