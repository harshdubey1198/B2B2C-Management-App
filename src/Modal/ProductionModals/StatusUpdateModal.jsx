import React, { useState, useEffect } from 'react';

function StatusUpdateModal({ modalOpen, setModalOpen, selectedOrder, handleUpdateStatus }) {
  const [newStatus, setNewStatus] = useState('');
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    if (selectedOrder) {
      setNewStatus(selectedOrder.status || '');
    }
  }, [selectedOrder]);

  const handleSubmit = () => {
    if (newStatus && selectedOrder?._id) {
      handleUpdateStatus(selectedOrder._id, { status: newStatus, notes: newNote });
      setModalOpen(false);
    }
  };

  return (
    <div className={`modal ${modalOpen ? 'show' : ''}`} tabIndex="-1" style={{ display: modalOpen ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Status</h5>
            <button type="button" className="btn-close" onClick={() => setModalOpen(false)}></button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Status</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="form-control"
              >
                {['created', 'in_progress', 'completed', 'cancelled'].map((status) => (
                  <option key={status} value={status}>
                    {status
                      .split('_')
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Notes</label>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="form-control"
                rows="4"
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatusUpdateModal;
