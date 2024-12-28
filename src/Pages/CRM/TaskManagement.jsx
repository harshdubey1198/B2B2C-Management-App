import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../../components/Common/Breadcrumb'
import { getAllTasks } from '../../apiServices/service';
import { getRole } from '../../utils/roleUtils';

function TaskManagement() {
    const [tasks, setTasks] = useState([]);
    const role = getRole();
    console.log(role);
    const fetchTasks = async () => {
        try {
            const result = await getAllTasks();
            setTasks(result?.data || []);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
    console.log(tasks);
    useEffect(() => {
        fetchTasks();
    }
    , []);
  return (
    <React.Fragment>
        <div className='page-content'>
            <Breadcrumbs title='CRM' breadcrumbItem='Task Management' />
            
            <div className='table-responsive'>
                <table className='table table-centered table-nowrap table-hover mb-0'>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Description</th>
                            <th scope='col'>Created/Due Date</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Priority</th>
                            <th scope='col'>Assigned To</th>
                            <th scope='col'>Assigned By</th>
                            <th scope='col'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => (
                            <tr key={task._id}>
                                <td>{index + 1}</td>
                                <td>{task.remarks[0].message}</td>
                                <td>
                                {new Date(task.createdAt).toLocaleDateString("en-IN",{
                                    timeZone: "Asia/Kolkata",
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                })}
                                    <br/>
                                {new Date(task.dueDate).toLocaleDateString("en-IN",{
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
                                    {task.assignedTo?.map(user => (
                                        <div key={user._id}>
                                        {user.firstName} {user.lastName}
                                        </div>
                                    )) || 'N/A'}
                                </td>
                                <td>{task.assignedBy?.firstName + ' ' + task.assignedBy?.lastName}</td>
                                <td>
                                    <button className='btn btn-primary btn-sm'>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>    
         </div>   
    </React.Fragment>    
  )
}

export default TaskManagement