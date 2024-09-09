import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, Col, Row } from 'reactstrap';

const CompanyModal = ({ isOpen, toggle, invoiceData, handleInputChange, handleAddressChange, addAddress, removeAddress }) => {
    const modalStyle = {
        maxWidth: '80%',
        width: '60%'
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle} style={modalStyle}>
            <ModalHeader style={{ textAlign: "center" }} toggle={toggle}>Company Details</ModalHeader>
            <ModalBody>
                {invoiceData.companyAddresses.map((address, index) => (
                    <div key={index}>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for={`h_no_${index}`}>House Number</Label>
                                    <Input
                                        type="text"
                                        name="h_no"
                                        id={`h_no_${index}`}
                                        value={address.h_no}
                                        onChange={(e) => handleAddressChange(index, e)}
                                        required
                                        readOnly
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for={`nearby_${index}`}>Nearby Landmark</Label>
                                    <Input
                                        type="text"
                                        name="nearby"
                                        id={`nearby_${index}`}
                                        value={address.nearby}
                                        onChange={(e) => handleAddressChange(index, e)}
                                        required
                                        readOnly

                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for={`zip_code_${index}`}>Zip Code</Label>
                                    <Input
                                        type="text"
                                        name="zip_code"
                                        id={`zip_code_${index}`}
                                        value={address.zip_code}
                                        onChange={(e) => handleAddressChange(index, e)}
                                        required
                                        readOnly

                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for={`district_${index}`}>District</Label>
                                    <Input
                                        type="text"
                                        name="district"
                                        id={`district_${index}`}
                                        value={address.district}
                                        onChange={(e) => handleAddressChange(index, e)}
                                        required
                                        readOnly
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for={`city_${index}`}>City</Label>
                                    <Input
                                        type="text"
                                        name="city"
                                        id={`city_${index}`}
                                        value={address.city}
                                        onChange={(e) => handleAddressChange(index, e)}
                                        required
                                        readOnly
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for={`state_${index}`}>State</Label>
                                    <Input
                                        type="text"
                                        name="state"
                                        id={`state_${index}`}
                                        value={address.state}
                                        onChange={(e) => handleAddressChange(index, e)}
                                        required
                                        readOnly
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for={`country_${index}`}>Country</Label>
                                    <Input
                                        type="text"
                                        name="country"
                                        id={`country_${index}`}
                                        value={address.country}
                                        onChange={(e) => handleAddressChange(index, e)}
                                        required
                                        readOnly
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        {index > 0 && (
                            <Button color="danger" onClick={() => removeAddress(index)} className="mb-3">
                                Remove Address
                            </Button>
                        )}
                        {/* <hr /> */}
                    </div>
                ))}
                {/* <Button color="primary" onClick={addAddress} className="mb-3">
                    Add Another Address
                </Button> */}
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggle}>Save</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default CompanyModal;
