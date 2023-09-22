import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { RoleType } from 'src/@types/authTypes';
import { UserProfile } from 'src/@types/usersTypes';
import { getUserProfile } from 'src/store/requests/users';

export type UseGetUserProfileProps = {
  userId: number;
  userType: RoleType;
} & UseQueryOptions<UserProfile, unknown>;

export const useGetUserProfile = ({ userId, userType, ...rest }: UseGetUserProfileProps) =>
  useQuery({
    queryFn: () => getUserProfile({ userId, userType }),
    queryKey: ['users', userId],
    ...rest,
  });
