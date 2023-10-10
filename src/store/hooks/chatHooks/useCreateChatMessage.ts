import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import { useCustomToast } from 'src/hooks';

import { CreateChatMessageProps } from 'src/store/requests/chat/types';
import { createChatMessage } from 'src/store/requests';
import { Message } from 'src/@types/chatTypes';
import { queryClient } from 'src/store/lib';

type UseCreateChatMessageProps = {
  messageLoading: boolean;
  messageMutate: UseMutateFunction<Message, unknown, CreateChatMessageProps, unknown>;
};

export function useCreateChatMessage(): UseCreateChatMessageProps {
  const { showErrorToast } = useCustomToast();

  const { mutate: messageMutate, isLoading: messageLoading } = useMutation({
    mutationFn: createChatMessage,
    onError: () => {
      showErrorToast({
        title: 'Erro ao enviar a mensagem',
        description: 'Tente novamente mais tarde.',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['chats']);
      queryClient.invalidateQueries(['chat']);
    },
  });

  return { messageMutate, messageLoading };
}
