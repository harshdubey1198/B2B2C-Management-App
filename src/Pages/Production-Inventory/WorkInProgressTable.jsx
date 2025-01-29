import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { getProductionOrders } from '../../apiServices/service';

function WorkInProgressTable() {
  const [productionOrders, setProductionOrders] = useState([]);

  const fetchProductionOrders = async () => {
    try {
      const response = await getProductionOrders();
      const filteredOrders = response.data?.filter(order => order.status === "in_progress") || [];
      setProductionOrders(filteredOrders);
    } catch (error) {
      console.error('Error fetching Production Orders:', error.message);
    }
  };

  useEffect(() => {
    fetchProductionOrders();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Production & Inventory" breadcrumbItem="Work In Progress Table" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>PO No.</th>
                          <th>Product Name</th>
                          <th>Raw Materials</th>
                          <th>Created By</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productionOrders.map((order) => (
                          <tr key={order._id}>
                            <td>{order.productionOrderNumber}</td>
                            <td>{order?.bomId?.productName}</td>
                            <td>
                              <ul>
                                {order?.rawMaterials.map((rawMaterial, index) => (
                                  <li key={index}>
                                    <strong>{rawMaterial.itemId.name}</strong> ({rawMaterial.itemId.qtyType}) - {rawMaterial.quantity} units
                                  </li>
                                ))}
                              </ul>
                            </td>
                            <td>{order.createdBy.firstName}</td>
                            <td>{order.status}</td>
                          </tr>
                        ))}
                        {productionOrders.length === 0 && (
                          <tr>
                            <td colSpan="5" className="text-center">
                              No work-in-progress orders found.
                            </td>
                          </tr>
                        )}
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
