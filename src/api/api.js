import axios from "axios";

// Create an axios instance with default settings
const token = localStorage.getItem("AdminInfo");

const api = axios.create({
  baseURL: "http://localhost:8080/api/",  // Your backend API URL
  headers: {
    "Content-Type": "application/json",
    "Authorization":`Bearer ${token}`
  },
});

// Set Authorization token for protected routes if available


// General GET request
export const getData = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error getting data:", error.response || error.message);
    throw error;
  }
};


// General POST request
export const postData = async (endpoint, data , headers) => {
  try {
    const response = await api.post(endpoint, data ,headers ? headers : null );
    return response.data;  // Return the response data
  } catch (error) {
    console.error("Error posting data", error);
    throw error;
  }
};

// General PUT request
export const updateData = async (endpoint, data) => {
  try {
    const response = await api.put(endpoint, data);
    return response.data;  // Return the response data
  } catch (error) {
    console.error("Error updating data", error);
    throw error;
  }
};

// General DELETE request
export const deleteData = async (endpoint) => {
  try {
    const response = await api.delete(endpoint);
    return response.data;  // Return the response data
  } catch (error) {
    console.error("Error deleting data", error);
    throw error;
  }
};

export default api;
