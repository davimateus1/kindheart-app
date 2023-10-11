import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Chat } from 'src/@types/chatTypes';
import { getUserChat } from 'src/store/requests/chat';

export type UseGetUserChatProps = {
  chatId: string;
  activityId: string;
} & UseQueryOptions<Chat, unknown>;

export const useGetUserChat = ({ chatId, activityId, ...rest }: UseGetUserChatProps) =>
  useQuery({
    queryFn: () => getUserChat({ chatId, activityId }),
    queryKey: ['chat', chatId],
    enabled: !!chatId,
    ...rest,
  });
