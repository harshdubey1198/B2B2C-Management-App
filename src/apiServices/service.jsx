import axios from 'axios';
import constant from './constant';

const token = JSON.parse(localStorage.getItem('authUser'))?.token;
const id = JSON.parse(localStorage.getItem('authUser'))?.response?._id;
const creatorId = JSON.parse(localStorage.getItem('authUser'))?.response?._id;
const firmId = JSON.parse(localStorage.getItem('authUser'))?.response?.adminId || JSON.parse(localStorage.getItem('authUser'))?.response?.firmId;
const Role = JSON.parse(localStorage.getItem('authUser'))?.response?.role;
const axiosInstance = axios.create({
    baseURL: `${constant.appBaseUrl}/api/`,
    headers: {
        Authorization: token ? `Bearer ${token}` : null,
     },
    });

const createAxiosInstance = axios.create({
    baseURL: `${constant.appBaseUrl}/api/`,
    headers: {  
        "Content-Type":"multipart/form-data",
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

// to get user id data using crmuser id 
export const getCrmUserById = async () => {
    try {
        const response = await axiosInstance.get(`crmuser/crmsuser-account/${id}`);
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
// to update the task
export const updateTask = async (id, task) => {
    try {
        const response = await axiosInstance.put(`/task/update-task/${id}`, task);
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
  
// update crm user password 
export const updateCrmUserPassword = async (passwordData) => {
    try {
      const response = await axiosInstance.post(`/crmuser/update-crmpassword/${id}`, passwordData);
      return response.data;
    } catch (error) {
      console.error('Error updating CRM user password:', error);
      throw error.response?.data || error;
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

//  update lead status by userId and leadId
export const updateLeadStatus = async (id, data) => {
    try {
        const response = await axiosInstance.put(`/lead/update-leadstatus/${id}`, data);
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : error;
    }
};

//  get firm data using id 
export const getFirmById = async () => {
    try {
        const response = await axiosInstance.get(`/auth/getfirm/${firmId}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

// get all plans 
export const getAllPlans = async () => {
    try {
        const response = await axiosInstance.get('/plan/all');
        return response.data.response;
    } catch (error) {
        return error;
    }
};



//  to approve status of client 
export const approveClient = async (id, data) => {
    try {
        const response = await axiosInstance.put(`/auth/approveClient/${id}`, data);
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : error;
    }
}

//  to inactive status of client
export const inactiveClient = async (id, data) => {
    try {
        const response = await axiosInstance.put(`/auth/userInactive/${id}`, data);
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : error;
    }
}


//  blogcategory create api

export const createBlogCategory = async (data) => {
    try {
        const response = await axiosInstance.post(`/blogcategory/create-blogCategory/${id}`, data);
        console.log(id);
        return response.data;
    } catch (error) {
        return error;
    }
};

// to get all blog categories
export const getBlogCategories = async () => {
    try {
        const response = await axiosInstance.get('/blogcategory/get-blogcategories');
        return response.data;
    } catch (error) {
        return error;
    }
};

// to get single blog category by id
export const getBlogCategoryById = async (id) => {
    try {
        const response = await axiosInstance.get(`/blogcategory/get-blogCategory/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

// to update blog category

export const updateBlogCategory = async (id, data) => {
    try {
        const response = await axiosInstance.put(`/blogcategory/update-blogCategory/${id}`, data);
        return response.data;
    } catch (error) {
        return error;
    }
};

// to delete blog category
export const deleteBlogCategory = async (id) => {
    try {
        const response = await axiosInstance.delete(`/blogcategory/delete-blogCategory/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

// to create blog
export const createBlog = async (data) => {
    try {
        const response = await createAxiosInstance.post(`/blog/create-blog`, data);
        return response.data;
    } catch (error) {
        return error;
    }
};


// to get all blogs
export const getBlogs = async () => {
    try {
        const response = await axiosInstance.get('/blog/get-blogs');
        return response.data;
    } catch (error) {
        return error;
    }
};

// to get blog by Id
export const getBlogById = async (id) => {
    try {
        const response = await axiosInstance.get(`/blog/get-blog/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

// to update blog by id
export const updateBlog = async (id, data) => {
    try {
        const response = await axiosInstance.put(`/blog/update-blog/${id}`, data);
        return response.data;
    } catch (error) {
        return error;
    }
};

// get blogs by blog_slug
export const getBlogBySlug = async (slug) => {
    try {
        const response = await axiosInstance.get(`/blog/get-blog-slug/${slug}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

// to delete blog by id
export const deleteBlog = async (id) => {
    try {
        const response = await axiosInstance.delete(`/blog/delete-blog/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

// feedback api services 

export const createFeedback = async (data) => {
    try{
        const response = await createAxiosInstance.post(`/feedback/create-feedback`, data); 
        return response.data;
    }
    catch(error){
        return error;
    }
}

export const getAllFeedbacks = async () => {
    try {
        const response = await axiosInstance.get('/feedback/get-feedbacks');
        return response.data;
    } catch (error) {
        return error;
    }
}

export const getFeedbackById = async (id) => {
    try {
        const response = await axiosInstance.get(`/feedback/get-feedback/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const updateFeedback = async (id, data) => {
    try {
        const response = await createAxiosInstance.put(`/feedback/update-feedback/${id}`, data);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const deleteFeedbackById = async (id) => {
    try { 
        const response = await axiosInstance.delete(`/feedback/delete-feedback/${id}`);
        return response.data;
    }
    catch (error) {
        return error;
    }
}


// get item category 
export const getItemCategories = async () => {
    try {
        const response = await axiosInstance.get(`/category/get-categories/${firmId}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getItemSubCategories = async (categoryId) => {
    try {
        const response = await axiosInstance.get(`/category/subcategories/${categoryId}`);
        return response.data;
    }
    catch (error) {
        return error;
    }
}

export default axiosInstance;