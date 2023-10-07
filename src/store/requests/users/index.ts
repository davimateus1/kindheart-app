import { axiosInstance } from 'src/store/services';
import { CreateFriendshipProps, GetUserProfileProps } from './types';

export async function getUserProfile({ userId, userType }: GetUserProfileProps) {
  const response = await axiosInstance.get(`/users/${userId}/${userType}`);
  return response.data;
}

export async function createFriendship(
  body: CreateFriendshipProps,
): Promise<{ data: { message: string } }> {
  return axiosInstance.post('/users/friendship-action', body);
}
