import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Chat } from 'src/@types/chatTypes';
import { getUserChat } from 'src/store/requests/chat';

export type UseGetUserChatProps = {
  userSenderId: string;
  chatId: string;
  activityId: string;
} & UseQueryOptions<Chat, unknown>;

export const useGetUserChat = ({
  chatId,
  userSenderId,
  activityId,
  ...rest
}: UseGetUserChatProps) =>
  useQuery({
    queryFn: () => getUserChat({ chatId, userSenderId, activityId }),
    queryKey: ['chat', chatId],
    ...rest,
  });
