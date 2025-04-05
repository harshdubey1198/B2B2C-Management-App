import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {
  getAllTasks,
  getCrmUsers,
  updateTask,
} from "../../apiServices/service";
import { getRole } from "../../utils/roleUtils";
import { Table, Button } from "reactstrap";
import TaskEditModal from "../../Modal/crm-modals/taskReassignModal";
import TaskDetailedTableModal from "../../Modal/crm-modals/taskDetailedTableModal";

function TaskManagement() {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [mainModalOpen, setMainModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  // console.log("selectedTask", selectedTask);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterField, setFilterField] = useState("date");
  const [updateData, setUpdateData] = useState({
    assignedTo: "",
    status: "",
  });

  const fetchTasks = async () => {
    try {
      const result = await getAllTasks();
      setTasks(result?.data || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  const handleRefetchTasks =() => {
    fetchTasks();
  };
  const filteredTasks = tasks.filter((task) => {
    if (!searchTerm.trim()) return true; // If no search term, show all tasks
  
    const term = searchTerm.toLowerCase();
  
    // Check 'status'
    if (task.status?.toLowerCase().includes(term)) return true;
  
    // Check 'assignedTo' (concatenated names)
    if (task.assignedTo?.some((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return fullName.includes(term);
    })) return true;
  
    // Check 'date' (createdAt or dueDate)
    const createdAt = new Date(task.createdAt).toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
    });
    const dueDate = new Date(task.dueDate).toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
    });
    if (createdAt.includes(term) || dueDate.includes(term)) return true;
  
    return false; // If no match, exclude the task
  });
  

  const fetchUsers = async () => {
    try {
      const result = await getCrmUsers();
      setUsers(result?.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setUpdateData({
      assignedTo: task.assignedTo[0]?._id || "",
      status: task.status || "",
    });
    setModalOpen(true);
    fetchUsers();
  };

  const handleUpdateTask = async () => {
    try {
      await updateTask(selectedTask._id, updateData);
      fetchTasks();
      setModalOpen(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="CRM" breadcrumbItem="Task Management" />
        <div className="search-bar mb-3 d-flex align-items-center justify-content-start gap-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Date, Assigned To, or Status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "300px" }}
          />
           <i className='bx bx-refresh cursor-pointer'  style={{fontSize: "24.5px",fontWeight: "bold",color: "black",transition: "color 0.3s ease"}} onClick={handleRefetchTasks} onMouseEnter={(e) => e.target.style.color = "green"}  onMouseLeave={(e) => e.target.style.color = "black"}></i>
        </div>


        <div className="table-responsive">
          <Table hover bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Description</th>
                <th>Created/Due Date</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Assigned To</th>
                <th>Assigned By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task, index) => (
                <tr key={task._id} onClick={() => {
                  setMainModalOpen(true);
                  setSelectedTask(task);}
                } style={{ cursor: "pointer" }}>
                  <td>{index + 1}</td>
                  <td>{task.remarks[0].message}</td>
                  <td>
                    {new Date(task.createdAt).toLocaleDateString("en-IN", {
                      timeZone: "Asia/Kolkata",
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                    <br />
                    {new Date(task.dueDate).toLocaleDateString("en-IN", {
                      timeZone: "Asia/Kolkata",
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>
                  <td>{task.status}</td>
                  <td>{task.priority}</td>
                  <td>
                    {task.assignedTo?.map((user) => (
                      <div key={user._id}>
                        {user.firstName} {user.lastName}
                      </div>
                    )) || "N/A"}
                  </td>
                  <td>{task.assignedBy?.firstName + " " + task.assignedBy?.lastName}</td>
                  <td>
                    <Button
                      color="primary"
                      size="sm"
                      onClick={() => handleEditClick(task)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <TaskEditModal
          isOpen={modalOpen}
          toggle={() => setModalOpen(!modalOpen)}
          updateData={updateData}
          setUpdateData={setUpdateData}
          users={users}
          handleUpdateTask={handleUpdateTask}
        />
        <TaskDetailedTableModal
          isOpen={mainModalOpen}
          toggle={() => setMainModalOpen(!mainModalOpen)}
          task={selectedTask}
          loading={false}
          onUpdate={handleUpdateTask}
        />

      </div>
    </React.Fragment>
  );
}

export default TaskManagement;
