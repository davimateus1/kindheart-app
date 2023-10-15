import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://24.199.113.238:5000',
});
