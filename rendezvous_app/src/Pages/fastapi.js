import axios from 'axios';

const BackendApi = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export default BackendApi