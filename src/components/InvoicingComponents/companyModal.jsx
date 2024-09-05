import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, Col, Row } from 'reactstrap';

const CompanyModal = ({ isOpen, toggle, invoiceData, handleInputChange }) => {
    const modalStyle = {
        maxWidth: '80%', 
        width: '60%'    
    };
    return (
        <Modal isOpen={isOpen} toggle={toggle} style={modalStyle}>
            <ModalHeader style={{textAlign:"center"}} toggle={toggle}>Company Details</ModalHeader>
            <ModalBody>
                <Row>
                    <Col md={6}>
                <FormGroup>
                    <Label for="companyName">Company Name</Label>
                    <Input
                        type="text"
                        name="companyName"
                        id="companyName"
                        value={invoiceData.companyName}
                        onChange={handleInputChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="officeAddress">Company Address</Label>
                    <Input
                        type="text"
                        name="officeAddress"
                        id="officeAddress"
                        value={invoiceData.officeAddress}
                        onChange={handleInputChange}
                        required
                    /></FormGroup>
                <FormGroup>
                    <Label for="companyNearby">Nearby Landmark</Label>
                    <Input
                        type="text"
                        name="companyNearby"
                        id="companyNearby"
                        value={invoiceData.companyNearby}
                        onChange={handleInputChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="companyDistrict">Company District</Label>
                    <Input
                        type="text"
                        name="companyDistrict"
                        id="companyDistrict"
                        value={invoiceData.companyDistrict}
                        onChange={handleInputChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="companyCity">Company City</Label>
                    <Input
                        type="text"
                        name="companyCity"
                        id="companyCity"
                        value={invoiceData.companyCity}
                        onChange={handleInputChange}
                        required
                    />
                </FormGroup>
              
                     </Col>
                        <Col md={6}>
                     <FormGroup>
                    <Label for="companyState">Company State</Label>
                    <Input
                        type="text"
                        name="companyState"
                        id="companyState"
                        value={invoiceData.companyState}
                        onChange={handleInputChange}
                        required
                    />
                     </FormGroup>
                     <FormGroup>
                    <Label for="companyCountry">Company Country</Label>
                    <Input
                        type="text"
                        name="companyCountry"
                        id="companyCountry"
                        value={invoiceData.companyCountry}
                        onChange={handleInputChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="companyPhone">Company Phone</Label>
                    <Input
                        type="text"
                        name="companyPhone"
                        id="companyPhone"
                        value={invoiceData.companyPhone}
                        onChange={handleInputChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="companyEmail">Company Email</Label>
                    <Input
                        type="text"
                        name="companyEmail"
                        id="companyEmail"
                        value={invoiceData.companyEmail}
                        onChange={handleInputChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="companyZip">Company Zip</Label>
                    <Input
                        type="text"
                        name="companyZip"
                        id="companyZip"
                        value={invoiceData.companyZip}
                        onChange={handleInputChange}
                        required
                    />
                     </FormGroup>
                </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggle}>Save</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default CompanyModal;
