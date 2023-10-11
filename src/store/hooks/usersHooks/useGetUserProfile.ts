import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { UserProfile } from 'src/@types/usersTypes';
import { getUserProfile } from 'src/store/requests/users';

export type UseGetUserProfileProps = {
  userId: number;
} & UseQueryOptions<UserProfile, unknown>;

export const useGetUserProfile = ({ userId, ...rest }: UseGetUserProfileProps) =>
  useQuery({
    queryFn: () => getUserProfile({ userId }),
    queryKey: ['users', userId],
    enabled: !!userId,
    ...rest,
  });
