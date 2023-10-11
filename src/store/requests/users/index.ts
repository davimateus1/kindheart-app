import { axiosInstance } from 'src/store/services';
import { CreateFriendshipProps, GetUserProfileProps } from './types';

export async function getUserProfile({ userId }: GetUserProfileProps) {
  const response = await axiosInstance.get(`/users/${userId}`);
  return response.data;
}

export async function createFriendship(
  body: CreateFriendshipProps,
): Promise<{ data: { message: string } }> {
  return axiosInstance.post('/users/friendship-action', body);
}
