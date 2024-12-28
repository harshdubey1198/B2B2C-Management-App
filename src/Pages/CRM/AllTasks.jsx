import React, { useEffect, useState } from 'react';
import { getAllTasks, getTasksByAssignee, updateLeadById, updateTaskOrLead } from '../../apiServices/service';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { toast } from 'react-toastify';

function AllTasks() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');
  const [modal, setModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [newNote, setNewNote] = useState('');
  const authUser = JSON.parse(localStorage.getItem('authUser'));
  const userId = authUser?.response?._id;
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskStatus, setTaskStatus] = useState(''); 
  const [taskRemark, setTaskRemark] = useState(''); 
  const [taskModal, setTaskModal] = useState(false)
  const role = authUser?.response?.role;

  // const fetchTasks = async () => {
  //   try {
  //     const result = await getAllTasks();
  //     const allTasks = result?.data || [];

  //     let filteredTasks = [];
  //     if (role === 'telecaller') {
  //       filteredTasks = allTasks.filter((task) =>
  //         task.assignedTo.some(
  //           (assignee) => assignee._id === userId && assignee.role === 'telecaller'
  //         )
  //       );
  //     } else if (role === 'client_admin') {
  //       filteredTasks = allTasks;
  //     }
  //     setTasks(filteredTasks);
  //     console.log(filteredTasks);
  //   } catch (error) {
  //     setMessage(error.message);
  //   }
  // };

  const fetchTasks = async () => {
    try {
      const result = await getTasksByAssignee(userId);
      const allTasks = result?.data || [];
      setTasks(allTasks);
    } catch (error) {
      setMessage(error.message);
    }
  };



  const toggleModal = () => setModal(!modal);

  // const handleUpdate = (task, lead) => {
  //   if (task.leadIds && Array.isArray(task.leadIds) && task.leadIds.length > 0) {
  //     setSelectedLead(task.leadIds[0]);
  //     setNewNote('');
  //     toggleModal();
  //   } else {
  //     alert('No lead found for this task');
  //   }
  // };

  const handleUpdate = (task, lead) => {
    if (lead) {
      setSelectedLead(lead); // Set the correct lead
      setNewNote(''); // Clear the note field for each lead
      toggleModal(); // Open the modal
    } else {
      alert('No lead found for this task');
    }
  };

  const handleUpdateTask = (task) => {
    setSelectedTask(task); 
    setTaskStatus(task.status || ''); 
    setTaskRemark(''); 
    setTaskModal(true); 
  };

  const handleTaskUpdateSubmit = async () => {
    if (!taskStatus || !taskRemark) {
      alert('Please fill out both status and remark');
      return;
    }
  
    try {
      const updatedTask = {
        ...selectedTask,
        status: taskStatus,
        remarks: [
          ...(selectedTask.remarks || []),
          {
            message: taskRemark,
            createdBy: userId,
          },
        ],
      };
  
      const result = await updateTaskOrLead(selectedTask._id, updatedTask); // Update API
      if (result.success) {
        fetchTasks(); // Refresh the task list
        setTaskModal(false); // Close the modal
        toast.success('Task updated successfully!');
      } else {
        toast.error(result.message || 'Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task');
    }
  };
  
  
  
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
        // alert('Note and status updated successfully!');
        fetchTasks(); 
        toggleModal();
        setModal(false);  
        toast.success('Note and status updated successfully!');
      } else {
        // alert(result.message || 'Failed to update lead');
        toast.success(result.message || 'Failed to update lead');
      }
    } catch (error) {
      console.error('Failed to update lead:', error);
      // alert('Failed to update lead');
      toast.error('Failed to update lead');
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
      <div className='page-content'>
        <Breadcrumbs title='CRM' breadcrumbItem='All Tasks' />
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12'>
              <div className='card'>
                <div className='card-body'>
                  <h4 className='card-title'>All Tasks</h4>
                  {message && <p className='text-danger'>{message}</p>}
                  <div className='table-responsive'>
                    <table className='table table-centered table-nowrap table-hover mb-0'>
                      <thead>
                        <tr>
                          <th scope='col'>#</th>
                          <th scope='col'>Lead Names</th>
                          <th scope='col'>Assigned By</th>
                          <th scope='col'>Due Date</th>
                          <th scope='col'>Status</th>
                          <th scope='col'>Actions</th>
                          <th scope='col'>Update Task</th>
                        </tr>
                      </thead>
                      <tbody>
                      {tasks.map((task, index) =>
                        task.leadIds && Array.isArray(task.leadIds) && task.leadIds.length > 0
                            ? task.leadIds.map((lead, leadIndex) => (
                                <tr
                                key={`${task._id}-${leadIndex}`}
                                style={{
                                    backgroundColor: getLeadColor(task.leadIds),
                                }}
                                >
                                <td>{index + 1}</td>
                                <td>{lead.firstName} {lead.lastName}</td>
                                <td>{task.assignedBy?.firstName} {task.assignedBy?.lastName}</td>
                                <td>{new Date(task.dueDate).toLocaleString()}</td>
                                <td>{lead.status}</td>
                                <td>
                                    <button
                                    className='btn btn-primary btn-sm'
                                    onClick={() => handleUpdate(task, lead)}
                                    >
                                    Update
                                    </button>
                                </td>
                                <td>
                                <button
                                    className="btn btn-secondary btn-sm ml-2"
                                    onClick={() => handleUpdateTask(task)}
                                  >
                                    Update
                                  </button>
                                </td>
                                </tr>
                            ))
                            : (
                                <tr
                                key={task._id}
                                style={{
                                    backgroundColor: getLeadColor(task.leadIds),
                                }}
                                >
                                <td>{index + 1}</td>
                                <td>
                                    {task.leadIds?.firstName || ''} {task.leadIds?.lastName || ''}
                                </td>
                                <td>{task.assignedBy?.firstName} {task.assignedBy?.lastName}</td>
                                <td>{new Date(task.dueDate).toLocaleString()}</td>
                                <td>{task.status}</td>
                                <td>
                                    <button
                                    className='btn btn-primary btn-sm'
                                    onClick={() => handleUpdate(task)}
                                    >
                                    Update
                                    </button>
                                </td>
                                <td>
                                <button
                                    className="btn btn-secondary btn-sm ml-2"
                                    onClick={() => handleUpdateTask(task)}
                                  >
                                    Update Task
                                  </button>
                                </td>
                                </tr>
                            )
                        )}
                      </tbody>
                    </table>
                    {tasks.length === 0 && <p className='text-muted'>No tasks to display.</p>}
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
                    <option value="follow-up">Follow-Up</option>
                    <option vlaue="invalid">Invalid</option>
                    <option value="overdue">Overdue</option>
                    <option value="not-interested">Not Interested</option>
                    <option value="converted">Converted</option>
                    <option value="lost">Lost</option>
                    <option value="completed">Completed</option>
                    {/* Add more status options as needed */}
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

        <Modal isOpen={taskModal} toggle={() => setTaskModal(!taskModal)}>
  <ModalHeader toggle={() => setTaskModal(!taskModal)}>Update Task</ModalHeader>
  <ModalBody>
    <div>
      <label>Status</label>
      <Input
        type="select"
        value={taskStatus}
        onChange={(e) => setTaskStatus(e.target.value)}
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </Input>
    </div>
    <div className="mt-3">
      <label>Remark</label>
      <Input
        type="textarea"
        value={taskRemark}
        onChange={(e) => setTaskRemark(e.target.value)}
        placeholder="Add a remark..."
      />
    </div>
  </ModalBody>
  <ModalFooter>
    <Button color="secondary" onClick={() => setTaskModal(!taskModal)}>Cancel</Button>
    <Button color="primary" onClick={handleTaskUpdateSubmit}>Update Task</Button>
  </ModalFooter>
</Modal>

    </React.Fragment>
  );
}

export default AllTasks;
