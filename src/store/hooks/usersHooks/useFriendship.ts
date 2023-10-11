import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import { queryClient } from 'src/store/lib';
import { useCustomToast } from 'src/hooks';
import { createFriendship } from 'src/store/requests';
import { CreateFriendshipProps } from 'src/store/requests/users/types';

type UseFriendshipProps = {
  friendshipLoading: boolean;
  friendshipMutate: UseMutateFunction<
    { data: { message: string } },
    unknown,
    CreateFriendshipProps,
    unknown
  >;
};

export function useFriendship(): UseFriendshipProps {
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const { mutate: friendshipMutate, isLoading: friendshipLoading } = useMutation({
    mutationFn: createFriendship,
    onError: () => {
      showErrorToast({
        title: 'Erro ao realizar a ação',
        description: 'Tente novamente mais tarde.',
      });
    },
    onSuccess: response => {
      showSuccessToast({
        title: `Usuário ${
          response.data.message.includes('addeed') ? 'adicionado' : 'removido'
        } com sucesso!`,
        description: response.data.message.includes('addeed')
          ? 'Agora você pode interagir com o usuário'
          : 'Você não pode mais interagir com o usuário',
      });

      queryClient.invalidateQueries(['feed']);
      queryClient.invalidateQueries(['users']);
    },
  });

  return { friendshipMutate, friendshipLoading };
}
