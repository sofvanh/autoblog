import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { fetchUserDescription } from '../utils/aiApiConnector';

interface UserContextProps {
  prompt: string;
  userDescription: string;
  setPrompt: (prompt: string) => void;
  setUserDescription: (description: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [prompt, setPrompt] = useState<string>(() => localStorage.getItem('prompt') || '');
  const [userDescription, setUserDescription] = useState<string>(() => localStorage.getItem('userDescription') || '');

  useEffect(() => {
    localStorage.setItem('prompt', prompt);
    if (prompt) {
      fetchUserDescription(prompt).then(response => {
        setUserDescription(response.text);
        localStorage.setItem('userDescription', response.text);
      });
    } else {
      setUserDescription('');
      localStorage.removeItem('userDescription');
    }
  }, [prompt]);

  return (
    <UserContext.Provider value={{ prompt, userDescription, setPrompt, setUserDescription }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};