import axios from 'axios';
import constant from './constant';

const token = JSON.parse(localStorage.getItem('authUser'))?.token;

const creatorId = JSON.parse(localStorage.getItem('authUser'))?.response?._id;
const firmId = JSON.parse(localStorage.getItem('authUser'))?.response?.adminId;
const axiosInstance = axios.create({
    baseURL: `${constant.appBaseUrl}/api/`,
    headers: {
        Authorization: token ? `Bearer ${token}` : null,
     },
    });


axiosInstance.interceptors.response.use(
    (response) => response,
    (error) =>
        Promise.reject(
        (error.response && error.response.data) || 'Something went wrong'
        )
    );
      
// to get all leads 
export const getAllLeads = async () => {
    try {
        const response = await axiosInstance.get('/lead/get-leads');
        return response.data;
    } catch (error) {
        return error;
    }
};
// lead by id 
export const getLeadById = async (id) => {
    try {
        const response = await axiosInstance.get(`/lead/get-lead/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

// to add lead
export const addLead = async (lead) => {
    try {
        const response = await axiosInstance.post('/lead/create-lead', lead);
        return response.data;
    } catch (error) {
        return error;
    }
};

// to update lead
export const updateLeadById = async (id, lead) => {
    try {
        const response = await axiosInstance.put(`/lead/update-lead/${id}`, lead);
        return response.data;
    } catch (error) {
        return error;
    }
};
// to delete lead
export const deleteLeadById = async (id) => {
    try {
        const response = await axiosInstance.delete(`/lead/delete-lead/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
};
// multiple delete leads
export const deleteMultipleLeads = async (data) => {
    try {
        const response = await axiosInstance.delete('/lead/delete-multiple-leads', { data, 
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};



// to assign lead to employee
export const assignLeadsToEmployee = async (data) => {
    try {
        const response = await axiosInstance.post('/task/create-task', data);
        return response.data;
    } catch (error) {
        return error;
    }
};

// to get firm users 
export const getFirmUsers = async () => {
    try {
        const response = await axiosInstance.get('/auth/getCompany');
        return response.data;
    } catch (error) {
        return error;
    }
};
// to get tasks 
export const getAllTasks = async () => {
    try {
        const response = await axiosInstance.get('/task/get-tasks');
        return response.data;
    } catch (error) {
        return error;
    }
};

//to update task
export const updateTaskOrLead = async (id, updateData) => {
    try {
      const response = await axiosInstance.put(`/task/update-task/${id}`, updateData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

// get tasks by assignee id 
export const getTasksByAssignee = async (id) => {
    try {
        const response = await axiosInstance.get(`/task/assignedto/${id}`);
        return response.data;
    }
    catch (error) {
        return error;
    }
};
 

//   role management
export const getRoles = async () => {
    try {
        const response = await axiosInstance.get('/role/get-roles');
        const filteredRoles = response.data.data.filter(role => role.deleted_at === null);
        // console.log(filteredRoles);
        return filteredRoles;
    } catch (error) {
        return error;
    }
};



// to create role
export const createRole = async (role) => {
    try {
        const response = await axiosInstance.post('/role/create-role', role);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Failed to create role');
        }
        throw new Error('Network error or server not responding');
    }
};

// update role
export const updateRoleById = async (id, role) => {
    try {
        const response = await axiosInstance.put(`/role/update-role/${id}`, role);
        return response.data;
    } catch (error) {
        return error;
    }
};


// to delete role
export const deleteRoleById = async (id) => {
    try {
        const response = await axiosInstance.delete(`/role/delete-role/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

// to create crm users 
    export const createCrmUser = async (user) => {
        try {
            const response = await axiosInstance.post(`/crmuser/create-crmsuser/${creatorId}`, user);
            return response.data;
        } catch (error) {
            return error;
        }
    }
// to update crm users
    export const updateCrmUser = async (userId, user) => {
        try {
          const response = await axiosInstance.put(`/crmuser/update-crmsuser/${userId}`, user);
          return response.data;
        } catch (error) {
          return error;
        }
      };
      
// to get crm users
export const getCrmUsers = async () => {
    try {
        const response = await axiosInstance.get(`/crmuser/get-crmsuser/${firmId}`);
        return response.data;
    } catch (error) {
        return error;
    }
}; 

// to upload leads by xlsx , csv , json
export const uploadLeads = async (data) => {
    try {
        const response = await axiosInstance.post('/lead/importLead', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

//  to export leads
export const exportLeads = async (data) => {
    try {
        const response = await axiosInstance.post('/lead/exportLead', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};



export default axiosInstance;