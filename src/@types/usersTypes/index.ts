import { RoleType, StatusType } from '../authTypes';

export type UserProfile = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  personal_phone: string;
  birth_date: string;
  verified: boolean;
  created_at: string;
  updated_at: string;
  photo: string;
  role: string;
  activities_voluntary: Array<Activity>;
  friends_count: number;
  posts_count: number;
  reviews_count: number;
  age: number;
  friends?: Array<number>;
  total_chats?: number;
};

export type Activity = {
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
  user_elderly: UserElderly;
  is_friend: boolean;
  total_posts: number;
};

export type UserElderly = {
  photo: string;
  first_name: string;
  last_name: string;
  role: RoleType;
};

export type Topic = {
  id: number;
  label: string;
  value: string;
};
