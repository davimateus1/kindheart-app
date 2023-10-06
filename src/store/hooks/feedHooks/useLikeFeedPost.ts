import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import { queryClient } from 'src/store/lib';
import { useCustomToast } from 'src/hooks';
import { likeFeedPost } from 'src/store/requests';
import { LikeFeedPostProps } from 'src/store/requests/feed/types';

type UseLikeFeedPostProps = {
  likeMutate: UseMutateFunction<void, unknown, LikeFeedPostProps, unknown>;
};

export function useLikeFeedPost(): UseLikeFeedPostProps {
  const { showErrorToast } = useCustomToast();

  const { mutate: likeMutate } = useMutation({
    mutationFn: likeFeedPost,
    onError: () => {
      showErrorToast({
        title: 'Erro ao curtir a postagem',
        description: 'Tente novamente mais tarde.',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['feed']);
    },
  });

  return { likeMutate };
}
