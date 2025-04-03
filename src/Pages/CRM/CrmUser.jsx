import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Table, } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { getRoles, createCrmUser, getCrmUsers, updateCrmUser, } from "../../apiServices/service";
import { toast } from "react-toastify";

function CrmUser() {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [trigger, setTrigger] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
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
  const fetchCrmUsers = async () => {
    try {
      const result = await getCrmUsers();
      setUsers(result.data || []);
    } catch (error) {
      alert(error.message || "Failed to get users");
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
      fetchCrmUsers();
      const updatedUsers = [...users, { ...user, id: Date.now() }];
      setUsers(updatedUsers);
      localStorage.setItem("crmUsers", JSON.stringify(updatedUsers));
    } catch (error) {
      alert(error.message || "Failed to save user");
    }
  };

  const NumberOfTotalUsers = users.length;
  
   
  useEffect(() => {
    fetchRoles();
    fetchCrmUsers();
  }, []);

  const handleAddUser = () => {
    createCrmUsers(newUser);
  };


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

  const refetchUsers = () => {
    setTrigger((prev) => prev + 1);
  }
  useEffect(() => {
    fetchCrmUsers();
  },[trigger]);
  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const lastPage = () => setCurrentPage(totalPages);
  const firstPage = () => setCurrentPage(1);

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="CRM" breadcrumbItem="CRM Users" />
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, email, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <p className="mm-active mb-0">
              This is the CRM user page. Here you can manage CRM users.
            </p>
           <div className="d-flex">
              <span className="badge bg-primary rounded-pill d-flex align-items-center">
              Total Users :  {NumberOfTotalUsers}
              </span>
              <i className="bx bx-refresh bx-lg" style={{ fontSize: "24px", fontWeight: "bold", cursor: "pointer", backgroundColor:"lightblue" , padding:"2px",marginLeft:"5px" , borderRadius:"5px" }} onClick={refetchUsers}></i>
              <i className="bx bx-plus bx-lg" style={{ fontSize: "24px", fontWeight: "bold", cursor: "pointer", backgroundColor:"lightblue" , padding:"2px",marginLeft:"5px" , borderRadius:"5px" }} onClick={toggleModal}></i>              
            </div>
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
              <tbody>
                {currentUsers.map((user, index) => (
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
          {totalPages > 1 && (
            <div className="pagination-controls d-flex gap-2 mt-2">
              <Button onClick={firstPage} disabled={currentPage === 1} className="btn-secondary">« First</Button>
              <Button onClick={prevPage} disabled={currentPage === 1} className="btn-secondary">‹ Prev</Button>
              <Button onClick={nextPage} disabled={currentPage === totalPages} className="btn-secondary">Next ›</Button>
              <Button onClick={lastPage} disabled={currentPage === totalPages} className="btn-secondary">Last »</Button>
            </div>
          )}
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
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
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
