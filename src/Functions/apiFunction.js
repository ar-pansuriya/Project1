import axios from 'axios';

const baseApiUrl =  "https://api-ds.markaazdata.com"
const apiKey = "7ewZZL2Lg28cONdzCJmax26f0aBjhoReBBcV5Yig";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: baseApiUrl, 
  timeout: 5000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an API key dynamically for all requests
axiosInstance.interceptors.request.use(
    (config) => {
      if (apiKey) {
        config.headers['x-api-key'] = apiKey; // Add the API key
        // console.log('Request Headers:', config.headers); // Debug the headers
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

// GET function
export const getAPI = async (path, optionalKey = null) => {
  try {
    // Add headers dynamically
    const config = {};
    if (optionalKey) {
      config.headers = { primary_mkid: optionalKey };
    }
    const response = await axiosInstance.get(path, config);
    return response.data;
  } catch (error) {
    handleAPIError(error);
  }
};

// POST function
export const postAPI = async (path, data = {}) => {
  try {
    const response = await axiosInstance.post(path, data);
    return response.data;
  } catch (error) {
    handleAPIError(error);
  }
};

// PUT function
export const putAPI = async (path, data = {}) => {
  try {
    const response = await axiosInstance.put(path, data);
    return response.data;
  } catch (error) {
    handleAPIError(error);
  }
};

// Handle API errors
const handleAPIError = (error) => {
  if (error.response) {
    // Server responded with a status other than 2xx
    console.error('Response Error:', error.response.data);
  } else if (error.request) {
    // No response received
    console.error('Request Error:', error.request);
  } else {
    // Other errors
    console.error('Error:', error.message);
  }
  throw error; // Re-throw error to handle it further if needed
};
