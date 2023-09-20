import { GenderType } from 'src/@types/authTypes';

export type CreateUserProps = {
  cpf: string;
  email: string;
  photo: string;
  address: string;
  password: string;
  last_name: string;
  gender: GenderType;
  first_name: string;
  birth_date: string;
  personal_phone: string;
  relative_phone: string;
};

export type CreateUserResponse = CreateUserProps & {
  user_code: string;
};

export type CodeConfirmationProps = {
  user_code: string;
};

export type SendCodeProps = {
  first_name: string;
  personal_phone: string;
};

export type LoginUserProps = {
  email: string;
  password: string;
};

export type LoginUserResponse = CreateUserResponse & {
  verified: boolean;
};
