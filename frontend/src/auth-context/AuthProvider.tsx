import { ReactNode, useState } from 'react';
import { authContext } from './use-auth-context';

type AuthProviderProps = { children: ReactNode };
type AuthInfo = { username: string; token: string };

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authInfo, setAuthInfo] = useState<AuthInfo>(() => {
    const token = localStorage.getItem('ET_AUTH_TOKEN');
    const username = localStorage.getItem('ET_AUTH_USERNAME');

    if (token === null || username === null) {
      return { username: '', token: '' };
    }
    return { username, token };
  });

  const login = (username: string, token: string) => {
    setAuthInfo({ username, token });
    localStorage.setItem('ET_AUTH_TOKEN', token);
    localStorage.setItem('ET_AUTH_USERNAME', username);
  };

  const logout = () => {
    setAuthInfo({ username: '', token: '' });
    localStorage.removeItem('ET_AUTH_TOKEN');
    localStorage.removeItem('ET_AUTH_USERNAME');
  };

  return (
    <authContext.Provider value={{ login, logout, authInfo }}>{children}</authContext.Provider>
  );
};

export default AuthProvider;
