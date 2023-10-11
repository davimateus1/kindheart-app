import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import { queryClient } from 'src/store/lib';
import { useCustomToast } from 'src/hooks';

import { useNavigation } from '@react-navigation/native';
import { ElderlyActionProps } from 'src/store/requests/chat/types';
import { elderlyAction } from 'src/store/requests';
import { Activity } from 'src/@types/usersTypes';

type UseElderlyActionProps = {
  actionLoading: boolean;
  actionMutate: UseMutateFunction<
    { action: 'STARTED' | 'CANCELED' | 'FINISHED'; activity: Activity },
    unknown,
    ElderlyActionProps,
    unknown
  >;
};

export function useElderlyAction(): UseElderlyActionProps {
  const { showSuccessToast, showWarningToast, showErrorToast } = useCustomToast();
  const { navigate } = useNavigation() as any;

  const { mutate: actionMutate, isLoading: actionLoading } = useMutation({
    mutationFn: elderlyAction,
    onError: () => {
      showErrorToast({
        title: 'Erro ao mudar o status da atividade',
        description: 'Tente novamente mais tarde.',
      });
    },
    onSuccess: response => {
      const { action } = response;
      const getMessage = () => {
        switch (action) {
          case 'STARTED':
            return 'iniciada';
          case 'CANCELED':
            return 'cancelada';
          case 'FINISHED':
            return 'finalizada';
          default:
            return '';
        }
      };

      queryClient.invalidateQueries(['feed']);
      queryClient.invalidateQueries(['chat']);
      queryClient.invalidateQueries(['chats']);

      if (action === 'FINISHED' || action === 'CANCELED') {
        navigate('AllChats');

        return showWarningToast({
          title: `Atividade ${getMessage()} com sucesso!`,
          description: 'Você será redirecionado para a tela de chats.',
        });
      }

      return showSuccessToast({
        title: `Atividade iniciada com sucesso!`,
        description: 'Continue interagindo com a pessoa.',
      });
    },
  });

  return { actionMutate, actionLoading };
}
