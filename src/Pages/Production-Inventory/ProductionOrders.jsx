import React, { useEffect, useState } from 'react';
import { getProductionOrders, updateProductionOrderQuantity } from '../../apiServices/service';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import QuantityUpdateModal from '../../Modal/ProductionModals/quantityUpdateModal';
import { updateProductionOrderStatus } from '../../apiServices/service';
import StatusUpdateModal from '../../Modal/ProductionModals/StatusUpdateModal';
import ProductionCreateModal from '../../Modal/ProductionModals/ProductionCreateModal';

function ProductionOrders() {
  const [productionOrders, setProductionOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [newQuantity, setNewQuantity] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false); 
  const [newNote, setNewNote] = useState('');
  const authuser = JSON.parse(localStorage.getItem('authUser'));
  const role = authuser?.response?.role;
  const [trigger, setTrigger] = useState(false);
  const fetchProductionOrders = async () => {
    try {
      const response = await getProductionOrders();
      setProductionOrders(response.data || []);
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
  };
  

  const handleUpdateStatus = async (id, data) => {
    try {
      await updateProductionOrderStatus(id, data);
      fetchProductionOrders(); // Refresh production orders after status update
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

        <div className="d-flex justify-content-end gap-2 mb-3">
          <i className='bx bx-plus-circle bx-sm' style={{ cursor: 'pointer' }} onClick={handleCreateModal}></i>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {productionOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    No production orders found.
                  </td>
                </tr>
              ) : (
                productionOrders.map((order, index) => {
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
                            className={`form-control form-control-sm ${
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
                          <i
                            className="bx bx-edit bx-sm"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleOpenModal(order)}
                          ></i>
                        ) : null}
                      </td>
                    </tr>
                  );
                })
              )}

            </tbody>
          </table>
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
