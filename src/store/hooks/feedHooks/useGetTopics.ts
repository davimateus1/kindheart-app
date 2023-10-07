import { useQuery } from '@tanstack/react-query';
import { getTopics } from 'src/store/requests';

export const useGetTopics = () =>
  useQuery({
    queryFn: () => getTopics(),
    queryKey: ['topic'],
  });
