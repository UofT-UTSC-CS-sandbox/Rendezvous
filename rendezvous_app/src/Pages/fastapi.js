import axios from 'axios';
import { getToken } from './token';

const BackendApi = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

const publicEndpoints = ['/login', '/register', '/home', '/about'];

BackendApi.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token && !publicEndpoints.some(endpoint => config.url.startsWith(endpoint))) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default BackendApi