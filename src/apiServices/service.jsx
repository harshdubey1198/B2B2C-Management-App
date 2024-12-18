import axios from 'axios';
import constant from './constant';

const token = JSON.parse(localStorage.getItem('authUser')).token;
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTAzZTUyNWZmMzFiOGJjNGQ1ODRjMyIsInJvbGUiOiJjbGllbnRfYWRtaW4iLCJpYXQiOjE3MzQ1MTYyMzYsImV4cCI6MTczNDYwMjYzNn0.PS0MMaJXRohYV6ewygN3d48TFRSYZM1DVcC7EGnUEiE"
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


export default axiosInstance;