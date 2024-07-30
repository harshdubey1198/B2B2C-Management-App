import axios from "axios";

export const PostRequest = async (url, data, config) => {
    try {
        const response = await axios.post(url, data, config);
        return response;
    } catch (error) {
        throw error.response;
    }
};

export const GetRequest = async (url, data) => {
    try {
        const response = await axios.get(url, data);
        return response;
    } catch (error) {
        throw error.response;
    }
};

export const PutRequest = async (url, data, config) => {
    try {
        const response = await axios.put(url, data, config);
        return response;
    } catch (error) {
        throw error.response;
    }
};

export const DeleteRequest = async (url, config) => {
    try {
        const response = await axios.delete(url, config);
        return response;
    } catch (error) {
        throw error.response;
    }
};