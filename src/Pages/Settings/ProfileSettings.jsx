import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert, Card, CardBody, FormText } from 'reactstrap';

const ProfileSettings = () => {
  const [logoPreview, setLogoPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: 'Super Admin',
    email: 'master@gmail.com',
    phone: '1234567890',
    profilePicture: null,
    newEmail: '',
    confirmEmail: '',
    newPassword: '',
    confirmPassword: '',
    otp: '',
    emailOtp: ''  // Add state for email OTP
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
      if (e.target.name === "profilePicture") {
        setFormData({
          ...formData,
          profilePicture: file
        });
        setPreview(URL.createObjectURL(file));
      } else if (e.target.name === "companyLogo") {
        setFormData({
          ...formData,
          companyLogo: file
        });
        setLogoPreview(URL.createObjectURL(file));
      }
    }
  };
  const handleEmailOtpSubmit = (e) => {
    e.preventDefault();
    if (formData.emailOtp) {
      setSuccessMessage('Email OTP verified successfully!');
      setErrorMessage('');
    } else {
      setSuccessMessage('');
      setErrorMessage('Invalid OTP!');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('Profile updated successfully!');
    setErrorMessage('');
  };

  const handleEmailChange = (e) => {
    e.preventDefault();
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
                        <div className='d-flex align-items-center'>
                          <Input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className='flex-grow-1'
                          />
                          <Button color="info" onClick={() => toggleEditMode('name')} className='ml-2'>
                            Save
                          </Button>
                        </div>
                      ) : (
                        <div className='d-flex align-items-center'>
                          <div className='flex-grow-1'>{formData.name || 'No name set'}</div>
                          <Button color="info" onClick={() => toggleEditMode('name')}>
                            Edit
                          </Button>
                        </div>
                      )}
                    </FormGroup>
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

  <Col md={6}>
    <Card>
      <CardBody>
        <h2>Company Logo</h2>
        <Form>
          <FormGroup>
            <Label for="companyLogo">Upload Company Logo</Label>
            <Input
              type="file"
              name="companyLogo"
              id="companyLogo"
              onChange={handleFileChange}
            />
            {logoPreview && (
              <div className="mt-2 d-flex justify-content-center">
                <img src={logoPreview} alt="Company Logo Preview" className="img-thumbnail" style={{ width: '200px', height: '200px' }} />
              </div>
            )}
            <FormText color="muted">
              Choose a company logo to upload.
            </FormText>
          </FormGroup>
          <Button color="primary" onClick={() => alert('Company logo updated!')}>Update Company Logo</Button>
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
                  {/* OTP Verification Form */}
                  <Form onSubmit={handleEmailOtpSubmit} className="mt-3">
                    <FormGroup>
                      <Label for="emailOtp">Enter OTP</Label>
                      <Row>
                        <Col xs={9}>
                          <Input
                            type="text"
                            name="emailOtp"
                            id="emailOtp"
                            value={formData.emailOtp}
                            onChange={handleChange}
                            placeholder="Enter the OTP sent to your new email"
                            className="otp-input"
                          />
                        </Col>
                        <Col xs={3}>
                          <Button color="secondary" className="otp-button" type="submit">Verify</Button>
                        </Col>
                      </Row>
                    </FormGroup>
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
                      <Row>
                        <Col xs={9}>
                          <Input
                            type="text"
                            name="otp"
                            id="otp"
                            value={formData.otp}
                            onChange={handleChange}
                            placeholder="Enter the OTP sent to your email"
                            className="otp-input"
                          />
                        </Col>
                        <Col xs={3}>
                          <Button color="secondary" className="otp-button" type="submit">Verify</Button>
                        </Col>
                      </Row>
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
