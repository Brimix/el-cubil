import {createContext, useContext} from 'react';
import {User} from './types';

type UserContextType = {
  isAdmin: boolean;
  user: User | null;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
