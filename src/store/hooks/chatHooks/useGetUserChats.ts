import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Chat } from 'src/@types/chatTypes';
import { getUserChats } from 'src/store/requests/chat';

export type UseGetUserChatsProps = {
  userId: number;
} & UseQueryOptions<Array<Chat>, unknown>;

export const useGetUserChats = ({ userId, ...rest }: UseGetUserChatsProps) =>
  useQuery({
    queryFn: () => getUserChats(userId),
    queryKey: ['chats', userId],
    enabled: !!userId,
    ...rest,
  });
