import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert, Card, CardBody, FormText } from 'reactstrap';

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profilePicture: null
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
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="phone">Phone</Label>
                      <Input
                        type="text"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                      />
                    </FormGroup>
                    <Button color="primary" type="submit">Save Changes</Button>
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
                      <Col md={6}>
                        <FormGroup>
                          <Label for="emailVerification">Email Verification</Label>
                          <div className="d-flex justify-content-center">
                            <Button color="info" onClick={() => alert('Verification email sent!')}>Send Verification Email</Button>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="mobileVerification">Mobile Verification</Label>
                          <div className="d-flex justify-content-center">
                            <Button color="info" onClick={() => alert('Verification SMS sent!')}>Send Verification SMS</Button>
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
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
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ProfileSettings;
