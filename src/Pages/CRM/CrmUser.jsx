import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Table,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {
  getRoles,
  createCrmUser,
  getCrmUsers,
  updateCrmUser,
} from "../../apiServices/service";
import { toast } from "react-toastify";

function CrmUser() {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    roleId: "",
    isActive: true,
  });

  const fetchRoles = async () => {
    try {
      const result = await getRoles();
      setRoles(result || []);
      if (!result || result.length === 0) {
        alert("Roles are not defined yet");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const email = user.email?.toLowerCase() || "";
    const roleName = user?.roleId?.roleName?.toLowerCase() || "";

    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase()) ||
      roleName.includes(searchTerm.toLowerCase())
    );
  });

  const createCrmUsers = async (user) => {
    try {
      const result = await createCrmUser(user);
      // alert(result.message || 'User saved successfully');
      toast.success(result.message || "User saved successfully");
      fetchRoles();
      toggleModal();
      const updatedUsers = [...users, { ...user, id: Date.now() }];
      setUsers(updatedUsers);
      localStorage.setItem("crmUsers", JSON.stringify(updatedUsers));
    } catch (error) {
      alert(error.message || "Failed to save user");
    }
  };

  const fetchCrmUsers = async () => {
    try {
      const result = await getCrmUsers();
      setUsers(result.data || []);
    } catch (error) {
      alert(error.message || "Failed to get users");
    }
  };

  const handleAddUser = () => {
    createCrmUsers(newUser);
  };

  useEffect(() => {
    fetchRoles();
    fetchCrmUsers();
  }, []);

  const toggleModal = () => {
    setModal(!modal);
    setNewUser({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      roleId: "",
      isActive: true,
    });
    fetchRoles();
    fetchCrmUsers();
  };
  // if (!modal){
  //   fetchCrmUsers();
  // }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleEditUser = (user) => {
    setNewUser({
      ...user,
      roleId: user.role ? user.role._id : "",
    });
    setModal(true);
  };

  const handleDeleteUser = (_id) => {
    const updatedUsers = users.filter((user) => user._id !== _id);
    setUsers(updatedUsers);
    localStorage.setItem("crmUsers", JSON.stringify(updatedUsers));
  };

  const handleUpdateUser = async () => {
    try {
      const result = await updateCrmUser(newUser._id, newUser);
      toast.success(result.message || "User updated successfully");
      const updatedUsers = users.map((user) =>
        user._id === newUser._id ? { ...newUser } : user
      );
      setUsers(updatedUsers);
      localStorage.setItem("crmUsers", JSON.stringify(updatedUsers));
      toggleModal();
    } catch (error) {
      alert(error.message || "Failed to update user");
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="CRM" breadcrumbItem="CRM Users" />
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, email, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="container">
          <div className="d-flex justify-content-between mb-4">
            <p className="mm-active">
              This is the CRM user page. Here you can manage CRM users.
            </p>
            <Button color="primary" onClick={toggleModal}>
              Add User
            </Button>
          </div>
          <div className="table-responsive">
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Role</th>
                  {/* <th>Role</th> */}
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {/* <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.mobile}</td>
                    <td>{user?.roleId?.roleName}</td>
                    <td>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </td>
                    <td className='flex flex-wrap'>
                      <i className="bx bx-edit" style={{ fontSize: "22px", fontWeight: "bold", cursor: "pointer", marginLeft: "5px" }} onClick={() => handleEditUser(user)}></i>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan="9" className="text-center">
                      No users available.
                    </td>
                  </tr>
                )}
              </tbody> */}
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.mobile}</td>
                    <td>{user?.roleId?.roleName}</td>
                    <td>{user.isActive ? "Active" : "Inactive"}</td>
                    <td className="flex flex-wrap">
                      <i
                        className="bx bx-edit"
                        style={{
                          fontSize: "22px",
                          fontWeight: "bold",
                          cursor: "pointer",
                          marginLeft: "5px",
                        }}
                        onClick={() => handleEditUser(user)}
                      ></i>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          <Modal isOpen={modal} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>
              {newUser._id ? "Update User" : "Add New User"}
            </ModalHeader>
            <ModalBody>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={newUser.firstName}
                onChange={handleInputChange}
                className="form-control mb-2"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={newUser.lastName}
                onChange={handleInputChange}
                className="form-control mb-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={newUser.email}
                onChange={handleInputChange}
                className="form-control mb-2"
              />
              <input
                type="text"
                name="mobile"
                placeholder="Mobile"
                value={newUser.mobile}
                onChange={handleInputChange}
                className="form-control mb-2"
              />
              <select
                name="isActive"
                value={newUser.isActive}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    isActive: JSON.parse(e.target.value),
                  })
                }
                className="form-control mb-2"
              >
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </select>

              <select
                name="roleId"
                value={newUser.roleId}
                onChange={handleInputChange}
                className="form-control mb-2"
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role._id} value={role._id}>
                    {role.roleName}
                  </option>
                ))}
              </select>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={newUser._id ? handleUpdateUser : handleAddUser}
              >
                {newUser._id ? "Update User" : "Add User"}
              </Button>

              <Button color="secondary" onClick={toggleModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CrmUser;
