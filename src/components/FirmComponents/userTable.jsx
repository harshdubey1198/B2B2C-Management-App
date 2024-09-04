import React, { useEffect, useState } from "react";
import axios from "axios";

function UserTable({ selectedFirmId}) {
  const [userData, setUserData] = useState([]);
  const authuser = JSON.parse(localStorage.getItem("authUser"));
  const fetchUsers = async () => {
    try {
      let firmId;
      
      if (authuser?.response.role === "firm_admin") {
        firmId = authuser?.response.firmId;
      } else if (authuser?.response.role === "client_admin") {
        firmId = selectedFirmId
      }
      if (firmId) {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/firmadmin/firmusers/${firmId}`
        );
        setUserData(response || []);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [selectedFirmId]);

  return (
    <>
      <div className="table-responsive mt-4">
        <table className="table table-bordered mb-0">
          <thead>
            <tr>
              <th>Firm Id</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userData.length > 0 ? (
              userData.map((user) => (
                <tr
                  key={user.id}
                >
                  <td>{user.uid}</td>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>Edit/Pause</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserTable;
