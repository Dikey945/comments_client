import React, {createContext, useContext, useMemo, useState} from 'react';
import { accessTokenService } from '../services/accessTokenService';
import {authService, LoginParams} from '../services/authService'

interface Props {
  children: React.ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface AuthContextType {
  isChecked: boolean,
  user : User | null,
  checkAuth: () => Promise<void>,
  activate: (activationToken:  string | undefined) => Promise<void>,
  login: ({ email, password }: { email: string, password: string }) => Promise<void>,
  logout: () => Promise<void>,
}

const Context = createContext({} as AuthContextType);

export const useAuth = () => {

  return useContext(Context);
}


export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isChecked, setChecked] = useState(true);

  async function activate(activationToken: string | undefined) {
    const response = await authService.activate(activationToken);
    const accessToken = response.data.accessToken;
    const user = response.data.user || null;
    console.log(user)

    accessTokenService.save(accessToken);
    setUser(user);
  }

  async function checkAuth() {
    try {
      const response = await authService.refresh();
      const accessToken = response.data.accessToken;
      const user = response.data.user;

      accessTokenService.save(accessToken);
      setUser(user);
    } catch (error) {
      console.log('User is not authentincated');
    } finally {
      setChecked(true);
    }
  }

  async function login({ email, password }: LoginParams) {
    const response = await authService.login({ email, password });
    const accessToken = response.data.accessToken;
    const user = response.data.user;
    console.log('user', user);

    accessTokenService.save(accessToken);
    setUser(user);
  }

  async function logout() {
    await authService.logout();

    accessTokenService.remove();
    setUser(null);
  }

  const value = useMemo<AuthContextType>(() => ({
    isChecked,
    user,
    checkAuth,
    activate,
    login,
    logout,
  }), [user, isChecked]);

  return (
    < Context.Provider value={value} >
      {children}
    </ Context.Provider>
  )
};