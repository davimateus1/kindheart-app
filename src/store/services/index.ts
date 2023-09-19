import { API_URL } from '@env';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: API_URL,
});
