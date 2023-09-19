import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { CodeConfirmationProps } from 'src/store/requests/auth/types';
import { useNavigation } from '@react-navigation/native';

import { queryClient } from 'src/store/lib';
import { useCustomToast } from 'src/hooks';
import { confirmCode } from 'src/store/requests';

type UseCodeConfirmationProps = {
  confirmCodeLoading: boolean;
  confirmCodeMutate: UseMutateFunction<void, unknown, CodeConfirmationProps, unknown>;
};

export const useCodeConfirmation = (): UseCodeConfirmationProps => {
  const { showErrorToast } = useCustomToast();
  const { navigate } = useNavigation();

  const { mutate: confirmCodeMutate, isLoading: confirmCodeLoading } = useMutation({
    mutationFn: confirmCode,
    onError: () => {
      showErrorToast({
        title: 'Erro ao confirmar código',
        description: 'Verifique o código que você digitou e tente novamente.',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      navigate('success' as never);
    },
  });

  return { confirmCodeMutate, confirmCodeLoading };
};
