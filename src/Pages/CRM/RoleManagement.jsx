import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { deleteRoleById, getRoles } from '../../apiServices/service';
import { Button, Table } from 'reactstrap';
import RoleModal from '../../Modal/crm-modals/roleModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RoleManagement() {
    const [roles, setRoles] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [roleToEdit, setRoleToEdit] = useState(null);

    const fetchRoles = async () => {
        try {
            const result = await getRoles();
            setRoles(result || []);
            if (!result || result.length === 0) {
                toast.info('No roles are defined yet.');
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const deleteRole = async (id) => {
        try {
            const result = await deleteRoleById(id);
            toast.success(result.message);
            fetchRoles();
        } catch (error) {
            toast.error(error.message);
        }
    };

    const toggleModal = () => {
        setModalOpen(!modalOpen);
        if (modalOpen) setRoleToEdit(null); // Reset form on close
    };

    const handleEdit = (role) => {
        setRoleToEdit(role);
        setModalOpen(true);
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const refetchRoles = () => {
        fetchRoles();
    }


    return (
        <React.Fragment>
            <div className="page-content">
                <Breadcrumbs title="CRM" breadcrumbItem="Role Management" />
                  <div className="d-flex flex-wrap justify-content-start align-items-center gap-2 mb-3">
                  <i className='bx bx-refresh cursor-pointer'  style={{fontSize: "24.5px",fontWeight: "bold",color: "black",transition: "color 0.3s ease"}} onClick={refetchRoles} onMouseEnter={(e) => e.target.style.color = "green"}  onMouseLeave={(e) => e.target.style.color = "black"}></i>
                    <Button color="primary" onClick={toggleModal}>
                        Create Role
                    </Button>
                </div>
                {roles.length > 0 ? (
                    <div className='table-responsive'>
                        <Table>
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
                    <p className="text-center">
                        No roles are defined yet.
                        <br /><br />
                        Click on 'Create Role' button to define a new role.
                    </p>
                )}
            </div>
            <RoleModal
                isOpen={modalOpen}
                toggle={toggleModal}
                roleToEdit={roleToEdit}
                fetchRoles={() => {
                    fetchRoles();
                    setRoleToEdit(null);
                }}
            />
        </React.Fragment>
    );
}

export default RoleManagement;
