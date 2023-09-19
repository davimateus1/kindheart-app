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
