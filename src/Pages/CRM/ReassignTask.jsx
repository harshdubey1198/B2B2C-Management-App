import React, { useEffect, useState } from 'react';
import { getAllTasks, updateLeadById, updateTaskOrLead } from '../../apiServices/service';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';

function ReassignTask() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');
  const [modal, setModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [newNote, setNewNote] = useState('');
  const authUser = JSON.parse(localStorage.getItem('authUser'));
  const userId = authUser?.response?._id;
  const role = authUser?.response?.role;

  const fetchTasks = async () => {
    try {
      const result = await getAllTasks();
      const allTasks = result?.data || [];
      console.log(allTasks, "tasks")
      setTasks(allTasks);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const toggleModal = () => setModal(!modal);

  // const handleUpdate = (task) => {
  //   if (task.leadIds && Array.isArray(task.leadIds) && task.leadIds.length > 0) {
  //     setSelectedLead(task.leadIds[0]);
  //     setNewNote('');
  //     toggleModal();
  //   } else {
  //     alert('No lead found for this task');
  //   }
  // };
  
  const handleNoteSubmit = async () => {
    if (!newNote) {
      alert('Please enter a note');
      return;
    }
  
    try {
      if (!selectedLead || !selectedLead._id) {
        alert('No lead selected');
        return;
      }
  
      const updatedLead = {
        ...selectedLead,
        notes: [
          ...selectedLead.notes,
          {
            message: newNote,
            createdBy: userId,
          },
        ],
        status: selectedLead.status,
      };
  
      console.log("Updated Lead Data:", updatedLead); 
  
      const result = await updateLeadById(selectedLead._id, updatedLead);
      if (result.success) {
        alert('Note and status updated successfully!');
        fetchTasks(); 
        toggleModal();
      } else {
        alert(result.message || 'Failed to update lead');
      }
    } catch (error) {
      console.error('Failed to update lead:', error);
      alert('Failed to update lead');
    }
  };
  
  
  useEffect(() => {
    fetchTasks();
  }, []);

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  
  const getLeadColor = (assignedLeads) => {
    if (assignedLeads.length > 1) {
      return getRandomColor();
    }
    return ''; 
  };
  
  

  return (
    <React.Fragment>
      <div className="page-content">
  <Breadcrumbs title="CRM" breadcrumbItem="All Tasks" />
  <div className="container-fluid">
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">All Tasks</h4>
            {message && <p className="text-danger">{message}</p>}
            <div className="table-responsive">
              <table className="table table-centered table-nowrap table-hover mb-0">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Lead Names</th>
                    <th scope="col">Assigned By</th>
                    <th scope="col">Due Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.length > 0 ? (
                    tasks.map((task, index) => (
                      <tr key={task._id}>
                        <td>{index + 1}</td>
                        <td>
                          {task.leadIds && Array.isArray(task.leadIds) && task.leadIds.length > 0
                            ? task.leadIds
                                .slice(0, 2) 
                                .map((lead) => `${lead.firstName} ${lead.lastName}`)
                                .join(", ") + (task.leadIds.length > 2 ? "..." : "") 
                            : "No Leads Assigned"}
                        </td>
                        <td>
                          {task.assignedBy?.firstName} {task.assignedBy?.lastName}
                        </td>
                        <td>{new Date(task.dueDate).toLocaleString()}</td>
                        <td>{task.status}</td>
                        <td>
                          <button
                            className="btn btn-primary btn-sm"
                            // onClick={() => handleViewTask(task)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-muted">
                        No tasks to display.
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


      <Modal isOpen={modal} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Update Lead Details</ModalHeader>
            <ModalBody>
                <div>
                <h5>
                    Lead Name: {selectedLead?.firstName} {selectedLead?.lastName}
                </h5>
                <div>
                    <label>New Note</label>
                    <Input
                    type='textarea'
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder='Add a note...'
                    />
                </div>
                <div className="mt-3">
                    <label>Status</label>
                    <Input
                    type="select"
                    value={selectedLead?.status}
                    onChange={(e) => setSelectedLead({ ...selectedLead, status: e.target.value })}
                    >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    </Input>
                </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggleModal}>
                Cancel
                </Button>
                <Button
                color="primary"
                onClick={handleNoteSubmit}
                >
                Save Note
                </Button>
            </ModalFooter>
        </Modal>

    </React.Fragment>
  );
}

export default ReassignTask;
