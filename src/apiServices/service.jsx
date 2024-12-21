import axios from 'axios';
import constant from './constant';

const token = JSON.parse(localStorage.getItem('authUser'))?.token;

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


export default axiosInstance;