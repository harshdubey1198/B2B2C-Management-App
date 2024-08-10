import React, { useEffect, useState } from 'react';
import {Button, Card, CardBody, Col } from "reactstrap";
import Breadcrumbs from '../../components/Common/Breadcrumb';
import axios from 'axios';

const clientData = [
  {
    id: 1,
    name: "John Doe",
    phone: "123-456-7890",
    email: "john.doe@example.com",
    address: "123 Main St, Anytown, USA",
    actions: "Edit/Delete",
    permissions: "Admin/User",
    subscriptions: [
      {
        product: "Product A",
        status: "Active",
        startDate: "01/01/23",
        endDate: "31/12/23"
      },
      {
        product: "Product B",
        status: "Inactive",
        startDate: "01/05/23",
        endDate: "31/10/23"
      }
    ]
  },
  {
    id: 2,
    name: "Jane Smith",
    phone: "098-765-4321",
    email: "jane.smith@example.com",
    address: "456 Elm St, Othertown, USA",
    actions: "Edit/Delete",
    permissions: "Admin/User",
    subscriptions: [
      {
        product: "Product C",
        status: "Active",
        startDate: "15/02/23",
        endDate: "14/02/24"
      }
    ]
  },
  {
    id: 3,
    name: "Alice Johnson",
    phone: "555-123-4567",
    email: "alice.johnson@example.com",
    address: "789 Oak St, Sometown, USA",
    actions: "Edit/Delete",
    permissions: "Admin/User",
    subscriptions: [
      {
        product: "Product D",
        status: "Active",
        startDate: "10/10/23",
        endDate: "10/10/24"
      }
    ]
  }
];

function ClientManagement() {
  const [hoveredClientId, setHoveredClientId] = useState(null);
  const [requestedData, setRequestedData] = useState([])
  const [trigger, setTrigger] = useState(0)

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/clientadmin/getClients`).then((response) => {
      setRequestedData(response)
    }).catch((error) => {
      console.log(error);
    })
  }, [trigger])

  const handleAccept = (id) => {
    axios.put(`${process.env.REACT_APP_URL}/clientadmin/updateClient/${id}`, {status: "Accepted"}).then((response) => {
      setTrigger(prev => prev + 1)
    }).catch((error) => {
      console.log(error, "error updating data")
    })
  }

  const handleReject = (id) => {
    axios.put(`${process.env.REACT_APP_URL}/clientadmin/updateClient/${id}`, {status: "Rejected"}).then((response) => {
      setTrigger(prev => prev + 1)
    }).catch((error) => {
      console.log(error, "error updating data")
    })
  }
  
  console.log(requestedData, "request")
  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="aaMOBee" breadcrumbItem="Client Management" />
        <p className='mm-active'>
          This is the Client Management page.
          Here the client data table will be fetched and CRUD and permissions can be set by master admin.
        </p>
        <Col lg={12}>
          <Card>
            <CardBody>
              <div className="table-responsive">
                <table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Actions</th>
                      <th>Permissions</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientData.map(client => (
                      <tr 
                        key={client.id} 
                        onMouseEnter={() => setHoveredClientId(client.id)}
                        onMouseLeave={() => setHoveredClientId(null)}
                      >
                        <td>{client.name}</td>
                        <td>{client.phone}</td>
                        <td>{client.email}</td>
                        <td>{client.address}</td>
                        <td>{client.actions}</td>
                        <td>{client.permissions}</td>
                        <td>
                          {client.subscriptions.map(subscription => (
                            <div key={subscription.product}>
                              <div>{subscription.startDate}</div>
                            </div>
                          ))}
                        </td>
                        <td>
                          {client.subscriptions.map(subscription => (
                            <div key={subscription.product}>
                              <div>{subscription.endDate}</div>
                            </div>
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
                    {clientData.find(client => client.id === hoveredClientId).subscriptions.map(subscription => (
                      <li key={subscription.product}>{subscription.product}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardBody>
          </Card>
        </Col>

        <p className='mm-active'>
          Request Generated by Clients 
        </p>
        <Col lg={12}>
  <Card>
    <CardBody>
      <div className="table-responsive">
        <table className="table table-bordered mb-0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company Name</th>
              <th>Company Phone</th>
              <th>Status</th>
              <th>Actions</th> {/* Added for approval/rejection actions */}
            </tr>
          </thead>
          <tbody>
            {requestedData && requestedData.map(client => (
              <tr 
                key={client.id} 
                onMouseEnter={() => setHoveredClientId(client.id)}
                // onMouseLeave={() => setHoveredClientId(null)}
              >
                <td>{client.firstName + " " + client.lastName}</td>
                <td>{client.email}</td>
                <td>{client.companyName}</td>
                <td>{client.companyMobile}</td>
                <td>{client.status}</td>
                {
                  client.status === "Requested" ? (
                    <td>
                      <div className='d-flex gap-2'>
                      <Button color="success" onClick={() => handleAccept(client?._id)}>Approve</Button>
                      <Button color="danger" onClick={() => handleReject(client?._id)}>Reject</Button>
                      </div>
                    </td>
                  ) : ""
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardBody>
  </Card>
</Col>

      </div>
      <style>{`
        .hover-details {
          position: absolute;
          background: white;
          border: 1px solid #ccc;
          padding: 10px;
          bottom: 4px;
          right: 0px;
          box-shadow: 0px 4px 8px rgba(0,0,0,0.1);
        }
      `}</style>
    </React.Fragment>
  );
}

export default ClientManagement;
