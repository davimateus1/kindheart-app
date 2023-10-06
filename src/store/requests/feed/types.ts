import { StatusType } from 'src/@types/authTypes';

export type FeedItem = {
  id: number;
  user_elderly_id: number;
  user_voluntary_id: number;
  topic: { id: number; label: string; value: string };
  description: string;
  status: StatusType;
  likes: number;
  likedBy: number[];
  image: string;
  created_at: string;
  updated_at: string;
  user_elderly: Userelderly;
  isFriend: boolean;
};

export type Userelderly = {
  photo: string;
  first_name: string;
  last_name: string;
};

export type GetUserFeedProps = {
  userId: number;
  take: number;
};

export type LikeFeedPostProps = { user_id: string; post_id: string };
