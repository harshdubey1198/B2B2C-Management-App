import React, { useEffect, useState } from 'react';
import { assignLeadsToEmployee, getAllTasks, getCrmUsers, getTasksByAssignee, updateLeadStatus, updateTask } from '../../apiServices/service';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label, Card, CardBody, Row, Col } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { toast } from 'react-toastify';
import { getRole } from '../../utils/roleUtils';


function AllTasks() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState('Medium');
  const [remark, setRemark] = useState('');
  const [modal, setModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [newNote, setNewNote] = useState('');
  const authUser = JSON.parse(localStorage.getItem('authUser'));
  const userId = authUser?.response?._id;
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskStatus, setTaskStatus] = useState(''); 
  const [taskRemark, setTaskRemark] = useState(''); 
  const [taskModal, setTaskModal] = useState(false)
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [leadsForwarding, setLeadsForwarding] = useState([]);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [LowerRoleUsers, setLowerRoleUsers] = useState([]);
  const [lowerUserTaskModal, setLowerUserTaskModal] = useState(false);
  const [ leadMainDetailModal, setLeadMainDetailModal] = useState(false);
  const role = getRole();

  const fetchTasks = async () => {
    try {
      const result = await getTasksByAssignee(userId);
      const allTasks = result?.data || [];

      // filter out the tasks that are having due date in the future 
      // and status is not completed
      const filteredTasks = allTasks.filter((task) => {
        const dueDate = new Date(task.dueDate);
        // console.log("Due Date:", dueDate);
        const currentDate = new Date();
        // console.log("Current Date:", currentDate);
        // return dueDate < currentDate && task.status !== 'completed'; // not like this 
        return dueDate > currentDate ;
      });



      setTasks(filteredTasks);
      console.log("Filtered Tasks:", filteredTasks.leadIds);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const toggleModal = () => setModal(!modal);
  const toggleLowerUserTaskModal = () => setLowerUserTaskModal(!lowerUserTaskModal);
  const toggleLeadMainDetailModal = () => setLeadMainDetailModal(!leadMainDetailModal);
  const handleUpdate = (task, lead) => {
    if (lead) {
      setSelectedLead(lead); 
      setNewNote(''); 
      toggleModal();
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
        status: taskStatus,
        dueDate: selectedTask.dueDate, 
        remarks: {
          message: taskRemark,
          createdBy: userId, 
        },
      };
  
      const result = await updateTask(selectedTask._id, updatedTask); 
      // console.log(result, "result")
      if (result.message ==="Task updated Succefully") {
        fetchTasks();
        setTaskModal();
        toast.success(result.message);
      } else {
        toast.success(result.message);
      }
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task');
    }
  };
 
  const handleNoteSubmit = async () => {
    if (!newNote) {
        toast.error('Please enter a note');
        return;
    }

    try {
        if (!selectedLead || !selectedLead._id) {
            toast.error('No lead selected');
            return;
        }

        const updatePayload = {
            status: selectedLead.status,
            noteMessage: newNote,
            userId: userId,
        };

        const result = await updateLeadStatus(selectedLead._id, updatePayload);
        
        if (result && result.data) {
            fetchTasks();
            toggleModal();
            setModal(false);  
            toast.success('Note and status updated successfully!');
        } else {
            toast.error(result.error || 'Failed to update lead');
        }
    } catch (error) {
        console.error('Failed to update lead:', error);
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


  const fetchLowerRoleUsers = async () => {
    try {
      const result = await getCrmUsers();
      setLowerRoleUsers(result.data || []);
      // console.log("Lower role users:", LowerRoleUsers);
    } catch (error) {
      console.error('Failed to get lower role users:', error);
    }
  };
  
  const handleAssignUserSelect = (e) => {
    let filteredUsers = [];
    
    if (role === 'ASM') {
      filteredUsers = LowerRoleUsers.filter(user => user.roleId.roleName === 'SM');
      // console.log("ASM filtered users:", filteredUsers);
    } else if (role === 'SM') {
      filteredUsers = LowerRoleUsers.filter(user => user.roleId.roleName === 'Telecaller');
      // console.log("SM filtered users:", filteredUsers);
    }
    
    setFilteredUsers(filteredUsers);
    // console.log("Filtered users:", filteredUsers);
  };

  useEffect(() => {
    fetchLowerRoleUsers();
  }, []); 
  
  useEffect(() => {
    handleAssignUserSelect();
  }, [LowerRoleUsers]); 
  

  
  const handleLeadSelection = (leadId) => {
    setSelectedLeads((prevSelectedLeads) => {
        if (prevSelectedLeads.includes(leadId)) {
            console.log("Unchecking lead:", leadId);
            return prevSelectedLeads.filter((id) => id !== leadId);
        } else {
            console.log("Checking lead:", leadId);
            return [...prevSelectedLeads, leadId];
        }
    });
};

// console.log("Selected Leads:", selectedLeads);
  
const handleAssignTask = async () => {
  if (selectedLeads.length === 0) {
    alert('Please select at least one lead to assign');
    return;
  }
  try {
    const task = {
      leadIds: selectedLeads,
      assignedTo: [assignedTo],
      assignedBy: userId,
      status: 'pending',
      priority: priority,
      dueDate: dueDate,
      remarks: [
        {
          message: remark,
          createdBy: userId,
        },
      ],
    };
    const result = await assignLeadsToEmployee(task);
    if (result) {
      setLowerUserTaskModal(false);
      toast.success('Task assigned successfully');
    } else {
      toast.error('Failed to assign task');
    }
  } catch (error) {
    console.error('Failed to assign task:', error);
    toast.error('Failed to assign task');
  }
};




  // useEffect(() => {
  //   fetchLowerRoleUsers();
  //   handleAssignUserSelect();
  // }
  // , []);
  

  
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
                  {/* {message && <p className='text-danger'>{message}</p>} */}
                  <div className='button-panel'>
                  { (role === 'ASM' || role === 'SM') && (
                    <button
                      className='btn btn-primary'
                      onClick={() => setLowerUserTaskModal(!lowerUserTaskModal)}
                    >
                      Assign Task
                    </button>
                  ) 

                  }  
                  </div>
                  <div className='table-responsive'>
                    <table className='table table-centered table-nowrap table-hover mb-0'>
                      <thead>
                        <tr>
                          { (role !== "Telecaller") && (
                            <th>
                            <input
                              type="checkbox"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  // Select all leads
                                  const allLeadIds = tasks
                                    .flatMap((task) => task.leadIds)
                                    .filter(Boolean)
                                    .map((lead) => lead._id);
                                  setSelectedLeads(allLeadIds);
                                } else {
                                  // Deselect all leads
                                  setSelectedLeads([]);
                                }
                              }}
                              checked={
                                tasks
                                  .flatMap((task) => task.leadIds)
                                  .filter(Boolean)
                                  .length === selectedLeads.length
                              }
                            />
                          </th>
                          )
                          }
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
                                    cursor: 'pointer',
                                }}
                                onClick={
                                  ()=>{
                                    setLeadMainDetailModal(!leadMainDetailModal);
                                    setSelectedLead(lead);
                                  }
                                }
                                >
                                  { (role !== "Telecaller") && (
                                    <td>
                                    <input
                                      type="checkbox"
                                      value={lead._id}
                                      checked={selectedLeads.includes(lead._id)}
                                      onChange={() => handleLeadSelection(lead._id)}
                                      />
                                    </td>
                                    )
                                  }
                                <td>{leadIndex + 1}</td>
                                <td>{lead.firstName} {lead.lastName}</td>
                                <td>{task.assignedBy?.firstName} {task.assignedBy?.lastName} </td>
                                <td>{new Date(task.dueDate).toLocaleString("en-IN", {
                                                timeZone: "Asia/Kolkata",
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: true,
                                            })}</td>
                                <td>{lead.status}</td>
                                <td>
                                    <button
                                    className='btn btn-primary btn-sm'
                                    onClick={(e) => {handleUpdate(task, lead)
                                      e.stopPropagation();
                                    }}
                                    >
                                    Update
                                    </button>
                                </td>
                                <td>
                                <button
                                    className="btn btn-secondary btn-sm ml-2"
                                    onClick={(e) =>{e.stopPropagation(); handleUpdateTask(task)}}
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

      <Modal isOpen={leadMainDetailModal} toggle={toggleLeadMainDetailModal}>
        <ModalHeader toggle={toggleLeadMainDetailModal}>Lead Details</ModalHeader>
        <ModalBody>
          {selectedLead && (
              <Card className="shadow-sm border-0 mb-3">
                <CardBody>
                  <Row>
                    {[
                      { label: 'First Name', value: selectedLead.firstName },
                      { label: 'Last Name', value: selectedLead.lastName },
                      { label: 'Email', value: selectedLead.email },
                      { label: 'Mobile Number', value: selectedLead.mobileNumber },
                      { label: 'Phone Number', value: selectedLead.phoneNumber },
                      { label: 'Platform', value: selectedLead.platform },
                      { label: 'Ad Name', value: selectedLead.adName },
                      { label: 'Form Name', value: selectedLead.formName },
                      { label: 'Status', value: selectedLead.status }
                    ].map((field, index) => (
                      <Col md="6" className="mb-3" key={index}>
                        <div style={{ 
                          background: "#f8f9fa", 
                          padding: "12px 15px", 
                          borderRadius: "8px", 
                          boxShadow: "0 1px 3px rgba(0,0,0,0.1)" 
                        }}>
                          <strong style={{ color: "#343a40", fontSize: "0.9rem" }}>
                            {field.label}:
                          </strong>
                          <div style={{ color: "#495057", marginTop: "4px" }}>
                            {field.value || "-"}
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </CardBody>
              </Card>
            )}
        </ModalBody>
      </Modal>


{/* note update of lead modal */}
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
                    <option value="Completed">Completed</option>
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


{/* for the task update logic */}
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
                    <option value="inProgress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="overdue">Overdue</option>
                    <option value="missed">missed</option>
                    <option value="failed">failed</option>
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


{/* for lower user task assignment */}
        <Modal isOpen={lowerUserTaskModal} toggle={toggleLowerUserTaskModal}>
            <ModalHeader toggle={toggleLowerUserTaskModal}>Assign Task</ModalHeader>

            <ModalBody>
              <div>
                <h5>Leads Forwarding</h5>
                <div>
                  <label>Assign to Employee</label>
                  <Input
                    type="select"
                    onChange={(e) => setAssignedTo(e.target.value)}
                  >
                    <option value="">Select Employee</option>
                    {filteredUsers.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.firstName} {user.lastName} - {user.roleId.roleName}
                      </option>
                    ))}
                  </Input>

                  <label>Priority</label>
                  <Input
                    type="select"
                    name="priority"
                    id="priority"
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </Input>

                  <label>Remark</label>
                  <Input
                    type="textarea"
                    name="remark"
                    id="remark"
                    placeholder="Add a remark..."
                    onChange={(e) => setRemark(e.target.value)}
                  />
                  <label for="dueDate">Due Date</label>
                  <Input
                    type="date"
                    name="dueDate"
                    id="dueDate"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </div>
            </ModalBody>

              <ModalFooter>
                <Button color="secondary" onClick={toggleLowerUserTaskModal}>
                  Cancel
                </Button>
                <Button color="primary" onClick={handleAssignTask}>
                  Assign Task
                </Button>
              </ModalFooter>
          </Modal>

    </React.Fragment>
  );
}

export default AllTasks;
