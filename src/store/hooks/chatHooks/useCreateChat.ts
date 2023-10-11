import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import { queryClient } from 'src/store/lib';
import { useCustomToast } from 'src/hooks';

import { useNavigation } from '@react-navigation/native';
import { CreateChatProps, CreateChatReturn } from 'src/store/requests/chat/types';
import { createChat } from 'src/store/requests';

type UseCreateChatProps = {
  chatLoading: boolean;
  chatMutate: UseMutateFunction<CreateChatReturn, unknown, CreateChatProps, unknown>;
};

export function useCreateChat(): UseCreateChatProps {
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const { navigate } = useNavigation() as any;

  const { mutate: chatMutate, isLoading: chatLoading } = useMutation({
    mutationFn: createChat,
    onError: () => {
      showErrorToast({
        title: 'Erro ao realizar a ação',
        description: 'Provalvemente você já possui um chat ativo com esse usuário.',
      });
    },
    onSuccess: response => {
      const chatId = response.data.chat_id;
      const userSenderId = response.data.user_sender_id;
      const activityId = response.data.activity_id;
      const userName = response.data.user_name;

      showSuccessToast({
        title: `Chat criado com sucesso!`,
        description: 'Você será redirecionado para o chat.',
      });

      queryClient.invalidateQueries(['feed']);

      navigate('Chat', { chatId, userSenderId, activityId, userName });
    },
  });

  return { chatMutate, chatLoading };
}
