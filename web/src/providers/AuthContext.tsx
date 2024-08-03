import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';

interface AuthContextProps {
  token: string;
  user: User | undefined;
  login: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  token: '',
  user: undefined,
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
});

interface ProviderProps {
  children?: React.ReactNode;
}

type User = {
  username: string;
};

const AuthProvider = ({ children }: ProviderProps) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string>(
    localStorage.getItem('token') ?? ''
  );
  const [user, setUser] = useState<User>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setIsLoggedIn(user ? true : false);
  }, [user]);

  const login = async (username: string, password: string) => {
    axios
      .post(`${BASE_URL}/login`, { username, password })
      .then((response) => {
        console.log(response);
        const { token, user: userResponse } = response.data;
        setToken(token);
        setUser(userResponse);

        localStorage.setItem('token', token);
        navigate('/home');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logout = () => {
    setToken('');
    setUser(undefined);
    localStorage.removeItem('token');
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

export const useAuth = () => {
  return useContext(AuthContext);
};
