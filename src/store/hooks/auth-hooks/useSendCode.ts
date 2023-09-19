import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { SendCodeProps } from 'src/store/requests/auth/types';

import { queryClient } from 'src/store/lib';
import { useCustomToast } from 'src/hooks';
import { sendCode } from 'src/store/requests';

type UseSendCodeProps = {
  sendCodeLoading: boolean;
  sendCodeMutate: UseMutateFunction<void, unknown, SendCodeProps, unknown>;
};

export const useSendCode = (): UseSendCodeProps => {
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const { mutate: sendCodeMutate, isLoading: sendCodeLoading } = useMutation({
    mutationFn: sendCode,
    onError: () => {
      showErrorToast({
        title: 'Erro ao enviar código',
        description: 'Tente novamente mais tarde.',
      });
    },
    onSuccess: () => {
      showSuccessToast({
        title: 'Código enviado com sucesso',
        description: 'Verifique o celular cadastrado e digite o código recebido.',
      });

      queryClient.invalidateQueries(['users']);
    },
  });

  return { sendCodeMutate, sendCodeLoading };
};
