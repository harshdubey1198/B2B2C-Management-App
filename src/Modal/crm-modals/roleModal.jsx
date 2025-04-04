import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, } from 'reactstrap';
import { createRole, updateRoleById } from '../../apiServices/service';
import { toast } from 'react-toastify';

const RoleModal = ({ isOpen, toggle, roleToEdit, fetchRoles }) => {
    const [roleName, setRoleName] = useState('');

    useEffect(() => {
        if (roleToEdit) {
            setRoleName(roleToEdit.roleName);
        } else {
            setRoleName('');
        }
    }, [roleToEdit]);

    const handleSubmit = async () => {
        const payload = { roleName };
        try {
            let response;
            
            if (roleToEdit) {
                response = await updateRoleById(roleToEdit._id, payload);
            } else {
                response = await createRole(payload);
            }
            
            // alert(response.message || 'Role saved successfully');
            toast.success(response.message || 'Role saved successfully');
            setRoleName('');
            fetchRoles();
            toggle();
        } catch (error) {
            alert(error.message || 'Failed to save role');
        }
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                {roleToEdit ? 'Update Role' : 'Create Role'}
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="roleName">Role Name</Label>
                        <Input
                            type="text"
                            name="roleName"
                            id="roleName"
                            placeholder="Enter role name"
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value)}
                        />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit}>
                    {roleToEdit ? 'Update' : 'Create'}
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default RoleModal;
