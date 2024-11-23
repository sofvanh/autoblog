import { Anthropic } from '@anthropic-ai/sdk';
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { fetchUserDescription } from '../utils/aiApiConnector';


const anthropicApiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

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
  const [prompt, setPrompt] = useState<string>('');
  const [userDescription, setUserDescription] = useState<string>('');

  useEffect(() => {
    if (prompt) {
      fetchUserDescription(prompt).then(response => {
        setUserDescription(response.text);
      });
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