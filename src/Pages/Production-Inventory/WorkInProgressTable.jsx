import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { getProductionOrdersmain } from '../../apiServices/service';
import { Row } from 'reactstrap';
import FirmSwitcher from '../Firms/FirmSwitcher';

function WorkInProgressTable() {
  const [productionOrders, setProductionOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('in_progress');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [trigger, setTrigger] = useState(0);
  const [selectedFirmId, setSelectedFirmId] = useState(null);

  const authuser = JSON.parse(localStorage.getItem('authUser')) || {};
  const firmId = authuser?.response?.adminId || '';
  const userRole = authuser?.response?.role || '';

  const effectiveFirmId = userRole === "client_admin" ? selectedFirmId : firmId;

  const fetchProductionOrders = async () => {
    if (!effectiveFirmId) return; 

    try {
      const response = await getProductionOrdersmain(effectiveFirmId);
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
  }, [filterStatus, trigger, effectiveFirmId]);

  const refetchOrders = () => {
    setTrigger(prev => prev + 1); 
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productionOrders.slice(indexOfFirstItem, indexOfLastItem);
  // console.log(currentItems);
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
                  <div className='d-flex align-items-center justify-content-start gap-2 border-bottom pb-1'>
                      <label htmlFor="filter-status" className="form-label m-0">
                        Filter by Status:
                      </label>
                      <select
                        id="filter-status"
                        style={{
                            fontSize:"10.5px",
                            lineHeight:"1",
                            width:"fit-content",
                        }}
                        className="form-select"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                      >
                        <option value="in_progress">In Progress</option>
                        <option value="created">Created</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="completed">Completed</option>
                      </select>

                    {userRole === "client_admin" && (
                      <FirmSwitcher
                          selectedFirmId={selectedFirmId}
                          onSelectFirm={(firmId) => {
                            setSelectedFirmId(firmId);
                            setTrigger(prev => prev + 1); 
                          }}
                      />
                    )}
                    <i className='bx bx-refresh cursor-pointer'  style={{fontSize: "24.5px",fontWeight: "bold",color: "black",transition: "color 0.3s ease"}} onClick={refetchOrders} onMouseEnter={(e) => e.target.style.color = "green"}  onMouseLeave={(e) => e.target.style.color = "black"}></i>
                  </div>

                  <div className="table-responsive mt-3">
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
                              <ul style={{ paddingLeft: "0px" }}>
                                {order?.rawMaterials.map((rawMaterial, index) => (
                                  <li key={index} style={{ listStyleType: "none" }}>
                                    <strong>
                                      {rawMaterial?.itemId?.name || "Unknown Item"}
                                    </strong>{' '}
                                    ({rawMaterial?.itemId?.qtyType || "N/A"}) -{' '}
                                    {rawMaterial?.quantity || 0} {rawMaterial?.quantity > 1 ? 'units' : 'unit'}
                                  </li>
                                ))}
                              </ul>
                            </td>
                            <td>{order.createdBy.firstName}</td>
                            <td>{order.status}</td>
                          </tr>
                        ))}
                      </tbody>

                    </table>
                  </div>

                  {totalPages > 1 && (
                    <nav aria-label="Page navigation">
                      <ul className="pagination justify-content-center">
                        {[...Array(totalPages)].map((_, index) => (
                          <li
                            key={index}
                            className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}
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
