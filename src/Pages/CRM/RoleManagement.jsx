import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { deleteRoleById, getRoles } from '../../apiServices/service';
import { Button, Table } from 'reactstrap';
import RoleModal from '../../Modal/crm-modals/roleModal';

function RoleManagement() {
    const [roles, setRoles] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [roleToEdit, setRoleToEdit] = useState(null);

    const fetchRoles = async () => {
        try {
            const result = await getRoles();
            setRoles(result || []);
            if (!result || result.length === 0) {
                alert('Roles are not defined yet');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const deleteRole = async (id) => {
        try {
            const result = await deleteRoleById(id);
            alert(result.message);
            fetchRoles();
        } catch (error) {
            alert(error.message);
        }
    };

    const toggleModal = () => {
        setModalOpen(!modalOpen);
        if (modalOpen) setRoleToEdit(null);
    };

    const handleEdit = (role) => {
        setRoleToEdit(role);
        setModalOpen(true);
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    return (
        <React.Fragment>
            <div className="page-content">
                <Breadcrumbs title="CRM" breadcrumbItem="Role Management" />
                <div className="d-flex justify-content-end mb-3">
                    <Button color="primary" onClick={toggleModal}>
                        Create Role
                    </Button>
                </div>
                {roles.length > 0 ? (
                 <div className='table-responsive'>
                    <Table >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Role Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map((role, index) => (
                                <tr key={role._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{role.roleName}</td>
                                    <td>
                                        <Button
                                            color="info"
                                            size="sm"
                                            onClick={() => handleEdit(role)}
                                        >
                                            Edit
                                        </Button>{' '}
                                        <Button
                                            color="danger"
                                            size="sm"
                                            onClick={() => deleteRole(role._id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                 </div>
                ) : (
                    <p className="text-center">No roles are defined yet.
                        <br/><br/>
                        Click on 'Create Role' button to define a new role.
                    </p>
                )}
            </div>
            <RoleModal
                isOpen={modalOpen}
                toggle={toggleModal}
                roleToEdit={roleToEdit}
                fetchRoles={fetchRoles}
            />
        </React.Fragment>
    );
}

export default RoleManagement;
