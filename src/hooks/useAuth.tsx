import { useToast } from '@chakra-ui/toast';
import Router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from 'services/apiClient';

type User = {
  id: string;
  email: string;
}

type SignInCredentials = {
  email: string;
  password: string;
}

type SignUpCredentials = {
  email: string;
  password: string;
  passwordConfirmation: string;
}

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
  user: User | undefined; 
}

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  destroyCookie(undefined, 'timos.token');
  destroyCookie(undefined, 'timos.refresh_token');

  Router.push('/');
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;
  const toast = useToast();

  useEffect(() => {
    const { 'timos.token': token } = parseCookies();

    if (token) {
      // console.log('Token exists');
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/session', {
        email,
        password
      });

      const { token, refresh_token, id } = response.data;
      
      setCookie(undefined, 'timos.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      });
      setCookie(undefined, 'timos.refresh_token', refresh_token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      });

      setUser({
        id,
        email
      });

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      // router.push('/dashboard');
    } catch (err: any) {
      toast({
        title: 'Erro',
        description: err.response.data.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
  }

  async function signUp({ email, password, passwordConfirmation }: SignUpCredentials) {
    try {
      const response = await api.post('/users', {
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      const { token, refresh_token, id } = response.data;
      
      setCookie(undefined, 'timos.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      });
      setCookie(undefined, 'timos.refresh_token', refresh_token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      });

      setUser({
        id,
        email
      });

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      toast({
        title: 'Sucesso',
        description: 'Conta criada com sucesso',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });

      Router.push('/');
    } catch (err: any) {
      toast({
        title: 'Erro',
        description: err.response.data.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signUp, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}