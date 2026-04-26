import axios from 'axios';

// Response interceptor to catch 401 Unauthorized
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid – clear local storage and reload to login page
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      window.location.href = '/'; // force redirect to login
    }
    return Promise.reject(error);
  }
);

export default axios;