import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Button, Form } from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

function TaxationModal({ isOpen, toggle, config, userId, tax, onTaxCreatedOrUpdated }) {
  const [taxName, setTaxName] = useState('');
  const [taxRates, setTaxRates] = useState([
    { taxType: '', rate: 0 },
  ]);

  useEffect(() => {
    if (tax) {
      setTaxName(tax.taxName);
      setTaxRates(tax.taxRates);
    } else {
      setTaxName('');
      setTaxRates([
        { taxType: '', rate: 0 },
      ]);
    }
  }, [tax]);

  const handleRateChange = (index, field, value) => {
    const updatedTaxRates = [...taxRates];
    updatedTaxRates[index][field] = value;
    setTaxRates(updatedTaxRates);
  };

  const handleAddTaxRate = () => {
    setTaxRates([...taxRates, { taxType: '', rate: 0 }]);
  };

  const handleRemoveTaxRate = (index) => {
    const updatedTaxRates = taxRates.filter((_, i) => i !== index);
    setTaxRates(updatedTaxRates);
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = tax 
        ? `${process.env.REACT_APP_URL}/tax/update-tax` 
        : `${process.env.REACT_APP_URL}/tax/create-tax/${userId}`;
      const method = tax ? 'put' : 'post';
      const payload = tax 
        ? { taxId: tax._id, updateData: { taxName, taxRates }, userId }
        : { taxName, taxRates };

      const response = await axios[method](endpoint, payload, config);
      onTaxCreatedOrUpdated(response.data);
      toggle();
      toast.success(response.message);
    } catch (error) {
      console.error('Error creating or updating tax:', error);
      toast.error('Failed to save tax');
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{tax ? 'Update' : 'Create'} Tax</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="taxName">Tax Name</Label>
            <Input
              type="text"
              id="taxName"
              value={taxName}
              onChange={(e) => setTaxName(e.target.value)}
              required
            />
          </FormGroup>
          {taxRates.map((taxRate, index) => (
            <FormGroup key={index}>
              <Label for={`taxType${index}`}>Tax Type</Label>
              <Input
                type="text"
                id={`taxType${index}`}
                value={taxRate.taxType}
                onChange={(e) => handleRateChange(index, 'taxType', e.target.value)}
                required
              />
              <Label for={`rate${index}`}>Rate (%)</Label>
              <Input
                type="number"
                id={`rate${index}`}
                value={taxRate.rate}
                onChange={(e) => handleRateChange(index, 'rate', parseFloat(e.target.value))}
                required
              />
            </FormGroup>
          ))}
          <Button className="mx-1" color="info" onClick={handleAddTaxRate} style={{ marginBottom: '10px' }}>
            Add Tax Rate
          </Button>
          <Button className="mx-1" color="danger" onClick={() => handleRemoveTaxRate(taxRates.length - 1)} style={{ marginBottom: '10px' }}>
            Remove Tax Rate
            </Button>
          <Button className="mx-1" type="submit" color="primary" style={{ marginBottom: '10px' }}>
            {tax ? 'Update' : 'Create'} Tax
          </Button>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default TaxationModal;
