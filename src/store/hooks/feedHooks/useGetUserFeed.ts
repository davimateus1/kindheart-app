import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getUserFeed } from 'src/store/requests';
import { FeedItem } from 'src/store/requests/feed/types';

export type UseGetUserFeedProps = {
  userId: number;
  take: number;
} & UseQueryOptions<Array<FeedItem>, unknown>;

export const useGetUserFeed = ({ userId, take, ...rest }: UseGetUserFeedProps) =>
  useQuery({
    queryFn: () => getUserFeed({ userId, take }),
    queryKey: ['feed', userId, take],
    ...rest,
  });
