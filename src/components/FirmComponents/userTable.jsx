import React, { useEffect, useState } from "react";
import axios from "axios";

function UserTable({selectedFirmId, trigger}) {
  const [userData, setUserData] = useState([]);
  const [hoveredUserId, setHoveredUserId] = useState(null);
  const defaultFirm = JSON.parse(localStorage.getItem("defaultFirm"));
  const authuser = JSON.parse(localStorage.getItem("authUser"));

  const fetchUsers = async () => {
    try {
      let firmId;
      
      if (authuser?.response.role === "firm_admin") {
        firmId = authuser?.response.firmId;
        console.log("Fetching users for firm_admin with firmId:", firmId);
      } else if (authuser?.response.role === "client_admin") {
        firmId = defaultFirm?.firmId;
        console.log("Fetching users for client_admin with defaultFirmId:", firmId);
      }
      console.log("Firm Id:", firmId);
      if (firmId) {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/firmadmin/firmusers/${firmId}`
        );
        console.log("API response data", response);
        setUserData(response || []);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  console.log(userData,"userdaata")
  console.log(selectedFirmId,"usta")
  console.log(trigger,"trigger")

  useEffect(() => {
    fetchUsers();
  }, [trigger]);

  const filteredUsers = userData.filter(
    (user) => user?.firmId === defaultFirm?.firmId
  );

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
              {/* <th>Permissions</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  onMouseEnter={() => setHoveredUserId(user.id)}
                  onMouseLeave={() => setHoveredUserId(null)}
                >
                  <td>{user.uid}</td>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>Edit/Pause</td>
                  {/* <td>
                    {user.permissions.map((permission) => (
                      <span key={permission}>{permission}, </span>
                    ))}
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* {hoveredUserId && (
        <div className="hover-details">
          <h5>Products:</h5>
          <ul>
            {userData.find((user) => user.id === hoveredUserId)
              ?.subscriptions.map((subscription) => (
                <li key={subscription.product}>{subscription.product}</li>
              ))}
          </ul>
        </div>
      )} */}
    </>
  );
}

export default UserTable;
