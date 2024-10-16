import React, { useEffect, useState } from "react";
import axios from "axios";

function UserTable({ selectedFirmId, trigger }) {
  const [userData, setUserData] = useState([]);
  const authuser = JSON.parse(localStorage.getItem("authUser"));
  const defaultFirm = JSON.parse(localStorage.getItem("defaultFirm"));

  const toPascalCase = (str) => {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const firmId = selectedFirmId || defaultFirm?._id;
  const companyTitle = defaultFirm?.companyTitle;
  const fetchUsers = async () => {
    try {
      let response;
      if (authuser?.response?.role === "super_admin") {
        response = await axios.get(`${process.env.REACT_APP_URL}/auth/getCompany/${authuser.response._id}`);
      } else if (authuser?.response?.role === "client_admin") {
        response = await axios.get(`${process.env.REACT_APP_URL}/auth/getCompany/${firmId}`);
      } else if (authuser?.response?.role === "firm_admin") {
        response = await axios.get(`${process.env.REACT_APP_URL}/auth/getCompany/${authuser.response.adminId}`);
      }
      setUserData(response);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [selectedFirmId, trigger]);

  return (
    <div className="table-responsive ">
      <h5 className="text-center">Users of <span className="mm-active">{companyTitle}</span></h5>
      <table className="table table-bordered mb-0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.length > 0 ? (
            userData.map((user) => (
              <tr key={user._id}>
                <td>{toPascalCase(`${user.firstName} ${user.lastName}`)}</td>
                <td>{user.mobile}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>Edit/Pause</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
