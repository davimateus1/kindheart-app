import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from 'src/@types/settingsTypes';

import { loginUser } from 'src/store';
import { sendCodeCredentialsStore } from 'src/store/actions';
import { useCustomToast } from 'src/hooks';

const USER_STORAGE_KEY = 'user';
const TOKEN_STORAGE_KEY = 'token';

interface AuthContextData {
  user: User | null;
  token: string | null;
  login: ({ email, password }: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [active, setActive] = useState<boolean>(true);

  const [setCredentials] = sendCodeCredentialsStore(state => [state.setCredentials]);
  const { showWarningToast, showErrorToast, showSuccessToast } = useCustomToast();

  useEffect(() => {
    const getUserAndTokenFromStorage = async () => {
      try {
        const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
        const storedToken = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);

        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        }
      } catch {
        showErrorToast({
          title: 'Erro ao carregar dados do usuário',
          description: 'Tente novamente mais tarde.',
        });
      }
    };

    getUserAndTokenFromStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async ({ email, password }: { email: string; password: string }) => {
    try {
      const data: any = await loginUser({ email, password });
      setUser(data.user as User);

      if (data?.verified === false) {
        setActive(false);

        setCredentials({
          first_name: data.first_name,
          personal_phone: data.personal_phone,
        });

        showWarningToast({
          title: 'Sua conta ainda não foi verificada',
          description: 'Por favor, confirme seu código de acesso enviado por SMS.',
        });

        return;
      }

      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user));
      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, data.token);

      showSuccessToast({
        title: 'Login realizado com sucesso',
        description: 'Seja bem-vindo! Comece a transformar a sua vida agora mesmo.',
      });
    } catch {
      showErrorToast({
        title: 'Erro ao fazer login',
        description: 'Verifique seus dados e tente novamente.',
      });
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
    await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ user, token, login, active, setActive, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
