import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { CreateUserProps, CreateUserResponse } from 'src/store/requests/auth/types';
import { useNavigation } from '@react-navigation/native';

import { createUser } from 'src/store/requests';
import { queryClient } from 'src/store/lib';
import { useCustomToast } from 'src/hooks';
import { sendCodeCredentialsStore } from 'src/store';

type UseCreateUserProps = {
  createUserLoading: boolean;
  createUserMutate: UseMutateFunction<CreateUserResponse, unknown, CreateUserProps, unknown>;
};

export function useCreateUser(): UseCreateUserProps {
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const [setCredentials] = sendCodeCredentialsStore(state => [state.setCredentials]);

  const { navigate } = useNavigation();

  const { mutate: createUserMutate, isLoading: createUserLoading } = useMutation({
    mutationFn: createUser,
    onError: () => {
      showErrorToast({
        title: 'Erro ao criar usuário',
        description: 'Verifique seus dados e tente novamente.',
      });
    },
    onSuccess: data => {
      showSuccessToast({
        title: 'Usuário criado com sucesso',
        description: 'Você será redirecionado para a tela de confirmação de código.',
      });

      setCredentials({
        first_name: data.first_name,
        personal_phone: data.personal_phone,
      });

      queryClient.invalidateQueries(['users']);
      navigate('CodeScreen' as never);
    },
  });

  return { createUserMutate, createUserLoading };
}
