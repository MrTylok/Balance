import axios from 'axios';
const BASE_URL = 'http://localhost:4000';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default axiosInstance;
