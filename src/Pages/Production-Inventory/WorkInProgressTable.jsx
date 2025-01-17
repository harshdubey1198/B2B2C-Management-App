import React, { useState } from 'react';
import Breadcrumbs from '../../components/Common/Breadcrumb';

function WorkInProgressTable() {
  const [data, setData] = useState([
    {
      id: 1,
      productName: "Pen",
      rawMaterials: "Cap, Refill, Pen's Body",
      createdBy: "John Doe",
      status: "Approved",
      note: "Completed successfully",
    },
    {
      id: 2,
      productName: "Notebook",
      rawMaterials: "Paper, Binding, Cover",
      createdBy: "Jane Smith",
      status: "Cancelled",
      note: "Insufficient materials",
    },
    {
      id: 3,
      productName: "Marker",
      rawMaterials: "Plastic Body, Ink, Cap",
      createdBy: "Emily Johnson",
      status: "Pending",
      note: "Waiting for approval",
    },
  ]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Production & Inventory" breadcrumbItem="Work In Progress Table" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Work In Progress Table</h4>
                  <p className="card-title-desc">
                    View the current status of products being manufactured.
                  </p>
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Product Name</th>
                          <th>Raw Materials</th>
                          <th>Created By</th>
                          <th>Status</th>
                          <th>Note</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item, index) => (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.productName}</td>
                            <td>{item.rawMaterials}</td>
                            <td>{item.createdBy}</td>
                            <td>
                              <span
                                className={`badge ${
                                  item.status === "Approved"
                                    ? "bg-success"
                                    : item.status === "Cancelled"
                                    ? "bg-danger"
                                    : "bg-warning"
                                }`}
                              >
                                {item.status}
                              </span>
                            </td>
                            <td>{item.note}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default WorkInProgressTable;
