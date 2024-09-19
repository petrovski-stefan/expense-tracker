import { createContext, useContext } from 'react';

type AuthContextType = {
  authInfo: {
    token: string;
    username: string;
  };
  login: (username: string, token: string) => void;
  logout: () => void;
};

export const authContext = createContext<AuthContextType | undefined>(undefined);

const useAuthContext = () => {
  const context = useContext(authContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export default useAuthContext;
