import React, { useEffect, useState } from 'react';
import { getProductionOrders, updateProductionOrderQuantity } from '../../apiServices/service';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import QuantityUpdateModal from '../../Modal/ProductionModals/quantityUpdateModal';
import { updateProductionOrderStatus } from '../../apiServices/service';
import StatusUpdateModal from '../../Modal/ProductionModals/StatusUpdateModal';
import ProductionCreateModal from '../../Modal/ProductionModals/ProductionCreateModal';
import { toast } from 'react-toastify';
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

function ProductionOrders() {
  const [productionOrders, setProductionOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const navigate = useNavigate();
  const [newQuantity, setNewQuantity] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false); 
  const [newNote, setNewNote] = useState('');
  const authuser = JSON.parse(localStorage.getItem('authUser'));
  const [searchTerm, setSearchTerm] = useState('');
  const role = authuser?.response?.role;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [customItemsPerPage, setCustomItemsPerPage] = useState("");
  const [trigger, setTrigger] = useState(false);
  const fetchProductionOrders = async () => {
    try {
      const response = await getProductionOrders();
      setProductionOrders(response.data || []);
      setFilteredOrders(response.data || []);      
      // console.table(response.data); 
    } catch (error) {
      console.error('Error fetching production orders:', error.message);
    }
  };

  const handleCreateModal = () => {
    setOpenCreateModal(true);
  };

  const toggleTrigger = () => {
    setTrigger(!trigger);
  };
  useEffect(() => {
    fetchProductionOrders();
  }, [trigger]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const filtered = productionOrders.filter((order) =>
      order?.bomId?.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.productionOrderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order?.createdBy?.firstName + ' ' + order?.createdBy?.lastName)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(filtered);
  }, [searchTerm, productionOrders]);

   const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredOrders.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    const handleItemsPerPageChange = (e) => {
      const value = parseInt(e.target.value, 10);
      setItemsPerPage(value);
      setCurrentPage(1); 
    };
  
    const handleCustomItemsPerPage = () => {
      const value = parseInt(customItemsPerPage, 10);
      if (!isNaN(value) && value > 0) {
        setItemsPerPage(value);
        setCurrentPage(1); 
      } else {
        toast.error("Please enter a valid number of items per page.");
      }
    };

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setNewQuantity(order.quantity);
    setModalOpen(true);
    setNewNote(order.notes || '');
  };

  const handleUpdateQuantity = async () => {
    try {
      if (selectedOrder) {
        await updateProductionOrderQuantity(selectedOrder._id, { quantity: newQuantity, notes: newNote });
        setModalOpen(false);
        fetchProductionOrders();
      }
    } catch (error) {
      console.error('Error updating quantity:', error.message);
    }
  };

  const handleStatusChange = (order, selectedStatus) => {
    setSelectedOrder({ ...order, status: selectedStatus });
    setStatusModalOpen(true);
    if(selectedStatus==="completed"){
      console.log("completed");
      // navigate('/inventory-table')
    }
  };
  

  const handleUpdateStatus = async (id, data) => {
    try {
      await updateProductionOrderStatus(id, data);
      fetchProductionOrders(); 
    } catch (error) {
      console.error('Error updating status:', error.message);
    }
  };

  useEffect(() => {
    fetchProductionOrders();
  }, []);

  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };
  
  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Production & Inventory" breadcrumbItem="Production Orders" />

        <div className="d-flex justify-content-between gap-2 mb-3 ">
            <div className="d-flex align-items-center gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search Production Orders" 
                className="form-control"
                style={{ width: "250px",maxHeight:"33px" }}
              />
            </div>
            <div className="d-flex align-items-center gap-2">
            <label htmlFor="itemsPerPageSelect">Items per page:</label>
                  <select
                    id="itemsPerPageSelect"
                    className="form-select"
                    style={{ width: "auto" ,maxHeight:"33px"}}
                    onChange={handleItemsPerPageChange}
                  >
                    <option value="10" >10</option>
                    <option value="25" >25</option>
                    <option value="50" >50</option>
                    <option value="70" >70</option>
                    <option value="100">100</option>
                  </select>
  
                  <label htmlFor="customItemsInput">Or enter custom:</label>
                  <input
                    id="customItemsInput"
                    type="number"
                    min="1"
                    value={customItemsPerPage}
                    onChange={(e) => setCustomItemsPerPage(e.target.value)}
                    className="form-control"
                    style={{ width: "100px",maxHeight:"33px" }} 
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleCustomItemsPerPage();
                      }
                    }}
                  />
                  <Button color="primary" onClick={handleCustomItemsPerPage}>
                    Set
                  </Button>
                  <i className='bx bx-plus-circle bx-sm' style={{ cursor: 'pointer' }} onClick={handleCreateModal}></i>
              </div>
        </div>  

        <div className="table-responsive">
          <table className="table table-centered table-nowrap mb-0">
            <thead className="thead-light">
              <tr>
                <th>Order ID</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Order Date</th>
                <th>Created By</th>
                <th>Status</th>
                {role === 'firm_admin' ? <th>Action</th> : null}

              </tr>
            </thead>
            <tbody>
            {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    No production orders found.
                  </td>
                </tr>
              ) : (
                currentItems.map((order, index) => {
                  const createdAt = new Date(order.createdAt);
                  const date = createdAt.toLocaleDateString('en-IN', {
                    timeZone: 'Asia/Kolkata',
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  });
                  const time = createdAt.toLocaleTimeString('en-IN', {
                    timeZone: 'Asia/Kolkata',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  });

                  return (
                    <tr
                      key={index}
                      onClick={() => handleRowClick(order)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td>{order.productionOrderNumber}</td>
                      <td>{order?.bomId?.productName}</td>
                      <td>{order.quantity}</td>
                      <td>
                        {date}
                        <br />
                        {time}
                      </td>
                      <td>{order?.createdBy?.firstName + ' ' + order?.createdBy?.lastName}</td>
                      <td>
                        {role === 'firm_admin' ? (
                          <select
                            onChange={(e) => handleStatusChange(order, e.target.value)}
                            className={`form-control form-control-sm w-auto ${
                              order.status === 'cancelled' ? 'bg-secondary text-white' : ''
                            }`}
                            onClick={(e) => e.stopPropagation()}
                            disabled={order.status === 'cancelled'}
                          >
                            <option value={order.status}>
                              {order.status
                                .split('_')
                                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(' ')}
                            </option>
                            {['created', 'in_progress', 'completed', 'cancelled'].map((status) => {
                              if (status === order.status) return null;
                              return (
                                <option key={status} value={status}>
                                  {status
                                    .split('_')
                                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                    .join(' ')}
                                </option>
                              );
                            })}
                          </select>
                        ) : (
                          order.status
                            .split('_')
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ')
                        )}
                      </td>
                      <td>
                        {role === 'firm_admin' ? (
                            order.status !== 'completed' ? (
                              <i
                                className="bx bx-edit bx-sm"
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleOpenModal(order)}
                              ></i>
                            ) : null

                        ) : null}
                      </td>
                    </tr>
                  );
                })
              )}

            </tbody>
          </table>
        </div>
        <div className="pagination-controls d-flex gap-2 mt-2">
          {pageNumbers.map(number => (
            <Button key={number} onClick={() => paginate(number)} className={currentPage === number ? "btn-primary" : "btn-secondary"}>
              {number}
            </Button>
          ))}
        </div>
        <QuantityUpdateModal
          modalOpen={modalOpen} 
          setModalOpen={setModalOpen}
          selectedOrder={selectedOrder}
          newQuantity={newQuantity}
          setNewQuantity={setNewQuantity}
          handleUpdateQuantity={handleUpdateQuantity}
          newNote={newNote}
          setNewNote={setNewNote}
        />

        <StatusUpdateModal
          modalOpen={statusModalOpen}
          setModalOpen={setStatusModalOpen}
          selectedOrder={selectedOrder}
          handleUpdateStatus={handleUpdateStatus}
        />
        <ProductionCreateModal modalOpen={openCreateModal} setModalOpen={setOpenCreateModal} trigger={toggleTrigger} />

      </div>
    </React.Fragment>
  ); 
}

export default ProductionOrders;
