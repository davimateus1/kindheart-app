import { axiosInstance } from 'src/store/services';
import { CreateUserProps } from './types';

export async function createUser(data: CreateUserProps) {
  const response = await axiosInstance.post('/auth/register', data);
  return response.data;
}
