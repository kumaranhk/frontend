// src/utils/axiosInstance.js
import axios from 'axios';
import constants from '../constants/constants';

const getAccesstoken = () => {
    const token = localStorage.getItem('token');
    return token
}

// Function to handle logout
const handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); // or any other logic to clear user session
    window.na
};

const axiosInstance = axios.create({
    baseURL: constants.URL, // replace with your API base URL
});

// // Request Interceptor (optional, for adding auth headers)
// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token'); // or your method of retrieving the token
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            handleLogout();
        }
        return Promise.reject(error);
    }
);

export { getAccesstoken, axiosInstance }