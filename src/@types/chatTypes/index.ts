import { RoleType } from '../authTypes';
import { Activity } from '../usersTypes';

export type Chat = {
  id: number;
  activity_id: number;
  user_sender_id: number;
  user_receiver_id: number;
  created_at: string;
  updated_at: string;
  user_sender: UserMessager;
  user_receiver: UserMessager;
  messages: Array<Message>;
  activity?: Activity;
  status: 'ACTIVE' | 'INACTIVE';
  success: boolean;
  user_name: string;
  user_photo: string;
};

export type UserMessager = {
  id: number;
  first_name: string;
  last_name: string;
  photo: string;
  role: RoleType;
  address: string;
};

export type Message = {
  id: number;
  author_id: number;
  author_photo: string;
  chat_id: number;
  text: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
};
