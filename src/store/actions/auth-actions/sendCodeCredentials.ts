import { create } from 'zustand';

type UserStoreProps = {
  credentials: typeof defaultCredentials;
  setCredentials: (credentials: typeof defaultCredentials) => void;
};

const defaultCredentials = { personal_phone: '', first_name: '' };

export const sendCodeCredentialsStore = create<UserStoreProps>(set => ({
  credentials: defaultCredentials,
  setCredentials: (credentials: typeof defaultCredentials) => set({ credentials }),
}));
