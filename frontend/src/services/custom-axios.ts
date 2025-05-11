import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACKEND_URL as string;

const axiosInstance = axios.create({ baseURL: apiUrl });

export default axiosInstance;
