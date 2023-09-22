import { axiosInstance } from 'src/store/services';
import { GetUserProfileProps } from './types';

export async function getUserProfile({ userId, userType }: GetUserProfileProps) {
  const response = await axiosInstance.get(`/users/${userId}/${userType}`);
  return response.data;
}
