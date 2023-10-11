export type GetUserProfileProps = {
  userId: number;
};

export type CreateFriendshipProps = {
  user_one_id: string;
  user_two_id: string;
  action: 'ADD' | 'REMOVE';
};
