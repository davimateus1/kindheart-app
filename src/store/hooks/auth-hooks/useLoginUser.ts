import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { LoginUserProps, LoginUserResponse } from 'src/store/requests/auth/types';
import { useNavigation } from '@react-navigation/native';

import { loginUser } from 'src/store/requests';
import { useAsyncStorage, useCustomToast } from 'src/hooks';
import { sendCodeCredentialsStore } from 'src/store';

type UseLoginUserProps = {
  loginUserLoading: boolean;
  loginUserMutate: UseMutateFunction<LoginUserResponse, unknown, LoginUserProps, unknown>;
};

export function useLoginUser(): UseLoginUserProps {
  const { navigate } = useNavigation();
  const { storeData } = useAsyncStorage();

  const { showWarningToast, showSuccessToast, showErrorToast } = useCustomToast();
  const [setCredentials] = sendCodeCredentialsStore(state => [state.setCredentials]);

  const { mutate: loginUserMutate, isLoading: loginUserLoading } = useMutation({
    mutationFn: loginUser,
    onError: () => {
      showErrorToast({
        title: 'Erro ao fazer login',
        description: 'Verifique seus dados e tente novamente.',
      });
    },
    onSuccess: (data: any) => {
      if (data?.verified === false) {
        setCredentials({
          first_name: data.first_name,
          personal_phone: data.personal_phone,
        });

        navigate('CodeScreen' as never);

        showWarningToast({
          title: 'Sua conta ainda não foi verificada',
          description: 'Por favor, confirme seu código de acesso enviado por SMS.',
        });
      } else {
        showSuccessToast({
          title: 'Login realizado com sucesso',
          description: 'Seja bem-vindo! Comece a transformar a sua vida agora mesmo.',
        });

        navigate('HomeOptions' as never);

        storeData('user', data.user);
        storeData('token', data.token);
      }
    },
  });

  return { loginUserMutate, loginUserLoading };
}
