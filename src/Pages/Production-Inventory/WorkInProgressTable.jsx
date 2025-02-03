import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { getProductionOrders } from '../../apiServices/service';
import { Row } from 'reactstrap';

function WorkInProgressTable() {
  const [productionOrders, setProductionOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('in_progress');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchProductionOrders = async () => {
    try {
      const response = await getProductionOrders();
      const filteredOrders =
        response.data?.filter((order) => order.status === filterStatus) || [];
      setProductionOrders(filteredOrders);
    } catch (error) {
      console.error('Error fetching Production Orders:', error.message);
    }
  };

  useEffect(() => {
    fetchProductionOrders();
    setCurrentPage(1);
  }, [filterStatus]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productionOrders.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(productionOrders.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs
          title="Production & Inventory"
          breadcrumbItem="Work In Progress Table"
        />
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <Row>
                    <div className="mb-1 col-4">
                      <label htmlFor="filter-status" className="form-label">
                        Filter by Status:
                      </label>
                      <select
                        id="filter-status"
                        className="form-select w-50"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                      >
                        <option value="in_progress">In Progress</option>
                        <option value="created">Created</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </Row>

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
                        {currentItems.map((order) => (
                          <tr key={order._id}>
                            <td>{order.productionOrderNumber}</td>
                            <td>{order?.bomId?.productName}</td>
                            <td>
                              <ul>
                                {order?.rawMaterials.map(
                                  (rawMaterial, index) => (
                                    <li key={index}>
                                      <strong>
                                        {rawMaterial.itemId.name}
                                      </strong>{' '}
                                      ({rawMaterial.itemId.qtyType}) -{' '}
                                      {rawMaterial.quantity} units
                                    </li>
                                  )
                                )}
                              </ul>
                            </td>
                            <td>{order.createdBy.firstName}</td>
                            <td>{order.status}</td>
                          </tr>
                        ))}
                        {currentItems.length === 0 && (
                          <tr>
                            <td colSpan="5" className="text-center">
                              No orders found for the selected status.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {totalPages > 1 && (
                    <nav aria-label="Page navigation">
                      <ul className="pagination justify-content-center">
                        {[...Array(totalPages)].map((_, index) => (
                          <li
                            key={index}
                            className={`page-item ${
                              index + 1 === currentPage ? 'active' : ''
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => handlePageChange(index + 1)}
                            >
                              {index + 1}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  )}
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
