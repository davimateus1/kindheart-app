import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Activity } from 'src/@types/usersTypes';
import { getUserFeed } from 'src/store/requests';

export type UseGetUserFeedProps = {
  userId: number;
  take: number;
} & UseQueryOptions<Array<Activity>, unknown>;

export const useGetUserFeed = ({ userId, take, ...rest }: UseGetUserFeedProps) =>
  useQuery({
    queryFn: () => getUserFeed({ userId, take }),
    queryKey: ['feed', userId, take],
    ...rest,
  });
