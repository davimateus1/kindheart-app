import { axiosInstance } from 'src/store/services';
import { CreateUserProps, CodeConfirmationProps } from './types';

export async function createUser(data: CreateUserProps) {
  const response = await axiosInstance.post('/auth/register', data);
  return response.data;
}

export async function confirmCode(data: CodeConfirmationProps) {
  const response = await axiosInstance.patch('/auth/confirm', data);
  return response.data;
}
