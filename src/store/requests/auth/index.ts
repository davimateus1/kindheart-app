import { axiosInstance } from 'src/store/services';
import {
  CreateUserProps,
  CodeConfirmationProps,
  SendCodeProps,
  CreateUserResponse,
  LoginUserResponse,
  LoginUserProps,
} from './types';

export async function createUser(data: CreateUserProps): Promise<CreateUserResponse> {
  const response = await axiosInstance.post('/auth/register', data);
  return response.data;
}

export async function confirmCode(data: CodeConfirmationProps): Promise<void> {
  const response = await axiosInstance.patch('/auth/confirm', data);
  return response.data;
}

export async function sendCode(data: SendCodeProps): Promise<void> {
  const response = await axiosInstance.post('/auth/send-code', data);
  return response.data;
}

export async function loginUser(data: LoginUserProps): Promise<LoginUserResponse> {
  const response = await axiosInstance.post('/auth/login', data);
  return response.data;
}
