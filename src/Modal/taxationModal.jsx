import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Button, Form, } from 'reactstrap';
import axios from 'axios';

function TaxationModal({ isOpen, toggle, config,userId,token, onTaxCreated }) {
  const [taxName, setTaxName] = useState('');
  const [taxRates, setTaxRates] = useState([
    { taxType: 'SGST', rate: 0 },
    { taxType: 'CGST', rate: 0 },
  ]);
 
  const handleRateChange = (index, field, value) => {
    const updatedTaxRates = [...taxRates];
    updatedTaxRates[index][field] = value;
    setTaxRates(updatedTaxRates);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:7200/api/tax/create-tax/${userId}`,
        {
          taxName,
          taxRates,
        },
       config
      );
        onTaxCreated(response.data);
        toggle(); 
    } catch (error) {
      console.error('Error creating tax:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create New Tax</ModalHeader>
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
              <Label for={`taxType${index}`}>{taxRate.taxType}</Label>
              <Input
                type="number"
                id={`rate${index}`}
                value={taxRate.rate}
                onChange={(e) =>
                  handleRateChange(index, 'rate', parseFloat(e.target.value))
                }
                required
              />
            </FormGroup>
          ))}
          <Button type="submit" color="primary">
            Create Tax
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
