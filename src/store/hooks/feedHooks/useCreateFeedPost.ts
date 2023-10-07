import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import { queryClient } from 'src/store/lib';
import { useCustomToast } from 'src/hooks';
import { createFeedPost } from 'src/store/requests';
import { CreateFeedPostProps } from 'src/store/requests/feed/types';
import { NavigationProp } from '@react-navigation/native';

type UseCreateFeedPostReturn = {
  postMutate: UseMutateFunction<void, unknown, CreateFeedPostProps, unknown>;
  postLoading: boolean;
};

type UseCreateFeedPostProps = {
  navigation: NavigationProp<Record<string, object | undefined>>;
};

export function useCreateFeedPost({ navigation }: UseCreateFeedPostProps): UseCreateFeedPostReturn {
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const { mutate: postMutate, isLoading: postLoading } = useMutation({
    mutationFn: createFeedPost,
    onError: () => {
      showErrorToast({
        title: 'Erro ao criar a postagem',
        description: 'Tente novamente mais tarde.',
      });
    },
    onSuccess: () => {
      showSuccessToast({
        title: 'Postagem criada com sucesso!',
        description: 'Você já pode visualizar sua postagem na página inicial.',
      });
      queryClient.invalidateQueries(['feed']);
      navigation.navigate('TabRoutes');
    },
  });

  return { postMutate, postLoading };
}
