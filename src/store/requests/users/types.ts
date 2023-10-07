export type GetUserProfileProps = {
  userId: number;
  userType: string;
};

export type CreateFriendshipProps = {
  user_one_id: string;
  user_two_id: string;
  action: 'ADD' | 'REMOVE';
};
