import React, { useState } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import FirmSwitcher from './FirmSwitcher'; // Adjust the path as needed

const clientData = {
  1: [
    {
      id: 1,
      name: "John Doe",
      phone: "123-456-7890",
      email: "john.doe@example.com",
      address: "123 Main St, Anytown, USA",
      actions: "Edit/Pause",
      firmAdmin: "John",
      permissions: "Admin/User",
      subscriptions: [
        {
          product: "Product A",
          status: "Active",
          startDate: "01/01/23",
          endDate: "31/12/23"
        },
      ]
    }
  ],
  2: [
    {
      id: 1,
      name: "Jane Smith",
      phone: "098-765-4321",
      email: "jane.smith@example.com",
      address: "456 Elm St, Othertown, USA",
      actions: "Edit/Pause",
      firmAdmin: "Jane",
      permissions: "Admin/User",
      subscriptions: [
        {
          product: "Product B",
          status: "Active",
          startDate: "15/02/23",
          endDate: "14/02/24"
        }
      ]
    }
  ],
  3: [
    {
      id: 1,
      name: "Alice Johnson",
      phone: "555-123-4567",
      email: "alice.johnson@example.com",
      address: "789 Oak St, Sometown, USA",
      actions: "Edit/Pause",
      firmAdmin: "Alice",
      permissions: "Admin/User",
      subscriptions: [
        {
          product: "Product C",
          status: "Active",
          startDate: "10/10/23",
          endDate: "10/10/24"
        }
      ]
    }
  ],
  4: [
    {
      id: 1,
      name: "Alice Johnson",
      phone: "555-123-4567",
      email: "alice.johnson@example.com",
      address: "789 Oak St, Sometown, USA",
      actions: "Edit/Pause",
      firmAdmin: "Alice",
      permissions: "Admin/User",
      subscriptions: [
        {
          product: "Product C",
          status: "Active",
          startDate: "10/10/23",
          endDate: "10/10/24"
        }
      ]
    }
  ]
};

function Index() {
  const [selectedFirmId, setSelectedFirmId] = useState(1);
  const [hoveredClientId, setHoveredClientId] = useState(null);

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="aaMOBee" breadcrumbItem="Client Management" />
        <div className="d-flex justify-content-between mb-4">
          <p className='mm-active'>
            This is the Client Management page.
            Here the client data table will be fetched and CRUD and permissions can be set by master admin.
          </p>
          <FirmSwitcher
            selectedFirmId={selectedFirmId}
            onSelectFirm={setSelectedFirmId}
          />
        </div>
        <Col lg={12}>
          <Card>
            <CardBody>
              <div className="table-responsive mt-4">
                <table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                      <th>Frim Id</th>
                      <th>Firm Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Frim Admin</th>
                      <th>Actions</th>
                      <th>Permissions</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientData[selectedFirmId]?.map(client => (
                      <tr 
                        key={client.id} 
                        onMouseEnter={() => setHoveredClientId(client.id)}
                        onMouseLeave={() => setHoveredClientId(null)}
                      >
                        <td>{client.id}</td>
                        <td>{client.name}</td>
                        <td>{client.phone}</td>
                        <td>{client.email}</td>
                        <td>{client.firmAdmin}</td>
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
                    {clientData[selectedFirmId]?.find(client => client.id === hoveredClientId)?.subscriptions.map(subscription => (
                      <li key={subscription.product}>{subscription.product}</li>
                    ))}
                  </ul>
                </div>
              )}
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

export default Index;
