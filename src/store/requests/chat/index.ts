import { axiosInstance } from 'src/store/services';
import { Chat, Message } from 'src/@types/chatTypes';
import { Activity } from 'src/@types/usersTypes';
import {
  CreateChatMessageProps,
  CreateChatProps,
  CreateChatReturn,
  ElderlyActionProps,
  GetChatProps,
} from './types';

export async function createChat(body: CreateChatProps): Promise<CreateChatReturn> {
  return axiosInstance.post('/chats', body);
}

export async function getUserChats(userId: number): Promise<Array<Chat>> {
  const response = await axiosInstance.get(`/chats/${userId}`);
  return response.data;
}

export async function getUserChat({ chatId, activityId }: GetChatProps): Promise<Chat> {
  const response = await axiosInstance.get(`/chats/${chatId}/${activityId}`);
  return response.data;
}

export async function elderlyAction(body: ElderlyActionProps): Promise<{
  action: 'STARTED' | 'CANCELED' | 'FINISHED';
  activity: Activity;
}> {
  const response = await axiosInstance.patch('/chats/elderly-action', body);
  return response.data;
}

export async function createChatMessage(body: CreateChatMessageProps): Promise<Message> {
  const response = await axiosInstance.post('/chats/message', body);
  return response.data;
}
