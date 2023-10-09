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
  messages: any[]; // TODO: add type
  activity?: Activity;
  status: 'ACTIVE' | 'INACTIVE';
  success: boolean;
};

export type UserMessager = {
  id: number;
  first_name: string;
  last_name: string;
  photo: string;
  role: RoleType;
  address: string;
};
