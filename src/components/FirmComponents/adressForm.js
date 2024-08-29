import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

const AddressForm = ({ address, index, handleAddressChange }) => {
    return (
        <div className="mb-3">
            <h5>Address {index + 1}</h5>
            <FormGroup>
                <Label for={`h_no${index}`}>House Number</Label>
                <Input
                    type="text"
                    name="h_no"
                    id={`h_no${index}`}
                    value={address.h_no || ''}
                    placeholder='House Number'
                    onChange={(e) => handleAddressChange(index, e)}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label for={`nearby${index}`}>Nearby Landmark</Label>
                <Input
                    type="text"
                    name="nearby"
                    placeholder='Nearby Landmark'
                    id={`nearby${index}`}
                    value={address.nearby || ''}
                    onChange={(e) => handleAddressChange(index, e)}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label for={`zip_code${index}`}>Zip Code</Label>
                <Input
                    type="text"
                    name="zip_code"
                    placeholder='Zip Code'
                    id={`zip_code${index}`}
                    value={address.zip_code || ''}
                    onChange={(e) => handleAddressChange(index, e)}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label for={`district${index}`}>District</Label>
                <Input
                    type="text"
                    name="district"
                    placeholder='District'
                    id={`district${index}`}
                    value={address.district || ''}
                    onChange={(e) => handleAddressChange(index, e)}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label for={`city${index}`}>City</Label>
                <Input
                    type="text"
                    placeholder='City'
                    name="city"
                    id={`city${index}`}
                    value={address.city || ''}
                    onChange={(e) => handleAddressChange(index, e)}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label for={`state${index}`}>State</Label>
                <Input
                    type="text"
                    name="state"
                    placeholder='State'
                    id={`state${index}`}
                    value={address.state || ''}
                    onChange={(e) => handleAddressChange(index, e)}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label for={`country${index}`}>Country</Label>
                <Input
                    type="text"
                    name="country"
                    placeholder='Country'
                    id={`country${index}`}
                    value={address.country || ''}
                    onChange={(e) => handleAddressChange(index, e)}
                    required
                />
            </FormGroup>
        </div>
    );
};

export default AddressForm;
