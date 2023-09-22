import { RoleType } from '../authTypes';

export type User = {
  address: string;
  birth_date: string;
  cpf: string;
  created_at: string;
  email: string;
  first_name: string;
  gender: string;
  id: number;
  last_name: string;
  password: string;
  personal_phone: string;
  photo: string;
  relative_phone: string;
  role: RoleType;
  updated_at: string;
  user_code: string;
  verified: boolean;
};
