import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';

interface AuthContextProps {
  token: string;
  user: User | undefined;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  checkPermission: (right: string) => boolean;
  isLoggedIn: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  token: '',
  user: undefined,
  login: async () => {},
  logout: () => {},
  checkPermission: () => false,
  isLoggedIn: false,
});

interface ProviderProps {
  children?: React.ReactNode;
}

type User = {
  username: string;
  rights: string[];
};

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

  const login = async (username: string, password: string) => {
    axios
      .post(`${BASE_URL}/login`, { username, password })
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

  const checkPermission = (right: string) => {
    console.log('CHECK PER', user);
    if (!user || !user.rights) {
      return false;
    }
    return user.rights.some((r) => r === right);
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
        checkPermission,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
