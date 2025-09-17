// src/utils/axiosClient.js
import axios from 'axios'
import BASE_URL from '../config.js'

// Create axios instance

console.log("base : ", BASE_URL)
const axiosClient = axios.create({
  baseURL: `${BASE_URL}/api/v1`, // Common base url for all APIs
  withCredentials: true, // Important for cookies/session
  headers: {
    'Content-Type': 'application/json'
  }
})

// Optional: Request interceptor (if you want to attach extra headers)
axiosClient.interceptors.request.use(
  (config) => {
    // Example: add custom header if needed
    // config.headers['X-Custom-Header'] = 'my-value';
    return config
  },
  (error) => Promise.reject(error)
)

// Optional: Response interceptor (for centralized error handling)
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized - maybe session expired');
   
      // Optionally: redirect to login
      // window.location.href = "/login";
    }
    return Promise.reject(error)
  }
)

export default axiosClient
