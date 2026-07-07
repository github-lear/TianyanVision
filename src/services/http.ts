import axios from 'axios';

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 15000
});

http.interceptors.response.use(
  (response) => response,
  async (error) => Promise.reject(error)
);