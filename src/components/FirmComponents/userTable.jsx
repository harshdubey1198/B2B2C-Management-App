import React, { useEffect, useState } from "react";

function UserTable({selectedFirmId}) {
  const [clientData, setClientData] = useState([])
  const [hoveredClientId, setHoveredClientId] = useState(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("Create User")) || [];
    setClientData(storedUsers);
  },[])

  const filteredClients = clientData.filter(
    (client) => client?.firmId === selectedFirmId
  );

  return (
    <>
      <div className="table-responsive mt-4">
        <table className="table table-bordered mb-0">
          <thead>
            <tr>
              <th>Firm Id</th>
              <th>Firm Name</th>
              <th>User Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
              <th>Permissions</th>
            </tr>
          </thead>
          <tbody>
            {clientData &&
              filteredClients.map((client) => (
                <tr
                  key={client.id}
                  onMouseEnter={() => setHoveredClientId(client.id)}
                  onMouseLeave={() => setHoveredClientId(null)}
                >
                  <td>{client.firmId}</td>
                  <td>{client.firmName}</td>
                  <td>{client.name}</td>
                  <td>{client.phone}</td>
                  <td>{client.email}</td>
                  <td>{client.role}</td>
                  <td>Edit/Pause</td>
                  <td>
                    {client.permissions.map((permission) => (
                      <span key={permission}>{permission}, </span>
                    ))}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {hoveredClientId && (
        <div className="hover-details">
          <h5>Products:</h5>
          <ul>
            {clientData[selectedFirmId]
              ?.find((client) => client.id === hoveredClientId)
              ?.subscriptions.map((subscription) => (
                <li key={subscription.product}>{subscription.product}</li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default UserTable;
