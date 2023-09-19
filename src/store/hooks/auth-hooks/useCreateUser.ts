import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { CreateUserProps } from 'src/store/requests/auth/types';
import { useNavigation } from '@react-navigation/native';

import { createUser } from 'src/store/requests';
import { queryClient } from 'src/store/lib';
import { useCustomToast } from 'src/hooks';

type UseCreateUserProps = {
  createUserLoading: boolean;
  createUserMutate: UseMutateFunction<void, unknown, CreateUserProps, unknown>;
};

export const useCreateUser = (): UseCreateUserProps => {
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const { navigate } = useNavigation();

  const { mutate: createUserMutate, isLoading: createUserLoading } = useMutation({
    mutationFn: createUser,
    onError: () => {
      showErrorToast({
        title: 'Erro ao criar usuário',
        description: 'Verifique seus dados e tente novamente.',
      });
    },
    onSuccess: () => {
      showSuccessToast({
        title: 'Usuário criado com sucesso',
        description: 'Você será redirecionado para a tela de confirmação de código.',
      });

      queryClient.invalidateQueries(['users']);
      navigate('codeScreen' as never);
    },
  });

  return { createUserMutate, createUserLoading };
};
