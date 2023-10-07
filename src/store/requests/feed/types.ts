export type GetUserFeedProps = {
  userId: number;
  take: number;
};

export type LikeFeedPostProps = { user_id: string; post_id: string };

export type CreateFeedPostProps = {
  image: string;
  user_id: string;
  topic_id: string;
  description: string;
};
