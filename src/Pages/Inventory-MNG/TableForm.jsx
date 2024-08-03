import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { checkEmptyFields } from '../Utility/FormValidation';

const InventoryItemForm = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    quantity: '',
    price: '',
    category: '',
    supplier: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if(checkEmptyFields(formValues)){
      setError('Please fill in all fields');
    }

    // Simulate API call
    setTimeout(() => {
      setSuccess('Item added successfully.');
      setLoading(false);
      setError('')
    }, 1000);
  };

  console.log(formValues, "formvalues")

  return (
    <React.Fragment>
      <div className='page-content'>
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} md={10}>
              <Card className="mt-5">
                <CardBody>
                  <h4 className="font-size-18 text-muted mt-2 text-center">Add Inventory Item</h4>
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
                    <Button color="primary" type="submit" disabled={loading}>
                      {loading ? 'Adding...' : 'Add Item'}
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

export default InventoryItemForm;
