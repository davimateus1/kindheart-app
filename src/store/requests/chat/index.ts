import { axiosInstance } from 'src/store/services';
import { Chat } from 'src/@types/chatTypes';
import { CreateChatProps, CreateChatReturn, GetChatProps } from './types';

export async function createChat(body: CreateChatProps): Promise<CreateChatReturn> {
  return axiosInstance.post('/chats', body);
}

export async function getUserChats(userId: number): Promise<Array<Chat>> {
  const response = await axiosInstance.get(`/chats/${userId}`);
  return response.data;
}

export async function getUserChat({
  userSenderId,
  chatId,
  activityId,
}: GetChatProps): Promise<Chat> {
  const response = await axiosInstance.get(`/chats/${userSenderId}/${chatId}/${activityId}`);
  return response.data;
}
