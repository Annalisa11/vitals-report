import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { BASE_URL } from '@/config';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/types';

export interface AuthContextProps {
  token: string;
  user: User | undefined;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  token: '',
  user: undefined,
  login: async () => {},
  logout: () => {},
  isLoggedIn: false,
});

interface ProviderProps {
  children?: React.ReactNode;
}

const AuthProvider = ({ children }: ProviderProps) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string>(
    localStorage.getItem('token') ?? ''
  );
  const [user, setUser] = useState<User | undefined>(
    JSON.parse(localStorage.getItem('user') ?? 'null') ?? undefined
  );
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    JSON.parse(localStorage.getItem('user') ?? 'null') ? true : false
  );

  useEffect(() => {
    setIsLoggedIn(user ? true : false);
    console.log('useEffect[user]: ', user);
  }, [user]);

  const login = async (email: string, password: string) => {
    axios
      .post(`${BASE_URL}/login`, { email, password })
      .then((response) => {
        const { token, user: userResponse } = response.data;
        setToken(token);
        setUser(userResponse);

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userResponse));
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logout = () => {
    setToken('');
    setUser(undefined);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
